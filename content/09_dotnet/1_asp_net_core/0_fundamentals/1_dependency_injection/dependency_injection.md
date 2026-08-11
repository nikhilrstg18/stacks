---
title: "Dependency Injection"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/1_dependency_injection"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Dependency Injection Overview - Inversion of Control Pattern</summary>
  <div>

## Overview of Dependency Injection

**Real-life analogy**: Dependency Injection implements the Inversion of Control principle by externalizing dependency management, similar to how a modern manufacturing system uses external suppliers for components instead of building everything in-house. Instead of each department creating its own tools and materials (tight coupling), a centralized procurement system provides standardized components (loose coupling). This enables flexibility, quality control, and efficient resource management across the entire organization.

**Technical explanation**: Dependency Injection (DI) is a software design pattern that implements Inversion of Control (IoC) for managing dependencies between objects. Instead of classes creating their own dependencies directly (tight coupling), dependencies are provided from external sources (loose coupling). ASP.NET Core includes a built-in DI container (IServiceProvider) that manages service lifetimes, resolves dependency graphs automatically, and handles disposal. This follows the Dependency Inversion Principle from SOLID - high-level modules shouldn't depend on low-level modules; both should depend on abstractions.

**Key jargon explained**:
- **Dependency Injection**: Design pattern for achieving Inversion of Control
- **IoC Container**: Built-in service provider (IServiceProvider) that manages dependencies
- **Service Registration**: Process of mapping interfaces to implementations in the container
- **Dependency Resolution**: Automatic creation and injection of dependency graphs
- **Service Lifetime**: How long service instances live (transient, scoped, singleton)

```csharp:title=DirectDependency.cs
// PROBLEMATIC: Direct dependency creation (tight coupling)
public class IndexModel : PageModel
{
    private readonly MyDependency _dependency = new MyDependency();

    public void OnGet()
    {
        _dependency.WriteMessage("IndexModel.OnGet called");
    }
}
```

```csharp:title=Interface.cs
// SOLUTION: Interface abstraction
public interface IMyDependency
{
    void WriteMessage(string message);
}
```

```csharp:title=Implementation.cs
public class MyDependency : IMyDependency
{
    public void WriteMessage(string message)
    {
        Console.WriteLine($"MyDependency.WriteMessage: {message}");
    }
}
```

```csharp:title=Program.cs
// Register service in DI container
builder.Services.AddScoped<IMyDependency, MyDependency>();
```

```csharp:title=InjectedDependency.cs
// SOLUTION: Constructor injection (loose coupling)
public class IndexModel : PageModel
{
    private readonly IMyDependency _dependency;

    public IndexModel(IMyDependency dependency)
    {
        _dependency = dependency;
    }

    public void OnGet()
    {
        _dependency.WriteMessage("IndexModel.OnGet called");
    }
}
```

**How it works in practice**: DI addresses the problems of direct dependency creation through three mechanisms: (1) Interface abstraction allows swapping implementations without modifying consuming classes, (2) Service registration centralizes configuration in Program.cs, eliminating scattered setup code, (3) Automatic dependency resolution handles complex dependency graphs. The DI container manages object lifetimes, ensuring proper disposal and supporting testing through mock injection.

**Key takeaways for interviews**:
- DI implements Inversion of Control to achieve loose coupling
- Follows Dependency Inversion Principle from SOLID
- Built-in IServiceProvider manages service lifetimes and resolution
- Constructor injection is the primary injection pattern
- Enables testability through mock dependency injection

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Service Lifetimes - Instance Management</summary>
  <div>

## Service Lifetimes and Registration

**Real-life analogy**: Service lifetimes are like different procurement models in a supply chain. Transient services are like disposable items - new ones provided for each use. Scoped services are like project-specific equipment - one set per project duration. Singleton services are like shared infrastructure - one instance used across all projects. Choosing the right model balances efficiency, consistency, and resource management.

