---
title: "Built-in Metrics"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/4_metrics/0_builtin_metrics"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Built-in Metrics - Like pre-installed dashboard gauges</summary>
  <div>

## What are Built-in Metrics?

**Real-life analogy**: Built-in metrics are like the gauges that come pre-installed in a car's dashboard. You don't have to install a speedometer or fuel gauge - they're already there. Similarly, ASP.NET Core comes with built-in metrics for common things like HTTP requests, response times, and errors. You can start using them immediately without writing any custom code.

**Technical explanation**: ASP.NET Core includes built-in metrics produced using the System.Diagnostics.Metrics API. These metrics report information about HTTP requests, component lifecycles, server circuits, and more. They're automatically available when you enable metrics collection, requiring no custom instrumentation code.

**Key jargon explained**:
- **Built-in Metrics**: Pre-defined metrics included in ASP.NET Core
- **System.Diagnostics.Metrics**: Modern .NET metrics API
- **Instrument Type**: The type of metric (Counter, Histogram, Gauge, etc.)
- **Attributes**: Key-value pairs that provide context for metric values
- **Meter**: A collection of related metrics

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

**How it works in practice**: Built-in metrics provide:
- **No Custom Code**: Metrics are automatically available
- **Standard Measurements**: Common metrics like request duration and error rates
- **Rich Context**: Attributes provide detailed information about each metric
- **Multiple Meters**: Different components have their own metric collections
- **Immediate Value**: Start monitoring right away

Built-in metrics cover the most common monitoring scenarios without requiring custom instrumentation.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Hosting Metrics - Like server performance gauges</summary>
  <div>

## Microsoft.AspNetCore.Hosting Metrics

**Real-life analogy**: Hosting metrics are like the main performance gauges on a server dashboard. They show how many requests are being processed, how long they take, and whether there are errors. These are the most important metrics for understanding how well your web server is performing.

**Technical explanation**: The Microsoft.AspNetCore.Hosting metrics report high-level information about HTTP requests received by ASP.NET Core. They include request duration, active requests, and other server-level metrics that help you understand overall server performance.

**Key jargon explained**:
- **http.server.request.duration**: Histogram measuring request duration
- **http.server.active_requests**: Gauge showing current active requests
- **Histogram**: Metric that counts values in buckets (ranges)
- **Gauge**: Metric that shows a current value (can go up and down)
- **Route**: The matched URL pattern for the request

### http.server.request.duration:
```csharp:title=RequestDuration.cs
// Instrument Type: Histogram
// Unit: seconds (s)
// Description: Measures the duration of inbound HTTP requests

// Attributes:
// - http.route: The matched route (e.g., "/api/users/{id}")
// - http.request.method: HTTP method (GET, POST, etc.)
// - http.response.status_code: Response status code (200, 404, 500, etc.)
// - url.scheme: HTTP or HTTPS
// - network.protocol.version: HTTP version (1.1, 2, 3)
// - error.type: Error type if request failed
// - aspnetcore.request.is_unhandled: True if request wasn't handled

// Usage:
// - Monitor average response time
// - Track response time by endpoint
// - Identify slow endpoints
// - Monitor response time trends
```

### http.server.active_requests:
```csharp:title=ActiveRequests.cs
// Instrument Type: Gauge
// Unit: requests
// Description: Shows the number of active HTTP requests

// Attributes:
// - http.request.method: HTTP method (GET, POST, etc.)
// - url.scheme: HTTP or HTTPS

// Usage:
// - Monitor current server load
// - Identify traffic spikes
// - Plan capacity
// - Detect request queuing
```

### Example Queries:
```csharp:title=Queries.cs
// Average response time by route
rate(http_server_request_duration_sum{route="/api/users"} / http_server_request_duration_count{route="/api/users"})

// Request rate by status code
rate(http_server_requests_total{status_code="500"})

// Current active requests
http_server_active_requests
```

