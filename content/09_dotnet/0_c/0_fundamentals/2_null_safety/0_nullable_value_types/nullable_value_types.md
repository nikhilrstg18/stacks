---
title: "Nullable Value Types"
slug: "09_dotnet/0_c/0_fundamentals/2_null_safety/0_nullable_value_types"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Nullable Value Types - Value Types with Null</summary>
  <div>

## Nullable Value Types

**Real-life analogy**: Nullable value types are like optional fields in a data form. A standard field (like age) must always have a value. An optional field (like middle name) can be left blank when not applicable. Value types like int and bool are like standard fields - they always have a value and can't represent "no value." Nullable value types (int?, bool?) are like optional fields - they can hold a value or represent absence with null. This is essential when reading from databases where columns might be NULL.

**Technical explanation**: Nullable value type T? represents all values of underlying value type T, plus additional null value. Variable of type int? holds any integer or null to represent "no value." Value types (int, bool, DateTime) can't hold null by default - efficient and prevents errors. However, limitation creates problem when value might genuinely be absent (database NULL columns). Plain int can't represent absence, but int? can. Append ? to any value type to make it nullable. Default value of nullable value type is null, not underlying type's default.

**Key jargon explained**:
- **Nullable Value Type**: Value type that can hold null
- **Underlying Type**: Original value type (int, bool, etc.)
- **Absence**: Represents "no value" with null
- **Default Value**: null for nullable types
- **Database NULL**: SQL null values mapped to nullable types

```csharp:title=NullableDeclaration.cs
int?    age      = null;    // integer with no value yet
double? price    = 9.99;    // nullable double with a value
bool?   isActive = null;    // boolean with no value

age = 30;                   // assign a value later

int?[] scores = [100, null, 85, null, 72]; // array with absent entries
```

**How it works in practice**: Append ? to value type to make nullable. Can hold value or null. Default value is null. Use when value might be absent (database columns, optional user input). Arithmetic operators lifted - when either operand is null, result is null. Null propagates through arithmetic by default. Extract value with GetValueOrDefault or ?? operator before calculation to prevent null cascading.

**Key takeaways for interviews**:
- Nullable value types T? hold value or null
- Append ? to any value type to make nullable
- Default value is null, not underlying type's default
- Use when value might be absent (database NULL)
- Arithmetic operators lifted - null propagates

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Checking and Extracting Values - Safe Access</summary>
  <div>

## Check Whether a Value is Present

**Real-life analogy**: Checking nullable values is like verifying an optional field before using it. Before processing a middle name, you check if it was provided. If present, you use it; if absent, you skip it or use a default. Nullable value types require the same check - verify value is present before using it to avoid errors. The is T value pattern provides both null check and value extraction in one step.

**Technical explanation**: Recommended way to check nullable value type and extract value is with type pattern. is int degrees pattern matches only when temperature is non-null, simultaneously binds value to degrees. Get both null check and value extraction in one step. Alternatively use HasValue and Value properties. Prefer is T value pattern for new code - introduces non-nullable variable scoped to matched branch, makes intent clearer, eliminates temptation to accidentally use Value outside null check. Can also compare directly with null.

**Key jargon explained**:
- **Type Pattern**: is T value for null check and extraction
- **HasValue/Value**: Properties for checking and accessing value
- **Null Check**: Verify value is present before using
- **Value Extraction**: Get actual value from nullable
- **Scoped Variable**: Non-nullable variable in matched branch

```csharp:title=TypePattern.cs
int? temperature = 72;

if (temperature is int degrees)
{
    Console.WriteLine($"Temperature is {degrees}°F.");
}
else
{
    Console.WriteLine("Temperature is not recorded.");
}
```

```csharp:title=HasValueValue.cs
int? count = 42;

if (count.HasValue)
{
    Console.WriteLine($"Count is {count.Value}.");
}
else
{
    Console.WriteLine("Count has no value.");
}
```

**How it works in practice**: Use is T value pattern for null check and extraction. Pattern matches only when non-null, binds value to variable. Variable scoped to matched branch (non-nullable). Alternative: HasValue and Value properties. Prefer pattern for new code - clearer intent, safer scoping. Can compare directly with null. GetValueOrDefault or ?? operator for fallback values.

**Key takeaways for interviews**:
- is T value pattern for null check and extraction
- HasValue and Value properties alternative approach
- Prefer pattern for new code (safer scoping)
- Can compare directly with null
- GetValueOrDefault or ?? for fallback values

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

**Real-life analogy**: Interview preparation for nullable value types is like understanding optional data fields. You need to understand when to use optional vs required fields, how to check for presence, and how to handle absence gracefully.

**Common interview questions**:
1. **What is a nullable value type in C#?**
   - T? represents all values of T plus null
   - Value types (int, bool) can't hold null by default
   - Append ? to make value type nullable
   - Default value is null, not underlying type's default
   - Use when value might be absent (database NULL)

2. **How do you check if a nullable value type has a value?**
   - Use is T value pattern for null check and extraction
   - Pattern matches only when non-null, binds value to variable
   - Alternative: HasValue and Value properties
   - Can compare directly with null
   - Prefer pattern for new code (safer scoping)

3. **How do you get a value with a fallback?**
   - Use GetValueOrDefault() or GetValueOrDefault(fallback)
   - Use null-coalescing ?? operator
   - Both return actual value when present, fallback when null
   - ?? often cleaner inline
   - Example: int result = rating ?? 0

4. **How do arithmetic operators work with nullable value types?**
   - Operators are lifted - null propagates
   - When either operand is null, result is null
   - Prevent cascading by extracting value before calculation
   - Use ?? or GetValueOrDefault before arithmetic
   - Example: int? product = a * c (null if c is null)

5. **When should you use nullable value types?**
   - When value might be absent (database NULL columns)
   - Optional user input fields
   - API responses with optional fields
   - Configuration values that might not be set
   - Any scenario where absence is meaningful

**Key interview concepts**:
- **Nullable Value Type**: T? holds value or null
- **Type Pattern**: is T value for safe extraction
- **HasValue/Value**: Properties for checking and accessing
- **Lifted Operators**: Null propagates through arithmetic
- **Fallback Values**: GetValueOrDefault and ?? operator

**How to approach interview questions**:
- Start with nullable value type definition and purpose
- Explain checking and extraction patterns
- Discuss fallback value approaches
- Address lifted operator behavior
- Mention use cases (database, optional input)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Nullable value types in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/null-safety/nullable-value-types)