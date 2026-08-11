---
title: "Filters"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/0_minimal_apis/4_filters"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Filters Overview - Cross-Cutting Logic</summary>
  <div>

## Filters in Minimal API Apps

**Real-life analogy**: Filters are like quality control checkpoints in a manufacturing line. Before each product reaches the final assembly (endpoint handler), it passes through inspection stations that validate specifications, log measurements, and ensure compliance. After assembly, products pass through final inspection stations. Filters provide the same quality control for API requests - validating input, logging activity, and enforcing business rules before and after endpoint execution.

**Technical explanation**: Minimal API filters implement business logic that runs before and after endpoint handlers. They can inspect and modify parameters, intercept response behavior, and validate requests. Filters are registered via AddEndpointFilter with a delegate taking EndpointFilterInvocationContext and returning EndpointFilterDelegate. The context provides HttpContext and Arguments list. Filters execute in FIFO order before next() and FILO order after next(). IEndpointFilter interface enables class-based filters with DI support.

**Key jargon explained**:
- **EndpointFilterInvocationContext**: Provides HttpContext and handler arguments
- **EndpointFilterDelegate**: Delegate to invoke next filter or handler
- **FIFO/FILO**: First In First Out before next(), First In Last Out after next()
- **IEndpointFilter**: Interface for class-based filters with DI
- **AddEndpointFilter**: Extension method to register filters

```csharp:title=BasicFilter.cs
app.MapGet("/colorSelector/{color}", ColorName)
    .AddEndpointFilter(async (invocationContext, next) =>
    {
        var color = invocationContext.GetArgument<string>(0);

        if (color == "Red")
        {
            return Results.Problem("Red not allowed!");
        }
        return await next(invocationContext);
    });
```

```csharp:title=ClassBasedFilter.cs
app.MapGet("/", () => "Test of multiple filters")
    .AddEndpointFilter<AEndpointFilter>()
    .AddEndpointFilter<BEndpointFilter>()
    .AddEndpointFilter<CEndpointFilter>();
```

**How it works in practice**: Filters intercept the request pipeline before endpoint execution. They can validate parameters, modify arguments, or short-circuit the request by returning a result without calling next(). After the endpoint executes, filters can modify the response or perform cleanup. Multiple filters execute in sequence - code before next() runs FIFO, code after next() runs FILO. Class-based filters via IEndpointFilter support DI for dependencies like logging and configuration.

**Key takeaways for interviews**:
- Filters run before and after endpoint handlers
- Can validate parameters, modify arguments, intercept responses
- AddEndpointFilter registers delegate or class-based filters
- Execution order: FIFO before next(), FILO after next()
- IEndpointFilter enables DI support for class-based filters

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Filter Execution Order - Pipeline Behavior</summary>
  <div>

## Filter Execution Order

**Real-life analogy**: Filter execution order is like a multi-stage inspection process in manufacturing. Products pass through inspection stations in sequence - first station checks basic specs, second checks detailed measurements, third checks compliance. After assembly, products pass through final inspection in reverse order - third station first, then second, then first. This ensures comprehensive inspection at each stage. Filters work the same way - before endpoint execution runs FIFO, after runs FILO.

**Technical explanation**: When multiple AddEndpointFilter calls are made on a handler, execution order depends on position relative to next(). Code before next() executes First In First Out - the first registered filter's before code runs first. Code after next() executes First In Last Out - the first registered filter's after code runs last. This creates an onion-like layering where outer filters wrap inner filters, with the endpoint at the center. IEndpointFilter implementations follow the same pattern.

**Key jargon explained**:
- **FIFO**: First In First Out - before next() execution order
- **FILO**: First In Last Out - after next() execution order
- **Onion Layering**: Outer filters wrap inner filters
- **Next Delegate**: Invokes next filter or endpoint handler
- **Short-Circuit**: Returning result without calling next()

```csharp:title=ExecutionOrder.cs
app.MapGet("/", () => "Test of multiple filters")
    .AddEndpointFilter(async (efiContext, next) =>
    {
        app.Logger.LogInformation("Before first filter");
        var result = await next(efiContext);
        app.Logger.LogInformation("After first filter");
        return result;
    })
    .AddEndpointFilter(async (efiContext, next) =>
    {
        app.Logger.LogInformation(" Before 2nd filter");
        var result = await next(efiContext);
        app.Logger.LogInformation(" After 2nd filter");
        return result;
    });
```

**How it works in practice**: The filter pipeline creates nested execution contexts. When the first filter calls next(), it invokes the second filter, which calls the third, and so on until the endpoint executes. After the endpoint returns, control flows back through the filters in reverse order. This enables outer filters to wrap inner filters with cross-cutting concerns like logging, validation, and error handling. The onion model ensures comprehensive request/response processing.

**Key takeaways for interviews**:
- Before next(): FIFO execution order
- After next(): FILO execution order
- Creates onion-like layering around endpoint
- Outer filters can wrap inner filters
- Enables comprehensive cross-cutting concerns

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

**Real-life analogy**: Interview preparation for filter concepts is like understanding quality control systems. You need to understand how inspection stations work, their execution order, how to implement different inspection types, and how to integrate them into the production line.

**Common interview questions**:
1. **What are filters in Minimal APIs and when should you use them?**
   - Business logic running before and after endpoint handlers
   - Validate request parameters and body
   - Log request and response information
   - Validate API version targeting
   - Implement cross-cutting concerns

2. **How do you register filters in Minimal APIs?**
   - Use AddEndpointFilter extension method
   - Can register delegate-based or class-based filters
   - Delegate filters: inline lambda expressions
   - Class-based filters: implement IEndpointFilter
   - Class-based filters support DI

3. **What is the execution order of filters?**
   - Code before next(): FIFO (First In First Out)
   - Code after next(): FILO (First In Last Out)
   - Creates onion-like layering around endpoint
   - Outer filters wrap inner filters
   - Endpoint at center of onion

4. **How do you implement class-based filters with DI?**
   - Implement IEndpointFilter interface
   - Constructor inject dependencies (ILogger, services)
   - Register with AddEndpointFilter<TFilter>()
   - InvokeAsync method with context and next
   - Supports standard DI service lifetimes

5. **How can filters short-circuit the request pipeline?**
   - Return result without calling next()
   - Prevents endpoint execution
   - Useful for validation failures
   - Returns error responses directly
   - Bypasses remaining filters and endpoint

**Key interview concepts**:
- **Cross-Cutting Logic**: Business logic before/after handlers
- **Execution Order**: FIFO before next(), FILO after next()
- **Onion Layering**: Nested filter execution
- **IEndpointFilter**: Class-based filters with DI
- **Short-Circuit**: Bypassing pipeline execution

**How to approach interview questions**:
- Start with filter purpose and use cases
- Explain registration methods (delegate vs class-based)
- Discuss execution order and onion layering
- Address DI support in class-based filters
- Mention short-circuiting for validation scenarios

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Filters in Minimal API apps | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/minimal-apis/min-api-filters?view=aspnetcore-10.0)