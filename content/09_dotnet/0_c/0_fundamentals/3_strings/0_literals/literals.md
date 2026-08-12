---
title: "Raw String Literals"
slug: "09_dotnet/0_c/0_fundamentals/3_strings/0_literals"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Raw String Literals - No Escaping Needed</summary>
  <div>

## Raw String Literals

**Real-life analogy**: Raw string literals are like using a document template that preserves formatting exactly as written. Instead of escaping special characters (like backslashes in paths or quotes in JSON), you write the content exactly as it should appear. The template handles the formatting automatically. Raw string literals provide the same benefit - eliminate escape noise entirely, making source look like output. Ideal for inline JSON, SQL, XML, regex patterns, and formatted text blocks.

**Technical explanation**: Raw string literal delimited by three or more double quotes. Inside delimiters, every character taken literally. Quotes and backslashes don't need escaping, newlines preserved as written. Use for strings containing quotes, backslashes, or multiple lines: JSON, XML, SQL, regular expressions, file paths, code samples. Opening and closing delimiters each at least three double quotes, closing delimiter must use same number as opening. Content sits between them. For multiline, opening delimiter ends line, closing delimiter starts its own line.

**Key jargon explained**:
- **Raw String Literal**: Delimited by three or more quotes
- **Delimiter**: Opening and closing quote sequence
- **No Escaping**: Quotes and backslashes literal
- **Indentation**: Closing delimiter sets left margin
- **Interpolation**: $ prefix for embedded expressions

```csharp:title:RawStringLiteral.cs
// Raw string literals use three or more quotes and need no escaping.
string json = """
    {
        "name": "Ada",
        "roles": ["admin", "editor"]
    }
    """;

string sql = """
    SELECT Id, Name
    FROM   Users
    WHERE  Name = 'O''Brien'
    """;
```

**How it works in practice**: Delimited by three or more double quotes. Inside, quotes and backslashes literal - no escaping required. Single-line: content on same line as delimiters. Multiline: opening delimiter ends line, closing delimiter starts its own line. Column of closing """ defines left margin - compiler strips whitespace up to that column from every content line. Add $ prefix for interpolation. Use when content contains quotes, backslashes, or multiple lines. Prefer over verbatim strings for new code.

**Key takeaways for interviews**:
- Delimited by three or more double quotes
- Quotes and backslashes literal - no escaping
- Closing delimiter column sets left margin
- Add $ prefix for interpolation
- Use for JSON, SQL, XML, regex, multiline text

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Indentation and Interpolation - Formatting</summary>
  <div>

## Indentation and Raw Interpolated Strings

**Real-life analogy**: Indentation in raw strings is like a document margin setting. The closing delimiter defines the left margin, and the compiler strips indentation up to that margin from every line. This lets you indent the literal to match surrounding code without polluting the value. Interpolation in raw strings is like mail merge - you embed expressions in the template and the system fills in the values, preserving the formatting.

**Technical explanation**: Column of closing """ defines left margin. Compiler strips whitespace up to that column from every content line. Lets you indent literal to match surrounding code without polluting value. If content line has fewer leading whitespace characters than closing delimiter's column, compiler reports error. Keep all content lines indented at least as much as closing """. Add $ prefix to raw string to enable interpolation. Expressions in {} holes evaluated, results inserted. For interpolated content needing literal { or } characters, use $$ when content contains literal braces.

**Key jargon explained**:
- **Left Margin**: Column of closing delimiter
- **Whitespace Stripping**: Compiler removes indentation
- **Interpolation**: $ prefix for embedded expressions
- **Literal Braces**: $$ for content with literal { or }
- **Indentation Error**: Content line less indented than closing delimiter

```csharp:title:Indentation.cs
// The column of the closing """ sets a left margin.
// Whitespace up to that column is stripped from every content line.
string xml = """
        <order id="42">
            <item>book</item>
        </order>
        """;
```

```csharp:title:Interpolation.cs
// A single $ before """ enables interpolation.
string name = "Ada";
int    score = 95;

string report = $"""
    Player:  {name}
    Score:   {score}
    Updated: {DateTime.UtcNow:yyyy-MM-dd}
    """;
```

**How it works in practice**: Closing delimiter column defines left margin. Compiler strips whitespace up to that column from every content line. Enables indentation matching surrounding code. Error if content line less indented than closing delimiter. Add $ for interpolation. Expressions in {} evaluated and inserted. Use $$ when content needs literal { or }. Combines raw string benefits with interpolation for richly formatted output.

**Key takeaways for interviews**:
- Closing delimiter column sets left margin
- Compiler strips indentation up to margin
- Error if content line less indented than closing delimiter
- Add $ for interpolation
- Use $$ for content with literal braces

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

**Real-life analogy**: Interview preparation for raw string literals is like understanding document templates. You need to understand how templates preserve formatting, how to handle indentation, and how to embed dynamic content.

**Common interview questions**:
1. **What are raw string literals and when would you use them?**
   - Delimited by three or more double quotes
   - Quotes and backslashes literal - no escaping
   - Use for strings containing quotes, backslashes, or multiple lines
   - Ideal for JSON, XML, SQL, regex, formatted text blocks
   - Eliminate escape noise, source looks like output

2. **How does indentation work in raw string literals?**
   - Column of closing """ defines left margin
   - Compiler strips whitespace up to that column from every content line
   - Lets you indent literal to match surrounding code
   - Error if content line less indented than closing delimiter
   - Keep all content lines indented at least as much as closing delimiter

3. **How do you interpolate raw string literals?**
   - Add $ prefix to enable interpolation
   - Expressions in {} holes evaluated and inserted
   - Use $$ when content needs literal { or } characters
   - Combines raw string benefits with interpolation
   - Example: $"""Player: {name}"""

4. **What is the difference between single-line and multiline raw strings?**
   - Single-line: content on same line as delimiters
   - Multiline: opening delimiter ends line, closing delimiter starts its own line
   - Multiline preserves newlines as written
   - Newline after opening """ and before closing """ not part of value
   - Multiline for structured text, single-line for simple cases

5. **When should you use raw string literals vs verbatim literals?**
   - Raw strings: quotes, backslashes, multiple lines
   - Verbatim literals (@): existing code that uses them
   - Raw strings cover every case verbatim strings cover
   - Raw strings have cleaner syntax for embedded quotes
   - Prefer raw strings for new code

**Key interview concepts**:
- **Raw String Literal**: Three or more quotes, no escaping
- **Indentation**: Closing delimiter sets left margin
- **Interpolation**: $ prefix for embedded expressions
- **Literal Braces**: $$ for content with literal { or }
- **Use Cases**: JSON, SQL, XML, regex, multiline text

**How to approach interview questions**:
- Start with raw string literal definition and purpose
- Explain indentation and left margin rules
- Discuss interpolation and literal braces
- Address single-line vs multiline differences
- Mention when to use vs verbatim literals

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Raw string literals in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/strings/raw-string-literals)