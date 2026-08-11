---
title: "Two Pointers - Inward"
slug: "06_dsa/03_coding_patterns/00_two_pointers/00_inward"
stack: "DSA"
date: "2025-05-10T07:26:45.889Z"
draft: false
---

**Pattern:** Start at both ends; move pointers inward based on a rule

```text:title=Two_ends_converging
        i →          ← j
nums = [1 2 4 7 11 15 18]

while i < j:
compare(nums[i], nums[j])
  move i or j inward by rule
```
