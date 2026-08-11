---
title: "Fundamentals"
slug: "09_dotnet/1_asp_net_core/0_fundamentals"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>ASP.NET Core Fundamentals - Like the foundation of a building</summary>
  <div>

## What are ASP.NET Core Fundamentals?

**Real-life analogy**: ASP.NET Core fundamentals are like the foundation of a building. Before you can build walls, add rooms, or decorate the interior, you need a solid foundation. The foundation includes things like the base structure, plumbing, electrical wiring, and utilities. ASP.NET Core fundamentals are the same - the essential building blocks you need to create any web application.

**Technical explanation**: ASP.NET Core fundamentals are the core concepts and features that every ASP.NET Core developer needs to understand. These include dependency injection, configuration, middleware, hosting, error handling, logging, routing, and more. These fundamentals form the foundation for building web applications, APIs, and services with ASP.NET Core.

**Key jargon explained**:
- **Fundamentals**: The essential building blocks of ASP.NET Core
- **Program.cs**: The entry point where your application starts
- **WebApplicationBuilder**: The builder that creates your web application
- **Middleware Pipeline**: The sequence of components that process requests
- **Services**: Reusable components that provide functionality

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure middleware pipeline
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapRazorPages();
app.MapControllers();

app.Run();
```

**How it works in practice**: ASP.NET Core fundamentals provide:
- **Structure**: A clear way to organize your application
- **Flexibility**: Different app types (API, MVC, Razor Pages, Blazor)
- **Extensibility**: Add custom features through middleware and services
- **Performance**: Built-in optimizations for speed and efficiency
- **Security**: Built-in security features and best practices

Understanding these fundamentals is essential for building effective ASP.NET Core applications.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Program.cs and Application Startup - Like setting up a restaurant</summary>
  <div>

## Program.cs and Application Startup

**Real-life analogy**: Program.cs is like setting up a restaurant before opening time. You need to arrange the kitchen equipment (configure services), set up the serving line (middleware pipeline), and make sure everything is ready before customers arrive. Once everything is prepared, you open the doors and start serving customers.

**Technical explanation**: Program.cs is where your ASP.NET Core application starts up. It's the place where you configure all the services your app needs and set up the request handling pipeline (middleware) that will process every incoming request. This is where you add services like database contexts, logging, and authentication.

**Key jargon explained**:
- **Program.cs**: The entry point of your ASP.NET Core application
- **WebApplicationBuilder**: A helper class that makes it easy to configure and build your web application
- **Services**: Reusable components that your app needs (database, logging, authentication)
- **Middleware Pipeline**: A sequence of components that process each HTTP request
- **WebApplication**: The built application that can handle requests

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(connectionString));

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

**How it works in practice**: The startup process:
1. **Create Builder**: Create a WebApplicationBuilder with preconfigured defaults
2. **Add Services**: Register services you need (database, logging, etc.)
3. **Build App**: Build the WebApplication instance
4. **Configure Pipeline**: Add middleware to process requests
5. **Map Endpoints**: Define URL patterns for your app
6. **Run**: Start the application and begin processing requests

Program.cs is the foundation of every ASP.NET Core application.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Dependency Injection - Like a restaurant kitchen</summary>
  <div>

## Dependency Injection

**Real-life analogy**: Dependency injection is like a restaurant kitchen. Instead of each chef bringing their own knives, pots, and ingredients (creating their own dependencies), the kitchen provides all the equipment and ingredients they need. The chefs just ask for what they need, and the kitchen provides it. This makes the kitchen more efficient and easier to manage.

**Technical explanation**: Dependency injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them itself. ASP.NET Core includes built-in DI that makes configured services available throughout your app. Services are added to the DI container and can be injected wherever they're needed.

**Key jargon explained**:
- **Dependency Injection**: A pattern for managing dependencies between classes
- **DI Container**: A built-in service that manages and provides dependencies
- **Service**: A reusable component that can be injected into other classes
- **Constructor Injection**: Receiving dependencies through your class's constructor
- **Service Lifetime**: How long a service instance lives (transient, scoped, singleton)

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the DI container
builder.Services.AddScoped<IMyService, MyService>();
builder.Services.AddDbContext<MyDbContext>();
builder.Services.AddHttpClient();

var app = builder.Build();
```

