---
title: "langchain_classic.prompts"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/01_prompts"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Prompt Techniques

**Definition:**

Prompt techniques are strategies that shape how LLMs produce outputs. They let you:

- Control **tone, style, behavior**
- Inject **dynamic variables** (user input, memory, metadata)
- Maintain **multi-turn context**
- Reuse **prompt logic** across chains, agents, or LangGraph nodes

LangChain provides abstractions like:

- `PromptTemplate` → single-turn prompts
- `ChatPromptTemplate` → multi-turn conversations
- `FewShotPromptTemplate` → example-driven prompting
- `MessagesPlaceholder` → memory injection

## Single-Turn Prompting with `PromptTemplate`

```python
from langchain.prompts import PromptTemplate

prompt = PromptTemplate.from_template("Explain {concept} in simple terms.")
formatted = prompt.format(concept="quantum computing")
print(formatted)
```

🔹 **Use Case:** One-shot tasks → translation, summaries, completions.  
🔹 **Traits:**

- One input → one output
- No memory or multi-turn context
- Can be **zero-shot**, **one-shot**, or **few-shot**

### Types

1. **Zero-Shot Prompting** → Model answers with no examples.  
   _E.g._ “Translate this sentence into French.”
2. **Few-Shot Prompting** → Provide examples to guide style/format.  
   _E.g._ Show 2 Q&A pairs before asking a new question.
3. **Chain-of-Thought Prompting** → Encourage step-by-step reasoning.  
   _E.g._ “Explain your reasoning before giving the final answer.”

---

## Multi-Turn Prompting with `ChatPromptTemplate`

Multi-turn prompting allows the LLM to **remember context** across exchanges.  
It’s the backbone of assistants, agents, and chatbots.

```py
from langchain.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "What is {topic}?")
])

messages = prompt.format_messages(topic="LangChain")
```

🔹 **Use Case:** Conversational agents, tutoring systems, customer support.  
🔹 **Traits:**

- Maintains dialogue history
- Supports role-based messages (system, human, AI)
- Can inject memory with `MessagesPlaceholder`

### Types

1. **Chat Prompting** → Multi-turn dialogue with role-based formatting.
2. **Memory-Aware Chat Prompting** → Uses memory (e.g., `ConversationBufferMemory`) to recall past interactions.

> Templates for one-shots, ChatPrompts for conversations, FewShots for examples, Placeholders for memory.

<br/>
<br/>
<br/>
<br/>

---

- [LangChain Prompt](https://python.langchain.com/docs/modules/model_io/prompts/)
