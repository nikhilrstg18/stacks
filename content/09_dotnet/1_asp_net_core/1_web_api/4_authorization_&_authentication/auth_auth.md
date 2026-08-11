---
title: "Authorization & Authentication"
slug: "09_dotnet/1_asp_net_core/1_web_api/4_authorization_&_authentication"
stack: "ASP.NET Core"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

## Big Picture

Advantages of async code ?
handling Sync vs Async request
I/O-bound work Vs Computational Bound work
Threads, Multithreading, Concurrency Parallelism

Task vs Task<T> vs ValueTask vs ValueTask<T>
async/await keywords
Async Patterns : TAP, EAP and APM
Introduction to Repository
Eg. Get Resource
Testing sync vs async Get with WebSurge
Outer Facing Model
Manipulate output with IAsyncResultFilter
Creating Custom AsyncResultFilter

Eg. Create Resource
Extending with Supporting Bulk Inserts
sync vs async iteration
Streaming with IAsyncEnumerable<T>

Integrating with External service via HTTP
Processing multiple request async, one-by-one
Processing multiple request async, after waiting for all of them to complete
Parallel vs async Processing

Why support for cancellationToken matters?
eg supporting cancellation
supporting cancellation when user navigates away
Listening to multiple cancellation tokens
handling exception in async code