```csharp:title=Service.cs
public class MyService : IMyService
{
    private readonly HttpClient _httpClient;
    private readonly MyDbContext _context;

    // Dependencies are injected via constructor
    public MyService(HttpClient httpClient, MyDbContext context)
    {
        _httpClient = httpClient;
        _context = context;
    }

    public void DoSomething()
    {
        // Use injected dependencies
    }
}
```

**How it works in practice**: Dependency injection provides:
- **Loose Coupling**: Classes aren't tightly coupled to specific implementations
- **Testability**: Easy to swap real dependencies with test versions
- **Maintainability**: Centralized service configuration
- **Efficiency**: Services can be shared and reused
- **Lifetime Management**: Automatic creation and disposal of service instances

Dependency injection is a fundamental concept that makes ASP.NET Core applications more maintainable and testable.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Middleware - Like an assembly line</summary>
  <div>

## Middleware

**Real-life analogy**: Middleware is like an assembly line in a factory. Each worker (middleware component) does a specific job on the product (HTTP request) before passing it to the next worker. One worker checks quality, another adds labels, another packages the item. If there's a problem, they can stop the line or fix it. In ASP.NET Core, each middleware handles the request in order.

**Technical explanation**: Middleware is software that handles requests and responses in ASP.NET Core applications. Each component can choose whether to pass the request to the next component in the pipeline, and can perform actions before and after the next component. Middleware is configured in the request processing pipeline in Program.cs.

**Key jargon explained**:
- **Middleware**: Software components that process HTTP requests
- **Middleware Pipeline**: The sequence of middleware that processes requests
- **Request Delegate**: A function that represents the next middleware in the pipeline
- **Terminal Middleware**: Middleware that doesn't call the next delegate (ends the pipeline)
- **Middleware Order**: The order in which middleware components are executed

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Middleware pipeline configuration
app.UseHttpsRedirection();           // Redirect HTTP to HTTPS
app.UseStaticFiles();                // Serve static files
app.UseRouting();                    // Enable routing
app.UseAuthentication();             // Enable authentication
app.UseAuthorization();              // Enable authorization
app.MapControllers();              // Map controller endpoints

app.Run();
```

```csharp:title=CustomMiddleware.cs
// Custom middleware example
public class CustomMiddleware
{
    private readonly RequestDelegate _next;

    public CustomMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Code to execute before passing to next middleware
        Console.WriteLine($"Request: {context.Request.Path}");

        await _next(context);  // Pass to next middleware

        // Code to execute after next middleware completes
        Console.WriteLine($"Response: {context.Response.StatusCode}");
    }
}
```

**How it works in practice**: Middleware provides:
- **Modular Design**: Each middleware does one specific job
- **Flexibility**: Easy to add, remove, or reorder middleware
- **Reusability**: Middleware can be reused across applications
- **Order Control**: The order determines how requests are processed
- **Request/Response Processing**: Can modify both incoming requests and outgoing responses

Middleware is the backbone of request processing in ASP.NET Core applications.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Configuration - Like app settings</summary>
  <div>

## Configuration

**Real-life analogy**: Configuration is like your phone's settings. You can change different options (brightness, volume, notifications) from different places - the settings app, control center, or during setup. ASP.NET Core lets you configure your app from different sources - files, environment variables, command line arguments, or secret managers - just like how you can change your phone settings from multiple places.

**Technical explanation**: Configuration in ASP.NET Core is based on key-value pairs that can come from multiple sources. Configuration providers read configuration data from various sources like JSON files, environment variables, command-line arguments, and more. The Configuration API provides a unified way to access settings from any source.

**Key jargon explained**:
- **Configuration**: Settings and options for your application
- **Configuration Providers**: Components that read configuration from different sources
- **appsettings.json**: JSON file containing configuration values
- **Environment Variables**: System-level configuration values
- **IConfiguration**: Interface for accessing configuration in your code

```csharp:title=appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb"
  },
  "AllowedHosts": "*"
}
```

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Access configuration
var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
var logLevel = builder.Configuration["Logging:LogLevel:Default"];

// Use configuration in services
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();
```

