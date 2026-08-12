---
title: "Null Safety"
slug: "09_dotnet/0_c/0_fundamentals/2_null_safety"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Null Safety Overview - Preventing NullReferenceException</summary>
  <div>

## Null Safety in C#

**Real-life analogy**: Null safety is like having a safety inspection system for equipment. The system (compiler) inspects equipment (variables) before use, warning when equipment might be broken (null) and preventing operation that could cause damage (NullReferenceException). Instead of discovering problems at runtime when equipment fails, you catch them at inspection time. C# null safety provides the same protection - compiler tracks which variables might be null and warns before you use them unsafely, preventing runtime exceptions.

**Technical explanation**: null represents absence of value. When try to access member on null reference (call method, read property), runtime throws NullReferenceException. C# gives three complementary tools to write null-safe code: nullable value types (let value type like int or bool also hold null), nullable reference types (let compiler track whether reference might be null), null operators (express null-safe access and fallback logic concisely). Together, these features provide complete set of tools to write null-safe C# code, catching potential NullReferenceException at compile time.

**Key jargon explained**:
- **NullReferenceException**: Runtime exception when accessing null reference
- **Nullable Value Types**: Value types that can hold null (int?, bool?)
- **Nullable Reference Types**: Compiler feature tracking null intent
- **Null Operators**: ?. ?? ??= for null-safe code
- **Dereference**: Accessing member on reference (method call, property access)

```csharp:title=NullReferenceException.cs
// Accessing a member on null throws NullReferenceException at runtime:
// string? name = null;
// int length = name.Length; // throws NullReferenceException

// Check before you dereference:
string? name = null;
if (name is not null)
{
    Console.WriteLine($"Name has {name.Length} characters.");
}
else
{
    Console.WriteLine("Name has no value.");
}
```

**How it works in practice**: null represents absence of value. Accessing member on null throws NullReferenceException. Three tools for null safety: nullable value types (T? for value types needing null), nullable reference types (string? vs string for intent), null operators (?. ?? ??= for concise null-safe code). Nullable value types useful for database columns, optional configuration, sensor readings. Nullable reference types enabled by default in modern .NET projects. Null operators eliminate manual if-null guards.

**Key takeaways for interviews**:
- null represents absence of value
- NullReferenceException thrown when accessing null reference
- Three tools: nullable value types, nullable reference types, null operators
- Nullable value types: T? for value types needing null
- Nullable reference types: compiler tracks null intent

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Nullable Value Types - Value Types with Null</summary>
  <div>

## Nullable Value Types

**Real-life analogy**: Nullable value types are like optional fields in a data form. Standard fields (age, quantity) must always have a value. Optional fields (middle name, optional notes) can be left blank when not applicable. Value types like int and bool are like standard fields - they always have a value and can't represent "no value." Nullable value types (int?, bool?) are like optional fields - they can hold a value or represent absence with null. This is essential for database columns that might be NULL.

**Technical explanation**: Value types such as int, double, bool can't hold null by default. Add ? to type name to create nullable value type that holds either value or null. Use when underlying value type needs to represent "no data." Common scenarios: database columns that might be absent, optional configuration settings, sensor readings not captured yet. Check with HasValue property, extract with Value property or GetValueOrDefault. Arithmetic operators lifted - null propagates through calculations.

**Key jargon explained**:
- **Nullable Value Type**: T? holds value or null
- **HasValue/Value**: Properties for checking and accessing
- **GetValueOrDefault**: Extract with fallback value
- **Lifted Operators**: Null propagates through arithmetic
- **Database NULL**: SQL null mapped to nullable types

```csharp:title=NullableValueType.cs
int? score = null;
Console.WriteLine(score.HasValue);               // False

score = 95;
Console.WriteLine(score.HasValue);               // True
Console.WriteLine(score.GetValueOrDefault());    // 95

int? missing = null;
Console.WriteLine(missing.GetValueOrDefault(-1)); // -1
```

**How it works in practice**: Add ? to value type to make nullable. Can hold value or null. Default value is null. Use when value might be absent (database NULL columns, optional configuration). Check with HasValue, extract with Value or GetValueOrDefault. Arithmetic operators lifted - when either operand is null, result is null. Use ?? operator for fallback values. Essential for representing "no data" in value types.

**Key takeaways for interviews**:
- Add ? to value type to make nullable (int?, bool?)
- Can hold value or null
- Use when value might be absent (database, optional config)
- Check with HasValue, extract with Value or GetValueOrDefault
- Arithmetic operators lifted - null propagates

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Nullable Reference Types - Compiler Tracking</summary>
  <div>

## Nullable Reference Types

**Real-life analogy**: Nullable reference types are like labeling fields as "required" or "optional" in a data form. Required fields must always have a value, optional fields can be left blank. Before nullable reference types, all reference type variables were unlabeled - compiler couldn't tell which were required and which were optional. Nullable reference types add these labels (string vs string?) so compiler can warn when required fields are blank or when optional fields used without checking.

**Technical explanation**: Reference types such as string, arrays, class instances can hold null at runtime. Nullable reference types is compiler feature making null intent explicit and catching mistakes at compile time. Using ? annotation, declare intent: string? means reference might be null, compiler warns if dereference without checking. string means reference should not be null, compiler warns if assign null to it. Modern .NET projects enable nullable reference types by default. Runtime behavior unchanged - entirely compile-time feature.

**Key jargon explained**:
- **Nullable Reference Types**: Compiler feature for null safety
- **Intent Annotation**: string? vs string for null intent
- **Dereference Warning**: Warn when using nullable without check
- **Assignment Warning**: Warn when assigning null to non-nullable
- **Compile-Time Feature**: Runtime behavior unchanged

