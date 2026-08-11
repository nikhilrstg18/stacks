---
title: "Logging"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Logging Overview - Application Monitoring</summary>
  <div>

## Logging in ASP.NET Core

**Real-life analogy**: Logging is like having a comprehensive security camera and activity log system for a facility. Every action, event, and anomaly is recorded with timestamps, context, and severity levels. This enables monitoring operations, diagnosing problems, investigating incidents, and understanding system behavior. ASP.NET Core logging provides the same comprehensive monitoring capability - recording application events with structured data for monitoring, debugging, and operational insights.

**Technical explanation**: ASP.NET Core supports high-performance, structured logging via the ILogger API to monitor app behavior and diagnose problems. Logs are written to different destinations by configuring logging providers. Built-in providers include Console, Debug, EventSource, and EventLog (Windows). Multiple providers can be enabled simultaneously. The ILogger<T> interface provides type-safe logging with automatic category naming based on the type. Log levels (Trace, Debug, Information, Warning, Error, Critical) indicate severity and enable filtering.

**Key jargon explained**:
- **Logging Providers**: Components that write logs to specific destinations
- **ILogger<T>**: Type-safe logging interface with automatic category naming
- **Log Levels**: Severity indicators (Trace, Debug, Information, Warning, Error, Critical)
- **Log Category**: String associated with each log for identification and filtering
- **Structured Logging**: Logs with structured data for analysis

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Default logging providers (Console, Debug, EventSource, EventLog)
// are added automatically by WebApplication.CreateBuilder

// Override default providers if needed
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

builder.Services.AddRazorPages();

var app = builder.Build();
```

```csharp:title=Usage.cs
public class MyService
{
    private readonly ILogger<MyService> _logger;

    public MyService(ILogger<MyService> logger)
    {
        _logger = logger;
    }

    public void DoWork()
    {
        _logger.LogInformation("Starting work at {Time}", DateTime.UtcNow);
        
        try
        {
            // Perform work
            _logger.LogInformation("Work completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Work failed with exception");
            throw;
        }
    }
}
```

**How it works in practice**: WebApplication.CreateBuilder adds default logging providers automatically. ILogger<T> is injected via DI, with the type name becoming the log category. Log methods (LogInformation, LogWarning, LogError) accept a message template and parameters for structured logging. Log levels enable filtering - only logs at or above the configured level are written. Multiple providers can be enabled, writing logs to multiple destinations simultaneously.

**Key takeaways for interviews**:
- ILogger<T> provides type-safe logging with automatic category naming
- Log levels indicate severity and enable filtering
- Multiple logging providers can write to different destinations
- Structured logging with message templates and parameters
- Default providers include Console, Debug, EventSource, EventLog

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Log Levels - Severity Indicators</summary>
  <div>

## Log Levels

**Real-life analogy**: Log levels are like classification tags for facility incidents. You might tag incidents as "Minor" (routine activities), "Moderate" (unusual but not concerning), "Major" (requires attention), or "Critical" (emergency response required). This classification enables filtering and prioritization - you might ignore minor incidents but immediately respond to critical ones. Log levels provide the same classification for application events, enabling filtering based on severity.

**Technical explanation**: Log levels indicate the severity of logged events and enable filtering. ASP.NET Core defines six log levels: Trace (most verbose), Debug, Information, Warning, Error, and Critical (most severe). Each level has a numeric value for comparison. Logging configuration can specify a minimum log level - only logs at or above that level are written. This enables different verbosity in different environments (detailed in development, filtered in production).

**Key jargon explained**:
- **Trace**: Most verbose level for detailed diagnostics
- **Debug**: Detailed information useful for debugging
- **Information**: General informational messages
- **Warning**: Abnormal or unexpected events
- **Error**: Error events indicating failures
- **Critical**: Critical failures requiring immediate attention

```csharp:title=LogLevels.cs
public class MyService
{
    private readonly ILogger<MyService> _logger;

    public MyService(ILogger<MyService> logger)
    {
        _logger = logger;
    }

