---
title: "Polymorphism"
slug: "09_dotnet/0_c/0_fundamentals/5_object-oriented_programming/3_polymorphism"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Polymorphism - Many-Shaped Behavior</summary>
  <div>

## Polymorphism

**Real-life analogy**: Polymorphism is like having multiple specialists who can perform the same task in different ways. A drawing application has shapes (Circle, Rectangle, Triangle) that all can be drawn. The base class Shape defines virtual Draw method. Each derived class overrides Draw with its own implementation. When you call Draw on a Shape object, the appropriate implementation executes based on the actual object type (Circle draws circle, Rectangle draws rectangle). This enables working with groups of related objects uniformly - treat all shapes as Shape, but each draws itself correctly.

**Technical explanation**: Polymorphism is third pillar of OOP after encapsulation and inheritance. Greek word meaning "many-shaped" with two distinct aspects. At run time, objects of derived class can be treated as objects of base class in method parameters, collections, arrays. Object's declared type no longer identical to run-time type. Base classes might define and implement virtual methods, derived classes can override them. At run time, CLR looks up run-time type of object, invokes override of virtual method. Can call method on base class, cause derived class's version to execute. Virtual methods enable working with groups of related objects uniformly.

**Key jargon explained**:
- **Polymorphism**: Many-shaped - derived classes override base behavior
- **Virtual Method**: Can be overridden in derived class
- **Override**: Provide new implementation in derived class
- **Run-Time Type**: Actual type of object at execution
- **Declared Type**: Type variable is declared as

```csharp:title:Polymorphism.cs
public class Shape
{
    public virtual void Draw()
    {
        Console.WriteLine("Performing base class drawing tasks");
    }
}

public class Circle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a circle");
        base.Draw();
    }
}

public class Rectangle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a rectangle");
        base.Draw();
    }
}

List<Shape> shapes = [new Rectangle(), new Circle()];

foreach (var shape in shapes)
{
    shape.Draw(); // Calls appropriate override
}
```

**How it works in practice**: At run time, derived class objects treated as base class objects. Declared type differs from run-time type. Base class defines virtual method, derived class overrides. CLR looks up run-time type, invokes override. Can call method on base class reference, derived class version executes. Enables working with groups of related objects uniformly. Create class hierarchy with common base class. Use virtual method to invoke appropriate method on any derived class through single call to base class method. Every type in C# polymorphic because all types inherit from Object.

**Key takeaways for interviews**:
- Polymorphism: derived classes override base behavior
- At run time, derived objects treated as base objects
- Virtual methods enable uniform handling of related objects
- CLR looks up run-time type, invokes override
- Every type in C# polymorphic (inherits from Object)

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Virtual Members and Hiding - Method Behavior</summary>
  <div>

## Virtual Members and Hiding Base Class Members

**Real-life analogy**: Virtual members are like customizable procedures. Base class provides default implementation (virtual), derived class can override with custom implementation. Derived class can also inherit base implementation without overriding, preserving existing behavior. Hiding is like creating a new procedure with same name - derived class defines new member with same name as base class, hiding base implementation. Override participates in virtual invocation, hiding does not. Understanding distinction crucial for correct method behavior.

**Technical explanation**: When derived class inherits from base class, includes all base class members. Virtual methods give designer different choices for derived class behavior: override virtual members defining new behavior, inherit closest base class method without overriding, define new non-virtual implementation hiding base class implementations. Derived class can override base class member only if base class member declared as virtual or abstract. Derived member must use override keyword to explicitly indicate method intended to participate in virtual invocation. Fields can't be virtual - only methods, properties, events, indexers. When derived class overrides virtual member, member called even when instance accessed as base class instance.

**Key jargon explained**:
- **Override**: Participate in virtual invocation
- **Inherit**: Use base class implementation
- **Hide**: Create new member with same name
- **Virtual**: Can be overridden
- **new Keyword**: Hide base class member

```csharp:title:Override.cs
public class BaseClass
{
    public virtual void DoWork() { }
}

public class DerivedClass : BaseClass
{
    public override void DoWork() { }
}

DerivedClass B = new();
B.DoWork();  // Calls new method.

BaseClass A = B;
A.DoWork();  // Also calls new method.
```

```csharp:title:Hiding.cs
public class BaseClass
{
    public void DoWork() { }
}

public class DerivedClass : BaseClass
{
    public new void DoWork() { }
}
```

**How it works in practice**: Virtual members: derived class can override, inherit, or hide. Override keyword explicitly indicates participation in virtual invocation. Fields can't be virtual. When override, member called even when accessed as base class instance. Hiding with new keyword creates new member with same name. Hiding doesn't participate in virtual invocation. Use override when want to participate in polymorphism. Use new when want to hide base member but not participate in virtual invocation. Virtual methods enable extending base class without using base class implementation.

**Key takeaways for interviews**:
- Override: participate in virtual invocation
- Inherit: use base class implementation
- Hide: create new member with new keyword
- Fields can't be virtual
- Override called even when accessed as base class

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

**Real-life analogy**: Interview preparation for polymorphism is like understanding specialized procedures. You need to understand virtual methods, overriding, and method behavior.

**Common interview questions**:
1. **What is polymorphism in C#?**
   - Third pillar of OOP after encapsulation and inheritance
   - Derived classes override base class behavior
   - At run time, derived objects treated as base objects
   - CLR looks up run-time type, invokes override
   - Every type in C# polymorphic (inherits from Object)

2. **How do virtual methods work?**
   - Base class defines virtual method
   - Derived class can override with own implementation
   - CLR looks up run-time type, invokes override
   - Can call method on base class, derived version executes
   - Enables uniform handling of related objects

3. **What is the difference between override and hide?**
   - Override: participates in virtual invocation
   - Hide: creates new member with same name
   - Override uses override keyword
   - Hide uses new keyword
   - Override called even when accessed as base class

4. **Can fields be virtual?**
   - No, fields can't be virtual
   - Only methods, properties, events, indexers can be virtual
   - Fields are data, not behavior
   - Virtual applies to behavior that can be overridden
   - Use properties for virtual field-like behavior

5. **What are the choices for derived class behavior?**
   - Override virtual members defining new behavior
   - Inherit closest base class method without overriding
   - Define new non-virtual implementation hiding base
   - Must use override keyword to participate in virtual invocation
   - Can only override if base member is virtual or abstract

**Key interview concepts**:
- **Polymorphism**: Many-shaped behavior
- **Virtual Methods**: Can be overridden
- **Override**: Participate in virtual invocation
- **Hide**: Create new member with new keyword
- **Run-Time Type**: Actual type at execution

**How to approach interview questions**:
- Start with polymorphism definition
- Explain virtual methods and overriding
- Discuss override vs hide
- Address whether fields can be virtual
- Mention choices for derived class behavior

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Polymorphism - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/polymorphism)