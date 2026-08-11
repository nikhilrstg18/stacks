---
title: "Configuration"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/4_configuration"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Configuration Overview - Like your phone's settings</summary>
  <div>

## What is Configuration?

**Real-life analogy**: Configuration is like your phone's settings. You can change brightness, volume, notifications, and other options from different places - the settings app, control center, or during setup. ASP.NET Core configuration works the same way - you can configure your app from files, environment variables, command line arguments, or other sources.

**Technical explanation**: Configuration in ASP.NET Core is performed using configuration providers that read key-value pairs from various sources. These sources include JSON files, environment variables, command-line arguments, Azure Key Vault, and custom providers. Configuration is accessed through the IConfiguration interface.

**Key jargon explained**:
- **Configuration Providers**: Components that read configuration from different sources
- **Key-Value Pairs**: The format configuration data is stored in (like "SettingName": "Value")
- **IConfiguration**: The interface for accessing configuration in your application
- **Configuration Sources**: Where configuration data comes from (files, environment variables, etc.)
- **Priority**: The order in which configuration sources override each other

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Access configuration
var setting = builder.Configuration["MySetting"];

var app = builder.Build();

app.MapGet("/", (IConfiguration config) =>
{
    var value = config["TechnicalContactEmail"];
    return $"Contact: {value}";
});

app.Run();
```

**How it works in practice**: Configuration providers read data from their sources and merge them into a single IConfiguration object. Later sources override earlier sources, so command-line arguments (highest priority) override environment variables, which override JSON files. This lets you have default settings in files and override them in production without changing code.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Reading Configuration - Like looking up information in a dictionary</summary>
  <div>

## Reading Configuration Values

**Real-life analogy**: Reading configuration is like looking up information in a dictionary. If you want to know the definition of a word, you look it up by its key (the word) and get the value (the definition). Configuration works the same way - you look up a setting by its key and get its value.

**Technical explanation**: Configuration is typically read by resolving the IConfiguration service and using configuration keys to obtain values. You can inject IConfiguration into your classes and access configuration values using dictionary-style indexing or the GetValue method.

**Key jargon explained**:
- **IConfiguration**: Interface for accessing configuration
- **Configuration Key**: The name used to look up a configuration value
- **Configuration Value**: The actual setting value
- **Indexer**: Dictionary-style access using square brackets
- **GetValue**: Method to get a typed configuration value

```csharp:title=Controller.cs
public class HomeController : Controller
{
    private readonly IConfiguration _configuration;

    public HomeController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IActionResult Index()
    {
        // Read configuration value
        var email = _configuration["TechnicalContactEmail"];
        var timeout = _configuration["ConnectionTimeout"];
        
        return View();
    }
}
```

### Reading in Razor Pages:
```csharp:title=Index.cshtml.cshtml
@page
@inject IConfiguration Config

<div>
    Technical Contact: @Config["TechnicalContactEmail"]
</div>
```

### Reading with Default Value:
```csharp:title=WithDefault.cs
var timeout = _configuration["ConnectionTimeout"] ?? "30";
var port = _configuration.GetValue<int>("ServerPort", 5000);
```

### Reading Nested Values:
```csharp:title=Nested.cs
var connectionString = _configuration["ConnectionStrings:DefaultDatabase"];
var loggingLevel = _configuration["Logging:LogLevel:Default"];
```

**How it works in practice**: Reading configuration:
- **Inject IConfiguration**: Add it to your constructor or use @inject in Razor
- **Access by Key**: Use the configuration key to get the value
- **Handle Nulls**: Use ?? operator or GetValue with default
- **Nested Keys**: Use colon notation for nested values (e.g., "Logging:LogLevel:Default")
- **Type Conversion**: GetValue<T>() converts values to specific types

Configuration is accessible throughout your application, making it easy to access settings anywhere you need them.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Default Configuration Sources - Like a stack of rule books</summary>
  <div>

## Default App Configuration Sources

**Real-life analogy**: Default configuration sources are like having a stack of rule books. The base rule book (appsettings.json) has general rules. Then there's a supplement for specific situations (appsettings.Production.json) that overrides the base rules. Finally, the manager (command line) can override everything with specific instructions for today.

**Technical explanation**: Default app configuration is loaded in a specific priority order. Later sources override earlier sources. The highest priority source is command-line arguments, followed by environment variables, user secrets, environment-specific JSON files, and finally the base appsettings.json file.

**Key jargon explained**:
- **Priority Order**: The order in which configuration sources override each other
- **appsettings.json**: Base configuration file with default settings
- **appsettings.{Environment}.json**: Environment-specific configuration
- **User Secrets**: Sensitive configuration for development only
- **Command-Line Arguments**: Settings passed when starting the app

### Configuration Priority (Highest to Lowest):
```csharp:title=Priority.cs
// 1. Command-line arguments (highest priority)
dotnet run --ConnectionTimeout=60

