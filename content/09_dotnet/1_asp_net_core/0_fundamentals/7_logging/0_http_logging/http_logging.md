---
title: "HTTP Logging"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/0_http_logging"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>HTTP Logging Overview - Request/Response Logging</summary>
  <div>

## HTTP Logging in ASP.NET Core

**Real-life analogy**: HTTP logging is like having a security camera system that records all visitors and their interactions. It captures who arrived (request), what they did (processing), and how they left (response). This comprehensive recording enables security monitoring, troubleshooting, and operational insights. HTTP logging provides the same capability for web applications - recording all HTTP requests and responses for monitoring, debugging, and auditing.

**Technical explanation**: HTTP logging is middleware that logs information about incoming HTTP requests and HTTP responses. It logs HTTP request information, common properties, headers, body, and HTTP response information. HTTP logging can log all requests/responses or only those meeting certain criteria. It allows selecting which parts to log and redacting sensitive information. AddHttpLogging registers the middleware, UseHttpLogging adds it to the pipeline. HttpLoggingOptions configures what to log, including LoggingFields, RequestHeaders, ResponseHeaders, and body limits.

**Key jargon explained**:
- **HTTP Logging**: Middleware for logging HTTP requests and responses
- **LoggingFields**: Enum flag for what parts to log
- **RequestHeaders/ResponseHeaders**: Specific headers to log
- **Body Logging**: Logging request/response body content
- **Redaction**: Hiding sensitive information from logs

```csharp:title=BasicSetup.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });

var app = builder.Build();

app.UseHttpLogging();

app.MapGet("/", () => "Hello World!");

app.Run();
```

```csharp:title=Configuration.cs
builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.ResponseHeaders.Add("MyResponseHeader");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
    logging.CombineLogs = true;
});
```

```json:title=appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware": "Information"
    }
  }
}
```

**How it works in practice**: HTTP logging middleware intercepts requests and responses, logging configured information. By default, it logs common properties like path, status code, and headers. HttpLoggingOptions configures what to log via LoggingFields enum flag. RequestHeaders and ResponseHeaders specify which headers to log (others are redacted). Body logging limits prevent logging large payloads. CombineLogs merges request and response into a single log entry. Middleware position in the pipeline determines what requests are logged.

**Key takeaways for interviews**:
- HTTP logging middleware logs requests and responses
- AddHttpLogging registers, UseHttpLogging adds to pipeline
- HttpLoggingOptions configures what to log
- Can redact sensitive information
- Performance impact when logging bodies

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HTTP Logging Configuration - Customization</summary>
  <div>

## HTTP Logging Options

**Real-life analogy**: HTTP logging configuration is like customizing what the security camera records. You might choose to record only entry/exit times, or also record visitor details, or even record specific activities. HTTP logging configuration provides the same customization - choosing what aspects of requests and responses to log, which headers to include, and how much detail to capture.

**Technical explanation**: HttpLoggingOptions configures HTTP logging behavior. LoggingFields is an enum flag specifying what parts to log (RequestPropertiesAndHeaders, ResponsePropertiesAndHeaders, All). RequestHeaders and ResponseHeaders are sets of specific headers to log (others are redacted). RequestBodyLogLimit and ResponseBodyLogLimit control body logging size. CombineLogs merges request and response into single entry. MediaTypeOptions configures media type logging. These options enable fine-grained control over logging detail and performance impact.

**Key jargon explained**:
- **LoggingFields**: Enum flag for what parts to log
- **RequestHeaders/ResponseHeaders**: Specific headers to log
- **Body Log Limits**: Maximum body size to log
- **CombineLogs**: Merge request/response into single entry
- **MediaTypeOptions**: Media type logging configuration

```csharp:title=Options.cs
builder.Services.AddHttpLogging(logging =>
{
    // What to log
    logging.LoggingFields = HttpLoggingFields.All;
    
    // Specific headers to log (others redacted)
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.ResponseHeaders.Add("MyResponseHeader");
    
    // Body logging limits
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
    
    // Merge request/response
    logging.CombineLogs = true;
});
```

**How it works in practice**: LoggingFields defaults to RequestPropertiesAndHeaders and ResponsePropertiesAndHeaders. Setting it to All includes body logging. RequestHeaders and ResponseHeaders specify which headers to log - headers not in these sets are redacted as [Redacted]. Body log limits prevent logging large payloads that could impact performance. CombineLogs reduces log volume by merging request and response into a single entry. Configuration balances logging detail with performance impact.

**Key takeaways for interviews**:
- LoggingFields controls what parts to log
- RequestHeaders/ResponseHeaders specify headers to log
- Headers not in sets are redacted
- Body log limits prevent large payload logging
- CombineLogs reduces log volume

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

**Real-life analogy**: Interview preparation for HTTP logging concepts is like understanding comprehensive monitoring systems. You need to understand how to configure monitoring, what to record, how to protect sensitive information, and how to balance detail with performance.

**Common interview questions**:
1. **What is HTTP logging and when should it be used?**
   - Middleware for logging HTTP requests and responses
   - Logs request information, headers, body, and response information
   - Used for monitoring, debugging, and auditing
   - Can log all requests or specific criteria
   - Consider performance impact when logging bodies

2. **How do you enable HTTP logging?**
   - AddHttpLogging registers the middleware service
   - UseHttpLogging adds middleware to pipeline
   - Configure logging level for HttpLoggingMiddleware
   - HttpLoggingOptions configures what to log
   - Middleware position determines what requests are logged

3. **What are the key HTTP logging options?**
   - LoggingFields: what parts to log (enum flag)
   - RequestHeaders/ResponseHeaders: specific headers to log
   - RequestBodyLogLimit/ResponseBodyLogLimit: body size limits
   - CombineLogs: merge request/response into single entry
   - MediaTypeOptions: media type logging configuration

4. **How does redaction work in HTTP logging?**
   - Headers not in RequestHeaders/ResponseHeaders are redacted
   - Redacted headers show as [Redacted] in logs
   - Prevents logging sensitive information
   - Configure which headers to include
   - Avoid logging PII and sensitive data

5. **What are the performance considerations for HTTP logging?**
   - Logging bodies can significantly impact performance
   - Body log limits prevent logging large payloads
   - Consider performance impact when selecting fields
   - Test performance impact of selected logging properties
   - Balance logging detail with performance

**Key interview concepts**:
- **Comprehensive Logging**: Requests, headers, bodies, responses
- **Configuration Options**: Fine-grained control over what to log
- **Redaction**: Hiding sensitive information
- **Performance Impact**: Body logging can reduce performance
- **Pipeline Position**: Determines what requests are logged

**How to approach interview questions**:
- Start with clear definition of HTTP logging purpose
- Explain AddHttpLogging and UseHttpLogging registration
- Discuss HttpLoggingOptions configuration options
- Address redaction for sensitive information
- Mention performance considerations and body logging impact

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [HTTP logging in .NET and ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/http-logging/?view=aspnetcore-10.0)