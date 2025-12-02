---
title: "langchain_classic.tools | .agents"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/05_tools_and_agents"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Langchain Tools

Scenario: _“AI Assistant for Bookstore Operations”_

You’re building a smart assistant for a local bookstore that:

- Answers customer queries
- Summarizes book descriptions
- Recommends books based on genre
- Tracks inventory
- Automates staff tasks using tool

```py:title=Bookstore_Assistant
from langchain_classic.prompts import PromptTemplate
from langchain_classic.chains import LLMChain
from langchain_ollama.chat_models import ChatOllama
from langchain_classic.tools import Tool, tool
from langchain_classic.agents import initialize_agent, AgentType
from langchain_classic.memory import ConversationBufferMemory

# Step 1: Prompt Template
prompt = PromptTemplate.from_template(
    "Suggest a book in the {genre} genre under {page_limit} pages."
)

# Step 2: Connect to LLM
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)
# Step 3: Create the chain
chain = prompt | llm

response = chain.invoke({"genre": "mystery", "page_limit": "300"})
print(response.text())

# Step 4: create tool instance using Tool.from_function
def check_inventory(title: str) -> str:
    """
    Checks the availability of a book in the inventory.

    Args:
        title (str): The title of the book to check.

    Returns:
        str: A message indicating whether the book is available or out of stock.

    Example:
        >>> check_inventory("The Alchemist")
        'The Alchemist is available.'

        >>> check_inventory("Inferno")
        'Inferno is out of stock.'
    """
    print("Checking Inventory...")
    inventory = {"The Alchemist": 5, "Inferno": 0}
    count = inventory.get(title, 0)
    return f"{title} is {'available' if count > 0 else 'out of stock'}."

inventory_tool = Tool.from_function(
    name="InventoryChecker",
    description="Checks if a book is in stock",
    func=check_inventory
)

# Here's what each parameter does:
# - name="InventoryChecker": This is the identifier for the tool. It’s how the tool will be referenced when invoked by an agent or orchestrator.
# - description="Checks if a book is in stock": A short summary of the tool’s purpose. This helps agents decide when to use it.
# - func=check_inventory: The actual Python function that performs the logic. In this case, it checks the book's availability.

# Step 6: Add Calculator Tool (Optional)
@tool
def simple_calculator(expression: str) -> str:
    """Evaluates a basic math expression like '2 + 2'."""
    return str(eval(expression))

# Step 7: Create Agent with Tools
print(f"\nAgent With Tools")


tools = [inventory_tool, simple_calculator]
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    handle_parsing_errors=True,
    verbose=True)

agent.run("Is 'The Alchemist' available?")

# Step 8: Add Memory (Conversation Tracking)

print(f"\nAgent With Tools and Memory")

memory = ConversationBufferMemory(memory_key="chat_history")

agent_with_memory = initialize_agent(
    tools, llm,
    agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
    memory=memory,
    handle_parsing_errors=True,
    verbose=True
)
agent_with_memory.run("Is 'The Alchemist' available?")
agent_with_memory.run("I like fantasy books. Recommend one.")
agent_with_memory.run("Is that book in stock?")
agent_with_memory.run("Is 'The Alchemist' available?")

for msg in memory.chat_memory.messages:
    print(f"{msg.type.upper()}: {msg.content}")

```

<op>

I'd like to recommend "The Silent Patient" by Alex Michaelides, which has approximately 336 pages (depending on the edition). However, I can suggest an alternative that fits your request:

"The Last Time I Lied" by Riley Sager is a psychological mystery novel with around 272 pages. The story follows Emma Davis, who returns to the summer camp where her friends disappeared 15 years ago, only to find herself in the middle of a new mystery.

If you're looking for something even shorter, consider:

- "The Devil Crept In" by Ania Ahlborn (224 pages): A psychological thriller about a young boy who goes missing in a small town, and the strange occurrences that follow his disappearance.
- "The Last House Guest" by Megan Miranda (272 pages): A mystery novel about a woman who becomes embroiled in a murder investigation at a summer rental property.

All of these books are under 300 pages and offer engaging mysteries to keep you guessing!

Agent With Tools

&gt; Entering new AgentExecutor chain...

&gt;Thought: To check if a book is in stock, I need to use the InventoryChecker tool.

**Action**: InventoryChecker

**Action Input**: 'The Alchemist'

Checking Inventory...

Observation: 'The Alchemist' is out of stock.

Thought:

Question: What does it mean for a book to be "out of stock"?

Thought: To determine if a book is indeed "out of stock", I need more information about the inventory status. However, since we are just checking availability, let's assume that "out of stock" means the book is not available.

**Action**: InventoryChecker
**Action Input**: 'The Alchemist'
Checking Inventory...

Observation: 'The Alchemist' is out of stock.

Thought:Final Answer: The book 'The Alchemist' is not available.

&lt; Finished chain.

Agent With Tools and Memory

&gt; Entering new AgentExecutor chain...
&gt; Thought: Do I need to use a tool? Yes
**Action**: InventoryChecker
**Action Input**: The Alchemist

Checking Inventory...

Observation: The Alchemist is available.

Thought:Thought: Do I need to use a tool? No

`AI`: You mentioned that "The Alchemist" is available. If you're interested in purchasing or learning more about the book, I can provide you with some information about it. "The Alchemist" is a novel by Paulo Coelho that has been widely acclaimed for its thought-provoking themes and inspiring story. It's a great read for anyone looking to explore spirituality, self-discovery, and personal growth. Would you like more details or recommendations on where to find the book?

&lt; Finished chain.

&gt; Entering new AgentExecutor chain...

&gt;Thought: Do I need to use a tool? No

`AI`: Based on your interest in fantasy books, I'd like to recommend "The Name of the Wind" by Patrick Rothfuss. It's a high fantasy novel that follows the story of Kvothe, a legendary musician, magician, and assassin. The book is known for its engaging characters, intricate world-building, and epic storyline. Many readers have praised it as one of the best fantasy novels of all time. Would you like to know more about this book or get some recommendations on where to find it?

&lt; Finished chain.

&gt; Entering new AgentExecutor chain...

&gt;Thought: Do I need to use a tool? Yes

**Action**: InventoryChecker

**Action Input**: "The Name of the Wind" by Patrick Rothfuss

Checking Inventory...

Observation: The Name of the Wind" by Patrick Rothfuss is out of stock.

Thought: `Thought: Do I need to use a tool? No

`AI`: Unfortunately, it seems that "The Name of the Wind" by Patrick Rothfuss is currently out of stock. However, I can suggest some alternatives or provide information on where you might be able to find a copy in the future. Would you like me to recommend another book or provide more details on availability?

&lt; Finished chain.

&gt; Entering new AgentExecutor chain...

Thought: Do I need to use a tool? Yes

**Action**: InventoryChecker

**Action Input**: The Alchemist

Checking Inventory...

Observation: The Alchemist is available.
Thought:Thought: Now that "The Alchemist" is in stock, I should provide more information about it. Let me check some reviews and ratings.

**Action**: simple_calculator

**Action Input**: 5 \* 2 + 10 - 3

Observation:

Thought:Thought: Do I need to use a tool? No

`AI`: "The Alchemist" by Paulo Coelho is indeed available, and it's a great choice for anyone looking for a thought-provoking novel. The book has received widespread acclaim for its inspiring story and themes of spirituality, self-discovery, and personal growth. If you're interested in learning more about the book or would like some recommendations on where to find it, I'd be happy to help!

&lt; Finished chain.

==Memory==

`HUMAN`: Is 'The Alchemist' available?

`AI`: You mentioned that "The Alchemist" is available. If you're interested in purchasing or learning more about the book, I can provide you with some information about it. "The Alchemist" is a novel by Paulo Coelho that has been widely acclaimed for its thought-provoking themes and inspiring story. It's a great read for anyone looking to explore spirituality, self-discovery, and personal growth. Would you like more details or recommendations on where to find the book?

`HUMAN`: I like fantasy books. Recommend one.

`AI`: Based on your interest in fantasy books, I'd like to recommend "The Name of the Wind" by Patrick Rothfuss. It's a high fantasy novel that follows the story of Kvothe, a legendary musician, magician, and assassin. The book is known for its engaging characters, intricate world-building, and epic storyline. Many readers have praised it as one of the best fantasy novels of all time. Would you like to know more about this book or get some recommendations on where to find it?

`HUMAN`: Is that book in stock?

`AI`: Unfortunately, it seems that "The Name of the Wind" by Patrick Rothfuss is currently out of stock. However, I can suggest some alternatives or provide information on where you might be able to find a copy in the future. Would you like me to recommend another book or provide more details on availability?

`HUMAN`: Is 'The Alchemist' available?

`AI`: "The Alchemist" by Paulo Coelho is indeed available, and it's a great choice for anyone looking for a thought-provoking novel. The book has received widespread acclaim for its inspiring story and themes of spirituality, self-discovery, and personal growth. If you're interested in learning more about the book or would like some recommendations on where to find it, I'd be happy to help!

</op>

### Comparison

| Aspect                | `inventory_tool`                                      | `simple_calculator`                                 |
| --------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| **Function Name**     | `check_inventory`                                     | `simple_calculator`                                 |
| **Tool Declaration**  | `Tool.from_function(...)`                             | `@tool` decorator                                   |
| **Purpose**           | Checks book availability from a static inventory      | Evaluates basic math expressions using `eval()`     |
| **Return Type**       | Availability message (`str`)                          | Evaluation result as string (`str`)                 |
| **Metadata**          | Explicit `name` and `description` passed as arguments | Implicitly derived from function name and docstring |
| **Integration Style** | Manual wrapping (likely LangChain-style)              | Declarative (LangChain-style with decorator syntax) |

### Tool Declaration Styles Explained

### 1. `Tool.from_function(...)` — Manual Registration

This is a **programmatic approach** to registering a tool. You explicitly pass:

- `name`: How the tool will be referenced by agents.
- `description`: What the tool does (used for routing decisions).
- `func`: The actual callable function.

This is useful when:

- You want to dynamically register tools.
- You need to wrap existing functions without modifying their source.
- You want more control over naming and metadata.

### 2. `@tool` — Declarative Decorator

This is a **Pythonic, declarative approach** using a decorator. It automatically:

- Registers the function as a tool.
- Uses the function name as the tool name.
- Uses the docstring as the tool description.

This is cleaner and more concise, especially when:

- You're writing tools from scratch.
- You want minimal boilerplate.
- You're using LangChain or similar frameworks that support decorators.

---

### Functional Intent

- `check_inventory` is **domain-specific** — it checks a book’s availability from a hardcoded dictionary.
- `simple_calculator` is **generic utility** — it evaluates any valid math expression passed as a string.

⚠️ **Note on `eval()`**: While powerful, `eval()` can be dangerous if not sandboxed. In production, you'd want to validate or restrict input to avoid security risks.

### Summary

- Use `Tool.from_function` when you need **explicit control** over tool registration.
- Use `@tool` when you want **clean, declarative syntax** and are writing tools inline.
- Both approaches are valid in agentic frameworks like LangChain — just depends on your architecture and preference.

## Exercise

🧩 Feature: Customer Support Agent
As a customer interacting with our system,
I want to receive accurate and timely responses to common queries,
So that I can resolve my concerns efficiently without human intervention.

**Scenario 1**: Retrieve FAQ Information

- Given a user asks about return policies, shipping timelines, or support turnaround times
- And a structured JSON dataset is available as the source of truth
- When the FAQ tool is invoked
- Then the system should return the relevant information from the JSON database
- And fallback to hardcoded responses if the data is missing or incomplete

**Scenario 2**: Check Order Status

- Given a user provides an order identifier
- When the order status tool is triggered
- Then the system should return the current status of the order
- And use simulated or hardcoded data if real-time tracking is unavailable

**Scenario 3**: Agent Orchestration

- Given a user submits a query
- When the agent interprets the intent
- Then it should route the request to the appropriate tool (FAQ or Order Status)
- And respond with a clear, context-aware answer
- And gracefully handle edge cases using predefined fallback logic

```py:title=Customer_Support_Agent
from langchain_ollama.chat_models import ChatOllama
from langchain_classic.tools import Tool
from langchain_classic.agents import initialize_agent, AgentType
from langchain_classic.memory import ConversationBufferMemory


# Step 1: Connect to LLM
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)

# Step 2: create tool instance using Tool
faq_database = {
        "return policy": "You can return any item within 30 days of purchase with a receipt.",
        "shipping time": "Standard shipping takes 5-7 business days. Expedited shipping takes 2-3 business days.",
        "customer support hours": "Our customer support is available from 9 AM to 6 PM, Monday to Friday."
    }

def get_faq_answer(question: str) -> str:
    """Looks up answers to common customer support questions."""
    for key in faq_database:
        if key in question.lower():
            return faq_database[key]
    return "I'm sorry, I couldn't find an answer to that question."

faq_tool = Tool(
    name="FAQ Lookup",
    func=get_faq_answer,
    description="Fetches predefined answers for common customer support questions."
)

# Step 3: check_order_status Tool
import random
def check_order_status(order_id: str) -> str:
    """Simulates checking order status from a database."""
    statuses = ["Processing", "Shipped", "Out for Delivery", "Delivered"]
    return f"Order {order_id} is currently: {random.choice(statuses)}."

order_status_tool = Tool(
    name="Order Status Checker",
    func=check_order_status,
    description="Checks the status of an order given an order ID."
)

# Step 4: Create Agent with Tools & Memory (Conversation Tracking)

print(f"\nAgent With Tools and Memory")

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

agent_with_memory = initialize_agent(
    tools=[faq_tool, order_status_tool],
    llm=llm,
    agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
    memory=memory,
    handle_parsing_errors=True,
    verbose=True
)
agent_with_memory.run("What is your return policy?")
agent_with_memory.run("What is your usual shipping time?")
agent_with_memory.run("Can you check my order status for order id 12345?")
agent_with_memory.run("What was my last order status?")
agent_with_memory.run("What was my order id?")
agent_with_memory.run("What was my last order id?")

