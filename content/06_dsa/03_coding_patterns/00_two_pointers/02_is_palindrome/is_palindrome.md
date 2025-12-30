---
title: "Is Palindrome"
slug: "06_dsa/03_coding_patterns/00_two_pointers/02_is_palindrome"
stack: "DSA"
date: "2025-05-10T07:26:45.889Z"
draft: false
---

| Approach                  | Time Complexity | Space Complexity | How It Works                                                       | Pros                                                        | Cons                                                                  |
| ------------------------- | --------------- | ---------------- | ------------------------------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| **Brute Force (Reverse)** | O(n)            | O(n)             | Clean string → reverse → compare with original.                    | Very simple to implement, intuitive.                        | Extra memory for reversed copy, slower in practice for large strings. |
| **Two‑Pointer (Regex)**   | O(n)            | O(1)             | Clean string → use two pointers moving inward, compare characters. | Memory‑efficient, no reversed copy, early exit on mismatch. | Slightly more complex logic, requires careful pointer handling.       |

- Both methods run in **O(n) time**.
- **Brute Force** is easier to write but uses **O(n) space**.
- **Two‑Pointer** is more efficient in memory (**O(1) space**) and can stop early when a mismatch is found.

<details>
<summary>Check if a string is a valid palindrome, <strong>ignoring non-alphanumeric characters and case</strong></summary>
<div>

- Given a string `s`, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
- A palindrome is a word, phrase, or sequence that reads the same backward as forward after filtering out non-alphanumeric characters.

Input

- `s`: a string that may contain letters, digits, spaces, and special characters.

Constraints:

- 1 <= `s.length` <= 2 \* 10<sup>5</sup>
- `s` may include uppercase/lowercase letters, digits, punctuation, and whitespace.

## Brute Force

```js:title=IsPalindrome_BruteForce
// Brute force: reverse and compare
function isPalindromeBruteForce(str) {
  // Normalize: remove non-alphanumeric and lowercase
  const cleaned = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

// Example
console.log(isPalindromeBruteForce("racecar")); // true
console.log(isPalindromeBruteForce("hello"));   // false
```

### Complexity analysis

1. **⏰ Time Complexity**

- **Normalization step:**

  - `str.replace(/[^a-z0-9]/gi, '')` → scans the entire string → `O(n)`
  - `.toLowerCase()` → converts all characters → `O(n)`

- **Reversal step:**

  - `.split('')` → creates an array of characters → `O(n)`
  - `.reverse()` → reverses the array → `O(n)`
  - `.join('')` → joins back into a string → `O(n)`

- **Comparison step:**

  - `cleaned === reversed` → compares two strings → `O(n)`

- Hence T(n) = O(n) + O(n) + O(n) + O(n) + O(n) ~ **O(n)**

2. **📦 Space Complexity**

- `cleaned` string → `O(n)`
- `reversed` string → `O(n)`
- Temporary array from `.split('')` → `O(n)`
- Hence S(n) = **O(n)**

📌 The brute force approach is simple but uses extra memory because it builds a reversed copy of the string.

## Optimized

<div class="div-flex" >
  <div class="div-item">

```js:title=IsPalindrome_using_TwoPointers
/**
 * Checks if a string is a valid palindrome, ignoring non-alphanumeric characters and case.
 *
 * @param {string} s - Input string.
 * @returns {boolean} True if palindrome, else false.
 */
function isPalindrome(s) {
  const isAlphaNum = (c) => /[a-z0-9]/i.test(c);
  let i = 0,
    j = s.length - 1;
  while (i < j) {
    while (i < j && !isAlphaNum(s[i])) i++;
    while (i < j && !isAlphaNum(s[j])) j--;
    if (s[i].toLowerCase() !== s[j].toLowerCase()) return false;
    i++;
    j--;
  }
  return true;
}

// Test case
consol.log(isPalindrome("racecar")); // true
```

  </div>
  <div class="div-item">

<se>
<hr class="step" data-step="Step 1: Compare s[i] = 'r' and s[j] = 'r'"/>
Both are alphanumeric → lowercase match → ✅
<br/> Move inward → i = 1, j = 5
<hr class="step" data-step="Step 2: Compare s[i] = 'a' and s[j] = 'a'"/>
Match → ✅
<br/> Move inward → i = 2, j = 4
<hr class="step" data-step="Step 3: Compare s[i] = 'c' and s[j] = 'c'"/>
Match → ✅
<br/> Move inward → i = 3, j = 3
<hr class="step" data-step="Step 4: Now i == j"/>
→ middle of the string reached
<br/> Loop ends

</se>
  </div>
</div>

### Complexity Analysis

1. **⏰ Time Complexity**

- **Pointer movement and filtering:**

  - Each character in the string is checked at most once by either `i` or `j`.
  - The regex test `/[a-z0-9]/i.test(c)` runs per character → **O(1)** average.
  - Together, the while loops scan through the string once → **O(n)**.

- **Character comparison:**
  - Each valid alphanumeric pair is compared once → **O(n)**.

Hence T(n) = **O(n)**

2. **📦 Space Complexity**

- Only a few scalar variables (`i`, `j`, temporary characters).
- No extra data structures proportional to input size.
  - S(n) = **O(1)**

📌 Efficient: scans the string once, ignores non‑alphanumeric characters, and uses constant memory.

</div>
</details>

<br/>
<br/>
<br/>
<br/>

---

- [valid-palindrome on leetcode](https://leetcode.com/problems/valid-palindrome/description/)
