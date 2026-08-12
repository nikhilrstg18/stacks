---
title: "String Interpolation"
slug: "09_dotnet/0_c/0_fundamentals/3_strings/1_interpolation"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>String Interpolation - Embed Values in Strings</summary>
  <div>

## String Interpolation

**Real-life analogy**: String interpolation is like mail merge templates. Instead of manually inserting each piece of data into a document, you create a template with placeholders and the system automatically fills in the values. Interpolation provides the same benefit - embed expressions directly in string literal by prefixing with $, and the compiler evaluates expressions and substitutes their values. More readable than String.Format with positional placeholders, and supports full composite formatting feature set.

**Technical explanation**: String interpolation lets you embed expressions directly in string literal by prefixing literal with $. Each {} is interpolation expression. C# evaluates expression, converts result to string by calling ToString(), substitutes text into result. String interpolation for null expression is empty string. Default conversion produces desired output for most cases. More readable alternative to String.Format, supports full composite formatting feature set. Format specifiers, alignment, culture-aware formatting, constant strings - all available with interpolated strings.

**Key jargon explained**:
- **Interpolation Expression**: {} containing expression to evaluate
- **Format String**: Colon and format specifier after expression
- **Alignment**: Comma and minimum field width
- **Composite Formatting**: Full formatting feature set
- **Constant Interpolated Strings**: When every expression is constant

```csharp:title:Interpolation.cs
double a = 3;
double b = 4;
Console.WriteLine($"Area of the right triangle with legs of {a} and {b} is {0.5 * a * b}");
Console.WriteLine($"Length of the hypotenuse of the right triangle with legs of {a} and {b} is {CalculateHypotenuse(a, b)}");
double CalculateHypotenuse(double leg1, double leg2) => Math.Sqrt(leg1 * leg1 + leg2 * leg2);
```

**How it works in practice**: Prefix literal with $ for interpolation. Expressions in {} evaluated and substituted. Can include format specifiers: {expression:formatString}. Can include alignment: {expression,width}. Can combine alignment and format: {expression,width:formatString}. Escape braces by doubling them ({{ or }}). Use conditional expressions in parentheses. Can span expressions across multiple lines (C# 11+). Can build constant strings when every expression constant. Format with specific culture using String.Create.

**Key takeaways for interviews**:
- Prefix literal with $ for interpolation
- Expressions in {} evaluated and substituted
- Format specifiers: {expression:formatString}
- Alignment: {expression,width}
- More readable than String.Format

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Format Strings and Alignment - Control Output</summary>
  <div>

## Format Strings and Alignment

**Real-life analogy**: Format strings and alignment are like column formatting in a spreadsheet. You can specify how numbers should appear (decimal places, currency symbols) and how wide each column should be, with left or right alignment. This creates neatly formatted output. String interpolation provides the same capability - format specifiers control how values appear, and alignment controls field width and positioning for professional-looking output.

**Technical explanation**: To control how expression result formatted, follow expression with colon and standard or custom format string. To produce aligned output, follow expression with comma and minimum field width. Positive widths right-align value, negative widths left-align. When need both alignment and format string, put alignment first. If formatted value longer than requested width, C# ignores width and emits full value. Format specifiers include standard formats (C for currency, D for decimal, F for fixed-point) and custom formats.

**Key jargon explained**:
- **Format String**: Colon and format specifier
- **Alignment**: Comma and minimum field width
- **Right-Align**: Positive width
- **Left-Align**: Negative width
- **Standard Format Specifiers**: C, D, F, N, P, X

```csharp:title:FormatString.cs
var date = new DateTime(1731, 11, 25);
Console.WriteLine($"On {date:dddd, MMMM dd, yyyy} L. Euler introduced the letter e to denote {Math.E:F5}.");
```

```csharp:title:Alignment.cs
var titles = new Dictionary<string, string>()
{
    ["Doyle, Arthur Conan"] = "Hound of the Baskervilles, The",
    ["London, Jack"] = "Call of the Wild, The",
    ["Shakespeare, William"] = "Tempest, The"
};

Console.WriteLine($"|{"Author",-25}|{"Title",30}|");
foreach (var title in titles)
{
    Console.WriteLine($"|{title.Key,-25}|{title.Value,30}|");
}
```

**How it works in practice**: Format string after colon: {expression:formatString}. Standard formats: C (currency), D (decimal), F (fixed-point), N (number), P (percent), X (hexadecimal). Custom formats for specific patterns. Alignment after comma: {expression,width}. Positive for right-align, negative for left-align. Combine both: {expression,width:formatString}. Width ignored if value longer. Use for tables, reports, formatted output.

**Key takeaways for interviews**:
- Format string: {expression:formatString}
- Alignment: {expression,width}
- Positive width right-aligns, negative left-aligns
- Standard formats: C, D, F, N, P, X
- Combine: {expression,width:formatString}

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

**Real-life analogy**: Interview preparation for string interpolation is like understanding mail merge and formatting. You need to understand how to embed values, how to format them, and how to align output professionally.

**Common interview questions**:
1. **What is string interpolation in C#?**
   - Embed expressions directly in string literal by prefixing with $
   - Each {} is interpolation expression
   - Expression evaluated, converted to string, substituted
   - More readable alternative to String.Format
   - Supports full composite formatting feature set

2. **How do you use format specifiers in string interpolation?**
   - Follow expression with colon and format string
   - {expression:formatString}
   - Standard formats: C (currency), D (decimal), F (fixed-point)
   - Custom formats for specific patterns
   - Example: {Math.PI:F3} for 3 decimal places

3. **How do you control alignment in string interpolation?**
   - Follow expression with comma and minimum field width
   - {expression,width}
   - Positive widths right-align, negative widths left-align
   - Combine with format: {expression,width:formatString}
   - Width ignored if value longer than requested

4. **How do you escape braces in interpolated strings?**
   - Double braces to include literal { or }
   - {{ for literal {, }} for literal }
   - Escape sequences same as ordinary string literals
   - Prefer interpolated raw string literal ($"""...""") for paths
   - Raw strings don't process escape sequences

5. **Can you build constant interpolated strings?**
   - Yes, when every interpolated expression is constant value
   - Usable for attribute arguments, switch patterns
   - Requires compile-time constants
   - Example: const string Greeting = $"Hello, {Audience}!"
   - Enables use in contexts requiring compile-time constants

**Key interview concepts**:
- **Interpolation Expression**: {} containing expression
- **Format String**: Colon and format specifier
- **Alignment**: Comma and field width
- **Escape Braces**: Double {{ or }}
- **Constant Strings**: When expressions are constants

**How to approach interview questions**:
- Start with interpolation definition and syntax
- Explain format specifiers and standard formats
- Discuss alignment and field width
- Address escaping braces and raw strings
- Mention constant interpolated strings

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [String interpolation in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/strings/interpolation)