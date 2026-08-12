---
title: "Inheritance"
slug: "09_dotnet/0_c/0_fundamentals/5_object-oriented_programming/2_inheritence"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Inheritance - Code Reuse and Specialization</summary>
  <div>

## Object-Oriented Programming - Inheritance

**Real-life analogy**: Inheritance is like organizational hierarchy. Headquarters (base class) defines policies and procedures. Departments (derived classes) inherit those policies and can add their own specialized rules. A department is a specialization of headquarters - it has all headquarters policies plus its own additions. This enables code reuse - departments don't need to reimplement headquarters policies. In C#, derived classes inherit base class members (except constructors and finalizers) and can add more members, extending base class functionality.

**Technical explanation**: Inheritance, together with encapsulation and polymorphism, is one of three primary characteristics of OOP. Inheritance enables creating new classes that reuse, extend, modify behavior defined in other classes. Class whose members inherited is base class. Class that inherits those members is derived class. Derived class can have only one direct base class. Inheritance is transitive - if ClassC derived from ClassB, and ClassB derived from ClassA, ClassC inherits members from ClassB and ClassA. Structs don't support inheritance but can implement interfaces. Derived class implicitly gains all base class members except constructors and finalizers. Can add more members in derived class to extend functionality.

**Key jargon explained**:
- **Base Class**: Class whose members are inherited
- **Derived Class**: Class that inherits members
- **Transitive**: Inheritance chains (A→B→C, C inherits from A and B)
- **Specialization**: Derived class is specialized version of base
- **Code Reuse**: Derived class reuses base class code

```csharp:title:Inheritance.cs
public class WorkItem
{
    protected int ID { get; set; }
    protected string Title { get; set; }
    protected string Description { get; set; }
    
    public WorkItem(string title, string desc)
    {
        ID = GetNextID();
        Title = title;
        Description = desc;
    }
    
    protected int GetNextID() => ++currentID;
    
    public override string ToString() => $"{ID} - {Title}";
}

public class ChangeRequest : WorkItem
{
    protected int originalItemID { get; set; }
    
    public ChangeRequest(string title, string desc, int originalID)
        : base(title, desc)
    {
        this.originalItemID = originalID;
    }
}
```

**How it works in practice**: Derived class inherits all base class members except constructors and finalizers. Reuses base class code without reimplementing. Can add more members to extend functionality. Conceptually, derived class is specialization of base class (Mammal is Animal). Inheritance transitive - derived class inherits from entire chain. Structs don't support inheritance. Derived class must add own constructor (constructors not inherited). Can override virtual methods from base class. Abstract classes can't be instantiated directly, used as base classes. Sealed classes prevent inheritance.

**Key takeaways for interviews**:
- Derived class inherits base class members (except constructors/finalizers)
- Inheritance enables code reuse
- Derived class is specialization of base class
- Inheritance is transitive
- Structs don't support inheritance

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Abstract and Virtual Methods - Polymorphism Foundation</summary>
  <div>

## Abstract and Virtual Methods

**Real-life analogy**: Virtual methods are like standard procedures that can be customized. Headquarters defines a virtual procedure (Draw). Each department (derived class) can override the procedure with its own implementation (Draw rectangle, Draw circle). Abstract methods are like required procedures that must be implemented - headquarters defines abstract procedure, each department must provide its own implementation. These methods are foundation for polymorphism - same method call executes different implementations based on object type.

**Technical explanation**: When base class declares method as virtual, derived class can override with own implementation. If base class declares member as abstract, method must be overridden in any non-abstract class that directly inherits. If derived class is itself abstract, inherits abstract members without implementing them. Abstract and virtual members are basis for polymorphism. Abstract base classes prevent direct instantiation by using new operator. Abstract class can be used only as base class. Abstract classes can define abstract members (no implementation) and virtual members (with implementation). Derived classes must implement abstract members, can override virtual members.

**Key jargon explained**:
- **Virtual Method**: Can be overridden in derived class
- **Abstract Method**: Must be overridden in derived class
- **Override**: Provide new implementation in derived class
- **Abstract Base Class**: Can't be instantiated, used as base
- **Polymorphism**: Same method call, different implementations

```csharp:title:VirtualAbstract.cs
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

public abstract class Animal
{
    public abstract void MakeSound();
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Bark");
    }
}
```

**How it works in practice**: Virtual methods: base class provides implementation, derived class can override. Abstract methods: base class provides no implementation, derived class must implement. Abstract classes: can't be instantiated, used only as base class. Derived classes must implement abstract members. Can override virtual members. Override keyword explicitly indicates method participates in virtual invocation. Fields can't be virtual - only methods, properties, events, indexers. Virtual methods enable derived classes to extend base class without using base class implementation. Foundation for polymorphism.

**Key takeaways for interviews**:
- Virtual: can be overridden in derived class
- Abstract: must be overridden in derived class
- Abstract classes: can't be instantiated
- Override keyword explicitly indicates override
- Fields can't be virtual
- Foundation for polymorphism

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

**Real-life analogy**: Interview preparation for inheritance is like understanding organizational hierarchies. You need to understand code reuse, specialization, and method overriding.

**Common interview questions**:
1. **What is inheritance in C#?**
   - Derived class inherits base class members
   - Enables code reuse and specialization
   - Derived class can have only one direct base class
   - Inheritance is transitive
   - Structs don't support inheritance

2. **What members are inherited from a base class?**
   - All members except constructors and finalizers
   - Public, protected, internal members
   - Methods, fields, properties, events
   - Derived class reuses base class code
   - Can add more members to extend functionality

3. **What is the difference between virtual and abstract methods?**
   - Virtual: can be overridden in derived class
   - Abstract: must be overridden in derived class
   - Virtual has implementation in base class
   - Abstract has no implementation in base class
   - Both are foundation for polymorphism

4. **What is an abstract base class?**
   - Can't be instantiated with new operator
   - Used only as base class
   - Can define abstract members (no implementation)
   - Can define virtual members (with implementation)
   - Derived classes must implement abstract members

5. **Can structs support inheritance?**
   - No, structs don't support inheritance
   - Structs can implement interfaces
   - Structs are value types
   - Classes are reference types that support inheritance
   - Use structs for lightweight data

**Key interview concepts**:
- **Inheritance**: Code reuse through hierarchy
- **Base/Derived Class**: Inheritance relationship
- **Virtual Methods**: Can be overridden
- **Abstract Methods**: Must be overridden
- **Abstract Classes**: Can't be instantiated

**How to approach interview questions**:
- Start with inheritance definition and purpose
- Explain what members are inherited
- Discuss virtual vs abstract methods
- Address abstract base classes
- Mention structs don't support inheritance

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Object-oriented programming - inheritance - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/inheritance)