```csharp:title=NullableReferenceTypes.cs
// string?  means this reference might be null
// string   means this reference should not be null
string? nullableName = null;
string  nonNullName  = "Alice";

// ?. safely accesses a member when the reference might be null
string display = nullableName?.ToUpper() ?? "(no name)";
Console.WriteLine(display);         // (no name)

display = nonNullName.ToUpper();    // safe: nonNullName is never null
Console.WriteLine(display);         // ALICE
```

**How it works in practice**: Reference types can hold null at runtime. Nullable reference types make intent explicit. string? means might be null, compiler warns if dereference without check. string means should not be null, compiler warns if assign null. Enable with <Nullable>enable</Nullable> in project file. Modern .NET projects enable by default. Runtime behavior unchanged - entirely compile-time feature. Use ?. for safe access, ?? for fallback.

**Key takeaways for interviews**:
- Compiler feature making null intent explicit
- string? means might be null, string means should not be null
- Compiler warns on dereference without check
- Compiler warns on assigning null to non-nullable
- Runtime behavior unchanged - compile-time only

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Null Operators - Concise Null-Safe Code</summary>
  <div>

## Null Operators

**Real-life analogy**: Null operators are like safety switches that prevent equipment from operating when not ready. Instead of manually checking every piece of equipment before use, safety switches automatically disable operation when conditions aren't met. Null operators provide the same convenience - instead of nesting if (x != null) guards throughout code, these operators express null-safe access, fallback values, and null tests in single expressions, making null-safe code concise and readable.

**Technical explanation**: C# includes several operators for null-safe code without manual if-null guards. ?. null-conditional member access - access member only when object non-null. ?[] null-conditional indexer access - access element only when collection non-null. ?? null-coalescing - return fallback value when expression is null. ??= null-coalescing assignment - assign only when variable is null. is null/is not null null pattern - preferred null test. These operators eliminate verbose null checks, making code more concise and readable.

**Key jargon explained**:
- **Null-Conditional Access**: ?. and ?[] for safe access
- **Null-Coalescing**: ?? for fallback values
- **Null-Coalescing Assignment**: ??= for lazy initialization
- **Null Pattern**: is null, is not null for testing
- **Short-Circuit**: Evaluation stops at first null

```csharp:title=NullOperators.cs
string? city = GetCity();

// ?. — access a member only when non-null
int? len = city?.Length;

// ?? — substitute a default when null
string display = city ?? "unknown";

// is null — preferred null test
if (city is null)
{
    Console.WriteLine("No city provided.");
}
else
{
    Console.WriteLine($"{display} ({len} chars)");
}
```

**How it works in practice**: ?. accesses member only when object non-null, returns null when object is null. ?[] for indexer access when collection might be null. ?? returns left when non-null, right when null (fallback). ??= assigns only when variable is null (lazy initialization). is null/is not null preferred over == null (unaffected by operator overloading). Chain operators for complex null-safe expressions. Eliminates verbose if-null guards.

**Key takeaways for interviews**:
- ?. and ?[] for null-conditional access
- ?? for null-coalescing (fallback values)
- ??= for null-coalescing assignment (lazy initialization)
- is null/is not null for null pattern matching
- Chain operators for complex null-safe expressions

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

**Real-life analogy**: Interview preparation for null safety concepts is like understanding safety inspection systems. You need to understand how the inspection works, what tools are available, and how to use them effectively to prevent failures.

**Common interview questions**:
1. **What is null safety in C# and why is it important?**
   - null represents absence of value
   - Accessing null reference throws NullReferenceException
   - Three tools: nullable value types, nullable reference types, null operators
   - Compiler catches potential null issues at compile time
   - Prevents runtime exceptions

2. **What are nullable value types and when would you use them?**
   - T? for value types that can hold null (int?, bool?)
   - Use when value type needs to represent "no data"
   - Common scenarios: database NULL columns, optional configuration
   - Check with HasValue, extract with Value or GetValueOrDefault
   - Arithmetic operators lifted - null propagates

3. **What are nullable reference types and how do they work?**
   - Compiler feature making null intent explicit
   - string? means might be null, string means should not be null
   - Compiler warns on dereference without check
   - Compiler warns on assigning null to non-nullable
   - Runtime behavior unchanged - compile-time only

4. **What are the null operators in C#?**
   - ?. and ?[] for null-conditional access
   - ?? for null-coalescing (fallback values)
   - ??= for null-coalescing assignment (lazy initialization)
   - is null/is not null for null pattern matching
   - Eliminate verbose if-null guards

5. **What is the difference between nullable value types and nullable reference types?**
   - Nullable value types: T? for value types needing null
   - Nullable reference types: compiler tracking for reference types
   - Solve different problems - not alternatives
   - Nullable value types: represent "no data" in value types
   - Nullable reference types: document null intent, catch mistakes at compile time

**Key interview concepts**:
- **NullReferenceException**: Runtime exception on null access
- **Nullable Value Types**: T? for value types with null
- **Nullable Reference Types**: Compiler tracking null intent
- **Null Operators**: ?. ?? ??= for concise null-safe code
- **Compile-Time Safety**: Catch null issues before runtime

**How to approach interview questions**:
- Start with null safety purpose and importance
- Explain nullable value types and use cases
- Discuss nullable reference types and compiler warnings
- Address null operators and their purposes
- Mention difference between nullable value and reference types

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Null safety in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/null-safety/)