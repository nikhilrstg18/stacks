---
title: "C# Fundamentals"
slug: "09_dotnet/0_c/0_fundamentals"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>C# Fundamentals Overview - Core Concepts</summary>
  <div>

## C# Fundamentals

**Real-life analogy**: C# fundamentals are like the foundational principles of engineering. Just as engineering relies on understanding materials, structures, and design patterns, C# programming requires understanding core concepts like program structure, type systems, null safety, and string manipulation. These fundamentals provide the building blocks for creating robust, efficient applications. Mastering these concepts is essential for writing clean, maintainable code and effectively leveraging the C# language's capabilities.

**Technical explanation**: C# fundamentals cover core language concepts essential for programming. Program structure includes namespaces, preprocessor directives, organization, top-level statements, and Main method. Type system encompasses built-in types, classes, structs, records, interfaces, enums, generics, tuples, type conversions, lambda expressions, and anonymous types. Null safety addresses nullable value types, nullable reference types, null operators, and resolving nullable warnings. Strings cover literals, interpolation, nameof operator, and common tasks like concatenation, modification, comparison, search, and splitting. These fundamentals provide foundation for advanced C# programming.

**Key jargon explained**:
- **Program Structure**: Organization of C# code (namespaces, Main method)
- **Type System**: Value types, reference types, generics, type conversions
- **Null Safety**: Nullable types, null operators, null-state analysis
- **Strings**: Literals, interpolation, manipulation, comparison
- **Fundamentals**: Core language concepts for programming

```csharp:title:Example.cs
// Program structure example
using System;

namespace MyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            string greeting = "Hello, World!";
            Console.WriteLine(greeting);
        }
    }
}
```

**How it works in practice**: Program structure defines how code organized (namespaces, Main method). Type system defines data types and their behavior (value vs reference, generics, conversions). Null safety prevents NullReferenceException through nullable types and compiler analysis. Strings provide text manipulation capabilities (literals, interpolation, search, split). Together, these fundamentals enable building robust applications. Understanding these concepts essential for effective C# programming and leveraging language features correctly.

**Key takeaways for interviews**:
- Program structure: namespaces, Main method, top-level statements
- Type system: value vs reference types, generics, conversions
- Null safety: nullable types, null operators, compiler analysis
- Strings: literals, interpolation, manipulation, comparison
- Fundamentals provide foundation for advanced C# programming

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Program Structure - Code Organization</summary>
  <div>

## Program Structure

**Real-life analogy**: Program structure is like organizing a large corporation. You have departments (namespaces), departments within divisions (nested namespaces), organizational charts (program organization), executive summaries (top-level statements), and entry points (Main method). This organization ensures code is maintainable, discoverable, and follows clear architectural principles. C# program structure provides the same organizational framework for code, enabling developers to build scalable, maintainable applications.

**Technical explanation**: Program structure covers how C# code organized. Namespaces organize types and prevent naming conflicts. Preprocessor directives control compilation (conditional compilation, warnings, file-based directives). Program organization describes hierarchy (solution → project → assembly → namespace → type). Top-level statements simplify program structure by eliminating explicit class and Main method (C# 9+). Main method is entry point - can have various signatures for command-line arguments and return codes. Understanding program structure essential for organizing code effectively and following C# conventions.

