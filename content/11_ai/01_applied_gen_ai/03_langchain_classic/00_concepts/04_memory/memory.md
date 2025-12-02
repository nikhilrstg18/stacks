---
title: "langchain_classic.memory"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/04_memory"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Memory in LangChain

- **Purpose**: Keeps conversation history/state so responses stay context‑aware.
- **Without memory**: Every prompt is standalone.

### Use Cases

- 🧑‍🏫 Tutor → remembers student progress
- 🧠 Assistant → tracks preferences & reminders
- 🛠️ DevOps Copilot → keeps logs & troubleshooting context
- 🧾 Support Bot → recalls past issues
- 🧩 LangGraph → enables stateful workflows

### Types

| Type                             | Quick Meaning               |
| -------------------------------- | --------------------------- |
| `ConversationBufferMemory`       | Full history (all messages) |
| `ConversationBufferWindowMemory` | Last _k_ messages only      |
| `ConversationSummaryMemory`      | Compressed summary          |
| `ConversationEntityMemory`       | Facts about entities        |
| `VectorStoreRetrieverMemory`     | Semantic similarity recall  |

> Buffer = all, Window = last k, Summary = compressed, Entity = facts, Vector = semantic.

## ConversationBufferMemory

`ConversationBufferMemory` stores the _entire conversation history_ until the LLM’s token limit is reached. This makes it simple but costly, since every request includes all prior messages. For longer sessions, alternatives like `ConversationBufferWindowMemory` or `ConversationSummaryMemory` are more efficient.

### How It Works

- **Stores full history**: Every user + AI message is retained.
- **Token limit bound**: Once the accumulated text exceeds the LLM’s max tokens (e.g., 4096 for gpt‑3.5‑turbo), older messages are trimmed.
- **Performance impact**: More tokens → higher cost, slower latency, and potential accuracy drop.

### Factors Affecting Length

- **LLM Token Limit**: Defines the maximum memory capacity.
- **Message Size**: Longer exchanges consume tokens faster, reducing how many turns fit before trimming.

### Why It Matters

- **Cost**: Each API call resends the full history.
- **Latency**: Larger payloads take longer to process.
- **Accuracy**: Too much context can overwhelm the model, leading to “forgetting” or degraded answers.

### Alternatives

- **ConversationBufferWindowMemory** → Keeps only the last _k_ messages.
- **ConversationSummaryMemory** → Compresses past exchanges into a summary.
- **ConversationSummaryBufferMemory** → Hybrid: token limit + summaries.

  ```py:title=PersonalAssistant
  from langchain_classic.chains import ConversationChain
  from langchain_classic.memory import ConversationBufferMemory
  from langchain_ollama.chat_models import ChatOllama
  from langchain_classic.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder

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

    <op>

  🙍‍♂️: Hi, I'm Nikhil

  🤖: Hello Nikhil! Nice to meet you. How can I assist you today? Do you have an appointment or need help with something related to your health?

  🙍‍♂️: What did I just tell you?

  🤖: You told me that your name is Nikhil, and we were in the middle of a conversation where I was playing the role of a medical assistant. That's it! How can I help you today, Nikhil?

  🙍‍♂️: What was my first input?

  🤖: Your first input was "Hi, I'm Nikhil". This started our conversation as a medical assistant.

    </op>

📌 Notice we are passing `memory` while instantiating the chain, instead of **chat_history** variables.

📌 Notice we are calling `.predict()` with `input` as input variable, since its based on template defined in `ConversationChain`

## ConversationSummaryMemory

- `ConversationSummaryMemory` allows for very long conversations by continuously summarizing the history into a compact form using an LLM, unlike other methods that store every message.
- While the length isn't fixed, its design minimizes token usage and avoids exceeding LLM context window limits, making it suitable for extended interactions where other memory types would become overwhelming or too costly.

### How it Works

- Summarizes past exchanges into a **compact form** using an LLM.
- Keeps **crucial context** without storing every word.
- Designed for **long conversations** where full history would be too costly.

### Benefits

- **Extended conversations** → handles long threads.
- **Cost reduction** → fewer tokens sent.
- **Maintains context** → preserves the “storyline” of dialogue.

### When to Use

- Long‑term chats with detailed follow‑ups.
- Budget‑sensitive apps (token efficiency).
- Complex contexts that would overwhelm Buffer memory.

  ```py:title=PersonalAssistant_Summarized
  from langchain_classic.chains import ConversationChain
  from langchain_classic.memory import ConversationSummaryMemory
  from langchain_ollama.chat_models import ChatOllama
  from langchain_classic.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

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

🧠 Efficient for long chats—uses LLM to summarize history and reduce token usage.

> Summary = compress, save cost, keep context.

## ConversationBufferWindowMemory

- `ConversationBufferWindowMemory` retains the last **'K'** interactions of a conversation, where **'K'** is a configurable integer value. This means that as more interactions occur than the set **'K'** limit, the oldest ones are dropped, effectively maintaining a sliding window of recent exchanges rather than the entire conversation.
- You specify the length of this window by setting the k parameter when initializing the memory object.

### How It Works

