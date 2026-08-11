---
title: "Builtin Metrics"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/4_metrics/0_builtin_metrics"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Builtin Metrics Overview - Preconfigured Measurements</summary>
  <div>

## ASP.NET Core Built-in Metrics

**Real-life analogy**: Built-in metrics are like the pre-installed gauges in a car - speedometer, fuel gauge, temperature gauge. These come standard and provide essential information without any custom setup. You can start using them immediately to monitor the car's health. ASP.NET Core built-in metrics provide the same capability - preconfigured metrics for HTTP requests, server performance, component lifecycle, and other aspects available immediately without custom instrumentation.

**Technical explanation**: ASP.NET Core includes many built-in metrics using System.Diagnostics.Metrics API. Metrics are organized by meter names (Microsoft.AspNetCore.Hosting, Microsoft.AspNetCore.Components, Microsoft.AspNetCore.Server.Kestrel). Each metric has an instrument type (Counter, Histogram, UpDownCounter) with units and attributes. Built-in metrics include http.server.request.duration, http.server.active_requests, aspnetcore.components.navigation, and many others. These metrics provide comprehensive monitoring without custom instrumentation.

**Key jargon explained**:
- **Meter**: Namespace for related metrics
- **Instrument Type**: Counter, Histogram, UpDownCounter
- **Attributes**: Key-value pairs for categorization
- **Histogram**: Distribution of measurements
- **UpDownCounter**: Monotonically increasing and decreasing values

```csharp:title=HostingMetrics.cs
// Microsoft.AspNetCore.Hosting meter
// http.server.request.duration: Histogram, seconds
// http.server.active_requests: UpDownCounter, requests

builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddMeter("Microsoft.AspNetCore.Hosting");
    });
```

```csharp:title=ComponentsMetrics.cs
// Microsoft.AspNetCore.Components meter
// aspnetcore.components.navigation: Counter, routes
// aspnetcore.components.event_handler: Histogram, seconds

builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddMeter("Microsoft.AspNetCore.Components");
    });
```

**How it works in practice**: ASP.NET Core automatically collects built-in metrics as requests are processed. Metrics are emitted from various components (hosting, Kestrel, Blazor components). Each metric has attributes that provide context (route, method, status code, error type). OpenTelemetry exports these metrics to external systems like Prometheus. The comprehensive built-in metrics cover most monitoring scenarios without requiring custom instrumentation.

**Key takeaways for interviews**:
- ASP.NET Core includes comprehensive built-in metrics
- Organized by meter names (Hosting, Components, Kestrel)
- Instrument types: Counter, Histogram, UpDownCounter
- Attributes provide context for categorization
- Available immediately without custom instrumentation

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Key Built-in Metrics - Essential Monitoring</summary>
  <div>

## Key Built-in Metrics

**Real-life analogy**: Key built-in metrics are like the most important gauges in a car dashboard - speedometer, fuel gauge, temperature. These provide the most critical information for safe operation. Other gauges exist but these are the essentials. ASP.NET Core key built-in metrics provide the most critical monitoring information - request duration, active requests, component navigation - for operational health monitoring.

**Technical explanation**: Key built-in metrics include http.server.request.duration (histogram measuring request duration), http.server.active_requests (UpDownCounter tracking concurrent requests), aspnetcore.components.navigation (counter tracking route changes), aspnetcore.components.event_handler (histogram measuring event handler duration). These metrics provide essential monitoring for performance, capacity planning, and operational health. Each includes relevant attributes for filtering and analysis.

**Key jargon explained**:
- **http.server.request.duration**: Request duration histogram
- **http.server.active_requests**: Concurrent request count
- **aspnetcore.components.navigation**: Route change counter
- **aspnetcore.components.event_handler**: Event handler duration
- **Attributes**: Context for filtering (route, method, status code)

```csharp:title=KeyMetrics.cs
// Essential metrics for monitoring:
// 1. http.server.request.duration - Request performance
// 2. http.server.active_requests - Concurrent load
// 3. aspnetcore.components.navigation - Blazor navigation
// 4. aspnetcore.components.event_handler - Event handler performance

builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddMeter("Microsoft.AspNetCore.Hosting",
                         "Microsoft.AspNetCore.Components");
    });
```

**How it works in practice**: These key metrics are automatically collected as applications run. http.server.request.duration measures how long requests take, enabling performance monitoring and SLA tracking. http.server.active_requests tracks concurrent load for capacity planning. Blazor metrics track component navigation and event handler performance for SPA monitoring. All metrics include attributes for filtering by route, method, status code, and other dimensions.

**Key takeaways for interviews**:
- http.server.request.duration: request performance monitoring
- http.server.active_requests: concurrent load tracking
- aspnetcore.components.navigation: Blazor navigation tracking
- aspnetcore.components.event_handler: event handler performance
- Attributes enable filtering and analysis by dimensions

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

**Real-life analogy**: Interview preparation for built-in metrics concepts is like understanding pre-installed monitoring systems. You need to understand what metrics are available, how to access them, what they measure, and how to use them for monitoring without custom setup.

**Common interview questions**:
1. **What are built-in metrics in ASP.NET Core?**
   - Preconfigured metrics using System.Diagnostics.Metrics API
   - Organized by meter names (Hosting, Components, Kestrel)
   - Available immediately without custom instrumentation
   - Cover HTTP requests, server performance, component lifecycle
   - Comprehensive monitoring out of the box

2. **What are the key built-in metrics?**
   - http.server.request.duration: request duration histogram
   - http.server.active_requests: concurrent request count
   - aspnetcore.components.navigation: route change counter
   - aspnetcore.components.event_handler: event handler duration
   - Server metrics (Kestrel connections, queue length)

3. **How do you enable built-in metrics?**
   - Add OpenTelemetry packages
   - AddMeter for specific meters (Microsoft.AspNetCore.Hosting)
   - Configure Prometheus exporter or other exporters
   - Metrics automatically collected without custom code
   - Use AddMeter to select which meters to enable

4. **What instrument types are used for built-in metrics?**
   - Counter: monotonically increasing values
   - Histogram: distribution of measurements
   - UpDownCounter: monotonically increasing and decreasing
   - Gauge: current value snapshot
   - Each type suited for different measurement scenarios

5. **How do attributes help with built-in metrics?**
   - Provide context for categorization and filtering
   - Examples: route, method, status code, error type
   - Enable multi-dimensional analysis
   - Filter metrics by specific dimensions
   - Group metrics for aggregation and alerting

**Key interview concepts**:
- **Preconfigured Metrics**: Available without custom instrumentation
- **Meter Organization**: Grouped by namespace
- **Instrument Types**: Counter, Histogram, UpDownCounter
- **Attributes**: Context for filtering and analysis
- **Comprehensive Coverage**: HTTP, server, components metrics

**How to approach interview questions**:
- Start with clear definition of built-in metrics
- Explain key metrics and their purposes
- Discuss meter organization and AddMeter configuration
- Address instrument types and their use cases
- Mention attributes for filtering and analysis

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core built-in metrics | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/log-mon/metrics/built-in?view=aspnetcore-10.0)