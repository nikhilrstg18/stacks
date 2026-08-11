---
title: "Request Decompression"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware/5_request_decompression"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Request Decompression - Like unzipping a package before opening it</summary>
  <div>

## What is Request Decompression?

**Real-life analogy**: Request decompression is like receiving a zipped package in the mail. Instead of struggling to open it while it's still compressed, you unzip it first to get the contents out easily. In web apps, clients can send compressed data to save bandwidth, and the middleware automatically decompresses it so your application can work with the uncompressed data.

**Technical explanation**: Request decompression middleware automatically decompresses HTTP request bodies that have been compressed using algorithms like Gzip, Brotli, or Deflate. It uses the Content-Encoding HTTP header to identify compressed requests and decompress them before they reach your application code.

**Key jargon explained**:
- **Request Decompression**: Automatically decompressing compressed request bodies
- **Content-Encoding Header**: HTTP header that specifies the compression algorithm used
- **Decompression Provider**: A component that handles decompression for a specific algorithm
- **Compressed Data**: Data that has been reduced in size using compression algorithms
- **Decompression Stream**: A stream that automatically decompresses data as it's read

**How it works in practice**: When a client sends a compressed request (to save bandwidth), the middleware checks the Content-Encoding header. If it matches a supported compression type, the middleware wraps the request body in a decompression stream. Your application then reads the decompressed data without knowing it was compressed.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Why Use Request Decompression - Like having an automatic bottle opener</summary>
  <div>

## Why Use Request Decompression?

**Real-life analogy**: Request decompression is like having an automatic bottle opener. You could open bottles manually, but having something that automatically opens them as they arrive saves time and effort. Similarly, your application could handle decompression manually, but the middleware does it automatically, saving you from writing extra code.

**Technical explanation**: Request decompression middleware eliminates the need to write custom code to handle compressed requests. It automatically identifies and decompresses requests, making your API endpoints work seamlessly with clients that send compressed data.

**Key jargon explained**:
- **Bandwidth Savings**: Sending less data over the network by compressing it
- **Client Compression**: When clients compress requests before sending them
- **Automatic Handling**: Middleware processes decompression without your intervention
- **Code Elimination**: Removing manual decompression code from your application
- **API Compatibility**: Making your API work with various client configurations

### Key Benefits:
- **Saves Bandwidth**: Clients can send compressed requests, reducing data transfer
- **Reduces Code**: No need to write manual decompression logic
- **Automatic Processing**: Middleware handles everything transparently
- **Multiple Formats**: Supports Gzip, Brotli, Deflate, and custom formats
- **Error Handling**: Built-in error handling for invalid compressed data
- **Security**: Protection against decompression bombs (zip bombs)

**How it works in practice**: Without this middleware, you'd need to write code to check the Content-Encoding header, choose the right decompression algorithm, and handle errors. With the middleware, clients can send compressed requests and your application receives decompressed data automatically - you don't need to do anything special.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>How It Works - Like a sorting system at a warehouse</summary>
  <div>

## How Request Decompression Works

**Real-life analogy**: Request decompression works like a sorting system at a warehouse. When packages arrive, the system checks their labels (Content-Encoding header). If a package is marked as compressed, it goes through a decompression station before reaching the main processing area. Packages without compression labels go directly to processing. Your application only sees the decompressed packages.

**Technical explanation**: The middleware intercepts incoming requests, checks the Content-Encoding header, and wraps the request body in an appropriate decompression stream if the encoding is supported. It then removes the Content-Encoding header to indicate the body is no longer compressed.

**Key jargon explained**:
- **Content-Encoding Header**: HTTP header specifying compression type
- **Decompression Stream**: A stream that decompresses data as it's read
- **Header Removal**: Removing the Content-Encoding header after decompression
- **Lazy Decompression**: Decompressing data only when it's actually read
- **Model Binding**: The process of mapping request data to application models

### The Process:
1. **Request Arrives**: Client sends a compressed request with Content-Encoding header
2. **Header Check**: Middleware checks the Content-Encoding header value
3. **Provider Match**: Middleware finds the matching decompression provider
4. **Stream Wrapping**: Request body is wrapped in a decompression stream
5. **Header Removal**: Content-Encoding header is removed from the request
6. **Lazy Decompression**: Data is decompressed when the body is read (not immediately)
7. **Application Processing**: Your application receives decompressed data

