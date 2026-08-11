---
title: "Routing"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/9_routing"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Routing Overview - Request Matching and Dispatching</summary>
  <div>

## Routing in ASP.NET Core

**Real-life analogy**: Routing is like a receptionist system that directs visitors to the right department. When someone arrives (HTTP request), the receptionist (routing middleware) checks their destination (URL), verifies their credentials (HTTP method), and directs them to the appropriate department (endpoint). The receptionist can also provide directions (URL generation) for reaching specific departments. This system ensures visitors reach the right place efficiently without knowing the internal layout of the building.

**Technical explanation**: Routing is responsible for matching incoming HTTP requests and dispatching them to executable endpoints. Endpoints are units of executable request-handling code (controllers, Razor Pages, SignalR, gRPC, or delegates). Routing uses route templates to match URLs and HTTP methods, extracts values from the URL (route parameters), and provides them for request processing. The routing system can also generate URLs that map to endpoints. UseRouting adds route matching to the middleware pipeline, while UseEndpoints adds endpoint execution.

**Key jargon explained**:
- **Routing**: Process of matching requests to executable endpoints
- **Endpoint**: Unit of executable request-handling code
- **Route Template**: Pattern that defines URL matching rules
- **Route Parameters**: Values extracted from the URL
- **URL Generation**: Creating URLs that map to endpoints

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Simple routing
app.MapGet("/", () => "Hello World!");

// Route template with parameter
app.MapGet("/hello/{name:alpha}", (string name) => $"Hello {name}!");

// Different HTTP methods
app.MapPost("/api/users", () => "Create a user");
app.MapPut("/api/users/{id}", (int id) => $"Update user {id}");

app.MapControllers();
app.MapRazorPages();

app.Run();
```

**How it works in practice**: Routing uses a pair of middleware: UseRouting adds route matching to the pipeline, selecting the best endpoint based on URL and HTTP method. UseEndpoints adds endpoint execution, running the delegate associated with the selected endpoint. Route templates define matching patterns - `/hello/{name}` matches `/hello/John` and binds "John" to the name parameter. Route constraints like `:alpha` restrict matching to specific patterns. The routing system can generate URLs based on endpoint definitions, maintaining consistency across the application.

**Key takeaways for interviews**:
- Routing matches HTTP requests to executable endpoints
- Endpoints include controllers, Razor Pages, SignalR, gRPC, delegates
- Route templates define URL matching patterns with parameters
- UseRouting adds route matching, UseEndpoints adds execution
- Routing can generate URLs based on endpoint definitions

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Route Templates and Parameters - URL Patterns</summary>
  <div>

## Route Templates and Parameters

**Real-life analogy**: Route templates are like address formats that define how locations are specified. A format like "Building {BuildingNumber}, Floor {FloorNumber}, Room {RoomNumber}" matches "Building 1, Floor 3, Room 205" and extracts the building number, floor, and room number for processing. Route templates work the same way - they define URL patterns that match specific structures and extract values for use in request processing.

**Technical explanation**: Route templates define the URL patterns that endpoints match. Templates can include literal segments (`/users`) and parameter segments (`{id}`). Parameter segments extract values from the URL and make them available as route parameters. Route constraints restrict parameter values to specific patterns (integers, alphabetic characters, GUIDs). Optional parameters and catch-all parameters provide flexibility for complex URL patterns. Route values are accessible through HttpContext.RouteValues.

**Key jargon explained**:
- **Route Template**: Pattern defining URL matching rules
- **Route Parameters**: Values extracted from URL segments
- **Route Constraints**: Restrictions on parameter values
- **Optional Parameters**: Parameters that can be omitted
- **Catch-All Parameters**: Parameters that match remaining URL segments

```csharp:title=Templates.cs
// Simple literal template
app.MapGet("/users", () => "All users");

// Route parameter
app.MapGet("/users/{id}", (int id) => $"User {id}");

// Route constraint (only integers)
app.MapGet("/products/{id:int}", (int id) => $"Product {id}");

// Route constraint (only alphabetic)
app.MapGet("/categories/{name:alpha}", (string name) => $"Category {name}");

// Optional parameter
app.MapGet("/blog/{post?}", (string? post) => post ?? "All posts");

// Catch-all parameter
app.MapGet("/files/{**path}", (string path) => $"File path: {path}");
```

```csharp:title=AccessParameters.cs
// Access route parameters in endpoint handlers
app.MapGet("/users/{id}", (int id) =>
{
    // id is automatically bound from route parameter
    return $"User {id}";
});

