---
title: "Routing"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/9_routing"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Routing - Like a receptionist directing visitors</summary>
  <div>

## What is Routing?

**Real-life analogy**: Routing is like a receptionist at a large building. When visitors arrive, the receptionist looks at their destination (URL) and directs them to the right department (endpoint). If someone wants to see HR, the receptionist sends them to the HR department. If they want to see IT, they go to IT. The receptionist ensures everyone gets to the right place.

**Technical explanation**: Routing is responsible for matching incoming HTTP requests and dispatching them to the app's executable endpoints. Endpoints are units of executable request-handling code. Routing extracts values from the request's URL and provides them for request processing. It can also generate URLs that map to endpoints.

**Key jargon explained**:
- **Routing**: The process of matching requests to endpoints
- **Endpoint**: A unit of executable request-handling code
- **Route Template**: A pattern that defines how URLs are matched
- **Route Matching**: Finding the best endpoint for a request
- **Route Values**: Values extracted from the URL during matching

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/hello/{name}", (string name) => $"Hello {name}!");

app.Run();
```

**How it works in practice**: Routing provides:
- **URL Matching**: Maps incoming URLs to the correct endpoint
- **Parameter Extraction**: Pulls values from URLs for use in your code
- **HTTP Method Matching**: Different endpoints for GET, POST, etc.
- **URL Generation**: Creates URLs based on endpoint definitions
- **Flexible Patterns**: Supports complex URL patterns with constraints

Routing is the traffic controller that directs each request to the right handler.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Routing Basics - Like simple visitor directions</summary>
  <div>

## Routing Basics

**Real-life analogy**: Routing basics are like simple visitor directions. The receptionist has a simple rule: "If someone comes to the front desk (/), greet them. If someone comes to the greeting room (/hello), ask for their name." These simple rules handle most common situations without complex logic.

**Technical explanation**: Basic routing uses simple route templates to match URLs to endpoints. The MapGet, MapPost, MapPut, and MapDelete methods define endpoints that respond to specific HTTP methods and URL patterns. WebApplicationBuilder automatically configures routing middleware, so you don't need to call UseRouting or UseEndpoints explicitly.

**Key jargon explained**:
- **MapGet**: Defines an endpoint for GET requests
- **MapPost**: Defines an endpoint for POST requests
- **Route Template**: A pattern like "/hello/{name}" that defines URL matching
- **HTTP Method**: The type of request (GET, POST, PUT, DELETE)
- **404 Not Found**: Returned when no route matches the request

### Basic Endpoint:
```csharp:title=Basic.cs
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Multiple Endpoints:
```csharp:title=Multiple.cs
app.MapGet("/", () => "Home Page");
app.MapGet("/about", () => "About Page");
app.MapGet("/contact", () => "Contact Page");
app.MapGet("/api/users", () => "Users API");
```

### Different HTTP Methods:
```csharp:title=Methods.cs
app.MapGet("/api/users", () => "Get all users");
app.MapPost("/api/users", () => "Create a user");
app.MapPut("/api/users/{id}", (int id) => $"Update user {id}");
app.MapDelete("/api/users/{id}", (int id) => $"Delete user {id}");
```

### Route Parameters:
```csharp:title=Parameters.cs
app.MapGet("/hello/{name}", (string name) => $"Hello {name}!");
app.MapGet("/users/{id}", (int id) => $"User ID: {id}");
app.MapGet("/products/{category}/{id}", (string category, int id) => 
    $"Category: {category}, ID: {id}");
```

### How It Works:
```csharp:title=HowItWorks.cs
// Request: GET /
// Matches: app.MapGet("/", () => "Hello World!")
// Response: "Hello World!"

// Request: GET /hello/John
// Matches: app.MapGet("/hello/{name}", (string name) => $"Hello {name}!")
// Response: "Hello John!"

// Request: POST /api/users
// Matches: app.MapPost("/api/users", () => "Create a user")
// Response: "Create a user"

// Request: GET /unknown
// Matches: None
// Response: 404 Not Found
```

**How it works in practice**: Basic routing provides:
- **Simple Mapping**: Easy way to map URLs to code
- **HTTP Method Specificity**: Different endpoints for different methods
- **Parameter Extraction**: Automatic extraction of URL parameters
- **404 Handling**: Automatic 404 when no route matches
- **Automatic Configuration**: WebApplicationBuilder sets up routing automatically

Basic routing handles most common scenarios with simple, readable code.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Route Templates - Like address patterns</summary>
  <div>

## Route Templates

**Real-life analogy**: Route templates are like address patterns. Instead of listing every possible address (123 Main St, 124 Main St, 125 Main St), you use a pattern like "{number} Main St". This pattern matches any address with a number followed by "Main St". Route templates work the same way for URLs.

**Technical explanation**: Route templates are patterns that define how URLs are matched to endpoints. They can include literal segments (fixed text) and parameter segments (placeholders). Parameter segments capture values from the URL and make them available to your code as parameters.

**Key jargon explained**:
- **Route Template**: A pattern like "/users/{id}" that defines URL matching
- **Literal Segment**: Fixed text in the template (like "/users")
- **Parameter Segment**: A placeholder like "{id}" that captures values
- **Route Constraint**: A rule that restricts what values a parameter can accept
- **Optional Parameter**: A parameter that doesn't have to be present

### Literal Segments:
```csharp:title=Literal.cs
// Matches exactly "/about"
app.MapGet("/about", () => "About Page");

// Matches exactly "/contact"
app.MapGet("/contact", () => "Contact Page");

// These are literal segments - they must match exactly
```

### Parameter Segments:
```csharp:title=Parameter.cs
// Matches "/hello/John", "/hello/Mary", etc.
app.MapGet("/hello/{name}", (string name) => $"Hello {name}!");

// Matches "/users/123", "/users/456", etc.
app.MapGet("/users/{id}", (int id) => $"User ID: {id}");

// Matches "/products/books/123"
app.MapGet("/products/{category}/{id}", (string category, int id) => 
    $"Category: {category}, ID: {id}");
```

### Route Constraints:
```csharp:title=Constraints.cs
// :alpha - only alphabetic characters
app.MapGet("/hello/{name:alpha}", (string name) => $"Hello {name}!");
// Matches: /hello/John
// Doesn't match: /hello/John123

// :int - only integers
app.MapGet("/users/{id:int}", (int id) => $"User ID: {id}");
// Matches: /users/123
// Doesn't match: /users/abc

// :guid - only GUIDs
app.MapGet("/orders/{id:guid}", (Guid id) => $"Order ID: {id}");
// Matches: /orders/12345678-1234-1234-1234-123456789012
// Doesn't match: /users/123

// :bool - only true or false
app.MapGet("/feature/{enabled:bool}", (bool enabled) => 
    $"Feature is {(enabled ? "enabled" : "disabled")}");
```

### Optional Parameters:
```csharp:title=Optional.cs
// Optional parameter with default value
app.MapGet("/items/{id?}", (int? id) => 
    id.HasValue ? $"Item {id}" : "All items");

// Matches: /items/123 → "Item 123"
// Matches: /items → "All items"
```

### Catch-All Parameters:
```csharp:title=CatchAll.cs
// Catch-all parameter captures the rest of the path
app.MapGet("/files/{*filepath}", (string filepath) => 
    $"File path: {filepath}");

// Matches: /files/documents/report.pdf → "File path: documents/report.pdf"
// Matches: /files/a/b/c/d → "File path: a/b/c/d"
```

**How it works in practice**: Route templates provide:
- **Flexible Patterns**: Match a wide range of URLs with one template
- **Parameter Capture**: Automatically extract values from URLs
- **Validation**: Use constraints to ensure valid parameter values
- **Optional Values**: Support optional parameters with default values
- **Complex Patterns**: Support multiple parameters and catch-all segments

Route templates let you handle complex URL patterns with simple, readable code.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Route Constraints - Like address validation rules</summary>
  <div>

## Route Constraints

**Real-life analogy**: Route constraints are like validation rules for addresses. You might have a rule like "the building number must be a number" or "the zip code must be 5 digits". These rules ensure that only valid addresses match your pattern. Route constraints work the same way for URL parameters.

**Technical explanation**: Route constraints restrict what values a route parameter can accept. They ensure that parameters match specific patterns like integers, GUIDs, or alphabetic characters. Constraints are added to route parameters using a colon followed by the constraint name.

**Key jargon explained**:
- **Route Constraint**: A rule that restricts parameter values
- **Type Constraint**: Ensures the parameter is a specific type (int, bool, etc.)
- **Pattern Constraint**: Ensures the parameter matches a pattern (alpha, regex, etc.)
- **Range Constraint**: Ensures the parameter is within a specific range
- **Custom Constraint**: A user-defined constraint for custom validation

