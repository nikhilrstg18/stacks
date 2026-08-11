---
title: "HTTP Logging"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/0_http_logging"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>HTTP Logging - Like a security camera recording visitors</summary>
  <div>

## What is HTTP Logging?

**Real-life analogy**: HTTP logging is like having a security camera at the entrance of a building. The camera records everyone who enters (HTTP requests) and everyone who leaves (HTTP responses). You can see who came in, what they asked for, and what they received. This helps you understand what's happening and investigate if something goes wrong.

**Technical explanation**: HTTP logging is a middleware that logs information about incoming HTTP requests and HTTP responses. It can log request information, common properties, headers, body, and response information. You can configure what gets logged, filter which requests to log, and redact sensitive information.

**Key jargon explained**:
- **HTTP Logging Middleware**: Middleware that automatically logs HTTP requests and responses
- **Request Information**: Details about the incoming HTTP request (method, path, headers, body)
- **Response Information**: Details about the HTTP response (status code, headers, body)
- **Redaction**: Hiding sensitive information like passwords or tokens from logs
- **Performance Impact**: Logging can slow down your app, especially when logging bodies

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(o => { });

var app = builder.Build();

app.UseHttpLogging();

app.MapGet("/", () => "Hello World!");

app.Run();
```

**How it works in practice**: HTTP logging:
- **Automatic Logging**: Logs every request and response without custom code
- **Configurable**: Choose what information to log
- **Filterable**: Log only certain requests based on criteria
- **Secure**: Redact sensitive information to protect privacy
- **Performance**: Consider performance impact when logging bodies

**Important**: HTTP logging can reduce app performance, especially when logging request and response bodies. Test the performance impact of your logging configuration.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Enabling HTTP Logging - Like turning on the security camera</summary>
  <div>

## Enabling HTTP Logging

**Real-life analogy**: Enabling HTTP logging is like turning on a security camera. You need to install the camera (add the service), position it correctly (add the middleware), and make sure it's recording (configure logging level). Once it's on, it automatically records everything that happens.

**Technical explanation**: HTTP logging is enabled by calling AddHttpLogging to register the service and UseHttpLogging to add the middleware to the pipeline. You also need to configure the logging level to see the HTTP logs in your output.

**Key jargon explained**:
- **AddHttpLogging**: Method to register the HTTP logging service
- **UseHttpLogging**: Method to add the HTTP logging middleware to the pipeline
- **Logging Level**: The severity of logs that are displayed (Information, Warning, Error)
- **Middleware Pipeline**: The sequence of middleware that processes requests
- **Service Registration**: Adding a service to the dependency injection container

### Basic Setup:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register the HTTP logging service
builder.Services.AddHttpLogging(o => { });

var app = builder.Build();

// Add the HTTP logging middleware
app.UseHttpLogging();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Configure Logging Level:
```json:title=appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware": "Information"
    }
  }
}
```

### Middleware Order:
```csharp:title=Order.cs
var app = builder.Build();

// HTTP logging comes after other middleware
app.UseStaticFiles();
app.UseHttpLogging(); // Logs requests after static files
app.UseRouting();
```

**How it works in practice**: The setup process:
1. **Register Service**: AddHttpLogging registers the logging service
2. **Add Middleware**: UseHttpLogging adds it to the pipeline
3. **Configure Level**: Set logging level to Information to see logs
4. **Position Correctly**: Place middleware where you want logging to start
5. **View Logs**: Check console or log output for HTTP logs

The middleware logs each request and response as a pair of messages showing all the logged information.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Default Logging Output - Like a visitor log book</summary>
  <div>

## Default Logging Output

**Real-life analogy**: Default logging output is like a visitor log book at a building entrance. Each entry shows who came in (request), what they wanted (path, method), and what they received (response status, content type). The log book provides a record of all activity for review and investigation.

**Technical explanation**: With default configuration, HTTP logging logs common properties like path, status code, and headers for requests and responses. The output shows request information followed by response information, with sensitive headers automatically redacted.

**Key jargon explained**:
- **Request Log**: Information about the incoming HTTP request
- **Response Log**: Information about the HTTP response
- **Redacted**: Sensitive information hidden from logs
- **Common Properties**: Standard HTTP information like method, path, status code
- **Headers**: HTTP headers containing metadata about the request or response

### Default Output Example:
```output:title=Console Output
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[1]
      Request:
      Protocol: HTTP/2
      Method: GET
      Scheme: https
      PathBase:
      Path: /
      Accept: text/html,application/xhtml+xml,application/xml;q=0.9
      Host: localhost:52941
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
      Accept-Encoding: gzip, deflate, br
      Accept-Language: en-US,en;q=0.9
      Upgrade-Insecure-Requests: [Redacted]
      sec-ch-ua: [Redacted]
      sec-ch-ua-mobile: [Redacted]