```csharp:title=OptionsPattern.cs
// Using the Options pattern for strongly-typed configuration
public class MyOptions
{
    public const string MySection = "MySection";
    public string Setting1 { get; set; }
    public int Setting2 { get; set; }
}

// In Program.cs
builder.Services.Configure<MyOptions>(
    builder.Configuration.GetSection(MyOptions.MySection));
```

**How it works in practice**: Configuration provides:
- **Multiple Sources**: Configuration from files, environment variables, command line, etc.
- **Environment-Specific**: Different settings for Development, Staging, Production
- **Type Safety**: Options pattern provides strongly-typed configuration
- **Hierarchical**: Supports nested configuration structures
- **Flexible**: Easy to add new configuration providers

Configuration allows your application to adapt to different environments and deployment scenarios.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Hosting - Like the building infrastructure</summary>
  <div>

## Hosting

**Real-life analogy**: Hosting is like the building infrastructure for your restaurant. The building provides the physical space, utilities (water, electricity, HVAC), and security systems. Your restaurant (application) runs inside this building. ASP.NET Core hosting provides the infrastructure - the web server, environment configuration, and lifetime management - that your application runs in.

**Technical explanation**: Hosting in ASP.NET Core refers to the infrastructure that runs your application. This includes the web server (Kestrel), environment configuration, lifetime management, and the host that manages the application startup and shutdown. The Generic Host is the recommended hosting model for all ASP.NET Core applications.

**Key jargon explained**:
- **Generic Host**: The recommended hosting model for ASP.NET Core apps
- **Kestrel**: The built-in, cross-platform web server
- **Web Host**: Legacy hosting model (still supported but not recommended)
- **IHost**: The host that manages application lifetime
- **Host Builder**: The builder that creates the host

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// The builder automatically:
// - Sets up Kestrel as the web server
// - Loads configuration from appsettings.json
// - Enables logging
// - Configures the hosting environment

builder.Services.AddRazorPages();

var app = builder.Build();

app.MapRazorPages();

app.Run();
```

```csharp:title=WebApplicationBuilder.cs
// WebApplicationBuilder simplifies the setup
var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000);
    options.ListenAnyIP(5001, configureOptions =>
    {
        configureOptions.UseHttps();
    });
});

builder.Services.AddRazorPages();

var app = builder.Build();

app.MapRazorPages();

app.Run();
```

```csharp:title=Environment.cs
// Environment-specific configuration
if (builder.Environment.IsDevelopment())
{
    // Development-specific configuration
    builder.Logging.AddConsole();
}
else if (builder.Environment.IsProduction())
{
    // Production-specific configuration
    builder.Logging.AddApplicationInsights();
}
```

**How it works in practice**: Hosting provides:
- **Web Server**: Kestrel provides high-performance HTTP serving
- **Configuration**: Automatic loading of configuration from multiple sources
- **Logging**: Built-in logging infrastructure
- **Lifetime Management**: Graceful startup and shutdown
- **Environment Support**: Different configurations for different environments

Hosting provides the infrastructure that makes your application run reliably and efficiently.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Logging - Like keeping a record book</summary>
  <div>

## Logging

**Real-life analogy**: Logging is like keeping a record book in a restaurant. You record important events: when customers arrive, what they ordered, any problems that occurred, and when they left. This record book helps you understand what's happening, troubleshoot issues, and improve your service. ASP.NET Core logging does the same for your application.

**Technical explanation**: Logging in ASP.NET Core allows you to record information about application events, errors, and performance. The built-in logging API works with various logging providers (console, file, Azure Application Insights, etc.) to output log messages. Logging is configured in Program.cs and can be used throughout your application.

**Key jargon explained**:
- **Logging**: Recording information about application events
- **ILogger<T>: Interface for logging in your application
- **Log Levels**: Severity levels (Trace, Debug, Information, Warning, Error, Critical)
- **Logging Provider**: Component that outputs log messages (console, file, etc.)
- **Log Category**: The name associated with log messages (usually the class name)

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

builder.Services.AddRazorPages();

var app = builder.Build();
```

