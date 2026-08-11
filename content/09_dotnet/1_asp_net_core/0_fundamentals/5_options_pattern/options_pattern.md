---
title: "Options Pattern"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/5_options_pattern"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Options Pattern Overview - Strongly-Typed Configuration</summary>
  <div>

## Options Pattern in ASP.NET Core

**Real-life analogy**: The Options pattern is like having a structured form for collecting related information instead of asking random questions. Instead of asking "What's your name?" and "What's your title?" separately, you have a "Position Information" form with fields for name and title. This provides structure, type safety, and validation. The Options pattern provides the same benefits for configuration - strongly-typed classes for related settings instead of accessing raw configuration strings.

**Technical explanation**: The options pattern uses classes to provide strongly-typed access to groups of related settings. This adheres to encapsulation (classes depend only on settings they use) and separation of concerns (settings for different parts aren't coupled). ConfigurationBinder.Bind maps configuration sections to object properties. Options are registered with AddOptions<T>, Configure<T> binds configuration to the options class, and IOptions<T>, IOptionsSnapshot<T>, or IOptionsMonitor<T> inject the options into services. The pattern also supports validation via DataAnnotations.

**Key jargon explained**:
- **Options Pattern**: Strongly-typed configuration access via classes
- **Configuration Binding**: Mapping configuration to object properties
- **IOptions<T>**: Singleton options that don't support reload
- **IOptionsSnapshot<T>**: Scoped options that support reload per request
- **IOptionsMonitor<T>**: Singleton options that support reload notifications

```csharp:title=OptionsClass.cs
public class PositionOptions
{
    public const string Position = "Position";

    public string? Name { get; set; }
    public string? Title { get; set; }
}
```

```json:title=appsettings.json
{
  "Position": {
    "Name": "Joe Smith",
    "Title": "Editor"
  }
}
```

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register options
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection(PositionOptions.Position));

// With validation
builder.Services.AddOptions<PositionOptions>()
    .Bind(builder.Configuration.GetSection(PositionOptions.Position))
    .ValidateDataAnnotations();
```

```csharp:title=Usage.cs
public class MyService
{
    private readonly PositionOptions _options;

    // IOptions<T> - singleton, doesn't reload
    public MyService(IOptions<PositionOptions> options)
    {
        _options = options.Value;
    }

    // IOptionsMonitor<T> - singleton, supports reload
    public MyService(IOptionsMonitor<PositionOptions> optionsMonitor)
    {
        _options = optionsMonitor.CurrentValue;
        optionsMonitor.OnChange(newOptions => _options = newOptions);
    }
}
```

**How it works in practice**: The options pattern maps configuration sections to strongly-typed classes. Configure<T> binds configuration to the options class during service registration. IOptions<T> provides singleton access without reload support. IOptionsSnapshot<T> provides scoped access with reload per request. IOptionsMonitor<T> provides singleton access with reload notifications via OnChange. Validation via DataAnnotations ensures configuration correctness at startup.

**Key takeaways for interviews**:
- Options pattern provides strongly-typed configuration access
- ConfigurationBinder maps configuration sections to object properties
- IOptions<T>, IOptionsSnapshot<T>, IOptionsMonitor<T> for different scenarios
- Supports validation via DataAnnotations
- Adheres to encapsulation and separation of concerns

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Options Interfaces - Lifecycle and Reload</summary>
  <div>

## Options Interfaces

**Real-life analogy**: Options interfaces are like different ways to access reference materials. A printed handbook (IOptions<T>) is static and doesn't change once printed. A daily briefing (IOptionsSnapshot<T>) is fresh for each day's activities. A live feed (IOptionsMonitor<T>) updates in real-time and notifies you of changes. The different options interfaces provide the same flexibility - static, per-request, or real-time updated configuration.

**Technical explanation**: Three interfaces provide options access with different characteristics. IOptions<T> is singleton and doesn't support reload - suitable for configuration that shouldn't change. IOptionsSnapshot<T> is scoped and reloads per request - suitable for per-request configuration that might change. IOptionsMonitor<T> is singleton and supports reload notifications via OnChange - suitable for configuration that might change and needs real-time updates. The choice depends on whether configuration should be static, per-request fresh, or dynamically updated.

**Key jargon explained**:
- **IOptions<T>**: Singleton, no reload support
- **IOptionsSnapshot<T>**: Scoped, reloads per request
- **IOptionsMonitor<T>**: Singleton, supports reload notifications
- **OnChange**: Event handler for configuration changes
- **CurrentValue**: Current options value from IOptionsMonitor

```csharp:title=IOptions.cs
// IOptions<T> - singleton, doesn't reload
public class StaticConfigService
{
    private readonly PositionOptions _options;

