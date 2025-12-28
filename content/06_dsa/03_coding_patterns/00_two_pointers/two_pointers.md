---
title: "Two Pointers"
slug: "06_dsa/03_coding_patterns/00_two_pointers"
stack: "DSA"
date: "2025-05-10T07:26:45.889Z"
draft: false
---

## Intro

- Two pointers are indices or positions within a data structure (e.g., `arrays`, `linked lists`).
- Using two pointers enables direct element comparison and decisions.

<div class="gatsby-code-title gatsby-remark-code-title">Naive approach: Nested loops compare all pairs in **O(n<sup>2</sup>)**</div>

```js
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    compare(nums[i], nums[j]);
  }
}
```

**Optimization via structure:**

- Predictable dynamics (like sorted `arrays`) let you move pointers intelligently—for instance, moving right in an ascending array reaches greater or equal values.

### When to use

To Cut **O(n<sup>2</sup>)** down to **O(n)**; reduce extra memory; more predictable movement rules.

```text
    i →      j →
   [1  2  3  4  9  12]
```

- Compare `nums[i]` and `nums[j]`

- Move the pointer that helps approach the goal (e.g., sum target)

- Two pointers track positions that move based on comparisons or constraints. They reduce redundant checks by exploiting **order**, **adjacency**, or **monotonicity**.

- Use cases
  - Sorted arrays
  - linked lists
  - strings; problems involving adjacency
  - partitions
  - palindromes
  - merging
  - or target sums.

## Strategies

### Inward traversal

> Two ends converging

**Pattern:** Start at both ends; move pointers inward based on a rule

```text
    i →          ← j
   [1 2 4 7 11 15 18]

   while i < j:
    compare(nums[i], nums[j])
     move i or j inward by rule
```

- Best for:

<div class="gatsby-code-title gatsby-remark-code-title">Two-sum in sorted array (return indices)</div>

```js
function twoSumSorted(nums, target) {
  let i = 0,
    j = nums.length - 1;
  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum === target) return [i, j];
    if (sum < target) i++;
    else j--;
  }
  return null;
}
```

<div class="gatsby-code-title gatsby-remark-code-title">Container with most water (max area)</div>

```js
function maxArea(height) {
  let i = 0,
    j = height.length - 1,
    best = 0;
  while (i < j) {
    const area = (j - i) * Math.min(height[i], height[j]);
    best = Math.max(best, area);
    if (height[i] < height[j]) i++;
    else j--;
  }
  return best;
}
```

<div class="gatsby-code-title gatsby-remark-code-title">Valid palindrome (skip non-alphanumerics)</div>

```js
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
```

### Unidirectional traversal

- **Pattern:** Both pointers move forward; one leads, one lags, often maintaining a window or invariant.

```text
    i→ j→
   [1  1  2  2  3]

   Invariant: nums[:i] is deduplicated
   Advance j and copy unique to i
```

- Best for:

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Deduplication</strong> from sorted array</div>

```js
function dedupSorted(nums) {
  if (nums.length === 0) return 0;
  let i = 1;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[j - 1]) {
      nums[i] = nums[j];
      i++;
    }
  }
  return i; // length of unique prefix
}
```

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Sliding Window</strong> Longest substring without repeating characters</div>

```js
function lengthOfLongestSubstring(s) {
  const last = new Map();
  let start = 0,
    best = 0;
  for (let j = 0; j < s.length; j++) {
    const ch = s[j];
    if (last.has(ch) && last.get(ch) >= start) {
      start = last.get(ch) + 1;
    }
    last.set(ch, j);
    best = Math.max(best, j - start + 1);
  }
  return best;
}
```

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Fast-Slow</strong> Linked list cycle detection (Floyd's)</div>

```js
function hasCycle(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

### Stage traversal

> phase-based movement

**Pattern:** Move pointers through defined phases/stages, changing rules per stage (e.g., partition then collect; scan then merge).

```text
   Stage A: Partition

    l→    k→      ←r
   [2  0  2  1  1  0]

   Stage B: Final pass (if required)
```

- Best for:

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Dutch National Flag</strong> (0,1,2) single-pass partition</div>

```js
function dutchFlag(nums) {
  let l = 0,
    k = 0,
    r = nums.length - 1;
  while (k <= r) {
    if (nums[k] === 0) {
      [nums[l], nums[k]] = [nums[k], nums[l]];
      l++;
      k++;
    } else if (nums[k] === 2) {
      [nums[r], nums[k]] = [nums[k], nums[r]];
      r--;
    } else {
      k++;
    }
  }
  return nums;
}
```

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Merge two sorted</strong> arrays or lists</div>

```js
function mergeArrays(a, b) {
  let i = 0,
    j = 0,
    out = [];
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out.push(a[i++]);
    else out.push(b[j++]);
  }
  if (i < a.length) out.push(...a.slice(i));
  if (j < b.length) out.push(...b.slice(j));
  return out;
}
```

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Partition-around-pivot</strong> return boundary index where >= pivot begins</div>

```js
function partition(nums, pivot) {
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] < pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  return i;
}
```

## Canonical problem set with crisp templates

- Pair sum in sorted array:
  - **Rule:** If sum < target, move left pointer right; else move right pointer left.
  - **Complexity:** Time **O(n)**, Space **O(1)**.

<div class="gatsby-code-title gatsby-remark-code-title">Two-sum in sorted array</div>

```js
//  i→             ←j
// [1  3  4  6  8  10]

function twoSumSorted(nums, target) {
  let i = 0,
    j = nums.length - 1;
  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum === target) return [i, j];
    if (sum < target) i++;
    else j--;
  }
  return null;
}
```

- Three sum:
  - **Rule:** Sort; fix index k; apply inward two-sum on k+1..end skipping duplicates.
  - **Complexity:** Time **O(n<sup>2</sup>)**, Space **O(1)** extra.

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Three-sum</strong> unique triplets summing to zero</div>

```js
//   k→  i→          ←j
// [-4, -1, -1, 0, 1, 2]

function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let k = 0; k < nums.length; k++) {
    if (k > 0 && nums[k] === nums[k - 1]) continue;
    let i = k + 1,
      j = nums.length - 1;
    while (i < j) {
      const s = nums[k] + nums[i] + nums[j];
      if (s === 0) {
        res.push([nums[k], nums[i], nums[j]]);
        i++;
        j--;
        while (i < j && nums[i] === nums[i - 1]) i++;
        while (i < j && nums[j] === nums[j + 1]) j--;
      } else if (s < 0) {
        i++;
      } else {
        j--;
      }
    }
  }
  return res;
}
```

- Reverse vowels in a string:
  - **Rule:** Move both ends; swap when both are vowels; else skip.
  - **Complexity:** Time **O(n)**, Space **O(1)**.

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Reverse</strong> vowels using two pointers</div>

```js
//  i→ j→
// [1  3  4  6  8  10]
function reverseVowels(s) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  const arr = Array.from(s);
  let i = 0,
    j = arr.length - 1;
  while (i < j) {
    if (!vowels.has(arr[i])) i++;
    else if (!vowels.has(arr[j])) j--;
    else {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  return arr.join("");
}
```

- Merge intervals (sorted by start):
  - **Rule:** Compare current with last merged; extend end or append new.
  - **Complexity:** Time **O(n log n)** for sort, **O(n)** merge.

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Merge intervals</strong> sorted by start</div>

```js
//  l→     k→     ←r
// [low | mid | high]

function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [s, e] of intervals) {
    if (merged.length === 0 || s > merged[merged.length - 1][1]) {
      merged.push([s, e]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], e);
    }
  }
  return merged;
}
```