```csharp:title=Service.cs
public class MyService
{
    private readonly ILogger<MyService> _logger;

    public MyService(ILogger<MyService> logger)
    {
        _logger = logger;
    }

    public void DoSomething()
    {
        _logger.LogInformation("Doing something...");
        _logger.LogWarning("Something might be wrong");
        _logger.LogError("Something went wrong!");
    }
}
```

```csharp:title=LogLevels.cs
// Log levels (from least to most severe):
// Trace: Very detailed information for debugging
// Debug: Detailed information for debugging
// Information: General informational messages
// Warning: Warning messages for potential issues
// Error: Error messages for failures
// Critical: Critical errors requiring immediate attention
```

```csharp:title=Configuration.cs
// Configure logging levels in appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "MyApp.Services": "Debug"
    }
  }
}
```

**How it works in practice**: Logging provides:
- **Debugging**: Detailed information to troubleshoot issues
- **Monitoring**: Track application health and performance
- **Audit Trail**: Record important events and errors
- **Flexibility**: Multiple logging providers for different needs
- **Configuration**: Control log levels per environment

Logging is essential for understanding what's happening in your application and troubleshooting issues.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Error Handling - Like having a backup plan</summary>
  <div>

## Error Handling

**Real-life analogy**: Error handling is like having a backup plan when things go wrong. If a chef burns a dish, there's a backup plan (offer a different dish). If the power goes out, there's a backup plan (use emergency lights). Error handling in apps is the same - it's your backup plan when something unexpected happens, so the app doesn't just crash.

**Technical explanation**: Error handling in ASP.NET Core involves catching and managing exceptions that occur during request processing. Instead of letting errors crash the application or expose sensitive information to users, error handling middleware catches exceptions and provides appropriate error responses. Different error handling strategies are used for development and production.

**Key jargon explained**:
- **Exception**: An error that occurs during program execution
- **Error Handling**: The process of catching and managing exceptions
- **Developer Exception Page**: Detailed error page for development
- **Exception Handler**: Middleware that catches and handles exceptions
- **Try-Catch**: Code blocks that catch exceptions locally

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Environment-specific error handling
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();  // Detailed errors for development
}
else
{
    app.UseExceptionHandler("/Error");  // User-friendly errors for production
    app.UseHsts();
}

app.MapRazorPages();

app.Run();
```

```csharp:title=TryCatch.cs
// Local error handling with try-catch
app.MapGet("/divide", (int a, int b) =>
{
    try
    {
        var result = a / b;
        return $"Result: {result}";
    }
    catch (DivideByZeroException)
    {
        return "Error: Cannot divide by zero";
    }
});
```

```csharp:title=CustomErrorPage.cs
// Custom error page
app.MapGet("/Error", () => "Something went wrong. Please try again later.");

