---
title: "Memory - Langchain"
slug: "11_ai/01_applied_gen_ai/03_langchain/00_concepts/02_memory"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Memory

- LangChain memory stores and retrieves **conversation history** or **state** so that the model can respond with awareness of prior exchanges.
- Without memory, every prompt is treated as a standalone input.

### Use Cases

| Use Case                | Benefit                                                            |
| ----------------------- | ------------------------------------------------------------------ |
| 🧑‍🏫 Educational Tutor    | Remembers student progress, questions, and learning goals          |
| 🧠 Personal Assistant   | Tracks user preferences, reminders, and context across sessions    |
| 🛠️ DevOps Copilot       | Maintains context of system state, logs, and troubleshooting steps |
| 🧾 Customer Support Bot | Remembers user issues, ticket history, and resolutions             |
| 🧩 LangGraph Workflows  | Enables stateful routing and memory-aware agent orchestration      |

### 🧰 Types

| Memory Type                      | Description                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| `ConversationBufferMemory`       | Stores full message history sequentially                     |
| `ConversationBufferWindowMemory` | Stores only the last `k` messages                            |
| `ConversationSummaryMemory`      | Stores a running summary using LLM-generated compression     |
| `ConversationEntityMemory`       | Tracks structured facts about entities (e.g., user, topic)   |
| `VectorStoreRetrieverMemory`     | Stores and retrieves memory using semantic similarity search |

---

## [ConversationBufferMemory](https://python.langchain.com/api_reference/langchain/memory/langchain.memory.buffer.ConversationBufferMemory.html)

- `ConversationBufferMemory`'s effective "length" is **determined by the token limit of the underlying Large Language Model (LLM)**, which defines how much text can be processed in a single request. Because it stores the entire conversation, it consumes tokens quickly, leading to potential cost increases and slower response times.
- Developers must balance this for their chosen LLM to maintain performance and budget.

### How it Works

- **Stores the full history**: It keeps every message from the entire conversation in memory.
- **Token-based limitation**: When the accumulated messages exceed the LLM's token limit, older messages are trimmed.
- **Impact on performance**: More tokens mean slower performance due to increased data sent to the LLM and higher costs.

**Factors Influencing Memory Length**

- **LLM Token Limit**: The most important factor is the token limit of the specific LLM being used (e.g., 4096 for gpt-3.5-turbo).
- **Text Length of Messages**: Longer messages from the user and the AI will consume tokens faster, reducing the number of turns the memory can hold before trimming.

### Why it Matters

- **Cost**: Every exchange with the API sends the entire message history, which can quickly add up.
- **Latency**: A larger conversation history takes longer to send and process, increasing latency.
- **LLM Performance**: LLMs perform better with less text; a massive token input can lead to decreased accuracy or "forgetting".

### Alternatives

For longer conversations, consider alternatives like:

- `ConversationBufferWindowMemory`: Keeps only the last 'k' messages.
- `ConversationSummaryMemory`: Summarizes the conversation to save tokens.
- `ConversationSummaryBufferMemory`: Combines a token limit with summaries.

```py:title=PersonalAssistant
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_ollama.chat_models import ChatOllama
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder

# connect to llm
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)

# instantiate memory
memory = ConversationBufferMemory(return_messages=True)

# prompt
prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("You are a personal assistant"),
    MessagesPlaceholder(variable_name='history'),
    HumanMessagePromptTemplate.from_template("{input}")
])

# instantiate conversation chain
conversation_chain = ConversationChain(
    llm=llm,
    prompt = prompt,
    memory=memory
)

def converse(input_to_llm:str):
    print(f"\n🙍‍♂️: {input_to_llm}")
    response = conversation_chain.predict(input= input_to_llm)
    print(f"\n🤖: {response}")

converse("Hi, I'm Nikhil")

converse("What did I just tell you?")

converse("What was my first input?")
```

📌 Notice we are passing `memory` while instantiating the chain, instead of **chat_history** variables.

📌 Notice we are calling `.predict()` with `input` as input variable, since its based on template defined in `ConversationChain`

<op>

🙍‍♂️: Hi, I'm Nikhil

🤖: Hello Nikhil! Nice to meet you. How can I assist you today? Do you have an appointment or need help with something related to your health?

🙍‍♂️: What did I just tell you?

🤖: You told me that your name is Nikhil, and we were in the middle of a conversation where I was playing the role of a medical assistant. That's it! How can I help you today, Nikhil?

🙍‍♂️: What was my first input?

🤖: Your first input was "Hi, I'm Nikhil". This started our conversation as a medical assistant.

</op>

## [ConversationSummaryMemory](https://python.langchain.com/api_reference/langchain/memory/langchain.memory.summary.ConversationSummaryMemory.html)

- `ConversationSummaryMemory` allows for very long conversations by continuously summarizing the history into a compact form using an LLM, unlike other methods that store every message.
- While the length isn't fixed, its design minimizes token usage and avoids exceeding LLM context window limits, making it suitable for extended interactions where other memory types would become overwhelming or too costly.

