---
title: "Lambda Expressions"
slug: "09_dotnet/0_c/0_fundamentals/1_type_system/9_lambda_expressions"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Lambda Expressions - Inline Functions</summary>
  <div>

## Lambda Expressions, Delegates, and Events

**Real-life analogy**: Lambda expressions are like passing instructions directly to a worker. Instead of writing a detailed procedure document and giving it to the worker, you provide the instructions inline with the task request. The worker follows the instructions immediately. Lambda expressions provide the same capability - pass a small piece of behavior (function) directly to another method without creating a separate named method, using arrow operator => to separate parameters from body.

**Technical explanation**: Lambda expression is compact, inline function written without name. Use arrow operator => to separate parameter list from body. To use lambda expression, compiler needs to know parameter types and return type - this description is delegate type. Delegate type represents method signature (parameter types plus return type). Variable of delegate type can hold matching method (lambda or named method). .NET provides Func and Action generic delegate types covering most scenarios. Func returns value, Action returns void. Lambda expressions reference variables from surrounding code (capturing). Static lambda (static modifier) can only use own parameters and values in body.

**Key jargon explained**:
- **Lambda Expression**: Inline function without name
- **Delegate Type**: Represents method signature
- **Func**: Delegate that returns value
- **Action**: Delegate that returns void
- **Capturing**: Lambda holds reference to outside variables

```csharp:title=LambdaExpression.cs
x => x * 2

// No parameters or more than one, wrap in parentheses
() => 42
(left, right) => left + right
```

```csharp:title=DelegateType.cs
delegate int Transform(int value);

Transform doubler = x => x * 2;    // assign a lambda expression
Transform squarer = Square;         // assign a named method

Console.WriteLine(doubler(5));      // 10
Console.WriteLine(squarer(5));      // 25

static int Square(int value) => value * value;
```

**How it works in practice**: Lambda expression syntax: parameters => body. Compiler infers types or specify explicitly. Delegate type describes signature. Func<T, TResult> for methods returning value, Action<T> for methods returning void. Pass lambda to method accepting Func or Action parameter. Lambda can capture variables from surrounding scope (closure). Add static modifier to prevent capturing. Use discard parameters (_) for irrelevant inputs. Events built on delegates, publisher notifies subscribers.

**Key takeaways for interviews**:
- Lambda expressions are inline functions without name
- Delegate types represent method signatures
- Func returns value, Action returns void
- Lambdas can capture surrounding variables (closure)
- Static lambdas prevent capturing

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Events - Publisher-Subscriber Pattern</summary>
  <div>

## Events Provide Optional Notifications

**Real-life analogy**: Events are like subscription newsletters. A publisher (newsletter service) sends notifications to subscribers when new content is available. Subscribers choose to opt in or out. The publisher doesn't need to know who is listening or how many subscribers there are. Events provide the same mechanism - one object (publisher) notifies other objects (subscribers) when something happens, with optional subscription.

**Technical explanation**: Event is mechanism for one object (publisher) to notify other objects (subscribers) when something happens. Publisher doesn't need to know who is listening or how many subscribers. Subscribers choose to opt in. Events built on delegates. Event is delegate field with extra restrictions enforced by event keyword: outside code can only subscribe (+=) or unsubscribe (-=), only class declaring event can invoke (raise) it. .NET convention for event delegate types is EventHandler<T>, signature always has two parameters: sender (object that raised event) and event data of type T.

**Key jargon explained**:
- **Event**: Publisher-subscriber notification mechanism
- **Publisher**: Object that raises event
- **Subscriber**: Object that subscribes to event
- **EventHandler<T>**: Standard event delegate type
- **Subscribe/Unsubscribe**: += and -= operators

```csharp:title=Events.cs
MessagePublisher publisher = new();
publisher.MessagePublished += (_, message) => Console.WriteLine($"Received: {message}");

publisher.Publish("Records updated");
```

**How it works in practice**: Event declared with event keyword on delegate field. Outside code can only subscribe (+=) or unsubscribe (-=). Only declaring class can invoke (raise) event. Use EventHandler<T> convention with sender and event data parameters. Subscribers add handler with +=, remove with -=. Publisher raises event with ?.Invoke(...) to check for subscribers. Publisher raises without knowing or caring whether anyone listening. Subscribing is optional.

**Key takeaways for interviews**:
- Events enable publisher-subscriber pattern
- Outside code can only subscribe/unsubscribe
- Only declaring class can invoke event
- EventHandler<T> standard convention
- ?.Invoke checks for subscribers before raising

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

**Real-life analogy**: Interview preparation for lambda and event concepts is like understanding instruction passing and notification systems. You need to understand how to pass behavior, how to manage subscriptions, and how to handle notifications.

**Common interview questions**:
1. **What is a lambda expression in C#?**
   - Compact, inline function without name
   - Arrow operator => separates parameters from body
   - Compiler needs parameter types and return type (delegate type)
   - Can capture variables from surrounding scope (closure)
   - static modifier prevents capturing

2. **What are Func and Action delegate types?**
   - Func: method that returns value (last type parameter is return type)
   - Action: method that returns void (all type parameters are inputs)
   - Cover most scenarios, rarely need custom delegate types
   - Examples: Func<int, int, int>, Action<string>
   - Versions with zero to sixteen input type parameters

3. **What is lambda capturing and how does it work?**
   - Lambda holds reference to variable declared outside body
   - Combination of lambda and captured variables is closure
   - Capturing means lambda can use outside variables
   - Static lambda can only use own parameters and values in body
   - Static lambdas prevent accidental captures

4. **What are events in C#?**
   - Mechanism for publisher to notify subscribers
   - Built on delegates with event keyword restrictions
   - Outside code can only subscribe (+=) or unsubscribe (-=)
   - Only declaring class can invoke (raise) event
   - EventHandler<T> standard convention

5. **When should you use discard parameters in lambdas?**
   - When delegate signature includes parameters you don't need
   - Use discard (_) to signal choice explicitly
   - Common in event handlers (don't use sender or EventArgs)
   - Callbacks where you only need some inputs
   - LINQ overloads with index you don't use

**Key interview concepts**:
- **Lambda Expression**: Inline function without name
- **Delegate Type**: Method signature representation
- **Func/Action**: Built-in generic delegate types
- **Capturing/Closure**: Reference to outside variables
- **Event**: Publisher-subscriber notification

**How to approach interview questions**:
- Start with lambda expression syntax and purpose
- Explain delegate types and Func/Action
- Discuss capturing and static lambdas
- Address events and publisher-subscriber pattern
- Mention discard parameters for unused inputs

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Lambda expressions, delegates, and events - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/delegates-lambdas)