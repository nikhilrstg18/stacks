---
title: "Configuration"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/4_configuration"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Configuration Overview - Provider Pattern</summary>
  <div>

## Configuration in ASP.NET Core

**Real-life analogy**: Configuration implements the Provider pattern to abstract data sources, similar to how a modern warehouse management system can receive inventory data from multiple sources - spreadsheets, databases, API feeds, or manual entry. The system doesn't care where the data comes from; it just needs a consistent interface to access it. ASP.NET Core configuration works the same way, unifying settings from files, environment variables, command-line arguments, and cloud services behind a single IConfiguration interface.

**Technical explanation**: Configuration in ASP.NET Core is based on key-value pairs established by configuration providers. Multiple providers contribute to a hierarchical configuration tree, with later providers overriding earlier ones. This enables the 12-factor app principle of storing config in the environment. The Configuration API (IConfiguration) provides unified access to settings regardless of source. WebApplication.CreateBuilder preconfigures default providers following the priority hierarchy: command-line args (highest), environment variables, user secrets (dev only), environment-specific JSON files, base JSON file, and host configuration.

**Key jargon explained**:
- **Configuration Providers**: Components that read configuration from different sources
- **IConfiguration**: Unified interface for accessing configuration regardless of source
- **Provider Priority**: Later providers override earlier ones in the hierarchy
- **12-Factor App**: Methodology for building cloud-native apps with environment-based config
- **Hierarchical Configuration**: Nested key-value structure supporting complex settings

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Access configuration
var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
var setting = builder.Configuration["MySetting"];

// Use configuration in services
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();
```

```json:title=appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb"
  },
  "AllowedHosts": "*"
}
```

**How it works in practice**: Configuration providers are added in priority order - later providers override earlier ones. This enables environment-specific overrides: base settings in appsettings.json, development overrides in appsettings.Development.json, production overrides in appsettings.Production.json, and runtime overrides via environment variables or command-line args. The Options pattern provides strongly-typed configuration through IOptions<T>, supporting validation, reload notifications, and named options.

**Key takeaways for interviews**:
- Configuration uses Provider pattern to abstract multiple data sources
- Later providers override earlier ones in the priority hierarchy
- IConfiguration provides unified access regardless of source
- Supports 12-factor app principle for cloud-native applications
- Options pattern provides strongly-typed configuration with validation

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Configuration Providers - Multiple Data Sources</summary>
  <div>

## Configuration Providers

**Real-life analogy**: Configuration providers are like different data channels feeding into a central dashboard. You might have data from sensors, user input, external APIs, and manual overrides all converging into one display. The dashboard doesn't care about the source; it just presents the unified view. ASP.NET Core configuration providers work the same way - JSON files, environment variables, command-line args, and cloud services all feed into a unified configuration system.

**Technical explanation**: Configuration providers read configuration data from various sources and contribute to the IConfiguration object. Built-in providers include JSON files (appsettings.json), environment variables, command-line arguments, user secrets (development only), Azure Key Vault, and in-memory collections. Multiple providers can be enabled simultaneously, with later providers overriding earlier ones based on registration order. Custom providers can be created for specialized data sources.

**Key jargon explained**:
- **JSON Configuration Provider**: Reads settings from JSON files
- **Environment Variables Provider**: Reads system environment variables
- **Command-Line Provider**: Reads command-line arguments
- **User Secrets Provider**: Development-only secret storage in user profile
- **Custom Provider**: User-created provider for specialized data sources

```csharp:title=Providers.cs
var builder = WebApplication.CreateBuilder(args);

// Default providers (automatically added):
// - appsettings.json
// - appsettings.{Environment}.json
// - User secrets (Development only)
// - Environment variables
// - Command-line arguments

// Add custom providers
builder.Configuration.AddJsonFile("custom.json", optional: true);
builder.Configuration.AddInMemoryCollection(new Dictionary<string, string>
{
    { "MySetting", "CustomValue" }
});

// Add Azure Key Vault
builder.Configuration.AddAzureKeyVault(keyVaultUrl, clientId, clientSecret);
```

```csharp:title=EnvironmentVariables.cs
// Environment variables override JSON settings
// Set via: set MySetting=ProductionValue
// Accessed via: builder.Configuration["MySetting"]

