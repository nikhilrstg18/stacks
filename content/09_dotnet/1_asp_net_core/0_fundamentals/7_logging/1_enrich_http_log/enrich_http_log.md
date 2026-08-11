---
title: "Enrich HTTP Log"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/1_enrich_http_log"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>HTTP Log Enricher - Like adding custom notes to a visitor log</summary>
  <div>

## What is HTTP Log Enricher?

**Real-life analogy**: HTTP log enricher is like adding custom notes to a visitor log book. The basic log records who came in and what they did (HTTP logging), but an enricher adds extra context like "wearing a red shirt" or "came in through the north entrance." This extra information helps you understand more about each request.

**Technical explanation**: HTTP log enricher allows you to add custom contextual information to HTTP request logs by implementing the IHttpLogEnricher interface. Unlike general log enrichers that affect all logs, HTTP log enrichers specifically target incoming HTTP request logs and have access to the full HttpContext.

**Key jargon explained**:
- **IHttpLogEnricher**: Interface for adding custom data to HTTP logs
- **Enrichment**: Adding extra contextual information to logs
- **HttpContext**: Contains all information about the current HTTP request
- **IEnrichmentTagCollector**: Collector for adding custom tags to logs
- **Experimental Feature**: The interface is experimental and requires a warning suppression

```csharp:title=CustomHttpLogEnricher.cs
#pragma warning disable EXTEXP0013

using Microsoft.AspNetCore.Diagnostics.Logging;
using Microsoft.Extensions.Diagnostics.Enrichment;

public class CustomHttpLogEnricher : IHttpLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpContext httpContext)
    {
        collector.Add("request_method", httpContext.Request.Method);
        collector.Add("user_authenticated", httpContext.User?.Identity?.IsAuthenticated == true);
    }
}
```

**How it works in practice**: HTTP log enricher:
- **Custom Context**: Add application-specific information to logs
- **HttpContext Access**: Full access to request, response, user, and connection data
- **Automatic Execution**: Called automatically for each HTTP request
- **Multiple Enrichers**: Can register multiple enrichers that run in order
- **Experimental**: Currently experimental, requires warning suppression

**Important**: The IHttpLogEnricher interface is experimental and requires the EXTEXP0013 diagnostic ID suppression.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Installing the Package - Like adding a new tool to your toolbox</summary>
  <div>

## Installing the Package

**Real-life analogy**: Installing the package is like adding a new tool to your toolbox. Before you can use a specialized tool, you need to acquire it and add it to your collection. The NuGet package provides the tools you need to implement HTTP log enrichers.

**Technical explanation**: To use HTTP log enrichers, you need to install the Microsoft.AspNetCore.Diagnostics.Middleware NuGet package. This package contains the IHttpLogEnricher interface and related functionality.

**Key jargon explained**:
- **NuGet Package**: A package manager for .NET that provides libraries
- **Microsoft.AspNetCore.Diagnostics.Middleware**: The package containing HTTP log enricher functionality
- **PackageReference**: The XML element for adding packages in project files
- **dotnet add**: Command-line tool for adding NuGet packages

### Install with .NET CLI:
```bash:title=Command Line
dotnet add package Microsoft.AspNetCore.Diagnostics.Middleware
```

### Install with PackageReference:
```xml:title=.csproj
<PackageReference Include="Microsoft.AspNetCore.Diagnostics.Middleware"
                  Version="*" />
```

### Verify Installation:
```bash:title=Command Line
dotnet list package
```

**How it works in practice**: The installation process:
1. **Run Command**: Execute the dotnet add package command
2. **Download**: NuGet downloads the package to your project
3. **Update Project**: The package reference is added to your .csproj file
4. **Restore**: Dependencies are restored and made available
5. **Use**: You can now use IHttpLogEnricher in your code

Once installed, you can implement custom HTTP log enrichers to add contextual information to your HTTP logs.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Implementing IHttpLogEnricher - Like creating a custom note-taker</summary>
  <div>

## Implementing IHttpLogEnricher