// Configure exception handler
if (!builder.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
```

**How it works in practice**: Error handling provides:
- **Graceful Degradation**: App continues running even when errors occur
- **User-Friendly Messages**: Users see helpful error messages instead of technical details
- **Security**: Sensitive information is not exposed to users
- **Debugging Tools**: Detailed error information in development
- **Logging**: Errors are logged for investigation

Error handling ensures your application is robust and user-friendly even when things go wrong.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Routing - Like a receptionist directing visitors</summary>
  <div>

## Routing

**Real-life analogy**: Routing is like a receptionist at a large building. When visitors arrive, the receptionist looks at their destination (URL) and directs them to the right department (endpoint). If someone wants to see HR, the receptionist sends them to the HR department. If they want to see IT, they go to IT. The receptionist ensures everyone gets to the right place.

**Technical explanation**: Routing is responsible for matching incoming HTTP requests to the app's executable endpoints. Endpoints are units of executable request-handling code. Routing extracts values from the request's URL and provides them for request processing. It can also generate URLs that map to endpoints.

**Key jargon explained**:
- **Routing**: The process of matching requests to endpoints
- **Endpoint**: A unit of executable request-handling code
- **Route Template**: A pattern that defines how URLs are matched
- **Route Parameters**: Values extracted from the URL during matching
- **HTTP Method**: The type of request (GET, POST, PUT, DELETE)

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Simple routing
app.MapGet("/", () => "Hello World!");
app.MapGet("/hello/{name}", (string name) => $"Hello {name}!");

// Different HTTP methods
app.MapPost("/api/users", () => "Create a user");
app.MapPut("/api/users/{id}", (int id) => $"Update user {id}");
app.MapDelete("/api/users/{id}", (int id) => $"Delete user {id}");

app.Run();
```

```csharp:title=RouteConstraints.cs
// Route constraints validate parameter values
app.MapGet("/users/{id:int}", (int id) => $"User {id}");
// Matches: /users/123
// Doesn't match: /users/abc

app.MapGet("/products/{name:alpha}", (string name) => $"Product {name}");
// Matches: /products/books
// Doesn't match: /products/books123
```

```csharp:title=RouteGroups.cs
// Route groups organize related endpoints
var api = app.MapGroup("/api").RequireAuthorization();

api.MapGet("/users", () => "Get all users");
api.MapPost("/users", () => "Create a user");
api.MapGet("/users/{id}", (int id) => $"Get user {id}");

// All endpoints require authentication
```

**How it works in practice**: Routing provides:
- **URL Matching**: Maps incoming URLs to the correct endpoint
- **Parameter Extraction**: Pulls values from URLs for use in your code
- **HTTP Method Matching**: Different endpoints for GET, POST, etc.
- **URL Generation**: Creates URLs based on endpoint definitions
- **Flexible Patterns**: Supports complex URL patterns with constraints

Routing is the traffic controller that directs each request to the right handler.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HttpContext - Like a complete dossier</summary>
  <div>

## HttpContext

**Real-life analogy**: HttpContext is like a complete dossier on a visitor. It contains everything you need to know about the visitor - who they are (user), what they want (request), what they're allowed to do (authorization), and what you should give them (response). Instead of looking up information in different places, everything about this specific visitor is in one convenient dossier.

**Technical explanation**: HttpContext encapsulates all information about an individual HTTP request and response. It's initialized when an HTTP request is received and provides access to the request, response, user information, and other HTTP-related data. HttpContext is accessible by middleware and app frameworks like controllers, Razor Pages, and SignalR.

**Key jargon explained**:
- **HttpContext**: The main object containing all HTTP request/response information
- **HttpRequest**: Information about the incoming HTTP request
- **HttpResponse**: Information about the outgoing HTTP response
- **User**: Information about the authenticated user
- **Items**: A key-value collection for sharing data between middleware

```csharp:title=Program.cs
app.MapGet("/", (HttpContext context) =>
{
    var method = context.Request.Method;
    var path = context.Request.Path;
    var userAgent = context.Request.Headers.UserAgent;
    
    return $"Method: {method}, Path: {path}, User-Agent: {userAgent}";
});
```

```csharp:title=Request.cs
// Accessing request information
var path = context.Request.Path;
var method = context.Request.Method;
var query = context.Request.Query["filter"];
var headers = context.Request.Headers;
```

```csharp:title=Response.cs
// Setting response information
context.Response.StatusCode = 200;
context.Response.ContentType = "application/json";
await context.Response.WriteAsJsonAsync(new { message = "Hello" });
```

```csharp:title=User.cs
// Accessing user information
if (context.User.Identity?.IsAuthenticated == true)
{
    var userName = context.User.Identity.Name;
    return $"Hello, {userName}";
}
```

```csharp:title=Items.cs
// Sharing data between middleware
context.Items["RequestId"] = Guid.NewGuid();
context.Items["StartTime"] = DateTime.UtcNow;
```

**How it works in practice**: HttpContext provides:
- **Complete Information**: Everything about the request and response in one place
- **Request Access**: Get method, path, headers, query string, body
- **Response Access**: Set status code, headers, write response body
- **User Information**: Access authenticated user and their claims
- **Data Sharing**: Use Items collection to share data between middleware

HttpContext is your central hub for all HTTP-related information during request processing.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HTTP Requests - Like making phone calls</summary>
  <div>

## HTTP Requests

**Real-life analogy**: HTTP requests are like making phone calls to other services. When you need information from another department, you call them (HTTP request), ask for what you need, and wait for their response. Sometimes they answer immediately, sometimes they're busy, and sometimes they give you the wrong information. HTTP requests work the same way for apps communicating with external APIs and services.

**Technical explanation**: HTTP requests allow your app to communicate with external services and APIs over the web. IHttpClientFactory manages HttpClient instances, providing a central location for configuration, managing connection pooling and lifetimes, and adding logging and middleware for outgoing requests. This makes HTTP communication more reliable and efficient.

**Key jargon explained**:
- **HttpClient**: The class used to make HTTP requests
- **IHttpClientFactory**: Factory that creates and manages HttpClient instances
- **Named Client**: A HttpClient instance with a specific name and configuration
- **Typed Client**: A class that wraps HttpClient functionality
- **Polly**: A library for resilience and transient fault handling

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register IHttpClientFactory
builder.Services.AddHttpClient();

// Register named client
builder.Services.AddHttpClient("GitHub", client =>
{
    client.BaseAddress = new Uri("https://api.github.com/");
    client.DefaultRequestHeaders.Add("User-Agent", "MyApp");
});

// Register typed client
builder.Services.AddHttpClient<GitHubService>();

var app = builder.Build();
```

```csharp:title=Basic.cs
// Basic usage
app.MapGet("/data", async (IHttpClientFactory factory) =>
{
    var client = factory.CreateClient();
    var response = await client.GetAsync("https://api.example.com/data");
    return await response.Content.ReadAsStringAsync();
});
```

```csharp:title=Named.cs
// Named client
app.MapGet("/github", async (IHttpClientFactory factory) =>
{
    var client = factory.CreateClient("GitHub");
    var response = await client.GetAsync("repos/dotnet/AspNetCore.Docs/branches");
    return await response.Content.ReadAsStringAsync();
});
```

```csharp:title=Typed.cs
// Typed client
public class GitHubService
{
    private readonly HttpClient _httpClient;

    public GitHubService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://api.github.com/");
    }

    public async Task<string> GetBranchesAsync()
    {
        var response = await _httpClient.GetAsync("repos/dotnet/AspNetCore.Docs/branches");
        return await response.Content.ReadAsStringAsync();
    }
}
```

```csharp:title=Polly.cs
// Polly integration for resilience
builder.Services.AddHttpClient()
    .AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)));
