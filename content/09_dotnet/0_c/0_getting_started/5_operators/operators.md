---
title: "Operators"
slug: "09_dotnet/0_c/0_getting_started/5_operators"
stack: "C#.NET"
---

C# provides operators to perform [arithmetic](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/arithmetic-operators), [logical](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/boolean-logical-operators), [bitwise and shift](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/bitwise-and-shift-operators) operations and [equality](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/equality-operators) and [order](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/comparison-operators) comparisons.

## ?: Ternary operator

The _conditional_ operator `?:`, also known as the _ternary conditional_ operator, evaluates a Boolean expression and returns the result of one of the two expressions, depending on whether the Boolean expression evaluates to `true` or `false`, as the following example shows:

```csharp
string GetWeatherDisplay(double tempInCelsius) => tempInCelsius < 20.0 ? "Cold." : "Perfect!";

Console.WriteLine(GetWeatherDisplay(15));  // output: Cold.
Console.WriteLine(GetWeatherDisplay(27));  // output: Perfect!
```

As the preceding example shows, the syntax for the conditional operator is as follows:

```
condition ? consequent : alternative
```

The `condition` expression must evaluate to `true` or `false`.

- If `condition` evaluates to `true`, the `consequent` expression is evaluated, and its result becomes the result of the operation.
- If `condition` evaluates to `false`, the `alternative` expression is evaluated, and its result becomes the result of the operation.
- Only `consequent` or `alternative` is evaluated. Conditional expressions are target-typed. That is, if a target type of a conditional expression is known, the types of consequent and alternative must be implicitly convertible to the target type, as the following example shows:

```csharp
var rand = new Random();
var condition = rand.NextDouble() > 0.5;

int? x = condition ? 12 : null;

IEnumerable<int> xs = x is null ? new List<int>() { 0, 1 } : new int[] { 2, 3 };
```

- If a target type of a conditional expression is _unknown_ (for example, when you use the var keyword) or the type of `consequent` and `alternative` must be the same or there must be an implicit conversion from one type to the other:

```csharp
var rand = new Random();
var condition = rand.NextDouble() > 0.5;

var x = condition ? 12 : (int?)null;
```

- The Ternary operator is right-associative, i.e. an expression of form

```csharp
a ? b : c ? d : e
```

is evaluated to

```csharp
a ? b : (c ? d : e)
```

#### Conditional operator and an `if` statement

Use of the conditional operator instead of an if statement might result in more concise code in cases when you need conditionally to compute a value. eg.

```csharp
int input = new Random().Next(-5, 5);

string classify;
if (input >= 0)
{
    classify = "nonnegative";
}
else
{
    classify = "negative";
}

classify = (input >= 0) ? "nonnegative" : "negative";
```

#### Conditional ref expression

A conditional ref expression conditionally returns a variable reference, as the following example shows:

```csharp

Run
int[] smallArray = [1, 2, 3, 4, 5];
int[] largeArray = [10, 20, 30, 40, 50];

int index = 7;
ref int refValue = ref ((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]);
refValue = 0;

index = 2;
((index < 5) ? ref smallArray[index] : ref largeArray[index - 5]) = 100;

Console.WriteLine(string.Join(" ", smallArray));
Console.WriteLine(string.Join(" ", largeArray));
// Output:
// 1 2 100 4 5
// 10 20 0 40 50
```

