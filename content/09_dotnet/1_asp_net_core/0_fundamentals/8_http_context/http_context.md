---
title: "HTTP Context"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/8_http_context"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>HttpContext - Like a complete dossier on a visitor</summary>
  <div>

## What is HttpContext?

**Real-life analogy**: HttpContext is like a complete dossier on a visitor to your building. It contains everything you need to know about the visitor - who they are (user), what they want (request), what they're allowed to do (authorization), and what you should give them (response). Instead of looking up information in different places, everything about this specific visitor is in one convenient dossier.

**Technical explanation**: HttpContext encapsulates all information about an individual HTTP request and response. It's initialized when an HTTP request is received and provides access to the request, response, user information, and other HTTP-related data. HttpContext is accessible by middleware and app frameworks like controllers, Razor Pages, and SignalR.

**Key jargon explained**:
- **HttpContext**: The main object containing all HTTP request/response information
- **HttpRequest**: Information about the incoming HTTP request
- **HttpResponse**: Information about the outgoing HTTP response
- **User**: Information about the authenticated user
- **Items**: A key-value collection for sharing data between middleware

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (HttpContext context) =>
{
    var method = context.Request.Method;
    var path = context.Request.Path;
    return $"Method: {method}, Path: {path}";
});

app.Run();
```

**How it works in practice**: HttpContext provides:
- **Complete Information**: Everything about the request and response in one place
- **Request Access**: Get method, path, headers, query string, body
- **Response Access**: Set status code, headers, write response body
- **User Information**: Access authenticated user and their claims
- **Data Sharing**: Use Items collection to share data between middleware

HttpContext is your central hub for all HTTP-related information during request processing.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HttpRequest - Like the visitor's request form</summary>
  <div>

## HttpRequest

**Real-life analogy**: HttpRequest is like the visitor's request form. When someone visits your building, they fill out a form saying what they want (method), where they want to go (path), any special instructions (headers), and additional information (query string, body). This form contains everything you need to understand what the visitor is asking for.

**Technical explanation**: HttpRequest provides access to information about the incoming HTTP request. It includes the HTTP method, URL path, headers, query string, route values, and request body. HttpRequest is initialized when an HTTP request is received and can be modified by middleware in the pipeline.

**Key jargon explained**:
- **HttpRequest**: Object containing incoming HTTP request information
- **Method**: HTTP method (GET, POST, PUT, DELETE, etc.)
- **Path**: The URL path being requested
- **Headers**: HTTP headers sent with the request
- **Query String**: URL parameters after the ?
- **Route Values**: Values extracted from the URL route pattern

### Common HttpRequest Properties:
```csharp:title=Properties.cs
// Path: The request path
var path = context.Request.Path;  // "/api/users/123"

// Method: The HTTP method
var method = context.Request.Method;  // "GET"

// Headers: Request headers
var userAgent = context.Request.Headers.UserAgent;
var contentType = context.Request.Headers.ContentType;

// Query: Query string parameters
var page = context.Request.Query["page"];  // "1"
var filter = context.Request.Query["filter"];  // "active"

// Route Values: Values from route matching
var id = context.Request.RouteValues["id"];  // "123"

// Body: Request body stream
var body = context.Request.Body;
```

### Accessing Headers:
```csharp:title=Headers.cs
// Method 1: Use indexer (case-insensitive)
var customHeader = context.Request.Headers["x-custom-header"];

// Method 2: Use typed properties (IntelliSense support)
var userAgent = context.Request.Headers.UserAgent;
var contentType = context.Request.Headers.ContentType;

// Example endpoint
app.MapGet("/", (HttpRequest request) =>
{
    var userAgent = request.Headers.UserAgent;
    var customHeader = request.Headers["x-custom-header"];
    return Results.Ok(new { userAgent, customHeader });
});
```

### Reading Query String:
```csharp:title=QueryString.cs
// Access individual query parameters
var page = context.Request.Query["page"];
var filter = context.Request.Query["filter"];

// Get all query parameters
var allQuery = context.Request.Query;

// Example: /api/users?page=1&filter=active
// page = "1"
// filter = "active"
```

### Reading Request Body:
```csharp:title=RequestBody.cs
// Read body as stream
app.MapPost("/upload", async (HttpContext context) =>
{
    using var reader = new StreamReader(context.Request.Body);
    var body = await reader.ReadToEndAsync();
    return $"Received: {body}";
});

