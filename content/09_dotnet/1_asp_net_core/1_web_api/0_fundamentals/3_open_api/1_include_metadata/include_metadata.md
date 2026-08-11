---
title: "Include Metadata"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/3_open_api/1_include_metadata"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Include OpenAPI Metadata - Enrich Documentation</summary>
  <div>

## Include OpenAPI Metadata in an ASP.NET Core App

**Real-life analogy**: Including OpenAPI metadata is like adding detailed product specifications to your catalog. Instead of just listing product names, you include descriptions, categories, specifications, and usage examples. This helps customers understand products better and use them correctly. OpenAPI metadata provides the same enrichment for API documentation - adding summaries, descriptions, tags, operation IDs, and parameter details to help developers understand and use APIs effectively.

**Technical explanation**: ASP.NET Core collects metadata from endpoints to generate OpenAPI documents. In controller-based apps, metadata from attributes like [EndpointDescription], [HttpPost], [Produces]. In Minimal APIs, metadata from attributes, extension methods, or TypedResults. Metadata types: summary, description, tags, operationId, parameters, parameter description, requestBody, responses, excluding endpoints. XML doc comments also provide metadata. Strategies: attributes, extension methods, TypedResults.

**Key jargon explained**:
- **Metadata**: Information about endpoints for documentation
- **Summary**: Brief endpoint description
- **Description**: Detailed endpoint explanation
- **Tags**: Categorization for endpoints
- **OperationId**: Unique identifier for operation

```csharp:title=MinimalAPI.cs
app.MapGet("/extension-methods", () => "Hello world!")
    .WithSummary("This is a summary.")
    .WithDescription("This is a description.")
    .WithTags("todos", "projects")
    .WithName("FromExtensionMethods");

app.MapGet("/attributes",
    [EndpointSummary("This is a summary.")]
    [EndpointDescription("This is a description.")]
    [Tags("todos", "projects")]
    [EndpointName("FromAttributes")]
    () => "Hello world!");
```

**How it works in practice**: Metadata can be set via attributes on delegate methods or controller actions, or via extension methods in Minimal APIs. Summary provides brief description, description provides detailed explanation. Tags categorize endpoints for organization. OperationId provides unique identifier. Parameters annotated with [FromQuery], [FromRoute], [FromHeader], [FromForm]. RequestBody specified with [FromBody] or Accepts. Responses specified with [Produces] or TypedResults. ExcludeFromDescription removes endpoints from documentation.

**Key takeaways for interviews**:
- Metadata collected from attributes and extension methods
- Summary, description, tags, operationId, parameters, responses
- Attributes on delegate methods or controller actions
- Extension methods in Minimal APIs
- TypedResults automatically provide response metadata

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Response Metadata - Describing API Responses</summary>
  <div>

## Response Metadata

**Real-life analogy**: Response metadata is like documenting what a service returns to customers. Instead of just saying "we'll help you," you specify exactly what you'll provide (success response, error messages, different formats). This sets clear expectations and prevents misunderstandings. Response metadata in OpenAPI provides the same clarity - documenting what endpoints return (success codes, error codes, response types, descriptions).

**Technical explanation**: Response metadata describes what endpoints return. In Minimal APIs, use [Produces] or [ProducesProblem] extension methods, or return TypedResults. In controllers, use [Produces] attribute. Response metadata includes status codes, content types, and descriptions. TypedResults automatically provide response type metadata for OpenAPI. This enables client generation and validation tools to understand API contracts.

**Key jargon explained**:
- **Produces**: Specifies response content type
- **ProducesProblem**: Specifies error response
- **TypedResults**: Strongly-typed result with automatic metadata
- **Status Codes**: HTTP response codes (200, 404, 500, etc.)
- **Response Types**: Data structures returned by endpoints

```csharp:title=ResponseMetadata.cs
app.MapGet("/todoitems/{id}", async Task<Results<Ok<Todo>, NotFound>> (int id, TodoDb db) =>
   await db.Todos.FindAsync(id)
    is Todo todo
       ? TypedResults.Ok(todo)
       : TypedResults.NotFound());

// Alternative with Produces
app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);
    return todo is not null ? Results.Ok(todo) : Results.NotFound();
})
.Produces<Todo>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);
```

**How it works in practice**: Response metadata can be specified explicitly via [Produces] and [ProducesProblem] extension methods, or implicitly via TypedResults. TypedResults return specific result types (Ok<T>, NotFound, BadRequest, etc.) which automatically provide response type metadata. This eliminates the need for explicit [Produces] calls. The framework infers status codes and content types from the result types. Response descriptions can be added via XML doc comments or attributes.

**Key takeaways for interviews**:
- Response metadata describes what endpoints return
- [Produces] and [ProducesProblem] for explicit metadata
- TypedResults for automatic metadata
- Eliminates need for explicit [Produces] calls
- Enables client generation and validation

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Common Interview Questions</summary>
  <div>

## Interview Preparation

**Real-life analogy**: Interview preparation for OpenAPI metadata concepts is like understanding product catalog systems. You need to understand how to add product information, how to categorize products, how to describe what customers receive, and how to exclude items from the catalog.

**Common interview questions**:
1. **What types of metadata can be included in OpenAPI documents?**
   - Summary: brief endpoint description
   - Description: detailed endpoint explanation
   - Tags: categorization for endpoints
   - OperationId: unique identifier
   - Parameters: parameter sources and descriptions
   - Responses: status codes and response types

2. **How do you add metadata in Minimal APIs vs Controllers?**
   - Minimal APIs: extension methods (WithSummary, WithDescription, WithTags)
   - Minimal APIs: attributes on delegate methods
   - Controllers: attributes on action methods
   - Both support XML doc comments
   - TypedResults provide automatic response metadata

3. **How do you describe API responses in OpenAPI?**
   - Use [Produces] and [ProducesProblem] extension methods
   - Return TypedResults for automatic metadata
   - Specify status codes and content types
   - Add descriptions via XML doc comments
   - Enables client generation and validation

4. **How do you exclude endpoints from OpenAPI documentation?**
   - Use [ExcludeFromDescription] attribute
   - Use ExcludeFromDescription extension method
   - Use [ApiExplorerSettings] attribute in controllers
   - Useful for internal or experimental endpoints
   - Prevents exposure of sensitive endpoints

5. **What is the benefit of using TypedResults for response metadata?**
   - Automatic response type metadata
   - Eliminates need for explicit [Produces] calls
   - Strong typing improves code reliability
   - Better tooling and IntelliSense
   - Self-describing to OpenAPI

**Key interview concepts**:
- **Metadata Types**: Summary, description, tags, operationId
- **Extension Methods**: WithSummary, WithDescription, WithTags
- **Response Metadata**: Produces, ProducesProblem, TypedResults
- **Exclusion**: ExcludeFromDescription attribute/method
- **TypedResults**: Automatic metadata with strong typing

**How to approach interview questions**:
- Start with metadata types and their purposes
- Explain Minimal APIs vs Controllers differences
- Discuss response metadata strategies
- Address endpoint exclusion for security
- Mention TypedResults benefits for automatic metadata

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Include OpenAPI metadata in an ASP.NET Core app | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/openapi/include-metadata?view=aspnetcore-10.0&tabs=minimal-apis)