info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[2]
      Response:
      StatusCode: 200
      Content-Type: text/plain; charset=utf-8
      Date: Tue, 24 Oct 2023 02:03:53 GMT
      Server: Kestrel
```

### What's Logged by Default:
```csharp:title=DefaultFields.cs
// Request Information:
// - Protocol (HTTP/1.1, HTTP/2)
// - Method (GET, POST, etc.)
// - Scheme (http, https)
// - PathBase
// - Path
// - Headers (some redacted)

// Response Information:
// - StatusCode (200, 404, 500, etc.)
// - Headers (Content-Type, Date, Server, etc.)
```

### Redacted Headers:
```csharp:title=Redacted.cs
// Headers that are redacted by default:
// - Authorization
// - Cookie
// - Set-Cookie
// - Upgrade-Insecure-Requests
// - sec-ch-ua
// - sec-ch-ua-mobile
// - sec-ch-ua-platform
// - sec-fetch-site
// - sec-fetch-mode
// - sec-fetch-user
// - sec-fetch-dest
```

**How it works in practice**: Default logging provides:
- **Automatic Redaction**: Sensitive headers are automatically hidden
- **Request/Response Pairs**: Each request is logged with its corresponding response
- **Standard Information**: Common HTTP properties are logged
- **Security**: PII and sensitive data are protected
- **Investigation**: Logs help debug issues and understand traffic

The default configuration provides useful information while protecting sensitive data.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HTTP Logging Options - Like customizing the security camera</summary>
  <div>

## HTTP Logging Options

**Real-life analogy**: HTTP logging options are like customizing a security camera. You can choose what to record (which fields), how much detail to capture (body size limits), which areas to focus on (specific headers), and whether to combine footage (combine logs). This lets you tailor logging to your specific needs.

**Technical explanation**: You can configure HTTP logging options using HttpLoggingOptions. This lets you control which fields are logged, which headers are included, body size limits, media type handling, and whether to combine request and response logs.

**Key jargon explained**:
- **HttpLoggingOptions**: Configuration options for HTTP logging
- **LoggingFields**: Enum flag that controls which parts to log
- **RequestHeaders/ResponseHeaders**: Specific headers to log
- **RequestBodyLogLimit/ResponseBodyLogLimit**: Maximum body size to log
- **MediaTypeOptions**: How to handle different content types
- **CombineLogs**: Whether to combine request and response in one log

### Configuring Options:
```csharp:title=Program.cs
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    // Log all fields
    logging.LoggingFields = HttpLoggingFields.All;
    
    // Add specific headers to log
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.ResponseHeaders.Add("MyResponseHeader");
    
    // Handle JavaScript as text
    logging.MediaTypeOptions.AddText("application/javascript");
    
    // Limit body size to 4KB
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
    
    // Combine request and response in one log
    logging.CombineLogs = true;
});

var app = builder.Build();

app.UseHttpLogging();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### LoggingFields Options:
```csharp:title=LoggingFields.cs
// Available LoggingFields options:
// - None: Don't log anything
// - RequestProperties: Log request properties (method, path, etc.)
// - RequestHeaders: Log request headers
// - RequestBody: Log request body
// - ResponseProperties: Log response properties (status code, etc.)
// - ResponseHeaders: Log response headers
// - ResponseBody: Log response body
// - All: Log everything
// - RequestPropertiesAndHeaders (default)
// - ResponsePropertiesAndHeaders (default)
```

### Header Configuration:
```csharp:title=Headers.cs
// Add specific headers to log
logging.RequestHeaders.Add("User-Agent");
logging.RequestHeaders.Add("Referer");
logging.ResponseHeaders.Add("Content-Type");

// If a header is not in the list, it shows as [Redacted]
```