// Copy body to file
app.MapPost("/uploadstream", async (HttpContext context) =>
{
    await using var writeStream = File.Create("uploaded.dat");
    await context.Request.Body.CopyToAsync(writeStream);
    return "File uploaded";
});
```

**How it works in practice**: HttpRequest provides:
- **Request Information**: Method, path, protocol, scheme
- **Headers**: Access to all HTTP headers
- **Query Parameters**: Easy access to URL parameters
- **Route Values**: Values extracted from URL patterns
- **Body**: Stream for reading request body content

HttpRequest gives you everything you need to understand and process the incoming request.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HttpResponse - Like your response letter</summary>
  <div>

## HttpResponse

**Real-life analogy**: HttpResponse is like your response letter to the visitor. After reviewing their request form, you write a response letter saying what you found (status code), any additional information (headers), and the main content (body). This letter is what the visitor receives as the answer to their request.

**Technical explanation**: HttpResponse provides access to set the HTTP response status code, headers, and body. You use it to control what the client receives as the response. HttpResponse is initialized when the HTTP request is received and is modified by middleware and endpoint handlers to produce the final response.

**Key jargon explained**:
- **HttpResponse**: Object for setting HTTP response information
- **StatusCode**: HTTP status code (200, 404, 500, etc.)
- **Headers**: HTTP headers sent with the response
- **Body**: Stream for writing the response body
- **ContentType**: The type of content in the response (JSON, HTML, etc.)

### Setting Status Code:
```csharp:title=StatusCode.cs
// Set status code
context.Response.StatusCode = 200;  // OK
context.Response.StatusCode = 404;  // Not Found
context.Response.StatusCode = 500;  // Internal Server Error

// Example endpoint
app.MapGet("/notfound", (HttpContext context) =>
{
    context.Response.StatusCode = 404;
    return "Page not found";
});
```

### Setting Headers:
```csharp:title=Headers.cs
// Set headers
context.Response.Headers.ContentType = "application/json";
context.Response.Headers.CacheControl = "no-cache";
context.Response.Headers["X-Custom-Header"] = "MyValue";

// Example endpoint
app.MapGet("/", (HttpContext context) =>
{
    context.Response.Headers.ContentType = "application/json";
    context.Response.Headers["X-Custom-Header"] = "MyValue";
    return Results.Ok(new { message = "Hello" });
});
```

### Writing Response Body:
```csharp:title=Body.cs
// Write text response
app.MapGet("/", (HttpContext context) =>
{
    context.Response.ContentType = "text/plain";
    return context.Response.WriteAsync("Hello World");
});

// Write JSON response
app.MapGet("/json", (HttpContext context) =>
{
    context.Response.ContentType = "application/json";
    var data = new { message = "Hello" };
    return context.Response.WriteAsJsonAsync(data);
});

// Write file response
app.MapGet("/file", (HttpContext context) =>
{
    context.Response.ContentType = "application/octet-stream";
    return context.Response.SendFileAsync("myfile.dat");
});
```

### Complete Response Example:
```csharp:title=Complete.cs
app.MapGet("/custom", (HttpContext context) =>
{
    // Set status code
    context.Response.StatusCode = 200;
    
    // Set headers
    context.Response.Headers.ContentType = "application/json";
    context.Response.Headers.CacheControl = "no-cache";
    
    // Write body
    var data = new { message = "Hello World", timestamp = DateTime.UtcNow };
    return context.Response.WriteAsJsonAsync(data);
});
```

**How it works in practice**: HttpResponse provides:
- **Status Control**: Set appropriate HTTP status codes
- **Header Control**: Add response headers for caching, content type, etc.
- **Body Writing**: Write text, JSON, files, or other content
- **Stream Access**: Direct access to response stream for advanced scenarios
- **Complete Control**: Full control over every aspect of the response

HttpResponse lets you craft exactly what the client receives as the response.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HttpContext.Items - Like a temporary notepad</summary>
  <div>

## HttpContext.Items

**Real-life analogy**: HttpContext.Items is like a temporary notepad that you and your colleagues can use while processing a visitor's request. You can write notes on it (add data), and other colleagues (middleware) can read those notes. When the visitor leaves (request completes), the notepad is thrown away. It's perfect for sharing information during request processing.

**Technical explanation**: HttpContext.Items is a key-value collection used to store data that needs to be shared between middleware components during the processing of a single HTTP request. The data is stored only for the duration of the request and is discarded when the request completes.

**Key jargon explained**:
- **Items**: Key-value collection for sharing data during request processing
- **Key-Value Collection**: Dictionary-like structure with keys and values
- **Request Scope**: Data exists only for the duration of the single request
- **Middleware Communication**: Way for middleware to share information
- **Temporary Storage**: Data is discarded when request completes

### Storing and Retrieving Data:
```csharp:title=Items.cs
// Store data in Items
context.Items["RequestId"] = Guid.NewGuid();
context.Items["StartTime"] = DateTime.UtcNow;
context.Items["UserData"] = new { Name = "John", Role = "Admin" };

