---
title: "Chain Of Thought - Prompting"
slug: "11_ai/01_applied_gen_ai/06_prompt_engineering/02_techniques/00_single_turn/02_chain_of_thought"
stack: "GenAI"
date: "2025-06-03T07:26:45.889Z"
draft: false
---

## Overview

❓ **What**

**C**hain-**O**f-**T**hought prompting is a technique where the prompt explicitly guides the model to show its reasoning process before arriving at an answer. Instead of jumping straight to a result, the model is encouraged to **think aloud.**

❓ **Why**

It improves performance on tasks requiring multi-step reasoning, such as math, logic, scientific analysis, and decision-making

### Application

| Domain             | Example Task                   | CoT Type Used       |
| ------------------ | ------------------------------ | ------------------- |
| Math & Logic       | Solve equations, word problems | Few-shot, Zero-shot |
| Coding             | Debug or explain code          | Few-shot, PaCoT     |
| Science            | Explain chemical reactions     | Few-shot            |
| Education          | Step-by-step tutoring          | Few-shot            |
| Legal/Medical      | Justify decisions or diagnoses | Self-consistency    |
| Agents & LangGraph | Reason before tool invocation  | PaCoT               |

### Comparison

| Technique            | Description                            | Examples Provided    | Best For                     | LangChain Support                      |
| -------------------- | -------------------------------------- | -------------------- | ---------------------------- | -------------------------------------- |
| **Zero-shot CoT**    | Adds “Let’s think step by step”        | ❌ None              | Quick logic, math            | ✅ `PromptTemplate`, `LLMChain`        |
| **Few-shot CoT**     | Shows reasoning examples               | ✅ Few               | Complex reasoning, tutoring  | ✅ `FewShotPromptTemplate`, `LLMChain` |
| **Self-consistency** | Samples multiple reasoning paths       | ✅ Multiple          | High-stakes logic            | ⚠️ Manual sampling required            |
| **PaCoT**            | Combines reasoning with external tools | ✅ Reasoning + tools | Agents, code, data workflows | ✅ LangGraph, Agents, ToolCalling      |

## With `PromptTemplate`

- Adds a suffix like `Let’s think step by step` to a standard prompt.
- No examples are provided.

```py:title=Zero_SHOT_COT_Prompting
from langchain.prompts import PromptTemplate

# Define a zero-shot prompt with suffix 'Let's think step by step.'
prompt = PromptTemplate.from_template("{input} Let's think step by step.")

print(prompt.format(input="What is 27 multiplied by 43?"))
```

<op>

What is 27 multiplied by 43? Let's think step by step.

</op>

🔹 **Use Case**: Quick logic tasks, math, reasoning without examples.

## With `FewShotPromptTemplate`

- Adds a suffix like `Let’s think step by step` to a standard prompt.
- Adds a prefix like `Answer the following questions with step-by-step reasoning:` to a standard prompt.
- Few examples are provided.

```py:title=Few_SHOT_COT_Prompting
from langchain.prompts import FewShotPromptTemplate, PromptTemplate

#
examples = [
    {"question": "What is 12 + 45?", "reasoning": "12 + 45 = 57", "answer": "57"},
    {"question": "What is 30 × 2?", "reasoning": "30 times 2 equals 60", "answer": "60"}
]

example_prompt = PromptTemplate.from_template(
    "Q: {question} Let's think step by step.\n{reasoning}\nA: {answer}"
)

# Define a few-shot prompt with
## suffix 'Let's think step by step.'
## prefix 'Answer the following questions with step-by-step reasoning:'
few_shot = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="Answer the following questions with step-by-step reasoning:",
    suffix="Q: {user_question}\nLet's think step by step.",
    input_variables=["user_question"]
)

print(few_shot.format(user_question="What is 15 × 4?"))
```

<op>

Answer the following questions with step-by-step reasoning:

Q: What is 12 + 45? Let's think step by step.

12 + 45 = 57

A: 57

Q: What is 30 × 2? Let's think step by step.

30 times 2 equals 60

A: 60

Q: What is 15 × 4? Let's think step by step.

</op>

## Self-Consistency CoT

- Generates multiple reasoning paths and selects the most consistent answer.
- Requires sampling multiple outputs and aggregating.
- LangChain doesn’t have built-in self-consistency sampling, but you can implement it by manually generating multiple outputs and aggregating the final answer.

```py:title=Self_consistency_COT
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_ollama.chat_models import ChatOllama
import collections

# Step 1: Define the CoT prompt
cot_prompt = PromptTemplate.from_template(
    "{question} Let's think step by step."
)

# Step 2: Connect to LLM
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)

# Step 3: Create the chain
cot_chain = LLMChain(llm=llm, prompt=cot_prompt)

# Step 4: Define the question
question = "If a train travels 60 km in 1.5 hours, what is its average speed?"

# Step 5: Generate multiple reasoning paths using invoke()
outputs = []
for _ in range(5):  # Sample 5 paths
    response = cot_chain.invoke({"question": question})
    outputs.append(response["text"].strip())

# Step 6: Extract and aggregate answers
answers = [out.split("Answer:")[-1].strip() if "Answer:" in out else out for out in outputs]
most_common = collections.Counter(answers).most_common(1)[0]

# Step 7: Display results
print("🔍 Reasoning Paths:")
for i, out in enumerate(outputs, 1):
    print(f"{i}. {out}\n")

print(f"✅ Most Consistent Answer: {most_common[0]} (appeared {most_common[1]} times)")
```

✅ Use Case: High-stakes reasoning (e.g., medical diagnosis, legal logic).

<op>

🔍 Reasoning Paths:

1. To find the average speed of the train, we need to divide the distance it traveled (60 km) by the time it took to travel that distance (1.5 hours).