// 2. Environment variables (not ASPNETCORE_ or DOTNET_ prefixed)
export ConnectionTimeout=45

// 3. User secrets (Development only)
// Stored in user's profile, not in source code

// 4. appsettings.{Environment}.json
// appsettings.Production.json or appsettings.Development.json

// 5. appsettings.json (lowest priority)
// Base configuration file
```

### appsettings.json:
```json:title=appsettings.json
{
  "ConnectionTimeout": "30",
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

### appsettings.Production.json:
```json:title=appsettings.Production.json
{
  "ConnectionTimeout": "60",
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  }
}
```

**How it works in practice**: The priority system means:
- **Flexibility**: Override defaults for different environments
- **Security**: Keep sensitive data in environment variables or secrets
- **Development**: Use user secrets for local development settings
- **Production**: Override with environment variables or command line
- **No Code Changes**: Change behavior without modifying code

For example, you might set ConnectionTimeout to 30 in appsettings.json, override it to 60 in production via environment variables, and override it to 90 for a specific deployment via command line arguments.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>JSON Configuration Files - Like recipe cards</summary>
  <div>

## JSON Configuration Files

**Real-life analogy**: JSON configuration files are like recipe cards. The base recipe card (appsettings.json) has the standard recipe for a dish. Then you have special recipe cards for different occasions (appsettings.Production.json for restaurant service, appsettings.Development.json for home cooking). You use the base recipe and override it with the special occasion recipe when needed.

**Technical explanation**: JSON files are the most common configuration source in ASP.NET Core. The appsettings.json file contains default settings, while appsettings.{Environment}.json contains environment-specific overrides. The JSON Configuration Provider reads these files and merges them into the configuration.

**Key jargon explained**:
- **JSON Configuration Provider**: Component that reads JSON configuration files
- **appsettings.json**: Base configuration file
- **appsettings.{Environment}.json**: Environment-specific configuration
- **Environment**: The app's runtime environment (Development, Production, Staging)
- **Merge Process**: Combining configuration from multiple JSON files

### Base Configuration:
```json:title=appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### Development Override:
```json:title=appsettings.Development.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDevDb"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft": "Information"
    }
  }
}
```

### Production Override:
```json:title=appsettings.Production.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft": "Error"
    }
  }
}
```

### Accessing in Code:
```csharp:title=Accessing.cs
var builder = WebApplication.CreateBuilder(args);

var connection = builder.Configuration["ConnectionStrings:DefaultConnection"];
var logLevel = builder.Configuration["Logging:LogLevel:Default"];

