---
title: "Access Modifiers"
slug: "09_dotnet/0_c/0_getting_started/1_modifiers/0_access_modifiers"
stack: "C#.NET"
---

```markdown markmap
- 🛣️
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

### public

> Access isn't limited.

- The `public` keyword is an _types' and type members' access modifier_.
- Public access is the most permissive access level. There are no restrictions on accessing public members, as in this example:

```csharp{5-6, 14-17}
using System;

class PointTest
{
    public int x;
    public int y;
}

class Program
{
    static void Main()
    {
        var p = new PointTest();
        // Direct access to public members.
        p.x = 10;
        p.y = 15;
        Console.WriteLine($"x = {p.x}, y = {p.y}");
    }
}
// Output: x = 10, y = 15
```

✏️: If you change the `public` access level to `private` or `protected`, you will get the error message: 'PointTest.y' is inaccessible due to its protection level.

### private

> Access is limited to this class.

- The `private` keyword is a _type member access modifier_.
- Private access is the least permissive access level. Private members are accessible only within the body of the class or the struct in which they are declared, as in this example:

```csharp{5,6, 25-28, 30-31, 33-34}
using System;

class Employee2
{
    private readonly string _name = "FirstName, LastName";
    private readonly double _salary = 100.0;

    public string GetName()
    {
        return _name;
    }

    public double Salary
    {
        get { return _salary; }
    }
}

class PrivateTest
{
    static void Main()
    {
        var e = new Employee2();

        // The data members are inaccessible (private), so
        // they can't be accessed like this:
        //    string n = e._name;
        //    double s = e._salary;

        // '_name' is indirectly accessed via public method:
        string n = e.GetName();

        // '_salary' is indirectly accessed via public property
        double s = e.Salary;
    }
}
```

- Nested types in the same body can also access those private members.
- It is a compile-time error to reference a private member outside the class or the struct in which it is declared.

### protected

> Access is limited to this class or classes derived from this class.

```csharp{5, 8, 15-17, 19-20}
using System;

class A
{
    protected int x = 123;
}

class B : A
{
    static void Main()
    {
        var a = new A();
        var b = new B();

        // Error CS1540, because x can only be accessed by
        // classes derived from A.
        // a.x = 10;

        // OK, because this class derives from A.
        b.x = 10;
    }
}
```

### internal

> Access is limited to the current assembly (.exe or .dll).

- Internal types or members are accessible only within files in the same assembly:

e.g. 1 contains two files, Assembly1.cs and Assembly1_a.cs. The first file contains an internal base class, BaseClass. In the second file, an attempt to instantiate BaseClass will produce an error.

```csharp {3-4}
// Assembly1.cs
// Compile with: /target:library
internal class BaseClass
{
   public static int intM = 0;
}
```

```csharp
// Assembly1_a.cs
// Compile with: /reference:Assembly1.dll
class TestAccess
{
   static void Main()
   {
      var myBase = new BaseClass();   // CS0122
   }
}
```

e.g. 2 use the same files you used in example 1, and change the accessibility level of `BaseClass` to `public`. Also change the accessibility level of the member `intM` to `internal`. In this case, you can instantiate the class, but you cannot access the internal member..

```csharp {3-4}
// Assembly1.cs
// Compile with: /target:library
public class BaseClass
{
   internal static int intM = 0;
}
```

```csharp
// Assembly1_a.cs
// Compile with: /reference:Assembly1.dll
class TestAccess
{
   static void Main()
   {
      var myBase = new BaseClass();   // Ok
      myBase.intM = 444; //CS0117
   }
}
```

### protected internal

> Access is limited to this class, classes derived from this class, or classes within the same assembly.

- The `protected internal` keyword combination is a member access modifier.
- A protected internal member is accessible from the current assembly or from types that are derived from the containing class.

A protected internal member of a base class is accessible from any type within its containing assembly. It is also accessible in a derived class located in another assembly only if the access occurs through a variable of the derived class type.

This example contains two files, `Assembly1.cs` and `Assembly2.cs`

```csharp{5, 12-13}
// Assembly1.cs
// Compile with: /target:library
public class BaseClass
{
   protected internal int myValue = 0;
}

class TestAccess
{
    void Access()
    {
        var baseObject = new BaseClass();
        baseObject.myValue = 5; //Ok
    }
}
```

The first file contains a public base class, `BaseClass`, and another class, `TestAccess`. `BaseClass` owns a protected internal member, `myValue`, which is accessed by the `TestAccess` type

```csharp{10-12, 14-15}
// Assembly2.cs
// Compile with: /reference:Assembly1.dll
class DerivedClass : BaseClass
{
    static void Main()
    {
        var baseObject = new BaseClass();
        var derivedObject = new DerivedClass();

        // Error CS1540, because myValue can only be accessed by
        // classes derived from BaseClass.
        // baseObject.myValue = 10;

        // OK, because this class derives from BaseClass.
        derivedObject.myValue = 10;
    }
}
```

In the second file, an attempt to access `myValue` through an instance of `BaseClass` will produce an error, while an access to this member through an instance of a derived class, `DerivedClass` will succeed.

✏️: Struct members cannot be protected internal because the struct cannot be inherited.

**Overriding protected internal members**

When overriding a virtual member, the accessibility modifier of the overridden method depends on the assembly where the derived class is defined.

- When the derived class is defined in the same assembly as the base class, all overridden members have `protected internal` access.

```csharp{5, 14}
// Assembly1.cs
// Compile with: /target:library
public class BaseClass
{
    protected internal virtual int GetExampleValue()
    {
        return 5;
    }
}

