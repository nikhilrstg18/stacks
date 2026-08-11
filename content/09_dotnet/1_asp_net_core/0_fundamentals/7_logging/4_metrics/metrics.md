---
title: "Metrics"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/4_metrics"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Metrics - Like a dashboard showing performance numbers</summary>
  <div>

## What are Metrics?

**Real-life analogy**: Metrics are like a car's dashboard showing speed, fuel level, and engine temperature. Instead of just knowing if the car is running, you can see detailed numbers that tell you how well it's performing. If the speed drops or temperature rises, you know something might be wrong. Metrics for apps work the same way - they show detailed performance numbers.

**Technical explanation**: Metrics are numerical measurements reported over time. They're used to monitor app health and generate alerts. Examples include requests per second, response time in milliseconds, and error rates. Metrics are collected, stored, visualized in dashboards, and used to trigger alerts when thresholds are exceeded.

**Key jargon explained**:
- **Metrics**: Numerical measurements reported over time
- **Instrumentation**: Code that takes measurements and associates them with metric names
- **Collection**: The process of aggregating, transmitting, and storing metric data
- **Visualization**: Tools that display metrics in human-readable formats
- **Alerting**: Notifications when metrics exceed thresholds

```csharp:title=Program.cs
using OpenTelemetry.Metrics;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddPrometheusExporter();
        builder.AddMeter("Microsoft.AspNetCore.Hosting");
    });

var app = builder.Build();

app.MapPrometheusScrapingEndpoint();

app.MapGet("/", () => "Hello Metrics!");

app.Run();
```

**How it works in practice**: Metrics provide:
- **Detailed Information**: Numerical data about app performance
- **Trend Analysis**: See how performance changes over time
- **Alerting**: Get notified when something goes wrong
- **Visualization**: Dashboards show metrics in readable formats
- **Proactive Monitoring**: Fix issues before users notice

Metrics complement logging by providing numerical data that's easy to analyze and visualize.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Using Metrics - Like setting up a car dashboard</summary>
  <div>

## Using Metrics

**Real-life analogy**: Using metrics is like setting up a car dashboard. You need sensors (instrumentation) to measure speed and temperature, a display (visualization) to show the numbers, and an alarm (alerting) that goes off if something is wrong. All these components work together to give you a complete picture of how the car is performing.

**Technical explanation**: Using metrics involves instrumentation (code that takes measurements), collection and storage (transmitting metrics to external storage), visualization (displaying metrics in dashboards), alerting (notifications when thresholds are exceeded), and analysis (analyzing metrics over time).

**Key jargon explained**:
- **Instrumentation**: Code in libraries that takes measurements
- **Collection**: Aggregating and transmitting metric data
- **Storage**: External systems that store metric data
- **Visualization**: Tools like Grafana that display metrics
- **Alerting**: Tools that send notifications based on thresholds

### The Metrics Pipeline:
```csharp:title=Pipeline.cs
// 1. Instrumentation: Code takes measurements
//    - Built-in metrics from .NET and ASP.NET Core
//    - Custom metrics from your code

// 2. Collection: Metrics are transmitted
//    - OpenTelemetry collects metrics
//    - Exporters send metrics to storage

// 3. Storage: Metrics are stored
//    - Prometheus stores time-series data
//    - Other storage options available

// 4. Visualization: Metrics are displayed
//    - Grafana dashboards
//    - Other visualization tools

// 5. Alerting: Notifications are sent
//    - Alertmanager for Prometheus
//    - Other alerting systems
```

### OpenTelemetry Setup:
```csharp:title=Program.cs
using OpenTelemetry.Metrics;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddPrometheusExporter();
        builder.AddMeter("Microsoft.AspNetCore.Hosting",
                         "Microsoft.AspNetCore.Server.Kestrel");
    });

var app = builder.Build();

app.MapPrometheusScrapingEndpoint();

app.MapGet("/", () => "Hello Metrics!");

app.Run();
```

### Prometheus and Grafana:
```csharp:title=PrometheusGrafana.cs
// Prometheus: Collects and stores metrics
// - Scrapes metrics from /metrics endpoint
// - Stores time-series data
// - Provides query language for analysis

// Grafana: Visualizes metrics
// - Creates dashboards
// - Displays metrics in charts and graphs
// - Sets up alerts based on thresholds
```

