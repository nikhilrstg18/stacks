---
title: "Rate Limiting"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware/0_rate_limiting"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Rate Limiting Overview - Like a traffic cop controlling cars at an intersection</summary>
  <div>

## What is Rate Limiting?

**Real-life analogy**: Rate limiting is like a traffic cop controlling cars at a busy intersection. The cop ensures that cars don't all rush in at once, which would cause accidents and gridlock. Instead, they let a certain number of cars through at a time, keeping traffic flowing smoothly for everyone. In web apps, rate limiting does the same thing for incoming requests.

**Technical explanation**: Rate limiting middleware controls the flow of incoming requests to your application by setting limits on how many requests can be made in a given time period. When limits are exceeded, the middleware can reject or delay additional requests to protect your application from being overwhelmed.

**Key jargon explained**:
- **Rate Limiting**: Controlling how many requests can be made in a specific time period
- **Middleware**: Software that processes requests before they reach your application logic
- **Request**: A call to your web application, like when someone visits a page or calls an API
- **Policy**: A set of rules that define how rate limiting should be applied

**How it works in practice**: When someone makes too many requests to your app too quickly, the rate limiting middleware steps in and says "Whoa, slow down!" It can either reject the extra requests with an error message or make them wait until they're allowed through. This protects your app from being overwhelmed and ensures fair access for all users.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Why Use Rate Limiting - Like having a bouncer at a club</summary>
  <div>

## Why Use Rate Limiting?

**Real-life analogy**: Rate limiting is like having a bouncer at a popular club. The bouncer controls how many people can enter at once, preventing overcrowding and ensuring everyone has a good time. Without the bouncer, the club could get too crowded, people might get hurt, and the experience would be ruined for everyone.

**Technical explanation**: Rate limiting provides several important benefits for web applications, including preventing abuse, ensuring fair usage, protecting resources, enhancing security, improving performance, and managing costs.

**Key jargon explained**:
- **Abuse Prevention**: Stopping users from intentionally misusing your application
- **Fair Usage**: Ensuring all users have equal access to your resources
- **Resource Protection**: Preventing your servers from being overwhelmed
- **DoS Attack**: Denial of Service attack where attackers flood your app with requests
- **Cost Management**: Controlling expenses that are based on usage volume

### Key Benefits:
- **Preventing Abuse**: Stops users from making too many requests to harm your app
- **Ensuring Fair Usage**: Makes sure one user can't monopolize the system
- **Protecting Resources**: Keeps your servers from being overwhelmed by too many requests
- **Enhancing Security**: Makes it harder for attackers to flood your system with malicious requests
- **Improving Performance**: Maintains good response times by controlling request volume
- **Cost Management**: Helps predict and control expenses for usage-based services

**How it works in practice**: Without rate limiting, a single user could make thousands of requests per second, potentially crashing your server or making it slow for everyone else. With rate limiting, you can say "each user can only make 100 requests per minute," which protects your app and ensures fair access for all users.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>DDoS Protection - Like having security guards at a stadium entrance</summary>
  <div>

## Preventing DDoS Attacks

**Real-life analogy**: DDoS protection is like having security guards at a stadium entrance. Rate limiting is like one guard checking tickets, but a DDoS attack is like thousands of people trying to rush all entrances at once. You need a whole security team with barriers, cameras, and emergency protocols to handle that kind of crowd. Rate limiting helps, but you need additional protection for large-scale attacks.

**Technical explanation**: While rate limiting can help mitigate individual DoS attacks, it's not a complete solution for Distributed Denial of Service (DDoS) attacks. DDoS attacks involve multiple systems overwhelming your app from different locations, making rate limiting alone insufficient.

**Key jargon explained**:
- **DDoS Attack**: Distributed Denial of Service - attacks from many different computers at once
- **Commercial DDoS Protection**: Specialized services that protect against large-scale attacks
- **Traffic Analysis**: Monitoring incoming traffic to detect attack patterns
- **Automated Mitigation**: Systems that automatically block malicious traffic
- **CDN**: Content Delivery Network that can help absorb and distribute attack traffic

**How it works in practice**: Rate limiting can stop one user from making too many requests, but a DDoS attack might come from thousands of different computers, each making a few requests. For this level of protection, you need commercial services like Cloudflare, Azure Web Application Firewall, or AWS Shield that have massive infrastructure to absorb and filter attack traffic.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Setting Up Rate Limiting - Like installing traffic lights at an intersection</summary>
  <div>

## Setting Up Rate Limiting Middleware

**Real-life analogy**: Setting up rate limiting is like installing traffic lights at an intersection. You need to decide how often the lights should change (the time window), how many cars can go through each cycle (the permit limit), and what happens when too many cars try to go through (queuing or rejection).

