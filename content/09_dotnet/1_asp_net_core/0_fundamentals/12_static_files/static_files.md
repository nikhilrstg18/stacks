---
title: "Static Files"
slug: "09_dotnet/1_asp_net_core/0_fundamentals/12_static_files"
stack: "ASP.NET Core"
date: "2026-08-11T00:00:00.000Z"
draft: false
---

<details>
  <summary>Static Files - Like serving documents from a file cabinet</summary>
  <div>

## What are Static Files?

**Real-life analogy**: Static files are like documents in a file cabinet. When someone asks for a document, you just pull it out of the cabinet and give it to them. You don't create it on the spot or modify it - you just serve the existing document. Static files work the same way - they're files like images, CSS, and JavaScript that are served as-is without modification.

**Technical explanation**: Static files are files in an ASP.NET Core app that aren't dynamically generated. Examples include HTML, CSS, image, and JavaScript files. These files are served directly to clients on request without being processed by server-side code. By default, static files are stored in the wwwroot directory.

**Key jargon explained**:
- **Static Files**: Files served as-is without server-side processing
- **wwwroot**: The default directory for static files
- **Web Root**: The directory where static files are stored
- **Content Root**: The root directory of the application
- **Static Assets**: Another term for static files

```csharp:title=Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapStaticAssets();

app.MapGet("/", () => "Hello World!");

app.Run();
```

**How it works in practice**: Static files provide:
- **Direct Serving**: Files are served without processing
- **Performance**: No server-side overhead for static content
- **Caching**: Files can be cached by browsers for better performance
- **Compression**: Files can be compressed for faster delivery
- **Fingerprinting**: Files get unique identifiers to prevent caching issues

Static files are essential for serving CSS, JavaScript, images, and other client-side assets.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Enabling Static Files - Like opening the file cabinet</summary>
  <div>

## Enabling Static Files

