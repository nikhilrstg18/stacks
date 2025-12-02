---
title: "langgraph.graph - Graph RAG"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/08_retrieval_augmented_generation/04_graph_rag"
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
</style>

## What is GraphRAG?

- **GraphRAG** integrates **graph-based knowledge representation** with Retrieval-Augmented Generation.
- Instead of treating documents as flat chunks, it builds a **knowledge graph** (nodes = entities, edges = relationships).
- The LLM can then **reason over connections**: not just “retrieve text,” but “understand relationships” (e.g., cause-effect, hierarchy, dependency).
- This enables **multi-hop reasoning** across entities, which is critical for complex domains like research, compliance, or enterprise knowledge bases.

### Evolution

- **RetrievalQA** → single-shot retrieval, fast but shallow.
- **Agent**→ adds reasoning loops and tool orchestration.
- **Agentic RAG**→ adds governance, guardrails, and oversight for enterprise reliability.
- **GraphRAG**→ adds structured knowledge graphs, enabling multi-hop reasoning, richer context, and explainability.

**GraphRAG matters because:**

- It reduces **hallucinations** by grounding answers in explicit relationships.
- It improves **explainability**: you can trace the reasoning path through the graph.
- It **supports complex queries** like “How does regulation X affect process Y across departments Z and W?”
- It’s **scalable**: graphs can unify multiple knowledge sources (documents, databases, APIs).

======================

| Approach        | How It Works                                                                                             | Strengths                                                                                    | Limitations                                                                                    | Best Use Cases                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **RetrievalQA** | Retrieves once from the knowledge base and directly answers based on context                             | ✅ Fast and simple<br>✅ Clean pipeline<br>✅ Low compute cost                               | ❌ Limited reasoning<br>❌ No multi‑step planning<br>❌ Less flexible                          | Straightforward Q&A, FAQ bots, quick lookups                                                        |
| **Agent**       | Uses `ReAct` reasoning loop to decide which tools to call; may retrieve multiple times before finalizing | ✅ Handles multi‑step reasoning<br>✅ Can chain tools<br>✅ More adaptive                    | ❌ Slower (multiple calls)<br>❌ Can over‑retrieve<br>❌ Needs iteration limits                | Complex queries, troubleshooting workflows, tool orchestration                                      |
| **Agentic RAG** | Combines RAG with agent planning, guardrails, and human oversight                                        | ✅ Robust and trustworthy<br>✅ Compliance‑aware<br>✅ Adaptive strategies                   | ❌ More complex to design<br>❌ Higher overhead<br>❌ Requires governance                      | Enterprise assistants, compliance‑aware chatbots, regulated industries (finance, healthcare, legal) |
| **GraphRAG**    | Builds a knowledge graph of entities and relationships, retrieves and reasons over multi-hop connections | ✅ Richer context<br>✅ Multi-hop reasoning<br>✅ Explainable answers<br>✅ Scales knowledge | ❌ Graph construction overhead<br>❌ Needs graph maintenance<br>❌ More complex infrastructure | Research assistants, compliance analysis, enterprise knowledge graphs, scientific discovery, audits |

### Demo

Let see how to define `nodes`, connect them with `edges`, `compile` the `graph`, `visualize` it, and `run` a simple conversation

```py:title=One_Node_LangGraph_Pipeline
from langgraph.graph import StateGraph, MessagesState, START, END

def mock_llm(state: MessagesState):
    return {"messages": [{"role": "ai", "content": "hello world"}]}

graph = StateGraph(MessagesState)
graph.add_node(mock_llm)
graph.add_edge(START, "mock_llm")
graph.add_edge("mock_llm", END)
graph = graph.compile()

# Render ASCII for simple rendering
print(graph.get_graph().draw_ascii())

response = graph.invoke({"messages": [{"role": "user", "content": "hi!"}]})

print(f"\nmessages:")
for msg in response['messages']:
    print(f"\n  {msg.type}-> {msg.content}")
```

- `StateGraph` is the builder for stateful workflows.
- `MessagesState` is a predefined schema for chat messages.
- `START` and `END` are special markers for graph entry and exit.

```
+-----------+
| __start__ |
+-----------+
     |
     |
     |
+----------+
| mock_llm |
+----------+
     |
     |
     |
 +---------+
 | __end__ |
 +---------+
```

<op>

messages:

human-> hi!

ai-> hello world

</op>

## Task

1. **Load & Split Data** – Read `knowledge_base.txt` and chunk text.
2. **Embed & Index** – Create embeddings and store in FAISS.
3. **Retriever Setup** – Configure retriever to return top‑3 docs.
4. **State Schema** – Define `MyState` with query, docs, validated, answer.
5. **Nodes** –
   - Retrieval: fetch docs
   - Validation: check relevance
   - Generation: produce answer with LLM
   - Default: fallback response
6. **Graph Build** – Connect nodes with conditional edges and compile.
7. **Run & Test** – Invoke with queries, print answers.

