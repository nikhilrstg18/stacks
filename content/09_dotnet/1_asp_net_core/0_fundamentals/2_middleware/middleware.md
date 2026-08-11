---
title: "Middleware"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Middleware Overview - Chain of Responsibility Pattern</summary>
  <div>

## What is Middleware?

**Real-life analogy**: Middleware implements the Chain of Responsibility pattern for HTTP request processing, similar to how a modern manufacturing assembly line operates. Each station (middleware component) performs specific operations on the product (HTTP request) before passing it to the next station. Stations can add features, perform quality checks, modify the product, or stop the line entirely. The order of stations is critical - quality control before packaging, inspection before shipping. This enables modular, flexible, and maintainable request processing.

**Technical explanation**: Middleware is software assembled into an app pipeline to handle requests and responses. Each middleware component can choose whether to pass the request to the next component or short-circuit the pipeline. Middleware can perform operations before and after the next delegate, enabling cross-cutting concerns like authentication, logging, caching, and error handling to be implemented independently of business logic. The pipeline is built using request delegates configured with Run, Map, and Use extension methods.

**Key jargon explained**:
- **Middleware Pipeline**: Sequence of request delegates processing HTTP requests
- **Request Delegate**: Function that processes each HTTP request
- **Terminal Middleware**: Middleware that handles request and doesn't call next (short-circuits)
- **Short-circuiting**: When middleware handles request and prevents further processing
- **Chain of Responsibility**: Design pattern where objects pass requests along a chain

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) =>
{
    Console.WriteLine("Work before next middleware. (1)");
    await next.Invoke(context);
    Console.WriteLine("Work after next middleware. (1)");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("Work before next middleware. (2)");
    await next.Invoke(context);
    Console.WriteLine("Work after next middleware. (2)");
});

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello world!");
});

app.Run();
```

**How it works in practice**: When a request arrives, it flows through middleware in registration order. Each middleware can: (1) Perform pre-processing before calling next, (2) Call next to pass control to the next middleware, (3) Perform post-processing after next returns, (4) Handle the request itself and short-circuit. The execution flows forward through the pipeline to the terminal middleware, then backward as each middleware completes its post-processing. This enables powerful cross-cutting concern implementation while maintaining modularity.

**Key takeaways for interviews**:
- Middleware implements Chain of Responsibility pattern
- Each middleware can short-circuit or pass to next component
- Order of middleware registration is critical for correct behavior
- Enables cross-cutting concerns (auth, logging, caching) independently
- Can perform work before and after next middleware executes

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Middleware Pipeline Configuration</summary>
  <div>

## Creating a Middleware Pipeline with WebApplication

**Real-life analogy**: Building a middleware pipeline is like configuring a security checkpoint system for a facility. You need to arrange security layers in the correct order: ID verification first, then baggage screening, then final authorization. Each layer can approve, deny, or pass to the next layer. The order determines security effectiveness and operational efficiency. ASP.NET Core middleware pipeline configuration follows the same principles for HTTP request processing.

**Technical explanation**: The ASP.NET Core request pipeline consists of a sequence of request delegates called one after the other. The pipeline is built using extension methods: Run adds terminal middleware that ends the pipeline, Use adds middleware that can pass to next, and Map branches the pipeline based on path matching. Exception handlers should be early to catch errors from later middleware. The order determines functionality, security, and performance characteristics.

**Key jargon explained**:
- **WebApplication**: Main application object for pipeline configuration
- **Run**: Adds terminal middleware that handles request and ends pipeline
- **Use**: Adds middleware that can pass request to next middleware
- **Map**: Branches pipeline based on request path matching
- **Terminal Middleware**: Last middleware in pipeline that generates response

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// USE: Regular middleware that can pass to next
app.Use(async (context, next) =>
{
    Console.WriteLine("Global middleware");
    await next();
});

// MAP: Branch based on path
app.Map("/branch1", branchApp =>
{
    branchApp.Use(async (context, next) =>
    {
        Console.WriteLine("Branch 1 middleware");
        await next();
    });

    branchApp.Run(async context =>
    {
        await context.Response.WriteAsync("Branch 1 response");
    });
});

// RUN: Terminal middleware for main pipeline
app.Run(async context =>
{
    await context.Response.WriteAsync("Main pipeline response");
});

app.Run();
```

**How it works in practice**: The pipeline configuration follows specific ordering principles: (1) Exception handling first to catch errors from later middleware, (2) HTTPS redirection early to enforce secure connections, (3) Static files early to serve assets efficiently, (4) Authentication before authorization, (5) Custom middleware for application-specific logic, (6) Endpoint mapping last as terminal middleware. This order ensures security, performance, and correct functionality.

