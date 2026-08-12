---
title: "Expressions and Statements"
slug: "09_dotnet/0_c/0_fundamentals/4_expressions_and_statements"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Expressions and Statements Overview - Building Blocks</summary>
  <div>

## Expressions and Statements

**Real-life analogy**: Expressions and statements are like calculations and actions in a workflow. Expressions are calculations that produce a result (2 + 2 = 4, calculate total). Statements are actions that perform work (print result, assign value, make decision). Every line of code is one or the other. Expressions can nest inside statements, and statements can contain expressions. This separation enables complex programs built from simple, composable building blocks. Understanding this distinction is fundamental to writing C# code effectively.

**Technical explanation**: Expressions and statements are fundamental building blocks of C# program. Expression produces value. Statement performs action, typically ends in semicolon. Equality comparisons distinguish value equality (data matches) vs reference equality (same object in memory). Selection statements choose which code runs based on condition (if, else, switch). Iteration statements repeat block of code (foreach, while, do-while, for). Collections store multiple related values (arrays, List<T>, Dictionary<TKey,TValue>). LINQ queries data with C# syntax (query syntax, method syntax, lambda expressions). Together, these enable building complex programs from simple building blocks.

**Key jargon explained**:
- **Expression**: Produces a value
- **Statement**: Performs an action
- **Value Equality**: Data matches
- **Reference Equality**: Same object in memory
- **Deferred Execution**: Describe result first, read data later

```csharp:title:Example.cs
// Expressions
42
x + y
Math.Max(a, b)
condition ? trueValue : falseValue

// Statements
int x;
int x = 42;
Console.WriteLine("Hello");
if (condition) { /* code */ }
return result;
```

**How it works in practice**: Expression produces value (literal, arithmetic, method call, conditional, object creation). Statement performs action (declaration, method call, conditional, return). Equality: value types compare data, reference types compare identity by default. Selection: if/else for Boolean branching, switch for value matching. Iteration: foreach for collections, while/do-while for condition-controlled, for for index-based. Collections: arrays (fixed-size), List<T> (growable), Dictionary<TKey,TValue> (key-based lookup). LINQ: query syntax (SQL-style), method syntax (chained operations), lambda expressions for predicates.

**Key takeaways for interviews**:
- Expression: produces a value
- Statement: performs an action
- Equality: value vs reference equality
- Selection: if/else, switch with patterns
- Iteration: foreach, while, do-while, for
- Collections: arrays, List<T>, Dictionary<TKey,TValue>
- LINQ: query syntax, method syntax, lambda expressions

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

**Real-life analogy**: Interview preparation for expressions and statements is like understanding workflow fundamentals. You need to understand calculations, actions, decisions, loops, data structures, and queries.

**Common interview questions**:
1. **What is the difference between expressions and statements?**
   - Expression: produces a value
   - Statement: performs an action, ends with semicolon
   - Statements often contain expressions
   - Expressions can nest inside expressions
   - Examples: literals, arithmetic (expressions); declarations, method calls (statements)

2. **What is the difference between value equality and reference equality?**
   - Value equality: data matches
   - Reference equality: same object in memory
   - Value types: compare data by default
   - Reference types: compare identity by default
   - Records provide value equality for reference types

3. **What are the selection statements in C#?**
   - if/else for Boolean branching
   - switch for value matching
   - else if for multiple conditions
   - Pattern-based case labels
   - when clauses for extra conditions

4. **What are the iteration statements in C#?**
   - foreach for collections (no index)
   - while for condition-controlled (zero or more)
   - do-while for condition-controlled (one or more)
   - for for index-based loops
   - break and continue for flow control

5. **What are the common collection types in C#?**
   - Arrays: fixed-size ordered collections
   - List<T>: growable sequences
   - Dictionary<TKey,TValue>: key-based lookup
   - Collection expressions: [element1, element2]
   - Choose based on data usage pattern

**Key interview concepts**:
- **Expressions vs Statements**: Value vs action
- **Equality**: Value vs reference
- **Selection**: if/else, switch
- **Iteration**: foreach, while, do-while, for
- **Collections**: arrays, List<T>, Dictionary<TKey,TValue>
- **LINQ**: Query syntax, method syntax

**How to approach interview questions**:
- Start with expressions vs statements distinction
- Explain value vs reference equality
- Discuss selection statements and patterns
- Address iteration statements and use cases
- Mention collection types and LINQ

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [C# fundamentals - Expressions and Statements | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/)