var app = builder.Build();
```

**How it works in practice**: JSON configuration files provide:
- **Structure**: Hierarchical organization with nested sections
- **Type Safety**: JSON provides clear data types
- **Version Control**: Easy to track changes in source control
- **Environment-Specific**: Different settings for different environments
- **Merge Behavior**: Environment files override base file values

The JSON files are automatically loaded by default, so you just need to create them and add your settings.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Environment Variables - Like global settings on a computer</summary>
  <div>

## Environment Variables

**Real-life analogy**: Environment variables are like global settings on a computer. These are system-wide settings that affect all programs. For example, the time zone setting affects all programs on the computer. ASP.NET Core can read these global settings to configure your application without hard-coding values.

**Technical explanation**: Environment variables are a configuration source that's especially useful for production deployments. They're set by the hosting environment (Docker containers, cloud platforms, or servers) and can override settings from JSON files. Environment variables prefixed with ASPNETCORE_ are used for host configuration.

**Key jargon explained**:
- **Environment Variables**: System-wide configuration values
- **ASPNETCORE_ Prefix**: Prefix for host configuration variables
- **DOTNET_ Prefix**: Prefix for generic .NET configuration
- **Hosting Environment**: The environment where the app runs
- **Production Deployment**: Deploying to a live production environment

### Setting Environment Variables:
```bash:title=Command Line
# Windows
set ASPNETCORE_ENVIRONMENT=Production
set ConnectionStrings__DefaultConnection=Server=prod-db;Database=MyDb

# Linux/Mac
export ASPNETCORE_ENVIRONMENT=Production
export ConnectionStrings__DefaultConnection=Server=prod-db;Database=MyDb
```

### Docker Environment Variables:
```dockerfile:title=Dockerfile
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ConnectionStrings__DefaultConnection=Server=prod-db;Database=MyDb
```

### Accessing in Code:
```csharp:title=Accessing.cs
var environment = builder.Configuration["ASPNETCORE_ENVIRONMENT"];
var connection = builder.Configuration["ConnectionStrings:DefaultConnection"];
```

### Double Underscore for Nested Keys:
```bash:title=Nested
# JSON: {"ConnectionStrings": {"DefaultConnection": "..."}}
# Environment variable: Use __ for nesting
export ConnectionStrings__DefaultConnection="Server=prod-db;Database=MyDb"
```

**How it works in practice**: Environment variables are ideal for:
- **Production Secrets**: Keep sensitive data out of source code
- **Container Configuration**: Set variables in Docker or cloud platforms
- **Deployment Flexibility**: Change settings without redeploying
- **Environment-Specific**: Different settings per environment
- **CI/CD Pipelines**: Set variables during deployment automation

Environment variables override JSON file settings, making them perfect for production deployments where you don't want sensitive data in source code.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Command-Line Arguments - Like giving specific instructions</summary>
  <div>

## Command-Line Arguments

**Real-life analogy**: Command-line arguments are like giving specific instructions to someone before they start a task. If you tell someone "Take the red folder, not the blue one," that's a command-line argument that overrides their default behavior. ASP.NET Core command-line arguments work the same way - they override all other configuration sources.

**Technical explanation**: Command-line arguments are the highest priority configuration source. They're passed when starting the application and can override settings from JSON files, environment variables, and other sources. This is useful for one-off configurations or testing different settings without changing files.

**Key jargon explained**:
- **Command-Line Arguments**: Values passed when starting the application
- **Highest Priority**: Overrides all other configuration sources
- **One-Off Configuration**: Temporary settings for a single run
- **Testing**: Testing different configurations without changing files
- **Key-Value Syntax**: Setting values using Key=Value format

### Passing Arguments:
```bash:title=Command Line
# Setting a single value
dotnet run --ConnectionTimeout=60

# Setting multiple values
dotnet run --ConnectionTimeout=60 --Logging:LogLevel:Default=Debug

# Using key with colon
dotnet run --"Logging:LogLevel:Default=Debug"
```

### Using in Code:
```csharp:title=Accessing.cs
var timeout = builder.Configuration["ConnectionTimeout"];
var logLevel = builder.Configuration["Logging:LogLevel:Default"];
```

### Program.cs with Arguments:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// args contains command-line arguments
var app = builder.Build();

app.Run();
```

### Switch Mappings:
```csharp:title=SwitchMappings.cs
builder.WebHost.ConfigureAppConfiguration((context, config) =>
{
    config.AddCommandLine(args, new Dictionary<string, string>
    {
        { "-t", "ConnectionTimeout" },
        { "--timeout", "ConnectionTimeout" }
    });
});
```

