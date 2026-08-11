---
title: "Error Handling"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/10_error_handling"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Error Handling - Like having a backup plan</summary>
  <div>

## What is Error Handling?

**Real-life analogy**: Error handling is like having a backup plan when things go wrong. If you're cooking and burn the food, you have a backup plan (order delivery). If your car breaks down, you have a backup plan (call a tow truck). Error handling in apps is the same - it's your backup plan when something unexpected happens, so the app doesn't just crash.

**Technical explanation**: Error handling in ASP.NET Core involves catching and managing exceptions that occur during request processing. Instead of letting errors crash the application or expose sensitive information to users, error handling middleware catches exceptions and provides appropriate error responses.

**Key jargon explained**:
- **Exception**: An error that occurs during program execution
- **Error Handling**: The process of catching and managing exceptions
- **Middleware**: Software components that process requests in a pipeline
- **Developer Exception Page**: Detailed error page for development
- **Exception Handler**: Middleware that catches and handles exceptions

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.MapGet("/", () => "Hello World!");

app.Run();
```

**How it works in practice**: Error handling provides:
- **Graceful Degradation**: App continues running even when errors occur
- **User-Friendly Messages**: Users see helpful error messages instead of technical details
- **Security**: Sensitive information is not exposed to users
- **Debugging Tools**: Detailed error information in development
- **Logging**: Errors are logged for investigation

Error handling ensures your app is robust and user-friendly even when things go wrong.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Developer Exception Page - Like a detailed diagnostic tool</summary>
  <div>

## Developer Exception Page

**Real-life analogy**: The Developer Exception Page is like a detailed diagnostic tool for mechanics. When a car breaks down, a mechanic uses diagnostic tools to see exactly what went wrong - which part failed, why it failed, and what the conditions were. The Developer Exception Page does the same for your app, showing detailed information about errors.

**Technical explanation**: The Developer Exception Page displays detailed information about unhandled request exceptions. It captures synchronous and asynchronous exceptions from the HTTP pipeline and generates error responses with stack traces, query string parameters, cookies, headers, and endpoint metadata.

**Key jargon explained**:
- **Developer Exception Page**: Detailed error page for development
- **Stack Trace**: The sequence of function calls that led to the error
- **Query String**: URL parameters sent with the request
- **Headers**: HTTP headers sent with the request
- **Development Environment**: The environment where the app is being developed

### Automatic in Development:
```csharp:title=Automatic.cs
// Developer Exception Page is automatically enabled in Development
// when using WebApplication.CreateBuilder

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Developer Exception Page is active in Development
app.MapGet("/error", () => throw new Exception("Test error"));

app.Run();
```

### Manual Enable:
```csharp:title=Manual.cs
// For apps using older templates, enable manually
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Information Displayed:
```csharp:title=Information.cs
// The Developer Exception Page shows:
// - Stack trace (where the error occurred)
// - Query string parameters
// - Cookies
// - Headers
// - Endpoint metadata
// - Request body (if applicable)
```

### Plain Text Response:
```csharp:title=PlainText.cs
// If the request has Accept: text/plain header
// the response is plain text instead of HTML

// Example request:
curl -H "Accept: text/plain" http://localhost:5000/error

// Response:
Status: 500 Internal Server Error
Time: 9.39 ms
System.InvalidOperationException: Sample Exception
   at WebApplicationMinimal.Program.<>c.<Main>b__0_0()
```

### Security Warning:
```csharp:title=Security.cs
// WARNING: Never enable Developer Exception Page in Production
// It exposes sensitive information like:
// - Stack traces
// - Internal code paths
// - Configuration details
// - Potentially sensitive data

// Always disable it in Production
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");  // Production error handling
}
```

**How it works in practice**: The Developer Exception Page provides:
- **Detailed Information**: Complete error details for debugging
- **Automatic Activation**: Works automatically in Development environment
- **Multiple Tabs**: Organizes information in tabs for easy viewing
- **Request Context**: Shows request information that led to the error
- **Development Only**: Should never be used in Production

