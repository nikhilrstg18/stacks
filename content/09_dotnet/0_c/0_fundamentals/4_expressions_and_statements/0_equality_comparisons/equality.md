---
title: "Equality Comparisons"
slug: "09_dotnet/0_c/0_fundamentals/4_expressions_and_statements/0_equality_comparisons"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Equality Comparisons - Value vs Reference</summary>
  <div>

## C# Equality Comparisons

**Real-life analogy**: Equality comparisons are like comparing documents. Value equality means two documents have the same content (same text, same formatting). Reference equality means two variables point to the same document file (same file on disk). Two separate documents with identical content are value-equal but not reference-equal. Two shortcuts to the same file are reference-equal. C# distinguishes these two kinds of equality: value equality (data matches) and reference equality (same object in memory, also called identity).

**Technical explanation**: C# distinguishes two kinds of equality. Value equality means two instances equal when their data matches. Reference equality means two variables equal only when they point to same object in memory (identity). Type kind gives best first clue about default equality behavior: value types usually compare data, reference types usually compare identity. Built-in numeric types and enums are value types, compare numeric values. Structs are value types, use value equality when calling Equals. Tuples are value types, equal when all element values match. Classes are reference types, use reference equality by default.

**Key jargon explained**:
- **Value Equality**: Data matches
- **Reference Equality**: Same object in memory (identity)
- **Value Types**: Hold data directly
- **Reference Types**: Hold references to objects
- **Equals**: Virtual method for equality comparison

```csharp:title:ClassEquality.cs
var order1 = new Order(42, "Shoes");
var order2 = new Order(42, "Shoes");

Console.WriteLine(order1 == order2);               // False
Console.WriteLine(order1.Equals(order2));          // False
Console.WriteLine(ReferenceEquals(order1, order2)); // False

Order order3 = order1;
Console.WriteLine(order1 == order3);               // True
```

```csharp:title:StructEquality.cs
var pt1 = new Point(3, 4);
var pt2 = new Point(3, 4);

Console.WriteLine(pt1.Equals(pt2)); // True
```

**How it works in practice**: Value types compare data by default. Reference types compare identity by default. Plain class shows reference equality - separate objects with same data not equal. Plain struct shows value equality through Equals - instances equal when fields match. Tuples equal when every element value matches. Strings are classes but == and Equals compare content, not identity. Records generate value equality and include ==/!= operators. Types can define different equality semantics. Equality woven through ==, !=, Equals, GetHashCode, ReferenceEquals.

**Key takeaways for interviews**:
- Value equality: data matches
- Reference equality: same object in memory
- Value types: compare data by default
- Reference types: compare identity by default
- Records provide value equality for reference types

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Records and Custom Equality - Value Semantics</summary>
  <div>

## Records and Custom Equality

**Real-life analogy**: Records are like data templates that automatically generate equality comparisons based on the data fields. Instead of manually writing equality logic, the compiler generates it for you, comparing every declared property value. This is like having a system that automatically compares all fields in a form rather than manually checking each one. Records provide value equality for reference types, making data-focused types behave like value types for comparison purposes.

**Technical explanation**: Use record modifier to give data-focused type value equality when type can be record. Compiler generates Equals, GetHashCode, and ==/!= members that compare every declared property value. Record class is still reference type but compares values instead of identity. Record struct also generates equality set. Record types generate whole equality set for their own type. Both record class and record struct override Equals and GetHashCode. They also generate == and != operators, plus typed Equals method for record type. Unlike plain struct, record struct supports == and != automatically.

**Key jargon explained**:
- **Record Modifier**: Generates value equality
- **Record Class**: Reference type with value equality
- **Record Struct**: Value type with generated operators
- **Compiler-Generated Equality**: Auto-generated Equals, GetHashCode, ==, !=
- **Value Semantics**: Compare data, not identity

```csharp:title:RecordClass.cs
var person1 = new Person("Ada", "Lovelace");
var person2 = new Person("Ada", "Lovelace");

Console.WriteLine(person1 == person2);               // True
Console.WriteLine(person1.Equals(person2));          // True
Console.WriteLine(ReferenceEquals(person1, person2)); // False
```

```csharp:title:RecordStruct.cs
var dim1 = new Dimension(1920, 1080);
var dim2 = new Dimension(1920, 1080);

Console.WriteLine(dim1 == dim2);      // True
Console.WriteLine(dim1.Equals(dim2)); // True
```

**How it works in practice**: Record modifier generates value equality. Record class: reference type but compares values. Record struct: value type with generated ==/!= operators. Compiler generates Equals, GetHashCode, ==, !=, typed Equals. Compare every declared property value. ReferenceEquals confirms different objects while == returns true. Use records for data-focused types needing value equality. Implement equality manually when type can't be record - override Equals, GetHashCode, implement ==/!= operators, ensure consistency.

**Key takeaways for interviews**:
- Record modifier generates value equality
- Record class: reference type with value comparison
- Record struct: value type with generated operators
- Compiler generates Equals, GetHashCode, ==, !=
- Use records for data-focused types

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

**Real-life analogy**: Interview preparation for equality comparisons is like understanding document comparison methods. You need to understand content comparison vs file reference comparison, and how to implement custom comparison logic.

**Common interview questions**:
1. **What is the difference between value equality and reference equality?**
   - Value equality: data matches
   - Reference equality: same object in memory
   - Value types: compare data by default
   - Reference types: compare identity by default
   - Reference equality also called identity

2. **What is the default equality behavior for classes vs structs?**
   - Classes: reference equality by default
   - Structs: value equality through Equals
   - Plain class: separate objects with same data not equal
   - Plain struct: instances equal when fields match
   - Plain structs don't get predefined == operator

3. **How do records provide value equality?**
   - Record modifier generates value equality
   - Compiler generates Equals, GetHashCode, ==, !=
   - Compares every declared property value
   - Record class: reference type with value comparison
   - Record struct: value type with generated operators

4. **What are the equality-related members in C#?**
   - ==: equality operator
   - !=: inequality operator
   - Equals: virtual method for equality
   - GetHashCode: used by hash-based collections
   - ReferenceEquals: static method testing identity

5. **How do you implement custom equality for a type?**
   - Override Equals to change equality semantics
   - Override GetHashCode when overriding Equals
   - Implement == and != as a pair
   - Keep consistent with Equals and GetHashCode
   - Use records when possible for auto-generation

**Key interview concepts**:
- **Value Equality**: Data matches
- **Reference Equality**: Same object
- **Default Behavior**: Type kind determines default
- **Records**: Auto-generated value equality
- **Custom Equality**: Override Equals, GetHashCode, ==, !=

**How to approach interview questions**:
- Start with value vs reference equality distinction
- Explain default behavior for classes vs structs
- Discuss records and auto-generated equality
- Address equality-related members
- Mention custom equality implementation

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [C# Equality comparisons - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/expressions/equality)