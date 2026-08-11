---
title: "Rate Limiting"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware/0_rate_limiting"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Rate Limiting Overview - Request Flow Management</summary>
  <div>

## Rate Limiting Middleware

**Real-life analogy**: Rate limiting is like having a receptionist who controls how many people can enter a building at once. This prevents overcrowding, ensures fair access, protects resources from being overwhelmed, and prevents abuse from people trying to enter too frequently. Rate limiting middleware provides the same traffic control for web applications - limiting the number of requests from users or clients to prevent abuse, ensure fair usage, protect resources, and maintain performance.

**Technical explanation**: Rate limiting middleware manages the flow of incoming requests to an application by configuring rate limiting policies and attaching them to endpoints. Policies can be global (applied to all endpoints) or named (applied to specific endpoints). Rate limiting helps prevent abuse, ensure fair usage, protect backend resources, enhance security against DoS attacks, improve performance, and manage costs for usage-based services. The Microsoft.AspNetCore.RateLimiting package provides the middleware with different partition strategies and limiter types.

**Key jargon explained**:
- **Rate Limiting**: Controlling request rate to prevent abuse
- **Global Limiter**: Policy applied to all endpoints automatically
- **Named Policies**: Policies explicitly applied to specific endpoints
- **Partition Key**: Identifier for grouping requests (user ID, IP address)
- **Limiter Type**: Algorithm for rate limiting (fixed window, sliding window, token bucket)

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Configure rate limiting services
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 10,
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();
app.UseRateLimiter();  // Enable rate limiting middleware
app.MapControllers();

app.Run();
```

**How it works in practice**: Rate limiting middleware intercepts requests and enforces configured policies. Each policy defines how many requests are allowed within a time window. Requests exceeding the limit receive HTTP 429 (Too Many Requests) responses. Partition keys identify request groups (by user ID, IP address, or other criteria). Different limiter algorithms provide different rate limiting strategies: fixed window (reset at regular intervals), sliding window (rolling time window), and token bucket (burst capacity with steady rate).

**Key takeaways for interviews**:
- Rate limiting prevents abuse and ensures fair resource usage
- Global limiters apply to all endpoints automatically
- Named policies are explicitly applied to specific endpoints
- Different limiter algorithms (fixed window, sliding window, token bucket)
- Requests exceeding limits receive HTTP 429 responses

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Limiter Types - Rate Limiting Algorithms</summary>
  <div>

## Rate Limiter Types

**Real-life analogy**: Rate limiter types are like different queue management systems. A fixed window limiter is like a restaurant that resets its seating capacity every hour - once the hour is full, no more customers are seated until the next hour. A sliding window limiter is like a moving window that always looks at the last hour of activity. A token bucket limiter is like having a bucket of tokens that refill at a steady rate - you need a token to be served, and tokens are replenished over time.

**Technical explanation**: Rate limiting middleware supports different limiter algorithms with different characteristics. Fixed window limiters reset permit limits at regular intervals. Sliding window limiters maintain a rolling time window. Token bucket limiters provide burst capacity with steady rate replenishment. Each algorithm has different trade-offs in terms of strictness, performance, and burst handling. The choice depends on the use case and desired rate limiting behavior.

**Key jargon explained**:
- **Fixed Window**: Permit limits reset at regular time intervals
- **Sliding Window**: Rolling time window for more precise limiting
- **Token Bucket**: Burst capacity with steady rate replenishment
- **Permit Limit**: Maximum number of requests allowed
- **Queue Limit**: Number of requests that can be queued

```csharp:title=LimiterTypes.cs
builder.Services.AddRateLimiter(options =>
{
    // Fixed window limiter
    options.AddFixedWindowLimiter("fixed", opt =>
    {
        opt.PermitLimit = 10;
        opt.Window = TimeSpan.FromSeconds(30);
        opt.QueueLimit = 5;
    });

    // Sliding window limiter
    options.AddSlidingWindowLimiter("sliding", opt =>
    {
        opt.PermitLimit = 10;
        opt.Window = TimeSpan.FromSeconds(30);
        opt.SegmentsPerWindow = 3;
        opt.QueueLimit = 5;
    });

    // Token bucket limiter
    options.AddTokenBucketLimiter("token", opt =>
    {
        opt.TokenLimit = 10;
        opt.QueueLimit = 5;
        opt.ReplenishmentPeriod = TimeSpan.FromSeconds(10);
        opt.TokensPerPeriod = 1;
    });
});
```

```csharp:title=Application.cs
app.MapGet("/api/fixed", () => "Fixed window rate limited")
    .RequireRateLimiting("fixed");

app.MapGet("/api/sliding", () => "Sliding window rate limited")
    .RequireRateLimiting("sliding");

app.MapGet("/api/token", () => "Token bucket rate limited")
    .RequireRateLimiting("token");
