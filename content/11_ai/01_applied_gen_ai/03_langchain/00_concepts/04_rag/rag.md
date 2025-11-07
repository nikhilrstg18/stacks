---
title: "Retrieval Augmented Generation"
slug: "11_ai/01_applied_gen_ai/03_langchain/00_concepts/04_rag"
stack: "GenAI"
date: "2025-06-03T07:26:45.889Z"
draft: false
---

## RAG

`RAG` **R**etrieval-**A**ugmented **G**eneration is a hybrid approach that combines a retrieval step with a generative model.

First, a retriever finds relevant documents from a knowledge base using semantic search.

Then a generator (LLM) consumes those retrieved passages plus the user query to produce a grounded, context-aware answer.

- **Purpose**: improve factuality and provide up-to-date or domain-specific information without storing everything in the model.
- **Typical pipeline**: encode query → retrieve top-k documents → optionally rerank → feed query + documents to LLM → generate final response.
- **Benefits**: better accuracy, smaller hallucination risk, scalable updates (update KB, not model).
- **Trade-offs**: retrieval quality limits generation quality; requires managing vector store, latency, and prompt design.

```py:title=Last_example_continuation_context_aware
from langchain.prompts import PromptTemplate
from langchain.vectorstores import FAISS
from langchain_ollama.chat_models import ChatOllama
from langchain.schema import AIMessage

# Retrieval
if os.path.exists("vs"):
    vs = FAISS.load_local("vs", embeddings, allow_dangerous_deserialization=True)

user_query = 'Explain machine learning in simple words'
retrieved_chunks = vs.similarity_search(user_query)
print(f"\n==get relevant data from vector store==\n\n{retrieved_chunks}")

# Augmentation
context = "\n\n".join([doc.page_content for doc in retrieved_chunks])
print(f"\n==preparing context for LLM call==\n\n{context}")

# Generation
prompt = PromptTemplate.from_template(f'''You are a helpful assistant.
Answer the following question ONLY from the context.
If you do not find the answer, simply respond : 'No Answer Found for your Query'
Context : {context}
Question : {user_query}
''')
print(f"\n==prompt==\n\n{prompt.template}\n")

llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)
response:AIMessage = llm.invoke(prompt.template)
print(f"\n==AI==\n\n{response.content}\n")
```

<op>

==get relevant data from vector store==

[Document(id='e4f5dec1-2637-4a6d-afaf-e98bcaf7c7e5', metadata={}, page_content='Frequent disconnections in wireless printers are resolved by assigning...'), Document(id='88349a03-1f47-4d69-b1d2-044e9e6a1628', metadata={}, page_content='When encountering faded prints, run a printhead cleaning cycle...'), Document(id='b3d63df3-6660-49d0-9da3-bb802bbd6b9d', metadata={}, page_content='Blue screen errors in HP laptops are commonly related to outdated...'), Document(id='f2810cfa-12f7-40d1-82dc-0c8be1754f60', metadata={}, page_content='Wi-Fi connection problems with HP printers are often resolved by restarting...')]

==preparing context for LLM call==

Frequent disconnections in wireless printers are resolved by assigning...

When encountering faded prints, run a printhead cleaning cycle...

Blue screen errors in HP laptops are commonly related to outdated...

Wi-Fi connection problems with HP printers are often resolved by restarting...

==prompt==

You are a helpful assistant.
Answer the following question ONLY from the context.
If you do not find the answer, simply respond : 'No Answer Found for your Query'
Context : Frequent disconnections in wireless printers are resolved by assigning...

When encountering faded prints, run a printhead cleaning cycle...

Blue screen errors in HP laptops are commonly related to outdated...

Wi-Fi connection problems with HP printers are often resolved by restarting...
Question : Explain machine learning in simple words

==AI==

No Answer Found for your Query.

</op>

## RAG using chain

