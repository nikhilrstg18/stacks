---
title: "Objects"
slug: "09_dotnet/0_c/0_fundamentals/5_object-oriented_programming/1_objects"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Objects - Type Instances</summary>
  <div>

## Objects - Create Instances of Types

**Real-life analogy**: Objects are like items manufactured from blueprints. The blueprint (class/struct definition) specifies what the item can do. The object is the actual item manufactured from the blueprint. You can create many items from the same blueprint. Class objects are like documents stored in a filing cabinet - multiple people can have references to the same document. Struct objects are like photocopies - each person gets their own copy. Understanding this distinction is crucial for managing memory and behavior in C# programs.

**Technical explanation**: Class or struct definition is blueprint specifying what type can do. Object is block of memory allocated and configured according to blueprint. Program can create many objects of same class. Objects also called instances, stored in named variable or array/collection. Client code uses variables to call methods and access public properties. Classes are reference types - variable holds reference to address of object on managed heap. Assigning second variable to first makes both refer to same object. Structs are value types - variable holds copy of entire object. Struct instances created with new operator but not required. Memory for structs allocated on thread stack, reclaimed when type/method goes out of scope.

**Key jargon explained**:
- **Blueprint**: Type definition (class/struct/record)
- **Object**: Instance allocated from blueprint
- **Reference Type**: Variable holds reference to object
- **Value Type**: Variable holds copy of object
- **Client Code**: Code that uses objects

```csharp:title:ClassInstance.cs
public class Person(string name, int age)
{
    public string Name { get; set; } = name;
    public int Age { get; set; } = age;
}

Person person1 = new("Leopold", 6);
Person person2 = person1;

person2.Name = "Molly";
person2.Age = 16;

// person1 also changes because both refer to same object
```

```csharp:title:StructInstance.cs
public struct Person
{
    public string Name;
    public int Age;
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

Person p1 = new("Alex", 9);
Person p2 = p1;

p2.Name = "Spencer";
p2.Age = 7;

// p1 values remain unchanged because p2 is a copy
```

**How it works in practice**: Class instances: reference types, variable holds reference to object on managed heap. Assigning makes both variables refer to same object. Changes through one variable visible through other. Struct instances: value types, variable holds copy of entire object. Assigning creates copy, changes to copy don't affect original. Memory for structs on thread stack, reclaimed when type/method goes out of scope. Class memory on managed heap, garbage collected when all references out of scope. Use classes for complex behavior, structs for lightweight data.

**Key takeaways for interviews**:
- Class: reference type, variable holds reference
- Struct: value type, variable holds copy
- Class assignment: both refer to same object
- Struct assignment: creates copy
- Class memory: managed heap, garbage collected
- Struct memory: thread stack, reclaimed on scope exit

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Object Identity vs Value Equality - Comparison</summary>
  <div>

## Object Identity vs. Value Equality

**Real-life analogy**: Object identity is like asking if two people are pointing to the same document (same file on disk). Value equality is like asking if two documents have the same content (same text, same formatting). Two separate documents with identical content are value-equal but not identity-equal. Two shortcuts to the same file are identity-equal. C# distinguishes these two kinds of comparison: identity (same object in memory) vs value equality (data matches). Understanding this distinction is crucial for correct equality comparisons.

**Technical explanation**: When compare two objects for equality, distinguish whether want to know if variables represent same object in memory (identity) or if values of fields are equivalent (value equality). For identity: use Object.ReferenceEquals to determine if two class instances refer to same location in memory. For value equality: ValueType.Equals determines if instance fields in two struct instances have same values. For class value equality: use Equals or == operator only if class has overridden/overloaded them to provide custom definition. Class might implement IEquatable<T> or IEqualityComparer<T> interfaces for value equality. Records are reference types that use value semantics for equality.

**Key jargon explained**:
- **Object Identity**: Same object in memory
- **Value Equality**: Data matches
- **ReferenceEquals**: Test identity
- **ValueType.Equals**: Test struct value equality
- **IEquatable<T>:** Interface for value equality

```csharp:title:Identity.cs
Person person1 = new("Alice", 30);
Person person2 = new("Alice", 30);

Console.WriteLine(ReferenceEquals(person1, person2)); // False

Person person3 = person1;
Console.WriteLine(ReferenceEquals(person1, person3)); // True
```

```csharp:title:ValueEquality.cs
Person p1 = new("Wallace", 75);
Person p2 = new("", 42);
p2.Name = "Wallace";
p2.Age = 75;

if (p2.Equals(p1))
    Console.WriteLine("p2 and p1 have the same values.");
```

**How it works in practice**: Identity: ReferenceEquals tests if same object in memory. Value equality for structs: ValueType.Equals compares instance fields. Value equality for classes: only if class overrides Equals/== or implements IEquatable<T>. Records provide value equality for reference types. Use identity when need to know if same object. Use value equality when need to know if data matches. Understanding distinction prevents bugs where identical-looking objects aren't considered equal, or where mutation through one variable silently changes what another variable sees.

**Key takeaways for interviews**:
- Identity: same object in memory
- Value equality: data matches
- ReferenceEquals for identity
- ValueType.Equals for struct value equality
- Class value equality: only if overridden
- Records provide value equality for reference types

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

**Real-life analogy**: Interview preparation for objects is like understanding item manufacturing and comparison. You need to understand blueprints, instances, reference vs value types, and equality comparisons.

**Common interview questions**:
1. **What is the difference between a class and a struct instance?**
   - Class: reference type, variable holds reference to object
   - Struct: value type, variable holds copy of object
   - Class assignment: both refer to same object
   - Struct assignment: creates copy
   - Class memory: managed heap, garbage collected
   - Struct memory: thread stack, reclaimed on scope exit

2. **What is object identity vs value equality?**
   - Identity: same object in memory
   - Value equality: data matches
   - ReferenceEquals tests identity
   - ValueType.Equals tests struct value equality
   - Class value equality: only if overridden

3. **How does memory allocation differ between classes and structs?**
   - Class: allocated on managed heap
   - Struct: allocated on thread stack
   - Class memory: garbage collected when references out of scope
   - Struct memory: reclaimed when type/method goes out of scope
   - No significant performance difference in most cases

4. **What happens when you assign a class variable to another?**
   - Both variables refer to same object
   - Changes through one variable visible through other
   - Reference copy, not object copy
   - Example: person2 = person1, person2.Name = "Molly" changes person1 too
   - Useful for sharing objects

5. **What happens when you assign a struct variable to another?**
   - Creates copy of entire object
   - Changes to copy don't affect original
   - Value copy, not reference copy
   - Example: p2 = p1, p2.Name = "Spencer" doesn't change p1
   - Useful for independent data

**Key interview concepts**:
- **Reference Type**: Holds reference to object
- **Value Type**: Holds copy of object
- **Identity**: Same object in memory
- **Value Equality**: Data matches
- **Memory Allocation**: Heap vs stack

**How to approach interview questions**:
- Start with class vs struct distinction
- Explain reference vs value types
- Discuss identity vs value equality
- Address memory allocation differences
- Mention assignment behavior

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Objects - create instances of types - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/objects)