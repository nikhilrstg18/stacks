---
title: "Residual Connection & Normalization Layer"
slug: "11_ai/01_applied_gen_ai/01_models/03_transformers/01_tensors_in_action/01_attention_mechanism/01_residual_connection_&_normalization"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

> Residual + normalization helps the Transformer stay stable, efficient, and deep — without losing information or training control.

One detail in the architecture of the encoder that we need to mention before moving on, is that each sub-layer (self-attention, FF-NN) in each encoder has a residual connection around it, and is followed by a [layer-normalization](https://arxiv.org/abs/1607.06450) step.

![Residual Connections and Layer Normalization in Encoder Design](../../../../../../../../src/images/11_ai/01_agen_ai/agi-18d.png)

If we’re to visualize the vectors and the layer-norm operation associated with self attention, it would look like this:

![Visualizing Vectors and Layer-Norm in Self-Attention Flow](../../../../../../../../src/images/11_ai/01_agen_ai/agi-18e.png)

This goes for the sub-layers of the decoder as well. If we’re to think of a Transformer of 2 stacked encoders and decoders, it would look something like this:

![Stacked Transformer With Encoder-Decoder Sub-Layers Overview](../../../../../../../../src/images/11_ai/01_agen_ai/agi-18f.png)
<br/>
<br/>
<br/>
<br/>

---

For a visual deep dive, see

- _Alammar, J (2018). **The Illustrated Transformer** [Blog post]. Retrieved from https://jalammar.github.io/illustrated-transformer/_