```

**How it works in practice**: Fixed window limiters are simple but can allow bursts at window boundaries. Sliding window limiters provide more precise rate limiting by looking at the exact time window. Token bucket limiters allow burst capacity while maintaining a steady rate. Queue limits allow requests to wait when the limit is exceeded rather than being rejected immediately. The choice of limiter type depends on whether you need strict rate limiting, burst tolerance, or queue handling.

**Key takeaways for interviews**:
- Fixed window: Simple but allows bursts at boundaries
- Sliding window: More precise rate limiting with rolling windows
- Token bucket: Burst capacity with steady rate replenishment
- Queue limits allow requests to wait instead of rejection
- Choice depends on use case and desired behavior

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Partition Strategies - Request Grouping</summary>
  <div>

## Rate Limiting Partition Strategies

**Real-life analogy**: Partition strategies are like deciding how to group customers for rate limiting. You might limit per person (each individual gets their own limit), per household (everyone at the same address shares a limit), or globally (all customers share one limit). The choice depends on whether you want to control individual behavior, household behavior, or overall system capacity. Rate limiting partition strategies work the same way - grouping requests by user, IP address, or globally.

**Technical explanation**: Partition strategies determine how requests are grouped for rate limiting. Common strategies include per-user (by user ID), per-IP address (by client IP), or global (all requests share the limit). The partition key determines which requests are counted together. Using HttpContext.User.Identity.Name provides per-user limiting, while HttpContext.Request.Headers.Host provides per-IP limiting. The choice affects fairness, security, and resource protection effectiveness.

**Key jargon explained**:
- **Partition Key**: Identifier for grouping requests
- **Per-User Limiting**: Each authenticated user has individual limits
- **Per-IP Limiting**: Each IP address has individual limits
- **Global Limiting**: All requests share the same limit
- **Anonymous Users**: Fallback strategy for unauthenticated requests

```csharp:title=PartitionStrategies.cs
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 10,
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));
});
```

```csharp:title=PerUser.cs
// Per-user limiting (authenticated users)
partitionKey: httpContext.User.Identity?.Name ?? "anonymous"
```

```csharp:title=PerIP.cs
// Per-IP limiting (including anonymous users)
partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"
```

```csharp:title=Global.cs
// Global limiting (all requests share the limit)
partitionKey: "global"
```

**How it works in practice**: The partition key determines which requests are counted together. Per-user limiting ensures each authenticated user has their own limit, preventing abuse by individual users while allowing fair access. Per-IP limiting controls requests from each client IP, useful for preventing abuse from specific sources. Global limiting protects overall system capacity by limiting all requests together. The choice depends on whether you want to control individual behavior, prevent abuse from specific sources, or protect overall system resources.

**Key takeaways for interviews**:
- Partition strategies determine how requests are grouped
- Per-user limiting provides individual limits per authenticated user
- Per-IP limiting controls requests from each client IP
- Global limiting protects overall system capacity
- Choice depends on desired fairness and protection level

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

**Real-life analogy**: Interview preparation for rate limiting concepts is like understanding traffic management systems. You need to understand how to control flow, prevent overcrowding, ensure fair access, and protect resources while maintaining efficiency and user experience.

**Common interview questions**:
1. **What is rate limiting and why is it used?**
   - Controls the rate of incoming requests to prevent abuse
   - Ensures fair usage and protects backend resources
   - Enhances security against DoS attacks
   - Improves performance and manages costs

2. **What are the different rate limiter types?**
   - Fixed window: Limits reset at regular time intervals
   - Sliding window: Rolling time window for precise limiting
   - Token bucket: Burst capacity with steady rate replenishment
   - Each has different trade-offs for strictness and performance

3. **How do partition strategies work?**
   - Determine how requests are grouped for rate limiting
   - Per-user: Each authenticated user has individual limits
   - Per-IP: Each IP address has individual limits
   - Global: All requests share the same limit

4. **How do you apply rate limiting to endpoints?**
   - Global limiters apply to all endpoints automatically
   - Named policies are explicitly applied to specific endpoints
   - Use RequireRateLizing to attach policies
   - Can be applied to controllers, Razor Pages, or minimal APIs

5. **What happens when rate limits are exceeded?**
   - Requests receive HTTP 429 (Too Many Requests) responses
   - Queue limits allow requests to wait instead of rejection
   - Clients should implement exponential backoff
   - Retry-After header indicates when to retry

**Key interview concepts**:
- **Traffic Control**: Managing request flow to prevent overload
- **Fair Usage**: Ensuring equitable resource access
- **Resource Protection**: Preventing backend overload
- **Security Enhancement**: Mitigating DoS and abuse risks
- **Performance Optimization**: Maintaining system responsiveness

**How to approach interview questions**:
- Start with clear definition of rate limiting purpose
- Explain different limiter algorithms and their trade-offs
- Discuss partition strategies and their use cases
- Address policy application (global vs named)
- Mention security implications and best practices

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Rate limiting middleware in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/performance/rate-limit?view=aspnetcore-10.0)