```py:title=Demo_RAG_chain
import os
from langchain_ollama import ChatOllama
from langchain_classic.vectorstores import FAISS
from langchain_classic.prompts import PromptTemplate
from langchain_classic.chains import RetrievalQA
from langchain_ollama import OllamaEmbeddings

embeddings = OllamaEmbeddings(model="mxbai-embed-large")

if os.path.exists("vs2"):
    vs = FAISS.load_local("vs2", embeddings, allow_dangerous_deserialization=True)
else:
    raise Exception("vector store not found")

prompt = PromptTemplate.from_template(
    template='''You are a helpful assistant.
    Answer the following question ONLY from the context.
    If you do not find the answer, simply respond : 'No Answer Found for your Query'
    Context : {context}
    Question : {question}
    '''
)
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vs.as_retriever(filter={"title": 'Document Scanning Guide'}),
    chain_type_kwargs={"prompt": prompt}
)

response = rag_chain.invoke({"query": "When should i replace cartridges?"}, chain_type_kwargs={"input_key": "context"})
print(response)

print("\n==\n")
response = rag_chain.invoke({"query": "Explain machine learning in simple words"}, chain_type_kwargs={"input_key": "context"})
print(response)

```

<op>

{

'query': 'When should i replace cartridges?',

'result': 'According to the context, you should replace cartridges if they cause streaks or lines in printed documents.'

}

==

{

'query': 'Explain machine learning in simple words',

'result': 'No Answer Found for your Query'

}

</op>

### Memory & Source Documents

```py:title=RAG_Chain_with_Memory_and_Sources
import os, time
from langchain_ollama import ChatOllama
from langchain_classic.vectorstores import FAISS
from langchain_classic.prompts import PromptTemplate
from langchain_classic.chains import RetrievalQA
from langchain_ollama import OllamaEmbeddings
from langchain_classic.memory import ConversationBufferMemory

embeddings = OllamaEmbeddings(model="mxbai-embed-large")

if os.path.exists("vs2"):
    vs = FAISS.load_local("vs2", embeddings, allow_dangerous_deserialization=True)
else:
    raise Exception("vector store not found")

prompt = PromptTemplate.from_template(
    template='''You are a helpful assistant.
    Answer the following question ONLY from the Context and the Chat History
    If you do not find the answer, simply respond : 'No Answer Found for your Query'
    Chat History: {chat_history}
    Context : {context}
    Question : {question}
    '''
)

memory = ConversationBufferMemory(
    return_messages=True,
    memory_key='chat_history',
    input_key='question')

llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vs.as_retriever(),
    chain_type_kwargs={"prompt": prompt, "memory":memory},
    return_source_documents=True
)

print("\n==Q1\n")
start_time = time.perf_counter()
response = rag_chain.invoke({"query": "When should i replace cartridges?"})
end_time = time.perf_counter()
elapsed_time = end_time - start_time

print(f"Elapsed time: {elapsed_time:.2f} seconds")
print(f"{response}")

print("\n==Q2\n")
start_time = time.perf_counter()
response = rag_chain.invoke({"query": "Explain machine learning in simple words"})
end_time = time.perf_counter()
elapsed_time = end_time - start_time

print(f"Elapsed time: {elapsed_time:.2f} seconds")
print(f"{response}")

print("\n==Q3\n")

start_time = time.perf_counter()
response = rag_chain.invoke({"query": "What does it cause?"})
end_time = time.perf_counter()
elapsed_time = end_time - start_time

print(f"Elapsed time: {elapsed_time:.2f} seconds")
print(f"{response}")
```

<op>

==Q1

Elapsed time: 24.59 seconds

    {'query': 'When should i replace cartridges?', 'result': 'According to the Context, you should replace cartridges when they cause streaks or lines in printed documents.', 'source_documents': [Document(id='e6e4873c-5aac-452b-8e04-e208a217ae17', metadata={'title': 'Troubleshooting Print Quality', 'page_number': 2, 'section': 'Cartridge Issues', 'device_type': 'HP DeskJet 2700'}, page_content='Title : Troubleshooting Print Quality Content : Streaks or lines in printed documents can be caused by damaged or low-ink cartridges. Replace cartridges and align printhead.'), Document(id='66cb5a53-ee07-421d-b821-f528fac78411', metadata={'title': 'Troubleshooting Print Quality', 'page_number': 1, 'section': 'Maintenance', 'device_type': 'HP DeskJet 2700'}, page_content='Title : Troubleshooting Print Quality Content : Faded or patchy prints usually indicate clogged nozzles. Run a printhead cleaning cycle from the printer control panel or HP Utility software.'), Document(id='ba82bb1d-43cc-4858-ba86-b1c00c591883', metadata={'title': 'Document Scanning Guide', 'page_number': 3, 'section': 'Driver Issues', 'device_type': 'HP ENVY 6000'}, page_content='Title : Document Scanning Guide Content : When scanner fails to initiate, check if TWAIN or WIA driver is missing or outdated. Install HP Scan Extended for compatibility.'), Document(id='26ac7d5a-2aa0-47dc-a9a5-447ceeda5a0d', metadata={'title': 'Document Scanning Guide', 'page_number': 4, 'section': 'Image Quality', 'device_type': 'HP ENVY 6000'}, page_content='Title : Document Scanning Guide Content : If scans are cropped or blurry, verify resolution settings and clean the scanner glass thoroughly.')]}

