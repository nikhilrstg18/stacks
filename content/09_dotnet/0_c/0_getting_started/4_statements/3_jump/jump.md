---
title: "Jump Statements"
slug: "09_dotnet/0_c/0_getting_started/4_statements/3_jump"
stack: "C#.NET"
---

The jump statements unconditionally transfer control. The break statement terminates the closest enclosing iteration statement or switch statement. The `continue` statement starts a new iteration of the closest enclosing iteration statement. The `return` statement terminates execution of the function in which it appears and returns control to the caller. The goto statement transfers control to a statement that is marked by a label.

For information about the throw statement that throws an exception and unconditionally transfers control as well, see The throw statement section of the Exception-handling statements article.

## `break` - statement

- The `break` statement terminates the closest enclosing iteration statement (that is, for, foreach, while, or do loop) or switch statement. The `break` statement transfers control to the statement that follows the terminated statement, if any.

```csharp
int[] numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
foreach (int number in numbers)
{
    if (number == 3)
    {
        break;
    }

    Console.Write($"{number} ");
}
Console.WriteLine();
Console.WriteLine("End of the example.");
// Output:
// 0 1 2
// End of the example.
```

- In nested loops, the break statement terminates only the innermost loop that contains it, as the following example shows:

```csharp
for (int outer = 0; outer < 5; outer++)
{
    for (int inner = 0; inner < 5; inner++)
    {
        if (inner > outer)
        {
            break;
        }

        Console.Write($"{inner} ");
    }
    Console.WriteLine();
}
// Output:
// 0
// 0 1
// 0 1 2
// 0 1 2 3
// 0 1 2 3 4
```

- When you use the switch statement inside a loop, a break statement at the end of a switch section transfers control only out of the switch statement. The loop that contains the switch statement is unaffected, as the following example shows:

```csharp
double[] measurements = [-4, 5, 30, double.NaN];
foreach (double measurement in measurements)
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
// Output:
// Measured value is -4; too low.
// Measured value is 5.
// Measured value is 30; too high.
// Failed measurement.
```

## `continue` - statement

The `continue` statement starts a new iteration of the closest enclosing [iteration statement](./../2_statements/2_iteration) (that is, for, foreach, while, or do loop), as the following example shows:

```csharp
for (int i = 0; i < 5; i++)
{
    Console.Write($"Iteration {i}: ");

    if (i < 3)
    {
        Console.WriteLine("skip");
        continue;
    }

    Console.WriteLine("done");
}
// Output:
// Iteration 0: skip
// Iteration 1: skip
// Iteration 2: skip
// Iteration 3: done
// Iteration 4: done
```

## `return` - statement

The `return` statement terminates execution of the function in which it appears and returns control and the function's result, if any, to the caller.

If a function member doesn't compute a value, you use the `return` statement without expression, as the following example shows:

```csharp
Console.WriteLine("First call:");
DisplayIfNecessary(6);

Console.WriteLine("Second call:");
DisplayIfNecessary(5);

void DisplayIfNecessary(int number)
{
    if (number % 2 == 0)
    {
        return;
    }

    Console.WriteLine(number);
}
// Output:
// First call:
// Second call:
// 5
```

As the preceding example shows, you typically use the `return` statement without expression to terminate a function member early. If a function member doesn't contain the `return` statement, it terminates after its last statement is executed.

If a function member computes a value, you use the `return` statement with an expression, as the following example shows:

```csharp
double surfaceArea = CalculateCylinderSurfaceArea(1, 1);
Console.WriteLine($"{surfaceArea:F2}"); // output: 12.57

double CalculateCylinderSurfaceArea(double baseRadius, double height)
{
    double baseArea = Math.PI * baseRadius * baseRadius;
    double sideArea = 2 * Math.PI * baseRadius * height;
    return 2 * baseArea + sideArea;
}
```

When the `return` statement has an expression, that expression must be implicitly convertible to the return type of a function member unless it's [async](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/async). The expression returned from an async function must be implicitly convertible to the type argument of [Task<TResult>](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.task-1) or [ValueTask<TResult>](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.valuetask-1), whichever is the return type of the function. If the return type of an `async` function is [Task](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.task) or [ValueTask](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.valuetask), you use the `return` statement without expression.

