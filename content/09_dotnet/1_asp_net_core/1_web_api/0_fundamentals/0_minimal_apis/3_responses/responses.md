---
title: "Responses"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/0_minimal_apis/3_responses"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Responses Overview - Return Value Types</summary>
  <div>

## Create Responses in Minimal API Applications

**Real-life analogy**: API responses are like different types of delivery services. You can send a simple text message (string), a packaged box with contents (object), or a specialized delivery with specific handling instructions (IResult). Each delivery type serves different purposes - simple messages for quick communication, packaged boxes for structured data, specialized deliveries for complex scenarios. Minimal APIs provide the same flexibility with different return value types.

**Technical explanation**: Minimal endpoints support three types of return values: string (including Task<string> and ValueTask<string>), T (any other type, including Task<T> and ValueTask<T>), and IResult-based (including Task<IResult> and ValueTask<IResult>). String return values are written directly to response with text/plain Content-Type. T return values are JSON-serialized with application/json Content-Type. IResult return values call IResult.ExecuteAsync, with Content-Type decided by the IResult implementation.

**Key jargon explained**:
- **String Return**: Direct text response with text/plain
- **T Return**: JSON-serialized object with application/json
- **IResult Return**: Structured response with ExecuteAsync
- **Results**: Static class for creating IResult objects
- **TypedResults**: Typed equivalent of Results with strong typing

```csharp:title=ReturnTypes.cs
// String return
app.MapGet("/hello", () => "Hello World");
// Returns: 200, text/plain, "Hello World"

// T return (JSON)
app.MapGet("/hello", () => new { Message = "Hello World" });
// Returns: 200, application/json, {"message":"Hello World"}

// IResult return
app.MapGet("/hello", () => Results.Ok(new { Message = "Hello World" }));
// Returns: 200, application/json, {"message":"Hello World"}
```

**How it works in practice**: When a route handler returns a string, the framework writes it directly to the response with text/plain Content-Type. When returning an object, the framework JSON-serializes it with application/json Content-Type. When returning IResult, the framework calls ExecuteAsync on the result, which handles the response creation. This flexibility allows choosing the appropriate return type based on the scenario - simple strings for text responses, objects for JSON data, IResult for complex response scenarios.

**Key takeaways for interviews**:
- Three return types: string, T (object), IResult
- String: text/plain Content-Type
- T: JSON-serialized with application/json
- IResult: ExecuteAsync determines response
- Choose based on response complexity and requirements

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>TypedResults vs Results - Strong Typing Benefits</summary>
  <div>

## TypedResults vs Results

**Real-life analogy**: TypedResults vs Results is like using typed variables vs dynamic variables in programming. TypedResults provide compile-time type checking and IntelliSense, while Results are more flexible but less type-safe. TypedResults are like using strongly-typed variables - you get better tooling, compile-time errors, and clearer code. Results are like dynamic variables - more flexible but with less compile-time safety.

**Technical explanation**: Results and TypedResults static classes provide similar sets of result helpers. Results helpers return IResult, requiring conversion when concrete type is needed (e.g., for unit testing). TypedResults helpers return specific IResult implementation types. TypedResults advantages: strongly typed objects improve code readability and unit testing, reduce runtime errors, and automatically provide response type metadata for OpenAPI. Results<T1, TN> needed when returning different TypedResults from single endpoint.

**Key jargon explained**:
- **Results**: Static class returning IResult
- **TypedResults**: Static class returning specific IResult types
- **Strong Typing**: Compile-time type checking
- **OpenAPI Metadata**: Automatic response type documentation
- **Results<T1, TN>**: Union type for multiple TypedResults

```csharp:title=ResultsComparison.cs
// Results - requires explicit Produces for OpenAPI
app.MapGet("/hello", () => Results.Ok(new Message() { Text = "Hello World!" }))
    .Produces<Message>();

// TypedResults - automatic OpenAPI metadata
app.MapGet("/hello2", () => TypedResults.Ok(new Message() { Text = "Hello World!" }));
```

```csharp:title=MultipleResults.cs
// Results compiles (both return IResult)
app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());

// TypedResults requires Results<T1, TN>
app.MapGet("/todoitems/{id}", async Task<Results<Ok<Todo>, NotFound>> (int id, TodoDb db) =>
   await db.Todos.FindAsync(id)
    is Todo todo
       ? TypedResults.Ok(todo)
       : TypedResults.NotFound());
```

**How it works in practice**: Results provides flexibility - all methods return IResult, so the compiler infers the return type. This is convenient but loses type information. TypedResults provides strong typing - each method returns a specific type, enabling better tooling and compile-time checking. The tradeoff is verbosity - TypedResults requires explicit return type declaration when returning different types from a single endpoint using Results<T1, TN>.

**Key takeaways for interviews**:
- Results: flexible, returns IResult, less type-safe
- TypedResults: strongly-typed, better tooling, automatic OpenAPI
- TypedResults reduces runtime errors and improves unit testing
- Results<T1, TN> needed for multiple TypedResults in single endpoint
- Tradeoff: TypedResults more verbose but more type-safe

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

**Real-life analogy**: Interview preparation for response concepts is like understanding different delivery methods. You need to know when to use simple text delivery, packaged delivery, or specialized delivery services based on what you're sending and how it needs to be handled.

**Common interview questions**:
1. **What are the three types of return values in Minimal APIs?**
   - String: direct text response with text/plain Content-Type
   - T (any other type): JSON-serialized with application/json
   - IResult-based: calls ExecuteAsync, Content-Type by implementation
   - Each serves different response scenarios
   - Choice depends on response complexity and requirements

2. **How do string return values work in Minimal APIs?**
   - Framework writes string directly to response
   - Content-Type is text/plain
   - Status code is 200 by default
   - Includes Task<string> and ValueTask<string>
   - Simple text responses

3. **How do T (object) return values work in Minimal APIs?**
   - Framework JSON-serializes the object
   - Content-Type is application/json
   - Status code is 200 by default
   - Includes Task<T> and ValueTask<T>
   - Structured data responses

4. **What is the difference between Results and TypedResults?**
   - Results: returns IResult, less type-safe
   - TypedResults: returns specific IResult types, strongly-typed
   - TypedResults provides better tooling and compile-time checking
   - TypedResults automatically provides OpenAPI metadata
   - Results<T1, TN> needed for multiple TypedResults in single endpoint

5. **When would you use Results<T1, TN> in Minimal APIs?**
   - When returning different TypedResults from single endpoint
   - Compiler won't infer type for different TypedResults
   - Explicit return type declaration required
   - Enables strong typing for conditional responses
   - More verbose but provides type safety

**Key interview concepts**:
- **Return Types**: String, T, IResult
- **Content-Type**: text/plain for string, application/json for T
- **Results vs TypedResults**: Flexibility vs strong typing
- **OpenAPI Metadata**: Automatic with TypedResults
- **Results<T1, TN>**: Union type for multiple TypedResults

**How to approach interview questions**:
- Start with three return types and their behavior
- Explain Content-Type and serialization differences
- Discuss Results vs TypedResults tradeoffs
- Address OpenAPI metadata benefits of TypedResults
- Mention Results<T1, TN> for multiple TypedResults scenarios

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Create responses in Minimal API applications | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/minimal-apis/responses?view=aspnetcore-10.0)