**Technical explanation**: To use rate limiting, you need to configure rate limiting services in your application, enable the middleware, and apply policies to your endpoints. This involves adding the rate limiter service, defining policies, and then attaching those policies to specific endpoints.

**Key jargon explained**:
- **AddRateLimiter**: The method to add rate limiting services to your application
- **Global Limiter**: A policy that applies to all endpoints automatically
- **Named Policy**: A policy that you explicitly apply to specific endpoints
- **UseRateLimiter**: The middleware that enforces rate limiting rules
- **RequireRateLimiting**: The method to apply a named policy to an endpoint

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Step 1: Configure rate limiting services
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", opt =>
    {
        opt.PermitLimit = 4;           // Allow 4 requests
        opt.Window = TimeSpan.FromSeconds(12);  // Within 12 seconds
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        opt.QueueLimit = 2;             // Allow 2 requests to wait in queue
    });
});

var app = builder.Build();

// Step 2: Enable rate limiting middleware
app.UseRouting();
app.UseRateLimiter();

// Step 3: Apply policy to endpoints
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers().RequireRateLimiting("fixed");
});

app.Run();
```

**How it works in practice**: This code sets up a rate limiting policy called "fixed" that allows 4 requests within 12 seconds. If more requests come in, up to 2 can wait in a queue. The policy is applied to all controller endpoints. Requests that exceed these limits will be rejected with an HTTP 429 (Too Many Requests) status code.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Rate Limiting Algorithms - Like different methods for crowd control</summary>
  <div>

## Rate Limiting Algorithms

**Real-life analogy**: Rate limiting algorithms are like different methods for crowd control. You can use a turnstile that lets one person through every few seconds (fixed window), a moving walkway that continuously lets people through (sliding window), or a token system where people get a certain number of tokens per hour (token bucket). Each method has different advantages for different situations.

**Technical explanation**: ASP.NET Core supports different rate limiting algorithms, each with different characteristics for how they count and limit requests. The choice of algorithm affects how strict the limits are and how they behave over time.

**Key jargon explained**:
- **Fixed Window**: Counts requests within fixed time periods (like every minute)
- **Sliding Window**: Counts requests within a rolling time window for smoother limits
- **Token Bucket**: Gives users a "bucket" of tokens that refill over time
- **Concurrency Limit**: Limits how many requests can be processed simultaneously
- **Permit Limit**: The maximum number of requests allowed in the time window

### Common Algorithms:

**Fixed Window Limiter**:
```csharp:title=Program.cs
options.AddFixedWindowLimiter("fixed", opt =>
{
    opt.PermitLimit = 100;              // 100 requests
    opt.Window = TimeSpan.FromMinutes(1); // Per minute
    opt.QueueLimit = 10;                // 10 can wait in queue
});
```

**Sliding Window Limiter**:
```csharp:title=Program.cs
options.AddSlidingWindowLimiter("sliding", opt =>
{
    opt.PermitLimit = 100;
    opt.Window = TimeSpan.FromMinutes(1);
    opt.SegmentsPerWindow = 4;          // Divide minute into 4 segments
});
```

**Token Bucket Limiter**:
```csharp:title=Program.cs
options.AddTokenBucketLimiter("token", opt =>
{
    opt.TokenLimit = 100;               // Max tokens
    opt.QueueLimit = 10;
    opt.ReplenishmentPeriod = TimeSpan.FromSeconds(10); // Refill rate
    opt.TokensPerPeriod = 10;           // Add 10 tokens every 10 seconds
});
```

**How it works in practice**: 
- **Fixed Window**: Simple but can allow bursts at window boundaries (like 100 requests at 11:59:59 and 100 more at 12:00:01)
- **Sliding Window**: Smoother request distribution but more complex to implement
- **Token Bucket**: Good for APIs with sporadic traffic, allows temporary bursts
- **Concurrency**: Limits simultaneous processing rather than request count

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Applying Rate Limiting - Like assigning different security levels to different areas</summary>
  <div>

## Applying Rate Limiting to Endpoints

**Real-life analogy**: Applying rate limiting to different endpoints is like assigning different security levels to different areas of a building. The lobby might have open access, the offices need key cards, and the server room needs special clearance. Similarly, you can apply different rate limiting policies to different parts of your application.

**Technical explanation**: You can apply rate limiting policies globally to all endpoints, or specifically to individual endpoints, controllers, or routes. This lets you have stricter limits for sensitive operations while being more lenient for public content.

**Key jargon explained**:
- **Global Limiter**: Applied to all endpoints automatically
- **Named Policy**: Applied to specific endpoints using RequireRateLimiting
- **Endpoint**: A specific URL or route in your application
- **MVC Controllers**: Traditional controller-based endpoints
- **Minimal APIs**: Modern, lightweight API endpoints

### Apply to Web API Endpoints:
```csharp:title=Program.cs
app.MapGet("/api/resource", () => "This endpoint is rate limited")
   .RequireRateLimiting("fixed"); // Apply specific policy
