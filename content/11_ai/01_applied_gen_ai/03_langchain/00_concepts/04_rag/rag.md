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