```

**How it works in practice**: HTTP requests provide:
- **Centralized Configuration**: Configure HttpClient instances in one place
- **Connection Pooling**: Manages HTTP connections efficiently
- **Lifetime Management**: Automatically manages HttpClient lifetimes
- **Logging**: Logs all outgoing requests for debugging
- **Resilience**: Supports Polly for retries, circuit breakers, and timeouts

IHttpClientFactory makes HTTP requests more reliable and easier to manage.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Static Files - Like serving documents</summary>
  <div>

## Static Files

**Real-life analogy**: Static files are like documents in a file cabinet. When someone asks for a document, you just pull it out of the cabinet and give it to them. You don't create it on the spot or modify it - you just serve the existing document. Static files work the same way - they're files like images, CSS, and JavaScript that are served as-is without modification.

**Technical explanation**: Static files are files in an ASP.NET Core app that aren't dynamically generated. Examples include HTML, CSS, image, and JavaScript files. These files are served directly to clients on request without being processed by server-side code. By default, static files are stored in the wwwroot directory and are served using MapStaticAssets.

**Key jargon explained**:
- **Static Files**: Files served as-is without server-side processing
- **wwwroot**: The default directory for static files
- **Web Root**: The directory where static files are stored
- **MapStaticAssets**: Method to enable static file serving
- **Fingerprinting**: Adding unique identifiers to files based on content

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Enable static file serving
app.MapStaticAssets();

app.MapGet("/", () => "Hello World!");

app.Run();
```

