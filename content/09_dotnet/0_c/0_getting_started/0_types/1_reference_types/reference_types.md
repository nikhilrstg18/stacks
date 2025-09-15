---
title: "Reference Types"
slug: "09_dotnet/0_c/0_getting_started/0_types/1_reference_types"
stack: "C#.NET"
date: "2025-06-04T07:26:45.889Z"
draft: false
---

## Overview

> A variable of a `reference type` contains a reference (stack) to an instance of the type (heap)

![Value Types](../../../../../../src/images/09_dotnet/net-2b.gif)

Examples : [class](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/class), [interface](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/interface), [delegate](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/reference-types#the-delegate-type), [record](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/record), [string](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/reference-types), [object](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/reference-types), [dynamic](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/reference-types)

- Reference Types are used by a reference which holds a reference `address` to the object on `stack` but not the object itself.
- Because reference types represent the address of the variable rather than the data itself, assigning a reference variable to another doesn’t copy the data. Instead it creates a second copy of the reference, which refers to the same location of the heap as the original value.
- Reference Type variables are stored in a different area of memory called the `heap`. This means that when a reference type variable is no longer used, it can be marked for garbage collection.

<div style="display:none;">

## Built-in Reference Types

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

### object

![System.Object](http://www.icodeguru.com/09_dotnet/core.c.sharp.and.dot.net/0131472275/images/0131472275/graphics/02fig02.gif)

- In the unified type system of C#, all types, predefined and user-defined, reference types and value types, inherit directly or indirectly from `System.Object`

- You can assign values of any type to variables of type `object`. Any object variable can be assigned to its default value using the literal `null`.

`.Net Performance Tip`

> It is best to avoid using value types in situations where they must be boxed a high number of times, for example in non-generic collections classes such as `System.Collections.ArrayList`. You can avoid boxing of value types by using generic collections such as `System.Collections.Generic.List<T>`.

Boxing and unboxing are computationally expensive processes. When a value type is boxed, an entirely new object must be created. This can take up to 20 times longer than a simple reference assignment. When unboxing, the casting process can take four times as long as an assignment.

`Boxing` Vs `Unboxing`

The concept of boxing and unboxing underlies the C# unified view of the type system in which a

> value of any type can be treated as an object.

When a variable of a `value type` is converted to `object`, it's said to be `boxed`. When a variable of type object is converted to a value type, it's said to be `unboxed`. [read more](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/types/boxing-and-unboxing)

#### Boxing

- Process of converting a `value type` to the type `object` or to any interface type implemented by this value type.
- When the `CLR` boxes a value type, it wraps the value inside a `System.Object` instance and stores it on the `garbage collected` or `managed` heap.
- Boxing is _implicit_

e.g. the integer variable `i` is boxed and assigned to object `o`:

```csharp:title=Program.cs
using System;

class Program
{
    static void Main()
    {
        int i = 123;
        object o = i;  // implicit boxing
    }
}
```

The result of this statement is creating an object reference `o`, on the stack, that references a value of the type int, on the heap. This value is a copy of the value-type value assigned to the variable `i`. The difference between the two variables, `i` and `o`, is illustrated in the following image of boxing conversion:

![boxed](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/types/media/boxing-and-unboxing/boxing-operation-i-o-variables.gif)

#### Unboxing

- Process of extracting the value type from the object is called `Unboxing`
- Unboxing is _explicit_. An unboxing operation consists of:
  1. _Checking the object instance_ to make sure that it is a boxed value of the given value type.
  2. Copying the value from the instance into the value-type variable.
- Attempting to unbox null causes a `NullReferenceException`
- Attempting to unbox a reference to an incompatible value type causes an `InvalidCastException`.

e.g. The object `o` can then be unboxed and assigned to integer variable `i`:

![Unboxing](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/types/media/boxing-and-unboxing/unboxing-conversion-operation.gif)

```csharp:title=Program.cs
using System;

class Program
{
    static void Main()
    {
        int i = 123;
        object o = i;  // implicit boxing

        try
        {
            int j = (int)o;  // attempt to unbox

            System.Console.WriteLine("Unboxing OK.");
        }
        catch (System.InvalidCastException e)
        {
            System.Console.WriteLine("{0} Error: Incorrect unboxing.", e.Message);
        }
    }
}
```

#### Safely cast with pattern matching

- Because objects are polymorphic, it's possible for a variable of a base class type to hold a derived type. To access the derived type's instance members, it's necessary to cast the value back to the derived type.
- However, a cast creates the risk of throwing an InvalidCastException.
- C# provides pattern matching statements that perform a cast conditionally only when it will succeed.
- C# also provides the `is` and `as`operators to test if a value is of a certain type.

The following example shows how to use the pattern matching `is` statement:

```csharp:title=SuperNova.cs
var g = new Giraffe();
var a = new Animal();
FeedMammals(g);
FeedMammals(a);
// Output:
// Eating.
// Animal is not a Mammal

SuperNova sn = new SuperNova();
TestForMammals(g);
TestForMammals(sn);

static void FeedMammals(Animal a)
{
    if (a is Mammal m)
    {
        m.Eat();
    }
    else
    {
        // variable 'm' is not in scope here, and can't be used.
        Console.WriteLine($"{a.GetType().Name} is not a Mammal");
    }
}

static void TestForMammals(object o)
{
    // You also can use the as operator and test for null
    // before referencing the variable.
    var m = o as Mammal;
    if (m != null)
    {
        Console.WriteLine(m.ToString());
    }
    else
    {
        Console.WriteLine($"{o.GetType().Name} is not a Mammal");
    }
}
// Output:
// I am an animal.
// SuperNova is not a Mammal

class Animal
{
    public void Eat() { Console.WriteLine("Eating."); }
    public override string ToString()
    {
        return "I am an animal.";
    }
}
class Mammal : Animal { }
class Giraffe : Mammal { }

class SuperNova { }
```

- The `if (a is Mammal m)` statement combines the test with an initialization assignment.
- The assignment occurs only when the test succeeds.
- The variable m is only in scope in the embedded if statement where it has been assigned. You can't access m later in the same method.
- The preceding example also shows how to use the as operator to convert an object to a specified type.
- You can also use the same syntax for testing if a nullable value type has a value

The following code shows how to use the is and as statements that were part of the C# language before pattern matching was introduced to test if a variable is of a given type

```csharp:title=SuperNova.cs
// Use the is operator to verify the type.
// before performing a cast.
Giraffe g = new();
UseIsOperator(g);

// Use the as operator and test for null
// before referencing the variable.
UseAsOperator(g);

// Use pattern matching to test for null
// before referencing the variable
UsePatternMatchingIs(g);

// Use the as operator to test
// an incompatible type.
SuperNova sn = new();
UseAsOperator(sn);

// Use the as operator with a value type.
// Note the implicit conversion to int? in
// the method body.
int i = 5;
UseAsWithNullable(i);

double d = 9.78654;
UseAsWithNullable(d);

static void UseIsOperator(Animal a)
{
    if (a is Mammal)
    {
        Mammal m = (Mammal)a;
        m.Eat();
    }
}

static void UsePatternMatchingIs(Animal a)
{
    if (a is Mammal m)
    {
        m.Eat();
    }
}

static void UseAsOperator(object o)
{
    Mammal? m = o as Mammal;
    if (m is not null)
    {
        Console.WriteLine(m.ToString());
    }
    else
    {
        Console.WriteLine($"{o.GetType().Name} is not a Mammal");
    }
}

static void UseAsWithNullable(System.ValueType val)
{
    int? j = val as int?;
    if (j is not null)
    {
        Console.WriteLine(j);
    }
    else
    {
        Console.WriteLine("Could not convert " + val.ToString());
    }
}
class Animal
{
    public void Eat() => Console.WriteLine("Eating.");
    public override string ToString() => "I am an animal.";
}
class Mammal : Animal { }
class Giraffe : Mammal { }

class SuperNova { }
```

### string

The string type represents a `sequence of zero or more Unicode characters (UTF-16)`. string is an alias for [System.String](https://learn.microsoft.com/en-us/09_dotnet/api/system.string) in .NET.

Although string is a reference type, the equality operators `==` and `!=`are defined to compare the values of string objects, not references. Value based equality makes testing for string equality more intuitive. For example

```csharp:title=Program.cs
using System;

class Program
{
    static void Main()
    {
        string a = "hello";
        string b = "h";
        // Append to contents of 'b'
        b += "ello";
        Console.WriteLine(a == b);
        Console.WriteLine(object.ReferenceEquals(a, b));
    }
}
```

The previous example displays "True" and then "False" because the content of the strings is equivalent, but a and b don't refer to the same string instance

The [+ operator](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/addition-operator#string-concatenation) concatenates strings

```csharp:title=Program.cs
using System;

class Program
{
    static void Main()
    {
        string a = "good " + "morning";
        Console.WriteLine(a);
    }
}
```

The preceding code creates a string object that contains "good morning".

`Strings are immutable`--the contents of a string object can't be changed after the object is created. For example, when you write this code, the compiler actually creates a new string object to hold the new sequence of characters, and that new object is assigned to b. The memory that had been allocated for b (when it contained the string "h") is then eligible for garbage collection.

```csharp:title=Program.cs
using System;

class Program
{
    static void Main()
    {
        string b = "h";
        b += "ello";
    }
}
```

The [[] operator](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/member-access-operators#indexer-operator-) can be used for readonly access to individual characters of a string. Valid index values start at 0 and must be less than the length of the string

```csharp:title=Program.cs
using System;

class Program
{
    static void Main()
    {
        string str = "test";
        char x = str[2];  // x = 's';
    }
}
```

In similar fashion, the [] operator can also be used for iterating over each character in a string:

```csharp:title=Program.cs
using System;

class Program
{
    static void Main()
    {
        string str = "test";
        for (int i = 0; i < str.Length; i++)
        {
            Console.Write(str[i] + " ");
        }
        // Output: t e s t
    }
}
```

`string literals` can be written in 3 forms

1.  raw (available in C# 11)
    - Raw string literals can contain arbitrary text without requiring escape sequences.
    - Raw string literals can include whitespace and new lines, embedded quotes, and other special characters.
    - Raw string literals are enclosed in a minimum of three double quotation marks (`"""`):

```csharp
"""
This is a multi-line
    string literal with the second line indented.
"""
```

2.  quoted
    - Quoted string literals are enclosed in double quotation marks ("):

```csharp
"good morning"  // a string literal
```

3.  verbatim
    - Verbatim string literals start with @ and are also enclosed in double quotation marks. For example.

```csharp
@"good morning"  // a string literal
```

4.  UTF-8 string literals
    - Strings in .NET are stored using UTF-16 encoding.
    - UTF-8 is the standard for Web protocols and other important libraries.
    - Beginning in C# 11, you can add the u8 suffix to a string literal to specify UTF-8 encoding.
    - `UTF-8` literals are stored as `ReadOnlySpan<byte>` objects.
    - UTF-8 string literals aren't compile time constants; they're runtime constants. Therefore, they can't be used as the default value for an optional parameter.
    - UTF-8 string literals can't be combined with string interpolation. You can't use the $ token and the u8 suffix on the same string expression
    - Using a UTF-8 string literal creates a more clear declaration than declaring the equivalent System.ReadOnlySpan<T>, as shown in the following code:

```csharp
ReadOnlySpan<byte> AuthStringLiteral = "AUTH "u8;
```

### delegate

The declaration of a delegate type is similar to a method signature. It has a return value and any number of parameters of any type

```csharp
public delegate void MessageDelegate(string message);
public delegate int AnotherDelegate(MyType m, long num);
```

In .NET, System.Action and System.Func types provide generic definitions for many common delegates. You likely don't need to define new custom delegate types. Instead, you can create instantiations of the provided generic types.

- A delegate is a reference type that can be used to encapsulate a named or an anonymous method. Delegates are similar to function pointers in C++; however, delegates are type-safe and secure
- Delegates are the basis for Events. A delegate can be instantiated by associating it either with a named or anonymous method
- The delegate must be instantiated with a method or lambda expression that has a compatible return type and input parameters.

### dynamic

- The `dynamic` type indicates that use of the variable and references to its members bypass compile-time type checking. Instead, these operations are resolved at run time.
- The `dynamic` type simplifies access to COM APIs such as the Office Automation APIs, to dynamic APIs such as IronPython libraries, and to the HTML Document Object Model (DOM).
- Type `dynamic` behaves like type `object` in most circumstances. In particular, any non-null expression can be converted to the dynamic type.
- The `dynamic` type differs from `object` in that operations that contain expressions of type dynamic aren't resolved or type checked by the compiler. The compiler packages together information about the operation, and that information is later used to evaluate the operation at run time.
- As part of the process, variables of type `dynamic` are compiled into variables of type `object`. Therefore, type dynamic exists only at compile time, not at run time.

The following example contrasts a variable of type `dynamic` to a variable of type `object`. To verify the type of each variable at compile time, place the mouse pointer over `dyn` or `obj` in the `WriteLine` statements. Copy the following code into an editor where IntelliSense is available. IntelliSense shows dynamic for dyn and object for obj.

```csharp:title=Program.cs
class Program
{
    static void Main(string[] args)
    {
        dynamic dyn = 1;
        object obj = 1;

        // Rest the mouse pointer over dyn and obj to see their
        // types at compile time.
        System.Console.WriteLine(dyn.GetType());
        System.Console.WriteLine(obj.GetType());
    }
}
```

The WriteLine statements display the run-time types of dyn and obj. At that point, both have the same type, integer. The following output is produced:

```csharp
System.Int32
System.Int32
```

---

<div style="display:none;">

## User-defined Reference Types

</div>

<table>
    <caption>User-defined Reference Types</caption>
    <thead>
        <tr><th>C# type</th><th>.Net Type</th><th>Description</th></tr>
    </thead>
    <tbody>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/class">class</a></td><td>System.Object</td><td>Classes are declared using the keyword class</td></tr>
     <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/record">record</a></td><td>System.Object</td><td>You use the record modifier to define a reference type that provides built-in functionality for encapsulating data</td></tr>    
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/interface">interface</a></td><td>System.Object</td><td>An interface defines a contract. Any class, record or struct that implements that contract must provide an implementation of the members defined in the interface</td></tr>
    <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/nullable-reference-types">Nullable Reference Types</a></td><td>System.Object</td><td>Nullable reference types are available in code that has opted in to a *nullable* aware context</td></tr>
        <tr><td><a href="https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/collections">Collections</a></td><td>System.Collections.Generic</td><td>The .NET runtime provides many collection types that store and manage groups of related objects</td></tr>
    </tbody>
</table>

### class

- Classes are the most fundamental of C#'s types
- A `class` is a data structure that combines state (fields) and actions (methods and other function members) in a single unit.
- A `class` provides a definition for instances of the class, also known as objects
- Classes support `inheritance` and `polymorphism`, mechanisms whereby derived classes can extend and specialize base classes.
- Classes are declared using the keyword `class`, as shown in the following example:
- New classes are created using class declarations. A class declaration starts with a header. The header specifies:
  - The attributes and modifiers of the class
  - The name of the class
  - The base class (when inheriting from a base class)
  - The interfaces implemented by the class.

```csharp:title=Point.cs
public class Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y) => (X, Y) = (x, y);

    // Methods, properties, fields, events, delegates
    // and nested classes go here.
}
```

Instances of classes are created using the new operator, which allocates memory for a new instance, invokes a constructor to initialize the instance, and returns a reference to the instance. The following statements create two Point objects and store references to those objects in two variables

```csharp
var p1 = new Point(0, 0);
var p2 = new Point(10, 20);
```

> The memory occupied by an object is automatically reclaimed when the object is no longer reachable.

The following class generates a sequence of random points. The number of points is set by the primary constructor parameter. The primary constructor parameter `numberOfPoints` is in scope for all members of the class

```csharp:title=PointFactory.cs
public class PointFactory(int numberOfPoints)
{
    public IEnumerable<Point> CreatePoints()
    {
        var generator = new Random();
        for (int i = 0; i < numberOfPoints; i++)
        {
            yield return new Point(generator.Next(), generator.Next());
        }
    }
}
```

You can use the class as shown in the following code:

```csharp:title=PointFactory.cs
var factory = new PointFactory(10);
foreach (var point in factory.CreatePoints())
{
    Console.WriteLine($"({point.X}, {point.Y})");
}
```

#### Type Parameters

Generic classes define [type parameters](https://learn.microsoft.com/en-us/09_dotnet/csharp/fundamentals/types/generics). Type parameters are a list of type parameter names enclosed in angle brackets. Type parameters follow the class name. The type parameters can then be used in the body of the class declarations to define the members of the class. In the following example, the type parameters of Pair are `TFirst` and `TSecond`

```csharp:title=Pair.cs
public class Pair<TFirst, TSecond>
{
    public TFirst First { get; }
    public TSecond Second { get; }

    public Pair(TFirst first, TSecond second) =>
        (First, Second) = (first, second);
}
```

A class type that is declared to take type parameters is called a generic class type. Struct, interface, and delegate types can also be generic. When the generic class is used, type arguments must be provided for each of the type parameters:

```csharp:title=Pair.cs
var pair = new Pair<int, string>(1, "two");
int i = pair.First;     //TFirst int
string s = pair.Second; //TSecond string
```

> A generic type with type arguments provided, like Pair<int,string> above, is called a `constructed type`.

#### Base Classes

- A class declaration may specify a base class.
- Follow the class name and type parameters with a colon and the name of the base class.
- Omitting a base class specification is the same as deriving from type `object`.
- In the following example, the base class of `Point3D` is `Point`. From the first example, the base class of `Point` is object:

```csharp:title=Point3D.cs
public class Point3D : Point
{
    public int Z { get; set; }

    public Point3D(int x, int y, int z) : base(x, y)
    {
        Z = z;
    }
}
```

> Only single inheritance is allowed in C#.

In other words, a class can inherit implementation from one base class only. However, a class can implement more than one interface

| Inheritance                      | Example                                          |
| -------------------------------- | ------------------------------------------------ |
| None                             | `class ClassA { }`                               |
| Single                           | `class DerivedClass : BaseClass { }`             |
| None, implements two interfaces  | `class ImplClass : IFace1, IFace2 { }`           |
| Single, implements one interface | `class ImplDerivedClass : BaseClass, IFace1 { }` |

- Classes that you declare directly within a namespace, not nested within other classes, can be either public or internal. Classes are internal by default.

- Class members, including nested classes, can be public, protected internal, protected, internal, private, or private protected. Members are private by default.

A class can contain declarations of the following members:

- [Constructors](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/constructors)
- [Constants](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/constants)
- [Fields](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/fields)
- [Finalizers](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/finalizers)
- [Methods](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/methods)
- [Properties](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/properties)
- [Indexers](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/indexers/)
- [Operators](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/indexers/)
- [Events](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/indexers/)
- [Delegates](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/delegates/)
- [Classes](https://learn.microsoft.com/en-us/09_dotnet/csharp/fundamentals/types/classes)
- [Interfaces](https://learn.microsoft.com/en-us/09_dotnet/csharp/fundamentals/types/interfaces)
- [Structure types](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/struct)
- [Enumeration types](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/enum)

```csharp:title=Child.cs
class Child
{
    private int age;
    private string name;

    // Default constructor:
    public Child()
    {
        name = "N/A";
    }

    // Constructor:
    public Child(string name, int age)
    {
        this.name = name;
        this.age = age;
    }

    // Printing method:
    public void PrintChild()
    {
        Console.WriteLine("{0}, {1} years old.", name, age);
    }
}
```

```csharp:title=StringTest.cs
class StringTest
{
    static void Main()
    {
        // Create objects by using the new operator:
        Child child1 = new Child("Craig", 11);
        Child child2 = new Child("Sally", 10);

        // Create an object using the default constructor:
        Child child3 = new Child();

        // Display results:
        Console.Write("Child #1: ");
        child1.PrintChild();
        Console.Write("Child #2: ");
        child2.PrintChild();
        Console.Write("Child #3: ");
        child3.PrintChild();
    }
}
```
<op>

Child #1: Craig, 11 years old.

Child #2: Sally, 10 years old.

Child #3: N/A, 0 years old.

</op>

Explanation

- Notice that in the previous example the private fields (name and age) can only be accessed through the public method of the Child class. For example, you cannot print the child's name, from the Main method, using a statement like this:

```csharp
Console.Write(child1.name);   // Error
```

- Accessing private members of Child from Main would only be possible if Main were a member of the class.

- Types declared inside a class without an access modifier default to private, so the data members in this example would still be private if the keyword were removed.

- Finally, notice that for the object created using the parameterless constructor (child3), the age field was initialized to zero by default.

### record

You use the `record` modifier to define a reference type that provides built-in functionality for encapsulating data. C# 10 allows the record class syntax as a synonym to clarify a reference type, and record struct to define a value type with similar functionality

- When you declare a primary constructor on a `record`, the compiler generates public properties for the primary constructor parameters.
- The primary constructor parameters to a record are referred to as positional parameters.
- The compiler creates positional properties that mirror the primary constructor or positional parameters.
- The compiler doesn't synthesize properties for primary constructor parameters on types that don't have the record modifier

The following two examples demonstrate `record` (or `record class`) reference types:

```csharp:title=Person.cs
public record Person(string FirstName, string LastName);
```

```csharp:title=Person.cs
public record Person
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
};
```

The following two examples demonstrate `record struct` value types:

```csharp:title=Point.cs
public readonly record struct Point(double X, double Y, double Z);
```

```csharp:title=Point.cs
public record struct Point
{
    public double X { get; init; }
    public double Y { get; init; }
    public double Z { get; init; }
}
```

You can also create records with mutable properties and fields:

```csharp:title=Person.cs
public record Person
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
};
```

Record structs can be mutable as well, both positional record structs and record structs with no positional parameters:

> While records can be mutable, they're primarily intended for supporting immutable data models

- [Concise syntax for creating a reference type with immutable properties](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/record#positional-syntax-for-property-definition)
- Built-in behavior useful for a data-centric reference type:
  - [Value equality](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/record#value-equality)
  - [Concise syntax for nondestructive mutation](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/record#nondestructive-mutation)
  - [Built-in formatting for display](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/record#built-in-formatting-for-display)

distinctions between records that are reference types and records that are value types

- A `record` or a `record class` declares a reference type. The `class` keyword is optional, but can add clarity for readers. A `record struct` declares a value type.
  Positional properties are immutable in a `record class` and a `readonly record struct`. They're mutable in a `record struct`
- You should decide between a `record class` and a `record struct` similar to deciding between a `class` and a `struct`
- The term _record_ is used to describe behavior that applies to all record types. Either `record struct` or `record class` is used to describe behavior that applies to only `struct` or `class` types, respectively.

#### Immutability

#### Positional syntax for property definition

#### Value equality

#### Inheritance

#### Generic contraints in record

### interface

> An interface defines a contract.

- Any `class`, `record` or `struct` that implements that contract must provide an implementation of the members defined in the interface.

- An interface may define a default implementation for members. It may also define static members in order to provide a single implementation for common functionality

- Beginning with C# 11, an interface may define static abstract or static virtual members to declare that an implementing type must provide the declared members
- Typically, static virtual methods declare that an implementation must define a set of overloaded operators

- In the following example, class `ImplementationClass` must implement a method named `SampleMethod` that has no parameters and returns void

```csharp
interface ISampleInterface
{
    void SampleMethod();
}

class ImplementationClass : ISampleInterface
{
    // Explicit interface member implementation:
    void ISampleInterface.SampleMethod()
    {
        // Method implementation.
    }

    static void Main()
    {
        // Declare an interface instance.
        ISampleInterface obj = new ImplementationClass();

        // Call the member.
        obj.SampleMethod();
    }
}
```

An interface can be a member of a namespace or a class. An interface declaration can contain declarations (signatures without any implementation) of the following members:

- [Methods](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/methods)
- [Properties](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/properties)
- [Indexers](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/indexers/)
- [Events](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/indexers/)

#### Default interface members

> These preceding member declarations typically don't contain a body.

- An interface member may declare a body.
- Member bodies in an interface are the default implementation.
- Members with bodies permit the interface to provide a "default" implementation for classes and structs that don't provide an overriding implementation.

An interface may include

- [Constants](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/const)
- [Operators](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/operator-overloading)
- [Static constructor](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/constructors#static-constructors)
- [Nested types](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/nested-types)
- [Static fields, methods, properties, indexers, and events](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/static)
- [Member declarations using the explicit interface implementation syntax](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/static)
- Explicit access modifiers (the default access is [public](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/access-modifiers)).

#### Static abstract and virtual members

Beginning with C# 11, an interface may declare static abstract and static virtual members for all member types except fields. Interfaces can declare that implementing types must define operators or other static members. This feature enables generic algorithms to specify number-like behavior. You can see examples in the numeric types in the .NET runtime, such as System.Numerics.INumber<TSelf>. These interfaces define common mathematical operators that are implemented by many numeric types. The compiler must resolve calls to static virtual and static abstract methods at compile time. The static virtual and static abstract methods declared in interfaces don't have a runtime dispatch mechanism analogous to virtual or abstract methods declared in classes. Instead, the compiler uses type information available at compile time. Therefore, static virtual methods are almost exclusively declared in generic interfaces. Furthermore, most interfaces that declare static virtual or static abstract methods declare that one of the type parameters must implement the declared interface. For example, the INumber<T> interface declares that T must implement INumber<T>. The compiler uses the type argument to resolve calls to the methods and operators declared in the interface declaration. For example, the int type implements INumber<int>. When the type parameter T denotes the type argument int, the static members declared on int are invoked. Alternatively, when double is the type argument, the static members declared on the double type are invoked.
You can try this feature by working with the tutorial on [static abstract members in interfaces](https://learn.microsoft.com/en-us/09_dotnet/csharp/whats-new/tutorials/static-virtual-interface-members).

#### Interface inheritance

- Interfaces may not contain instance state.
- While static fields are now permitted, instance fields aren't permitted in interfaces.
- Instance auto-properties aren't supported in interfaces, as they would implicitly declare a hidden field. This rule has a subtle effect on property declarations.
  In an interface declaration, the following code doesn't declare an auto-implemented property as it does in a class or struct. Instead, it declares a property that doesn't have a default implementation but must be implemented in any type that implements the interface

```csharp
public interface INamed
{
  public string Name {get; set;}
}
```

- An interface can inherit from one or more base interfaces. When an interface [overrides a method](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/override) implemented in a base interface, it must use the [explicit interface implementation](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/interfaces/explicit-interface-implementation) syntax.

- When a base type list contains a base class and interfaces, the base class must come first in the list.

- A class that implements an interface can explicitly implement members of that interface. An explicitly implemented member can't be accessed through a class instance, but only through an instance of the interface. In addition, default interface members can only be accessed through an instance of the interface

#### interface implementation

In this example, the interface contains the property declaration and the class contains the implementation. Any instance of a class that implements `IPoint` has integer properties `x` and `y`

```csharp
interface IPoint
{
    // Property signatures:
    int X { get; set; }

    int Y { get; set; }

    double Distance { get; }
}

class Point : IPoint
{
    // Constructor:
    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }

    // Property implementation:
    public int X { get; set; }

    public int Y { get; set; }

    // Property implementation
    public double Distance =>
       Math.Sqrt(X * X + Y * Y);
}

class MainClass
{
    static void PrintPoint(IPoint p)
    {
        Console.WriteLine("x={0}, y={1}", p.X, p.Y);
    }

    static void Main()
    {
        IPoint p = new Point(2, 3);
        Console.Write("My Point: ");
        PrintPoint(p);
    }
}
// Output: My Point: x=2, y=3
```

### Nullable reference Types

> Nullable reference types are available in code that has opted in to a nullable aware context

Nullable reference types, the null static analysis warnings, and the null-forgiving operator are optional language features. All are turned off by default. A nullable context is controlled at the project level using build settings, or in code using pragmas

In a nullable aware context:

- A variable of a reference type `T` must be initialized with non-null, and may never be assigned a value that may be `null`.
- A variable of a reference type `T?` may be initialized with `null` or assigned `null`, but is required to be checked against `null` before de-referencing.
- A variable `m` of type `T?` is considered to be non-null when you apply the null-forgiving operator, as in `m!`.

The distinctions between a non-nullable reference type `T` and a nullable reference type `T?` are enforced by the compiler's interpretation of the preceding rules.

- A variable of type `T` and a variable of type `T?` are represented by the same .NET type.
  The following example declares a non-nullable string and a nullable string, and then uses the null-forgiving operator to assign a value to a non-nullable string:

```csharp
string notNull = "Hello";
string? nullable = default;
notNull = nullable!; // null forgiveness
```

#### Setting the nullable context

- There are two ways to control the nullable context. At the project level, you can add the `<Nullable>enable</Nullable>`project setting.
- In a single C# source file, you can add the #nullable enable pragma to enable the nullable context. See the article on setting a nullable strategy.
- Prior to .NET 6, new projects use the default, `<Nullable>disable</Nullable>`.
- Beginning with .NET 6, new projects include the `<Nullable>enable</Nullable>` element in the project file.
