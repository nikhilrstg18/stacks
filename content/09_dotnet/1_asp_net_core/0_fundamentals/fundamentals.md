---
title: "Fundamentals"
slug: "09_dotnet/1_asp_net_core/0_fundamentals"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>ASP.NET Core Fundamentals Overview</summary>
  <div>

## ASP.NET Core Fundamentals

**Real-life analogy**: ASP.NET Core fundamentals are like the foundational systems of a building - structural framework, electrical wiring, plumbing, and HVAC. These foundational systems enable everything else to function properly. You need to understand the structural integrity, power distribution, water flow, and climate control before building out specific rooms or features. ASP.NET Core fundamentals provide the same foundational systems - hosting, dependency injection, configuration, middleware, routing, and logging - that enable all other application functionality.

**Technical explanation**: ASP.NET Core fundamentals provide the core infrastructure for building web applications. Program.cs contains application startup code where services are configured and the request handling pipeline is defined. WebApplication.CreateBuilder initializes the builder with preconfigured defaults including dependency injection, configuration, logging, and hosting. The middleware pipeline processes requests through a series of components. Dependency injection provides services throughout the application. Configuration manages settings from multiple sources. Routing matches requests to endpoints. These fundamentals work together to provide a robust, testable, and maintainable application foundation.

**Key jargon explained**:
- **Program.cs**: Application startup and configuration
- **WebApplication.CreateBuilder**: Initializes builder with preconfigured defaults
- **Middleware Pipeline**: Series of components processing requests
- **Dependency Injection**: Service registration and resolution
- **Configuration**: Settings management from multiple sources

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();

app.Run();
```

**How it works in practice**: WebApplication.CreateBuilder initializes the builder with preconfigured DI container, configuration providers, logging infrastructure, and hosting. builder.Services registers application services. app.Use* methods add middleware to the pipeline in the order they should execute. app.Map* methods define endpoints for routing. The middleware pipeline processes each request through all middleware components, with each component potentially modifying the request or response. DI provides registered services to constructors throughout the application.

**Key takeaways for interviews**:
- Program.cs contains application startup and configuration
- WebApplication.CreateBuilder provides preconfigured defaults
- Middleware pipeline processes requests through components
- Dependency injection provides services throughout the application
- Configuration manages settings from multiple sources

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Dependency Injection - Service Management</summary>
  <div>

## Dependency Injection

**Real-life analogy**: Dependency injection is like having a centralized supply department that provides resources to different departments. Instead of each department creating their own tools and materials (creating dependencies internally), they request what they need from the supply department (dependency injection). This enables centralized management, consistent quality, easy testing (mock supplies), and flexibility in changing suppliers. ASP.NET Core DI provides the same centralized service management.

**Technical explanation**: ASP.NET Core features built-in dependency injection that makes configured services available throughout the application. Services are added to the DI container with builder.Services. Framework-provided services (configuration, logging, hosting) are added automatically. Custom services are registered with AddTransient, AddScoped, or AddSingleton. Services are resolved via constructor injection or @inject directive in Razor components. DI enables loose coupling, testability, and centralized service management.

**Key jargon explained**:
- **DI Container**: Central registry of services
- **Service Lifetime**: Transient, Scoped, Singleton
- **Constructor Injection**: Services injected via constructor parameters
- **@inject Directive**: Service injection in Razor components
- **Framework Services**: Pre-registered services (configuration, logging, hosting)

```csharp:title=ServiceRegistration.cs
var builder = WebApplication.CreateBuilder(args);

// Register services with different lifetimes
builder.Services.AddTransient<TransientService>();
builder.Services.AddScoped<ScopedService>();
builder.Services.AddSingleton<SingletonService>();

// Register DbContext
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register framework services
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
```

```csharp:title=ConstructorInjection.cs
public class MyService
{
    private readonly ScopedService _scoped;
    private readonly ILogger<MyService> _logger;

    public MyService(ScopedService scoped, ILogger<MyService> logger)
    {
        _scoped = scoped;
        _logger = logger;
    }

    public void DoWork()
    {
        _logger.LogInformation("Doing work");
        _scoped.Process();
    }
}
```

```razor:title=RazorInjection.cs
@page "/"
@inject ILogger<IndexModel> Logger
@inject ScopedService Scoped

<h1>Index</h1>

