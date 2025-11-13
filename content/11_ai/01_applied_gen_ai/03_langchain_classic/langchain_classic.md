---
title: "Intro to langchain_classic"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Why LangChain

Founded in **2022 by Harrison Chase**, LangChain fixes what raw LLMs lack: **memory, tools, and context**.

It provides a framework to:

- Connect LLMs with **external tools & data**
- Manage **multi-step workflows**
- Add **memory, chaining, and retrieval**

### Why it matters

LangChain fills critical gaps:

| Gap           | What it adds         | Quick Example                      |
| ------------- | -------------------- | ---------------------------------- |
| Memory        | Remembers context    | HR bot recalls employee queries    |
| Tools         | API/DB access        | Finance bot fetches stock data     |
| RAG           | Document grounding   | Audit bot answers from policy PDFs |
| Agents        | Multi-step reasoning | Procurement bot compares vendors   |
| Observability | Debug & track        | LangSmith logs prompts & outputs   |

> Think of LangChain as the **operating system for LLM apps** — it makes them practical, reliable, and enterprise-ready.

## Intro

- **LangChain** = _Language_ + _Chain_ → connects LLMs with data, tools, and environments.
- **Framework powers apps that are**:
  - **Reason-based** → model decides actions based on context.
  - **Context-aware** → grounded in prompts, examples, or external data.

### Evolution Snapshot

| Year | Milestone             | Essence                    |
| ---- | --------------------- | -------------------------- |
| 2022 | Initial Release       | Prompt chaining + memory   |
| 2023 | Tool Integration      | APIs, DBs, search          |
| 2024 | LangGraph & LangSmith | Agents + observability     |
| 2025 | Modular Ecosystem     | Core split for flexibility |

> Prompts in 2022, Tools in 2023, Agents in 2024, Ecosystem in 2025.

👉 In short: LangChain grew from a **prompt chaining library** into a **modular GenAI operating system** for scalable, production-ready apps.

## Architecture

![Langchain Architecture - Modular • Scalable • Enterprise-Ready](../../../../src/images/11_ai/01_agen_ai/agi-21i.png)

**🏔️ The Mountain Climb Analogy**

- Basecamp `Core` → You start with langchain-core, the foundation tools and interfaces.
- Trail `Chains` → You climb using langchain, building chains, agents, and RAG pipelines.
- Bridge `Integrations` → You cross bridges with openai/community connectors, linking to models and tools.
- Camp `Graph` → You set up camp with langgraph, orchestrating workflows and agent states.
- Summit `Serve` → You reach the summit with langserve, exposing your app via REST APIs.
- Viewpoint `Smith` → Finally, you enjoy the panoramic view with langsmith, observing, debugging, and evaluating.

> Core lays the base, Chains climb, Connectors bridge, Graph camps, Serve peaks, Smith observes the view.
> Core builds Chains, Connectors link, Graphs orchestrate, Serve deploys, Smith observes.

    🏔️ Summit View
    ┌───────────────┐
    │   LangSmith   │ → Observes (debug, test, eval)
    ├───────────────┤
    │   LangServe   │ → Deploys (REST APIs)
    ├───────────────┤
    │   LangGraph   │ → Orchestrates (agent workflows)
    ├───────────────┤
    │ Integrations  │ → Bridges (OpenAI, community tools)
    ├───────────────┤
    │   LangChain   │ → Climbs (chains, agents, RAG)
    ├───────────────┤
    │ langchain-core│ → Basecamp (foundation interfaces)
    └───────────────┘

### Real-World Use Cases

- **Healthcare** → triage bots that _remember_ patient history
- **Legal** → contract review agents using _RAG + tools_
- **Finance** → portfolio assistants with _live market data_
- **Education** → adaptive tutors that _track student progress_
- **Enterprise Ops** → internal copilots for _release readiness, docs, compliance_

> Think of it as: **“Care, Law, Money, Learn, Ops”** — five pillars where LangChain makes LLMs practical.

Here’s a **compact, easy-to-remember cheat sheet** for LangChain’s core components:

---

## LangChain Core Components

1. **Models & Prompts** - Think : `Ask smartly`

   - _Models_: Call LLMs (OpenAI, Anthropic, HuggingFace).
   - _Prompts_: Reusable templates with dynamic inputs.
     👉 Example: Auto-generate release notes from metadata.

2. **Chains** - Think : `Steps in a pipeline`

   - _LLMChain_: Prompt → Model.
   - _SequentialChain_: Multi-step pipeline.
   - _RouterChain_: Route based on input.
   - _Runnables_: Modern chaining abstraction.  
     👉 Example: Summarize logs → compliance report → email stakeholders.

3. **Tools & Agents** - Think : `LLM with hands + brain`

   - _Tools_: External functions (search, DB, calculator).
   - _Agents_: Decide which tools to use.  
     👉 Example: Pricing bot queries API + drafts recommendation.

4. **Memory** - Think : `LLM that remembers`

   - _ConversationBufferMemory_: Stores recent dialogue.
   - _EntityMemory_: Tracks entities across sessions.  
     👉 Example: Assistant recalls flagged environments in past test cycles.

5. **Retrievers & Vector Stores** - Think : `Find the right page fast`

   - _Retrievers_: Pull relevant docs.
   - _Vector Stores_: Embedding-based search (FAISS, Pinecone).  
     👉 Example: Find Jira tickets or Confluence pages about blockers.

6. **Document Loaders** - Think : `Get data in`

   - Ingest PDFs, HTML, CSV, APIs.  
     👉 Example: Load SIT/Stage/Prod specs into vector store.

7. **LangGraph (Advanced)** - Think : `LLM flowchart engine`
   - Stateful, branching workflows.  
     👉 Example: Agent validates CFO scope → checks readiness → escalates blockers.

> Models prompt, Chains flow, Tools act, Memory recalls, Retrievers fetch, Loaders prep, Graphs orchestrate.

<br/>
<br/>
<br/>
<br/>

---

- [LangChain Cookbook](https://github.com/langchain-ai/langchain-cookbook)
- [Why Langchain?](https://python.langchain.com/docs/concepts/why_langchain/)
