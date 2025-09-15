---
title: "LINQ"
slug: "09_dotnet/0_c/3_linq"
stack: "C#.NET"
---

- Language-Integrated Query `LINQ` is the name for a set of technologies based on the integration of query capabilities directly into the C# language.

- Traditionally, queries against data are expressed as simple strings without type checking at compile time or IntelliSense support. Furthermore, you have to learn a different query language for each type of data source: SQL databases, XML documents, various Web services, and so on.

- With LINQ, a **query is a first-class language construct**, just like classes, methods, and events.

- When you write queries, the most visible "language-integrated" part of LINQ is the query expression. **Query expressions** are written in a _declarative query syntax_. By using query syntax, you perform _filtering_, _ordering_, and _grouping_ operations on data sources with a minimum of code. You use the same query expression patterns to query and transform data from any type of data source.

- The following example shows a complete query operation. The complete operation includes creating a data source, defining the query expression, and executing the query in a foreach statement.

```csharp
// Specify the data source.
int[] scores = [97, 92, 81, 60];

// Define the query expression.
IEnumerable<int> scoreQuery =
    from score in scores
    where score > 80
    select score;

// Execute the query.
foreach (var i in scoreQuery)
{
    Console.Write(i + " ");
}

// Output: 97 92 81
```

✏️: You might need to add a [using](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/using-directive) directive, `using System.Linq;`, for the preceding example to compile.

The most recent versions of .NET make use of [implicit usings](https://learn.microsoft.com/en-us/09_dotnet/core/project-sdk/overview#implicit-using-directives) to add this directive as a [global using](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/using-directive#global-modifier). Older versions require you to add it in your source.

## Query Expression Overview

- Query expressions _query_ and _transform_ data from any LINQ-enabled data source. For example, a single query can retrieve data from an SQL database and produce an XML stream as output.
- Query expressions use many familiar C# language constructs, which make them easy to read.
- The variables in a query expression are all strongly typed.
- A query isn't executed until you iterate over the query variable, for example in a foreach statement.
- At compile time, _query expressions are converted to standard query operator method calls according to the rules defined in the C# specification_.
  - Any query that can be expressed by using query syntax can also be expressed by using method syntax.
  - In some cases, query syntax is more readable and concise. In others, method syntax is more readable.
  - There's no semantic or performance difference between the two different forms. For more information, see [C# language specification](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/language-specification/expressions#1220-query-expressions) and [Standard query operators overview](https://learn.microsoft.com/en-us/09_dotnet/csharp/linq/standard-query-operators/).
- Some query operations, such as `Count` or `Max`, have no equivalent query expression clause and must therefore be expressed as a method call.
  - Method syntax can be combined with query syntax in various ways.
- Query expressions can be compiled to expression trees or to delegates, depending on the type that the query is applied to.
  - [IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1) queries are compiled to delegates.
  - [IQueryable](https://learn.microsoft.com/en-us/09_dotnet/api/system.linq.iqueryable) and [IQueryable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.linq.iqueryable-1) queries are compiled to expression trees. For more information, see [Expression trees](https://learn.microsoft.com/en-us/09_dotnet/csharp/advanced-topics/expression-trees).

## Enabling LINQ querying of your data source

### In-memory data

There are two ways you enable LINQ querying of in-memory data. If the data is of a type that implements [IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1), you query the data by using LINQ to Objects. If it doesn't make sense to enable enumeration by implementing the [IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1) interface, you define LINQ standard query operator methods, either in that type or as [extension methods](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/extension-methods) for that type. Custom implementations of the standard query operators should use deferred execution to return the results.

### Remote data

The best option for enabling LINQ querying of a remote data source is to implement the [IQueryable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.linq.iqueryable-1) interface.
