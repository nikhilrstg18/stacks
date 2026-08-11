---
title: "JSON Patch"
slug: "09_dotnet/1_asp_net_core/1_web_api/0_fundamentals/1_json_patch"
stack: "ASP.NET Core"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>JSON Patch Overview - Partial Updates</summary>
  <div>

## JsonPatch in ASP.NET Core Web API

**Real-life analogy**: JSON Patch is like sending a correction form instead of resubmitting an entire document. Instead of sending the complete document with all changes, you send only the specific corrections needed (add paragraph 3, remove paragraph 5, replace sentence 2). This reduces paperwork and processing time. JSON Patch provides the same efficiency for API updates - clients send only the changes needed instead of the entire resource, reducing payload size and improving efficiency.

**Technical explanation**: JSON Patch is a standard format (RFC 6902) for describing changes to JSON documents. It defines operations like add, remove, replace, move, copy, and test. In web apps, JSON Patch is commonly used in PATCH operations for partial updates. ASP.NET Core support is based on System.Text.Json serialization, requiring Microsoft.AspNetCore.JsonPatch.SystemTextJson package. It provides JsonPatchDocument<TModel> to represent patch documents and ApplyTo(Object) to apply changes. The standard has inherent security risks that developers must mitigate.

**Key jargon explained**:
- **JSON Patch**: Standard format for partial JSON updates
- **RFC 6902**: IETF standard defining JSON Patch operations
- **Partial Updates**: Sending only changes instead of full resource
- **JsonPatchDocument**: Class representing patch documents
- **ApplyTo**: Method applying patch operations to target object

```csharp:title=EnableSupport.cs
dotnet add package Microsoft.AspNetCore.JsonPatch.SystemTextJson
```

```csharp:title=PatchEndpoint.cs
group.MapPatch("/{id}", async Task<Results<Ok<Customer>,ValidationProblem,NotFound<ProblemDetails>>> (AppDb db, string id,
    JsonPatchDocument<Customer> patchDoc) =>
{
    var customer = await db.Customers.Include(c => c.Orders).FirstOrDefaultAsync(c => c.Id == id);
    if (customer is null)
    {
        return TypedResults.NotFound<ProblemDetails>(new ());
    }
    if (patchDoc != null)
    {
        Dictionary<string, string[]>? errors = null;
        patchDoc.ApplyTo(customer, jsonPatchError =>
        {
            errors ??= new ();
            var key = jsonPatchError.AffectedObject.GetType().Name;
            if (!errors.ContainsKey(key))
            {
                errors.Add(key, new string[] { });
            }
            errors[key] = errors[key].Append(jsonPatchError.ErrorMessage).ToArray();
        });

        if (errors != null)
        {
            return TypedResults.ValidationProblem(errors);
        }

        await db.SaveChangesAsync();
    }

    return TypedResults.Ok(customer);
})
.Accepts<JsonPatchDocument<Customer>>("application/json-patch+json");
```

**How it works in practice**: JSON Patch documents contain operations that modify JSON documents. JsonPatchDocument<TModel> parses these operations and ApplyTo applies them to the target object. Operations include add (add value), remove (remove value), replace (replace value), move (move value), copy (copy value), and test (test condition). The patch document is sent with Content-Type application/json-patch+json. The ApplyTo method processes operations in order, applying each to the target object. Validation errors are collected and returned if any operation fails.

**Key takeaways for interviews**:
- JSON Patch enables partial updates, reducing payload size
- RFC 6902 standard defines operations (add, remove, replace, move, copy, test)
- System.Text.Json-based implementation in .NET 10+
- Requires Microsoft.AspNetCore.JsonPatch.SystemTextJson package
- Inherent security risks require developer mitigation

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>JSON Patch Operations - Add, Remove, Replace</summary>
  <div>

## JSON Patch Operations

**Real-life analogy**: JSON Patch operations are like different types of document edits. "Add" is like inserting a new paragraph. "Remove" is like deleting a paragraph. "Replace" is like changing a sentence. "Move" is like cutting and pasting content. "Copy" is like duplicating content. "Test" is like verifying a condition before proceeding. These operations provide comprehensive document manipulation capabilities for partial updates.

