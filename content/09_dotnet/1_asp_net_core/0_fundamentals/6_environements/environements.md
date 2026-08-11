---
title: "Environments"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/6_environements"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Runtime Environments - Like different settings for different occasions</summary>
  <div>

## What are Runtime Environments?

**Real-life analogy**: Runtime environments are like wearing different clothes for different occasions. You wear casual clothes at home (Development), formal clothes at work (Production), and maybe something in between for a rehearsal (Staging). The same person (your app) behaves differently depending on the occasion (environment) - more relaxed at home, more professional at work.

**Technical explanation**: ASP.NET Core configures app behavior based on the runtime environment, which usually reflects where the app is running. Apps run in Development during local development with one set of behaviors, and in Production when deployed with different behaviors. You can create additional environments like Staging for testing before live deployment.

**Key jargon explained**:
- **Runtime Environment**: The context where your app is running (Development, Production, etc.)
- **Development**: Environment for local development and testing
- **Production**: Environment for live deployment to users
- **Staging**: Environment for testing before production deployment
- **Environment-Specific Behavior**: Different settings and features per environment

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Check the environment
if (builder.Environment.IsDevelopment())
{
    // Development-specific code
    builder.Logging.AddConsole();
}

var app = builder.Build();

if (app.Environment.IsProduction())
{
    // Production-specific code
    app.UseHsts();
}

app.Run();
```

**How it works in practice**: Environments let you:
- **Different Settings**: Use different configuration per environment
- **Development Features**: Enable detailed error pages and debug logging in development
- **Production Security**: Enable security features in production
- **Testing**: Test in Staging before deploying to Production
- **Flexibility**: Adapt behavior to where the app is running

This prevents development features from running in production, keeping your app secure and performant.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Standard Environments - Like standard clothing categories</summary>
  <div>

## Standard Environments

**Real-life analogy**: Standard environments are like standard clothing categories - casual, business casual, and formal. Everyone understands what these mean. Casual (Development) is for home, formal (Production) is for important events, and business casual (Staging) is in between. You can create custom categories, but these standard ones work for most situations.

**Technical explanation**: ASP.NET Core provides three standard environment values: Development, Staging, and Production. Production is configured to maximize security, performance, and reliability. Development is optimized for developer experience with detailed error pages and debug logging. Staging is for testing before production deployment.

**Key jargon explained**:
- **Development**: Local development environment with developer-friendly features
- **Staging**: Pre-production environment for testing
- **Production**: Live environment for end users
- **Framework-Provided**: Standard environments built into ASP.NET Core
- **Custom Environments**: Additional environments you can create

### Development Environment:
```csharp:title=Development.cs
if (app.Environment.IsDevelopment())
{
    // Enable developer exception page
    app.UseDeveloperExceptionPage();
    
    // Enable detailed error information
    app.UseDatabaseErrorPage();
    
    // Enable debug logging
    builder.Logging.SetMinimumLevel(LogLevel.Debug);
}
```

### Production Environment:
```csharp:title=Production.cs
if (app.Environment.IsProduction())
{
    // Enable HSTS (HTTP Strict Transport Security)
    app.UseHsts();
    
    // Use friendly error pages
    app.UseExceptionHandler("/Error");
    
    // Enable caching
    app.UseResponseCaching();
    
    // Enable production logging
    builder.Logging.SetMinimumLevel(LogLevel.Warning);
}
```

### Staging Environment:
```csharp:title=Staging.cs
if (app.Environment.IsStaging())
{
    // Staging-specific configuration
    app.UseExceptionHandler("/Error");
    builder.Logging.SetMinimumLevel(LogLevel.Information);
}
```

### Production vs Development Differences:
```csharp:title=Differences.cs
// Production (secure, performant):
// - Caching enabled
// - Bundling and minifying resources
// - Friendly error pages (not detailed)
// - Production logging (to monitoring services)
// - Security features enabled (HSTS, HTTPS)

// Development (developer-friendly):
// - Detailed error pages
// - Debug logging
// - No caching (see changes immediately)
// - No minification (easier debugging)
// - Database error pages
```

**How it works in practice**: Standard environments provide:
- **Consistency**: Same environment names across all ASP.NET Core apps
- **Clear Meaning**: Everyone understands what Development, Staging, and Production mean
- **Framework Support**: Built-in features for each environment
- **Best Practices**: Production configured for security and performance
- **Customization**: Can create additional environments if needed

Most apps use these three standard environments, but you can create custom ones like "Testing" or "QA" if needed.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Setting the Environment - Like choosing what to wear</summary>
  <div>

## Setting the Environment

**Real-life analogy**: Setting the environment is like choosing what to wear. You decide based on where you're going - home, work, or a special event. The choice determines how you'll behave and what you'll do. Similarly, setting the environment determines how your app behaves and what features it enables.

**Technical explanation**: The environment is determined by environment variables. ASP.NET Core reads DOTNET_ENVIRONMENT and ASPNETCORE_ENVIRONMENT to determine the runtime environment. If neither is set, Production is the default. The last environment setting read determines the app's environment.

**Key jargon explained**:
- **Environment Variables**: System-level configuration values
- **DOTNET_ENVIRONMENT**: Generic .NET environment variable
- **ASPNETCORE_ENVIRONMENT**: ASP.NET Core-specific environment variable
- **Default Environment**: Production if no environment variable is set
- **Precedence**: Which variable takes priority

### Setting Environment Variable:
```bash:title=Command Line
# Windows (Command Prompt)
set ASPNETCORE_ENVIRONMENT=Development