// Nested configuration uses double underscore
// Set via: set ConnectionStrings__DefaultConnection=Server=prod-db
// Accessed via: builder.Configuration["ConnectionStrings:DefaultConnection"]
```

**How it works in practice**: Providers are added in priority order - later providers override earlier ones. This enables flexible configuration management: base settings in JSON files, environment-specific overrides, runtime overrides via environment variables, and deployment-specific overrides via command-line arguments. The provider abstraction enables adding new configuration sources without changing application code, supporting the Open/Closed Principle.

**Key takeaways for interviews**:
- Multiple providers contribute to unified configuration
- Later providers override earlier ones based on registration order
- Built-in providers support files, environment variables, command-line args
- Custom providers can be created for specialized data sources
- Provider abstraction enables adding new sources without code changes

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Options Pattern - Strongly-Typed Configuration</summary>
  <div>

## Options Pattern

**Real-life analogy**: The Options pattern is like having a typed configuration class instead of accessing raw dictionary data. Instead of looking up "connection_string" in a dictionary and hoping it's the right format, you have a ConnectionString class with strongly-typed properties. This provides compile-time checking, IntelliSense support, and validation - much safer than working with raw strings and dictionaries.

**Technical explanation**: The Options pattern provides strongly-typed configuration through IOptions<T>, IOptionsSnapshot<T>, and IOptionsMonitor<T> interfaces. Configuration is bound to object graphs using ConfigurationBinder, supporting complex nested structures. The pattern supports validation (DataAnnotations), reload notifications (IOptionsMonitor), and named options for multiple configurations of the same type. This replaces raw IConfiguration access with type-safe, validated configuration objects.

**Key jargon explained**:
- **IOptions<T>: Singleton options that don't support reload
- **IOptionsSnapshot<T>: Scoped options that support reload per request
- **IOptionsMonitor<T>: Singleton options that support reload notifications
- **Configuration Binding**: Mapping JSON structure to object properties
- **Options Validation**: Using DataAnnotations to validate configuration

```csharp:title=OptionsClass.cs
public class MyOptions
{
    public const string MySection = "MySection";
    public string Setting1 { get; set; }
    public int Setting2 { get; set; }
    public List<string> AllowedValues { get; set; }
}
```

```csharp:title=Program.cs
// Register options
builder.Services.Configure<MyOptions>(
    builder.Configuration.GetSection(MyOptions.MySection));

// With validation
builder.Services.AddOptions<MyOptions>()
    .Bind(builder.Configuration.GetSection(MyOptions.MySection))
    .ValidateDataAnnotations();
```

```csharp:title=Usage.cs
public class MyService
{
    private readonly MyOptions _options;

    // IOptions<T> - singleton, doesn't reload
    public MyService(IOptions<MyOptions> options)
    {
        _options = options.Value;
    }

    // IOptionsMonitor<T> - singleton, supports reload
    public MyService(IOptionsMonitor<MyOptions> optionsMonitor)
    {
        _options = optionsMonitor.CurrentValue;
        optionsMonitor.OnChange(newOptions => _options = newOptions);
    }
}
```

```json:title=appsettings.json
{
  "MySection": {
    "Setting1": "Value1",
    "Setting2": 42,
    "AllowedValues": ["Option1", "Option2", "Option3"]
  }
}
```

**How it works in practice**: The Options pattern provides type safety, compile-time checking, and validation that raw IConfiguration access lacks. IOptions<T> is singleton and doesn't support reload. IOptionsSnapshot<T> is scoped and reloads per request. IOptionsMonitor<T> is singleton and supports reload notifications via OnChange. Configuration binding maps JSON structures to object graphs, supporting complex nested types, collections, and dictionaries.

**Key takeaways for interviews**:
- Options pattern provides strongly-typed configuration
- IOptions<T>, IOptionsSnapshot<T>, IOptionsMonitor<T> for different scenarios
- Supports validation via DataAnnotations
- Configuration binding maps JSON to object graphs
- Enables compile-time checking and IntelliSense support

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Configuration Best Practices - 12-Factor Apps</summary>
  <div>

## Configuration Best Practices

**Real-life analogy**: Following configuration best practices is like following security protocols for sensitive information. You wouldn't write passwords on sticky notes, share them via email, or commit them to public repositories. Instead, you use secure vaults, environment-specific settings, and proper access controls. Configuration best practices follow the same principles for application settings and secrets.

**Technical explanation**: Configuration best practices ensure applications are secure, maintainable, and follow the 12-factor app methodology. Key practices include using environment-specific configuration files, never committing secrets to source control, using the Options pattern for type safety, validating configuration at startup, and using appropriate configuration sources for different scenarios. These practices prevent security breaches, enable environment flexibility, and ensure configuration correctness.

**Key jargon explained**:
- **12-Factor App**: Methodology for building cloud-native applications
- **Environment-Specific Configuration**: Different settings for dev, staging, production
- **Secret Management**: Secure storage of sensitive configuration data
- **Configuration Validation**: Ensuring settings are valid at application startup
- **Configuration Hierarchy**: Understanding provider priority and override behavior

### DO:
- Use environment-specific configuration files (appsettings.{Environment}.json)
- Store sensitive data in User Secrets (development) or Azure Key Vault (production)
- Use the Options pattern for strongly-typed, validated configuration
- Validate configuration at startup to fail fast on invalid settings
- Use environment variables for deployment-specific overrides
- Follow 12-factor app principles for configuration management

### DON'T:
- Commit secrets or connection strings to source control
- Use production configuration in development environments
- Hardcode configuration values in application code
- Ignore configuration validation - invalid settings cause runtime errors
- Mix configuration logic with business logic
- Use raw IConfiguration access when Options pattern is available

```csharp:title=GoodExample.cs
// GOOD: Options pattern with validation
public class MyOptions
{
    [Required]
    public string ApiKey { get; set; }
    
