---
title: "Preprocessor Directives"
slug: "09_dotnet/0_c/0_fundamentals/0_program_structure/1_pre-processor_directives"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Preprocessor Directives Overview - Build Configuration</summary>
  <div>

## Preprocessor Directives

**Real-life analogy**: Preprocessor directives are like conditional instructions for a construction crew. Before building begins, the crew receives instructions like "if building for residential, include kitchen; if commercial, include office space." These instructions change what gets built based on the project type. C# preprocessor directives work the same way - they tell the compiler what code to include, exclude, or treat differently based on build configuration, enabling conditional compilation and build-specific behavior.

**Technical explanation**: Preprocessor directives tell compiler what code to include, exclude, or treat differently when building app. Always start with # and appear on their own line. Three groups cover everyday use: file-based apps (#:) configure file-based apps, conditional compilation (#if / #elif / #else / #endif) include/exclude code based on build configuration or target framework, warning suppression (#pragma warning) suppress or restore specific compiler warnings. File-based apps (C# 14+) use #! for shebang (Unix execution) and #: for build-system directives (packages, SDK settings).

**Key jargon explained**:
- **Preprocessor Directives**: Compiler instructions starting with #
- **Conditional Compilation**: Include/exclude code based on symbols
- **File-based Apps**: Single-file programs with #: directives
- **Warning Suppression**: Suppress specific compiler warnings
- **Build Configuration**: Debug vs Release builds

```csharp:title=ConditionalCompilation.cs
static void ConfigureLogging()
{
#if DEBUG
    Console.WriteLine("Debug logging enabled — verbose output active.");
#else
    Console.WriteLine("Release logging — errors only.");
#endif
}
```

```csharp:title=WarningSuppression.cs
static void ProcessData()
{
    try
    {
        var data = File.ReadAllText("config.json");
        Console.WriteLine($"Config loaded: {data.Length} characters");
    }
#pragma warning disable CS0168 // Variable is declared but never used
    catch (FileNotFoundException ex)
#pragma warning restore CS0168
    {
        Console.WriteLine("Config file not found, using defaults.");
    }
}
```

