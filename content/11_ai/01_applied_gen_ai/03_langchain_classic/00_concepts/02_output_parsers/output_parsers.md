---
title: "langchain_classic.output_parsers"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/02_output_parsers"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

> LangChain’s `OutputParser` is an interface for converting raw LLM text into structured, validated objects so downstream code can consume results reliably.

It enforces:-

- Formats
- Supplies format-instruction strings to prompts
- Centralizes parsing/validation logic.

## Key methods:

- `get_format_instructions()` — returns a short instruction string to include in prompts so the model knows the expected structure.
- `parse(text: str)` — converts the model’s text into the desired object (JSON → dict, pydantic model, custom class) and raises on invalid output.

## Concept

```py:title=Demo_Output_Parser
from langchain_classic.prompts import PromptTemplate
from langchain_classic.output_parsers import StructuredOutputParser, ResponseSchema
from langchain_ollama.chat_models import ChatOllama
from langchain_classic.schema import AIMessage


# Step 1: Connect to LLM
llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)

# Step 2: Define the schema
schemas = [ResponseSchema(name="issue_type", description="Category of the issue(hardware, software, network)"),
           ResponseSchema(name="priority", description="Priority of the issue(low, medium, high)")]

# Step 3: Create the parser
parser = StructuredOutputParser.from_response_schemas(schemas)

# Step 4: prompt
prompt = PromptTemplate.from_template(
    '''Analyze the issue and categorize it:
    Issue: {issue}
    Format Instructions: {format_instructions}'''
)

# Step 5: Format the prompt
formatted_prompt = prompt.format(issue="My Printer is making a clicking noise while printing", format_instructions=parser.get_format_instructions())

print(f"\n{formatted_prompt}\n")

# Step 6: Invoke LLM
response:AIMessage = llm.invoke(formatted_prompt)

# Step 7: Parse the response
parsed_output = parser.parse(response.content)

parsed_output

```

<op>

Analyze the issue and categorize it:
Issue: My Printer is making a clicking noise while printing
Format Instructions: The output should be a markdown code snippet formatted in the following schema, including the leading and trailing "`json" and "`":

```json
{
	"issue_type": string  // Category of the issue(hardware, software, network)
	"priority": string  // Priority of the issue(low, medium, high)
}
```

</op>

```py:title=Another_Run
formatted_prompt = prompt.format(issue="My laptop become quite slow after i installed ABC software.", format_instructions=parser.get_format_instructions())

response:AIMessage = llm.invoke(formatted_prompt)

parsed_output = parser.parse(response.content)

parsed_output
```

<op>

{'issue_type': 'software', 'priority': 'medium'}

</op>

**Built-in helpers and variants**
Common utilities: JSON parsers, regex-based parsers, output-fixing wrappers that try to correct malformed model outputs, and integrations that convert parsed output into pydantic/dataclass instances. These reduce parse/validation boilerplate and improve robustness.

### Use cases

- **Function-like tool calling**: ensure returned arguments are valid JSON to map directly to tool inputs.
- **Agents and tool orchestration**: parse "action/action_input" sequences into structured actions for the agent loop.
- **APIs and webhooks**: convert free-text LLM responses into typed payloads stored or forwarded by services.
- **Pipelines and ETL**: extract fields from model output reliably for downstream transforms and storage.
- **Human-in-the-loop gating**: validate outputs and trigger retries or escalations when parsing fails.

### Best practices

- Embed `get_format_instructions()` in prompts rather than relying on long prose instructions.
- Validate with typed models (pydantic/dataclasses) after parsing to get automatic coercion and meaningful errors.
- Implement retry or `OutputFixingParser` to recover from common formatting errors and log parse failures for monitoring.
- Unit-test parsers against malformed, partial, and extra-text outputs to ensure stability in production.

### Quick decision guide

- Need strict typed outputs → implement OutputParser + pydantic and use in prompt.
- Provider supports function-calling → prefer provider-native functions but still validate with a parser on receipt.
- Expect noisy model text → wrap parser with an output-fixing layer and limit retries.

### Example Continuation

❓ **What can achieve from parsed output**

```py:title=Simple_Example
issue_type = parse_output["issue_type"]

match issue_type:
    case "software":
        print("Route to software team")
    case "hardware":
        print("Route to hardware team")
    case _:
        print("Route to general support / escalate")

```

> In the industry, you can use a lot of different output parsers like

| Name            | Supports Streaming | Has Format Instructions | Calls LLM | Input Type             | Output Type        | Description                                                                                                                                                                                                                                              |
| --------------- | ------------------ | ----------------------- | --------- | ---------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Str             | ✅                 |                         |           | `str` &#124; `Message` | String             | Parses texts from message objects. Useful for handling variable formats of message content (e.g., extracting text from content blocks).                                                                                                                  |
| JSON            | ✅                 | ✅                      |           | `str` &#124; `Message` | JSON object        | Returns a JSON object as specified. You can specify a Pydantic model and it will return JSON for that model. Probably the most reliable output parser for getting structured data that does NOT use function calling.                                    |
| XML             | ✅                 | ✅                      |           | `str` &#124; `Message` | dict               | Returns a dictionary of tags. Use when XML output is needed. Use with models that are good at writing XML (like Anthropic's).                                                                                                                            |
| CSV             | ✅                 | ✅                      |           | `str` &#124; `Message` | List[str]          | Returns a list of comma separated values.                                                                                                                                                                                                                |
| OutputFixing    |                    |                         | ✅        | `str` &#124; `Message` |                    | Wraps another output parser. If that output parser errors, then this will pass the error message and the bad output to an LLM and ask it to fix the output.                                                                                              |
| RetryWithError  |                    |                         | ✅        | `str` &#124; `Message` |                    | Wraps another output parser. If that output parser errors, then this will pass the original inputs, the bad output, and the error message to an LLM and ask it to fix it. Compared to OutputFixingParser, this one also sends the original instructions. |
| Pydantic        |                    | ✅                      |           | `str` &#124; `Message` | pydantic.BaseModel | Takes a user defined Pydantic model and returns data in that format.                                                                                                                                                                                     |
| YAML            |                    | ✅                      |           | `str` &#124; `Message` | pydantic.BaseModel | Takes a user defined Pydantic model and returns data in that format. Uses YAML to encode it.                                                                                                                                                             |
| PandasDataFrame |                    | ✅                      |           | `str` &#124; `Message` | dict               | Useful for doing operations with pandas DataFrames.                                                                                                                                                                                                      |
| Enum            |                    | ✅                      |           | `str` &#124; `Message` | Enum               | Parses response into one of the provided enum values.                                                                                                                                                                                                    |
| Datetime        |                    | ✅                      |           | `str` &#124; `Message` | datetime.datetime  | Parses response into a datetime string.                                                                                                                                                                                                                  |
| Structured      |                    | ✅                      |           | `str` &#124; `Message` | Dict[str, str]     | An output parser that returns structured information. It is less powerful than other output parsers since it only allows for fields to be strings. This can be useful when you are working with smaller LLMs.                                            |

```py:title=Industry_Example_using_Pydantic
from pydantic import BaseModel, Field
from langchain_classic.output_parsers import PydanticOutputParser
from langchain_ollama.chat_models import ChatOllama
from langchain_classic.schema import AIMessage
from langchain_classic.prompts import PromptTemplate
from typing import List

# Connect to LLM
llm = ChatOllama(
    model="llama3.2",
    temperature=0.0,   # lower for deterministic structured output
    top_p=0.9,
    max_tokens=256
)

class SupportTicket(BaseModel):
    product: str = Field(..., description="Dell Product Name")
    category: str = Field(..., description="Type of issue : hardware/software/network")
    action: List[str] = Field(..., description="Suggested next steps")
    priority: str = Field(..., description="low/medium/high")
    under_warranty: bool = Field(..., description="Is the device under warranty?")

parser = PydanticOutputParser(pydantic_object=SupportTicket)
format_instructions = parser.get_format_instructions()

prompt = PromptTemplate.from_template(
    """Analyze the issue and produce a SupportTicket JSON object that conforms to the schema.
Return ONLY a single valid JSON object (no extra text, no explanation).
Issue: {issue}

{format_instructions}"""
)

formatted_prompt = prompt.format(
    issue="My Dell XPS laptop which is under warranty became quite slow after I installed ABC software.",
    format_instructions=format_instructions
)

print("\n--- Prompt sent to model ---\n")
print(formatted_prompt)
print("\n--- End prompt ---\n")

# Invoke the model. ChatOllama.invoke returns an AIMessage in this codebase.
response: AIMessage = llm.invoke(formatted_prompt)
print("Raw model content:\n", response.content)

# Parse the JSON output into the Pydantic model
try:
    parsed_output = parser.parse(response.content)
    print("\nParsed SupportTicket object:\n", parsed_output)
except Exception as e:
    # Helpful debug if parsing still fails
    print("\nFailed to parse model output into SupportTicket:", str(e))
    print("Model output was:\n", response.content)
    raise
```

<op>

--- Prompt sent to model ---

Analyze the issue and produce a SupportTicket JSON object that conforms to the schema.
Return ONLY a single valid JSON object (no extra text, no explanation).
Issue: My Dell XPS laptop which is under warranty became quite slow after I installed ABC software.

The output should be formatted as a JSON instance that conforms to the JSON schema below.

As an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}
the object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema. The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.

Here is the output schema:

```
{"properties": {"product": {"description": "Dell Product Name", "title": "Product", "type": "string"}, "category": {"description": "Type of issue : hardware/software/network", "title": "Category", "type": "string"}, "action": {"description": "Suggested next steps", "items": {"type": "string"}, "title": "Action", "type": "array"}, "priority": {"description": "low/medium/high", "title": "Priority", "type": "string"}, "under_warranty": {"description": "Is the device under warranty?", "title": "Under Warranty", "type": "boolean"}}, "required": ["product", "category", "action", "priority", "under_warranty"]}
```

--- End prompt ---

Raw model content:

{"product": "Dell XPS laptop", "category": "hardware issue", "action": ["Install software update"], "priority": "high", "under_warranty": true}

Parsed SupportTicket object:

product='Dell XPS laptop' category='hardware issue' action=['Install software update'] priority='high' under_warranty=True

</op>

<br/>
<br/>
<br/>
<br/>

---

- [output parsers](https://python.langchain.com/docs/concepts/output_parsers/)