// Retrieve data from Items
var requestId = context.Items["RequestId"];
var startTime = context.Items["StartTime"];
var userData = context.Items["UserData"];
```

### Middleware Communication Example:
```csharp:title=Middleware.cs
// Middleware 1: Store data
app.Use(async (context, next) =>
{
    context.Items["StartTime"] = DateTime.UtcNow;
    context.Items["RequestId"] = Guid.NewGuid();
    
    await next(context);
});

// Middleware 2: Read and use data
app.Use(async (context, next) =>
{
    var startTime = context.Items["StartTime"] as DateTime?;
    var requestId = context.Items["RequestId"] as Guid?;
    
    Console.WriteLine($"Request {requestId} started at {startTime}");
    
    await next(context);
});

// Endpoint: Use data
app.MapGet("/", (HttpContext context) =>
{
    var requestId = context.Items["RequestId"];
    return $"Request ID: {requestId}";
});
```

### Passing Data to Endpoints:
```csharp:title=PassingData.cs
// Middleware: Extract and store user data
app.Use(async (context, next) =>
{
    var token = context.Request.Headers.Authorization.FirstOrDefault();
    var userData = ValidateToken(token);  // Your validation logic
    
    context.Items["User"] = userData;
    
    await next(context);
});

// Endpoint: Access user data from Items
app.MapGet("/profile", (HttpContext context) =>
{
    var user = context.Items["User"] as UserData;
    if (user == null)
    {
        return Results.Unauthorized();
    }
    
    return Results.Ok(new { Name = user.Name, Email = user.Email });
});
```

### Request Tracking Example:
```csharp:title=Tracking.cs
// Middleware: Add request tracking
app.Use(async (context, next) =>
{
    var requestId = Guid.NewGuid();
    context.Items["RequestId"] = requestId;
    context.Items["StartTime"] = DateTime.UtcNow;
    
    Console.WriteLine($"Request {requestId} started");
    
    try
    {
        await next(context);
    }
    finally
    {
        var startTime = context.Items["StartTime"] as DateTime?;
        var duration = DateTime.UtcNow - startTime.Value;
        Console.WriteLine($"Request {requestId} completed in {duration.TotalMilliseconds}ms");
    }
});
```

**How it works in practice**: HttpContext.Items provides:
- **Data Sharing**: Share data between middleware components
- **Request Scope**: Data exists only for the current request
- **Type Safety**: Store and retrieve strongly-typed objects
- **Simple API**: Easy dictionary-like access
- **Automatic Cleanup**: Data is automatically discarded when request completes

Items is perfect for temporary data sharing during request processing.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HttpContext.User - Like checking the visitor's ID</summary>
  <div>

## HttpContext.User

**Real-life analogy**: HttpContext.User is like checking the visitor's ID badge. When someone enters your building, you check their ID to see who they are (identity), what they're allowed to do (roles), and any special permissions they have (claims). This information helps you decide what they can access and what they're authorized to do.

**Technical explanation**: HttpContext.User provides access to the authenticated user's security principal. It contains the user's identity, claims, and roles. This information is set by authentication middleware and is used by authorization middleware to determine if the user is allowed to access specific resources.

**Key jargon explained**:
- **User**: The authenticated user's security principal
- **Identity**: Information about who the user is (name, authentication type)
- **Claims**: Statements about the user (name, email, role, etc.)
- **Roles**: The user's roles or groups
- **Authentication**: The process of verifying the user's identity

### Accessing User Information:
```csharp:title=UserInfo.cs
// Check if user is authenticated
var isAuthenticated = context.User.Identity?.IsAuthenticated ?? false;

// Get user name
var userName = context.User.Identity?.Name;

