---
title: "App Startup"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/0_app_startup"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Program.cs - Application Startup Configuration</summary>
  <div>

## Application Startup in Program.cs

**Real-life analogy**: Program.cs is like the infrastructure setup for a professional workspace. Before operations begin, you need to configure the building infrastructure (network, security, utilities), set up service dependencies (databases, external APIs), and establish operational protocols (request handling, error management). Program.cs performs this orchestration for ASP.NET Core applications, managing the complete lifecycle from initialization to request handling.

**Technical explanation**: Program.cs serves as the application entry point where service registration and middleware pipeline configuration occur. The WebApplication.CreateBuilder method creates a builder with preconfigured defaults, including configuration providers, logging infrastructure, and hosting environment. The builder pattern separates concerns: services are registered first (dependency injection), then the middleware pipeline is configured (request processing), and finally the application runs (request handling).

**Key jargon explained**:
- **WebApplicationBuilder**: The orchestrator that manages application startup configuration
- **Service Registration**: Adding dependencies to the DI container for lifetime management
- **Middleware Pipeline**: The ordered sequence of request processing components
- **Request Delegate**: The function that processes each HTTP request through the pipeline
- **ServerReady Event**: EventSource marker indicating when the server can handle requests

```csharp:title=Program.cs
using WebAll.Components;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container (Dependency Injection)
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline (Middleware)
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();

app.MapGet("/hi", () => "Hello!");
app.MapDefaultControllerRoute();
app.MapRazorPages();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
app.UseAntiforgery();

app.Run();
```

**How it works in practice**: The startup process follows the builder pattern for separation of concerns. First, services are registered in the DI container with appropriate lifetimes (transient, scoped, singleton). The container then resolves the dependency graph automatically. Next, middleware is configured in the order they should process requests - exception handling first, then HTTPS redirection, static files, authentication, authorization, and finally endpoint mapping. The ServerReady EventSource event fires when the server is fully prepared, enabling startup time measurement for performance optimization.

**Key takeaways for interviews**:
- Program.cs is the single entry point for application startup configuration
- Service registration happens before middleware configuration
- Middleware order is critical for security and functionality
- ServerReady event marks when the app can handle requests
- WebApplicationBuilder provides preconfigured defaults for common scenarios

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>IStartupFilter - Extending Startup Configuration</summary>
  <div>

## Extending Startup with IStartupFilter

**Real-life analogy**: IStartupFilter is like having an automated infrastructure setup team that configures systems before manual intervention. Instead of each team manually setting up their own middleware components, a centralized system automatically adds required middleware at the appropriate points in the pipeline. This enables libraries and frameworks to contribute to application startup without requiring explicit configuration code from the application developer.

**Technical explanation**: IStartupFilter implements the Chain of Responsibility pattern for startup configuration, allowing external components to add middleware to the application pipeline without explicit Use{Middleware} calls. Each IStartupFilter receives and returns an Action<IApplicationBuilder>, enabling filters to wrap or modify the Configure chain. This pattern supports library authors who need to add default middleware (like authentication, logging, or CORS) automatically, reducing boilerplate code and ensuring consistent configuration across applications.

**Key jargon explained**:
- **IStartupFilter**: Interface for contributing to middleware pipeline configuration
- **Action<IApplicationBuilder>: Function that configures the request pipeline
- **Middleware Wrapping**: Adding middleware before or after existing pipeline components
- **Service Container Ordering**: The order of IStartupFilter registration determines execution order
- **Library Integration**: Mechanism for libraries to participate in application startup

```csharp:title=RequestSetOptionsMiddleware.cs
public class RequestSetOptionsMiddleware
{
    private readonly RequestDelegate _next;

    public RequestSetOptionsMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    // Test with https://localhost:5001/Privacy/?option=Hello
    public async Task Invoke(HttpContext httpContext)
    {
        var option = httpContext.Request.Query["option"];

        if (!string.IsNullOrWhiteSpace(option))
        {
            httpContext.Items["option"] = WebUtility.HtmlEncode(option);
        }

        await _next(httpContext);
    }
}
```

