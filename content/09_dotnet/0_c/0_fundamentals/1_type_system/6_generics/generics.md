---
title: "Generics"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/6_generics"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Generics - Type-Parameterized Code</summary>
  <div>

## Generic Types and Methods

**Real-life analogy**: Generics are like universal containers that can hold any type of item. Instead of having separate containers for books, electronics, and clothing, you have a universal container that can hold any item while maintaining type safety. The container knows what type it's holding and prevents you from putting the wrong type in. Generics provide the same capability - write code that works with any type while keeping full type safety, avoiding runtime casts and InvalidCastException.

**Technical explanation**: Generics let you write code that works with any type while keeping full type safety. Write one version with type parameters (T, TKey, TValue) instead of separate classes/methods for each type. Specify actual types when using. Compiler checks types at compile time, no runtime casts or InvalidCastException risk. Encountered constantly: collections (List<T>, Dictionary<TKey, TValue>), async return types (Task<T>), delegates (Func<T>), LINQ. Type argument in angle brackets tells generic type what kind of data it holds or operates on.

**Key jargon explained**:
- **Type Parameters**: T, TKey, TValue placeholders for types
- **Type Arguments**: Actual types specified when using generic
- **Type Safety**: Compile-time type checking
- **Generic Collections**: List<T>, Dictionary<TKey, TValue>, HashSet<T>
- **Type Inference**: Compiler infers type argument from context

```csharp:title=GenericCollections.cs
List<int> scores = [95, 87, 72, 91];
Dictionary<string, decimal> prices = new()
{
    ["Widget"] = 19.99m,
    ["Gadget"] = 29.99m
};
Task<string> greeting = Task.FromResult("Hello, generics!");
Func<int, bool> isPositive = n => n > 0;
```

```csharp:title=GenericMethod.cs
static void Print<T>(T value) =>
    Console.WriteLine($"Value: {value}");

Print(42);        // Compiler infers T as int
Print("hello");   // Compiler infers T as string
Print(3.14);      // Compiler infers T as double
```

**How it works in practice**: Generics use type parameters (T, TKey, TValue) as placeholders. Specify actual types when using (List<int>, Dictionary<string, int>). Compiler enforces type safety at compile time. Type inference often infers type argument from values passed, no need to specify explicitly. Generic collections prevent type errors at runtime, avoid boxing for value types. Constraints restrict which type arguments accepted (where T : class, where T : struct, where T : new()).

**Key takeaways for interviews**:
- Generics write code for any type with type safety
- Type parameters (T) as placeholders, type arguments as actual types
- Compiler checks types at compile time
- Type inference eliminates need for explicit specification
- Constraints restrict acceptable type arguments

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Type Constraints - Restricting Type Arguments</summary>
  <div>

## Type Constraints

**Real-life analogy**: Type constraints are like specifying requirements for universal containers. Instead of accepting any item, the container might require items to be a certain size, weight, or material. This ensures the container can safely and effectively handle the items. Type constraints provide the same benefit - restrict which type arguments a generic type or method accepts, enabling you to call methods or access properties that wouldn't be available on object alone.

**Technical explanation**: Constraints restrict which type arguments generic type or method accepts. Enable calling methods or accessing properties on type parameter that wouldn't be available on object alone. Common constraints: where T : class (reference type), where T : struct (non-nullable value type), where T : new() (public parameterless constructor), where T : BaseClass (derive from BaseClass), where T : IInterface (implement IInterface). Can combine constraints: where T : class, IComparable<T>, new(). Less common: where T : System.Enum, where T : System.Delegate, where T : unmanaged for specialized scenarios.

**Key jargon explained**:
- **Constraints**: Restrict acceptable type arguments
- **where T : class**: Must be reference type
- **where T : struct**: Must be non-nullable value type
- **where T : new()**: Must have public parameterless constructor
- **where T : IInterface**: Must implement interface

```csharp:title=Constraints.cs
static T Max<T>(T a, T b) where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;

static T CreateDefault<T>() where T : new() => new T();

Console.WriteLine(Max(3, 7));          // 7
Console.WriteLine(Max("apple", "banana")); // banana

var list = CreateDefault<List<int>>(); // Creates an empty List<int>
Console.WriteLine($"Empty list count: {list.Count}"); // 0
```

**How it works in practice**: Constraints specified with where keyword. Enable calling methods or accessing properties on type parameter. Most common: class, struct, new(), BaseClass, IInterface. Can combine multiple constraints. Enable generic algorithms to work with types that have specific capabilities. Without constraints, type parameter limited to object methods. Constraints provide more specific type information to compiler.

**Key takeaways for interviews**:
- Constraints restrict acceptable type arguments
- Enable calling methods on type parameter
- Common constraints: class, struct, new(), BaseClass, IInterface
- Can combine multiple constraints
- Without constraints, type parameter limited to object methods

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

**Real-life analogy**: Interview preparation for generics concepts is like understanding universal containers. You need to understand how to create type-safe containers, how to specify requirements, and how to use them effectively.

**Common interview questions**:
1. **What are generics in C#?**
   - Write code that works with any type with type safety
   - Type parameters (T, TKey, TValue) as placeholders
   - Specify actual types when using (List<int>, Dictionary<string, int>)
   - Compiler checks types at compile time
   - Avoid runtime casts and InvalidCastException

2. **What is type inference in generics?**
   - Compiler infers type argument from values passed
   - No need to specify type explicitly
   - Example: Print(42) infers T as int
   - Keeps code cleaner
   - Can write explicit type if needed (Print<int>(42))

3. **What are type constraints and when would you use them?**
   - Restrict which type arguments accepted
   - Enable calling methods on type parameter
   - Common: class, struct, new(), BaseClass, IInterface
   - Use when need specific capabilities from type parameter
   - Can combine multiple constraints

4. **What are collection expressions?**
   - Concise syntax for creating collections (C# 12)
   - Use square brackets instead of constructor calls
   - Works with arrays, List<T>, Span<T>, etc.
   - Spread operator (..) inlines elements from one collection
   - Useful for combining sequences

5. **What is covariance and contravariance?**
   - Describe how generic types behave with inheritance
   - Covariance: IEnumerable<Dog> can be IEnumerable<Animal>
   - Contravariance: Action<Animal> can be Action<Dog>
   - out keyword for covariance, in keyword for contravariance
   - Enables using more derived or less derived type arguments

**Key interview concepts**:
- **Type Parameters**: Placeholders for types
- **Type Inference**: Compiler infers from context
- **Constraints**: Restrict acceptable types
- **Collection Expressions**: Concise creation syntax
- **Covariance/Contravariance**: Inheritance behavior

**How to approach interview questions**:
- Start with generics purpose and type safety
- Explain type inference and compiler behavior
- Discuss constraints and their use cases
- Address collection expressions and spread operator
- Mention covariance and contravariance

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Generic types and methods - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics)