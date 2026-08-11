---
title: "Route Handlers"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/0_minimal_apis/1_route_handlers"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Route Handlers Overview - Request Processing</summary>
  <div>

## Route Handlers in Minimal API Apps

**Real-life analogy**: Route handlers are like specialized receptionists in a building. Each receptionist is trained to handle specific types of visitors (GET requests for information, POST requests for creating resources). When a visitor arrives, the appropriate receptionist handles their request based on their purpose. Route handlers work the same way - they execute when specific routes match, processing requests based on HTTP method and route pattern.

**Technical explanation**: Route handlers are methods that execute when routes match. They can be lambda expressions, local functions, instance methods, or static methods. Route handlers can be synchronous or asynchronous. MapGet, MapPost, MapPut, MapDelete define handlers for specific HTTP verbs. MapMethods handles multiple verbs. Route parameters are captured as part of the route pattern and passed to handlers. Route constraints restrict matching behavior. MapGroup groups related routes with common configuration.

**Key jargon explained**:
- **Route Handlers**: Methods executing when routes match
- **MapGet/MapPost**: HTTP verb-specific route mapping
- **Route Parameters**: Captured values from route patterns
- **Route Constraints**: Restrictions on route matching
- **MapGroup**: Grouping related routes with common configuration

```csharp:title=BasicHandlers.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "This is a GET");
app.MapPost("/", () => "This is a POST");
app.MapPut("/", () => "This is a PUT");
app.MapDelete("/", () => "This is a DELETE");

app.MapMethods("/options-or-head", new[] { "OPTIONS", "HEAD" }, 
    () => "This is an options or head request");

app.Run();
```

```csharp:title=RouteParameters.cs
app.MapGet("/users/{userId}/books/{bookId}", 
    (int userId, int bookId) => $"User: {userId}, Book: {bookId}");
```

**How it works in practice**: When a request arrives, the routing system matches the URL and HTTP method against defined routes. If a match is found, the corresponding route handler executes. Route parameters are parsed and passed to the handler. Type conversion occurs automatically - if conversion fails, an exception is thrown. Route constraints like :int, :regex restrict matching. MapGroup applies common configuration (prefix, authorization, etc.) to multiple routes.

**Key takeaways for interviews**:
- Route handlers execute when routes match
- Support lambda, local function, instance method, static method
- HTTP verb-specific methods (MapGet, MapPost, etc.)
- Route parameters captured and type-converted automatically
- MapGroup for common configuration across routes

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Route Handler Types - Lambda, Functions, Methods</summary>
  <div>

## Route Handler Types

**Real-life analogy**: Route handler types are like different ways to assign tasks to employees. You can give inline instructions (lambda), reference a documented procedure (local function), assign to a specific employee (instance method), or reference a company policy (static method). Each approach has different use cases - inline for simple tasks, functions for reusable logic, methods for organized code structure.

**Technical explanation**: Route handlers can be lambda expressions, local functions, instance methods, or static methods. Lambda expressions provide inline handlers for simple scenarios. Local functions offer reusable handlers within the same file. Instance methods allow organizing handlers in classes with state. Static methods provide stateless handlers. Endpoints can be defined outside Program.cs using extension methods for better organization.

**Key jargon explained**:
- **Lambda Expression**: Inline anonymous function
- **Local Function**: Function defined within method scope
- **Instance Method**: Method on class instance with state
- **Static Method**: Stateless method on class
- **Extension Methods**: Organizing endpoints in separate files

```csharp:title=HandlerTypes.cs
// Lambda expression
app.MapGet("/inline", () => "This is an inline lambda");

// Lambda variable
var handler = () => "This is a lambda variable";
app.MapGet("/", handler);

// Local function
string LocalFunction() => "This is local function";
app.MapGet("/local", LocalFunction);

// Instance method
var handler = new HelloHandler();
app.MapGet("/instance", handler.Hello);

// Static method
app.MapGet("/static", HelloHandler.Hello);
```

```csharp:title=SeparateFile.cs
// Program.cs
TodoEndpoints.Map(app);

// TodoEndpoints.cs
public static class TodoEndpoints
{
    public static void Map(WebApplication app)
    {
        app.MapGet("/", async context =>
        {
            await context.Response.WriteAsJsonAsync(new { Message = "All todo items" });
        });
    }
}
```

**How it works in practice**: Lambda expressions are ideal for simple one-off handlers. Local functions provide reusability within the same file. Instance methods allow organizing handlers in classes with shared state and dependencies. Static methods provide stateless handlers. Extension methods enable organizing endpoints in separate files by feature area, improving code organization for larger applications.

**Key takeaways for interviews**:
- Lambda expressions for simple inline handlers
- Local functions for reusable handlers in same file
- Instance methods for organized code with state
- Static methods for stateless handlers
- Extension methods for organizing endpoints in separate files

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

**Real-life analogy**: Interview preparation for route handler concepts is like understanding different task assignment methods. You need to know when to use inline instructions, documented procedures, or specialized employees based on task complexity and organizational needs.

**Common interview questions**:
1. **What are the different types of route handlers?**
   - Lambda expressions: inline anonymous functions
   - Local functions: reusable functions within same file
   - Instance methods: methods on class instances with state
   - Static methods: stateless methods on classes
   - Extension methods: organizing endpoints in separate files

2. **How do route parameters work in Minimal APIs?**
   - Captured as part of route pattern definition
   - Automatically parsed and passed to handler
   - Type conversion occurs automatically
   - Conversion failure throws exception
   - Type-safe parameter capture

3. **What are route constraints and when would you use them?**
   - Restrict route matching behavior
   - Examples: :int for integers, :regex for patterns
   - Prevent invalid parameter types from matching
   - Provide more specific routing
   - Used when type safety and validation needed

4. **How does MapGroup work in Minimal APIs?**
   - Groups related routes with common configuration
   - Applies prefix, authorization, and other settings to group
   - Reduces repetitive configuration
   - Organizes routes by feature area
   - Improves code organization for larger applications

5. **How do you organize endpoints in separate files?**
   - Use extension methods on WebApplication
   - Create static classes with Map methods
   - Call extension methods in Program.cs
   - Organize by feature area
   - Improves code organization for larger applications

**Key interview concepts**:
- **Handler Types**: Lambda, local function, instance method, static method
- **Route Parameters**: Type-safe parameter capture
- **Route Constraints**: Restrictions on matching behavior
- **MapGroup**: Common configuration for related routes
- **Extension Methods**: Organizing endpoints in separate files

**How to approach interview questions**:
- Start with different handler types and their use cases
- Explain route parameters and automatic type conversion
- Discuss route constraints for validation
- Address MapGroup for organization
- Mention extension methods for file organization

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Route handlers in Minimal API apps | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/minimal-apis/route-handlers?view=aspnetcore-10.0)