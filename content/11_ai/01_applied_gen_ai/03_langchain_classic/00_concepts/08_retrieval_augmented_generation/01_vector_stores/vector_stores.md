---
title: "Vector Stores"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/08_retrieval_augmented_generation/01_vector_stores"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

<style>
o { color: #f49735 }
v { color: #b36be2 }
g { color: #70bf41 }
bl { color: #62aefa }
pi { color: pink}
a:has( picture:has(img[alt="Connection between tokenization and embeddings"] { width: "50%"!important;height: "50%"!important }) )
</style>

> To store vectors 😋

## Types

| Name                   |                     Type | Language / Client             |                     Persistence | Best for                                         |
| ---------------------- | -----------------------: | ----------------------------- | ------------------------------: | ------------------------------------------------ |
| **FAISS**              | In-memory / disk indexes | Python / C++                  |    Optional disk-backed indexes | Algorithmic experiments, large in-memory indexes |
| **Annoy**              |  Approximate NN (forest) | Python / C++                  |  Persistent on-disk index files | Read-heavy, low-memory prototypes                |
| **hnswlib**            |           HNSW graph ANN | Python / C++                  |           Persistent index file | Low-latency, high-recall local search            |
| **Chroma**             |    Lightweight DB (file) | Python-first                  |    Local file-based persistence | LangChain demos, easy local dev                  |
| **Qdrant (oss)**       |        Vector DB service | HTTP/GRPC clients (Python/JS) |            Persistent (disk/DB) | Feature-rich local service with filtering        |
| **Milvus (community)** |         Vector DB server | Python/Go/Java clients        | Persistent, scalable via Docker | Production-like local testing and indexing       |
| **Weaviate (oss)**     |       Vector DB + schema | HTTP/GraphQL clients          |              Persistent storage | Semantic search with schema + filters            |
| **Vectra**             | Local file-based DB (JS) | JavaScript / TypeScript       |          Local file persistence | Node.js/TS local prototypes                      |

📌choose `FAISS`/`hnswlib`/`Annoy` for pure algorithmic learning;

📌choose `Qdrant`/`Milvus`/`Weaviate`/`Chroma` for full DB features (APIs, persistence, filtering)

📌choose `Vectra` if you prefer a pure JavaScript/TypeScript local store.

## FAISS

We can create vectorstore in 2 ways from

1. Documents

```py:title=FAISS.from_documents?
from langchain_classic.vectorstores import FAISS

FAISS.from_documents?
```

<op>

<o>Signature:</o>

FAISS.from_documents (
documents: <bl>'list[Document]'</bl>,
embedding: <bl>'Embeddings'</bl>,
\*\*kwargs: <bl>'Any'</bl>,
) -> <bl>'Self'</bl>

<o>Docstring:</o>

Return VectorStore initialized from documents and embeddings.

Args:

documents: List of Documents to add to the vectorstore.

embedding: Embedding function to use.

kwargs: Additional keyword arguments.

Returns:

VectorStore: VectorStore initialized from documents and embeddings.

<o>File:</o> c:\users\lucifer\appdata\roaming\python\python310\site-packages\langchain_core\vectorstores\base.py

<o>Type:</o> method

</op>

2. Embeddings

```py:title=FAISS.from_embeddings?
from langchain_classic.vectorstores import FAISS

FAISS.from_embeddings?
```

<op>

<o>Signature:</o>
FAISS.from_embeddings(

text_embeddings: <bl>'Iterable[Tuple[str, List[float]]]'</bl>,

embedding: <bl>'Embeddings'</bl>,

metadatas: <bl>'Optional[Iterable[dict]]'</bl> = None,

ids: <bl>'Optional[List[str]]'</bl> = None,

\*\*kwargs: <bl>'Any'</bl>,

) -> <bl>'FAISS'</bl>

<o>Docstring:</o>
Construct FAISS wrapper from raw documents.

This is a user friendly interface that:

1. Embeds documents.
2. Creates an in memory docstore
3. Initializes the FAISS database

This is intended to be a quick way to get started.

Example:
.. code-block:: python

        from langchain_community.vectorstores import FAISS
        from langchain_community.embeddings import OpenAIEmbeddings

        embeddings = OpenAIEmbeddings()
        text_embeddings = embeddings.embed_documents(texts)
        text_embedding_pairs = zip(texts, text_embeddings)
        faiss = FAISS.from_embeddings(text_embedding_pairs, embeddings)

<o>File:</o> c:\users\lucifer\appdata\roaming\python\python310\site-packages\langchain_core\vectorstores\base.py

<o>Type:</o> method

</op>

Continuing the example from prev section by install `faiss-cpu`

```py:title=Pre-Requisite

%pip install faiss-cpu

```

<op>
Defaulting to user installation because normal site-packages is not writeable

Collecting faiss-cpu

Downloading faiss_cpu-1.12.0-cp310-cp310-win_amd64.whl (18.2 MB)

---------------------------------------- 18.2/18.2 MB 3.7 MB/s eta 0:00:00

Requirement already satisfied: numpy<3.0,>=1.25.0 in c:\users\lucifer\appdata\roaming\python\python310\site-packages (from faiss-cpu) (2.2.6)

Requirement already satisfied: packaging in c:\users\lucifer\appdata\roaming\python\python310\site-packages (from faiss-cpu) (25.0)

Installing collected packages: faiss-cpu

Successfully installed faiss-cpu-1.12.0

Note: you may need to restart the kernel to use updated packages.

[notice] A new release of pip available: 22.3.1 -> 25.2

[notice] To update, run: python.exe -m pip install --upgrade pip

</op>

### Create VectorStore from embeddings

**Problem statement**
Build and evaluate a local semantic search prototype that uses Ollama embeddings and a FAISS vector store to match user queries to short technical support paragraphs.

**Objectives**

- Generate and persist document embeddings for a small support KB.
- Implement query embedding and nearest-neighbor retrieval (cosine similarity).
- Validate results for relevance and measure basic latency.

```py:title=Similarity_search_using_vector_store
# Import the Ollama embeddings integration for LangChain
from langchain_ollama import OllamaEmbeddings

# LangChain Document convenience wrapper for text + metadata
from langchain_classic.docstore.document import Document

from langchain_classic.vectorstores import FAISS
import os

# Create an embeddings client using a local or hosted Ollama model
# model="mxbai-embed-large" is the chosen embedding model name
embeddings = OllamaEmbeddings(model="mxbai-embed-large")

# Small knowledge base: support paragraphs (strings)
support_paragraphs = [
    "The HP LaserJet Pro M404dn often encounters paper jam issues in Tray 2...",
    "Wi-Fi connection problems with HP printers are often resolved by restarting...",
    "If your HP laptop shuts down randomly, check battery health...",
    "The HP Smart app may fail to detect the printer if the firewall...",
    "Frequent disconnections in wireless printers are resolved by assigning...",
    "When encountering faded prints, run a printhead cleaning cycle...",
    "To troubleshoot slow printing, verify if the driver is set to PCL...",
    "Blue screen errors in HP laptops are commonly related to outdated...",
    "If your printer is unresponsive, check USB cable, try another port...",
    "Scanning errors may be due to incompatible Twain drivers..."
]

# Wrap each paragraph in a LangChain Document (keeps text and optional metadata together)
docs = [Document(page_content=p) for p in support_paragraphs]

# Extract raw text content from Document objects
content = [doc.page_content for doc in docs]

# Produce embeddings for all documents (batch call)
# doc_embeddings is a list of fixed-length numeric vectors (one per paragraph)
doc_embeddings = embeddings.embed_documents(content)

if os.path.exists("vs"):
    vs = FAISS.load_local("vs", embeddings, allow_dangerous_deserialization=True)
else:
    text_embedding_pairs = zip(content, doc_embeddings)
    vs = FAISS.from_embeddings(text_embedding_pairs, embeddings)
    vs.save_local('vs')

# Embed a single user query for semantic search
random_query_embedding = embeddings.embed_query("what to do when printer is slow")

print("\nSolution for what to do when printer is slow==========================\n")
ssbv = vs.similarity_search_by_vector(random_query_embedding)
print(ssbv)
print("\nSolutions for printer which stops due to paper jam==========================\n")
ss= vs.similarity_search("Solutions for printer which stops due to paper jam")
print(ss)

```

<op>

Solution for what to do when printer is slow==========================

[

Document(id='61d9a59e-5cc3-480f-9f0a-5e6f901132ba', metadata={}, page_content='To troubleshoot slow printing, verify if the driver is set to PCL...'),

Document(id='7e754258-33c5-4da9-b58d-869589c24c55', metadata={}, page_content='If your printer is unresponsive, check USB cable, try another port...'),

Document(id='88349a03-1f47-4d69-b1d2-044e9e6a1628', metadata={}, page_content='When encountering faded prints, run a printhead cleaning cycle...'),

Document(id='20b232b7-1089-4d86-b62f-dc04f545cebc', metadata={}, page_content='The HP LaserJet Pro M404dn often encounters paper jam issues in Tray 2...')

]

Solutions for printer which stops due to paper jam==========================

[

Document(id='20b232b7-1089-4d86-b62f-dc04f545cebc', metadata={}, page_content='The HP LaserJet Pro M404dn often encounters paper jam issues in Tray 2...'),

Document(id='7e754258-33c5-4da9-b58d-869589c24c55', metadata={}, page_content='If your printer is unresponsive, check USB cable, try another port...'),

Document(id='61d9a59e-5cc3-480f-9f0a-5e6f901132ba', metadata={}, page_content='To troubleshoot slow printing, verify if the driver is set to PCL...'),

Document(id='e4f5dec1-2637-4a6d-afaf-e98bcaf7c7e5', metadata={}, page_content='Frequent disconnections in wireless printers are resolved by assigning...')

]

</op>

📌: Notice the result of first query is same that we have seen earlier with highest match on top

### Create VectorStore from documents

**Problem statement**

Build and evaluate a local semantic search system that indexes technical support documents (CSV) as LangChain Documents, embeds them with a specified embeddings model, stores vectors in a FAISS index, and supports filtered similarity search.

**Objectives**

- Create Document objects with text and metadata and persist a FAISS vector store.
- Implement query-based retrieval and metadata-filtered search.
- Validate relevance of returned passages and ensure index/model compatibility across runs.

```py:title=Enhanced_similarity_search_using_vector_store
import os
import pandas as pd
from langchain_classic.docstore.document import Document
from langchain_classic.vectorstores import FAISS

# Read CSV dataset into a DataFrame
df = pd.read_csv('rag_lesson_dataset.csv')

# Build a list of LangChain Document objects, each containing combined text and metadata
docs = [
    Document(
        # Combine title and content into a single searchable text field
        page_content="Title : " + row['title'] + " Content : " + row['content'],
        # Attach structured metadata to enable filtered searches later
        metadata={
            "title": row['title'],
            "page_number": row['page_number'],
            "section": row['section'],
            "device_type": row['device_type']
        }
    )
    for _, row in df.iterrows()
]

# If a persisted vector store exists, load it; otherwise build and save a new one
if os.path.exists("vs2"):
    # Loading requires the same embeddings instance used during save.
    # allow_dangerous_deserialization=True is required because FAISS uses pickle for some parts.
    # Only set this to True for directories you created and trust.
    vs = FAISS.load_local("vs2", embeddings, allow_dangerous_deserialization=True)
else:
    # Create a vector store from the Document objects using the embeddings object.
    # from_documents will compute embeddings for each Document internally if doc embeddings aren't provided.
    vs = FAISS.from_documents(docs, embeddings)
    # Persist the vector store to disk for reuse across runs
    vs.save_local('vs2')

# Plain similarity search by query string (returns nearest documents)
print("\nSolution for When to replace cartridges?==========================\n")
ss1 = vs.similarity_search('When to replace cartridges?')
print(ss1)

# Filtered similarity search: restrict results to documents with page_number == 1
print("\nSolution for When to replace cartridges filter by page_number:1==========================\n")
ss2 = vs.similarity_search('When to replace cartridges?', filter={"page_number": 1})
print(ss2)

# Filtered similarity search: restrict results to documents with specific title
print("\nSolution for When to replace cartridges filter by title:Document Scanning Guide==========================\n")
ss3 = vs.similarity_search('When to replace cartridges?', filter={"title": 'Document Scanning Guide'})
print(ss3)
```

<op>

Solution for When to replace cartridges?==========================

[

Document(id='e6e4873c-5aac-452b-8e04-e208a217ae17', metadata={'title': 'Troubleshooting Print Quality', 'page_number': 2, 'section': 'Cartridge Issues', 'device_type': 'HP DeskJet 2700'}, page_content='Title : Troubleshooting Print Quality Content : Streaks or lines in printed documents can be caused by damaged or low-ink cartridges. Replace cartridges and align printhead.'),

Document(id='66cb5a53-ee07-421d-b821-f528fac78411', metadata={'title': 'Troubleshooting Print Quality', 'page_number': 1, 'section': 'Maintenance', 'device_type': 'HP DeskJet 2700'}, page_content='Title : Troubleshooting Print Quality Content : Faded or patchy prints usually indicate clogged nozzles. Run a printhead cleaning cycle from the printer control panel or HP Utility software.'),

Document(id='ba82bb1d-43cc-4858-ba86-b1c00c591883', metadata={'title': 'Document Scanning Guide', 'page_number': 3, 'section': 'Driver Issues', 'device_type': 'HP ENVY 6000'}, page_content='Title : Document Scanning Guide Content : When scanner fails to initiate, check if TWAIN or WIA driver is missing or outdated. Install HP Scan Extended for compatibility.'),

Document(id='26ac7d5a-2aa0-47dc-a9a5-447ceeda5a0d', metadata={'title': 'Document Scanning Guide', 'page_number': 4, 'section': 'Image Quality', 'device_type': 'HP ENVY 6000'}, page_content='Title : Document Scanning Guide Content : If scans are cropped or blurry, verify resolution settings and clean the scanner glass thoroughly.')

]

Solution for When to replace cartridges filter by page_number:1==========================

[

Document(id='66cb5a53-ee07-421d-b821-f528fac78411', metadata={'title': 'Troubleshooting Print Quality', <g>'page_number': 1</g>, 'section': 'Maintenance', 'device_type': 'HP DeskJet 2700'}, page_content='Title : Troubleshooting Print Quality Content : Faded or patchy prints usually indicate clogged nozzles. Run a printhead cleaning cycle from the printer control panel or HP Utility software.'),

Document(id='ac16298e-850f-4ab2-86e2-591c46af541a', metadata={'title': 'Printer Connectivity Guide', <g>'page_number': 1</g>, 'section': 'Network Setup', 'device_type': 'HP LaserJet Pro M404dn'}, page_content='Title : Printer Connectivity Guide Content : Wi-Fi printers often face disconnection due to DHCP IP reassignment. To ensure stability, assign a static IP via the embedded web server.'),

Document(id='ac9e0324-7000-47c2-a311-f334635705bb', metadata={'title': 'Power and Shutdown Problems', <g>'page_number': 1</g>, 'section': 'Power Management', 'device_type': 'HP Pavilion x360'}, page_content='Title : Power and Shutdown Problems Content : Unexpected shutdowns in laptops are often related to battery degradation. Run a battery diagnostics tool and check cycle count.')

]

Solution for When to replace cartridges filter by title:Document Scanning Guide==========================

[

Document(id='ba82bb1d-43cc-4858-ba86-b1c00c591883', metadata={<g>'title': 'Document Scanning Guide'</g>, 'page_number': 3, 'section': 'Driver Issues', 'device_type': 'HP ENVY 6000'}, page_content='Title : Document Scanning Guide Content : When scanner fails to initiate, check if TWAIN or WIA driver is missing or outdated. Install HP Scan Extended for compatibility.'),

Document(id='26ac7d5a-2aa0-47dc-a9a5-447ceeda5a0d', metadata={<g>'title': 'Document Scanning Guide'</g>, 'page_number': 4, 'section': 'Image Quality', 'device_type': 'HP ENVY 6000'}, page_content='Title : Document Scanning Guide Content : If scans are cropped or blurry, verify resolution settings and clean the scanner glass thoroughly.')

]

</op>

📌 Output of above 3 queries, retrieval does not always get the relevant data.

Next: Dive into concept of `Retrieval Augmentation Generation` for a better solution.