#### Ref returns

By default, the `return` statement returns the value of an expression. You can return a reference to a variable. Reference return values (or ref returns) are values that a method returns by reference to the caller. That is, the caller can modify the value returned by a method, and that change is reflected in the state of the object in the called method. To do that, use the `return` statement with the `ref` keyword, as the following example shows:

```csharp
int[] xs = new int [] {10, 20, 30, 40 };
ref int found = ref FindFirst(xs, s => s == 30);
found = 0;
Console.WriteLine(string.Join(" ", xs));  // output: 10 20 0 40

ref int FindFirst(int[] numbers, Func<int, bool> predicate)
{
    for (int i = 0; i < numbers.Length; i++)
    {
        if (predicate(numbers[i]))
        {
            return ref numbers[i];
        }
    }
    throw new InvalidOperationException("No element satisfies the given condition.");
}
```

A reference return value allows a method to return a reference to a variable, rather than a value, back to a caller. The caller can then choose to treat the returned variable as if it were returned by value or by reference. The caller can create a new variable that is itself a reference to the returned value, called a [ref local](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/declarations#reference-variables). A reference return value means that a method returns a reference (or an alias) to some variable. That variable's scope must include the method. That variable's lifetime must extend beyond the return of the method. Modifications to the method's return value by the caller are made to the variable that is returned by the method.

Declaring that a method returns a reference return value indicates that the method returns an alias to a variable. The design intent is often that calling code accesses that variable through the alias, including to modify it. Methods returning by reference can't have the return type `void`.

In order for the caller to modify the object's state, the reference return value must be stored to a variable that is explicitly defined as a [reference variable](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/declarations#reference-variables).

The `ref` return value is an alias to another variable in the called method's scope. You can interpret any use of the ref return as using the variable it aliases:

- When you assign its value, you're assigning a value to the variable it aliases.
- When you read its value, you're reading the value of the variable it aliases.
- If you return it by reference, you're returning an alias to that same variable.
- If you pass it to another method by reference, you're passing a reference to the variable it aliases.
- When you make a [ref local](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/declarations#reference-variables) alias, you make a new alias to the same variable.

A ref return must be [ref-safe-context](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/method-parameters#safe-context-of-references-and-values) to the calling method. That means:

- The return value must have a lifetime that extends beyond the execution of the method. In other words, it can't be a local variable in the method that returns it. It can be an instance or static field of a class, or it can be an argument passed to the method. Attempting to return a local variable generates compiler error CS8168, "Can't return local 'obj' by reference because it isn't a ref local."
- The return value can't be the literal `null`. A method with a ref return can return an alias to a variable whose value is currently the `null` (uninstantiated) value or a nullable value type for a value type.
- The return value can't be a constant, an enumeration member, the by-value return value from a property, or a method of a `class` or `struct`.

In addition, reference return values aren't allowed on async methods. An asynchronous method may return before it has finished execution, while its return value is still unknown.

A method that returns a reference return value must:

- Include the `ref` keyword in front of the return type.
- Each `return` statement in the method body includes the `ref` keyword in front of the name of the returned instance.

The following example shows a method that satisfies those conditions and returns a reference to a Person object named p:

```csharp
public ref Person GetContactInformation(string fname, string lname)
{
    // ...method implementation...
    return ref p;
}
```

Here's a more complete ref return example, showing both the method signature and method body.

```csharp
public static ref int Find(int[,] matrix, Func<int, bool> predicate)
{
    for (int i = 0; i < matrix.GetLength(0); i++)
        for (int j = 0; j < matrix.GetLength(1); j++)
            if (predicate(matrix[i, j]))
                return ref matrix[i, j];
    throw new InvalidOperationException("Not found");
}
```

The called method may also declare the return value as ref readonly to return the value by reference, and enforce that the calling code can't modify the returned value. The calling method can avoid copying the returned value by storing the value in a local ref readonly reference variable.

The following example defines a Book class that has two String fields, Title and Author. It also defines a BookCollection class that includes a private array of Book objects. Individual book objects are returned by reference by calling its GetBookByTitle method.

```csharp

public class Book
{
    public string Author;
    public string Title;
}

public class BookCollection
{
    private Book[] books = { new Book { Title = "Call of the Wild, The", Author = "Jack London" },
                        new Book { Title = "Tale of Two Cities, A", Author = "Charles Dickens" }
                       };
    private Book nobook = null;

    public ref Book GetBookByTitle(string title)
    {
        for (int ctr = 0; ctr < books.Length; ctr++)
        {
            if (title == books[ctr].Title)
                return ref books[ctr];
        }
        return ref nobook;
    }

    public void ListBooks()
    {
        foreach (var book in books)
        {
            Console.WriteLine($"{book.Title}, by {book.Author}");
        }
        Console.WriteLine();
    }
}
```

When the caller stores the value returned by the `GetBookByTitle` method as a ref local, changes that the caller makes to the return value are reflected in the `BookCollection` object, as the following example shows.

```csharp
var bc = new BookCollection();
bc.ListBooks();

ref var book = ref bc.GetBookByTitle("Call of the Wild, The");
if (book != null)
    book = new Book { Title = "Republic, The", Author = "Plato" };
bc.ListBooks();
// The example displays the following output:
//       Call of the Wild, The, by Jack London
//       Tale of Two Cities, A, by Charles Dickens
//
//       Republic, The, by Plato
//       Tale of Two Cities, A, by Charles Dickens

```

## `goto` - statement

The `goto` statement transfers control to a statement that is marked by a label, as the following example shows:

```csharp
var matrices = new Dictionary<string, int[][]>
{
    ["A"] =
    [
        [1, 2, 3, 4],
        [4, 3, 2, 1]
    ],
    ["B"] =
    [
        [5, 6, 7, 8],
        [8, 7, 6, 5]
    ],
};

CheckMatrices(matrices, 4);

void CheckMatrices(Dictionary<string, int[][]> matrixLookup, int target)
{
    foreach (var (key, matrix) in matrixLookup)
    {
        for (int row = 0; row < matrix.Length; row++)
        {
            for (int col = 0; col < matrix[row].Length; col++)
            {
                if (matrix[row][col] == target)
                {
                    goto Found;
                }
            }
        }
        Console.WriteLine($"Not found {target} in matrix {key}.");
        continue;

    Found:
        Console.WriteLine($"Found {target} in matrix {key}.");
    }
}
// Output:
// Found 4 in matrix A.
// Not found 4 in matrix B.
```

As the preceding example shows, you can use the `goto` statement to get out of a nested loop.

💡: When you work with nested loops, consider refactoring separate loops into separate methods. That may lead to a simpler, more readable code without the `goto` statement.

You can also use the `goto` statement in the [switch statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/selection-statements#the-switch-statement) to transfer control to a switch section with a constant case label, as the following example shows:

```csharp
using System;

public enum CoffeeChoice
{
    Plain,
    WithMilk,
    WithIceCream,
}

public class GotoInSwitchExample
{
    public static void Main()
    {
        Console.WriteLine(CalculatePrice(CoffeeChoice.Plain));  // output: 10.0
        Console.WriteLine(CalculatePrice(CoffeeChoice.WithMilk));  // output: 15.0
        Console.WriteLine(CalculatePrice(CoffeeChoice.WithIceCream));  // output: 17.0
    }

    private static decimal CalculatePrice(CoffeeChoice choice)
    {
        decimal price = 0;
        switch (choice)
        {
            case CoffeeChoice.Plain:
                price += 10.0m;
                break;

            case CoffeeChoice.WithMilk:
                price += 5.0m;
                goto case CoffeeChoice.Plain;

            case CoffeeChoice.WithIceCream:
                price += 7.0m;
                goto case CoffeeChoice.Plain;
        }
        return price;
    }
}
```

Within the `switch` statement, you can also use the statement goto default; to transfer control to the `switch` section with the default label.

If a label with the given name doesn't exist in the current function member, or if the `goto` statement isn't within the scope of the label, a compile-time error occurs. That is, you can't use the `goto` statement to transfer control out of the current function member or into any nested scope.
