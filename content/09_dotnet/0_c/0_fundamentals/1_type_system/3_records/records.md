---
title: "Records"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/3_records"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Records - Data-Focused Types</summary>
  <div>

## C# Record Types

**Real-life analogy**: Records are like standardized data forms with built-in validation and comparison. When you fill out two forms with the same information, they're considered equal regardless of which form you used. Records provide the same model - types optimized for storing data with compiler-generated value equality, formatted ToString, and nondestructive mutation through with expressions. The underlying type (class or struct) still determines reference or value semantics, but the record modifier adds data-friendly behavior.

**Technical explanation**: Record keyword is modifier applied to class or struct. Tells compiler to generate value equality, formatted ToString, nondestructive mutation through with expressions. Underlying type (class or struct) determines reference or value semantics. Record modifier adds data-friendly behavior on top of those semantics. Use records when type's primary role is storing data and two instances with same values should be equal. record class: reference type, supports inheritance, properties init-only. record struct: value type, properties read-write by default, add readonly for init-only.

**Key jargon explained**:
- **Record Modifier**: Generates equality, ToString, with expressions
- **Value Equality**: Property-by-property comparison
- **With Expression**: Nondestructive mutation
- **Positional Parameters**: Define constructor and properties in single line
- **record class vs record struct**: Reference vs value semantics

```csharp:title=RecordDeclaration.cs
public record Person(string FirstName, string LastName);

public record struct Coordinate(double Latitude, double Longitude);

public readonly record struct Temperature(double Celsius)
{
    public double Fahrenheit => Celsius * 9.0 / 5.0 + 32.0;
}
```

```csharp:title=ValueEquality.cs
var phones = new string[] { "555-1234" };
var person1 = new Person("Grace", "Hopper", phones);
var person2 = new Person("Grace", "Hopper", phones);

Console.WriteLine(person1 == person2);              // True
Console.WriteLine(ReferenceEquals(person1, person2)); // False
```

**How it works in practice**: Record modifier generates compiler-generated equality (property-by-property), ToString, with expressions. Positional parameters define constructor and properties in single line. record class: reference type, properties init-only, supports inheritance. record struct: value type, properties read-write, add readonly for init-only. Value equality: two distinct objects with same data are equal. with expression creates copy with properties changed, original unchanged. Use for data-focused types where value equality desired.

**Key takeaways for interviews**:
- Record modifier generates equality, ToString, with expressions
- record class: reference type, init-only properties, supports inheritance
- record struct: value type, read-write properties, add readonly for immutability
- Value equality: property-by-property comparison
- with expression: nondestructive mutation

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>With Expressions - Nondestructive Mutation</summary>
  <div>

## Nondestructive Mutation with With Expressions

**Real-life analogy**: With expressions are like creating a revised document while keeping the original. Instead of editing the original document (destructive), you create a copy with specific changes (nondestructive). The original remains unchanged. With expressions provide the same capability for records - create a copy with one or more properties changed, leaving the original record unchanged. This supports immutability while allowing variation.

**Technical explanation**: Records often immutable, can't change property after creation. with expression creates copy with one or more properties changed, leaving original unchanged. Works for both record class and record struct types. Syntax: original with { Property = newValue }. Creates copy, applies specified property changes. Empty with expression { } creates exact copy. Useful when need variation of existing record without modifying original. Same syntax works for tuples.

**Key jargon explained**:
- **With Expression**: Nondestructive copy with property changes
- **Nondestructive Mutation**: Original unchanged
- **Immutable**: Can't change after creation
- **Copy with Changes**: New instance with modified properties
- **Variation**: Different version of existing record

```csharp:title=WithExpression.cs
var original = new Person("Grace", "Hopper");
var modified = original with { FirstName = "Margaret" };

Console.WriteLine(original); // Person { FirstName = Grace, LastName = Hopper }
Console.WriteLine(modified); // Person { FirstName = Margaret, LastName = Hopper }
Console.WriteLine(original == modified); // False

var copy = original with { };
Console.WriteLine(original == copy); // True
```

**How it works in practice**: with expression creates copy of existing instance, then applies specified property changes. Original record unchanged. Empty with expression { } creates exact copy (equal to original). Works for both record class and record struct. Useful when need variation without modifying original. Supports immutability while allowing flexibility. Same pattern works for tuples.

**Key takeaways for interviews**:
- with expression creates copy with property changes
- Original record unchanged (nondestructive)
- Empty with expression creates exact copy
- Works for record class and record struct
- Supports immutability with flexibility

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

**Real-life analogy**: Interview preparation for record concepts is like understanding standardized data forms. You need to understand when to use forms vs contracts, how equality works, how to create variations, and when to choose reference vs value semantics.

**Common interview questions**:
1. **What is a record in C#?**
   - Modifier applied to class or struct
   - Generates value equality, ToString, with expressions
   - Underlying type determines reference or value semantics
   - Use when type's primary role is storing data
   - Two instances with same values should be equal

2. **What is the difference between record class and record struct?**
   - record class: reference type, copies reference on assignment
   - record struct: value type, copies data on assignment
   - record class: properties init-only by default
   - record struct: properties read-write by default
   - record class supports inheritance, record struct doesn't

3. **How does record equality work?**
   - Compiler generates property-by-property equality
   - Two distinct objects with same data are equal
   - Plain class: reference equality by default
   - Plain struct: value equality through reflection (slower)
   - Record: compiler-generated equality without reflection

4. **What are with expressions?**
   - Create copy with one or more properties changed
   - Original record unchanged (nondestructive)
   - Syntax: original with { Property = newValue }
   - Empty with expression { } creates exact copy
   - Works for record class and record struct

5. **When should you use records vs classes?**
   - Records: primarily data, value-based equality, immutability
   - Records: readable ToString without writing manually
   - Classes: complex behavior, polymorphism, mutable state
   - Records: avoid for Entity Framework entities (depends on reference equality)
   - Most custom types are classes, records for data-focused types

**Key interview concepts**:
- **Record Modifier**: Generates equality, ToString, with expressions
- **Value Equality**: Property-by-property comparison
- **With Expression**: Nondestructive mutation
- **record class vs record struct**: Reference vs value semantics
- **Data-Focused**: Primary role is storing data

**How to approach interview questions**:
- Start with record definition and purpose
- Explain record class vs record struct differences
- Discuss record equality vs class/struct equality
- Address with expressions for nondestructive mutation
- Mention when to use records vs classes

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [C# record types - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/records)