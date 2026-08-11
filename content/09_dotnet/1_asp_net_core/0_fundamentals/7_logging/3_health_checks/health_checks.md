---
title: "Health Checks"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/3_health_checks"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Health Checks - Like a doctor's checkup for your app</summary>
  <div>

## What are Health Checks?

**Real-life analogy**: Health checks are like a doctor's checkup for your application. Just as a doctor checks your vital signs (heart rate, blood pressure) to see if you're healthy, health checks check your app's vital signs (database connection, external services) to see if it's healthy. If something's wrong, the doctor (or monitoring system) can take action.

**Technical explanation**: ASP.NET Core offers health checks middleware and libraries for reporting the health of app infrastructure components. Health checks are exposed as HTTP endpoints that can be used by container orchestrators, load balancers, and monitoring systems to check app status and take action if the app is unhealthy.

**Key jargon explained**:
- **Health Checks**: Middleware that reports the health of app components
- **Health Endpoint**: HTTP endpoint that exposes health check results
- **Liveness**: Whether the app is alive and can process requests
- **Readiness**: Whether the app is ready to handle traffic
- **Health Status**: The result of a health check (Healthy, Degraded, Unhealthy)

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapHealthChecks("/healthz");

app.Run();
```

**How it works in practice**: Health checks:
- **Automatic Monitoring**: External systems can automatically check health
- **Dependency Checking**: Verify databases and external services are available
- **Resource Monitoring**: Check memory, disk, and other server resources
- **Automated Response**: Container orchestrators can restart unhealthy apps
- **Load Balancing**: Load balancers can route traffic away from unhealthy instances

Health checks are typically used with external monitoring services or container orchestrators to check app status.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Basic Health Probe - Like a simple pulse check</summary>
  <div>

## Basic Health Probe

**Real-life analogy**: A basic health probe is like a simple pulse check. The doctor just checks if you have a pulse (if you're alive) without doing a full examination. This is enough to know if you're alive, but doesn't tell you much about your overall health. Similarly, a basic health probe just checks if the app can respond to requests.

**Technical explanation**: A basic health probe configuration reports the app's availability to process requests (liveness). It doesn't check specific dependencies or subsystems. The app is considered healthy if it can respond at the health endpoint URL. The default response is plaintext showing the health status.

**Key jargon explained**:
- **Basic Health Probe**: Simple check that only tests if the app is alive
- **Liveness**: Whether the app is alive and can process requests
- **Health Status**: Healthy, Degraded, or Unhealthy
- **Plaintext Response**: Simple text response showing health status
- **AddHealthChecks**: Method to register health check services

### Basic Setup:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapHealthChecks("/healthz");

app.Run();
```

### Default Response:
```
Healthy
```

### Custom Endpoint:
```csharp:title=CustomEndpoint.cs
app.MapHealthChecks("/health");
app.MapHealthChecks("/healthz");
app.MapHealthChecks("/api/health");
```

### Docker HEALTHCHECK:
```dockerfile:title=Dockerfile
HEALTHCHECK CMD curl --fail http://localhost:5000/healthz || exit 1
```

### Using wget in Alpine:
```dockerfile:title=Dockerfile
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:5000/healthz || exit 1
```

**How it works in practice**: Basic health probe:
- **Simple Check**: Only tests if the app can respond
- **No Dependencies**: Doesn't check databases or external services
- **Fast Response**: Quick check with minimal overhead
- **Container Orchestration**: Docker and Kubernetes can use this for basic monitoring
- **Load Balancing**: Load balancers can use this to route traffic

The basic probe is sufficient for many apps to discover if they're alive and can process requests.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Creating Health Checks - Like creating custom medical tests</summary>
  <div>

## Creating Health Checks

**Real-life analogy**: Creating custom health checks is like creating custom medical tests. A doctor might have standard tests (blood pressure, heart rate) but also custom tests for specific conditions. You create a custom health check to test specific things about your app, like whether the database is reachable or an API is responding.

**Technical explanation**: Create health checks by implementing the IHealthCheck interface. The CheckHealthAsync method returns a HealthCheckResult indicating health as Healthy, Degraded, or Unhealthy. You can add custom data to the result and return descriptive messages.

**Key jargon explained**:
- **IHealthCheck**: Interface for implementing custom health checks
- **CheckHealthAsync**: Method that performs the health check
- **HealthCheckResult**: The result of a health check
- **HealthCheckContext**: Context information about the health check
- **FailureStatus**: The status to return when the check fails

