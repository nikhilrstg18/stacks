---
title: "Options Pattern"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/5_options_pattern"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Options Pattern - Like creating a settings object for your app</summary>
  <div>

## What is the Options Pattern?

**Real-life analogy**: The Options pattern is like creating a settings object for a device. Instead of looking up individual settings every time you need them (like checking the brightness, then the volume, then the notifications), you create a single settings object that contains all the relevant settings. This is cleaner and easier to work with than looking up individual values scattered throughout your code.

**Technical explanation**: The Options pattern uses classes to provide strongly-typed access to groups of related settings. Instead of accessing configuration by string keys throughout your application, you create classes that represent configuration sections and bind configuration to them. This provides type safety, IntelliSense support, and better code organization.

**Key jargon explained**:
- **Options Pattern**: Binding configuration to strongly-typed classes
- **POCO**: Plain Old CLR Object - a simple class with properties
- **Strongly-Typed**: Using actual types (int, string, bool) instead of strings
- **Configuration Binding**: Mapping configuration data to class properties
- **Encapsulation**: Keeping related settings together in a class

```csharp:title=PositionOptions.cs
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

**How it works in practice**: The Options pattern:
- Creates a class with properties matching your configuration
- Binds configuration to the class automatically
- Provides type-safe access to configuration values
- Gives you IntelliSense and compile-time checking
- Organizes related settings into logical groups

This is much better than using string keys like `config["Position:Name"]` because you get type safety and better code organization.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Basic Options Binding - Like filling out a form</summary>
  <div>

## Basic Options Binding

**Real-life analogy**: Basic options binding is like filling out a form. The form has blank fields (your class properties), and you fill them in with information from a document (your configuration file). Once the form is filled, you have all the information in one organized place instead of looking it up piece by piece.

**Technical explanation**: Basic options binding uses the ConfigurationBinder.Bind method to bind a configuration section to a class instance. The class properties must match the configuration keys, and the binder automatically populates the properties with the corresponding configuration values.

**Key jargon explained**:
- **ConfigurationBinder.Bind**: Method that maps configuration to a class
- **Configuration Section**: A portion of configuration (like "Position")
- **Property Matching**: Class properties must match configuration keys
- **Automatic Binding**: The framework populates properties automatically
- **OnInitialized**: Method where binding typically happens in components

### Options Class:
```csharp:title=PositionOptions.cs
public class PositionOptions
{
    public const string Position = "Position";

    public string? Name { get; set; }
    public string? Title { get; set; }
}
```

### Configuration:
```json:title=appsettings.json
{
  "Position": {
    "Name": "Joe Smith",
    "Title": "Editor"
  }
}
```

### Binding in Code:
```csharp:title=Component.cs
@inject IConfiguration Config

@code {
    private PositionOptions? positionOptions;

    protected override void OnInitialized()
    {
        positionOptions = new PositionOptions();
        Config.GetSection(PositionOptions.Position).Bind(positionOptions);
    }
}
```

### Displaying Values:
```html:title=Display.cshtml
Name: @positionOptions?.Name<br>
Title: @positionOptions?.Title
```

**How it works in practice**: Basic binding:
1. Create a class with properties matching your configuration
2. Create an instance of the class
3. Call GetSection to get the configuration section
4. Call Bind to populate the class properties
5. Use the class to access configuration values

The const field (like `Position = "Position"`) avoids hardcoding the section name in your code, making it easier to refactor.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>IOptions Interface - Like choosing how often to check settings</summary>
  <div>

## IOptions, IOptionsSnapshot, and IOptionsMonitor

**Real-life analogy**: These interfaces are like choosing how often to check your phone's settings. IOptions is like checking settings once when you turn the phone on - they never change. IOptionsSnapshot is like checking settings for each app you open - they might be different per app. IOptionsMonitor is like checking settings whenever they change - you always get the latest.

**Technical explanation**: ASP.NET Core provides three interfaces for accessing options with different reload behaviors. IOptions<T> is cached for the app lifetime and never reloads. IOptionsSnapshot<T> is cached per request and reloads on each request. IOptionsMonitor<T> reloads whenever configuration changes.

**Key jargon explained**:
- **IOptions<T>: Options that never change after app startup
- **IOptionsSnapshot<T>: Options that can change per request
- **IOptionsMonitor<T>: Options that update when configuration changes
- **App Lifetime**: The entire time the application is running
- **Request Lifetime**: The time it takes to handle one HTTP request

### IOptions<T> - Never Changes:
```csharp:title=IOptions.cs
public class MyService
{
    private readonly PositionOptions _options;

    // Value is cached when app starts, never reloads
    public MyService(IOptions<PositionOptions> options)
    {
        _options = options.Value;
    }
}
```

### IOptionsSnapshot<T> - Per Request:
```csharp:title=IOptionsSnapshot.cs
public class MyService
{
    private readonly PositionOptions _options;

