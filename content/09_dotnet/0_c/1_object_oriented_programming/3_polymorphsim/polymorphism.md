---
title: "Polymorphism"
slug: "09_dotnet/0_c/1_object_oriented_programming/3_polymorphsim"
stack: "C#.NET"
---

> One interface and several functions

> Ability to perform a task in different ways


- `Polymorphism` in C# **empowers developers to write flexible and reusable code by allowing objects of different types to be treated uniformly through base classes or interfaces**.
- By using inheritance and overriding methods, C# developers can create dynamic and extensible systems, making it easier to adapt to changing requirements.
- Embracing `polymorphism` in C# fosters better software design, encapsulation, and abstraction, leading to maintainable and scalable applications

Two primary forms of polymorphism exist compile-time polymorphism, achieved through method overloading, and run-time polymorphism, achieved through method overriding

## Compile-Time Polymorphism (Static Polymorphism)


`Static` or `compile-time` or `early binding` - `polymorphism`, is a concept in OOP where the _method or function to be executed is determined at compile-time rather than runtime_. This means that the decision of which method or function to call is made by the compiler based on the data types involved, and it is fixed during the compilation process.

✏️: The mechanism of linking a function with an object during compile-time is called `early binding`

There are two main mechanisms to achieve static polymorphism:

1. Method Overloading
2. Operator Overloading

#### Method Overloading

- Method overloading in C# is a feature that _allows you to define multiple methods with the same name in a class but with different method signature_.
- The C# compiler uses the _method's signature_ (method name and parameter types) to distinguish between different overloaded methods during compilation. i.e., response of overloaded method will be determined by compile-time type.

```csharp{5-6, 11-12, 17-18, 23-48}
using System;

public class MathOperations
{
    // Method signature => Add(int, int)
    public int Add(int a, int b) 
    {
        return a + b;
    }

    // Method signature => Add(int, int, int)
    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }

    // Method signature => Add(double, double)
    public double Add(double a, double b)
    {
        return a + b;
    }

    //Main method
    public static void Main(string[] args)
    {
       //creating object math
       MathOperations math = new MathOperations();

       int sum1 = math.Add(1, 2);
       Console.WriteLine("sum of the two " + "integer value : " + sum1);


       int sum2 = math.Add(1, 2, 3);
       Console.WriteLine("sum of the three "
                          + "integer value : " + sum2);


       double sum3 = math.Add(3.14, 2.71);
       Console.WriteLine("sum of the two "
                          + "double value : " + sum3);
    }
}
//////
// The sum of the two integer value : 3
// the sum of the three integer values: 6
// the sum of the two double value: 5.85
```

✏️ `Method overloading rules ❓`

With prev example in focus, method with _same name_ but _different method signture_

- **Same method name**

    Overloaded method(s) must have same name within same or sub type

- **Number of parameter(s)**

    Overloaded method(s) must have different # of parameter(s) enabling compiler to differentiate between them.

- **Type of parameter(s)**

    Overloaded method(s) must have different types of parameter(s) enabling compiler to differentiate between them.

- **Return Type**

    Return type insignificant since not part of method signature.

- **Access Modifiers**

    Overloaded method(s) can have different access modifiers, insignificant since not part of method signature

- **Static methods**

    Method(s) can be overloaded whether they are static or instance method(s), insignificant since not part of method signature



#### Operator Overloading

- Operator overloading in C# _allows you to define custom behaviors for operators when used with user-defined classes or structs_. 
- This enables you to use operators such as +, -, \*, /, etc., with your types, providing a natural and intuitive way to perform operations on objects of your class. 
- Operator overloading is a form of static polymorphism, as the resolution of the operator usage occurs at compile time.

In C# to overload an operator, you need to provide a special method in your class or struct that corresponds to the operator you want to overload. The methods used for operator overloading have specific names, and the name of the method depends on the operator you wish to overload.

```csharp{3-4, 15-20, 22-50}
using System;

public class Point2D
{
    public int X { get; set; }
    public int Y { get; set; }

    // Constructor to initialize X and Y
    public Point2D(int x, int y)
    {
        X = x;
        Y = y;
    }

    // Overloading the '+' operator to add two Point2D objects
    public static Point2D operator +(Point2D a, Point2D b)
    {
        return new Point2D(a.X + b.X, a.Y + b.Y);
    }
}

public class Program
{
    //Main method
    public static void Main(string[] args)
    {
       //creating object math
       Point2D point1 = new Point2D(2, 3);
       Point2D point2 = new Point2D(5, 7);

       Point2D sum = point1 + point2;

        Console.WriteLine("point1: (" + point1.X + ", " + point1.Y + ")");
        Console.WriteLine("point2: (" + point2.X + ", " + point2.Y + ")");
        Console.WriteLine("sum: (" + sum.X + ", " + sum.Y + ")");
    }
}
//////
// point1: (2, 3)
// point2: (5, 7)
// sum: (7, 10)
```

## Runtime Polymorphism (Dynamic Polymorphism)

`Runtime` or `dynamic` or `late binding` - `polymorphism `, is a concept in OOP where the method or function to be executed is determined at runtime rather than at compile-time. This allows different objects to exhibit different behaviors for the same method name based on their actual type or class hierarchy.

Runtime polymorphism in C# is typically achieved through `inheritance` and `virtual methods` in object-oriented languages.

