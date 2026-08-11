---
title: "Parameter Binding"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/0_minimal_apis/2_parameter_binding"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Parameter Binding Overview - Request Data Conversion</summary>
  <div>

## Parameter Binding in Minimal API Applications

**Real-life analogy**: Parameter binding is like having an automated reception desk that extracts information from visitor forms and converts it into the exact format your departments need. Instead of each department manually parsing visitor information, the reception desk automatically extracts names, addresses, and preferences, converting them into the proper data types and passing them to the appropriate departments. Parameter binding provides the same automation - converting request data into strongly typed parameters for route handlers.

**Technical explanation**: Parameter binding converts request data into strongly typed parameters expressed by route handlers. Binding sources determine where parameters are bound from: route values, query string, headers, body (as JSON), form values, DI services, or custom sources. Binding can be explicit using attributes ([FromRoute], [FromQuery], [FromHeader], [FromBody], [FromServices]) or inferred based on HTTP method and parameter type. GET, HEAD, OPTIONS, DELETE don't implicitly bind from body - require explicit [FromBody] or manual reading.

**Key jargon explained**:
- **Parameter Binding**: Converting request data to strongly typed parameters
- **Binding Sources**: Where parameters are bound from (route, query, header, body)
- **Explicit Binding**: Using attributes to specify binding source
- **Inferred Binding**: Automatic binding based on HTTP method and type
- **DI Services**: Parameters resolved from dependency injection

```csharp:title=BindingSources.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<Service>();
var app = builder.Build();

app.MapGet("/{id}", (int id,
                     int page,
                     [FromHeader(Name = "X-CUSTOM-HEADER")] string customHeader,
                     Service service) => { });

class Service { }
```

```csharp:title=ExplicitBinding.cs
app.MapGet("/{id}", ([FromRoute] int id,
                     [FromQuery(Name = "p")] int page,
                     [FromServices] Service service,
                     [FromHeader(Name = "Content-Type")] string contentType) 
                     => {});
```

**How it works in practice**: When a request arrives, parameter binding extracts data from various sources based on parameter types and attributes. Route parameters are extracted from URL path. Query string parameters from URL query. Headers from HTTP headers. Body from JSON payload. Form values from form data. DI services from the service container. The binding system automatically converts types and provides strongly typed parameters to handlers, eliminating manual parsing code.

**Key takeaways for interviews**:
- Parameter binding converts request data to strongly typed parameters
- Binding sources: route, query, header, body, form, DI services
- Explicit binding with attributes ([FromRoute], [FromQuery], etc.)
- Inferred binding based on HTTP method and parameter type
- GET/HEAD/OPTIONS/DELETE don't implicitly bind from body

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Explicit vs Inferred Binding</summary>
  <div>

## Explicit Parameter Binding

**Real-life analogy**: Explicit binding is like providing specific instructions for how to process each piece of information on a form. Instead of letting the system guess where to find information, you explicitly state "this field comes from the address section, this from the contact section." This ensures accuracy and prevents ambiguity. Explicit parameter binding provides the same certainty - you specify exactly where each parameter should be bound from.

**Technical explanation**: Explicit binding uses attributes to declare where parameters are bound from. [FromRoute] binds from route values. [FromQuery] binds from query string. [FromHeader] binds from headers. [FromBody] binds from JSON body. [FromServices] binds from DI container. [FromForm] binds from form values. [AsParameters] binds multiple parameters from a custom type. Explicit binding removes ambiguity and ensures correct parameter source.

**Key jargon explained**:
- **[FromRoute]**: Explicit route value binding
- **[FromQuery]**: Explicit query string binding
- **[FromHeader]**: Explicit header binding
- **[FromBody]**: Explicit JSON body binding
- **[FromServices]**: Explicit DI service binding

```csharp:title=ExplicitAttributes.cs
app.MapGet("/{id}", ([FromRoute] int id,
                     [FromQuery(Name = "p")] int page,
                     [FromServices] Service service,
                     [FromHeader(Name = "Content-Type")] string contentType) 
                     => {});
```

```csharp:title=FormBinding.cs
app.MapPost("/todos", async ([FromForm] string name,
    [FromForm] Visibility visibility, IFormFile? attachment, TodoDb db) =>
{
    var todo = new Todo { Name = name, Visibility = visibility };
    // Process attachment and save to database
    return Results.Ok();
});
```

**How it works in practice**: Explicit binding attributes tell the parameter binding system exactly where to extract each parameter. This is important when parameter names don't match source names, when multiple sources have similar names, or when you need to override default behavior. [FromQuery(Name = "p")] binds from query parameter "p" instead of "page". [FromHeader(Name = "X-CUSTOM-HEADER")] binds from a specific header. This precision prevents binding errors and makes code more maintainable.

**Key takeaways for interviews**:
- Explicit binding uses attributes to specify binding source
- Removes ambiguity in parameter binding
- Important when parameter names don't match source names
- [FromRoute], [FromQuery], [FromHeader], [FromBody], [FromServices]
- [FromForm] for form data, [AsParameters] for custom types

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

**Real-life analogy**: Interview preparation for parameter binding concepts is like understanding data processing systems. You need to know how to extract data from different sources, how to specify extraction rules, and how to handle different data types and formats.

**Common interview questions**:
1. **What are the supported binding sources in Minimal APIs?**
   - Route values from URL path
   - Query string from URL query
   - Headers from HTTP headers
   - Body (as JSON) from request payload
   - Form values from form data
   - Services from dependency injection
   - Custom binding sources

2. **How does explicit parameter binding differ from inferred binding?**
   - Explicit: uses attributes to specify binding source
   - Inferred: automatic based on HTTP method and parameter type
   - Explicit removes ambiguity
   - Explicit important when names don't match
   - Inferred simpler but less precise

3. **Why don't GET, HEAD, OPTIONS, DELETE implicitly bind from body?**
   - These methods typically don't have request bodies per HTTP spec
   - Prevents unexpected behavior
   - Requires explicit [FromBody] if body binding needed
   - Follows HTTP method semantics
   - Can manually read from HttpRequest if needed

4. **How do you bind from form values in Minimal APIs?**
   - Use [FromForm] attribute on parameters
   - Supports IFormFile and IFormFileCollection for file uploads
   - Can use [AsParameters] with custom type for complex forms
   - Requires antiforgery protection for security
   - Alternative to JSON body binding

5. **What is the benefit of using [AsParameters]?**
   - Binds multiple parameters from a custom type
   - Reduces parameter list in handler signature
   - Improves code organization
   - Supports complex form binding scenarios
   - Custom type can have multiple [FromForm] properties

**Key interview concepts**:
- **Binding Sources**: Route, query, header, body, form, DI services
- **Explicit Binding**: Attributes for precise binding control
- **Inferred Binding**: Automatic based on HTTP method and type
- **Form Binding**: [FromForm] for form data and file uploads
- **AsParameters**: Custom type for complex parameter binding

**How to approach interview questions**:
- Start with supported binding sources and their use cases
- Explain explicit vs inferred binding differences
- Address HTTP method body binding restrictions
- Discuss form binding and file upload scenarios
- Mention AsParameters for complex binding scenarios

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Parameter binding in Minimal API applications | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/minimal-apis/parameter-binding?view=aspnetcore-10.0)