**Technical explanation**: Services can be registered with different lifetimes that determine when new instances are created and how they're shared. Transient services create a new instance for every request. Scoped services create one instance per HTTP request (or Blazor circuit), enabling request-scoped state. Singleton services create one instance for the entire application lifetime, useful for shared resources and expensive-to-create objects. The DI container automatically manages disposal based on these lifetimes.

**Key jargon explained**:
- **Transient**: New instance created each time the service is requested
- **Scoped**: One instance per HTTP request or Blazor circuit
- **Singleton**: One instance for the entire application lifetime
- **Dependency Captive**: When a longer-lived service depends on a shorter-lived service
- **Service Disposal**: Automatic cleanup of IDisposable services based on lifetime

```csharp:title=Lifetimes.cs
// Transient: New instance every time
builder.Services.AddTransient<IMyTransientService, MyTransientService>();

// Scoped: One instance per HTTP request
builder.Services.AddScoped<IMyScopedService, MyScopedService>();

// Singleton: One instance for the entire app
builder.Services.AddSingleton<IMySingletonService, MySingletonService>();
```

```csharp:title=Usage.cs
public class MyService
{
    // Transient: Gets fresh instance each time
    private readonly IMyTransientService _transient;
    
    // Scoped: Same instance within this HTTP request
    private readonly IMyScopedService _scoped;
    
    // Singleton: Same instance across entire app
    private readonly IMySingletonService _singleton;

    public MyService(IMyTransientService transient, 
                    IMyScopedService scoped, 
                    IMySingletonService singleton)
    {
        _transient = transient;
        _scoped = scoped;
        _singleton = singleton;
    }
}
```

**How it works in practice**: Choose lifetimes based on service characteristics and requirements: (1) Transient for stateless services or when fresh instances are needed, (2) Scoped for services that maintain request-specific state (database contexts, user session data), (3) Singleton for expensive-to-create services or shared resources (configuration, caching, logging). Avoid dependency captives - longer-lived services depending on shorter-lived services can cause unintended behavior and memory leaks.

**Key takeaways for interviews**:
- Three service lifetimes: transient, scoped, singleton
- Scoped services maintain state within a single HTTP request
- Singleton services are shared across the entire application
- Avoid dependency captives (singleton depending on scoped)
- IDisposable services are automatically disposed based on lifetime

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Constructor Injection - Primary Injection Pattern</summary>
  <div>

## Constructor Injection

**Real-life analogy**: Constructor injection is like receiving all necessary equipment and materials at the start of a work shift. Instead of running to the supply room every time you need something (inefficient and error-prone), your supervisor provides everything you'll need upfront. This ensures you have all dependencies before starting work, making the process more efficient and reliable.

**Technical explanation**: Constructor injection is the primary and recommended pattern for receiving dependencies in ASP.NET Core. Dependencies are declared as constructor parameters, and the DI container automatically provides them when creating instances. This approach makes dependencies explicit, enables immutability, and ensures classes are always in a valid state. The container recursively resolves the entire dependency graph, handling complex object hierarchies automatically.

**Key jargon explained**:
- **Constructor Injection**: Receiving dependencies through class constructor
- **Dependency Graph**: The hierarchical tree of dependencies that need to be resolved
- **Automatic Resolution**: DI container figuring out all required dependencies recursively
- **Required Dependencies**: Constructor parameters that must be provided
- **Optional Dependencies**: Dependencies that can be null (not recommended)

```csharp:title=ConstructorInjection.cs
public class OrderService
{
    private readonly IOrderRepository _repository;
    private readonly IEmailService _emailService;
    private readonly ILogger<OrderService> _logger;

    // All dependencies required - class is never in invalid state
    public OrderService(IOrderRepository repository, 
                       IEmailService emailService,
                       ILogger<OrderService> logger)
    {
        _repository = repository;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task ProcessOrder(Order order)
    {
        _logger.LogInformation("Processing order {OrderId}", order.Id);
        await _repository.SaveAsync(order);
        await _emailService.SendConfirmationAsync(order.Email);
        _logger.LogInformation("Order {OrderId} processed successfully", order.Id);
    }
}
```