==Q2

Elapsed time: 32.37 seconds

    {'query': 'Explain machine learning in simple words', 'result': 'No Answer Found for your Query', 'source_documents': [Document(id='66cb5a53-ee07-421d-b821-f528fac78411', metadata={'title': 'Troubleshooting Print Quality', 'page_number': 1, 'section': 'Maintenance', 'device_type': 'HP DeskJet 2700'}, page_content='Title : Troubleshooting Print Quality Content : Faded or patchy prints usually indicate clogged nozzles. Run a printhead cleaning cycle from the printer control panel or HP Utility software.'), Document(id='26ac7d5a-2aa0-47dc-a9a5-447ceeda5a0d', metadata={'title': 'Document Scanning Guide', 'page_number': 4, 'section': 'Image Quality', 'device_type': 'HP ENVY 6000'}, page_content='Title : Document Scanning Guide Content : If scans are cropped or blurry, verify resolution settings and clean the scanner glass thoroughly.'), Document(id='e6e4873c-5aac-452b-8e04-e208a217ae17', metadata={'title': 'Troubleshooting Print Quality', 'page_number': 2, 'section': 'Cartridge Issues', 'device_type': 'HP DeskJet 2700'}, page_content='Title : Troubleshooting Print Quality Content : Streaks or lines in printed documents can be caused by damaged or low-ink cartridges. Replace cartridges and align printhead.'), Document(id='ac9e0324-7000-47c2-a311-f334635705bb', metadata={'title': 'Power and Shutdown Problems', 'page_number': 1, 'section': 'Power Management', 'device_type': 'HP Pavilion x360'}, page_content='Title : Power and Shutdown Problems Content : Unexpected shutdowns in laptops are often related to battery degradation. Run a battery diagnostics tool and check cycle count.')]}

==Q3

Elapsed time: 30.48 seconds

    {'query': 'What does it cause?', 'result': 'Streaks or lines in printed documents.', 'source_documents': [Document(id='e6e4873c-5aac-452b-8e04-e208a217ae17', metadata={'title': 'Troubleshooting Print Quality', 'page_number': 2, 'section': 'Cartridge Issues', 'device_type': 'HP DeskJet 2700'}, page_content='Title : Troubleshooting Print Quality Content : Streaks or lines in printed documents can be caused by damaged or low-ink cartridges. Replace cartridges and align printhead.'), Document(id='ac9e0324-7000-47c2-a311-f334635705bb', metadata={'title': 'Power and Shutdown Problems', 'page_number': 1, 'section': 'Power Management', 'device_type': 'HP Pavilion x360'}, page_content='Title : Power and Shutdown Problems Content : Unexpected shutdowns in laptops are often related to battery degradation. Run a battery diagnostics tool and check cycle count.'), Document(id='66cb5a53-ee07-421d-b821-f528fac78411', metadata={'title': 'Troubleshooting Print Quality', 'page_number': 1, 'section': 'Maintenance', 'device_type': 'HP DeskJet 2700'}, page_content='Title : Troubleshooting Print Quality Content : Faded or patchy prints usually indicate clogged nozzles. Run a printhead cleaning cycle from the printer control panel or HP Utility software.'), Document(id='5d7e515e-a0c7-4fed-8410-43da597db580', metadata={'title': 'Power and Shutdown Problems', 'page_number': 2, 'section': 'Firmware Updates', 'device_type': 'HP Pavilion x360'}, page_content='Title : Power and Shutdown Problems Content : BIOS and firmware updates can resolve erratic power behavior. Ensure latest firmware is applied via HP Support Assistant.')]}

</op>