Here are the steps:

1. Write down the formula for average speed: Average Speed = Distance / Time
2. Plug in the values given in the problem: Average Speed = 60 km / 1.5 hours
3. Perform the division: 60 km ÷ 1.5 hours = 40 km/h

Therefore, the average speed of the train is 40 km/h.

2. To find the average speed of the train, we need to divide the distance it traveled (60 km) by the time it took to travel that distance (1.5 hours).

Step 1: Write down the formula for average speed:

Average Speed = Total Distance / Total Time

Step 2: Plug in the values given in the problem:

Total Distance = 60 km
Total Time = 1.5 hours

Step 3: Divide the total distance by the total time to find the average speed:

Average Speed = 60 km / 1.5 hours
= 40 km/h

Therefore, the average speed of the train is 40 km/h.

3. To find the average speed of the train, we need to divide the distance it traveled (60 km) by the time it took to travel that distance (1.5 hours).

Step 1: Write down the formula for average speed:

Average Speed = Total Distance / Time

Step 2: Plug in the values given in the problem:

Average Speed = 60 km / 1.5 hours

Step 3: Divide the distance by the time to find the average speed:

Average Speed = 40 km/h

Therefore, the train's average speed is 40 kilometers per hour (km/h).

4. To find the average speed of the train, we need to divide the distance traveled (60 km) by the time taken (1.5 hours).

Step 1: Write down the formula for average speed:

Average Speed = Total Distance / Time Taken

Step 2: Plug in the values given in the problem:

Average Speed = 60 km / 1.5 hours

Step 3: Perform the division to find the average speed:

Average Speed = 40 km/h

Therefore, the average speed of the train is 40 km/h.

5. To find the average speed of the train, we need to divide the distance it traveled (60 km) by the time it took to travel that distance (1.5 hours).

Average speed = Distance / Time
= 60 km / 1.5 hours
= 40 km/h

So, the average speed of the train is 40 km/h.

✅ Most Consistent Answer: To find the average speed of the train, we need to divide the distance it traveled (60 km) by the time it took to travel that distance (1.5 hours).

Here are the steps:

1. Write down the formula for average speed: Average Speed = Distance / Time
2. Plug in the values given in the problem: Average Speed = 60 km / 1.5 hours
3. Perform the division: 60 km ÷ 1.5 hours = 40 km/h

Therefore, the average speed of the train is 40 km/h. (appeared 1 times)

</op>

### How It Works

- Adds “Let’s think step by step” to encourage reasoning.
- Samples multiple outputs using the same prompt.
- Extracts final answers and selects the most frequent one.

### Application

| Domain    | Example Task                      |
| --------- | --------------------------------- |
| Medical   | Diagnosing symptoms               |
| Legal     | Interpreting clauses or rulings   |
| Math      | Word problems with multiple steps |
| Education | Tutoring with consistent logic    |
| Agents    | Tool selection based on reasoning |

## Program-aided CoT (PaCoT)

- Combines reasoning with external tools (e.g., calculators, code interpreters).
- Often used in agents or LangGraph workflows.

✅ Use Case: Code generation, data analysis, tool-calling agents.

### How it works

In LangGraph or agent workflows, PaCoT is often implemented as:

- Step 1: Prompt with CoT reasoning
- Step 2: Extract actionable expression
- Step 3: Call tool (calculator, Python REPL, API)
- Step 4: Return verified result

Here’s a LangChain-style implementation using a simple calculator function as the external tool:

```py:title=PaCoT
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_ollama.chat_models import ChatOllama

# Step 1: Define the CoT prompt
prompt = PromptTemplate.from_template(
    "You are solving a math problem. Think step by step and extract the final expression to compute.\n"
    "Problem: {question}\n"
    "Reasoning:"
)

# Step 2: Connect to LLM
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)

# Step 3: Create the chain
cot_chain = LLMChain(llm=llm, prompt=prompt)

# Step 4: Define the question
question = "A car travels 80 km at 40 km/h and then 60 km at 60 km/h. What is the average speed?"

# Step 5: Get model reasoning
response = cot_chain.invoke({"question": question})
reasoning = response["text"].strip()
print("🧠 Model Reasoning:\n", reasoning)

# Step 6: Extract expression (manual or regex-based)
# For demo, assume model ends with: "Total time = 2 + 1 = 3 hours. Total distance = 140 km. Average speed = 140 / 3"
expression = "140 / 3"

# Step 7: Use external tool (calculator)
result = eval(expression)
print(f"🧮 Computed Answer: {result:.2f} km/h")
```

<op>

🧠 Model Reasoning:
To find the average speed, we need to calculate the total distance traveled and the total time taken.

Step 1: Calculate the time taken for each part of the journey:

Time = Distance / Speed

For the first part: Time1 = 80 km / 40 km/h = 2 hours

For the second part: Time2 = 60 km / 60 km/h = 1 hour

Step 2: Calculate the total distance traveled:

Total distance = 80 km + 60 km = 140 km

Step 3: Calculate the total time taken:

Total time = Time1 + Time2 = 2 hours + 1 hour = 3 hours

Step 4: Calculate the average speed using the formula:

Average Speed = Total Distance / Total Time

= 140 km / 3 hours

= 46.67 km/h

The final expression to compute is:

Total Distance / Total Time = 140 km / 3 hours

🧮 Computed Answer: 46.67 km/h

</op>

### Application

| Domain        | Example Task                                |
| ------------- | ------------------------------------------- |
| Math          | Word problems, averages, rates              |
| Coding        | Generate and execute Python snippets        |
| Data Analysis | Parse and compute from structured data      |
| Agents        | Reason → call tool → verify → respond       |
| LangGraph     | Node-based orchestration with tool chaining |