```
title=Directory Structure
wwwroot/
├── index.html
├── css/
│   └── site.css
├── js/
│   └── app.js
└── images/
    └── logo.png
```

```html:title=HTML
<!-- Accessing static files -->
<link href="/css/site.css" rel="stylesheet">
<script src="/js/app.js"></script>
<img src="/images/logo.png" alt="Logo">
```

```csharp:title=Authorization.cs
// Protect static files
app.UseAuthorization();
app.MapStaticAssets("/admin").RequireAuthorization();
```

```csharp:title=DefaultFiles.cs
// Serve default documents
app.UseDefaultFiles();
app.UseStaticFiles();
```

**How it works in practice**: Static files provide:
- **Direct Serving**: Files are served without processing
- **Performance**: No server-side overhead for static content
- **Caching**: Files are compressed and fingerprinted for better performance
- **Security**: Can protect specific files with authorization
- **Build-Time Optimization**: Files are optimized at build time

Static files are essential for serving CSS, JavaScript, images, and other client-side assets.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Learning Path - Like a curriculum guide</summary>
  <div>

## Learning Path

**Real-life analogy**: A learning path is like a curriculum guide for a course. It tells you what to learn first (foundamentals), what to learn next (specific topics), and how everything connects together. Instead of learning randomly, you follow a structured path that builds your knowledge step by step, making the learning process more efficient and effective.

**Technical explanation**: The ASP.NET Core fundamentals learning path provides a recommended order for learning the core concepts. Start with the foundational concepts (Program.cs, Dependency Injection, Configuration), then move to request processing (Middleware, Routing), and finally to advanced topics (Error Handling, Logging, HTTP Requests, Static Files).

**Key jargon explained**:
- **Learning Path**: A recommended order for learning topics
- **Foundational Concepts**: The essential building blocks you learn first
- **Request Processing**: How HTTP requests are handled
- **Advanced Topics**: More complex features built on the foundations
- **Prerequisites**: Topics you should learn before others

### Recommended Learning Order:

1. **Start Here: Fundamentals** (this page)
   - Overview of all ASP.NET Core fundamentals
   - Understanding the big picture

2. **Program.cs and Application Startup**
   - How your application starts up
   - Configuring services and middleware

3. **Dependency Injection**
   - Managing dependencies between classes
   - The DI container and service lifetimes

4. **Configuration**
   - Managing application settings
   - Multiple configuration sources

5. **Middleware**
   - The request processing pipeline
   - Creating custom middleware

6. **Hosting**
   - The infrastructure that runs your app
   - Kestrel and the Generic Host

7. **Logging**
   - Recording application events
   - Different logging providers and levels

8. **Error Handling**
   - Handling exceptions gracefully
   - Development vs production error handling

9. **Routing**
   - Matching URLs to endpoints
   - Route templates and constraints

10. **HttpContext**
    - Accessing request and response information
    - User information and data sharing

11. **HTTP Requests**
    - Making HTTP requests to external APIs
    - IHttpClientFactory and typed clients

12. **Static Files**
    - Serving CSS, JavaScript, and images
    - Static file optimization and security

### Quick Start:
```csharp:title=QuickStart.cs
// Create a simple ASP.NET Core app
var builder = WebApplication.CreateBuilder(args);

// Add services (Dependency Injection)
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure middleware (Middleware Pipeline)
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

// Map endpoints (Routing)
app.MapRazorPages();

// Run the app (Hosting)
app.Run();
```

**How it works in practice**: Following the learning path provides:
- **Structured Learning**: Learn topics in a logical order
- **Building Blocks**: Each topic builds on previous knowledge
- **Practical Skills**: Hands-on experience with each concept
- **Complete Picture**: Understand how everything fits together
- **Confidence**: Solid foundation for building real applications

Follow this learning path to master ASP.NET Core fundamentals step by step.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core fundamentals overview | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/?view=aspnetcore-10.0&tabs=windows)