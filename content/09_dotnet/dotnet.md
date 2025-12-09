---
title: "Intro to .Net"
slug: "09_dotnet"
stack: ".Net"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

## .Net Framework Vs .Net Standard Vs .Net

- `.NET Framework` is the original implementation of .NET. It supports running websites, services, desktop apps, and more on Windows
- `.NET Standard` is a formal specification of the APIs that are common across .NET implementations. This allows the same code and libraries to run on different implementations.
- `.NET` is a cross-platform implementation for running websites, services, and console apps on Windows, Linux, and macOS. .NET is open source on GitHub. .NET was previously called `.NET Core`

## C# vs .Net

`C#` is _programming language_

`.NET` is free, open-source, secure, reliable, and high-performance `application platform`.

## Architecture of .Net Framework

![.net arch](../../src/images/09_09_dotnet/net-1c.png)
2 major components are

1. The **Common Language Runtime (CLR)** is the execution engine that handles running applications. It provides services like thread management, garbage collection, type-safety, exception handling, and more
2. The **Class Library** provides a set of APIs and types for common functionality. It provides types for strings, dates, numbers, etc. The Class Library includes APIs for reading and writing files, connecting to databases, drawing, and more

.NET applications are written in the C#, F#, or Visual Basic programming language. Code is compiled into a language-agnostic Common Intermediate Language (CIL). Compiled code is stored in assemblies—files with a .dll or .exe file extension.

When an app runs, the CLR takes the assembly and uses a just-in-time compiler (JIT) to turn it into machine code that can execute on the specific architecture of the computer it is running on.

## CLR (Common Language Runtime)

Before we understand CLR and what it is, we need to under a little history of C#

`History - Problem`

Before C#, we have 2 popular languages C/ C++. With either of these languages when we compile our app, the compiler translates our code into native code for the machine it was running.

Which means if I run an app in C++ on a windows machine with 8086 CPU architecture, the compiler would translate that code into native code for that machine (i.e. window machine with 8086 architecture).

In market, we have different H/W and OS, So if we compile an app on 1 set of H/W or OS, that compiled code would not run on different set of H/W or OS. Which gave the need to make it platform independent

`Solution`

So, When Microsoftwas designing C#, they borrowred the idea of JVM from Java community. In Java, when code is compiled, its not directly translated to native code, its first translated into intermediate language called bytecode

And we have the exact same concept in C#, So when you compile c# code, the result is IL code which is independent of the machine on which it is running.Now we need something that should take the compiled IL code and translates to Native Code at runtime and is called as CLR

`What is CLR ❓`

So, CLR is essentially an application sitting in memory whose job is to translate IL code to native code

`How C# is platform independent ❓`

- C# is platform-independent, i.e. compiled result is always IL code (understandable by CLR).
- CLR is platform-dependent , i.e. specific to a platform in order to translate IL code to native code understable by the machine.

## Architecture of .Net Apps

At high level your .Net app consist of building blocks called Class. These classes collaborate with themselves at runtime and provide some functionality

### Class Vs Object

![Class](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuKhEIImkLd06aTLS2WgwAOabYLmAyV50jdPkQab6Veg69bSjbqDgNWfGEG00)

A `Class` is a `logical` `compile-time` `entity/blueprint` which defines

- data/attributes (`state` of instance)
- methods (`behavior` of instance) for an instance/object at runtime. For eg. Think of a car

![Car class](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuKhEIImkLd1EBAhcKb3GpKtCJWNJ-IcfEI16SdvEVX6NGdmyaACDrgIX2MBcvfUb0bcrN0wfUIb0Sm00)

A car has some data/attributes like Make, Model, Color i.e. state of that car and methods like start(), move() i.e. behavior of that car.

![Audi8 object](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuKhEIImkLd0iJScqgEPIKD3DJSnE1TFvAQav84PoVav-4PT2V3oGemtMfg49OkRcbwL2MQN5cSb0PYsNGsfU2j1G0000)

eg. Think of Audi8

In real world, Car doesn't exist since its a classification of real world object ie. Audi 8 or Mercedes, here Audi 8 is a physical entity.
You sit in Audi8 or drive an Audi8 i.e. in real world you don't drive a Car, you drive Audi8 which Is a Car (IS-A relationship)