**How it works in practice**: Hosting metrics provide:
- **Performance Monitoring**: Track response times and request rates
- **Load Monitoring**: See current server load with active requests
- **Error Tracking**: Monitor error rates by status code
- **Route Analysis**: Understand performance by endpoint
- **Trend Analysis**: See how performance changes over time

These are the most important metrics for overall web server monitoring.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Blazor Components Metrics - Like UI performance tracking</summary>
  <div>

## Microsoft.AspNetCore.Components Metrics

**Real-life analogy**: Blazor components metrics are like tracking how users interact with your app's UI. They show which pages users visit, which buttons they click, and how long different UI operations take. This helps you understand user behavior and optimize the user experience.

**Technical explanation**: The Microsoft.AspNetCore.Components metrics report information on Razor component route changes, browser events, and lifecycle events. These metrics help you understand how users interact with your Blazor application and identify performance issues in the UI.

**Key jargon explained**:
- **aspnetcore.components.navigation**: Counter tracking route changes
- **aspnetcore.components.event_handler**: Histogram measuring event handler duration
- **Component Type**: The specific Blazor component
- **Route**: The URL route for the component
- **Event Handler**: The method handling a browser event

### aspnetcore.components.navigation:
```csharp:title=Navigation.cs
// Instrument Type: Counter
// Unit: routes
// Description: Tracks the total number of route changes

// Attributes:
// - aspnetcore.components.type: Component navigated to
// - aspnetcore.components.route: The component's route
// - error.type: Exception type if navigation failed

// Usage:
// - How many different pages did users visit?
// - Which routes are most popular?
// - Track navigation patterns
```

### aspnetcore.components.event_handler:
```csharp:title=EventHandler.cs
// Instrument Type: Histogram
// Unit: seconds (s)
// Description: Measures duration of processing browser events

// Attributes:
// - aspnetcore.components.type: Component type handling the event
// - aspnetcore.components.method: C# method handling the event
// - aspnetcore.components.attribute.name: Component attribute name
// - error.type: Exception type if event handler failed

// Usage:
// - Which component's click event handler is slow?
// - Which buttons are selected often?
// - Identify slow UI interactions
```

### aspnetcore.components.update_parameters:
```csharp:title=UpdateParameters.cs
// Instrument Type: Histogram
// Unit: seconds (s)
// Description: Measures duration of processing component parameters

// Attributes:
// - aspnetcore.components.type: Component type
// - error.type: Exception type if update failed

// Usage:
// - Which components are slow to update?
// - Which components are updated often?
```

### aspnetcore.components.render_diff:
```csharp:title=RenderDiff.cs
// Instrument Type: Histogram
// Unit: seconds (s)
// Description: Tracks duration of rendering batches

// Attributes:
// - aspnetcore.components.diff.length: Size of the render diff
// - error.type: Exception type if render failed

// Usage:
// - Is server rendering slow?
// - Do I render diffs that are too large?
```

**How it works in practice**: Blazor components metrics provide:
- **User Behavior**: Track which pages and features users use
- **UI Performance**: Identify slow event handlers and render operations
- **Component Analysis**: Understand which components are most active
- **Optimization**: Find opportunities to improve UI performance
- **Debugging**: Identify problematic components

These metrics are essential for monitoring and optimizing Blazor applications.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Blazor Server Circuits Metrics - Like connection tracking</summary>
  <div>

## Microsoft.AspNetCore.Components.Server.Circuits Metrics

**Real-life analogy**: Blazor Server circuits metrics are like tracking active user sessions. They show how many users are currently connected, how long they stay connected, and how much memory the sessions are using. This helps you understand server load and resource usage for Blazor Server apps.

**Technical explanation**: The Microsoft.AspNetCore.Components.Server.Circuits metrics report information on server-side Blazor circuits in Blazor Server and Blazor Web Apps. These metrics help you understand connection patterns, session duration, and resource usage.