### Type Constraints:
```csharp:title=TypeConstraints.cs
// :int - only integers
app.MapGet("/users/{id:int}", (int id) => $"User ID: {id}");
// Matches: /users/123
// Doesn't match: /users/abc

// :bool - only true or false
app.MapGet("/feature/{enabled:bool}", (bool enabled) => 
    $"Feature is {(enabled ? "enabled" : "disabled")}");
// Matches: /feature/true, /feature/false
// Doesn't match: /feature/yes

// :datetime - only datetime values
app.MapGet("/events/{date:datetime}", (DateTime date) => 
    $"Event date: {date}");
// Matches: /events/2023-10-15
// Doesn't match: /events/not-a-date

// :decimal - only decimal numbers
app.MapGet("/prices/{price:decimal}", (decimal price) => 
    $"Price: ${price}");
// Matches: /prices/19.99
// Doesn't match: /prices/free
```

### Pattern Constraints:
```csharp:title=PatternConstraints.cs
// :alpha - only alphabetic characters
app.MapGet("/hello/{name:alpha}", (string name) => $"Hello {name}!");
// Matches: /hello/John
// Doesn't match: /hello/John123

// :regex - custom regular expression
app.MapGet("/products/{sku:regex(^[A-Z]{2}-\\d{4}$)}", (string sku) => 
    $"SKU: {sku}");
// Matches: /products/AB-1234
// Doesn't match: /products/abc1234

// :minlength - minimum length
app.MapGet("/codes/{code:minlength(5)}", (string code) => 
    $"Code: {code}");
// Matches: /codes/ABCDE
// Doesn't match: /codes/ABC
```

### Range Constraints:
```csharp:title=RangeConstraints.cs
// :range - value must be within a range
app.MapGet("/pages/{page:range(1,100)}", (int page) => 
    $"Page {page}");
// Matches: /pages/1, /pages/50, /pages/100
// Doesn't match: /pages/0, /pages/101

// :min - minimum value
app.MapGet("/items/{id:min(1)}", (int id) => 
    $"Item {id}");
// Matches: /items/1, /items/100
// Doesn't match: /items/0, /items/-1

// :max - maximum value
app.MapGet("/pages/{page:max(100)}", (int page) => 
    $"Page {page}");
// Matches: /pages/1, /pages/50, /pages/100
// Doesn't match: /pages/101, /pages/200
```

### Multiple Constraints:
```csharp:title=Multiple.cs
// Combine multiple constraints
app.MapGet("/users/{id:int:min(1):max(1000)}", (int id) => 
    $"User ID: {id}");
// Matches: /users/1, /users/500, /users/1000
// Doesn't match: /users/0, /users/1001, /users/abc
```

### Common Constraints:
```csharp:title=Common.cs
// :guid - GUID format
app.MapGet("/orders/{id:guid}", (Guid id) => $"Order {id}");

// :float - floating point number
app.MapGet("/ratings/{rating:float}", (float rating) => 
    $"Rating: {rating}");

// :long - long integer
app.MapGet("/timestamps/{ts:long}", (long ts) => 
    $"Timestamp: {ts}");

// :uuid - alias for guid
app.MapGet("/resources/{id:uuid}", (Guid id) => $"Resource {id}");
```

**How it works in practice**: Route constraints provide:
- **Validation**: Ensure parameter values are valid
- **Type Safety**: Automatically convert to the correct type
- **Prevent Errors**: Reject invalid parameters before your code runs
- **Clear Rules**: Make URL patterns explicit about what they accept
- **Multiple Constraints**: Combine constraints for complex validation

Constraints make your routes more robust by validating input at the routing level.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Route Groups - Like organizing departments</summary>
  <div>

## Route Groups

**Real-life analogy**: Route groups are like organizing departments in a building. Instead of having all offices mixed together, you group related offices together. All HR offices are on one floor, all IT offices on another floor. This makes it easier to find things and apply common rules to all offices in a group.

**Technical explanation**: Route groups allow you to organize related endpoints together and apply common configuration like route prefixes, authorization requirements, or middleware to all endpoints in the group. This reduces code duplication and makes your routing configuration more maintainable.

**Key jargon explained**:
- **Route Group**: A collection of related endpoints with common configuration
- **MapGroup**: Method to create a route group
- **Route Prefix**: A common prefix applied to all endpoints in the group
- **Group Configuration**: Common settings applied to all endpoints in the group
- **Nested Groups**: Groups within groups for hierarchical organization

### Basic Route Group:
```csharp:title=Basic.cs
var api = app.MapGroup("/api");

api.MapGet("/users", () => "Get all users");
api.MapPost("/users", () => "Create a user");
api.MapGet("/users/{id}", (int id) => $"Get user {id}");

// These map to:
// GET /api/users
// POST /api/users
// GET /api/users/{id}
```

