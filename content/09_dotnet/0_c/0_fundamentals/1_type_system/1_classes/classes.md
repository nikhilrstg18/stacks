---
title: "Classes"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/1_classes"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Classes - Reference Types with Behavior</summary>
  <div>

## C# Classes

**Real-life analogy**: Classes are like blueprints for manufacturing products. The blueprint defines the structure and capabilities (properties, methods), but isn't the product itself. When you manufacture products (create instances) from the blueprint, each product is an independent object. However, if you share a product reference with someone, both refer to the same physical item. Classes provide the same model - blueprints for objects, reference semantics for sharing, and support for inheritance and specialization.

**Technical explanation**: Class is reference type defining blueprint for objects. Variable holds reference to object on managed heap, not object data itself. Assigning class variable to another copies reference, both variables point to same object. Classes most common way to define custom types. Use when need complex behavior, inheritance, or shared identity between references. Class body contains fields, properties, methods, events (class members). Name must be valid C# identifier name. Default access modifier internal, specify public for external access.

**Key jargon explained**:
- **Reference Type**: Holds reference to object on heap
- **Managed Heap**: Memory area for reference type objects
- **Instance**: Object created from class blueprint
- **Class Members**: Fields, properties, methods, events
- **Access Modifier**: Controls visibility (internal, public)

```csharp:title=ClassDeclaration.cs
public class Customer
{
    public string Name { get; set; }

    public Customer(string name) => Name = name;
}
```

```csharp:title=CreateObjects.cs
var customer = new Customer("Allison");
Console.WriteLine(customer.Name); // Allison

var c1 = new Customer("Grace");
var c2 = c1; // both variables reference the same object

c2.Name = "Hopper";
Console.WriteLine(c1.Name); // Hopper — c1 sees the change made through c2
```

**How it works in practice**: Define class with class keyword and type name. Create instance with new keyword. Variable holds reference to object. Assignment copies reference, both variables point to same object. Changes through one reference visible through other. Class body contains members (fields, properties, methods, events). Use classes for complex behavior, inheritance, shared identity. Support inheritance hierarchies. Structs can't participate in inheritance. Classes are reference types, structs are value types.

**Key takeaways for interviews**:
- Classes are reference types, hold references to objects
- Assignment copies reference, not data
- Changes through one reference visible through other
- Support inheritance and polymorphism
- Use for complex behavior, inheritance, shared identity

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Constructors and Initialization - Object Creation</summary>
  <div>

## Constructors and Initialization

**Real-life analogy**: Constructors are like product assembly instructions. When manufacturing a product, you need to set initial values for its components (capacity, dimensions, settings). Constructors provide these assembly instructions, ensuring objects are created in a valid state. Different approaches exist: default settings (field initializers), caller-provided values (constructor parameters), or required properties (object initializers). Each approach balances flexibility with safety.

**Technical explanation**: When creating instance, want fields and properties initialized to useful values. Approaches: field initializers set default value directly on field declaration. Constructor parameters require callers to provide values. Primary constructors (C# 12+) add parameters directly to class declaration, available throughout class body. Required properties enforce callers set specific properties through object initializer. Field initializers assign reasonable default. Constructor parameters require caller values. Primary constructors capture constructor arguments in fields. Required properties enforce initialization via object initializer.

**Key jargon explained**:
- **Field Initializers**: Default values on field declaration
- **Constructor Parameters**: Caller-provided initialization values
- **Primary Constructors**: Parameters in class declaration (C# 12+)
- **Required Properties**: Must be set via object initializer
- **Object Initializers**: Set properties when creating object

```csharp:title=FieldInitializers.cs
public class Container
{
    private int _capacity = 10;
}
```

```csharp:title=ConstructorParameters.cs
public class Container
{
    private int _capacity;

    public Container(int capacity) => _capacity = capacity;
}
```

```csharp:title=PrimaryConstructor.cs
public class Container(int capacity)
{
    private int _capacity = capacity;
}
```

```csharp:title=RequiredProperties.cs
public class Person
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}

var person = new Person { FirstName = "Grace", LastName = "Hopper" };
```

**How it works in practice**: Field initializers set default values directly on fields. Constructor parameters require callers provide values. Primary constructors (C# 12+) add parameters to class declaration, available throughout body. Field initializers can use primary constructor parameters. Required properties enforce callers set specific properties via object initializer. Compiler auto-initializes fields not explicitly set in constructor. Reduces boilerplate in constructors that only set few fields.

**Key takeaways for interviews**:
- Field initializers set default values
- Constructor parameters require caller values
- Primary constructors (C# 12+) parameters in class declaration
- Required properties enforce initialization via object initializer
- Compiler auto-initializes unspecified fields

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

**Real-life analogy**: Interview preparation for class concepts is like understanding manufacturing processes. You need to understand blueprints, assembly instructions, quality standards, and when to use different manufacturing approaches.

**Common interview questions**:
1. **What is a class in C#?**
   - Reference type defining blueprint for objects
   - Variable holds reference to object on managed heap
   - Assignment copies reference, both variables point to same object
   - Most common way to define custom types
   - Support inheritance and polymorphism

2. **When should you use a class vs a struct?**
   - Class: complex behavior, inheritance, shared identity
   - Class: large or long-lived objects
   - Struct: small, lightweight data (roughly 16 bytes or less)
   - Struct: value semantics, data container
   - Struct: doesn't need inheritance

3. **What are the different ways to initialize class instances?**
   - Field initializers: default values on field declaration
   - Constructor parameters: caller-provided values
   - Primary constructors (C# 12+): parameters in class declaration
   - Required properties: enforce initialization via object initializer
   - Object initializers: set properties when creating object

4. **What is a static class?**
   - Can't be instantiated, contains only static members
   - Use for utility methods that don't operate on instance data
   - Implicitly sealed, can't derive from or instantiate
   - Examples: Math, Console classes
   - Organize related functionality without instance state

5. **What are object initializers?**
   - Set properties when creating object without constructor
   - Work with accessible properties with set or init accessor
   - Combine with required properties and constructors
   - Avoid writing constructor for every combination of values
   - Collection expressions for collection properties

**Key interview concepts**:
- **Reference Type**: Holds reference to object
- **Inheritance**: Support for base/derived class hierarchies
- **Initialization**: Field initializers, constructors, primary constructors
- **Static Class**: Utility methods without instance state
- **Object Initializers**: Property setting at creation

**How to approach interview questions**:
- Start with class definition and reference type semantics
- Explain class vs struct decision criteria
- Discuss initialization approaches and when to use each
- Address static classes for utility methods
- Mention object initializers for property setting

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [C# classes - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes)