---
title: "Statements"
slug: "09_dotnet/0_c/0_getting_started/4_statements"
stack: "C#.NET"
---

The actions of a program are expressed using `statements`. C# supports several different kinds of statements, a number of which are defined in terms of embedded statements.

- A _block_ permits multiple statements to be written in contexts where a single statement is allowed. A block consists of a list of statements written between the delimiters `{` and `}`.

- _Declaration statements_ are used to declare local variables and constants.
- _Expression statements_ are used to evaluate expressions. Expressions that can be used as statements include method invocations, object allocations using the new operator, assignments using `=` and the `compound assignment` operators, `increment` and `decrement` operations using the `++` and `--` operators and `await` expressions.
- _Selection statements_ are used to select one of a number of possible statements for execution based on the value of some expression. This group contains the `if` and `switch` statements.
- Iteration statements are used to execute repeatedly an embedded statement. This group contains the `while`, `do`, `for`, and `foreach` statements.

- _Jump statements_ are used to transfer control. This group contains the `break`, `continue`, `goto`, `throw`, `return`, and `yield` statements.

- The `try...catch` statement is used to catch exceptions that occur during execution of a block, and the `try...finally` statement is used to specify finalization code that is always executed, whether an exception occurred or not.

- The _checked and unchecked statements_ are used to control the overflow-checking context for integral-type arithmetic operations and conversions.

- The _lock statement_ is used to obtain the mutual-exclusion lock for a given object, execute a statement, and then release the lock.
- The _using statement_ is used to obtain a resource, execute a statement, and then dispose of that resource.

The following are misc kinds of statements that can be used:

## `lock` - statement.

> ensure exclusive access to a shared resource

The `lock` statement acquires the mutual-exclusion lock for a given object, executes a statement block, and then releases the lock. While a lock is held, the thread that holds the lock can again acquire and release the lock. Any other thread is blocked from acquiring the lock and waits until the lock is released. The `lock` statement ensures that at maximum only one thread executes its body at any time moment.

The `lock` statement is of the form

```csharp
lock (x)
{
    // Your code...
}
```

where `x` is an expression of a [reference type](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/reference-types). It's precisely equivalent to

```csharp
object __lockObj = x;
bool __lockWasTaken = false;
try
{
    System.Threading.Monitor.Enter(__lockObj, ref __lockWasTaken);
    // Your code...
}
finally
{
    if (__lockWasTaken) System.Threading.Monitor.Exit(__lockObj);
}
```

