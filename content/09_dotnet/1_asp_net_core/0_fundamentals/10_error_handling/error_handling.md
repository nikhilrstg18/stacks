---
title: "Error Handling"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/10_error_handling"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Error Handling Overview - Exception Management</summary>
  <div>

## Error Handling in ASP.NET Core

**Real-life analogy**: Error handling is like having a comprehensive emergency response system for a facility. When something goes wrong (fire, medical emergency, equipment failure), you have trained responders, clear procedures, and backup systems. The system prevents small issues from becoming disasters, protects people from harm, and ensures operations can continue or recover gracefully. ASP.NET Core error handling provides the same comprehensive system for applications - catching, logging, and responding to errors to prevent crashes and protect user experience.

**Technical explanation**: Error handling in ASP.NET Core involves catching and managing exceptions that occur during request processing. Instead of letting errors crash the application or expose sensitive information to users, error handling middleware catches exceptions and provides appropriate error responses. Different strategies are used for development (detailed error pages for debugging) versus production (user-friendly error pages for security). The middleware pipeline enables layered error handling - global handlers catch all exceptions, while specific handlers can handle particular error types.

**Key jargon explained**:
- **Exception**: An error condition that disrupts normal program flow
- **Middleware Pipeline**: Layered approach to error handling
- **Developer Exception Page**: Detailed error information for development
- **Exception Handler**: Custom error pages for production
- **IExceptionHandlerPathFeature**: Access to exception details in error handlers

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Environment-specific error handling
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();  // Detailed errors for development
}
else
{
    app.UseExceptionHandler("/Error");  // User-friendly errors for production
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

**How it works in practice**: Error handling middleware should be early in the pipeline to catch exceptions from later middleware. In development, UseDeveloperExceptionPage shows detailed error information including stack traces, query strings, headers, and cookies to aid debugging. In production, UseExceptionHandler redirects to a custom error page that shows user-friendly messages without exposing sensitive information. The exception handling middleware re-executes the request to the error path, allowing custom error pages to access exception details via IExceptionHandlerPathFeature.

**Key takeaways for interviews**:
- Error handling middleware should be early in the pipeline
- Development uses detailed error pages for debugging
- Production uses user-friendly error pages for security
- UseExceptionHandler re-executes request to error path
- IExceptionHandlerPathFeature provides access to exception details

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Developer Exception Page - Development Debugging</summary>
  <div>

## Developer Exception Page

**Real-life analogy**: The Developer Exception Page is like a detailed diagnostic report for mechanics. When a car breaks down, a mechanic needs detailed information - error codes, sensor readings, system states - to diagnose the problem. The Developer Exception Page provides the same level of detail for developers, showing stack traces, request details, headers, cookies, and other diagnostic information to help identify and fix issues quickly during development.

**Technical explanation**: The Developer Exception Page displays comprehensive information about unhandled request exceptions during development. It uses DeveloperExceptionPageMiddleware to capture synchronous and asynchronous exceptions from the HTTP pipeline. The page shows stack traces, query string parameters, cookies, headers, and endpoint metadata. It's enabled by default in the Development environment for apps created with current templates. The page supports both HTML and plain text responses based on Accept headers.

**Key jargon explained**:
- **DeveloperExceptionPageMiddleware**: Captures exceptions from HTTP pipeline
- **Development Environment**: Environment where detailed error information is safe
- **Stack Trace**: Sequence of method calls leading to the exception
- **Request Details**: Query strings, headers, cookies, endpoint metadata
- **HTML vs Plain Text**: Response format based on Accept header

```csharp:title=Development.cs
// Developer Exception Page is enabled by default in Development
// when using WebApplication.CreateBuilder

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Explicitly enable (optional with current templates)
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.MapGet("/", () => throw new InvalidOperationException("Test exception"));

app.Run();
```

```csharp:title=ManualEnable.cs
// For apps using older templates, manually enable
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
```

**How it works in practice**: The Developer Exception Page runs early in the middleware pipeline to catch exceptions from subsequent middleware. When an exception occurs, it generates a detailed HTML response showing the exception type, message, stack trace, and request details. The page includes tabs for different types of information (stack, query, cookies, headers) and supports both HTML and plain text responses. This comprehensive diagnostic information helps developers quickly identify and fix issues during development.

**Key takeaways for interviews**:
- Enabled by default in Development environment with current templates
- Shows stack traces, request details, headers, and cookies
- Runs early in middleware pipeline to catch all exceptions
- Supports both HTML and plain text responses
- Never enable in production (security risk)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Exception Handler - Production Error Pages</summary>
  <div>

## Exception Handler Page

**Real-life analogy**: The Exception Handler is like a customer service protocol for when things go wrong. Instead of showing customers the internal error logs (which would be confusing and potentially expose sensitive information), you provide a polite apology and explain that you're working on the issue. The Exception Handler does the same for production applications - shows user-friendly error pages while logging the technical details for developers to investigate.

**Technical explanation**: UseExceptionHandler configures custom error handling pages for the Production environment. This middleware catches and logs unhandled exceptions, then re-executes the request using an alternate pipeline (typically /Error). The re-executed request uses the original HTTP method, so error endpoints must support all methods or have separate handlers for different methods. IExceptionHandlerPathFeature provides access to the exception and original request path in the error handler.

**Key jargon explained**:
- **UseExceptionHandler**: Configures custom error handling middleware
- **Alternate Pipeline**: Re-executes request to error path
- **Re-execution**: Request is processed again with different path
- **IExceptionHandlerPathFeature**: Provides access to exception details
- **Anonymous Access**: Error pages should be accessible without authentication

```csharp:title=Production.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.MapRazorPages();

app.Run();
```

```csharp:title=ErrorPage.cs
// Pages/Error.cshtml.cs (Razor Pages)
public class ErrorModel : PageModel
{
    public string? RequestId { get; set; }
    public bool ShowRequestId { get; set; }

    public void OnGet()
    {
        RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
        ShowRequestId = !string.IsNullOrEmpty(RequestId);
    }
}
```

```csharp:title=AccessException.cs
public class ErrorModel : PageModel
{
    public string? ErrorMessage { get; set; }

    public void OnGet()
    {
        var exceptionFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
        if (exceptionFeature != null)
        {
            ErrorMessage = exceptionFeature.Error.Message;
            // Log the exception for developers
            // exceptionFeature.Error contains the full exception
        }
    }
}
```

**How it works in practice**: UseExceptionHandler catches unhandled exceptions and re-executes the request to the specified error path. The re-executed request maintains the original HTTP method, so GET errors go to GET handlers, POST errors to POST handlers. The error handler can access exception details via IExceptionHandlerPathFeature to log technical information while showing user-friendly messages. This approach separates user experience from technical troubleshooting, improving both security and maintainability.

**Key takeaways for interviews**:
- UseExceptionHandler configures custom error pages for production
- Re-executes request to error path with original HTTP method
- IExceptionHandlerPathFeature provides access to exception details
- Error pages should support anonymous access
- Separates user experience from technical troubleshooting

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Exception Handling Best Practices - Security and UX</summary>
  <div>

## Error Handling Best Practices

**Real-life analogy**: Following error handling best practices is like following safety protocols in industrial settings. You have clear procedures for different types of emergencies, you protect sensitive information, you ensure safety equipment is properly maintained, and you train people on correct responses. Error handling best practices follow the same principles - clear procedures, information security, proper logging, and user experience focus.

**Technical explanation**: Error handling best practices ensure applications are secure, maintainable, and provide good user experience. Key practices include environment-specific error handling (detailed in development, user-friendly in production), never exposing sensitive information to users, logging all exceptions for troubleshooting, using structured logging for analysis, implementing proper HTTP status codes, and ensuring error pages are accessible without authentication.

**Key jargon explained**:
- **Environment-Specific**: Different error handling for dev vs production
- **Information Security**: Preventing exposure of sensitive data
- **Structured Logging**: Consistent format for log analysis
- **HTTP Status Codes**: Appropriate status codes for different error types
- **Anonymous Access**: Error pages accessible without authentication

### DO:
- Use environment-specific error handling (development vs production)
- Log all exceptions with sufficient context for troubleshooting
- Show user-friendly error messages in production
- Use appropriate HTTP status codes for different error types
- Ensure error pages support anonymous access
- Implement structured logging for log analysis

### DON'T:
- Enable Developer Exception Page in production
- Expose sensitive information (stack traces, connection strings) to users
- Return generic error messages that don't help users understand issues
- Forget to log exceptions for troubleshooting
- Require authentication for error pages
- Use error handling to hide bugs instead of fixing them

```csharp:title=GoodExample.cs
// GOOD: Environment-specific error handling
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// GOOD: Proper logging
app.UseExceptionHandler("/Error");
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred processing request {Path}", context.Request.Path);
        throw;
    }
});
```

**How it works in practice**: Following these practices ensures applications are secure (no sensitive data exposure), maintainable (comprehensive logging for troubleshooting), and user-friendly (clear error messages). Environment-specific configuration balances development needs (detailed debugging information) with production security (user-friendly error pages). Structured logging enables log analysis and monitoring. Proper HTTP status codes help clients understand error types and handle them appropriately.

**Key takeaways for interviews**:
- Environment-specific error handling is critical
- Never expose sensitive information in production
- Log all exceptions with sufficient context
- Use appropriate HTTP status codes
- Ensure error pages are accessible without authentication

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

**Real-life analogy**: Interview preparation for error handling concepts is like understanding emergency response procedures. You need to understand how to detect issues, respond appropriately, protect sensitive information, ensure user safety, and learn from incidents to prevent future problems.

**Common interview questions**:
1. **How does error handling work in ASP.NET Core?**
   - Error handling middleware catches exceptions from the pipeline
   - Different strategies for development vs production
   - Developer Exception Page for detailed debugging information
   - UseExceptionHandler for custom error pages in production

2. **What is the Developer Exception Page and when should it be used?**
   - Detailed error information for development debugging
   - Shows stack traces, request details, headers, cookies
   - Enabled by default in Development environment
   - Never enable in production (security risk)

3. **How does UseExceptionHandler work?**
   - Catches unhandled exceptions in production
   - Re-executes request to error path with original HTTP method
   - IExceptionHandlerPathFeature provides access to exception details
   - Enables custom error pages while logging technical information

4. **What are error handling best practices?**
   - Environment-specific error handling (dev vs production)
   - Never expose sensitive information to users
   - Log all exceptions with sufficient context
   - Use appropriate HTTP status codes
   - Ensure error pages support anonymous access

5. **How do you access exception details in error handlers?**
   - Use IExceptionHandlerPathFeature to access exception
   - Exception property contains the full exception object
   - Path property contains the original request path
   - Log technical details while showing user-friendly messages

**Key interview concepts**:
- **Middleware Pipeline**: Layered approach to error handling
- **Environment-Specific**: Different strategies for dev vs production
- **Security**: Preventing exposure of sensitive information
- **Logging**: Comprehensive exception logging for troubleshooting
- **User Experience**: User-friendly error messages in production

**How to approach interview questions**:
- Start with clear definition of error handling architecture
- Explain environment-specific strategies and security considerations
- Discuss Developer Exception Page vs UseExceptionHandler
- Address logging and monitoring for troubleshooting
- Mention security best practices and user experience considerations

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Handle errors in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/error-handling?view=aspnetcore-10.0)