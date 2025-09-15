---
title: "Expressions"
slug: "09_dotnet/0_c/0_getting_started/3_expressions"
stack: "C#.NET"
---

## Overview

> Expressions are constructed from operands and operators.

- The operators of an expression indicate which operations to apply to the operands. Examples of operators include `+`, `-`, `*`, `/`, and `new`. Examples of operands include `literals`, `fields`, `local variables`, and `expressions`.

- When an expression contains multiple operators, the precedence of the operators controls the order in which the individual operators are evaluated.

For example,
the expression `x + y * z` is evaluated as `x + (y * z)` because the `*` operator has higher precedence than the `+` operator.

- When an operand occurs between two operators with the same precedence, the associativity of the operators controls the order in which the operations are performed:

- Except for the _assignment_ and _null-coalescing_ operators, all binary operators are left-associative, meaning that operations are performed from left to right. For example, `x + y + z` is evaluated as `(x + y) + z`.

- The assignment `=`operators, the null-coalescing `??` and `??=` operators, and the conditional operator `?:` are right-associative, meaning that operations are performed from right to left.
  For example, `x = y = z`is evaluated as `x = (y = z)`.

- Precedence and associativity can be controlled using parentheses.
  For example, `x + y * z` first multiplies `y` by `z` and then adds the result to `x`, but `(x + y) * z` first adds `x` and `y` and then multiplies the result by `z`.

Most operators can be [overloaded](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/operator-overloading). Operator overloading permits user-defined operator implementations to be specified for operations where one or both of the operands are of a user-defined class or struct type.

- The simplest C# expressions are literals (for example, [integer](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/integral-numeric-types#integer-literals) and [real](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types#real-literals) numbers) and names of variables.

