---
title: "Authentication and Authorization"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/0_minimal_apis/7_authn_and_authz"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Authentication and Authorization Overview - Security</summary>
  <div>

## Authentication and Authorization in Minimal API Apps

**Real-life analogy**: Authentication and authorization are like the security system at a corporate facility. Authentication is verifying your identity (showing your ID badge). Authorization is determining what areas you can access based on your role (manager vs employee). Both are essential for security - authentication ensures you are who you claim to be, authorization ensures you only access what you're permitted to. Minimal APIs provide the same security infrastructure for protecting API endpoints.

**Technical explanation**: Minimal APIs support all ASP.NET Core authentication and authorization options. Authentication (IAuthenticationService) determines user identity using authentication handlers and schemes. Authorization (IAuthorizationService) determines resource access using role-based or claim-based strategies. AddAuthentication registers required services. AddAuthorization registers authorization services. WebApplication automatically adds UseAuthentication and UseAuthorization middleware if services are detected. Explicit registration is needed for controlling middleware order.

**Key jargon explained**:
- **Authentication**: Verifying user identity
- **Authorization**: Determining resource access
- **Authentication Schemes**: Names identifying authentication handlers
- **Role-based Authorization**: Access based on assigned roles
- **Claim-based Authorization**: Access based on issued claims

```csharp:title=BasicSetup.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.Run();
```

```csharp:title=ExplicitMiddleware.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Hello World!");
app.Run();
```

**How it works in practice**: Authentication schemes (JWT Bearer, OpenID Connect) are registered with AddAuthentication. Handlers implement authentication strategies and generate user claims. Authorization requirements define access rules using roles or claims. Authorization handlers evaluate requirements against user context. WebApplication automatically adds middleware if services are detected, but explicit registration is needed for controlling order (e.g., CORS before authentication). This enables comprehensive security for API endpoints.

**Key takeaways for interviews**:
- Authentication verifies identity, authorization determines access
- AddAuthentication and AddAuthorization register services
- WebApplication automatically adds middleware if services detected
- Explicit registration needed for middleware order control
- Role-based and claim-based authorization strategies

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Authentication Strategies - Configuration</summary>
  <div>

## Configure Authentication Strategy

**Real-life analogy**: Authentication strategies are like different ID verification methods at a facility. You might use badge readers (JWT Bearer), biometric scanners (OpenID Connect), or manual verification (custom schemes). Each method has different configuration requirements and security characteristics. Minimal APIs support loading authentication options from configuration, enabling flexible strategy selection without code changes.

**Technical explanation**: Authentication strategies support various configurations loaded from configuration. ASP.NET Core expects options under Authentication:Schemes:{SchemeName} section. Default scheme configured via Authentication:DefaultScheme. JWT Bearer and OpenID Connect support configuration-based options. This enables strategy selection and configuration without code changes, supporting different environments (development, staging, production) with different authentication settings.

**Key jargon explained**:
- **Authentication Schemes**: Names identifying authentication handlers
- **Default Scheme**: Fallback authentication strategy
- **Configuration-Based Options**: Loading settings from appsettings
- **JWT Bearer**: JSON Web Token authentication
- **OpenID Connect**: Standard authentication protocol

```json:title=appsettings.json
{
  "Authentication": {
    "DefaultScheme": "LocalAuthIssuer",
    "Schemes": {
      "Bearer": {
        "ValidAudiences": ["https://localhost:7259"],
        "ValidIssuer": "dotnetuser.com",
        "IssuerSigningKey": "cryptographickey"
      },
      "LocalAuthIssuer": {
        "Issuer": "localauth",
        "Audience": "https://localhost:7259"
      }
    }
  }
}
```

```csharp:title=Configuration.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication()
    .AddJwtBearer()
    .AddScheme<CustomAuthenticationHandler>("LocalAuthIssuer", "LocalAuthIssuer");
```

**How it works in practice**: Authentication options are loaded from configuration under the Authentication:Schemes:{SchemeName} section. Each scheme has specific configuration properties (ValidAudiences, ValidIssuer, IssuerSigningKey for JWT). The DefaultScheme specifies which scheme to use when none is explicitly specified. This configuration-based approach enables different authentication strategies for different environments without code changes, supporting development, staging, and production with appropriate security settings.

**Key takeaways for interviews**:
- Authentication options loaded from configuration
- Configuration under Authentication:Schemes:{SchemeName}
- DefaultScheme specifies fallback authentication strategy
- JWT Bearer and OpenID Connect support configuration-based options
- Enables environment-specific authentication without code changes

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

**Real-life analogy**: Interview preparation for authentication and authorization concepts is like understanding security systems. You need to understand how identity verification works, how access control is implemented, how to configure different security methods, and how to ensure comprehensive protection.

**Common interview questions**:
1. **What is the difference between authentication and authorization?**
   - Authentication: verifying user identity
   - Authorization: determining resource access
   - Authentication happens first, then authorization
   - Both essential for API security
   - Similar implementation semantics in ASP.NET Core

2. **How do you enable authentication in Minimal APIs?**
   - Call AddAuthentication to register services
   - Add specific authentication strategy (AddJwtBearer, etc.)
   - AddAuthorization for authorization services
   - WebApplication automatically adds middleware if services detected
   - Explicit registration for middleware order control

3. **What are the authorization strategies in ASP.NET Core?**
   - Role-based: access based on assigned roles (Administrator, User)
   - Claim-based: access based on issued claims
   - Both captured into authorization requirements
   - Authorization handlers evaluate requirements
   - Policies combine multiple requirements

4. **How does automatic middleware registration work for auth?**
   - WebApplication detects IAuthenticationSchemeProvider
   - Automatically adds UseAuthentication after UseRouting
   - Detects IAuthorizationHandlerProvider
   - Automatically adds UseAuthorization after UseAuthentication
   - Explicit registration needed for order control

5. **How do you configure authentication strategies from configuration?**
   - Options under Authentication:Schemes:{SchemeName}
   - DefaultScheme specifies fallback strategy
   - JWT Bearer and OpenID Connect support configuration-based options
   - Enables environment-specific authentication
   - No code changes for different authentication settings

**Key interview concepts**:
- **Authentication**: Identity verification
- **Authorization**: Access control
- **Authentication Schemes**: Handler identification
- **Role/Claim-based**: Authorization strategies
- **Configuration-Based**: Loading options from appsettings

**How to approach interview questions**:
- Start with clear distinction between authentication and authorization
- Explain service registration and automatic middleware
- Discuss authorization strategies and requirements
- Address automatic middleware detection and explicit registration
- Mention configuration-based authentication strategy selection

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Authentication and authorization in Minimal API apps | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/minimal-apis/security?view=aspnetcore-10.0)