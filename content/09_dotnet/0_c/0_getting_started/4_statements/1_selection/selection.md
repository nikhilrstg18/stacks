---
title: "Selection Statements"
slug: "09_dotnet/0_c/0_getting_started/4_statements/1_selection"
stack: "C#.NET"
---

The `if`, `if-else` and `switch` statements select statements to execute from many possible paths based on the value of an expression. The [if statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/selection-statements#the-if-statement) executes a statement only if a provided Boolean expression evaluates to `true`. The [if-else statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/selection-statements#the-if-statement) allows you to choose which of the two code paths to follow based on a Boolean expression. The [switch statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/selection-statements#the-switch-statement) selects a statement list to execute based on a pattern match with an expression.

## `if` statement

- An `if` statement can be any of the following two forms:

- An `if` statement with an `else` part selects one of the two statements to execute based on the value of a Boolean expression, as the following example shows:

```csharp
DisplayWeatherReport(15.0);  // Output: Cold.
DisplayWeatherReport(24.0);  // Output: Perfect!

void DisplayWeatherReport(double tempInCelsius)
{
    if (tempInCelsius < 20.0)
    {
        Console.WriteLine("Cold.");
    }
    else
    {
        Console.WriteLine("Perfect!");
    }
}
```

- An `if` statement without an `else` part executes its body only if a Boolean expression evaluates to `true`, as the following example shows:

```csharp
DisplayMeasurement(45);  // Output: The measurement value is 45
DisplayMeasurement(-3);  // Output: Warning: not acceptable value! The measurement value is -3

void DisplayMeasurement(double value)
{
    if (value < 0 || value > 100)
    {
        Console.Write("Warning: not acceptable value! ");
    }

    Console.WriteLine($"The measurement value is {value}");
}
```

- You can nest `if` statements to check multiple conditions, as the following example shows:

```csharp
DisplayCharacter('f');  // Output: A lowercase letter: f
DisplayCharacter('R');  // Output: An uppercase letter: R
DisplayCharacter('8');  // Output: A digit: 8
DisplayCharacter(',');  // Output: Not alphanumeric character: ,

void DisplayCharacter(char ch)
{
    if (char.IsUpper(ch))
    {
        Console.WriteLine($"An uppercase letter: {ch}");
    }
    else if (char.IsLower(ch))
    {
        Console.WriteLine($"A lowercase letter: {ch}");
    }
    else if (char.IsDigit(ch))
    {
        Console.WriteLine($"A digit: {ch}");
    }
    else
    {
        Console.WriteLine($"Not alphanumeric character: {ch}");
    }
}
```

In an expression context, you can use the conditional operator `?:` to evaluate one of the two expressions based on the value of a Boolean expression.

## `switch` statement

- The `switch` statement selects a statement list to execute based on a pattern match with a match expression, as the following example shows:

```csharp
DisplayMeasurement(-4);  // Output: Measured value is -4; too low.
DisplayMeasurement(5);  // Output: Measured value is 5.
DisplayMeasurement(30);  // Output: Measured value is 30; too high.
DisplayMeasurement(double.NaN);  // Output: Failed measurement.

void DisplayMeasurement(double measurement)
{
    switch (measurement)
    {
        case < 0.0:
            Console.WriteLine($"Measured value is {measurement}; too low.");
            break;

        case > 15.0:
            Console.WriteLine($"Measured value is {measurement}; too high.");
            break;

        case double.NaN:
            Console.WriteLine("Failed measurement.");
            break;

        default:
            Console.WriteLine($"Measured value is {measurement}.");
            break;
    }
}
```

- At the preceding example, the `switch` statement uses the following patterns:

  - A relational pattern: to compare an expression result with a constant.
  - A constant pattern: test if an expression result equals a constant.

_Important_ : For information about the patterns supported by the `switch` statement, see [Patterns](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/patterns).

The preceding example also demonstrates the `default` case. The `default` case specifies statements to execute when a match expression doesn't match any other case pattern. If a match expression doesn't match any case pattern and there's no `default` case, control falls through a `switch` statement.

- A `switch` statement executes the statement list in the first switch section whose case pattern matches a match expression and whose [case guard](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/selection-statements#case-guards), if present, evaluates to true. A `switch` statement evaluates case patterns in text order from top to bottom. The compiler generates an error when a `switch` statement contains an unreachable case. That is a case that is already handled by an upper case or whose pattern is impossible to match.

_Note_: The `default` case can appear in any place within a `switch` statement. Regardless of its position, the `default` case is evaluated only if all other case patterns aren't matched or the goto default; statement is executed in one of the switch sections.

- You can specify multiple case patterns for one section of a `switch` statement, as the following example shows:

```csharp
DisplayMeasurement(-4);  // Output: Measured value is -4; out of an acceptable range.
DisplayMeasurement(50);  // Output: Measured value is 50.
DisplayMeasurement(132);  // Output: Measured value is 132; out of an acceptable range.

void DisplayMeasurement(int measurement)
{
    switch (measurement)
    {
        case < 0:
        case > 100:
            Console.WriteLine($"Measured value is {measurement}; out of an acceptable range.");
            break;

        default:
            Console.WriteLine($"Measured value is {measurement}.");
            break;
    }
}
```

- Within a `switch` statement, control can't fall through from one switch section to the next. As the examples in this section show, typically you use the break statement at the end of each switch section to pass control out of a `switch` statement. You can also use the return and throw statements to pass control out of a `switch` statement. To imitate the fall-through behavior and pass control to other switch section, you can use the goto statement.

In an expression context, you can use the switch expression to evaluate a single expression from a list of candidate expressions based on a pattern match with an expression.

#### Case guards

A case pattern may be not expressive enough to specify the condition for the execution of the switch section. In such a case, you can use a _case guard_. That is an additional condition that must be satisfied together with a matched pattern. A _case guard_ must be a Boolean expression. You specify a _case guard_ after the when keyword that follows a pattern, as the following example shows:

```csharp

DisplayMeasurements(3, 4);  // Output: First measurement is 3, second measurement is 4.
DisplayMeasurements(5, 5);  // Output: Both measurements are valid and equal to 5.

void DisplayMeasurements(int a, int b)
{
    switch ((a, b))
    {
        case (> 0, > 0) when a == b:
            Console.WriteLine($"Both measurements are valid and equal to {a}.");
            break;

        case (> 0, > 0):
            Console.WriteLine($"First measurement is {a}, second measurement is {b}.");
            break;

        default:
            Console.WriteLine("One or both measurements are not valid.");
            break;
    }
}
```

The preceding example uses positional patterns with nested relational patterns.