The Developer Exception Page is an invaluable tool for debugging during development.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Exception Handler Page - Like a friendly error message</summary>
  <div>

## Exception Handler Page

**Real-life analogy**: The Exception Handler Page is like a friendly error message you show users. When something goes wrong, instead of showing them a scary technical error message (which might confuse or worry them), you show a friendly message like "Something went wrong, please try again later." This keeps users informed without exposing technical details.

**Technical explanation**: The Exception Handler Page is a custom error page for the Production environment. UseExceptionHandler middleware catches unhandled exceptions, logs them, and re-executes the request to a custom error page. This provides a user-friendly error response without exposing sensitive information.

**Key jargon explained**:
- **Exception Handler Page**: Custom error page for Production
- **UseExceptionHandler**: Middleware that catches and handles exceptions
- **Re-execution**: Running the request again with a different path
- **Production Environment**: The live environment where users access the app
- **User-Friendly**: Error messages that are clear and helpful to users

### Basic Setup:
```csharp:title=Basic.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Custom Error Page:
```csharp:title=Custom.cs
// Add an error endpoint
app.MapGet("/Error", () => "Something went wrong. Please try again later.");

// Configure exception handler
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
```

### Access the Exception:
```csharp:title=AccessException.cs
// Access the exception in your error handler
app.MapGet("/Error", (HttpContext context) =>
{
    var exceptionFeature = context.Features.Get<IExceptionHandlerPathFeature>();
    var exception = exceptionFeature?.Error;
    
    return $"Error: {exception?.Message}";
});

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
```

### Environment-Specific:
```csharp:title=Environment.cs
// Development: Use Developer Exception Page
// Production: Use Exception Handler Page

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();  // Detailed errors
}
else
{
    app.UseExceptionHandler("/Error");  // User-friendly errors
    app.UseHsts();  // Security
}

app.MapGet("/", () => "Hello World!");
app.MapGet("/Error", () => "Something went wrong.");

app.Run();
```

### Log Exceptions:
```csharp:title=Logging.cs
// Exception handler automatically logs exceptions
// You can add additional logging

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.MapGet("/Error", (HttpContext context) =>
{
    var exceptionFeature = context.Features.Get<IExceptionHandlerPathFeature>();
    var exception = exceptionFeature?.Error;
    
    // Log the exception
    logger.LogError(exception, "An error occurred");
    
    return "Something went wrong.";
});
```

**How it works in practice**: The Exception Handler Page provides:
- **User-Friendly Errors**: Clear, helpful error messages for users
- **Security**: No sensitive information exposed to users
- **Automatic Logging**: Exceptions are automatically logged
- **Customization**: You can customize the error page as needed
- **Production Ready**: Safe to use in production environments

The Exception Handler Page ensures users see helpful error messages without exposing sensitive details.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Status Code Pages - Like custom "not found" signs</summary>
  <div>

## Status Code Pages

**Real-life analogy**: Status Code Pages are like custom signs for different situations. Instead of a generic "closed" sign, you might have "out for lunch," "on vacation," or "moved to new location." Each sign gives specific information about the situation. Status code pages do the same - custom pages for different HTTP status codes.

**Technical explanation**: Status Code Pages provide custom error pages for specific HTTP status codes like 404 (Not Found) or 500 (Internal Server Error). UseStatusCodePages middleware intercepts responses with specific status codes and serves custom pages instead of the default browser error pages.

**Key jargon explained**:
- **Status Code Pages**: Custom pages for specific HTTP status codes
- **UseStatusCodePages**: Middleware that handles status code pages
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server error occurred
- **Custom Pages**: Your own HTML pages for errors

### Basic Setup:
```csharp:title=Basic.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStatusCodePages();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Custom 404 Page:
```csharp:title=Custom404.cs
// Redirect to custom 404 page
app.UseStatusCodePages(async context =>
{
    if (context.Response.StatusCode == 404)
    {
        context.Response.Redirect("/404");
    }
});

app.MapGet("/404", () => "Page not found");
```

