---
title: "Expressions"
slug: "09_dotnet/0_c/0_getting_started/5_operators/4_comparison"
stack: "C#.NET"
---

The `<`(less than), `>` (greater than), `<=` (less than or equal), and `>=` (greater than or equal) comparison, also known as relational, operators compare their operands. Those operators are supported by all integral and floating-point numeric types.

✏️: For the `==`, `<`, `>`, `<=`, and `>=` operators, if any of the operands is not a number (Double.NaN or Single.NaN), the result of operation is false. That means that the NaN value is neither greater than, less than, nor equal to any other double (or float) value, including NaN. For more information and examples, see the Double.NaN or Single.NaN reference article.

The `char` type also supports comparison operators. In the case of `char` operands, the corresponding character codes are compared.

Enumeration types also support comparison operators. For operands of the same [enum](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/enum) type, the corresponding values of the underlying integral type are compared.

The `==` and `!=` operators check if their operands are equal or not.

# Less than operator **<**
The `<` operator returns true if its left-hand operand is less than its right-hand operand, false otherwise:

```csharp
Console.WriteLine(7.0 < 5.1);   // output: False
Console.WriteLine(5.1 < 5.1);   // output: False
Console.WriteLine(0.0 < 5.1);   // output: True

Console.WriteLine(double.NaN < 5.1);   // output: False
Console.WriteLine(double.NaN >= 5.1);  // output: False
```

## Greater than operator **>**
The `>` operator returns true if its left-hand operand is greater than its right-hand operand, false otherwise:
```csharp
Console.WriteLine(7.0 > 5.1);   // output: True
Console.WriteLine(5.1 > 5.1);   // output: False
Console.WriteLine(0.0 > 5.1);   // output: False

Console.WriteLine(double.NaN > 5.1);   // output: False
Console.WriteLine(double.NaN <= 5.1);  // output: False
```
## Less than or equal operator **<=**
The `<=` operator returns true if its left-hand operand is less than or equal to its right-hand operand, false otherwise:

```csharp
Console.WriteLine(7.0 <= 5.1);   // output: False
Console.WriteLine(5.1 <= 5.1);   // output: True
Console.WriteLine(0.0 <= 5.1);   // output: True

Console.WriteLine(double.NaN > 5.1);   // output: False
Console.WriteLine(double.NaN <= 5.1);  // output: False
```

## Greater than or equal operator **>=**
The `>=` operator returns true if its left-hand operand is greater than or equal to its right-hand operand, false otherwise:
```csharp
Console.WriteLine(7.0 >= 5.1);   // output: True
Console.WriteLine(5.1 >= 5.1);   // output: True
Console.WriteLine(0.0 >= 5.1);   // output: False

Console.WriteLine(double.NaN < 5.1);   // output: False
Console.WriteLine(double.NaN >= 5.1);  // output: False
```
## Operator overloadability
A user-defined type can overload the `<`, `>`, `<=`, and `>=` operators.

If a type overloads one of the `<` or `>` operators, it must overload both `<` and `>`. If a type overloads one of the `<=` or `>=` operators, it must overload both `<=` and `>=`.