**Key takeaways for interviews**:
- Pipeline order is critical for security and functionality
- Run creates terminal middleware, Use creates regular middleware
- Map creates branches for different URL paths
- Exception handlers should be early in the pipeline
- Static files and routing have specific position requirements

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Middleware Ordering - Critical for Correctness</summary>
  <div>

## Middleware Ordering

**Real-life analogy**: Middleware ordering is like following a detailed recipe where step sequence determines success. You must preheat the oven before baking, mix ingredients before cooking, and add garnish after cooking. If steps are out of order, the result fails. The same applies to middleware - authentication before authorization, exception handling before business logic, static files before routing. Incorrect ordering causes security vulnerabilities, performance issues, or functional failures.

**Technical explanation**: The order in which middleware components are added determines the order they process requests. This ordering is critical for security, performance, and functionality. Exception handlers should be early to catch exceptions from later middleware. HTTPS redirection should be early to enforce secure connections. Static files should be early to avoid unnecessary processing. Authentication should come before authorization. Custom application middleware should be placed appropriately based on dependencies.

**Key jargon explained**:
- **Exception Handling Middleware**: Should be early to catch all exceptions
- **HTTPS Redirection**: Should be early to enforce secure connections
- **Static Files**: Should be early to serve assets efficiently
- **Routing**: Should be after static files but before endpoint middleware
- **Authorization**: Should be after authentication but before endpoints

```csharp:title=RecommendedOrder.cs
var app = builder.Build();

// 1. Exception handling (early to catch all exceptions)
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// 2. HTTPS redirection (early to enforce secure connections)
app.UseHttpsRedirection();

// 3. Static files (early to serve assets efficiently)
app.UseStaticFiles();

// 4. Routing (needed for endpoint matching)
app.UseRouting();

// 5. Authentication (before authorization)
app.UseAuthentication();

// 6. Authorization (after authentication, before endpoints)
app.UseAuthorization();

// 7. Custom middleware (application-specific)
app.UseCustomMiddleware();

// 8. Endpoints (terminal middleware)
app.MapControllers();
app.MapRazorPages();

app.Run();
```

**How it works in practice**: Following the recommended order ensures: (1) Exceptions are caught early and handled properly, (2) Static files are served efficiently without going through unnecessary middleware, (3) Authentication and authorization happen at the right time, (4) Your custom middleware can work with properly routed requests, (5) Terminal middleware runs last to handle the actual request. Deviation from this order can cause security vulnerabilities, performance degradation, or functional failures.

**Key takeaways for interviews**:
- Middleware order is critical for security and functionality
- Exception handlers should be first in the pipeline
- Authentication must come before authorization
- Static files should be served before routing
- Incorrect ordering can cause security vulnerabilities

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Custom Middleware - Implementation Patterns</summary>
  <div>

## Creating Custom Middleware

**Real-life analogy**: Creating custom middleware is like designing specialized equipment for your manufacturing process. Instead of using only standard tools, you create custom components that perform exactly what your process needs. These components integrate seamlessly with your existing assembly line while providing specialized functionality. Custom middleware enables application-specific request processing that built-in middleware doesn't provide.

**Technical explanation**: Custom middleware can be implemented as inline anonymous methods or as reusable classes. The class-based approach follows a specific signature: a constructor accepting RequestDelegate and an InvokeAsync method accepting HttpContext. Extension methods can be created for easy registration following the Use{MiddlewareName} convention. Custom middleware can perform any request/response processing: logging, modification, validation, compression, caching, or any other cross-cutting concern.

**Key jargon explained**:
- **Inline Middleware**: Middleware defined as anonymous method in Program.cs
- **Middleware Class**: Reusable class implementing middleware logic
- **RequestDelegate**: Represents the next middleware in the pipeline
- **HttpContext**: Contains information about current HTTP request and response
- **Extension Method**: Enables Use{MiddlewareName} registration pattern

```csharp:title=CustomMiddleware.cs
public class CustomMiddleware
{
    private readonly RequestDelegate _next;

    public CustomMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Code to run before the next middleware
        Console.WriteLine($"Request: {context.Request.Path}");

        await _next(context);

        // Code to run after the next middleware
        Console.WriteLine($"Response: {context.Response.StatusCode}");
    }
}
```

```csharp:title=Extension.cs
public static class CustomMiddlewareExtensions
{
    public static IApplicationBuilder UseCustomMiddleware(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<CustomMiddleware>();
    }
}
```

```csharp:title=Usage.cs
// Usage in Program.cs
app.UseCustomMiddleware();
```

**How it works in practice**: Custom middleware classes receive the RequestDelegate in their constructor, representing the next middleware in the pipeline. The InvokeAsync method receives the HttpContext and can perform operations before calling _next(context) and after it returns. Extension methods follow the Use{MiddlewareName} convention for consistency with built-in middleware. This pattern enables reusable, testable, and maintainable custom middleware that integrates seamlessly with the ASP.NET Core pipeline.

