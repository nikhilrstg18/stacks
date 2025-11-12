---
title: "langchain_classic.prompts - Zero Shot"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/00_prompts/00_single_turn/00_zero_shot"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## With `PromptTemplate`

```py:title=Zero_Shot_Prompting
from langchain_classic.prompts import PromptTemplate

# Define a zero-shot prompt with no examples
zero_shot = PromptTemplate.from_template(
    "Answer the following question clearly and concisely:\nQ: {user_question}\nA:"
)

# Format the prompt with a new question
print(zero_shot.format(user_question="What is NLP?"))
```

<op>

Answer the following question clearly and concisely:

Q: What is NLP?

A:
</op>

🔹 **Use Case**: Quick tasks like classification, explanation, or completion without needing prior examples.
