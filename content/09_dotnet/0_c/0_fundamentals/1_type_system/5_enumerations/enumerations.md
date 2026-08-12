---
title: "Enumerations"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/5_enumerations"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Enumerations - Named Constants</summary>
  <div>

## C# Enumerations

**Real-life analogy**: Enums are like standardized status codes or categories. Instead of using arbitrary numbers (0, 1, 2) for status, you use meaningful names (Pending, Approved, Rejected). This makes code more readable and less error-prone because the compiler enforces the named values. Enums provide the same benefit - defining sets of named constants backed by integer values, making code self-documenting and type-safe.

**Technical explanation**: Enumeration type (enum) defines set of named constants backed by integer value. Use enums when value must be one of fixed set of options (days of week, HTTP status codes, log levels, directions). Enums make code more readable and less error-prone than raw integer constants because compiler enforces named values. Define with enum keyword followed by type name and members. Default underlying type is int, values start at 0 and increment by one. Can choose different integral type and assign explicit values. Use explicit values when numbers have external meaning (HTTP status codes, protocol identifiers).

**Key jargon explained**:
- **Enum**: Named constants backed by integer values
- **Underlying Type**: Integral type (int, byte, short, etc.)
- **Explicit Values**: Assigned specific integer values
- **Bit Flags**: Enum representing combination of choices
- **FlagsAttribute**: Enables bit flag operations

```csharp:title=EnumDeclaration.cs
enum Season
{
    Spring,
    Summer,
    Autumn,
    Winter
}

enum HttpStatus : ushort
{
    OK = 200,
    NotFound = 404,
    InternalServerError = 500
}
```

```csharp:title=BitFlags.cs
[Flags]
enum FileAccess
{
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4,
    ReadWrite = Read | Write,
    All = Read | Write | Execute
}
```

**How it works in practice**: Define enum with enum keyword. Default underlying type int, values start at 0 increment by one. Can specify different integral type and explicit values. Use explicit values when numbers have external meaning. Bit flags: define each member as power of two, apply FlagsAttribute. Combine values with | operator, test with HasFlag. Use in switch expressions with pattern matching. Compiler warns if don't handle all members. Convert between enum and integer with explicit cast. Parse strings with Enum.Parse or Enum.TryParse.

**Key takeaways for interviews**:
- Enums define named constants backed by integer values
- Default underlying type int, values start at 0
- Can specify different integral type and explicit values
- Bit flags with FlagsAttribute for combinations
- Use in switch expressions for pattern matching

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Bit Flags - Combinations</summary>
  <div>

## Bit Flags

**Real-life analogy**: Bit flags are like permission settings where multiple options can be combined. Instead of having separate boolean flags for Read, Write, and Execute permissions, you combine them into a single value where each bit represents a permission. This enables efficient storage and combination of multiple options. Bit flags in enums provide the same capability - representing combinations of choices rather than a single choice.

**Technical explanation**: When enum represents combination of choices rather than single choice, define each member as power of two and apply FlagsAttribute. Combine values using | operator. Test for individual flags using HasFlag. FlagsAttribute affects ToString() - displays combined values as comma-separated names instead of raw number. Use when multiple options can be simultaneously true (permissions, settings, options).

**Key jargon explained**:
- **Bit Flags**: Enum representing combination of choices
- **FlagsAttribute**: Enables bit flag operations
- **Power of Two**: Values 1, 2, 4, 8, 16, etc.
- **| Operator**: Combine flag values
- **HasFlag**: Test for individual flags

```csharp:title=BitFlags.cs
[Flags]
enum FileAccess
{
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4,
    ReadWrite = Read | Write,
    All = Read | Write | Execute
}

var permissions = FileAccess.Read | FileAccess.Write;

Console.WriteLine(permissions);                          // ReadWrite
Console.WriteLine(permissions.HasFlag(FileAccess.Read)); // True
Console.WriteLine(permissions.HasFlag(FileAccess.Execute)); // False
```

**How it works in practice**: Define each member as power of two (1, 2, 4, 8, 16). Apply FlagsAttribute to enum. Combine values with | operator. Test for individual flags with HasFlag. FlagsAttribute affects ToString() - displays comma-separated names. Use when multiple options can be simultaneously true. Common for permissions, settings, options. Enables efficient storage and combination of multiple boolean states.

**Key takeaways for interviews**:
- Bit flags represent combination of choices
- Define members as powers of two
- Apply FlagsAttribute to enable bit operations
- Combine with | operator, test with HasFlag
- ToString displays comma-separated names

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

**Real-life analogy**: Interview preparation for enum concepts is like understanding standardized codes and categories. You need to understand when to use named constants vs raw numbers, how to combine options, and how to convert between representations.

**Common interview questions**:
1. **What is an enum in C#?**
   - Defines set of named constants backed by integer value
   - Use when value must be one of fixed set of options
   - Makes code more readable and less error-prone
   - Compiler enforces named values
   - Default underlying type int, values start at 0

2. **How do you specify the underlying type and explicit values?**
   - Can choose different integral type (byte, short, int, long, etc.)
   - Assign explicit values to control numeric representation
   - Use explicit values when numbers have external meaning
   - Example: HTTP status codes, protocol identifiers
   - Syntax: enum Name : Type { Member = value }

3. **What are bit flags and when would you use them?**
   - Enum representing combination of choices
   - Define each member as power of two
   - Apply FlagsAttribute to enable bit operations
   - Combine values with | operator
   - Test for individual flags with HasFlag

4. **How do you use enums in switch expressions?**
   - Enums work naturally with switch expressions
   - Compiler warns if don't handle all members
   - Helps prevent bugs when adding new values
   - Use discard pattern (_) for unexpected values
   - Pattern matching tests value against specific members

5. **How do you convert between enums and integers?**
   - Explicit cast converts between enum and underlying type
   - Syntax: (UnderlyingType)enumValue, (EnumType)integerValue
   - Casting doesn't validate if value matches defined member
   - Use Enum.IsDefined to check validity
   - Parse strings with Enum.Parse or Enum.TryParse

**Key interview concepts**:
- **Enum**: Named constants backed by integers
- **Underlying Type**: Integral type for storage
- **Explicit Values**: Specific integer assignments
- **Bit Flags**: Combination of choices
- **Type Conversion**: Explicit cast between enum and integer

**How to approach interview questions**:
- Start with enum definition and purpose
- Explain underlying type and explicit values
- Discuss bit flags and FlagsAttribute
- Address switch expressions and pattern matching
- Mention type conversion and parsing

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [C# Enumerations - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/enums)