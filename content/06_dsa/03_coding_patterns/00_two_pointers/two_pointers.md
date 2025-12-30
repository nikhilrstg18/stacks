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

- Given Data structure is Linear i.e. `array` or `linked list`
- Sorted in `asc` or `desc` order
- To cut `time complexity` from **O(n<sup>2</sup>)** to **O(n)**
- Reduce extra memory
- More predictable movement rules.

```text
        i→    j→
nums = [1  2  3  4  9  12]
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
  - target sums.

## Traversal Strategies

1. `Inward`

   **Pattern:** Start at both ends; move pointers inward based on a rule

   ```text:title=Two_ends_converging
           i →          ← j
   nums = [1 2 4 7 11 15 18]

   while i < j:
    compare(nums[i], nums[j])
     move i or j inward by rule
   ```

2. `Unidirectional`

   **Pattern:** Both pointers move forward; one leads, one lags, often maintaining a window or invariant.

   ```text
       i→ j→
      [1  1  2  2  3]

      Invariant: nums[:i] is deduplicated
      Advance j and copy unique to i
   ```

3. `Staged /Phased`

   **Pattern:** Move pointers through defined phases/stages, changing rules per stage (e.g., partition then collect; scan then merge).

   ```text
      Stage A: Partition

       l→    k→      ←r
      [2  0  2  1  1  0]

      Stage B: Final pass (if required)
   ```

**Problem:**

- You are given a sorted array of integers `nums` and an integer `target`.
- Your task is to find two distinct indices `i` and `j` such that:
  - `nums[i]` + `nums[j]` = `target`
  - Return the pair `[i, j]` if such indices exist, otherwise return `null`.

**Problem:**

- You are given an integer array height of length `n`.
- Each element represents the height of a vertical line drawn at that index on the x-axis.
- The task is to find two lines that, together with the x-axis, form a container that holds the maximum amount of water.
- The container’s capacity is determined by the shorter of the two lines multiplied by the distance between them.

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

<div class="div-flex" >
  <div class="div-item">

```js:title=Test_Case
height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(height)); // 49
```

  </div>
  <div class="div-item">
<se>
<hr class="step" data-step="Step 1: i = 0, j = 8"/>area = (8 - 0) x min(1, 7) = 8 x 1 = 8 <br/>→ best = 8 → height[i] < height[j] → i++
<hr class="step" data-step="Step 2: i = 1, j = 8"/>area = (8 - 1) x min(8, 7) = 7 x 7 = 49 <br/>→ best = 49 → height[i] > height[j] → j--
<hr class="step" data-step="Step 3: i = 1, j = 7"/>area = (7 - 1) x min(8, 3) = 6 x 3 = 18 <br/>→ best = 49 → height[i] > height[j] → j--
<hr class="step" data-step="Step 4: i = 1, j = 6"/>area = (6 - 1) x min(8, 8) = 5 x 8 = 40 <br/>→ best = 49 → height[i] == height[j] → j--
<hr class="step" data-step="Step 5: i = 1, j = 5"/>area = (5 - 1) x min(8, 4) = 4 x 4 = 16 <br/>→ best = 49 → height[i] > height[j] → j--
<hr class="step" data-step="Step 6: i = 1, j = 4"/>area = (4 - 1) x min(8, 5) = 3 x 5 = 15 <br/>→ best = 49 → height[i] > height[j] → j--
<hr class="step" data-step="Step 7: i = 1, j = 3"/>area = (3 - 1) x min(8, 2) = 2 x 2 = 4 <br/>→ best = 49 → height[i] > height[j] → j--
<hr class="step" data-step="Step 8: i = 1, j = 2"/>area = (2 - 1) x min(8, 6) = 1 x 6 = 6 <br/>→ best = 49 → height[i] > height[j] → j--
<hr class="step" data-step="Step 9: i = 1, j = 1"/>inters meet <br/>→ return best = 49
</se>
  </div>
</div>

**Problem:**

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

//Test Case
nums = [1, 1, 2, 2, 3, 4, 4, 5];
console.log(dedupSorted(nums)); // 5
```

<se>

initial i=1

<hr/>Step 1: j = 1
<br/> Compare nums[1] = 1 with nums[0] = 1
<br/> Equal → skip
<hr/>Step 2: j = 2
<br/> Compare nums[2] = 2 with nums[1] = 1
<br/> Different → place at nums[i]
<br/> nums[1] = 2 → array becomes [1, 2, 2, 2, 3, 4, 4, 5]
<br/> Increment i = 2
<hr/>Step 3: j = 3
<br/> Compare nums[3] = 2 with nums[2] = 2
<br/> Equal → skip
<hr/>Step 4: j = 4
<br/> Compare nums[4] = 3 with nums[3] = 2
<br/> Different → place at nums[i]
<br/> nums[2] = 3 → array becomes [1, 2, 3, 2, 3, 4, 4, 5]
<br/> Increment i = 3
<hr/>Step 5: j = 5
<br/> Compare nums[5] = 4 with nums[4] = 3
<br/> Different → place at nums[i]
<br/> nums[3] = 4 → array becomes [1, 2, 3, 4, 3, 4, 4, 5]
<br/> Increment i = 4
<hr/>Step 6: j = 6
<br/> Compare nums[6] = 4 with nums[5] = 4
<br/> Equal → skip
<hr/>Step 7: j = 7
<br/> Compare nums[7] = 5 with nums[6] = 4
<br/> Different → place at nums[i]
<br/> nums[4] = 5 → array becomes [1, 2, 3, 4, 5, 4, 4, 5]
<br/> Increment i = 5