You can [ref assign](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/assignment-operator#ref-assignment) the result of a conditional ref expression, use it as a [reference return](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/jump-statements#ref-returns) or pass it as a `ref`, `out`, `in`, or `ref readonly` method parameter. You can also assign to the result of a conditional ref expression, as the preceding example shows.

The syntax for a conditional ref expression is as follows:

```csharp
condition ? ref consequent : ref alternative
```

Like the conditional operator, a conditional ref expression evaluates only one of the two expressions: either `consequent` or `alternative`.

In a conditional ref expression, the type of `consequent` and `alternative` must be the same. Conditional ref expressions aren't target-typed.

## ?? and ??= operator

- The _null-coalescing operator_ `??` returns the value of its left-hand operand if it isn't `null`; otherwise, it evaluates the right-hand operand and returns its result. The `??` operator doesn't evaluate its right-hand operand if the left-hand operand evaluates to non-null.

The _null-coalescing assignment operator_ `??=` assigns the value of its right-hand operand to its left-hand operand only if the left-hand operand evaluates to `null`. The `??=` operator doesn't evaluate its right-hand operand if the left-hand operand evaluates to non-null.

```csharp
List<int>? numbers = null;
int? a = null;

Console.WriteLine((numbers is null)); // expected: true
// if numbers is null, initialize it. Then, add 5 to numbers
(numbers ??= new List<int>()).Add(5);
Console.WriteLine(string.Join(" ", numbers));  // output: 5
Console.WriteLine((numbers is null)); // expected: false


Console.WriteLine((a is null)); // expected: true
Console.WriteLine((a ?? 3)); // expected: 3 since a is still null
// if a is null then assign 0 to a and add a to the list
numbers.Add(a ??= 0);
Console.WriteLine((a is null)); // expected: false
Console.WriteLine(string.Join(" ", numbers));  // output: 5 0
Console.WriteLine(a);  // output: 0
```

The left-hand operand of the `??=` operator must be a variable, a property, or an indexer element.

The type of the left-hand operand of the `??` and `??=` operators can't be a non-nullable value type. In particular, _you can use the null-coalescing operators with unconstrained type parameters_:

```csharp
private static void Display<T>(T a, T backup)
{
    Console.WriteLine(a ?? backup);
}
```

The null-coalescing operators are right-associative. That is, expressions of the form

```csharp
a ?? b ?? c
d ??= e ??= f
```

are evaluated as

```csharp
a ?? (b ?? c)
d ??= (e ??= f)
```

#### Examples

The `??` and `??=` operators can be useful in the following scenarios:

In expressions with the null-conditional operators `?.` and `?[]`, you can use the `??` operator to provide an alternative expression to evaluate in case the result of the expression with null-conditional operations is null:

```csharp
double SumNumbers(List<double[]> setsOfNumbers, int indexOfSetToSum)
{
    return setsOfNumbers?[indexOfSetToSum]?.Sum() ?? double.NaN;
}

var sum = SumNumbers(null, 0);
Console.WriteLine(sum);  // output: NaN
```

When you work with nullable value types and need to provide a value of an underlying value type, use the `??` operator to specify the value to provide in case a nullable type value is `null`:

```csharp
int? a = null;
int b = a ?? -1;
Console.WriteLine(b);  // output: -1
```

- Use the [Nullable<T>.GetValueOrDefault()](https://learn.microsoft.com/en-us/09_dotnet/api/system.nullable-1.getvalueordefault#system-nullable-1-getvalueordefault) method if the value to be used when a nullable type value is `null` should be the default value of the underlying value type.
- You can use a [throw expression](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/exception-handling-statements#the-throw-expression) as the right-hand operand of the `??` operator to make the argument-checking code more concise:

```csharp
public string Name
{
    get => name;
    set => name = value ?? throw new ArgumentNullException(nameof(value), "Name cannot be null");
}
```

The preceding example also demonstrates how to use expression-bodied members to define a property.

You can use the `??=` operator to replace the code of the form

```csharp
if (variable is null)
{
    variable = expression;
}
```

with the following code:

```csharp
variable ??= expression;
```

## Lambda operator `=>`

The `=>` token is supported in two forms: as the _lambda operator_ and as a separator of a `member name` and the `member implementation` in an expression body definition.

#### Lambda operator

In [lambda expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/lambda-expressions), the lambda operator `=>` separates the input parameters on the left side from the lambda body on the right side.

The following example uses the [LINQ](https://learn.microsoft.com/en-us/09_dotnet/csharp/linq/) feature with method syntax to demonstrate the usage of lambda expressions:

```csharp
string[] words = { "bot", "apple", "apricot" };
int minimalLength = words
  .Where(w => w.StartsWith("a"))
  .Min(w => w.Length);
Console.WriteLine(minimalLength);   // output: 5

int[] numbers = { 4, 7, 10 };
int product = numbers.Aggregate(1, (interim, next) => interim * next);
Console.WriteLine(product);   // output: 280
```

Input parameters of a lambda expression are strongly typed at compile time. When the compiler can infer the types of input parameters, like in the preceding example, you may omit type declarations. If you need to specify the type of input parameters, you must do that for each parameter, as the following example shows:

```csharp
int[] numbers = { 4, 7, 10 };
int product = numbers.Aggregate(1, (int interim, int next) => interim * next);
Console.WriteLine(product);   // output: 280
```

The following example shows how to define a lambda expression without input parameters:

```csharp
Func<string> greet = () => "Hello, World!";
Console.WriteLine(greet());
```

For more information, see Lambda expressions.

#### Expression body definition

An expression body definition has the following general syntax:

```csharp
member => expression;
```

where `expression` is a valid expression. The return type of expression must be implicitly convertible to the member's return type. If the member:

- Has a void return type or
- Is a: - Constructor - Finalizer - Property or indexer set accessor
  expression must be a [statement expression](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/language-specification/statements#137-expression-statements). Because the expression's result is discarded, the return type of that expression can be any type.

The following example shows an expression body definition for a Person.ToString method:

```csharp
public override string ToString() => $"{fname} {lname}".Trim();
```

It's a shorthand version of the following method definition:

```csharp
public override string ToString()
{
   return $"{fname} {lname}".Trim();
}
```

You can create expression body definitions for methods, operators, read-only properties, constructors, finalizers, and property and indexer accessors. For more information, see [Expression-bodied members](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/statements-expressions-operators/expression-bodied-members).

## `await` operater

> asynchronously await for a task to complete

- The `await` operator suspends evaluation of the enclosing [async](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/async) method until the asynchronous operation represented by its operand completes. When the asynchronous operation completes, the `await` operator returns the result of the operation, if any.
- When the `await` operator is applied to the operand that represents an already completed operation, it returns the result of the operation immediately without suspension of the enclosing method.
- The `await` operator doesn't block the thread that evaluates the async method. When the `await` operator suspends the enclosing async method, the control returns to the caller of the method.

In the following example, the [HttpClient.GetByteArrayAsync](https://learn.microsoft.com/en-us/09_dotnet/api/system.net.http.httpclient.getbytearrayasync) method returns the `Task<byte[]>` instance, which represents an asynchronous operation that produces a byte array when it completes. Until the operation completes, the `await` operator suspends the `DownloadDocsMainPageAsync` method. When `DownloadDocsMainPageAsync` gets suspended, control is returned to the Main method, which is the caller of `DownloadDocsMainPageAsync`. The `Main` method executes until it needs the result of the asynchronous operation performed by the `DownloadDocsMainPageAsync` method. When [GetByteArrayAsync](https://learn.microsoft.com/en-us/09_dotnet/api/system.net.http.httpclient.getbytearrayasync) gets all the bytes, the rest of the `DownloadDocsMainPageAsync` method is evaluated. After that, the rest of the Main method is evaluated.

```csharp
public class AwaitOperator
{
    public static async Task Main()
    {
        Task<int> downloading = DownloadDocsMainPageAsync();
        Console.WriteLine($"{nameof(Main)}: Launched downloading.");

        int bytesLoaded = await downloading;
        Console.WriteLine($"{nameof(Main)}: Downloaded {bytesLoaded} bytes.");
    }

    private static async Task<int> DownloadDocsMainPageAsync()
    {
        Console.WriteLine($"{nameof(DownloadDocsMainPageAsync)}: About to start downloading.");

        var client = new HttpClient();
        byte[] content = await client.GetByteArrayAsync("https://learn.microsoft.com/en-us/");

        Console.WriteLine($"{nameof(DownloadDocsMainPageAsync)}: Finished downloading.");
        return content.Length;
    }
}
// Output similar to:
// DownloadDocsMainPageAsync: About to start downloading.
// Main: Launched downloading.
// DownloadDocsMainPageAsync: Finished downloading.
// Main: Downloaded 27700 bytes.
```

The operand of an await expression must provide for notification when a task completes. In general, a delegate is invoked when the task completes, either successfully or unsuccessfully. The [await](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/language-specification/expressions#1298-await-expressions) section of the C# language spec provides the details on how these notifications are implemented.

The preceding example uses the [async Main method](https://learn.microsoft.com/en-us/09_dotnet/csharp/fundamentals/program-structure/main-command-line). For more information, see the await operator in the Main method section.

✏️: For an introduction to asynchronous programming, see [Asynchronous programming with async and await](https://learn.microsoft.com/en-us/09_dotnet/csharp/asynchronous-programming/). Asynchronous programming with `async` and `await` follows the [task-based asynchronous pattern](https://learn.microsoft.com/en-us/09_dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap).

You can use the `await` operator only in a method, [lambda expression](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/lambda-expressions), or [anonymous method](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/delegate-operator) that is modified by the [async](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/async) keyword. Within an async method, you can't use the `await` operator in the body of a synchronous function, inside the block of a [lock statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/lock), and in an [unsafe](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/unsafe) context.

The operand of the `await` operator is usually of one of the following .NET types: [Task](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.task), [Task<TResult>](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.task-1), [ValueTask](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.valuetask), or [ValueTask<TResult>](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.valuetask-1). However, any awaitable expression can be the operand of the `await` operator. For more information, see the [Awaitable expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/language-specification/expressions#12982-awaitable-expressions) section of the C# language specification.

The type of expression `await t` is `TResult` if the type of expression `t` is [Task<TResult>](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.task-1) or [ValueTask<TResult>](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.valuetask-1). If the type of `t` is [Task](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.task) or [ValueTask](https://learn.microsoft.com/en-us/09_dotnet/api/system.threading.tasks.valuetask), the type of `await t` is `void`. In both cases, if `t` throws an exception, `await t` rethrows the exception.

#### Asynchronous streams and disposables

You use the `await foreach` statement to consume an asynchronous stream of data. For more information, see the [foreach statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/iteration-statements#the-foreach-statement) section of the [Iteration statements](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/iteration-statements) article.

You use the `await using` statement to work with an asynchronously disposable object, that is, an object of a type that implements an [IAsyncDisposable](https://learn.microsoft.com/en-us/09_dotnet/api/system.iasyncdisposable) interface. For more information, see the [Using async disposable](https://learn.microsoft.com/en-us/09_dotnet/standard/garbage-collection/implementing-disposeasync#using-async-disposable) section of the [Implement a DisposeAsync method](https://learn.microsoft.com/en-us/09_dotnet/standard/garbage-collection/implementing-disposeasync) article.

#### `await` operator in the `Main` method

The `Main` method, which is the application entry point, can return `Task` or `Task<int>`, enabling it to be `async` so you can use the `await` operator in its body. In earlier C# versions, to ensure that the Main method waits for the completion of an asynchronous operation, you can retrieve the value of the `Task<TResult>.Result` property of the `Task<TResult>` instance that is returned by the corresponding async method.

## delegate operator

The `delegate` operator creates an anonymous method that can be converted to a delegate type. An anonymous method can be converted to types such as [System.Action](https://learn.microsoft.com/en-us/09_dotnet/api/system.action) and [System.Func<TResult>](https://learn.microsoft.com/en-us/09_dotnet/api/system.func-1) types used as arguments to many methods.

```csharp
Func<int, int, int> sum = delegate (int a, int b) { return a + b; };
Console.WriteLine(sum(3, 4));  // output: 7
```

✏️:Lambda expressions provide a more concise and expressive way to create an anonymous function. Use the => operator to construct a lambda expression:

```csharp
Func<int, int, int> sum = (a, b) => a + b;
Console.WriteLine(sum(3, 4));  // output: 7
```

For more information about features of lambda expressions, for example, capturing outer variables, see [Lambda expressions](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/lambda-expressions).

When you use the `delegate` operator, you might omit the parameter list. If you do that, the created anonymous method can be converted to a delegate type with any list of parameters, as the following example shows:

```csharp
Action greet = delegate { Console.WriteLine("Hello!"); };
greet();

Action<int, double> introduce = delegate { Console.WriteLine("This is world!"); };
introduce(42, 2.7);

// Output:
// Hello!
// This is world!
```

That's the only functionality of anonymous methods that isn't supported by lambda expressions. In all other cases, a lambda expression is a preferred way to write inline code. You can use [discards](https://learn.microsoft.com/en-us/09_dotnet/csharp/fundamentals/functional/discards) to specify two or more input parameters of an anonymous method that aren't used by the method:

```csharp
Func<int, int, int> constant = delegate (int _, int _) { return 42; };
Console.WriteLine(constant(3, 4));  // output: 42
```

For backwards compatibility, if only a single parameter is named `_`, `_` is treated as the name of that parameter within an anonymous method.

You can use the `static` modifier at the declaration of an anonymous method:

```csharp
Func<int, int, int> sum = static delegate (int a, int b) { return a + b; };
Console.WriteLine(sum(10, 4));  // output: 14
```

A static anonymous method can't capture local variables or instance state from enclosing scopes.

You also use the `delegate` keyword to declare a [delegate type](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/reference-types#the-delegate-type).

Beginning with C# 11, the compiler may cache the delegate object created from a method group. Consider the following method:

```csharp
static void StaticFunction() { }
```

When you assign the method group to a delegate, the compiler will cache the delegate:

```csharp
Action a = StaticFunction;
```

Before C# 11, you'd need to use a lambda expression to reuse a single delegate object:

```csharp
Action a = () => StaticFunction();
```

## is operator

The `is` operator checks if the result of an expression is compatible with a given type. For information about the type-testing `is` operator, see the [is operator](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/type-testing-and-cast#is-operator) section of the [Type-testing and cast operators](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/type-testing-and-cast) article. You can also use the `is` operator to match an expression against a pattern, as the following example shows:

```csharp
static bool IsFirstFridayOfOctober(DateTime date) =>
    date is { Month: 10, Day: <=7, DayOfWeek: DayOfWeek.Friday };
```

In the preceding example, the `is` operator matches an expression against a [property pattern](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/patterns#property-pattern) with nested [constant](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/patterns#constant-pattern) and [relational](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/patterns#relational-patterns) patterns.

The `is` operator can be useful in the following scenarios:

- To check the run-time type of an expression, as the following example shows:

```csharp
int i = 34;
object iBoxed = i;
int? jNullable = 42;
if (iBoxed is int a && jNullable is int b)
{
    Console.WriteLine(a + b);  // output 76
}
```

The preceding example shows the use of a declaration pattern.

- To check for `null`, as the following example shows:

```csharp
if (input is null)
{
    return;
}
```

When you match an expression against null, the compiler guarantees that no user-overloaded `==` or `!=` operator is invoked.

- You can use a [negation pattern](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/patterns#logical-patterns) to do a non-null check, as the following example shows:

```csharp
if (result is not null)
{
    Console.WriteLine(result.ToString());
}
```

Beginning with C# 11, you can use [list patterns](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/patterns#list-patterns) to match elements of a list or array. The following code checks arrays for integer values in expected positions:

```csharp
int[] empty = [];
int[] one = [1];
int[] odd = [1, 3, 5];
int[] even = [2, 4, 6];
int[] fib = [1, 1, 2, 3, 5];

Console.WriteLine(odd is [1, _, 2, ..]);   // false
Console.WriteLine(fib is [1, _, 2, ..]);   // true
Console.WriteLine(fib is [_, 1, 2, 3, ..]);     // true
Console.WriteLine(fib is [.., 1, 2, 3, _ ]);     // true
Console.WriteLine(even is [2, _, 6]);     // true
Console.WriteLine(even is [2, .., 6]);    // true
Console.WriteLine(odd is [.., 3, 5]); // true
Console.WriteLine(even is [.., 3, 5]); // false
Console.WriteLine(fib is [.., 3, 5]); // true
```

✏️: For the complete list of patterns supported by the `is` operator, see [Patterns](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/operators/patterns).

## new operator

> creates a new instance of a type

The new operator creates a new instance of a type. You can also use the new keyword as a member declaration modifier or a generic type constraint.

#### Constructor invocation

To create a new instance of a type, you typically invoke one of the [constructors](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/constructors) of that type using the `new` operator:

```csharp
var dict = new Dictionary<string, int>();
dict["first"] = 10;
dict["second"] = 20;
dict["third"] = 30;

Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
// Output:
// first: 10; second: 20; third: 30
```

You can use an [object or collection initializer](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/classes-and-structs/object-and-collection-initializers) with the `new` operator to instantiate and initialize an object in one statement, as the following example shows:

```csharp
var dict = new Dictionary<string, int>
{
    ["first"] = 10,
    ["second"] = 20,
    ["third"] = 30
};

Console.WriteLine(string.Join("; ", dict.Select(entry => $"{entry.Key}: {entry.Value}")));
// Output:
// first: 10; second: 20; third: 30
```

#### Target-typed `new`

Constructor invocation expressions are target-typed. That is, if a target type of an expression is known, you can omit a type name, as the following example shows:

```csharp
List<int> xs = new();
List<int> ys = new(capacity: 10_000);
List<int> zs = new() { Capacity = 20_000 };

Dictionary<int, List<int>> lookup = new()
{
    [1] = new() { 1, 2, 3 },
    [2] = new() { 5, 8, 3 },
    [5] = new() { 1, 0, 4 }
};
```

As the preceding example shows, you always use parentheses in a target-typed `new` expression.

If a target type of a `new` expression is unknown (for example, when you use the `var` keyword), you must specify a type name.

#### Array creation

You also use the new operator to create an array instance, as the following example shows:

```csharp
var numbers = new int[3];
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
Console.WriteLine(string.Join(", ", numbers));
// Output:
// 10, 20, 30
```

Use array initialization syntax to create an array instance and populate it with elements in one statement. The following example shows various ways how you can do that:

```csharp
var a = new int[3] { 10, 20, 30 };
var b = new int[] { 10, 20, 30 };
var c = new[] { 10, 20, 30 };
Console.WriteLine(c.GetType());  // output: System.Int32[]
```

For more information about arrays, see [Arrays](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/arrays).

#### Instantiation of anonymous types

To create an instance of an [anonymous type](https://learn.microsoft.com/en-us/09_dotnet/csharp/fundamentals/types/anonymous-types), use the `new` operator and object initializer syntax:

```csharp
var example = new { Greeting = "Hello", Name = "World" };
Console.WriteLine($"{example.Greeting}, {example.Name}!");
// Output:
// Hello, World!
```

#### Destruction of type instances

You don't have to destroy earlier created type instances. Instances of both reference and value types are destroyed automatically. Instances of value types are destroyed as soon as the context that contains them is destroyed. Instances of reference types are destroyed by the [garbage collector](https://learn.microsoft.com/en-us/09_dotnet/standard/garbage-collection/) at some unspecified time after the last reference to them is removed.

For type instances that contain unmanaged resources, for example, a file handle, it's recommended to employ deterministic clean-up to ensure that the resources they contain are released as soon as possible. For more information, see the [System.IDisposable](https://learn.microsoft.com/en-us/09_dotnet/api/system.idisposable) API reference and the [using statement](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/statements/using) article.

## sizeof operator

The `sizeof` operator returns the number of bytes occupied by a variable of a given type. The argument to the `sizeof` operator must be the name of an [unmanaged type](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/unmanaged-types) or a type parameter that is [constrained](https://learn.microsoft.com/en-us/09_dotnet/csharp/programming-guide/generics/constraints-on-type-parameters#unmanaged-constraint) to be an unmanaged type.

The `sizeof` operator requires an [unsafe](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/keywords/unsafe) context. However, the expressions presented in the following table are evaluated in compile time to the corresponding constant values and don't require an unsafe context:

| Expression      | Constant value |
| --------------- | -------------- |
| sizeof(sbyte)   | 1              |
| sizeof(byte)    | 1              |
| sizeof(short)   | 2              |
| sizeof(ushort)  | 2              |
| sizeof(int)     | 4              |
| sizeof(uint)    | 4              |
| sizeof(long)    | 8              |
| sizeof(ulong)   | 8              |
| sizeof(char)    | 2              |
| sizeof(float)   | 4              |
| sizeof(double)  | 8              |
| sizeof(decimal) | 16             |
| sizeof(bool)    | 1              |

You also don't need to use an unsafe context when the operand of the `sizeof` operator is the name of an [enum](https://learn.microsoft.com/en-us/09_dotnet/csharp/language-reference/builtin-types/enum) type.

The following example demonstrates the usage of the sizeof operator:

```csharp
public struct Point
{
    public Point(byte tag, double x, double y) => (Tag, X, Y) = (tag, x, y);

    public byte Tag { get; }
    public double X { get; }
    public double Y { get; }
}

public class SizeOfOperator
{
    public static void Main()
    {
        Console.WriteLine(sizeof(byte));  // output: 1
        Console.WriteLine(sizeof(double));  // output: 8

        DisplaySizeOf<Point>();  // output: Size of Point is 24
        DisplaySizeOf<decimal>();  // output: Size of System.Decimal is 16

        unsafe
        {
            Console.WriteLine(sizeof(Point*));  // output: 8
        }
    }

    static unsafe void DisplaySizeOf<T>() where T : unmanaged
    {
        Console.WriteLine($"Size of {typeof(T)} is {sizeof(T)}");
    }
}
```

The `sizeof` operator returns a number of bytes that would be allocated by the common language runtime in managed memory. For struct types, that value includes any padding, as the preceding example demonstrates. The result of the `sizeof` operator might differ from the result of the [Marshal.SizeOf](https://learn.microsoft.com/en-us/09_dotnet/api/system.runtime.interopservices.marshal.sizeof) method, which returns the size of a type in unmanaged memory.

## true and false operator

The `true` operator returns the bool value `true` to indicate that its operand is definitely `true`, while the `false` operator returns the bool value `true` to indicate that its operand is definitely `false`.
