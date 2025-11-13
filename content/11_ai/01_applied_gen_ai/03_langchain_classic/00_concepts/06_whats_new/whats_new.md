---
title: "Whats new - Langchain V1.0"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/06_whats_new"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

## Langchain v1.0

With recent release of **langchain V1.0**, its legacy implementation is moved package `langchain_classic` to avoid breaking changes and to keep to **v1.0** more lean and focussed.

## `TOON` (Token‑Oriented Object Notation)

**Problem: `JSON` is token‑heavy**

```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin", "salary": 75000 },
    { "id": 2, "name": "Bob", "role": "user", "salary": 65000 },
    { "id": 3, "name": "Charlie", "role": "user", "salary": 70000 }
  ]
}
```

➡️ **257 tokens**

**Solution: `TOON` is compact**

```text
users[3]{id,name,role,salary}:
1,Alice,admin,75000
2,Bob,user,65000
3,Charlie,user,70000
```

➡️ **166 tokens (35% less)**

### Features

1. **Tabular Arrays**  
   `JSON` (repetitive):

   ```json
   [
     { "sku": "A1", "qty": 2, "price": 9.99 },
     { "sku": "B2", "qty": 1, "price": 14.5 }
   ]
   ```

   `TOON` (efficient):

   ```text
   [2]{sku,qty,price}:
   A1,2,9.99
   B2,1,14.5
   ```

2. **Smart Quoting**

   - `hello world` → no quotes
   - `"hello, world"` → quotes (comma inside)

3. **Indentation over Brackets**  
   JSON:

   ```json
   { "user": { "id": 123, "profile": { "name": "Ada" } } }
   ```

   TOON:

   ```text
   user:
     id: 123
     profile:
       name: Ada
   ```

4. **Explicit Array Lengths**
   ```text
   tags[3]: admin,ops,dev
   ```

### Benchmarks

| Dataset              | JSON Tokens | TOON Tokens | Savings |
| -------------------- | ----------- | ----------- | ------- |
| GitHub Repos (100)   | 15,145      | 8,745       | 42.3%   |
| Analytics (180 days) | 10,977      | 4,507       | 58.9%   |
| E‑commerce Orders    | 257         | 166         | 35.4%   |

### `TOON` is not a `JSON` replacement

It’s a specialized optimization layer for LLM workflows. Think of it as “CSV + schema + YAML indentation” designed to minimize token overhead while improving model comprehension

**✅ Use `TOON` When**

- Large, uniform datasets
- Frequent LLM API calls
- Token cost is critical

**❌ Stick With `JSON` When**

- REST APIs / databases
- Deeply nested / irregular data
- Need universal compatibility

> `TOON` = Tabular arrays + Smart quoting + Indentation + Array lengths → fewer tokens, better comprehension.

<br>
<br>
<br>
<br>

---

- [langchain v1.0](https://docs.langchain.com/oss/python/releases/langchain-v1)