### UseStatusCodePagesWithRedirects:
```csharp:title=Redirects.cs
// Redirect to custom pages
app.UseStatusCodePagesWithRedirects("/error/{0}");

// {0} is replaced with the status code
// 404 → /error/404
// 500 → /error/500
```

### UseStatusCodePagesWithReExecute:
```csharp:title=ReExecute.cs
// Re-execute with a different path
app.UseStatusCodePagesWithReExecute("/error/{0}");

// Keeps the original URL, executes a different endpoint
app.MapGet("/error/{code:int}", (int code) => $"Error {code}");
```

### Specific Status Codes:
```csharp:title=Specific.cs
// Handle specific status codes
app.UseStatusCodePages(options =>
{
    options.HandleStatusCode = (statusCode, context) =>
    {
        if (statusCode == 404)
        {
            context.Response.Redirect("/404");
        }
        else if (statusCode == 500)
        {
            context.Response.Redirect("/500");
        }
        return true;
    };
});
```

### Complete Setup:
```csharp:title=Complete.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStatusCodePagesWithReExecute("/error/{0}");

app.MapGet("/", () => "Hello World!");
app.MapGet("/error/{code:int}", (int code) => $"Error {code}");

app.Run();
```

**How it works in practice**: Status Code Pages provide:
- **Custom Error Pages**: Custom pages for different error situations
- **Better UX**: Users see helpful, branded error pages
- **SEO Benefits**: Custom 404 pages can help with SEO
- **Branding**: Error pages match your app's design
- **User Guidance**: Help users navigate back to working pages

Status Code Pages improve the user experience when errors occur.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Try-Catch Blocks - Like safety nets</summary>
  <div>

## Try-Catch Blocks

**Real-life analogy**: Try-catch blocks are like safety nets. When you're doing something risky (like walking a tightrope), you set up a safety net below. If you fall, the net catches you instead of letting you hit the ground. In code, try-catch blocks catch exceptions so your app doesn't crash when something goes wrong.

**Technical explanation**: Try-catch blocks allow you to handle exceptions locally in your code. The try block contains code that might throw an exception. If an exception occurs, the catch block handles it. This allows you to recover from errors or provide specific error handling for different scenarios.

**Key jargon explained**:
- **Try Block**: Code that might throw an exception
- **Catch Block**: Code that handles the exception
- **Finally Block**: Code that runs regardless of whether an exception occurred
- **Exception Type**: The specific type of exception being caught
- **Local Handling**: Handling exceptions where they occur in code

### Basic Try-Catch:
```csharp:title=Basic.cs
app.MapGet("/divide", (int a, int b) =>
{
    try
    {
        var result = a / b;
        return $"Result: {result}";
    }
    catch (DivideByZeroException)
    {
        return "Error: Cannot divide by zero";
    }
});
```

### Multiple Catch Blocks:
```csharp:title=Multiple.cs
app.MapGet("/process", (string input) =>
{
    try
    {
        var number = int.Parse(input);
        return $"Number: {number}";
    }
    catch (FormatException)
    {
        return "Error: Input must be a number";
    }
    catch (OverflowException)
    {
        return "Error: Number is too large";
    }
    catch (Exception ex)
    {
        return $"Error: {ex.Message}";
    }
});
```

### Finally Block:
```csharp:title=Finally.cs
app.MapPost("/upload", async (HttpContext context) =>
{
    var fileStream = File.OpenRead("data.txt");
    try
    {
        await fileStream.CopyToAsync(context.Response.Body);
    }
    finally
    {
        fileStream.Close();  // Always runs
    }
});
```