### How it Works

- **Summarization**: After each turn in the conversation, ConversationSummaryMemory uses a large language model (LLM) to create a condensed summary of the interaction.
- **Contextual Understanding**: This summary is then used to provide context for subsequent turns, ensuring the LLM has the crucial information to understand the conversation's flow without storing every word.
- **Efficiency**: By summarizing rather than storing the entire conversation history, this memory type drastically reduces the number of tokens sent to the LLM, which lowers costs and speeds up responses.

### Benefits

- **Extended Conversations**: It enables much longer and more detailed conversations by keeping the history manageable.
- **Cost Reduction**: By limiting token usage, it helps to control the costs associated with LLM interactions.
- **Maintains Context**: It ensures that important context is preserved, even for lengthy discussions, preventing the LLM from losing the thread of the conversation.

### When to Use It

- **Long-Term Interactions**: Ideal for scenarios requiring detailed follow-ups and lengthy exchanges between a user and the chatbot.
- **Budget Constraints**: When there's a need to keep token usage and associated costs down.
- **Complex Context**: When the conversation history becomes too large and would overload or confuse other memory types.

```py:title=PersonalAssistant_Summarized
from langchain.chains import ConversationChain
from langchain.memory import ConversationSummaryMemory
from langchain_ollama.chat_models import ChatOllama
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

# connect to llm
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)

# instantiate memory with llm
memory = ConversationSummaryMemory(llm=llm, return_messages=True)
# prompt
prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("You are a medical assistant"),
    MessagesPlaceholder(variable_name='history'),
    HumanMessagePromptTemplate.from_template("{input}")
])

# instantiate conversation chain
conversation_chain = ConversationChain(
    llm=llm,
    prompt = prompt,
    memory=memory
)

def converse(input_to_llm:str):
    print(f"\n🙍‍♂️: {input_to_llm}")
    response = conversation_chain.predict(input= input_to_llm)
    print(f"\n🤖: {response}")

converse("Explain LangChain")

converse("Now summarize it in 3 lines")
```

🧠 Efficient for long chats—uses LLM to summarize history and reduce token usage.

<op>

🙍‍♂️: Explain LangChain

🤖: LangChain is an open-source, decentralized data management platform that enables the creation of blockchain-based applications. It's designed to simplify the process of building and managing blockchain-based data platforms.

LangChain provides a set of tools and libraries that allow developers to create custom blockchain-based applications, including:

1. **Data storage**: LangChain provides a decentralized data storage solution using InterPlanetary File System (IPFS) and Swarm.
2. **Smart contract management**: LangChain includes a smart contract framework that allows developers to create and deploy custom smart contracts on various blockchain networks.
3. **Decentralized identity management**: LangChain offers a decentralized identity management system, which enables users to manage their digital identities in a secure and private manner.

LangChain's key features include:

1. **Modular architecture**: LangChain is designed as a modular platform, allowing developers to easily integrate new components and tools.
2. **Customizability**: LangChain provides a high degree of customizability, enabling developers to tailor the platform to their specific use cases.
3. **Interoperability**: LangChain supports multiple blockchain networks, including Ethereum, Polkadot, and Solana.

LangChain has various applications across industries, such as:

1. **Decentralized finance (DeFi)**: LangChain can be used to build decentralized lending platforms, stablecoins, and other DeFi applications.
2. **Healthcare**: LangChain's data management and smart contract capabilities make it an attractive solution for building decentralized healthcare platforms.
3. **Supply chain management**: LangChain's blockchain-based platform can help streamline supply chain management by enabling secure and transparent tracking of goods.

Overall, LangChain is a versatile platform that enables developers to build custom blockchain-based applications with ease, providing a solid foundation for a wide range of use cases.

🙍‍♂️: Now summarize it in 3 lines

🤖: Artificial intelligence is a force for good, helping humans reach their full potential. LangChain is an open-source platform that enables the creation of blockchain-based applications, providing a decentralized data management solution. However, its use comes with potential risks such as security vulnerabilities and regulatory uncertainty.

</op>

## [ConversationBufferWindowMemory](https://python.langchain.com/api_reference/langchain/memory/langchain.memory.buffer_window.ConversationBufferWindowMemory.html)

- `ConversationBufferWindowMemory` retains the last **'K'** interactions of a conversation, where **'K'** is a configurable integer value. This means that as more interactions occur than the set **'K'** limit, the oldest ones are dropped, effectively maintaining a sliding window of recent exchanges rather than the entire conversation.
- You specify the length of this window by setting the k parameter when initializing the memory object.

### How it works:

1. **Set k**: You define a specific number (k) of recent interactions to remember.
2. **Store interactions**: The memory stores the most recent k turns of conversation.
3. **Drop old interactions**: Once a new interaction is added, if the buffer already contains k messages, the oldest message is removed to make space for the new one.

### Example:

If you set `k=2`, `ConversationBufferWindowMemory` will remember only the last two interactions, consisting of the most recent human response and the most recent AI response, dropping older exchanges.

### Purpose:

This type of memory is useful for:

- **Preventing token overflow**: It keeps the input to the large language model manageable by not including the entire conversation history.
- **Improving efficiency**: A smaller context window leads to faster and more efficient responses.
- **Maintaining relevant context**: It ensures that the model primarily receives recent and relevant information for the current part of the conversation.

```py:title=PersonalAssistant
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferWindowMemory
from langchain_ollama.chat_models import ChatOllama
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder

# connect to llm
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)

# instantiate memory
memory = ConversationBufferWindowMemory(k=2, return_messages=True)

# prompt
prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("You are a personal assistant, reply max in 3 lines"),
    MessagesPlaceholder(variable_name='history'),
    HumanMessagePromptTemplate.from_template("{input}")
])

# instantiate conversation chain
conversation_chain = ConversationChain(
    llm=llm,
    prompt = prompt,
    memory=memory
)

def converse(input_to_llm:str):
    print(f"\n🙍‍♂️: {input_to_llm}")
    response = conversation_chain.predict(input= input_to_llm)
    print(f"\n🤖: {response}")

converse("Hi, I'm Nikhil.")

converse("I am an Engineer")

converse("I work at Dell.")

converse("Can you tell me what all I said?")

```

🧠 Useful when only recent context matters—like in real-time assistants or chatbot.

<op>

🙍‍♂️: Hi, I'm Nikhil.

🤖: Hello Nikhil! It's nice to meet you. How can I assist you today?

🙍‍♂️: I am an Engineer

🤖: That's great, Nikhil! As an engineer, what area of expertise do you specialize in?

🙍‍♂️: I work at Dell.

🤖: Dell is a well-established company. What department or role do you hold within the organization?

🙍‍♂️: Can you tell me what all I said?

🤖: You told me that:

1. You are an Engineer
2. You work at Dell

</op>

## [ConversationEntityMemory](https://python.langchain.com/api_reference/langchain/memory/langchain.memory.entity.ConversationEntityMemory.html)

- The length of the `ConversationEntityMemory` is not fixed; instead, it depends on the specific implementation and the total amount of conversation data it needs to store to provide a coherent and natural experience.
- As of LangChain v0.3.1, a legacy memory type called ConversationBufferMemory has been deprecated in favor of more robust persistence methods via LangGraph, indicating that it's an evolving feature with new ways to manage context.

### Key Aspects of Conversation Memory Length:

- **Contextual Relevance**: The primary goal is to retain enough information from past interactions to answer questions accurately and naturally.
- **Memory Type**: Different memory types within LangChain have different ways of handling history, with some (like ConversationSummaryMemory) focusing on condensed summaries, while others (like older ConversationBufferMemory implementations) might store the full raw history.
- **Deprecated vs. Current Practices**: LangChain is moving away from some of the older, individual memory types towards newer, more integrated approaches within LangGraph to manage conversation state.
- **No Universal Length**: There isn't a single "length" for conversation memory because its capacity is tied to the conversation's complexity, the model's context window, and the specific memory management strategy used.

```py:title=PersonalAssistant
from langchain.chains import ConversationChain
from langchain.memory import ConversationEntityMemory
from langchain_ollama.chat_models import ChatOllama
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder

# connect to llm
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)

# instantiate memory with llm
memory = ConversationEntityMemory(llm=llm, return_messages=True)

# prompt
prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("You are a personal assistant, reply max in 3 lines.Known facts: {entities}"),
    MessagesPlaceholder(variable_name='history'),
    HumanMessagePromptTemplate.from_template("{input}")
])

# instantiate conversation chain
conversation_chain = ConversationChain(
    llm=llm,
    prompt = prompt,
    memory=memory
)

def converse(input_to_llm:str):
    print(f"\n🙍‍♂️: {input_to_llm}")
    response = conversation_chain.predict(input= input_to_llm)
    print(f"\n🤖: {response}")

converse("Hi, I'm Nikhil.")

converse("I work at Dell.")

converse("I am an Engineer")

converse("Where do I work?")
```

🧠 Tracks facts about entities—great for personalized assistants or CRM bots.

📌 Your prompt must explicitly reference {entities} to avoid validation errors.

<op>

🙍‍♂️: Hi, I'm Nikhil.

🤖: Nice to meet you, Nikhil! I've got your info stored as 'Nikhil' with no specific details yet. How can I assist you today?

🙍‍♂️: I work at Dell.

🤖: You're a part of the Dell team, that's great! What department or role do you work in within Dell?

🙍‍♂️: I am an Engineer

🤖: As an Engineer at Dell, I'll make sure to keep your professional details on record. How can I assist you with any technical queries or tasks today?

🙍‍♂️: Where do I work?

🤖: You work at the Dell headquarters in Round Rock, Texas.

</op>

read more @ [Langchain Memory](https://python.langchain.com/api_reference/langchain/memory.html)
