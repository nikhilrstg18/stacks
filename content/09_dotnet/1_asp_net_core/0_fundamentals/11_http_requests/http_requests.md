---
title: "HTTP Requests"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/11_http_requests"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>HTTP Requests Overview - IHttpClientFactory</summary>
  <div>

## HTTP Requests with IHttpClientFactory

**Real-life analogy**: IHttpClientFactory is like a professional courier service that manages all outgoing communications for your business. Instead of each department creating their own delivery methods (which leads to inefficiencies and resource waste), you have a centralized service that manages delivery vehicles, optimizes routes, handles delivery failures, and provides tracking. IHttpClientFactory provides the same centralized management for HTTP requests - managing HttpClient lifetimes, connection pooling, and resilience policies.

**Technical explanation**: IHttpClientFactory manages the creation and configuration of HttpClient instances, addressing common issues with manual HttpClient management like socket exhaustion and DNS staleness. It provides a central location for configuring logical HttpClient instances, manages pooling and lifetime of underlying HttpClientMessageHandler instances, enables outgoing middleware via delegating handlers, and adds configurable logging. IHttpClientFactory supports multiple usage patterns: basic usage, named clients, typed clients, and generated clients.

**Key jargon explained**:
- **IHttpClientFactory**: Factory for creating and managing HttpClient instances
- **HttpClient**: Class used to make HTTP requests to external services
- **Socket Exhaustion**: Resource exhaustion from improper HttpClient management
- **DNS Staleness**: Outdated DNS information causing connection issues
- **Delegating Handlers**: Middleware for outgoing HTTP requests

```csharp:title=BasicUsage.cs
var builder = WebApplication.CreateBuilder(args);

// Register IHttpClientFactory
builder.Services.AddHttpClient();

builder.Services.AddRazorPages();

var app = builder.Build();
```

```csharp:title=Usage.cs
public class MyService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public MyService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task GetDataAsync()
    {
        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("https://api.example.com/data");
        response.EnsureSuccessStatusCode();
        
        var content = await response.Content.ReadAsStringAsync();
        // Process content
    }
}
```

**How it works in practice**: IHttpClientFactory manages HttpClient instances to avoid common pitfalls. Manual HttpClient creation can lead to socket exhaustion because HttpClient doesn't dispose sockets immediately, and DNS staleness because HttpClient doesn't refresh DNS entries. IHttpClientFactory manages HttpClientMessageHandler instances, pooling them appropriately and refreshing DNS information. It also enables outgoing middleware through delegating handlers, enabling cross-cutting concerns like logging, retries, and circuit breaking.

**Key takeaways for interviews**:
- IHttpClientFactory manages HttpClient creation and lifetimes
- Prevents socket exhaustion and DNS staleness issues
- Supports multiple usage patterns (basic, named, typed, generated)
- Enables outgoing middleware via delegating handlers
- Provides centralized configuration and logging

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Named Clients - Pre-configured HTTP Clients</summary>
  <div>

## Named Clients

**Real-life analogy**: Named clients are like having specialized courier services for different types of deliveries. You might have a "Documents" service for important papers, a "Packages" service for parcels, and an "Express" service for urgent deliveries. Each service has its own configuration - different delivery speeds, tracking requirements, and handling procedures. Named clients provide the same specialized configuration for different HTTP client needs.

**Technical explanation**: Named clients are suitable when an app requires many distinct uses of HttpClient with different configurations. Each named client is registered with a specific name and configuration (base address, default headers, timeout values, etc.). When creating a client, you specify the name, and IHttpClientFactory provides a pre-configured instance. This enables clean separation of concerns and makes it easy to manage different HTTP client requirements.

**Key jargon explained**:
- **Named Clients**: Pre-configured HttpClient instances with specific names
- **Base Address**: Default URL prefix for requests
- **Default Headers**: Headers automatically added to all requests
- **Client Configuration**: Timeout, authentication, and other settings
- **Service Separation**: Different clients for different API endpoints

```csharp:title=Registration.cs
var builder = WebApplication.CreateBuilder(args);

// Register named client
builder.Services.AddHttpClient("GitHub", httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.github.com/");
    
    // GitHub API requires specific headers
    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.Accept, "application/vnd.github.v3+json");
    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.UserAgent, "MyApp");
    
    httpClient.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddRazorPages();

var app = builder.Build();
```

```csharp:title=Usage.cs
public class GitHubService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public GitHubService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task GetBranchesAsync()
    {
        var client = _httpClientFactory.CreateClient("GitHub");
        
        // Base address is pre-configured, so only path is needed
        var response = await client.GetAsync("repos/dotnet/AspNetCore.Docs/branches");
        
        response.EnsureSuccessStatusCode();
        
        var content = await response.Content.ReadAsStringAsync();
        // Process GitHub API response
    }
}
```

