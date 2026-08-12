---
title: "Iteration Statements"
slug: "09_dotnet/0_c/0_fundamentals/4_expressions_and_statements/2_iteration_statements"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Iteration Statements - Loops</summary>
  <div>

## Iteration Statements in C#

**Real-life analogy**: Iteration statements are like repeating tasks in a workflow. foreach is like processing each item in a queue - handle each one in order without tracking position. while is like checking a condition before each task - only proceed if condition true. do-while is like doing task first, then checking condition - ensures at least one pass. for is like counting through numbered tasks - track index and use it. break and continue are like skipping or stopping tasks mid-process. These statements enable repeating code blocks efficiently.

**Technical explanation**: Iteration statements run block of code repeatedly. Each pass through block is iteration, repeating block is loop. C# provides four loops. Start with foreach for collections, use while and do-while when condition controls repetition, use for when need explicit index. foreach runs body once for each element in collection, in order. Most common choice for reading collection - no index to manage, no off-by-one mistakes. while checks Boolean condition before each iteration - runs zero or more times. do-while checks condition after each iteration - body always runs at least once. for contains initializer, condition, iterator - use when need index itself.

**Key jargon explained**:
- **Iteration**: One pass through loop body
- **Loop**: Repeating block of code
- **foreach**: Iterate collection without index
- **while**: Condition-controlled, zero or more times
- **for**: Index-based loop with initializer, condition, iterator

```csharp:title:Foreach.cs
string[] names = ["Ana", "Ben", "Cleo"];

foreach (string name in names)
{
    Console.WriteLine(name);
}
```

```csharp:title:While.cs
int countdown = 3;

while (countdown > 0)
{
    Console.WriteLine(countdown);
    countdown--;
}
```

**How it works in practice**: foreach for collections - reads each element in order, no index management, prevents off-by-one errors. Works with arrays, List<T>, Dictionary<TKey,TValue>. Iteration variable read-only. while checks condition before each iteration - runs zero or more times. Ensure something inside loop changes condition. do-while checks condition after each iteration - body runs at least once. Use when first pass must happen before evaluating condition. for has initializer (runs once), condition (checked before each iteration), iterator (runs after each iteration). Use when need index for modification.

**Key takeaways for interviews**:
- foreach for collections (no index)
- while for condition-controlled (zero or more)
- do-while for condition-controlled (one or more)
- for for index-based loops
- break exits loop, continue skips iteration

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Flow Control and Async Streams - Advanced Iteration</summary>
  <div>

## Flow Control and Async Streams

**Real-life analogy**: break and continue are like controlling task execution. break stops the entire task immediately - skip remaining items. continue skips current item and moves to next - skip specific items. await foreach is like processing items that arrive over time - each item might take time to produce, so wait for each one instead of blocking. This is essential for data streams like web API pages or database rows where retrieving next element is asynchronous.

**Technical explanation**: break statement exits loop immediately, skipping any remaining iterations. continue statement skips rest of current iteration and moves to next one. Asynchronous stream is reader that uses asynchronous task to produce each next element. Represented by IAsyncEnumerable<T> interface. Data arriving over time (web API pages, database rows) fits this model - retrieving next element is awaitable operation instead of immediate return. Consume asynchronous stream with await foreach - each iteration awaits next element, loop suspends while element produced instead of blocking thread.

**Key jargon explained**:
- **break**: Exits loop immediately
- **continue**: Skips current iteration
- **Asynchronous Stream**: Produces elements asynchronously
- **IAsyncEnumerable<T>:** Interface for async streams
- **await foreach**: Consume async streams

```csharp:title:BreakContinue.cs
int[] numbers = [2, 4, 7, 8];

foreach (int number in numbers)
{
    if (number % 2 != 0)
    {
        Console.WriteLine($"First odd number: {number}");
        break;
    }
}

int[] values = [1, 2, 3, 4, 5];

foreach (int value in values)
{
    if (value % 2 == 0)
    {
        continue;
    }
    Console.WriteLine(value);
}
```

```csharp:title:AwaitForeach.cs
await foreach (int value in GenerateAsync())
{
    Console.WriteLine(value);
}

async IAsyncEnumerable<int> GenerateAsync()
{
    for (int i = 0; i < 3; i++)
    {
        await Task.Delay(1);
        yield return i;
    }
}
```

**How it works in practice**: break exits loop immediately - skip remaining iterations. Use when find target or need early exit. continue skips rest of current iteration - moves to next. Use when want to skip specific items. await foreach consumes asynchronous streams - each iteration awaits next element. Loop suspends while element produced instead of blocking thread. Use for data arriving over time (web API, database). Asynchronous streams build on async and await. Essential for non-blocking data processing.

**Key takeaways for interviews**:
- break exits loop immediately
- continue skips current iteration
- await foreach for asynchronous streams
- IAsyncEnumerable<T> for async streams
- Loop suspends while element produced

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Common Interview Questions</summary>
  <div>

## Interview Preparation

**Real-life analogy**: Interview preparation for iteration statements is like understanding task repetition. You need to understand different loop types, flow control, and asynchronous iteration.

**Common interview questions**:
1. **What are the iteration statements in C#?**
   - foreach for collections (no index)
   - while for condition-controlled (zero or more)
   - do-while for condition-controlled (one or more)
   - for for index-based loops
   - break and continue for flow control

2. **When should you use foreach vs for?**
   - foreach: read elements in order, no index
   - for: need index for modification
   - foreach prevents off-by-one errors
   - for when need position or assign new values
   - Prefer foreach when only reading

3. **What is the difference between while and do-while?**
   - while: checks condition before each iteration
   - do-while: checks condition after each iteration
   - while runs zero or more times
   - do-while runs at least once
   - Use do-when when body must run first

4. **How do break and continue work?**
   - break: exits loop immediately
   - continue: skips current iteration
   - break skips remaining iterations
   - continue moves to next iteration
   - Use break for early exit, continue for skipping

5. **What is await foreach and when would you use it?**
   - Consumes asynchronous streams
   - Each iteration awaits next element
   - Loop suspends while element produced
   - Use for data arriving over time
   - IAsyncEnumerable<T> interface

**Key interview concepts**:
- **foreach**: Collection iteration
- **while/do-while**: Condition-controlled
- **for**: Index-based
- **break/continue**: Flow control
- **await foreach**: Async streams

**How to approach interview questions**:
- Start with iteration statements overview
- Explain foreach vs for use cases
- Discuss while vs do-while difference
- Address break and continue
- Mention await foreach for async streams

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Iteration statements in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/statements/iteration)