</se>

**Problem:**

Given a string `s`, find the length of the longest substring without repeating characters

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Sliding Window</strong> Longest substring without repeating characters</div>

```js
function lengthOfLongestSubstring(s) {
  const last = new Map(); // stores last seen index of each character
  let start = 0, // left boundary of sliding window
    best = 0; // best length found so far
  for (let j = 0; j < s.length; j++) {
    const ch = s[j];
    if (last.has(ch) && last.get(ch) >= start) {
      start = last.get(ch) + 1; // move start to avoid duplicate
    }
    last.set(ch, j); // update last seen index
    best = Math.max(best, j - start + 1); // update best length
  }
  return best;
}

//Test Case
s = "abcabcbb";
console.log(lengthOfLongestSubstring(s)); // 3
```

<se>
Initial: start = 0, best = 0, last = {}
<hr/>Step 1: j = 0, ch = 'a'
<br/>last = { a: 0 }
<br/>best = max(0, 0 - 0 + 1) = 1
<hr/>Step 2: j = 1, ch = 'b'
<br/>last = { a: 0, b: 1 }
<br/>best = max(1, 1 - 0 + 1) = 2
<hr/>Step 3: j = 2, ch = 'c'
<br/>last = { a: 0, b: 1, c: 2 }
<br/>best = max(2, 2 - 0 + 1) = 3
<hr/>Step 4: j = 3, ch = 'a' (duplicate of index 0)
<br/>start = last.get('a') + 1 = 1
<br/>last = { a: 3, b: 1, c: 2 }
<br/>best = max(3, 3 - 1 + 1) = 3
<hr/>Step 5: j = 4, ch = 'b' (duplicate of index 1)
<br/>start = last.get('b') + 1 = 2
<br/>last = { a: 3, b: 4, c: 2 }
<br/>best = max(3, 4 - 2 + 1) = 3
<hr/>Step 6: j = 5, ch = 'c' (duplicate of index 2)
<br/>start = last.get('c') + 1 = 3
<br/>last = { a: 3, b: 4, c: 5 }
<br/>best = max(3, 5 - 3 + 1) = 3
<hr/>Step 7: j = 6, ch = 'b'
<br/>start = last.get('b') + 1 = 5
<br/>last = { a: 3, b: 6, c: 5 }
<br/>best = max(3, 6 - 5 + 1) = 2
<hr/>Step 8: j = 7, ch = 'b'
<br/>start = last.get('b') + 1 = 7
<br/>last = { a: 3, b: 7, c: 5 }
<br/>best = max(3, 7 - 7 + 1) = 1

