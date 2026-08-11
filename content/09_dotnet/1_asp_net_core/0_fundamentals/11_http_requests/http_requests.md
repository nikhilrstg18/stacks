---
title: "HTTP Requests"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/11_http_requests"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>HTTP Requests - Like making phone calls to other services</summary>
  <div>

## What are HTTP Requests?

**Real-life analogy**: HTTP requests are like making phone calls to other services. When you need information from another department, you call them (HTTP request), ask for what you need, and wait for their response. Sometimes they answer immediately, sometimes they're busy, and sometimes they give you the wrong information. HTTP requests work the same way for apps.

**Technical explanation**: HTTP requests allow your app to communicate with external services and APIs over the web. IHttpClientFactory manages HttpClient instances, providing a central location for configuration, managing connection pooling and lifetimes, and adding logging and middleware for outgoing requests.

**Key jargon explained**:
- **HttpClient**: The class used to make HTTP requests
- **IHttpClientFactory**: Factory that creates and manages HttpClient instances
- **HTTP Request**: A request sent to a server over HTTP
- **HTTP Response**: The response received from a server
- **API**: Application Programming Interface - a service your app communicates with

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();

var app = builder.Build();

app.MapGet("/", async (IHttpClientFactory factory) =>
{
    var client = factory.CreateClient();
    var response = await client.GetAsync("https://api.example.com/data");
    return await response.Content.ReadAsStringAsync();
});

app.Run();
```

**How it works in practice**: IHttpClientFactory provides:
- **Centralized Configuration**: Configure HttpClient instances in one place
- **Connection Pooling**: Manages HTTP connections efficiently
- **Lifetime Management**: Automatically manages HttpClient lifetimes
- **Logging**: Logs all outgoing requests for debugging
- **Middleware**: Supports Polly-based middleware for resilience

IHttpClientFactory makes HTTP requests more reliable and easier to manage.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Basic Usage - Like using a shared phone</summary>
  <div>

## Basic Usage

**Real-life analogy**: Basic usage is like using a shared phone in an office. Anyone who needs to make a call picks up the phone, dials the number, and makes their call. When they're done, they hang up and someone else can use the phone. The phone is shared but each call is independent.

**Technical explanation**: Basic usage of IHttpClientFactory involves registering the service with AddHttpClient, then injecting IHttpClientFactory into your classes and using CreateClient to get HttpClient instances. This is the simplest way to make HTTP requests.

**Key jargon explained**:
- **AddHttpClient**: Method to register IHttpClientFactory in DI container
- **CreateClient**: Method to create a new HttpClient instance
- **Dependency Injection**: Getting IHttpClientFactory from the DI container
- **HttpRequestMessage**: A class representing an HTTP request
- **HttpResponseMessage**: A class representing an HTTP response

### Register IHttpClientFactory:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register IHttpClientFactory
builder.Services.AddHttpClient();

var app = builder.Build();
```

### Use in Endpoint:
```csharp:title=Endpoint.cs
app.MapGet("/data", async (IHttpClientFactory factory) =>
{
    var client = factory.CreateClient();
    var response = await client.GetAsync("https://api.example.com/data");
    
    if (response.IsSuccessStatusCode)
    {
        var data = await response.Content.ReadAsStringAsync();
        return data;
    }
    
    return "Error fetching data";
});
```

### Use in Service:
```csharp:title=Service.cs
public class DataService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public DataService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<string> GetDataAsync()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("https://api.example.com/data");
        return await response.Content.ReadAsStringAsync();
    }
}
```

### With HttpRequestMessage:
```csharp:title=RequestMessage.cs
app.MapGet("/github", async (IHttpClientFactory factory) =>
{
    var request = new HttpRequestMessage(HttpMethod.Get,
        "https://api.github.com/repos/dotnet/AspNetCore.Docs/branches");
    
    request.Headers.Add("Accept", "application/vnd.github.v3+json");
    request.Headers.Add("User-Agent", "MyApp");
    
    var client = factory.CreateClient();
    var response = await client.SendAsync(request);
    
    return await response.Content.ReadAsStringAsync();
});
```

### Complete Example:
```csharp:title=Complete.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();

var app = builder.Build();

app.MapGet("/fetch", async (IHttpClientFactory factory) =>
{
    var client = factory.CreateClient();
    
    try
    {
        var response = await client.GetAsync("https://api.example.com/data");
        response.EnsureSuccessStatusCode();
        
        var content = await response.Content.ReadAsStringAsync();
        return Results.Ok(content);
    }
    catch (HttpRequestException ex)
    {
        return Results.Problem($"Error: {ex.Message}");
    }
});

app.Run();
```

