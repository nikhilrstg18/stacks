---
title: "The C# Type System"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Type System Overview - Strong Typing</summary>
  <div>

## The C# Type System

**Real-life analogy**: The C# type system is like a strict inventory management system for a warehouse. Every item (variable, constant, expression) must have a specific type label (product category). The system enforces that you can only perform valid operations on items - you can add quantities of the same product type, but you can't add a quantity to a product name. This strict categorization prevents errors and ensures inventory accuracy. C# type safety provides the same benefit - the compiler checks that every operation is valid for the types involved, catching errors before the code runs.

**Technical explanation**: C# is strongly typed language. Every variable, constant, expression has a type. Compiler enforces type safety by checking every operation is valid for types involved. Can add two int values, but can't add int and bool. Type safety catches errors at compile time. Compiler embeds type information into executable as metadata, CLR uses for additional safety checks at runtime. Declare variables with explicit types or var for compiler inference. Method parameters and return values also have types. Can convert values to other types. Implicit conversions happen automatically, explicit conversions (casts) require indication in code.

**Key jargon explained**:
- **Strongly Typed**: Every variable has known type at compile time
- **Type Safety**: Compiler checks operations are valid for types
- **Compile-Time Checking**: Errors caught before code runs
- **Metadata**: Type information embedded in executable
- **Implicit vs Explicit Conversion**: Automatic vs manual type conversion

```csharp:title=TypeSafety.cs
int a = 5;
int b = a + 2; // OK

bool test = true;

// Error. Operator '+' cannot be applied to operands of type 'int' and 'bool'.
// int c = a + test;
```

```csharp:title=VariableDeclaration.cs
// Explicit type:
int count = 10;
double temperature = 36.6;

// Compiler-inferred type:
var name = "C#";
var items = new List<string> { "one", "two", "three" };
```

**How it works in practice**: Compiler enforces type safety by checking operations at compile time. Type information embedded as metadata for runtime safety checks. Variables declared with explicit types or var for inference. Method parameters and return values have types. Conversions between types: implicit (automatic, no data loss) and explicit (cast, potential data loss). Built-in types (int, double, bool, char, string) available without references. Custom types: classes (reference types, inheritance), structs (value types, lightweight), records (compiler-generated equality, ToString, with expressions), interfaces (contracts), enums (named constants), tuples (lightweight grouping), generics (type-parameterized).

**Key takeaways for interviews**:
- C# is strongly typed, every variable has type
- Type safety catches errors at compile time
- Metadata embedded for runtime safety checks
- Implicit conversions automatic, explicit conversions require casts
- Built-in types and custom types (classes, structs, records, interfaces, enums, tuples, generics)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Value vs Reference Types - Memory Semantics</summary>
  <div>

## Value Types and Reference Types

**Real-life analogy**: Value types are like photocopies of documents. When you photocopy a document and give the copy to someone, they have their own independent copy. Changes to their copy don't affect your original. Reference types are like sharing a document via cloud storage. When you share a cloud document link, both parties access the same document. Changes made by one person are visible to the other. Value types copy data on assignment (independent copies), reference types copy references (shared object).

**Technical explanation**: Every type in C# is either value type or reference type. This distinction determines how variables store data and how assignment works. Value types hold data directly. When assigning value type to new variable, runtime copies data. Changes to one variable don't affect other. Structs, enums, built-in numeric types are value types. Reference types hold reference to object on managed heap. When assigning reference type to new variable, both variables point to same object. Changes through one variable visible through other. Classes, arrays, delegates, strings are reference types. All types derive from System.Object. Value types derive from System.ValueType, which derives from object. Unified hierarchy called Common Type System (CTS).

**Key jargon explained**:
- **Value Type**: Holds data directly, copies on assignment
- **Reference Type**: Holds reference to object, shares on assignment
- **Managed Heap**: Memory area for reference type objects
- **System.ValueType**: Base class for all value types
- **Common Type System**: Unified type hierarchy

```csharp:title=ValueVsReference.cs
public readonly record struct Coords(int X, int Y);

// Value type: each variable holds its own copy
var point1 = new Coords(3, 4);
var point2 = point1;
Console.WriteLine($"point1: ({point1.X}, {point1.Y})");
Console.WriteLine($"point2: ({point2.X}, {point2.Y})");
// point1 and point2 are independent copies

// Reference type: both variables refer to the same object
var list1 = new List<int> { 1, 2, 3 };
var list2 = list1;
list2.Add(4);
Console.WriteLine($"list1 count: {list1.Count}"); // 4 — same object
```

**How it works in practice**: Value types (structs, enums, numeric types) hold data directly. Assignment copies entire instance. Each variable independent copy. Reference types (classes, arrays, delegates, strings) hold reference to object on heap. Assignment copies reference. Both variables point to same object. Changes through one variable visible through other. Value types for small, lightweight data. Reference types for complex behavior, inheritance, shared identity. All types derive from System.Object, value types via System.ValueType.

**Key takeaways for interviews**:
- Value types hold data directly, copy on assignment
- Reference types hold references, share on assignment
- Structs, enums, numeric types are value types
- Classes, arrays, delegates, strings are reference types
- All types derive from System.Object via CTS

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

**Real-life analogy**: Interview preparation for type system concepts is like understanding inventory management systems. You need to understand how items are categorized, how operations are validated, how copies are made, and when to use different storage approaches.

**Common interview questions**:
1. **What does it mean that C# is strongly typed?**
   - Every variable, constant, expression has a type
   - Compiler enforces type safety by checking operations
   - Type safety catches errors at compile time
   - Can't add int and bool, compiler prevents invalid operations
   - Type information embedded as metadata for runtime checks

2. **What is the difference between value types and reference types?**
   - Value types hold data directly, copy on assignment
   - Reference types hold references to objects, share on assignment
   - Value types: structs, enums, numeric types
   - Reference types: classes, arrays, delegates, strings
   - Value types independent copies, reference types shared objects

3. **What are implicit vs explicit conversions?**
   - Implicit: automatic, compiler guarantees no data loss
   - Explicit: cast syntax, potential data loss or failure
   - Example: int to long (implicit), long to int (explicit)
   - Compiler performs implicit conversions automatically
   - Explicit conversions require (Type)value syntax

4. **What are the built-in types in C#?**
   - Numeric types: int, long, short, byte, double, float, decimal
   - bool: true or false
   - char: single Unicode character
   - string: sequence of characters (immutable)
   - Available without additional references

5. **What custom types can you create in C#?**
   - Classes: reference types, support inheritance
   - Structs: value types, lightweight data
   - Records: compiler-generated equality, ToString, with expressions
   - Interfaces: contracts for behavior
   - Enums: named constants
   - Tuples: lightweight grouping
   - Generics: type-parameterized constructs

**Key interview concepts**:
- **Strong Typing**: Compile-time type checking
- **Type Safety**: Compiler validates operations
- **Value Types**: Direct data storage, copy semantics
- **Reference Types**: Reference storage, share semantics
- **Conversions**: Implicit (automatic) vs explicit (cast)

**How to approach interview questions**:
- Start with strong typing and type safety
- Explain value vs reference type distinction
- Discuss implicit vs explicit conversions
- Address built-in types and custom types
- Mention when to use each type construct

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [The C# type system - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/)