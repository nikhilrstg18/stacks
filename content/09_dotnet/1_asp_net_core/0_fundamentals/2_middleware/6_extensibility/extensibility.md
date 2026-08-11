---
title: "Middleware Extensibility"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware/6_extensibility"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Factory-Based Middleware - Like having a personal chef vs a restaurant kitchen</summary>
  <div>

## What is Factory-Based Middleware Activation?

**Real-life analogy**: Factory-based middleware is like having a personal chef who prepares fresh meals for each guest, compared to a restaurant kitchen that uses pre-prepared ingredients. The personal chef (factory) creates a new meal (middleware instance) for each guest (request), ensuring everything is fresh and personalized. Convention-based middleware is like using pre-prepared ingredients that are shared across all guests.

**Technical explanation**: Factory-based middleware activation uses the IMiddleware and IMiddlewareFactory interfaces to create a new middleware instance for each request. This allows scoped services (services that live only for the duration of a request) to be injected into the middleware constructor, which isn't possible with convention-based middleware.

**Key jargon explained**:
- **IMiddleware**: Interface that defines middleware for the request pipeline
- **IMiddlewareFactory**: Interface that creates middleware instances
- **Factory-Based Activation**: Creating middleware instances per request
- **Convention-Based Activation**: Traditional middleware pattern with single instance
- **Scoped Services**: Services that are created once per HTTP request

**How it works in practice**: Instead of creating one middleware instance when the app starts (convention-based), the factory creates a new instance for each incoming request. This means you can inject scoped services like DbContext into your middleware, which you can't do with convention-based middleware because those services would last for the entire application lifetime.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Benefits of Factory-Based Middleware - Like having custom tools for each job</summary>
  <div>

## Benefits of Factory-Based Middleware

**Real-life analogy**: Factory-based middleware is like having custom tools for each specific job instead of using the same tool for everything. You wouldn't use a hammer to tighten screws - you'd use a screwdriver. Factory-based middleware gives you the right tool (services) for each request, while convention-based middleware forces you to use the same tools for all requests.

**Technical explanation**: Factory-based middleware activation offers two main benefits over convention-based middleware: activation per client request (allowing scoped service injection) and strong typing of middleware.

**Key jargon explained**:
- **Per-Request Activation**: Creating a new middleware instance for each HTTP request
- **Scoped Service Injection**: Ability to inject services that live only for one request
- **Strong Typing**: Better type safety and compile-time checking
- **Service Lifetime**: How long a service instance exists (singleton, scoped, transient)
- **DbContext**: Database context that typically has a scoped lifetime

### Key Benefits:
- **Scoped Service Support**: Can inject scoped services like DbContext into middleware
- **Better Resource Management**: Services are created and disposed properly per request
- **Strong Typing**: More type-safe than convention-based approach
- **Cleaner Code**: Less complex than using InvokeAsync parameters for scoped services
- **Testability**: Easier to test with properly scoped dependencies
- **Flexibility**: More control over middleware lifecycle

**How it works in practice**: Convention-based middleware is created once when the app starts, so any services injected into its constructor last for the entire application lifetime. This is a problem for scoped services like DbContext, which should only live for one request. Factory-based middleware solves this by creating a new instance per request, allowing proper scoped service injection.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>IMiddleware Interface - Like a chef's recipe template</summary>
  <div>

## IMiddleware Interface

**Real-life analogy**: The IMiddleware interface is like a chef's recipe template. It specifies what the chef must do (the methods they must implement) but leaves the details up to them. Every chef (middleware implementation) follows the same template but can have their own unique ingredients (dependencies) and techniques (logic).

**Technical explanation**: IMiddleware is an interface that defines middleware for the app's request pipeline. It requires implementing the InvokeAsync method that handles requests and returns a Task representing the middleware's execution.

**Key jargon explained**:
- **IMiddleware**: Interface that middleware must implement
- **InvokeAsync**: Method that processes the HTTP request
- **HttpContext**: Contains information about the current HTTP request
- **RequestDelegate**: Represents the next middleware in the pipeline
- **Task**: Represents an asynchronous operation