# Windows (PowerShell)
$env:ASPNETCORE_ENVIRONMENT="Development"

# Linux/Mac
export ASPNETCORE_ENVIRONMENT=Development
```

### Using launchSettings.json:
```json:title=launchSettings.json
{
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "MyWebApp": {
      "commandName": "Project",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

### Docker Environment:
```dockerfile:title=Dockerfile
ENV ASPNETCORE_ENVIRONMENT=Production
```

### Azure App Service:
```bash:title=Azure CLI
az webapp config appsettings set \
  --resource-group MyResourceGroup \
  --name MyApp \
  --settings ASPNETCORE_ENVIRONMENT=Production
```

### Environment Variable Precedence:
```csharp:title=Precedence.cs
// For WebApplication (modern):
// 1. DOTNET_ENVIRONMENT (highest priority)
// 2. ASPNETCORE_ENVIRONMENT
// 3. Production (default if neither is set)

// For WebHost (legacy):
// 1. ASPNETCORE_ENVIRONMENT (highest priority)
// 2. DOTNET_ENVIRONMENT
// 3. Production (default if neither is set)
```

**How it works in practice**: Setting the environment:
- **Development**: Set in launchSettings.json for local development
- **Production**: Set in deployment configuration or environment variables
- **Staging**: Set in staging environment configuration
- **Docker**: Set as ENV in Dockerfile or docker-compose
- **Cloud**: Set in cloud platform configuration (Azure, AWS, etc.)

The environment is set once at startup and cannot be changed while the app is running.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Controlling Code Execution - Like conditional behavior</summary>
  <div>

## Controlling Code Execution by Environment

**Real-life analogy**: Controlling code execution by environment is like conditional behavior based on where you are. At home, you might wear pajamas and watch TV. At work, you wear a suit and give presentations. The same person behaves differently based on the location. Your app does the same - runs different code based on the environment.

**Technical explanation**: You can use the environment to conditionally add services or middleware. Use builder.Environment when configuring services, and app.Environment when configuring the middleware pipeline. The IsDevelopment, IsStaging, IsProduction, and IsEnvironment methods let you check the current environment.

**Key jargon explained**:
- **Conditional Execution**: Running code only in certain environments
- **builder.Environment**: Environment property during service configuration
- **app.Environment**: Environment property during middleware configuration
- **IsDevelopment**: Method to check if environment is Development
- **IsEnvironment**: Method to check for custom environment names

### Service Configuration:
```csharp:title=Services.cs
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    // Development-only services
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();
    builder.Logging.AddConsole();
}

if (builder.Environment.IsProduction())
{
    // Production-only services
    builder.Services.AddApplicationInsights();
}

var app = builder.Build();
```

### Middleware Configuration:
```csharp:title=Middleware.cs
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // Development middleware
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Production middleware
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
```

### Custom Environment Check:
```csharp:title=Custom.cs
if (app.Environment.IsEnvironment("Testing"))
{
    // Custom "Testing" environment
    app.UseTestMiddleware();
}
```

### Multiple Environment Checks:
```csharp:title=Multiple.cs
if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    // Runs in both Development and Staging
    app.UseDeveloperExceptionPage();
}
```

### Helper Methods:
```csharp:title=Helpers.cs
// Available methods:
builder.Environment.IsDevelopment()  // Returns true for Development
builder.Environment.IsStaging()      // Returns true for Staging
builder.Environment.IsProduction()   // Returns true for Production
builder.Environment.IsEnvironment("Custom")  // Returns true for custom environment
builder.Environment.EnvironmentName  // Returns the environment name as string
```

**How it works in practice**: Conditional execution allows:
- **Development Features**: Enable detailed error pages only in development
- **Production Security**: Enable security features only in production
- **Testing**: Add test-specific middleware in staging
- **Performance**: Enable caching only in production
- **Logging**: Different logging levels per environment

This ensures the right features are enabled in the right environment.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Environment-Specific Configuration - Like different settings for different occasions</summary>
  <div>

## Environment-Specific Configuration

**Real-life analogy**: Environment-specific configuration is like having different settings for different occasions. Your phone might have a "Home" profile with relaxed settings and a "Work" profile with stricter settings. When you switch profiles, all the settings change at once. ASP.NET Core does the same with configuration files.

**Technical explanation**: ASP.NET Core loads environment-specific configuration files automatically. The appsettings.json file contains default settings, while appsettings.{Environment}.json contains environment-specific overrides. For example, appsettings.Production.json overrides settings in appsettings.json when running in Production.

**Key jargon explained**:
- **appsettings.json**: Base configuration file with default settings
- **appsettings.{Environment}.json**: Environment-specific configuration file
- **Configuration Override**: Environment files override base file settings
- **Configuration Merge**: Settings from multiple files are merged together
- **JSON Configuration Provider**: Component that reads JSON configuration files

### Base Configuration:
```json:title=appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDb"
  }
}
```

### Development Override:
```json:title=appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyDevDb"
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
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-db;Database=MyProdDb"
  }
}
```

### Configuration Priority:
```csharp:title=Priority.cs
// Configuration is loaded in this order (later overrides earlier):

// 1. appsettings.json (base settings)
// 2. appsettings.{Environment}.json (environment-specific)
// 3. User secrets (Development only)
// 4. Environment variables
// 5. Command-line arguments (highest priority)
```

### Accessing Environment-Specific Settings:
```csharp:title=Accessing.cs
var builder = WebApplication.CreateBuilder(args);

// Automatically loads environment-specific file
var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
var logLevel = builder.Configuration["Logging:LogLevel:Default"];

// In Development: gets Development values
// In Production: gets Production values
```

**How it works in practice**: Environment-specific configuration provides:
- **Different Settings**: Different database connections, API endpoints, etc. per environment
- **No Code Changes**: Change behavior by changing configuration, not code
- **Security**: Keep production secrets in environment variables, not source code
- **Flexibility**: Easy to test different configurations
- **Organization**: Clear separation between environment-specific settings

This is the most common way to handle environment differences in ASP.NET Core apps.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Logging by Environment - Like different detail levels for different situations</summary>
  <div>

## Logging by Environment

**Real-life analogy**: Logging by environment is like different detail levels for different situations. When you're learning something new (Development), you want detailed explanations. When you're an expert (Production), you just want the important highlights. ASP.NET Core adjusts logging detail based on the environment.

**Technical explanation**: Different environments typically use different logging levels. Development uses Debug or Information level for detailed logs, while Production uses Warning or Error level to reduce log volume and focus on problems. This prevents overwhelming log storage in production while providing detailed information during development.

**Key jargon explained**:
- **Log Level**: The severity of log messages (Debug, Information, Warning, Error, Critical)
- **Debug Logging**: Very detailed logs for development
- **Production Logging**: Minimal logs focusing on errors
- **Log Volume**: The amount of log data generated
- **Monitoring Services**: External services like Application Insights for production logs

### Development Logging Configuration:
```json:title=appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft": "Information",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```

### Production Logging Configuration:
```json:title=appsettings.Production.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft": "Error",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```

### Staging Logging Configuration:
```json:title=appsettings.Staging.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  }
}
```

### Log Levels Explained:
```csharp:title=Levels.cs
// Log levels from most to least detailed:
// Trace: Very detailed, includes diagnostic information
// Debug: Detailed information for debugging
// Information: General informational messages
// Warning: Warning messages for potential issues
// Error: Error messages for failures
// Critical: Critical errors requiring immediate attention
```

### Programmatic Configuration:
```csharp:title=Programmatic.cs
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Logging.AddConsole();
    builder.Logging.SetMinimumLevel(LogLevel.Debug);
}
else if (builder.Environment.IsProduction())
{
    builder.Logging.AddApplicationInsights();
    builder.Logging.SetMinimumLevel(LogLevel.Warning);
}

var app = builder.Build();
```

**How it works in practice**: Environment-specific logging:
- **Development**: Detailed logs help you debug and understand what's happening
- **Production**: Minimal logs reduce storage costs and focus on problems
- **Staging**: Medium detail for testing before production
- **Cost Savings**: Less log volume in production means lower storage costs
- **Performance**: Less logging overhead in production

This ensures you have the right level of detail for each environment without overwhelming resources.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Startup Logging - Like checking the weather before going out</summary>
  <div>

## Startup Logging

**Real-life analogy**: Startup logging is like checking the weather before going out. You look outside or check an app to see what the weather is like (what environment you're in). This tells you how to dress and what to expect. ASP.NET Core logs the environment at startup so you know what environment the app is running in.

**Technical explanation**: ASP.NET Core logs the hosting environment at startup. This appears in the command shell output when you start the application. The log message shows which environment the app is running in, helping you verify that the environment is set correctly.

**Key jargon explained**:
- **Startup Logging**: Log messages when the application starts
- **Hosting Environment**: The environment where the app is running
- **Command Shell Output**: Text displayed in the terminal when running the app
- **Environment Verification**: Confirming the environment is set correctly
- **Microsoft.Hosting.Lifetime**: The logging category for startup messages

### Startup Log Output:
```bash:title=Terminal
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
```

### Production Startup:
```bash:title=Terminal
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Production
```

### Staging Startup:
```bash:title=Terminal
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Staging
```

### Complete Startup Output:
```bash:title=Terminal
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
```

### Verifying Environment:
```csharp:title=Verify.cs
var builder = WebApplication.CreateBuilder(args);

// Log the environment at startup
Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");

var app = builder.Build();

app.MapGet("/", () => $"Environment: {app.Environment.EnvironmentName}");

app.Run();
```

**How it works in practice**: Startup logging helps you:
- **Verify Configuration**: Confirm the environment is set correctly
- **Debug Issues**: Know which environment you're debugging
- **Deployment Verification**: Confirm production deployments use the right environment
- **Troubleshooting**: Know the environment when investigating issues
- **Documentation**: Startup logs provide a record of the environment

Always check the startup log to verify your app is running in the expected environment.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following guidelines for success</summary>
  <div>

## Environment Best Practices

**Real-life analogy**: Following environment best practices is like following guidelines for dressing appropriately. You wouldn't wear pajamas to a job interview or a tuxedo to the beach. Following guidelines ensures you're always dressed appropriately for the situation. The same applies to environments - follow practices for correct behavior in each environment.

**Technical explanation**: Following environment best practices ensures your application behaves correctly in each environment. This includes using environment-specific configuration, enabling the right features per environment, securing production, and keeping development features out of production.

**Key jargon explained**:
- **Environment Isolation**: Keeping environments separate and distinct
- **Feature Flags**: Enabling/disabling features per environment
- **Security Hardening**: Making production more secure than development
- **Configuration Management**: Managing settings across environments
- **Deployment Verification**: Confirming the right environment is used

### DO:
- **Use environment-specific configuration** files (appsettings.{Environment}.json)
- **Set environment variables** for production, not hardcode in code
- **Enable detailed error pages** only in Development
- **Enable security features** (HSTS, HTTPS) in Production
- **Use different logging levels** per environment
- **Test in Staging** before deploying to Production
- **Verify the environment** at startup
- **Keep sensitive data** in environment variables or secrets, not source code

### DON'T:
- **Hardcode environment-specific values** in your code
- **Enable detailed error pages** in Production (security risk)
- **Disable security features** in Production
- **Use the same database** for Development and Production
- **Forget to set the environment** in production deployments
- **Commit secrets** to source code
- **Assume the environment** - verify it programmatically
- **Mix environment concerns** - keep them clearly separated

### Good Example:
```csharp:title=Good.cs
// Environment-specific configuration
// appsettings.Development.json
{
  "Logging": { "LogLevel": { "Default": "Debug" } }
}

// appsettings.Production.json
{
  "Logging": { "LogLevel": { "Default": "Warning" } }
}

// Program.cs
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
```

### Bad Example:
```csharp:title=Bad.cs
// Hardcoded environment check
if (Environment.MachineName == "MY-DEV-MACHINE")
{
    app.UseDeveloperExceptionPage();
}

// Same configuration for all environments
// appsettings.json
{
  "ConnectionString": "Server=prod-db;Database=MyDb;Password=secret"
}

// Security features disabled everywhere
// app.UseHsts(); // Commented out
```

### Environment Checklist:
```csharp:title=Checklist.cs
// Development:
// ✓ Detailed error pages enabled
// ✓ Debug logging enabled
// ✓ Local database
// ✓ Hot reload enabled
// ✓ Developer tools (Swagger, etc.)

// Staging:
// ✓ Production-like configuration
// ✓ Test database
// ✓ Error handling enabled
// ✓ Monitoring enabled
// ✓ Performance testing

// Production:
// ✓ Security features enabled (HSTS, HTTPS)
// ✓ Minimal logging (Warning/Error)
// ✓ Production database
// ✓ Caching enabled
// ✓ Monitoring and alerting
```

**How it works in practice**: Following best practices ensures:
- **Security**: Production is secure, development is not exposed to production data
- **Reliability**: Testing in Staging catches issues before Production
- **Performance**: Production has performance features enabled
- **Debugging**: Development has debugging features enabled
- **Maintainability**: Clear separation between environments makes code easier to maintain

Good environment practices prevent common security and reliability issues.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core runtime environments | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/environments?view=aspnetcore-10.0)