### With Authorization:
```csharp:title=Auth.cs
var api = app.MapGroup("/api").RequireAuthorization();

api.MapGet("/users", () => "Get all users");
api.MapPost("/users", () => "Create a user");

// All endpoints in this group require authentication
```

### With Common Prefix:
```csharp:title=Prefix.cs
var v1 = app.MapGroup("/api/v1");
var v2 = app.MapGroup("/api/v2");

v1.MapGet("/users", () => "Get users (v1)");
v2.MapGet("/users", () => "Get users (v2)");

// Maps to:
// GET /api/v1/users
// GET /api/v2/users
```

### With Rate Limiting:
```csharp:title=RateLimit.cs
var api = app.MapGroup("/api")
    .RequireRateLimiting();

api.MapGet("/data", () => "Rate limited endpoint");
api.MapPost("/submit", () => "Rate limited endpoint");

// All endpoints in this group have rate limiting
```

### Nested Groups:
```csharp:title=Nested.cs
var api = app.MapGroup("/api");
var users = api.MapGroup("/users");
var admin = users.MapGroup("/admin");

admin.MapGet("/", () => "Admin users");
admin.MapPost("/", () => "Create admin user");

// Maps to:
// GET /api/users/admin
// POST /api/users/admin
```

### With Middleware:
```csharp:title=Middleware.cs
var api = app.MapGroup("/api")
    .AddEndpointFilter<LoggingFilter>();

api.MapGet("/users", () => "Get users");
api.MapPost("/users", () => "Create user");

// All endpoints in this group use the logging filter
```

**How it works in practice**: Route groups provide:
- **Organization**: Group related endpoints together
- **Common Configuration**: Apply settings to all endpoints in the group
- **Reduced Duplication**: Avoid repeating configuration for each endpoint
- **Maintainability**: Easier to update configuration for a group
- **Hierarchical Structure**: Support nested groups for complex organization

Route groups make your routing configuration cleaner and more maintainable.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Route Matching - Like finding the best match</summary>
  <div>

## Route Matching

**Real-life analogy**: Route matching is like finding the best match for a visitor's request. If someone asks for "the IT department", but you have both "IT Support" and "IT Development", you need to decide which one is the best match. Routing does the same - it finds the best matching endpoint when multiple routes could match.

**Technical explanation**: When multiple routes could match a request, routing uses a set of rules to determine the best match. Routes with more specific patterns (more literal segments) are preferred over less specific ones. Routes with constraints are preferred over routes without constraints.

**Key jargon explained**:
- **Route Matching**: The process of finding the best endpoint for a request
- **Route Priority**: Rules that determine which route is preferred
- **Specificity**: How specific a route pattern is
- **Ambiguous Routes**: Routes that could both match the same request
- **Route Order**: The order in which routes are evaluated

### Specificity Rules:
```csharp:title=Specificity.cs
// More specific routes are preferred
app.MapGet("/users/{id}", (int id) => $"User {id}");
app.MapGet("/users/admin", () => "Admin users");

// Request: GET /users/admin
// Matches: /users/admin (more specific)
// Doesn't match: /users/{id} (less specific)
```

### Constraint Preference:
```csharp:title=Constraints.cs
// Routes with constraints are preferred
app.MapGet("/users/{id}", (string id) => $"User {id}");
app.MapGet("/users/{id:int}", (int id) => $"User ID {id}");

// Request: GET /users/123
// Matches: /users/{id:int} (has constraint)
// Doesn't match: /users/{id} (no constraint)
```

### Ambiguous Routes:
```csharp:title=Ambiguous.cs
// These routes are ambiguous - both could match the same request
app.MapGet("/users/{id}", (int id) => $"User {id}");
app.MapGet("/users/{name}", (string name) => $"User {name}");

// This will cause an error at startup
// Fix by making them more specific or adding constraints
```

### Fixing Ambiguity:
```csharp:title=Fixing.cs
// Add constraints to fix ambiguity
app.MapGet("/users/{id:int}", (int id) => $"User ID {id}");
app.MapGet("/users/{name:alpha}", (string name) => $"User {name}");

// Now routes are distinct
```

### Catch-All Routes:
```csharp:title=CatchAll.cs
// Catch-all routes are evaluated last
app.MapGet("/users/{id}", (int id) => $"User {id}");
app.MapGet("/{*path}", (string path) => $"Catch-all: {path}");

// Request: GET /users/123
// Matches: /users/{id} (more specific)

// Request: GET /other/path
// Matches: /{*path} (catch-all)
```

