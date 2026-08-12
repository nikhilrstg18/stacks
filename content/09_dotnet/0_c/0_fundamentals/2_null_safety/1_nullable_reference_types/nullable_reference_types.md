---
title: "Nullable Reference Types"
slug: "09_dotnet/0_c/0_fundamentals/2_null_safety/1_nullable_reference_types"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Nullable Reference Types - Expressing Null Intent</summary>
  <div>

## Nullable Reference Types

**Real-life analogy**: Nullable reference types are like labeling fields as "required" or "optional" in a data form. Required fields must always have a value, optional fields can be left blank. Before nullable reference types, all reference type variables were unlabeled - the compiler couldn't tell which were required and which were optional. Nullable reference types add these labels (string vs string?) so the compiler can warn when required fields are blank or when optional fields are used without checking. This minimizes NullReferenceException at runtime.

**Technical explanation**: Nullable reference types are group of features that minimize chance code throws NullReferenceException. Declare which variables intended to hold null and which aren't, compiler warns when declarations don't match how code uses them. Runtime behavior unchanged - entirely compile-time feature. Three building blocks: variable annotations (string vs string?) express which references allow null, null-state analysis tracks whether expression is not-null or maybe-null at each point, attributes on APIs describe nuanced contracts. Compiler combines signals to produce diagnostics. Warnings on non-nullable variable mean variable might receive null. Warnings on nullable variable mean code might dereference without null check.

**Key jargon explained**:
- **Nullable Reference Types**: Compile-time feature for null safety
- **Variable Annotations**: string vs string? for intent
- **Null-State Analysis**: Tracks not-null vs maybe-null
- **Dereference**: Using value variable refers to (method call, property access)
- **Nullable Context**: Project setting enabling feature

```csharp:title=Annotations.cs
public static void Annotations()
{
    string required = "always set";   // non-nullable: assigning null produces a warning
    string? optional = null;          // nullable: holding null is allowed

    Console.WriteLine(required.Length);

    if (optional is not null)
    {
        Console.WriteLine(optional.Length);
    }
}
```

**How it works in practice**: Enable with <Nullable>enable</Nullable> in project file. Reference types non-nullable by default, append ? for nullable. Annotation doesn't change runtime type (string and string? both System.String). Compiler uses annotation to produce warnings. Non-nullable variable has default null-state of not-null, compiler warns if assign maybe-null value. Nullable variable has default null-state of maybe-null, compiler warns if dereference without check. Use annotations to make required and optional values visible in type system.

**Key takeaways for interviews**:
- Nullable reference types minimize NullReferenceException
- Variable annotations (string vs string?) express intent
- Null-state analysis tracks not-null vs maybe-null
- Runtime behavior unchanged - compile-time feature
- Enable with <Nullable>enable</Nullable> in project file

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Null-State Analysis - Tracking Null Possibility</summary>
  <div>

## Null-State Analysis

**Real-life analogy**: Null-state analysis is like a safety inspector tracking whether equipment is operational or potentially broken. The inspector (compiler) monitors each piece of equipment (variable) as it moves through the factory (code flow). When equipment is known to be operational (not-null), it's safe to use. When potentially broken (maybe-null), the inspector warns before use. Null-state analysis provides the same tracking - compiler knows when variables are safe to use and warns about potential null dereferences.

**Technical explanation**: Compiler tracks null-state of every expression. State is one of two values: not-null (expression known to be not null), maybe-null (expression might be null). Local variable's null-state updated as compiler analyzes code. Two things change it: assignments and null checks. After assignment, variable's null-state matches expression on right-hand side. If expression is null or nullable, variable becomes maybe-null. If expression is non-null literal, variable becomes not-null. After null check, variable's null-state reflects whichever branch taken. Analysis works across if checks, pattern matching, control flow that loops or returns early.

**Key jargon explained**:
- **Null-State**: not-null or maybe-null
- **Assignments**: Update null-state based on right-hand expression
- **Null Checks**: Narrow null-state on matching branch
- **Pattern Matching**: is null, is { } for null testing
- **Control Flow**: Loops and early returns affect analysis

```csharp:title=NullStateTracking.cs
public static void NullStateTracking()
{
    string? message = null;

    // Warning: dereference of a possibly null reference.
    Console.WriteLine(message.Length);

    message = "Hello, World!";

    // No warning: the compiler tracks that message is now not-null.
    Console.WriteLine(message.Length);
}
```

```csharp:title=FlowAnalysis.cs
public static void FlowAnalysis(Node start)
{
    Node? current = start;
    while (current is not null)
    {
        // Inside the loop, the compiler knows current is not-null.
        Console.WriteLine(current.Name);

        current = current.Parent;
    }
}
```

**How it works in practice**: Compiler tracks null-state of every expression. State changes on assignments and null checks. Assignment to non-null literal makes variable not-null. Assignment to nullable makes variable maybe-null. Null check (is not null) narrows to not-null on matching branch. Pattern matching (is null, is { }) works similarly. Analysis doesn't trace into method bodies - use nullable analysis attributes for method contracts. Enables compiler to warn about potential null dereferences.

**Key takeaways for interviews**:
- Compiler tracks null-state: not-null or maybe-null
- Assignments and null checks change null-state
- Pattern matching narrows null-state on branches
- Analysis doesn't trace into method bodies
- Use attributes for method null contracts

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

**Real-life analogy**: Interview preparation for nullable reference types is like understanding labeling systems and safety inspections. You need to understand how to label fields, how inspections work, and how to override warnings when you know better.

**Common interview questions**:
1. **What are nullable reference types in C#?**
   - Group of features minimizing NullReferenceException
   - Declare which variables can hold null and which can't
   - Compiler warns when declarations don't match usage
   - Runtime behavior unchanged - compile-time feature
   - Three building blocks: annotations, null-state analysis, attributes

2. **How do you enable nullable reference types?**
   - Add <Nullable>enable</Nullable> to project file
   - Recent .NET templates include this by default
   - Can enable per file with #nullable enable directive
   - Can disable per file with #nullable disable directive
   - Check .csproj file for existing setting

3. **What is the difference between string and string?**
   - string: non-nullable, shouldn't hold null
   - string?: nullable, can hold null
   - Both compile to System.String at runtime
   - Annotation doesn't change runtime type
   - Compiler uses annotation to produce warnings

4. **How does null-state analysis work?**
   - Compiler tracks null-state: not-null or maybe-null
   - Assignments update null-state based on right-hand expression
   - Null checks narrow null-state on matching branch
   - Pattern matching (is null, is not null) works similarly
   - Analysis doesn't trace into method bodies

5. **What is the null-forgiving operator and when should you use it?**
   - ! operator suppresses nullable warnings
   - Tells compiler "this expression is definitely not null"
   - No effect at runtime, only affects compiler analysis
   - Use only when you can guarantee value isn't null
   - Prefer adding check or annotating source API

**Key interview concepts**:
- **Nullable Reference Types**: Compile-time null safety
- **Variable Annotations**: string vs string?
- **Null-State Analysis**: Tracking not-null vs maybe-null
- **Pattern Matching**: is null, is not null
- **Null-Forgiving Operator**: ! suppresses warnings

**How to approach interview questions**:
- Start with nullable reference types purpose
- Explain enabling and project configuration
- Discuss annotations (string vs string?)
- Address null-state analysis and tracking
- Mention null-forgiving operator and when to use

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Nullable reference types - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/null-safety/nullable-reference-types)