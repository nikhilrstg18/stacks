---
title: "Customize OpenAPI Documents"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/3_open_api/3_customize_doc"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>OpenAPI Document Transformers - Customization</summary>
  <div>

## Customize OpenAPI Documents

**Real-life analogy**: OpenAPI document transformers are like post-processing filters for automated reports. After the report generator creates a document, transformers can add company branding, standardize formatting, add disclaimers, or modify content before final publication. Transformers provide the same capability for OpenAPI documents - modifying generated documents with user-defined customizations like adding parameters, modifying descriptions, or adding top-level information.

**Technical explanation**: Transformers provide API for modifying OpenAPI documents with user-defined customizations. Three categories: document transformers (access entire document for global modifications), operation transformers (apply to individual operations - path and HTTP method combination), schema transformers (apply to each schema for request/response bodies). Registered via AddDocumentTransformer, AddOperationTransformer, AddSchemaTransformer on OpenApiOptions. Can use delegates, instances, or DI-activated classes.

**Key jargon explained**:
- **Document Transformers**: Global document modifications
- **Operation Transformers**: Per-operation modifications
- **Schema Transformers**: Per-schema modifications
- **IOpenApiDocumentTransformer**: Interface for document transformers
- **IOpenApiOperationTransformer**: Interface for operation transformers

```csharp:title=Transformers.cs
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken)
                             => Task.CompletedTask);
    options.AddDocumentTransformer(new MyDocumentTransformer());
    options.AddDocumentTransformer<MyDocumentTransformer>();
    options.AddOperationTransformer((operation, context, cancellationToken)
                            => Task.CompletedTask);
    options.AddOperationTransformer(new MyOperationTransformer());
    options.AddOperationTransformer<MyOperationTransformer>();
    options.AddSchemaTransformer((schema, context, cancellationToken)
                            => Task.CompletedTask);
    options.AddSchemaTransformer(new MySchemaTransformer());
    options.AddSchemaTransformer<MySchemaTransformer>();
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => "Hello world!");

app.Run();
```

**How it works in practice**: Transformers execute in specific order: schema transformers first (when schema registered), then operation transformers (when operation added), then document transformers (when document generated). This order ensures schema transformations available to operation transformers, and both available to document transformers. Transformers can modify document structure, add information, or apply custom logic. DI-activated transformers can use services from DI container for complex modifications.

**Key takeaways for interviews**:
- Three transformer types: document, operation, schema
- Document transformers: global modifications
- Operation transformers: per-operation modifications
- Schema transformers: per-schema modifications
- Execution order: schema → operation → document

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Transformer Execution Order - Pipeline Behavior</summary>
  <div>

## Execution Order for Transformers

**Real-life analogy**: Transformer execution order is like assembly line processing. Raw materials (schemas) are processed first, then components (operations) are assembled from processed materials, then final products (document) are assembled from components. Each stage depends on the previous stage being complete. Transformers follow the same pipeline - schemas processed first, then operations using those schemas, then final document assembled from operations.

**Technical explanation**: Transformers execute in specific order: schema transformers execute when schema registered to document (order they're added). All schemas added before any operation processing, so schema transformers execute before operation transformers. Operation transformers execute when operation added to document (order they're added). All operations added before any document transformers execute. Document transformers execute when document generated (final pass). When multiple documents generated, transformers execute for each document independently.

**Key jargon explained**:
- **Schema Transformers**: Execute first, modify schemas
- **Operation Transformers**: Execute second, modify operations
- **Document Transformers**: Execute last, modify entire document
- **Pipeline Order**: Schema → Operation → Document
- **Independent Execution**: Each document processed independently

```csharp:title=ExecutionOrder.cs
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer<DocumentTransformer1>();
    options.AddSchemaTransformer<SchemaTransformer1>();
    options.AddDocumentTransformer<DocumentTransformer2>();
    options.AddOperationTransformer<OperationTransformer1>();
    options.AddSchemaTransformer<SchemaTransformer2>();
    options.AddOperationTransformer<OperationTransformer2>();
});
```

**How it works in practice**: Execution order ensures transformations are applied in logical sequence. SchemaTransformer2 has access to SchemaTransformer1 modifications. Operation transformers have access to both schema transformers' modifications for types involved in operation. OperationTransformer2 has access to OperationTransformer1 modifications. Document transformers have access to all operation and schema modifications. DocumentTransformer2 has access to DocumentTransformer1 modifications. This enables layered transformations building on each other.

**Key takeaways for interviews**:
- Schema transformers execute first (when schemas registered)
- Operation transformers execute second (when operations added)
- Document transformers execute last (when document generated)
- Later transformers access earlier transformer modifications
- Multiple documents processed independently

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

**Real-life analogy**: Interview preparation for transformer concepts is like understanding post-processing systems. You need to understand different transformation types, their execution order, how to register them, and how to use them for common customization scenarios.

**Common interview questions**:
1. **What are the three types of OpenAPI transformers?**
   - Document transformers: access entire document for global modifications
   - Operation transformers: apply to individual operations
   - Schema transformers: apply to each schema in document
   - Each serves different customization purpose
   - Can be registered via delegates, instances, or DI-activated classes

2. **What is the execution order of transformers?**
   - Schema transformers execute first (when schemas registered)
   - Operation transformers execute second (when operations added)
   - Document transformers execute last (when document generated)
   - Later transformers access earlier modifications
   - Ensures logical transformation sequence

3. **How do you register transformers in OpenAPI?**
   - Use AddDocumentTransformer on OpenApiOptions
   - Use AddOperationTransformer on OpenApiOptions
   - Use AddSchemaTransformer on OpenApiOptions
   - Can use delegates, instances, or DI-activated classes
   - Registered in AddOpenApi options delegate

4. **When would you use document transformers vs operation transformers?**
   - Document transformers: global modifications (add API info, modify top-level)
   - Operation transformers: per-operation modifications (add parameters, modify descriptions)
   - Schema transformers: per-schema modifications (modify request/response body schemas)
   - Choice depends on scope of modification needed
   - Document transformers have access to entire document

5. **How do DI-activated transformers differ from instance transformers?**
   - DI-activated: resolved from DI container, can use services
   - Instance: created directly, no DI access
   - DI-activated useful for complex modifications requiring services
   - Instance useful for simple transformations
   - Both registered via AddXTransformer methods

**Key interview concepts**:
- **Transformer Types**: Document, operation, schema
- **Execution Order**: Schema → Operation → Document
- **Registration**: AddDocumentTransformer, AddOperationTransformer, AddSchemaTransformer
- **DI Activation**: Resolved from DI container
- **Scope**: Global vs per-operation vs per-schema

**How to approach interview questions**:
- Start with three transformer types and their purposes
- Explain execution order and its importance
- Discuss registration methods (delegate, instance, DI-activated)
- Address when to use each transformer type
- Mention DI-activated benefits for complex scenarios

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Customize OpenAPI documents | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/openapi/customize-openapi?view=aspnetcore-10.0)