### Basic Health Check:
```csharp:title=SampleHealthCheck.cs
public class SampleHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var isHealthy = true;

        // Your health check logic here
        // For example, check a database connection

        if (isHealthy)
        {
            return Task.FromResult(
                HealthCheckResult.Healthy("A healthy result."));
        }

        return Task.FromResult(
            new HealthCheckResult(
                context.Registration.FailureStatus, 
                "An unhealthy result."));
    }
}
```

### Database Health Check:
```csharp:title=DatabaseHealthCheck.cs
public class DatabaseHealthCheck : IHealthCheck
{
    private readonly IDbConnection _connection;

    public DatabaseHealthCheck(IDbConnection connection)
    {
        _connection = connection;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            await _connection.OpenAsync(cancellationToken);
            await _connection.ExecuteAsync("SELECT 1", cancellationToken);
            
            return HealthCheckResult.Healthy("Database is accessible.");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Database is not accessible.", ex);
        }
    }
}
```

### External Service Health Check:
```csharp:title=ExternalServiceHealthCheck.cs
public class ExternalServiceHealthCheck : IHealthCheck
{
    private readonly HttpClient _httpClient;

    public ExternalServiceHealthCheck(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await _httpClient.GetAsync(
                "https://api.example.com/health", 
                cancellationToken);
            
            response.EnsureSuccessStatusCode();
            
            return HealthCheckResult.Healthy("External service is accessible.");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("External service is not accessible.", ex);
        }
    }
}
```

### Registering Custom Health Check:
```csharp:title=Program.cs
builder.Services.AddHealthChecks()
    .AddCheck<SampleHealthCheck>("sample")
    .AddCheck<DatabaseHealthCheck>("database")
    .AddCheck<ExternalServiceHealthCheck>("external-service");
```

**How it works in practice**: Custom health checks:
- **Specific Tests**: Test specific dependencies or subsystems
- **Detailed Results**: Return descriptive messages about what's healthy or unhealthy
- **Exception Handling**: Catch exceptions and return unhealthy status
- **Multiple Checks**: Can register multiple health checks for different components
- **Custom Data**: Can add key-value pairs to the result for additional context

Custom health checks let you verify that your app's dependencies are available and functioning correctly.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Registering Health Checks - Like scheduling medical tests</summary>
  <div>

## Registering Health Checks

**Real-life analogy**: Registering health checks is like scheduling medical tests. You tell the hospital which tests to run (register health checks) and when to run them. The hospital automatically runs the tests when scheduled and reports the results. Similarly, you register health checks and the framework runs them when the endpoint is called.

**Technical explanation**: Register health checks using AddHealthChecks to register the health check services, then use AddCheck to register specific health check implementations. You can also use extension methods like AddDbContextCheck for common scenarios like database health checks.

**Key jargon explained**:
- **AddHealthChecks**: Method to register health check services
- **AddCheck**: Method to register a specific health check implementation
- **AddDbContextCheck**: Extension method for database health checks
- **Health Check Registration**: The process of making health checks available
- **Service Registration**: Adding health checks to the DI container

### Basic Registration:
```csharp:title=Program.cs
builder.Services.AddHealthChecks()
    .AddCheck<SampleHealthCheck>("sample");
```

### Multiple Health Checks:
```csharp:title=Multiple.cs
builder.Services.AddHealthChecks()
    .AddCheck<DatabaseHealthCheck>("database")
    .AddCheck<ExternalServiceHealthCheck>("external-service")
    .AddCheck<CacheHealthCheck>("cache");
```

### Database Health Check:
```csharp:title=Database.cs
builder.Services.AddHealthChecks()
    .AddDbContextCheck<MyDbContext>("database");
```

### With Configuration:
```csharp:title=WithConfig.cs
builder.Services.AddHealthChecks()
    .AddCheck<DatabaseHealthCheck>("database", failureStatus: HealthStatus.Degraded)
    .AddCheck<ExternalServiceHealthCheck>("external-service", tags: new[] { "external" });
```

### Using Extension Packages:
```csharp:title=Extensions.cs
// NuGet packages provide extension methods:
// - AspNetCore.HealthChecks.SqlServer
// - AspNetCore.HealthChecks.Redis
// - AspNetCore.HealthChecks.AzureKeyVault
// - AspNetCore.HealthChecks.AzureBlobStorage

builder.Services.AddHealthChecks()
    .AddSqlServer(connectionString)
    .AddRedis(redisConnectionString)
    .AddAzureKeyVault(keyVaultUri);
```