// Check user claims
var email = context.User.FindFirst("email")?.Value;
var role = context.User.FindFirst("role")?.Value;
```

### Authentication Check:
```csharp:title=AuthCheck.cs
app.MapGet("/profile", (HttpContext context) =>
{
    // Check if user is authenticated
    if (context.User.Identity?.IsAuthenticated != true)
    {
        return Results.Unauthorized();
    }
    
    var userName = context.User.Identity?.Name;
    return Results.Ok(new { message = $"Hello, {userName}" });
});
```

### Role-Based Authorization:
```csharp:title=Roles.cs
app.MapGet("/admin", (HttpContext context) =>
{
    // Check if user has admin role
    if (!context.User.IsInRole("Admin"))
    {
        return Results.Forbid();
    }
    
    return Results.Ok(new { message = "Admin access granted" });
});
```

### Claims-Based Authorization:
```csharp:title=Claims.cs
app.MapGet("/premium", (HttpContext context) =>
{
    // Check if user has premium claim
    var isPremium = context.User.HasClaim("subscription", "premium");
    if (!isPremium)
    {
        return Results.Forbid();
    }
    
    return Results.Ok(new { message = "Premium content" });
});
```

### Complete User Information:
```csharp:title=CompleteUser.cs
app.MapGet("/user-info", (HttpContext context) =>
{
    if (context.User.Identity?.IsAuthenticated != true)
    {
        return Results.Unauthorized();
    }
    
    var userInfo = new
    {
        IsAuthenticated = context.User.Identity.IsAuthenticated,
        Name = context.User.Identity.Name,
        AuthenticationType = context.User.Identity.AuthenticationType,
        Claims = context.User.Claims.Select(c => new { c.Type, c.Value }),
        Roles = context.User.Claims.Where(c => c.Type == "role").Select(c => c.Value)
    };
    
    return Results.Ok(userInfo);
});
```

**How it works in practice**: HttpContext.User provides:
- **Authentication Status**: Check if user is authenticated
- **User Identity**: Get user name and authentication type
- **Claims Access**: Access all user claims
- **Role Checking**: Check if user has specific roles
- **Authorization**: Make authorization decisions based on user information

User information is set by authentication middleware and used throughout the request for authorization.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Request Body Buffering - Like making a copy of a document</summary>
  <div>

## Request Body Buffering

**Real-life analogy**: Request body buffering is like making a copy of a document before letting others read it. Normally, when you read a document, you can only read it once from start to finish. But sometimes you need to read it multiple times (like reviewing it yourself and then passing it to a colleague). Buffering makes a copy so multiple people can read it.

**Technical explanation**: By default, the request body can only be read once, from beginning to end. This forward-only reading avoids the overhead of buffering the entire body and reduces memory usage. However, sometimes middleware needs to read the body and then rewind it so the endpoint can read it too. EnableBuffering enables multiple reads of the request body.

**Key jargon explained**:
- **Forward-Only Reading**: Can only read the body once from start to end
- **Buffering**: Making a copy of the request body in memory
- **EnableBuffering**: Method to enable multiple reads of the request body
- **Rewinding**: Resetting the body stream to the beginning
- **Memory vs Disk**: Buffering can use memory or disk for large bodies

### Default Behavior (Single Read):
```csharp:title=Default.cs
// Body can only be read once
app.MapPost("/upload", async (HttpContext context) =>
{
    using var reader = new StreamReader(context.Request.Body);
    var body = await reader.ReadToEndAsync();
    // After this, body cannot be read again
    return $"Received: {body}";
});
```

### Enable Buffering:
```csharp:title=Buffering.cs
app.Use(async (context, next) =>
{
    // Enable buffering - must be called before reading body
    context.Request.EnableBuffering();
    
    // Read the body
    using var reader = new StreamReader(context.Request.Body);
    var body = await reader.ReadToEndAsync();
    
    Console.WriteLine($"Body read by middleware: {body}");
    
    // Rewind to start
    context.Request.Body.Position = 0;
    
    // Pass to next middleware/endpoint
    await next(context);
});

app.MapPost("/upload", async (HttpContext context) =>
{
    // Endpoint can now read the body too
    using var reader = new StreamReader(context.Request.Body);
    var body = await reader.ReadToEndAsync();
    
    return $"Received: {body}";
});
```

### Buffering with Options:
```csharp:title=Options.cs
app.Use(async (context, next) =>
{
    // Enable buffering with options
    context.Request.EnableBuffering(
        new HttpRequestBufferingOptions
        {
            BufferThreshold = 1024 * 1024,  // 1MB
            BufferLimit = 10 * 1024 * 1024   // 10MB
        });
    
    // Read body
    var body = await new StreamReader(context.Request.Body).ReadToEndAsync();
    
    // Rewind
    context.Request.Body.Position = 0;
    
    await next(context);
});
```

### When to Use Buffering:
```csharp:title=WhenToUse.cs
// Use buffering when:
// - Middleware needs to read and log the body
// - Multiple middleware need to read the body
// - You need to validate the body before processing
// - You need to transform the body