    public StaticConfigService(IOptions<PositionOptions> options)
    {
        _options = options.Value;  // Never changes
    }

    public void DoWork()
    {
        var name = _options.Name;  // Always the same value
    }
}
```

```csharp:title=IOptionsSnapshot.cs
// IOptionsSnapshot<T> - scoped, reloads per request
public class RequestScopedService
{
    private readonly PositionOptions _options;

    public RequestScopedService(IOptionsSnapshot<PositionOptions> options)
    {
        _options = options.Value;  // Fresh for each request
    }

    public void DoWork()
    {
        var name = _options.Name;  // Might be different each request
    }
}
```

```csharp:title=IOptionsMonitor.cs
// IOptionsMonitor<T> - singleton, supports reload notifications
public class DynamicConfigService
{
    private PositionOptions _options;

    public DynamicConfigService(IOptionsMonitor<PositionOptions> optionsMonitor)
    {
        _options = optionsMonitor.CurrentValue;
        optionsMonitor.OnChange(newOptions => _options = newOptions);
    }

    public void DoWork()
    {
        var name = _options.Name;  // Updates when configuration changes
    }
}
```

**How it works in practice**: IOptions<T> is registered as singleton and provides the same value throughout the application lifetime. IOptionsSnapshot<T> is registered as scoped and provides a fresh snapshot for each request, enabling per-request configuration. IOptionsMonitor<T> is registered as singleton and provides CurrentValue that updates when configuration changes, with OnChange callbacks for notification. The choice depends on configuration volatility and update requirements.

**Key takeaways for interviews**:
- IOptions<T>: Singleton, no reload, suitable for static configuration
- IOptionsSnapshot<T>: Scoped, reloads per request, suitable for per-request configuration
- IOptionsMonitor<T>: Singleton, supports reload notifications, suitable for dynamic configuration
- Choice depends on configuration volatility and update requirements
- OnChange enables reactive updates to configuration changes

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Options Validation - Configuration Verification</summary>
  <div>

## Options Validation

**Real-life analogy**: Options validation is like having quality control checks for forms. Before accepting a form, you verify required fields are filled, values are within acceptable ranges, and formats are correct. This prevents invalid data from entering the system. Options validation provides the same quality control for configuration - validating settings at startup to prevent invalid configuration from causing runtime errors.

**Technical explanation**: Options validation ensures configuration correctness at startup. DataAnnotations attributes like [Required], [Range], and [RegularExpression] decorate options class properties. ValidateDataAnnotations enables validation during options registration. Custom validation logic can be implemented via IValidateOptions<T>. Invalid configuration prevents application startup, failing fast with clear error messages. This prevents runtime errors from invalid configuration and ensures configuration correctness before the application handles requests.

**Key jargon explained**:
- **DataAnnotations**: Validation attributes for properties
- **ValidateDataAnnotations**: Enables DataAnnotations validation
- **IValidateOptions<T>**: Interface for custom validation logic
- **Fail Fast**: Prevent startup with invalid configuration
- **Validation Errors**: Clear error messages for invalid configuration

```csharp:title=Validation.cs
public class PositionOptions
{
    public const string Position = "Position";