**How it works in practice**: Command-line arguments are useful for:
- **Temporary Changes**: Test different settings without modifying files
- **Deployment Scripts**: Override settings during deployment
- **CI/CD**: Pass configuration from build pipelines
- **Testing**: Run with different configurations for tests
- **Flexibility**: Change behavior without code changes

Since command-line arguments have the highest priority, they're perfect for temporary overrides or deployment-specific settings that shouldn't be permanently configured.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>User Secrets - Like a personal notebook</summary>
  <div>

## User Secrets

**Real-life analogy**: User secrets are like a personal notebook where you write down sensitive information like passwords. You keep this notebook hidden away (in your user profile, not in the project) so it doesn't accidentally get shared with others when you share your project. This keeps sensitive data safe from being committed to source control.

**Technical explanation**: User Secrets is a development-only feature that stores sensitive configuration in a file in your user profile, outside the project directory. This prevents sensitive data like API keys and connection strings from being committed to source control. User Secrets are only loaded in the Development environment.

**Key jargon explained**:
- **User Secrets**: Sensitive configuration stored in user profile
- **Secrets.json**: The file where secrets are stored (hidden from git)
- **Development Environment**: Only used when ASPNETCORE_ENVIRONMENT is Development
- **Source Control Safety**: Prevents secrets from being committed
- **Secret Manager Tool**: Command-line tool to manage user secrets

### Initializing User Secrets:
```bash:title=CLI
# Navigate to project folder
cd MyProject

# Initialize user secrets
dotnet user-secrets init
```

### Setting Secrets:
```bash:title=CLI
# Set a secret
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Database=MyDevDb"

# List all secrets
dotnet user-secrets list

# Remove a secret
dotnet user-secrets remove "ConnectionStrings:DefaultConnection"
```

### Accessing Secrets in Code:
```csharp:title=Accessing.cs
var builder = WebApplication.CreateBuilder(args);

// Secrets are automatically loaded in Development
var connection = builder.Configuration["ConnectionStrings:DefaultConnection"];

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connection));

var app = builder.Build();
```

### Typical Secrets:
```json:title=Secrets.json (in user profile)
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDevDb"
  },
  "ApiKey": "your-api-key-here",
  "PaymentProcessorKey": "your-payment-key"
}
```

**How it works in practice**: User Secrets provide:
- **Security**: Sensitive data never enters source control
- **Development Only**: Automatically disabled in production
- **Team Safety**: Each developer has their own secrets
- **Easy Management**: Simple CLI tool to manage secrets
- **Environment-Specific**: Different secrets per developer

User Secrets are perfect for development database connections, API keys, and other sensitive data that shouldn't be shared or committed to source control.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Options Pattern - Like creating a settings object</summary>
  <div>

## Options Pattern

**Real-life analogy**: The Options pattern is like creating a settings object for a device. Instead of looking up individual settings every time you need them, you create a settings object that contains all the relevant settings. This is cleaner and easier to work with than looking up individual values scattered throughout your code.

**Technical explanation**: The Options pattern provides a way to bind configuration to strongly-typed classes. Instead of accessing configuration by string keys throughout your application, you create classes that represent configuration sections and bind configuration to them. This provides type safety and better code organization.

**Key jargon explained**:
- **Options Pattern**: Binding configuration to strongly-typed classes
- **IOptions<T>: Interface for accessing options
- **IOptionsSnapshot<T>: Interface for options that never change
- **IOptionsMonitor<T>: Interface for options that can change
- **Bind**: Method to bind configuration to a class

### Options Class:
```csharp:title=Options.cs
public class EmailSettings
{
    public const string SectionName = "EmailSettings";
    
    public string SmtpServer { get; set; } = string.Empty;
    public int Port { get; set; } = 25;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
```

### Configuration File:
```json:title=appsettings.json
{
  "EmailSettings": {
    "SmtpServer": "smtp.example.com",
    "Port": 587,
    "Username": "admin@example.com",
    "Password": "secret123"
  }
}
```

### Register Options:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection(EmailSettings.SectionName));

