---
title: "Built-in Types"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/0_builtin_types"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Built-in Types - Primitives</summary>
  <div>

## Built-in Types and Literals

**Real-life analogy**: Built-in types are like standard measurement units in a toolkit. You have rulers for length (int, long), scales for weight (double, decimal), and binary switches for on/off states (bool). These standard units are universally available and don't require special equipment. C# built-in types provide the same foundation - numeric types, bool, char, and string are available in every program without additional references, covering the most common data you work with.

**Technical explanation**: C# provides built-in types for common data: integers, floating-point numbers, bool, char, string. Every C# program can use these without extra references. Numeric types: int (32-bit integers), long (64-bit integers), short, byte, double (general floating-point), float (memory-constrained), decimal (exact decimal precision). Unsigned types: uint, ulong, ushort for non-negative values. Native-sized integers: nint, nuint match platform pointer size. bool stores true/false. char stores single Unicode character. string stores character sequence (immutable). Literal syntax: integer (decimal, hexadecimal, binary), floating-point (double, float with f suffix, decimal with m suffix), character (single quotes, escape sequences), string (regular, verbatim, raw, interpolated), boolean (true, false), null, default.

**Key jargon explained**:
- **Built-in Types**: Standard types available without references
- **Numeric Types**: int, long, short, byte, double, float, decimal
- **Unsigned Types**: uint, ulong, ushort for non-negative values
- **Native-sized Integers**: nint, nuint match platform pointer size
- **Literals**: Values written directly in code

```csharp:title=NumericTypes.cs
int population = 67_000_000;
long distance = 384_400_000L;
short temperature = -40;
byte red = 255;

double pi = 3.141592653589793;
float gravity = 9.81f;
decimal price = 19.99m;
```

```csharp:title:OtherBuiltIn.cs
bool isValid = true;
char grade = 'A';
string greeting = "Hello, world!";
```

**How it works in practice**: Built-in types cover most common data. Numeric types have fixed size and range. Use double for general floating-point, float when memory constrained, decimal for exact decimal precision (financial). Unsigned types for non-negative data (file sizes, ports). Native-sized integers (nint, nuint) for interop and low-level memory operations. bool for conditions, loops, logical expressions. char for single Unicode character. string for text (immutable). Literal syntax: decimal (42), hexadecimal (0x2A), binary (0b_0010_1010). Floating-point: 3.14 (double), 3.14f (float), 3.14m (decimal). Character: 'A', '\n'. String: "hello", @"C:\path", """...""", $"value: {x}".

**Key takeaways for interviews**:
- Built-in types available without additional references
- Numeric types: int, long, double, decimal most common
- Unsigned types for non-negative values
- bool, char, string for non-numeric data
- Literal syntax varies by type (suffixes, prefixes, quotes)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Default Expressions - Type Defaults</summary>
  <div>

## Default Expressions

**Real-life analogy**: Default expressions are like having standard default values for inventory items. When you create a new inventory record without specifying values, the system fills in defaults: 0 for quantities, false for boolean flags, null for optional references. This ensures records have valid initial values. Default expressions in C# provide the same capability - producing the default value for any type: 0 for numeric types, false for bool, null for reference types.

**Technical explanation**: Default expression produces default value for type: 0 for numeric types, false for bool, null for reference types. Write default (without type argument) when compiler can infer type from context, or default(T) when type not obvious. Most useful in generic code where concrete type unknown and can't hard-code specific value like 0 or null. Example: default(int) = 0, default(bool) = false, default(string) = null. Use in conditional: var limit = (args.Length > 0) ? int.Parse(args[0]) : default(int).

**Key jargon explained**:
- **Default Expression**: Produces default value for type
- **Default Values**: 0 for numeric, false for bool, null for reference
- **Type Inference**: Compiler infers type from context
- **Generic Code**: Unknown concrete type at compile time
- **default(T)**: Explicit type parameter

```csharp:title=DefaultExpressions.cs
int defaultInt = default;          // 0
bool defaultBool = default;        // false
string? defaultString = default;   // null

// Use default in a conditional:
var limit = (args.Length > 0) ? int.Parse(args[0]) : default(int);
```

**How it works in practice**: Default expression returns type's default value. Numeric types default to 0. bool defaults to false. Reference types default to null. Write default when compiler can infer type from context. Write default(T) when type not obvious. Most useful in generic code where concrete type unknown. Enables generic algorithms to work with any type by using default values. Avoids hard-coding specific values like 0 or null.

**Key takeaways for interviews**:
- Default expression produces type's default value
- Numeric types: 0, bool: false, reference types: null
- Write default when type inferred, default(T) when explicit
- Most useful in generic code
- Enables generic algorithms with any type

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

**Real-life analogy**: Interview preparation for built-in types concepts is like understanding standard measurement units. You need to understand what units are available, when to use each, how to specify values, and what defaults apply.

**Common interview questions**:
1. **What are the built-in types in C#?**
   - Numeric types: int, long, short, byte, double, float, decimal
   - bool: true or false
   - char: single Unicode character
   - string: sequence of characters (immutable)
   - Available without additional references

2. **When should you use double vs float vs decimal?**
   - double: general floating-point math
   - float: when memory constrained
   - decimal: when exact decimal precision needed (financial calculations)
   - Append f suffix for float, m suffix for decimal
   - Without suffix, decimal point number treated as double

3. **What are unsigned types and when would you use them?**
   - uint, ulong, ushort for non-negative values
   - Twice the positive range of signed counterparts
   - Use when negative values invalid (file sizes, network ports)
   - Many applications use int/long even for positive-only values
   - Signed types default throughout .NET APIs

4. **What are literal suffixes and when are they used?**
   - f suffix for float literals (3.14f)
   - m suffix for decimal literals (3.14m)
   - L suffix for long literals (1_000_000_000L)
   - U suffix for uint, UL for ulong
   - Without suffix, compiler infers type from format

5. **What is the purpose of default expressions?**
   - Produce default value for any type
   - 0 for numeric, false for bool, null for reference
   - Write default when type inferred, default(T) when explicit
   - Most useful in generic code
   - Enables generic algorithms with any type

**Key interview concepts**:
- **Built-in Types**: Standard types without references
- **Numeric Types**: int, long, double, decimal
- **Literal Suffixes**: f, m, L, U for type specification
- **Unsigned Types**: Non-negative value storage
- **Default Expressions**: Type default values

**How to approach interview questions**:
- Start with built-in types and their purposes
- Explain numeric type selection (double vs float vs decimal)
- Discuss unsigned types and use cases
- Address literal suffixes and type inference
- Mention default expressions for generic code

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Built-in types and literals - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/built-in-types)