### Complete Setup:
```csharp:title=Complete.cs
var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddHttpClient();

// Register health checks
builder.Services.AddHealthChecks()
    .AddCheck<SampleHealthCheck>("sample")
    .AddDbContextCheck<MyDbContext>("database")
    .AddCheck<ExternalServiceHealthCheck>("external-service");

var app = builder.Build();

// Map health check endpoint
app.MapHealthChecks("/health");

app.Run();
```

**How it works in practice**: Registration process:
1. **Add Services**: Register health check services with AddHealthChecks
2. **Add Checks**: Register specific health checks with AddCheck
3. **Use Extensions**: Use extension methods for common scenarios
4. **Configure**: Set failure status, tags, and other options
5. **Map Endpoint**: Create the health check endpoint with MapHealthChecks

The framework automatically runs all registered health checks when the endpoint is called.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Health Check Options - Like customizing the medical report</summary>
  <div>

## Health Check Options

**Real-life analogy**: Health check options are like customizing the medical report format. You can choose what format to use (JSON vs plaintext), what status codes to return for different health states, and how to group different tests. This customization makes the report more useful for the systems that read it.

**Technical explanation**: You can configure health check options to control the response format, status codes, and filtering. Options include response writers for JSON output, custom status codes, and filtering by tags or health status.

**Key jargon explained**:
- **ResponseWriter**: Controls the format of the health check response
- **Status Codes**: HTTP status codes for different health states
- **Tags**: Labels that can be used to filter health checks
- **Filtering**: Selecting which health checks to run based on tags
- **Custom Status Codes**: Configuring specific status codes for health states

### JSON Response Writer:
```csharp:title=Program.cs
builder.Services.AddHealthChecks()
    .AddCheck<SampleHealthCheck>("sample");

var app = builder.Build();

app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = async (context, report) =>
    {
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(report);
    }
});
```

### Custom Status Codes:
```csharp:title=StatusCodes.cs
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResultStatusCodes =
    {
        [HealthStatus.Healthy] = StatusCodes.Status200OK,
        [HealthStatus.Degraded] = StatusCodes.Status200OK,
        [HealthStatus.Unhealthy] = StatusCodes.Status503ServiceUnavailable
    }
});
```

### Filtering by Tags:
```csharp:title=Tags.cs
// Register with tags
builder.Services.AddHealthChecks()
    .AddCheck<DatabaseHealthCheck>("database", tags: new[] { "db" })
    .AddCheck<ExternalServiceHealthCheck>("external", tags: new[] { "external" });

// Filter by tags
app.MapHealthChecks("/health/db", new HealthCheckOptions
{
    Predicate = (check) => check.Tags.Contains("db")
});

app.MapHealthChecks("/health/external", new HealthCheckOptions
{
    Predicate = (check) => check.Tags.Contains("external")
});
```

### Detailed JSON Response:
```csharp:title=DetailedJson.cs
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = async (context, report) =>
    {
        context.Response.ContentType = "application/json";
        
        var result = new
        {
            status = report.Status.ToString(),
            checks = report.Entries.Select(e => new
            {
                name = e.Key,
                status = e.Value.Status.ToString(),
                description = e.Value.Description,
                duration = e.Value.Duration.TotalMilliseconds
            })
        };
        
        await context.Response.WriteAsJsonAsync(result);
    }
});
```

### Liveness vs Readiness:
```csharp:title=LivenessReadiness.cs
// Liveness: Is the app alive?
app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = (check) => check.Tags.Contains("live")
});

// Readiness: Is the app ready to handle traffic?
app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = (check) => check.Tags.Contains("ready")
});
```

**How it works in practice**: Options configuration provides:
- **Format Control**: Choose JSON or plaintext response format
- **Status Code Control**: Set appropriate HTTP status codes
- **Filtering**: Run specific checks based on tags
- **Liveness/Readiness**: Separate endpoints for different purposes
- **Custom Data**: Include detailed information in responses

Configure options based on what your monitoring system expects and what information you need.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Liveness vs Readiness - Like pulse vs fitness test</summary>
  <div>

## Liveness vs Readiness Probes

**Real-life analogy**: Liveness is like checking if someone has a pulse (are they alive?), while readiness is like checking if they're ready to run a marathon (are they fit enough?). A person can be alive (liveness) but not ready for a marathon (readiness). Similarly, an app can be alive but not ready to handle traffic.

