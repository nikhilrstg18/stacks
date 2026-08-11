---
title: "Dependency Injection"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/1_dependency_injection"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Dependency Injection Overview - Like ordering food at a restaurant</summary>
  <div>

## Overview of Dependency Injection

**Real-life analogy**: Dependency Injection is like ordering food at a restaurant. Instead of cooking your own meal (creating your own dependencies), you tell the waiter what you want, and the kitchen prepares and brings it to you. In code, instead of creating objects inside your class, you ask for them, and the framework provides them.

**Technical explanation**: Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them itself. This makes your code more flexible, testable, and easier to maintain.

**Key jargon explained**:
- **Dependency**: An object that another object needs to function (like a car needing an engine)
- **DI Container**: A built-in service that manages and provides dependencies (like the restaurant kitchen)
- **Service**: A reusable component that can be injected into other classes (like a menu item)
- **Inversion of Control**: Flipping the control from your class creating dependencies to the framework providing them

```csharp:title=MyDependency.cs
public class MyDependency
{
    public void WriteMessage(string message)
    {
        Console.WriteLine($"MyDependency.WriteMessage: {message}");
    }
}
```

**How it works in practice**: Without DI, you would create `new MyDependency()` inside your class. With DI, you ask for `IMyDependency` in your constructor, and ASP.NET Core provides it automatically. This makes it easy to swap implementations and test your code.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Problems with Direct Dependencies - Like building your own car from scratch</summary>
  <div>

## Problems with Direct Dependencies

**Real-life analogy**: Creating dependencies directly is like building your own car from scratch every time you need to drive somewhere. If you want a different car, you have to rebuild it. If the car has problems, you have to fix them yourself. It's inefficient and hard to maintain.

**Technical explanation**: When classes create their own dependencies directly, they become tightly coupled to specific implementations, making the code hard to test, maintain, and modify.

**Key jargon explained**:
- **Tight Coupling**: When classes are strongly dependent on specific implementations
- **Hard-coded Dependencies**: Dependencies that are created directly with `new` keyword
- **Testing Difficulty**: Hard to test because you can't easily replace real dependencies with test versions

```csharp:title=BadExample.cs
// BAD: Direct dependency creation
public class IndexModel : PageModel
{
    private readonly MyDependency _dependency = new MyDependency();

    public void OnGet()
    {
        _dependency.WriteMessage("IndexModel.OnGet called");
    }
}
```

**How it works in practice**: This code creates `MyDependency` directly inside the class. Problems:
- You can't easily swap `MyDependency` with a different implementation
- If `MyDependency` needs its own dependencies, this class has to create them too
- It's hard to test because you can't replace `MyDependency` with a fake version
- Configuration code gets scattered throughout your application

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>How DI Solves These Problems - Like using a rental car service</summary>
  <div>

## How DI Solves These Problems

**Real-life analogy**: DI is like using a rental car service. Instead of building your own car, you request one from the service, and they provide it. If you need a different type of car, you just ask for a different model. If there's a problem, the service handles it. You just drive.

**Technical explanation**: DI solves dependency problems by using interfaces to abstract implementations, registering services in a container, and injecting them where needed. The framework handles creation and disposal automatically.

**Key jargon explained**:
- **Interface**: A contract that defines what a service can do without specifying how
- **Service Registration**: Telling the DI container which interface maps to which implementation
- **Constructor Injection**: Receiving dependencies through your class's constructor

```csharp:title=IMyDependency.cs
public interface IMyDependency
{
    void WriteMessage(string message);
}
```

```csharp:title=MyDependency.cs
public class MyDependency : IMyDependency
{
    public void WriteMessage(string message)
    {
        Console.WriteLine($"MyDependency.WriteMessage: {message}");
    }
}
```

```csharp:title=Program.cs
builder.Services.AddScoped<IMyDependency, MyDependency>();
```

**How it works in practice**: You define an interface, create a concrete implementation, register it in the DI container, and then request it where needed. The container handles creating and managing the service's lifecycle.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Service Registration - Like menu planning for a restaurant</summary>
  <div>

## Registering Services

**Real-life analogy**: Service registration is like planning a restaurant menu. You decide which dishes (services) you'll offer and which recipes (implementations) to use for each dish. When customers order, the kitchen knows exactly what to prepare.

**Technical explanation**: Services are registered in the DI container, typically in Program.cs, using methods like `AddTransient`, `AddScoped`, or `AddSingleton` to specify the service's lifetime.

**Key jargon explained**:
- **Service Registration**: The process of telling the DI container about your services
- **Service Descriptor**: Information about a service including its interface, implementation, and lifetime
- **IServiceCollection**: The collection where services are registered during app startup

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddScoped<IMyDependency, MyDependency>();
builder.Services.AddSingleton<ILogger, ConsoleLogger>();
builder.Services.AddTransient<IEmailService, SmtpEmailService>();

var app = builder.Build();
```

**How it works in practice**: You register services when the app starts up. The DI container remembers these registrations and can provide the requested services when your classes need them. This centralizes all service configuration in one place.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Service Lifetimes - Like different types of library memberships</summary>
  <div>

## Service Lifetimes

**Real-life analogy**: Service lifetimes are like different types of library memberships. A transient membership gives you a new library card each visit. A scoped membership gives you one card that lasts for your entire visit. A singleton membership gives you one card that never expires and is shared with everyone.

**Technical explanation**: Services can have different lifetimes that determine when new instances are created: transient (new each time), scoped (once per request), or singleton (once per application lifetime).

**Key jargon explained**:
- **Transient**: A new instance is created each time the service is requested
- **Scoped**: One instance is created per HTTP request (or Blazor circuit)
- **Singleton**: One instance is created for the entire application lifetime
- **Service Lifetime**: How long a service instance lives and when it's disposed

```csharp:title=Program.cs
// Transient: New instance every time
builder.Services.AddTransient<IMyTransientService, MyTransientService>();

