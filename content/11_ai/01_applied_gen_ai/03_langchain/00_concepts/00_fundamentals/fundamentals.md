---
title: "Fundamentals - Langchain"
slug: "11_ai/01_applied_gen_ai/03_langchain/00_concepts/00_fundamentals"
stack: "GenAI"
date: "2025-06-03T07:26:45.889Z"
draft: false
---

> Best learning is by doing

- Since invoking LLMs comes with cost to run, for demo we will use local setup

1. [ollama](https://ollama.com/) allows you to `Chat & build with open models` on you local machine.
   - [Integration Details](https://python.langchain.com/docs/integrations/chat/ollama/#integration-details)
   - [Model Features](https://python.langchain.com/docs/integrations/chat/ollama/#model-features)
2. [Model Library](https://github.com/ollama/ollama?tab=readme-ov-file#model-library)], can help you decide which models to use based on your machine and memory.

## Environment Setup

1. Set up and run a local Ollama instance: [Instructions](https://github.com/ollama/ollama?tab=readme-ov-file#ollama)
   - Download and install
   - Once installed, verify by executing `> ollama` in cmd
2. Pull a model you your choice: [Instructions](https://github.com/ollama/ollama?tab=readme-ov-file#pull-a-model)
   - cmd `> ollama pull llama3.2`
3. List models on you computer: [Instructions](https://github.com/ollama/ollama?tab=readme-ov-file#list-models-on-your-computer)
   - cmd `> ollama list`
4. Run a model : [Instructions](https://github.com/ollama/ollama?tab=readme-ov-file#pass-the-prompt-as-an-argument)
   - cmd `> ollama run llama3.2`
5. Setup you computer to run notebook with python and ipykernel installed

## Notebook

1. We start be checking if the model to use is available.

```py:title=Simple_LLM_App
!ollama list
```

<op>

NAME ID SIZE MODIFIED  
mxbai-embed-large:latest 468836162de7 669 MB 12 days ago  
llama3.2:latest a80c4f17acd5 2.0 GB 12 days ago

</op>

2. Installing langchain partner package(s)

```py:title=Simple_LLM_App
%pip install langchain, langchain-ollama
```

3. **Instantiate chatmodel** and specify INIT KEY: completion params

```py:title=Simple_LLM_App
from langchain_ollama.chat_models import ChatOllama
from langchain_core.messages.ai import AIMessage

# instantiate chat model
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)

# input to llm
input_to_llm:str = "Explain auto regressive language model in simple words"

# invoke llm
response:AIMessage = llm.invoke(input_to_llm)

# view response
response

## Tip: check type of any variable like below
## print(type(response))  # <class 'langchain_core.messages.ai.AIMessage'>

```

<op>

AIMessage(
content='An Auto Regressive Language Model (ARLM) is a type of artificial intelligence (AI) that can generate human-like text based on the input it receives. Here\'s how it works:\n\n**How it works:**\n\n1. The AI model is trained on a massive dataset of text, such as books or articles.\n2. When you give the AI a prompt or input, like "Write a story about a cat."\n3. The AI starts generating text based on what it learned from its training data.\n4. For each word in the generated text, the AI asks itself: "What word comes next to make sense?"\n5. Based on this question, the AI chooses a word that is likely to come next, and generates another word, and so on.\n6. The AI keeps generating words until it reaches the end of the desired length or until it stops.\n\n**Example:**\n\nLet\'s say you give an ARLM the prompt "Write a story about a cat." Here\'s how it might generate text:\n\n1. Word 1: "The"\n2. Word 2: "cat" (because cats are the main subject)\n3. Word 3: "was" (because we need a verb to describe what the cat is doing)\n4. Word 4: "sleeping" (because cats sleep a lot)\n\nAnd so on.\n\n**Key benefits:**\n\n* ARLMs can generate coherent and contextually relevant text.\n* They can be used for tasks like writing articles, chatbot, or even entire books.\n* They\'re particularly useful when you need to generate text quickly, like in chatbot or customer service systems.\n\nHowever, keep in mind that ARLMs have limitations. For example:\n\n* They may not always understand the nuances of language or context.\n\* They can be biased towards the training data they were trained on.\n\nI hope this explanation helped!',
additional_kwargs={},
response_metadata={'model': 'llama3.2', 'created_at': '2025-09-22T08:54:14.3042242Z', 'done': True, 'done_reason': 'stop', 'total_duration': 13637129800, 'load_duration': 181024400, 'prompt_eval_count': 35, 'prompt_eval_duration': 308904000, 'eval_count': 384, 'eval_duration': 13145725500, 'model_name': 'llama3.2'},
id='run--e808153e-4c6e-4332-bf45-a48e4d7ab607-0',
usage_metadata={'input_tokens': 35, 'output_tokens': 384, 'total_tokens': 419}
)

</op>

📌: for better understanding of params in AiMessage, read more @ [AIMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.ai.AIMessage.html)

```py:title=Simple_LLM_App
# view string formatted content
print(f"\nresponse.content:\n{response.content}")
```

<op>

response.content:

An Auto Regressive Language Model (ARLM) is a type of artificial intelligence (AI) that can generate human-like text based on the input it receives. Here's how it works:

**How it works:**

1. The AI model is trained on a massive dataset of text, such as books or articles.
2. When you give the AI a prompt or input, like "Write a story about a cat."
3. The AI starts generating text based on what it learned from its training data.
4. For each word in the generated text, the AI asks itself: "What word comes next to make sense?"
5. Based on this question, the AI chooses a word that is likely to come next, and generates another word, and so on.
6. The AI keeps generating words until it reaches the end of the desired length or until it stops.

**Example:**

Let's say you give an ARLM the prompt "Write a story about a cat." Here's how it might generate text:

1. Word 1: "The"
2. Word 2: "cat" (because cats are the main subject)
3. Word 3: "was" (because we need a verb to describe what the cat is doing)
4. Word 4: "sleeping" (because cats sleep a lot)

And so on.

**Key benefits:**

- ARLMs can generate coherent and contextually relevant text.
- They can be used for tasks like writing articles, chatbot, or even entire books.
- They're particularly useful when you need to generate text quickly, like in chatbot or customer service systems.

However, keep in mind that ARLMs have limitations. For example:

- They may not always understand the nuances of language or context.
- They can be biased towards the training data they were trained on.

I hope this explanation helped!

</op>

## Example: Simple LLM app

> I am creating an application for younger sibling who can learn about any topic using llm

```py:title=Simple_LLM_App
# user input
topic = input("Enter the topic:")
print(f"\ntopic:\n{topic}")

# input
input_to_llm:str = f"Explain '{topic}' in simple words"
print(f"\ninput_to_llm:\n{input_to_llm}")

# invoke llm
response:AIMessage = llm.invoke(input_to_llm)
print(f"\nresponse.content:\n{response.content}")
```

<op>

topic:

newton's first law of motion

input_to_llm:

Explain 'newton's first law of motion' in simple words

response.content:

Newton's First Law of Motion, also known as the "Law of Inertia", is a fundamental concept in physics. Here's how it works:

**What is it?**

Inertia is the tendency of an object to keep doing what it's already doing, unless something else stops or changes it.

**Think of it like this:**

Imagine you're sitting on a couch, watching TV. You're not moving, and you don't want to move. If no one pushes or pulls you, you'll just stay where you are - that's because of inertia!

Now, imagine someone gets up from the couch next to you and starts pushing you gently. What happens? You start moving in the direction they pushed you.

**Key points:**

1. An object at rest (not moving) will stay at rest unless a force acts on it.
2. An object in motion (moving) will keep moving unless a force stops or changes its direction.
3. Inertia is like a "natural tendency" that an object has to keep doing what it's already doing.

**In simple words:**

Newton's First Law of Motion says that objects tend to keep their state - either at rest or in motion - unless something else affects them.

</op>

❓ What if I want to explain another topic, for which i have to make minor modification and repeat the task. is there a better way

## Prompt Template - Repeated Tasks

1. Creating a template

```py:title=Simple_LLM_App
# import
from langchain_core.prompts.prompt import PromptTemplate

# intiate PromptTemplate
explanation_template = PromptTemplate(
    input_variables=["topic"],
    template="Explain '{topic}' in simple words",
)
explanation_template

```

<op>

PromptTemplate(input_variables=['topic'], input_types={}, partial_variables={}, template="Explain '{topic}' in simple words")

</op>

2. How generating input to llm using template

```py:title=Simple_LLM_App
input_to_llm:str = explanation_template.format(topic="solar system")
print(f"\ninput_to_llm:\n{input_to_llm}")

```

<op>

input_to_llm:

Explain 'solar system' in simple words

</op>

3. Recalling the input of prev example and invoking llm

```py:title=Simple_LLM_App
input_to_llm:str = explanation_template.format(topic="newton's first law of motion")
print(f"\ninput_to_llm:\n{input_to_llm}")
response:AIMessage = llm.invoke(input_to_llm)
print(f"\nresponse.content:\n{response.content}")

```

<op>

input_to_llm:

Explain 'newton's first law of motion' in simple words

response.content:

Newton's First Law of Motion is also known as the "Law of Inertia". Here's a simple explanation:

**Inertia**: An object at rest will stay at rest, and an object in motion will keep moving, unless something else stops it or changes its direction.

Think of it like this: Imagine you're sitting on a couch. If nobody pushes or pulls you, you'll just stay there, right? That's because your body wants to maintain its state of being still (inertia).

Now, imagine you're riding a bike. You'll keep moving forward unless someone stops you or you turn the handlebars to change direction.

So, in short, objects tend to keep doing what they're already doing, and only change their behavior when an external force is applied to them.

That's Newton's First Law of Motion!

</op>

So, we have created our first simple prompt template, which take in user input and rephrase it as input_to_llm as per the template. Similarly we can create template for repeated tasks

## Exercise

### Summarization with (less than 50 words)

```py:title=Simple_LLM_App
## instantiate template
summarization_template = PromptTemplate(
    input_variables=["sentences"],
    template="Summarize '{sentences}' in less than 50 words",
)
summarization_template

## sample data
sentences = """Newton's First Law of Motion is also known as the "Law of Inertia". Here's a simple explanation:

**Inertia**: An object at rest will stay at rest, and an object in motion will keep moving, unless something else stops it or changes its direction.

Think of it like this: Imagine you're sitting on a couch. If nobody pushes or pulls you, you'll just stay there, right? That's because your body wants to maintain its state of being still (inertia).

Now, imagine you're riding a bike. You'll keep moving forward unless someone stops you or you turn the handlebars to change direction.

So, in short, objects tend to keep doing what they're already doing, and only change their behavior when an external force is applied to them.

That's Newton's First Law of Motion!"""

## input
input_to_llm:str = summarization_template.format(sentences=sentences)
print(f"\ninput_to_llm:\n{input_to_llm}")

## invoke llm
response:AIMessage = llm.invoke(input_to_llm)
print(f"\nresponse.content:\n{response.content}")

```

<op>

input_to_llm:

Summarize 'Newton's First Law of Motion is also known as the "Law of Inertia". Here's a simple explanation:

**Inertia**: An object at rest will stay at rest, and an object in motion will keep moving, unless something else stops it or changes its direction.

Think of it like this: Imagine you're sitting on a couch. If nobody pushes or pulls you, you'll just stay there, right? That's because your body wants to maintain its state of being still (inertia).

Now, imagine you're riding a bike. You'll keep moving forward unless someone stops you or you turn the handlebars to change direction.

So, in short, objects tend to keep doing what they're already doing, and only change their behavior when an external force is applied to them.

That's Newton's First Law of Motion!' in less than 50 words

response.content:

Here's a summary in under 50 words:

Newton's First Law (Law of Inertia) states that objects maintain their state unless acted upon by an external force. An object at rest stays at rest, and one in motion continues moving, until stopped or changed direction by an outside influence.

</op>

### Translation (from Eng to French)

```py:title=Simple_LLM_App
## instantiate template
translation_template = PromptTemplate(
    input_variables=["sentences", "language"],
    template="Translate '{sentences}' in {language}",
)
translation_template

## sample data
sentences = """I am happy to learn langchain"""

## input
input_to_llm:str = translation_template.format(sentences=sentences, language="French")
print(f"\ninput_to_llm:\n{input_to_llm}")

## invoke llm
response:AIMessage = llm.invoke(input_to_llm)
print(f"\nresponse.content:\n{response.content}")

## input2
input_to_llm:str = translation_template.format(sentences=sentences, language="Spanish")
print(f"\ninput_to_llm:\n{input_to_llm}")

## invoke llm
response:AIMessage = llm.invoke(input_to_llm)
print(f"\nresponse.content:\n{response.content}")
```

<op>

input_to_llm:

Translate 'I am happy to learn langchain' in French

response.content:

The translation of "I am happy to learn langchain" in French is:

"Je suis heureux d'apprendre langchain"

Here's a breakdown of the translation:

- "I am happy" = "Je suis heureux"
- "to learn" = "d'apprendre"
- "langchain" remains the same, as it's a proper noun and not a common word.

Note that if you want to use the more formal "je suis ravi(e)" instead of "je suis heureux", the translation would be:

"Je suis ravi(e) d'apprendre langchain"

This is often used in professional or academic settings.

input_to_llm:

Translate 'I am happy to learn langchain' in Spanish

response.content:

The translation of "I am happy to learn langchain" in Spanish is:

"Soy feliz de aprender LangChain"

Or, in a more formal tone:

"Me alegra aprender LangChain"

Both translations convey the same meaning as the original sentence.

</op>

📌 Observe we are writing two lines of code, one to populate the template and other to call the model with formatted template.

❓ How can we optimize it, using [chains](../01_chains)
