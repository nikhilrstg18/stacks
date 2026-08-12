---
title: "Main Method"
slug: "09_dotnet/0_c/0_fundamentals/0_program_structure/4_main_method"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Main Method - Program Entry Point</summary>
  <div>

## Main() and Command-Line Arguments

**Real-life analogy**: The Main method is like the official opening ceremony for a new business. Before any operations begin, there's a formal kickoff where the business officially starts, leadership is introduced, and initial procedures are established. This ceremony marks the beginning of business operations. The Main method serves the same purpose - it's the entry point where the C# application officially starts. When the runtime calls Main, the program begins execution, and when Main returns, the program ends.

**Technical explanation**: Main method is entry point of executable program. Runtime calls Main before any other code runs. When Main returns, program ends. Must declare Main inside class or struct (enclosing class can be static). Main must be static. Can have any access modifier. Can return void, int, Task, or Task<int>. If returns Task or Task<int>, can include async modifier (async void Main not allowed). Can declare with or without string[] parameter for command-line arguments. Parameters are zero-indexed command-line arguments, program name not treated as first argument in args array.

**Key jargon explained**:
- **Entry Point**: Method called when program starts
- **Static Method**: Belongs to type, not instance
- **Access Modifier**: public, private, internal, etc.
- **Async Modifier**: Enables await in method
- **Command-Line Arguments**: Parameters passed to program

```csharp:title=MainSignatures.cs
static void Main() { }
static int Main() { }
static void Main(string[] args) { }
static int Main(string[] args) { }
static async Task Main() { }
static async Task<int> Main() { }
static async Task Main(string[] args) { }
static async Task<int> Main(string[] args) { }
```

**How it works in practice**: Runtime calls Main when program starts. Main must be static, declared in class or struct. Return type determines program behavior: void or Task for no exit code, int or Task<int> for exit code. async modifier allowed only with Task or Task<int> return types. string[] args parameter provides command-line arguments (zero-indexed, program name not included). Choose simplest signature fitting needs - omit args if not needed, use void/Task if no exit code, use async if awaiting.

**Key takeaways for interviews**:
- Main is entry point, called by runtime
- Must be static, declared in class or struct
- Can return void, int, Task, or Task<int>
- async only with Task or Task<int>
- string[] args for command-line arguments

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Main Return Values - Exit Codes</summary>
  <div>

## Main() Return Values

**Real-life analogy**: Main return values are like exit codes from a business process. When a business process completes, it reports success or failure to stakeholders. A return value of 0 means the process completed successfully, while a non-zero value indicates an error occurred. This enables other processes or scripts to make decisions based on the outcome. Main return values provide the same capability - programs can send status information to calling programs or scripts, with 0 indicating success and non-zero indicating error.

**Technical explanation**: When returning int or Task<int>, program can send status information to other programs or scripts. Return value of 0 usually means success, non-zero means error. Check exit code after running program: PowerShell uses $LastExitCode, batch files use %ERRORLEVEL%. If Main uses await, declare as async with Task or Task<int> return type. Runtime calls Main and waits for returned Task to complete before process exits. Return type can't be void or int with async because async modifier requires return type runtime can await - void and int don't represent ongoing work, process could exit before async operations finish.

**Key jargon explained**:
- **Exit Code**: Status information returned to caller
- **0 Return Value**: Conventionally indicates success
- **Non-zero Return Value**: Conventionally indicates error
- **$LastExitCode**: PowerShell variable for exit code
- **%ERRORLEVEL%**: Batch file variable for exit code

```csharp:title=ExitCode.cs
class MainReturnValTest
{
    static int Main()
    {
        //...
        return 0;
    }
}
```

```csharp:title=AsyncMain.cs
class Program
{
    static async Task<int> Main(string[] args)
    {
        return await AsyncConsoleWork();
    }

    private static async Task<int> AsyncConsoleWork()
    {
        return 0;
    }
}
```

**How it works in practice**: Return int or Task<int> to provide exit code to calling process. 0 conventionally means success, non-zero means error. Calling programs or scripts check exit code to determine success/failure. PowerShell uses $LastExitCode, batch files use %ERRORLEVEL%. If Main uses await, must return Task or Task<int> because async modifier requires awaitable return type. Runtime waits for Task to complete before process exits, ensuring async operations finish. Use Task when no exit code needed, Task<int> when exit code needed.

**Key takeaways for interviews**:
- int or Task<int> return provides exit code
- 0 indicates success, non-zero indicates error
- Calling programs check exit code for success/failure
- async Main requires Task or Task<int> return type
- Runtime waits for Task completion before exit

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

**Real-life analogy**: Interview preparation for Main method concepts is like understanding official procedures and status reporting. You need to understand how programs officially start, what signatures are valid, how to report status, and how to handle asynchronous operations at startup.

**Common interview questions**:
1. **What is the Main method in C#?**
   - Entry point of executable program
   - Called by runtime before any other code
   - When Main returns, program ends
   - Must be static, declared in class or struct
   - Can have any access modifier

2. **What are the valid Main method signatures?**
   - static void Main()
   - static int Main()
   - static void Main(string[] args)
   - static int Main(string[] args)
   - static async Task Main()
   - static async Task<int> Main()
   - static async Task Main(string[] args)
   - static async Task<int> Main(string[] args)

3. **How do command-line arguments work in Main?**
   - Include string[] args parameter to accept arguments
   - args is never null, Length is zero if no arguments
   - Zero-indexed array of string arguments
   - Program name not treated as first argument in args array
   - Can parse to other types using Parse or Convert

4. **How do Main return values work?**
   - int or Task<int> return provides exit code
   - 0 conventionally means success, non-zero means error
   - Calling programs check exit code for success/failure
   - PowerShell uses $LastExitCode, batch files use %ERRORLEVEL%
   - Enables status reporting to calling processes

5. **When should Main be async?**
   - When calling asynchronous methods at startup
   - Must return Task or Task<int> (not void or int)
   - Runtime waits for Task completion before process exits
   - Ensures async operations finish before exit
   - async void Main not allowed

**Key interview concepts**:
- **Entry Point**: Method called when program starts
- **Valid Signatures**: Various combinations of return type and parameters
- **Command-Line Arguments**: string[] args parameter
- **Exit Codes**: Return values for status reporting
- **Async Main**: Requires Task or Task<int> return type

**How to approach interview questions**:
- Start with Main method purpose as entry point
- Explain valid signatures and when to use each
- Discuss command-line arguments and parsing
- Address return values and exit codes
- Mention async Main requirements and behavior

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Main() and command-line arguments - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/main-command-line)