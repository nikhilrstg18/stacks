---
title: "Minimal APIs"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/0_minimal_apis"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Minimal APIs Overview - Simplified API Development</summary>
  <div>

## Minimal APIs Quick Reference

**Real-life analogy**: Minimal APIs are like using a specialized kitchen gadget instead of a full commercial kitchen setup. Instead of setting up an entire kitchen with all equipment (controllers, filters, model binding), you use a specialized tool that does exactly what you need quickly and efficiently. Minimal APIs provide the same efficiency - they're streamlined tools for building APIs without the overhead of the full MVC framework.

**Technical explanation**: Minimal APIs consist of WebApplication and WebApplicationBuilder for application setup, and route handlers for defining endpoints. WebApplication.CreateBuilder initializes the application with preconfigured defaults including automatic middleware (UseDeveloperExceptionPage, UseRouting, UseEndpoints, UseAuthentication, UseAuthorization). Routes are defined fluently using MapGet, MapPost, etc., with inline lambda handlers. This eliminates controller classes and reduces boilerplate while maintaining full functionality.

**Key jargon explained**:
- **WebApplication**: Main application instance in Minimal APIs
- **WebApplicationBuilder**: Builder for configuring the application
- **Route Handlers**: Methods that execute when routes match
- **Automatic Middleware**: Framework-added middleware based on configuration
- **Fluent API**: Method chaining for route definition

```csharp:title=BasicSetup.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/users/{id}", (int id) => $"User {id}");

app.Run();
```

```csharp:title=AutomaticMiddleware.cs
// WebApplication automatically adds:
// - UseDeveloperExceptionPage (Development only)
// - UseRouting (if endpoints configured)
// - UseEndpoints (if endpoints configured)
// - UseAuthentication (if auth services detected)
// - UseAuthorization (if auth services detected)
```

**How it works in practice**: WebApplication.CreateBuilder preconfigures the application with sensible defaults. The builder pattern allows service registration and configuration. WebApplication.Build creates the application instance. Automatic middleware is added based on detected services and configuration. Routes are defined using MapGet, MapPost, etc., with lambda handlers that execute when routes match. This streamlined approach eliminates controller classes while providing full API functionality.

**Key takeaways for interviews**:
- Minimal APIs use WebApplication and WebApplicationBuilder
- Automatic middleware added based on configuration
- Fluent API for route definition (MapGet, MapPost, etc.)
- Eliminates controller classes and reduces boilerplate
- Preconfigured defaults simplify application setup

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Automatic Middleware Configuration</summary>
  <div>

## Automatic Middleware

**Real-life analogy**: Automatic middleware is like having a smart home system that automatically adjusts lighting, temperature, and security based on your presence and preferences. Instead of manually configuring each system, the smart home detects what's needed and activates it automatically. WebApplication provides the same intelligence - it automatically adds middleware based on detected services and configuration, reducing manual setup.

**Technical explanation**: WebApplication automatically adds middleware depending on certain conditions. UseDeveloperExceptionPage is added first in Development environment. UseRouting is added if user code didn't call it and endpoints are configured. UseEndpoints is added at the end if endpoints are configured. UseAuthentication is added after UseRouting if IAuthenticationSchemeProvider is detected. UseAuthorization is added next if IAuthorizationHandlerProvider is detected. User middleware and endpoints are added between UseRouting and UseEndpoints.

**Key jargon explained**:
- **UseDeveloperExceptionPage**: Error page for Development environment
- **UseRouting**: Endpoint routing middleware
- **UseEndpoints**: Endpoint execution middleware
- **UseAuthentication**: Authentication middleware
- **UseAuthorization**: Authorization middleware

```csharp:title=AutomaticMiddleware.cs
// Effectively what automatic middleware produces:
if (isDevelopment)
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

if (isAuthenticationConfigured)
{
    app.UseAuthentication();
}

if (isAuthorizationConfigured)
{
    app.UseAuthorization();
}

// user middleware/endpoints
app.MapGet("/", () => "hello world");

app.UseEndpoints(e => {});
```

```csharp:title=ManualConfiguration.cs
// When default configuration isn't correct:
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
```

**How it works in practice**: The automatic middleware system detects services registered in the DI container and adds appropriate middleware. This reduces boilerplate while ensuring correct middleware order. When the default order isn't correct (e.g., UseCors before UseAuthentication), manual configuration is needed. The system provides sensible defaults but allows manual override when necessary for specific scenarios.

**Key takeaways for interviews**:
- Automatic middleware based on detected services
- Correct order: exception page, routing, authentication, authorization
- User middleware between UseRouting and UseEndpoints
- Manual configuration when default order isn't correct
- Reduces boilerplate while ensuring proper middleware order

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

**Real-life analogy**: Interview preparation for Minimal APIs concepts is like understanding streamlined workflow systems. You need to understand how automatic configuration works, when to override defaults, and how the simplified approach compares to traditional methods.

**Common interview questions**:
1. **What are the main components of Minimal APIs?**
   - WebApplication and WebApplicationBuilder for application setup
   - Route handlers for defining endpoints
   - Automatic middleware configuration
   - Fluent API for route definition
   - Eliminates controller classes and reduces boilerplate

2. **How does automatic middleware work in Minimal APIs?**
   - UseDeveloperExceptionPage added in Development
   - UseRouting added if endpoints configured
   - UseEndpoints added at end if endpoints configured
   - UseAuthentication added if auth services detected
   - UseAuthorization added if auth services detected

3. **When would you need to manually configure middleware?**
   - When default order isn't correct for the application
   - UseCors should be before UseAuthentication/UseAuthorization
   - Terminal middleware requires manual UseRouting/UseEndpoints
   - Middleware before route matching requires manual UseRouting
   - Specific middleware ordering requirements

4. **How do Minimal APIs differ from controller-based APIs?**
   - No controller classes, use fluent API instead
   - Automatic middleware configuration
   - Reduced boilerplate and ceremony
   - Better performance with less overhead
   - Modern approach leveraging latest .NET features

5. **What are the benefits of using WebApplication.CreateBuilder?**
   - Preconfigured defaults for common scenarios
   - Automatic service registration
   - Simplified configuration
   - Reduced setup code
   - Sensible defaults that can be customized

**Key interview concepts**:
- **WebApplication**: Main application instance
- **Automatic Middleware**: Framework-added based on configuration
- **Fluent API**: Method chaining for route definition
- **Preconfigured Defaults**: Sensible defaults that can be customized
- **Streamlined Development**: Reduced boilerplate and ceremony

**How to approach interview questions**:
- Start with clear definition of Minimal APIs components
- Explain automatic middleware and when it's added
- Discuss manual configuration scenarios
- Address benefits over controller-based APIs
- Mention preconfigured defaults and customization options

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Minimal APIs quick reference | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-10.0)