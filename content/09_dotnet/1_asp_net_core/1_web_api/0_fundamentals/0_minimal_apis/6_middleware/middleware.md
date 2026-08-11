---
title: "Middleware"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/0_minimal_apis/6_middleware"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Middleware Overview - Request Processing Pipeline</summary>
  <div>

## Middleware with Minimal API Applications

**Real-life analogy**: Middleware in Minimal APIs is like the security and processing checkpoints in a secure facility. Visitors pass through multiple checkpoints - ID verification, security screening, access authorization - before reaching their destination. After their visit, they pass through exit checkpoints for logging and departure processing. Middleware provides the same layered processing for HTTP requests - each component can inspect, modify, or respond to requests before they reach endpoints, and process responses after endpoint execution.

**Technical explanation**: WebApplication automatically adds middleware based on configuration: UseDeveloperExceptionPage in Development, UseRouting if endpoints configured, UseEndpoints at the end, UseAuthentication after UseRouting if auth services detected, UseAuthorization next if authz services detected. User middleware and endpoints are added between UseRouting and UseEndpoints. Manual configuration is needed when default order isn't correct (e.g., UseCors before UseAuthentication). Terminal middleware runs after UseEndpoints if no endpoint handles the request.

**Key jargon explained**:
- **Automatic Middleware**: Framework-added based on detected services
- **UseRouting**: Endpoint routing middleware
- **UseEndpoints**: Endpoint execution middleware
- **Terminal Middleware**: Runs if no endpoint handles request
- **Middleware Order**: Critical for correct request processing

```csharp:title=AutomaticMiddleware.cs
// Effectively what automatic middleware produces:
if (isDevelopment)
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

if (isAuthenticationConfigured)
{
    app.UseAuthentication();
}

if (isAuthorizationConfigured)
{
    app.UseAuthorization();
}

// user middleware/endpoints
app.MapGet("/", () => "hello world");

app.UseEndpoints(e => {});
```

```csharp:title=ManualConfiguration.cs
// When default order isn't correct:
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
```

**How it works in practice**: WebApplication detects registered services and adds appropriate middleware automatically. UseDeveloperExceptionPage in Development for detailed error information. UseRouting enables endpoint matching. UseAuthentication and UseAuthorization are added if auth services are registered. User middleware and endpoints are added between UseRouting and UseEndpoints. When the default order isn't correct (e.g., CORS before auth), manual configuration is required. Terminal middleware added after UseEndpoints handles requests that don't match any endpoint.

**Key takeaways for interviews**:
- Automatic middleware added based on detected services
- Default order: exception page, routing, authentication, authorization
- User middleware between UseRouting and UseEndpoints
- Manual configuration when default order isn't correct
- Terminal middleware handles unmatched requests

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Terminal Middleware - Fallback Handling</summary>
  <div>

## Terminal Middleware

**Real-life analogy**: Terminal middleware is like the lost-and-found department in a facility. When a visitor tries to access a location that doesn't exist, they're directed to the lost-and-found department which handles the situation appropriately (provides assistance, logs the incident, or denies access). Terminal middleware provides the same fallback handling for HTTP requests - when no endpoint matches the request, terminal middleware handles it (returns 404, custom error page, or other response).

**Technical explanation**: Terminal middleware runs if no endpoint handles the request. It must be added after UseEndpoints to ensure it only processes requests that didn't match any endpoint. The application needs to call UseRouting and UseEndpoints explicitly to place terminal middleware at the correct location. Terminal middleware is useful for custom 404 handling, logging unmatched requests, or implementing fallback routing logic. It provides a catch-all mechanism for requests that don't match any defined endpoint.

**Key jargon explained**:
- **Terminal Middleware**: Runs if no endpoint handles request
- **Fallback Handling**: Processing unmatched requests
- **UseEndpoints**: Required for correct terminal middleware placement
- **404 Handling**: Custom not found responses
- **Catch-All**: Processing all unmatched requests

```csharp:title=TerminalMiddleware.cs
app.UseRouting();

app.MapGet("/", () => "hello world");

app.UseEndpoints(e => {});

app.Run(context =>
{
    context.Response.StatusCode = 404;
    return Task.CompletedTask;
});
```

**How it works in practice**: Terminal middleware is placed after UseEndpoints in the pipeline. When a request arrives, routing attempts to match it against defined endpoints. If no match is found, the request passes through to terminal middleware. The terminal middleware can return a 404 status, a custom error page, or implement custom fallback logic. This provides a catch-all mechanism for handling requests that don't match any endpoint, enabling custom error handling and logging for unmatched requests.

**Key takeaways for interviews**:
- Terminal middleware runs if no endpoint handles request
- Must be added after UseEndpoints
- Requires explicit UseRouting and UseEndpoints
- Useful for custom 404 handling and logging
- Provides catch-all mechanism for unmatched requests

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

**Real-life analogy**: Interview preparation for middleware concepts is like understanding security checkpoint systems. You need to understand how checkpoints are ordered, when to override defaults, how to handle fallback scenarios, and how to ensure comprehensive coverage.

**Common interview questions**:
1. **What middleware does WebApplication add automatically?**
   - UseDeveloperExceptionPage in Development
   - UseRouting if endpoints configured
   - UseEndpoints at the end if endpoints configured
   - UseAuthentication after UseRouting if auth services detected
   - UseAuthorization next if authz services detected

2. **When would you need to manually configure middleware?**
   - When default order isn't correct for the application
   - UseCors should be before UseAuthentication/UseAuthorization
   - Middleware before route matching requires manual UseRouting
   - Terminal middleware requires manual UseRouting/UseEndpoints
   - Specific middleware ordering requirements

3. **How does terminal middleware work in Minimal APIs?**
   - Runs if no endpoint handles the request
   - Must be added after UseEndpoints
   - Requires explicit UseRouting and UseEndpoints
   - Provides catch-all for unmatched requests
   - Useful for custom 404 handling

4. **What is the correct middleware order in Minimal APIs?**
   - UseDeveloperExceptionPage (Development only)
   - UseRouting
   - UseAuthentication (if configured)
   - UseAuthorization (if configured)
   - User middleware and endpoints
   - UseEndpoints
   - Terminal middleware (if needed)

5. **How do you add middleware before route matching?**
   - Call UseRouting explicitly
   - Place middleware before UseRouting call
   - UseEndpoints automatically added
   - Middleware processes requests before endpoint matching
   - Useful for early request processing

**Key interview concepts**:
- **Automatic Middleware**: Framework-added based on configuration
- **Manual Configuration**: Overriding default order
- **Terminal Middleware**: Fallback for unmatched requests
- **Middleware Order**: Critical for security and functionality
- **UseRouting/UseEndpoints**: Required for manual configuration

**How to approach interview questions**:
- Start with automatic middleware and when it's added
- Explain scenarios requiring manual configuration
- Discuss terminal middleware for fallback handling
- Address correct middleware order and its importance
- Mention middleware before route matching scenarios

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Middleware with Minimal API applications | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/minimal-apis/middleware?view=aspnetcore-10.0)