public class DerivedClassSameAssembly : BaseClass
{
    // Override to return a different example value, accessibility modifiers remain the same.
    protected internal override int GetExampleValue()
    {
        return 9;
    }
}
```

- If the derived class is defined in a different assembly from the base class, overridden members have `protected` access.

```csharp{5-8}
// Assembly2.cs
// Compile with: /reference:Assembly1.dll
class DerivedClassDifferentAssembly : BaseClass
{
    // Override to return a different example value, since this override
    // method is defined in another assembly, the accessibility modifiers
    // are only protected, instead of protected internal.
    protected override int GetExampleValue()
    {
        return 2;
    }
}
```

### private protected

> Access is limited to this class or classes derived from this type within the same assembly.

- The `private protected` keyword combination is a member access modifier. A private protected member is accessible by types derived from the containing class, but only within its containing assembly

- A private protected member of a base class is accessible from derived types in its containing assembly only if the static type of the variable is the derived class type.

This example contains two files, Assembly1.cs and Assembly2.cs:

```csharp{3-6,8, 12, 14-16, 18-19}
// Assembly1.cs
// Compile with: /target:library
public class BaseClass
{
    private protected int myValue = 0;
}

public class DerivedClass1 : BaseClass
{
    void Access()
    {
        var baseObject = new BaseClass();

        // Error CS1540, because myValue can only be accessed by
        // classes derived from BaseClass.
        // baseObject.myValue = 5;

        // OK, accessed through the current derived class instance
        myValue = 5;
    }
}
```

- The first file contains a public base class, `BaseClass`, and a type derived from it, `DerivedClass1`.
- BaseClass owns a `private protected` member, `myValue`, which `DerivedClass1` tries to access in two ways.
- The first attempt to access myValue through an instance of `BaseClass` will produce an error.
- However, the attempt to use it as an inherited member in `DerivedClass1` will succeed.

```csharp
// Assembly2.cs
// Compile with: /reference:Assembly1.dll
class DerivedClass2 : BaseClass
{
    void Access()
    {
        // Error CS0122, because myValue can only be
        // accessed by types in Assembly1
        // myValue = 10;
    }
}
```

In the second file, an attempt to access `myValue` as an inherited member of `DerivedClass2` will produce an error, as it is only accessible by derived types in Assembly1.

If Assembly1.cs contains an `InternalsVisibleToAttribute` that names Assembly2, the derived class DerivedClass2 will have access to `private protected` members declared in `BaseClass`.

✏️: `InternalsVisibleTo` makes private protected members visible to derived classes in other assemblies.

### file (C# 11+)

> the file contextual keyword is a type modifier

- The `file` modifier restricts a top-level type's scope and visibility to the file in which it's declared.
- The `file` modifier will generally be applied to types written by a source generator.
- File-local types provide source generators with a convenient way to avoid name collisions among generated types.

Any types nested within a file-local type are also only visible within the file in which it's declared. Other types in an assembly may use the same name as a file-local type. Because the file-local type is visible only in the file where it's declared, these types don't create a naming collision.

A file-local type can't be the return type or parameter type of any member that is more visible than file scope. A file-local type can't be a field member of a type that has greater visibility than file scope. However, a more visible type may implicitly implement a file-local interface type. The type can also explicitly implement a file-local interface but explicit implementations can only be used within the file scope.

The `file` modifier declares a file-local type, as in this example:

```csharp{1-2, 7, 16-17}
// In File1.cs:
file interface IWidget
{
    int ProvideAnswer();
}

file class HiddenWidget
{
    public int Work() => 42;
}

public class Widget : IWidget
{
    public int ProvideAnswer()
    {
        var worker = new HiddenWidget();
        return worker.Work();
    }
}
```

In another source file, you can declare types that have the same names as the file-local types. The file-local types aren't visible:

```csharp{2-4}
// In File2.cs:
// Doesn't conflict with HiddenWidget
// declared in File1.cs
public class HiddenWidget
{
    public void RunTask()
    {
        // omitted
    }
}
```

**Accessibility Levels**

| Declared accessibility | Meaning                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| public                 | Access is not restricted.                                                                                         |
| protected              | Access is limited to the containing class or types derived from the containing class.                             |
| internal               | Access is limited to the current assembly.                                                                        |
| protected internal     | Access is limited to the current assembly or types derived from the containing class.                             |
| private                | Access is limited to the containing type.                                                                         |
| private protected      | Access is limited to the containing class or types derived from the containing class within the current assembly. |

**Default Access**

| Members of | Default member accessibility |
| ---------- | ---------------------------- |
| enum       | public                       |
| class      | private                      |
| interface  | public                       |
| struct     | private                      |

**Restrictions on using accessibility levels**

| Context      | Remarks                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| Classes      | The direct base class of a class type must be at least as accessible as the class type itself.                     |
| Interfaces   | The explicit base interfaces of an interface type must be at least as accessible as the interface type itself.     |
| Delegates    | The return type and parameter types of a delegate type must be at least as accessible as the delegate type itself. |
| Constants    | The type of a constant must be at least as accessible as the constant itself.                                      |
| Fields       | The type of a field must be at least as accessible as the field itself.                                            |
| Methods      | The return type and parameter types of a method must be at least as accessible as the method itself.               |
| Properties   | The type of a property must be at least as accessible as the property itself.                                      |
| Events       | The type of an event must be at least as accessible as the event itself.                                           |
| Indexers     | The type and parameter types of an indexer must be at least as accessible as the indexer itself.                   |
| Operators    | The return type and parameter types of an operator must be at least as accessible as the operator itself.          |
| Constructors | The parameter types of a constructor must be at least as accessible as the constructor itself.                     |