### dotnet-counters:
```bash:title=CLI
# Install dotnet-counters
dotnet tool update -g dotnet-counters

# Monitor metrics in real-time
dotnet-counters monitor -n MyApp --counters Microsoft.AspNetCore.Hosting
```

**How it works in practice**: The metrics pipeline:
- **Instrumentation**: Built-in and custom metrics measure performance
- **Collection**: OpenTelemetry collects and exports metrics
- **Storage**: Prometheus or other systems store the data
- **Visualization**: Grafana or other tools display the data
- **Alerting**: Alertmanager or similar tools send notifications

All components work together to provide comprehensive monitoring and alerting.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Creating a Metrics App - Like building a dashboard</summary>
  <div>

## Creating a Metrics App

**Real-life analogy**: Creating a metrics app is like building a dashboard for your car. You need to install sensors (add packages), wire them up (configure OpenTelemetry), and set up the display (add scraping endpoint). Once everything is connected, the dashboard shows you all the performance numbers in real-time.

**Technical explanation**: To create a metrics app, you need to add OpenTelemetry packages, configure the metrics exporter, add the meters you want to track, and expose a scraping endpoint for Prometheus to collect metrics.

**Key jargon explained**:
- **OpenTelemetry**: Observability framework for metrics, logs, and traces
- **Prometheus Exporter**: Component that exports metrics in Prometheus format
- **Meter**: A collection of related metrics
- **Scraping Endpoint**: HTTP endpoint where Prometheus collects metrics
- **ExplicitBucketHistogramConfiguration**: Configuration for histogram buckets

### Create the App:
```bash:title=CLI
dotnet new web -o WebMetric
cd WebMetric
dotnet add package OpenTelemetry.Exporter.Prometheus.AspNetCore --prerelease
dotnet add package OpenTelemetry.Extensions.Hosting
```

### Configure Metrics:
```csharp:title=Program.cs
using OpenTelemetry.Metrics;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddPrometheusExporter();

        builder.AddMeter("Microsoft.AspNetCore.Hosting",
                         "Microsoft.AspNetCore.Server.Kestrel");
        builder.AddView("http.server.request.duration",
            new ExplicitBucketHistogramConfiguration
            {
                Boundaries = new double[] { 0, 0.005, 0.01, 0.025, 0.05,
                       0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10 }
            });
    });

var app = builder.Build();

app.MapPrometheusScrapingEndpoint();

app.MapGet("/", () => "Hello OpenTelemetry! ticks:"
                     + DateTime.Now.Ticks.ToString()[^3..]);

app.Run();
```

### View Metrics:
```bash:title=CLI
# Run the app
dotnet run

# Visit the metrics endpoint
curl http://localhost:5000/metrics
```

### Prometheus Configuration:
```yaml:title=prometheus.yml
scrape_configs:
  - job_name: 'aspnetcore'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:5000']
```

**How it works in practice**: The setup process:
1. **Create App**: Create a new ASP.NET Core web app
2. **Add Packages**: Install OpenTelemetry packages
3. **Configure**: Set up OpenTelemetry with Prometheus exporter
4. **Add Meters**: Specify which metrics to collect
5. **Expose Endpoint**: Add Prometheus scraping endpoint
6. **Configure Prometheus**: Set up Prometheus to scrape metrics

Once configured, Prometheus collects metrics automatically and you can visualize them in Grafana.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>dotnet-counters - Like a portable diagnostic tool</summary>
  <div>

## Viewing Metrics with dotnet-counters

**Real-life analogy**: dotnet-counters is like a portable diagnostic tool you can use to check your car's vitals anywhere. Instead of going to a mechanic, you can plug in a small device that shows you the engine temperature, oil pressure, and other metrics right there. It's quick, easy, and doesn't require any setup.

**Technical explanation**: dotnet-counters is a command-line tool that can view live metrics for .NET apps on demand. It doesn't require setup, making it useful for ad-hoc investigations or verifying that metric instrumentation is working. It works with System.Diagnostics.Metrics and EventCounters APIs.

