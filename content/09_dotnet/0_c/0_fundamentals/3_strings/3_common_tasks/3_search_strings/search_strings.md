---
title: "Search Strings"
slug: "09_dotnet/0_c/0_fundamentals/3_strings/3_common_tasks/3_search_strings"
stack: "C#"
date: "2026-08-12T00:00:00.000Z"
draft: false
---

<details>
  <summary>Search Strings - Finding Text</summary>
  <div>

## Search Strings

**Real-life analogy**: Searching strings is like finding text in a document. You might ask "Does this document contain this word?" (Contains, StartsWith, EndsWith) or "Where does this word appear?" (IndexOf, LastIndexOf). The search can be exact or case-insensitive, and can follow linguistic rules or binary comparison. Choosing the right search method and comparison kind ensures you find what you're looking for efficiently and correctly for the data type.

**Technical explanation**: String class includes methods answering two everyday questions: Does this string contain that text? (Contains, StartsWith, EndsWith). Where does that text occur? (IndexOf, LastIndexOf). Most search overloads accept optional StringComparison value. Pick based on kind of data searching: identifiers, file paths, protocol tokens use Ordinal. Machine-defined data with case insensitivity use OrdinalIgnoreCase. User-visible text where current locale rules apply use CurrentCulture. User-visible text ignoring case use CurrentCultureIgnoreCase. Ordinal comparison fastest, right default for non-natural-language text.

**Key jargon explained**:
- **Contains**: Test for presence of substring
- **StartsWith/EndsWith**: Test for prefix/suffix
- **IndexOf/LastIndexOf**: Locate position of text
- **StringComparison**: Control case and comparison kind
- **Ordinal vs Culture-Aware**: Binary vs linguistic comparison

```csharp:title:Search.cs
string factMessage = "Extension methods have all the capabilities of regular static methods.";

// Default comparisons are case sensitive.
bool containsSearchResult = factMessage.Contains("extension");
Console.WriteLine($"""Contains "extension"? {containsSearchResult}""");

// For user-facing searches, pass a StringComparison value.
bool ignoreCaseSearchResult = factMessage.StartsWith("extension", StringComparison.CurrentCultureIgnoreCase);
Console.WriteLine($"""Starts with "extension"? {ignoreCaseSearchResult} (ignoring case)""");
```

**How it works in practice**: Contains, StartsWith, EndsWith test for presence of substring. IndexOf returns zero-based index of first occurrence, LastIndexOf returns index of last occurrence. Both return -1 when search text not present. Default comparisons case-sensitive, ordinal. Pass StringComparison for control. Use char overload of Contains for single character (avoids allocating one-character string). Combine IndexOf and LastIndexOf to extract text between markers. Iterate by passing previous result plus one for every occurrence.

**Key takeaways for interviews**:
- Contains, StartsWith, EndsWith test for presence
- IndexOf, LastIndexOf locate position
- Return -1 when search text not present
- Default: case-sensitive, ordinal
- Pass StringComparison for control

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

<details>
  <summary>Choosing the Right Comparison - Data Type</summary>
  <div>

## Choose the Right Comparison

**Real-life analogy**: Choosing comparison for search is like choosing search criteria. For exact matches (like finding a specific file path), use binary comparison. For user searches (like finding a name in a list), use culture-aware comparison that handles language rules. Using the wrong comparison leads to missed matches or false positives. Choose based on data type - machine-defined text uses ordinal, user-facing text uses culture-aware.

**Technical explanation**: Most search overloads accept optional StringComparison value. Pick based on kind of data searching. Identifiers, file paths, protocol tokens, machine-defined: use Ordinal. Machine-defined with case insensitivity: use OrdinalIgnoreCase. User-visible text where current locale rules apply: use CurrentCulture. User-visible text ignoring case: use CurrentCultureIgnoreCase. Persisted data that must compare same on every machine and culture: use InvariantCulture (rarely needed). Ordinal comparison fastest, right default for non-natural-language text. Culture-aware significantly slower, can produce surprising results.

**Key jargon explained**:
- **Machine-Defined**: Identifiers, paths, protocol tokens
- **User-Visible**: Names, titles, prose
- **Ordinal**: Binary comparison, fast
- **CurrentCulture**: User's locale settings
- **InvariantCulture**: Culture-independent

```csharp:title:Choice.cs
// For identifiers, file paths, protocol tokens: use Ordinal
string path = "/usr/local/bin";
bool hasSlash = path.Contains('/');

// For user-visible text: use CurrentCulture
string message = "Hello World";
bool hasHello = message.Contains("hello", StringComparison.CurrentCultureIgnoreCase);
```

**How it works in practice**: Use Ordinal for machine-defined data (identifiers, paths, tokens). Use OrdinalIgnoreCase for case-insensitive machine-defined. Use CurrentCulture for user-visible text. Use CurrentCultureIgnoreCase for case-insensitive user-visible. Use InvariantCulture for persisted data (rare). Ordinal fastest, right default for non-natural-language. Culture-aware slower, can surprise. Reserve for user searches against prose. Use same comparison kind for sort and search.

**Key takeaways for interviews**:
- Ordinal for machine-defined text (identifiers, paths)
- OrdinalIgnoreCase for case-insensitive machine-defined
- CurrentCulture for user-visible text
- CurrentCultureIgnoreCase for case-insensitive user-visible
- InvariantCulture for persisted data (rare)

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

**Real-life analogy**: Interview preparation for string search is like understanding document search methods. You need to understand different search approaches, how to control comparison, and what pitfalls to avoid.

**Common interview questions**:
1. **What are the main string search methods in C#?**
   - Contains: test for presence of substring
   - StartsWith/EndsWith: test for prefix/suffix
   - IndexOf: locate first occurrence, returns index
   - LastIndexOf: locate last occurrence, returns index
   - Return -1 when search text not present

2. **What is the default comparison for string search methods?**
   - Default: case-sensitive, ordinal comparison
   - Binary value of each character compared
   - Fast and consistent across cultures
   - For user-facing searches, pass StringComparison
   - Example: CurrentCultureIgnoreCase for case-insensitive

3. **How do you search for a single character?**
   - Use char overload of Contains
   - Avoids allocating one-character string
   - More direct than string overload
   - Example: path.Contains('/')
   - More efficient for character searches

4. **How do you extract text between two markers?**
   - Use IndexOf to find first marker
   - Use LastIndexOf to find last marker
   - Use Substring to extract between markers
   - Combine with Length of marker text
   - Handle case when markers not found

5. **When should you use ordinal vs culture-aware search?**
   - Ordinal: identifiers, file paths, protocol tokens
   - Ordinal: machine-defined text
   - Culture-aware: user-visible text (names, titles)
   - Culture-aware: user searches against prose
   - Pick based on data, not habit

**Key interview concepts**:
- **Search Methods**: Contains, StartsWith, EndsWith, IndexOf, LastIndexOf
- **Return Values**: bool for presence, int for position (-1 if not found)
- **StringComparison**: Control case and comparison kind
- **Char Overload**: Efficient single character search
- **Data Type**: Machine-defined vs user-visible

**How to approach interview questions**:
- Start with search methods overview
- Explain default comparison behavior
- Discuss char overload for efficiency
- Address extracting text between markers
- Mention ordinal vs culture-aware choice

  </div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- Reference: [Search strings in C# - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/strings/common-tasks/search)