// Don't use buffering when:
// - Only one component needs to read the body
// - Performance is critical (buffering adds overhead)
// - Request bodies are very large (memory usage)
```

**How it works in practice**: Request body buffering provides:
- **Multiple Reads**: Allow multiple components to read the request body
- **Flexibility**: Middleware can inspect and modify requests
- **Validation**: Validate body before processing
- **Logging**: Log request bodies for debugging
- **Performance Tradeoff**: Buffering adds overhead but provides flexibility

Use buffering only when you need multiple reads of the request body.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following proper dossier procedures</summary>
  <div>

## HttpContext Best Practices

**Real-life analogy**: Following HttpContext best practices is like following proper procedures for handling visitor dossiers. You should only access what you need (don't read unnecessary information), handle sensitive data carefully (protect user privacy), clean up after yourself (don't leave temporary data), and follow the proper order (process requests in the right sequence).

**Technical explanation**: Following best practices ensures you use HttpContext efficiently, securely, and correctly. This includes accessing only the data you need, protecting sensitive information, using appropriate methods for different scenarios, and following the correct order of operations.

**Key jargon explained**:
- **Efficient Access**: Access only the data you need
- **Sensitive Data**: Protect user privacy and sensitive information
- **Proper Methods**: Use the right methods for the right scenarios
- **Order of Operations**: Process requests in the correct sequence
- **Resource Management**: Properly manage resources like streams

### DO:
- **Access only the data you need** from HttpContext
- **Use Items for temporary data sharing** during request processing
- **Check User.Identity.IsAuthenticated** before accessing user information
- **Use EnableBuffering only when you need multiple reads** of the request body
- **Read form data with ReadFormAsync** instead of Request.Form
- **Close and dispose streams** properly after use
- **Set appropriate status codes** for different scenarios
- **Use typed header properties** when available

### DON'T:
- **Store large objects in Items** (memory overhead)
- **Read the request body multiple times without buffering**
- **Access HttpContext from background threads** (it's request-scoped)
- **Forget to rewind the body** after buffering
- **Store sensitive data in HttpContext** without encryption
- **Use Request.Form** (use ReadFormAsync instead)
- **Ignore authentication status** before accessing user data
- **Assume headers exist** (check for null)

### Efficient Access:
```csharp:title=Efficient.cs
// DO: Access only what you need
var path = context.Request.Path;
var method = context.Request.Method;

// DON'T: Access everything unnecessarily
var allHeaders = context.Request.Headers;
var allQuery = context.Request.Query;
var allRouteValues = context.Request.RouteValues;
```

### Sensitive Data Handling:
```csharp:title=Sensitive.cs
// DO: Be careful with sensitive data
var token = context.Request.Headers.Authorization;
// Don't log this token

// DON'T: Log sensitive information
Console.WriteLine($"Token: {token}");  // BAD
```

### Proper Form Handling:
```csharp:title=Forms.cs
// DO: Use ReadFormAsync
var form = await context.Request.ReadFormAsync();
var email = form["email"];

// DON'T: Use Request.Form
var form = context.Request.Form;  // Can cause issues
```

### Background Thread Access:
```csharp:title=Background.cs
// DON'T: Access HttpContext from background threads
Task.Run(() =>
{
    var user = context.User;  // BAD - HttpContext may be disposed
});

// DO: Capture the data you need before background work
var userName = context.User.Identity?.Name;
Task.Run(() =>
{
    Console.WriteLine($"User: {userName}");  // OK - captured value
});
```

**How it works in practice**: Best practices ensure:
- **Performance**: Efficient use of HttpContext reduces overhead
- **Security**: Sensitive data is protected
- **Reliability**: Proper resource management prevents issues
- **Maintainability**: Code is clear and follows conventions
- **Correctness**: Right methods for right scenarios

Good practices make your use of HttpContext efficient, secure, and reliable.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Use HttpContext in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/use-http-context?view=aspnetcore-10.0)