**Key jargon explained**:
- **Namespaces**: Organize types, prevent naming conflicts
- **Preprocessor Directives**: Control compilation (#if, #define, #pragma)
- **Program Organization**: Solution → project → assembly → namespace → type
- **Top-Level Statements**: Simplify structure (C# 9+)
- **Main Method**: Program entry point with various signatures

```csharp:title:Namespaces.cs
using System;

namespace MyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

**How it works in practice**: Namespaces organize types into hierarchical structure. Using directives import namespaces. Preprocessor directives control compilation (#if for conditional compilation, #pragma for warnings). Program organization follows hierarchy matching folder structure. Top-level statements (C# 9+) eliminate need for explicit class and Main method. Main method entry point - can accept string[] args for command-line arguments, return int for exit codes. Async Main possible with Task return type. Understanding structure essential for organizing code.

**Key takeaways for interviews**:
- Namespaces organize types, prevent conflicts
- Preprocessor directives control compilation
- Program organization: solution → project → assembly → namespace
- Top-level statements simplify structure (C# 9+)
- Main method: entry point with various signatures

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Type System - Data Types</summary>
  <div>

## Type System

**Real-life analogy**: Type system is like a classification system for data. Just as a warehouse classifies items by type (electronics, clothing, food), C# classifies data by type (int, string, bool, custom types). Value types hold data directly (like photocopies), reference types hold references to objects (like sharing a document). Generics provide type-safe containers for any data type. This classification ensures type safety, prevents errors, and enables efficient data handling. Understanding the type system is fundamental to writing correct, efficient C# code.

**Technical explanation**: Type system defines data types and their behavior. Built-in types: int, double, bool, char, string. Custom types: classes (reference types, inheritance), structs (value types, lightweight), records (data-focused with equality), interfaces (contracts), enums (named constants), generics (type-parameterized), tuples (lightweight grouping), type conversions (implicit/explicit), lambda expressions (inline functions), anonymous types (read-only properties). Value types hold data directly, reference types hold references. Generics provide type safety while reusing logic. Type conversions include implicit (safe) and explicit (cast).

**Key jargon explained**:
- **Value Types**: Hold data directly, copy on assignment
- **Reference Types**: Hold references, share on assignment
- **Generics**: Type-parameterized constructs
- **Type Conversions**: Implicit (safe) vs explicit (cast)
- **Lambda Expressions**: Inline functions without name

```csharp:title:Types.cs
// Built-in types
int count = 10;
string name = "Alice";
bool isValid = true;

// Custom types
class Person { }
struct Point { }
record Product { }
interface ILogger { }
enum Status { }
List<int> numbers = [1, 2, 3];
(int, string) tuple = (1, "one");
```

**How it works in practice**: Built-in types for common data. Classes for complex behavior (reference types, inheritance). Structs for lightweight data (value types). Records for data-focused types (compiler-generated equality). Interfaces for contracts across types. Enums for named constants. Generics for type-safe reusable logic. Tuples for temporary grouping. Type conversions: implicit (safe, automatic) vs explicit (cast, potential data loss). Lambda expressions for inline functions. Anonymous types for read-only properties without named type.

**Key takeaways for interviews**:
- Built-in types: int, double, bool, char, string
- Classes: reference types, inheritance
- Structs: value types, lightweight
- Records: data-focused, compiler-generated equality
- Generics: type-parameterized, type safety

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Null Safety - Preventing NullReferenceException</summary>
  <div>

## Null Safety

**Real-life analogy**: Null safety is like a safety inspection system that checks equipment before use. The inspector (compiler) tracks which equipment (variables) might be broken (null) and warns before you use them unsafely. Nullable value types let value types represent absence (like optional fields). Nullable reference types let you declare which references can be null. Null operators (?. ?? ??=) provide concise null-safe code. This system prevents NullReferenceException at runtime by catching potential issues at compile time.

**Technical explanation**: Null safety minimizes NullReferenceException. Nullable value types (T?) let value types hold null (int?, bool?). Use when value might be absent (database NULL columns). Nullable reference types let compiler track whether reference might be null. Declare intent with string? (nullable) vs string (non-nullable). Compiler warns when declarations don't match usage. Null operators: ?. (null-conditional access), ?? (null-coalescing fallback), ??= (null-coalescing assignment), is null/is not null (pattern matching). Resolve warnings with null checks, annotation adjustments, attributes, initialization.

**Key jargon explained**:
- **Nullable Value Types**: T? for value types with null
- **Nullable Reference Types**: Compiler tracking null intent
- **Null Operators**: ?. ?? ??= for null-safe code
- **Null-State Analysis**: Compiler tracks not-null vs maybe-null
- **Nullable Warnings**: Compiler warnings for null issues

```csharp:title:NullSafety.cs
// Nullable value types
int? score = null;
int? age = 30;

// Nullable reference types
string? name = null;
string required = "Alice";

// Null operators
int? length = name?.Length;
string display = name ?? "Guest";
name ??= "Default";
```

**How it works in practice**: Nullable value types (T?) for value types needing null. Nullable reference types: string? vs string for intent. Compiler tracks null-state (not-null vs maybe-null). Null operators: ?. for safe access, ?? for fallback, ??= for lazy initialization, is null for pattern matching. Resolve warnings with null checks, annotation adjustments, attributes, initialization. Enable with <Nullable>enable</Nullable> in project file. Prevents NullReferenceException at compile time.

**Key takeaways for interviews**:
- Nullable value types: T? for value types with null
- Nullable reference types: string? vs string for intent
- Null operators: ?. ?? ??= for null-safe code
- Compiler tracks null-state for warnings
- Resolve warnings with checks, annotations, attributes

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Strings - Text Processing</summary>
  <div>

## Strings

**Real-life analogy**: Strings are like documents containing text. Once printed, a document can't be modified - you create a new document with changes. Strings are immutable - operations return new strings. String literals provide different formats: regular (simple text), verbatim (backslashes literal), raw (multiline, structured), interpolated (embed values). String operations include concatenation (+, StringBuilder), modification (Replace, Trim), comparison (Equals, Compare), search (Contains, IndexOf), and splitting (Split). Understanding strings is essential for text processing in applications.

**Technical explanation**: String is sequence of characters, System.String type. Strings immutable - operations return new strings. Literals: regular (escape sequences), verbatim (@ prefix, backslashes literal), raw (""" delimiters, no escaping), interpolated ($ prefix, embed values). nameof operator returns identifier as compile-time string. Common tasks: concatenate (+, StringBuilder, String.Join), modify (Replace, Trim, Remove), compare (Equals, Compare, StringComparison), search (Contains, StartsWith, IndexOf), split (Split with separators, options). StringBuilder for efficient loop building.

**Key jargon explained**:
- **Immutable**: Can't change after creation
- **String Literals**: Regular, verbatim, raw, interpolated
- **StringBuilder**: Efficient string building in loops
- **StringComparison**: Control comparison (ordinal vs culture-aware)
- **nameof**: Returns identifier as compile-time string

```csharp:title:Strings.cs
// String literals
string regular = "Hello\nWorld";
string verbatim = @"C:\path\to\file";
string raw = """{"name": "Alice"}""";
string interpolated = $"Hello {name}";

// String operations
string concatenated = "Hello " + "World";
string replaced = "Hello".Replace("H", "J");
bool equal = "a" == "a";
bool contains = "Hello".Contains("ell");
string[] parts = "a,b,c".Split(',');
```

**How it works in practice**: Strings immutable - operations return new strings. Literals: regular for simple text, verbatim (@) for backslashes, raw (""") for multiline/structured, interpolated ($) for embedding values. nameof for compile-time identifier strings. Concatenation: + for few values, StringBuilder for loops. Modification: Replace, Trim, Remove return new strings. Comparison: Equals/== for equality, Compare for sort order, StringComparison for control. Search: Contains, StartsWith, IndexOf for position. Split: break into substrings with separators.

**Key takeaways for interviews**:
- Strings immutable - operations return new strings
- Literals: regular, verbatim, raw, interpolated
- StringBuilder for efficient loop building
- StringComparison controls comparison (ordinal vs culture-aware)
- Common tasks: concatenate, modify, compare, search, split

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

**Real-life analogy**: Interview preparation for C# fundamentals is like understanding engineering principles. You need to understand foundational concepts, how they work together, and when to apply them correctly.

**Common interview questions**:
1. **What are the key areas of C# fundamentals?**
   - Program structure: namespaces, Main method, top-level statements
   - Type system: value vs reference types, generics, conversions
   - Null safety: nullable types, null operators, compiler analysis
   - Strings: literals, interpolation, manipulation, comparison
   - These provide foundation for advanced C# programming

2. **What is the difference between value types and reference types?**
   - Value types: hold data directly, copy on assignment
   - Reference types: hold references, share on assignment
   - Value types: structs, enums, numeric types
   - Reference types: classes, arrays, delegates, strings
   - Value types for small data, reference types for complex behavior

3. **How does nullable reference type safety work?**
   - Declare intent with string? vs string
   - Compiler tracks null-state (not-null vs maybe-null)
   - Warns when declarations don't match usage
   - Null operators: ?. ?? ??= for null-safe code
   - Prevents NullReferenceException at compile time

4. **Why are strings immutable in C#?**
   - Contents can't be changed after creation
   - Methods return new strings with changes
   - Enables safe sharing across methods and threads
   - Explains why string behaves like value type
   - Use StringBuilder for many sequential edits

5. **What are the different string literal forms?**
   - Regular: short, simple text with escape sequences
   - Verbatim (@): backslashes literal (Windows paths, regex)
   - Raw ("""): multiline, structured text (JSON, SQL, XML)
   - Interpolated ($): embed values in {}
   - Choose based on content type and complexity

**Key interview concepts**:
- **Program Structure**: Namespaces, Main method, organization
- **Type System**: Value vs reference, generics, conversions
- **Null Safety**: Nullable types, null operators, compiler analysis
- **Strings**: Immutability, literals, manipulation, comparison
- **Fundamentals**: Core language concepts

**How to approach interview questions**:
- Start with fundamentals overview and importance
- Explain program structure and organization
- Discuss type system (value vs reference, generics)
- Address null safety and prevention strategies
- Mention strings and common operations

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [C# documentation - A tour of C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/)