**How it works in practice**: Basic usage provides:
- **Simple Setup**: Just register AddHttpClient and use it
- **Shared Instances**: HttpClient instances are shared and managed
- **Automatic Cleanup**: Connections are automatically managed
- **Logging**: All requests are logged automatically
- **DI Integration**: Works seamlessly with dependency injection

Basic usage is perfect for simple HTTP request scenarios.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Named Clients - Like having dedicated phone lines</summary>
  <div>

## Named Clients

**Real-life analogy**: Named clients are like having dedicated phone lines for different purposes. You might have a phone line for customer service, another for technical support, and another for sales. Each line has its own configuration (different phone numbers, settings, etc.). Named clients work the same way for HTTP requests.

**Technical explanation**: Named clients allow you to configure multiple HttpClient instances with different configurations. Each named client has its own base address, headers, and other settings. You create a named client by passing a name to CreateClient.

**Key jargon explained**:
- **Named Client**: A HttpClient instance with a specific name and configuration
- **Base Address**: The base URL for all requests from that client
- **Default Headers**: Headers that are added to every request from that client
- **Client Configuration**: Settings specific to a named client
- **CreateClient(name)**: Method to create a named client

### Register Named Client:
```csharp:title=Register.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient("GitHub", client =>
{
    client.BaseAddress = new Uri("https://api.github.com/");
    client.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");
    client.DefaultRequestHeaders.Add("User-Agent", "MyApp");
});

builder.Services.AddHttpClient("Weather", client =>
{
    client.BaseAddress = new Uri("https://api.weather.gov/");
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});

var app = builder.Build();
```

### Use Named Client:
```csharp:title=Use.cs
app.MapGet("/github", async (IHttpClientFactory factory) =>
{
    var client = factory.CreateClient("GitHub");
    
    // No need to specify full URL - uses base address
    var response = await client.GetAsync("repos/dotnet/AspNetCore.Docs/branches");
    
    return await response.Content.ReadAsStringAsync();
});

app.MapGet("/weather", async (IHttpClientFactory factory) =>
{
    var client = factory.CreateClient("Weather");
    
    // Uses weather API base address
    var response = await client.GetAsync("forecast");
    
    return await response.Content.ReadAsStringAsync();
});
```

### Multiple Configurations:
```csharp:title=Multiple.cs
builder.Services.AddHttpClient("ExternalAPI", client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
    client.Timeout = TimeSpan.FromSeconds(30);
    client.DefaultRequestHeaders.Add("X-API-Key", "your-api-key");
});

builder.Services.AddHttpClient("InternalAPI", client =>
{
    client.BaseAddress = new Uri("https://internal.example.com/");
    client.Timeout = TimeSpan.FromSeconds(10);
    client.DefaultRequestHeaders.Add("Authorization", "Bearer token");
});
```

### In Service Class:
```csharp:title=Service.cs
public class GitHubService
{
    private readonly HttpClient _httpClient;

    public GitHubService(IHttpClientFactory factory)
    {
        _httpClient = factory.CreateClient("GitHub");
    }

    public async Task<string> GetBranchesAsync()
    {
        var response = await _httpClient.GetAsync("repos/dotnet/AspNetCore.Docs/branches");
        return await response.Content.ReadAsStringAsync();
    }
}
```

### When to Use Named Clients:
```csharp:title=WhenToUse.cs
// Use named clients when:
// - You need multiple HttpClient instances with different configurations
// - Each client connects to a different API
// - Each client needs different headers or settings
// - You want to centralize configuration for each API

// Example:
// - GitHub client with GitHub API configuration
// - Weather client with weather API configuration
// - Payment client with payment API configuration
```

**How it works in practice**: Named clients provide:
- **Multiple Configurations**: Different settings for different APIs
- **Centralized Configuration**: Configure each client in one place
- **Type Safety**: Use named clients to avoid configuration mix-ups
- **Base Address**: Don't repeat URLs in every request
- **Default Headers**: Headers automatically added to every request

Named clients are perfect when you need to communicate with multiple different APIs.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Typed Clients - Like having a dedicated assistant</summary>
  <div>

## Typed Clients