**Technical explanation**: Liveness probes check if the app is alive and can process requests. Readiness probes check if the app is ready to handle traffic, including checking dependencies like databases and external services. Liveness is a simple check, while readiness is more comprehensive.

**Key jargon explained**:
- **Liveness Probe**: Checks if the app is alive and can process requests
- **Readiness Probe**: Checks if the app is ready to handle traffic
- **Container Orchestration**: Systems like Kubernetes that use health checks
- **Rolling Deployment**: Gradually deploying new versions while keeping the app available
- **Traffic Routing**: Directing traffic based on health status

### Liveness Probe:
```csharp:title=Liveness.cs
// Simple check - is the app alive?
builder.Services.AddHealthChecks()
    .AddCheck("live", () => 
        HealthCheckResult.Healthy("App is alive"));

app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = (check) => check.Name == "live"
});
```

### Readiness Probe:
```csharp:title=Readiness.cs
// Comprehensive check - is the app ready?
builder.Services.AddHealthChecks()
    .AddCheck("live", () => 
        HealthCheckResult.Healthy("App is alive"))
    .AddDbContextCheck<MyDbContext>("database")
    .AddCheck<ExternalServiceHealthCheck>("external-service");

app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = (check) => check.Name != "live"
});
```

### Kubernetes Example:
```yaml:title=k8s.yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Docker Compose:
```yaml:title=docker-compose.yml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/health/live"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### When to Use Each:
```csharp:title=Usage.cs
// Use Liveness when:
// - You want to know if the app is alive
// - Container orchestrators need to restart dead apps
// - Load balancers need to remove dead instances
// - You need a simple, fast check

// Use Readiness when:
// - You want to know if the app is ready for traffic
// - Dependencies (database, external services) must be available
// - Rolling deployments should wait for readiness
// - You need to check app health comprehensively
```

**How it works in practice**: Liveness vs Readiness:
- **Liveness**: Simple check - is the app alive?
- **Readiness**: Comprehensive check - is the app ready?
- **Kubernetes**: Uses both for different purposes
- **Rolling Deployments**: Wait for readiness before routing traffic
- **Resource Management**: Restart unhealthy apps, pause not-ready apps

Use both probes for comprehensive health monitoring in containerized environments.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Common Health Check Libraries - Like standard medical test kits</summary>
  <div>

## Common Health Check Libraries

**Real-life analogy**: Common health check libraries are like standard medical test kits. Instead of creating your own tests for blood pressure or heart rate, you use standard test kits that are proven and reliable. Similarly, instead of writing your own database health check, you use proven libraries that test common dependencies.

**Technical explanation**: ASP.NET Core provides extension libraries for common health check scenarios like SQL Server, Redis, Azure services, and more. These libraries provide pre-built health checks that you can easily add to your application.

**Key jargon explained**:
- **Extension Libraries**: NuGet packages that provide pre-built health checks
- **AspNetCore.HealthChecks.SqlServer**: SQL Server health check library
- **AspNetCore.HealthChecks.Redis**: Redis health check library
- **AspNetCore.HealthChecks.AzureKeyVault**: Azure Key Vault health check library
- **Pre-built Checks**: Health checks already implemented for common scenarios

### SQL Server Health Check:
```bash:title=CLI
dotnet add package AspNetCore.HealthChecks.SqlServer
```

```csharp:title=Program.cs
builder.Services.AddHealthChecks()
    .AddSqlServer(connectionString);
```

### Redis Health Check:
```bash:title=CLI
dotnet add package AspNetCore.HealthChecks.Redis
```

```csharp:title=Program.cs
builder.Services.AddHealthChecks()
    .AddRedis(redisConnectionString);
```

### Azure Key Vault Health Check:
```bash:title=CLI
dotnet add package AspNetCore.HealthChecks.AzureKeyVault
```

```csharp:title=Program.cs
builder.Services.AddHealthChecks()
    .AddAzureKeyVault(keyVaultUri);
```

### Azure Blob Storage Health Check:
```bash:title=CLI
dotnet add package AspNetCore.HealthChecks.AzureBlobStorage
```

```csharp:title=Program.cs
builder.Services.AddHealthChecks()
    .AddAzureBlobStorage(connectionString);
```

### Multiple Libraries:
```csharp:title=Multiple.cs
builder.Services.AddHealthChecks()
    .AddSqlServer(connectionString)
    .AddRedis(redisConnectionString)
    .AddAzureKeyVault(keyVaultUri)
    .AddAzureBlobStorage(connectionString);
```

