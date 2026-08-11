---
title: "Generate OpenAPI Documents"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/3_open_api/0_generate"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Generate OpenAPI Documents - Runtime and Build-time</summary>
  <div>

## Generate OpenAPI Documents

**Real-life analogy**: Generating OpenAPI documents is like having an automated product catalog generator. Instead of manually writing product descriptions, the system automatically extracts product information from your inventory database and generates a standardized catalog. You can generate the catalog on-demand when customers request it (runtime) or generate it once and distribute it (build-time). OpenAPI generation provides the same automation - extracting API metadata and generating standardized documentation.

**Technical explanation**: Microsoft.AspNetCore.OpenApi package provides built-in support for OpenAPI document generation. Supports OpenAPI 3.1 (.NET 10) and 3.2 (.NET 11), JSON Schema draft 2020-12, runtime generation via endpoint, transformer APIs for modification, multiple documents from single app, System.Text.Json integration, native AoT compatibility. AddOpenApi registers services, MapOpenApi adds endpoint. OpenApiVersion property in OpenApiOptions controls specification version.

**Key jargon explained**:
- **OpenAPI 3.1/3.2**: OpenAPI specification versions
- **JSON Schema draft 2020-12**: Schema validation standard
- **Transformer APIs**: Modify generated documents
- **Native AoT**: Ahead-of-time compilation support
- **Multiple Documents**: Generate different API versions

```csharp:title=BasicGeneration.cs
var builder = WebApplication.CreateBuilder();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

```csharp:title=CustomizeVersion.cs
builder.Services.AddOpenApi(options =>
{
    options.OpenApiVersion = Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_0;
});
```

**How it works in practice**: AddOpenApi registers services for document generation. The framework automatically collects metadata from endpoints (HTTP methods, parameters, responses, types) and generates OpenAPI-compliant document. MapOpenApi adds endpoint for accessing document in JSON format. Document accessed at /openapi/{documentName}.json. Transformers can modify document (add parameters, modify descriptions, add top-level information). Multiple documents supported for API versioning. Build-time generation via Microsoft.Extensions.ApiDescription.Server package.

**Key takeaways for interviews**:
- Microsoft.AspNetCore.OpenApi for runtime generation
- Supports OpenAPI 3.1 (.NET 10) and 3.2 (.NET 11)
- AddOpenApi registers services, MapOpenApi adds endpoint
- Transformer APIs for document modification
- Multiple documents from single app supported

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Customize Document Generation - Options</summary>
  <div>

## Customize OpenAPI Document Generation

**Real-life analogy**: Customizing OpenAPI document generation is like configuring an automated report generator. You can specify the output format (JSON/YAML), document name, version, and access controls. Just as you configure report generators to produce different report formats for different audiences, OpenAPI generation can be customized for different API versions, formats, and security requirements.

**Technical explanation**: OpenAPI document generation can be customized in several ways. Generate in YAML format by specifying .yaml or .yml suffix in MapOpenApi. Customize document name by passing parameter to AddOpenApi (default is v1). Customize OpenAPI version via OpenApiVersion property in OpenApiOptions. Customize endpoint route in MapOpenApi. Apply authorization checks to OpenAPI endpoint. Transformers modify document with user-defined customizations.

**Key jargon explained**:
- **YAML Format**: Alternative to JSON for OpenAPI documents
- **Document Name**: Unique identifier for each document
- **OpenAPI Version**: Specification version (3.0, 3.1, 3.2)
- **Endpoint Route**: URL path for accessing document
- **Authorization**: Access control for OpenAPI endpoint

```csharp:title=YAMLFormat.cs
app.MapOpenApi("/openapi/{documentName}.yaml");
```

```csharp:title=CustomName.cs
builder.Services.AddOpenApi("internal"); // Document name is internal
```

```csharp:title=CustomRoute.cs
app.MapOpenApi("/openapi/{documentName}/openapi.json");
```

```csharp:title=Authorization.cs
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization(o =>
{
    o.AddPolicy("ApiTesterPolicy", b => b.RequireRole("tester"));
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi().RequireAuthorization("ApiTesterPolicy");
}
```

**How it works in practice**: YAML format specified by file extension in MapOpenApi. Document name passed to AddOpenApi affects URL and document identifier. OpenAPI version configured in OpenApiOptions. Endpoint route customized in MapOpenApi. Authorization applied using RequireAuthorization on OpenAPI endpoint. Transformers registered via AddDocumentTransformer, AddOperationTransformer, AddSchemaTransformer for document modification.

**Key takeaways for interviews**:
- YAML format via .yaml or .yml suffix
- Document name customized via AddOpenApi parameter
- OpenAPI version via OpenApiVersion property
- Endpoint route customized in MapOpenApi
- Authorization applied via RequireAuthorization

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

**Real-life analogy**: Interview preparation for OpenAPI generation concepts is like understanding automated documentation systems. You need to understand how to generate documents, how to customize them, how to control access, and how to support different versions and formats.

**Common interview questions**:
1. **How do you generate OpenAPI documents in ASP.NET Core?**
   - Install Microsoft.AspNetCore.OpenApi package
   - Call AddOpenApi to register services
   - Call MapOpenApi to add endpoint
   - Access document at /openapi/{documentName}.json
   - Supports runtime and build-time generation

2. **How do you customize the OpenAPI document format?**
   - Specify .yaml or .yml suffix for YAML format
   - Default is JSON format
   - Build-time YAML generation not yet supported
   - Format specified in MapOpenApi call
   - Both formats serve same purpose

3. **How do you generate multiple OpenAPI documents?**
   - Call AddOpenApi with different document names
   - Each document has unique name (default v1)
   - Access via /openapi/{documentName}.json
   - Useful for API versioning
   - Transformers apply to each document independently

4. **How do you secure OpenAPI endpoints?**
   - Apply authorization checks via RequireAuthorization
   - Restrict to Development environment
   - Use authentication and authorization policies
   - Limit access to specific roles or users
   - Security best practice for information disclosure

5. **What are transformer APIs and when would you use them?**
   - Modify generated OpenAPI documents
   - Document transformers: global modifications
   - Operation transformers: per-operation modifications
   - Schema transformers: per-schema modifications
   - Used for adding parameters, modifying descriptions, adding top-level information

**Key interview concepts**:
- **Runtime Generation**: On-demand document generation
- **YAML Format**: Alternative to JSON
- **Document Names**: Unique identifiers for multiple documents
- **Authorization**: Access control for endpoints
- **Transformers**: Document modification APIs

**How to approach interview questions**:
- Start with basic generation setup
- Explain customization options (format, name, version, route)
- Discuss security considerations and authorization
- Address multiple documents for versioning
- Mention transformer APIs for document modification

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Generate OpenAPI documents | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/openapi/aspnetcore-openapi?view=aspnetcore-10.0&tabs=visual-studio%2Cvisual-studio-code)