**How it works in practice**: Named clients provide pre-configured HttpClient instances for specific use cases. During registration, you set base address, default headers, timeout values, and other configuration. When requesting a client by name, IHttpClientFactory provides an instance with all this configuration already applied. This eliminates the need to configure each request individually and ensures consistency across all requests to the same API.

**Key takeaways for interviews**:
- Named clients provide pre-configured HttpClient instances
- Each client has specific configuration (base address, headers, timeout)
- Reduces configuration duplication across requests
- Enables separation of different API requirements
- Improves maintainability and consistency

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Typed Clients - Encapsulated HTTP Logic</summary>
  <div>

## Typed Clients

**Real-life analogy**: Typed clients are like having specialized departments that handle all communication with external partners. Instead of each employee making calls to the same external company, you have a dedicated department that knows the proper procedures, contact information, and protocols. Typed clients provide the same encapsulation - a dedicated class that knows how to communicate with a specific API, handling all HTTP details internally.

**Technical explanation**: Typed clients provide a class that wraps HttpClient functionality, encapsulating all HTTP communication logic for a specific API. The class accepts HttpClient in its constructor (constructor injection) and exposes methods that perform specific API calls. This approach provides strong typing, encapsulation, and testability. The HttpClient is typically configured as a named client or with specific settings during registration.

**Key jargon explained**:
- **Typed Client**: Class that wraps HttpClient functionality
- **Constructor Injection**: HttpClient is injected via constructor
- **Encapsulation**: HTTP details hidden behind method calls
- **Strong Typing**: Method signatures define API contracts
- **Testability**: Easy to mock HttpClient for testing

```csharp:title=TypedClient.cs
public class GitHubService
{
    private readonly HttpClient _httpClient;

    // HttpClient is injected via constructor
    public GitHubService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://api.github.com/");
        _httpClient.DefaultRequestHeaders.Add(
            HeaderNames.UserAgent, "MyApp");
    }

    public async Task<IEnumerable<GitHubBranch>> GetBranchesAsync()
    {
        var response = await _httpClient.GetAsync("repos/dotnet/AspNetCore.Docs/branches");
        response.EnsureSuccessStatusCode();
        
        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<IEnumerable<GitHubBranch>>(content);
    }

    public async Task<GitHubRepository> GetRepositoryAsync(string owner, string repo)
    {
        var response = await _httpClient.GetAsync($"repos/{owner}/{repo}");
        response.EnsureSuccessStatusCode();
        
        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<GitHubRepository>(content);
    }
}
```

```csharp:title=Registration.cs
var builder = WebApplication.CreateBuilder(args);

// Register typed client
builder.Services.AddHttpClient<GitHubService>(httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.github.com/");
    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.UserAgent, "MyApp");
});

builder.Services.AddRazorPages();

var app = builder.Build();
```

```csharp:title=Usage.cs
public class IndexModel : PageModel
{
    private readonly GitHubService _githubService;

    public IndexModel(GitHubService githubService)
    {
        _githubService = githubService;
    }

    public async Task OnGet()
    {
        var branches = await _githubService.GetBranchesAsync();
        // Use branches in page logic
    }
}
```

**How it works in practice**: Typed clients encapsulate all HTTP communication logic for a specific API. The class accepts HttpClient via constructor injection, which IHttpClientFactory provides with the appropriate configuration. Methods on the typed client perform specific API calls, handling URL construction, headers, serialization, and error handling internally. This provides a clean abstraction over HTTP details and makes the code more maintainable and testable.

**Key takeaways for interviews**:
- Typed clients encapsulate HTTP communication logic
- HttpClient is injected via constructor injection
- Methods expose domain-specific API operations
- Encapsulates HTTP details (URLs, headers, serialization)
- Improves testability through HttpClient mocking

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Resilience and Policies - Polly Integration</summary>
  <div>

## Resilience and Policies

**Real-life analogy**: Resilience policies are like having backup plans and quality control systems for your courier service. If a delivery fails, the system automatically retries with different routes. If a service is consistently failing, it temporarily stops trying to prevent wasting resources. These policies ensure your communication system remains reliable even when external services have issues. Polly integration provides the same resilience patterns for HTTP requests.

**Technical explanation**: IHttpClientFactory integrates with Polly to provide resilience and transient fault handling for HTTP requests. Polly policies include retries, circuit breakers, timeout, bulkhead isolation, and fallback. These policies can be applied to named clients or typed clients to handle common HTTP issues like network failures, service unavailability, and rate limiting. Policies are configured as delegating handlers in the HTTP pipeline.