### Throw Custom Exception:
```csharp:title=Custom.cs
app.MapGet("/validate", (int age) =>
{
    try
    {
        if (age < 0)
        {
            throw new ArgumentException("Age cannot be negative");
        }
        return $"Age: {age}";
    }
    catch (ArgumentException ex)
    {
        return $"Validation error: {ex.Message}";
    }
});
```

### Re-throw Exception:
```csharp:title=Rethrow.cs
app.MapGet("/process", (string input) =>
{
    try
    {
        var result = ProcessData(input);
        return $"Result: {result}";
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error processing data");
        throw;  // Re-throw for global exception handler
    }
});
```

### When to Use Try-Catch:
```csharp:title=WhenToUse.cs
// Use try-catch when:
// - You can handle the exception locally
// - You need to clean up resources
// - You want to provide specific error handling
// - You need to log the exception

// Don't use try-catch when:
// - You can't meaningfully handle the exception
// - You're just logging and re-throwing (use global handler instead)
// - The exception indicates a bug that should be fixed
```

**How it works in practice**: Try-catch blocks provide:
- **Local Error Handling**: Handle exceptions where they occur
- **Specific Responses**: Different handling for different exception types
- **Resource Cleanup**: Ensure resources are cleaned up with finally blocks
- **Custom Error Messages**: Provide specific error messages for different scenarios
- **Graceful Recovery**: Continue processing after handling the exception

Try-catch blocks give you fine-grained control over error handling in your code.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Exception Filters - Like error handling rules</summary>
  <div>

## Exception Filters

**Real-life analogy**: Exception filters are like error handling rules that apply to specific areas. You might have a rule that "if there's a problem in the kitchen, call the chef" and "if there's a problem in the dining room, call the manager." Exception filters work the same way - they apply specific error handling to specific parts of your app.

**Technical explanation**: Exception filters are attributes or middleware that can catch and handle exceptions for specific controllers, actions, or entire applications. They provide a way to apply consistent error handling across multiple endpoints without repeating code.

**Key jargon explained**:
- **Exception Filter**: A filter that catches and handles exceptions
- **Controller-Level**: Filter applied to an entire controller
- **Action-Level**: Filter applied to a specific action
- **Global Filter**: Filter applied to the entire application
- **IExceptionFilter**: Interface for implementing custom exception filters

### Controller-Level Filter:
```csharp:title=Controller.cs
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<User> GetUser(int id)
    {
        var user = GetUserById(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }
}
```

### Custom Exception Filter:
```csharp:title=Custom.cs
public class CustomExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is NotFoundException)
        {
            context.Result = new NotFoundResult();
            context.ExceptionHandled = true;
        }
    }
}

// Register the filter
builder.Services.AddControllers(options =>
{
    options.Filters.Add<CustomExceptionFilter>();
});
```

### Action-Level Filter:
```csharp:title=Action.cs
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Product> GetProduct(int id)
    {
        var product = GetProductById(id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }
}
```

### Global Exception Filter:
```csharp:title=Global.cs
// Add global exception filter
builder.Services.AddControllers(options =>
{
    options.Filters.Add<GlobalExceptionFilter>();
});

public class GlobalExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        // Handle all exceptions globally
        logger.LogError(context.Exception, "Global exception");
        
        context.Result = new ObjectResult(new
        {
            Error = "An error occurred",
            Message = context.Exception.Message
        })
        {
            StatusCode = 500
        };
        
        context.ExceptionHandled = true;
    }
}
```

### Minimal API Exception Handler:
```csharp:title=Minimal.cs
// For Minimal APIs, use exception handler middleware
app.UseExceptionHandler(exceptionHandlerApp =>
{
    exceptionHandlerApp.Run(async context =>
    {
        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
        
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new
        {
            Error = "An error occurred",
            Message = exception?.Message
        });
    });
});
```

