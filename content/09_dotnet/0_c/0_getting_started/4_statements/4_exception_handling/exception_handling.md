---
title: "Exception Handling Statements"
slug: "09_dotnet/0_c/0_getting_started/4_statements/4_exception_handling"
stack: "C#.NET"
---



You use the `throw` and `try` statements to work with exceptions. Use the [throw statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/exception-handling-statements#the-throw-statement) to throw an exception. Use the [try statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/exception-handling-statements#the-try-statement) to catch and handle exceptions that might occur during execution of a code block.

## `throw` - statement

The `throw` statement throws an exception:

```csharp
if (shapeAmount <= 0)
{
    throw new ArgumentOutOfRangeException(nameof(shapeAmount), "Amount of shapes must be positive.");
}
```
- In a `throw e`; statement, the result of expression e must be implicitly convertible to [System.Exception](https://learn.microsoft.com/en-us/09_dotnet/api/system.exception).

- You can use the built-in exception classes, for example, [ArgumentOutOfRangeException](https://learn.microsoft.com/en-us/09_dotnet/api/system.argumentoutofrangeexception) or [InvalidOperationException](https://learn.microsoft.com/en-us/09_dotnet/api/system.invalidoperationexception). 

- .NET also provides the helper methods to throw exceptions in certain conditions: [ArgumentNullException.ThrowIfNull](https://learn.microsoft.com/en-us/09_dotnet/api/system.argumentnullexception.throwifnull) and [ArgumentException.ThrowIfNullOrEmpty](https://learn.microsoft.com/en-us/09_dotnet/api/system.argumentexception.throwifnullorempty). You can also define your own exception classes that derive from [System.Exception](https://learn.microsoft.com/en-us/09_dotnet/api/system.exception). For more information, see [Creating and throwing exceptions](https://learn.microsoft.com/en-us/09_dotnet/csharp/fundamentals/exceptions/creating-and-throwing-exceptions).

Inside a [catch block](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/exception-handling-statements#the-try-catch-statement), you can use a `throw`; statement to re-throw the exception that is handled by the `catch` block:

```csharp
try
{
    ProcessShapes(shapeAmount);
}
catch (Exception e)
{
    LogError(e, "Shape processing failed.");
    throw;
}

```
✏️: `throw`; preserves the original stack trace of the exception, which is stored in the [Exception.StackTrace](https://learn.microsoft.com/en-us/09_dotnet/api/system.exception.stacktrace#system-exception-stacktrace) property. Opposite to that, `throw e`; updates the [StackTrace](https://learn.microsoft.com/en-us/09_dotnet/api/system.exception.stacktrace#system-exception-stacktrace) property of `e`.

When an exception is thrown, the common language runtime (CLR) looks for the [catch block](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/exception-handling-statements#the-try-catch-statement) that can handle this exception. If the currently executed method doesn't contain such a `catch` block, the CLR looks at the method that called the current method, and so on up the call stack. If no [catch block](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/exception-handling-statements#the-try-catch-statement) is found, the CLR terminates the executing thread. For more information, see the [How exceptions are handled](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/language-specification/exceptions#214-how-exceptions-are-handled) section of the C# language specification.

#### throw expression
You can also use `throw` as an expression. This might be convenient in a number of cases, which include:

- the [conditional operator](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/conditional-operator). The following example uses a throw expression to throw an [ArgumentException](https://learn.microsoft.com/en-us/09_dotnet/api/system.argumentexception) when the passed array args is empty:

```csharp
string first = args.Length >= 1 
    ? args[0]
    : throw new ArgumentException("Please supply at least one argument.");
```
- the [null-coalescing operator](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/null-coalescing-operator). The following example uses a throw expression to throw an [ArgumentNullException](https://learn.microsoft.com/en-us/09_dotnet/api/system.argumentnullexception) when the string to assign to a property is null:

```csharp
public string Name
{
    get => name;
    set => name = value ??
        throw new ArgumentNullException(paramName: nameof(value), message: "Name cannot be null");
}
```
- an expression-bodied [lambda](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/lambda-expressions) or method. The following example uses a `throw` expression to throw an [InvalidCastException](https://learn.microsoft.com/en-us/09_dotnet/api/system.invalidcastexception) to indicate that a conversion to a [DateTime](https://learn.microsoft.com/en-us/09_dotnet/api/system.datetime) value is not supported:

```csharp
DateTime ToDateTime(IFormatProvider provider) =>
         throw new InvalidCastException("Conversion to a DateTime is not supported.");
```

> try - statement
You can use the `try` statement in any of the following forms: 
- `try-catch` - to handle exceptions that might occur during execution of the code inside a try block, 
- `try-finally` - to specify the code that is executed when control leaves the try block, 
- `try-catch-finally` - as a combination of the preceding two forms.

## `try-catch` - statement
Use the `try-catch` statement to handle exceptions that might occur during execution of a code block. Place the code where an exception might occur inside a `try` block. Use a _catch clause_ to specify the base type of exceptions you want to handle in the corresponding `catch` block:

```csharp
try
{
    var result = Process(-3, 4);
    Console.WriteLine($"Processing succeeded: {result}");
}
catch (ArgumentException e)
{
    Console.WriteLine($"Processing failed: {e.Message}");
}
```
- You can provide several catch clauses:

```csharp
try
{
    var result = await ProcessAsync(-3, 4, cancellationToken);
    Console.WriteLine($"Processing succeeded: {result}");
}
catch (ArgumentException e)
{
    Console.WriteLine($"Processing failed: {e.Message}");
}
catch (OperationCanceledException)
{
    Console.WriteLine("Processing is cancelled.");
}
```
- When an exception occurs, catch clauses are examined in the specified order, from top to bottom. At maximum, only one catch block is executed for any thrown exception. As the preceding example also shows, you can omit declaration of an exception variable and specify only the exception type in a catch clause. A catch clause without any specified exception type matches any exception and, if present, must be the last catch clause.

- If you want to re-throw a caught exception, use the `throw` statement, as the following example shows:

```csharp
try
{
    var result = Process(-3, 4);
    Console.WriteLine($"Processing succeeded: {result}");
}
catch (Exception e)
{
    LogError(e, "Processing failed.");
    throw;
}

```

#### when exception filter
Along with an exception type, you can also specify an exception filter that further examines an exception and decides if the corresponding `catch` block handles that exception. An exception filter is a Boolean expression that follows the `when` keyword, as the following example shows:

```csharp
try
{
    var result = Process(-3, 4);
    Console.WriteLine($"Processing succeeded: {result}");
}
catch (Exception e) when (e is ArgumentException || e is DivideByZeroException)
{
    Console.WriteLine($"Processing failed: {e.Message}");
}
```

The preceding example uses an exception filter to provide a single `catch` block to handle exceptions of two specified types.

You can provide several `catch` clauses for the same exception type if they distinguish by exception filters. One of those clauses might have no exception filter. If such a clause exists, it must be the last of the clauses that specify that exception type.

If a `catch` clause has an exception filter, it can specify the exception type that is the same as or less derived than an exception type of a `catch` clause that appears after it. For example, if an exception filter is present, a `catch (Exception e)` clause doesn't need to be the last clause.

#### Exceptions in async and iterator methods
If an exception occurs in an [async function](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/async), it propagates to the caller of the function when you [await](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/await) the result of the function, as the following example shows:

```csharp
public static async Task Run()
{
    try
    {
        Task<int> processing = ProcessAsync(-1);
        Console.WriteLine("Launched processing.");

        int result = await processing;
        Console.WriteLine($"Result: {result}.");
    }
    catch (ArgumentException e)
    {
        Console.WriteLine($"Processing failed: {e.Message}");
    }
    // Output:
    // Launched processing.
    // Processing failed: Input must be non-negative. (Parameter 'input')
}

private static async Task<int> ProcessAsync(int input)
{
    if (input < 0)
    {
        throw new ArgumentOutOfRangeException(nameof(input), "Input must be non-negative.");
    }

    await Task.Delay(500);
    return input;
}
```
If an exception occurs in an [iterator method](https://learn.microsoft.com/en-us/09_dotnet/csharp/iterators), it propagates to the caller only when the iterator advances to the next element.

## `try-finally` - statement
In a `try-finally` statement, the `finally` block is executed when control leaves the `try` block. Control might leave the `try` block as a result of

- normal execution,
- execution of a [jump statement](./../2_statements/3_jump) (that `is`, `return`, `break`, `continue`, or `goto`), or
- propagation of an exception out of the `try` block.

The following example uses the finally block to reset the state of an object before control leaves the method:

```csharp
public async Task HandleRequest(int itemId, CancellationToken ct)
{
    Busy = true;

    try
    {
        await ProcessAsync(itemId, ct);
    }
    finally
    {
        Busy = false;
    }
}
```
- You can also use the finally block to clean up allocated resources used in the try block.

✏️:  When the type of a resource implements the [IDisposable](https://learn.microsoft.com/en-us/09_dotnet/api/system.idisposable) or [IAsyncDisposable](https://learn.microsoft.com/en-us/09_dotnet/api/system.iasyncdisposable) interface, consider the [using statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/using). The `using` statement ensures that acquired resources are disposed when control leaves the `using` statement. The compiler transforms a `using` statement into a `try-finally` statement.

In almost all cases `finally` blocks are executed. The only cases where `finally` blocks aren't executed involve immediate termination of a program. For example, such a termination might happen because of the [Environment.FailFast](https://learn.microsoft.com/en-us/09_dotnet/api/system.environment.failfast) call or an [OverflowException](https://learn.microsoft.com/en-us/09_dotnet/api/system.overflowexception) or [InvalidProgramException](https://learn.microsoft.com/en-us/09_dotnet/api/system.invalidprogramexception) exception. Most operating systems perform a reasonable resource clean-up as part of stopping and unloading the process.

## `try-catch-finally` - statement
You use a `try-catch-finally` statement both to handle exceptions that might occur during execution of the `try` block and specify the code that must be executed when control leaves the `try` statement:

```csharp
public async Task ProcessRequest(int itemId, CancellationToken ct)
{
    Busy = true;

    try
    {
        await ProcessAsync(itemId, ct);
    }
    catch (Exception e) when (e is not OperationCanceledException)
    {
        LogError(e, $"Failed to process request for item ID {itemId}.");
        throw;
    }
    finally
    {
        Busy = false;
    }

}
```
When an exception is handled by a `catch` block, the `finally` block is executed after execution of that `catch` block (even if another exception occurs during execution of the catch block).






