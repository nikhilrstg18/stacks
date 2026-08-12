---
title: "Concatenate Strings"
slug: "09_dotnet/0_c/0_fundamentals/3_strings/3_common_tasks/0_concatenate_strings"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>String Concatenation - Combining Strings</summary>
  <div>

## Concatenate Strings

**Real-life analogy**: String concatenation is like assembling documents from smaller pieces. You can staple pages together (+ operator), use a template with placeholders (interpolation), join a stack of documents (String.Join), or use a clipboard that accumulates pages (StringBuilder). Each approach suits different scenarios - stapling for a few pages, templates for variable data, joining for collections, clipboard for many additions. Choosing the right approach ensures efficiency and readability.

**Technical explanation**: Concatenation appends one string to end of another to produce new string. C# gives several ways: concatenate string literals or constants with + (compiler joins at compile time), use + and += operators for variables, use string interpolation to embed computed expressions, use String.Concat to join collection with no separator, use String.Join to place separator between elements, use StringBuilder to build string in loop for many pieces. Best choice depends on fixed set of values, collection, or building piece by piece in loop.

**Key jargon explained**:
- **Concatenation**: Appending strings to produce new string
- **Compile-Time Joining**: Compiler joins literals at compile time
- **String Interpolation**: Embed expressions in string
- **String.Join**: Place separator between collection elements
- **StringBuilder**: Build string in single buffer for loops

```csharp:title:Literals.cs
// The compiler joins adjacent string literals at compile time.
string message =
    "This is the first sentence. " +
    "This is the second sentence. " +
    "This is the third sentence.";
```

```csharp:title:Operators.cs
string name = "Alex";
string day = "Monday";

// Use + to build a string from variables and literals.
string greeting = "Hello " + name + ". Today is " + day + ".";
```

**How it works in practice**: + operator for string literals and variables. Compiler joins adjacent literals at compile time (no runtime cost). + and += for combining variables. String interpolation ($"") for embedding computed expressions - more readable than chain of +. String.Concat to join collection with no separator. String.Join to place separator between elements. StringBuilder for building string in loop with many pieces - avoids allocating new string each time.

**Key takeaways for interviews**:
- + operator for literals and variables
- Compiler joins literals at compile time
- String interpolation for embedding expressions
- String.Join for delimited output
- StringBuilder for loops with many pieces

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>StringBuilder - Efficient Loop Building</summary>
  <div>

## Build a String in a Loop

**Real-life analogy**: StringBuilder is like a clipboard that accumulates pages instead of creating a new document each time you add a page. With regular string concatenation, each + operation creates a new document (string) with all pages copied - inefficient for many additions. StringBuilder uses a single buffer, appending pages in place and producing the final document only when needed. This is essential for loops that append many pieces, where the allocation overhead would be significant.

**Technical explanation**: Each + or += operation creates new string because strings are immutable. When append many pieces in loop, allocation adds up. StringBuilder class builds result in single buffer instead. Append methods add to buffer, ToString produces final string. Reach for StringBuilder when number of pieces large or unknown at compile time. For fixed, small set of values, + operator and string interpolation clearer. StringBuilder efficient for sequential edits, avoids allocating new string each time.

**Key jargon explained**:
- **StringBuilder**: Builds string in single buffer
- **Append Methods**: Add to buffer in place
- **ToString**: Produce final string from buffer
- **Immutable**: Strings can't be changed after creation
- **Allocation Overhead**: New string created for each + operation

```csharp:title:StringBuilder.cs
// StringBuilder builds a string in place, which suits loops
// that append many pieces.
var builder = new StringBuilder();
for (int i = 1; i <= 3; i++)
{
    builder.AppendLine($"Line {i}");
}

Console.Write(builder.ToString());
```

**How it works in practice**: StringBuilder builds string in single buffer. Append methods add to buffer. ToString produces final string. Use when number of pieces large or unknown at compile time. For fixed, small set of values, + operator and string interpolation clearer. Each + operation creates new string (immutable). StringBuilder avoids this allocation overhead. Essential for loops with many sequential edits. Also useful for complex string building operations.

**Key takeaways for interviews**:
- StringBuilder builds string in single buffer
- Avoids allocating new string each time
- Use for loops with many pieces
- For fixed, small values, + and interpolation clearer
- Append methods add to buffer, ToString produces final

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

**Real-life analogy**: Interview preparation for string concatenation is like understanding document assembly. You need to understand different assembly methods, when to use each, and how to optimize for efficiency.

**Common interview questions**:
1. **What are the different ways to concatenate strings in C#?**
   - + and += operators for literals and variables
   - String interpolation ($"") for embedding expressions
   - String.Concat to join collection with no separator
   - String.Join to place separator between elements
   - StringBuilder for building in loop with many pieces

2. **How does the compiler optimize string literal concatenation?**
   - Compiler joins adjacent string literals at compile time
   - Splitting long literal across lines has no runtime cost
   - Only applies to string literals and constants
   - Variables evaluated at runtime
   - Example: "a" + "b" compiled as "ab"

3. **When should you use StringBuilder vs string concatenation?**
   - StringBuilder for loops with many pieces
   - StringBuilder when number of pieces large or unknown
   - + and interpolation for fixed, small set of values
   - StringBuilder avoids allocating new string each time
   - Strings immutable - each + creates new string

4. **How does string interpolation compare to String.Format?**
   - Interpolation more readable than String.Format
   - Interpolation places expressions inline where value appears
   - Can't misalign arguments like positional placeholders
   - Supports full composite formatting feature set
   - Format specifiers and alignment work inside {}

5. **How do you join a collection of strings?**
   - String.Concat joins with no separator
   - String.Join places separator between each element
   - String.Join for delimited output (CSV, space-separated)
   - Example: string.Join(' ', words)
   - Returns array of substrings

**Key interview concepts**:
- **Concatenation**: Appending strings to produce new string
- **Compile-Time Optimization**: Compiler joins literals
- **String Interpolation**: Embed expressions in {}
- **String.Join**: Delimited collection joining
- **StringBuilder**: Efficient loop building

**How to approach interview questions**:
- Start with concatenation methods overview
- Explain compiler optimization for literals
- Discuss StringBuilder vs concatenation
- Address interpolation vs String.Format
- Mention String.Join for collections

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Concatenate strings in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/strings/common-tasks/concatenate)