**Real-life analogy**: Typed clients are like having a dedicated assistant for each task. Instead of making phone calls yourself, you have an assistant who handles all communication with a specific department. You just ask the assistant for what you need, and they handle the phone calls, headers, and configuration automatically.

**Technical explanation**: Typed clients are classes that wrap HttpClient functionality. They provide a type-safe way to make HTTP requests to a specific API. The HttpClient is injected into the typed client class, which can use it to make requests with configuration already applied.

**Key jargon explained**:
- **Typed Client**: A class that wraps HttpClient functionality
- **Type Safety**: Compile-time checking of method signatures and types
- **Encapsulation**: Hiding HTTP details inside a class
- **Service Class**: A class that provides business functionality
- **Dependency Injection**: HttpClient is injected into the typed client

### Create Typed Client:
```csharp:title=TypedClient.cs
public class GitHubService
{
    private readonly HttpClient _httpClient;

    public GitHubService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://api.github.com/");
        _httpClient.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "MyApp");
    }

    public async Task<IEnumerable<GitHubBranch>> GetBranchesAsync()
    {
        var response = await _httpClient.GetAsync("repos/dotnet/AspNetCore.Docs/branches");
        response.EnsureSuccessStatusCode();
        
        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<IEnumerable<GitHubBranch>>(content);
    }
}
```

### Register Typed Client:
```csharp:title=Register.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient<GitHubService>();

var app = builder.Build();
```

### Use Typed Client:
```csharp:title=Use.cs
app.MapGet("/branches", async (GitHubService gitHubService) =>
{
    var branches = await gitHubService.GetBranchesAsync();
    return Results.Ok(branches);
});
```

### With Configuration:
```csharp:title=Config.cs
builder.Services.AddHttpClient<GitHubService>(client =>
{
    client.BaseAddress = new Uri("https://api.github.com/");
    client.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");
});
```

### Multiple Typed Clients:
```csharp:title=Multiple.cs
public class WeatherService
{
    private readonly HttpClient _httpClient;

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://api.weather.gov/");
    }

    public async Task<string> GetForecastAsync()
    {
        var response = await _httpClient.GetAsync("forecast");
        return await response.Content.ReadAsStringAsync();
    }
}

// Register both
builder.Services.AddHttpClient<GitHubService>();
builder.Services.AddHttpClient<WeatherService>();
```

### Benefits of Typed Clients:
```csharp:title=Benefits.cs
// Typed clients provide:
// - Type safety: Compile-time checking
// - Encapsulation: HTTP details hidden in the class
// - Reusability: Use the service anywhere
// - Testability: Easy to mock for testing
// - Intellisense: Better IDE support
// - Configuration: Centralized HTTP configuration
```

**How it works in practice**: Typed clients provide:
- **Type Safety**: Compile-time checking and Intellisense
- **Encapsulation**: HTTP details hidden in service class
- **Configuration**: Configure once, use everywhere
- **Reusability**: Use the typed client in multiple places
- **Testability**: Easy to mock for unit testing

Typed clients are the recommended approach for most scenarios.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Polly Integration - Like having a backup plan</summary>
  <div>

## Polly Integration

**Real-life analogy**: Polly integration is like having a backup plan for phone calls. If the line is busy, you automatically retry. If they don't answer after several tries, you try a different number. If that fails, you wait and try again later. Polly does the same for HTTP requests - it retries failed requests and handles errors gracefully.

**Technical explanation**: Polly is a .NET resilience and transient fault-handling library. It integrates with IHttpClientFactory to add policies like retries, circuit breakers, timeouts, and fallbacks to HTTP requests. This makes your HTTP requests more resilient to failures.

**Key jargon explained**:
- **Polly**: A library for resilience and transient fault handling
- **Retry Policy**: Automatically retry failed requests
- **Circuit Breaker**: Stop calling failing services temporarily
- **Timeout**: Cancel requests that take too long
- **Fallback**: Provide alternative response when requests fail

### Install Polly:
```bash:title=CLI
dotnet add package Microsoft.Extensions.Http.Polly
```

### Retry Policy:
```csharp:title=Retry.cs
builder.Services.AddHttpClient("Resilient")
    .AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)));
```

### Circuit Breaker:
```csharp:title=CircuitBreaker.cs
builder.Services.AddHttpClient("Resilient")
    .AddPolicyHandler(Policy.Handle<HttpRequestException>()
        .CircuitBreakerAsync(3, TimeSpan.FromSeconds(30)));
```

