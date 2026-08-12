---
title: "Object-Oriented Programming"
slug: "09_dotnet/0_c/0_fundamentals/5_object-oriented_programming"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Object-Oriented Programming Overview - OOP Principles</summary>
  <div>

## Classes, Structs, and Records

**Real-life analogy**: Object-oriented programming is like organizing a company with departments (classes), specialized teams (structs), and data templates (records). Encapsulation is like having private offices - only authorized personnel can access certain areas. Inheritance is like organizational hierarchy - departments inherit policies from headquarters. Polymorphism is like having multiple specialists who can perform the same task in different ways. These principles enable building maintainable, scalable software by modeling real-world entities as objects with behavior and data.

**Technical explanation**: Type definition (class, struct, record) is blueprint specifying what type can do. Object is block of memory allocated and configured according to blueprint. Encapsulation is first pillar of OOP - limit accessibility of members to prevent errors. Members include methods, fields, constants, properties, events. Accessibility modifiers (public, protected, internal, private, protected internal, private protected) control access. Classes support inheritance (not structs). Classes can be abstract (can't instantiate directly) or sealed (prevent inheritance). Types can implement multiple interfaces. Generic types use type parameters for type safety. Static classes contain only static members, can't be instantiated. Records provide value equality for reference types.

**Key jargon explained**:
- **Encapsulation**: Limit member accessibility
- **Inheritance**: Derived class inherits base class members
- **Polymorphism**: Many-shaped - derived classes override base behavior
- **Members**: Methods, fields, properties, events
- **Records**: Value equality for reference types

```csharp:title:Example.cs
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public void Greet()
    {
        Console.WriteLine($"Hello, I'm {Name}");
    }
}

Person person = new Person { Name = "Alice", Age = 30 };
person.Greet();
```

**How it works in practice**: Class/struct/record definition is blueprint. Object is instance allocated from blueprint. Encapsulation hides implementation details, exposes public API. Accessibility modifiers control member access. Inheritance enables code reuse - derived class inherits base class members (except constructors/finalizers). Abstract classes can't be instantiated, used as base classes. Sealed classes prevent inheritance. Interfaces define contracts for multiple implementation. Generic types provide type safety with type parameters. Static classes contain only static members. Records provide value equality and immutable properties.

**Key takeaways for interviews**:
- Encapsulation: limit member accessibility
- Inheritance: derived class inherits base members
- Polymorphism: derived classes override base behavior
- Classes: reference types, support inheritance
- Structs: value types, no inheritance
- Records: value equality for reference types

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

**Real-life analogy**: Interview preparation for OOP is like understanding organizational principles. You need to understand encapsulation, inheritance, polymorphism, and how they work together.

**Common interview questions**:
1. **What are the three pillars of object-oriented programming?**
   - Encapsulation: limit member accessibility
   - Inheritance: derived class inherits base members
   - Polymorphism: derived classes override base behavior
   - Together enable maintainable, scalable software
   - Model real-world entities as objects

2. **What is encapsulation in C#?**
   - Limit accessibility of type members
   - Hide implementation details, expose public API
   - Prevent coding errors and malicious exploits
   - Accessibility modifiers: public, protected, internal, private
   - Default accessibility is private

3. **What is inheritance in C#?**
   - Derived class inherits base class members
   - Classes support inheritance, structs don't
   - Inheritance is transitive (A→B→C, C inherits from A and B)
   - Derived class excludes constructors and finalizers
   - Can add more members to extend functionality

4. **What is the difference between abstract and sealed classes?**
   - Abstract: can't instantiate directly, used as base class
   - Sealed: prevent other classes from inheriting
   - Abstract classes can have abstract methods (no implementation)
   - Sealed classes can't be inherited from
   - Use abstract for base classes, sealed for final implementations

5. **What are records in C#?**
   - Reference types with value equality
   - Concise syntax for immutable properties
   - Compiler generates Equals, GetHashCode, ==, !=
   - with expression for nondestructive mutation
   - Built-in ToString formatting

**Key interview concepts**:
- **Encapsulation**: Member accessibility
- **Inheritance**: Code reuse through hierarchy
- **Polymorphism**: Override base behavior
- **Classes vs Structs**: Reference vs value types
- **Records**: Value equality for reference types

**How to approach interview questions**:
- Start with three pillars of OOP
- Explain encapsulation and accessibility
- Discuss inheritance and transitivity
- Address abstract vs sealed classes
- Mention records and value equality

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Classes, structs, and records - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/)