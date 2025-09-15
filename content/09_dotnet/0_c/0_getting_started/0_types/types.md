---
title: "C# Types"
slug: "09_dotnet/0_c/0_getting_started/0_types"
stack: "C#.NET"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

## Introduction

> `Value types` and `reference types` are the two main categories of C# types

A variable of a value type contains an instance of the type.

![Value Types](../../../../../src/images/09_dotnet/net-2a.gif)

Examples : int, enum, structs.

- A Value Type stores its contents in memory allocated on the `stack`.
- When you creat a Value Type, a single space in memory is allocated to store the value and that variable directly holds a value. If you assign it to another variable, the value is copied directly and both variables work independently.
- Predefined datatypes, structures, enums are also value types, and work in the same way.
- Value types can be created at compile time and stored in stack memory, because of this, Garbage collector can’t access the stack.

---

This differs from a variable of a `reference type`, which contains a reference to an instance of the type

![Reference Types](../../../../../src/images/09_dotnet/net-2b.gif)

Examples : class, interface, delegate, string, object, Array

- Reference Types are used by a reference which holds a reference `address` to the object on `stack` but not the object itself.
- Because reference types represent the address of the variable rather than the data itself, assigning a reference variable to another doesn’t copy the data. Instead it creates a second copy of the reference, which refers to the same location of the heap as the original value.
- Reference Type variables are stored in a different area of memory called the `heap`. This means that when a reference type variable is no longer used, it can be marked for garbage collection.

Examples of reference types are Classes, Objects, Arrays, Indexers, Interfaces etc.

`Value types Vs reference type ❓`

| Value Type                                                                 | Reference Type                             |
| -------------------------------------------------------------------------- | ------------------------------------------ |
| They are stored on stack                                                   | They are stored on heap                    |
| Contains actual value                                                      | Contains reference to a value              |
| Cannot contain null values. However this can be achieved by nullable types | Can contain null values.                   |
| Value type is popped on its own from stack when they go out of scope.      | Required garbage collector to free memory. |
| Memory is allocated at compile time                                        | Memory is allocated at run time            |

✏️: Both value and reference types are further classified as `built-in` and `user-defined` types`

## Classification of Types

```markdown markmap
- Types
  - Value Types
    - Built-in Value Types
    - User-defined Value Types
  - Reference Types
    - Built-in Reference Types
    - User-defined Reference Types
```

<div style="display:none;">

### Built-in Value Types

</div>

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
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/value_types">( , )</a></td><td>System.ValueTuple</td><td>Value types and reference types are the two main categories of C# types. A variable of a value type contains an instance of the type</td></tr>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/nullable-value-types">T?</a></td><td>System.Nullable</td><td>A nullable value type T? represents all values of its underlying value type T and an additional null value</td></tr>
    </tbody>
</table>

<div style="display:none;">

### Built-in Reference Types

</div>

<table>
    <caption>Built-in Reference Types</caption>
    <thead>
        <tr><th>C# type</th><th>.Net Type</th><th>Description</th></tr>
    </thead>
    <tbody>
     <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/reference-types#the-object-type">object</a></td><td>System.Object</td><td>The object type is an alias for System.Object in .NET. In the unified type system of C#, all types, predefined and user-defined, reference types and value types, inherit directly or indirectly from System.Object.</td></tr>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/reference-types#the-object-type:~:text=e%20s%20t-,String%20literals,-String%20literals%20are">string</a></td><td>System.String</td><td>The string type represents a sequence of zero or more Unicode characters. string is an alias for System.String in .NET.</td></tr>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/reference-types#the-object-type:~:text=virtual%20Invoke%20method.-,The%20dynamic%20type,-The%20dynamic%20type">dynamic</a></td><td>System.Object</td><td>The dynamic type indicates that use of the variable and references to its members bypass compile-time type checking. Instead, these operations are resolved at run time</td></tr>
    </tbody>
</table>

<div style="display:none;">

### User-defined Reference Types

</div>

<table>
    <caption>User-defined Reference Types</caption>
    <thead>
        <tr><th>C# type</th><th>.Net Type</th><th>Description</th></tr>
    </thead>
    <tbody>
     <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/record">record</a></td><td>System.Object</td><td>You use the record modifier to define a reference type that provides built-in functionality for encapsulating data</td></tr>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/class">class</a></td><td>System.Object</td><td>Classes are declared using the keyword class</td></tr>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/interface">interface</a></td><td>System.Object</td><td>An interface defines a contract. Any class, record or struct that implements that contract must provide an implementation of the members defined in the interface</td></tr>
        <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/collections">Collections</a></td><td>System.Collections.Generic</td><td>The .NET runtime provides many collection types that store and manage groups of related objects</td></tr>
    </tbody>
</table>

## Problem of overflow

understanding it by example E.g.

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		byte number = 255;
		number += 1;
		Console.WriteLine(number); // 0
	}
}
```

