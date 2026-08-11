---
title: "Environments"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/6_environements"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Environments Overview - Runtime Configuration</summary>
  <div>

## ASP.NET Core Runtime Environments

**Real-life analogy**: Runtime environments are like having different operational settings for different locations. A restaurant might have different configurations for its test kitchen (Development), staging area (Staging), and main dining room (Production). Each environment has different settings - detailed logging and error displays in the test kitchen, production-like settings in staging, and optimized, secure settings in production. ASP.NET Core environments provide the same capability - different configuration and behavior based on where the application is running.

**Technical explanation**: ASP.NET Core configures app behavior based on the runtime environment, which reflects where the app is running. Framework-provided environments include Development, Staging, and Production. Production maximizes security, performance, and reliability with caching, bundling, production logging, and disabled diagnostic pages. Development enables detailed error pages, user secrets, and developer-friendly settings. The environment is determined by DOTNET_ENVIRONMENT or ASPNETCORE_ENVIRONMENT environment variables, with Production as the default.

**Key jargon explained**:
- **Runtime Environment**: Configuration based on deployment context
- **Development**: Local development with detailed diagnostics
- **Staging**: Pre-production testing environment
- **Production**: Production deployment with optimized settings
- **Environment Variables**: DOTNET_ENVIRONMENT and ASPNETCORE_ENVIRONMENT

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

```csharp:title=ServiceConfiguration.cs
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    // Development-specific services
    builder.Services.AddDeveloperExceptionPage();
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();
}
else
{
    // Production-specific services
    builder.Services.AddApplicationInsightsTelemetry();
}
```

**How it works in practice**: The environment is determined at application startup from environment variables. WebApplication.Environment or WebApplicationBuilder.Environment provides access to the current environment. You can conditionally add services, middleware, or configuration based on the environment. This enables different behavior for development (detailed error pages, user secrets) versus production (optimized settings, security hardening, production logging). The environment cannot be changed while the application is running.

**Key takeaways for interviews**:
- Environments enable different configuration based on deployment context
- Framework provides Development, Staging, and Production environments
- Environment determined by DOTNET_ENVIRONMENT or ASPNETCORE_ENVIRONMENT
- Production is default if no environment variable is set
- Cannot change environment while application is running

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Environment Configuration - Conditional Behavior</summary>
  <div>

## Environment-Specific Configuration

**Real-life analogy**: Environment-specific configuration is like having different procedure manuals for different locations. The test kitchen manual has detailed troubleshooting steps and safety overrides. The staging manual mirrors production procedures. The production manual has optimized workflows and strict security protocols. Each manual is tailored to its location's needs. Environment-specific configuration provides the same capability - different settings, services, and middleware for each environment.

**Technical explanation**: Environment-specific configuration enables conditional behavior based on the runtime environment. Use builder.Environment.IsDevelopment(), builder.Environment.IsProduction(), or builder.Environment.IsEnvironment("Custom") to check the environment during service configuration. Use app.Environment during middleware configuration. This enables different services (user secrets in development, Application Insights in production), middleware (developer exception page in development, HSTS in production), and settings per environment.

**Key jargon explained**:
- **Conditional Configuration**: Different settings per environment
- **Service Configuration**: Using builder.Environment during service registration
- **Middleware Configuration**: Using app.Environment during pipeline setup
- **Custom Environments**: User-defined environments beyond the three defaults
- **Configuration Files**: appsettings.{Environment}.json for environment-specific settings

```csharp:title=ServiceConfiguration.cs
var builder = WebApplication.CreateBuilder(args);

// Development-specific configuration
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddRazorPages()
        .AddRazorRuntimeCompilation();
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();
}

// Production-specific configuration
if (builder.Environment.IsProduction())
{
    builder.Services.AddApplicationInsightsTelemetry();
    builder.Services.AddResponseCompression();
}

// Staging-specific configuration
if (builder.Environment.IsStaging())
{
    builder.Services.AddHostedService<StagingDataSeeder>();
}

// Custom environment
if (builder.Environment.IsEnvironment("Testing"))
{
    builder.Services.AddInMemoryDatabase();
}
```

```csharp:title=MiddlewareConfiguration.cs
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
```

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
      "Microsoft.AspNetCore": "Information"
    }
  }
}
```

```json:title=appsettings.Production.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

**How it works in practice**: Environment-specific configuration enables different behavior per deployment context. During service configuration, use builder.Environment to conditionally add services. During middleware configuration, use app.Environment to conditionally add middleware. Configuration files (appsettings.{Environment}.json) provide environment-specific settings. This enables developer-friendly settings in development (detailed logging, user secrets, runtime compilation) and production-optimized settings in production (performance optimizations, security hardening, production logging).

**Key takeaways for interviews**:
- Use builder.Environment during service configuration
- Use app.Environment during middleware configuration
- Configuration files provide environment-specific settings
- Different services per environment (user secrets, Application Insights)
- Different middleware per environment (developer exception page, HSTS)

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

**Real-life analogy**: Interview preparation for environment concepts is like understanding operational configuration management. You need to understand how to configure different settings for different locations, how to detect which location you're in, how to apply appropriate procedures, and how to ensure consistency while allowing flexibility.

**Common interview questions**:
1. **What are runtime environments and why are they used?**
   - Enable different configuration based on deployment context
   - Framework provides Development, Staging, and Production
   - Different behavior for local development vs production deployment
   - Enables developer-friendly settings in development
   - Enables optimized, secure settings in production

2. **How is the environment determined?**
   - DOTNET_ENVIRONMENT environment variable
   - ASPNETCORE_ENVIRONMENT environment variable
   - DOTNET_ENVIRONMENT takes precedence with WebApplication
   - ASPNETCORE_ENVIRONMENT takes precedence with WebHost
   - Production is default if neither is set

3. **How do you configure environment-specific behavior?**
   - Use builder.Environment during service configuration
   - Use app.Environment during middleware configuration
   - Use appsettings.{Environment}.json for environment-specific settings
   - Conditional service registration based on environment
   - Conditional middleware registration based on environment

4. **What are the differences between Development and Production environments?**
   - Development: detailed error pages, user secrets, detailed logging
   - Production: optimized settings, security hardening, production logging
   - Development: runtime compilation, database developer pages
   - Production: caching, bundling, minification, HSTS
   - Development enables developer-friendly features

5. **Can the environment be changed while the application is running?**
   - No, the environment cannot be changed while running
   - Environment is determined at application startup
   - Requires application restart to change environment
   - Environment variables are read once during startup

**Key interview concepts**:
- **Deployment Context**: Different settings for different environments
- **Environment Detection**: DOTNET_ENVIRONMENT and ASPNETCORE_ENVIRONMENT
- **Conditional Configuration**: Services and middleware per environment
- **Configuration Files**: appsettings.{Environment}.json
- **Development vs Production**: Different operational characteristics

**How to approach interview questions**:
- Start with clear definition of runtime environments purpose
- Explain environment determination via environment variables
- Discuss conditional configuration (services and middleware)
- Address differences between Development and Production
- Mention configuration files for environment-specific settings

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [ASP.NET Core runtime environments | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/environments?view=aspnetcore-10.0)