---
title: "Member Access Expressions"
slug: "09_dotnet/0_c/0_getting_started/3_expressions/1_member_access_expression"
stack: "C#.NET"
---

You use several operators and expressions to access a type member. These operators include member access (`.`), array element or indexer access (`[]`), index-from-end (`^`), range (`..`), null-conditional operators (`?.` and `?[]`), and method invocation (`()`). These include the null-conditional member access (`?.`), and indexer access (`?[]`) operators.

## Access Operator `.`

You use the `.` token to access a member of a namespace or a type, as the following examples demonstrate:

Use `.` to access a nested namespace within a namespace, as the following example of a using directive shows:

```csharp
using System.Collections.Generic;
```

Use . to form a qualified name to access a type within a namespace, as the following code shows:

```csharp
System.Collections.Generic.IEnumerable<int> numbers = [1, 2, 3];
```

Use a using directive to make the use of qualified names optional.

Use `.` to access type members, static and non-static, as the following code shows:

```csharp
List<double> constants =
[
    Math.PI,
    Math.E
];
Console.WriteLine($"{constants.Count} values to show:");
Console.WriteLine(string.Join(", ", constants));
// Output:
// 2 values to show:
// 3.14159265358979, 2.71828182845905
```

You can also use `.` to access an extension method.

## Indexer operator `[]`

Square brackets, `[]`, are typically used for array, indexer, or pointer element access.

### Array access

The following example demonstrates how to access array elements:

```csharp
int[] fib = new int[10];
fib[0] = fib[1] = 1;
for (int i = 2; i < fib.Length; i++)
{
    fib[i] = fib[i - 1] + fib[i - 2];
}
Console.WriteLine(fib[fib.Length - 1]);  // output: 55

double[,] matrix = new double[2,2];
matrix[0,0] = 1.0;
matrix[0,1] = 2.0;
matrix[1,0] = matrix[1,1] = 3.0;
var determinant = matrix[0,0] * matrix[1,1] - matrix[1,0] * matrix[0,1];
Console.WriteLine(determinant);  // output: -3
```

