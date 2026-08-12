---
title: "Strings"
slug: "09_dotnet/0_c/0_fundamentals/3_strings"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Strings Overview - Text Processing</summary>
  <div>

## Strings in C#

**Real-life analogy**: Strings are like documents that contain text. Once a document is printed, you can't erase or modify the printed text - you create a new document with the changes. Strings work the same way - they're immutable, meaning once created, their contents can't be changed. Operations that appear to modify strings (ToUpper, Replace, Trim) actually create new strings with the changes. This immutability enables safe sharing across methods and threads, but requires StringBuilder for efficient modifications in loops.

**Technical explanation**: String is sequence of characters. In C#, string is language keyword for System.String type. Every string literal produces System.String instance. string keyword and String type name refer to same type, compile to identical IL. Prefer string keyword - consistent with other built-in type keywords (int, bool, double), works without using System directive. Strings are immutable - value can't be changed after creation. Methods like ToUpperInvariant, Replace, Substring, Trim return new string with modified value. Original instance stays same. Immutability enables safe sharing across methods and threads.

**Key jargon explained**:
- **String**: Sequence of characters, System.String type
- **Immutable**: Can't be changed after creation
- **String Literal**: Text enclosed in quotes
- **StringBuilder**: Efficient string building in loops
- **UTF-16**: In-memory encoding for strings

```csharp:title:StringVsString.cs
// The 'string' keyword is an alias for System.String. The two are identical.
string a = "hello";
String b = "hello";

Console.WriteLine(a == b);                // True
Console.WriteLine(typeof(string) == typeof(String)); // True
```

```csharp:title:Immutability.cs
string greeting = "hello";

// ToUpper returns a *new* string. The original is unchanged.
string shouted = greeting.ToUpperInvariant();

Console.WriteLine(greeting);  // hello
Console.WriteLine(shouted);   // HELLO
```

**How it works in practice**: string keyword alias for System.String. Strings immutable - operations return new strings. Use StringBuilder for many sequential edits in loops. Four literal forms: regular (short, simple text), verbatim (backslashes dominate), raw (multiline, structured text), interpolated (embed values). Add $ prefix for interpolation. Add u8 suffix for UTF-8 byte sequence. Indexing with [index] returns character at position. Range syntax [start..end] extracts substring.

**Key takeaways for interviews**:
- string keyword alias for System.String
- Strings immutable - operations return new strings
- Use StringBuilder for many edits in loops
- Four literal forms: regular, verbatim, raw, interpolated
- UTF-16 in-memory encoding

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>String Literals - Different Forms</summary>
  <div>

## String Literals

**Real-life analogy**: String literals are like different document formats for the same content. A plain text document works for simple messages. A document with special formatting (like backslashes for paths) needs verbatim mode to preserve formatting. A structured document (like JSON or SQL) needs raw mode to preserve structure without escape noise. Interpolated documents are like mail merge templates that insert values from a data source. Each format serves different content types.

**Technical explanation**: C# offers four literal forms. Regular literals for short, simple text with at most few escape sequences. Verbatim literals when backslashes dominate (Windows paths, regex patterns). Raw string literals for multiline or structurally formatted text (inline JSON, SQL, XML, formatted message blocks). Add $ prefix to any literal for interpolated string when need to embed values. Add u8 suffix to produce UTF-8 byte sequence (ReadOnlySpan<byte>) for byte-oriented APIs. Regular literals enclosed in double quotes, backslash starts escape sequence.

**Key jargon explained**:
- **Regular Literal**: Double quotes, escape sequences
- **Verbatim Literal**: @ prefix, backslashes literal
- **Raw String Literal**: Three or more quotes, no escaping
- **Interpolated String**: $ prefix, embed values in {}
- **UTF-8 Literal**: u8 suffix, byte sequence

```csharp:title:RegularLiteral.cs
// Common escape sequences inside a regular string literal.
string tabbed   = "name:\tAda";          // \t  tab
string twoLines = "line 1\nline 2";      // \n  newline
string quoted   = "She said \"hi\".";    // \"  literal quote
string path     = "C:\\src\\app";        // \\  literal backslash
```

```csharp:title:VerbatimLiteral.cs
// A verbatim string literal (@) treats backslashes literally.
string winPath = @"C:\src\app\readme.md";
string pattern = @"\d{3}-\d{4}";
```

```csharp:title:RawStringLiteral.cs
// Raw string literals use three or more quotes and need no escaping.
string json = """
    {
        "name": "Ada",
        "roles": ["admin", "editor"]
    }
    """;
```

**How it works in practice**: Regular literals for short, simple text. Verbatim literals (@) when backslashes dominate (Windows paths, regex). Raw string literals (""") for multiline or structured text (JSON, SQL, XML). Interpolated strings ($) embed values in {}. Combine forms: $@"..." for verbatim interpolation, $"""...""" for raw interpolation. Use regular when short with few escapes. Switch to verbatim or raw when escapes outnumber visible characters.

**Key takeaways for interviews**:
- Regular literals: short, simple text with escapes
- Verbatim literals (@): backslashes literal (paths, regex)
- Raw string literals ("""): multiline, structured text
- Interpolated strings ($): embed values in {}
- Combine forms: $@"...", $"""..."""

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

**Real-life analogy**: Interview preparation for string concepts is like understanding document processing. You need to understand different document formats, how to modify them efficiently, and how to search and compare their contents.

**Common interview questions**:
1. **What is the difference between string and String in C#?**
   - string keyword and String type name refer to same type
   - Compile to identical intermediate language (IL)
   - Prefer string keyword in code
   - Consistent with other built-in type keywords (int, bool, double)
   - Works without using System directive

2. **Why are strings immutable in C#?**
   - Value can't be changed after creation
   - Methods return new string with modified value
   - Original instance stays unchanged
   - Enables safe sharing across methods and threads
   - Explains why string behaves like value type in everyday use

3. **What are the different string literal forms in C#?**
   - Regular literals: short, simple text with escape sequences
   - Verbatim literals (@): backslashes literal (Windows paths, regex)
   - Raw string literals ("""): multiline, structured text (JSON, SQL, XML)
   - Interpolated strings ($): embed values in {}
   - UTF-8 literals (u8): byte sequence for byte-oriented APIs

4. **When should you use StringBuilder vs string concatenation?**
   - StringBuilder for many sequential edits in loops
   - StringBuilder avoids allocating new string each time
   - string + or += for fixed, small set of values
   - StringBuilder when number of pieces large or unknown
   - Use string interpolation for readability

5. **What is string interpolation and how does it work?**
   - $ prefix turns literal into interpolated string
   - Expressions in {} holes evaluated and inserted
   - Format specifiers and alignment work inside holes
   - Combine with other literal forms ($@"...", $"""...""")
   - Recommended way to compose strings from values

**Key interview concepts**:
- **Immutability**: Can't change after creation
- **StringBuilder**: Efficient string building in loops
- **String Literals**: Regular, verbatim, raw, interpolated
- **String Interpolation**: Embed values in {}
- **UTF-16**: In-memory encoding

**How to approach interview questions**:
- Start with string vs String distinction
- Explain immutability and its benefits
- Discuss different literal forms and use cases
- Address StringBuilder vs concatenation
- Mention string interpolation and syntax

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Strings in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/strings/)