---
title: "Member Access Expressions"
slug: "09_dotnet/0_c/0_getting_started/3_expressions/2_collection_expression"
stack: "C#.NET"
---

- You can use a collection expression to create common collection values.
- A _collection expression_ is a terse syntax that, when evaluated, can be assigned to many different collection types.
- A collection expression contains a sequence of elements between `[` and `]` brackets.
  The following example declares a [System.Span<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.span-1) of string elements and initializes them to the days of the week:

```csharp
Span<string> weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
foreach (var day in weekDays)
{
    Console.WriteLine(day);
}
```

- A collection expression can be converted to many different collection types.
  The first example demonstrated how to initialize a variable using a collection expression. The following code shows many of the other locations where you can use a collection expression:

```csharp
// Initialize private field:
private static readonly ImmutableArray<string> _months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// property with expression body:
public IEnumerable<int> MaxDays =>
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

public int Sum(IEnumerable<int> values) =>
    values.Sum();

public void Example()
{
    // As a parameter:
    int sum = Sum([1, 2, 3, 4, 5]);
}
```

You can't use a collection expression where a compile-time constant is expected, such as initializing a constant, or as the default value for a method argument.

Both of the previous examples used constants as the elements of a collection expression. You can also use variables for the elements as shown in the following example:

```csharp
string hydrogen = "H";
string helium = "He";
string lithium = "Li";
string beryllium = "Be";
string boron = "B";
string carbon = "C";
string nitrogen = "N";
string oxygen = "O";
string fluorine = "F";
string neon = "Ne";
string[] elements = [hydrogen, helium, lithium, beryllium, boron, carbon, nitrogen, oxygen, fluorine, neon];
foreach (var element in elements)
{
    Console.WriteLine(element);
}
```

### Spread element

You use a spread element `..` to inline collection values in a collection expression. The following example creates a collection for the full alphabet by combining a collection of the vowels, a collection of the consonants, and the letter "y", which can be either:

```csharp
string[] vowels = ["a", "e", "i", "o", "u"];
string[] consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
                       "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
string[] alphabet = [.. vowels, .. consonants, "y"];
```

- The spread element `..vowels`, when evaluated, produces five elements: "a", "e", "i", "o", and "u". - The spread element `..consonants` produces 20 elements, the number in the consonants array.
- The variable in a spread element must be enumerable using a foreach statement.
  As shown in the previous example, you can combine spread elements with individual elements in a collection expression.

### Conversions

A collection expression can be converted to different collection types, including:

