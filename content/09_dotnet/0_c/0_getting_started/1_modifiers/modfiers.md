---
title: "Access Modifiers"
slug: "09_dotnet/0_c/0_getting_started/1_modifiers"
stack: "C#.NET"
---

```markdown markmap
- 🛣️
    - abstract
    - abstract
    - aysnc
    - const
    - event
    - extern
    - in (generic modifier)
    - new (generic modifier)
    - out (generic modifier)
    - override
    - readonly
    - sealed
    - static
    - unsafe
    - virtual
    - volatile
    - Access Modifiers
        - public
        - private
        - protected
        - internal
        - protected internal
        - private protected
        - file (C# 11+)
```
<br />

Each member of a class has an associated accessibility, which controls the regions of program text that can access the member. There are six possible forms of accessibility. The access modifiers are summarized below.

## `abstract`

- The `abstract` modifier can be used with _classes_, _methods_, _properties_, _indexers_, and _events_.
- The `abstract` modifier indicates that the thing being modified has a missing or incomplete implementation. 
- Use the `abstract` modifier in a class declaration to indicate that a class is intended only to be a base class of other classes, not instantiated on its own. 
- Members marked as abstract must be implemented by non-abstract classes that derive from the abstract class.


### Example 1
In this example, the class `Square` must provide an implementation of `GetArea` because it derives from `Shape`:
```csharp
abstract class Shape
{
    public abstract int GetArea();
}

class Square : Shape
{
    private int _side;

    public Square(int n) => _side = n;

    // GetArea method is required to avoid a compile-time error.
    public override int GetArea() => _side * _side;

    static void Main()
    {
        var sq = new Square(12);
        Console.WriteLine($"Area of the square = {sq.GetArea()}");
    }
}
// Output: Area of the square = 144
```

`Abstract classes` have the following features:

1. An abstract class _cannot be instantiated_.
2. An abstract class _may contain abstract methods and accessors_.
3. It is _not possible to modify an abstract class with the [sealed](#sealed) modifier_ because the two modifiers have opposite meanings. The _`sealed` modifier prevents a class from being inherited and the `abstract` modifier requires a class to be inherited_.
4. A non-abstract class derived from an abstract class must include actual implementations of all inherited abstract methods and accessors.

5. An abstract class _must provide implementation for all interface members_.

An abstract class that implements an interface might map the interface methods onto abstract methods.For eg:

```csharp
interface I
{
    void M();
}

abstract class C : I
{
    public abstract void M();
}
```

✏️: Use the `abstract` modifier in a method or property declaration to indicate that the method or property does not contain implementation.

`Abstract methods` have the following features:

1. An abstract method is _implicitly a virtual method_.
2. Abstract method _declarations are only permitted in abstract classes_.
3. Because an abstract method _declaration provides no actual implementation_, there is no method body; the method declaration simply ends with a semicolon and there are no curly braces ({ }) following the signature. For eg:

```csharp
public abstract void MyMethod();  
```
4. The _implementation is provided by a method override_, which is a member of a non-abstract class.
5. It is an _error to use the static or virtual modifiers_ in an abstract method declaration.
6. Abstract properties behave like abstract methods, except for the differences in declaration and invocation syntax.
7. It is an error to use the `abstract` modifier on a static property.
8. An abstract inherited _property can be overridden in a derived class by including a property declaration that uses the override modifier_.

For more information about abstract classes, see [Abstract and Sealed Classes and Class Members](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/abstract-and-sealed-classes-and-class-members).



#### Example 2
In this example, the class `DerivedClass` is derived from an abstract class `BaseClass`. The abstract class contains an abstract method, `AbstractMethod`, and two abstract properties, `X` and `Y`.

```csharp
// Abstract class
abstract class BaseClass
{
    protected int _x = 100;
    protected int _y = 150;

    // Abstract method
    public abstract void AbstractMethod();

    // Abstract properties
    public abstract int X { get; }
    public abstract int Y { get; }
}

class DerivedClass : BaseClass
{
    public override void AbstractMethod()
    {
        _x++;
        _y++;
    }

    public override int X   // overriding property
    {
        get
        {
            return _x + 10;
        }
    }

    public override int Y   // overriding property
    {
        get
        {
            return _y + 10;
        }
    }

    static void Main()
    {
        var o = new DerivedClass();
        o.AbstractMethod();
        Console.WriteLine($"x = {o.X}, y = {o.Y}");
    }
}
// Output: x = 111, y = 161
```
In the preceding example, if you attempt to instantiate the abstract class by using a statement like this:

```csharp
BaseClass bc = new BaseClass();   // Error  
```
You will get an error saying that the compiler cannot create an instance of the abstract class 'BaseClass'.

## `aysnc`
## `const`
## `event`
## `extern`
## `in` (generic modifier)
## `new` (generic modifier)
## `out` (generic modifier)
## `override`
## `readonly`
## `sealed`
## `static`
## `unsafe`
## `virtual`
## `volatile`