</se>

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Fast-Slow</strong> Linked list cycle detection (Floyd's)</div>

**Problem:**

- Given the head of a linked list, determine if the list contains a cycle.
- A cycle exists if a node’s `next` pointer points back to a previous node in the list.

Two pointers:

- `slow` moves step by step.
- `fast` moves twice as fast.
- If there’s a cycle, they will eventually meet inside the loop.
- If there’s no cycle, fast will hit null and exit.

```js
function hasCycle(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next; // move one step
    fast = fast.next.next; // move two steps
    if (slow === fast) return true; // cycle detected
  }
  return false; // reached end → no cycle
}
```

<se>

🔍 Step Execution

Input 1: Linked list without cycle

```js
1 → 2 → 3 → 4 → null
```

`slow` moves one step at a time: 1 → 2 → 3 → 4<br/>
`fast` moves two steps at a time: 1 → 3 → null<br/>
Loop ends when `fast` or `fast.next` is null → return .

Input 2: Linked list with cycle

```js
1 → 2 → 3 → 4
      ↑     ↓
      ← ← ←
```

`slow`: 1 → 2 → 3 → 4 → 2 → 3 …<br/>
`fast`: 1 → 3 → 2 → 4 → 3 …<br/>
Eventually, `slow === fast` at node 2 or 3 → return .

</se>

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

**Problem:**

Given an array `nums` consisting only of `0`, `1`, and `2`, sort the array in-place so that all `0`s come first, followed by all `1`s, and then all `2`s

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Dutch National Flag</strong> (0,1,2) single-pass partition</div>

```js
function dutchFlag(nums) {
  let l = 0, // left boundary for 0s
    k = 0, // current index
    r = nums.length - 1; // right boundary for 2s

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

//Test Case
nums = [2, 0, 2, 1, 1, 0];
console.log(dutchFlag(nums)); // [0, 0, 1, 1, 2, 2]
```

<se>

🔍 Step Execution

<hr/>Initial: l = 0, k = 0, r = 5
<br/>nums = [2, 0, 2, 1, 1, 0]

<hr/>Step 1: nums[k] = 2 <br/>→ swap with nums[r]
<br/>nums = [0, 0, 2, 1, 1, 2]
<br/>→ r = 4

<hr/>Step 2: nums[k] = 0 <br/>→ swap with nums[l]
<br/>nums = [0, 0, 2, 1, 1, 2]
<br/>→ l = 1, k = 1

<hr/>Step 3: nums[k] = 0 <br/>→ swap with nums[l]
<br/>nums = [0, 0, 2, 1, 1, 2]
<br/>→ l = 2, k = 2

<hr/>Step 4: nums[k] = 2 <br/>→ swap with nums[r]
<br/>nums = [0, 0, 1, 1, 2, 2]
<br/>→ r = 3

<hr/>Step 5: nums[k] = 1 <br/>→ just move k 
<br/>→ k = 3

<hr/>Step 6: nums[k] = 1 <br/>→ just move k 
<br/>→ k = 4 → loop ends

</se>

**Problem:**

Given two sorted arrays `a` and `b`, merge them into a single sorted array.

- Two pointers (`i`, `j`) traverse arrays `a` and `b`.
- Always push the smaller element into out.
- When one array is exhausted, append the remainder of the other.
- Time complexity: **O(n + m)**
- Space complexity: **O(n + m)**

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

// Test Case
a = [1, 3, 5, 7];
b = [2, 4, 6, 8];
console.log(mergeArrays(a, b)); // [1, 2, 3, 4, 5, 6, 7, 8]
```

<se>

Initial: i = 0, j = 0, out = []

<hr/>Step 1: Compare a[0] = 1 and b[0] = 2 → 1 <= 2 → push 1
<br/>out = [1], i = 1

<hr/>Step 2: Compare a[1] = 3 and b[0] = 2 → 3 > 2 → push 2
<br/>out = [1, 2], j = 1

<hr/>Step 3: Compare a[1] = 3 and b[1] = 4 → 3 <= 4 → push 3
<br/>out = [1, 2, 3], i = 2

<hr/>Step 4: Compare a[2] = 5 and b[1] = 4 → 5 > 4 → push 4
<br/>out = [1, 2, 3, 4], j = 2

<hr/>Step 5: Compare a[2] = 5 and b[2] = 6 → 5 <= 6 → push 5
<br/>out = [1, 2, 3, 4, 5], i = 3

<hr/>Step 6: Compare a[3] = 7 and b[2] = 6 → 7 > 6 → push 6
<br/>out = [1, 2, 3, 4, 5, 6], j = 3

<hr/>Step 7: Compare a[3] = 7 and b[3] = 8 → 7 <= 8 → push 7
<br/>out = [1, 2, 3, 4, 5, 6, 7], i = 4

<hr/>Step 8: i = 4 → end of array a
<br/>Remaining b = [8] → push 8
<br/>out = [1, 2, 3, 4, 5, 6, 7, 8]

</se>

<div class="gatsby-code-title gatsby-remark-code-title"><strong>Partition-around-pivot</strong> return boundary index where >= pivot begins</div>

**Problem:**

Given an array `nums` and a pivot value, partition the array in-place so that:

- All elements `< pivot` are moved to the left side.
- All elements `>= pivot` remain on the right side. Return the index i, which represents the length of the left partition (number of elements less than pivot).

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

//Test Case
nums = [9, 3, 5, 2, 8, 1];
pivot = 5;
console.log(partition(nums, pivot));
```

<se>

Initial: i = 0, nums = [9, 3, 5, 2, 8, 1]

<hr/>Step 1: j = 0 → nums[0] = 9 (>= 5) → skip

<hr/>Step 2: j = 1 → nums[1] = 3 (< 5)
<br/>swap nums[i] and nums[j] → swap nums[0], nums[1]
<br/>nums = [3, 9, 5, 2, 8, 1]
<br/>i = 1

<hr/>Step 3: j = 2 → nums[2] = 5 (>= 5) → skip

<hr/>Step 4: j = 3 → nums[3] = 2 (< 5)
<br/>swap nums[1], nums[3]
<br/>nums = [3, 2, 5, 9, 8, 1]
<br/>i = 2

<hr/>Step 5: j = 4 → nums[4] = 8 (>= 5) → skip

<hr/>Step 6: j = 5 → nums[5] = 1 (< 5)
<br/>swap nums[2], nums[5]
<br/>nums = [3, 2, 1, 9, 8, 5]
<br/>i = 3

</se>

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