**Key jargon explained**:
- **Circuit**: A SignalR connection between client and server in Blazor Server
- **aspnetcore.components.circuit.active**: Gauge showing active circuits in memory
- **aspnetcore.components.circuit.connected**: Gauge showing connected circuits
- **aspnetcore.components.circuit.duration**: Histogram measuring circuit lifetime

### aspnetcore.components.circuit.active:
```csharp:title=ActiveCircuits.cs
// Instrument Type: UpDownCounter
// Unit: circuits
// Description: Shows number of active circuits in memory

// Attributes: None

// Usage:
// - How much memory does session state hold?
// - Monitor memory usage for circuits
// - Plan server capacity
```

### aspnetcore.components.circuit.connected:
```csharp:title=ConnectedCircuits.cs
// Instrument Type: UpDownCounter
// Unit: circuits
// Description: Tracks number of circuits connected to clients

// Attributes: None

// Usage:
// - How many SignalR connections are open?
// - Monitor concurrent users
// - Track connection patterns
```

### aspnetcore.components.circuit.duration:
```csharp:title=CircuitDuration.cs
// Instrument Type: Histogram
// Unit: seconds (s)
// Description: Measures circuit lifetime duration

// Attributes: None

// Usage:
// - How many sessions processed?
// - How long do users keep sessions open?
// - Understand user engagement
```

### Example Queries:
```csharp:title=Queries.cs
// Current active circuits
aspnetcore_components_circuit_active

// Current connected circuits
aspnetcore_components_circuit_connected

// Average session duration
rate(aspnetcore_components_circuit_duration_sum / aspnetcore_components_circuit_duration_count)
```

**How it works in practice**: Circuit metrics provide:
- **Connection Monitoring**: Track active and connected circuits
- **Resource Planning**: Understand memory and resource usage
- **User Engagement**: See how long users stay connected
- **Capacity Planning**: Plan server capacity based on circuit counts
- **Debugging**: Identify connection issues

These metrics are critical for monitoring Blazor Server applications and managing server resources.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Instrument Types - Like different gauge types</summary>
  <div>

## Metric Instrument Types

**Real-life analogy**: Instrument types are like different types of gauges on a dashboard. A speedometer shows current speed (gauge), an odometer shows total distance (counter), and a fuel gauge shows current fuel level (up-down counter). Each type is suited for measuring different kinds of values.

**Technical explanation**: System.Diagnostics.Metrics supports different instrument types: Counter (monotonically increasing values), Histogram (counts values in buckets), Gauge (current value that can go up and down), and UpDownCounter (can increase or decrease). Each type is suited for different measurement scenarios.

**Key jargon explained**:
- **Counter**: Monotonically increasing value (like an odometer)
- **Histogram**: Counts values in buckets/ranges (like response time distribution)
- **Gauge**: Current value that can go up or down (like temperature)
- **UpDownCounter**: Can increase or decrease (like active connections)
- **Bucket**: A range of values in a histogram

### Counter:
```csharp:title=Counter.cs
// Monotonically increasing value
// Only goes up, never down
// Good for counting events

// Examples:
// - Total requests processed
// - Total errors encountered
// - Total bytes sent

// Usage:
// - Track cumulative counts
// - Count events over time
// - Calculate rates (requests per second)
```

### Histogram:
```csharp:title=Histogram.cs
// Counts values in buckets/ranges
// Shows distribution of values
// Good for measuring durations

// Examples:
// - Request duration (0-10ms, 10-50ms, 50-100ms, etc.)
// - Response size distribution
// - Database query duration

// Usage:
// - Understand value distribution
// - Calculate percentiles (p95, p99)
// - Identify outliers
```

### Gauge:
```csharp:title=Gauge.cs
// Current value that can go up or down
// Shows instantaneous value
// Good for current state

// Examples:
// - Current memory usage
// - Current CPU usage
// - Current temperature

// Usage:
// - Monitor current state
// - Track resource usage
// - Detect spikes
```

### UpDownCounter:
```csharp:title=UpDownCounter.cs
// Can increase or decrease
// Tracks changes over time
// Good for tracking active items

// Examples:
// - Active connections
// - Active requests
// - Items in a queue

// Usage:
// - Track active items
// - Monitor concurrency
// - Understand resource usage
```

