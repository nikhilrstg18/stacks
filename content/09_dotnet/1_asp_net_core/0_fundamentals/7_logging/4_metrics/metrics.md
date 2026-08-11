---
title: "Metrics"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/4_metrics"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Metrics Overview - Numerical Measurements</summary>
  <div>

## ASP.NET Core Metrics

**Real-life analogy**: Metrics are like the dashboard gauges in a car - speedometer, fuel gauge, temperature gauge. These numerical measurements provide real-time information about the car's health and performance. If the temperature gauge rises above normal, you get an alert. ASP.NET Core metrics provide the same capability for applications - numerical measurements over time for monitoring health, generating alerts, and analyzing performance.

**Technical explanation**: Metrics are numerical measurements reported over time for monitoring app health and generating alerts. Using metrics involves instrumentation (code takes measurements), collection (aggregating, transmitting, storing), visualization (displaying metrics), alerting (notifications on threshold), and analysis (analyzing over time). ASP.NET Core includes many built-in metrics. OpenTelemetry enables exporting metrics to Prometheus. dotnet-counters provides live metric viewing without setup.

**Key jargon explained**:
- **Metrics**: Numerical measurements reported over time
- **Instrumentation**: Code taking measurements
- **Collection**: Aggregating, transmitting, storing data
- **OpenTelemetry**: Framework for metrics export
- **dotnet-counters**: Tool for live metric viewing

```csharp:title=OpenTelemetry.cs
builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddPrometheusExporter();
        builder.AddMeter("Microsoft.AspNetCore.Hosting",
                         "Microsoft.AspNetCore.Server.Kestrel");
    });
```

```csharp:title=Endpoint.cs
app.MapPrometheusScrapingEndpoint();
```

```bash:title=dotnet-counters
dotnet-counters monitor -n WebMetric --counters Microsoft.AspNetCore.Hosting
```

**How it works in practice**: Instrumented code records numeric measurements associated with metric names. ASP.NET Core includes built-in metrics for HTTP requests, server performance, and other aspects. OpenTelemetry configures metrics export to external systems like Prometheus. dotnet-counters provides ad-hoc live metric viewing without configuration. Metrics can be enriched with custom tags for categorization. Dashboards visualize metrics and alerts notify when thresholds are exceeded.

**Key takeaways for interviews**:
- Metrics are numerical measurements for monitoring
- Instrumentation, collection, visualization, alerting, analysis
- ASP.NET Core includes many built-in metrics
- OpenTelemetry exports to Prometheus
- dotnet-counters for live viewing without setup

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

**Real-life analogy**: Interview preparation for metrics concepts is like understanding monitoring systems. You need to understand how to measure performance, how to collect and store data, how to visualize it, how to set up alerts, and how to analyze trends over time.

**Common interview questions**:
1. **What are metrics and when should they be used?**
   - Numerical measurements reported over time
   - Used for monitoring app health and generating alerts
   - Track requests per second, response time, error rates
   - Enable dashboards for visualization and alerts
   - Analyze trends over time for capacity planning

2. **How does the metrics pipeline work?**
   - Instrumentation: code takes measurements
   - Collection: aggregating, transmitting, storing
   - Visualization: displaying metrics in human-readable format
   - Alerting: notifications when thresholds exceeded
   - Analysis: analyzing metrics over time

3. **What are the built-in ASP.NET Core metrics?**
   - http.server.request.duration: HTTP request duration
   - http.server.current.requests: current request count
   - Server performance metrics (Kestrel)
   - Hosting metrics
   - Comprehensive list in built-in metrics documentation

4. **How do you export metrics with OpenTelemetry?**
   - Add OpenTelemetry package
   - AddPrometheusExporter for Prometheus export
   - AddMeter for specific metrics (Microsoft.AspNetCore.Hosting)
   - MapPrometheusScrapingEndpoint for scrape endpoint
   - Configure histogram boundaries for distribution

5. **How does dotnet-counters differ from OpenTelemetry?**
   - dotnet-counters: ad-hoc live viewing, no setup
   - OpenTelemetry: production monitoring with external storage
   - dotnet-counters: command-line tool
   - OpenTelemetry: framework-based export to Prometheus
   - Use dotnet-counters for debugging, OpenTelemetry for production

**Key interview concepts**:
- **Instrumentation**: Code taking measurements
- **Collection Pipeline**: Aggregating, transmitting, storing
- **OpenTelemetry**: Framework for metrics export
- **dotnet-counters**: Ad-hoc live metric viewing
- **Tag Enrichment**: Adding custom categorization

**How to approach interview questions**:
- Start with clear definition of metrics purpose
- Explain metrics pipeline (instrumentation to analysis)
- Discuss built-in ASP.NET Core metrics
- Address OpenTelemetry export to Prometheus
- Mention dotnet-counters for ad-hoc debugging

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core metrics | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/log-mon/metrics/metrics?view=aspnetcore-10.0)