```csharp:title=Process.cs
// Client sends compressed request
POST /api/data
Content-Encoding: gzip
Content-Type: application/json

[Compressed JSON data]

// Middleware processes it
// 1. Sees "gzip" in Content-Encoding header
// 2. Wraps body in GZip decompression stream
// 3. Removes Content-Encoding header
// 4. Your application receives decompressed JSON
```

**How it works in practice**: The middleware works transparently - your application code doesn't need to know about it. When you read the request body in your controller or endpoint, you get decompressed data automatically. The decompression happens lazily (when you read the body), not eagerly (when the request arrives), which improves performance.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Configuration - Like setting up automatic doors</summary>
  <div>

## Configuring Request Decompression

**Real-life analogy**: Configuring request decompression is like setting up automatic doors. You install the sensors and motors, and the doors open automatically when someone approaches. You don't need to manually open each door. Similarly, you configure the middleware once, and it automatically handles all compressed requests.

**Technical explanation**: To use request decompression middleware, you need to add the service to your dependency injection container and enable the middleware in the request pipeline. This is a simple two-step configuration process.

**Key jargon explained**:
- **AddRequestDecompression**: Method to add decompression services to DI container
- **UseRequestDecompression**: Method to enable the middleware in the pipeline
- **Dependency Injection**: ASP.NET Core's built-in service provider
- **Service Collection**: The container where you register services
- **Middleware Pipeline**: The sequence of middleware that processes requests

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

// Step 1: Add decompression services
builder.Services.AddRequestDecompression();

var app = builder.Build();

// Step 2: Enable the middleware
app.UseRequestDecompression();

app.MapPost("/", (HttpRequest request) => Results.Stream(request.Body));

app.Run();
```

**How it works in practice**: This simple configuration:
1. Registers the decompression services and default providers in the DI container
2. Adds the middleware to the request pipeline
3. Enables automatic decompression for all supported compression types

Once configured, the middleware automatically handles Gzip, Brotli, and Deflate compressed requests without any additional code in your endpoints.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Default Decompression Providers - Like having different bottle openers</summary>
  <div>

## Default Decompression Providers

**Real-life analogy**: Default decompression providers are like having different bottle openers for different types of bottles. You have one for screw caps, one for corks, and one for pop tops. The middleware comes with several built-in "openers" (decompression providers) for common compression formats.

**Technical explanation**: The middleware includes built-in support for several popular compression algorithms. Each decompression provider handles a specific Content-Encoding header value and knows how to decompress data using that algorithm.

**Key jargon explained**:
- **Decompression Provider**: A component that handles decompression for a specific algorithm
- **Brotli**: A modern compression algorithm with high compression ratios
- **Deflate**: A widely used compression algorithm
- **Gzip**: The most common compression format for HTTP
- **Zstandard**: A modern compression algorithm (available in .NET 11+)

### Supported Compression Types:
```csharp:title=Providers.cs
// Default providers (ASP.NET Core 7-10)
- br: Brotli compressed data format
- deflate: DEFLATE compressed data format  
- gzip: Gzip file format

// Additional provider (ASP.NET Core 11+)
- zstd: Zstandard compressed data format
```

### How They Work:
```csharp:title=Example.cs
// Client sends Brotli-compressed request
POST /api/data
Content-Encoding: br
[Compressed data]