Since the code uses a [try-finally statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/exception-handling-statements#the-try-finally-statement), the lock is released even if an exception is thrown within the body of a lock statement.

You can't use the [await expression](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/await) in the body of a lock statement.

#### Guidelines

When you synchronize thread access to a shared resource, lock on a dedicated object instance (for example, `private readonly object balanceLock = new object();`) or another instance that is unlikely to be used as a lock object by unrelated parts of the code. Avoid using the same lock object instance for different shared resources, as it might result in deadlock or lock contention. In particular, avoid using the following instances as lock objects:

- `this`, as it might be used by the callers as a lock.
- [Type](https://learn.microsoft.com/en-us/09_dotnet/api/system.type) instances, as they might be obtained by the [typeof](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/type-testing-and-cast#typeof-operator) operator or reflection.
- string instances, including string literals, as they might be [interned](https://learn.microsoft.com/en-us/09_dotnet/api/system.string.intern#remarks).

Hold a lock for as short time as possible to reduce lock contention.

#### Example

The following example defines an `Account` class that synchronizes access to its private `balance` field by locking on a dedicated `balanceLock` instance. Using the same instance for locking ensures that the `balance` field can't be updated simultaneously by two threads attempting to call the `Debit` or `Credit` methods simultaneously.

```csharp
using System;
using System.Threading.Tasks;

public class Account
{
    private readonly object balanceLock = new object();
    private decimal balance;

    public Account(decimal initialBalance) => balance = initialBalance;

    public decimal Debit(decimal amount)
    {
        if (amount < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "The debit amount cannot be negative.");
        }

        decimal appliedAmount = 0;
        lock (balanceLock)
        {
            if (balance >= amount)
            {
                balance -= amount;
                appliedAmount = amount;
            }
        }
        return appliedAmount;
    }

    public void Credit(decimal amount)
    {
        if (amount < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "The credit amount cannot be negative.");
        }

        lock (balanceLock)
        {
            balance += amount;
        }
    }

    public decimal GetBalance()
    {
        lock (balanceLock)
        {
            return balance;
        }
    }
}

class AccountTest
{
    static async Task Main()
    {
        var account = new Account(1000);
        var tasks = new Task[100];
        for (int i = 0; i < tasks.Length; i++)
        {
            tasks[i] = Task.Run(() => Update(account));
        }
        await Task.WhenAll(tasks);
        Console.WriteLine($"Account's balance is {account.GetBalance()}");
        // Output:
        // Account's balance is 2000
    }

    static void Update(Account account)
    {
        decimal[] amounts = [0, 2, -3, 6, -2, -1, 8, -5, 11, -6];
        foreach (var amount in amounts)
        {
            if (amount >= 0)
            {
                account.Credit(amount);
            }
            else
            {
                account.Debit(Math.Abs(amount));
            }
        }
    }
}
```

## `using` - statement.

> ensure the correct use of disposable objects

The using statement ensures the correct use of an [IDisposable](https://learn.microsoft.com/en-us/09_dotnet/api/system.idisposable) instance:

```csharp
var numbers = new List<int>();
using (StreamReader reader = File.OpenText("numbers.txt"))
{
    string line;
    while ((line = reader.ReadLine()) is not null)
    {
        if (int.TryParse(line, out int number))
        {
            numbers.Add(number);
        }
    }
}
```

When the control leaves the block of the `using` statement, an acquired [IDisposable](https://learn.microsoft.com/en-us/09_dotnet/api/system.idisposable) instance is disposed. In particular, the `using` statement ensures that a disposable instance is disposed even if an exception occurs within the block of the `using` statement. In the preceding example, an opened file is closed after all lines are processed.

Use the `await using` statement to correctly use an [IAsyncDisposable](https://learn.microsoft.com/en-us/09_dotnet/api/system.iasyncdisposable) instance:

```csharp
await using (var resource = new AsyncDisposableExample())
{
    // Use the resource
}
```

For more information about using of `IAsyncDisposable` instances, see the [Using async disposable](https://learn.microsoft.com/en-us/09_dotnet/standard/garbage-collection/implementing-disposeasync#using-async-disposable) section of the Implement a DisposeAsync method article.

You can also use a `using` declaration that doesn't require braces:

```csharp
static IEnumerable<int> LoadNumbers(string filePath)
{
    using StreamReader reader = File.OpenText(filePath);

    var numbers = new List<int>();
    string line;
    while ((line = reader.ReadLine()) is not null)
    {
        if (int.TryParse(line, out int number))
        {
            numbers.Add(number);
        }
    }
    return numbers;
}
```

When declared in a `using` declaration, a local variable is disposed at the end of the scope in which it's declared. In the preceding example, disposal happens at the end of a method.

A variable declared by the `using` statement or declaration is readonly. You cannot reassign it or pass it as a `ref` or `out` parameter.

You can declare several instances of the same type in one `using` statement, as the following example shows:

```csharp
using (StreamReader numbersFile = File.OpenText("numbers.txt"), wordsFile = File.OpenText("words.txt"))
{
    // Process both files
}
```

When you declare several instances in one `using` statement, they are disposed in reverse order of declaration.

You can also use the `using` statement and declaration with an instance of a ref struct that fits the disposable pattern. That is, it has an instance `Dispose` method, which is accessible, parameterless and has a void return type.

The `using` statement can also be of the following form:

```csharp
using (expression)
{
    // ...
}
```

where produces a disposable instance. The following example demonstrates that:

```csharp
StreamReader reader = File.OpenText(filePath);

using (reader)
{
    // Process file content
}
```

## `yield` - statement.

> provide the next element

You use the `yield` statement in an iterator to provide the next value or signal the end of an iteration. The `yield` statement has the two following forms:

- `yield return`: to provide the next value in iteration, as the following example shows:

```csharp
foreach (int i in ProduceEvenNumbers(9))
{
    Console.Write(i);
    Console.Write(" ");
}
// Output: 0 2 4 6 8

IEnumerable<int> ProduceEvenNumbers(int upto)
{
    for (int i = 0; i <= upto; i += 2)
    {
        yield return i;
    }
}
```

- `yield break`: to explicitly signal the end of iteration, as the following example shows:

```csharp
Console.WriteLine(string.Join(" ", TakeWhilePositive([2, 3, 4, 5, -1, 3, 4])));
// Output: 2 3 4 5

Console.WriteLine(string.Join(" ", TakeWhilePositive([9, 8, 7])));
// Output: 9 8 7

IEnumerable<int> TakeWhilePositive(IEnumerable<int> numbers)
{
    foreach (int n in numbers)
    {
        if (n > 0)
        {
            yield return n;
        }
        else
        {
            yield break;
        }
    }
}
```

Iteration also finishes when control reaches the end of an iterator.

In the preceding examples, the return type of iterators is [IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1) (in non-generic cases, use [IEnumerable](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.ienumerable) as the return type of an iterator). You can also use [IAsyncEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.iasyncenumerable-1) as the return type of an iterator. That makes an iterator async. Use the [await foreach statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/iteration-statements#await-foreach) to iterate over iterator's result, as the following example shows:

```csharp
await foreach (int n in GenerateNumbersAsync(5))
{
    Console.Write(n);
    Console.Write(" ");
}
// Output: 0 2 4 6 8

async IAsyncEnumerable<int> GenerateNumbersAsync(int count)
{
    for (int i = 0; i < count; i++)
    {
        yield return await ProduceNumberAsync(i);
    }
}

async Task<int> ProduceNumberAsync(int seed)
{
    await Task.Delay(1000);
    return 2 * seed;
}
```

[IEnumerator<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerator-1) or [IEnumerator](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.ienumerator) can also be the return type of an iterator. That is useful when you implement the GetEnumerator method in the following scenarios:

- You design the type that implements [IEnumerable<T>](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.generic.ienumerable-1) or [IEnumerable](https://learn.microsoft.com/en-us/09_dotnet/api/system.collections.ienumerable) interface.

- You add an instance or [extension](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/extension-methods) `GetEnumerator` method to enable iteration over the type's instance with the foreach statement, as the following example shows:

```csharp
public static void Example()
{
    var point = new Point(1, 2, 3);
    foreach (int coordinate in point)
    {
        Console.Write(coordinate);
        Console.Write(" ");
    }
    // Output: 1 2 3
}

public readonly record struct Point(int X, int Y, int Z)
{
    public IEnumerator<int> GetEnumerator()
    {
        yield return X;
        yield return Y;
        yield return Z;
    }
}
```

You can't use the yield statements in:

- methods with `in`, `ref`, or `out` parameters
- [lambda expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/lambda-expressions) and [anonymous methods](anonymous methods)
- methods that contain [unsafe blocks](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/unsafe)

#### Execution of an iterator

The call of an iterator doesn't execute it immediately, as the following example shows:

```csharp
var numbers = ProduceEvenNumbers(5);
Console.WriteLine("Caller: about to iterate.");
foreach (int i in numbers)
{
    Console.WriteLine($"Caller: {i}");
}

IEnumerable<int> ProduceEvenNumbers(int upto)
{
    Console.WriteLine("Iterator: start.");
    for (int i = 0; i <= upto; i += 2)
    {
        Console.WriteLine($"Iterator: about to yield {i}");
        yield return i;
        Console.WriteLine($"Iterator: yielded {i}");
    }
    Console.WriteLine("Iterator: end.");
}
// Output:
// Caller: about to iterate.
// Iterator: start.
// Iterator: about to yield 0
// Caller: 0
// Iterator: yielded 0
// Iterator: about to yield 2
// Caller: 2
// Iterator: yielded 2
// Iterator: about to yield 4
// Caller: 4
// Iterator: yielded 4
// Iterator: end.
```

As the preceding example shows, when you start to iterate over an iterator's result, an iterator is executed until the first `yield return` statement is reached. Then, the execution of an iterator is suspended and the caller gets the first iteration value and processes it. On each subsequent iteration, the execution of an iterator resumes after the `yield return` statement that caused the previous suspension and continues until the next `yield return` statement is reached. The iteration completes when control reaches the end of an iterator or a `yield break `statement.
