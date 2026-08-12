---
title: "Common Collection Types"
slug: "09_dotnet/0_c/0_fundamentals/4_expressions_and_statements/3_collections"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Common Collection Types - Data Structures</summary>
  <div>

## Common Collection Types in C#

**Real-life analogy**: Collections are like containers for storing items. Arrays are like fixed-size boxes - once created, size doesn't change, but you can replace items. List<T> is like a expandable bag - add or remove items as needed. Dictionary<TKey,TValue> is like a filing cabinet with labeled folders - look up items by key (name, ID) instead of position. Choose based on how you use data: fixed set (array), changing set (List<T>), key-based lookup (Dictionary<TKey,TValue>). Collection expressions create collections from expressions between square brackets.

**Technical explanation**: Collection is object that stores multiple related values. Each value is element. Choose array when set is fixed (status names). Choose List<T> when items come and go (backlog). Choose Dictionary<TKey,TValue> when look up values by key (work item by ID). Sequence stores elements in order, reach by position. Array: fixed-length ordered collection, length can't change after creation. List<T>: stores elements in order, can grow or shrink. Dictionary<TKey,TValue>: stores values by key instead of position. Generic types use type argument to say what kind of values stored - provide type safety.

**Key jargon explained**:
- **Collection**: Object storing multiple values
- **Element**: Value in collection
- **Array**: Fixed-size ordered collection
- **List<T>:** Growable sequence
- **Dictionary<TKey,TValue>:** Key-based lookup

```csharp:title:CollectionTypes.cs
string[] sprintPlan = ["design", "code", "test"];
List<string> backlog = ["design", "code"];
Dictionary<string, int> priorities = new()
{
    ["docs"] = 2,
    ["tests"] = 1
};

backlog.Add("test");

Console.WriteLine($"Array: {string.Join(", ", sprintPlan)}");
Console.WriteLine($"List count: {backlog.Count}");
Console.WriteLine($"Priority for docs: {priorities["docs"]}");
```

**How it works in practice**: Array: fixed-length, access by index, length can't change but elements can. Use foreach to read every element in order. Use index when position matters. List<T>: grow or shrink as program runs. Add to append, Remove to remove matching element, Contains to test existence, IndexOf to find position. Insert, InsertRange, RemoveAt for position-based operations. Adding/removing at end fast, middle slower. Dictionary<TKey,TValue>: look up by key, Add to add key-value pair, ContainsKey to test key existence, indexer to access by key. Use when each element has lookup key.

**Key takeaways for interviews**:
- Array: fixed-size ordered collection
- List<T>: growable sequence
- Dictionary<TKey,TValue>: key-based lookup
- Collection expressions: [element1, element2]
- Choose based on data usage pattern

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Collection Expressions and Performance - Advanced Collections</summary>
  <div>

## Collection Expressions and Performance

**Real-life analogy**: Collection expressions are like shorthand for creating containers. Instead of manually adding items one by one, you specify all items in one expression. This is like writing a shopping list all at once instead of adding items individually. Performance considerations are like choosing the right tool for the job - arrays for fixed data, List<T> for changing data, Dictionary<TKey,TValue> for lookups. Understanding performance characteristics ensures efficient data handling.

**Technical explanation**: Collection expression creates collection from expressions between square brackets. Works for arrays, List<T>, Dictionary<TKey,TValue>. Generic types use type argument to specify value type - provide type safety, compiler guarantees every element is declared type, no casts needed, can't accidentally store wrong type. Array: fixed length, replace element at existing index. List<T>: Add/Remove at end fast, Insert/RemoveAt in middle slower because later elements shift. Dictionary<TKey,TValue>: O(1) average lookup by key, Add/Remove by key fast. Choose collection based on usage pattern: fixed data (array), changing data (List<T>), key-based lookup (Dictionary<TKey,TValue>).

**Key jargon explained**:
- **Collection Expression**: [element1, element2]
- **Generic Type**: Type parameter for element type
- **Type Safety**: Compiler guarantees element type
- **O(1)**: Constant time operation
- **Performance**: Choose based on usage pattern

```csharp:title:CollectionExpressions.cs
string[] stages = ["design", "code", "test", "review"];
List<string> workItems = ["design", "code", "test"];
Dictionary<string, int> priorities = new()
{
    ["docs"] = 2,
    ["tests"] = 1
};
```

**How it works in practice**: Collection expressions create collections from expressions between square brackets. Generic types (List<T>, Dictionary<TKey,TValue>) use type argument for element type - provide type safety. Array: fixed length, replace elements, use index for position. List<T>: Add/Remove at end fast (O(1)), Insert/RemoveAt in middle slower (O(n)) due to shifting. Dictionary<TKey,TValue>: O(1) average lookup by key, Add/Remove by key fast. Choose based on usage: fixed (array), changing (List<T>), lookup (Dictionary<TKey,TValue>). Consider performance for large collections.

**Key takeaways for interviews**:
- Collection expressions: [element1, element2]
- Generic types provide type safety
- List<T>: Add/Remove at end fast, middle slower
- Dictionary<TKey,TValue>: O(1) average lookup
- Choose based on usage pattern

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

**Real-life analogy**: Interview preparation for collections is like understanding container types. You need to understand different collection types, their characteristics, and when to use each.

**Common interview questions**:
1. **What are the common collection types in C#?**
   - Array: fixed-size ordered collection
   - List<T>: growable sequence
   - Dictionary<TKey,TValue>: key-based lookup
   - Collection expressions: [element1, element2]
   - Choose based on data usage pattern

2. **When should you use an array vs List<T>?**
   - Array: fixed-size, length can't change
   - List<T>: grow or shrink as program runs
   - Use array when set is fixed
   - Use List<T> when items come and go
   - Array elements can change, length can't

3. **When should you use Dictionary<TKey,TValue>?**
   - When look up values by key
   - Each element has lookup key (name, ID, code)
   - O(1) average lookup by key
   - Add/Remove by key fast
   - Use for key-based access, not position-based

4. **What are collection expressions?**
   - Create collection from expressions between square brackets
   - Works for arrays, List<T>, Dictionary<TKey,TValue>
   - Shorthand for creating collections
   - Example: ["design", "code", "test"]
   - Alternative to manual Add calls

5. **What are the performance characteristics of List<T>?**
   - Add/Remove at end: fast (O(1))
   - Insert/RemoveAt in middle: slower (O(n))
   - Later elements shift when middle changed
   - Use for changing data sets
   - Consider performance for large collections

**Key interview concepts**:
- **Array**: Fixed-size ordered
- **List<T>:** Growable sequence
- **Dictionary<TKey,TValue>:** Key-based lookup
- **Collection Expressions**: Shorthand creation
- **Performance**: O(1) vs O(n) operations

**How to approach interview questions**:
- Start with collection types overview
- Explain array vs List<T> use cases
- Discuss Dictionary<TKey,TValue> for lookups
- Address collection expressions
- Mention performance characteristics

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Common collection types in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/statements/collections)