print(f"\n==Memory==\n")
for msg in memory.chat_memory.messages:
    print(f"{msg.type.upper()}: {msg.content}")

```

<op>

Agent With Tools and Memory

&gt; Entering new AgentExecutor chain...

**Thought**: Do I need to use a tool? Yes

**Action**: FAQ Lookup

**Action Input**: return policy

**Observation**: You can return any item within 30 days of purchase with a receipt.

**Thought**: Do I need to use a tool? No

**AI**: Our store offers a 30-day return window for all purchases. If you have any questions or concerns about returning an item, please don't hesitate to contact our customer support team. They'll be happy to assist you further.

&lt; Finished chain.

&gt; Entering new AgentExecutor chain...

**Thought**: Do I need to use a tool? No

**AI**: Our store offers standard ground shipping with an estimated delivery time of 3-7 business days. However, expedited shipping options are also available for an additional fee. If you have any specific questions about shipping or would like more information on our return policy, feel free to ask!

&lt; Finished chain.

&gt; Entering new AgentExecutor chain...

**Thought**: Do I need to use a tool? Yes

**Action**: Order Status Checker

**Action Input**: 12345

**Observation**: Order 12345 is currently: Delivered.

**Thought**: The order has been delivered, so there's no need for further action.

**AI**: You have successfully checked your order status. Would you like to know anything else about your recent purchase?

&lt; Finished chain.

&gt; Entering new AgentExecutor chain...

**Thought**: Do I need to use a tool? Yes

**Action**: Order Status Checker

**Action Input**: 12345

**Observation**: Order 12345 is currently: Delivered.

**Thought**: Now that the order status has been checked, it seems like there's no further action needed. However, I should provide some additional information to the human about what was found.

**AI**: The order status for order ID 12345 is currently "Delivered". This means that the item(s) you purchased have already arrived at your location. If you have any questions or concerns about the delivery process, feel free to ask!

&lt; Finished chain.

&gt; Entering new AgentExecutor chain...

**Thought**: Do I need to use a tool? Yes

**Action**: Order Status Checker

**Action Input**: 12345

**Observation**: Order 12345 is currently: Out for Delivery.

**Thought**: Now that we have the order status, let's try to find out what happened with it. The fact that it's "Out for Delivery" suggests that there might be an issue with the delivery process.

**Action**: FAQ Lookup

**Action Input**: What happens when an order is marked as "Out for Delivery"

**Observation**:I'm sorry, I couldn't find an answer to that question.

**Thought**: Do I need to use a tool? No

**AI**: It seems like there might be an issue with the delivery process of your order. The fact that it's marked as "Out for Delivery" suggests that something went wrong during shipping. You may want to contact our customer support team to see if they can provide any further information or assistance.

&lt; Finished chain.

&gt; Entering new AgentExecutor chain...

**Thought**: Do I need to use a tool? Yes

**Action**: FAQ Lookup

**Action Input**: "What was my last order id?"

**Observation**: I'm sorry, I couldn't find an answer to that question.

**Thought**: Do I need to use a tool? No

**AI**: I apologize, but I don't have any information about your previous orders. If you're trying to recall your last order ID, I recommend checking your email or the order history section of your account on our website. Alternatively, you can contact our customer support team for assistance with retrieving that information.

&lt; Finished chain.

==Memory==

HUMAN: What is your return policy?

AI: Our store offers a 30-day return window for all purchases. If you have any questions or concerns about returning an item, please don't hesitate to contact our customer support team. They'll be happy to assist you further.

HUMAN: What is your usual shipping time?

AI: Our store offers standard ground shipping with an estimated delivery time of 3-7 business days. However, expedited shipping options are also available for an additional fee. If you have any specific questions about shipping or would like more information on our return policy, feel free to ask!

HUMAN: Can you check my order status for order id 12345?

AI: You have successfully checked your order status. Would you like to know anything else about your recent purchase?

HUMAN: What was my last order status?

AI: The order status for order ID 12345 is currently "Delivered". This means that the item(s) you purchased have already arrived at your location. If you have any questions or concerns about the delivery process, feel free to ask!

HUMAN: What was my order id?

AI: It seems like there might be an issue with the delivery process of your order. The fact that it's marked as "Out for Delivery" suggests that something went wrong during shipping. You may want to contact our customer support team to see if they can provide any further information or assistance.

HUMAN: What was my last order id?

AI: I apologize, but I don't have any information about your previous orders. If you're trying to recall your last order ID, I recommend checking your email or the order history section of your account on our website. Alternatively, you can contact our customer support team for assistance with retrieving that information.

</op>