    // Value is cached per request, can change between requests
    public MyService(IOptionsSnapshot<PositionOptions> options)
    {
        _options = options.Value;
    }
}
```

### IOptionsMonitor<T> - Always Current:
```csharp:title=IOptionsMonitor.cs
public class MyService
{
    private readonly PositionOptions _options;

    // Value updates when configuration changes
    public MyService(IOptionsMonitor<PositionOptions> monitor)
    {
        _options = monitor.CurrentValue;
    }

    // Subscribe to changes
    public void SubscribeToChanges()
    {
        _monitor.OnChange((options, name) =>
        {
            Console.WriteLine($"Options changed: {options.Name}");
        });
    }
}
```

### When to Use Each:
```csharp:title=Guidance.cs
// Use IOptions<T> for:
// - Configuration that never changes
// - Singleton services
// - Best performance (no reloading overhead)

// Use IOptionsSnapshot<T> for:
// - Configuration that might change per request
// - Scoped services
// - Request-specific configuration

// Use IOptionsMonitor<T> for:
// - Configuration that changes at runtime
// - Need to react to configuration changes
// - Real-time configuration updates
```

**How it works in practice**: Choose the right interface:
- **IOptions**: Fastest, but never reloads - good for static settings
- **IOptionsSnapshot**: Reloads per request - good for request-specific settings
- **IOptionsMonitor**: Reloads on change - good for dynamic configuration

Most applications use IOptions for most settings, only using the others when you need dynamic configuration.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Registering Options - Like adding a service to the menu</summary>
  <div>

## Registering Options in DI Container

**Real-life analogy**: Registering options is like adding a service to the menu. You tell the restaurant (DI container) what services (options) you offer, and when customers (your classes) order them, the restaurant provides them. The restaurant remembers what's available and serves it when requested.

**Technical explanation**: To use the Options pattern, you must register the options class in the dependency injection container using the Configure method. This tells ASP.NET Core how to create and provide the options class when it's requested by other classes.

**Key jargon explained**:
- **Dependency Injection (DI) Container**: The service provider in ASP.NET Core
- **Configure Method**: Method to register options in the DI container
- **Service Registration**: Adding a service to the DI container
- **Service Resolution**: Getting a service from the DI container
- **Program.cs**: The file where you typically register services

### Registering Options:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register options in DI container
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection(PositionOptions.Position));

var app = builder.Build();
```

### Using Registered Options:
```csharp:title=Service.cs
public class MyService
{
    private readonly PositionOptions _options;

    // Options are automatically provided by DI
    public MyService(IOptions<PositionOptions> options)
    {
        _options = options.Value;
    }

    public void DoWork()
    {
        var name = _options.Name;
        var title = _options.Title;
        // Use options
    }
}
```

### Registering Multiple Options:
```csharp:title=Multiple.cs
var builder = WebApplication.CreateBuilder(args);

// Register multiple options classes
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection("Position"));

builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));

builder.Services.Configure<DatabaseSettings>(
    builder.Configuration.GetSection("DatabaseSettings"));
```

### Registering with Validation:
```csharp:title=Validation.cs
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection("Position"))
    .Validate(options =>
    {
        return !string.IsNullOrEmpty(options.Name) &&
               !string.IsNullOrEmpty(options.Title);
    }, "Name and Title are required");
```

**How it works in practice**: Registration process:
1. Create your options class
2. Call Configure in Program.cs
3. Specify the configuration section to bind
4. The DI container now knows how to provide the options
5. Inject IOptions<T> into your classes to use them

Registering options makes them available throughout your application via dependency injection.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Named Options - Like having multiple profiles</summary>
  <div>

## Named Options

**Real-life analogy**: Named options are like having multiple user profiles on a device. Each profile has different settings - one for gaming, one for work, one for reading. You can choose which profile to use based on what you're doing. Named options work the same way - you can have multiple configurations and choose which one to use.

**Technical explanation**: Named options allow you to register multiple instances of the same options class with different names. This is useful when you need different configurations for different scenarios, like different database connections or different API endpoints.

**Key jargon explained**:
- **Named Options**: Multiple instances of the same options class with different names
- **Options Name**: A string identifier for a specific options instance
- **Default Name**: The default name used when no name is specified
- **IOptionsSnapshot<T>: Can access named options
- **Scenario-Specific**: Different configurations for different situations

### Configuration:
```json:title=appsettings.json
{
  "Position": {
    "Default": {
      "Name": "Joe Smith",
      "Title": "Editor"
    },
    "Manager": {
      "Name": "Jane Doe",
      "Title": "Manager"
    }
  }
}
```

### Registering Named Options:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register default options
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection("Position:Default"));

// Register named options
builder.Services.Configure<PositionOptions>("Manager",
    builder.Configuration.GetSection("Position:Manager"));
