---
title: "Structs"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/2_structs"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Structs - Value Types for Lightweight Data</summary>
  <div>

## C# Structs

**Real-life analogy**: Structs are like standardized forms that contain specific data fields. When you fill out a form and give a copy to someone, they have their own independent copy. Changes to their copy don't affect your original. Structs provide the same model - value types that hold data directly, with assignment copying the entire instance. Use structs for small, lightweight data containers like coordinates, colors, or measurements where value semantics are appropriate.

**Technical explanation**: Struct is value type holding data directly in instance, not through reference to object on heap. When assigning struct to new variable, runtime copies entire instance. Changes to one variable don't affect other because each variable represents different instance. Use structs for small, lightweight types whose primary role is storing data rather than modeling behavior. Examples: coordinates, colors, measurements, configuration settings. Structs can contain fields, properties, methods, constructors like classes. Structs can't inherit from other structs or classes, but can implement interfaces.

**Key jargon explained**:
- **Value Type**: Holds data directly, copies on assignment
- **Lightweight**: Small data (roughly 16 bytes or less)
- **Value Semantics**: Independent copies, changes don't affect others
- **No Inheritance**: Can't inherit from other structs or classes
- **Interface Implementation**: Can implement interfaces

```csharp:title=StructDeclaration.cs
struct Point
{
    public double X { get; set; }
    public double Y { get; set; }

    public readonly double DistanceTo(Point other)
    {
        var dx = X - other.X;
        var dy = Y - other.Y;
        return Math.Sqrt(dx * dx + dy * dy);
    }

    public override string ToString() => $"({X}, {Y})";
}
```

```csharp:title=ValueSemantics.cs
var p1 = new Point { X = 3, Y = 4 };
var p2 = p1; // copies the data
p2.X = 10;

Console.WriteLine(p1); // (3, 4)  — p1 is unchanged
Console.WriteLine(p2); // (10, 4) — only p2 was modified
```

**How it works in practice**: Structs are value types, assignment copies data. Each variable holds independent copy. Modifying one doesn't affect other. Use for small, lightweight data (roughly 16 bytes or less). Value semantics - instances with same data should be equal. Primarily data container, not behavior model. Can't inherit from other structs or classes, but can implement interfaces. Can define constructors, methods, properties like classes. Mark methods readonly when they don't modify state.

**Key takeaways for interviews**:
- Structs are value types, hold data directly
- Assignment copies entire instance
- Use for small, lightweight data
- Value semantics - independent copies
- Can't inherit, but can implement interfaces

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Readonly Structs - Immutability</summary>
  <div>

## Readonly Structs and Readonly Members

**Real-life analogy**: Readonly structs are like sealed documents that can't be modified after creation. Once a document is sealed, its contents are fixed. Any changes require creating a new document. Readonly structs provide the same guarantee - no instance member can modify the struct's state. This enables compiler optimizations and ensures immutability, which is valuable for thread safety and predictable behavior.

**Technical explanation**: Readonly struct guarantees no instance member modifies struct's state. Compiler enforces by requiring all fields and auto-implemented properties to be read-only. When don't need entire struct immutable, mark individual members readonly instead. Readonly member can't modify struct's state, compiler verifies guarantee. Marking members readonly helps compiler optimize defensive copies. When passing readonly struct to method accepting in parameter, compiler knows no copy needed.

**Key jargon explained**:
- **Readonly Struct**: Immutable struct, no state modification
- **Readonly Member**: Instance member that can't modify state
- **Defensive Copies**: Copies made to prevent modification
- **in Parameter**: Pass by reference without copying
- **Compiler Optimization**: Eliminates unnecessary copies

```csharp:title=ReadonlyStruct.cs
readonly struct Temperature
{
    public double Celsius { get; }

    public Temperature(double celsius) => Celsius = celsius;

    public double Fahrenheit => Celsius * 9.0 / 5.0 + 32.0;

    public override string ToString() => $"{Celsius:F1}°C ({Fahrenheit:F1}°F)";
}
```

```csharp:title=ReadonlyMembers.cs
struct Velocity
{
    public double X
    {
        readonly get;
        set;
    }

    public double Y
    {
        readonly get;
        set;
    }

    public readonly double Speed => Math.Sqrt(X * X + Y * Y);

    public readonly override string ToString() => $"({X}, {Y}) speed={Speed:F2}";
}
```

**How it works in practice**: Readonly struct requires all fields and auto-implemented properties read-only. Compiler enforces no state modification. When entire struct doesn't need immutability, mark individual members readonly. Readonly member can't modify state, compiler verifies. Helps compiler optimize defensive copies. When passing readonly struct to method with in parameter, compiler knows no copy needed. Improves performance in hot paths.

**Key takeaways for interviews**:
- Readonly struct guarantees immutability
- All fields and auto-implemented properties must be read-only
- Can mark individual members readonly instead of entire struct
- Compiler optimizes defensive copies with readonly members
- in parameter benefits from readonly structs

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

**Real-life analogy**: Interview preparation for struct concepts is like understanding standardized forms. You need to understand when to use forms vs contracts, how copies work, how to ensure immutability, and when to optimize for performance.

**Common interview questions**:
1. **What is a struct in C#?**
   - Value type holding data directly in instance
   - Assignment copies entire instance
   - Changes to one variable don't affect other
   - Use for small, lightweight data (roughly 16 bytes or less)
   - Can't inherit from other structs or classes, but can implement interfaces

2. **When should you use a struct vs a class?**
   - Struct: small data (roughly 16 bytes or less)
   - Struct: value semantics, immutability
   - Struct: data container, not behavior model
   - Class: complex behavior, inheritance
   - Class: shared identity between references

3. **What are readonly structs and when would you use them?**
   - Readonly struct guarantees no instance member modifies state
   - All fields and auto-implemented properties must be read-only
   - Use when immutability is required
   - Compiler optimizes defensive copies
   - Improves performance in hot paths

4. **What are readonly members?**
   - Individual members marked readonly can't modify state
   - Use when entire struct doesn't need immutability
   - Compiler verifies guarantee
   - Helps optimize defensive copies
   - Works with in parameter for performance

5. **What is the difference between parameterless constructor and default expression?**
   - Parameterless constructor runs when using new with no arguments
   - default expression bypasses constructor, zero-initializes all fields
   - Parameterless constructor sets custom default values
   - default expression sets all fields to default values (0, null, false)
   - Be aware of the difference in behavior

**Key interview concepts**:
- **Value Type**: Direct data storage, copy semantics
- **Lightweight**: Small data, roughly 16 bytes or less
- **Readonly Struct**: Immutable, no state modification
- **Readonly Members**: Individual immutability
- **Parameterless Constructor**: Custom default vs default expression

**How to approach interview questions**:
- Start with struct definition and value type semantics
- Explain struct vs class decision criteria
- Discuss readonly structs for immutability
- Address readonly members for partial immutability
- Mention parameterless constructor vs default expression

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [C# structs - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/structs)