### Body Size Limits:
```csharp:title=BodyLimits.cs
// Limit body size to prevent large logs
logging.RequestBodyLogLimit = 4096;  // 4KB
logging.ResponseBodyLogLimit = 4096; // 4KB

// Set to 0 to disable body logging
logging.RequestBodyLogLimit = 0;
```

**How it works in practice**: Options configuration provides:
- **Flexibility**: Customize what gets logged
- **Performance**: Limit body size to reduce performance impact
- **Security**: Control which headers are logged
- **Convenience**: Combine logs for easier reading
- **Control**: Fine-tune logging to your specific needs

Configure options based on what information you need and the performance impact you can accept.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Logging Request and Response Bodies - Like recording conversations</summary>
  <div>

## Logging Request and Response Bodies

**Real-life analogy**: Logging bodies is like recording the actual conversation, not just who spoke. Instead of just logging "John spoke to Mary," you log the full conversation "John said: 'Hello Mary, how are you?' Mary said: 'I'm doing well, thanks!'" This provides much more detail but takes more space and time.

**Technical explanation**: You can configure HTTP logging to log request and response bodies. This provides detailed information about what data was sent and received, but can significantly impact performance due to the overhead of reading and logging body content.

**Key jargon explained**:
- **Request Body**: The data sent in the HTTP request (form data, JSON, etc.)
- **Response Body**: The data sent in the HTTP response (HTML, JSON, etc.)
- **Body Size Limit**: Maximum amount of body data to log
- **MediaTypeOptions**: How to handle different content types (text, binary, etc.)
- **Performance Overhead**: The performance cost of logging bodies

### Enable Body Logging:
```csharp:title=Program.cs
builder.Services.AddHttpLogging(logging =>
{
    // Enable body logging
    logging.LoggingFields = HttpLoggingFields.RequestBody | 
                           HttpLoggingFields.ResponseBody;
    
    // Set body size limits
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
    
    // Configure media types
    logging.MediaTypeOptions.AddText("application/json");
    logging.MediaTypeOptions.AddText("text/html");
});
```

### Body Logging Output:
```output:title=Console Output
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[1]
      Request:
      Method: POST
      Path: /api/users
      Body: {"name":"John","email":"john@example.com"}

info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[2]
      Response:
      StatusCode: 200
      Body: {"id":123,"name":"John","email":"john@example.com"}
```

### Media Type Handling:
```csharp:title=MediaTypes.cs
// Add specific media types to log as text
logging.MediaTypeOptions.AddText("application/json");
logging.MediaTypeOptions.AddText("text/html");
logging.MediaTypeOptions.AddText("text/plain");

// Binary media types are logged as [Binary Data]
// If not configured, bodies may not be logged
```

### Performance Considerations:
```csharp:title=Performance.cs
// Body logging performance impact:
// - Reading body data takes time
// - Large bodies increase log size
// - Consider using in development only
// - Test performance impact in production

// Recommendation:
// - Use body logging in development for debugging
// - Disable or limit in production for performance
// - Set reasonable size limits (4KB or less)
```

**How it works in practice**: Body logging provides:
- **Complete Information**: See actual data sent and received
- **Debugging**: Easier to debug issues with full request/response data
- **Performance Cost**: Significant overhead, especially with large bodies
- **Size Limits**: Prevent excessive log size with limits
- **Media Control**: Choose which content types to log

Use body logging carefully - it's powerful for debugging but can hurt performance in production.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Redacting Sensitive Data - Like blurring faces in photos</summary>
  <div>

## Redacting Sensitive Data

**Real-life analogy**: Redacting sensitive data is like blurring faces in security camera footage. You want to record activity for security, but you don't want to expose people's identities. Redaction hides sensitive information like passwords, tokens, or personal data while still logging the rest of the request.

**Technical explanation**: HTTP logging automatically redacts certain sensitive headers by default. You can configure which headers are logged and which are redacted. This prevents personally identifiable information (PII) and sensitive data from appearing in logs, protecting user privacy and security.

**Key jargon explained**:
- **Redaction**: Hiding sensitive information from logs
- **PII**: Personally Identifiable Information (names, emails, etc.)
- **Sensitive Headers**: Headers containing sensitive data (Authorization, Cookie, etc.)
- **Default Redaction**: Headers automatically redacted by the framework
- **Custom Redaction**: Configuring which headers to redact