// Access via HttpContext
app.MapGet("/products/{id}", (HttpContext context) =>
{
    var id = context.Request.RouteValues["id"];
    return $"Product {id}";
});
```

**How it works in practice**: Route templates define flexible URL patterns. Literal segments must match exactly. Parameter segments capture values and make them available as method parameters or through HttpContext.RouteValues. Route constraints like `:int`, `:alpha`, `:guid` restrict matching to specific patterns. Optional parameters (parameter?) allow segments to be omitted. Catch-all parameters ({**parameter}) match remaining URL segments. This flexibility enables clean, SEO-friendly URLs while maintaining type safety and validation.

**Key takeaways for interviews**:
- Route templates define URL matching patterns
- Parameters extract values from URL segments
- Route constraints restrict parameter values to specific patterns
- Optional parameters and catch-all parameters provide flexibility
- Route values accessible via method parameters or HttpContext

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Route Constraints - Parameter Validation</summary>
  <div>

## Route Constraints

**Real-life analogy**: Route constraints are like validation rules for address formats. A rule might specify that building numbers must be numeric, floor numbers must be between 1-50, and room numbers must follow a specific pattern. If an address doesn't match these rules, it's rejected as invalid. Route constraints work the same way - they validate route parameters against specific patterns before the endpoint is selected.

**Technical explanation**: Route constraints restrict route parameter values to specific patterns, preventing invalid URLs from matching endpoints. Constraints include type constraints (int, bool, datetime), format constraints (alpha, length, regex), and custom constraints. Constraints are applied using the `{parameter:constraint}` syntax. Multiple constraints can be combined. Constraints are evaluated during route matching - if a constraint fails, the route is not considered a match, allowing other routes to be tried.

**Key jargon explained**:
- **Route Constraints**: Validation rules for route parameter values
- **Type Constraints**: Validate parameter types (int, bool, datetime)
- **Format Constraints**: Validate parameter formats (alpha, length, regex)
- **Custom Constraints**: User-defined validation rules
- **Constraint Evaluation**: Constraints checked during route matching

```csharp:title=Constraints.cs
// Type constraints
app.MapGet("/users/{id:int}", (int id) => $"User {id}");
app.MapGet("/products/{id:guid}", (Guid id) => $"Product {id}");
app.MapGet("/events/{date:datetime}", (DateTime date) => $"Event on {date}");

// Format constraints
app.MapGet("/categories/{name:alpha}", (string name) => $"Category {name}");
app.MapGet("/search/{query:minlength(3)}", (string query) => $"Search: {query}");
app.MapGet("/posts/{slug:regex(^[a-z0-9-]+$)}", (string slug) => $"Post: {slug}");

// Multiple constraints
app.MapGet("/files/{filename:regex(^[a-z]+$):minlength(3)}", (string filename) => $"File: {filename}");

// Custom constraint
app.MapGet("/api/{version:int:range(1,5)}", (int version) => $"API version {version}");
```

```csharp:title=CustomConstraint.cs
// Custom route constraint
public class EvenNumberConstraint : IRouteConstraint
{
    public bool Match(HttpContext? httpContext, IRouter? route, 
                     string routeKey, RouteValueDictionary values, 
                     RouteDirection routeDirection)
    {
        if (values.TryGetValue(routeKey, out var value) && value is int id)
        {
            return id % 2 == 0;
        }
        return false;
    }
}

// Register custom constraint
builder.Services.Configure<RouteOptions>(options =>
{
    options.ConstraintMap.Add("even", typeof(EvenNumberConstraint));
});

// Use custom constraint
app.MapGet("/users/{id:even}", (int id) => $"User {id}");
```

**How it works in practice**: Route constraints are evaluated during route matching. When a request arrives, routing tries to match the URL against route templates. For each matching template, constraints are evaluated. If all constraints pass, the route is selected. If any constraint fails, the route is rejected and routing tries the next template. This enables precise URL validation and prevents invalid data from reaching endpoint handlers. Custom constraints enable domain-specific validation rules.

**Key takeaways for interviews**:
- Route constraints validate parameter values during matching
- Type constraints validate data types (int, guid, datetime)
- Format constraints validate patterns (alpha, regex, length)
- Multiple constraints can be combined
- Custom constraints enable domain-specific validation

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

**Real-life analogy**: Interview preparation for routing concepts is like understanding a complete navigation and address system. You need to understand how addresses are formatted, how they're validated, how visitors are directed to the right locations, and how to generate addresses for specific destinations.

**Common interview questions**:
1. **How does routing work in ASP.NET Core?**
   - Matches HTTP requests to executable endpoints
   - Uses route templates to define URL patterns
   - Extracts route parameters from URL segments
   - UseRouting adds matching, UseEndpoints adds execution

2. **What are route templates and how do they work?**
   - Define URL patterns that endpoints match
   - Include literal segments and parameter segments
   - Extract values from URL for request processing
   - Support optional parameters and catch-all parameters

3. **What are route constraints and why are they useful?**
   - Validate route parameter values during matching
   - Type constraints (int, guid, datetime) validate data types
   - Format constraints (alpha, regex, length) validate patterns
   - Prevent invalid URLs from matching endpoints

4. **How do you access route parameters in endpoint handlers?**
   - Automatically bound as method parameters
   - Accessible via HttpContext.RouteValues
   - Type conversion happens automatically
   - Constraints validate before binding

5. **What is the difference between UseRouting and UseEndpoints?**
   - UseRouting adds route matching to the pipeline
   - UseEndpoints adds endpoint execution to the pipeline
   - UseRouting selects the best endpoint match
   - UseEndpoints runs the delegate associated with the selected endpoint

**Key interview concepts**:
- **Route Matching**: Process of selecting the best endpoint
- **Endpoint**: Unit of executable request-handling code
- **Route Parameters**: Values extracted from URL segments
- **Route Constraints**: Validation rules for parameter values
- **URL Generation**: Creating URLs that map to endpoints

**How to approach interview questions**:
- Start with clear definition of routing architecture
- Explain route templates and parameter extraction
- Discuss route constraints and validation
- Address UseRouting vs UseEndpoints middleware
- Mention URL generation and route value access

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Routing in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/routing?view=aspnetcore-10.0)