**Key jargon explained**:
- **dotnet-counters**: Command-line tool for viewing live metrics
- **Live Metrics**: Real-time metric values as the app runs
- **Ad-hoc Investigation**: Quick checks without permanent setup
- **System.Diagnostics.Metrics**: Modern .NET metrics API
- **EventCounters**: Legacy .NET metrics API

### Install dotnet-counters:
```bash:title=CLI
dotnet tool update -g dotnet-counters
```

### Monitor Metrics:
```bash:title=CLI
# While your app is running:
dotnet-counters monitor -n WebMetric --counters Microsoft.AspNetCore.Hosting
```

### Output Example:
```
Press p to pause, r to resume, q to quit.
    Status: Running

[Microsoft.AspNetCore.Hosting]
    http-server-current-requests
        host=localhost,method=GET,port=5045,scheme=http                    0
    http-server-request-duration (s)
        host=localhost,method=GET,port=5045,protocol=HTTP/1.1,ro           0.001
        host=localhost,method=GET,port=5045,protocol=HTTP/1.1,ro           0.001
```

### Monitor All Metrics:
```bash:title=CLI
dotnet-counters monitor -n WebMetric
```

### Monitor Specific Meter:
```bash:title=CLI
dotnet-counters monitor -n WebMetric --counters Microsoft.AspNetCore.Hosting
```

### Filter by Process:
```bash:title=CLI
dotnet-counters monitor --counters Microsoft.AspNetCore.Hosting
```

**How it works in practice**: dotnet-counters provides:
- **No Setup**: Works immediately without configuration
- **Real-Time**: Shows live metrics as the app runs
- **Flexible**: Can monitor specific meters or all metrics
- **Portable**: Works with any .NET app
- **Quick**: Perfect for ad-hoc investigations

Use dotnet-counters for quick checks during development or troubleshooting, without setting up full monitoring infrastructure.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Enriching Metrics - Like adding custom gauges</summary>
  <div>

## Enriching ASP.NET Core Request Metrics

**Real-life analogy**: Enriching metrics is like adding custom gauges to your car's dashboard. The standard dashboard shows speed and fuel level, but you might want to add a gauge for tire pressure or oil life. Enriching lets you add custom tags to metrics, like categorizing requests by marketing source or user type.

**Technical explanation**: ASP.NET Core has built-in metrics like http.server.request.duration that can be enriched with custom tags using IHttpMetricsTagsFeature. Enrichment adds custom categorization to metrics, useful for dashboards and alerts built with metrics.

**Key jargon explained**:
- **Metric Enrichment**: Adding custom tags to metrics
- **IHttpMetricsTagsFeature**: Interface for enriching HTTP metrics
- **Tags**: Key-value pairs that categorize metric data
- **Custom Categorization**: Adding business-specific tags to metrics
- **Multi-dimensional Metrics**: Metrics with multiple tag dimensions

### Enrich Request Metrics:
```csharp:title=Program.cs
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) =>
{
    var tagsFeature = context.Features.Get<IHttpMetricsTagsFeature>();
    if (tagsFeature != null)
    {
        var source = context.Request.Query["utm_medium"].ToString() switch
        {
            "" => "none",
            "social" => "social",
            "email" => "email",
            "organic" => "organic",
            _ => "other"
        };
        tagsFeature.Tags.Add(new KeyValuePair<string, object?>("mkt_medium", source));
    }

    await next.Invoke(context);
});

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Add Custom Tags:
```csharp:title=CustomTags.cs
// Add marketing source tag
var source = context.Request.Query["utm_source"].ToString();
tagsFeature.Tags.Add("mkt_source", source);

// Add user type tag
var userType = context.Request.Headers["X-User-Type"].FirstOrDefault();
tagsFeature.Tags.Add("user_type", userType);

