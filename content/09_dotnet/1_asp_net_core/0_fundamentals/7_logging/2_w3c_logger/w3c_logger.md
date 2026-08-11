---
title: "W3C Logger"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/2_w3c_logger"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>W3C Logger - Like a standardized visitor log book</summary>
  <div>

## What is W3C Logger?

**Real-life analogy**: W3C Logger is like using a standardized visitor log book that follows international standards. Instead of each building having its own log format, everyone uses the same format with the same fields. This makes it easy to analyze logs from different buildings together. The W3C format is like that standard log book format for web servers.

**Technical explanation**: W3C Logger is a middleware that writes log files in the W3C standard format. It logs HTTP request information, common properties, headers, response information, and metadata about the request/response pair. The W3C format is a standardized format used by many web servers and log analysis tools.

**Key jargon explained**:
- **W3C Logger**: Middleware that writes logs in W3C standard format
- **W3C Standard Format**: An industry-standard log file format defined by the World Wide Web Consortium
- **Log File**: A file where log entries are written
- **Request/Response Pair**: A single HTTP request and its corresponding response
- **Standardized Format**: Consistent format that works with many analysis tools

```csharp:title=Program.cs
var app = builder.Build();

app.UseW3CLogging();

app.UseRouting();

app.MapGet("/", () => "Hello World!");

app.Run();
```

**How it works in practice**: W3C Logger:
- **Standard Format**: Uses W3C standard format compatible with many tools
- **File-Based**: Writes logs to files instead of console
- **Request/Response Pairs**: Logs each request and response on one line
- **Configurable**: Choose which fields to log
- **Performance**: Can impact performance, especially with many fields

**Important**: W3C Logger can reduce app performance. Consider the performance impact when selecting fields to log. It can also potentially log PII, so avoid logging sensitive information.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Enabling W3C Logger - Like setting up the log book</summary>
  <div>

## Enabling W3C Logger

**Real-life analogy**: Enabling W3C Logger is like setting up a standardized log book at the entrance. You place the log book (add middleware) and tell the security guard (configure options) what to record. Once it's set up, every visitor (HTTP request) is automatically recorded in the standard format.

**Technical explanation**: W3C Logger is enabled by calling UseW3CLogging to add the middleware to the pipeline. By default, it logs common properties like path, status code, date, time, and protocol. You can configure options to customize what gets logged and where files are stored.

**Key jargon explained**:
- **UseW3CLogging**: Method to add W3C Logger middleware to the pipeline
- **AddW3CLogging**: Method to configure W3C Logger options
- **Middleware Pipeline**: The sequence of middleware that processes requests
- **Default Fields**: Standard fields logged by default (path, status, date, time, protocol)
- **Log Directory**: The folder where log files are written