```csharp:title=FactoryActivatedMiddleware.cs
public class FactoryActivatedMiddleware : IMiddleware
{
    private readonly SampleDbContext _dbContext;

    // Can inject scoped services like DbContext
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

**How it works in practice**: When you implement IMiddleware:
1. Your middleware class must implement the IMiddleware interface
2. You can inject scoped services in the constructor (like DbContext)
3. You implement the InvokeAsync method to process requests
4. The factory creates a new instance of your middleware for each request
5. Each instance gets fresh scoped services

This is different from convention-based middleware where the constructor can only receive application-lifetime services.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Conventional vs Factory-Based - Like buying off-the-shelf vs custom-made</summary>
  <div>

## Conventional vs Factory-Based Middleware

**Real-life analogy**: Conventional middleware is like buying off-the-shelf clothes - one size fits all, but not perfect for anyone. Factory-based middleware is like custom-made clothes - tailored specifically for each person (request). The custom approach fits better but requires more setup (factory) to create each piece.

**Technical explanation**: Convention-based middleware follows a pattern with a constructor taking RequestDelegate and an InvokeAsync method. Factory-based middleware implements IMiddleware and is created per request by a factory, allowing scoped service injection.

**Key jargon explained**:
- **Convention-Based**: Traditional middleware pattern with constructor and InvokeAsync
- **Factory-Based**: IMiddleware implementation created per request
- **Application Lifetime**: Services that exist for the entire app runtime
- **Request Lifetime**: Services that exist only for one HTTP request
- **Middleware Instance**: The actual object that processes requests

### Conventional Middleware:
```csharp:title=ConventionalMiddleware.cs
public class ConventionalMiddleware
{
    private readonly RequestDelegate _next;

    public ConventionalMiddleware(RequestDelegate next)
        => _next = next;

    // Scoped services in InvokeAsync parameters (workaround)
    public async Task InvokeAsync(HttpContext context, SampleDbContext dbContext)
    {
        var keyValue = context.Request.Query["key"];

        if (!string.IsNullOrWhiteSpace(keyValue))
        {
            dbContext.Requests.Add(new Request("Conventional", keyValue));
            await dbContext.SaveChangesAsync();
        }

        await _next(context);
    }
}
```

### Factory-Based Middleware:
```csharp:title=FactoryActivatedMiddleware.cs
public class FactoryActivatedMiddleware : IMiddleware
{
    private readonly SampleDbContext _dbContext;

    // Scoped services in constructor (cleaner)
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

**How it works in practice**: The key difference is where scoped services are injected:
- **Conventional**: In InvokeAsync parameters (workaround, less clean)
- **Factory-based**: In constructor (proper DI pattern, cleaner code)

Factory-based middleware is preferred when you need scoped services, while conventional middleware is simpler for scenarios that don't require scoped dependencies.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>IMiddlewareFactory - Like a chef who prepares meals on demand</summary>
  <div>

## IMiddlewareFactory

**Real-life analogy**: IMiddlewareFactory is like a chef who prepares meals on demand. When a customer orders (request comes in), the chef (factory) prepares a fresh meal (middleware instance) using fresh ingredients (scoped services). Each customer gets a freshly prepared meal, not one that's been sitting around.

**Technical explanation**: IMiddlewareFactory provides methods to create middleware instances. The default implementation, MiddlewareFactory, is registered in the container as a scoped service and automatically handles creating middleware instances per request.

**Key jargon explained**:
- **IMiddlewareFactory**: Interface for creating middleware instances
- **MiddlewareFactory**: Default implementation of IMiddlewareFactory
- **Scoped Service**: Service created once per HTTP request
- **Service Container**: The dependency injection container
- **Middleware Resolution**: The process of getting a middleware instance

### How the Factory Works:
```csharp:title=FactoryProcess.cs
// 1. Request arrives
// 2. Factory is invoked
// 3. Factory creates new middleware instance
// 4. Scoped services are injected into constructor
// 5. Middleware processes the request
// 6. Instance is disposed when request completes
// 7. Next request gets a fresh instance
```

**How it works in practice**: You don't usually need to implement IMiddlewareFactory yourself. ASP.NET Core provides a default implementation that:
- Checks if middleware implements IMiddleware
- If yes, uses the factory to create instances per request
- If no, uses convention-based activation
- Handles all the complexity of lifecycle management

The factory is automatically registered when you use UseMiddleware with an IMiddleware implementation.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Implementing Factory-Based Middleware - Like setting up a custom kitchen</summary>
  <div>

## Implementing Factory-Based Middleware

**Real-life analogy**: Implementing factory-based middleware is like setting up a custom kitchen that prepares fresh meals for each customer. You need to design the kitchen (implement IMiddleware), hire chefs (register services), and set up the ordering system (register middleware in DI container). Each customer then gets a freshly prepared meal.

**Technical explanation**: To implement factory-based middleware, you create a class that implements IMiddleware, register it as a scoped or transient service in the DI container, and add it to the middleware pipeline using UseMiddleware.

**Key jargon explained**:
- **IMiddleware Implementation**: Your custom middleware class
- **Service Registration**: Adding middleware to the DI container
- **Scoped Service**: Service created per request
- **Transient Service**: Service created each time it's requested
- **Middleware Pipeline**: The sequence of middleware processing requests

### Step 1: Implement IMiddleware
```csharp:title=FactoryActivatedMiddleware.cs
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

### Step 2: Create Extension Method
```csharp:title=MiddlewareExtensions.cs
public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseFactoryActivatedMiddleware(
        this IApplicationBuilder app)
        => app.UseMiddleware<FactoryActivatedMiddleware>();
}
```

### Step 3: Register in DI Container
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<SampleDbContext>
    (options => options.UseInMemoryDatabase("SampleDb"));

// Register as scoped or transient
builder.Services.AddTransient<FactoryActivatedMiddleware>();

var app = builder.Build();
```

