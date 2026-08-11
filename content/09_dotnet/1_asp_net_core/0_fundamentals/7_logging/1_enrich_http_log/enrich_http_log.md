---
title: "Enrich HTTP Log"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/1_enrich_http_log"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Enrich HTTP Log Overview - Custom Log Enrichment</summary>
  <div>

## Enrich HTTP Request Logs

**Real-life analogy**: Enriching HTTP logs is like adding contextual notes to security camera footage. Instead of just recording the video, the system adds notes like "visitor was VIP," "visitor came through north entrance," or "visitor had an appointment." This enriched data provides better context for analysis. HTTP log enrichers add contextual information to HTTP request logs based on HttpContext, providing better insights for monitoring and debugging.

**Technical explanation**: IHttpLogEnricher enables custom enrichment of incoming HTTP request logs. Unlike general-purpose log enrichers that enrich all logs, HTTP log enrichers specifically target incoming ASP.NET Core HTTP requests. They have access to full HttpContext including request, response, user, and connection data. Implement IHttpLogEnricher with Enrich method that calls Add on IEnrichmentTagCollector. Register with AddHttpLogEnricher<T>. The interface is experimental (EXTEXP0013) and requires .NET 8+.

**Key jargon explained**:
- **IHttpLogEnricher**: Interface for HTTP log enrichment
- **IEnrichmentTagCollector**: Collector for enrichment tags
- **HttpContext**: Full request/response context
- **Experimental Feature**: Requires EXTEXP0013 diagnostic ID suppression
- **Add Method**: Records enrichment properties

```csharp:title=Implementation.cs
#pragma warning disable EXTEXP0013

using Microsoft.AspNetCore.Diagnostics.Logging;
using Microsoft.Extensions.Diagnostics.Enrichment;

public class CustomHttpLogEnricher : IHttpLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpContext httpContext)
    {
        collector.Add("request_method", httpContext.Request.Method);
        collector.Add("request_scheme", httpContext.Request.Scheme);
        collector.Add("response_status_code", httpContext.Response.StatusCode);

        if (httpContext.User?.Identity?.IsAuthenticated is true)
        {
            collector.Add("user_authenticated", true);
        }
    }
}
```

```csharp:title=Registration.cs
#pragma warning disable EXTEXP0013

builder.Services.AddHttpLogEnricher<CustomHttpLogEnricher>();
builder.Services.AddRedaction();
```

**How it works in practice**: IHttpLogEnricher implementations are registered with AddHttpLogEnricher<T>. For each incoming HTTP request, the Enrich method is called with IEnrichmentTagCollector and HttpContext. The enricher adds contextual information via the Add method. Multiple enrichers can be registered and execute in order. Enrichment occurs during the HTTP response phase after the response has been processed. The enriched data is included in HTTP logs for better context and analysis.

**Key takeaways for interviews**:
- IHttpLogEnricher enriches incoming HTTP request logs
- Has access to full HttpContext for contextual data
- Register with AddHttpLogEnricher<T>
- Experimental feature (EXTEXP0013) requiring .NET 8+
- Differs from general-purpose log enrichers

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

**Real-life analogy**: Interview preparation for HTTP log enrichment concepts is like understanding contextual data capture systems. You need to understand how to add contextual information to logs, what data is useful, how to implement custom enrichers, and how they differ from general logging systems.

**Common interview questions**:
1. **What is IHttpLogEnricher and when should you use it?**
   - Interface for enriching incoming HTTP request logs
   - Adds contextual information based on HttpContext
   - Use when you need request-specific log context
   - Differs from general-purpose log enrichers
   - Experimental feature requiring .NET 8+

2. **How does IHttpLogEnricher differ from general log enrichers?**
   - HTTP log enrichers only target incoming HTTP requests
   - General enrichers enrich all logs in application
   - HTTP enrichers have access to full HttpContext
   - Different packages: Diagnostics.Middleware vs Telemetry.Abstractions
   - HTTP enrichers target incoming, IHttpClientLogEnricher targets outgoing

3. **How do you implement a custom HTTP log enricher?**
   - Implement IHttpLogEnricher interface
   - Implement Enrich method with IEnrichmentTagCollector and HttpContext
   - Call Add method to record enrichment properties
   - Register with AddHttpLogEnricher<T>
   - Add #pragma warning disable EXTEXP0013

4. **What contextual data can HTTP log enrichers access?**
   - Full HttpContext including request and response
   - Request method, scheme, path, headers
   - Response status code, headers
   - User authentication status
   - Connection information and other context data

5. **What are the key considerations for HTTP log enrichers?**
   - Experimental feature requires EXTEXP0013 suppression
   - Requires .NET 8 or later
   - Enrichment occurs during HTTP response phase
   - Multiple enrichers execute in registration order
   - Exceptions in enricher are logged but don't stop execution

**Key interview concepts**:
- **Contextual Enrichment**: Adding request-specific log data
- **HttpContext Access**: Full request/response context available
- **Experimental Feature**: Requires diagnostic ID suppression
- **Registration**: AddHttpLogEnricher<T> for registration
- **Execution Order**: Multiple enrichers execute in registration order

**How to approach interview questions**:
- Start with clear definition of IHttpLogEnricher purpose
- Explain difference from general-purpose log enrichers
- Discuss HttpContext access for contextual data
- Address experimental feature requirements
- Mention registration and execution order

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Enrich HTTP request logs in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/http-logging/http-log-enricher?view=aspnetcore-10.0)