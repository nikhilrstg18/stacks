---
title: "Program Structure"
slug: "09_dotnet/0_c/0_fundamentals/0_program_structure"
stack: "C#"
date: "2026-08-12T00:00:00.00Z"
draft: false
---

<details>
  <summary>Program Structure - Code Organization</summary>
  <div>

## General Structure of a C# Program

**Real-life analogy**: Program structure is like organizing a large corporation. You have departments (namespaces), organizational charts (program organization), executive summaries (top-level statements), and entry points (Main method). This organization ensures code is maintainable, discoverable, and follows clear architectural principles. C# program structure provides the same organizational framework for code, enabling developers to build scalable, maintainable applications. The structure depends on two choices: file-based vs project-based, and top-level statements vs Main method.

**Technical explanation**: Build C# programs from core building blocks: namespaces organize types, types (classes, structs, interfaces, enums, delegates) define behavior and data, statements and expressions perform work at runtime. Two independent choices for structure: file-based (single .cs file, no project file) vs project-based (.csproj file, multiple source files), top-level statements (executable code directly at file top) vs Main method (explicit static method entry point). Both project-based and file-based apps support either entry-point style. Use file-based for small utilities, prototypes, experiments. Use project-based for multiple files or fine-grained build configuration.

**Key jargon explained**:
- **File-Based App**: Single .cs file, no project file
- **Project-Based App**: .csproj file, multiple source files
- **Top-Level Statements**: Executable code at file top (C# 9+)
- **Main Method**: Explicit static method entry point
- **dotnet CLI**: Tools for creating, building, managing projects

```csharp:title:FileBased.cs
#!/usr/bin/env dotnet
Console.WriteLine("Hello, World!");
```

```csharp:title:TopLevelStatements.cs
Console.WriteLine("Hello, World!");

namespace YourNamespace
{
    class YourClass { }
    struct YourStruct { }
    interface IYourInterface { }
    delegate int YourDelegate();
    enum YourEnum { }
}
```

**How it works in practice**: File-based apps: single .cs file, run with dotnet run file.cs. Project-based apps: .csproj file, multiple source files, use dotnet new/build/run. Top-level statements: write executable code directly at file top, only one file can have them. Main method: explicit static method, can have various signatures (string[] args, int return, async Task). Both styles work with both app types. Use file-based for small utilities, project-based for multiple files. Convert file-based to project-based with dotnet project convert if app grows.

**Key takeaways for interviews**:
- File-based: single file, no project file
- Project-based: .csproj, multiple files
- Top-level statements: executable code at top (C# 9+)
- Main method: explicit static entry point
- Convert file-based to project-based as app grows

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Expressions and Statements - Building Blocks</summary>
  <div>

## Expressions and Statements

**Real-life analogy**: Expressions are like calculations that produce a result (2 + 2 = 4). Statements are like actions that perform work (print result, assign value). Expressions can nest inside statements, and statements can contain expressions. Every line of code is one or the other. Understanding this distinction is fundamental to writing C# code - expressions produce values, statements perform actions. This separation enables complex programs built from simple, composable building blocks.

**Technical explanation**: Expressions and statements are fundamental building blocks of C# program. Expression produces value. Statement performs action, typically ends in semicolon. Expressions: literal values (42), arithmetic operations (x + y), method calls (Math.Max(a, b)), conditional expressions (condition ? trueValue : falseValue), object creation (new Person("John")). Statements: declarations (int x;), declarations with initialization (int x = 42;), method calls (Console.WriteLine("Hello");), conditional statements (if (condition) { /* code */ }), return statements (return result;). Statements often contain expressions, expressions can nest inside other expressions.

**Key jargon explained**:
- **Expression**: Produces a value
- **Statement**: Performs an action, ends with semicolon
- **Declaration Statement**: Declare variable, optionally initialize
- **Method Call Statement**: Invoke method
- **Conditional Statement**: if, switch for control flow

```csharp:title:ExpressionsStatements.cs
// Expressions
42
x + y
Math.Max(a, b)
condition ? trueValue : falseValue
new Person("John")

// Statements
int x;
int x = 42;
Console.WriteLine("Hello");
if (condition) { /* code */ }
return result;
```

**How it works in practice**: Expression produces value (literal, arithmetic, method call, conditional, object creation). Statement performs action (declaration, method call, conditional, return). Statements often contain expressions. Expressions can nest inside other expressions. Example: var maxResult = Math.Max(a, b) + Math.Max(c, d); declaration statement assigns result of addition expression containing two method call expressions. Understanding distinction fundamental for writing C# code. For detailed information, see Statements reference. Expression-bodied members provide concise syntax for methods with single expressions.

**Key takeaways for interviews**:
- Expression: produces a value
- Statement: performs an action
- Statements often contain expressions
- Expressions can nest inside expressions
- Examples: literals, arithmetic, method calls, conditionals

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

**Real-life analogy**: Interview preparation for program structure is like understanding organizational principles. You need to understand how to organize code, different application styles, and the fundamental building blocks.

**Common interview questions**:
1. **What are the two choices for structuring C# programs?**
   - File-based vs project-based apps
   - Top-level statements vs Main method
   - File-based: single .cs file, no project file
   - Project-based: .csproj file, multiple source files
   - Both styles support both entry-point styles

2. **When should you use file-based vs project-based apps?**
   - File-based: small command-line utilities, prototypes, experiments
   - Project-based: multiple files, fine-grained build configuration
   - File-based: single file in directory
   - Project-based: project file with source files
   - Convert file-based to project-based as app grows

3. **What are top-level statements in C#?**
   - Write executable code directly at file top
   - Eliminate need for explicit class and Main method
   - Only one file in project can have top-level statements
   - Entry point is first line of program text
   - Default when creating new console app with dotnet new console

4. **What is the Main method in C#?**
   - Explicit static method as program entry point
   - Can have various signatures (string[] args, int return, async Task)
   - string[] args for command-line arguments
   - int return for exit code
   - async Task for async entry point

5. **What is the difference between expressions and statements?**
   - Expression: produces a value
   - Statement: performs an action, ends with semicolon
   - Statements often contain expressions
   - Expressions can nest inside other expressions
   - Examples: literals, arithmetic, method calls (expressions); declarations, method calls, conditionals (statements)

**Key interview concepts**:
- **File-Based**: Single file, no project file
- **Project-Based**: .csproj, multiple files
- **Top-Level Statements**: Executable code at top
- **Main Method**: Explicit entry point
- **Expressions vs Statements**: Value vs action

**How to approach interview questions**:
- Start with two choices for structuring programs
- Explain file-based vs project-based use cases
- Discuss top-level statements and Main method
- Address expressions vs statements distinction
- Mention dotnet CLI tools for building/running

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [General structure of a C# program - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/)