### Step 4: Add to Pipeline
```csharp:title=Program.cs
app.UseFactoryActivatedMiddleware();
```

**How it works in practice**: This setup ensures:
- A new middleware instance is created for each request
- Scoped services like DbContext are properly injected
- Services are disposed when the request completes
- Your middleware has access to request-specific resources

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Service Registration - Like signing up for a subscription service</summary>
  <div>

## Registering Factory-Based Middleware

**Real-life analogy**: Registering factory-based middleware is like signing up for a subscription service. You tell the company what you want (register the middleware), and they deliver it fresh each time you need it (per request). You don't get one delivery that lasts forever - you get fresh deliveries whenever you need them.

**Technical explanation**: Factory-based middleware must be registered in the DI container as a scoped or transient service. This is different from convention-based middleware, which doesn't require explicit registration in the container.

**Key jargon explained**:
- **Service Registration**: Adding a service to the DI container
- **Scoped Registration**: Service created once per HTTP request
- **Transient Registration**: Service created each time it's requested
- **Service Lifetime**: How long a service instance exists
- **DI Container**: The dependency injection service provider

### Registration Options:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register as scoped (one instance per request)
builder.Services.AddScoped<FactoryActivatedMiddleware>();

// Or register as transient (new instance each time)
builder.Services.AddTransient<FactoryActivatedMiddleware>();

// Add required services
builder.Services.AddDbContext<SampleDbContext>
    (options => options.UseInMemoryDatabase("SampleDb"));
```

### Choosing Between Scoped and Transient:
- **Scoped**: Use when middleware needs to share services within a request
- **Transient**: Use when each middleware instance needs its own service copies
- **Most common**: Scoped is typically the right choice for middleware

**How it works in practice**: When you register the middleware:
- The DI container knows how to create instances
- The factory uses the container to get instances per request
- Scoped services like DbContext work correctly
- Services are properly disposed when the request ends

Without registration, the factory won't know how to create your middleware, and you'll get runtime errors.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Limitations - Like restrictions on custom orders</summary>
  <div>

## Limitations of Factory-Based Middleware

**Real-life analogy**: Factory-based middleware has limitations like a restaurant that only offers set menu items. You can get fresh, custom-prepared meals, but you can't ask for special modifications or substitutions. Similarly, factory-based middleware offers per-request activation but doesn't support passing parameters to the constructor.

**Technical explanation**: Factory-based middleware cannot accept parameters passed through UseMiddleware. Attempting to pass parameters will throw a NotSupportedException at runtime. This is because the factory controls middleware creation, not the UseMiddleware method.

**Key jargon explained**:
- **Parameter Passing**: Sending values to middleware constructor
- **NotSupportedException**: Exception thrown when unsupported operation is attempted
- **Constructor Parameters**: Values passed to constructor during creation
- **UseMiddleware Overloads**: Different ways to call UseMiddleware
- **Runtime Exception**: Error that occurs while the application is running

### What Doesn't Work:
```csharp:title=InvalidUsage.cs
public static IApplicationBuilder UseFactoryActivatedMiddleware(
    this IApplicationBuilder app, bool option)
{
    // This throws NotSupportedException at runtime
    return app.UseMiddleware<FactoryActivatedMiddleware>(option);
}
```

### Workaround for Configuration:
```csharp:title=Workaround.cs
// Option 1: Use options pattern
builder.Services.Configure<MiddlewareOptions>(configuration);