Here simple app,
on line 7: we have defined a variable named `number` of type `byte` and assigned value of 255(i.e. largest value that can be stored in a byte)
on line 8: we are increasing the number by 1 and trying to store 256 in variable of type byte
on line 9: when we compile and run the app, we see 0 as output and this is what we call `overflowing` aka `exceeding the boundary of its underlying data type`

In C#, by default we don't have overflow checking, which means we can modify the value at runtime and if we go beyond the boundary of its underlying data type, we will get overflow
Overflowing is not desirable in app, and You want to stop overflowing by using `checked`.

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		checked
		{
			byte number = 255;
			number += 1; // at runtime -> System.OverflowException: Arithmetic operation resulted in an overflow
			Console.WriteLine(number);
		}
	}
}
```

## Scope

`Scope` is where a variable / constant has meaning and its accessible. Let understand this by example

```csharp
{
	var a = 1;
	{
		var b = 2;
		{
			var c = 2;
		}
	}
}
```

Here we have 3 blocks of code, from outside first

```csharp{3-8}
{
	var a = 1;
	{
		var b = 2;
		{
			var c = 2;
		}
	}
}
```

here is second

```csharp{5-7}
{
	var a = 1;
	{
		var b = 2;
		{
			var c = 2;
		}
	}
}
```

here is third.

> Inside first block we have variable named `a`, which acessible anywhere in first block or its child blocks, `a` is not accessible outside first block

same rule applied to second block with variable `b` and thrid block with variable `c`

## Type conversion

![Thumb rule](https://simplesnippets.tech/wp-content/uploads/2018/05/typecasting-in-java.jpg)

### Implicit Conversion of built-in types

e.g.

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		byte b = 1; // byte takes 1 Byte
		int i = b; // int takes 4 Bytes
	}
}
```

So we can easily assing `byte` to an `int`. This is because if we look at binary representation at run time it looks like below:

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		byte b = 1; //                            00000001
		int i = b;  // 00000000 00000000 00000000 00000001
	}
}
```

At compile-time, compiler prefixes the first 3 Bytes with 0 and implicitly make it compatible, resulting in implicit conversion.

Another Example

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		int i = 1;  // 00000000 00000000 00000000 00000001
		byte b = i; //                            00000001
		// won't compile
	}
}
```

At compile-time, compiler finds out that theee is potential data-loss causing incompatibility and results in `Compilation Error : Cannot implicitly convert type 'int' to 'byte'`.

### Explicit Conversion of built-in types (Casting)

Referring to above example, if you want to and you are sure that there will be data loss for above convertion from int to byte, you can do that by casting or Explicit Type Conversion.

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		int i = 1;
		byte b = (byte)i;  // 1
	}
}
```

Another Example

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		float f = 1.0f;
		int i = (int)f;  // compiler will warn for potential data loss
	}
}
```

### Non-compatible conversion of built-in types

Example of non-compatible types

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		string s = "1";
		int i = (int)s;  // won't compile
	}
}
```

In above example, string is incompatible with int

`How can we convert non-compatible types ❓`

by using [Convert](https://learn.microsoft.com/en-us/09_dotnet/api/system.convert) class or by using `Parse()` of target type.

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		string s = "1";
		int i = Convert.ToInt32(s);
		int j = int.Parse(s);
	}
}
```

another EXAMPLE

```csharp:title=Program.cs
using System;

public class Program
{
	public static void Main()
	{
		string s = "S";
		int i = Convert.ToInt32(s); // System.FormatException: Input string was not in a correct format.
		int j = int.Parse(s);       // System.FormatException: Input string was not in a correct format.
	}
}
```