### Basic Setup:
```csharp:title=Program.cs
var app = builder.Build();

app.UseW3CLogging();

app.UseRouting();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### With Configuration:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddW3CLogging(logging =>
{
    logging.LoggingFields = W3CLoggingFields.All;
    logging.FileName = "MyLogFile";
    logging.LogDirectory = @"C:\logs";
});

var app = builder.Build();

app.UseW3CLogging();

app.UseRouting();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Default Log Output:
```
#Version: 1.0
#Start-Date: 2021-09-29 22:18:28
#Fields: date time c-ip s-computername s-ip s-port cs-method cs-uri-stem cs-uri-query sc-status time-taken cs-version cs-host cs(User-Agent) cs(Referer)
2021-09-29 22:18:28 ::1 DESKTOP-LH3TLTA ::1 5000 GET / - 200 59.9171 HTTP/1.1 localhost:5000 Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/93.0.4577.82+Safari/537.36 -
```

**How it works in practice**: The setup process:
1. **Configure Options**: Use AddW3CLogging to set up logging options
2. **Add Middleware**: Use UseW3CLogging to add it to the pipeline
3. **Position Correctly**: Place middleware where you want logging to start
4. **Automatic Logging**: Logs are written automatically for each request
5. **File Creation**: Log files are created in the specified directory

The middleware writes each request/response pair to a single line in the W3C format.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>W3C Logger Options - Like customizing the log book</summary>
  <div>

## W3C Logger Options

**Real-life analogy**: W3C Logger options are like customizing the log book. You can choose which fields to record (which columns), where to store the book (log directory), how big each book can be (file size limit), and how many old books to keep (retained file count). This lets you tailor logging to your specific needs.

**Technical explanation**: You can configure W3C Logger options using W3CLoggerOptions. This lets you control which fields are logged, file size limits, retained file count, file name, log directory, and flush interval.

**Key jargon explained**:
- **W3CLoggerOptions**: Configuration options for W3C Logger
- **LoggingFields**: Bit flag that controls which parts to log
- **FileSizeLimit**: Maximum size of a log file before creating a new one
- **RetainedFileCountLimit**: Number of old log files to keep
- **FlushInterval**: How often to flush logs to disk
- **AdditionalRequestHeaders**: Extra headers to log

### Configuring Options:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddW3CLogging(logging =>
{
    // Log all W3C fields
    logging.LoggingFields = W3CLoggingFields.All;
    
    // Add specific headers to log
    logging.AdditionalRequestHeaders.Add("x-forwarded-for");
    logging.AdditionalRequestHeaders.Add("x-client-ssl-protocol");
    
    // File configuration
    logging.FileSizeLimit = 5 * 1024 * 1024;  // 5MB
    logging.RetainedFileCountLimit = 2;
    logging.FileName = "MyLogFile";
    logging.LogDirectory = @"C:\logs";
    
    // Flush interval
    logging.FlushInterval = TimeSpan.FromSeconds(2);
});

var app = builder.Build();

app.UseW3CLogging();

app.UseRouting();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### LoggingFields Options:
```csharp:title=LoggingFields.cs
// Available LoggingFields options:
// - None: Don't log anything
// - Date: Log the date
// - Time: Log the time
// - ClientIP: Log the client IP address
// - UserName: Log the user name (not logged by default)
// - Method: Log the HTTP method
// - UriStem: Log the request path
// - UriQuery: Log the query string
// - Status: Log the response status code
// - TimeTaken: Log the time taken to process the request
// - ProtocolVersion: Log the HTTP version
// - Host: Log the host header
// - UserAgent: Log the user agent header
// - Referer: Log the referer header
// - All: Log all fields
```

### File Management:
```csharp:title=FileManagement.cs
// File size limit
logging.FileSizeLimit = 5 * 1024 * 1024;  // 5MB default
// When limit reached, a new file is created

// Retained file count
logging.RetainedFileCountLimit = 2;  // Keep 2 old files
// Older files are automatically deleted

// File name
logging.FileName = "MyLogFile";  // Base name for log files
// Files are named: MyLogFile_20210929_223028_123.log

// Log directory
logging.LogDirectory = @"C:\logs";  // Where to store log files
// Must be a valid directory path
```

### Flush Interval:
```csharp:title=FlushInterval.cs
// Flush interval
logging.FlushInterval = TimeSpan.FromSeconds(2);  // Default