**Key jargon explained**:
- **Polly**: .NET library for resilience and transient fault handling
- **Retry Policy**: Automatically retry failed requests
- **Circuit Breaker**: Stop calling failing services to prevent cascading failures
- **Timeout**: Prevent requests from hanging indefinitely
- **Fallback**: Provide alternative responses when primary service fails

```csharp:title=Polly.cs
var builder = WebApplication.CreateBuilder(args);

// Add Polly extensions
builder.Services.AddHttpClient("MyApi")
    .AddTransientHttpErrorPolicy(p => p
        .WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)))
    .AddPolicyHandler(Policy.TimeoutAsync<HttpResponseMessage>(10));

builder.Services.AddRazorPages();

var app = builder.Build();
```

```csharp:title=CircuitBreaker.cs
builder.Services.AddHttpClient("ExternalApi")
    .AddTransientHttpErrorPolicy(p => p
        .CircuitBreakerAsync(
            handledEventsAllowedBeforeBreaking: 3,
            durationOfBreak: TimeSpan.FromSeconds(30)
        ));
```

```csharp:title=TypedClientPolly.cs
public class ResilientService
{
    private readonly HttpClient _httpClient;

    public ResilientService(IHttpClientFactory factory)
    {
        _httpClient = factory.CreateClient("ResilientClient");
    }

    public async Task CallExternalApiAsync()
    {
        // Polly policies are automatically applied
        var response = await _httpClient.GetAsync("https://api.example.com/data");
        response.EnsureSuccessStatusCode();
    }
}
```

**How it works in practice**: Polly policies are configured as delegating handlers in the HTTP pipeline. When a request is made, it goes through these handlers before being sent. Retry policies automatically retry failed requests with exponential backoff. Circuit breakers stop calling failing services after a threshold to prevent cascading failures. Timeout policies prevent requests from hanging. These policies make HTTP communication more reliable and resilient to transient failures.

**Key takeaways for interviews**:
- Polly provides resilience patterns for HTTP requests
- Retry policies handle transient failures automatically
- Circuit breakers prevent cascading failures
- Timeout policies prevent requests from hanging
- Policies are configured as delegating handlers in HTTP pipeline

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

**Real-life analogy**: Interview preparation for HTTP requests concepts is like understanding professional communication systems. You need to understand how to manage communication channels efficiently, handle communication failures, ensure reliability, and optimize performance while maintaining security and proper resource management.

**Common interview questions**:
1. **What is IHttpClientFactory and why is it used?**
   - Factory for creating and managing HttpClient instances
   - Prevents socket exhaustion and DNS staleness issues
   - Provides centralized configuration and logging
   - Enables outgoing middleware via delegating handlers
   - Supports multiple usage patterns (basic, named, typed)

2. **What are the different IHttpClientFactory usage patterns?**
   - Basic usage: Simple client creation
   - Named clients: Pre-configured clients with specific names
   - Typed clients: Classes that encapsulate HttpClient logic
   - Generated clients: Auto-generated from OpenAPI/Swagger specs

3. **What are named clients and when should you use them?**
   - Pre-configured HttpClient instances with specific names
   - Suitable for apps with many distinct HttpClient uses
   - Each client has its own configuration (base address, headers, timeout)
   - Reduces configuration duplication across requests

4. **What are typed clients and how do they improve code quality?**
   - Classes that wrap HttpClient functionality
   - Encapsulate HTTP communication logic for specific APIs
   - Provide strong typing and method-based API contracts
   - Improve testability through HttpClient mocking
   - Hide HTTP details behind domain-specific methods

5. **How does Polly integration improve HTTP resilience?**
   - Provides retry policies for transient failures
   - Circuit breakers prevent cascading failures
   - Timeout policies prevent hanging requests
   - Fallback policies provide alternative responses
   - Policies are configured as delegating handlers

**Key interview concepts**:
- **Resource Management**: Preventing socket exhaustion and DNS staleness
- **Configuration Patterns**: Named vs typed vs basic usage
- **Encapsulation**: Typed clients hide HTTP details
- **Resilience**: Polly integration for fault tolerance
- **Middleware Pipeline**: Delegating handlers for cross-cutting concerns

**How to approach interview questions**:
- Start with clear definition of HttpClient management issues
- Explain IHttpClientFactory benefits and usage patterns
- Discuss named clients for configuration separation
- Address typed clients for encapsulation and testability
- Mention Polly integration for resilience and fault tolerance

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [HTTP requests with IHttpClientFactory - ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/http-requests?view=aspnetcore-10.0)