### Order Matters:
```csharp:title=Order.cs
// Routes are evaluated in the order they're defined
app.MapGet("/users/admin", () => "Admin users");
app.MapGet("/users/{id}", (int id) => $"User {id}");

// Request: GET /users/admin
// Matches: /users/admin (defined first)
```

**How it works in practice**: Route matching provides:
- **Automatic Selection**: Finds the best match automatically
- **Specificity Preference**: More specific routes are preferred
- **Constraint Preference**: Routes with constraints are preferred
- **Error Detection**: Detects ambiguous routes at startup
- **Predictable Behavior**: Clear rules for route selection

Understanding route matching helps you design clear, unambiguous routing configurations.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following proper directory procedures</summary>
  <div>

## Routing Best Practices

**Real-life analogy**: Following routing best practices is like following proper directory procedures. You should organize departments logically (use route groups), give clear directions (use clear route templates), handle special cases properly (use constraints), and have fallback procedures (handle 404s). Good procedures make your routing system efficient and maintainable.

**Technical explanation**: Following best practices ensures your routing configuration is clear, maintainable, and performant. This includes using route groups for organization, choosing appropriate route templates, using constraints for validation, and handling edge cases properly.

**Key jargon explained**:
- **Clear Route Templates**: Use descriptive, intuitive URL patterns
- **Route Groups**: Organize related endpoints together
- **Constraints**: Use constraints to validate parameters
- **HTTP Methods**: Use the correct HTTP methods for different operations
- **Error Handling**: Handle 404s and other errors gracefully

### DO:
- **Use clear, descriptive route templates** that are intuitive
- **Use route groups** to organize related endpoints
- **Use route constraints** to validate parameter values
- **Use the correct HTTP methods** for different operations
- **Handle 404s gracefully** with custom error pages
- **Keep routes simple** and avoid overly complex patterns
- **Use RESTful conventions** for API endpoints
- **Test your routes** to ensure they match as expected

### DON'T:
- **Create ambiguous routes** that could match the same request
- **Use overly complex route templates** that are hard to understand
- **Forget to add constraints** for parameters that need validation
- **Mix HTTP methods** incorrectly (use POST for updates, not GET)
- **Ignore route order** when it matters for matching
- **Create too many catch-all routes** that can hide routing issues
- **Use query parameters when path parameters are better**
- **Forget about SEO** when designing public-facing URLs

### RESTful Conventions:
```csharp:title=RESTful.cs
// DO: Use RESTful conventions
app.MapGet("/api/users", () => "Get all users");
app.MapGet("/api/users/{id}", (int id) => $"Get user {id}");
app.MapPost("/api/users", () => "Create user");
app.MapPut("/api/users/{id}", (int id) => $"Update user {id}");
app.MapDelete("/api/users/{id}", (int id) => $"Delete user {id}");

// DON'T: Use non-standard patterns
app.MapGet("/api/getUsers", () => "Get all users");
app.MapGet("/api/getUser/{id}", (int id) => $"Get user {id}");
app.MapGet("/api/createUser", () => "Create user");
```

### Clear Route Templates:
```csharp:title=Clear.cs
// DO: Use clear, descriptive templates
app.MapGet("/products/{category}/{id}", (string category, int id) => 
    $"Category: {category}, ID: {id}");

// DON'T: Use unclear abbreviations
app.MapGet("/prod/{cat}/{id}", (string cat, int id) => 
    $"Category: {cat}, ID: {id}");
```

### Use Route Groups:
```csharp:title=Groups.cs
// DO: Use route groups for organization
var api = app.MapGroup("/api").RequireAuthorization();
api.MapGet("/users", () => "Get users");
api.MapPost("/users", () => "Create user");

// DON'T: Repeat configuration for each endpoint
app.MapGet("/api/users", () => "Get users").RequireAuthorization();
app.MapPost("/api/users", () => "Create user").RequireAuthorization();
```

### Handle 404s:
```csharp:title=404.cs
// DO: Handle 404s gracefully
app.MapFallback(() => "Page not found");

// DON'T: Let the default 404 page show
// (unless that's what you want)
```

**How it works in practice**: Best practices ensure:
- **Clarity**: Routes are easy to understand and maintain
- **Organization**: Related endpoints are grouped together
- **Validation**: Parameters are validated before processing
- **Standards**: Follow RESTful and other conventions
- **Performance**: Efficient route matching and processing

Good routing practices make your application more maintainable and user-friendly.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Routing in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/routing?view=aspnetcore-10.0)