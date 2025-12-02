---
title: "Single Turn - Prompting"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/01_prompts/00_single_turn"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Prompting Techniques Cheat Sheet

### Core Techniques

| Technique            | Key Trait                           | LangChain Abstraction                                 |
| -------------------- | ----------------------------------- | ----------------------------------------------------- |
| **Single-turn**      | One input → one output, no memory   | `PromptTemplate`, `LLMChain`                          |
| **Zero-shot**        | No examples, relies on instructions | `PromptTemplate`, `LLMChain`                          |
| **One-shot**         | One guiding example                 | `FewShotPromptTemplate` (with 1 example)              |
| **Few-shot**         | Multiple examples guide behavior    | `FewShotPromptTemplate`, `LLMChain`                   |
| **Chain-of-Thought** | Encourages reasoning aloud          | `PromptTemplate`, `FewShotPromptTemplate`, `LLMChain` |
| **Multi-turn**       | Maintains dialogue context          | `ChatPromptTemplate`, `MessagesPlaceholder`           |

### How to Choose

- **Fast prototyping** → Zero-shot
- **High accuracy with examples** → Few-shot
- **Lightweight task execution** → Single-turn
- **Structured extraction** → One-shot or Few-shot
- **Conversational agents** → Multi-turn with memory

### Real-Time Applications

| Application          | Technique(s) Used                          |
| -------------------- | ------------------------------------------ |
| Educational Tutor    | ChatPrompt + Memory + FewShot              |
| Customer Support Bot | ChatPrompt + EntityMemory                  |
| DevOps Assistant     | PromptTemplate + Tool Calling              |
| LangGraph Workflows  | ChatPrompt + MessagesPlaceholder           |
| Multi-Agent Systems  | Role-based SystemMessage + Dynamic Routing |

> Single for scripts, Zero for speed, One for structure, Few for accuracy, Chain for reasoning, Chat for memory.

---

This way you can **map technique → trait → LangChain abstraction → real-world use case** in seconds.

I can also scaffold a **visual decision tree** (text diagram) that shows _which technique to pick based on your goal_ — would you like me to lay that out?

❓ **Why use `ChatPromptTemplate` over `PromptTemplate`?**

**A**: `ChatPromptTemplate` supports multi-turn formatting with system, human, and AI roles—ideal for chat-based models.

---

❓ **How do I inject memory into prompts?**

**A**: Use `MessagesPlaceholder(variable_name="history")` and pair it with memory like `ConversationBufferMemory`.

---

❓ **Can I reuse prompts across chains or agents?**

**A**: Yes. Prompts are modular and can be reused across `LLMChain`, `ConversationChain`, or LangGraph nodes.

---

❓ **How do I debug prompt behavior?**

**A**: Use `.format()` or `.format_messages()` to inspect the final prompt before sending it to the model.

---

❓ **How do I control tone or style?**

**A**: Use `SystemMessagePromptTemplate` to set behavior (e.g., “You are a sarcastic assistant” or “You reply like a doctor”).