- You can combine them into complex expressions by using operators. Operator [precedence](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/#operator-precedence) and [associativity](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/#operator-associativity) determine the order in which the operations in an expression are performed. You can use parentheses to change the order of evaluation imposed by operator precedence and associativity.

## Kinds of expressions

### assignment expressions

- where expressions are at the right-hand side of

```csharp
int a, b, c;
a = 7;
b = a;
c = b++;
b = a + b * c;
c = a >= 100 ? b : c / 10;
a = (int)Math.Sqrt(b * b + c * c);

string s = "String literal";
char l = s[s.Length - 1];

List<int> numbers = [..collection];
b = numbers.FindLast(n => n > 1);
```

Typically, an expression produces a result and can be included in another expression. A [void](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/void) method call is an example of an expression that doesn't produce a result. It can be used only as a [statement](../../2_statements), as the following example shows:

```csharp
Console.WriteLine("Hello, world!");
```

### [Interpolated string expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/tokens/interpolated)

- that provide convenient syntax to create formatted strings:

```csharp{2}
var r = 2.3;
var message = $"The area of a circle with radius {r} is {Math.PI * r * r:F3}.";
Console.WriteLine(message);
// Output:
// The area of a circle with radius 2.3 is 16.619.
```

### [Lambda expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/lambda-expressions)

- that allow you to create anonymous functions:

```csharp{2}
int[] numbers = { 2, 3, 4, 5 };
var maximumSquare = numbers.Max(x => x * x);
Console.WriteLine(maximumSquare);
// Output:
// 25
```

### [Query expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/query-keywords)

- that allow you to use query capabilities directly in C#:

```csharp{2-6}
int[] scores = { 90, 97, 78, 68, 85 };
IEnumerable<int> highScoresQuery =
    from score in scores
    where score > 80
    orderby score descending
    select score;
Console.WriteLine(string.Join(" ", highScoresQuery));
// Output:
// 97 90 85
```

### [Expression body definition](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/statements-expressions-operators/expression-bodied-members)

- to provide a concise definition for a method, constructor, property, indexer, or finalizer.

### [Default value expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/patterns)

A default value expression produces the default value of a type. There are two kinds of default value expressions: the default operator call and a default literal.

You also use the `default` keyword as the default case label within a `switch` statement.

#### default operator

The argument to the default operator must be the name of a type or a type parameter, as the following example shows:

```csharp
Console.WriteLine(default(int));  // output: 0
Console.WriteLine(default(object) is null);  // output: True

void DisplayDefaultOf<T>()
{
    var val = default(T);
    Console.WriteLine($"Default value of {typeof(T)} is {(val == null ? "null" : val.ToString())}.");
}

DisplayDefaultOf<int?>();
DisplayDefaultOf<System.Numerics.Complex>();
DisplayDefaultOf<System.Collections.Generic.List<int>>();
// Output:
// Default value of System.Nullable`1[System.Int32] is null.
// Default value of System.Numerics.Complex is (0, 0).
// Default value of System.Collections.Generic.List`1[System.Int32] is null.
```

#### default literal

You can use the `default` literal to produce the default value of a type when the compiler can infer the expression type. The `default` literal expression produces the same value as the `default(T)` expression where `T` is the inferred type. You can use the default literal in any of the following cases:

- In the assignment or initialization of a variable.
- In the declaration of the default value for an [optional method parameter](https://learn.microsoft.com/en-us/09_dotnet/csharp/methods#optional-parameters-and-arguments).
- In a method call to provide an argument value.
- In a `return` statement or as an expression in an [expression-bodied member](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/statements-expressions-operators/expression-bodied-members).

The following example shows the usage of the default literal:

```csharp
T[] InitializeArray<T>(int length, T initialValue = default)
{
    if (length < 0)
    {
        throw new ArgumentOutOfRangeException(nameof(length), "Array length must be nonnegative.");
    }

    var array = new T[length];
    for (var i = 0; i < length; i++)
    {
        array[i] = initialValue;
    }
    return array;
}

void Display<T>(T[] values) => Console.WriteLine($"[ {string.Join(", ", values)} ]");

Display(InitializeArray<int>(3));  // output: [ 0, 0, 0 ]
Display(InitializeArray<bool>(4, default));  // output: [ False, False, False, False ]

System.Numerics.Complex fillValue = default;
Display(InitializeArray(3, fillValue));  // output: [ (0, 0), (0, 0), (0, 0) ]
```

💡: Use .NET style rule [IDE0034](https://learn.microsoft.com/en-us/09_dotnet/fundamentals/code-analysis/style-rules/ide0034) to specify a preference on the use of the default literal in your codebase.

### [nameof expression](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/nameof)

A `nameof` expression produces the name of a variable, type, or member as the string constant. A `nameof` expression is evaluated at compile time and has no effect at run time. When the operand is a type or a namespace, the produced name isn't fully qualified. The following example shows the use of a `nameof` expression:

```csharp
Console.WriteLine(nameof(System.Collections.Generic));  // output: Generic
Console.WriteLine(nameof(List<int>));  // output: List
Console.WriteLine(nameof(List<int>.Count));  // output: Count
Console.WriteLine(nameof(List<int>.Add));  // output: Add

List<int> numbers = new() { 1, 2, 3 };
Console.WriteLine(nameof(numbers));  // output: numbers
Console.WriteLine(nameof(numbers.Count));  // output: Count
Console.WriteLine(nameof(numbers.Add));  // output: Add
```

You can use a `nameof` expression to make the argument-checking code more maintainable:

```csharp
public string Name
{
    get => name;
    set => name = value ?? throw new ArgumentNullException(nameof(value), $"{nameof(Name)} cannot be null");
}
```

Beginning with C# 11, you can use a nameof expression with a method parameter inside an attribute on a method or its parameter. The following code shows how to do that for an attribute on a method, a local function, and the parameter of a lambda expression:

```csharp
public static void Method(string msg)
[ParameterString(nameof(msg))]
{
    [ParameterString(nameof(T))]
    void LocalFunction<T>(T param) { }

    var lambdaExpression = ([ParameterString(nameof(aNumber))] int aNumber) => aNumber.ToString();
}
```

A `nameof` expression with a parameter is useful when you use the nullable analysis attributes or the CallerArgumentExpression attribute.

When the operand is a verbatim identifier, the `@` character isn't the part of a name, as the following example shows:

```csharp
var @new = 5;
Console.WriteLine(nameof(@new));  // output: new
```

### [switch expression](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/switch-expression)

You use the `switch` expression to evaluate a single expression from a list of candidate expressions based on a pattern match with an input expression. For information about the `switch` statement that supports switch-like semantics in a statement context, see the `switch` statement section of the Selection statements article.

The following example demonstrates a `switch` expression, which converts values of an enum representing visual directions in an online map to the corresponding cardinal directions:

```csharp
public static class SwitchExample
{
    public enum Direction
    {
        Up,
        Down,
        Right,
        Left
    }

    public enum Orientation
    {
        North,
        South,
        East,
        West
    }

    public static Orientation ToOrientation(Direction direction) => direction switch
    {
        Direction.Up    => Orientation.North,
        Direction.Right => Orientation.East,
        Direction.Down  => Orientation.South,
        Direction.Left  => Orientation.West,
        _ => throw new ArgumentOutOfRangeException(nameof(direction), $"Not expected direction value: {direction}"),
    };

    public static void Main()
    {
        var direction = Direction.Right;
        Console.WriteLine($"Map view direction is {direction}");
        Console.WriteLine($"Cardinal orientation is {ToOrientation(direction)}");
        // Output:
        // Map view direction is Right
        // Cardinal orientation is East
    }
}
```

The preceding example shows the basic elements of a switch expression:

- An expression followed by the `switch` keyword. In the preceding example, it's the direction method parameter.
- The switch expression arms, separated by commas. Each switch expression arm contains a pattern, an optional case guard, the => token, and an expression.
- At the preceding example, a switch expression uses the following patterns:

- A _constant pattern_: to handle the defined values of the Direction enumeration.
- A _discard pattern_: to handle any integer value that doesn't have the corresponding member of the Direction enumeration (for example, (Direction)10). That makes the switch expression exhaustive.

Important: For information about the patterns supported by the `switch` expression and more examples, see [Patterns](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/patterns).

The result of a switch expression is the value of the expression of the first switch expression arm whose pattern matches the input expression and whose case guard, if present, evaluates to true. The switch expression arms are evaluated in text order.

The compiler generates an error when a lower switch expression arm can't be chosen because a higher switch expression arm matches all its values.

**Case guards**
A pattern may be not expressive enough to specify the condition for the evaluation of an arm's expression. In such a case, you can use a _case guard_. A _case guard_ is another condition that must be satisfied together with a matched pattern. A _case guard_ must be a Boolean expression. You specify a _case guard_ after the when keyword that follows a pattern, as the following example shows:

```csharp
public readonly struct Point
{
    public Point(int x, int y) => (X, Y) = (x, y);

    public int X { get; }
    public int Y { get; }
}

static Point Transform(Point point) => point switch
{
    { X: 0, Y: 0 }                    => new Point(0, 0),
    { X: var x, Y: var y } when x < y => new Point(x + y, y),
    { X: var x, Y: var y } when x > y => new Point(x - y, y),
    { X: var x, Y: var y }            => new Point(2 * x, 2 * y),
};
```

The preceding example uses property patterns with nested var patterns.

**Non-exhaustive switch expressions**
If none of a `switch` expression's patterns matches an input value, the runtime throws an exception. In .NET Core 3.0 and later versions, the exception is a System.Runtime.CompilerServices.SwitchExpressionException. In .NET Framework, the exception is an InvalidOperationException. In most cases, the compiler generates a warning if a `switch` expression doesn't handle all possible input values. List patterns don't generate a warning when all possible inputs aren't handled.

💡: To guarantee that a switch expression handles all possible input values, provide a switch expression arm with a _discard pattern_.

### [with expression](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/with-expression)

A with expression produces a copy of its operand with the specified properties and fields modified. You use the object initializer syntax to specify what members to modify and their new values:

```csharp
using System;

public class WithExpressionBasicExample
{
    public record NamedPoint(string Name, int X, int Y);

    public static void Main()
    {
        var p1 = new NamedPoint("A", 0, 0);
        Console.WriteLine($"{nameof(p1)}: {p1}");  // output: p1: NamedPoint { Name = A, X = 0, Y = 0 }
        
        var p2 = p1 with { Name = "B", X = 5 };
        Console.WriteLine($"{nameof(p2)}: {p2}");  // output: p2: NamedPoint { Name = B, X = 5, Y = 0 }
        
        var p3 = p1 with 
            { 
                Name = "C", 
                Y = 4 
            };
        Console.WriteLine($"{nameof(p3)}: {p3}");  // output: p3: NamedPoint { Name = C, X = 0, Y = 4 }

        Console.WriteLine($"{nameof(p1)}: {p1}");  // output: p1: NamedPoint { Name = A, X = 0, Y = 0 }

        var apples = new { Item = "Apples", Price = 1.19m };
        Console.WriteLine($"Original: {apples}");  // output: Original: { Item = Apples, Price = 1.19 }
        var saleApples = apples with { Price = 0.79m };
        Console.WriteLine($"Sale: {saleApples}");  // output: Sale: { Item = Apples, Price = 0.79 }
    }
}
```
The left-hand operand of a `with` expression can be of a [record type](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/record). Beginning with C# 10, a left-hand operand of a `with` expression can also be of a [structure type](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/struct) or an [anonymous type](https://learn.microsoft.com/en-us/09_dotnet/csharp/fundamentals/types/anonymous-types).

The result of a `with` expression has the same run-time type as the expression's operand, as the following example shows:

```csharp
using System;

public class InheritanceExample
{
    public record Point(int X, int Y);
    public record NamedPoint(string Name, int X, int Y) : Point(X, Y);

    public static void Main()
    {
        Point p1 = new NamedPoint("A", 0, 0);
        Point p2 = p1 with { X = 5, Y = 3 };
        Console.WriteLine(p2 is NamedPoint);  // output: True
        Console.WriteLine(p2);  // output: NamedPoint { X = 5, Y = 3, Name = A }
    }
}
```
In the case of a reference-type member, only the reference to a member instance is copied when an operand is copied. Both the copy and original operand have access to the same reference-type instance. The following example demonstrates that behavior:

```csharp
using System;
using System.Collections.Generic;

public class ExampleWithReferenceType
{
    public record TaggedNumber(int Number, List<string> Tags)
    {
        public string PrintTags() => string.Join(", ", Tags);
    }

    public static void Main()
    {
        var original = new TaggedNumber(1, new List<string> { "A", "B" });

        var copy = original with { Number = 2 };
        Console.WriteLine($"Tags of {nameof(copy)}: {copy.PrintTags()}");
        // output: Tags of copy: A, B

        original.Tags.Add("C");
        Console.WriteLine($"Tags of {nameof(copy)}: {copy.PrintTags()}");
        // output: Tags of copy: A, B, C
    }
}
```
**Custom copy semantics**

Any record class type has the _copy constructor_. A _copy constructor_ is a constructor with a single parameter of the containing record type. It copies the state of its argument to a new record instance. At evaluation of a `with` expression, the _copy constructor_ gets called to instantiate a new record instance based on an original record. After that, the new instance gets updated according to the specified modifications. By default, the _copy constructor_ is implicit, that is, compiler-generated. If you need to customize the record copy semantics, explicitly declare a _copy constructor_ with the desired behavior. The following example updates the preceding example with an explicit _copy constructor_. The new copy behavior is to copy list items instead of a list reference when a record is copied:

```csharp
using System;
using System.Collections.Generic;

public class UserDefinedCopyConstructorExample
{
    public record TaggedNumber(int Number, List<string> Tags)
    {
        protected TaggedNumber(TaggedNumber original)
        {
            Number = original.Number;
            Tags = new List<string>(original.Tags);
        }

        public string PrintTags() => string.Join(", ", Tags);
    }

    public static void Main()
    {
        var original = new TaggedNumber(1, new List<string> { "A", "B" });

        var copy = original with { Number = 2 };
        Console.WriteLine($"Tags of {nameof(copy)}: {copy.PrintTags()}");
        // output: Tags of copy: A, B

        original.Tags.Add("C");
        Console.WriteLine($"Tags of {nameof(copy)}: {copy.PrintTags()}");
        // output: Tags of copy: A, B
    }
}
```
You can't customize the copy semantics for structure types.