**Real-life analogy**: Enabling static files is like opening the file cabinet so people can access documents. By default, the file cabinet is locked (static files aren't served). You need to unlock it (enable static files) so people can request documents (static files) and get them directly from the cabinet.

**Technical explanation**: To enable static file handling in ASP.NET Core, call MapStaticAssets in your Program.cs file. This middleware enables static file serving and is used by the app when MapStaticAssets is called in the request processing pipeline.

**Key jargon explained**:
- **MapStaticAssets**: Method to enable static file serving
- **Middleware**: Software components that process requests
- **Request Processing Pipeline**: The sequence of middleware that processes requests
- **Web Root**: The directory where static files are stored
- **Content Type**: The type of file (HTML, CSS, JavaScript, etc.)

### Basic Setup:
```csharp:title=Basic.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapStaticAssets();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Default Directory Structure:
```
Project/
├── Program.cs
├── wwwroot/              # Web root (static files)
│   ├── css/
│   │   └── site.css
│   ├── js/
│   │   └── app.js
│   ├── images/
│   │   └── logo.png
│   └── index.html
```

### Accessing Static Files:
```html:title=index.html
<!DOCTYPE html>
<html>
<head>
    <link href="/css/site.css" rel="stylesheet">
    <script src="/js/app.js"></script>
</head>
<body>
    <img src="/images/logo.png" alt="Logo">
</body>
</html>
```

### Custom Web Root:
```csharp:title=CustomRoot.cs
var builder = WebApplication.CreateBuilder(args);

// Set custom web root
builder.WebHost.UseWebRoot("custom-webroot");

var app = builder.Build();

app.MapStaticAssets();
```

### Enable with Options:
```csharp:title=Options.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapStaticAssets(new StaticAssetOptions
{
    ServeUnknownFileTypes = true,
    DefaultContentType = "application/octet-stream"
});

app.Run();
```

### Multiple Directories:
```csharp:title=Multiple.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Enable static files from wwwroot
app.MapStaticAssets();

// Enable static files from additional directory
app.MapStaticAssets("/content", new StaticAssetOptions
{
    OnPrepareResponse = context =>
    {
        context.Context.Response.Headers.Append(
            "Cache-Control", $"public, max-age={60 * 60 * 24 * 30}");
    }
});

app.Run();
```

**How it works in practice**: Enabling static files provides:
- **Automatic Serving**: Files in wwwroot are automatically served
- **Direct Access**: Files are accessed via their URL path
- **Content Types**: Files are served with correct content-type headers
- **Caching Headers**: Appropriate caching headers are added automatically
- **Build-Time Optimization**: Files are compressed and fingerprinted at build time

Once enabled, static files are served automatically when requested by their URL.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Web Root and Content Root - Like different file locations</summary>
  <div>

## Web Root and Content Root

**Real-life analogy**: Web root and content root are like different file locations in a company. The content root is the company's main office where all the business logic lives (code, configuration, etc.). The web root is like the public reception area where documents are available to visitors (static files). They're separate for security - visitors can access the reception area but not the main office.

**Technical explanation**: The content root is the base directory of the application, containing all the source code and configuration files. The web root is a subdirectory (typically wwwroot) containing static files that are publicly accessible. This separation keeps application code and public files separate for security.

**Key jargon explained**:
- **Content Root**: The base directory of the application
- **Web Root**: The directory containing publicly accessible static files
- **wwwroot**: The default web root directory name
- **Security**: Separation keeps application code private
- **Public Access**: Only web root files are accessible via HTTP

### Directory Structure:
```
Project/                          # Content Root
├── Program.cs                    # Application code
├── appsettings.json              # Configuration
├── Controllers/                  # Application code
│   └── HomeController.cs
└── wwwroot/                      # Web Root (public)
    ├── index.html
    ├── css/
    └── js/
```

### Access Content Root:
```csharp:title=ContentRoot.cs
var builder = WebApplication.CreateBuilder(args);

// Content root is the project directory
var contentRoot = builder.Environment.ContentRootPath;
Console.WriteLine($"Content Root: {contentRoot}");

var app = builder.Build();
```

### Access Web Root:
```csharp:title=WebRoot.cs
var builder = WebApplication.CreateBuilder(args);

// Web root is the wwwroot directory
var webRoot = builder.Environment.WebRootPath;
Console.WriteLine($"Web Root: {webRoot}");

var app = builder.Build();
```

### Custom Web Root:
```csharp:title=Custom.cs
var builder = WebApplication.CreateBuilder(args);

// Change web root to a different directory
builder.WebHost.UseWebRoot("public");

var app = builder.Build();
```

### Security Implications:
```csharp:title=Security.cs
// Content Root (private):
// - Application code
// - Configuration files
// - Database connection strings
// - NOT accessible via HTTP

// Web Root (public):
// - HTML files
// - CSS files
// - JavaScript files
// - Images
// - Accessible via HTTP

// This separation ensures:
// - Application code is not exposed
// - Sensitive files are not accessible
// - Only public files are served
```

### File Access:
```csharp:title=Access.cs
// Files in wwwroot are accessible via HTTP:
// /index.html → wwwroot/index.html
// /css/site.css → wwwroot/css/site.css
// /images/logo.png → wwwroot/images/logo.png

// Files outside wwwroot are NOT accessible:
// /Program.cs → 404 Not Found
// /appsettings.json → 404 Not Found
// /Controllers/HomeController.cs → 404 Not Found
```

**How it works in practice**: Web root and content root provide:
- **Security**: Application code is kept private
- **Organization**: Clear separation between public and private files
- **Default Locations**: Standard locations that work automatically
- **Customization**: Can change web root if needed
- **Access Control**: Only web root files are accessible via HTTP

This separation is important for security and organization.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>File Compression - Like zipping files for faster delivery</summary>
  <div>

## File Compression

**Real-life analogy**: File compression is like zipping files before sending them. If you need to send a large document, you zip it first to make it smaller. The recipient unzips it when they receive it. This takes less time to send and uses less storage. Static file compression works the same way for web files.

**Technical explanation**: Static files are automatically compressed at build time to reduce asset delivery time. JavaScript and CSS files are compressed using Gzip during development and both Gzip and Brotli during publish. Images and fonts are not compressed as they're already compressed. Compression reduces file size and improves load times.

**Key jargon explained**:
- **Compression**: Reducing file size for faster delivery
- **Gzip**: A compression format (used during development)
- **Brotli**: A newer compression format (used during publish)
- **Build-Time Optimization**: Compression happens when you build the app
- **Content-Based Fingerprinting**: Files get unique identifiers based on content

### Automatic Compression:
```csharp:title=Automatic.cs
// Compression is automatic - no configuration needed
// Files are compressed at build time

// Development: Gzip compression
// Publish: Gzip + Brotli compression

// Compressed files:
// - JavaScript (.js)
// - CSS (.css)
// - HTML (.html)

// Not compressed (already compressed):
// - Images (.png, .jpg, .gif)
// - Fonts (.woff, .woff2)
```

### Compression Headers:
```csharp:title=Headers.cs
// Compressed files are served with:
// Content-Encoding: gzip  (or br for Brotli)
// Content-Type: application/javascript (or appropriate type)

// Browser automatically decompresses when it receives the file
```

### Build-Time Optimization:
```csharp:title=BuildTime.cs
// Compression happens at build time:
dotnet build

// During build:
// - Files are compressed
// - Fingerprints are generated
// - Optimized files are created
// - Original files are preserved
```

### File Size Comparison:
```csharp:title=Comparison.cs
// Original file: app.js (100 KB)
// Compressed (Gzip): app.js (30 KB)
// Compressed (Brotli): app.js (25 KB)

// Benefits:
// - 70% smaller with Gzip
// - 75% smaller with Brotli
// - Faster download times
// - Reduced bandwidth usage
```

### Disable Compression:
```csharp:title=Disable.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapStaticAssets(new StaticAssetOptions
{
    // Disable compression if needed (not recommended)
    OnPrepareResponse = context =>
    {
        // Custom logic to disable compression
    }
});

app.Run();
```

**How it works in practice**: File compression provides:
- **Automatic Optimization**: No configuration needed
- **Reduced File Size**: Files are 70-75% smaller
- **Faster Load Times**: Smaller files download faster
- **Reduced Bandwidth**: Less data transferred
- **Browser Support**: All browsers support Gzip, most support Brotli

Compression significantly improves performance for static file delivery.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>File Fingerprinting - Like versioning documents</summary>
  <div>

## File Fingerprinting

**Real-life analogy**: File fingerprinting is like versioning documents with unique identifiers. Instead of calling a document "report.docx", you call it "report-v1.docx", "report-v2.docx", etc. When the document changes, the version changes. This ensures people always get the latest version and don't use an old cached version.

**Technical explanation**: Static files are fingerprinted at build time using a Base64-encoded SHA-256 hash of each file's content. This unique identifier is added to the filename, preventing browsers from using old cached files. When a file changes, its fingerprint changes, forcing browsers to download the new version.

**Key jargon explained**:
- **Fingerprinting**: Adding unique identifiers to filenames based on content
- **SHA-256 Hash**: A cryptographic hash of the file content
- **Base64 Encoding**: Encoding the hash as a string
- **Cache Busting**: Forcing browsers to download new file versions
- **Immutable Directive**: Cache header that tells browsers to never re-download until the file changes

### Fingerprinted Filenames:
```csharp:title=Filenames.cs
// Original: app.js
// Fingerprinted: app.abc123.js (where abc123 is the hash)

// When file content changes:
// Original: app.js (modified)
// Fingerprinted: app.def456.js (new hash for new content)
```

### Automatic Fingerprinting:
```csharp:title=Automatic.cs
// Fingerprinting is automatic - no configuration needed
// Files are fingerprinted at build time

dotnet build

// Fingerprinted files are generated automatically
// Original files are preserved
```

### Cache Headers:
```csharp:title=Cache.cs
// Fingerprinted files get cache headers:
// Cache-Control: immutable, max-age=31536000
// ETag: "abc123" (the fingerprint)

// This tells browsers:
// - Cache this file forever (immutable)
// - Only download again if the fingerprint changes
```

### Benefits:
```csharp:title=Benefits.cs
// File fingerprinting provides:
// - Cache Busting: Browsers always get the latest version
// - Performance: Files are cached permanently until they change
// - Reliability: Users never see stale content
// - Automation: No manual versioning needed
// - Build-Time: Fingerprinting happens automatically at build
```

### Reference in HTML:
```html:title=HTML.cs
<!-- Automatic reference generation -->
<link rel="stylesheet" href="/css/site.abc123.css">
<script src="/js/app.def456.js"></script>

<!-- When file changes, the reference updates automatically -->
<link rel="stylesheet" href="/css/site.xyz789.css">
<script src="/js/app.abc123.js"></script>
```

### For Non-Fingerprinted Files:
```csharp:title=NonFingerprinted.cs
// Even non-fingerprinted files get ETags
// ETag is based on the file content hash
// Browser only downloads if ETag changes

// This ensures:
// - Files are cached until they change
// - No duplicate downloads
// - Always get the latest version
```

**How it works in practice**: File fingerprinting provides:
- **Automatic Cache Busting**: Browsers always get the latest version
- **Permanent Caching**: Files are cached until they change
- **No Manual Versioning**: Automatic based on content
- **Build-Time Processing**: Fingerprinting happens at build time
- **ETag Support**: Even non-fingerprinted files get ETags

Fingerprinting ensures users always see the latest version of your static files.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Serving Default Documents - Like showing a welcome sign</summary>
  <div>

## Serving Default Documents

**Real-life analogy**: Serving default documents is like having a welcome sign at the entrance. When someone visits your building without specifying where they want to go, you show them a welcome sign (default document) that gives them directions. Similarly, when someone visits your website without specifying a file, you show them a default page like index.html.

**Technical explanation**: Default documents are files that are served when a user requests a directory instead of a specific file. For example, when a user requests "/", the server serves a default file like "index.html" or "default.html" from that directory. UseDefaultFiles middleware enables this functionality.

**Key jargon explained**:
- **Default Document**: File served when a directory is requested
- **index.html**: The most common default document name
- **default.html**: Another common default document name
- **Directory Request**: A request for a directory (like "/") instead of a file
- **UseDefaultFiles**: Middleware that enables default document serving

### Enable Default Documents:
```csharp:title=Enable.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Default Document Names:
```csharp:title=Names.cs
// Default document names (in order of priority):
// - index.htm
// - index.html
// - default.htm
// - default.html

// The first file found is served
```

### Directory Structure:
```
wwwroot/
├── index.html              # Served when "/" is requested
├── css/
│   └── site.css
└── js/
    └── app.js
```

### Custom Default Files:
```csharp:title=Custom.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Configure custom default file names
var options = new DefaultFilesOptions();
options.DefaultFileNames.Clear();
options.DefaultFileNames.Add("home.html");
options.DefaultFileNames.Add("start.html");

app.UseDefaultFiles(options);
app.UseStaticFiles();
```

### Subdirectory Default Files:
```csharp:title=Subdirectory.cs
// Default files work in subdirectories too
// Request: /products/
// Serves: /products/index.html (if it exists)

// Request: /about/
// Serves: /about/default.html (if index.html doesn't exist)
```

### Complete Setup:
```csharp:title=Complete.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Order matters - default files before static files
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api", () => "API endpoint");

app.Run();
```

### With MapStaticAssets:
```csharp:title=MapStaticAssets.cs
// For modern ASP.NET Core, use MapStaticAssets
// But default documents need separate handling

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// For static assets with fingerprinting
app.MapStaticAssets();

// For default documents (without fingerprinting)
app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
```

**How it works in practice**: Default documents provide:
- **User-Friendly URLs**: Users can request "/" instead of "/index.html"
- **Standard Convention**: index.html is the standard default file
- **Multiple Options**: Support for multiple default file names
- **Subdirectory Support**: Default files work in subdirectories
- **Custom Configuration**: Can configure custom default file names

Default documents make your website more user-friendly with cleaner URLs.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Authorization and Security - Like restricting file cabinet access</summary>
  <div>

## Authorization and Security

**Real-life analogy**: Authorization for static files is like restricting access to certain file cabinets. Some cabinets are open to everyone (public static files), while others require special permission (protected files). You want to ensure only authorized people can access sensitive documents. Static file authorization works the same way.

**Technical explanation**: By default, static files are publicly accessible to anyone who knows the URL. You can add authorization to protect specific static files or directories. This ensures only authenticated and authorized users can access certain static files.

**Key jargon explained**:
- **Authorization**: Controlling who can access specific files
- **Authentication**: Verifying who the user is
- **Protected Files**: Files that require authorization to access
- **RequireAuthorization**: Middleware that requires authentication
- **Fallback**: What happens when authorization fails

### Public Static Files (Default):
```csharp:title=Public.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Static files are public by default
app.MapStaticAssets();

app.Run();

// Anyone can access: /css/site.css, /js/app.js, /images/logo.png
```

### Protect All Static Files:
```csharp:title=ProtectAll.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthorization();
app.MapStaticAssets().RequireAuthorization();

app.Run();

// All static files now require authentication
```

### Protect Specific Directory:
```csharp:title=ProtectDirectory.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthorization();

// Public files
app.MapStaticAssets();

// Protected files
app.MapStaticAssets("/admin").RequireAuthorization();

app.Run();

// /admin/* requires authentication
// /* is public
```

### Protect Specific File:
```csharp:title=ProtectFile.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthorization();

// Public files
app.MapStaticAssets();

// Protected file
app.MapGet("/secret-file.pdf", async context =>
{
    await context.Response.SendFileAsync("wwwroot/secret-file.pdf");
}).RequireAuthorization();

app.Run();
```

### Role-Based Authorization:
```csharp:title=Roles.cs
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin"));
});

var app = builder.Build();

app.UseAuthorization();

app.MapStaticAssets("/admin")
    .RequireAuthorization("AdminOnly");

app.Run();

// Only users in Admin role can access /admin/*
```

### Fallback Page:
```csharp:title=Fallback.cs
app.UseStaticAssets();

// Fallback for unauthorized access
app.MapFallback(async context =>
{
    context.Response.StatusCode = 401;
    await context.Response.WriteAsync("Unauthorized");
});
```

**How it works in practice**: Authorization provides:
- **Access Control**: Control who can access specific files
- **Authentication**: Require users to log in
- **Role-Based**: Restrict access based on user roles
- **Flexible Protection**: Protect specific files or directories
- **Fallback Handling**: Custom responses for unauthorized access

Authorization ensures sensitive static files are protected from unauthorized access.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Best Practices - Like following file management procedures</summary>
  <div>

## Static Files Best Practices

**Real-life analogy**: Following static files best practices is like following proper file management procedures. You should organize files logically (use appropriate directories), protect sensitive documents (use authorization), compress large files (use compression), and keep versions updated (use fingerprinting). Good procedures make your file cabinet efficient and secure.

**Technical explanation**: Following best practices ensures your static files are organized, performant, and secure. This includes using the appropriate directory structure, enabling compression and fingerprinting, protecting sensitive files with authorization, and following web standards for static file organization.

**Key jargon explained**:
- **Organization**: Logical directory structure for static files
- **Performance**: Compression and caching for fast delivery
- **Security**: Authorization for sensitive files
- **Standards**: Following web standards for file organization
- **Optimization**: Build-time optimization for static files

### DO:
- **Use wwwroot** for static files (standard convention)
- **Enable MapStaticAssets** for automatic optimization
- **Organize files** in logical directories (css, js, images)
- **Use fingerprinting** for cache busting (automatic)
- **Compress files** to reduce size (automatic)
- **Protect sensitive files** with authorization
- **Use semantic file names** that are descriptive
- **Minify CSS and JavaScript** for production

### DON'T:
- **Store sensitive files** in wwwroot (they're publicly accessible)
- **Disable compression** (performance penalty)
- **Ignore security** for sensitive static files
- **Use absolute paths** in file references (use relative paths)
- **Store large files** in wwwroot (use CDN or blob storage)
- **Forget about caching** (fingerprinting handles this automatically)
- **Mix concerns** (keep public and private files separate)
- **Ignore build-time optimization** (it's free performance)

### Directory Organization:
```csharp:title=Organization.cs
// DO: Organize files logically
wwwroot/
├── css/
│   ├── site.css
│   └── responsive.css
├── js/
│   ├── app.js
│   └── utils.js
├── images/
│   ├── logo.png
│   └── banner.jpg
└── fonts/
    └── roboto.woff2

// DON'T: Put everything in the root
wwwroot/
├── site.css
├── app.js
├── logo.png
├── banner.jpg
└── roboto.woff2
```

### Security:
```csharp:title=Security.cs
// DO: Protect sensitive files
app.MapStaticAssets("/admin").RequireAuthorization();
app.MapStaticAssets("/private").RequireAuthorization();

// DON'T: Put sensitive files in wwwroot
// - Configuration files
// - Database connection strings
// - Private keys
// - Internal documents
```

### Performance:
```csharp:title=Performance.cs
// DO: Let the framework optimize
app.MapStaticAssets();  // Automatic compression and fingerprinting

// DON'T: Disable optimization
// Compression and fingerprinting are free performance wins
```

### File References:
```csharp:title=References.cs
// DO: Use relative paths
<link href="/css/site.css" rel="stylesheet">
<script src="/js/app.js"></script>

// DON'T: Use absolute paths to external servers (unless needed)
<link href="https://cdn.example.com/css/site.css" rel="stylesheet">
```

### Large Files:
```csharp:title=LargeFiles.cs
// DO: Use CDN or blob storage for large files
// - Videos
// - Large images
// - Downloads
// - Archives

// DON'T: Store large files in wwwroot
// - Increases deployment size
// - Slows down deployment
// - Uses server resources
```

**How it works in practice**: Best practices ensure:
- **Organization**: Files are easy to find and manage
- **Performance**: Files are optimized for fast delivery
- **Security**: Sensitive files are protected
- **Maintainability**: Clear structure makes maintenance easy
- **Standards**: Following conventions makes code more readable

Good static file practices make your application faster, more secure, and easier to maintain.

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Static files in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/fundamentals/static-files?view=aspnetcore-10.0)