// Add feature flag tag
var featureFlag = context.Request.Headers["X-Feature-Flag"].FirstOrDefault();
tagsFeature.Tags.Add("feature_flag", featureFlag);
```

### Verify Feature Exists:
```csharp:title=Verify.cs
// Always check if the feature is present
var tagsFeature = context.Features.Get<IHttpMetricsTagsFeature>();
if (tagsFeature != null)
{
    // Feature is present, metrics are being collected
    tagsFeature.Tags.Add("custom_tag", "value");
}
```

### Multi-dimensional Metrics:
```csharp:title=MultiDimensional.cs
// Tags allow multi-dimensional analysis
// Example tags:
// - mkt_medium: social, email, organic
// - mkt_source: google, facebook, twitter
// - user_type: premium, free, trial
// - feature_flag: new_feature_enabled

// This allows analysis like:
// "Response time for social traffic from Google"
// "Error rate for premium users with new feature"
```

**How it works in practice**: Metric enrichment provides:
- **Custom Categorization**: Add business-specific tags to metrics
- **Better Analysis**: Filter and group metrics by custom dimensions
- **Dashboards**: Create more informative dashboards
- **Alerts**: Set up alerts for specific segments
- **Context**: Add business context to technical metrics

Enrichment makes metrics more useful for business analysis and targeted alerting.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Multi-dimensional Metrics - Like organizing data by multiple categories</summary>
  <div>

## Multi-dimensional Metrics

**Real-life analogy**: Multi-dimensional metrics are like organizing visitor data by multiple categories. Instead of just knowing how many visitors you had, you can see how many came from each source (Google, Facebook), how many were from each country, and how many were on mobile vs desktop. This multi-dimensional view gives you much more insight.

**Technical explanation**: Multi-dimensional metrics use tags to categorize metric data by multiple dimensions. Instead of just a single metric value, you have metric values with tags like host, method, status code, and custom tags. This allows filtering and grouping by multiple dimensions for deeper analysis.

**Key jargon explained**:
- **Tags**: Key-value pairs that categorize metric data
- **Dimensions**: Different ways to categorize data (host, method, status, etc.)
- **Filtering**: Selecting metric data based on tag values
- **Grouping**: Aggregating metrics by tag values
- **Multi-dimensional Analysis**: Analyzing metrics across multiple dimensions

### Built-in Tags:
```csharp:title=BuiltinTags.cs
// ASP.NET Core metrics include built-in tags:
// - host: The server host name
// - method: HTTP method (GET, POST, etc.)
// - port: Server port
// - scheme: HTTP or HTTPS
// - protocol: HTTP version
// - route: The matched route
// - status: Response status code
```

### Custom Tags:
```csharp:title=CustomTags.cs
// Add custom tags for business dimensions:
tagsFeature.Tags.Add("mkt_medium", "social");
tagsFeature.Tags.Add("mkt_source", "google");
tagsFeature.Tags.Add("user_type", "premium");
tagsFeature.Tags.Add("feature_flag", "new_feature");
```

### Querying by Tags:
```csharp:title=Querying.cs
// Prometheus query examples:

// All requests
http_server_requests_total

// Requests from social media
http_server_requests_total{mkt_medium="social"}

// Requests with status 500
http_server_requests_total{status="500"}

// Premium users with new feature
http_server_requests_total{user_type="premium",feature_flag="new_feature"}

// Average duration by marketing source
rate(http_server_request_duration_sum{mkt_source="google"} / http_server_request_duration_count{mkt_source="google"})
```

### Dashboard Examples:
```csharp:title=Dashboards.cs
// Create dashboards showing:
// - Request rate by marketing source
// - Error rate by user type
// - Response time by feature flag
// - Traffic by geographic region
// - Performance by API endpoint

// This multi-dimensional view provides:
// - Better understanding of user behavior
// - Targeted performance optimization
// - More accurate alerting
// - Business intelligence
```

### Tag Best Practices:
```csharp:title=BestPractices.cs
// DO:
// - Use meaningful tag names
// - Keep tag values consistent
// - Limit the number of tag dimensions
// - Use tags for business-relevant categories
// - Document custom tags for your team