// Scoped: One instance per HTTP request
builder.Services.AddScoped<IMyScopedService, MyScopedService>();

// Singleton: One instance for the entire app
builder.Services.AddSingleton<IMySingletonService, MySingletonService>();
```

**How it works in practice**: Choose the right lifetime based on your needs:
- **Transient**: For stateless services or when you need a fresh instance each time
- **Scoped**: For services that need to maintain state within a single request
- **Singleton**: For services that are expensive to create or need to be shared across the entire app

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Constructor Injection - Like receiving tools at the start of your shift</summary>
  <div>

## Constructor Injection

**Real-life analogy**: Constructor injection is like receiving your tools at the start of your work shift. Instead of running to the toolbox every time you need something, your supervisor hands you the tools you'll need right at the beginning. You just focus on using them to do your job.

**Technical explanation**: Constructor injection is the most common way to receive dependencies. You declare the services you need as parameters in your class's constructor, and the DI container provides them automatically when creating an instance.

**Key jargon explained**:
- **Constructor**: The special method that runs when creating a new instance of a class
- **Dependency Chain**: When a service needs other services, which in turn need more services
- **Automatic Resolution**: The DI container automatically figuring out all the dependencies needed

```csharp:title=MyService.cs
public class MyService
{
    private readonly IMyDependency _dependency;
    private readonly ILogger<MyService> _logger;

    public MyService(IMyDependency dependency, ILogger<MyService> logger)
    {
        _dependency = dependency;
        _logger = logger;
    }

    public void DoWork()
    {
        _logger.LogInformation("Starting work...");
        _dependency.WriteMessage("Hello from MyService");
    }
}
```

**How it works in practice**: When you request `MyService` from the DI container, it automatically sees that `MyService` needs `IMyDependency` and `ILogger`. It creates those dependencies (or reuses existing ones based on lifetime) and passes them to the constructor. This happens recursively for all dependencies.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Framework-Provided Services - Like standard equipment in a new apartment</summary>
  <div>

## Framework-Provided Services

**Real-life analogy**: Framework-provided services are like the standard equipment that comes with a new apartment - refrigerator, stove, water heater. You don't have to provide these yourself; they're already there and ready to use. You just need to know how to use them.

**Technical explanation**: ASP.NET Core automatically registers many services in the DI container when you create a builder, including configuration, logging, hosting environment, and more. You can use these services immediately without additional registration.

**Key jargon explained**:
- **Framework Services**: Services automatically provided by ASP.NET Core
- **IConfiguration**: Service for accessing app settings and configuration
- **ILogger**: Service for logging messages with different severity levels
- **IWebHostEnvironment**: Service for information about the hosting environment

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// These services are automatically registered:
// - IConfiguration (builder.Configuration)
// - ILogger (builder.Logging)
// - IWebHostEnvironment (builder.Environment)
// - IServiceProvider (built DI container)

var app = builder.Build();
```

```csharp:title=MyService.cs
public class MyService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<MyService> _logger;
    private readonly IWebHostEnvironment _environment;

    public MyService(IConfiguration configuration, 
                    ILogger<MyService> logger, 
                    IWebHostEnvironment environment)
    {
        _configuration = configuration;
        _logger = logger;
        _environment = environment;
    }
}
```

**How it works in practice**: You don't need to register these framework services - they're available automatically. Just request them in your constructor and start using them. This saves you time and ensures consistent configuration across your application.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>DI Best Practices - Like following a recipe for consistent results</summary>
  <div>

## Best Practices

**Real-life analogy**: Following DI best practices is like following a proven recipe. You could experiment and make mistakes, or you could follow established techniques that chefs have perfected over time. The results are more consistent and reliable.

**Technical explanation**: Following DI best practices ensures your application is maintainable, testable, and performs well. These guidelines help avoid common pitfalls and make the most of the DI system.

**Key jargon explained**:
- **Interface Segregation**: Keeping interfaces focused and small
- **Service Locator Pattern**: An anti-pattern where services request the DI container directly
- **Circular Dependencies**: When Service A needs Service B, but Service B also needs Service A

### DO:
- Use interfaces to abstract implementations
- Register services with appropriate lifetimes
- Use constructor injection for required dependencies
- Keep interfaces focused and specific
- Dispose of resources that implement IDisposable

### DON'T:
- Use `new` to create dependencies inside your classes
- Use the service locator pattern (requesting IServiceProvider directly)
- Create circular dependencies between services
- Use singleton services that depend on scoped services
- Over-inject (too many dependencies in one constructor)

```csharp:title=GoodExample.cs
// GOOD: Interface-based, constructor injection
public class OrderService
{
    private readonly IOrderRepository _repository;
    private readonly IEmailService _emailService;

    public OrderService(IOrderRepository repository, IEmailService emailService)
    {
        _repository = repository;
        _emailService = emailService;
    }

    public async Task ProcessOrder(Order order)
    {
        await _repository.SaveAsync(order);
        await _emailService.SendConfirmationAsync(order.Email);
    }
}
```

**How it works in practice**: Following these practices makes your code cleaner, easier to test, and more maintainable. When you need to change implementations or add new features, you can do so without breaking existing code.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Dependency injection in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-10.0)