// How often logs are written to disk
// Shorter interval = more frequent writes = more disk I/O
// Longer interval = less frequent writes = risk of data loss on crash
```

**How it works in practice**: Options configuration provides:
- **Flexibility**: Customize what gets logged
- **File Management**: Control file size and retention
- **Performance**: Adjust flush interval to balance performance and data safety
- **Headers**: Add custom headers to log
- **Storage Control**: Choose where and how logs are stored

Configure options based on your logging needs and storage constraints.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>W3C Log Format - Like a standardized form</summary>
  <div>

## W3C Log Format

**Real-life analogy**: The W3C log format is like a standardized form that everyone uses. Instead of each person creating their own form with different fields, everyone uses the same form with the same field names and order. This makes it easy to compare and analyze forms from different sources.

**Technical explanation**: The W3C log format is a standardized format defined by the World Wide Web Consortium. It includes a header section with metadata (version, start date, fields) and data lines with space-separated values. This format is compatible with many log analysis tools and web servers.

**Key jargon explained**:
- **W3C Format**: Standard log file format defined by W3C
- **Header Section**: Metadata at the top of the log file
- **Fields Line**: Defines which columns are in the log
- **Data Lines**: Actual log entries with space-separated values
- **Space-Separated**: Values are separated by spaces in the log

### Log File Structure:
```
#Version: 1.0
#Start-Date: 2021-09-29 22:18:28
#Fields: date time c-ip s-computername s-ip s-port cs-method cs-uri-stem cs-uri-query sc-status time-taken cs-version cs-host cs(User-Agent) cs(Referer)
2021-09-29 22:18:28 ::1 DESKTOP-LH3TLTA ::1 5000 GET / - 200 59.9171 HTTP/1.1 localhost:5000 Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/93.0.4577.82+Safari/537.36 -
```

### Header Section:
```
#Version: 1.0
#Start-Date: 2021-09-29 22:18:28
#Fields: date time c-ip s-computername s-ip s-port cs-method cs-uri-stem cs-uri-query sc-status time-taken cs-version cs-host cs(User-Agent) cs(Referer)
```

### Field Meanings:
```csharp:title=FieldMeanings.cs
// date: Date of the request
// time: Time of the request
// c-ip: Client IP address
// s-computername: Server computer name
// s-ip: Server IP address
// s-port: Server port
// cs-method: Client method (GET, POST, etc.)
// cs-uri-stem: Request path
// cs-uri-query: Query string
// sc-status: Response status code
// time-taken: Time taken to process request (in milliseconds)
// cs-version: HTTP version
// cs-host: Host header
// cs(User-Agent): User agent header
// cs(Referer): Referer header
```

### Data Line Example:
```
2021-09-29 22:18:28 ::1 DESKTOP-LH3TLTA ::1 5000 GET / - 200 59.9171 HTTP/1.1 localhost:5000 Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/93.0.4577.82+Safari/537.36 -
```

### Advantages of W3C Format:
```csharp:title=Advantages.cs
// ✓ Standard format compatible with many tools
// ✓ Space-separated values are easy to parse
// ✓ Widely used by web servers (IIS, Apache, etc.)
// ✓ Supports many analysis tools
// ✓ Human-readable
// ✓ Includes metadata (version, fields)
```

**How it works in practice**: The W3C format provides:
- **Standardization**: Consistent format across different servers and tools
- **Compatibility**: Works with many log analysis tools
- **Readability**: Human-readable format for manual inspection
- **Parseability**: Easy to parse programmatically
- **Metadata**: Includes version and field definitions

The W3C format makes it easy to analyze logs from different sources together.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Performance Considerations - Like the cost of detailed record-keeping</summary>
  <div>

## Performance Considerations

**Real-life analogy**: Performance considerations are like the cost of detailed record-keeping. Recording everything in great detail (logging all fields) takes more time and storage than recording just the basics. You need to balance detail with cost, just like balancing thoroughness with efficiency.

**Technical explanation**: W3C Logger can reduce app performance, especially when logging many fields. The overhead comes from writing to disk, formatting log entries, and capturing detailed information. Consider the performance impact when selecting fields to log.

**Key jargon explained**:
- **Performance Impact**: How much logging slows down your app
- **Overhead**: The extra work required to log information
- **Disk I/O**: Writing files to disk can be slow
- **Field Count**: More fields = more performance impact
- **Testing**: Measuring performance impact before production

### Performance Impact by Field:
```csharp:title=Performance.cs
// Low impact:
// - Date, Time (simple values)
// - Method, Path (readily available)
// - Status Code (readily available)

// Medium impact:
// - User Agent (requires reading header)
// - Referer (requires reading header)
// - Custom headers (requires reading headers)

// High impact:
// - UserName (requires authentication check)
// - Cookie (requires reading sensitive header)
// - All fields (everything combined)
```

### File Management Performance:
```csharp:title=FilePerformance.cs
// File size limit
logging.FileSizeLimit = 5 * 1024 * 1024;  // 5MB
// Larger files = less frequent file creation
// Smaller files = more frequent file creation

// Flush interval
logging.FlushInterval = TimeSpan.FromSeconds(2);  // Default
// Shorter interval = more frequent writes = more disk I/O
// Longer interval = less frequent writes = risk of data loss
```

### Recommendations:
```csharp:title=Recommendations.cs
// Development:
// - Log all fields for debugging
// - Use short flush interval
// - Performance is less critical