### Default Redacted Headers:
```csharp:title=DefaultRedacted.cs
// Headers redacted by default:
// - Authorization
// - Cookie
// - Set-Cookie
// - Upgrade-Insecure-Requests
// - sec-ch-ua
// - sec-ch-ua-mobile
// - sec-ch-ua-platform
// - sec-fetch-site
// - sec-fetch-mode
// - sec-fetch-user
// - sec-fetch-dest
```

### Configuring Header Logging:
```csharp:title=HeaderConfig.cs
builder.Services.AddHttpLogging(logging =>
{
    // Add headers you want to log
    logging.RequestHeaders.Add("User-Agent");
    logging.RequestHeaders.Add("Referer");
    logging.ResponseHeaders.Add("Content-Type");
    
    // Headers not in the list show as [Redacted]
});
```

### Redacted Output:
```output:title=Console Output
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[1]
      Request:
      Method: POST
      Path: /api/login
      Authorization: [Redacted]
      Cookie: [Redacted]
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
```

### Custom Redaction:
```csharp:title=CustomRedaction.cs
// To redact custom headers:
// Don't add them to RequestHeaders or ResponseHeaders
// They will automatically show as [Redacted]

// Example: Don't add "X-Custom-Token"
// It will be redacted in logs
```

### Body Redaction:
```csharp:title=BodyRedaction.cs
// Body redaction is not automatic
// If you log bodies, sensitive data in bodies will be visible
// Consider:
// - Not logging bodies in production
// - Using custom middleware to redact body content
// - Being careful about what endpoints log bodies
```

**How it works in practice**: Redaction provides:
- **Privacy Protection**: Sensitive data is hidden from logs
- **Security**: Prevents tokens and passwords from appearing in logs
- **Compliance**: Helps meet privacy regulations (GDPR, etc.)
- **Control**: Choose which headers to log or redact
- **Default Safety**: Sensitive headers are redacted by default

**Warning**: HTTP logging can potentially log PII. Consider the risk and avoid logging sensitive information. Be especially careful when logging request and response bodies.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Performance Considerations - Like the cost of recording everything</summary>
  <div>

## Performance Considerations

**Real-life analogy**: Performance considerations are like the cost of recording everything on security cameras. Recording everything in high detail (logging bodies) takes more storage and processing power than just recording basic information (headers only). You need to balance detail with cost.

**Technical explanation**: HTTP logging can reduce app performance, especially when logging request and response bodies. The overhead comes from reading body content, formatting log messages, and writing to log destinations. Consider the performance impact when selecting fields to log.

**Key jargon explained**:
- **Performance Impact**: How much logging slows down your app
- **Overhead**: The extra work required to log information
- **Body Logging Cost**: The performance cost of logging bodies
- **Log Volume**: The amount of log data generated
- **Testing**: Measuring performance impact before production

### Performance Impact by Field:
```csharp:title=Performance.cs
// Low impact:
// - RequestProperties (method, path, etc.)
// - ResponseProperties (status code, etc.)
// - RequestHeaders (small number of headers)
// - ResponseHeaders (small number of headers)

// High impact:
// - RequestBody (especially large bodies)
// - ResponseBody (especially large bodies)
// - All fields (everything combined)
```

### Body Size Limits:
```csharp:title=SizeLimits.cs
// Set reasonable limits to reduce impact
logging.RequestBodyLogLimit = 4096;  // 4KB
logging.ResponseBodyLogLimit = 4096; // 4KB

// Larger limits = more performance impact
// Smaller limits = less detail but better performance
```

### Recommendations:
```csharp:title=Recommendations.cs
// Development:
// - Log everything for debugging
// - Use larger body limits
// - Performance is less critical

// Production:
// - Log only essential fields
// - Disable body logging or use small limits
// - Test performance impact
// - Monitor log volume

// Testing:
// - Measure performance impact with load testing
// - Compare with and without logging
// - Test different configuration options
```

### Performance Testing:
```csharp:title=Testing.cs
// Test performance impact:
// 1. Measure baseline performance without logging
// 2. Enable logging and measure again
// 3. Compare the difference
// 4. Adjust configuration based on results
// 5. Test in production-like environment
```