// DON'T:
// - Add too many tags (cardinality explosion)
// - Use inconsistent tag values
// - Add sensitive data to tags
// - Create tags with unlimited values
// - Forget that tags affect query performance
```

**How it works in practice**: Multi-dimensional metrics provide:
- **Deep Analysis**: Analyze metrics across multiple dimensions
- **Targeted Insights**: Understand specific segments of traffic
- **Better Dashboards**: Create more informative visualizations
- **Precise Alerting**: Alert on specific segments, not just overall
- **Business Intelligence**: Connect technical metrics to business metrics

Tags make metrics much more powerful for analysis and alerting.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following dashboard guidelines</summary>
  <div>

## Metrics Best Practices

**Real-life analogy**: Following metrics best practices is like following dashboard guidelines. You should show the most important information (key metrics), organize it clearly (logical grouping), update it regularly (appropriate frequency), and set appropriate alerts (meaningful thresholds). Good guidelines make your dashboard useful and actionable.

**Technical explanation**: Following best practices ensures your metrics are effective, performant, and useful for monitoring. This includes choosing the right metrics, configuring appropriate collection intervals, setting meaningful alert thresholds, and organizing metrics for easy analysis.

**Key jargon explained**:
- **Key Metrics**: The most important metrics for your app
- **Collection Interval**: How often metrics are collected
- **Alert Thresholds**: Values that trigger alerts
- **Cardinality**: The number of unique tag value combinations
- **Performance Impact**: The overhead of collecting metrics

### DO:
- **Use metrics** for monitoring app health and performance
- **Choose key metrics** that matter for your app
- **Set appropriate collection intervals** (not too frequent)
- **Configure meaningful alert thresholds** based on business requirements
- **Use multi-dimensional metrics** for deeper analysis
- **Monitor metrics in development** to understand baseline behavior
- **Integrate with visualization tools** like Grafana
- **Test alerting** to ensure notifications work correctly

### DON'T:
- **Collect too many metrics** (performance impact)
- **Set collection intervals too frequent** (overhead)
- **Alert on every metric** (alert fatigue)
- **Ignore metric cardinality** (too many tag combinations)
- **Forget to monitor metrics** in production
- **Set unrealistic alert thresholds**
- **Collect sensitive data** in metrics
- **Use metrics for business logic** (they're for infrastructure)

### Key Metrics for Web Apps:
```csharp:title=KeyMetrics.cs
// Request metrics:
// - Request rate (requests per second)
// - Request duration (response time)
// - Error rate (percentage of failed requests)
// - Current requests (concurrent requests)

// Resource metrics:
// - CPU usage
// - Memory usage
// - Disk I/O
// - Network I/O

// Dependency metrics:
// - Database connection pool
// - External service response time
// - Cache hit rate
```

### Collection Intervals:
```csharp:title=Intervals.cs
// DO:
// - Use 15-60 second intervals for most metrics
// - Use shorter intervals (5-10s) for critical metrics
// - Use longer intervals (5-15m) for resource metrics

// DON'T:
// - Use 1-second intervals (too frequent)
// - Collect every metric every second
// - Ignore collection overhead
```

### Alert Thresholds:
```csharp:title=Thresholds.cs
// DO:
// - Set thresholds based on baseline measurements
// - Use percentiles (p95, p99) for response time
// - Set thresholds slightly above normal variation
// - Alert on sustained issues, not blips

// DON'T:
// - Set thresholds based on guesses
// - Alert on every single spike
// - Use average instead of percentiles for response time
// - Ignore seasonal variations
```

### Cardinality Management:
```csharp:title=Cardinality.cs
// Cardinality is the number of unique tag combinations
// High cardinality = too many unique tag values

// DO:
// - Limit tag values to a reasonable set
// - Use enums or predefined values
// - Avoid high-cardinality tags like user IDs
// - Monitor cardinality in your metrics system

// DON'T:
// - Add tags with unlimited values
// - Use user IDs or request IDs as tags
// - Add tags with timestamps or IP addresses
// - Ignore cardinality warnings
```

**How it works in practice**: Best practices ensure:
- **Effectiveness**: Metrics provide meaningful insights
- **Performance**: Minimal impact on app performance
- **Actionability**: Alerts trigger appropriate responses
- **Maintainability**: Metrics are well-organized and documented
- **Scalability**: Metrics scale with your infrastructure

Good metrics practices make your application more observable and easier to monitor in production.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core metrics | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/log-mon/metrics/metrics?view=aspnetcore-10.0)