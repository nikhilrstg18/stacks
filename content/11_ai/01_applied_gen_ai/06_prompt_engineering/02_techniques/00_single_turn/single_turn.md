---
title: "Single Turn - Prompting"
slug: "11_ai/01_applied_gen_ai/06_prompt_engineering/02_techniques/00_single_turn"
stack: "GenAI"
date: "2025-06-03T07:26:45.889Z"
draft: false
---

### Comparison

| Technique            | Description                                                          | Examples Provided | Context Retention | LangChain Support                                        |
| -------------------- | -------------------------------------------------------------------- | ----------------- | ----------------- | -------------------------------------------------------- |
| **Single-turn**      | One isolated prompt with no memory or history                        | Optional          | ❌ No             | ✅ `PromptTemplate`, `LLMChain`                          |
| **Zero-shot**        | Model performs task without any examples—relies on instructions only | ❌ None           | ❌ No             | ✅ `PromptTemplate`, `LLMChain`                          |
| **Few-shot**         | Multiple examples are provided to guide model behavior               | ✅ Few            | ❌ No             | ✅ `FewShotPromptTemplate`, `LLMChain`                   |
| **Chain Of Thought** | Boosts performance & model is encouraged to think aloud.             | Optional          | ❌ No             | ✅ `PromptTemplate`, `FewShotPromptTemplate`, `LLMChain` |

📌 You can implement **One-Shot** using `FewShotPromptTemplate` with 1 example

### Application

| Technique       | Real-Time Use Case   | Example Scenario                                             |
| --------------- | -------------------- | ------------------------------------------------------------ |
| **Single-turn** | DevOps assistant     | "Generate a bash script to restart Kafka safely"             |
| **Zero-shot**   | Customer support bot | "Classify this complaint as billing, technical, or general"  |
| **One-shot**    | Resume parser        | "Extract name and email from this resume" (with one example) |
| **Few-shot**    | Educational tutor    | "Answer math questions using step-by-step reasoning"         |
| **Few-shot**    | Sentiment classifier | "Classify reviews as positive, neutral, or negative"         |
| **Zero-shot**   | Tool-calling agent   | "Book a meeting for tomorrow at 3 PM"                        |
| **Single-turn** | Content generator    | "Write a 3-line summary of LangChain"                        |

### How to Choose

| Goal                        | Best Technique       |
| --------------------------- | -------------------- |
| Fast prototyping            | Zero-shot            |
| High accuracy with examples | Few-shot             |
| Lightweight task execution  | Single-turn          |
| Structured extraction       | One-shot or few-shot |

### 🎯 Real-Time Applications

| Application          | Prompt Technique Used                      |
| -------------------- | ------------------------------------------ |
| Educational Tutor    | ChatPrompt + Memory + FewShot              |
| Customer Support Bot | ChatPrompt + EntityMemory                  |
| DevOps Assistant     | PromptTemplate + Tool Calling              |
| LangGraph Workflows  | ChatPrompt + MessagesPlaceholder           |
| Multi-Agent Systems  | Role-based SystemMessage + Dynamic Routing |

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