### Combined Policies:
```csharp:title=Combined.cs
builder.Services.AddHttpClient("Resilient")
    .AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)))
    .AddPolicyHandler(Policy.Handle<HttpRequestException>()
        .CircuitBreakerAsync(3, TimeSpan.FromSeconds(30)))
    .AddPolicyHandler(Policy.TimeoutAsync<HttpResponseMessage>(10));
```

### Use in Typed Client:
```csharp:title=TypedClient.cs
builder.Services.AddHttpClient<ResilientService>()
    .AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)));

public class ResilientService
{
    private readonly HttpClient _httpClient;

    public ResilientService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetDataAsync()
    {
        var response = await _httpClient.GetAsync("https://api.example.com/data");
        return await response.Content.ReadAsStringAsync();
    }
}
```

### Fallback Policy:
```csharp:title=Fallback.cs
builder.Services.AddHttpClient("Resilient")
    .AddPolicyHandler(Policy<HttpResponseMessage>
        .Handle<HttpRequestException>()
        .FallbackAsync(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent("Fallback data")
        }));
```

### Polly Policies Explained:
```csharp:title=Policies.cs
// Retry: Retry failed requests
// - Handles transient failures
// - Configurable retry count and delay
// - Exponential backoff available

// Circuit Breaker: Stop calling failing services
// - Opens after N failures
// - Stays open for a timeout period
// - Allows service to recover

// Timeout: Cancel slow requests
// - Prevents hanging requests
// - Configurable timeout duration
// - Cancellation token support

// Fallback: Provide alternative response
// - Returns cached data on failure
// - Returns default values
// - Custom error responses
```

**How it works in practice**: Polly integration provides:
- **Resilience**: Handle transient failures automatically
- **Retries**: Automatically retry failed requests
- **Circuit Breaking**: Stop calling failing services
- **Timeouts**: Prevent hanging requests
- **Fallbacks**: Provide alternative responses on failure

Polly makes your HTTP requests more resilient to network issues and service failures.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Logging and Diagnostics - Like call recording</summary>
  <div>

## Logging and Diagnostics

**Real-life analogy**: Logging and diagnostics are like recording all your phone calls. When you make a call, the system records who you called, when you called, how long the call took, and whether it was successful. This helps you troubleshoot problems, understand patterns, and improve your communication. HTTP request logging works the same way.

**Technical explanation**: IHttpClientFactory automatically logs all HTTP requests made through HttpClient instances created by the factory. This includes request URL, method, duration, status code, and headers. This logging helps you debug issues and monitor HTTP traffic.

**Key jargon explained**:
- **Logging**: Recording information about HTTP requests
- **Diagnostics**: Tools for analyzing HTTP request behavior
- **ILogger**: The logging interface in .NET
- **Log Level**: The severity of log messages (Information, Warning, Error)
- **Request Duration**: How long an HTTP request took

### Automatic Logging:
```csharp:title=Automatic.cs
// Logging is automatic when using IHttpClientFactory
// No additional configuration needed

builder.Services.AddHttpClient();

// All requests are logged automatically
```

### Configure Logging Level:
```json:title=appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "System.Net.Http.HttpClient": "Information"
    }
  }
}
```

### Log Information:
```csharp:title=Information.cs
// Automatic logs include:
// - Request URL
// - HTTP method
// - Request duration
// - Response status code
// - Request headers
// - Response headers
```

### Custom Logging:
```csharp:title=Custom.cs
public class LoggingHandler : DelegatingHandler
{
    private readonly ILogger<LoggingHandler> _logger;

    public LoggingHandler(ILogger<LoggingHandler> logger)
    {
        _logger = logger;
    }

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Sending request to {Url}", request.RequestUri);

        var response = await base.SendAsync(request, cancellationToken);

        _logger.LogInformation("Received response with status {StatusCode}",
            response.StatusCode);

        return response;
    }
}

// Register custom handler
builder.Services.AddHttpClient("Custom")
    .AddHttpMessageHandler<LoggingHandler>();
```

### Diagnostic Logging:
```csharp:title=Diagnostic.cs
// Use diagnostic logging for troubleshooting
builder.Services.AddHttpClient()
    .ConfigureHttpClient(client =>
    {
        // Enable diagnostic logging
        client.DefaultRequestHeaders.Add("X-Diagnostic", "true");
    });
```

