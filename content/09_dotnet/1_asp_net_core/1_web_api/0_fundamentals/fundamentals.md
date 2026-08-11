---
title: "APIs Fundamentals"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>APIs Overview - Minimal APIs vs Controllers</summary>
  <div>

## APIs Overview

**Real-life analogy**: Choosing between Minimal APIs and controller-based APIs is like choosing between a specialized tool and a general-purpose toolkit. Minimal APIs are like specialized tools designed for specific tasks - they're lightweight, efficient, and perfect for the job at hand. Controller-based APIs are like comprehensive toolkits - they have everything you might need for complex scenarios but come with more overhead. For most modern API development, the specialized tool (Minimal APIs) is the better choice.

**Technical explanation**: ASP.NET Core provides two approaches for building HTTP APIs: Minimal APIs (recommended for new projects) and controller-based APIs. Minimal APIs provide a simplified, high-performance approach with minimal code and configuration. They eliminate traditional scaffolding and unnecessary controllers by fluently declaring API routes and actions. Controller-based APIs follow traditional object-oriented patterns with classes deriving from ControllerBase, suitable for large applications with complex business logic and teams familiar with MVC patterns.

**Key jargon explained**:
- **Minimal APIs**: Simplified API approach with minimal code and configuration
- **Controller-based APIs**: Traditional MVC pattern with controller classes
- **WebApplication**: The main application instance in Minimal APIs
- **MapGet/MapPost**: Fluent API methods for defining routes
- **ApiController**: Attribute for controller-based API classes

```csharp:title=MinimalAPI.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/users/{userId}/books/{bookId}", 
    (int userId, int bookId) => $"User: {userId}, Book: {bookId}");

app.Run();
```

```csharp:title=ControllerAPI.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get() => /* ... */;
}
```

**How it works in practice**: Minimal APIs use WebApplication.CreateBuilder to initialize the application with preconfigured defaults. Routes are defined fluently using MapGet, MapPost, etc., with inline lambda handlers. This eliminates the need for controller classes and reduces boilerplate. Controller-based APIs use the traditional MVC pattern with controller classes, action methods, and attribute routing. The choice depends on project complexity, team familiarity, and specific feature requirements.

**Key takeaways for interviews**:
- Minimal APIs are recommended for new projects
- Simpler syntax with less boilerplate code
- Better performance with reduced overhead
- Controller-based APIs for complex business logic and MVC familiarity
- Both approaches can achieve the same functionality

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Choosing Between Approaches - Decision Criteria</summary>
  <div>

## Minimal APIs vs Controller-based APIs

**Real-life analogy**: Choosing between approaches is like selecting between a specialized restaurant and a full-service hotel. The specialized restaurant (Minimal APIs) focuses on doing one thing exceptionally well with minimal overhead. The full-service hotel (controller-based APIs) provides comprehensive services for complex needs but with more infrastructure. Your choice depends on the complexity of your requirements and your team's familiarity with the environment.

**Technical explanation**: Start with Minimal APIs for new projects - they offer simpler syntax, better performance, easier testing, and leverage modern .NET features. Consider controller-based APIs if you need model binding extensibility (IModelBinderProvider, IModelBinder), advanced validation features (IModelValidator), application parts, application model, or OData support. Most controller features can be implemented in Minimal APIs with custom solutions, but controllers provide them out of the box.

**Key jargon explained**:
- **Model Binding Extensibility**: Custom binding logic for complex scenarios
- **Advanced Validation**: IModelValidator for custom validation rules
- **Application Parts**: Modular organization of controller features
- **Application Model**: Metadata-driven controller configuration
- **OData Support**: Open Data Protocol for RESTful APIs

```csharp:title=DecisionCriteria.cs
// Choose Minimal APIs when:
// - New project starting from scratch
// - Simple to moderate complexity
// - Performance is critical
// - Team prefers modern, concise syntax
// - Minimal configuration overhead desired

// Choose Controller-based APIs when:
// - Large application with complex business logic
// - Team familiar with MVC patterns
// - Need advanced model binding extensibility
// - Require complex validation features
// - Application parts or application model needed
// - OData support required
```

**How it works in practice**: Minimal APIs provide a streamlined development experience with automatic middleware configuration, simplified routing, and reduced ceremony. They're ideal for microservices, simple CRUD APIs, and scenarios where performance matters. Controller-based APIs provide the full MVC framework with filters, model binding, validation, and other features for complex enterprise applications. The trend is toward Minimal APIs for new development, with controllers remaining for legacy migration and complex scenarios.

**Key takeaways for interviews**:
- Start with Minimal APIs for new projects
- Controller-based APIs for complex enterprise scenarios
- Most controller features available in Minimal APIs with custom solutions
- Performance favors Minimal APIs
- Team familiarity and existing codebase influence decision

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

**Real-life analogy**: Interview preparation for API approaches is like understanding different architectural frameworks. You need to understand when to use each approach, their trade-offs, and how to explain your architectural decisions based on project requirements and team context.

**Common interview questions**:
1. **What are the two approaches for building APIs in ASP.NET Core?**
   - Minimal APIs (recommended for new projects)
   - Controller-based APIs (traditional MVC pattern)
   - Minimal APIs provide simplified, high-performance approach
   - Controller-based APIs follow traditional object-oriented patterns
   - Choice depends on project complexity and team familiarity

2. **Why are Minimal APIs recommended for new projects?**
   - Simpler syntax with less boilerplate code
   - Better performance with reduced overhead
   - Easier testing with simplified unit and integration testing
   - Modern approach leveraging latest .NET features
   - Eliminates unnecessary controllers and scaffolding

3. **When would you choose controller-based APIs over Minimal APIs?**
   - Large applications with complex business logic
   - Teams familiar with MVC patterns
   - Need model binding extensibility (IModelBinderProvider)
   - Require advanced validation features (IModelValidator)
   - Application parts or application model needed
   - OData support required

4. **How do Minimal APIs and controller-based APIs compare in performance?**
   - Minimal APIs have reduced overhead compared to controllers
   - Fewer abstractions and less ceremony in Minimal APIs
   - Controllers have additional framework layers (filters, model binding)
   - Minimal APIs provide more direct request handling
   - Performance difference significant for high-throughput scenarios

5. **Can you implement controller features in Minimal APIs?**
   - Most controller features can be implemented with custom solutions
   - Model binding, validation, filters available through middleware
   - Requires more manual configuration than controllers
   - Controllers provide features out of the box
   - Trade-off between simplicity and comprehensive features

**Key interview concepts**:
- **Minimal APIs**: Modern, simplified approach for new projects
- **Controller-based APIs**: Traditional MVC pattern for complex scenarios
- **Performance**: Minimal APIs have reduced overhead
- **Extensibility**: Controllers provide more built-in features
- **Decision Criteria**: Project complexity, team familiarity, feature requirements

**How to approach interview questions**:
- Start with clear recommendation (Minimal APIs for new projects)
- Explain benefits of Minimal APIs (simplicity, performance)
- Discuss when controller-based APIs are appropriate
- Address trade-offs and decision criteria
- Mention that both can achieve same functionality

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [APIs overview | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/apis?view=aspnetcore-10.0)