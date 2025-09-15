---
title: "Intro to C#"
slug: "09_dotnet/0_c"
stack: "C#.NET"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

## C# Keywords

> Keywords are predefined, reserved identifiers that have special meanings to the compiler.

They can't be used as identifiers in your program unless they include _@_ as a prefix. For example, `@if` is a valid identifier, but `if` isn't because `if` is a keyword.

keywords that are reserved identifiers in any part of a C# program.

| a-e      | e-l       | n-s        | s-z       |
| :------- | :-------- | :--------- | :-------- |
| abstract | event     | namespace  | static    |
| as       | explicit  | new        | string    |
| base     | extern    | null       | struct    |
| bool     | false     | object     | switch    |
| break    | finally   | operator   | this      |
| byte     | fixed     | out        | throw     |
| case     | float     | override   | true      |
| catch    | for       | params     | try       |
| char     | foreach   | private    | typeof    |
| checked  | goto      | protected  | uint      |
| class    | if        | public     | ulong     |
| const    | implicit  | readonly   | unchecked |
| continue | in        | ref        | unsafe    |
| decimal  | int       | return     | ushort    |
| default  | interface | sbyte      | using     |
| do       | internal  | sealed     | virtual   |
| double   | is        | short      | void      |
| else     | lock      | sizeof     | volatile  |
| enum     | long      | stackalloc | while     |

## contextual keywords in C#.

> Contextual keywords have special meaning only in a limited program context and can be used as identifiers outside that context.

Generally, as new keywords are added to the C# language, they're added as contextual keywords in order to avoid breaking programs written in earlier versions.

|            |         |                 |                               |
| :--------- | :------ | :-------------- | :---------------------------- |
| and        | get     | notnull         | select                        |
| add        | global  | nuint           | set                           |
| alias      | group   | on              | unmanaged                     |
| ascending  | init    | or              | unmanage (generic constraint) |
| args       | into    | orderby         | value                         |
| async      | join    | partial(type)   | var                           |
| await      | let     | partial(method) | when                          |
| by         | managed | record          | where                         |
| descending | nameof  | remove          | where (generic constraint)    |
| dynamic    | nint    | required        | with                          |
| equals     | not     | scoped          | yield                         |
| file       |         |                 |                               |
| from       |         |                 |                               |

## void

`void` in c# is alias of `System.Void` type in .Net
You use void as the return type of a method (or a local function) to specify that the method doesn't return a value

```csharp:title=Demo.cs
public static void Display(IEnumerable<int> numbers)
{
    if (numbers is null)
    {
        return;
    }

    Console.WriteLine(string.Join(" ", numbers));
}
```

## Default value

Use the `default` operator to produce the default value of a type, as the following example shows:

```csharp
int a = default(int);
```

You can use the default literal to initialize a variable with the default value of its type:

```csharp
int a = default;
```

## Unmanged Types

A type is an unmanaged type if it's any of the following types:

- `sbyte`, `byte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `nint`, `nuint`, `char`, `float`, `double`, `decimal`, or `bool`
  Any `enum` type
  Any `pointer` type
  Any `user-defined struct` type that contains fields of unmanaged types only.
  You can use the unmanaged constraint to specify that a type parameter is a non-pointer, non-nullable unmanaged type.

A constructed struct type that contains fields of unmanaged types only is also unmanaged, as the following example shows:

```csharp:title=Coords.cs
using System;

public struct Coords<T>
{
    public T X;
    public T Y;
}
```

```csharp:title=UnmanagedTypes.cs

public class UnmanagedTypes
{
    public static void Main()
    {
        DisplaySize<Coords<int>>();
        DisplaySize<Coords<double>>();
    }

    private unsafe static void DisplaySize<T>() where T : unmanaged
    {
        Console.WriteLine($"{typeof(T)} is unmanaged and its size is {sizeof(T)} bytes");
    }
}
```
<op>
Coords`1[System.Int32] is unmanaged and its size is 8 bytes
 
Coords`1[System.Double] is unmanaged and its size is 16 bytes

</op>

> A generic struct may be the source of both unmanaged and managed constructed types.

- The preceding example defines a generic struct `Coords<T>` and presents the examples of unmanaged constructed types.
- The example of a managed type is `Coords<object>`. It's managed because it has the fields of the object type, which is managed. If you want all constructed types to be unmanaged types, use the unmanaged constraint in the definition of a generic struct:

```csharp:title=Coords.cs
public struct Coords<T> where T : unmanaged
{
    public T X;
    public T Y;
}
```

```markdown markmap
# c#

## Getting Started

### Types

### Programming building blocks

### Major Language Areas

### Tutorials

## Fundamentals

### Exception and Errors

### Functional Techniques

### Object-oriented Programming

## LINQ

### Getting Started

### Standard Query Operaters

### LINQ to Objects

### LINQ:File Directories

### LINQ:How to
```