### Performance Logging:
```csharp:title=Performance.cs
public class PerformanceHandler : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var stopwatch = Stopwatch.StartNew();

        var response = await base.SendAsync(request, cancellationToken);

        stopwatch.Stop();

        Console.WriteLine($"Request to {request.RequestUri} took {stopwatch.ElapsedMilliseconds}ms");

        return response;
    }
}
```

**How it works in practice**: Logging provides:
- **Automatic Recording**: All requests are logged automatically
- **Debugging**: Easy to troubleshoot HTTP issues
- **Monitoring**: Track request patterns and performance
- **Audit Trail**: Record of all HTTP traffic
- **Custom Handlers**: Add custom logging with delegating handlers

Logging helps you understand and debug HTTP request behavior.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following communication procedures</summary>
  <div>

## HTTP Requests Best Practices

**Real-life analogy**: Following HTTP request best practices is like following proper communication procedures. You should use the right phone for the right call (use the right client), keep a record of calls (log requests), have a backup plan (use Polly), and follow proper etiquette (use appropriate methods and headers). Good procedures ensure reliable communication.

**Technical explanation**: Following best practices ensures your HTTP requests are reliable, performant, and maintainable. This includes using IHttpClientFactory instead of creating HttpClient directly, using typed clients for type safety, adding Polly for resilience, and logging for debugging.

**Key jargon explained**:
- **IHttpClientFactory**: Use instead of creating HttpClient directly
- **Typed Clients**: Preferred approach for type safety
- **Polly**: Add resilience policies for reliability
- **Logging**: Log all HTTP requests for debugging
- **Dispose**: Don't dispose HttpClient (let factory manage it)

### DO:
- **Use IHttpClientFactory** instead of creating HttpClient directly
- **Use typed clients** for type safety and encapsulation
- **Add Polly policies** for resilience (retry, circuit breaker, timeout)
- **Log HTTP requests** for debugging and monitoring
- **Configure base addresses** and default headers
- **Use appropriate HTTP methods** (GET for reading, POST for creating)
- **Handle exceptions** and errors gracefully
- **Set appropriate timeouts** for requests

### DON'T:
- **Create HttpClient instances** with new HttpClient() (causes socket exhaustion)
- **Dispose HttpClient** created by IHttpClientFactory (factory manages lifecycle)
- **Ignore exceptions** without handling them
- **Forget to set timeouts** (requests can hang indefinitely)
- **Use blocking calls** (use async/await instead)
- **Hardcode URLs** (use configuration or base addresses)
- **Ignore HTTP status codes** (check IsSuccessStatusCode)
- **Forget to add headers** required by APIs

### Correct Usage:
```csharp:title=Correct.cs
// DO: Use IHttpClientFactory
builder.Services.AddHttpClient();

// Use in code
var client = factory.CreateClient();
var response = await client.GetAsync(url);

// DON'T: Create HttpClient directly
var client = new HttpClient();  // BAD - causes socket exhaustion
```

### Typed Client Preference:
```csharp:title=Typed.cs
// DO: Use typed clients
builder.Services.AddHttpClient<MyService>();

// DON'T: Use basic usage when typed is better
// (unless you have a simple one-off scenario)
```

### Polly Integration:
```csharp:title=Polly.cs
// DO: Add Polly for resilience
builder.Services.AddHttpClient()
    .AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)));

// DON'T: Skip resilience policies
// (your app will be fragile to network issues)
```

### Exception Handling:
```csharp:title=Exceptions.cs
// DO: Handle exceptions
try
{
    var response = await client.GetAsync(url);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadAsStringAsync();
}
catch (HttpRequestException ex)
{
    logger.LogError(ex, "HTTP request failed");
    throw;
}

// DON'T: Ignore exceptions
var response = await client.GetAsync(url);  // Might throw
return await response.Content.ReadAsStringAsync();  // Never reached if exception
```

**How it works in practice**: Best practices ensure:
- **Reliability**: HTTP requests are resilient to failures
- **Performance**: Connections are managed efficiently
- **Maintainability**: Code is organized and easy to maintain
- **Debugging**: Logs help troubleshoot issues
- **Type Safety**: Compile-time checking prevents errors

Good HTTP request practices make your application more reliable and maintainable.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [HTTP requests with IHttpClientFactory - ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/http-requests?view=aspnetcore-10.0)