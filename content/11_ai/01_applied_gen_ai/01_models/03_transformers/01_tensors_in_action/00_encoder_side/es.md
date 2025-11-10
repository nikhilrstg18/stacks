---
title: "Understanding Encoder"
slug: "11_ai/01_applied_gen_ai/01_models/03_transformers/01_tensors_in_action/00_encoder_side"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

<style>
o { color: #f49735 }
v { color: #b36be2 }
g { color: #70bf41 }
bl { color: #62aefa }
pi { color: pink}
</style>

## Words to Embeddings

As is the case in NLP applications in general, we begin by turning each input word into a vector using an [embedding algorithm](https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca)

![Each word is embedded into a vector of size 512. We'll represent those vectors with these simple boxes.](../../../../../../../src/images/11_ai/01_agen_ai/agi-17e.png)

## Encoder side

![Flow of Vectors](../../../../../../../src/images/11_ai/01_agen_ai/agi-17f.png)

### Word Embedding

- Each word in the input is converted into a vector of size 512 (a fixed-length list of numbers) using an embedding algorithm.
- These vectors are the starting point, fed into the first encoder layer.

### Passing Through Encoder Stack

- Transformers stack multiple encoder layers (usually 6).
- In each layer, the word vectors go through:
  - A self-attention module — where each word compares itself with other words.
  - A feed-forward module — which processes each word separately.

### Parallel Paths per Word

- Each word flows through its own path in the encoder.
- The **self-attention layer connects these paths**, allowing the model to understand how words relate.
- The **feed-forward layer works independently** on each word, enabling fast parallel processing.

### Layer Output Feeding Forward

- The output from one encoder becomes the input to the next — all still in vector form with size 512.
- By the end of the stack, each word vector has evolved into a rich representation of its meaning and context.

🧠 **In short:**

<v>A Transformer turns words into vectors, then lets them "talk to each other" through self-attention while refining them through layers — all in parallel, making it fast and smart</v>.

An encoder receives a list of vectors as input. It processes this list by passing these vectors into a ‘self-attention’ layer, then into a feed-forward neural network, then sends out the output upwards to the next encoder.

![The word at each position passes through a self-attention process. Then, they each pass through a feed-forward neural network -- the exact same network with each vector flowing through it separately.](../../../../../../../src/images/11_ai/01_agen_ai/agi-17g.png)

<br/>
<br/>
<br/>
<br/>

---

For a visual deep dive, see

- _Alammar, J (2018). **The Illustrated Transformer** [Blog post]. Retrieved from https://jalammar.github.io/illustrated-transformer/_
