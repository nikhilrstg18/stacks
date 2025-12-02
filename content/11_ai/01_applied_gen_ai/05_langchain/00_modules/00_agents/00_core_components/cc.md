---
title: "langchain.agents- Core Components"
slug: "11_ai/01_applied_gen_ai/05_langchain/00_modules/00_agents/00_core_components"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Model

> The model is the reasoning engine of your agent. It can be specified in multiple ways, supporting both static and dynamic model selection.

### Static Model

- Static models are configured once when creating the agent and remain unchanged throughout execution. This is the most common and straightforward approach.

```py:title=Demo_initialize_a_static_model_from_identifier_string
from langchain.agents import create_agent
from langchain_ollama import ChatOllama

agent = create_agent(
    "gpt-5"
)
```

📌 If an empty tool list is provided, the agent will consist of a single LLM node without tool-calling capabilities.

💡Model identifier strings support automatic inference (e.g., `gpt-5` will be inferred as `openai:gpt-5`). Refer to the [reference](<https://reference.langchain.com/python/langchain/models/?_gl=1*10t8fvy*_gcl_au*OTI0MTI4MDYwLjE3NjE4OTQzODA.*_ga*MTEzMzU5MTg1NS4xNzYyOTI3MDAx*_ga_47WX3HKKY2*czE3NjI5NDI3MzAkbzMkZzEkdDE3NjI5NDUyMjUkajYwJGwwJGgw#langchain.chat_models.init_chat_model(model)>) to see a full list of model identifier string mappings.

**For more control over the model configuration**

```py:title=demo_initialize_a_model_instance_directly_using_the_provider_package

from langchain.agents import create_agent  # Provides utilities to wrap a model into an agent
from langchain_ollama import ChatOllama    # Interface for Ollama LLMs (e.g., llama3.2)

model = ChatOllama(
    model="llama3.2",       # Name of the Ollama model to use
    temperature=0.3,        # Controls randomness; lower = more deterministic output
    top_p=0.9,              # Nucleus sampling threshold; limits sampling to top 90% probability mass
    max_tokens=200          # Maximum number of tokens to generate in the response
)

# Create an agent around the model, guided by a system prompt
agent = create_agent(
    model
)

# Invoke the agent with a user query
result = agent.invoke(
    {
        "messages": [  # Input must be structured as a list of messages
            {"role": "user", "content": "What's the weather in San Francisco?"}
            # Each message has a role (system, user, assistant) and content (text)
        ]
    }
)

# Iterate through the returned messages and print them
for msg in result["messages"]:
    print(f"{msg.type}: {msg.content}")
```

<op>

human: What's the weather in San Francisco?

ai: I don't have real-time access to current weather conditions. However, I can suggest some ways for you to find out the current weather in San Francisco:

1. Check online weather websites: You can check websites like AccuWeather, Weather.com, or the National Weather Service (NWS) for up-to-date weather forecasts and conditions.

2. Use a mobile app: Download a weather app on your smartphone, such as Dark Sky or Weather Underground, to get current weather conditions and forecasts.

3. Tune into local news: Watch local news channels or listen to radio stations in San Francisco to get the latest weather updates.

If you'd like, I can provide general information about San Francisco's typical climate and weather patterns.

</op>

### Dynamic Model

Dynamic models are selected at runtime based on the current state and context. This enables sophisticated routing logic and cost optimization.
To use a dynamic model, create middleware using the `@wrap_model_call` decorator that modifies the model in the request

```py:title=Demo_using_dynamic_model

from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse


basic_model = ChatOllama(
    model="qwen2.5:0.5b",   # Name of the Ollama model to use
    temperature=0.3,        # Controls randomness; lower = more deterministic output
    top_p=0.9,              # Nucleus sampling threshold; limits sampling to top 90% probability mass
    max_tokens=200          # Maximum number of tokens to generate in the response
)
advanced_model = ChatOllama(
    model="llama3.2",       # Name of the Ollama model to use
    temperature=0.3,        # Controls randomness; lower = more deterministic output
    top_p=0.9,              # Nucleus sampling threshold; limits sampling to top 90% probability mass
    max_tokens=200          # Maximum number of tokens to generate in the response
)

@wrap_model_call
def dynamic_model_selection(request: ModelRequest, handler) -> ModelResponse:
    """Choose model based on conversation complexity."""
    message_count = len(request.state["messages"])

    if message_count > 10:
        print('using llama3.2')
        model = advanced_model
    else:
        print('using qwen2.5:0.5b')
        model = basic_model

    request.model = model
    return handler(request)

# Create an agent around the default model, guided by a system prompt
agent = create_agent(
    model=advanced_model,  # Default model
    middleware=[dynamic_model_selection]
)

# Invoke the agent with a user query
result = agent.invoke(
    {
        "messages": [  # Input must be structured as a list of messages
            {"role": "user", "content": "What's the weather in San Francisco?"}
            # Each message has a role (system, user, assistant) and content (text)
        ]
    }
)

# Iterate through the returned messages and print them
for msg in result["messages"]:
    # Each message object has a type (system/user/assistant) and content (text response)
    print(f"{msg.type}: {msg.content}")
```

<op>

using qwen2.5:0.5b

human: What's the weather in San Francisco?

ai: As an AI language model, I don't have real-time access to current weather data. However, you can check the latest weather updates for San Francisco on websites like Weather.com or local news outlets that cover the city. Additionally, you can also use apps like Weather Underground or Google Maps to get up-to-date weather information in your area.

</op>

## Tools

Tools give agents the ability to take actions. Agents go beyond simple model-only tool binding by facilitating:

- Multiple tool calls in sequence (triggered by a single prompt)
- Parallel tool calls when appropriate
- Dynamic tool selection based on previous results
- Tool retry logic and error handling
- State persistence across tool calls

```py:title=Demo_Agent_With_Tools
from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain.tools import tool

model = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=200
)

@tool
def search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"

@tool
def get_weather(location: str) -> str:
    """Get weather information for a location."""
    return f"Weather in {location}: Sunny, 72°F"

# Create agent with around model with tools and guided system prompt
agent = create_agent(
    model= model,
    tools=[search, get_weather]
)

# Invoke the agent with a user query
result = agent.invoke(
    {
        "messages": [  # Input must be structured as a list of messages
            {"role": "user", "content": "What's the weather in San Francisco?"}
            # Each message has a role (system, user, assistant) and content (text)
        ]
    }
)

# Iterate through the returned messages and print them
for msg in result["messages"]:
    # Each message object has a type (system/user/assistant) and content (text response)
    print(f"{msg.type}: {msg.content}")
```

<op>

human: What's the weather in San Francisco?

ai:

tool: Weather in San Francisco: Sunny, 72°F

ai: The current weather in San Francisco is mostly sunny with a temperature of 72°F (22°C).

</op>

### Tool error handling

To customize how tool errors are handled, use the `@wrap_tool_call` decorator to create middleware:

```py:title=Demo_Tool_Error_Handling
from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain.tools import tool
from langchain.agents.middleware import wrap_tool_call
from langchain_core.messages import ToolMessage

model = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=200
)

@tool
def search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"

@tool
def get_weather(location: str) -> str:
    """Get weather information for a location."""
    res = 1/0
    return f"Weather in {location}: Sunny, 72°F"

@wrap_tool_call
def handle_tool_errors(request, handler):
    """Handle tool execution errors with custom messages."""
    try:
        return handler(request)
    except Exception as e:
        # Return a custom error message to the model
        return ToolMessage(
            content=f"Tool error: Please check your input and try again. ({str(e)})",
            tool_call_id=request.tool_call["id"]
        )
# Create agent with around model with tools and guided system prompt
agent = create_agent(
    model= model,
    tools=[search, get_weather],
    middleware=[handle_tool_errors]
)

# Invoke the agent with a user query
result = agent.invoke(
    {
        "messages": [  # Input must be structured as a list of messages
            {"role": "user", "content": "What's the weather in San Francisco?"}
            # Each message has a role (system, user, assistant) and content (text)
        ]
    }
)

# Iterate through the returned messages and print them
for msg in result["messages"]:
    # Each message object has a type (system/user/assistant) and content (text response)
    print(f"{msg.type}: {msg.content}")

```

<op>

human: What's the weather in San Francisco?

ai:

tool: Tool error: Please check your input and try again. (division by zero)

ai: I apologize for the error earlier. It seems that I need more information to provide an accurate response.

Let me try again with a different approach. Unfortunately, I'm a large language model, I don't have real-time access to current weather conditions. However, I can suggest some ways for you to find out the current weather in San Francisco:

1. Check online weather websites such as AccuWeather or Weather.com.
2. Use a virtual assistant like Siri, Google Assistant, or Alexa to ask about the current weather in San Francisco.
3. Tune into local news or check social media for updates on the weather.

If you provide me with more context or information about what you're looking for (e.g., temperature, forecast, etc.), I'd be happy to try and help you find the answer!

</op>

📌 The agent will return a `ToolMessage` with the custom error message when a tool fails:

```json
[
    ...
    ToolMessage(
        content="Tool error: Please check your input and try again. (division by zero)",
        tool_call_id="..."
    ),
    ...
]
```

### Tool use in the ReAct loop

Agents follow the ReAct (“Reasoning + Acting”) pattern, alternating between brief reasoning steps with targeted tool calls and feeding the resulting observations into subsequent decisions until they can deliver a final answer.

## SystemPrompt

You can shape how your agent approaches tasks by providing a prompt. The `system_prompt` parameter can be provided as a string:

📌 When no `system_prompt` is provided, the agent will infer its task from the messages directly.

```py:title=Demo_Agent_With_Tools
from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain.tools import tool

model = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=200
)

@tool
def search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"

@tool
def get_weather(location: str) -> str:
    """Get weather information for a location."""
    return f"Weather in {location}: Sunny, 72°F"

# Create agent with around model with tools and guided system prompt
agent = create_agent(
    model= model,
    tools=[search, get_weather],
    system_prompt="You are a helpful assistant. Be precise and accurate."
)

# Invoke the agent with a user query
result = agent.invoke(
    {
        "messages": [  # Input must be structured as a list of messages
            {"role": "user", "content": "What's the weather in San Francisco?"}
            # Each message has a role (system, user, assistant) and content (text)
        ]
    }
)

# Iterate through the returned messages and print them
for msg in result["messages"]:
    # Each message object has a type (system/user/assistant) and content (text response)
    print(f"{msg.type}: {msg.content}")
```

<op>

human: What's the weather in San Francisco?

ai:

tool: Weather in San Francisco: Sunny, 72°F

ai: The current weather in San Francisco is mostly sunny with a temperature of 72°F (22°C).

</op>

### Dynamic system prompt

For more advanced use cases where you need to modify the system prompt based on runtime context or agent state, you can use middleware.
The `@dynamic_prompt` decorator creates middleware that generates system prompts dynamically based on the model request:

```py

from typing import TypedDict
from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain.tools import tool
from langchain.agents.middleware import dynamic_prompt, ModelRequest


# Define context schema for passing runtime info
class Context(TypedDict):
    user_role: str

# Middleware: dynamically generate system prompt based on user role
@dynamic_prompt
def user_role_prompt(request: ModelRequest) -> str:
    """Generate system prompt based on user role."""
    user_role = request.runtime.context.get("user_role", "user")
    base_prompt = "You are a helpful assistant."

    if user_role == "expert":
        print("using expert system_prompt")
        return f"{base_prompt} Provide detailed technical responses."
    elif user_role == "beginner":
        print("using beginner system_prompt")
        return f"{base_prompt} Explain concepts simply and avoid jargon."

    return base_prompt

# Initialize Ollama model
model = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=300,
)

# Define tools
@tool
def search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"

@tool
def get_weather(location: str) -> str:
    """Get weather information for a location."""
    return f"Weather in {location}: Sunny, 72°F"

# Create agent with tools + middleware + context schema
agent = create_agent(
    model=model,
    tools=[search, get_weather],
    middleware=[user_role_prompt],
    context_schema=Context,
)

# Invoke agent with context (beginner role)
result = agent.invoke(
    {"messages": [{"role": "user", "content": "Explain machine learning"}]},
    context={"user_role": "beginner"},
)

# Print structured response
for msg in result["messages"]:
    print(f"{msg.type}: {msg.content}")

```

<op>

using beginner system_prompt

using beginner system_prompt

human: Explain machine learning

ai:

tool: Results for: machine learning explanation

ai: Machine learning is a type of artificial intelligence (AI) that allows computers to learn and improve on their own without being explicitly programmed.

Imagine you're trying to teach a child to recognize different types of animals. At first, the child might not be very good at it, but as they see more and more pictures of dogs, cats, and birds, they start to notice patterns and similarities between them. With time and practice, the child becomes better and better at recognizing the animals.

Machine learning works in a similar way. A computer is shown a large number of examples of data, such as images, sounds, or text. The computer uses algorithms (like a set of rules) to analyze the data and identify patterns. As it sees more and more data, the computer improves its ability to recognize patterns and make predictions.

There are several types of machine learning:

1. **Supervised learning**: The computer is shown labeled examples of data, such as images with labels saying "dog" or "cat". The computer uses this information to learn and improve.
2. **Unsupervised learning**: The computer is shown unlabeled examples of data, such as a bunch of images without any labels. The computer must find patterns on its own.
3. **Reinforcement learning**: The computer learns by interacting with an environment and receiving feedback in the form of rewards or penalties.

Machine learning has many applications, including:

1. **Image recognition**: Self-driving cars use machine learning to recognize objects on the road.
2. **Speech recognition**: Virtual assistants like Siri and Alexa use machine learning to understand voice commands.
3. **Predictive analytics**: Companies use machine learning to predict customer behavior and make informed business decisions.

Overall, machine learning is a powerful tool that allows computers to learn and improve on their own, making it possible for them to perform complex tasks that would be difficult or impossible for humans to do alone.

</op>

<br/>
<br/>
<br/>
<br/>

---

- 👉 [create_agent](https://reference.langchain.com/python/langchain/agents/)
- 👉 [Doc](https://docs.langchain.com/oss/python/langchain/agents)