    [Required]
    [StringLength(100, MinimumLength = 1)]
    public string? Name { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 1)]
    public string? Title { get; set; }
}
```

```csharp:title=Registration.cs
builder.Services.AddOptions<PositionOptions>()
    .Bind(builder.Configuration.GetSection(PositionOptions.Position))
    .ValidateDataAnnotations();
```

```csharp:title=CustomValidation.cs
public class PositionOptionsValidator : IValidateOptions<PositionOptions>
{
    public ValidateOptionsResult Validate(string name, PositionOptions options)
    {
        if (options.Name == options.Title)
        {
            return ValidateOptionsResult.Fail("Name and Title cannot be the same");
        }

        return ValidateOptionsResult.Success;
    }
}

// Register custom validator
builder.Services.AddSingleton<IValidateOptions<PositionOptions>, PositionOptionsValidator>();
```

**How it works in practice**: DataAnnotations attributes decorate options class properties to define validation rules. ValidateDataAnnotations enables validation during options registration. When the application starts, configuration is validated against these rules. If validation fails, the application fails to start with clear error messages indicating which properties failed and why. Custom validation via IValidateOptions<T> enables complex validation logic beyond DataAnnotations. This fail-fast approach prevents runtime errors from invalid configuration.

**Key takeaways for interviews**:
- DataAnnotations enable property-level validation
- ValidateDataAnnotations enables validation during registration
- Invalid configuration prevents application startup (fail fast)
- Custom validation via IValidateOptions<T> for complex logic
- Clear error messages indicate validation failures

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

**Real-life analogy**: Interview preparation for options pattern concepts is like understanding structured data management systems. You need to understand how to create structured forms, map data to forms, validate input, provide different access patterns, and ensure data integrity while maintaining flexibility.

**Common interview questions**:
1. **What is the options pattern and why is it useful?**
   - Provides strongly-typed access to groups of related settings
   - Adheres to encapsulation and separation of concerns
   - Enables compile-time checking and IntelliSense
   - Supports validation for configuration correctness
   - Replaces raw IConfiguration access with type-safe alternatives

2. **What are the different options interfaces and when should you use them?**
   - IOptions<T>: Singleton, no reload, suitable for static configuration
   - IOptionsSnapshot<T>: Scoped, reloads per request, suitable for per-request configuration
   - IOptionsMonitor<T>: Singleton, supports reload notifications, suitable for dynamic configuration
   - Choice depends on configuration volatility and update requirements

3. **How do you configure and use options?**
   - Create options class with properties matching configuration
   - Use Configure<T> to bind configuration section to options class
   - Inject IOptions<T>, IOptionsSnapshot<T>, or IOptionsMonitor<T> into services
   - Access options via .Value property or .CurrentValue

4. **How does options validation work?**
   - DataAnnotations attributes decorate options class properties
   - ValidateDataAnnotations enables validation during registration
   - Invalid configuration prevents application startup (fail fast)
   - Custom validation via IValidateOptions<T> for complex logic

5. **What are the benefits of the options pattern over raw IConfiguration?**
   - Strong typing with compile-time checking
   - IntelliSense support for properties
   - Encapsulation and separation of concerns
   - Validation support for configuration correctness
   - Different lifecycle patterns (singleton, scoped, reloadable)

**Key interview concepts**:
- **Strongly-Typed Configuration**: Type-safe access via classes
- **Configuration Binding**: Mapping configuration to object properties
- **Options Interfaces**: IOptions, IOptionsSnapshot, IOptionsMonitor
- **Validation**: DataAnnotations and custom validation
- **Architectural Principles**: Encapsulation and separation of concerns

**How to approach interview questions**:
- Start with clear definition of options pattern purpose
- Explain strongly-typed configuration benefits over raw IConfiguration
- Discuss different options interfaces and their use cases
- Address validation via DataAnnotations and custom validators
- Mention architectural principles (encapsulation, separation of concerns)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Options pattern in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/configuration/options?view=aspnetcore-10.0)