// Middleware sees "br" header
// Uses Brotli decompression provider
// Decompresses the data
// Your application receives uncompressed data
```

**How it works in practice**: The middleware automatically detects which compression type is used based on the Content-Encoding header and selects the appropriate provider. You don't need to configure anything special - the default providers work out of the box for the most common compression formats used by web clients.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Custom Decompression Providers - Like creating a custom tool</summary>
  <div>

## Custom Decompression Providers

**Real-life analogy**: Custom decompression providers are like creating your own specialized tool for a unique type of container. Standard bottle openers work for most bottles, but if you have a unique container type, you might need to create a custom tool. Similarly, if you need to support a compression format not built into the middleware, you can create a custom provider.

**Technical explanation**: You can add support for custom compression formats by creating classes that implement the IDecompressionProvider interface. This allows you to handle any compression algorithm, including proprietary or experimental formats.

**Key jargon explained**:
- **IDecompressionProvider**: Interface for creating custom decompression providers
- **GetDecompressionStream**: Method that returns a decompression stream
- **Custom Encoding**: A compression format not supported by default
- **Provider Registration**: Adding your custom provider to the middleware options
- **Content-Encoding Value**: The header value that identifies your custom format

### Creating a Custom Provider:
```csharp:title=CustomProvider.cs
public class CustomDecompressionProvider : IDecompressionProvider
{
    public Stream GetDecompressionStream(Stream stream)
    {
        // Perform custom decompression logic here
        // Return a stream that decompresses data as it's read
        return new CustomDecompressionStream(stream);
    }
}
```

### Registering the Custom Provider:
```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRequestDecompression(options =>
{
    // Register your custom provider with its encoding name
    options.DecompressionProviders.Add("custom", new CustomDecompressionProvider());
});

var app = builder.Build();

app.UseRequestDecompression();

app.MapPost("/", (HttpRequest request) => Results.Stream(request.Body));

app.Run();
```

### Using the Custom Provider:
```csharp:title=ClientRequest.cs
// Client sends request with custom encoding
POST /api/data
Content-Encoding: custom
[Compressed data with custom format]

// Middleware sees "custom" header
// Uses your CustomDecompressionProvider
// Decompresses using your custom logic
```

**How it works in practice**: Custom providers are useful when:
- You need to support a proprietary compression format
- You're working with legacy systems that use non-standard compression
- You want to implement experimental compression algorithms
- You have specific compression requirements not met by standard formats

The middleware treats your custom provider the same as built-in providers - it automatically uses it when it sees the matching Content-Encoding header.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Request Size Limits - Like security guards at a concert</summary>
  <div>

## Request Size Limits and Security

**Real-life analogy**: Request size limits are like security guards at a concert who limit how many people can enter. If too many people try to enter at once, it becomes dangerous. Similarly, decompressed data can be much larger than compressed data, so the middleware limits the size to prevent attacks like zip bombs (files that expand to enormous sizes when decompressed).

**Technical explanation**: The middleware protects against decompression bombs (also called zip bombs) by limiting the size of decompressed request bodies. If the decompressed data exceeds the limit, an exception is thrown to prevent the attack.

**Key jargon explained**:
- **Zip Bomb**: A malicious file that expands to an enormous size when decompressed
- **Decompression Bomb**: Same as zip bomb - attacks that exploit decompression
- **Request Size Limit**: Maximum allowed size for request bodies
- **InvalidOperationException**: Exception thrown when size limits are exceeded
- **Security Protection**: Measures to prevent malicious attacks

### How Size Limits Work:
```csharp:title=Security.cs
// Attack scenario:
// 1. Client sends 1KB compressed file
// 2. File expands to 10GB when decompressed
// 3. This would crash your server!
// 4. Middleware detects this and throws exception
```

### Size Limit Precedence (highest to lowest):
1. **IRequestSizeLimitMetadata.MaxRequestBodySize**: Per-endpoint limit (like [RequestSizeLimit] attribute)
2. **IHttpMaxRequestBodySizeFeature.MaxRequestBodySize**: Per-request limit
3. **Server limits**: Kestrel or IIS maximum request body size
4. **Global limits**: Application-wide request size limits

```csharp:title=Example.cs
// Per-endpoint limit
app.MapPost("/upload", (HttpRequest request) => 
    Results.Ok("File uploaded"))
    .WithRequestSizeLimit(10_000_000); // 10MB limit
