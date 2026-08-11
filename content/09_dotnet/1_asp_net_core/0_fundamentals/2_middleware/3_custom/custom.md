---
title: "Custom Middleware"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware/3_custom"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Custom Middleware Overview - Like designing your own kitchen tool</summary>
  <div>

## What is Custom Middleware?

**Real-life analogy**: Custom middleware is like designing your own kitchen tool. Instead of only using standard knives and spoons that come with your kitchen, you create a specialized tool that does exactly what you need for your specific recipes. It fits into your existing kitchen setup but provides custom functionality that standard tools can't offer.

**Technical explanation**: Custom middleware allows you to create your own middleware components to handle specific request processing needs that aren't covered by built-in middleware. You can encapsulate custom logic in reusable classes and integrate them into your application's middleware pipeline.

**Key jargon explained**:
- **Custom Middleware**: Middleware you create yourself for specific needs
- **Convention-Based Middleware**: Traditional middleware pattern with constructor and Invoke method
- **Factory-Based Middleware**: Alternative pattern using strong typing and per-request activation
- **Extension Method**: A helper method to make middleware easier to use
- **RequestDelegate**: Represents the next middleware in the pipeline

**How it works in practice**: When built-in middleware doesn't meet your needs, you can create custom middleware. For example, if you need to set culture based on query strings, log specific request information, or implement custom authentication logic, you can create a middleware component specifically for that purpose and plug it into your application's pipeline.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Inline vs Class-Based Middleware - Like writing notes on a napkin vs in a notebook</summary>
  <div>

## Inline vs Class-Based Middleware

**Real-life analogy**: Inline middleware is like writing quick notes on a napkin - convenient for one-time use but hard to reuse. Class-based middleware is like writing in a dedicated notebook - more organized, reusable, and easier to maintain. Both can work, but the notebook approach is better for long-term use.

**Technical explanation**: You can write middleware inline as anonymous methods or encapsulate it in a reusable class. Class-based middleware is preferred for production applications because it's more maintainable, testable, and follows better software engineering practices.

**Key jargon explained**:
- **Inline Middleware**: Middleware defined directly in Program.cs as an anonymous method
- **Class-Based Middleware**: Middleware encapsulated in a separate class
- **Reusability**: How easily the middleware can be used in different parts of your application
- **Maintainability**: How easy it is to update and fix the middleware over time

### Inline Middleware (Quick & Simple):
```csharp:title=Program.cs
app.Use(async (context, next) =>
{
    // Custom logic here
    var cultureQuery = context.Request.Query["culture"];
    if (!string.IsNullOrWhiteSpace(cultureQuery))
    {
        var culture = new CultureInfo(cultureQuery);
        CultureInfo.CurrentCulture = culture;
        CultureInfo.CurrentUICulture = culture;
    }

    await next(context);
});
```

### Class-Based Middleware (Better for Production):
```csharp:title=RequestCultureMiddleware.cs
public class RequestCultureMiddleware
{
    private readonly RequestDelegate _next;

    public RequestCultureMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var cultureQuery = context.Request.Query["culture"];
        if (!string.IsNullOrWhiteSpace(cultureQuery))
        {
            var culture = new CultureInfo(cultureQuery);
            CultureInfo.CurrentCulture = culture;
            CultureInfo.CurrentUICulture = culture;
        }

        await _next(context);
    }
}
```

**How it works in practice**: Inline middleware is fine for simple, one-off scenarios. But class-based middleware is better because:
- You can reuse it in multiple applications
- It's easier to test in isolation
- It follows better organization principles
- You can add dependencies via constructor injection
- It's easier to maintain and update over time

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Middleware Class Structure - Like following a recipe template</summary>
  <div>

## Middleware Class Structure

**Real-life analogy**: Creating a middleware class is like following a recipe template. The template specifies what ingredients you need (constructor parameters) and what steps to follow (Invoke method). As long as you follow the template, your custom middleware will work correctly in the kitchen (application pipeline).

**Technical explanation**: A middleware class must follow a specific structure: a constructor with a RequestDelegate parameter, and an Invoke or InvokeAsync method that accepts HttpContext and returns Task.

**Key jargon explained**:
- **Constructor**: The method that runs when the middleware is created
- **RequestDelegate**: Represents the next middleware in the pipeline
- **Invoke Method**: Synchronous method that processes the request
- **InvokeAsync Method**: Asynchronous method that processes the request (preferred)
- **HttpContext**: Contains information about the current HTTP request and response

```csharp:title=CustomMiddleware.cs
public class CustomMiddleware
{
    private readonly RequestDelegate _next;

    // Constructor must accept RequestDelegate
    public CustomMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    // Method must be named Invoke or InvokeAsync
    // Must accept HttpContext as first parameter
    // Must return Task
    public async Task InvokeAsync(HttpContext context)
    {
        // Your custom logic here
        
        // Call the next middleware in the pipeline
        await _next(context);
    }
}
```

