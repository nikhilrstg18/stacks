---
title: "Bringing the Tensors Into the Picture"
slug: "11_ai/01_applied_gen_ai/01_models/03_transformers/01_tensors_in_action"
stack: "GenAI"
date: "2025-06-03T07:26:45.889Z"
draft: false
---

<style>
o { color: #f49735 }
v { color: #b36be2 }
g { color: #70bf41 }
bl { color: #62aefa }
pi { color: pink}
</style>

> Now we’re going to talk about how real data flows through the model

## Step-by-Step Flow of Vectors (Tensors)

Now that we’ve seen the major components of the model, let’s start to look at the various vectors/tensors and how they flow between these components to turn the input of a trained model into an output.

### Embeddings

As is the case in NLP applications in general, we begin by turning each input word into a vector using an [embedding algorithm](https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca)

![Each word is embedded into a vector of size 512. We'll represent those vectors with these simple boxes.](../../../../../../src/images/11_ai/01_agen_ai/agi-17e.png)

### Encoder side

![Flow of Vectors](../../../../../../src/images/11_ai/01_agen_ai/agi-17f.png)

1. **Word Embedding**

- Each word in the input is converted into a vector of size 512 (a fixed-length list of numbers) using an embedding algorithm.
- These vectors are the starting point, fed into the first encoder layer.

2. **Passing Through Encoder Stack**

- Transformers stack multiple encoder layers (usually 6).
- In each layer, the word vectors go through:
  - A self-attention module — where each word compares itself with other words.
  - A feed-forward module — which processes each word separately.

3. **Parallel Paths per Word**

- Each word flows through its own path in the encoder.
- The **self-attention layer connects these paths**, allowing the model to understand how words relate.
- The **feed-forward layer works independently** on each word, enabling fast parallel processing.

4. **Layer Output Feeding Forward**

- The output from one encoder becomes the input to the next — all still in vector form with size 512.
- By the end of the stack, each word vector has evolved into a rich representation of its meaning and context.

🧠 **In short:**

<v>A Transformer turns words into vectors, then lets them "talk to each other" through self-attention while refining them through layers — all in parallel, making it fast and smart</v>.

An encoder receives a list of vectors as input. It processes this list by passing these vectors into a ‘self-attention’ layer, then into a feed-forward neural network, then sends out the output upwards to the next encoder.

![The word at each position passes through a self-attention process. Then, they each pass through a feed-forward neural network -- the exact same network with each vector flowing through it separately.](../../../../../../src/images/11_ai/01_agen_ai/agi-17g.png)

### Understand [Attention](../02_attention_mechanism/)

### Decoder side

> The `encoder` **understands the inpu**t, and the `decoder` **uses that understanding to produce the right output — one word at a time**.

❓ **How Encoder and Decoder Interact**

🧠 **Encoder Side**

- Takes the full input sentence (like in translation: from English).
- Processes it through multiple layers to create rich, meaningful output vectors (called <o>Key **K**</o> and <bl>Value **V**</bl>).

🧠 **Decoder Side**:

- Starts generating the output sentence (like in translation: to French).
- Uses encoder-decoder attention to look back at the encoder’s output.
- Based on the current word it's generating, it uses <v>Query **Q**</v> to find relevant info from <o>K</o><sub>encdec</sub> and <bl>V</bl><sub>encdec</sub> — and `attends` to the right parts of the input.

![After finishing the encoding phase, we begin the decoding phase. Each step in the decoding phase outputs an element from the output sequence (the English translation sentence in this case).](../../../../../../src/images/11_ai/01_agen_ai/agi-18g.gif)

> The decoder builds the sentence word by word, feeding its own output back in, and uses position info to keep track of structure — until it decides the job is done

❓**How the Transformer Decoder Finishes Its Job**

- The decoder **generates one word at a time**.
- After each word is generated, it's **sent back as input** for the next step.
- This loop continues until it sees a **special token** (like &lt;`end`&gt;), telling it the sentence is complete.
- Each decoder layer **processes the output upward**, just like encoder layers do for input.
- The decoder input (previous outputs) is also **embedded and given positional encoding**, so the model knows the order of words.

![After finishing the encoding phase, we begin the decoding phase. Each step in the decoding phase outputs an element from the output sequence (the English translation sentence in this case).](../../../../../../src/images/11_ai/01_agen_ai/agi-18h.gif)

> The decoder pays attention to past words only and uses encoder-decoder attention to pull in relevant info from the original input.

🧠 **Decoder Self-Attention: Looks Backward Only**

- While the encoder can look at all words at once, the **decoder** only looks at words that have already been generated.
- To make sure it doesn’t "cheat" by looking ahead, it **masks future words** (sets their score to negative infinity).
- This ensures each word is predicted step-by-step, like a true auto-complete.

🧠 **Encoder-Decoder Attention: Bridging the Gap**

- This layer helps the decoder **focus on the input sentence** while generating output.
- It works like multi-head attention, but:
  - <v>Queries</v> come from the decoder’s current state
  - <o>Keys</o> and <bl>Values</bl> come from the encoder’s output

### The Final Linear and Softmax Layer

The decoder stack outputs a vector of floats. How do we turn that into a word? That’s the job of the final Linear layer which is followed by a Softmax Layer.

The Linear layer is a simple fully connected neural network that projects the vector produced by the stack of decoders, into a much, much larger vector called a logits vector.

Let’s assume that our model knows 10,000 unique English words (our model’s “output vocabulary”) that it’s learned from its training dataset. This would make the logits vector 10,000 cells wide – each cell corresponding to the score of a unique word. That is how we interpret the output of the model followed by the Linear layer.

The softmax layer then turns those scores into probabilities (all positive, all add up to 1.0). The cell with the highest probability is chosen, and the word associated with it is produced as the output for this time step.

![This figure starts from the bottom with the vector produced as the output of the decoder stack. It is then turned into an output word.](../../../../../../src/images/11_ai/01_agen_ai/agi-18i.png)

<br/>
<br/>
<br/>
<br/>

read more at [Attention is all you need - White paper](https://arxiv.org/pdf/1706.03762)

read more at [Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)