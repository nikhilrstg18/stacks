---
title: "Middleware Extensibility"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware/6_extensibility"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Middleware Extensibility Overview - Factory-Based Activation</summary>
  <div>

## Factory-Based Middleware Activation

**Real-life analogy**: Factory-based middleware activation is like having a manufacturing plant that creates specialized processing stations on demand for each product. Instead of having permanent stations that handle all products (convention-based middleware), the factory creates a fresh station for each product with the specific tools and resources it needs. This enables per-request activation and injection of scoped services. Factory-based middleware provides the same capability - creating fresh middleware instances per request with proper dependency injection.

**Technical explanation**: IMiddlewareFactory/IMiddleware is an extensibility point for middleware activation that offers per-client-request activation (injection of scoped services) and strong typing. Convention-based middleware is constructed once at application startup. IMiddleware is activated per client request, enabling scoped service injection. UseMiddleware checks if middleware implements IMiddleware and uses factory activation if so. Middleware is registered as scoped or transient service. This enables proper scoped service lifetime semantics.

**Key jargon explained**:
- **IMiddleware**: Interface for factory-activated middleware
- **IMiddlewareFactory**: Interface for creating middleware instances
- **Per-Request Activation**: Fresh middleware instance for each request
- **Scoped Service Injection**: Services injected per request
- **Strong Typing**: Type-safe middleware with constructor injection

```csharp:title=IMiddleware.cs
public class FactoryActivatedMiddleware : IMiddleware
{
    private readonly SampleDbContext _dbContext;

    public FactoryActivatedMiddleware(SampleDbContext dbContext)
        => _dbContext = dbContext;

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var keyValue = context.Request.Query["key"];

        if (!string.IsNullOrWhiteSpace(keyValue))
        {
            _dbContext.Requests.Add(new Request("Factory", keyValue));
            await _dbContext.SaveChangesAsync();
        }

        await next(context);
    }
}
```

```csharp:title=Registration.cs
builder.Services.AddDbContext<SampleDbContext>
    (options => options.UseInMemoryDatabase("SampleDb"));

builder.Services.AddTransient<FactoryActivatedMiddleware>();
```

```csharp:title=Usage.cs
app.UseFactoryActivatedMiddleware();
```

**How it works in practice**: Convention-based middleware is constructed once at application startup, so constructor-injected services have application lifetime. IMiddleware is activated per request, so constructor-injected services can be scoped. UseMiddleware detects if middleware implements IMiddleware and uses factory activation. The middleware is registered as scoped or transient service in DI container. This enables proper scoped service lifetime semantics for middleware that needs per-request services.

**Key takeaways for interviews**:
- IMiddleware enables per-request middleware activation
- Enables scoped service injection into middleware
- Convention-based middleware constructed once at startup
- UseMiddleware detects IMiddleware and uses factory activation
- Registered as scoped or transient service in DI container

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Convention vs Factory Activation - Lifetime Differences</summary>
  <div>

## Convention vs Factory Activation

**Real-life analogy**: Convention-based activation is like having permanent processing stations that are set up once and handle all products. Factory-based activation is like creating a fresh processing station for each product with specific resources. Permanent stations share resources across all products (application lifetime), while fresh stations get new resources for each product (per-request lifetime). The choice depends on whether you need shared or per-request resources.

**Technical explanation**: Convention-based middleware is constructed once at application startup with application lifetime. Constructor-injected services are shared across all requests. IMiddleware is activated per request with per-request lifetime. Constructor-injected services are fresh for each request. Convention-based middleware is simpler but can't use scoped services properly. IMiddleware enables proper scoped service semantics but requires registration in DI container. The choice depends on service lifetime requirements.

**Key jargon explained**:
- **Convention-Based**: Constructed once at application startup
- **Factory-Based**: Activated per request
- **Application Lifetime**: Services shared across all requests
- **Per-Request Lifetime**: Fresh services for each request
- **Scoped Services**: Services with per-request lifetime

```csharp:title=ConventionBased.cs
// Convention-based middleware
public class ConventionalMiddleware
{
    private readonly RequestDelegate _next;
    private readonly SingletonService _singleton;  // Application lifetime

    public ConventionalMiddleware(RequestDelegate next, SingletonService singleton)
    {
        _next = next;
        _singleton = singleton;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // _singleton is shared across all requests
        await _next(context);
    }
}
```

```csharp:title=FactoryBased.cs
// Factory-based middleware (IMiddleware)
public class FactoryActivatedMiddleware : IMiddleware
{
    private readonly ScopedService _scoped;  // Per-request lifetime

    public FactoryActivatedMiddleware(ScopedService scoped)
    {
        _scoped = scoped;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        // _scoped is fresh for each request
        await _next(context);
    }
}
```

**How it works in practice**: Convention-based middleware is simpler but has application lifetime. This is fine for singleton services but problematic for scoped services. IMiddleware provides per-request activation, enabling proper scoped service injection. The tradeoff is additional complexity (DI registration) for the benefit of proper service lifetime semantics. Use convention-based middleware when you don't need scoped services, and IMiddleware when you do.

**Key takeaways for interviews**:
- Convention-based: constructed once, application lifetime
- Factory-based: activated per request, per-request lifetime
- Convention-based simpler but can't use scoped services properly
- IMiddleware enables proper scoped service semantics
- Choice depends on service lifetime requirements

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

**Real-life analogy**: Interview preparation for middleware extensibility concepts is like understanding different manufacturing approaches. You need to understand when to use permanent stations vs on-demand creation, the resource implications of each approach, and how to choose the right method based on requirements.

**Common interview questions**:
1. **What is IMiddleware and when should you use it?**
   - Interface for factory-based middleware activation
   - Enables per-request middleware activation
   - Allows scoped service injection into middleware
   - Provides strong typing with constructor injection
   - Use when middleware needs per-request services

2. **How does IMiddleware differ from convention-based middleware?**
   - IMiddleware activated per request
   - Convention-based constructed once at startup
   - IMiddleware enables scoped service injection
   - Convention-based has application lifetime
   - IMiddleware requires DI registration

3. **What are the benefits of factory-based middleware activation?**
   - Per-request activation (injection of scoped services)
   - Strong typing of middleware
   - Proper scoped service lifetime semantics
   - Fresh middleware instance for each request
   - Enables per-request resource management

4. **How do you register factory-based middleware?**
   - Implement IMiddleware interface with InvokeAsync method
   - Register middleware as scoped or transient service
   - Use UseMiddleware extension method
   - UseMiddleware detects IMiddleware and uses factory activation
   - Cannot pass objects to factory-activated middleware via UseMiddleware

5. **When should you use convention-based vs factory-based middleware?**
   - Use convention-based when you don't need scoped services
   - Use IMiddleware when you need per-request services
   - Convention-based is simpler (no DI registration needed)
   - IMiddleware provides proper service lifetime semantics
   - Choice depends on service lifetime requirements

**Key interview concepts**:
- **Per-Request Activation**: Fresh instance for each request
- **Scoped Service Injection**: Services with per-request lifetime
- **Strong Typing**: Type-safe constructor injection
- **Service Lifetime**: Application vs per-request
- **Factory Pattern**: Creating instances per request

**How to approach interview questions**:
- Start with clear definition of IMiddleware purpose
- Explain per-request activation vs application lifetime
- Discuss scoped service injection benefits
- Address registration differences (DI container)
- Mention when to use each approach based on requirements

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Factory-based middleware activation in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/middleware/extensibility?view=aspnetcore-10.0)