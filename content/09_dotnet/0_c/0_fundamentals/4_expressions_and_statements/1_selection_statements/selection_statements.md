---
title: "Selection Statements"
slug: "09_dotnet/0_c/0_fundamentals/4_expressions_and_statements/1_selection_statements"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Selection Statements - Conditional Branching</summary>
  <div>

## Selection Statements in C#

**Real-life analogy**: Selection statements are like decision points in a workflow. At each decision point, you choose which path to follow based on a condition (if temperature >= 25, take warm path; else take cool path). Switch statements are like routing tables - you match a value against several cases and take the corresponding path. Pattern-based cases are like advanced routing that matches data shapes, not just exact values. These statements enable programs to make decisions and execute different code based on conditions.

**Technical explanation**: Selection statements choose which block of code runs based on condition. C# provides two: if (with optional else) for branching on Boolean value, switch for comparing one value against several cases. Boolean expression evaluates to true or false (comparison temperature >= 25). if statement runs block only when Boolean expression true. Add else block for code when condition false. Chain conditions with else if for more than two paths. switch statement compares single value against many discrete cases. C# forbids fall-through between nonempty switch cases. Each case label can test pattern, not only constant.

**Key jargon explained**:
- **Boolean Expression**: Evaluates to true or false
- **if/else**: Branching on Boolean value
- **switch**: Compare value against cases
- **Pattern**: Rule describing shape or value of data
- **when Clause**: Extra condition for case

```csharp:title:IfElse.cs
int temperature = 28;

if (temperature >= 25)
{
    Console.WriteLine("Warm");
}
else
{
    Console.WriteLine("Cool");
}
```

```csharp:title:Switch.cs
DayOfWeek day = DayOfWeek.Saturday;

switch (day)
{
    case DayOfWeek.Saturday:
    case DayOfWeek.Sunday:
        Console.WriteLine("Weekend");
        break;
    default:
        Console.WriteLine("Weekday");
        break;
}
```

**How it works in practice**: if statement runs block when condition true. else block runs when condition false. Chain else if for multiple conditions - first matching condition wins. switch statement compares value against cases. Stack labels to share body. default section for unmatched values. C# forbids fall-through between nonempty cases - prevents accidental bugs. Case labels can test patterns (relational patterns, type patterns). when clause adds extra condition. Order matters - most specific conditions first.

**Key takeaways for interviews**:
- if/else for Boolean branching
- else if for multiple conditions
- switch for value matching
- C# forbids fall-through between nonempty cases
- Pattern-based case labels and when clauses

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Pattern Matching and Expressions - Advanced Selection</summary>
  <div>

## Pattern Matching and Selection Expressions

**Real-life analogy**: Pattern matching is like advanced filtering that matches data shapes, not just exact values. Relational patterns match ranges (< 0, > 0). Type patterns match object types. when clauses add extra conditions. Selection expressions (conditional operator, switch expression) choose values instead of running code. This is like choosing between two options based on a condition without executing different code paths - more concise for value selection.

**Technical explanation**: Case label not limited to constant values. Can test pattern - rule describing shape or value of data. Relational pattern such as < 0 matches any value less than zero. Add when clause to attach extra condition that must also be true for case to match. Pattern-based cases evaluated top to bottom, so more specific patterns before more general ones. Conditional operator ?: chooses between two values based on Boolean condition (condition ? valueIfTrue : valueIfFalse). switch expression is expression counterpart to switch statement - evaluates to value instead of running code.

**Key jargon explained**:
- **Relational Pattern**: Matches range (< 0, > 0)
- **Type Pattern**: Matches object type
- **when Clause**: Extra condition for case
- **Conditional Operator**: ?: chooses between two values
- **Switch Expression**: Evaluates to value

```csharp:title:PatternMatching.cs
int measurement = 42;

switch (measurement)
{
    case < 0:
        Console.WriteLine("Negative");
        break;
    case 0:
        Console.WriteLine("Zero");
        break;
    case > 0 when measurement % 2 == 0:
        Console.WriteLine("Positive and even");
        break;
    default:
        Console.WriteLine("Positive and odd");
        break;
}
```

```csharp:title:ConditionalOperator.cs
int hour = 9;
string greeting = hour < 12 ? "Good morning" : "Good afternoon";
```

**How it works in practice**: Pattern-based cases test data shapes. Relational patterns: < 0, > 0, >= 10. Type patterns: match object types. when clause adds extra condition. Pattern-based cases evaluated top to bottom - specific before general. Conditional operator ?: chooses between two values in single expression. Use when assigning one of two values - keeps assignment in one place, enables readonly/const. switch expression evaluates to value instead of running code - more concise than assigning in each arm. Compiler warns when arms don't cover every possible input.

**Key takeaways for interviews**:
- Pattern-based case labels test data shapes
- Relational patterns: < 0, > 0, >= 10
- when clause adds extra condition
- Conditional operator ?: for value selection
- switch expression evaluates to value

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

**Real-life analogy**: Interview preparation for selection statements is like understanding decision-making logic. You need to understand conditional branching, pattern matching, and value selection.

**Common interview questions**:
1. **What are the selection statements in C#?**
   - if/else for Boolean branching
   - switch for value matching
   - else if for multiple conditions
   - Pattern-based case labels
   - when clauses for extra conditions

2. **How does the else if chain work?**
   - Chain conditions with else if
   - First matching condition wins
   - Compiler skips rest after match
   - Order matters - specific conditions first
   - Final else handles remaining cases

3. **What is the difference between switch in C# vs C/Java?**
   - C# forbids fall-through between nonempty cases
   - Each case must end with break or jump statement
   - Prevents accidental fall-through bugs
   - Case labels can test patterns, not just constants
   - Stacked labels share one body

4. **What are pattern-based case labels?**
   - Test pattern describing shape or value of data
   - Relational patterns: < 0, > 0, >= 10
   - Type patterns: match object types
   - when clause adds extra condition
   - Evaluated top to bottom - specific before general

5. **What is the difference between conditional operator and if statement?**
   - Conditional operator ?: chooses between two values
   - if statement chooses which code runs
   - Use ?: when assigning one of two values
   - Use if when branches do more than produce value
   - ?: keeps assignment in one place, enables readonly/const

**Key interview concepts**:
- **if/else**: Boolean branching
- **switch**: Value matching
- **Pattern Matching**: Data shape matching
- **Conditional Operator**: Value selection
- **Switch Expression**: Evaluates to value

**How to approach interview questions**:
- Start with selection statements overview
- Explain if/else and else if chains
- Discuss switch and fall-through prevention
- Address pattern matching and when clauses
- Mention conditional operator and switch expression

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Selection statements in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/statements/selection)