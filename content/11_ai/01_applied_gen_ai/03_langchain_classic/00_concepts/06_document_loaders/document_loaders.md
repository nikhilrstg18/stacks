---
title: "langchain_classic.document_loaders"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/06_document_loaders"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

> langchain_classic.**document_loaders** are the entry point for bringing external knowledge into LangChain pipelines, ensuring that diverse/raw data sources are normalized into Standardized `Document` objects ready for processing.

## What Document Loaders Do

- **Load raw content**: Read data from files (TXT, PDF, CSV, HTML, JSON) or external sources (YouTube transcripts, Wikipedia pages, GitHub repos).
- **Convert to Document objects**: Each Document has:
  - **page_content**: the actual text content.
  - **metadata**: extra info like file name, source, author, or category.
- **Support lazy loading**: Many loaders implement generators so you don’t need to load everything into memory at once.
- **Enable splitting**: You can directly call .load_and_split() to load and chunk documents using a text splitter.

### Key Methods

- `load()` → returns a list of Document objects.
- `aload()` → async version of load().
- `load_and_split(text_splitter)` → loads and splits into chunks.
- `lazy_load()` → yields documents one by one (memory‑efficient).

## Concept

```py:title=Demo_TextLoader
from langchain_classic.document_loaders import TextLoader

# Load a text file into Document objects
loader = TextLoader("knowledge_base.txt")
docs = loader.load()

print(docs[0].page_content)   # actual text
print(docs[0].metadata)       # metadata like file path

```

<op>

HP printers often disconnect from Wi-Fi due to DHCP IP issues.
Assigning a static IP address stabilizes wireless connections.
LaserJet Pro M404dn model requires embedded web server access for settings.
Slow printing on HP printers is often caused by outdated firmware.
The HP LaserJet Pro M404dn often encounters paper jam issues in Tray 2...
Wi-Fi connection problems with HP printers are often resolved by restarting...
If your HP laptop shuts down randomly, check battery health...
The HP Smart app may fail to detect the printer if the firewall...
Frequent disconnections in wireless printers are resolved by assigning...
When encountering faded prints, run a printhead cleaning cycle...
To troubleshoot slow printing, verify if the driver is set to PCL...
Blue screen errors in HP laptops are commonly related to outdated...

{'source': 'knowledge_base.txt'}

</op>

```py:title=Demo_PyPDFLoader
from langchain_classic.document_loaders import PyPDFLoader

loader = PyPDFLoader("sample.pdf")
docs = loader.load()

```

### Why They Matter

- **Standardization**: All sources become uniform Document objects.
- **Flexibility**: You can plug in loaders for different formats without changing downstream code.
- **Efficiency**: Lazy loading avoids memory overload for large datasets.
- **Integration**: Works seamlessly with text splitters, embeddings, and vector stores for RAG pipelines.

<br/>
<br/>
<br/>
<br/>

---

- [document loaders](https://docs.langchain.com/oss/python/integrations/document_loaders)