- [System.Span<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.span-1) and [System.ReadOnlySpan<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.readonlyspan-1).
- [Arrays](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/arrays).
- Any type with a create method whose parameter type is `ReadOnlySpan<T>` where there's an implicit conversion from the collection expression type to `T`.
- Any type that supports a [collection initializer](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/object-and-collection-initializers#collection-initializers), such as [System.Collections.Generic.List<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.list-1). Usually, this requirement means the type supports [System.Collections.Generic.IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1) and there's an accessible `Add` method to add items to the collection. There must be an implicit conversion from the collection expression elements' type to the collection's element type. For spread elements, there must be an implicit conversion from the spread element's type to the collection's element type.
- Any of the following interfaces:
  - [System.Collections.Generic.IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1).
  - [System.Collections.Generic.IReadOnlyCollection<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ireadonlycollection-1).
  - [System.Collections.Generic.IReadOnlyList<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ireadonlylist-1).
  - [System.Collections.Generic.ICollection<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.icollection-1).
  - [System.Collections.Generic.IList<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ilist-1).

> A collection expression always creates a collection that includes all elements in the collection expression, regardless of the target type of the conversion. For example, when the target of the conversion is [System.Collections.Generic.IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1), the generated code evaluates the collection expression and stores the results in an in-memory collection.
> This behavior is distinct from LINQ, where a sequence might not be instantiated until it is enumerated. You can't use collection expressions to generate an infinite sequence that won't be enumerated.

The compiler uses static analysis to determine the most performant way to create the collection declared with a collection expression. For example, the empty collection expression, `[]`, can be realized as [Array.Empty<T>()](https://learn.microsoft.com/en-us/09_dotnet/api/system.array.empty#system-array-empty-1) if the target won't be modified after initialization. When the target is a [System.Span<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.span-1) or [System.ReadOnlySpan<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.readonlyspan-1), the storage might be stack allocated. The [collection expressions feature specification](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/proposals/csharp-12.0/collection-expressions) specifies the rules the compiler must follow.

Many APIs are overloaded with multiple collection types as parameters. Because a collection expression can be converted to many different expression types, these APIs might require casts on the collection expression to specify the correct conversion. The following conversion rules resolve some of the ambiguities:

- Conversion to [Span<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.span-1), [ReadOnlySpan<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.readonlyspan-1), or another [ref struct](<[System.ReadOnlySpan<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.readonlyspan-1)>) type is better than a conversion to a non-ref struct type.
- Conversion to a noninterface type is better than a conversion to an interface type.

When a collection expression is converted to a `Span` or `ReadOnlySpan`, the span object's safe context is taken from the safe context of all elements included in the span. For detailed rules, see the [Collection expression specification](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/proposals/csharp-12.0/collection-expressions#ref-safety).

Collection builder
Collection expressions work with any collection type that's _well-behaved_. A well-behaved collection has the following characteristics:

- The value of `Count` or `Length` on a [countable](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/proposals/csharp-12.0/collection-expressions#ref-safety) collection produces the same value as the number of elements when enumerated.
- The types in the [System.Collections.Generic](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic) namespace are presumed to be side-effect free. As such, the compiler can optimize scenarios where such types might be used as intermediary values, but otherwise not be exposed.
- A call to some applicable `.AddRange(x)` member on a collection will result in the same final value as iterating over `x` and adding all of its enumerated values individually to the collection with `.Add`.

All the collection types in the .NET runtime are well-behaved.

Warning: If a custom collection type isn't well-behaved, the behavior when you use that collection type with collection expressions is undefined.

Your types opt in to collection expression support by writing a Create() method and applying the System.Runtime.CompilerServices.CollectionBuilderAttribute on the collection type to indicate the builder method. For example, consider an application that uses fixed length buffers of 80 characters. That class might look something like the following code:

```csharp
public class LineBuffer : IEnumerable<char>
{
    private readonly char[] _buffer = new char[80];

    public LineBuffer(ReadOnlySpan<char> buffer)
    {
        int number = (_buffer.Length < buffer.Length) ? _buffer.Length : buffer.Length;
        for (int i = 0; i < number; i++)
        {
            _buffer[i] = buffer[i];
        }
    }

    public IEnumerator<char> GetEnumerator() => _buffer.AsEnumerable<char>().GetEnumerator();
    IEnumerator IEnumerable.GetEnumerator() => _buffer.GetEnumerator();

    // etc
}
```

You'd like to use it with collection expressions as shown in the following sample:

```csharp
LineBuffer line = ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!'];
```

The `LineBuffer` type implements `IEnumerable<char>`, so the compiler recognizes it as a collection of `char` items. The type parameter of the implemented [System.Collections.Generic.IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1) interface indicates the element type. You need to make two additions to your application to be able to assign collection expressions to a `LineBuffer` object. First, you need to create a class that contains a `Create` method:

```csharp
internal static class LineBufferBuilder
{
    internal static LineBuffer Create(ReadOnlySpan<char> values) => new LineBuffer(values);
}
```

The `Create` method must return a `LineBuffer` object, and it must take a single parameter of the type `ReadOnlySpan<char>`. The type parameter of the `ReadOnlySpan` must match the element type of the collection. A builder method that returns a generic collection would have the generic `ReadOnlySpan<T>` as its parameter. The method must be accessible and static.

Finally, you must add the [CollectionBuilderAttribute](https://learn.microsoft.com/en-us/09_dotnet/api/system.runtime.compilerservices.collectionbuilderattribute) to the `LineBuffer` class declaration:

```csharp
[CollectionBuilder(typeof(LineBufferBuilder), "Create")]
```

The first parameter provides the name of the `Builder` class. The second attribute provides the name of the builder method.