If an array index is outside the bounds of the corresponding dimension of an array, an [IndexOutOfRangeException](https://learn.microsoft.com/en-us/09_dotnet/api/system.indexoutofrangeexception) is thrown.

As the preceding example shows, you also use square brackets when you declare an array type or instantiate an array instance.

For more information about arrays, see [Arrays](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/arrays).

### Indexer access

The following example uses the .NET [Dictionary<TKey,TValue>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.dictionary-2) type to demonstrate indexer access:

```csharp
var dict = new Dictionary<string, double>();
dict["one"] = 1;
dict["pi"] = Math.PI;
Console.WriteLine(dict["one"] + dict["pi"]);  // output: 4.14159265358979
```

Indexers allow you to index instances of a user-defined type in the similar way as array indexing. Unlike array indices, which must be integer, the indexer parameters can be declared to be of any type.

For more information about indexers, see Indexers.

### Other usages of `[]`

For information about pointer element access, see the Pointer element access operator `[]` section of the Pointer related operators article.

You also use square brackets to specify attributes:

```csharp
[System.Diagnostics.Conditional("DEBUG")]
void TraceMethod() {}
```

## Null-conditional Operators `?.` , `?[]`

A null-conditional operator applies a member access `?.` or element access `?[]` operation to its operand only if that operand evaluates to non-null; otherwise, it returns `null`. i.e.:

- If a evaluates to `null`, the result of `a?.x` or `a?[x]` is `null`.

- If a evaluates to non-null, the result of `a?.x` or `a?[x]` is the same as the result of `a.x` or `a[x]`, respectively.

Note : If `a.x` or `a[x]` throws an exception, `a?.x` or `a?[x]` would throw the same exception for non-null a. For example, if a is a non-null array instance and `x` is outside the bounds of `a`, `a?[x]` would throw an [IndexOutOfRangeException](https://learn.microsoft.com/en-us/09_dotnet/api/system.indexoutofrangeexception).

The null-conditional operators are short-circuiting. That is, if one operation in a chain of conditional member or element access operations returns `null`, the rest of the chain doesn't execute. In the following example, `B` isn't evaluated if `A` evaluates to `null` and `C` isn't evaluated if `A` or `B` evaluates to `null`:

```csharp
A?.B?.Do(C);
A?.B?[C];
```

If `A` might be `null` but `B` and `C` wouldn't be `null` if `A` isn't null, you only need to apply the null-conditional operator to `A`:

```csharp
A?.B.C();
```

In the preceding example, `B` isn't evaluated and `C()` isn't called if `A` is `null`. However, if the chained member access is interrupted, for example by parentheses as in `(A?.B).C()`, short-circuiting doesn't happen.

The following examples demonstrate the usage of the `?.` and `?[]` operators:

```csharp
double SumNumbers(List<double[]> setsOfNumbers, int indexOfSetToSum)
{
    return setsOfNumbers?[indexOfSetToSum]?.Sum() ?? double.NaN;
}

var sum1 = SumNumbers(null, 0);
Console.WriteLine(sum1);  // output: NaN

List<double[]?> numberSets =
[
    [1.0, 2.0, 3.0],
    null
];

var sum2 = SumNumbers(numberSets, 0);
Console.WriteLine(sum2);  // output: 6

var sum3 = SumNumbers(numberSets, 1);
Console.WriteLine(sum3);  // output: NaN
```

```csharp
namespace MemberAccessOperators2;

public static class NullConditionalShortCircuiting
{
    public static void Main()
    {
        Person? person = null;
        person?.Name.Write(); // no output: Write() is not called due to short-circuit.
        try
        {
            (person?.Name).Write();
        }
        catch (NullReferenceException)
        {
            Console.WriteLine("NullReferenceException");
        }; // output: NullReferenceException
    }
}

public class Person
{
    public required FullName Name { get; set; }
}

public class FullName
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public void Write() => Console.WriteLine($"{FirstName} {LastName}");
}
```

The first of the preceding two examples also uses the [null-coalescing operator ??](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/null-coalescing-operator) to specify an alternative expression to evaluate in case the result of a null-conditional operation is `null`.

If `a.x` or `a[x]` is of a non-nullable value type `T`, `a?.x` or `a?[x]` is of the corresponding nullable value type `T?`. If you need an expression of type `T`, apply the null-coalescing operator `??` to a null-conditional expression, as the following example shows:

```csharp
int GetSumOfFirstTwoOrDefault(int[]? numbers)
{
    if ((numbers?.Length ?? 0) < 2)
    {
        return 0;
    }
    return numbers[0] + numbers[1];
}

Console.WriteLine(GetSumOfFirstTwoOrDefault(null));  // output: 0
Console.WriteLine(GetSumOfFirstTwoOrDefault([]));  // output: 0
Console.WriteLine(GetSumOfFirstTwoOrDefault([3, 4, 5]));  // output: 7
```

In the preceding example, if you don't use the `??` operator, `numbers?.Length < 2` evaluates to `false` when numbers is `null`.

✏️: The `?.` operator evaluates its left-hand operand no more than once, guaranteeing that it cannot be changed to `null` after being verified as non-null.

The null-conditional member access operator `?.` is also known as the **Elvis operator**.

### Thread-safe delegate invocation

Use the `?.` operator to check if a delegate is non-null and invoke it in a thread-safe way (for example, when you raise an event), as the following code shows:

```csharp
PropertyChanged?.Invoke(…)
```

That code is equivalent to the following code:

```csharp
var handler = this.PropertyChanged;
if (handler != null)
{
    handler(…);
}
```

The preceding example is a thread-safe way to ensure that only a non-null `handler` is invoked. Because delegate instances are immutable, no thread can change the object referenced by the `handler` local variable. In particular, if the code executed by another thread unsubscribes from the `PropertyChanged` event and `PropertyChanged` becomes `null` before handler is invoked, the object referenced by `handler` remains unaffected.

### Invocation expression ()

Use parentheses, `()`, to call a method or invoke a delegate.

The following example demonstrates how to call a method, with or without arguments, and invoke a delegate:

```csharp
Action<int> display = s => Console.WriteLine(s);

List<int> numbers =
[
    10,
    17
];
display(numbers.Count);   // output: 2

numbers.Clear();
display(numbers.Count);   // output: 0
```

You also use parentheses when you invoke a [constructor](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/constructors) with the [new](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/new-operator) operator.

**Other usages of ()**
You also use parentheses to adjust the order in which to evaluate operations in an expression. For more information, see C# operators.

[Cast expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/new-operator), which perform explicit type conversions, also use parentheses.

### Index from end operator `^`

Index and range operators can be used with a type that is _countable_. A _countable_ type is a type that has an int property named either `Count` or `Length` with an accessible `get` accessor. Collection expressions also rely on _countable_ types.

The `^` operator indicates the element position from the end of a sequence. For a sequence of length `length`, `^n` points to the element with offset `length - n` from the start of a sequence. For example, `^1` points to the last element of a sequence and `^length` points to the first element of a sequence.

```csharp
int[] xs = [0, 10, 20, 30, 40];
int last = xs[^1];
Console.WriteLine(last);  // output: 40

List<string> lines = ["one", "two", "three", "four"];
string prelast = lines[^2];
Console.WriteLine(prelast);  // output: three

string word = "Twenty";
Index toFirst = ^word.Length;
char first = word[toFirst];
Console.WriteLine(first);  // output: T
```

As the preceding example shows, expression `^e` is of the [System.Index](https://learn.microsoft.com/en-us/09_dotnet/api/system.index) type. In expression `^e`, the result of `e` must be implicitly convertible to `int`.

You can also use the `^` operator with the range operator `..` to create a range of indices. For more information, see Indices and ranges.

Beginning with C# 13, the Index from the end operator can be used in an object initializer.

## Range operator `..`

The `..` operator specifies the start and end of a range of indices as its operands. The left-hand operand is an _inclusive start_ of a range. The right-hand operand is an _exclusive_ end of a range. Either of the operands can be an index from the start or from the end of a sequence, as the following example shows:

```csharp
int[] numbers = [0, 10, 20, 30, 40, 50];
int start = 1;
int amountToTake = 3;
int[] subset = numbers[start..(start + amountToTake)];
Display(subset);  // output: 10 20 30

int margin = 1;
int[] inner = numbers[margin..^margin];
Display(inner);  // output: 10 20 30 40

string line = "one two three";
int amountToTakeFromEnd = 5;
Range endIndices = ^amountToTakeFromEnd..^0;
string end = line[endIndices];
Console.WriteLine(end);  // output: three

void Display<T>(IEnumerable<T> xs) => Console.WriteLine(string.Join(" ", xs));
```

As the preceding example shows, expression `a..b` is of the [System.Range](https://learn.microsoft.com/en-us/09_dotnet/api/system.range) type. In expression `a..b`, the results of `a` and `b` must be implicitly convertible to `Int32` or `Index`.

Important: Implicit conversions from int to Index throw an [ArgumentOutOfRangeException](https://learn.microsoft.com/en-us/09_dotnet/api/system.argumentoutofrangeexception) when the value is negative.

You can omit any of the operands of the `..` operator to obtain an open-ended range:

- `a..` is equivalent to a..^0
- `..b` is equivalent to 0..b
- `..` is equivalent to 0..^0

```csharp
int[] numbers = [0, 10, 20, 30, 40, 50];
int amountToDrop = numbers.Length / 2;

int[] rightHalf = numbers[amountToDrop..];
Display(rightHalf);  // output: 30 40 50

int[] leftHalf = numbers[..^amountToDrop];
Display(leftHalf);  // output: 0 10 20

int[] all = numbers[..];
Display(all);  // output: 0 10 20 30 40 50

void Display<T>(IEnumerable<T> xs) => Console.WriteLine(string.Join(" ", xs));
```

The following table shows various ways to express collection ranges:

| Range operator expression | Description                                                                  |
| ------------------------- | ---------------------------------------------------------------------------- |
| ..                        | All values in the collection.                                                |
| ..end                     | Values from the start to the end exclusively.                                |
| start..                   | Values from the start inclusively to the end.                                |
| start..end                | Values from the start inclusively to the end exclusively.                    |
| ^start..                  | Values from the start inclusively to the end counting from the end.          |
| ..^end                    | Values from the start to the end exclusively counting from the end.          |
| start..^end               | Values from start inclusively to end exclusively counting from the end.      |
| ^start..^end              | Values from start inclusively to end exclusively both counting from the end. |

The following example demonstrates the effect of using all the ranges presented in the preceding table:

```csharp
int[] oneThroughTen =
[
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

Write(oneThroughTen, ..);
Write(oneThroughTen, ..3);
Write(oneThroughTen, 2..);
Write(oneThroughTen, 3..5);
Write(oneThroughTen, ^2..);
Write(oneThroughTen, ..^3);
Write(oneThroughTen, 3..^4);
Write(oneThroughTen, ^4..^2);

static void Write(int[] values, Range range) =>
Console.WriteLine($"{range}:\t{string.Join(", ", values[range])}");
// Sample output:
// 0..^0: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
// 0..3: 1, 2, 3
// 2..^0: 3, 4, 5, 6, 7, 8, 9, 10
// 3..5: 4, 5
// ^2..^0: 9, 10
// 0..^3: 1, 2, 3, 4, 5, 6, 7
// 3..^4: 4, 5, 6
// ^4..^2: 7, 8
```

For more information, see [Indices and ranges](https://learn.microsoft.com/en-us/09_dotnet/csharp/tutorials/ranges-indexes).

The `..` token is also used as the spread operator in a collection expression.

## Operator overloadability

The `.`, `()`, `^`, and `..` operators can't be overloaded. The `[]` operator is also considered a non-overloadable operator. Use indexers to support indexing with user-defined types.