The runtime polymorphism is achieved by:

#### Method Overriding

- A derived class may offer a specific implementation for a method that is already declared in its base class by using the C# feature known as method overriding. By overriding a method, the derived class can provide its von of the method, which will be called instead of the base class's version when the method is invoked on an instance of the derived class.

in another words

- Base classes may define and implement virtual methods, and derived classes can override them, which means they provide their own definition and implementation. At run-time, when client code calls the method, the CLR looks up the run-time type of the object, and invokes that override of the virtual method. In your source code you can call a method on a base class, and cause a derived class's version of the method to be executed.
- Virtual methods enable you to work with groups of related objects in a uniform way. For example, suppose you have a drawing application that enables a user to create various kinds of shapes on a drawing surface. You don't know at compile time which specific types of shapes the user will create. However, the application has to keep track of all the various types of shapes that are created, and it has to update them in response to user mouse actions. You can use polymorphism to solve this problem in two basic steps:


In C# to override a method, the method in the base class must be marked with the [virtual](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/virtual) keyword, and the method in the derived class must be marked with the [override](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/override) keyword. Additionally, the method signature (name, return type, and parameters) in the derived class must exactly match the method signature in the base class.

##### `virtual` and `override`

In C#, the [virtual](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/virtual) keyword / modifier is used to modify a `method`, `property`, `indexer`, or `event` declaration and allow for it to be overridden in a derived class.

```csharp{3-4,5,9}
using System;

class Shape
{
    // overridden Draw() method
    public virtual void Draw()
    {
        Console.WriteLine("Drawing a shape.");
    }
}
```

In C#, the [override](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/override) keyword / modifier is required to `extend or modify` the `abstract or virtual` implementation of an inherited `method`, `property`, `indexer`, or `event`

```csharp{3-4,5,9}
using System;

class Circle : Shape
{
    //overriding Draw() method
    public override void Draw()
    {
        Console.WriteLine("Drawing a circle.");
    }
}
```

```csharp{3-50}
Use System;

class myProgram
{
    public static void Main()
    {
        // obj1 is the object of the Polygon class
        Shape obj1 = new Shape();

        // calls render() method of Polygon Superclass
        obj1.Draw();

        // here, obj1 is the object of the derived class Square
        obj1 = new Circle();

        // calls render() method of derived class Square
        obj1.Draw();
    }
}
//////
// Drawing a shape.
// Drawing a circle.
```

In the above example, we have created a superclass: `Shape`, and a subclass: `Circle`.

You'll see that we've used the terms `virtual` and `override` in conjunction with methods from the `base` class and `derived` classes, respectively. Here,
- `virtual` - enables the derived class to override the method.
- `Override` - the word "override" denotes that a method is replacing one from the base class.

This is how method overriding in C# is accomplished.


✏️ `Method overriding rules ❓`

With prev example in focus, method with _same name_ and _same method signture_

- **Same method name**

    Overridden method(s) must have same name within base and sub type

- **Is-A relation**

    Overriding allowes objects of derived class to be treated as objects of the base class. Hence, overriding possible iff IS-A relation exists between types

- **# & Type of parameter(s)**

    Overloaded method(s) must have same # and types of parameter(s).

- **Return Type**

    Return type should be covariant, i.e. an overriding method can also return sub type of the type returned by the overridden method.

- **Access Modifiers**

    The access level of the overriding method cannot be more restrictive than the overridden method. It can be the same or more permissive

- **Method Resolution**

    The appropriate method to invoke is determined at runtime based on the actual type of the object, supporting dynamic method resolution. At run time, objects of a derived class may be treated as objects of a base class in places such as method parameters and collections or arrays. When this polymorphism occurs, the object's declared type is no longer identical to its run-time type

```csharp{21}
class Product
{
    public virtual string GetName()
    {
       return "Product";    
    }
}

class Toy : Product
{
    public override string GetName()
    {
       return "Toy";    
    }
}

class Program
{
    public static void Main(string[] args)
    {
        Product toy = new Toy(); // <- object
        Console.WriteLine(toy.GetName());
    }
}
//////
// Toy
```

##### `base`

in c#, member of base class can be access in an overridden method using [base](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/base)

```csharp{14-15, 18, 20}
class Product
{
    public void Write(string text)
    {
        Console.WriteLine(text);
    }

    public virtual void PrintName()
    {
       Write("Product");    
    }
}

class Toy:Product
{
    public override void PrintName()
    {
       base.Write("Product");   
    }
}

class Program
{
    public static void Main(string[] args)
    {
        Product toy = new Toy(); // <- object
        Console.WriteLine(toy.PrintName());
    }
}

//////
// Toy
```
##### `sealed`

method overriding can be prevented, by declaring method as [sealed](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/sealed)


## Advantages of Polymorphism

- Polymorphism in C# **allows objects of different types to be treated uniformly, simplifying code, promoting flexibility, and enabling efficient use of inheritance**.
- It enhances code *readability* and *maintainability*, enabling developers to create more *extensible and adaptable* software.
- Polymorphism allows us to create consistent code. To render a circle in the previous example, we may alternatively build a different function called DrawCircle().
- This will function flawlessly. We must develop unique methods for every shape, though. As a result, our code will become erratic.
- To fix this, we can use polymorphism in C# allow to construct a single function called Draw() that will respond differently depending on the shape.