**How it works in practice**: When you request OrderService from the DI container, it automatically resolves all dependencies: IOrderRepository, IEmailService, and ILogger<OrderService>. If these services have their own dependencies, the container resolves those recursively. This automatic resolution handles complex dependency graphs without manual configuration. Constructor injection ensures classes are always in a valid state since all required dependencies are provided before any methods can be called.

**Key takeaways for interviews**:
- Constructor injection is the primary and recommended pattern
- Makes dependencies explicit and enables immutability
- DI container recursively resolves entire dependency graphs
- Ensures classes are always in a valid state
- Avoids the service locator anti-pattern

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Framework Services - Pre-registered Dependencies</summary>
  <div>

## Framework-Provided Services

**Real-life analogy**: Framework-provided services are like the standard infrastructure that comes with a modern office building - HVAC, security systems, network connectivity. You don't need to provide these yourself; they're available as part of the building. You just need to know how to use them effectively for your specific needs.

**Technical explanation**: ASP.NET Core automatically registers many framework services in the DI container when you create a WebApplicationBuilder. These include IConfiguration for settings access, ILogger for logging, IWebHostEnvironment for environment information, IServiceProvider for the DI container itself, and many more. These services are available immediately without additional registration, providing a consistent foundation for all applications.

**Key jargon explained**:
- **Framework Services**: Services automatically registered by ASP.NET Core
- **IConfiguration**: Interface for accessing application settings
- **ILogger<T>: Generic logging interface with category support
- **IWebHostEnvironment**: Interface for environment information (Development, Production)
- **IServiceProvider**: The root DI container interface

```csharp:title=FrameworkServices.cs
public class MyService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<MyService> _logger;
    private readonly IWebHostEnvironment _environment;

    // Framework services are automatically available
    public MyService(IConfiguration configuration, 
                   ILogger<MyService> logger,
                   IWebHostEnvironment environment)
    {
        _configuration = configuration;
        _logger = logger;
        _environment = environment;
    }

    public void DoWork()
    {
        var setting = _configuration["MySetting"];
        _logger.LogInformation("Working in {Environment} environment", _environment.EnvironmentName);
    }
}
```

**How it works in practice**: Framework services are registered during WebApplicationBuilder creation, following the principle of convention over configuration. This provides a consistent foundation across all ASP.NET Core applications. You can use these services immediately by requesting them in constructors, and you can also replace or extend them through custom registrations if needed.

**Key takeaways for interviews**:
- Framework services are automatically registered by WebApplicationBuilder
- IConfiguration, ILogger, IWebHostEnvironment are commonly used
- Available immediately without additional registration
- Can be replaced or extended through custom registration
- Provides consistent foundation across all ASP.NET Core applications

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>DI Best Practices - SOLID Principles</summary>
  <div>

## Dependency Injection Best Practices

**Real-life analogy**: Following DI best practices is like following established engineering principles in construction. You could build structures however you want, but following proven principles ensures safety, maintainability, and efficiency. The same applies to software architecture - following established DI patterns leads to maintainable, testable, and performant applications.

**Technical explanation**: DI best practices ensure applications are maintainable, testable, and follow SOLID principles. Key practices include using interfaces for abstraction, choosing appropriate service lifetimes, preferring constructor injection, avoiding the service locator pattern, preventing circular dependencies, and keeping interfaces focused. These practices prevent common pitfalls like tight coupling, memory leaks, and untestable code.

**Key jargon explained**:
- **Interface Segregation**: Keeping interfaces focused and small
- **Service Locator Pattern**: Anti-pattern where classes request IServiceProvider directly
- **Circular Dependencies**: When Service A depends on Service B, but B also depends on A
- **Dependency Captive**: Longer-lived service depending on shorter-lived service
- **Over-injection**: Too many dependencies in a single constructor