### Choosing the Right Type:
```csharp:title=Choosing.cs
// Use Counter when:
// - Value only increases
// - Counting events
// - Need to calculate rates

// Use Histogram when:
// - Measuring duration or size
// - Need distribution information
// - Need percentiles

// Use Gauge when:
// - Measuring current state
// - Value can go up or down
// - Need instantaneous value

// Use UpDownCounter when:
// - Tracking active items
// - Value can increase or decrease
// - Need to track changes
```

**How it works in practice**: Instrument types provide:
- **Appropriate Measurement**: Choose the right type for your data
- **Accurate Representation**: Different types represent different kinds of data
- **Analysis Capabilities**: Each type enables different analysis
- **Standard Semantics**: Consistent meaning across different metrics systems

Choose the instrument type that best represents what you're measuring.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Enabling Built-in Metrics - Like turning on the dashboard</summary>
  <div>

## Enabling Built-in Metrics

**Real-life analogy**: Enabling built-in metrics is like turning on the dashboard in your car. The gauges are already installed, but you need to turn on the dashboard to see them. Similarly, built-in metrics are available in ASP.NET Core, but you need to configure metrics collection to start seeing them.

**Technical explanation**: To use built-in metrics, you need to configure OpenTelemetry with the appropriate meters. Use AddMeter to specify which metric collections you want to collect. The most common meters are Microsoft.AspNetCore.Hosting for HTTP metrics and Microsoft.AspNetCore.Components for Blazor metrics.

**Key jargon explained**:
- **AddMeter**: Method to specify which meters to collect
- **Microsoft.AspNetCore.Hosting**: Meter for HTTP server metrics
- **Microsoft.AspNetCore.Components**: Meter for Blazor component metrics
- **Microsoft.AspNetCore.Components.Server.Circuits**: Meter for Blazor Server circuit metrics
- **Microsoft.AspNetCore.Components.Lifecycle**: Meter for Blazor lifecycle metrics

### Basic Setup:
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

### Multiple Meters:
```csharp:title=MultipleMeters.cs
builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddPrometheusExporter();
        
        // HTTP server metrics
        builder.AddMeter("Microsoft.AspNetCore.Hosting");
        
        // Blazor component metrics
        builder.AddMeter("Microsoft.AspNetCore.Components");
        
        // Blazor Server circuit metrics
        builder.AddMeter("Microsoft.AspNetCore.Components.Server.Circuits");
        
        // Blazor lifecycle metrics
        builder.AddMeter("Microsoft.AspNetCore.Components.Lifecycle");
    });
```

### All ASP.NET Core Meters:
```csharp:title=AllMeters.cs
builder.Services.AddOpenTelemetry()
    .WithMetrics(builder =>
    {
        builder.AddPrometheusExporter();
        
        // Add all ASP.NET Core meters
        builder.AddMeter("Microsoft.AspNetCore.Hosting");
        builder.AddMeter("Microsoft.AspNetCore.Components");
        builder.AddMeter("Microsoft.AspNetCore.Components.Server.Circuits");
        builder.AddMeter("Microsoft.AspNetCore.Components.Lifecycle");
        builder.AddMeter("Microsoft.AspNetCore.Http.Connections");
        builder.AddMeter("Microsoft.AspNetCore.Routing");
        builder.AddMeter("Microsoft.AspNetCore.Server.Kestrel");
    });
```

### View Available Metrics:
```bash:title=CLI
# Run dotnet-counters to see available metrics
dotnet-counters monitor -n MyApp --counters Microsoft.AspNetCore.Hosting
```

**How it works in practice**: Enabling built-in metrics:
- **Configure OpenTelemetry**: Set up metrics collection
- **Add Meters**: Specify which metric collections to collect
- **Add Exporter**: Configure where to send metrics (Prometheus, etc.)
- **Expose Endpoint**: Add scraping endpoint for Prometheus
- **View Metrics**: Use tools like dotnet-counters or Grafana