**How it works in practice**: Conditional compilation (#if DEBUG) includes code only when symbol defined. DEBUG symbol automatically set for Debug builds. Target framework symbols (NET10_0_OR_GREATER) enable version-specific code. Combine symbols with logical operators (&&, ||, !). Warning suppression (#pragma warning disable CS0168) suppresses specific warnings, scoped narrowly. File-based apps use #:package to add NuGet packages, #:project to reference projects, #:property to set MSBuild properties.

**Key takeaways for interviews**:
- Preprocessor directives start with #, appear on own line
- Conditional compilation based on DEBUG or target framework symbols
- Warning suppression scoped narrowly with disable/restore
- File-based apps use #: for packages and SDK settings
- Build system defines DEBUG for Debug configuration

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Conditional Compilation - Build-Specific Code</summary>
  <div>

## Conditional Compilation

**Real-life analogy**: Conditional compilation is like having different instruction sets for different construction projects. Residential projects get instructions for kitchens and bedrooms, while commercial projects get instructions for offices and conference rooms. The crew follows the appropriate instructions based on project type. Conditional compilation provides the same capability - include or exclude code based on build configuration (Debug vs Release) or target framework (.NET 8 vs .NET 10), enabling version-specific behavior.

**Technical explanation**: Use #if, #elif, #else, #endif to include or exclude code based on whether symbol is defined. Common symbols: DEBUG (set automatically for Debug builds), target framework symbols (NET10_0_OR_GREATER, NET8_0_OR_GREATER). Build system defines DEBUG symbol for Debug configuration. Target framework symbols enable code adaptation for different .NET versions in multi-targeting projects. Combine symbols with logical operators: && (and), || (or), ! (not). Use #define at top of file to define custom symbols, or DefineConstants property in project file.

**Key jargon explained**:
- **DEBUG Symbol**: Automatically set for Debug builds
- **Target Framework Symbols**: NET10_0_OR_GREATER, etc.
- **Multi-targeting**: Building for multiple .NET versions
- **Logical Operators**: &&, ||, ! for combining conditions
- **DefineConstants**: Project file property for defining symbols

```csharp:title=ConditionalCompilation.cs
static void ShowPlatformInfo()
{
#if NET10_0_OR_GREATER
    Console.WriteLine("Running on .NET 10 or later.");
#elif NET8_0_OR_GREATER
    Console.WriteLine("Running on .NET 8 or 9.");
#else
    Console.WriteLine("Running on an older .NET version.");
#endif
}
```

```csharp:title=DefineSymbol.cs
#define FEATURE_X

static void CheckFeature()
{
#if FEATURE_X
    Console.WriteLine("Feature X is enabled.");
#else
    Console.WriteLine("Feature X is disabled.");
#endif
}
```

**How it works in practice**: #if DEBUG includes code only in Debug builds, useful for verbose logging or debug-only features. Target framework symbols (NET10_0_OR_GREATER) enable version-specific code in multi-targeting projects. Combine conditions with && (both true), || (either true), ! (not true). #define at file top defines custom symbols for that file. DefineConstants in project file defines symbols for entire project. Conditional compilation enables different behavior based on build configuration or target framework without maintaining separate codebases.

**Key takeaways for interviews**:
- #if / #elif / #else / #endif for conditional compilation
- DEBUG symbol automatically set for Debug builds
- Target framework symbols for version-specific code
- Logical operators: &&, ||, !
- #define or DefineConstants for custom symbols

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

**Real-life analogy**: Interview preparation for preprocessor directive concepts is like understanding build configuration systems. You need to understand how to configure builds for different environments, how to suppress warnings appropriately, and how to maintain code that adapts to different configurations.

**Common interview questions**:
1. **What are preprocessor directives in C#?**
   - Tell compiler what code to include, exclude, or treat differently
   - Always start with # and appear on their own line
   - Three groups: file-based apps, conditional compilation, warning suppression
   - Change resulting program based on build configuration
   - Enable conditional compilation and build-specific behavior

2. **How does conditional compilation work in C#?**
   - Use #if, #elif, #else, #endif based on symbol definition
   - DEBUG symbol automatically set for Debug builds
   - Target framework symbols (NET10_0_OR_GREATER) for version-specific code
   - Combine symbols with logical operators (&&, ||, !)
   - #define or DefineConstants for custom symbols

3. **What are file-based app directives?**
   - #! for shebang line enabling Unix execution
   - #: for build-system directives (packages, SDK settings)
   - #:package to add NuGet packages
   - #:project to reference projects
   - #:property to set MSBuild properties

4. **How do you suppress compiler warnings?**
   - Use #pragma warning disable to suppress specific warnings
   - Use #pragma warning restore to re-enable warnings
   - Scope suppression as narrowly as possible
   - Always specify warning number (CS0168) rather than disabling all
   - Keeps suppression targeted and clear

5. **When would you use conditional compilation?**
   - Debug vs Release builds (DEBUG symbol)
   - Multi-targeting projects (target framework symbols)
   - Feature flags (#define custom symbols)
   - Platform-specific code
   - Experimental features

**Key interview concepts**:
- **Preprocessor Directives**: Compiler instructions starting with #
- **Conditional Compilation**: Include/exclude based on symbols
- **DEBUG Symbol**: Automatic for Debug builds
- **Target Framework Symbols**: Version-specific code
- **Warning Suppression**: #pragma warning disable/restore

**How to approach interview questions**:
- Start with preprocessor directive purpose and syntax
- Explain conditional compilation with DEBUG and target framework symbols
- Discuss file-based app directives for single-file programs
- Address warning suppression with narrow scoping
- Mention use cases for conditional compilation

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Preprocessor directives - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/preprocessor-directives)