```csharp:title=RequestSetOptionsStartupFilter.cs
public class RequestSetOptionsStartupFilter : IStartupFilter
{
    public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
    {
        return builder =>
        {
            builder.UseMiddleware<RequestSetOptionsMiddleware>();
            next(builder);
        };
    }
}
```

```csharp:title=Program.cs
using WebStartup.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddTransient<IStartupFilter,
                      RequestSetOptionsStartupFilter>();

var app = builder.Build();

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

app.Run();
```

**How it works in practice**: IStartupFilter implementations are registered as services in the DI container. When the application builds, each filter's Configure method is called in registration order. Each filter can add middleware before calling the next filter (appending to pipeline start) or after calling the next filter (appending to pipeline end). This enables libraries to add middleware automatically while allowing applications to control the order through service registration sequence. Multiple filters can interact with the same middleware components, making ordering critical for correct behavior.

**Key takeaways for interviews**:
- IStartupFilter enables libraries to add middleware without explicit configuration
- Filter execution order is determined by service registration order
- Filters can add middleware before or after other middleware in the pipeline
- Used by libraries to provide default configuration and reduce boilerplate
- Cannot extend startup when Configure is overridden (architectural constraint)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>IHostingStartup - External Assembly Configuration</summary>
  <div>

## Adding Configuration from External Assemblies

**Real-life analogy**: IHostingStartup is like a plugin architecture that allows external vendors to enhance your system without modifying core code. Similar to how browser extensions add functionality without changing the browser itself, external assemblies can participate in application startup, adding services, middleware, and configuration automatically. This enables modular application architecture where enhancements can be added through external dependencies.

**Technical explanation**: IHostingStartup implements the plugin pattern for application startup, allowing external assemblies to participate in the configuration process. The [assembly: HostingStartup] attribute marks assemblies for automatic loading during startup. Each IHostingStartup implementation receives an IWebHostBuilder and can configure services, middleware, and application settings. This pattern supports the Open/Closed Principle - applications are open for extension through external assemblies but closed for modification of core startup code.

**Key jargon explained**:
- **IHostingStartup**: Interface for external assembly participation in startup
- **Hosting Startup Assemblies**: Configuration specifying which external assemblies to load
- **Assembly Attribute**: [assembly: HostingStartup] marks assemblies for automatic discovery
- **External Assembly**: Separate DLL that enhances application functionality
- **Plugin Architecture**: Design pattern enabling runtime extensibility

```csharp:title=StartupHostingStartup.cs
using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(StartupHostingStartup))]

namespace StartupHostingStartup
{
    public class StartupHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton<IStartupFilter, CustomStartupFilter>();
            });

            builder.Configure(app =>
            {
                app.UseMiddleware<CustomMiddleware>();
            });
        }
    }
}
```

```json:title=appsettings.json
{
  "HostingStartupAssemblies": "StartupHostingStartup;AnotherLibrary"
}
```

**How it works in practice**: Hosting startup assemblies are specified through configuration (HostingStartupAssemblies) or discovered via assembly attributes. During startup, ASP.NET Core loads these assemblies and calls their IHostingStartup.Configure method. This allows external libraries to add services, middleware, and configuration without requiring changes to the application's Program.cs. The pattern is commonly used for feature toggles, A/B testing frameworks, monitoring integrations, and multi-tenant configurations where different assemblies provide different startup behaviors.

**Key takeaways for interviews**:
- IHostingStartup enables external assemblies to participate in startup
- Used for plugin architecture and modular application design
- Configuration via HostingStartupAssemblies setting or assembly attributes
- Supports the Open/Closed Principle for application extensibility
- Common use cases include feature flags, monitoring, and multi-tenant configurations

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Startup Performance - Optimization and Measurement</summary>
  <div>

## Startup Performance Optimization