### UI Dashboard:
```bash:title=CLI
dotnet add package AspNetCore.HealthChecks.UI
```

```csharp:title=Program.cs
builder.Services.AddHealthChecks()
    .AddSqlServer(connectionString)
    .AddRedis(redisConnectionString)
    .AddHealthChecksUI();

var app = builder.Build();

app.MapHealthChecks("/health");
app.MapHealthChecksUI(); // UI dashboard at /healthchecks-ui
```

**How it works in practice**: Common libraries provide:
- **Proven Solutions**: Battle-tested health checks for common scenarios
- **Easy Integration**: Simple extension method calls
- **Comprehensive Coverage**: Support for many common dependencies
- **Community Support**: Widely used and well-documented
- **UI Dashboard**: Visual interface for viewing health status

Use these libraries instead of writing custom health checks for common scenarios.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following medical guidelines</summary>
  <div>

## Health Check Best Practices

**Real-life analogy**: Following health check best practices is like following medical guidelines. You should check the right things (relevant dependencies), check at the right frequency (not too often or too rarely), and take appropriate action based on results (restart if dead, wait if not ready). Good guidelines ensure effective monitoring.

**Technical explanation**: Following best practices ensures your health checks are effective, performant, and useful for monitoring. This includes choosing the right checks, configuring appropriate endpoints, and integrating properly with monitoring systems.

**Key jargon explained**:
- **Relevant Checks**: Health checks that test meaningful dependencies
- **Appropriate Frequency**: How often health checks are called
- **Monitoring Integration**: Connecting health checks with monitoring systems
- **Performance Impact**: The overhead of running health checks
- **Actionable Results**: Health checks that trigger appropriate actions

### DO:
- **Use health checks** for container orchestration and load balancing
- **Implement both liveness and readiness probes** for containerized apps
- **Check critical dependencies** like databases and external services
- **Use common health check libraries** for standard scenarios
- **Configure appropriate status codes** for different health states
- **Test health checks** in development before production
- **Monitor health check endpoints** with external monitoring systems
- **Keep health checks fast** to minimize performance impact

### DON'T:
- **Include expensive operations** in health checks
- **Check non-critical dependencies** that don't affect app functionality
- **Use health checks for business logic** (they're for infrastructure health)
- **Forget to configure health checks** in container orchestrators
- **Ignore health check failures** in production
- **Make health checks too frequent** (causes performance issues)
- **Return sensitive data** in health check responses
- **Assume health checks replace proper monitoring**

### Liveness vs Readiness:
```csharp:title=LivenessReadiness.cs
// Liveness: Simple, fast check
builder.Services.AddHealthChecks()
    .AddCheck("live", () => HealthCheckResult.Healthy());

// Readiness: Comprehensive check with dependencies
builder.Services.AddHealthChecks()
    .AddCheck("live", () => HealthCheckResult.Healthy())
    .AddDbContextCheck<MyDbContext>("database")
    .AddCheck<ExternalServiceHealthCheck>("external");
```

### Performance Considerations:
```csharp:title=Performance.cs
// DO:
// - Keep health checks fast (under 1 second)
// - Use connection pooling for database checks
// - Cache results for expensive checks
// - Set appropriate timeouts

// DON'T:
// - Run expensive queries in health checks
// - Check too many dependencies
// - Make health checks too frequent
// - Block on slow external services
```

### Configuration Examples:
```csharp:title=Configuration.cs
// Development: Detailed checks
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddHealthChecks()
        .AddCheck("live", () => HealthCheckResult.Healthy())
        .AddDbContextCheck<MyDbContext>("database")
        .AddCheck<ExternalServiceHealthCheck>("external");
}

// Production: Essential checks only
if (builder.Environment.IsProduction())
{
    builder.Services.AddHealthChecks()
        .AddCheck("live", () => HealthCheckResult.Healthy())
        .AddDbContextCheck<MyDbContext>("database");
}
```

### Kubernetes Configuration:
```yaml:title=k8s.yaml
# Liveness: Restart if dead
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

# Readiness: Wait for dependencies
readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

**How it works in practice**: Best practices ensure:
- **Effectiveness**: Health checks provide meaningful information
- **Performance**: Minimal impact on app performance
- **Integration**: Works well with monitoring systems
- **Reliability**: Accurate reporting of app health
- **Actionability**: Results trigger appropriate actions

Good health check practices make your application more reliable and easier to monitor in production.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Health checks in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-10.0)