---
title: "langchain_classic.prompts - Few Shot"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/00_prompts/00_single_turn/01_few_shot"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Using `FewShotPromptTemplate`

Provides few examples in the prompt to demonstrate the desired input-output pattern.

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

🔹 **Use Case**: Classification, reasoning, structured Q&A with examples.

### Example Selectors