public class FactoryActivatedMiddleware : IMiddleware
{
    private readonly MiddlewareOptions _options;
    private readonly SampleDbContext _dbContext;

    public FactoryActivatedMiddleware(
        IOptions<MiddlewareOptions> options,
        SampleDbContext dbContext)
    {
        _options = options.Value;
        _dbContext = dbContext;
    }
}

// Option 2: Use a service to hold configuration
public class MiddlewareConfig
{
    public bool Option { get; set; }
}

builder.Services.AddSingleton(new MiddlewareConfig { Option = true });
```

**How it works in practice**: If you need to pass configuration to factory-based middleware:
- Use the options pattern (IOptions<T>)
- Register a configuration service
- Inject the configuration service into the middleware
- Don't try to pass parameters through UseMiddleware

This limitation exists because the factory controls middleware creation, so it doesn't support the parameter passing mechanism that convention-based middleware uses.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>When to Use Factory-Based Middleware - Like knowing when to order custom vs off-the-shelf</summary>
  <div>

## When to Use Factory-Based Middleware

**Real-life analogy**: Factory-based middleware is like choosing custom-made clothes when you need a perfect fit, versus off-the-shelf clothes when standard sizes work fine. You use factory-based middleware when you need scoped services (perfect fit), and convention-based middleware when standard application-lifetime services work fine.

**Technical explanation**: Use factory-based middleware when you need to inject scoped services into your middleware constructor. Use convention-based middleware when you only need application-lifetime services or when you don't need dependency injection at all.

**Key jargon explained**:
- **Scoped Services**: Services that live for one HTTP request
- **Application-Lifetime Services**: Services that live for the entire app runtime
- **DbContext**: Database context that should be scoped
- **ILogger**: Logger that can be application-lifetime or scoped
- **Configuration**: Settings that are typically application-lifetime

### When to Use Factory-Based:
- **Need DbContext**: Middleware needs database access per request
- **Request-Specific Services**: Need services that vary per request
- **User Context**: Need user-specific services or data
- **Scoped Dependencies**: Middleware depends on scoped services
- **Better DI Patterns**: Want cleaner constructor injection

### When to Use Convention-Based:
- **Simple Middleware**: No dependencies or only simple dependencies
- **Application Services**: Only need application-lifetime services like ILogger
- **Configuration**: Need to pass parameters through UseMiddleware
- **Legacy Code**: Working with existing convention-based middleware
- **Performance**: Want the slight performance advantage of single instance

```csharp:title=Decision.cs
// GOOD: Factory-based (needs DbContext)
public class LoggingMiddleware : IMiddleware
{
    private readonly AppDbContext _db;
    
    public LoggingMiddleware(AppDbContext db) => _db = db;
    
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        // Log to database
        await _db.Logs.AddAsync(new Log());
        await next(context);
    }
}

// GOOD: Convention-based (only needs ILogger)
public class SimpleMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<SimpleMiddleware> _logger;
    
    public SimpleMiddleware(RequestDelegate next, ILogger<SimpleMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation("Request received");
        await _next(context);
    }
}
```

**How it works in practice**: Choose factory-based middleware when:
- Your middleware needs scoped services like DbContext
- You want cleaner dependency injection patterns
- You need request-specific resources

Choose convention-based middleware when:
- Your middleware is simple with few or no dependencies
- You only need application-lifetime services
- You need to pass parameters through UseMiddleware

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Factory-based middleware activation in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/middleware/extensibility?view=aspnetcore-10.0)