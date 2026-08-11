---
title: "Middleware"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Middleware Overview - Like an assembly line in a factory</summary>
  <div>

## What is Middleware?

**Real-life analogy**: Middleware is like an assembly line in a factory. Each worker (middleware component) does a specific job on the product (HTTP request) before passing it to the next worker. If there's a problem, they can stop the line or fix it. In ASP.NET Core, each middleware handles the request in order - like authentication checking your ID, then logging checking you in, then the final handler giving you what you asked for.

**Technical explanation**: Middleware is software that's assembled into an app pipeline to handle requests and responses. Each middleware can choose whether to pass the request to the next middleware in the pipeline or short-circuit it. Middleware can perform work before and after the next middleware in the pipeline.

**Key jargon explained**:
- **Middleware Pipeline**: The sequence of middleware components that process each request
- **Request Delegate**: A function that processes each HTTP request
- **Terminal Middleware**: Middleware that handles the request and doesn't call the next middleware (short-circuits the pipeline)
- **Short-circuiting**: When a middleware handles a request and prevents further middleware from running

**How it works in practice**: When a request comes in, it goes through each middleware in the order you registered them. Each middleware can:
1. Do some work before passing the request to the next middleware
2. Pass the request to the next middleware
3. Do some work after the next middleware completes
4. Handle the request itself and stop the pipeline (short-circuit)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Creating Middleware Pipeline - Like setting up a relay race</summary>
  <div>

## Creating a Middleware Pipeline with WebApplication

**Real-life analogy**: Setting up middleware is like organizing a relay race. Each runner (middleware) receives the baton (request), runs their leg of the race, and passes it to the next runner. The last runner crosses the finish line (sends the response). The order of runners matters - you want your fastest runners at key positions.

**Technical explanation**: The ASP.NET Core request pipeline consists of a sequence of request delegates called one after the other. Each delegate can perform operations before and after the next delegate. The pipeline is built using extension methods like `Run`, `Map`, and `Use`.

**Key jargon explained**:
- **WebApplication**: The main application object that you use to configure the middleware pipeline
- **Run**: Adds a terminal middleware that handles the request and ends the pipeline
- **Use**: Adds middleware that can pass the request to the next middleware
- **Map**: Branches the pipeline based on request path matching

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) =>
{
    Console.WriteLine("Work that can write to the response. (1)");
    await next.Invoke(context);
    Console.WriteLine("Work that doesn't write to the response. (1)");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("Work that can write to the response. (2)");
    await next.Invoke(context);
    Console.WriteLine("Work that doesn't write to the response. (2)");
});

app.Run(async context =>
{
    await context.Response.WriteAsync("Hello world!");
});

app.Run();
```

**How it works in practice**: This code creates a pipeline with two `Use` middleware and one terminal `Run` middleware. When a request comes in:
1. First middleware runs its pre-next code, then calls `next()`
2. Second middleware runs its pre-next code, then calls `next()`
3. Terminal middleware handles the request and writes "Hello world!"
4. Second middleware runs its post-next code
5. First middleware runs its post-next code
6. Response is sent to the client

Console output would be:
```
Work that can write to the response. (1)
Work that can write to the response. (2)
Work that doesn't write to the response. (2)
Work that doesn't write to the response. (1)
```

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Middleware Ordering - Like following a recipe step by step</summary>
  <div>

## Middleware Ordering

**Real-life analogy**: Middleware ordering is like following a recipe step by step. You need to preheat the oven before you put the cake in, and you need to mix ingredients before you bake. If you do steps in the wrong order, the result won't work. The same applies to middleware - order matters!

**Technical explanation**: The order in which you add middleware components determines the order in which they process requests. This ordering is critical for security, performance, and functionality. Exception handlers should be early, while terminal middleware should be last.

**Key jargon explained**:
- **Exception Handling Middleware**: Should be added early to catch exceptions from later middleware
- **HTTPS Redirection**: Should be early to ensure secure connections
- **Static Files**: Should be early to avoid unnecessary processing for static assets
- **Routing**: Should be after static files but before endpoint-specific middleware
- **Authorization**: Should be after routing but before endpoint handlers

**Recommended Order**:
```csharp:title=Program.cs
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

**How it works in practice**: Following this order ensures:
- Exceptions are caught early and handled properly
- Static files are served efficiently without going through unnecessary middleware
- Authentication and authorization happen at the right time
- Your custom middleware can work with properly routed requests
- Terminal middleware runs last to handle the actual request

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Custom Middleware - Like creating your own kitchen tool</summary>
  <div>

## Creating Custom Middleware

**Real-life analogy**: Creating custom middleware is like designing your own kitchen tool. Instead of using only standard knives and spoons, you create a specialized tool that does exactly what you need for your specific recipes. It fits into your existing kitchen setup but provides custom functionality.

**Technical explanation**: You can create custom middleware by implementing a class with a specific signature or by using inline middleware. Custom middleware can perform any logic you need - logging, modification, validation, or any other request/response processing.

**Key jargon explained**:
- **Inline Middleware**: Middleware defined as an anonymous method directly in Program.cs
- **Middleware Class**: A reusable class that implements middleware logic
- **RequestDelegate**: Represents the next middleware in the pipeline
- **HttpContext**: Contains information about the current HTTP request and response

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

```csharp:title=Program.cs
// Extension method for easy registration
public static class CustomMiddlewareExtensions
{
    public static IApplicationBuilder UseCustomMiddleware(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<CustomMiddleware>();
    }
}

// Usage in Program.cs
app.UseCustomMiddleware();
```

**How it works in practice**: This custom middleware logs the request path before passing to the next middleware, then logs the response status code after the next middleware completes. The extension method makes it easy to use with the same pattern as built-in middleware: `app.UseCustomMiddleware()`.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Run, Map, and Use - Like different types of relay race handoffs</summary>
  <div>

