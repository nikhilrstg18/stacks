---
title: "langchain_classic.prompts - ChatPromptTemplate"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/01_prompts/01_multi_turn"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

- Multi-turn chat prompting enables LLMs to maintain context across multiple user inputs and model responses.
- It’s the foundation for assistants, agents, and chatbot that feel coherent and responsive over time.

## Chat Prompting with `ChatPromptTemplate`

```python
from langchain_classic.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

# Define chat prompt template
prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("You are a helpful assistant."),
    HumanMessagePromptTemplate.from_template("What is {topic}?")
])

# Format messages
messages = prompt.format_messages(topic="LangChain")

# Print the formatted messages
for msg in messages:
    print(f"{msg.type}: {msg.content}")
```

<op>

system: You are a helpful assistant.

human: What is LangChain?

</op>

🔹 **Use Case**: Chatbot, agents, assistants with role-based formatting.

## Memory-Aware Chat Prompting with `MessagesPlaceholder`

🔹 Injects dynamic conversation `history` into the prompt using memory.

| langchain_classic.prompts | Description                 | Best For                  |
| ------------------------- | --------------------------- | ------------------------- |
| `MessagesPlaceholder`     | Injects history into prompt | Custom chains with memory |

| langchain_classic.chains | Description                  | Best For          |
| ------------------------ | ---------------------------- | ----------------- |
| `ConversationChain`      | Auto-manages prompt + memory | Simple assistants |

```python
from langchain_classic.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder

# Simulated conversation history
chat_history = [
    HumanMessage(content="Hi, I'm Nikhil."),
    AIMessage(content="Hello Nikhil! How can I assist you today?"),
]

# Define prompt template using history in MessagesPlaceholder
prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("You are a helpful assistant."),
    MessagesPlaceholder(variable_name="history"),
    HumanMessagePromptTemplate.from_template("{input}")
])

messages = prompt.format_messages(history=chat_history, input="Tell me about LangChain")

# Print the formatted messages
for msg in messages:
    print(f"{msg.type}: {msg.content}")
```

<op>

system: You are a helpful assistant.

human: Hi, I'm Nikhil.

ai: Hello Nikhil! How can I assist you today?

human: Tell me about LangChain

</op>

✅ **Use Case**: Simple chatbot with automatic memory injection using `ConversationChain`

### How to Choose Memory

| Technique                        | Description                            | Best For                  |
| -------------------------------- | -------------------------------------- | ------------------------- |
| `ConversationBufferMemory`       | long chats                             | Stores the full history   |
| `ConversationSummaryMemory`      | Summarizes long chats                  | Tutors, long sessions     |
| `ConversationBufferWindowMemory` | Keeps last `k` messages only           | Token-sensitive workflows |
| `ConversationEntityMemory`       | Tracks structured facts about entities | Personalized agents       |

❓ **Can I combine multiple memory types**

Not directly—but you can orchestrate them using LangGraph for modular control.

❓ **How do I visualize memory injection**

Use `.format_messages()` on your prompt to see how history is injected.

❓ **Which memory is best for agents**

`ConversationSummaryMemory` or `EntityMemory`—depending on whether you need summarization or fact tracking.

❓ **Can I persist memory across sessions**

Yes, by storing memory state in a database or vector store and rehydrating it.