**Real-life analogy**: Startup performance optimization is like minimizing the time between opening a restaurant and serving the first customer. You want to prepare the kitchen efficiently, preheat equipment, and have staff ready without unnecessary delays. In applications, startup time affects user experience, auto-scaling responsiveness, and operational costs. Measuring and optimizing startup performance ensures applications become responsive quickly.

**Technical explanation**: ASP.NET Core provides EventSource integration for measuring startup performance. The ServerReady event marks when the server can handle requests, providing a clear metric for startup completion. Performance optimization strategies include minimizing service initialization, using lazy loading for non-critical services, avoiding blocking I/O during startup, and optimizing assembly loading. The goal is to reduce the time from application launch to first request handling while maintaining functionality.

**Key jargon explained**:
- **EventSource**: Windows Event Tracing (ETW) system for performance monitoring
- **ServerReady Event**: EventSource marker indicating server readiness
- **Startup Time**: Duration from application launch to request handling capability
- **Lazy Loading**: Deferring initialization until first use
- **Assembly Loading**: Process of loading DLLs into the application domain

**How it works in practice**: EventSource enables detailed performance tracking through ETW. The ServerReady event fires when the middleware pipeline is fully configured and the server is listening for requests. Optimization strategies include: (1) Registering services with appropriate lifetimes to avoid unnecessary initialization, (2) Using lazy initialization for expensive services, (3) Minimizing blocking operations during startup, (4) Optimizing assembly loading through trimming and ahead-of-time compilation, (5) Using startup diagnostics to identify bottlenecks. Applications can measure startup time in different environments to identify performance regressions.

**Key takeaways for interviews**:
- ServerReady EventSource event marks when the app can handle requests
- Startup time affects user experience and operational costs
- Optimization includes lazy loading, minimizing blocking I/O, and assembly optimization
- EventSource integration enables detailed performance monitoring
- Different startup times in dev vs production require environment-specific optimization

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

**Real-life analogy**: Interview preparation for app startup concepts is like understanding the complete lifecycle of a building project - from initial construction to operational readiness. You need to understand the sequence of operations, dependencies between components, and how to optimize the process for efficiency and reliability.

**Common interview questions**:
1. **What is the purpose of Program.cs in ASP.NET Core?**
   - Explain it's the application entry point for service registration and middleware configuration
   - Discuss the builder pattern and separation of concerns
   - Mention WebApplication.CreateBuilder preconfiguration

2. **What is the difference between service registration and middleware configuration?**
   - Services are registered in the DI container for dependency injection
   - Middleware configures the request processing pipeline
   - Services happen first, middleware second in the startup sequence

3. **How does IStartupFilter work and when would you use it?**
   - Enables external components to add middleware without explicit configuration
   - Used by libraries to provide default middleware automatically
   - Implements Chain of Responsibility pattern for startup configuration

4. **What is IHostingStartup and how does it differ from IStartupFilter?**
   - IHostingStartup enables external assemblies to participate in startup
   - IStartupFilter adds middleware to the pipeline
   - IHostingStartup is for external assemblies, IStartupFilter is for pipeline modification

5. **How do you measure and optimize application startup time?**
   - Use EventSource and the ServerReady event for measurement
   - Optimize through lazy loading, minimizing blocking I/O, assembly optimization
   - Balance between functionality and startup performance

**Key interview concepts**:
- **Builder Pattern**: Separation of concerns in application startup
- **Dependency Injection**: Service lifetime management and resolution
- **Middleware Pipeline**: Request processing order and execution
- **Plugin Architecture**: IHostingStartup for external extensibility
- **Performance Optimization**: Startup time measurement and improvement strategies

**How to approach interview questions**:
- Start with clear definitions and architectural purpose
- Explain the theoretical underpinnings (design patterns, principles)
- Provide practical code examples and real-world applications
- Discuss trade-offs and when to use different approaches
- Mention performance implications and best practices

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [App startup in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/startup?view=aspnetcore-10.0)