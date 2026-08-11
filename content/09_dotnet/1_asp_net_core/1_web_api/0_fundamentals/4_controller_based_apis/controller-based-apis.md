---
title: "Controller-based APIs"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/4_controller_based_apis"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Controller-based APIs Overview - Traditional MVC Pattern</summary>
  <div>

## Create Web APIs with ASP.NET Core

**Real-life analogy**: Controller-based APIs are like using a structured departmental system in a company. Each department (controller) has specialized staff (action methods) who handle specific types of requests. Departments follow established procedures (MVC patterns) and have clear hierarchies. This structure provides organization, consistency, and scalability for complex operations. Controller-based APIs provide the same structured approach - organized controllers with action methods following MVC patterns for handling HTTP requests.

**Technical explanation**: ASP.NET Core supports creating web APIs using controllers or Minimal APIs. Controllers are classes deriving from ControllerBase, activated and disposed per request. ControllerBase provides properties and methods for HTTP request handling (BadRequest, NotFound, CreatedAtAction, TryUpdateModelAsync, TryValidateModel). Web API controllers should derive from ControllerBase rather than Controller (Controller adds view support for web pages). ApiController attribute enables opinionated API-specific behaviors: attribute routing requirement, automatic HTTP 400 responses, binding source parameter inference, multipart/form-data request inference, problem details for error status codes.

**Key jargon explained**:
- **ControllerBase**: Base class for API controllers (no view support)
- **Controller**: Base class with view support (for web pages)
- **ApiController**: Attribute enabling API-specific behaviors
- **Action Methods**: Methods in controllers handling HTTP requests
- **Attribute Routing**: URL pattern specification via attributes

```csharp:title=Controller.cs
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index =>
            new WeatherForecast
            (
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                Summaries[Random.Shared.Next(Summaries.Length)]
            ))
            .ToArray();
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<Pet> Create(Pet pet)
    {
        pet.Id = _petsInMemoryStore.Any() ? 
                 _petsInMemoryStore.Max(p => p.Id) + 1 : 1;
        _petsInMemoryStore.Add(pet);

        return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
    }
}
```

**How it works in practice**: Controllers are classes with action methods handling HTTP requests. ControllerBase provides helper methods for common HTTP responses (BadRequest, NotFound, Ok). ApiController attribute enables automatic behaviors: attribute routing required, automatic 400 on validation failure, binding source inference, problem details for errors. Controllers activated per request, disposed after request. AddControllers() registers controller services. MapControllers() maps controller routes. Attribute routing via [Route] and HTTP verb attributes ([HttpGet], [HttpPost]).

**Key takeaways for interviews**:
- Controllers derive from ControllerBase (not Controller for APIs)
- ControllerBase provides HTTP response helper methods
- ApiController attribute enables API-specific behaviors
- Attribute routing required with ApiController
- Controllers activated per request, disposed after

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>ApiController Attribute - API-Specific Behaviors</summary>
  <div>

## ApiController Attribute

**Real-life analogy**: ApiController attribute is like applying a specialized operating mode to a department. Instead of following general procedures, the department follows API-specific protocols: automatic error handling, standardized request processing, and enhanced validation. This specialized mode ensures consistent behavior across all API departments. ApiController attribute provides the same specialization - enabling opinionated behaviors specific to API development.

**Technical explanation**: ApiController attribute enables opinionated API-specific behaviors: attribute routing requirement (actions inaccessible via conventional routes), automatic HTTP 400 responses (automatic 400 on validation failure), binding source parameter inference (automatic binding source detection), multipart/form-data request inference (automatic form data detection), problem details for error status codes (RFC 7807 error responses). Can be applied to specific controllers, custom base controller class, or assembly level (applies to all controllers in assembly).

**Key jargon explained**:
- **Attribute Routing Requirement**: Actions must use attribute routing
- **Automatic HTTP 400**: Automatic 400 on validation failure
- **Binding Source Inference**: Automatic binding source detection
- **Problem Details**: RFC 7807 standardized error format
- **Assembly-level Attribute**: Applies to all controllers in assembly

```csharp:title=SpecificController.cs
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
}
```

```csharp:title=BaseController.cs
[ApiController]
public class MyControllerBase : ControllerBase
{
}

[Produces(MediaTypeNames.Application.Json)]
[Route("[controller]")]
public class PetsController : MyControllerBase
{
}
```

```csharp:title=AssemblyLevel.cs
using Microsoft.AspNetCore.Mvc;
[assembly: ApiController]

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var app = builder.Build();
app.MapControllers();
app.Run();
```

**How it works in practice**: ApiController attribute applied to controller class enables specialized behaviors. Attribute routing requirement means actions must use [Route] attribute, inaccessible via conventional routes. Automatic HTTP 400 returns 400 status code when model validation fails without manual validation checks. Binding source parameter inference automatically detects binding sources from parameter types (FromBody for complex types, FromRoute for route parameters). Problem details provide standardized error format. Assembly-level attribute applies to all controllers, no opt-out for individual controllers.

**Key takeaways for interviews**:
- ApiController enables API-specific behaviors
- Attribute routing required with ApiController
- Automatic HTTP 400 on validation failure
- Binding source inference simplifies parameter binding
- Can be applied at controller, base class, or assembly level

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

**Real-life analogy**: Interview preparation for controller-based API concepts is like understanding organizational structures. You need to understand how departments are organized, what specialized modes they operate in, how they handle requests, and when to use structured vs streamlined approaches.

**Common interview questions**:
1. **What is the difference between ControllerBase and Controller?**
   - ControllerBase: base class for API controllers (no view support)
   - Controller: base class with view support (for web pages)
   - Web API controllers should derive from ControllerBase
   - Controller adds view-related functionality
   - Use Controller only if supporting both views and APIs

2. **What behaviors does the ApiController attribute enable?**
   - Attribute routing requirement
   - Automatic HTTP 400 responses on validation failure
   - Binding source parameter inference
   - Multipart/form-data request inference
   - Problem details for error status codes

3. **How do you register controllers in ASP.NET Core?**
   - Call AddControllers() to register controller services
   - Call MapControllers() to map controller routes
   - Controllers derive from ControllerBase
   - Apply ApiController attribute for API-specific behaviors
   - Use attribute routing with [Route] and HTTP verb attributes

4. **When should you use controller-based APIs vs Minimal APIs?**
   - Controller-based: large applications, complex business logic, MVC familiarity
   - Minimal APIs: new projects, simpler syntax, better performance
   - Controller-based provides MVC features out of the box
   - Minimal APIs provides streamlined development
   - Choice depends on project complexity and team familiarity

5. **What are the helper methods provided by ControllerBase?**
   - BadRequest: returns 400 status code
   - NotFound: returns 404 status code
   - CreatedAtAction: returns 201 with Location header
   - TryUpdateModelAsync: invokes model binding
   - TryValidateModel: invokes model validation

**Key interview concepts**:
- **ControllerBase**: API controller base class
- **ApiController**: API-specific behaviors attribute
- **Attribute Routing**: URL pattern via attributes
- **Helper Methods**: ControllerBase convenience methods
- **Registration**: AddControllers and MapControllers

**How to approach interview questions**:
- Start with ControllerBase vs Controller distinction
- Explain ApiController attribute behaviors
- Discuss controller registration and routing
- Address when to use controller-based vs Minimal APIs
- Mention ControllerBase helper methods

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Create web APIs with ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/web-api/?view=aspnetcore-10.0)