Built-in metrics are available immediately once you configure the appropriate meters.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like dashboard maintenance guidelines</summary>
  <div>

## Built-in Metrics Best Practices

**Real-life analogy**: Following best practices is like maintaining your car's dashboard. You should check the right gauges (relevant metrics), check them regularly (appropriate collection), understand what they mean (interpretation), and take action when needed (alerting). Good practices ensure your dashboard is useful and reliable.

**Technical explanation**: Following best practices ensures you get the most value from built-in metrics. This includes choosing the right meters, configuring appropriate collection intervals, understanding metric attributes, and integrating with monitoring tools effectively.

**Key jargon explained**:
- **Relevant Meters**: Choose meters that matter for your app
- **Collection Interval**: How often metrics are collected
- **Attribute Understanding**: Know what each attribute means
- **Monitoring Integration**: Connect metrics to monitoring tools
- **Alert Configuration**: Set up meaningful alerts

### DO:
- **Use built-in metrics** for common monitoring scenarios
- **Choose relevant meters** for your application type
- **Understand metric attributes** for proper interpretation
- **Integrate with monitoring tools** like Prometheus and Grafana
- **Set up alerts** based on metric thresholds
- **Monitor metrics in development** to understand baseline behavior
- **Use dotnet-counters** for ad-hoc investigation
- **Document custom tags** if you enrich metrics

### DON'T:
- **Add too many meters** (performance impact)
- **Ignore metric attributes** (they provide important context)
- **Set collection intervals too frequent** (overhead)
- **Forget to monitor metrics** in production
- **Alert on every metric** (alert fatigue)
- **Assume built-in metrics are enough** (add custom metrics if needed)
- **Ignore metric cardinality** (too many tag combinations)
- **Use metrics for business logic** (they're for monitoring)

### Choosing Meters:
```csharp:title=ChoosingMeters.cs
// For web APIs:
builder.AddMeter("Microsoft.AspNetCore.Hosting");
builder.AddMeter("Microsoft.AspNetCore.Routing");

// For Blazor Server:
builder.AddMeter("Microsoft.AspNetCore.Components");
builder.AddMeter("Microsoft.AspNetCore.Components.Server.Circuits");

// For Blazor WebAssembly:
builder.AddMeter("Microsoft.AspNetCore.Components");

// For all ASP.NET Core apps:
builder.AddMeter("Microsoft.AspNetCore.Hosting");
```

### Understanding Attributes:
```csharp:title=Attributes.cs
// HTTP request duration attributes:
// - http.route: Which endpoint was called
// - http.request.method: GET, POST, etc.
// - http.response.status_code: 200, 404, 500, etc.
// - url.scheme: HTTP or HTTPS
// - error.type: What error occurred

// Use these attributes to:
// - Filter metrics by endpoint
// - Analyze performance by HTTP method
// - Track error rates by status code
// - Compare HTTP vs HTTPS performance
```

### Alert Examples:
```csharp:title=Alerts.cs
// Alert on high error rate
rate(http_server_requests_total{status_code=~"5.."}[5m]) > 0.05

// Alert on slow response time
histogram_quantile(0.95, rate(http_server_request_duration_bucket[5m])) > 1

// Alert on high active requests
http_server_active_requests > 1000

// Alert on circuit disconnects
rate(aspnetcore_components_circuit_connected[5m]) < 0
```

**How it works in practice**: Best practices ensure:
- **Effectiveness**: Metrics provide meaningful insights
- **Performance**: Minimal impact on app performance
- **Actionability**: Alerts trigger appropriate responses
- **Maintainability**: Metrics are well-understood and documented
- **Scalability**: Metrics scale with your infrastructure

Good practices make built-in metrics a powerful tool for monitoring ASP.NET Core applications.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core built-in metrics | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/log-mon/metrics/built-in?view=aspnetcore-10.0)