**Technical explanation**: JSON Patch supports six operations defined in RFC 6902. Add adds a value to a target location. Remove removes a value from a target location. Replace replaces a value at a target location. Move moves a value from one location to another. Copy copies a value from one location to another. Test tests that a value at a location equals a specified value. Operations are applied in sequence, with each operation potentially affecting subsequent operations.

**Key jargon explained**:
- **Add**: Insert value at target location
- **Remove**: Remove value from target location
- **Replace**: Replace value at target location
- **Move**: Move value from one location to another
- **Copy**: Copy value from one location to another
- **Test**: Test value equals specified value

```json:title=PatchDocument.json
[
  { "op": "add", "path": "/Name", "value": "New Name" },
  { "op": "remove", "path": "/PhoneNumber" },
  { "op": "replace", "path": "/Email", "value": "new@example.com" },
  { "op": "move", "from": "/Orders/0", "path": "/Orders/-" },
  { "op": "copy", "from": "/Orders/0", "path": "/Orders/-" },
  { "op": "test", "path": "/Email", "value": "old@example.com" }
]
```

**How it works in practice**: Operations are specified in a JSON array with op, path, and value properties. Path uses JSON Pointer syntax to target locations. Add inserts value at the target path. Remove removes the value at the target path. Replace replaces the value at the target path. Move moves a value from one path to another (removing from source). Copy copies a value from one path to another (keeping source). Test validates the value at the path equals the specified value. Operations are applied in order, enabling complex document transformations.

**Key takeaways for interviews**:
- Six operations: add, remove, replace, move, copy, test
- JSON Pointer syntax for targeting locations
- Operations applied in sequence
- Test operation enables conditional patching
- Move removes from source, Copy keeps source

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

**Real-life analogy**: Interview preparation for JSON Patch concepts is like understanding document editing systems. You need to understand different edit operations, how to apply them efficiently, how to handle errors, and how to ensure security while enabling partial updates.

**Common interview questions**:
1. **What is JSON Patch and when should it be used?**
   - Standard format for partial JSON updates (RFC 6902)
   - Used in PATCH operations for partial resource updates
   - Reduces payload size and improves efficiency
   - Sends only changes instead of entire resource
   - Common in RESTful APIs for partial updates

2. **What are the JSON Patch operations?**
   - Add: insert value at target location
   - Remove: remove value from target location
   - Replace: replace value at target location
   - Move: move value from one location to another
   - Copy: copy value from one location to another
   - Test: test value equals specified value

3. **How do you enable JSON Patch in ASP.NET Core?**
   - Install Microsoft.AspNetCore.JsonPatch.SystemTextJson package
   - Based on System.Text.Json serialization (.NET 10+)
   - Provides JsonPatchDocument<TModel> class
   - ApplyTo method applies patch operations
   - Accepts application/json-patch+json content type

4. **What are the security considerations for JSON Patch?**
   - JSON Patch has inherent security risks
   - ASP.NET Core doesn't mitigate inherent risks
   - Developer responsibility to ensure patch document safety
   - Validate patch operations before applying
   - Consider authorization and validation

5. **How does JSON Patch improve API efficiency?**
   - Reduces payload size by sending only changes
   - Reduces network bandwidth and processing time
   - Enables partial updates without full resource transfer
   - Reduces database update overhead
   - Improves performance for large resources

**Key interview concepts**:
- **Partial Updates**: Sending only changes instead of full resource
- **RFC 6902**: IETF standard for JSON Patch
- **System.Text.Json**: Modern JSON serialization in .NET
- **Patch Operations**: Add, remove, replace, move, copy, test
- **Security Risks**: Inherent risks requiring developer mitigation

**How to approach interview questions**:
- Start with clear definition of JSON Patch purpose
- Explain the six operations and their use cases
- Discuss System.Text.Json implementation and package requirements
- Address security considerations and developer responsibility
- Mention efficiency benefits for partial updates

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [JsonPatch in ASP.NET Core web API | Microsoft Learn](https://learn.microsoft.com/en-in/aspnet/core/web-api/jsonpatch?view=aspnetcore-10.0)