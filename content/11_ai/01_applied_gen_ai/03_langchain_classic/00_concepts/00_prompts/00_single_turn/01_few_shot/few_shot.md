---
title: "langchain_classic.prompts - Few Shot"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/00_prompts/00_single_turn/01_few_shot"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Using `FewShotPromptTemplate`

Provides few examples in the prompt to demonstrate the desired input-output pattern.

**Use Case**: Classification, reasoning, structured Q&A with examples.

```py:title=Few_Shot_Prompting
from langchain_classic.prompts import FewShotPromptTemplate, PromptTemplate

examples = [
    {"question": "What is AI?", "answer": "AI stands for Artificial Intelligence."},
    {"question": "What is ML?", "answer": "ML stands for Machine Learning."}
]

example_prompt = PromptTemplate.from_template("Q: {question}\nA: {answer}")

few_shot = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="Answer the following questions:",
    suffix="Q: {user_question}\nA:",
    input_variables=["user_question"]
)

print(few_shot.format(user_question="What is NLP?"))
```

<op>

Answer the following questions:

Q: What is AI?

A: AI stands for Artificial Intelligence.

Q: What is ML?

A: ML stands for Machine Learning.

Q: What is NLP?

A:

</op>

This is **static** — the same examples are always used.

## Extending with `example_selector`

LangChain provides selectors like `SemanticSimilarityExampleSelector` that pick examples dynamically from a pool based on the input query.

```py:title=Few_Shot_Prompting_With_Example_Selector
from langchain.prompts import FewShotPromptTemplate, PromptTemplate
from langchain.prompts.example_selector import SemanticSimilarityExampleSelector
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

# Example pool
examples = [
    {"question": "What is AI?", "answer": "AI stands for Artificial Intelligence."},
    {"question": "What is ML?", "answer": "ML stands for Machine Learning."},
    {"question": "What is NLP?", "answer": "NLP stands for Natural Language Processing."},
    {"question": "What is DL?", "answer": "DL stands for Deep Learning."},
]

# Prompt template for examples
example_prompt = PromptTemplate.from_template("Q: {question}\nA: {answer}")

# Build selector: choose top-k semantically similar examples
example_selector = SemanticSimilarityExampleSelector.from_examples(
    examples,
    OpenAIEmbeddings(),   # embedding model
    FAISS,                # vector store backend
    k=2                   # number of examples to select
)

# FewShotPromptTemplate with dynamic selector
few_shot_selector = FewShotPromptTemplate(
    example_selector=example_selector,
    example_prompt=example_prompt,
    prefix="Answer the following questions:",
    suffix="Q: {user_question}\nA:",
    input_variables=["user_question"],
)

# Demo: input is about NLP
print(few_shot_selector.format(user_question="Explain NLP basics"))

# Demo: input is about NLP
print(few_shot_selector.format(user_question="Explain DL basics"))
```

<op>

Answer the following questions:

Q: What is NLP?

A: NLP stands for Natural Language Processing.

Q: What is ML?

A: ML stands for Machine Learning.

Q: Explain NLP basics

A:

Answer the following questions:

Q: What is DL?

A: DL stands for Deep Learning.

Q: What is ML?

A: ML stands for Machine Learning.

Q: Explain DL basics

A:

</op>

**What Happens**

- Run1: Instead of always showing `AI` + `ML`, the selector finds the **closest examples** to `"Explain NLP basics"`.
- Run2: Instead of always showing `AI` + `ML`, the selector finds the **closest examples** to `"Explain DL basics"`.

---

### Static vs Dynamic Few-Shot Prompting

| Approach             | How It Works                                                                              | Pros                                                                                   | Cons                                                        | Best Use Case                                                  |
| -------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| **Static Few-Shot**  | Always injects the same fixed examples into the prompt                                    | - Simple to set up<br>- Predictable outputs                                            | - Examples may not match user query<br>- Prompt grows large | Demos, controlled tasks, teaching consistent format            |
| **Dynamic Few-Shot** | Uses `example_selector` to choose examples at runtime (e.g., semantic similarity, length) | - Contextually relevant<br>- Keeps prompt concise<br>- Scales with large example pools | - Requires embeddings/vector store<br>- Slightly more setup | Production apps, retrieval-based assistants, adaptive tutoring |

> Static = same every time, Dynamic = smart selection.

This way you can decide:

- **Static** when you want consistency and simplicity.
- **Dynamic** when you want adaptability and relevance.
