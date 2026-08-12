---
title: "Compare Strings"
slug: "09_dotnet/0_c/0_fundamentals/3_strings/3_common_tasks/2_compare_strings"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>String Comparison - Equality and Sort Order</summary>
  <div>

## Compare Strings

**Real-life analogy**: String comparison is like comparing documents for equality or sorting them alphabetically. Two questions: "Are these documents the same?" (equality) and "In what order should these documents appear?" (sort order). C# lets you control case sensitivity (whether "Hello" and "hello" are equal) and comparison kind (ordinal/binary vs culture-aware/linguistic). Ordinal compares binary values (fast, consistent), culture-aware applies linguistic rules (varies by culture). Choose based on data type - machine-defined text uses ordinal, user-facing text uses culture-aware.

**Technical explanation**: Compare strings to answer two questions: Are these two strings equal? In what order do these strings sort? Control two independent factors: case sensitivity (whether "Hello" and "hello" treated as equal), comparison kind (ordinal/binary vs culture-aware). StringComparison enumeration combines these factors into single value. String.Equals and == perform case-sensitive, ordinal comparison by default. String.Compare determines sort order, returns negative/zero/positive for before/at same position/after. Compare and CompareTo default to culture-aware, Equals and == default to ordinal.

**Key jargon explained**:
- **Ordinal Comparison**: Compare binary value of each character
- **Culture-Aware Comparison**: Apply linguistic rules of culture
- **Case Sensitivity**: Whether "Hello" and "hello" are equal
- **StringComparison**: Enumeration combining case and comparison kind
- **Sort Order**: Relative ordering of strings

```csharp:title:Equality.cs
string root = @"C:\users";
string root2 = @"C:\Users";

// Equals and == both perform a case-sensitive, ordinal comparison.
Console.WriteLine(root.Equals(root2));
// => False
Console.WriteLine(root == root2);
// => False

// OrdinalIgnoreCase compares binary values but ignores case.
bool equalIgnoringCase = string.Equals(root, root2, StringComparison.OrdinalIgnoreCase);
Console.WriteLine(equalIgnoringCase);
// => True
```

**How it works in practice**: Equals and == perform case-sensitive, ordinal comparison by default. Pass StringComparison value for explicit control. OrdinalIgnoreCase for case-insensitive ordinal. String.Compare for sort order, returns negative/zero/positive. Compare defaults to culture-aware, Equals defaults to ordinal. Pass explicit StringComparison to avoid surprises. Use is operator with constant pattern for comparing against constants. Use switch expression for comparing against several constants.

**Key takeaways for interviews**:
- Equals and ==: case-sensitive, ordinal by default
- Compare: culture-aware by default
- StringComparison controls case and comparison kind
- Ordinal: fast, consistent, for machine-defined text
- Culture-aware: for user-facing text

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Choosing the Right Comparison - Ordinal vs Culture-Aware</summary>
  <div>

## Choose the Right Comparison

**Real-life analogy**: Choosing comparison kind is like choosing between exact matching and linguistic matching. Exact matching (ordinal) compares characters by their binary codes - "A" and "a" are different. Linguistic matching (culture-aware) applies language rules - in some cultures, "ss" and "ß" might be considered equal. Use exact matching for identifiers, file paths, protocol tokens (machine-defined). Use linguistic matching for names, product titles (user-facing). Choosing wrong comparison leads to bugs or surprising behavior.

**Technical explanation**: Pick comparison kind based on data, not habit. For identifiers, file paths, protocol tokens, machine-defined text, use Ordinal or OrdinalIgnoreCase. Ordinal comparison fast and consistent across cultures. For text users read and sort (names, product titles), use CurrentCulture so order matches user expectations. Culture-aware comparison applies linguistic rules that vary by culture, can produce surprising results. Reserve culture-aware for genuine natural-language text. Use same comparison kind whenever both sort and search collection.

**Key jargon explained**:
- **Machine-Defined Text**: Identifiers, file paths, protocol tokens
- **Natural-Language Text**: Names, product titles, user-facing
- **CurrentCulture**: User's current locale settings
- **InvariantCulture**: Culture-independent comparison
- **Linguistic Rules**: Language-specific character comparisons

```csharp:title:Choice.cs
// For identifiers, file paths, protocol tokens: use Ordinal
string path1 = @"C:\users";
string path2 = @"C:\Users";
bool equal = string.Equals(path1, path2, StringComparison.OrdinalIgnoreCase);

// For user-facing text: use CurrentCulture
string name1 = "Müller";
string name2 = "Mueller";
// Culture-aware comparison may treat them differently
```

**How it works in practice**: Use Ordinal for machine-defined text (identifiers, paths, tokens). Use OrdinalIgnoreCase for case-insensitive machine-defined text. Use CurrentCulture for user-facing text (names, titles). Use CurrentCultureIgnoreCase for case-insensitive user-facing text. Use InvariantCulture for persisted data that must compare same on every machine (rarely needed). Culture-aware slower, can produce surprising results. Reserve for genuine natural-language text. Use same comparison kind for sort and search.

**Key takeaways for interviews**:
- Ordinal for machine-defined text (identifiers, paths, tokens)
- CurrentCulture for user-facing text (names, titles)
- OrdinalIgnoreCase for case-insensitive machine-defined
- Culture-aware varies by culture, can surprise
- Use same comparison kind for sort and search

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

**Real-life analogy**: Interview preparation for string comparison is like understanding document comparison methods. You need to understand different comparison approaches, when to use each, and what pitfalls to avoid.

**Common interview questions**:
1. **What is the difference between ordinal and culture-aware comparison?**
   - Ordinal: compare binary value of each character
   - Culture-aware: apply linguistic rules of culture
   - Ordinal: fast, consistent across cultures
   - Culture-aware: varies by culture, can surprise
   - Ordinal for machine-defined, culture-aware for user-facing

2. **What is the default comparison for Equals vs Compare?**
   - Equals and ==: case-sensitive, ordinal by default
   - Compare and CompareTo: culture-aware by default
   - Different defaults can cause surprises
   - Pass explicit StringComparison to avoid surprises
   - State intended behavior explicitly

3. **How do you perform case-insensitive comparison?**
   - Pass StringComparison.OrdinalIgnoreCase
   - For user-facing text, CurrentCultureIgnoreCase
   - Example: string.Equals(a, b, StringComparison.OrdinalIgnoreCase)
   - Ignoring case while keeping ordinal semantics
   - Use appropriate comparison kind for data type

4. **When should you use ordinal vs culture-aware comparison?**
   - Ordinal: identifiers, file paths, protocol tokens
   - Ordinal: machine-defined text
   - Culture-aware: names, product titles
   - Culture-aware: user-facing text
   - Pick based on data, not habit

5. **How do you compare strings against constants?**
   - Use is operator with constant pattern
   - Use switch expression for multiple constants
   - Performs case-sensitive, ordinal comparison
   - More readable alternative to ==
   - Discard pattern (_) handles unmatched values

**Key interview concepts**:
- **Ordinal Comparison**: Binary value comparison
- **Culture-Aware**: Linguistic rules
- **StringComparison**: Enumeration for control
- **Default Behaviors**: Equals vs Compare defaults
- **Pattern Matching**: is and switch for constants

**How to approach interview questions**:
- Start with ordinal vs culture-aware distinction
- Explain default behaviors (Equals vs Compare)
- Discuss case-insensitive comparison options
- Address when to use each comparison kind
- Mention pattern matching for constants

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Compare strings in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/strings/common-tasks/compare)