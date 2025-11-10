---
title: "Large Language Models"
slug: "11_ai/01_applied_gen_ai/02_large_language_models"
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

## Evolution

> A language model is a probabilistic machine learning entity.

- It resembles a complex function, designed to predict the probability of word sequences within a specific language corpus.

- It is represented as: `𝑃(Y|X)`, read as Probability of `Y` given `X`

**Equation**

Language models operate by assigning probabilities to sequences of words

Mathematically,

For given sequence of words,
<v>W</v> = <v>w<sub>1<sub></v>, <v>w<sub>2<sub></v>, <v>w<sub>3<sub></v>, ... ,<v>w<sub>n<sub></v>

Probability of next word

<g>P</g>( <v>w<sub>1<sub></v>, <v>w<sub>2<sub></v>, <v>w<sub>3<sub></v>, ... ,<v>w<sub>n<sub></v> ) = <g>P</g>( <v>w<sub>i<sub></v>) _ <g>P</g>( <v>w<sub>2<sub></v> | <v>w<sub>1<sub></v> ) _ <g>P</g>( <v>w<sub>3<sub></v> | <v>w<sub>2<sub></v>, <v>w<sub>1<sub></v> ) \* <g>P</g>( <v>w<sub>i<sub></v> | <v>w<sub>1<sub></v>,... , <v>w<sub>i-1<sub></v> ) where i = 1 to n

**Example**

Consider the sentence: `This is a new technology`.

The language model calculates the probability of the sentence as:
<g>𝑃</g>( "<v>This is a new technology</v>" )

Mathematically,
<g>𝑃</g>( "<v>This is a new technology</v>" ) = <g>𝑃</g>( "<v>This</v>" ) _ <g>𝑃</g>( "<v>is</v>" | "<v>This</v>" ) _ <g>𝑃</g>( "<v>a</v>"|"<v>This is</v>" ) _ <g>𝑃</g>( "<v>new</v>"|"<v>This is a</v>" ) _ <g>𝑃</g>( "<v>technology</v>"|"<v>This is a new</v>" )

**Calculation**

To illustrate, let's calculate the probability of two different sentences:

1. <g>𝑃</g>( "<v>This is a fluffy dog</v>" )
2. <g>𝑃</g>( "<v>This are a purple flying deer</v>" )

**Solution**: Sentence 1 gets a high probability, leveraging common context, and in sentence 2, rare and challenging words result in a lower probability.

**Power**

![The powers of language models extend beyond just sentence prediction.](../../../../src/images/11_ai/01_agen_ai/agi-20.png)

**Evolution**

1. Rule-based & Statistical Models (1950s-2010)
   - N-Gram Models
   - Hidden Markov Models `HMM`s
2. Neural Language Models (2010-2017)
   - Word Embeddings
   - Recurrent Neural Networks `RNN`s
3. Transformer- based Models (2017-present) - `BERT` (2018) – Bidirectional model for text understanding - `GPT-2`-1.5b (2019) – Autoregressive model for text generation - `T5`, `GPT-3`-175b (2020) – Encoder-Decoder for multi-task NLP - `GPT-3.5` (2022) - Served as Bridge between `GTP-3` and `GTP-4` - `Enables` long-range dependencies by comparing all words in
   a sentence
4. LLMs
   - e.g. LLaMA2
   - The Next-Gen Open-Source Model
   - 7B, 13B, and 65B parameter models for flexibility
   - Trained on 2 trillion tokens, outperforming GPT-3
   - Efficient Training – Uses optimized attention mechanisms

![Applications of Language Models](../../../../src/images/11_ai/01_agen_ai/agi-20a.png)

## Large Language Models

> Large Language Models `LLMs` are state-of-the-art AI models designed to comprehend and generate human language.

![Large Language Model](../../../../src/images/11_ai/01_agen_ai/agi-20b.png)