var app = builder.Build();
```

### Using Options:
```csharp:title=Controller.cs
public class EmailService
{
    private readonly EmailSettings _settings;

    public EmailService(IOptions<EmailSettings> options)
    {
        _settings = options.Value;
    }

    public void SendEmail()
    {
        var server = _settings.SmtpServer;
        var port = _settings.Port;
        // Use settings
    }
}
```

### Options Variants:
```csharp:title=Variants.cs
// IOptions<T>: Value never changes after startup
// IOptionsSnapshot<T>: Value changes on each request
// IOptionsMonitor<T>: Value changes when configuration changes

public class MyService
{
    // Value is cached for the app lifetime
    public MyService(IOptions<EmailSettings> options) { }

    // Value is cached for the request lifetime
    public MyService(IOptionsSnapshot<EmailSettings> options) { }

    // Value updates when configuration changes
    public MyService(IOptionsMonitor<EmailSettings> monitor) { }
}
```

**How it works in practice**: The Options pattern provides:
- **Type Safety**: Compile-time checking of configuration access
- **IntelliSense**: IDE support when accessing properties
- **Refactoring**: Easier to rename properties
- **Validation**: Can validate configuration at startup
- **Organization**: Related settings grouped in classes

The Options pattern is the recommended way to access configuration in production applications, providing a clean, type-safe alternative to string-based configuration access.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Configuration Best Practices - Like following a recipe</summary>
  <div>

## Configuration Best Practices

**Real-life analogy**: Following configuration best practices is like following a recipe. You could throw ingredients together randomly and hope for the best, or you could follow a proven recipe with specific steps and measurements. The same applies to configuration - follow established practices for secure, maintainable applications.

**Technical explanation**: Following configuration best practices ensures your configuration is secure, maintainable, and works correctly across different environments. This includes using the right sources for different types of data, securing sensitive information, and organizing configuration logically.

**Key jargon explained**:
- **Security**: Protecting sensitive data like passwords and API keys
- **Maintainability**: Keeping configuration easy to understand and modify
- **Environment-Specific**: Different settings for different environments
- **Validation**: Ensuring configuration values are correct at startup
- **Documentation**: Recording what each configuration setting does

### DO:
- **Use User Secrets** for sensitive development data
- **Use Environment Variables** for production secrets
- **Use JSON files** for non-sensitive default settings
- **Use Options Pattern** for type-safe configuration access
- **Document** what each configuration setting does
- **Validate configuration** at application startup
- **Organize configuration** into logical sections
- **Use environment-specific files** (appsettings.Production.json)

### DON'T:
- **Commit secrets** to source control (passwords, API keys)
- **Hardcode** sensitive values in code
- **Put all settings** in one flat structure
- **Use string keys** throughout your application (use Options pattern)
- **Ignore environment differences** (Development vs Production)
- **Forget to document** configuration values
- **Mix configuration** with business logic

### Secure Configuration Example:
```csharp:title=Secure.cs
// GOOD: Use environment variables for secrets
var apiKey = builder.Configuration["ApiKey"]; // Set in environment

// BAD: Hardcode secrets
var apiKey = "sk-1234567890abcdef"; // Don't do this!

// GOOD: Use options pattern
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));

// BAD: Use string keys everywhere
var smtp = builder.Configuration["EmailSettings:SmtpServer"];
```

### Environment-Specific Configuration:
```json:title=appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

```json:title=appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft": "Information"
    }
  }
}
```

```json:title=appsettings.Production.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft": "Error"
    }
  }
}
```

**How it works in practice**: Following best practices ensures:
- **Security**: Sensitive data never enters source control
- **Flexibility**: Easy to change settings per environment
- **Type Safety**: Compile-time checking of configuration access
- **Maintainability**: Clear organization and documentation
- **Reliability**: Validation catches configuration errors at startup
- **Team Collaboration**: Different developers can have their own development secrets

Good configuration practices make your application more secure, easier to maintain, and more flexible for different deployment scenarios.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Configuration in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/configuration/?view=aspnetcore-10.0)