![Audi8_Is_A_Car](http://www.plantuml.com/plantuml/png/FO-_3W8X38VtFaL7ZU5cOnpkukHZ460WWaqek9oykvLmdVed_NqVh5njgIqdSCaouyEM7T1a-mh_GZuagOuI5J06y3BkJsVfCds2D7qcj-RZLRAxNDJe-cJeE5awArDNojRDuK2nDOvkwEI9UFykon3Y3PziDbZ3syilVW00)

> Here `Audi8` **IS-A** `Car`

In programming, we create audi 8 instance using Car class at runtime. When audi 8 is instantiated, their is some memory allocation (physical)

An `object` is `physical` `runtime-time` entity which honours IS-A relation with its compile-time entity.

> In Real-world applications, we have 10s 100s or even 1000s of classes, each class responsible for a piece of funtionality

### Namespace

![Namespace](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuIf8JCvEJ4zLKF9Bp4qj1l9IbHIgkHGKefrp4ekB5HnZ4Mmd9BOp4jibbgkMoo4rBmLe7W00)

`How to manage an app with 1000s of classes❓`

As the number of classes in our app grows, we need a way to organise these classes, that's where we use `namespace` i.e. container of related classes.

for eg. in .net app, we have namespaces each of containes multiple classes. We have namepace of working with data, graphics, files, network, etc

### Assembly

![Namespace](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuIf8JCvEJ4zLK78iBaxDJSgfL5Aevb9GYFPBp4qj1agcAZZ6elATqFZEQ7oNMAvQBeVKl1IWyG00)

`How to manage an app with 1000s of namespace❓`

In Real world apps, contains multiple namespaces, we need a way to organize and maintain these namespaces, that's where we use `assembly` i.e. container of related namespaces, physically its a file under disk which can either be an executable `EXE` or Dynamic Linked Library `DLL`

So when to compile a .Net application, compiler build 1 or more assemblies, depending on how you have partitioned your code

![Namespace](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuIf8JCvEJ4zLK78iACZ9J4uioSpFKrAevb9GY7OiBaxDJSgfL72CHU4weNATKRakiLorN0wfUIb0qm40)

## Environment Setup

Download and install

- SDK - [.Net](https://dotnet.microsoft.com/en-us/download)
- Code Editor - [VS Code](https://code.visualstudio.com/download)

## Hello World App

```csharp:title=Program.cs
using System;

namespace Org.Team.Project
{
    public class Program
    {
        public static void Main()
        {
            Console.WriteLine("Hello World");
        }
    }
}
```

## Anatomy of .Net App

### namespace

The `namespace` keyword is used to declare a scope that contains a set of related objects. You can use a namespace to organize code elements and to create globally unique types

Within a namespace, you can declare zero or more of the following types:

- class
- interface
- struct
- enum
- delegate
- nested namespaces can be declared except in file scoped namespace declarations

```csharp:title=OrderCode.cs
namespace Org.Team.Project
{
    class OrderCode { }

    interface IOrderCode { }

    struct Price { }

    enum PriceMethod { a, b }

    delegate void OrderCodeEvent(int i);

    namespace Nested
    {
        class OrderCodeLite { }
    }
}
```

> Namespaces implicitly have public access.

`It's possible to define a namespace in two or more declarations ❓`

the following example defines two classes as part of the `Org.Team.Project` namespace

```csharp:title=OrderCode.cs
namespace Org.Team.Project
{
    class OrderCode
    {
    }
}
```

```csharp:title=OrderCodeLite.cs
namespace Org.Team.Project
{
    class OrderCodeLite
    {
    }
}
```

File scoped namespace declarations enable you to declare that all types in a file are in a single namespace. File scoped namespace declarations are available with C# 10.

```csharp{1-13}
using System;

namespace SampleFileScopedNamespace;

class SampleClass { }

interface ISampleInterface { }

struct SampleStruct { }

enum SampleEnum { a, b }

delegate void SampleDelegate(int i);

namespace AnotherNamespace; // Not allowed!

namespace ANestedNamespace // Not allowed!
{
   // declarations...
}
```

> File scoped namespaces can't include additional namespace declarations.
> You cannot declare a nested namespace or a second file-scoped namespace

The compiler adds a default namespace. This unnamed namespace, sometimes referred to as the global namespace, is present in every file. It contains declarations not included in a declared namespace. Any identifier in the global namespace is available for use in a named namespace.

### using directive

The `using` directive allows you to use types defined in a namespace without specifying the fully qualified namespace of that type.

```csharp:title=Program.cs
using System;

namespace Org.Team.Project
{
    public class Program
    {
        public static void Main()
        {
            Console.WriteLine("Hello World");
        }
    }
}
```

> At the beginning of a source code file, before any namespace or type declarations.

You can also create an alias for a namespace or a type with a using `alias` directive.

```csharp:title=Program.cs
using sys = System;

namespace Org.Team.Project
{
    public class Program
    {
        public static void Main()
        {
            sys.Console.WriteLine("Hello World");
        }
    }
}
```

You can apply two modifiers to a using directive:

- The `static` modifier imports the static members and nested types from a single type rather than importing all the types in a namespace.
- The `global` modifier has the same effect as adding the same using directive to every source file in your project. This modifier was introduced in C# 10.

#### global modifier

Adding the `global` modifier to a `using directive` means that using is applied to all files in the compilation (typically a project). The global using directive was added in C# 10.

syntax

```csharp
global using <FQNS>;

// FQNS is the fully qualified name of the namespace whose types can be referenced without specifying the namespace
```

A global using directive can appear at the beginning of any source code file. All global using directives in a single file must appear before:

- All using directives without the global modifier.
- All namespace and type declarations in the file.

You may add global using directives to any source file. Typically, you'll want to keep them in a single location. The order of global using directives doesn't matter, either in a single file, or between files.

Usage
at code level, in single as GlobalUsings.cs at project root level with concise list of frequently used namespaces.

```csharp
// vendor, 3th party namespaces
global using System.IO;
global using Microsoft.AspNetCore.Builder;
global using Microsoft.AspNetCore.Hosting;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Hosting;

// your project namesapces
global using Org.Team.Project.App;
global using Org.Team.Project.Infra.Data;
global using Org.Team.Project.Infra.Data.Contexts;
global using Org.Team.Project.Infra.Shared;
```

You can also globally include a namespace by adding a <Using> item to your project file, for example, <Using Include="My.Awesome.Namespace" />

```xml
<ItemGroup>
  <Using Include="My.Awesome.Namespace" Alias="Awesome"/>
</ItemGroup>
```

#### static modifier

The using static directive names a type whose static members and nested types you can access without specifying a type name
syntax

```csharp
using static <FQTN>;

// FQTN is the name of the type whose static members and nested types can be referenced without specifying a type name
```

You can access static members of a type without having to qualify the access with the type name

```csharp:title=Program.cs
using static System.Console;
using static System.Math;
class Program
{
    static void Main()
    {
        WriteLine(
            Sqrt(3*3 + 4*4)
        );
    }
}
```