```

### Apply to MVC Controllers:
```csharp:title=Program.cs
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers().RequireRateLimiting("fixed");
});
```

### Apply to Specific Controller:
```csharp:title=Controller.cs
[RateLimit("fixed")]
public class MyController : Controller
{
    // All actions in this controller use the "fixed" policy
}
```

### Apply to Minimal APIs:
```csharp:title=Program.cs
app.MapGet("/api/data", () => GetData())
   .RequireRateLimiting("strict"); // Stricter policy for this endpoint
```

**How it works in practice**: You can have different policies for different needs:
- Public content: Lenient limits (100 requests per minute)
- User authentication: Stricter limits (10 requests per minute)
- API calls: Very strict limits (5 requests per minute)
- Admin functions: Extremely strict limits (2 requests per minute)

This ensures your most sensitive and expensive operations have the strongest protection.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Global vs Named Policies - Like building rules vs house rules</summary>
  <div>

## Global vs Named Rate Limiting Policies

**Real-life analogy**: Global policies are like building-wide rules that apply to everyone - no smoking in the building, everyone must wear ID badges. Named policies are like house rules that apply to specific rooms - no food in the computer lab, quiet in the library. Global policies cover everything, while named policies give you fine-grained control.

**Technical explanation**: You can configure rate limiting as a global limiter that applies to all endpoints automatically, or as named policies that you explicitly apply to specific endpoints. Global limiters are simpler but less flexible, while named policies give you precise control over different parts of your application.

**Key jargon explained**:
- **Global Limiter**: Automatically applies to all endpoints without explicit configuration
- **Named Policy**: Must be explicitly applied to specific endpoints
- **Partition Key**: Used to identify different users or clients for rate limiting
- **Override**: When a named policy overrides the global policy for a specific endpoint

### Global Limiter Example:
```csharp:title=Program.cs
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 10,              // 10 requests per minute for everyone
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));
});
```

### Named Policy Example:
```csharp:title=Program.cs
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("strict", opt =>
    {
        opt.PermitLimit = 5;               // Strict policy for sensitive endpoints
        opt.Window = TimeSpan.FromMinutes(1);
    });

    options.AddFixedWindowLimiter("lenient", opt =>
    {
        opt.PermitLimit = 100;             // Lenient policy for public content
        opt.Window = TimeSpan.FromMinutes(1);
    });
});
```

**How it works in practice**: Use a global limiter when you want consistent protection across your entire application. Use named policies when different endpoints need different levels of protection. You can even combine them - have a global baseline with stricter named policies for sensitive operations.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Testing Rate Limiting - Like stress testing a bridge</summary>
  <div>

## Testing Rate Limiting

**Real-life analogy**: Testing rate limiting is like stress testing a bridge. You don't want to wait until thousands of cars are on it to see if it collapses. Instead, you test it with controlled loads to make sure it handles traffic safely. Similarly, you should test your rate limiting to ensure it works correctly before deploying.

**Technical explanation**: Rate limiting should be carefully tested before deployment to ensure it doesn't break legitimate use while still protecting against abuse. Testing involves verifying that limits are enforced correctly, that the application handles rate limit errors gracefully, and that the limits are appropriate for your expected traffic patterns.

**Key jargon explained**:
- **Load Testing**: Simulating high traffic to test how your app performs
- **Rate Limit Errors**: HTTP 429 status codes when limits are exceeded
- **Graceful Degradation**: Ensuring your app still works when rate limited
- **Monitoring**: Tracking rate limit violations and their impact

### Testing Approach:
1. **Test Normal Usage**: Verify that legitimate users aren't blocked
2. **Test Limit Enforcement**: Confirm that limits are actually enforced
3. **Test Error Handling**: Ensure your app handles 429 errors gracefully
4. **Test Different Policies**: Verify each named policy works as expected
5. **Load Testing**: Simulate high traffic to test overall performance

**How it works in practice**: Use tools like Apache JMeter, Locust, or k6 to simulate traffic patterns. Test that:
- Normal users can access your app without issues
- When limits are exceeded, users get clear error messages
- Your app doesn't crash under high load
- The rate limiting doesn't negatively impact legitimate business operations

This testing ensures your rate limiting protects your app without hurting your users' experience.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Rate limiting middleware in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/performance/rate-limit?view=aspnetcore-10.0)