### Best Practices:
```csharp:title=BestPractices.cs
// DO:
// - Test performance impact before production
// - Use body logging only in development
// - Set reasonable body size limits
// - Monitor log volume and storage
// - Disable logging for high-traffic endpoints

// DON'T:
// - Log bodies in production without testing
// - Set unlimited body size limits
// - Log all fields in production
// - Ignore performance warnings
// - Log sensitive data
```

**How it works in practice**: Performance considerations:
- **Measure Impact**: Test before deploying to production
- **Balance Detail vs Speed**: More detail = slower performance
- **Environment-Specific**: Different settings for dev vs production
- **Monitor**: Watch log volume and app performance
- **Iterate**: Adjust configuration based on testing results

Always test the performance impact of your logging configuration, especially when logging bodies.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following security camera guidelines</summary>
  <div>

## HTTP Logging Best Practices

**Real-life analogy**: Following HTTP logging best practices is like following security camera guidelines. You want cameras positioned correctly (middleware order), recording the right details (configuration), protecting privacy (redaction), and not impacting operations (performance). Following guidelines ensures effective, safe, and efficient logging.

**Technical explanation**: Following best practices ensures your HTTP logging is effective for debugging and monitoring while protecting privacy and maintaining performance. This includes proper configuration, security considerations, and environment-specific settings.

**Key jargon explained**:
- **Environment-Specific Configuration**: Different settings for dev vs production
- **Security**: Protecting sensitive data and user privacy
- **Performance**: Maintaining app performance while logging
- **Debugging**: Using logs effectively to troubleshoot issues
- **Monitoring**: Using logs to understand app behavior

### DO:
- **Use HTTP logging** for debugging and monitoring
- **Redact sensitive headers** to protect privacy
- **Test performance impact** before production deployment
- **Use body logging** only in development
- **Set reasonable body size limits** (4KB or less)
- **Configure logging level** to Information to see HTTP logs
- **Monitor log volume** to prevent excessive storage
- **Position middleware** correctly in the pipeline

### DON'T:
- **Log bodies in production** without testing performance
- **Log sensitive data** like passwords or tokens
- **Set unlimited body size limits**
- **Ignore performance warnings**
- **Log all fields** in production
- **Forget to configure logging level**
- **Position middleware** after static files if you want to log them
- **Assume default configuration** is right for your needs

### Development Configuration:
```csharp:title=Development.cs
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddHttpLogging(logging =>
    {
        // Log everything for debugging
        logging.LoggingFields = HttpLoggingFields.All;
        logging.RequestBodyLogLimit = 4096;
        logging.ResponseBodyLogLimit = 4096;
    });
}
```

### Production Configuration:
```csharp:title=Production.cs
if (builder.Environment.IsProduction())
{
    builder.Services.AddHttpLogging(logging =>
    {
        // Log only essential information
        logging.LoggingFields = HttpLoggingFields.RequestPropertiesAndHeaders | 
                               HttpLoggingFields.ResponsePropertiesAndHeaders;
        logging.RequestBodyLogLimit = 0; // Disable body logging
        logging.ResponseBodyLogLimit = 0; // Disable body logging
    });
}
```

### Security Checklist:
```csharp:title=Security.cs
// Security considerations:
// ✓ Sensitive headers are redacted by default
// ✓ Don't add sensitive headers to logging lists
// ✓ Don't log bodies in production
// ✓ Review logs for accidentally logged sensitive data
// ✓ Follow privacy regulations (GDPR, etc.)
// ✓ Protect log files from unauthorized access
```

### Middleware Positioning:
```csharp:title=Positioning.cs
// To log static files:
app.UseHttpLogging();
app.UseStaticFiles();

// To skip static file logging:
app.UseStaticFiles();
app.UseHttpLogging();

// Position matters based on what you want to log
```

**How it works in practice**: Best practices ensure:
- **Security**: Sensitive data is protected
- **Performance**: App performance is maintained
- **Effectiveness**: Logs are useful for debugging
- **Privacy**: User privacy is respected
- **Maintainability**: Configuration is clear and documented

Good logging practices make your application more debuggable and monitorable without compromising security or performance.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [HTTP logging in .NET and ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/http-logging/?view=aspnetcore-10.0)