**Key takeaways for interviews**:
- Custom middleware can be inline or class-based
- Class-based middleware follows specific constructor and InvokeAsync signature
- Extension methods enable Use{MiddlewareName} registration pattern
- Middleware can perform operations before and after next delegate
- Enables application-specific cross-cutting concerns

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Run, Map, and Use - Pipeline Methods</summary>
  <div>

## Run, Map, and Use Methods

**Real-life analogy**: Run, Map, and Use are like different types of conveyor belt control mechanisms. Run is like an end station that processes items and stops the line. Use is like a regular processing station that passes items to the next station. Map is like a routing system that directs items to different processing lines based on their characteristics. Each mechanism serves different purposes in building flexible request processing pipelines.

**Technical explanation**: These three extension methods build the middleware pipeline with different behaviors: Run adds terminal middleware that handles the request and ends the pipeline (short-circuits). Use adds middleware that can pass the request to the next middleware or short-circuit. Map branches the pipeline based on request path matching, creating separate sub-pipelines for different URL patterns. Together, they enable flexible, powerful request routing and processing.

**Key jargon explained**:
- **Run**: Terminal middleware - always the last in the pipeline
- **Use**: Regular middleware - can call next or short-circuit
- **Map**: Path-based branching - creates separate pipeline branches
- **Branching**: Creating separate middleware pipelines for different URL paths
- **Terminal**: Ending the pipeline without calling next middleware

```csharp:title=PipelineMethods.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// USE: Regular middleware that can pass to next
app.Use(async (context, next) =>
{
    Console.WriteLine("Global middleware");
    await next();
});

// MAP: Branch based on path
app.Map("/api", apiApp =>
{
    apiApp.Use(async (context, next) =>
    {
        Console.WriteLine("API middleware");
        await next();
    });

    apiApp.Run(async context =>
    {
        await context.Response.WriteAsync("API response");
    });
});

// RUN: Terminal middleware for main pipeline
app.Run(async context =>
{
    await context.Response.WriteAsync("Main response");
});

app.Run();
```

**How it works in practice**: Use middleware runs for all requests and can pass to next or short-circuit. Map creates conditional branches based on URL paths - requests matching the pattern go through the branch pipeline, others continue through the main pipeline. Run middleware is terminal - it handles the request and ends the pipeline without calling next. This combination enables complex routing scenarios while maintaining clean separation of concerns.

**Key takeaways for interviews**:
- Run creates terminal middleware that ends the pipeline
- Use creates regular middleware that can pass to next
- Map creates conditional branches based on URL paths
- MapWhen enables branching based on custom conditions
- These methods together enable flexible pipeline construction

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

**Real-life analogy**: Interview preparation for middleware concepts is like understanding a complete security checkpoint system. You need to understand how each security layer works, the correct order of operations, how to customize the system, and how to troubleshoot issues when they occur.

**Common interview questions**:
1. **What is middleware and how does it work in ASP.NET Core?**
   - Explain it's software assembled into a request pipeline
   - Discuss Chain of Responsibility pattern implementation
   - Describe how middleware can short-circuit or pass to next

2. **Why is middleware ordering important?**
   - Critical for security, performance, and functionality
   - Authentication must come before authorization
   - Exception handlers should be early to catch errors
   - Static files should be served before routing

3. **What are the differences between Run, Use, and Map?**
   - Run: terminal middleware that ends the pipeline
   - Use: regular middleware that can pass to next
   - Map: branches pipeline based on URL paths
   - Each serves different purposes in pipeline construction

4. **How do you create custom middleware?**
   - Can be inline anonymous methods or reusable classes
   - Class-based middleware follows specific signature pattern
   - Extension methods enable Use{MiddlewareName} pattern
   - Constructor receives RequestDelegate, InvokeAsync receives HttpContext

5. **What are common middleware best practices?**
   - Keep middleware focused on single responsibility
   - Use async/await to avoid blocking the pipeline
   - Order middleware correctly for security and performance
   - Add logging for debugging and monitoring
   - Handle exceptions appropriately

**Key interview concepts**:
- **Chain of Responsibility**: Design pattern for request processing
- **Pipeline Ordering**: Critical for security and functionality
- **Terminal Middleware**: Ends pipeline without calling next
- **Branching**: Creating separate pipelines for different URL paths
- **Cross-Cutting Concerns**: Auth, logging, caching implemented as middleware

**How to approach interview questions**:
- Start with clear definition and architectural purpose
- Explain the Chain of Responsibility pattern implementation
- Provide practical code examples demonstrating patterns
- Discuss ordering principles and security implications
- Mention common pitfalls and best practices

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core middleware | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/middleware/?view=aspnetcore-10.0)