### DO:
- Use interfaces to abstract implementations
- Register services with appropriate lifetimes
- Use constructor injection for required dependencies
- Keep interfaces focused and specific (Interface Segregation Principle)
- Dispose of resources that implement IDisposable

### DON'T:
- Use `new` to create dependencies inside your classes
- Use the service locator pattern (requesting IServiceProvider directly)
- Create circular dependencies between services
- Use singleton services that depend on scoped services
- Over-inject (too many dependencies indicates violation of Single Responsibility Principle)

```csharp:title=GoodExample.cs
// GOOD: Interface-based, constructor injection, focused interface
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

```csharp:title=BadExample.cs
// BAD: Service locator pattern, tight coupling
public class OrderService
{
    private readonly IServiceProvider _serviceProvider;

    public OrderService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task ProcessOrder(Order order)
    {
        var repository = _serviceProvider.GetRequiredService<IOrderRepository>();
        var emailService = _serviceProvider.GetRequiredService<IEmailService>();
        await repository.SaveAsync(order);
        await emailService.SendConfirmationAsync(order.Email);
    }
}
```

**How it works in practice**: Following these practices ensures your DI configuration is maintainable and your code is testable. Constructor injection makes dependencies explicit and enables immutability. Appropriate lifetimes prevent memory leaks and ensure correct behavior. Interface abstraction enables swapping implementations for testing or different environments. Avoiding anti-patterns like service locator keeps your code clean and follows SOLID principles.

**Key takeaways for interviews**:
- Use interfaces for abstraction and constructor injection
- Choose appropriate service lifetimes to avoid memory leaks
- Avoid service locator pattern and circular dependencies
- Follow SOLID principles in interface design
- Keep constructors focused - too many dependencies indicate design issues

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

**Real-life analogy**: Interview preparation for dependency injection concepts is like understanding the complete supply chain management system. You need to understand how components are sourced, managed, and distributed throughout an organization, and how different procurement models affect efficiency and reliability.

**Common interview questions**:
1. **What is Dependency Injection and why is it important?**
   - Explain it's a design pattern implementing Inversion of Control
   - Discuss loose coupling, testability, and maintainability benefits
   - Mention SOLID principles, especially Dependency Inversion Principle

2. **What are the different service lifetimes in ASP.NET Core DI?**
   - Transient: new instance each time
   - Scoped: one instance per HTTP request
   - Singleton: one instance for entire application
   - Discuss when to use each and potential pitfalls

3. **What is constructor injection and why is it preferred?**
   - Primary pattern for receiving dependencies
   - Makes dependencies explicit and enables immutability
   - Ensures classes are always in valid state
   - DI container resolves dependency graphs automatically

4. **What are the common DI anti-patterns to avoid?**
   - Service locator pattern (requesting IServiceProvider directly)
   - Circular dependencies between services
   - Dependency captive (singleton depending on scoped)
   - Over-injection (too many constructor parameters)

5. **How does DI support unit testing?**
   - Enables swapping real dependencies with test doubles
   - Constructor injection makes dependencies explicit
   - Mock frameworks can replace implementations easily
   - Supports testability without modifying production code

**Key interview concepts**:
- **Inversion of Control**: Flipping control from class to framework
- **SOLID Principles**: Dependency Inversion and Interface Segregation
- **Service Lifetimes**: Transient, scoped, singleton trade-offs
- **Dependency Graph**: Recursive resolution of object hierarchies
- **Testability**: Mock injection and test double patterns

**How to approach interview questions**:
- Start with clear definition and architectural purpose
- Explain theoretical underpinnings (IoC, SOLID principles)
- Provide practical code examples demonstrating patterns
- Discuss trade-offs and when to use different approaches
- Mention common pitfalls and how to avoid them

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Dependency injection in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-10.0)