**How it works in practice**: The middleware class structure is like a contract with ASP.NET Core:
- The constructor receives the next middleware in the pipeline via `_next`
- The InvokeAsync method is called for each HTTP request
- You do your custom processing, then call `await _next(context)` to pass control to the next middleware
- The `_next` parameter is crucial - without it, the pipeline would stop at your middleware

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Extension Methods - Like creating custom shortcuts on your phone</summary>
  <div>

## Creating Extension Methods

**Real-life analogy**: Extension methods are like creating custom shortcuts on your phone. Instead of navigating through multiple menus to do something, you create a one-tap shortcut. Similarly, instead of writing complex middleware registration code each time, you create an extension method that makes it easy to use your custom middleware.

**Technical explanation**: Extension methods provide a convenient way to register your custom middleware in the pipeline. They make your middleware easier to use by providing a clean, discoverable API that follows ASP.NET Core conventions.

**Key jargon explained**:
- **Extension Method**: A static method that extends an existing type
- **IApplicationBuilder**: The interface that represents the application builder
- **UseMiddleware**: The method that adds middleware to the pipeline
- **Fluent API**: A programming style where methods return the object they operate on

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
        // Your custom logic
        await _next(context);
    }
}

// Extension method for easy registration
public static class CustomMiddlewareExtensions
{
    public static IApplicationBuilder UseCustomMiddleware(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<CustomMiddleware>();
    }
}
```

```csharp:title=Program.cs
// Usage in Program.cs
app.UseCustomMiddleware(); // Clean and simple!
```

**How it works in practice**: The extension method wraps the complex `UseMiddleware<CustomMiddleware>()` call behind a simple `UseCustomMiddleware()` method. This:
- Makes your middleware easier to discover and use
- Follows ASP.NET Core naming conventions (UseXxx)
- Provides IntelliSense support in IDEs
- Makes your code more readable and maintainable
- Allows you to add configuration parameters to the extension method

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Middleware Dependencies - Like asking for specific tools before starting work</summary>
  <div>

## Middleware Dependencies

**Real-life analogy**: Middleware dependencies are like asking for specific tools before starting work. If you're going to paint a room, you ask for paint, brushes, and tape beforehand. You don't go get them in the middle of painting. Middleware dependencies work the same way - you ask for what you need in the constructor.

**Technical explanation**: Middleware should follow the Explicit Dependencies Principle by declaring its dependencies in its constructor. Middleware is constructed once per application lifetime, so constructor dependencies are application-scoped services.

**Key jargon explained**:
- **Explicit Dependencies Principle**: Clearly declaring what a class needs to function
- **Constructor Injection**: Receiving dependencies through the constructor
- **Application Lifetime**: How long middleware instances exist (usually the entire app lifetime)
- **DI Container**: The service that provides dependencies to your middleware
- **Scoped Services**: Services that are created once per HTTP request

```csharp:title=CustomMiddleware.cs
public class CustomMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<CustomMiddleware> _logger;
    private readonly ICustomService _service;

    // Dependencies are requested in the constructor
    public CustomMiddleware(
        RequestDelegate next,
        ILogger<CustomMiddleware> logger,
        ICustomService service)
    {
        _next = next;
        _logger = logger;
        _service = service;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation("Custom middleware processing request");
        
        // Use the injected service
        var result = await _service.ProcessAsync(context);
        
        await _next(context);
    }
}
```

**How it works in practice**: When you add middleware to the pipeline, ASP.NET Core's DI container automatically provides the requested dependencies. This makes your middleware:
- Easier to test (you can mock the dependencies)
- More flexible (you can swap implementations)
- More maintainable (dependencies are clearly declared)
- More testable (you can inject fake services for testing)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Per-Request Dependencies - Like getting fresh ingredients for each meal</summary>
  <div>

## Per-Request Middleware Dependencies

**Real-life analogy**: Per-request dependencies are like getting fresh ingredients for each meal you cook. Some ingredients (like salt and pepper) you keep in your kitchen all the time (application lifetime). But others (like fresh vegetables) you get fresh for each meal (per request). Middleware can work with both types.

**Technical explanation**: Since middleware is constructed once per application lifetime, scoped services (per-request) can't be injected into the constructor. Instead, they should be injected into the InvokeAsync method, which is called for each request.

**Key jargon explained**:
- **Scoped Services**: Services created once per HTTP request
- **Per-Request Dependencies**: Services that need to be fresh for each request
- **Constructor Dependencies**: Services that last for the entire application lifetime
- **InvokeAsync Dependencies**: Services that are resolved for each request

### Constructor Dependencies (Application Lifetime):
```csharp:title=CustomMiddleware.cs
public class CustomMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<CustomMiddleware> _logger; // Singleton or Transient

    public CustomMiddleware(RequestDelegate next, ILogger<CustomMiddleware> logger)
    {
        _next = next;
        _logger = logger; // Created once when app starts
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation("Processing request");
        await _next(context);
    }
}
```

### Per-Request Dependencies (Scoped Services):
```csharp:title=CustomMiddleware.cs
public class CustomMiddleware
{
    private readonly RequestDelegate _next;

