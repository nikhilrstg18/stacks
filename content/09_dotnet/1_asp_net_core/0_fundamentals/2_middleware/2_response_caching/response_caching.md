---
title: "Response Caching"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware/2_response_caching"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Response Caching Overview - Performance Optimization</summary>
  <div>

## Response Caching Middleware

**Real-life analogy**: Response caching is like having a copy machine that stores frequently requested documents. When someone asks for a common document, you give them the copy instead of fetching the original. This is faster and reduces wear on the original document storage. Response caching middleware provides the same optimization for web applications - it stores server responses and serves cached copies instead of regenerating them, improving performance and reducing server load.

**Technical explanation**: Response caching middleware determines when responses are cacheable, stores responses, and serves responses from cache based on HTTP Cache-Control headers. It implements standard HTTP caching semantics similar to proxies. The middleware only caches responses with 200 (OK) status code. It's useful for public GET or HEAD API requests where caching conditions are satisfied. For UI apps like Razor Pages, output caching (available in .NET 7+) is better because browsers typically set headers that prevent caching.

**Key jargon explained**:
- **Response Caching**: Storing and serving cached responses
- **HTTP Cache-Control Headers**: Standard HTTP caching directives
- **Cacheable Responses**: Responses that can be cached (200 OK, proper headers)
- **Vary Headers**: Headers that affect cache key generation
- **Public vs Private**: Caching accessibility for different clients

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCaching();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseResponseCaching();  // Enable response caching middleware

app.Use(async (context, next) =>
{
    context.Response.GetTypedHeaders().CacheControl =
        new Microsoft.Net.Http.Headers.CacheControlHeaderValue()
        {
            Public = true,
            MaxAge = TimeSpan.FromSeconds(10)
        };
    context.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.Vary] =
        new string[] { "Accept-Encoding" };

    await next();
});

app.MapGet("/", () => DateTime.Now.Millisecond);

app.Run();
```

**How it works in practice**: Response caching middleware intercepts requests and checks if a cached response exists. If a cached response is available and valid (based on Cache-Control headers), it serves the cached response without calling the endpoint. The middleware only caches responses with 200 OK status code and appropriate Cache-Control headers. Cache-Control headers like Public, Private, Max-Age, and SharedMaxAge determine cacheability and duration. Vary headers (like Accept-Encoding) ensure different cached versions for different request variations.

**Key takeaways for interviews**:
- Response caching stores and serves cached responses based on HTTP headers
- Only caches 200 OK responses with proper Cache-Control headers
- Implements standard HTTP caching semantics
- Useful for public GET/HEAD API responses
- Not suitable for UI apps (browsers prevent caching)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Cache Configuration - Headers and Options</summary>
  <div>

## Cache Configuration

**Real-life analogy**: Cache configuration is like setting rules for when to use copied documents versus fetching originals. You might set rules like "copy documents that haven't changed in 10 minutes" or "make fresh copies for different departments." Response caching configuration works the same way - Cache-Control headers define when responses should be cached and how long they should be stored. Different headers control cacheability, duration, and validation requirements.

**Technical explanation**: Response caching is configured through HTTP headers and middleware options. Cache-Control headers include directives like Public (cacheable by any cache), Private (cacheable only by the browser), MaxAge (how long to cache), and NoStore (don't cache). Vary headers specify request headers that should result in different cached versions. Middleware options include MaximumBodySize (largest cacheable response size), SizeLimit (cache storage limit), and UseCaseSensitivePaths (case-sensitive URL matching).

**Key jargon explained**:
- **Cache-Control**: Primary header for caching directives
- **Public/Private**: Cache accessibility for different cache types
- **MaxAge**: How long the response should be cached
- **Vary Headers**: Headers that affect cache key generation
- **NoStore**: Directive to prevent caching

```csharp:title=Headers.cs
// Public caching - can be cached by any cache
context.Response.GetTypedHeaders().CacheControl =
    new Microsoft.Net.Http.Headers.CacheControlHeaderValue()
    {
        Public = true,
        MaxAge = TimeSpan.FromSeconds(30)
    };

