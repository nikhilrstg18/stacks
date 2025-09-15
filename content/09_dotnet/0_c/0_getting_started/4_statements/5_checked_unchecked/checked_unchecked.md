---
title: "Checked & Unchecked Statements"
slug: "09_dotnet/0_c/0_getting_started/4_statements/5_checked_unchecked"
stack: "C#.NET"
---

The `checked` and `unchecked` statements specify the overflow-checking context for integral-type arithmetic operations and conversions. When integer arithmetic overflow occurs, the overflow-checking context defines what happens. In a checked context, a [System.OverflowException](https://learn.microsoft.com/en-us/09_dotnet/api/system.overflowexception) is thrown; if overflow happens in a constant expression, a compile-time error occurs. In an unchecked context, the operation result is truncated by discarding any high-order bits that don't fit in the destination type. For example, in the case of addition it wraps from the maximum value to the minimum value. The following example shows the same operation in both a checked and unchecked context:

```csharp
uint a = uint.MaxValue;

unchecked
{
    Console.WriteLine(a + 3);  // output: 2
}

try
{
    checked
    {
        Console.WriteLine(a + 3);
    }
}
catch (OverflowException e)
{
    Console.WriteLine(e.Message);  // output: Arithmetic operation resulted in an overflow.
}
```

✏️: The behavior of _user-defined_ operators and conversions in the case of overflow can differ from the one described in the preceding paragraph. In particular, [user-defined checked operators](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/arithmetic-operators#user-defined-checked-operators) might not throw an exception in a checked context.

For more information, see the [Arithmetic overflow and division by zero](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/arithmetic-operators#arithmetic-overflow-and-division-by-zero) and [User-defined checked operators](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/arithmetic-operators#user-defined-checked-operators) sections of the Arithmetic operators article.

To specify the overflow-checking context for an expression, you can also use the `checked` and `unchecked` operators, as the following example shows:

```csharp
double a = double.MaxValue;

int b = unchecked((int)a);
Console.WriteLine(b);  // output: -2147483648

try
{
    b = checked((int)a);
}
catch (OverflowException e)
{
    Console.WriteLine(e.Message);  // output: Arithmetic operation resulted in an overflow.
}
```

The `checked` and `unchecked` statements and operators only affect the overflow-checking context for those operations that are textually inside the statement block or operator's parentheses, as the following example shows:

```csharp
int Multiply(int a, int b) => a * b;

int factor = 2;

try
{
    checked
    {
        Console.WriteLine(Multiply(factor, int.MaxValue));  // output: -2
    }
}
catch (OverflowException e)
{
    Console.WriteLine(e.Message);
}

try
{
    checked
    {
        Console.WriteLine(Multiply(factor, factor * int.MaxValue));
    }
}
catch (OverflowException e)
{
    Console.WriteLine(e.Message);  // output: Arithmetic operation resulted in an overflow.
}
```

At the preceding example, the first invocation of the `Multiply` local function shows that the checked statement doesn't affect the overflow-checking context within the `Multiply` function as no exception is thrown. At the second invocation of the `Multiply` function, the expression that calculates the second argument of the function is evaluated in a checked context and results in an exception as it's textually inside the block of the `checked` statement.

## Operations affected by the overflow-checking context

The overflow-checking context affects the following operations:

- The following built-in [arithmetic operators](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/arithmetic-operators): unary `++`, `--`, `-` and binary `+`, `-`, `*`, and `/` operators, when their operands are of an integral type (that is, either integral numeric or char type) or an enum type.

- Explicit numeric conversions between integral types or from float or double to an integral type.

✏️: When you convert a decimal value to an integral type and the result is outside the range of the destination type, an [OverflowException](https://learn.microsoft.com/en-us/09_dotnet/api/system.overflowexception) is always thrown, regardless of the overflow-checking context.

Beginning with C# 11, user-defined checked operators and conversions. For more information, see the [User-defined checked operators](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/arithmetic-operators#user-defined-checked-operators) section of the Arithmetic operators article.

## Default overflow-checking context

If you don't specify the overflow-checking context, the value of the [CheckForOverflowUnderflow](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/compiler-options/language#checkforoverflowunderflow) compiler option defines the default context for non-constant expressions. By default the value of that option is unset and integral-type arithmetic operations and conversions are executed in an _unchecked_ context.

Constant expressions are evaluated by default in a checked context and a compile-time error occurs in the case of overflow. You can explicitly specify an unchecked context for a constant expression with the `unchecked` statement or operator.
