---
title: "Custom Middleware"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware/3_custom"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Custom Middleware Overview - Extensible Pipeline</summary>
  <div>

## Custom Middleware

**Real-life analogy**: Custom middleware is like creating specialized processing stations in a factory assembly line. While the factory provides standard stations (quality control, packaging), you might need custom stations for specific product requirements - specialized inspection, custom labeling, or unique processing steps. Custom middleware provides the same extensibility for ASP.NET Core applications - you can create specialized processing components that integrate seamlessly into the request/response pipeline.

**Technical explanation**: Custom middleware enables you to create specialized request/response processing components that integrate into the ASP.NET Core middleware pipeline. Middleware is generally encapsulated in a class and exposed with an extension method. The middleware class must have a public constructor accepting RequestDelegate and a public InvokeAsync method accepting HttpContext. Additional constructor parameters are populated by dependency injection. Extension methods expose the middleware through IApplicationBuilder for clean registration in Program.cs.

**Key jargon explained**:
- **Custom Middleware**: User-created middleware components
- **RequestDelegate**: Delegate representing the next middleware in the pipeline
- **InvokeAsync**: Method called for each request
- **Extension Method**: Clean registration pattern for middleware
- **Explicit Dependencies Principle**: Exposing dependencies in constructor

```csharp:title=CustomMiddleware.cs
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

```csharp:title=Extensions.cs
public static class RequestCultureMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestCulture(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RequestCultureMiddleware>();
    }
}
```

```csharp:title=Program.cs
app.UseRequestCulture();
```

**How it works in practice**: Custom middleware follows a convention-based pattern. The constructor accepts RequestDelegate (the next middleware) and any dependencies via DI. InvokeAsync processes the request, optionally modifies it, calls _next(context) to continue the pipeline, and can process the response on the way back. Extension methods provide clean registration syntax. Middleware is constructed once at application startup (application lifetime), so constructor-injected services are shared across all requests.

**Key takeaways for interviews**:
- Custom middleware enables specialized request/response processing
- Must have constructor with RequestDelegate parameter
- Must have InvokeAsync method accepting HttpContext
- Extension methods provide clean registration pattern
- Middleware is constructed once at startup (application lifetime)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Middleware Dependencies - Dependency Injection</summary>
  <div>

## Middleware Dependencies

**Real-life analogy**: Middleware dependencies are like the tools and resources that processing stations need to function. Some tools are permanent fixtures in the station (application lifetime), while others are consumed and replaced for each product (per-request). Custom middleware dependencies follow the same pattern - some services are shared across all requests (singleton, scoped in constructor), while others are fresh for each request (scoped in InvokeAsync).

**Technical explanation**: Middleware should follow the Explicit Dependencies Principle by exposing dependencies in its constructor. Middleware is constructed once per application lifetime, so constructor-injected services have application lifetime. Scoped lifetime services in constructors aren't shared with other DI types during each request. To share scoped services between middleware and other types, add services to the InvokeAsync method signature instead of the constructor. This enables per-request resolution of scoped services.

**Key jargon explained**:
- **Application Lifetime**: Constructed once at startup, shared across requests
- **Per-Request Lifetime**: Fresh instance for each request
- **Explicit Dependencies Principle**: Expose dependencies in constructor
- **Constructor Injection**: Services injected at middleware construction
- **InvokeAsync Injection**: Services injected per request

```csharp:title=ConstructorInjection.cs
public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;  // Application lifetime

    public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;  // Shared across all requests
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation("Request starting: {Path}", context.Request.Path);
        await _next(context);
        _logger.LogInformation("Request completed: {Path}", context.Request.Path);
    }
}
```

```csharp:title=PerRequestInjection.cs
public class UserMiddleware
{
    private readonly RequestDelegate _next;

    public UserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IUserService userService)  // Per-request
    {
        // userService is fresh for each request
        var user = await userService.GetCurrentUserAsync();
        context.Items["CurrentUser"] = user;
        
        await _next(context);
    }
}
```

**How it works in practice**: Middleware constructor injection happens once at application startup. Singleton services are shared across all requests. Scoped services in the constructor are problematic because they're not refreshed per request. To use scoped services properly, inject them into the InvokeAsync method signature. This ensures a fresh instance per request, enabling proper scoped service lifetime semantics and sharing with other per-request components.

**Key takeaways for interviews**:
- Middleware is constructed once at application startup
- Constructor-injected services have application lifetime
- Scoped services should be injected into InvokeAsync for per-request resolution
- Follow Explicit Dependencies Principle
- Enables proper sharing of scoped services across components

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

**Real-life analogy**: Interview preparation for custom middleware concepts is like understanding how to design and integrate specialized processing stations. You need to understand the standard patterns, how to handle dependencies, how to integrate with existing systems, and how to ensure proper resource management while maintaining flexibility and testability.

**Common interview questions**:
1. **How do you create custom middleware?**
   - Create a class with constructor accepting RequestDelegate
   - Implement InvokeAsync method accepting HttpContext
   - Call _next(context) to continue the pipeline
   - Create extension method for clean registration
   - Register with app.UseMiddleware<T>() or custom extension

2. **What are the requirements for custom middleware?**
   - Public constructor with RequestDelegate parameter
   - Public InvokeAsync method with HttpContext parameter
   - Return Task from InvokeAsync
   - Additional constructor parameters populated by DI
   - Additional InvokeAsync parameters injected per request

3. **How do middleware dependencies work?**
   - Constructor injection happens once at application startup
   - Constructor-injected services have application lifetime
   - Scoped services in InvokeAsync are injected per request
   - Follow Explicit Dependencies Principle
   - Enables proper service lifetime semantics

4. **What is the difference between constructor and InvokeAsync injection?**
   - Constructor injection: application lifetime, shared across requests
   - InvokeAsync injection: per-request lifetime, fresh instance each request
   - Constructor injection for singletons and application services
   - InvokeAsync injection for scoped services that need per-request resolution

5. **How do you register custom middleware?**
   - Use app.UseMiddleware<T>() with the middleware type
   - Create extension method for clean registration syntax
   - Extension method calls UseMiddleware<T>() internally
   - Extension method can accept configuration parameters
   - Register in Program.cs before endpoints

**Key interview concepts**:
- **Convention-Based Pattern**: Standard middleware structure
- **Pipeline Integration**: Seamless integration with middleware pipeline
- **Dependency Injection**: Constructor vs InvokeAsync injection patterns
- **Service Lifetimes**: Application vs per-request lifetime
- **Extension Methods**: Clean registration pattern

**How to approach interview questions**:
- Start with clear definition of custom middleware purpose
- Explain the required structure (constructor, InvokeAsync)
- Discuss dependency injection patterns (constructor vs InvokeAsync)
- Address service lifetime considerations
- Mention extension methods for clean registration

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Write custom ASP.NET Core middleware | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/middleware/write?view=aspnetcore-10.0)