// Private caching - only cache by the browser
context.Response.GetTypedHeaders().CacheControl =
    new Microsoft.Net.Http.Headers.CacheControlHeaderValue()
    {
        Private = true,
        MaxAge = TimeSpan.FromSeconds(30)
    };

// No caching
context.Response.GetTypedHeaders().CacheControl =
    new Microsoft.Net.Http.Headers.CacheControlHeaderValue()
    {
        NoStore = true,
        NoTransform = true
    };

// Vary by header
context.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.Vary] =
    new string[] { "Accept-Encoding", "Accept-Language" };
```

```csharp:title=Options.cs
builder.Services.AddResponseCaching(options =>
{
    options.MaximumBodySize = 1024;  // 1KB max body size
    options.SizeLimit = 100 * 1024 * 1024;  // 100MB cache limit
    options.UseCaseSensitivePaths = true;  // Case-sensitive URL matching
});
```

**How it works in practice**: Cache-Control headers determine caching behavior. Public responses can be cached by any cache (including CDNs and proxies). Private responses can only be cached by the browser. MaxAge specifies cache duration. NoStore prevents caching entirely. Vary headers ensure different cached versions for different request variations (like different Accept-Encoding). Middleware options control practical aspects like maximum body size, storage limits, and URL case sensitivity.

**Key takeaways for interviews**:
- Cache-Control headers determine caching behavior
- Public vs Private controls cache accessibility
- MaxAge specifies cache duration
- Vary headers create different cache versions
- Middleware options control practical caching constraints

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

**Real-life analogy**: Interview preparation for response caching concepts is like understanding document management optimization. You need to understand when to use copies versus originals, how to set up rules for different document types, how to prevent outdated copies, and how to manage storage capacity while maintaining efficiency.

**Common interview questions**:
1. **What is response caching middleware and when should it be used?**
   - Stores and serves cached responses based on HTTP headers
   - Useful for public GET/HEAD API responses
   - Not suitable for UI apps (browsers prevent caching)
   - Implements standard HTTP caching semantics

2. **How does response caching determine if a response is cacheable?**
   - Only caches responses with 200 OK status code
   - Requires appropriate Cache-Control headers
   - Checks headers like Public, Private, MaxAge
   - Validates against Vary headers

3. **What are the key Cache-Control directives?**
   - Public: Cacheable by any cache (including CDNs)
   - Private: Cacheable only by the browser
   - MaxAge: How long to cache the response
   - NoStore: Prevents caching entirely
   - SharedMaxAge: Shared cache duration

4. **What are Vary headers and why are they important?**
   - Specify request headers that affect cache key generation
   - Ensure different cached versions for different request variations
   - Common Vary headers: Accept-Encoding, Accept-Language
   - Prevents serving wrong content to different clients

5. **What middleware options control caching behavior?**
   - MaximumBodySize: Largest cacheable response body size
   - SizeLimit: Storage limit for the response cache
   - UseCaseSensitivePaths: Case-sensitive URL matching
   - These options control practical caching constraints

**Key interview concepts**:
- **HTTP Caching Semantics**: Standard caching behavior per HTTP spec
- **Cache Headers**: Cache-Control, ETag, Last-Modified
- **Cacheability Conditions**: When responses can be cached
- **Performance Benefits**: Reduced server load and faster response times
- **UI vs API**: Output caching for UI, response caching for APIs

**How to approach interview questions**:
- Start with clear definition of response caching purpose
- Explain HTTP caching semantics and header-based configuration
- Discuss when response caching is appropriate (API vs UI apps)
- Address Cache-Control directives and their effects
- Mention middleware options for practical constraints

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Response caching middleware in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/performance/caching/middleware?view=aspnetcore-10.0)