```py:title=Document_QA_Pipeline_using_LangGraph_and_FAISS
from langchain_classic.document_loaders import TextLoader
from langchain_classic.text_splitter import RecursiveCharacterTextSplitter
from langchain_classic.vectorstores import FAISS

# Load & Split Data
loader = TextLoader("knowledge_base.txt")
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
doc_chunks = splitter.split_documents(docs)

# Embed & Index
embeddings = OllamaEmbeddings(model="mxbai-embed-large")
vs = FAISS.from_documents(doc_chunks, embeddings)

# Retriever Setup
retriever = vs.as_retriever(kwargs={ "k": 3 })

# State Schema
from typing import TypedDict, Annotated

class MyState(TypedDict):
    query: str
    docs: Annotated[list, "append"]
    validated: bool
    answer: str

# Nodes
from langgraph.graph import StateGraph, END
import numpy as np

def retrieval_node(state: MyState) -> MyState:
    query = state["query"]
    docs = retriever.invoke(query)  # your retriever
    return {"docs": docs, "query": query}

SIMILARITY_THRESHOLD = 0.7

def validate_relevance(query: str, docs: list) -> bool:
    query_emb = embeddings.embed_query(query)
    doc_texts = [doc.page_content for doc in docs]
    doc_embs = embeddings.embed_documents(doc_texts)

    def cos_sim(a, b):
        a, b = np.array(a), np.array(b)
        denom = np.linalg.norm(a) * np.linalg.norm(b)
        return float(np.dot(a, b) / denom) if denom else 0.0

    similarities = [cos_sim(query_emb, d_emb) for d_emb in doc_embs]
    return any(sim >= SIMILARITY_THRESHOLD for sim in similarities)

def validation_node(state: MyState) -> MyState:
    validated = validate_relevance(state["query"], state.get("docs", []))
    return {"validated": validated}

llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100,
)
def generation_node(state: MyState) -> MyState:
    context = "\n".join(doc.page_content for doc in state["docs"])
    prompt = f"Context:\n{context}\n\nQuestion: {state['query']}\nAnswer:"
    response_msg = llm.invoke(prompt)
    answer = response_msg.content if hasattr(response_msg, "content") else str(response_msg)
    return {"answer": answer}

def default_node(state: MyState) -> MyState:
    return {"answer": "Validation failed: no relevant docs found."}

# --- Graph Build ---
builder = StateGraph(MyState)
builder.add_node("retrieval", retrieval_node)
builder.add_node("validation", validation_node)
builder.add_node("generation", generation_node)
builder.add_node("default", default_node)

builder.set_entry_point("retrieval")
builder.add_edge("retrieval", "validation")

def route_validation(state: MyState) -> str:
    return "generation" if state.get("validated") else "default"

builder.add_conditional_edges(
    source="validation",
    path=route_validation,
    path_map={
        "generation": "generation",
        "default": "default",
    },
)

builder.add_edge("generation", END)
builder.add_edge("default", END)

app = builder.compile()

print(app.get_graph().draw_ascii())

```

```
           +-----------+
           | __start__ |
           +-----------+
                 *
                 *
                 *
           +-----------+
           | retrieval |
           +-----------+
                 *
                 *
                 *
          +------------+
          | validation |
          +------------+
          ...         ...
         .               .
       ..                 ..
+---------+           +------------+
| default |           | generation |
+---------+           +------------+
          ***         ***
             *       *
              **   **
            +---------+
            | __end__ |
            +---------+

```

```py:title=Run_With_Invoke
query = "What does LangGraph do?"
final_state = app.invoke({"query": query})
print("Question:", query)
print("Answer:", final_state.get("answer"))

```

<op>

Question: What does LangGraph do?

Answer: Validation failed: no relevant docs found.

</op>

```py:title=Run_With_Stream
query = "Why does my HP printer disconnect??"

print(f"Query: {query}")
print("-" * 40)

for step in app.stream({"query": query}):
    for node_name, node_output in step.items():
        print(f"Node: {node_name}")
        for key, value in node_output.items():
            print(f"  {key}: {value}")
        print("-" * 40)

```

<op>

Query: Why does my HP printer disconnect??

---

Node: retrieval

docs: [Document(id='ab851ab7-ae5d-49b9-90a6-2bf214abd189', metadata={'source': 'knowledge_base.txt'}, page_content='If your HP laptop shuts down randomly, check battery health...\nThe HP Smart app may fail to detect the printer if the firewall...'), Document(id='1d5385bf-0d1d-46f9-a728-be7b492aa16a', metadata={'source': 'knowledge_base.txt'}, page_content='The HP LaserJet Pro M404dn often encounters paper jam issues in Tray 2...\nWi-Fi connection problems with HP printers are often resolved by restarting...'), Document(id='8c71910f-5b08-4572-b48f-f1f1707c3db9', metadata={'source': 'knowledge_base.txt'}, page_content='Frequent disconnections in wireless printers are resolved by assigning...\nWhen encountering faded prints, run a printhead cleaning cycle...'), Document(id='0fb15bd9-3fc1-4489-8784-5937fa1f53b7', metadata={'source': 'knowledge_base.txt'}, page_content='HP printers often disconnect from Wi-Fi due to DHCP IP issues.\nAssigning a static IP address stabilizes wireless connections.')]

query: Why does my HP printer disconnect??

---

Node: validation

validated: True

---

Node: generation

answer: Your HP printer may disconnect due to DHCP IP issues. Assigning a static IP address can stabilize your wireless connection and prevent disconnections.

---

</op>
