---
title: "Equality Operators"
slug: "09_dotnet/0_c/0_getting_started/5_operators/3_equality"
stack: "C#.NET"
---

The `==` (equality) and `!=` (inequality) operators check if their operands are equal or not. Value types are equal when their contents are equal. Reference types are equal when the two variables refer to the same storage.

## Equality operator **==**

The equality operator `==` returns `true` if its operands are equal, `false` otherwise.

### Value types equality

Operands of the [built-in value](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/value-types#built-in-value-types) types are equal if their values are equal:

```csharp
int a = 1 + 2 + 3;
int b = 6;
Console.WriteLine(a == b);  // output: True

char c1 = 'a';
char c2 = 'A';
Console.WriteLine(c1 == c2);  // output: False
Console.WriteLine(c1 == char.ToLower(c2));  // output: True
```

✏️: For the `==`, `<`, `>`, `<=`, and `>=` operators, if any of the operands is not a number (Double.NaN or Single.NaN), the result of operation is `false`. That means that the `NaN` value is neither greater than, less than, nor equal to any other double (or float) value, including `NaN`. For more information and examples, see the [Double.NaN](https://learn.microsoft.com/en-us/09_dotnet/api/system.double.nan#system-double-nan) or [Single.NaN](https://learn.microsoft.com/en-us/09_dotnet/api/system.single.nan#system-single-nan) reference article.

Two operands of the same [enum](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/enum) type are equal if the corresponding values of the underlying integral type are equal.

User-defined [struct](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/struct) types don't support the `==` operator by default. To support the `==` operator, a user-defined struct must [overload](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/operator-overloading) it.

The `==` and `!=` operators are supported by C# [tuples](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/value-tuples). For more information, see the Tuple equality section of the Tuple types article.

### Reference types equality
By default, two non-record reference-type operands are equal if they refer to the same object:

```csharp
public class ReferenceTypesEquality
{
public class MyClass
{
private int id;

        public MyClass(int id) => this.id = id;
    }

    public static void Main()
    {
        var a = new MyClass(1);
        var b = new MyClass(1);
        var c = a;
        Console.WriteLine(a == b);  // output: False
        Console.WriteLine(a == c);  // output: True
    }

}
```
As the example shows, user-defined reference types support the `==` operator by default. However, a reference type can overload the `==` operator. If a reference type overloads the `==` operator, use the [Object.ReferenceEquals](https://learn.microsoft.com/en-us/09_dotnet/api/system.object.referenceequals) method to check if two references of that type refer to the same object.

### Record types equality
[Record types](https://learn.microsoft.com/en-us/09_dotnet/api/system.object.referenceequals) support the `==` and `!=` operators that by default provide value equality semantics. That is, two record operands are equal when both of them are null or corresponding values of all fields and auto-implemented properties are equal.

```csharp
public class RecordTypesEquality
{
public record Point(int X, int Y, string Name);
public record TaggedNumber(int Number, List<string> Tags);

    public static void Main()
    {
        var p1 = new Point(2, 3, "A");
        var p2 = new Point(1, 3, "B");
        var p3 = new Point(2, 3, "A");

        Console.WriteLine(p1 == p2);  // output: False
        Console.WriteLine(p1 == p3);  // output: True

        var n1 = new TaggedNumber(2, new List<string>() { "A" });
        var n2 = new TaggedNumber(2, new List<string>() { "A" });
        Console.WriteLine(n1 == n2);  // output: False
    }

}
```
As the preceding example shows, for non-record reference-type members their reference values are compared, not the referenced instances.

### String equality
Two string operands are equal when both of them are `null` or both string instances are of the same length and have identical characters in each character position:

```csharp
string s1 = "hello!";
string s2 = "HeLLo!";
Console.WriteLine(s1 == s2.ToLower()); // output: True

string s3 = "Hello!";
Console.WriteLine(s1 == s3); // output: False
```

String equality comparisons are case-sensitive ordinal comparisons. For more information about string comparison, see [How to compare strings in C#](https://learn.microsoft.com/en-us/09_dotnet/csharp/how-to/compare-strings).

### Delegate equality
Two [delegate](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/delegates/) operands of the same run-time type are equal when both of them are null or their invocation lists are of the same length and have equal entries in each position:

```csharp
Action a = () => Console.WriteLine("a");

Action b = a + a;
Action c = a + a;
Console.WriteLine(object.ReferenceEquals(b, c)); // output: False
Console.WriteLine(b == c); // output: True
```
For more information, see the [Delegate equality operators](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/delegates/) section of the C# language specification.

Delegates that are produced from evaluation of semantically identical [lambda expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/delegates/) aren't equal, as the following example shows:

```csharp
Action a = () => Console.WriteLine("a");
Action b = () => Console.WriteLine("a");

Console.WriteLine(a == b); // output: False
Console.WriteLine(a + b == a + b); // output: True
Console.WriteLine(b + a == a + b); // output: False
```

## Inequality operator **!=**

The inequality operator `!=` returns true if its operands aren't equal, false otherwise. For the operands of the built-in types, the expression `x != y` produces the same result as the expression `!(x == y)`. For more information about type equality, see the Equality operator section.

The following example demonstrates the usage of the `!=` operator:

```csharp
int a = 1 + 1 + 2 + 3;
int b = 6;
Console.WriteLine(a != b); // output: True

string s1 = "Hello";
string s2 = "Hello";
Console.WriteLine(s1 != s2); // output: False

object o1 = 1;
object o2 = 1;
Console.WriteLine(o1 != o2); // output: True
```

## Operator overloadability
A user-defined type can [overload](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/delegates) the `==` and `!=` operators. If a type overloads one of the two operators, it must also overload the other one.

A record type can't explicitly overload the `==` and `!=` operators. If you need to change the behavior of the `==` and `!=` operators for record type `T`, implement the `IEquatable<T>.Equals` method with the following signature:

```csharp
public virtual bool Equals(T? other);
```