```

### Using Named Options:
```csharp:title=Usage.cs
public class MyService
{
    private readonly PositionOptions _defaultOptions;
    private readonly PositionOptions _managerOptions;

    public MyService(IOptionsSnapshot<PositionOptions> options)
    {
        // Get default options
        _defaultOptions = options.Get(PositionOptions.Position);

        // Get named options
        _managerOptions = options.Get("Manager");
    }
}
```

### Using IOptionsMonitor:
```csharp:title=Monitor.cs
public class MyService
{
    private readonly PositionOptions _managerOptions;

    public MyService(IOptionsMonitor<PositionOptions> monitor)
    {
        // Get named options with monitor
        _managerOptions = monitor.Get("Manager");
    }
}
```

**How it works in practice**: Named options provide:
- **Multiple Configurations**: Different settings for different scenarios
- **Flexibility**: Choose which configuration to use at runtime
- **Type Safety**: Still strongly-typed, just multiple instances
- **Clean Code**: Separate configurations instead of conditional logic

Named options are useful when you have different configurations for different environments, users, or scenarios.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Options Validation - Like checking a form before submitting</summary>
  <div>

## Options Validation

**Real-life analogy**: Options validation is like checking a form before submitting it. You make sure required fields are filled, email addresses are valid, and phone numbers have the right format. If something is wrong, you fix it before submitting. ASP.NET Core does the same with configuration - it validates options before the app starts.

**Technical explanation**: Options validation ensures configuration values are correct before the application uses them. You can add validation rules to your options classes, and ASP.NET Core will validate them at startup. If validation fails, the app won't start, preventing it from running with invalid configuration.

**Key jargon explained**:
- **Options Validation**: Checking that configuration values are correct
- **Data Annotations**: Attributes that add validation rules to properties
- **Startup Validation**: Validation happens when the app starts
- **Validation Rules**: Conditions that configuration must meet
- **Startup Failure**: App won't start if validation fails

### Using Data Annotations:
```csharp:title=PositionOptions.cs
using System.ComponentModel.DataAnnotations;

public class PositionOptions
{
    public const string Position = "Position";

    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, MinimumLength = 2)]
    public string? Name { get; set; }

    [Required(ErrorMessage = "Title is required")]
    public string? Title { get; set; }
}
```

### Registering with Validation:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register with data annotation validation
builder.Services.AddOptions<PositionOptions>()
    .Bind(builder.Configuration.GetSection(PositionOptions.Position))
    .ValidateDataAnnotations();

var app = builder.Build();
```

### Custom Validation:
```csharp:title=CustomValidation.cs
builder.Services.AddOptions<PositionOptions>()
    .Bind(builder.Configuration.GetSection(PositionOptions.Position))
    .Validate(options =>
    {
        // Custom validation logic
        if (options.Name == "Admin" && options.Title != "Administrator")
        {
            return false;
        }
        return true;
    }, "Admin must have Administrator title");
```

### Complex Validation:
```csharp:title=Complex.cs
builder.Services.AddOptions<PositionOptions>()
    .Bind(builder.Configuration.GetSection(PositionOptions.Position))
    .Validate(options =>
    {
        // Multiple validation rules
        return !string.IsNullOrEmpty(options.Name) &&
               !string.IsNullOrEmpty(options.Title) &&
               options.Name.Length >= 2 &&
               options.Title.Length >= 2;
    }, "Name and Title must be at least 2 characters");
```

**How it works in practice**: Options validation:
- **Data Annotations**: Use attributes for common validation rules
- **Custom Validation**: Write custom logic for complex rules
- **Startup Check**: Validation happens before app starts
- **Fail Fast**: App won't start with invalid configuration
- **Error Messages**: Clear error messages when validation fails

Validation prevents your app from running with bad configuration, catching errors early instead of at runtime.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Options Reload - Like updating settings while the app runs</summary>
  <div>

## Options Reload

**Real-life analogy**: Options reload is like updating your phone's settings while you're using it. If you change the brightness, the screen brightness changes immediately without needing to restart your phone. ASP.NET Core can do the same with configuration - you can change settings and the app updates without restarting.

**Technical explanation**: Options reload allows configuration changes to be detected and applied while the application is running. This is useful for changing settings without restarting the application. IOptionsMonitor<T> automatically reloads when configuration changes, while IOptionsSnapshot<T> reloads on each request.

**Key jargon explained**:
- **Options Reload**: Updating configuration while the app runs
- **Configuration Change**: When configuration files are modified
- **Hot Reload**: Changes applied without restarting the app
- **Change Detection**: System that notices when configuration changes
- **IOptionsMonitor<T>: Interface that supports reload

### Enabling Reload:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Configure with reload support
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection(PositionOptions.Position));

