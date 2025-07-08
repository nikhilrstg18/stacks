---
title: "Transformers - Intro"
slug: "11_ai/01_applied_gen_ai/01_models/03_transformers"
stack: "GenAI"
date: "2025-06-03T07:26:45.889Z"
draft: false
---

## Limitation of Traditional Architecture

**Information Bottleneck**

The final hidden state of the encoder must encapsulate the entire input
sequence, posing challenges for long sequences as early information
might be lost.

**Challenges with Bottlenack**

Traditional architectures struggle with long sequences as they compress
all information into a single, fixed representation, making it difficult to
maintain the integrity of the entire sequence.

![Traditional Architecture](../../../../../src/images/11_ai/01_agen_ai/agi-13.png)

read more on [Transformers](https://jalammar.github.io/illustrated-transformer/)