- Keeps only the **last k interactions** (sliding window).
- Drops older exchanges once the limit is reached.
- Ensures the model sees **recent context only**.

**Example:**

If you set `k=2`, `ConversationBufferWindowMemory` will remember only the last two interactions, consisting of the most recent human response and the most recent AI response, dropping older exchanges.

### Purpose

- ✅ Prevents **token overflow**
- ✅ Improves **efficiency**
- ✅ Keeps **recent, relevant context**

  ```py:title=PersonalAssistant
  from langchain_classic.chains import ConversationChain
  from langchain_classic.memory import ConversationBufferWindowMemory
  from langchain_ollama.chat_models import ChatOllama
  from langchain_classic.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder

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

👉 Useful when only recent context matters—like in real-time assistants or chatbot.

> Window = last k, drop the rest.

## ConversationEntityMemory

The length of the `ConversationEntityMemory` is not fixed; instead, it depends on the specific implementation and the total amount of conversation data it needs to store to provide a coherent and natural experience.

### How it works

- Tracks **structured facts about entities** (e.g., names, topics, preferences).
- Length is **not fixed** — it grows/shrinks depending on what’s needed for coherent answers.
- Focus is on **contextual relevance**, not raw history.

### Key Aspects of Memory Length

- **Contextual Relevance** → keep enough info to answer naturally.
- **Memory Type Matters** → Buffer = full history, Summary = compressed, Entity = facts.
- **Evolving Practices** → older `ConversationBufferMemory` deprecated; LangGraph now handles persistence/state more robustly.
- **No Universal Length** → depends on complexity, context window, and chosen memory strategy.

  ```py:title=PersonalAssistant
  from langchain_classic.chains import ConversationChain
  from langchain_classic.memory import ConversationEntityMemory
  from langchain_ollama.chat_models import ChatOllama
  from langchain_classic.prompts import ChatPromptTemplate, SystemMessagePromptTemplate,
    HumanMessagePromptTemplate, MessagesPlaceholder

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

🧠 Tracks facts about entities—great for personalized assistants or CRM bots.

📌 Your prompt must explicitly reference {entities} to avoid validation errors.

> Entity = facts, Buffer = all, Summary = compressed, Window = last k, Vector = semantic.

## VectorStoreRetrieverMemory

- Stores conversation history as **embeddings** in a vector store (e.g., FAISS, Chroma, Qdrant).
- Retrieves past exchanges using **semantic similarity search**, not just raw text order.
- Lets the LLM recall relevant context even if the conversation is long or scattered.

### How It Works

1. **Save context** → Each user/AI message is embedded and stored in the vector store.
2. **Query context** → When a new input arrives, the retriever finds semantically similar past messages.
3. **Inject context** → Retrieved snippets are passed back into the prompt to guide the LLM’s response.

### Benefits

- **Scalable** → Handles long conversations without blowing up token count.
- **Smart recall** → Finds relevant context even if phrasing differs.
- **Flexible** → Works well for knowledge‑heavy assistants and RAG pipelines.

  ```py:title=Demo_VectorStoreRetrieverMemory
  from langchain_classic.memory import VectorStoreRetrieverMemory
  from langchain_classic.vectorstores import FAISS
  from langchain_ollama.embeddings import OllamaEmbeddings

  # Build vector store
  embeddings = OllamaEmbeddings(model="mxbai-embed-large")
  vectorstore = FAISS.from_texts(["Alice likes pizza", "Bob is an admin"], embeddings)

  # Create retriever
  retriever = vectorstore.as_retriever()

  # Memory backed by semantic search
  memory = VectorStoreRetrieverMemory(retriever=retriever)

  # Save context
  memory.save_context({"human": "My favorite food is pizza"}, {"ai": "Got it!"})

  # Load memory variables (semantic recall)
  print(memory.load_memory_variables({"input": "What food do I like?"}))
  ```

    <op>

  Please see the migration guide at: https://python.langchain.com/docs/versions/migrating_memory/
  memory = VectorStoreRetrieverMemory(retriever=retriever)

  {'history': 'human: My favorite food is pizza\nai: Got it!\nAlice likes pizza\nBob is an admin'}

    </op>

> Vector = semantic memory; finds meaning, not just order.

<br/> 
<br/> 
<br/> 
<br/>

---

- [Langchain Memory](https://python.langchain.com/api_reference/langchain/memory.html)
- [ConversationBufferMemory](https://python.langchain.com/api_reference/langchain/memory/langchain_classic.memory.buffer.ConversationBufferMemory.html)
- [ConversationSummaryMemory](https://python.langchain.com/api_reference/langchain/memory/langchain_classic.memory.summary.ConversationSummaryMemory.html)
- [ConversationBufferWindowMemory](https://python.langchain.com/api_reference/langchain/memory/langchain_classic.memory.buffer_window.ConversationBufferWindowMemory.html)
- [ConversationEntityMemory](https://python.langchain.com/api_reference/langchain/memory/langchain_classic.memory.entity.ConversationEntityMemory.html)
- [VectorStoreRetrieverMemory](https://api.python.langchain.com/en/v0.0.354/memory/langchain.memory.vectorstore.VectorStoreRetrieverMemory.html)
