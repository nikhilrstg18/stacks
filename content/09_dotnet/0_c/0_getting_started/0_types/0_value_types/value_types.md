---
title: "Value Types"
slug: "09_dotnet/0_c/0_getting_started/0_types/0_value_types"
stack: "C#.NET"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

## Overview

> A variable of a value type contains an instance of the type

![Value Types](../../../../../../src/images/09_dotnet/net-2a.gif)

Examples : int, enum, structs.

- A Value Type stores its contents in memory allocated on the `stack`.
- When you creat a Value Type, a single space in memory is allocated to store the value and that variable directly holds a value. If you assign it to another variable, the value is copied directly and both variables work independently.
- Predefined datatypes, structures, enums are also value types, and work in the same way.
- Value types can be created at compile time and stored in stack memory, because of this, Garbage collector can’t access the stack.

By default, on assignment, passing an argument to a method, and returning a method result, variable values are copied. In the case of value-type variables, the corresponding type instances are copied. The following example demonstrates that behavior

```csharp:title=MutablePoint.cs
using System;

public struct MutablePoint
{
    public int X;
    public int Y;

    public MutablePoint(int x, int y) => (X, Y) = (x, y);

    public override string ToString() => $"({X}, {Y})";
}
```

```csharp:title=Program.cs
public class Program
{
    public static void Main()
    {
        var p1 = new MutablePoint(1, 2);
        var p2 = p1;
        p2.Y = 200;
        Console.WriteLine($"{nameof(p1)} after {nameof(p2)} is modified: {p1}");
        Console.WriteLine($"{nameof(p2)}: {p2}");

        MutateAndDisplay(p2);
        Console.WriteLine($"{nameof(p2)} after passing to a method: {p2}");
    }

    private static void MutateAndDisplay(MutablePoint p)
    {
        p.X = 100;
        Console.WriteLine($"Point mutated in a method: {p}");
    }
}
```

<op>

p1 after p2 is modified: (1, 2)

p2: (1, 200)

Point mutated in a method: (100, 200)

p2 after passing to a method: (1, 200)

</op>

As the preceding example shows, operations on a value-type variable affect only that instance of the value type, stored in the variable.

If a value type contains a data member of a reference type, only the reference to the instance of the reference type is copied when a value-type instance is copied. Both the copy and original value-type instance have access to the same reference-type instance. The following example demonstrates that behavior

```csharp:title=TaggedInteger.cs
using System;
using System.Collections.Generic;

public struct TaggedInteger
{
    public int Number;
    private List<string> tags;

    public TaggedInteger(int n)
    {
        Number = n;
        tags = new List<string>();
    }

    public void AddTag(string tag) => tags.Add(tag);

    public override string ToString() => $"{Number} [{string.Join(", ", tags)}]";
}
```

```csharp:title=Program.cs
public class Program
{
    public static void Main()
    {
        var n1 = new TaggedInteger(0);
        n1.AddTag("A");
        Console.WriteLine(n1);  // output: 0 [A]

        var n2 = n1;
        n2.Number = 7;
        n2.AddTag("B");

        Console.WriteLine(n1);  // output: 0 [A, B]
        Console.WriteLine(n2);  // output: 7 [A, B]
    }
}
```

## Kinds of value types and type constraints

A value type can be one of the two following kinds:

- A [structure type](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/struct), which encapsulates data and related functionality
- An [enumeration type](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/enum), which is defined by a set of named constants and represents a choice or a combination of choices
- A [nullable value type](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/nullable-value-types) `T?` represents all values of its underlying value type `T` and an additional [null](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/null) value.

> You cannot assign `null` to a variable of a `value type`, unless it's a `nullable value type`.

You can use the [struct constraint](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/generics/constraints-on-type-parameters) to specify that a type parameter is a non-nullable value type. Both structure and enumeration types satisfy the struct constraint. You can use System.Enum in a base class constraint (that is known as the [enum constraint](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/generics/constraints-on-type-parameters#enum-constraints)) to specify that a type parameter is an enumeration type.

### Built-in Value Types

C# provides the following built-in value types, also known as `simple types`:

- [Integral numeric types](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/integral-numeric-types)
- [Floating-point numeric types](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types)
- [bool](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/bool) that represents a Boolean value
- [char](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/char) that represents a Unicode UTF-16 character

<table>
    <caption>Built-in Value Types</caption>
    <thead>
        <tr><th></th><th>C# type</th><th>.Net Type</th><th>Bytes</th><th>Range</th><th>Precision</th></tr>
    </thead>
    <tbody>
    <tr><td rowspan=4>Integral Numeric</td><td>byte</td><td>System.Byte</td><td>1</td><td>0 to 255</td><td></td></tr>
    <tr><td>short</td><td>System.Int16</td><td>2</td><td>-32,768 to 32,767</td><td>-</td></tr>
    <tr><td>int</td><td>System.Int32</td><td>4</td><td>-2.1B to 2.1B</td><td>-</td></tr>
    <tr><td>long</td><td>System.Int64</td><td>8</td><td>-9.2Qi to 9.2Qi</td><td>-</td></tr>
    <tr><td rowspan=3>Floating Point</td><td>float</td><td>System.Single</td><td>4</td><td>±1.5 x 10−45 to ±3.4 x 1038</td><td>~6-9digits</td></tr>
    <tr><td>double</td><td>System.Double</td><td>8</td><td>±5.0 × 10−324 to ±1.7 × 10308</td><td>~15-17digits</td></tr>
    <tr><td>decimal</td><td>System.Decimal</td><td>16</td><td>±1.0 x 10-28 to ±7.9228 x 1028</td><td>~28-29digits</td></tr>
    <tr><td>Character</td><td>char</td><td>System.Char</td><td>2</td><td>Unicode characters (U+0000 to U+FFFF)</td><td>-</td></tr>
    <tr><td>Boolean</td><td>bool</td><td>System.Boolean</td><td>1</td><td>true / false</td><td>-</td></tr>
    </tbody>
</table>

<div style="display:none;">

---

### User-defined Value Types

</div>

<table>
    <caption>User-defined Value Types</caption>
    <thead>
        <tr><th>C# type</th><th>.Net Type</th><th>Description</th></tr>
    </thead>
    <tbody>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/enum">enum</a></td><td>System.Enum</td><td>An enumeration type (or enum type) is a value type defined by a set of named constants of the underlying integral numeric type. To define an enumeration type, use the enum keyword and specify the names of enum members</td></tr>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/struct">struct</a></td><td>System.Struct</td><td>A structure type (or struct type) is a value type that can encapsulate data and related functionality. You use the struct keyword to define a structure type:</td></tr>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/value_types">tuple</a></td><td>System.ValueTuple</td><td>The tuples feature provides concise syntax to group multiple data elements in a lightweight data structure</td></tr>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/nullable-value-types">T?</a></td><td>System.Nullable</td><td>A nullable value type T? represents all values of its underlying value type T and an additional null value</td></tr>
    </tbody>
</table>

<div style="display:none;">
