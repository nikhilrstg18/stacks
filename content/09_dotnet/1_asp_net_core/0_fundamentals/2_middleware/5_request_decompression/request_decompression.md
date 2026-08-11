---
title: "Request Decompression"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/2_middleware/5_request_decompression"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Request Decompression Overview - Compressed Request Handling</summary>
  <div>

## Request Decompression in ASP.NET Core

**Real-life analogy**: Request decompression is like having an automated unpacking service for deliveries. When packages arrive compressed (shrink-wrapped, vacuum-sealed), the service automatically unpacks them before processing. This eliminates the need for each department to handle unpacking themselves. Request decompression middleware provides the same capability for HTTP requests - automatically decompressing compressed request bodies before the endpoint processes them.

**Technical explanation**: Request decompression middleware enables API endpoints to accept requests with compressed content. It uses the Content-Encoding HTTP header to automatically identify and decompress requests. The middleware wraps HttpRequest.Body in an appropriate decompression stream and removes the Content-Encoding header. Decompression occurs when the body is read (lazy evaluation, not eager). Default providers support Brotli (br), Deflate, and Gzip compression formats. Custom providers can be added for other formats.

**Key jargon explained**:
- **Request Decompression**: Middleware for decompressing compressed request bodies
- **Content-Encoding Header**: Identifies compression format
- **Decompression Providers**: Components that handle specific compression formats
- **Lazy Decompression**: Decompression occurs when body is read, not eagerly
- **Zip Bombs**: Malicious compressed data that expands dramatically when decompressed

```csharp:title=BasicSetup.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRequestDecompression();

var app = builder.Build();

app.UseRequestDecompression();

app.MapPost("/", (HttpRequest request) => Results.Stream(request.Body));

app.Run();
```

```csharp:title=CustomProvider.cs
public class CustomDecompressionProvider : IDecompressionProvider
{
    public Stream GetDecompressionStream(Stream stream)
    {
        // Perform custom decompression logic
        return stream;
    }
}

builder.Services.AddRequestDecompression(options =>
{
    options.DecompressionProviders.Add("custom", new CustomDecompressionProvider());
});
```

**How it works in practice**: When a request arrives with a Content-Encoding header matching a registered provider, the middleware wraps the request body in a decompression stream. The Content-Encoding header is removed to indicate the body is no longer compressed. Decompression happens lazily when the body is read (during model binding). If decompression fails due to invalid data, an exception is thrown. Requests without Content-Encoding or with unsupported encodings are passed through unchanged.

**Key takeaways for interviews**:
- Middleware automatically decompresses compressed request bodies
- Uses Content-Encoding header to identify compression format
- Lazy decompression when body is read, not eager
- Default providers: Brotli, Deflate, Gzip
- Custom providers can be added for other formats

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Decompression Providers - Compression Format Support</summary>
  <div>

## Decompression Providers

**Real-life analogy**: Decompression providers are like specialized unpacking machines for different packaging formats. One machine handles shrink-wrapped packages, another handles vacuum-sealed packages, another handles boxed packages. Each machine knows how to unpack its specific format. Decompression providers work the same way - each provider handles a specific compression format like Brotli, Deflate, or Gzip.

**Technical explanation**: Decompression providers implement IDecompressionProvider and handle specific compression formats. Default providers support Brotli (br), Deflate, and Gzip (gzip). ASP.NET Core 11 adds Zstandard (zstd) support. Custom providers can be registered for other formats. Providers are registered in RequestDecompressionOptions with their corresponding Content-Encoding header values. The middleware matches the Content-Encoding header to the appropriate provider.

**Key jargon explained**:
- **IDecompressionProvider**: Interface for custom decompression providers
- **Brotli**: High-performance compression format
- **Deflate**: Standard compression format
- **Gzip**: Common compression format
- **Zstandard**: Modern compression format (ASP.NET Core 11+)

```csharp:title=DefaultProviders.cs
// Default providers (automatically available):
// - br: Brotli compressed data
// - deflate: DEFLATE compressed data
// - gzip: Gzip file format
// - zstd: Zstandard (ASP.NET Core 11+)
```

```csharp:title=CustomProvider.cs
public class CustomDecompressionProvider : IDecompressionProvider
{
    public Stream GetDecompressionStream(Stream stream)
    {
        // Perform custom decompression logic
        // Return decompressed stream
        return stream;
    }
}

builder.Services.AddRequestDecompression(options =>
{
    options.DecompressionProviders.Add("custom", new CustomDecompressionProvider());
});
```

**How it works in practice**: When a request arrives, the middleware checks the Content-Encoding header. If it matches a registered provider, that provider's GetDecompressionStream method is called to wrap the request body. The provider returns a decompression stream that decompresses data as it's read. The Content-Encoding header is removed. Unsupported Content-Encoding values result in the request being passed through unchanged.

**Key takeaways for interviews**:
- Default providers: Brotli, Deflate, Gzip (Zstandard in .NET 11+)
- Custom providers implement IDecompressionProvider
- Providers registered with Content-Encoding header values
- Unsupported encodings passed through unchanged
- Each provider handles specific compression format

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

**Real-life analogy**: Interview preparation for request decompression concepts is like understanding automated unpacking systems. You need to understand how to identify different packaging formats, how to unpack them safely, how to handle unsupported formats, and how to protect against malicious packages.

**Common interview questions**:
1. **What is request decompression middleware?**
   - Middleware for automatically decompressing compressed request bodies
   - Uses Content-Encoding header to identify compression format
   - Wraps request body in decompression stream
   - Removes Content-Encoding header after decompression
   - Eliminates need for manual decompression code

2. **How does request decompression work?**
   - Checks Content-Encoding header on incoming requests
   - Matches header to registered decompression provider
   - Wraps request body in decompression stream
   - Decompression occurs lazily when body is read
   - Removes Content-Encoding header

3. **What are the default decompression providers?**
   - Brotli (br): High-performance compression
   - Deflate: Standard compression format
   - Gzip (gzip): Common compression format
   - Zstandard (zstd): Modern compression (ASP.NET Core 11+)
   - Custom providers can be added for other formats

4. **How do you add custom decompression providers?**
   - Implement IDecompressionProvider interface
   - Implement GetDecompressionStream method
   - Register provider with Content-Encoding header value
   - Add to RequestDecompressionOptions.DecompressionProviders
   - Provider handles specific compression format

5. **What are the security considerations for request decompression?**
   - Protection against zip bombs (malicious compressed data)
   - Maximum decompressed size limited by request body size limit
   - Invalid compressed data throws exceptions
   - Multiple Content-Encoding values passed through
   - Request size limits prevent resource exhaustion

**Key interview concepts**:
- **Automatic Decompression**: Middleware handles compressed requests
- **Lazy Evaluation**: Decompression when body is read
- **Provider Pattern**: Different providers for different formats
- **Security Protection**: Limits prevent zip bombs
- **Extensibility**: Custom providers for other formats

**How to approach interview questions**:
- Start with clear definition of request decompression purpose
- Explain Content-Encoding header matching to providers
- Discuss default providers (Brotli, Deflate, Gzip)
- Address custom provider implementation and registration
- Mention security considerations and zip bomb protection

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Request decompression in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/middleware/request-decompression?view=aspnetcore-10.0)