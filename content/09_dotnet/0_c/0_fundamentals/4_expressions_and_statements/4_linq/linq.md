---
title: "LINQ Queries"
slug: "09_dotnet/0_c/0_fundamentals/4_expressions_and_statements/4_linq"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>LINQ Queries - Data Querying</summary>
  <div>

## LINQ Queries in C#

**Real-life analogy**: LINQ is like a query language for data, similar to SQL for databases but integrated into C#. Query syntax reads like SQL-style query written inside C# (from, where, orderby, select). Method syntax reads like chained collection operations (Where, OrderBy, Select). Both describe the same query. LINQ uses deferred execution - describes result first, reads data later when asked for results. This is like writing a query definition and executing it when needed, not immediately. LINQ providers connect syntax to specific data sources (in-memory, database, XML).

**Technical explanation**: Language Integrated Query (LINQ) is C# feature set for querying data with C# syntax. Many LINQ operators use deferred execution - describe result first, read data later when code asks for results. Query describes which data to read and how to shape result. Query reads from data source - in-memory collection (array, List<T>) or external source (database, XML) through LINQ provider. LINQ provider is library connecting LINQ syntax to specific data source. Sequence is ordered set of elements represented by IEnumerable<T>. Query syntax uses clauses (from, where, orderby, select). Method syntax calls LINQ methods directly (Where, OrderBy, Select).

**Key jargon explained**:
- **LINQ**: Language Integrated Query
- **Deferred Execution**: Describe result first, read later
- **Query Syntax**: from, where, orderby, select
- **Method Syntax**: Where, OrderBy, Select
- **LINQ Provider**: Connects syntax to data source

```csharp:title:QuerySyntax.cs
string[] names = ["Ana", "Ben", "Cleo", "Dara"];

IEnumerable<string> query =
    from name in names
    where name.Length >= 4
    orderby name
    select name;

foreach (string name in query)
{
    Console.WriteLine(name);
}
```

```csharp:title:MethodSyntax.cs
string[] names = ["Ana", "Ben", "Cleo", "Dara"];

IEnumerable<string> query = names
    .Where(name => name.Length >= 4)
    .OrderBy(name => name)
    .Select(name => name);

foreach (string name in query)
{
    Console.WriteLine(name);
}
```

**How it works in practice**: Query syntax: from names data source and range variable, where keeps matching elements, orderby sorts, select shapes result. Method syntax: calls LINQ methods directly, each call returns result next call can use (fluent syntax). Both forms describe same query. Use form that makes query easiest to read. Query syntax reads well for several clauses, let clause names intermediate value. Method syntax reads well for short operations, necessary for methods without query-syntax keyword (Count). Lambda expressions commonly used in method syntax to say what each operator does with each element.

**Key takeaways for interviews**:
- LINQ: query data with C# syntax
- Deferred execution: describe first, read later
- Query syntax: from, where, orderby, select
- Method syntax: Where, OrderBy, Select
- Lambda expressions for predicates

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Lambda Expressions and Common Methods - Advanced LINQ</summary>
  <div>

## Lambda Expressions and Common LINQ Methods

**Real-life analogy**: Lambda expressions are like inline functions passed as arguments. In LINQ method syntax, lambda expressions tell each operator what to do with each element (name => name.Length >= 3). This is like giving instructions for processing each item. Common LINQ methods cover everyday query steps: filter (Where), transform (Select), sort (OrderBy), group (GroupBy), summarize (Sum, Count, Aggregate). These methods work with sequences (IEnumerable<T>) and enable powerful data manipulation in a declarative style.

**Technical explanation**: Lambda expression is anonymous function passed as argument. LINQ method syntax commonly uses lambda expressions to say what each operator should do with each element. In name => name.Length == 3, name is input element, name.Length == 3 is Boolean expression deciding whether element belongs in result. Query-syntax clauses use lambda expressions too - where, orderby, select compile to method calls taking lambda expressions. Range variable becomes lambda parameter, clause expression becomes lambda body. Common LINQ methods: Where keeps elements matching condition, Select transforms each element (projection), OrderBy sorts, GroupBy creates groups sharing key, aggregation methods (Sum, Count, Aggregate) produce single value from all elements.

**Key jargon explained**:
- **Lambda Expression**: Anonymous function passed as argument
- **Where**: Filter elements matching condition
- **Select**: Transform elements (projection)
- **OrderBy**: Sort elements
- **Aggregation**: Sum, Count, Aggregate

```csharp:title:Lambdas.cs
string[] names = ["Ana", "Ben", "Cleo"];

IEnumerable<string> shortNames = names
    .Where(name => name.Length == 3)
    .Select(name => name.ToUpperInvariant());

foreach (string name in shortNames)
{
    Console.WriteLine(name);
}
```

```csharp:title:CommonMethods.cs
List<string> workItems = ["design", "docs", "deploy", "review"];

int count = workItems.Count(item => item.StartsWith('d'));
Console.WriteLine($"Starts with d: {count}");
```

**How it works in practice**: Lambda expressions: input parameter => expression. Used in method syntax for predicates and transformations. Where filters elements matching condition. Select transforms each element into new value (projection). OrderBy sorts elements. GroupBy creates groups sharing key. Aggregation methods produce single value (Sum, Count, Aggregate). Query syntax compiles to method calls with lambda expressions. Use lambda expressions for concise inline logic. Common methods in System.Linq namespace, work with IEnumerable<T>. Functional programming terms: Where is filter, Select is map, aggregation is reduce.

**Key takeaways for interviews**:
- Lambda expressions: anonymous functions
- Where: filter elements
- Select: transform elements (projection)
- OrderBy: sort elements
- Aggregation: Sum, Count, Aggregate

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

**Real-life analogy**: Interview preparation for LINQ is like understanding query languages. You need to understand query syntax, method syntax, lambda expressions, and common LINQ methods.

**Common interview questions**:
1. **What is LINQ in C#?**
   - Language Integrated Query
   - Query data with C# syntax
   - Deferred execution: describe first, read later
   - Query syntax: from, where, orderby, select
   - Method syntax: Where, OrderBy, Select

2. **What is the difference between query syntax and method syntax?**
   - Query syntax: from, where, orderby, select
   - Method syntax: Where, OrderBy, Select
   - Both describe same query
   - Query syntax reads well for several clauses
   - Method syntax necessary for methods without query keyword

3. **What is deferred execution in LINQ?**
   - Describe result first, read data later
   - Query executed when results requested
   - Not executed immediately on definition
   - Enables efficient query composition
   - Common for in-memory LINQ

4. **What are lambda expressions in LINQ?**
   - Anonymous functions passed as arguments
   - Tell operator what to do with each element
   - Syntax: parameter => expression
   - Used in method syntax for predicates
   - Query syntax compiles to lambdas

5. **What are the common LINQ methods?**
   - Where: filter elements matching condition
   - Select: transform elements (projection)
   - OrderBy: sort elements
   - GroupBy: create groups sharing key
   - Aggregation: Sum, Count, Aggregate

**Key interview concepts**:
- **LINQ**: Language Integrated Query
- **Deferred Execution**: Describe first, read later
- **Query vs Method Syntax**: Different forms, same query
- **Lambda Expressions**: Anonymous functions
- **Common Methods**: Where, Select, OrderBy, GroupBy

**How to approach interview questions**:
- Start with LINQ definition and purpose
- Explain query vs method syntax
- Discuss deferred execution
- Address lambda expressions
- Mention common LINQ methods

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [LINQ queries in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/statements/linq)