    [Range(1, 100)]
    public int MaxRetries { get; set; }
}

builder.Services.AddOptions<MyOptions>()
    .Bind(builder.Configuration.GetSection("MySection"))
    .ValidateDataAnnotations();
```

```csharp:title=BadExample.cs
// BAD: Hardcoded configuration
public class MyService
{
    private readonly string _apiKey = "hardcoded-api-key";  // SECURITY RISK
    private readonly int _maxRetries = 3;  // NOT CONFIGURABLE
}
```

**How it works in practice**: Following these practices ensures applications are secure (no secrets in source control), flexible (environment-specific settings), maintainable (strongly-typed configuration), and reliable (validation prevents runtime errors). The 12-factor app methodology emphasizes storing configuration in the environment rather than code, enabling deployment without code changes and supporting different environments seamlessly.

**Key takeaways for interviews**:
- Never commit secrets to source control
- Use environment-specific configuration files
- Options pattern provides type safety and validation
- Follow 12-factor app methodology for cloud-native apps
- Validate configuration at startup to fail fast

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

**Real-life analogy**: Interview preparation for configuration concepts is like understanding a complete settings management system. You need to understand how settings are sourced, validated, prioritized, and secured across different environments, and how to troubleshoot configuration issues in production.

**Common interview questions**:
1. **How does configuration work in ASP.NET Core?**
   - Explain the Provider pattern for abstracting multiple data sources
   - Discuss IConfiguration interface for unified access
   - Describe provider priority hierarchy (command-line highest, JSON lowest)

2. **What are the different configuration providers?**
   - JSON files (appsettings.json, appsettings.{Environment}.json)
   - Environment variables (system-level configuration)
   - Command-line arguments (deployment-specific overrides)
   - User secrets (development-only secret storage)
   - Azure Key Vault (production secret management)

3. **What is the Options pattern and why is it useful?**
   - Provides strongly-typed configuration via IOptions<T>
   - Supports validation via DataAnnotations
   - Enables compile-time checking and IntelliSense
   - Different interfaces: IOptions<T>, IOptionsSnapshot<T>, IOptionsMonitor<T>

4. **How do you handle sensitive configuration data?**
   - Use User Secrets for development environment
   - Use Azure Key Vault for production secrets
   - Never commit secrets to source control
   - Use environment variables for deployment-specific settings
   - Follow 12-factor app principles for configuration management

5. **What is the 12-factor app methodology for configuration?**
   - Store configuration in environment, not code
   - Separate config from code for deployment flexibility
   - Environment-specific configuration files
   - Use environment variables for runtime configuration
   - Enable deployment without code changes

**Key interview concepts**:
- **Provider Pattern**: Abstraction for multiple configuration sources
- **Provider Priority**: Later providers override earlier ones
- **Options Pattern**: Strongly-typed configuration with validation
- **12-Factor App**: Cloud-native configuration methodology
- **Secret Management**: Secure storage of sensitive configuration data

**How to approach interview questions**:
- Start with clear definition of configuration architecture
- Explain the Provider pattern and priority hierarchy
- Discuss Options pattern benefits over raw IConfiguration
- Address security considerations for sensitive data
- Mention 12-factor app methodology and best practices

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Configuration in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/configuration/?view=aspnetcore-10.0)