    public void ProcessData()
    {
        // Trace - most verbose, detailed diagnostics
        _logger.LogTrace("Processing started with ID {Id}", Guid.NewGuid());
        
        // Debug - detailed debugging information
        _logger.LogDebug("Data size: {Size} bytes", data.Length);
        
        // Information - general informational messages
        _logger.LogInformation("Processing data item {Item}", itemId);
        
        // Warning - abnormal but not error
        _logger.LogWarning("Cache miss for item {Item}", itemId);
        
        // Error - error events
        try
        {
            ProcessItem(itemId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process item {Item}", itemId);
        }
        
        // Critical - critical failures
        if (criticalFailure)
        {
            _logger.LogCritical("System failure, cannot continue");
        }
    }
}
```

```json:title=appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  }
}
```

```json:title=appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information"
    }
  }
}
```

**How it works in practice**: Log levels enable filtering based on severity. Configuration specifies minimum log levels per category. For example, Default might be Information, while Microsoft.AspNetCore might be Warning to reduce framework noise. Development typically uses lower minimum levels (Debug) for detailed diagnostics, while production uses higher levels (Warning) to reduce log volume. This enables appropriate verbosity per environment without code changes.

**Key takeaways for interviews**:
- Six log levels: Trace, Debug, Information, Warning, Error, Critical
- Log levels enable filtering based on severity
- Configuration specifies minimum log levels per category
- Development typically uses more verbose levels
- Production typically uses less verbose levels to reduce volume

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Logging Providers - Destination Configuration</summary>
  <div>

## Logging Providers

**Real-life analogy**: Logging providers are like different storage systems for facility logs. You might store logs in a local file cabinet (Console), a secure server (Debug), an event system (EventSource), or a cloud service (Application Insights). Each storage system has different characteristics - local access, security, searchability, retention policies. Logging providers provide the same flexibility - writing logs to different destinations based on operational needs.

**Technical explanation**: Logging providers write log messages to specific destinations. Built-in providers include Console (displays logs in console), Debug (writes to Visual Studio Debug output), EventSource (writes to Event Tracing for Windows), and EventLog (writes to Windows Event Log). Third-party providers include Application Insights, Serilog, NLog, and others. Multiple providers can be enabled simultaneously, writing logs to all configured destinations. ClearProviders removes all providers, enabling custom configuration.

**Key jargon explained**:
- **Console Provider**: Displays logs in console output
- **Debug Provider**: Writes to Visual Studio Debug output
- **EventSource Provider**: Writes to Event Tracing for Windows
- **EventLog Provider**: Writes to Windows Event Log
- **Third-Party Providers**: Application Insights, Serilog, NLog, etc.

```csharp:title=Providers.cs
var builder = WebApplication.CreateBuilder(args);

// Default providers (Console, Debug, EventSource, EventLog) are added automatically

// Override default providers
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add third-party provider (e.g., Application Insights)
builder.Logging.AddApplicationInsights(
    instrumentationKey, 
    options => options.ConnectionString = connectionString);

// Add Serilog
builder.Logging.AddSerilog(loggerConfiguration: config, 
                         writeToProviders: true);
```

```csharp:title=ConditionalProviders.cs
var builder = WebApplication.CreateBuilder(args);

// Environment-specific providers
if (builder.Environment.IsDevelopment())
{
    builder.Logging.AddConsole();
    builder.Logging.AddDebug();
}
else
{
    builder.Logging.AddApplicationInsights(instrumentationKey);
    builder.Logging.AddAzureWebAppDiagnostics();
}
```

**How it works in practice**: Logging providers are configured during application startup. WebApplication.CreateBuilder adds default providers automatically. ClearProviders removes all providers, enabling custom configuration. AddConsole, AddDebug, and other extension methods add specific providers. Third-party providers have their own extension methods. Multiple providers can be enabled, writing logs to all destinations. Environment-specific configuration enables different providers for development versus production.

**Key takeaways for interviews**:
- Logging providers write logs to specific destinations
- Built-in providers: Console, Debug, EventSource, EventLog
- Third-party providers: Application Insights, Serilog, NLog
- Multiple providers can be enabled simultaneously
- ClearProviders removes all providers for custom configuration

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

**Real-life analogy**: Interview preparation for logging concepts is like understanding comprehensive monitoring systems. You need to understand how to record events, classify severity, route to different destinations, filter based on importance, and analyze data to understand system behavior and diagnose issues.

**Common interview questions**:
1. **What is logging and why is it important?**
   - Records application events for monitoring and diagnostics
   - Enables understanding system behavior and troubleshooting
   - Provides operational insights and audit trails
   - Supports debugging and incident investigation

2. **How do you use ILogger in ASP.NET Core?**
   - Inject ILogger<T> via dependency injection
   - Type name becomes the log category automatically
   - Use LogInformation, LogWarning, LogError methods
   - Message templates with parameters for structured logging

3. **What are log levels and how are they used?**
   - Six levels: Trace, Debug, Information, Warning, Error, Critical
   - Indicate severity of logged events
   - Enable filtering based on minimum log level
   - Configuration specifies minimum levels per category

4. **What are logging providers and how do they work?**
   - Write log messages to specific destinations
   - Built-in providers: Console, Debug, EventSource, EventLog
   - Third-party providers: Application Insights, Serilog, NLog
   - Multiple providers can be enabled simultaneously

5. **How do you configure logging in different environments?**
   - appsettings.{Environment}.json for environment-specific configuration
   - Development typically uses more verbose levels (Debug)
   - Production typically uses less verbose levels (Warning)
   - Different providers per environment (Console vs Application Insights)

**Key interview concepts**:
- **Structured Logging**: Message templates with parameters
- **Log Categories**: Automatic naming based on type
- **Log Levels**: Severity indicators for filtering
- **Logging Providers**: Destination configuration
- **Environment-Specific Configuration**: Different settings per environment

**How to approach interview questions**:
- Start with clear definition of logging purpose and benefits
- Explain ILogger<T> injection and automatic category naming
- Discuss log levels and filtering configuration
- Address logging providers and destination configuration
- Mention environment-specific configuration for different needs

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Logging in .NET and ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/logging/?view=aspnetcore-10.0)