**How it works in practice**: Exception filters provide:
- **Consistent Handling**: Apply the same error handling across multiple endpoints
- **Separation of Concerns**: Keep error handling logic separate from business logic
- **Reusability**: Use the same filter in multiple places
- **Centralized Management**: Update error handling in one place
- **Flexibility**: Apply at controller, action, or global level

Exception filters provide a clean way to apply consistent error handling across your application.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following safety procedures</summary>
  <div>

## Error Handling Best Practices

**Real-life analogy**: Following error handling best practices is like following safety procedures. You should have a plan for emergencies (error handling), practice the plan (test your error handling), keep people informed (log errors), and learn from mistakes (monitor and improve). Good procedures ensure you're prepared when something goes wrong.

**Technical explanation**: Following best practices ensures your error handling is effective, secure, and user-friendly. This includes using the right tools for the right environment, logging errors for investigation, providing user-friendly messages, and continuously improving based on error patterns.

**Key jargon explained**:
- **Environment-Specific**: Different error handling for Development vs Production
- **Logging**: Recording errors for investigation
- **User-Friendly**: Error messages that are clear and helpful to users
- **Security**: Not exposing sensitive information to users
- **Monitoring**: Tracking error patterns and frequencies

### DO:
- **Use Developer Exception Page** in Development for detailed error information
- **Use Exception Handler Page** in Production for user-friendly errors
- **Log all exceptions** for investigation and monitoring
- **Provide user-friendly error messages** that explain what happened
- **Use try-catch blocks** for local error handling when appropriate
- **Handle specific exceptions** differently when it makes sense
- **Monitor error rates** and patterns to identify issues
- **Test your error handling** to ensure it works as expected

### DON'T:
- **Enable Developer Exception Page** in Production (security risk)
- **Expose sensitive information** in error messages (stack traces, secrets)
- **Catch all exceptions** globally without logging (you lose information)
- **Ignore exceptions** without handling them (they should be logged or handled)
- **Show technical error messages** to end users (they're confusing)
- **Forget to test error handling** (it might not work when needed)
- **Use try-catch** when you can't meaningfully handle the exception
- **Assume exceptions won't happen** (they always will eventually)

### Environment-Specific Setup:
```csharp:title=Environment.cs
// Development: Detailed errors for debugging
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}
else
{
    // Production: User-friendly errors
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
```

### Logging Exceptions:
```csharp:title=Logging.cs
// Always log exceptions
try
{
    // Risky operation
}
catch (Exception ex)
{
    logger.LogError(ex, "Operation failed");
    throw;  // Re-throw for global handler
}

// Global handler also logs
app.UseExceptionHandler(exceptionHandlerApp =>
{
    exceptionHandlerApp.Run(async context =>
    {
        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
        logger.LogError(exception, "Unhandled exception");
        // ... error response
    });
});
```

### User-Friendly Messages:
```csharp:title=UserFriendly.cs
// DO: User-friendly messages
"Something went wrong. Please try again later."
"We couldn't find what you're looking for."
"Please check your input and try again."

// DON'T: Technical error messages
"System.NullReferenceException at line 42"
"Database connection failed: timeout after 30s"
"Invalid JSON format: missing closing brace"
```

### Security:
```csharp:title=Security.cs
// DO: Protect sensitive information
// - Don't show stack traces in Production
// - Don't expose connection strings
// - Don't show internal paths
// - Don't reveal configuration details

// DON'T: Expose sensitive data
app.UseDeveloperExceptionPage();  // BAD in Production
return ex.StackTrace;  // BAD - exposes internal code
return connectionString;  // BAD - exposes secrets
```

**How it works in practice**: Best practices ensure:
- **Security**: Sensitive information is protected
- **User Experience**: Users see helpful, clear error messages
- **Debugging**: Developers have detailed information in Development
- **Monitoring**: Errors are logged and tracked
- **Reliability**: Error handling is tested and reliable

Good error handling practices make your application more robust and user-friendly.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Handle errors in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/error-handling?view=aspnetcore-10.0)