    public CustomMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IScopedService scopedService)
    {
        // scopedService is fresh for each request
        var result = await scopedService.ProcessAsync(context);
        await _next(context);
    }
}
```

**How it works in practice**: The key difference is when the dependency is resolved:
- Constructor parameters: resolved once when the app starts (application lifetime)
- InvokeAsync parameters: resolved once per HTTP request (per request)

Use constructor injection for services that don't change per request (like ILogger, IConfiguration). Use InvokeAsync injection for services that need to be fresh per request (like DbContext, user-specific services).

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Complete Custom Middleware Example - Like a fully equipped kitchen</summary>
  <div>

## Complete Custom Middleware Example

**Real-life analogy**: Putting it all together is like setting up a fully equipped kitchen with all your custom tools organized and ready to use. You have your specialized tools (middleware class), easy access to them (extension method), and all the ingredients you need (dependencies) properly organized for efficient cooking.

**Technical explanation**: A complete custom middleware implementation includes the middleware class with proper structure, an extension method for easy registration, dependency injection for required services, and proper integration into the application pipeline.

**Key jargon explained**:
- **Complete Implementation**: All the pieces needed for production-ready middleware
- **Service Registration**: Adding required services to the DI container
- **Pipeline Integration**: Adding the middleware to the request pipeline
- **Configuration**: Setting up middleware behavior and options

### Step 1: Create the Middleware Class
```csharp:title=RequestCultureMiddleware.cs
using System.Globalization;

public class RequestCultureMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestCultureMiddleware> _logger;

    public RequestCultureMiddleware(RequestDelegate next, ILogger<RequestCultureMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var cultureQuery = context.Request.Query["culture"];
        if (!string.IsNullOrWhiteSpace(cultureQuery))
        {
            var culture = new CultureInfo(cultureQuery);
            CultureInfo.CurrentCulture = culture;
            CultureInfo.CurrentUICulture = culture;
            
            _logger.LogInformation($"Culture set to {culture.DisplayName}");
        }

        await _next(context);
    }
}
```

### Step 2: Create Extension Method
```csharp:title=RequestCultureMiddlewareExtensions.cs
public static class RequestCultureMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestCulture(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RequestCultureMiddleware>();
    }
}
```

### Step 3: Register in Program.cs
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services (if middleware needs any)
builder.Services.AddLogging();

var app = builder.Build();

app.UseHttpsRedirection();

// Use your custom middleware
app.UseRequestCulture();

app.MapGet("/", () => "Hello World!");

app.Run();
```

**How it works in practice**: This complete example shows:
- The middleware class with proper structure and dependency injection
- An extension method for easy registration
- Integration into the application pipeline
- Logging for debugging and monitoring

The middleware sets the culture based on query string parameters, logs the change, and then passes control to the next middleware in the pipeline.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following safety rules in a workshop</summary>
  <div>

## Custom Middleware Best Practices

**Real-life analogy**: Following middleware best practices is like following safety rules in a workshop. You could ignore the rules and hope nothing goes wrong, or you could follow established safety practices that experienced woodworkers have developed over years. The same applies to middleware - follow proven practices for reliable, maintainable code.

**Technical explanation**: Following custom middleware best practices ensures your middleware is reliable, maintainable, performant, and integrates well with the rest of your application.

**Key jargon explained**:
- **Single Responsibility**: Each middleware should do one thing well
- **Async/Await**: Use asynchronous patterns to avoid blocking the pipeline
- **Error Handling**: Properly handle exceptions to prevent cascading failures
- **Performance**: Avoid expensive operations in the request path
- **Testing**: Write tests to verify middleware behavior

### DO:
- **Keep middleware focused** on a single responsibility
- **Use async/await** to avoid blocking the request thread
- **Handle exceptions** to prevent cascading failures
- **Add logging** for debugging and monitoring
- **Follow naming conventions** (UseXxx extension methods)
- **Use extension methods** for easy registration
- **Inject dependencies** through the constructor
- **Call next()** unless you intentionally short-circuit
- **Test middleware** in isolation when possible

### DON'T:
- **Make middleware too complex** - split into multiple smaller middleware if needed
- **Forget to call next()** - this breaks the pipeline
- **Use blocking operations** - they slow down the entire application
- **Ignore error handling** - unhandled exceptions can crash your app
- **Hardcode values** - use configuration and dependency injection
- **Mix concerns** - keep business logic out of middleware
- **Create circular dependencies** - middleware A depends on middleware B which depends on A
- **Assume request properties** - always validate and check for nulls

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
            _logger.LogError(ex, "Error in logging middleware");
            throw; // Re-throw to let exception handler middleware deal with it
        }
    }
}
```

**How it works in practice**: Following these practices ensures your custom middleware is:
- **Reliable**: Handles errors gracefully and doesn't crash your app
- **Performant**: Doesn't block threads or slow down requests
- **Maintainable**: Easy to understand, test, and modify
- **Integrates well**: Works smoothly with other middleware
- **Testable**: Can be tested in isolation with mocked dependencies

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Write custom ASP.NET Core middleware | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/middleware/write?view=aspnetcore-10.0)