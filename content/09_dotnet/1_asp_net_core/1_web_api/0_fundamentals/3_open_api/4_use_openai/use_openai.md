---
title: "Use OpenAPI Documents"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/3_open_api/4_use_openai"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Use OpenAPI Documents - UI and Tooling</summary>
  <div>

## Use the Generated OpenAPI Documents

**Real-life analogy**: Using OpenAPI documents is like having a product catalog with an interactive shopping interface. Instead of just reading product descriptions, customers can browse, search, and even "try before they buy" by simulating purchases. OpenAPI UI tools (Swagger UI, Scalar) provide the same interactive experience for APIs - developers can browse endpoints, view documentation, and test API calls directly from the browser.

**Technical explanation**: Microsoft.AspNetCore.OpenApi doesn't ship with built-in UI for visualizing OpenAPI documents. Popular tools: Swagger UI and ReDoc for visualization and interaction. Swashbuckle.AspNetCore.SwaggerUi package provides Swagger UI web assets. Scalar.AspNetCore package provides Scalar UI. Enable UI middleware with reference to OpenAPI route. Security best practice: OpenAPI UIs should only be enabled in Development environments. Spectral for linting OpenAPI documents at build time. IOpenApiDocumentProvider for programmatic document access.

**Key jargon explained**:
- **Swagger UI**: Interactive API documentation UI
- **ReDoc**: Alternative API documentation UI
- **Scalar**: Open-source interactive document UI
- **Spectral**: OpenAPI document linter
- **IOpenApiDocumentProvider**: Programmatic document access

```csharp:title=SwaggerUI.cs
using Microsoft.AspNetCore.OpenApi;

var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "v1");
    });
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

```csharp:title=Scalar.cs
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

**How it works in practice**: Install Swashbuckle.AspNetCore.SwaggerUi or Scalar.AspNetCore package. Enable UI middleware with reference to OpenAPI endpoint. Swagger UI accessed at /swagger, Scalar at /scalar. Both provide interactive documentation with ability to test API calls. Security best practice restricts to Development. Spectral lints generated documents for quality. IOpenApiDocumentProvider enables programmatic access for client SDK generation or contract validation.

**Key takeaways for interviews**:
- Swagger UI and Scalar for interactive documentation
- Swashbuckle.AspNetCore.SwaggerUi or Scalar.AspNetCore packages
- Enable UI middleware with OpenAPI route reference
- Restrict to Development for security
- Spectral for linting, IOpenApiDocumentProvider for programmatic access

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Programmatic Document Access - IOpenApiDocumentProvider</summary>
  <div>

## Support for Injecting IOpenApiDocumentProvider

**Real-life analogy**: Programmatic document access is like having an API for your product catalog system. Instead of just viewing the catalog through the web interface, other systems can programmatically access catalog data for integration, analytics, or custom reporting. IOpenApiDocumentProvider provides the same capability - enabling services to access OpenAPI documents programmatically for client SDK generation, contract validation, or external system integration.

**Technical explanation**: IOpenApiDocumentProvider enables programmatic access to OpenAPI documents even outside HTTP request contexts. Inject into services to access documents. Service key should match document name passed to AddOpenApi. Enables scenarios like generating client SDKs, validating API contracts in background processes, exporting documents to external systems. Introduced in ASP.NET Core .NET 10. GetOpenApiDocumentAsync method retrieves document asynchronously.

**Key jargon explained**:
- **IOpenApiDocumentProvider**: Interface for programmatic document access
- **Service Key**: Matches document name for DI resolution
- **GetOpenApiDocumentAsync**: Async method to retrieve document
- **Client SDK Generation**: Generating client libraries from OpenAPI
- **Contract Validation**: Verifying API compliance

```csharp:title=DocumentProvider.cs
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

public class CustomDocumentService(
    [FromKeyedServices("v2")] IOpenApiDocumentProvider documentProvider)
{
    public async Task<OpenApiDocument> GetApiDocumentAsync(
            CancellationToken cancellationToken = default)
    {
        var document = 
            await documentProvider.GetOpenApiDocumentAsync(cancellationToken);

        document.Info = new OpenApiInfo
        {
            Title = "Custom API Title",
            Version = "v2",
            Description = "This is a custom API description for version 2."
        };

        return document;
    }
}
```

```csharp:title=Registration.cs
builder.Services.AddOpenApi(); // Adds "v1" by default
builder.Services.AddOpenApi("v2");
builder.Services.AddScoped<CustomDocumentService>();
```

**How it works in practice**: Register multiple documents with AddOpenApi using different names. Inject IOpenApiDocumentProvider with FromKeyedServices attribute matching document name. Call GetOpenApiDocumentAsync to retrieve document. Modify document as needed (add info, modify descriptions). Enables background processes to access documents without HTTP context. Useful for CI/CD integration, client generation, and contract validation.

**Key takeaways for interviews**:
- IOpenApiDocumentProvider for programmatic access
- Service key matches document name
- Works outside HTTP request contexts
- Enables client SDK generation and contract validation
- Introduced in ASP.NET Core .NET 10

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

**Real-life analogy**: Interview preparation for using OpenAPI documents concepts is like understanding product catalog distribution systems. You need to understand how to provide interactive interfaces, how to validate catalog quality, how to enable programmatic access, and how to ensure security while enabling integration.

**Common interview questions**:
1. **What tools are available for visualizing OpenAPI documents?**
   - Swagger UI: interactive API documentation
   - ReDoc: alternative documentation UI
   - Scalar: open-source interactive document UI
   - Swashbuckle.AspNetCore.SwaggerUi for Swagger UI
   - Scalar.AspNetCore for Scalar UI

2. **How do you enable Swagger UI in ASP.NET Core?**
   - Install Swashbuckle.AspNetCore.SwaggerUi package
   - Call UseSwaggerUI with OpenAPI endpoint reference
   - Access UI at /swagger endpoint
   - Restrict to Development environment for security
   - Configure SwaggerEndpoint for document reference

3. **Why should OpenAPI UIs be restricted to Development?**
   - Security best practice for information disclosure
   - Prevents exposing API implementation details
   - Reduces vulnerabilities in production
   - Production should use pre-generated static documents
   - Limits access to authorized developers

4. **How do you lint OpenAPI documents for quality?**
   - Use Spectral open-source linter
   - Install Microsoft.Extensions.ApiDescription.Server for build-time generation
   - Enable OpenApiGenerateDocuments property
   - Create .spectral.yml configuration file
   - Run spectral lint on generated document

5. **When would you use IOpenApiDocumentProvider?**
   - Programmatic access to OpenAPI documents
   - Client SDK generation in background processes
   - API contract validation
   - Exporting documents to external systems
   - Access outside HTTP request contexts

**Key interview concepts**:
- **Swagger UI/Scalar**: Interactive documentation tools
- **Security**: Restricting to Development environment
- **Spectral**: OpenAPI document linter
- **IOpenApiDocumentProvider**: Programmatic access
- **Build-time Generation**: Static document export

**How to approach interview questions**:
- Start with available UI tools and their setup
- Explain security considerations for production
- Discuss Spectral for document quality validation
- Address IOpenApiDocumentProvider use cases
- Mention build-time generation for CI/CD integration

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Use the generated OpenAPI documents | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/openapi/using-openapi-documents?view=aspnetcore-10.0)