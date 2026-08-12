---
title: "Interfaces"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/4_interfaces"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Interfaces - Contracts for Behavior</summary>
  <div>

## Interfaces - Define Behavior for Multiple Types

**Real-life analogy**: Interfaces are like service contracts that different vendors can sign. The contract specifies what services must be provided (methods, properties), but doesn't dictate how they're implemented. Multiple vendors can implement the same contract, and clients can use any vendor's implementation as long as it meets the contract. Interfaces provide the same model - define contracts that classes or structs must implement, enabling multiple types to share behavior without requiring a common base class.

**Technical explanation**: Interface defines contract: group of related methods, properties, events, indexers that class or struct must implement. Interfaces let single type implement multiple contracts (C# doesn't support multiple inheritance of classes). Structs can't inherit from other structs or classes, so interfaces only way to add shared behavior across struct types. Interface names begin with capital I by convention. Members public by default. Can't contain instance fields, instance constructors, or finalizers. Class or struct lists interfaces after colon in declaration, must provide implementation for every member.

**Key jargon explained**:
- **Interface**: Contract defining required members
- **Implementation**: Class or struct providing member implementations
- **Multiple Interfaces**: Single type can implement multiple contracts
- **Explicit Implementation**: Member qualified with interface name
- **Interface Inheritance**: Interfaces can inherit from other interfaces

```csharp:title=InterfaceDeclaration.cs
interface ILogger
{
    void Log(string message);
    string Name { get; }
}

public class ConsoleLogger : ILogger
{
    public string Name => "Console";

    public void Log(string message) =>
        Console.WriteLine($"[{Name}] {message}");
}
```

**How it works in practice**: Define interface with interface keyword. Class or struct implements interfaces after colon. Must provide implementation for every member. Can implement multiple interfaces (separated by commas). Explicit implementation qualifies member with interface name, only accessible through interface type. Interfaces can inherit from other interfaces. Use when type needs to fulfill contract across unrelated hierarchies or implement multiple contracts. Can't declare instance fields or constructors.

**Key takeaways for interviews**:
- Interfaces define contracts for behavior
- Classes and structs implement interfaces
- Single type can implement multiple interfaces
- Explicit implementation hides from class public API
- Interfaces can inherit from other interfaces

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Interfaces vs Abstract Classes - Contract vs Implementation</summary>
  <div>

## Interfaces vs. Abstract Classes

**Real-life analogy**: Interfaces are like service specifications (what must be provided), while abstract classes are like partial implementations (what is provided and what must be implemented). Specifications define requirements without implementation details. Partial implementations provide some functionality while requiring subclasses to complete the rest. Interfaces define capabilities, abstract classes provide shared state and base implementation.

**Technical explanation**: Both interfaces and abstract classes define contracts derived types must fulfill. Use abstract class when related types share state (fields), constructors, or non-public members. Abstract classes let you evolve hierarchy by adding new members with default behavior without breaking existing derived types. Use interface when type needs to fulfill contract across unrelated hierarchies or implement multiple contracts. Interfaces can't declare instance fields or constructors, best suited for adding capabilities to types that already have base class. Class can inherit from only one base class but can implement multiple interfaces.

**Key jargon explained**:
- **Abstract Class**: Can have state, constructors, non-public members
- **Interface**: Can't have instance fields or constructors
- **Multiple Inheritance**: Classes can implement multiple interfaces
- **Default Members**: Interfaces support default implementations
- **Evolution**: Abstract classes easier to evolve with new members

```csharp:title=AbstractClass.cs
public abstract class Shape
{
    public abstract double Area { get; }
    public abstract void Draw();
}

public class Circle(double radius) : Shape
{
    public override double Area => Math.PI * radius * radius;
    public override void Draw() => Console.WriteLine($"Drawing circle with area {Area:F2}");
}
```

**How it works in practice**: Abstract classes can have state (fields), constructors, non-public members. Enable evolving hierarchy by adding new members with default behavior. Interfaces define capabilities across unrelated hierarchies. Can't declare instance fields or constructors. Class can inherit from only one base class but implement multiple interfaces. That distinction makes interfaces better for capabilities across type hierarchies. Interfaces support default member implementations and static abstract members for advanced scenarios.

**Key takeaways for interviews**:
- Abstract classes: share state, constructors, non-public members
- Interfaces: capabilities across unrelated hierarchies
- Classes: single base class, multiple interfaces
- Abstract classes: easier to evolve with new members
- Interfaces: can't have instance fields or constructors

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

**Real-life analogy**: Interview preparation for interface concepts is like understanding contract specifications. You need to understand when to use specifications vs partial implementations, how to implement contracts, and how to handle multiple requirements.

**Common interview questions**:
1. **What is an interface in C#?**
   - Defines contract: methods, properties, events, indexers
   - Class or struct must implement all members
   - Enables multiple types to share behavior
   - Single type can implement multiple interfaces
   - Names begin with capital I by convention

2. **What is explicit interface implementation?**
   - Member qualified with interface name
   - Only accessible through interface type
   - Useful when two interfaces have same member name
   - Keeps class public surface clean
   - Required when interface uses internal types

3. **What is the difference between interfaces and abstract classes?**
   - Abstract classes: can have state, constructors, non-public members
   - Interfaces: can't have instance fields or constructors
   - Classes: single base class, multiple interfaces
   - Abstract classes: easier to evolve with new members
   - Interfaces: capabilities across unrelated hierarchies

4. **When should you use an interface vs an abstract class?**
   - Interface: contract across unrelated hierarchies
   - Interface: need to implement multiple contracts
   - Abstract class: related types share state or constructors
   - Abstract class: need non-public members
   - Abstract class: want to evolve hierarchy with new members

5. **Can interfaces inherit from other interfaces?**
   - Yes, interfaces can inherit from one or more other interfaces
   - Class implementing derived interface must implement all members
   - Must implement members from derived and base interfaces
   - Enables interface composition and specialization
   - Class can be implicitly converted to base interface

**Key interview concepts**:
- **Interface Contract**: Defines required members
- **Explicit Implementation**: Qualified with interface name
- **Multiple Interfaces**: Single type implements multiple contracts
- **Abstract Class**: Shared state and base implementation
- **Interface Inheritance**: Interfaces can inherit from other interfaces

**How to approach interview questions**:
- Start with interface definition and purpose
- Explain explicit implementation and use cases
- Discuss interface vs abstract class differences
- Address when to use each approach
- Mention interface inheritance and composition

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Interfaces - define behavior for multiple types - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/interfaces)