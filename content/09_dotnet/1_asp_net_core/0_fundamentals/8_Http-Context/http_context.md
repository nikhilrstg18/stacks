---
title: "HTTP Context"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/8_Http-Context"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>HttpContext Overview - Complete Request/Response Information</summary>
  <div>

## HttpContext in ASP.NET Core

**Real-life analogy**: HttpContext is like a complete dossier on a specific visitor or transaction. When a customer arrives at a business, you create a file containing everything about them - who they are (user), what they want (request), what they're allowed to do (authorization), and what you should give them (response). This dossier travels through different departments (middleware) with everyone adding or reading information. HttpContext provides the same comprehensive information package for HTTP requests, accessible throughout the request pipeline.

**Technical explanation**: HttpContext encapsulates all information about an individual HTTP request and response. It's initialized when an HTTP request is received and provides access to HttpRequest (incoming request details), HttpResponse (outgoing response details), User (authenticated user information), and other HTTP-related data. HttpContext is accessible by middleware, controllers, Razor Pages, SignalR, gRPC, and other frameworks. It serves as the central hub for request/response information throughout the application.

**Key jargon explained**:
- **HttpContext**: Central object containing all HTTP request/response information
- **HttpRequest**: Information about the incoming HTTP request
- **HttpResponse**: Information about the outgoing HTTP response
- **User**: Information about the authenticated user
- **Items**: Key-value collection for sharing data between middleware

```csharp:title=Program.cs
app.MapGet("/", (HttpContext context) =>
{
    var method = context.Request.Method;
    var path = context.Request.Path;
    var userAgent = context.Request.Headers.UserAgent;
    
    return $"Method: {method}, Path: {path}, User-Agent: {userAgent}";
});
```

```csharp:title=RequestResponse.cs
app.MapPost("/api/data", (HttpContext context) =>
{
    // Access request information
    var body = context.Request.Body;
    var contentType = context.Request.ContentType;
    var queryParam = context.Request.Query["filter"];
    
    // Set response information
    context.Response.StatusCode = 200;
    context.Response.ContentType = "application/json";
    
    return Results.Ok(new { message = "Data processed" });
});
```

**How it works in practice**: HttpContext is created when the HTTP request arrives and flows through the middleware pipeline. Each middleware component can read from and write to the HttpContext, modifying the request, adding response data, or sharing information via the Items collection. The HttpRequest property provides access to method, path, headers, query string, body, and other request details. The HttpResponse property allows setting status code, headers, and writing response body. The User property provides authentication information.

**Key takeaways for interviews**:
- HttpContext contains all HTTP request/response information
- Accessible throughout the middleware pipeline and frameworks
- HttpRequest provides incoming request details
- HttpResponse enables response configuration
- Items collection enables data sharing between middleware

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HttpRequest - Incoming Request Details</summary>
  <div>

## HttpRequest

**Real-life analogy**: HttpRequest is like the detailed order form that a customer submits. It contains everything about their request - what they want (method), where they want it delivered (path), special instructions (headers), additional requirements (query string), and the actual content (body). Different departments (middleware) can read and modify this form to add information or change delivery instructions before the order is processed.

**Technical explanation**: HttpRequest provides access to all information about the incoming HTTP request. It includes the HTTP method (GET, POST, etc.), request path, headers, query string, route values, form data, and request body. HttpRequest is not read-only - middleware can modify request values in the pipeline. Common properties include Path, Method, Headers, RouteValues, Query, and Body. EnableBuffering allows multiple reads of the request body when needed.

**Key jargon explained**:
- **HttpRequest**: Information about the incoming HTTP request
- **HTTP Method**: GET, POST, PUT, DELETE, etc.
- **Headers**: Key-value pairs sent with the request
- **Query String**: URL parameters after the ?
- **Request Body**: Content payload (JSON, form data, etc.)

```csharp:title=RequestProperties.cs
app.MapGet("/", (HttpRequest request) =>
{
    var method = request.Method;           // GET, POST, etc.
    var path = request.Path;               // /api/users
    var headers = request.Headers;         // Request headers
    var userAgent = headers.UserAgent;     // Browser information
    var query = request.Query["filter"];  // Query string parameter
    var routeValues = request.RouteValues; // Route parameters
    
    return $"Method: {method}, Path: {path}";
});
```

```csharp:title=Headers.cs
app.MapGet("/headers", (HttpRequest request) =>
{
    var userAgent = request.Headers.UserAgent;
    var customHeader = request.Headers["x-custom-header"];
    var accept = request.Headers.Accept;
    
    return new { userAgent, customHeader, accept };
});
```

```csharp:title=Body.cs
app.MapPost("/upload", async (HttpRequest request) =>
{
    using var reader = new StreamReader(request.Body);
    var body = await reader.ReadToEndAsync();
    
    return $"Received body: {body}";
});
```

```csharp:title=Buffering.cs
// Enable multiple reads of request body
app.Use(async (context, next) =>
{
    context.Request.EnableBuffering();
    // Read body
    var body = await new StreamReader(context.Request.Body).ReadToEndAsync();
    // Reset position for next middleware
    context.Request.Body.Position = 0;
    await next();
});
```