@code {
    protected override void OnInitialized()
    {
        Logger.LogInformation("Page initialized");
        Scoped.Process();
    }
}
```

**How it works in practice**: Services are registered in Program.cs with specific lifetimes. Transient services are created each time they're requested. Scoped services are created once per request. Singleton services are created once per application lifetime. Services are resolved via constructor injection or @inject directive. The DI container automatically resolves constructor parameters, including nested dependencies. This enables loose coupling between components and makes testing easier by allowing mocked services.

**Key takeaways for interviews**:
- DI provides centralized service management
- Service lifetimes: Transient (each request), Scoped (per HTTP request), Singleton (per app)
- Constructor injection enables loose coupling
- Framework services pre-registered (configuration, logging, hosting)
- Enables testability through service mocking

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Middleware Pipeline - Request Processing</summary>
  <div>

## Middleware Pipeline

**Real-life analogy**: The middleware pipeline is like an assembly line where each station performs specific processing. An item moves through stations in order - inspection, modification, processing, packaging, quality control. Each station can modify the item, pass it to the next station, or stop processing. The middleware pipeline works the same way - each middleware component processes requests in order, potentially modifying them, passing them to the next component, or terminating the pipeline.

**Technical explanation**: The middleware pipeline is defined as a series of middleware components that process requests. Each middleware component can modify the request, pass it to the next component via next(), or terminate the pipeline. Middleware is added with app.Use* methods in the order they should execute. Common middleware includes HTTPS redirection, static files, routing, authentication, authorization, and endpoint mapping. The pipeline order is critical - middleware must be added in the correct sequence.

**Key jargon explained**:
- **Middleware Pipeline**: Series of components processing requests
- **next()**: Delegate to pass control to the next middleware
- **Pipeline Order**: Critical for correct request processing
- **Terminal Middleware**: Middleware that terminates the pipeline
- **Branching**: Conditional middleware execution

```csharp:title=Pipeline.cs
var app = builder.Build();

// Middleware order is critical
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");  // Exception handling first
}

app.UseHttpsRedirection();  // HTTPS redirection
app.UseStaticFiles();  // Static files
app.UseRouting();  // Routing
app.UseAuthentication();  // Authentication
app.UseAuthorization();  // Authorization

app.MapRazorPages();  // Endpoint mapping
app.MapControllers();

app.Run();
```

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
        // Process request
        await _next(context);  // Call next middleware
        // Process response
    }
}
```

**How it works in practice**: Middleware components are added to the pipeline in the order they should execute. When a request arrives, the first middleware component processes it, calls next() to pass to the next component, and the request flows through all components. The response flows back through the pipeline in reverse order. Middleware can short-circuit the pipeline by not calling next(). This enables cross-cutting concerns like authentication, authorization, logging, and error handling to be implemented consistently across all endpoints.

**Key takeaways for interviews**:
- Middleware pipeline processes requests through components in order
- Each middleware can modify request/response or short-circuit
- Pipeline order is critical for correct behavior
- next() passes control to the next middleware
- Enables cross-cutting concerns (auth, logging, error handling)

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

**Real-life analogy**: Interview preparation for ASP.NET Core fundamentals is like understanding complete building systems. You need to understand the foundational infrastructure, how systems interact, how to configure them, how to troubleshoot issues, and how to build upon them to create functional applications.

**Common interview questions**:
1. **What is Program.cs and what does it do?**
   - Contains application startup and configuration code
   - Configures services via builder.Services
   - Defines middleware pipeline via app.Use* methods
   - Maps endpoints via app.Map* methods
   - Entry point for application initialization

2. **How does dependency injection work in ASP.NET Core?**
   - Services registered with builder.Services
   - Service lifetimes: Transient, Scoped, Singleton
   - Resolved via constructor injection or @inject directive
   - Framework services pre-registered automatically
   - Enables loose coupling and testability

3. **What is the middleware pipeline and how does it work?**
   - Series of components processing requests in order
   - Each middleware can modify request/response or short-circuit
   - Pipeline order is critical for correct behavior
   - next() passes control to the next middleware
   - Response flows back in reverse order

4. **What are the different service lifetimes in DI?**
   - Transient: New instance each time requested
   - Scoped: One instance per HTTP request
   - Singleton: One instance per application lifetime
   - Choice depends on service characteristics and requirements
   - Scoped services must be used carefully in singletons

5. **How does configuration work in ASP.NET Core?**
   - Configuration from multiple sources (JSON, environment variables, command-line)
   - WebApplication.CreateBuilder preconfigures default providers
   - Configuration accessed via IConfiguration
   - Options pattern provides strongly-typed configuration
   - Environment-specific configuration files

**Key interview concepts**:
- **Application Startup**: Program.cs configuration and pipeline setup
- **Dependency Injection**: Service registration and resolution
- **Middleware Pipeline**: Request processing through components
- **Configuration**: Settings management from multiple sources
- **Service Lifetimes**: Transient, Scoped, Singleton

**How to approach interview questions**:
- Start with clear definition of Program.cs role
- Explain DI service registration and resolution
- Discuss middleware pipeline order and behavior
- Address configuration sources and options pattern
- Mention service lifetimes and their use cases

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core fundamentals overview | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/?view=aspnetcore-10.0&tabs=windows)