**Real-life analogy**: Implementing IHttpLogEnricher is like creating a custom note-taker for your visitor log. You decide what extra information to record (like visitor's clothing color, time of day, or weather) and how to record it. Your custom note-taker automatically adds this information to every visitor log entry.

**Technical explanation**: To create a custom HTTP log enricher, implement the IHttpLogEnricher interface with a single Enrich method. This method receives an IEnrichmentTagCollector and HttpContext, allowing you to add custom tags based on request information.

**Key jargon explained**:
- **Enrich Method**: The method called for each HTTP request to add custom data
- **IEnrichmentTagCollector**: Interface for adding custom tags to logs
- **Add Method**: Method to add a key-value pair to the enrichment tags
- **HttpContext**: Contains request, response, user, and connection information
- **Experimental Warning**: The #pragma warning disable EXTEXP0013 directive

### Basic Implementation:
```csharp:title=CustomHttpLogEnricher.cs
#pragma warning disable EXTEXP0013

using Microsoft.AspNetCore.Diagnostics.Logging;
using Microsoft.Extensions.Diagnostics.Enrichment;

public class CustomHttpLogEnricher : IHttpLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpContext httpContext)
    {
        // Add request information
        collector.Add("request_method", httpContext.Request.Method);
        collector.Add("request_scheme", httpContext.Request.Scheme);
        collector.Add("request_path", httpContext.Request.Path);

        // Add response information
        collector.Add("response_status_code", httpContext.Response.StatusCode);

        // Add user information
        if (httpContext.User?.Identity?.IsAuthenticated == true)
        {
            collector.Add("user_authenticated", true);
            collector.Add("user_name", httpContext.User.Identity.Name);
        }
    }
}
```

### Adding Business Context:
```csharp:title=BusinessEnricher.cs
public class BusinessHttpLogEnricher : IHttpLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpContext httpContext)
    {
        // Add business-specific context
        var tenantId = httpContext.Request.Headers["X-Tenant-ID"].FirstOrDefault();
        if (!string.IsNullOrEmpty(tenantId))
        {
            collector.Add("tenant_id", tenantId);
        }

        // Add correlation ID if present
        var correlationId = httpContext.Request.Headers["X-Correlation-ID"].FirstOrDefault();
        if (!string.IsNullOrEmpty(correlationId))
        {
            collector.Add("correlation_id", correlationId);
        }
    }
}
```

### Adding Performance Metrics:
```csharp:title=PerformanceEnricher.cs
public class PerformanceHttpLogEnricher : IHttpLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpContext httpContext)
    {
        // Add performance-related information
        var startTime = httpContext.Items["RequestStartTime"] as DateTime?;
        if (startTime.HasValue)
        {
            var duration = DateTime.UtcNow - startTime.Value;
            collector.Add("request_duration_ms", duration.TotalMilliseconds);
        }
    }
}
```

**How it works in practice**: The implementation process:
1. **Create Class**: Create a class implementing IHttpLogEnricher
2. **Add Warning**: Include #pragma warning disable EXTEXP0013
3. **Implement Enrich**: Add the Enrich method with collector and HttpContext
4. **Add Tags**: Use collector.Add to add custom key-value pairs
5. **Access Context**: Use HttpContext to get request, response, and user information

The Enrich method is called during the HTTP response phase, after the response has been processed.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Registering the Enricher - Like hiring the note-taker</summary>
  <div>

## Registering the HTTP Log Enricher

**Real-life analogy**: Registering the enricher is like hiring your custom note-taker. You tell the building management (DI container) that you have a note-taker (enricher) and they should use them for every visitor (HTTP request). The management automatically calls your note-taker for each visitor.

**Technical explanation**: After implementing your IHttpLogEnricher, register it in the DI container using AddHttpLogEnricher<T>. This tells ASP.NET Core to call your enricher for each HTTP request. You also need to add redaction support and configure JSON console logging to see the enriched logs.

**Key jargon explained**:
- **AddHttpLogEnricher<T>: Method to register an HTTP log enricher
- **AddRedaction**: Method to add redaction support for sensitive data
- **JsonConsole**: Console logging that outputs structured JSON
- **DI Container**: The dependency injection container that manages services
- **Service Registration**: Adding your enricher to the container

### Registration in Program.cs:
```csharp:title=Program.cs
#pragma warning disable EXTEXP0013

using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics.Logging;

var builder = WebApplication.CreateBuilder(args);

// Register the custom enricher
builder.Services.AddHttpLogEnricher<CustomHttpLogEnricher>();

// Add redaction support
builder.Services.AddRedaction();

// Configure JSON console logging
builder.Logging.AddJsonConsole(op =>
{
    op.JsonWriterOptions = new JsonWriterOptions
    {
        Indented = true
    };
});

var app = builder.Build();

// Add HTTP logging middleware
app.UseHttpLogging();

app.MapGet("/", () => "Hello, World!");

await app.RunAsync();
```

### Registering Multiple Enrichers:
```csharp:title=MultipleEnrichers.cs
builder.Services.AddHttpLogEnricher<CustomHttpLogEnricher>();
builder.Services.AddHttpLogEnricher<BusinessHttpLogEnricher>();
builder.Services.AddHttpLogEnricher<PerformanceHttpLogEnricher>();

// Enrichers execute in registration order
```

### Complete Setup:
```csharp:title=CompleteSetup.cs
#pragma warning disable EXTEXP0013

var builder = WebApplication.CreateBuilder(args);

// 1. Register enrichers
builder.Services.AddHttpLogEnricher<CustomHttpLogEnricher>();
builder.Services.AddHttpLogEnricher<BusinessHttpLogEnricher>();

// 2. Add redaction support
builder.Services.AddRedaction();

// 3. Configure logging
builder.Logging.AddJsonConsole(op =>
{
    op.JsonWriterOptions = new JsonWriterOptions { Indented = true };
});

var app = builder.Build();

// 4. Add HTTP logging middleware
app.UseHttpLogging();

// 5. Your application code
app.MapGet("/", () => "Hello, World!");

await app.RunAsync();
```

**How it works in practice**: The registration process:
1. **Add Enricher**: Register your custom enricher with AddHttpLogEnricher
2. **Add Redaction**: Add redaction support for sensitive data handling
3. **Configure Logging**: Set up JSON console logging to see enriched data
4. **Add Middleware**: Add UseHttpLogging to enable HTTP logging
5. **Automatic Execution**: Enrichers are called automatically for each request

The enrichers execute in the order they were registered, and each can add its own custom tags to the logs.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Enriched Log Output - Like a detailed visitor log</summary>
  <div>

## Enriched Log Output

**Real-life analogy**: Enriched log output is like a detailed visitor log that includes not just basic information (name, time) but also custom notes (wearing red shirt, came in north entrance, carrying a backpack). This detailed information helps you understand more about each visitor and their visit.

**Technical explanation**: When HTTP log enrichers are registered and JSON console logging is configured, the log output includes the custom tags added by your enrichers. This provides richer context for each HTTP request beyond the standard HTTP logging information.

**Key jargon explained**:
- **Enriched Tags**: Custom key-value pairs added by enrichers
- **JSON Console Logging**: Structured logging that outputs JSON format
- **Structured Logs**: Logs in a structured format that's easy to parse
- **Custom Context**: Application-specific information added to logs
- **Log Output**: The actual log messages written to the console or file

### Enriched Log Example:
```json:title=Console Output
{
  "EventId": 1,
  "LogLevel": "Information",
  "Message": "Request",
  "request_method": "GET",
  "request_scheme": "https",
  "request_path": "/",
  "response_status_code": 200,
  "user_authenticated": false,
  "tenant_id": "tenant-123",
  "correlation_id": "abc-123-def"
}
```

### Standard vs Enriched:
```json:title=Comparison.cs
// Standard HTTP Logging:
{
  "Method": "GET",
  "Path": "/",
  "StatusCode": 200
}

// Enriched HTTP Logging:
{
  "Method": "GET",
  "Path": "/",
  "StatusCode": 200,
  "request_method": "GET",
  "request_scheme": "https",
  "request_path": "/",
  "response_status_code": 200,
  "user_authenticated": false,
  "tenant_id": "tenant-123",
  "correlation_id": "abc-123-def"
}
```

### Multiple Enrichers:
```json:title=MultipleEnrichers.cs
// With multiple enrichers, tags from all are included:
{
  "request_method": "GET",
  "request_path": "/",
  "response_status_code": 200,
  "user_authenticated": true,
  "user_name": "john.doe",
  "tenant_id": "tenant-123",
  "correlation_id": "abc-123-def",
  "request_duration_ms": 45.2
}
```

### Configuration for JSON Output:
```csharp:title=JsonConfig.cs
builder.Logging.AddJsonConsole(op =>
{
    op.JsonWriterOptions = new JsonWriterOptions
    {
        Indented = true  // Pretty-print JSON
    };
    
    op.IncludeScopes = true;
    op.TimestampFormat = "yyyy-MM-dd HH:mm:ss";
});
```

**How it works in practice**: Enriched log output provides:
- **Rich Context**: Custom application-specific information in logs
- **Structured Data**: JSON format is easy to parse and analyze
- **Business Intelligence**: Track tenant IDs, correlation IDs, and other business metrics
- **Debugging**: More information to troubleshoot issues
- **Monitoring**: Better understanding of request patterns and user behavior

The enriched logs combine standard HTTP information with your custom tags, providing a complete picture of each request.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HTTP Log Enricher vs General Log Enricher - Like specialized vs general tools</summary>
  <div>

## HTTP Log Enricher vs General Log Enricher

**Real-life analogy**: HTTP log enricher is like a specialized tool for visitor logs, while general log enricher is like a general note-taker for all types of logs. The specialized tool knows about visitors (HTTP requests) and can access visitor-specific information, while the general tool works with any type of log.

**Technical explanation**: HTTP log enrichers (IHttpLogEnricher) specifically target incoming HTTP request logs and have access to the full HttpContext. General log enrichers (ILogEnricher) affect all logs in the application but don't have HttpContext access.

**Key jargon explained**:
- **IHttpLogEnricher**: Specialized enricher for HTTP request logs
- **ILogEnricher**: General enricher for all application logs
- **HttpContext Access**: HTTP enrichers have full request/response context
- **Scope**: HTTP enrichers only affect HTTP logs, general enrichers affect all logs
- **Package Differences**: Different NuGet packages for each type

### HTTP Log Enricher:
```csharp:title=HttpEnricher.cs
// Package: Microsoft.AspNetCore.Diagnostics.Middleware
// Scope: Only HTTP request logs
// Context: Full HttpContext access
// Target: Incoming server-side requests

public class CustomHttpLogEnricher : IHttpLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpContext httpContext)
    {
        // Has access to request, response, user, connection
        collector.Add("request_method", httpContext.Request.Method);
        collector.Add("user_name", httpContext.User?.Identity?.Name);
    }
}
```

### General Log Enricher:
```csharp:title=GeneralEnricher.cs
// Package: Microsoft.Extensions.Telemetry.Abstractions
// Scope: All application logs
// Context: No HttpContext access
// Target: All log messages

public class CustomLogEnricher : ILogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector)
    {
        // No HttpContext access
        collector.Add("machine_name", Environment.MachineName);
        collector.Add("process_id", Environment.ProcessId);
    }
}
```

### Key Differences:
```csharp:title=Differences.cs
// HTTP Log Enricher:
// ✓ Only enriches HTTP request logs
// ✓ Has full HttpContext access
// ✓ Can access request, response, user, connection
// ✓ Requires Microsoft.AspNetCore.Diagnostics.Middleware
// ✓ Targets incoming server-side requests

// General Log Enricher:
// ✓ Enriches all application logs
// ✗ No HttpContext access
// ✓ Can access application-level information
// ✓ Requires Microsoft.Extensions.Telemetry.Abstractions
// ✓ Targets all log messages
```

### When to Use Each:
```csharp:title=Usage.cs
// Use IHttpLogEnricher when:
// - You need request-specific information
// - You want to enrich only HTTP logs
// - You need access to HttpContext
// - You're working with web applications

// Use ILogEnricher when:
// - You need to enrich all logs
// - You don't need HttpContext
// - You're working with console apps or background services
// - You want application-level context
```

**How it works in practice**: Choose the right enricher:
- **HTTP Enricher**: For web apps needing request-specific context
- **General Enricher**: For all apps needing application-wide context
- **Both**: Can use both types in the same application
- **Package Requirements**: Install the appropriate package for each type

HTTP log enrichers provide HttpContext-specific context that general enrichers cannot access.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Important Considerations - Like safety guidelines for note-taking</summary>
  <div>

## Important Considerations

**Real-life analogy**: Important considerations are like safety guidelines for note-taking. You need to know when to take notes (execution timing), what to record (data types), how to handle errors (exception handling), and whether the tool is experimental (warning suppression). Following guidelines ensures safe and effective note-taking.

**Technical explanation**: There are several important considerations when using HTTP log enrichers, including the experimental nature of the interface, execution timing, error handling, and data type handling.

**Key jargon explained**:
- **Experimental Feature**: The interface is experimental and may change
- **EXTEXP0013**: Diagnostic ID for the experimental feature warning
- **Execution Timing**: When the Enrich method is called (response phase)
- **Exception Handling**: How exceptions in enrichers are handled
- **Multiple Enrichers**: How multiple enrichers interact

### Experimental Feature Warning:
```csharp:title=Experimental.cs
// IHttpLogEnricher is experimental
// Requires warning suppression:
#pragma warning disable EXTEXP0013

public class CustomHttpLogEnricher : IHttpLogEnricher
{
    // Implementation
}
```

### Execution Timing:
```csharp:title=Timing.cs
// The Enrich method is called:
// - During the HTTP response phase
// - After the response has been processed
// - Before the response is sent to the client
// - For each HTTP request processed by the pipeline

// This means:
// - Response status code is available
// - Response headers are available
// - Request information is still available
// - User context is available
```

### Exception Handling:
```csharp:title=Exceptions.cs
// If an enricher throws an exception:
// - The exception is logged
// - Execution continues with remaining enrichers
// - The HTTP request is not affected
// - Other enrichers still run

// Best practice:
public class SafeHttpLogEnricher : IHttpLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpContext httpContext)
    {
        try
        {
            // Enrichment logic
            collector.Add("custom_tag", "value");
        }
        catch (Exception ex)
        {
            // Log the error if needed
            // Don't rethrow - let the framework handle it
        }
    }
}
```

### Multiple Enrichers:
```csharp:title=Multiple.cs
// Multiple enrichers can be registered
// They execute in registration order
// Each can add its own tags
// Tags from all enrichers are combined

builder.Services.AddHttpLogEnricher<Enricher1>();
builder.Services.AddHttpLogEnricher<Enricher2>();
builder.Services.AddHttpLogEnricher<Enricher3>();

// Execution order: Enricher1 → Enricher2 → Enricher3
```

### Data Type Handling:
```csharp:title=DataTypes.cs
// You can send any type to the Add method
// The framework handles parsing and serialization

collector.Add("boolean_value", true);
collector.Add("number_value", 42);
collector.Add("string_value", "hello");
collector.Add("object_value", new { Name = "John" });
collector.Add("date_value", DateTime.UtcNow);

// All types are parsed and serialized internally
```

### Requirements:
```csharp:title=Requirements.cs
// Required components:
// ✓ Microsoft.AspNetCore.Diagnostics.Middleware package
// ✓ AddHttpLogEnricher<T>() registration
// ✓ AddRedaction() for sensitive data handling
// ✓ UseHttpLogging() middleware in the pipeline
// ✓ JSON console logging to see enriched output

// Without these, enrichers won't work or won't show output
```

**How it works in practice**: Important considerations:
- **Experimental**: The feature is experimental and may change in future versions
- **Warning Suppression**: Must suppress EXTEXP0013 warning
- **Timing**: Enrich happens during response phase
- **Error Handling**: Exceptions don't break the request
- **Order**: Multiple enrichers execute in registration order
- **Dependencies**: Requires proper package and configuration

Always follow these considerations to ensure safe and effective use of HTTP log enrichers.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following note-taking guidelines</summary>
  <div>

## HTTP Log Enricher Best Practices

**Real-life analogy**: Following best practices is like following note-taking guidelines. You should record relevant information (useful tags), avoid recording sensitive data (privacy), keep notes organized (clear tag names), and use the right tool for the job (HTTP vs general enricher). Good practices make your notes useful and safe.

**Technical explanation**: Following best practices ensures your HTTP log enrichers are effective, safe, and maintainable. This includes choosing appropriate tags, handling errors gracefully, avoiding sensitive data, and using enrichers for the right scenarios.

**Key jargon explained**:
- **Relevant Tags**: Tags that provide useful contextual information
- **Privacy Protection**: Avoiding logging sensitive or PII data
- **Clear Naming**: Using descriptive tag names for clarity
- **Error Handling**: Gracefully handling exceptions in enrichers
- **Performance**: Minimizing performance impact of enrichment

### DO:
- **Add relevant contextual information** to logs
- **Use clear, descriptive tag names** (snake_case or camelCase)
- **Handle exceptions gracefully** in your enrichers
- **Add redaction support** with AddRedaction()
- **Use JSON console logging** to see enriched output
- **Register enrichers in logical order**
- **Consider performance impact** of enrichment logic
- **Document custom tags** for team understanding

### DON'T:
- **Log sensitive data** like passwords or tokens
- **Add too many tags** that clutter the logs
- **Throw exceptions** that break the request pipeline
- **Forget the experimental warning** suppression
- **Use enrichers for business logic** (they're for logging only)
- **Assume HttpContext is null** (it's always provided)
- **Ignore performance** of complex enrichment logic
- **Mix concerns** - keep enrichers focused on logging

### Good Example:
```csharp:title=Good.cs
public class GoodHttpLogEnricher : IHttpLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpContext httpContext)
    {
        try
        {
            // Add useful, non-sensitive information
            collector.Add("request_method", httpContext.Request.Method);
            collector.Add("tenant_id", httpContext.Request.Headers["X-Tenant-ID"].FirstOrDefault());
            
            // Don't log sensitive headers
            // collector.Add("authorization", httpContext.Request.Headers["Authorization"]); // BAD
        }
        catch (Exception)
        {
            // Don't rethrow - let framework handle it
        }
    }
}
```

### Bad Example:
```csharp:title=Bad.cs
public class BadHttpLogEnricher : IHttpLogEnricher
{
    public void Enrich(IEnrichmentTagCollector collector, HttpContext httpContext)
    {
        // Logging sensitive data
        collector.Add("authorization", httpContext.Request.Headers["Authorization"]);
        collector.Add("cookie", httpContext.Request.Headers["Cookie"]);
        
        // Too many tags
        collector.Add("tag1", "value1");
        collector.Add("tag2", "value2");
        // ... 50 more tags
        
        // Complex logic that impacts performance
        var data = ExpensiveDatabaseCall();
        collector.Add("expensive_data", data);
    }
}
```

### Tag Naming Conventions:
```csharp:title=Naming.cs
// Good naming:
collector.Add("request_method", "GET");
collector.Add("tenant_id", "123");
collector.Add("user_authenticated", true);

// Avoid:
collector.Add("rm", "GET"); // Too abbreviated
collector.Add("tid", "123"); // Unclear
collector.Add("auth", true); // Ambiguous
```

### Performance Considerations:
```csharp:title=Performance.cs
// Good: Simple, fast enrichment
collector.Add("request_method", httpContext.Request.Method);

// Bad: Expensive operations
var expensiveData = await ExpensiveService.GetDataAsync();
collector.Add("expensive_data", expensiveData);

// If you need expensive data, consider caching
// or using a background service instead
```

**How it works in practice**: Best practices ensure:
- **Usefulness**: Logs contain relevant, actionable information
- **Security**: Sensitive data is protected
- **Performance**: Enrichment doesn't significantly impact performance
- **Maintainability**: Code is clear and well-documented
- **Reliability**: Errors don't break the application

Good practices make your HTTP log enrichers effective, safe, and maintainable.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Enrich HTTP request logs in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/http-logging/http-log-enricher?view=aspnetcore-10.0)