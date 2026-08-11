---
title: "Error Handling"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/2_error_handling"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Error Handling Overview - Exception Management</summary>
  <div>

## Handle Errors in ASP.NET Core APIs

**Real-life analogy**: Error handling in APIs is like having a professional customer service team. When something goes wrong, the team provides clear, helpful information to customers instead of exposing internal problems. In development, they provide detailed diagnostic information for troubleshooting. In production, they provide polite, generic responses that protect internal systems while still being helpful. ASP.NET Core error handling provides the same professional approach - detailed errors in development, safe errors in production.

**Technical explanation**: ASP.NET Core provides multiple error handling mechanisms. Developer Exception Page displays detailed exception information in Development environment. Exception Handler middleware catches unhandled exceptions in non-development environments and produces error payloads. Problem Details (RFC 7807) provides standardized error response format. UseDeveloperExceptionPage enables detailed error page in Development. UseExceptionHandler configures exception handling middleware for production. Results.Problem generates RFC 7807-compliant error responses.

**Key jargon explained**:
- **Developer Exception Page**: Detailed error information in Development
- **Exception Handler Middleware**: Catches unhandled exceptions in production
- **Problem Details**: RFC 7807 standardized error format
- **UseDeveloperExceptionPage**: Enables detailed error page
- **UseExceptionHandler**: Configures exception handling middleware

```csharp:title=MinimalAPI.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseExceptionHandler(exceptionHandlerApp 
    => exceptionHandlerApp.Run(async context 
        => await Results.Problem()
                     .ExecuteAsync(context)));

app.MapGet("/exception", () => 
{
    throw new InvalidOperationException("Sample Exception");
});

app.MapGet("/", () => "Test by calling /exception");

app.Run();
```

```csharp:title=ControllerAPI.cs
var app = builder.Build();

app.UseHttpsRedirection();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
}

app.UseAuthorization();

app.MapControllers();

app.Run();

[Route("/error")]
public IActionResult HandleError() =>
    Problem();
```

**How it works in practice**: In Development, Developer Exception Page runs early in middleware pipeline to capture exceptions and display detailed information (stack trace, query string, cookies, headers). In production, Exception Handler middleware catches unhandled exceptions and produces error payloads. Problem Details provides standardized error format with type, title, status, detail, and instance properties. This separation ensures developers get diagnostic information while production users get safe, helpful error responses.

**Key takeaways for interviews**:
- Developer Exception Page for detailed errors in Development
- Exception Handler middleware for production error handling
- Problem Details (RFC 7807) for standardized error format
- UseDeveloperExceptionPage and UseExceptionHandler configuration
- Separate error handling for Development vs Production

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Problem Details - Standardized Error Format</summary>
  <div>

## Problem Details (RFC 7807)

**Real-life analogy**: Problem Details is like having a standardized error report form across all departments. Instead of each department using different error formats, everyone uses the same structured form with consistent fields (error type, title, status, details). This enables consistent error handling across systems and easier integration. Problem Details provides the same standardization for API errors - consistent format across all endpoints and services.

**Technical explanation**: Problem Details (RFC 7807) is a standardized format for machine-readable error details in HTTP API responses. It includes properties like type (URI identifying error type), title (human-readable summary), status (HTTP status code), detail (human-readable explanation), and instance (URI identifying specific occurrence). ASP.NET Core's Results.Problem generates RFC 7807-compliant responses. This standardization enables consistent error handling across APIs and services.

**Key jargon explained**:
- **RFC 7807**: IETF standard for problem details
- **Type**: URI identifying error type
- **Title**: Human-readable error summary
- **Status**: HTTP status code
- **Detail**: Human-readable error explanation

```csharp:title=ProblemDetails.cs
app.UseExceptionHandler(exceptionHandlerApp 
    => exceptionHandlerApp.Run(async context 
        => await Results.Problem()
                     .ExecuteAsync(context)));
```

```json:title=ErrorResponse.json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404,
  "detail": "Resource not found",
  "instance": "/api/items/123"
}
```

**How it works in practice**: Results.Problem generates RFC 7807-compliant error responses with default or custom properties. The type property provides a URI identifying the error type (often linking to documentation). Title provides a human-readable summary. Status is the HTTP status code. Detail provides additional explanation. Instance identifies the specific occurrence. This standardization enables clients to parse errors consistently and provides documentation links for error resolution.

**Key takeaways for interviews**:
- RFC 7807 standard for machine-readable error details
- Properties: type, title, status, detail, instance
- Results.Problem generates compliant responses
- Enables consistent error handling across APIs
- Provides documentation links for error resolution

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

**Real-life analogy**: Interview preparation for error handling concepts is like understanding customer service protocols. You need to understand how to provide different levels of information based on context, how to standardize error reporting, and how to balance helpfulness with security.

**Common interview questions**:
1. **What are the error handling mechanisms in ASP.NET Core APIs?**
   - Developer Exception Page for detailed errors in Development
   - Exception Handler middleware for production error handling
   - Problem Details (RFC 7807) for standardized error format
   - UseDeveloperExceptionPage enables detailed error page
   - UseExceptionHandler configures exception handling middleware

2. **How does the Developer Exception Page work?**
   - Enabled by default in Development environment
   - Runs early in middleware pipeline to capture exceptions
   - Displays detailed information (stack trace, query string, cookies, headers)
   - Returns plain text for Accept: text/plain header
   - Should not be enabled in production

3. **How do you configure error handling for production?**
   - Use UseExceptionHandler middleware
   - Configure error endpoint or inline error handler
   - Use Results.Problem for RFC 7807-compliant responses
   - Disable Developer Exception Page in production
   - Provide safe, generic error messages

4. **What is Problem Details (RFC 7807) and why use it?**
   - Standardized format for machine-readable error details
   - Properties: type, title, status, detail, instance
   - Enables consistent error handling across APIs
   - Provides documentation links for error resolution
   - Results.Problem generates compliant responses

5. **How do you separate error handling between Development and Production?**
   - Use Environment.IsDevelopment() to check environment
   - Enable Developer Exception Page only in Development
   - Use Exception Handler middleware in Production
   - Provide detailed errors in Development, safe errors in Production
   - Protect internal systems while enabling troubleshooting

**Key interview concepts**:
- **Developer Exception Page**: Detailed errors in Development
- **Exception Handler Middleware**: Production error handling
- **Problem Details**: RFC 7807 standardized format
- **Environment-Based Handling**: Different approaches per environment
- **Results.Problem**: RFC 7807-compliant response generation

**How to approach interview questions**:
- Start with different error handling mechanisms
- Explain Developer Exception Page for Development
- Discuss Exception Handler middleware for Production
- Address Problem Details standardization benefits
- Mention environment-based separation strategies

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Handle errors in ASP.NET Core APIs | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/error-handling-api?view=aspnetcore-10.0&tabs=minimal-apis)