```

**How it works in practice**: The middleware uses the same size limits as your application's normal request handling. If compressed data would exceed these limits when decompressed, the middleware throws an exception before the decompressed data can cause damage. This protects your server from memory exhaustion attacks.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Error Handling - Like a quality control inspector</summary>
  <div>

## Error Handling

**Real-life analogy**: Error handling is like a quality control inspector on an assembly line. If a product is defective, the inspector catches it and prevents it from moving forward. The middleware does the same - if compressed data is invalid or corrupted, it catches the error and handles it gracefully.

**Technical explanation**: The middleware handles various error scenarios, including invalid compressed data, unsupported compression types, and multiple Content-Encoding headers. When it encounters errors it can't handle, it passes the request to the next middleware in the pipeline.

**Key jargon explained**:
- **Invalid Compressed Data**: Data that doesn't follow the compression format correctly
- **Unsupported Encoding**: A compression type the middleware doesn't support
- **Exception Handling**: Catching and managing errors gracefully
- **Pipeline Pass-Through**: Passing the request to the next middleware on error
- **InvalidOperationException**: Exception for invalid data (Brotli)

### Error Scenarios:
```csharp:title=Errors.cs
// Scenario 1: Invalid compressed data
POST /api/data
Content-Encoding: gzip
[Corrupted gzip data]
// Result: System.IO.InvalidDataException thrown

// Scenario 2: Unsupported encoding
POST /api/data
Content-Encoding: unknown-format
[Compressed data]
// Result: Request passed to next middleware unchanged

// Scenario 3: Multiple encoding headers
POST /api/data
Content-Encoding: gzip, br
[Compressed data]
// Result: Request passed to next middleware unchanged
```

### Exception Types:
- **Brotli**: `System.InvalidOperationException` - "Decoder ran into invalid data"
- **Deflate/GZip**: `System.IO.InvalidDataException` - "Unsupported compression method"
- **Zstandard**: `System.IO.InvalidDataException` - "Unsupported compression method" (.NET 11+)

**How it works in practice**: The middleware is designed to fail gracefully:
- If compressed data is invalid, it throws an exception
- If the encoding is unsupported, it passes the request unchanged
- If there are multiple encoding headers, it passes the request unchanged
- Your application's global error handler can catch these exceptions

This ensures that malformed requests don't crash your application while still allowing valid requests to be processed normally.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>When to Use Request Decompression - Like knowing when to use special tools</summary>
  <div>

## When to Use Request Decompression

**Real-life analogy**: Request decompression is like having a special tool in your toolbox. You don't need it for every job, but when you do need it, it's essential. You use it when clients send compressed data to save bandwidth, which is common in high-traffic APIs or mobile applications.

**Technical explanation**: Request decompression is particularly useful for APIs that receive large amounts of data from clients, especially when clients want to reduce bandwidth usage. It's most beneficial for REST APIs, GraphQL endpoints, and any service that accepts substantial request payloads.

**Key jargon explained**:
- **REST APIs**: Web services that use standard HTTP methods
- **GraphQL**: A query language for APIs that can request specific data
- **Bandwidth Optimization**: Reducing data transfer to save costs
- **Mobile Clients**: Applications running on mobile devices with limited data plans
- **Large Payloads**: Requests that contain substantial amounts of data

### When to Use It:
- **High-traffic APIs**: Clients compress requests to reduce bandwidth costs
- **Mobile Applications**: Mobile clients compress to save data usage
- **Large File Uploads**: Clients upload large files in compressed format
- **GraphQL Endpoints**: Complex queries can have large payloads
- **Microservices**: Services communicating with compressed data for efficiency

### When You Don't Need It:
- **Small Requests**: Compression overhead isn't worth it for small payloads
- **Low Traffic**: Bandwidth savings are minimal with few requests
- **Simple Forms**: Typical form submissions don't benefit from compression
- **Internal APIs**: If you control both client and server, you might not need it
- **Standard MVC/Razor Pages**: Browser requests typically don't compress request bodies

```csharp:title=UseCase.cs
// GOOD: API endpoint that receives large JSON payloads
app.MapPost("/api/data", async (HttpRequest request) =>
{
    var data = await request.ReadFromJsonAsync<LargeDataModel>();
    // Process large data
    return Results.Ok(data);
});

// NOT NEEDED: Simple form submission
app.MapPost("/contact", async (HttpRequest request) =>
{
    var form = await request.ReadFormAsync();
    // Process small form data
    return Results.Ok("Received");
});
```

**How it works in practice**: Add request decompression middleware when:
- You expect clients to send compressed request bodies
- Bandwidth optimization is important for your application
- You're building APIs that will be used by mobile clients
- You need to handle large request payloads efficiently

For typical web applications with small requests, you probably don't need this middleware.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Request decompression in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/middleware/request-decompression?view=aspnetcore-10.0)