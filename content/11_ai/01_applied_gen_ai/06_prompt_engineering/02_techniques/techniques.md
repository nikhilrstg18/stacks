---
title: "Prompt -Techniques"
slug: "11_ai/01_applied_gen_ai/06_prompt_engineering/02_techniques"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## What?

Prompt techniques are strategies used to guide language models toward desired outputs. They help you:

- Control tone, style, and behavior
- Inject dynamic variables (e.g., user input, memory)
- Maintain multi-turn context
- Reuse prompt logic across chains, agents, or LangGraph nodes

LangChain makes this powerful through abstractions like `PromptTemplate`, `ChatPromptTemplate`, `FewShotPromptTemplate`, and `MessagesPlaceholder`.

## Single-Turn Prompting with `PromptTemplate`

Provides no examples. The model generates a response purely based on its pre-trained knowledge.

```python
from langchain.prompts import PromptTemplate

prompt = PromptTemplate.from_template("Explain {concept} in simple terms.")
formatted = prompt.format(concept="quantum computing")
print(formatted)
```

🔹 **Use Case**: One-shot tasks like translation, summaries, completions.

**Key Traits:**

- One input → one output
- Can be zero-shot, one-shot, or few-shot
- No memory or multi-turn context

### Types

1. Zero Shot
2. Few Shot
3. Chain of Thought

## Multi-turn Prompting with `ChatPromptTemplate`

Multi-turn chat prompting enables LLMs to maintain context across multiple user inputs and model responses.
It’s the foundation for assistants, agents, and chatbot that feel coherent and responsive over time.

### Types

1. Chat Prompting
2. Memory-aware Chat Prompting

Learn More @ [LangChain Prompt](https://python.langchain.com/docs/modules/model_io/prompts/)
