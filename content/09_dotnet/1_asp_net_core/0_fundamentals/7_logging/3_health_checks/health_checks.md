---
title: "Health Checks"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/7_logging/3_health_checks"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Health Checks Overview - Infrastructure Monitoring</summary>
  <div>

## Health Checks in ASP.NET Core

**Real-life analogy**: Health checks are like automated diagnostic systems for monitoring equipment health. In a data center, automated systems continuously check server temperature, power supply status, disk space, and network connectivity. If any check fails, alerts trigger and automated responses (reboot, reroute traffic) activate. Health checks in ASP.NET Core provide the same capability - monitoring application and infrastructure health with automated responses from orchestrators and load balancers.

**Technical explanation**: ASP.NET Core offers health checks middleware and libraries for reporting the health of app infrastructure components. Health checks are exposed as HTTP endpoints that can be used by container orchestrators and load balancers to check app status. Health checks test dependencies (databases, external services), monitor resource usage (memory, disk), and report availability. IHealthCheck implementations return HealthCheckResult indicating Healthy, Degraded, or Unhealthy status. AddHealthChecks registers services, MapHealthChecks creates the endpoint.

**Key jargon explained**:
- **Health Checks**: Middleware for reporting infrastructure health
- **Liveness**: Ability to process requests
- **Readiness**: Ability to handle traffic
- **Health Status**: Healthy, Degraded, or Unhealthy
- **Health Probe**: HTTP endpoint for health status

```csharp:title=BasicSetup.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapHealthChecks("/healthz");

app.Run();
```

```csharp:title=CustomHealthCheck.cs
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
            return HealthCheckResult.Healthy("Database connection successful");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Database connection failed", ex);
        }
    }
}
```

```csharp:title=Registration.cs
builder.Services.AddHealthChecks()
    .AddCheck<DatabaseHealthCheck>("database")
    .AddCheck("redis", () => 
        Task.FromResult(HealthCheckResult.Healthy("Redis is available")));
```

**How it works in practice**: Health checks are registered with AddHealthChecks and custom checks are added with AddCheck. MapHealthChecks creates the HTTP endpoint. When the endpoint is called, all registered health checks execute. Results are aggregated into a HealthReport with overall status. Container orchestrators (Kubernetes, Docker Swarm) and load balancers use these endpoints to determine app health, triggering automated responses like restarts or traffic routing based on status.

**Key takeaways for interviews**:
- Health checks monitor application and infrastructure health
- Exposed as HTTP endpoints for orchestrators and load balancers
- IHealthCheck implementations test dependencies and resources
- Status values: Healthy, Degraded, Unhealthy
- Automated responses based on health status (restart, reroute traffic)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Health Check Types - Liveness vs Readiness</summary>
  <div>

## Liveness and Readiness Probes

**Real-life analogy**: Liveness and readiness probes are like different types of equipment checks. Liveness checks verify the equipment is running (is the server powered on?). Readiness checks verify the equipment can handle work (is the server ready to accept jobs?). Both are important - a server might be running but not ready to handle work. Liveness and readiness probes provide the same distinction for applications - is the app running vs is it ready to handle traffic.

**Technical explanation**: Liveness probes determine if the application is running and should be restarted if it fails. Readiness probes determine if the application is ready to handle traffic and should receive requests. Liveness checks are lightweight and fast. Readiness checks can be more comprehensive, testing dependencies and resources. Kubernetes and other orchestrators use both probe types with different failure behaviors - liveness failures trigger restarts, readiness failures remove from traffic rotation.

**Key jargon explained**:
- **Liveness Probe**: Checks if app is running
- **Readiness Probe**: Checks if app is ready to handle traffic
- **Restart Policy**: Action on liveness failure (restart container)
- **Traffic Routing**: Action on readiness failure (remove from rotation)
- **Startup Probe**: Checks if app is starting up

```csharp:title=Liveness.cs
// Lightweight liveness check
app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = check => check.Name == "self"
});
```

```csharp:title=Readiness.cs
// Comprehensive readiness check with dependencies
app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = _ => true  // Include all checks
});
```

```yaml:title=Kubernetes.yaml
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

**How it works in practice**: Liveness probes should be lightweight and fast, checking only if the app is running. Readiness probes can be more comprehensive, testing dependencies like databases and external services. Kubernetes uses both probe types - liveness failures trigger container restarts, readiness failures remove the pod from service traffic. This distinction prevents cascading failures where a slow-starting app is repeatedly restarted before it's ready.

**Key takeaways for interviews**:
- Liveness probes check if app is running
- Readiness probes check if app is ready to handle traffic
- Liveness failures trigger restarts
- Readiness failures remove from traffic rotation
- Prevents cascading failures with slow-starting apps

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

**Real-life analogy**: Interview preparation for health checks concepts is like understanding comprehensive monitoring systems. You need to understand how to monitor different aspects of system health, how to respond to failures, how to distinguish between different health states, and how to integrate with automated systems for proactive management.

**Common interview questions**:
1. **What are health checks and why are they used?**
   - Middleware for reporting infrastructure health
   - Exposed as HTTP endpoints for monitoring
   - Used by orchestrators and load balancers to check status
   - Test dependencies (databases, external services)
   - Enable automated responses (restarts, traffic routing)

2. **How do you implement health checks?**
   - Implement IHealthCheck interface with CheckHealthAsync method
   - Return HealthCheckResult (Healthy, Degraded, Unhealthy)
   - Register with AddHealthChecks and AddCheck
   - Create endpoint with MapHealthChecks
   - Can include custom data and exception information

3. **What is the difference between liveness and readiness probes?**
   - Liveness: checks if app is running
   - Readiness: checks if app is ready to handle traffic
   - Liveness failures trigger restarts
   - Readiness failures remove from traffic rotation
   - Prevents cascading failures with slow-starting apps

4. **How do container orchestrators use health checks?**
   - Kubernetes uses probes for pod lifecycle management
   - Docker HEALTHCHECK directive for container health
   - Load balancers route traffic based on health status
   - Automated responses: restart, reroute, scale
   - Rolling deployments halted on health check failures

5. **What are the different health status values?**
   - Healthy: All checks passing, app functioning normally
   - Degraded: Some issues but app still operational
   - Unhealthy: Critical failures, app not functioning
   - Status codes configurable per health status
   - Aggregated from all registered health checks

**Key interview concepts**:
- **Infrastructure Monitoring**: Testing dependencies and resources
- **Automated Responses**: Restart, reroute, scale based on health
- **Probe Types**: Liveness, readiness, startup probes
- **Health Status**: Healthy, Degraded, Unhealthy
- **Orchestrator Integration**: Kubernetes, Docker, load balancers

**How to approach interview questions**:
- Start with clear definition of health checks purpose
- Explain IHealthCheck implementation and registration
- Discuss liveness vs readiness probe differences
- Address orchestrator integration and automated responses
- Mention health status values and aggregation

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Health checks in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-10.0)