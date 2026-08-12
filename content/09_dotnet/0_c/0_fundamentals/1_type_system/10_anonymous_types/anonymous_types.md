---
title: "Anonymous Types"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/10_anonymous_types"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Anonymous Types - Read-Only Properties</summary>
  <div>

## Anonymous Types

**Real-life analogy**: Anonymous types are like creating temporary data forms on the fly. Instead of designing a standardized form template, you create a custom form for a specific task with the exact fields you need. The compiler generates the form structure, and you can't refer to it by name later. Anonymous types provide the same capability - encapsulate read-only properties into single object without defining named type first, with compiler generating type name at compile time.

**Technical explanation**: Anonymous types provide convenient way to encapsulate set of read-only properties into single object without defining named type first. Compiler generates type name at compile time that you can't access in source code. Compiler infers type of each property. Create anonymous types using new operator with object initializer. Specify property names explicitly with Name = value syntax, or compiler infers from variable names. Must use var to declare local variable because compiler generates type name. Can't use as method return types, parameters, or field types.

**Key jargon explained**:
- **Anonymous Type**: Compiler-generated type without accessible name
- **Object Initializer**: Syntax for setting properties
- **Inferred Property Names**: Compiler infers from initialization
- **var**: Required because type name inaccessible
- **Read-Only Properties**: All properties are read-only

```csharp:title=AnonymousType.cs
var person = new { Name = "Alice", Age = 30 };
Console.WriteLine($"{person.Name} is {person.Age} years old.");
```

```csharp:title=InferredNames.cs
string productName = "Laptop";
decimal price = 999.99m;
var product = new { productName, price };
Console.WriteLine($"{product.productName}: {product.price:C}");
```

**How it works in practice**: Create with new operator and object initializer. Specify property names explicitly or compiler infers from variable names. Must use var to declare variable (type name inaccessible). Properties are public and read-only. Compiler generates value-based Equals, GetHashCode, ToString overrides. Support with expressions for nondestructive mutation. Support expression trees (tuples don't). Most common in LINQ select clause for projecting subset of properties. Use for short-lived data within method scope.

**Key takeaways for interviews**:
- Anonymous types encapsulate read-only properties
- Compiler generates type name at compile time
- Must use var to declare variable
- Properties are public and read-only
- Can't use as method return types or parameters

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Tuples vs Anonymous Types - Comparison</summary>
  <div>

## When to Use Tuples Instead

**Real-life analogy**: Tuples are like standardized shipping containers that can hold any items. Anonymous types are like custom-designed packaging for specific shipments. Standard containers are reusable and efficient (tuples as value types), while custom packaging provides specific features but is less reusable (anonymous types as reference types with expression tree support). Choose based on whether you need standard efficiency or specific features.

**Technical explanation**: For most new code, consider tuples instead of anonymous types. Tuples are value types providing better performance. Provide deconstruction support and more flexible syntax. Anonymous types remain better choice when need expression tree support or reference-type semantics. Tuples: value types, better performance, deconstruction support. Anonymous types: reference types, expression tree support, value-based equality. Limitations: can't use anonymous types as method return types, parameters, or field types. Scoped to method where declared. Can't add methods, events, custom operators.

**Key jargon explained**:
- **Tuple**: Value type, better performance
- **Anonymous Type**: Reference type, expression tree support
- **Expression Trees**: Enable LINQ query translation
- **Deconstruction**: Unpack into separate variables
- **Scope**: Anonymous types scoped to method

```csharp:title=Tuples.cs
var location = (Latitude: 47.6062, Longitude: -122.3321);
var (lat, lon) = location; // Deconstruction
```

```csharp:title=AnonymousType.cs
var person = new { Name = "Alice", Age = 30 };
// Can't deconstruct, no expression tree support in tuples
```

**How it works in practice**: Tuples preferred for most new code. Value types provide better performance. Deconstruction support makes tuples flexible. Anonymous types better when need expression tree support (LINQ query translation). Anonymous types also provide reference-type semantics. Both provide value-based equality. Tuples can be used as dictionary keys (composite key). Anonymous types limited to method scope, can't be return types or parameters.

**Key takeaways for interviews**:
- Tuples preferred for most new code
- Tuples: value types, better performance, deconstruction
- Anonymous types: reference types, expression tree support
- Tuples can be dictionary keys
- Anonymous types scoped to method

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

**Real-life analogy**: Interview preparation for anonymous type concepts is like understanding temporary data forms. You need to understand when to use custom forms vs standard containers, and what trade-offs exist.

**Common interview questions**:
1. **What is an anonymous type in C#?**
   - Encapsulates read-only properties into single object
   - No need to define named type first
   - Compiler generates type name at compile time
   - Must use var to declare variable
   - Properties are public and read-only

2. **How do you create anonymous types?**
   - Use new operator with object initializer
   - Specify property names explicitly: Name = value
   - Compiler infers names from variable names
   - Example: new { Name = "Alice", Age = 30 }
   - Example: new { productName, price } (inferred)

3. **What are the limitations of anonymous types?**
   - Can't use as method return types
   - Can't use as method parameters
   - Can't use as field types
   - Scoped to method where declared
   - Can't add methods, events, custom operators

4. **When should you use tuples vs anonymous types?**
   - Tuples: preferred for most new code
   - Tuples: value types, better performance
   - Tuples: deconstruction support
   - Anonymous types: expression tree support
   - Anonymous types: reference-type semantics

5. **What is anonymous type equality?**
   - Two instances with same property names and types share same type
   - Compiler overrides Equals and GetHashCode
   - Equality compares property values, not reference identity
   - Same properties in same order = same type
   - Different properties or order = different type

**Key interview concepts**:
- **Anonymous Type**: Compiler-generated, read-only properties
- **var**: Required because type name inaccessible
- **Inferred Names**: Compiler infers from initialization
- **Tuples vs Anonymous**: Value vs reference, performance vs features
- **Equality**: Property-by-property comparison

**How to approach interview questions**:
- Start with anonymous type definition and purpose
- Explain creation syntax and name inference
- Discuss limitations (return types, parameters, fields)
- Address tuples vs anonymous types comparison
- Mention equality behavior and compiler generation

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Anonymous types - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/anonymous-types)