// Register change token source for JSON files
builder.Services.AddOptions<PositionOptions>()
    .Bind(builder.Configuration.GetSection(PositionOptions.Position))
    .Configure<IConfiguration>((options, config) =>
    {
        config.GetSection(PositionOptions.Position).Bind(options);
    });

var app = builder.Build();
```

### Using IOptionsMonitor for Reload:
```csharp:title=Monitor.cs
public class MyService
{
    private readonly IOptionsMonitor<PositionOptions> _monitor;

    public MyService(IOptionsMonitor<PositionOptions> monitor)
    {
        _monitor = monitor;

        // Subscribe to changes
        _monitor.OnChange((options, name) =>
        {
            Console.WriteLine($"Options changed: {options.Name}");
        });
    }

    public void GetCurrentOptions()
    {
        var options = _monitor.CurrentValue;
        // Always get the latest configuration
    }
}
```

### Using IOptionsSnapshot for Request-Level Reload:
```csharp:title=Snapshot.cs
public class MyService
{
    private readonly IOptionsSnapshot<PositionOptions> _options;

    public MyService(IOptionsSnapshot<PositionOptions> options)
    {
        _options = options;
    }

    public void ProcessRequest()
    {
        // Gets configuration at the start of each request
        var options = _options.Value;
    }
}
```

### Configuration Change:
```json:title=appsettings.json
// Change this while the app is running
{
  "Position": {
    "Name": "Jane Doe",
    "Title": "Manager"
  }
}
```

**How it works in practice**: Options reload provides:
- **No Restart Needed**: Change configuration without restarting
- **Real-Time Updates**: Changes applied immediately
- **Development Friendly**: Easy to test different configurations
- **Production Use**: Can update settings without downtime
- **Change Notifications**: Get notified when configuration changes

Note: In production, be careful with reload as it can cause unexpected behavior if not handled properly.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following a recipe for success</summary>
  <div>

## Options Pattern Best Practices

**Real-life analogy**: Following options pattern best practices is like following a recipe for success. You could throw ingredients together randomly and hope for the best, or you could follow proven steps that ensure good results every time. The same applies to the Options pattern - follow established practices for clean, maintainable code.

**Technical explanation**: Following best practices ensures your options are well-organized, type-safe, and easy to maintain. This includes using the right interfaces, validating configuration, organizing options logically, and documenting what each option does.

**Key jargon explained**:
- **Type Safety**: Using actual types instead of strings
- **Encapsulation**: Keeping related settings together
- **Separation of Concerns**: Different settings in different classes
- **Validation**: Ensuring configuration values are correct
- **Documentation**: Recording what each option does

### DO:
- **Use Options Pattern** instead of string-based configuration access
- **Create separate classes** for different configuration sections
- **Use IOptions<T>:** for most scenarios (best performance)
- **Validate options** at startup to catch errors early
- **Use const fields** for section names to avoid hardcoding
- **Document options** with XML comments
- **Organize options** logically by feature or domain
- **Use named options** when you need multiple configurations

### DON'T:
- **Access configuration** by string keys throughout your code
- **Put all settings** in one giant options class
- **Use IOptionsSnapshot<T>:** unless you need per-request configuration
- **Forget validation** - catch errors at startup, not runtime
- **Hardcode section names** - use const fields instead
- **Mix options** with business logic
- **Create circular dependencies** in your options classes
- **Ignore configuration changes** if they matter to your app

### Good Example:
```csharp:title=Good.cs
// Organized by feature
public class EmailSettings
{
    public const string SectionName = "EmailSettings";
    
    [Required]
    public string SmtpServer { get; set; } = string.Empty;
    
    [Range(1, 65535)]
    public int Port { get; set; } = 25;
}

public class DatabaseSettings
{
    public const string SectionName = "DatabaseSettings";
    
    [Required]
    public string ConnectionString { get; set; } = string.Empty;
}

// Register with validation
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection(EmailSettings.SectionName))
    .ValidateDataAnnotations();
```

### Bad Example:
```csharp:title=Bad.cs
// Everything in one class
public class AppSettings
{
    public string EmailSmtpServer { get; set; } = string.Empty;
    public int EmailPort { get; set; } = 25;
    public string DatabaseConnectionString { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    // ... 50 more properties
}

// Access by string keys
var smtp = config["AppSettings:EmailSmtpServer"];
var port = config["AppSettings:EmailPort"];
```

**How it works in practice**: Following best practices ensures:
- **Type Safety**: Compile-time checking prevents errors
- **Maintainability**: Organized code is easier to understand
- **Performance**: Using the right interface for the job
- **Reliability**: Validation catches configuration errors early
- **Flexibility**: Easy to add or change configuration
- **Team Collaboration**: Clear structure helps others understand your code

Good practices make your code more professional, reliable, and easier to work with.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Options pattern in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/configuration/options?view=aspnetcore-10.0)