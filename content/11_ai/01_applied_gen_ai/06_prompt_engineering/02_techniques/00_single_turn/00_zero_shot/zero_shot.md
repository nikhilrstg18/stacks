---
title: "Zero Shot - Prompting"
slug: "11_ai/01_applied_gen_ai/06_prompt_engineering/02_techniques/00_single_turn/00_zero_shot"
stack: "GenAI"
date: "2025-06-03T07:26:45.889Z"
draft: false
---

## With `PromptTemplate`

```py:title=Zero_Shot_Prompting
from langchain.prompts import PromptTemplate

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