**How it works in practice**: HttpRequest provides comprehensive access to request details. Headers can be accessed via the indexer or typed properties. The query string is parsed into a collection for easy parameter access. Route values are populated by the routing system. The request body is a stream that can be read once by default, but EnableBuffering allows multiple reads. Middleware can modify request properties to influence downstream processing.

**Key takeaways for interviews**:
- HttpRequest provides comprehensive request information
- Headers, query string, route values, body all accessible
- EnableBuffering allows multiple reads of request body
- Middleware can modify request properties
- Body is a stream that can only be read once by default

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>HttpResponse - Outgoing Response Configuration</summary>
  <div>

## HttpResponse

**Real-life analogy**: HttpResponse is like the delivery confirmation and response package that a business prepares after processing a customer's request. It contains the result status (success/failure), delivery details (headers), and the actual content (body) being returned. Different departments can add information to this response package before it's sent back to the customer.

**Technical explanation**: HttpResponse provides access to configure the HTTP response that will be sent back to the client. It includes the HTTP status code, response headers, and response body. You can set the status code to indicate success (200), not found (404), error (500), etc. Headers can be added to provide metadata, caching instructions, or other response information. The response body can be written directly or using helper methods like WriteAsync and WriteAsJsonAsync.

**Key jargon explained**:
- **HttpResponse**: Configuration for the outgoing HTTP response
- **Status Code**: HTTP status indicating request result
- **Response Headers**: Metadata sent with the response
- **Response Body**: Content being returned to the client
- **Content-Type**: Header indicating response content format

```csharp:title=ResponseConfiguration.cs
app.MapGet("/data", (HttpContext context) =>
{
    // Set status code
    context.Response.StatusCode = 200;
    
    // Set content type
    context.Response.ContentType = "application/json";
    
    // Write response body
    return context.Response.WriteAsJsonAsync(new { message = "Success" });
});
```

```csharp:title=StatusCode.cs
app.MapGet("/notfound", (HttpContext context) =>
{
    context.Response.StatusCode = 404;
    return context.Response.WriteAsync("Resource not found");
});

app.MapGet("/error", (HttpContext context) =>
{
    context.Response.StatusCode = 500;
    return context.Response.WriteAsync("Internal server error");
});
```

```csharp:title=Headers.cs
app.MapGet("/custom", (HttpContext context) =>
{
    context.Response.Headers.Append("x-custom-header", "CustomValue");
    context.Response.Headers.CacheControl = "no-cache";
    
    return "Response with custom headers";
});
```

```csharp:title=Body.cs
app.MapGet("/text", (HttpContext context) =>
{
    context.Response.ContentType = "text/plain";
    return context.Response.WriteAsync("Plain text response");
});
```

**How it works in practice**: HttpResponse allows complete control over the HTTP response. Status codes indicate the result of request processing (2xx for success, 3xx for redirection, 4xx for client errors, 5xx for server errors). Headers provide metadata about the response. The response body can be written as text, JSON, HTML, or any content type. Middleware can modify the response before it's sent to the client, enabling cross-cutting concerns like compression, caching, and security headers.

**Key takeaways for interviews**:
- HttpResponse configures the HTTP response sent to client
- Status codes indicate request processing result
- Headers provide response metadata
- Response body can be written in various formats
- Middleware can modify response before sending

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

**Real-life analogy**: Interview preparation for HttpContext concepts is like understanding complete customer relationship management. You need to understand how to capture all customer information, process requests, prepare appropriate responses, and share information across different departments while maintaining security and efficiency.

**Common interview questions**:
1. **What is HttpContext and when is it used?**
   - Central object containing all HTTP request/response information
   - Accessible throughout middleware pipeline and frameworks
   - Provides HttpRequest, HttpResponse, User, and Items
   - Enables data sharing between middleware components

2. **What information does HttpRequest provide?**
   - HTTP method (GET, POST, etc.)
   - Request path and URL details
   - Headers, query string, route values
   - Request body (form data, JSON, etc.)
   - Can be modified by middleware

3. **How do you configure the HttpResponse?**
   - Set HTTP status code (200, 404, 500, etc.)
   - Add response headers for metadata
   - Write response body in various formats
   - Set content type header
   - Middleware can modify response before sending

4. **What is the Items collection used for?**
   - Key-value collection for sharing data between middleware
   - Enables passing data through the pipeline
   - Useful for request-scoped data sharing
   - Data is available throughout the request lifecycle

5. **How do you handle request body reading?**
   - Request.Body is a stream that can be read once by default
   - EnableBuffering allows multiple reads of request body
   - ReadFormAsync for form data
   - Stream reading for JSON and other content
   - Must reset position after reading if needed by downstream middleware

**Key interview concepts**:
- **Central Hub**: HttpContext as central request/response information
- **Request Details**: HttpRequest provides comprehensive request information
- **Response Configuration**: HttpResponse enables complete response control
- **Data Sharing**: Items collection enables middleware communication
- **Body Handling**: Stream-based request body reading with buffering options

**How to approach interview questions**:
- Start with clear definition of HttpContext architecture
- Explain HttpRequest and HttpResponse properties and usage
- Discuss Items collection for data sharing
- Address request body handling and buffering
- Mention accessibility across different frameworks and middleware

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Use HttpContext in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/use-http-context?view=aspnetcore-10.0)