## Run, Map, and Use Methods

**Real-life analogy**: Think of these as different types of relay race handoffs. `Run` is like the final runner who crosses the finish line and ends the race. `Use` is like a regular runner who passes the baton to the next runner. `Map` is like a runner who chooses different paths based on which lane they're in.

**Technical explanation**: These three extension methods are used to build the middleware pipeline with different behaviors:
- `Run`: Adds terminal middleware that handles the request and ends the pipeline
- `Use`: Adds middleware that can pass the request to the next middleware
- `Map`: Branches the pipeline based on request path matching

**Key jargon explained**:
- **Run**: Terminal middleware - always the last in the pipeline
- **Use**: Regular middleware - can call next or short-circuit
- **Map**: Path-based branching - creates separate pipeline branches
- **Branching**: Creating separate middleware pipelines for different URL paths

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// USE: Regular middleware that can pass to next
app.Use(async (context, next) =>
{
    // This runs for ALL requests
    Console.WriteLine("Global middleware");
    await next();
});

// MAP: Branch based on path
app.Map("/branch1", branchApp =>
{
    branchApp.Use(async (context, next) =>
    {
        // This runs only for /branch1/* requests
        Console.WriteLine("Branch 1 middleware");
        await next();
    });

    branchApp.Run(async context =>
    {
        await context.Response.WriteAsync("Branch 1 response");
    });
});

app.Map("/branch2", branchApp =>
{
    branchApp.Run(async context =>
    {
        await context.Response.WriteAsync("Branch 2 response");
    });
});

// RUN: Terminal middleware for the main pipeline
app.Run(async context =>
{
    await context.Response.WriteAsync("Main pipeline response");
});

app.Run();
```

**How it works in practice**: 
- The global `Use` middleware runs for all requests
- Requests to `/branch1/*` go through the branch1 pipeline
- Requests to `/branch2/*` go through the branch2 pipeline
- Other requests go through the main pipeline and hit the terminal `Run`
- Each branch is independent and can have its own middleware chain

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Built-in Middleware - Like standard kitchen equipment</summary>
  <div>

## Common Built-in Middleware

**Real-life analogy**: Built-in middleware is like the standard equipment that comes with a professional kitchen - refrigerators, ovens, mixers. You don't have to build these yourself; they're already available and optimized. You just need to know how to use them properly in your kitchen setup.

**Technical explanation**: ASP.NET Core includes many built-in middleware components for common tasks like authentication, authorization, static file serving, and more. These are production-ready and follow best practices.

**Key jargon explained**:
- **UseAuthentication**: Adds authentication middleware to verify user identity
- **UseAuthorization**: Adds authorization middleware to check user permissions
- **UseStaticFiles**: Serves static files like CSS, JavaScript, and images
- **UseHttpsRedirection**: Automatically redirects HTTP requests to HTTPS
- **UseExceptionHandler**: Catches exceptions and shows error pages

```csharp:title=Program.cs
var app = builder.Build();

// Exception handling
app.UseExceptionHandler("/Error");

// HTTPS enforcement
app.UseHttpsRedirection();

// Static files
app.UseStaticFiles();

// Security
app.UseAuthentication();
app.UseAuthorization();

// Custom application middleware
app.UseMiddleware<CustomLoggingMiddleware>();

// Endpoints
app.MapControllers();
app.MapRazorPages();

app.Run();
```

**How it works in practice**: These built-in middleware components handle common web application needs:
- **Exception handling** catches errors and shows user-friendly error pages
- **HTTPS redirection** automatically upgrades insecure connections
- **Static files** efficiently serves assets without going through your application logic
- **Authentication** verifies who users are (login, tokens, etc.)
- **Authorization** checks what users are allowed to do (permissions, roles)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Middleware Best Practices - Like following traffic rules</summary>
  <div>

## Best Practices

**Real-life analogy**: Following middleware best practices is like following traffic rules. You could drive however you want, but following the rules keeps everyone safe and traffic flowing smoothly. The same principles apply to middleware - follow established patterns for reliable, performant applications.

**Technical explanation**: Following middleware best practices ensures your application is secure, performant, maintainable, and follows ASP.NET Core conventions.

**Key jargon explained**:
- **Keep middleware focused**: Each middleware should do one thing well
- **Order matters**: Place middleware in the correct sequence
- **Avoid blocking**: Use async/await to prevent blocking the pipeline
- **Handle exceptions**: Include proper error handling in custom middleware

### DO:
- Keep middleware focused on a single responsibility
- Order middleware correctly (exception handlers first, terminal last)
- Use async/await to avoid blocking the request thread
- Add logging to track request flow and issues
- Test middleware in isolation when possible
- Follow naming conventions (UseXxx extension methods)

### DON'T:
- Create middleware that does too many things
- Forget to call next() when you should pass the request along
- Use blocking operations that slow down the pipeline
- Add middleware that's never actually used
- Put expensive operations in the request path
- Mix authentication and authorization logic in one middleware

```csharp:title=GoodMiddlewareExample.cs
// GOOD: Focused, async, proper error handling
public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            _logger.LogInformation($"Request: {context.Request.Path}");
            await _next(context);
            _logger.LogInformation($"Response: {context.Response.StatusCode}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred");
            throw; // Re-throw to let exception handler middleware deal with it
        }
    }
}
```

**How it works in practice**: Following these practices ensures your middleware pipeline is:
- **Maintainable**: Each piece is focused and easy to understand
- **Performant**: Async operations keep the pipeline flowing smoothly
- **Reliable**: Proper error handling prevents cascading failures
- **Secure**: Correct ordering protects your application from vulnerabilities

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core middleware | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/middleware/?view=aspnetcore-10.0)