// Production:
// - Log only essential fields
// - Use reasonable file size limits
// - Test performance impact
// - Monitor disk I/O

// Testing:
// - Measure performance impact with load testing
// - Compare with and without logging
// - Test different configuration options
// - Monitor disk usage
```

### Performance Testing:
```csharp:title=Testing.cs
// Test performance impact:
// 1. Measure baseline performance without logging
// 2. Enable W3C Logger and measure again
// 3. Compare the difference
// 4. Adjust configuration based on results
// 5. Test in production-like environment
```

### Best Practices:
```csharp:title=BestPractices.cs
// DO:
// - Test performance impact before production
// - Log only essential fields in production
// - Use reasonable file size limits
// - Monitor disk I/O and usage
// - Consider using in development only

// DON'T:
// - Log all fields in production without testing
// - Set very small file size limits
// - Set very short flush intervals
// - Ignore performance warnings
// - Log sensitive data
```

**How it works in practice**: Performance considerations:
- **Measure Impact**: Test before deploying to production
- **Balance Detail vs Speed**: More fields = slower performance
- **Environment-Specific**: Different settings for dev vs production
- **Monitor**: Watch disk I/O and app performance
- **Iterate**: Adjust configuration based on testing results

Always test the performance impact of your W3C Logger configuration.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Security and Privacy - Like protecting visitor privacy</summary>
  <div>

## Security and Privacy

**Real-life analogy**: Security and privacy are like protecting visitor privacy in a log book. You want to record activity for security, but you don't want to record sensitive information like credit card numbers or personal details. You need to balance security needs with privacy protection.

**Technical explanation**: W3C Logger can potentially log personally identifiable information (PII). By default, fields that could contain PII (like UserName and Cookie) are not logged. You should consider the risk and avoid logging sensitive information.

**Key jargon explained**:
- **PII**: Personally Identifiable Information (names, emails, etc.)
- **Sensitive Data**: Information that should be protected (passwords, tokens, etc.)
- **Default Redaction**: Fields that could contain PII are not logged by default
- **Privacy Regulations**: Laws like GDPR that protect personal data
- **Security Risk**: Risk of exposing sensitive information in logs

### Default Redacted Fields:
```csharp:title=DefaultRedacted.cs
// Fields NOT logged by default to protect privacy:
// - UserName: Could contain user's name or identifier
// - Cookie: Could contain session tokens or sensitive data

// These fields are excluded from the default LoggingFields
```

### Sensitive Headers:
```csharp:title=SensitiveHeaders.cs
// Be careful when adding headers to log:
logging.AdditionalRequestHeaders.Add("Authorization");  // BAD - contains tokens
logging.AdditionalRequestHeaders.Add("Cookie");  // BAD - contains sensitive data
logging.AdditionalRequestHeaders.Add("X-API-Key");  // BAD - contains API keys

// Better choices:
logging.AdditionalRequestHeaders.Add("X-Request-ID");  // Good - identifier only
logging.AdditionalRequestHeaders.Add("X-Forwarded-For");  // Good - IP information
```

### Privacy Best Practices:
```csharp:title=Privacy.cs
// DO:
// - Use default field configuration
// - Avoid logging UserName and Cookie fields
// - Be careful with custom headers
// - Follow privacy regulations (GDPR, etc.)
// - Protect log files from unauthorized access
// - Review logs for accidentally logged sensitive data

// DON'T:
// - Log sensitive headers (Authorization, Cookie)
// - Log PII without explicit consent
// - Store logs in insecure locations
// - Share logs without redacting sensitive data
// - Ignore privacy regulations
```

### Log File Security:
```csharp:title=LogSecurity.cs
// Protect log files:
// - Store logs in secure directory with restricted access
// - Set appropriate file permissions
// - Encrypt logs if they contain sensitive data
// - Use secure log aggregation services
// - Implement log retention policies
// - Secure log backup and storage
```

### Compliance:
```csharp:title=Compliance.cs
// Privacy regulations to consider:
// - GDPR (General Data Protection Regulation)
// - CCPA (California Consumer Privacy Act)
// - HIPAA (Health Insurance Portability and Accountability Act)
// - PCI DSS (Payment Card Industry Data Security Standard)

