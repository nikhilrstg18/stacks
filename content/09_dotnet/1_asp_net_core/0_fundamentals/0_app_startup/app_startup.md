---
title: "App Startup"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/0_app_startup"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Program.cs - Like setting up a restaurant before opening</summary>
  <div>

## Program.cs - Application Startup

**Real-life analogy**: Think of Program.cs like setting up a restaurant before opening time. You need to arrange the kitchen equipment (configure services), set up the serving line (middleware pipeline), and make sure everything is ready before customers arrive. Once everything is prepared, you open the doors and start serving customers.

**Technical explanation**: Program.cs is where your ASP.NET Core application starts up. It's the place where you configure all the services your app needs and set up the request handling pipeline (middleware) that will process every incoming request.

**Key jargon explained**:
- **Services**: Reusable components that your app needs, like database connections, logging, or authentication
- **Middleware pipeline**: A sequence of components that process each HTTP request in order, like an assembly line
- **WebApplicationBuilder**: A helper class that makes it easy to configure and build your web application
- **ServerReady event**: A marker that tells you when your app is ready to handle requests

```csharp:title=Program.cs
using WebAll.Components;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
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

**How it works in practice**: This code first creates a builder (like getting your restaurant ready), adds the services you need (arranging kitchen equipment), builds the app (opening the restaurant), and then configures the middleware pipeline (setting up the serving line). Finally, it starts listening for requests (opening for customers). The ServerReady event fires when the server is fully prepared to handle incoming requests.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>IStartupFilter - Like having a backstage crew that sets up equipment automatically</summary>
  <div>

## Extending Startup with IStartupFilter

**Real-life analogy**: IStartupFilter is like having a backstage crew that automatically sets up equipment before the show starts. Instead of each performer setting up their own microphones and instruments, the crew does it for them. In code, IStartupFilter lets you add middleware to your app's pipeline without explicitly calling it in your main startup code.

**Technical explanation**: IStartupFilter allows you to configure middleware at the beginning or end of your app's middleware pipeline without making explicit calls to `Use{Middleware}`. This is useful for libraries and components that need to add their own middleware automatically.

**Key jargon explained**:
- **IStartupFilter**: An interface that lets you add middleware to the startup pipeline
- **IApplicationBuilder**: The object used to configure the middleware pipeline
- **Action<IApplicationBuilder>**: A function that takes the app builder and configures it

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

**How it works in practice**: This middleware checks if there's an "option" parameter in the URL query string. If there is, it stores it in the HttpContext items dictionary. This is useful for passing data between middleware components.

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

**How it works in practice**: The startup filter adds the middleware to the pipeline, then calls the next filter. This creates a chain where each filter can add its own middleware before or after the others.

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

**How it works in practice**: You register the startup filter as a service, and ASP.NET Core automatically runs it during startup. The filter adds its middleware to the pipeline without you having to explicitly call `UseMiddleware` in your main Program.cs.

### Middleware Execution Order

**Real-life analogy**: The order of startup filters is like the order of workers on an assembly line. If you want quality control before packaging, you put the quality inspector before the packer. The same principle applies to middleware - the order you register startup filters determines the order their middleware runs.

**Technical explanation**: Middleware execution order is determined by the order of IStartupFilter registrations. Filters can add middleware before or after passing control to the next filter, affecting where in the pipeline their middleware runs.

**How it works in practice**: If you need your middleware to run before a library's middleware, register your startup filter before adding the library. If you need it to run after, register it after. This gives you fine-grained control over middleware ordering without modifying library code.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>IHostingStartup - Like adding optional features to your phone</summary>
  <div>

## Adding Configuration from External Assemblies

**Real-life analogy**: IHostingStartup is like adding optional features to your phone. Just as you can install apps that add new functionality without changing your phone's core system, IHostingStartup lets external assemblies add features to your app without modifying your main startup code.

**Technical explanation**: IHostingStartup allows external assemblies to participate in app startup by adding configuration, services, or middleware. This is useful for adding enhancements from external libraries or plugins without changing your main application code.

**Key jargon explained**:
- **IHostingStartup**: An interface that lets external assemblies participate in app startup
- **External Assembly**: A separate library or DLL that can enhance your application
- **Hosting Startup Assemblies**: A configuration setting that specifies which external assemblies should participate in startup

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

**How it works in practice**: This code is in an external assembly. The `[assembly: HostingStartup]` attribute tells ASP.NET Core to load this assembly during startup. The Configure method adds services and middleware to your app automatically.

**Configuration**: You can specify which hosting startup assemblies to load using configuration:

```json:title=appsettings.json
{
  "HostingStartupAssemblies": "StartupHostingStartup;AnotherLibrary"
}
```

**How it works in practice**: This configuration tells ASP.NET Core to load the specified assemblies during startup. Each assembly can add its own configuration, services, and middleware without you having to modify your main Program.cs file.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Startup Performance - Like timing how fast a race car can go from 0 to 60</summary>
  <div>

## Startup Performance Optimization

**Real-life analogy**: Startup performance is like timing how fast a race car can go from 0 to 60 mph. You want to measure it, understand what affects it, and make it faster. In apps, you want to minimize startup time so users don't wait long for your app to be ready.

**Technical explanation**: ASP.NET Core provides tools to measure and optimize startup performance. Understanding what happens during startup helps you identify bottlenecks and make your app start faster.

**Key jargon explained**:
- **EventSource**: A feature that lets you track and measure application events
- **ServerReady Event**: The moment when your app is ready to handle requests
- **Startup Time**: The time it takes from launching the app to when it can handle requests

**How it works in practice**: You can use EventSource to track startup events and measure how long each phase takes. The ServerReady event marks the point where your app is fully ready to handle incoming requests, which is the key metric for startup performance.

### Performance Tips

**Real-life analogy**: Improving startup performance is like packing for a trip efficiently. You pack only what you need, organize it logically, and avoid unnecessary items. In code, you load only necessary services, avoid blocking operations, and optimize initialization.

**Technical explanation**: Key strategies for improving startup performance include minimizing service initialization, using lazy loading, avoiding blocking I/O during startup, and optimizing assembly loading.

**How it works in practice**: Focus on what's essential for startup - delay non-critical initialization until after the app is ready to handle requests. This reduces the time users wait for your app to become responsive.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [App startup in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/startup?view=aspnetcore-10.0)