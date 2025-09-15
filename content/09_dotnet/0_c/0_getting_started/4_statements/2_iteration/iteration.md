---
title: "Iteration Statements"
slug: "09_dotnet/0_c/0_getting_started/4_statements/2_iteration"
stack: "C#.NET"
---

The iteration statements repeatedly execute a statement or a block of statements.

- The [for statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/iteration-statements#the-for-statement) executes its body while a specified Boolean expression evaluates to `true`.
- The [foreach statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/iteration-statements#the-foreach-statement) enumerates the elements of a collection and executes its body for each element of the collection.
- The [do statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/iteration-statements#the-do-statement) conditionally executes its body one or more times.
- The [while statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/iteration-statements#the-while-statement) conditionally executes its body zero or more times.

At any point within the body of an iteration statement, you can break out of the loop using the [break statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/jump-statements#the-break-statement). You can step to the next iteration in the loop using the [continue statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/jump-statements#the-continue-statement).

## `for` - statement.

The `for` statement executes a statement or a block of statements while a specified Boolean expression evaluates to `true`. The following example shows the `for` statement that executes its body while an integer counter is less than three:

```csharp
for (int i = 0; i < 3; i++)
{
    Console.Write(i);
}
// Output:
// 012
```

The preceding example shows the elements of the for statement:

The initializer section that is executed only once, before entering the loop. Typically, you declare and initialize a local loop variable in that section. The declared variable can't be accessed from outside the for statement.

The initializer section in the preceding example declares and initializes an integer counter variable:

```csharp
int i = 0
```

The condition section that determines if the next iteration in the loop should be executed. If it evaluates to true or isn't present, the next iteration is executed; otherwise, the loop is exited. The condition section must be a Boolean expression.

The condition section in the preceding example checks if a counter value is less than three:

```csharp
i < 3
```

The iterator section that defines what happens after each execution of the body of the loop.

The iterator section in the preceding example increments the counter:

```csharp
i++
```

The body of the loop, which must be a statement or a block of statements.

The iterator section can contain zero or more of the following statement expressions, separated by commas:

- prefix or postfix increment expression, such as `++i` or `i++`
- prefix or postfix decrement expression, such as `--i` or `i--`
- [assignment](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/assignment-operator)
- invocation of a method
- [await expression](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/await)
- creation of an object by using the [new operator](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/new-operator)

If you don't declare a loop variable in the initializer section, you can use zero or more of the expressions from the preceding list in the initializer section as well. The following example shows several less common usages of the initializer and iterator sections: assigning a value to an external variable in the initializer section, invoking a method in both the initializer and the iterator sections, and changing the values of two variables in the iterator section:

```csharp
int i;
int j = 3;
for (i = 0, Console.WriteLine($"Start: i={i}, j={j}"); i < j; i++, j--, Console.WriteLine($"Step: i={i}, j={j}"))
{
    //...
}
// Output:
// Start: i=0, j=3
// Step: i=1, j=2
// Step: i=2, j=1
```

All the sections of the for statement are optional. For example, the following code defines the infinite for loop:❓

```csharp
for ( ; ; )
{
    //...
}
```

## `foreach` - statement.

The `foreach` statement executes a statement or a block of statements for each element in an instance of the type that implements the [System.Collections.IEnumerable](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.ienumerable) or [System.Collections.Generic.IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1) interface, as the following example shows:

```csharp
List<int> fibNumbers = [0, 1, 1, 2, 3, 5, 8, 13];
foreach (int element in fibNumbers)
{
    Console.Write($"{element} ");
}
// Output:
// 0 1 1 2 3 5 8 13
```

The `foreach` statement isn't limited to those types. You can use it with an instance of any type that satisfies the following conditions:

- A type has the public parameterless `GetEnumerator` method. The `GetEnumerator` method can be a type's [extension method](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/extension-methods).
- The return type of the `GetEnumerator` method has the public `Current` property and the public parameterless `MoveNext` method whose return type is `bool`.

The following example uses the foreach statement with an instance of the [System.Span<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.span-1) type, which doesn't implement any interfaces:

```csharp
Span<int> numbers = [3, 14, 15, 92, 6];
foreach (int number in numbers)
{
    Console.Write($"{number} ");
}
// Output:
// 3 14 15 92 6
```

If the enumerator's `Current` property returns a [reference return value](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/jump-statements#ref-returns) (`ref T` where `T` is the type of a collection element), you can declare an iteration variable with the `ref` or `ref readonly` modifier, as the following example shows:

```csharp
Span<int> storage = stackalloc int[10];
int num = 0;
foreach (ref int item in storage)
{
    item = num++;
}
foreach (ref readonly var item in storage)
{
    Console.Write($"{item} ");
}
// Output:
// 0 1 2 3 4 5 6 7 8 9
```

If the source collection of the `foreach` statement is empty, the body of the `foreach` statement isn't executed and skipped. If the `foreach` statement is applied to `null`, a [NullReferenceException](https://learn.microsoft.com/en-us/09_dotnet/api/system.nullreferenceexception) is thrown.

#### await foreach

You can use the `await foreach` statement to consume an asynchronous stream of data, that is, the collection type that implements the [IAsyncEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.iasyncenumerable-1) interface. Each iteration of the loop may be suspended while the next element is retrieved asynchronously. The following example shows how to use the `await foreach` statement:

```csharp
await foreach (var item in GenerateSequenceAsync())
{
    Console.WriteLine(item);
}
```

You can also use the await foreach statement with an instance of any type that satisfies the following conditions:

- A type has the public parameterless `GetAsyncEnumerator` method. That method can be a type's [extension method](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/extension-methods).
- The return type of the `GetAsyncEnumerator` method has the public `Current` property and the public parameterless `MoveNextAsync` method whose return type is [Task<bool>](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.task-1), [ValueTask<bool>](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.valuetask-1), or any other awaitable type whose awaiter's GetResult method returns a bool value.

By default, stream elements are processed in the captured context. If you want to disable capturing of the context, use the [TaskAsyncEnumerableExtensions](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.taskasyncenumerableextensions.configureawait).ConfigureAwait extension method. For more information about synchronization contexts and capturing the current context, see [Consuming the Task-based asynchronous pattern](https://learn.microsoft.com/en-us/09_dotnet/standard/asynchronous-programming-patterns/consuming-the-task-based-asynchronous-pattern). For more information about asynchronous streams, see the [Asynchronous streams tutorial](https://learn.microsoft.com/en-us/09_dotnet/csharp/asynchronous-programming/generate-consume-asynchronous-stream).

#### Type of an iteration variable

You can use the [var](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/declarations#implicitly-typed-local-variables) keyword to let the compiler infer the type of an iteration variable in the foreach statement, as the following code shows:

```csharp
foreach (var item in collection) { }
```

_Note_: Type of `var` can be inferred by the compiler as a [nullable reference type](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/nullable-reference-types), depending on whether the nullable aware context is enabled and whether the type of an initialization expression is a reference type. For more information see [Implicitly-typed local variables](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/declarations#implicitly-typed-local-variables).

You can also explicitly specify the type of an iteration variable, as the following code shows:

```csharp
IEnumerable<T> collection = new T[5];
foreach (V item in collection) { }
```

In the preceding form, type `T` of a collection element must be implicitly or explicitly convertible to type `V` of an iteration variable. If an explicit conversion from `T` to `V` fails at run time, the `foreach` statement throws an [InvalidCastException](https://learn.microsoft.com/en-us/09_dotnet/api/system.invalidcastexception). For example, if `T` is a non-sealed class type, `V` can be any interface type, even the one that `T` doesn't implement. At run time, the type of a collection element may be the one that derives from `T` and actually implements V. If that's not the case, an [InvalidCastException](https://learn.microsoft.com/en-us/09_dotnet/api/system.invalidcastexception) is thrown.

## `do` - statement.

The do statement executes a statement or a block of statements while a specified Boolean expression evaluates to true. Because that expression is evaluated after each execution of the loop, a do loop executes one or more times. The do loop differs from the while loop, which executes zero or more times.

The following example shows the usage of the do statement:

```csharp
int n = 0;
do
{
    Console.Write(n);
    n++;
} while (n < 5);
// Output:
// 01234
```

## `while` - statement.

The `while` statement executes a statement or a block of statements `while` a specified Boolean expression evaluates to `true`. Because that expression is evaluated before each execution of the loop, a `while` loop executes zero or more times. The `while` loop differs from the do loop, which executes one or more times.

The following example shows the usage of the `while` statement:

```csharp
int n = 0;
while (n < 5)
{
    Console.Write(n);
    n++;
}
// Output:
// 01234
```