// Ensure your logging practices comply with relevant regulations
```

**How it works in practice**: Security and privacy:
- **Default Safety**: Sensitive fields are not logged by default
- **Careful Configuration**: Be careful when adding custom headers
- **File Protection**: Secure log files from unauthorized access
- **Compliance**: Follow privacy regulations
- **Review**: Regularly review logs for accidentally logged sensitive data

**Warning**: W3C Logger can potentially log PII. Consider the risk and avoid logging sensitive information.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following log book guidelines</summary>
  <div>

## W3C Logger Best Practices

**Real-life analogy**: Following best practices is like following log book guidelines. You want to record the right information (useful fields), protect privacy (avoid sensitive data), manage storage (file limits), and position the log book correctly (middleware order). Good guidelines make your log book effective and safe.

**Technical explanation**: Following best practices ensures your W3C Logger is effective, secure, and performant. This includes choosing appropriate fields, protecting privacy, managing file storage, and positioning the middleware correctly in the pipeline.

**Key jargon explained**:
- **Environment-Specific Configuration**: Different settings for dev vs production
- **Security**: Protecting sensitive data and user privacy
- **Performance**: Maintaining app performance while logging
- **File Management**: Controlling log file size and retention
- **Middleware Positioning**: Correct placement in the pipeline

### DO:
- **Use W3C Logger** for standardized logging compatible with analysis tools
- **Test performance impact** before production deployment
- **Use default field configuration** to avoid logging PII
- **Set reasonable file size limits** (5MB or less)
- **Set appropriate retained file count** to manage disk space
- **Position middleware** correctly in the pipeline
- **Monitor disk usage** for log files
- **Protect log files** from unauthorized access

### DON'T:
- **Log all fields** in production without testing performance
- **Log sensitive headers** like Authorization or Cookie
- **Set unlimited file size limits**
- **Ignore performance warnings**
- **Forget to configure logging level**
- **Position middleware** after static files if you want to log them
- **Store logs in insecure locations**
- **Ignore privacy regulations**

### Development Configuration:
```csharp:title=Development.cs
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddW3CLogging(logging =>
    {
        // Log everything for debugging
        logging.LoggingFields = W3CLoggingFields.All;
        logging.FileName = "DevLogFile";
        logging.LogDirectory = @"C:\dev-logs";
    });
}
```

### Production Configuration:
```csharp:title=Production.cs
if (builder.Environment.IsProduction())
{
    builder.Services.AddW3CLogging(logging =>
    {
        // Log only essential information
        logging.LoggingFields = W3CLoggingFields.Date | 
                               W3CLoggingFields.Time |
                               W3CLoggingFields.ClientIP |
                               W3CLoggingFields.Method |
                               W3CLoggingFields.UriStem |
                               W3CLoggingFields.Status;
        
        // Manage file size
        logging.FileSizeLimit = 10 * 1024 * 1024;  // 10MB
        logging.RetainedFileCountLimit = 5;
        
        // Production log directory
        logging.LogDirectory = @"C:\prod-logs";
    });
}
```

### Middleware Positioning:
```csharp:title=Positioning.cs
// To log static files:
app.UseW3CLogging();
app.UseStaticFiles();

// To skip static file logging:
app.UseStaticFiles();
app.UseW3CLogging();

// Position matters based on what you want to log
```

### Security Checklist:
```csharp:title=Security.cs
// Security considerations:
// ✓ Sensitive fields are not logged by default
// ✓ Don't add sensitive headers to AdditionalRequestHeaders
// ✓ Don't log UserName or Cookie fields
// ✓ Review logs for accidentally logged sensitive data
// ✓ Follow privacy regulations (GDPR, etc.)
// ✓ Protect log files from unauthorized access
// ✓ Use secure log storage and backup
```

**How it works in practice**: Best practices ensure:
- **Security**: Sensitive data is protected
- **Performance**: App performance is maintained
- **Standardization**: W3C format is used correctly
- **Privacy**: User privacy is respected
- **Maintainability**: Configuration is clear and documented

Good W3C Logger practices make your application more observable and monitorable without compromising security or performance.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [W3CLogger in .NET and ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/w3c-logger/?view=aspnetcore-10.0)