---
title: "Training the LLMs"
slug: "11_ai/01_applied_gen_ai/02_large_language_models/04_trainings"
stack: "GenAI"
date: "2025-06-03T07:26:45.889Z"
draft: false
---

> You don't build LLM instead you fine-tune or use pre-trained model in an enterprise

- We don't tend to train LLMs from scratch, because the amount of data that you need and the amount of compute you need is massive.
- It even requires knowledge on distributes systems, parallelism, memory, compliances, etc
- So you never heard a **normal person** training transformers. Instead they talk about using pre-trained models (`GPT`, `BERT`, `Llama`, etc) or fine-tuning a model

✏️: **normal person** having limited access to compute

## Where to find these Transformer Models?

- If you are interested you can fine largest collection of open-source models @ [huggingface](http://huggingface.co/)
- So you can consider hugging face as one-stop shop for [models](https://huggingface.co/models) under category as below
  ![HuggingFace - Models](../../../../../src/images/11_ai/01_agen_ai/agi-21.png)
- Not only models, but it also provide huge [datasets](https://huggingface.co/datasets)

**Example: Translation: `google-t5`**

[google-t5/t5-small](https://huggingface.co/google-t5/t5-small)

When you visit above link, you can view related information like:

1. Model Details
2. Uses
3. Bias, Risks, and Limitations
4. Training Details
5. Evaluation
6. Environmental Impact
7. Citation
8. Model Card Authors
9. How To Get Started With the Model

✏️: For each open-source model, you can access respective code and generate the model by your self

## Inference provider on HF

If you want to try out any model and see its performance, you don't have to set it up in collab, instead you can do that from HF inferace provider section on model detail page.

![HuggingFace - Models- Inference Providers](../../../../../src/images/11_ai/01_agen_ai/agi-21c.png)

✏️ Not all model with have inference providers, but if its there you can try them without any setup

## Using LLMs

- LLMs are just language generators, the better you know how to use them the better you will be relevant in the industry and we will see why its important

Open HF playground using [openai/gpt-oss-120b](https://huggingface.co/playground?modelId=openai/gpt-oss-120b&provider=cerebras)

```py:title=input_11_output_88
Hii
```

<op>

Hey there! 👋 How can I help you today?

</op>

📌 Notice input only has 1 word (1 token), but # input token to LLM are 11, this is because, while calling LLM we augment some default params as input like `temperature`, `topP`, `topK`, `system prompts` etc to configure the LLMs

```py:title=input_119_output_388
I am a seven year old kid. How are you ?
```

<op>

Hi there! I'm doing great—thanks for asking. 😊 How about you? What fun thing are you up to today?

</op>

📌 Notice the # of input and output token increased. this is because LLMs do not have memory, they are just language model working on principle of generating next best word based in prev input.

Now, let conversate 1 more time

```py:title=input_286_output_769
Explain me Artificial Intelligence
```

<op>

### What Is Artificial Intelligence?

**Think of a robot that can think a little bit like a person.**

| Word             | What It Means (for you)                                    |
| ---------------- | ---------------------------------------------------------- |
| **Artificial**   | Made by people (not born in nature).                       |
| **Intelligence** | Being able to learn, solve problems, or understand things. |

So **Artificial Intelligence (AI)** is a special kind of computer “brain” that people create to help it **learn** and **make decisions**, just like you learn new things at school or when you play.

---

#### 📚 How AI Learns

1. **Seeing Lots of Pictures** – Imagine you look at 100 pictures of cats. After a while you can say, “That’s a cat!” AI looks at many pictures, too, and learns to recognize cats, dogs, or even your favorite cartoon characters.
2. **Listening to Words** – When you talk to a voice assistant (like Siri or Alexa), it hears many words and learns which words mean what, so it can answer you.
3. **Playing Games** – Some AI programs play video games. They try different moves, see what works, and get better—just like you get better at a game the more you play it.

---

#### 🎮 Where You Might Meet AI

| Where you see it                            | What it does                                                                 |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| **Voice assistants** (Siri, Alexa)          | Understands your voice and answers questions.                                |
| **Video games**                             | Controls the “computer” characters that try to beat you or help you.         |
| **YouTube or TikTok**                       | Shows you videos it thinks you’ll like, based on what you’ve watched before. |
| **Smart toys** (like a robot that can talk) | Talks back, learns your favorite songs or stories.                           |

---

#### 🧩 A Simple Example

_Imagine you have a magic box that can sort Legos by color._

1. **You show the box a red LEGO, a blue LEGO, a green LEGO…**
2. **The box remembers each color.**
3. **Next time you drop a bunch of Legos in, the box quickly puts all the reds together, all the blues together, etc.**

That magic box is doing a tiny piece of what AI does: it looks at something, learns a rule (color), and then uses that rule to help you.

---

#### 🤖 Why AI Is Cool (and Helpful)

- **Helps doctors** find out if someone is sick faster.
- **Makes cars smarter** so they can drive safely.
- **Finds fun movies** you might enjoy.
- **Answers questions** when you’re curious about dinosaurs, space, or anything else.

---

#### 🌟 A Little Reminder

AI is made by people, so it’s not perfect. It can make mistakes, just like we do. That’s why grown‑ups always check what AI says and help it get better.

---

### Quick Recap (in 3 sentences)

- AI is a computer brain that learns from lots of examples, like pictures or words.
- It helps us do things like talk to voice assistants, play smarter games, and find videos we like.
- Even though it’s super helpful, we still need people to guide it and fix it when it gets something wrong.

Hope that makes AI feel a bit like a friendly, learning robot! 🚀 If you have any more questions, just ask.

</op>

📌 Notice the explaination is not using complex vacabulary, since it explain AI to seven year old kid because it is making use of **history** + **system prompt**

Below is the curl looks like

```js
async function query(data) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

query({
  messages: [
    {
      role: "user",
      content: "Hii",
    },
    {
      role: "assistant",
      content: "Hey there! 👋 How can I help you today?",
    },
    {
      role: "user",
      content: "I am a seven year old kid. How are you ?",
    },
    {
      role: "assistant",
      content:
        "Hi there! I'm doing great—thanks for asking. 😊 How about you? What fun thing are you up to today?",
    },
    {
      role: "user",
      content: "Explain me Artificial Intelligence",
    },
    {
      role: "assistant",
      content:
        "### What Is Artificial Intelligence?  \n\n**Think of a robot that can think a little bit like a person.**  \n\n| Word | What It Means (for you) |\n|------|--------------------------|\n| **Artificial** | Made by people (not born in nature). |\n| **Intelligence** | Being able to learn, solve problems, or understand things. |\n\nSo **Artificial Intelligence (AI)** is a special kind of computer “brain” that people create to help it **learn** and **make decisions**, just like you learn new things at school or when you play.\n\n---\n\n#### 📚 How AI Learns  \n1. **Seeing Lots of Pictures** – Imagine you look at 100 pictures of cats. After a while you can say, “That’s a cat!” AI looks at many pictures, too, and learns to recognize cats, dogs, or even your favorite cartoon characters.  \n2. **Listening to Words** – When you talk to a voice assistant (like Siri or Alexa), it hears many words and learns which words mean what, so it can answer you.  \n3. **Playing Games** – Some AI programs play video games. They try different moves, see what works, and get better—just like you get better at a game the more you play it.\n\n---\n\n#### 🎮 Where You Might Meet AI  \n\n| Where you see it | What it does |\n|------------------|--------------|\n| **Voice assistants** (Siri, Alexa) | Understands your voice and answers questions. |\n| **Video games** | Controls the “computer” characters that try to beat you or help you. |\n| **YouTube or TikTok** | Shows you videos it thinks you’ll like, based on what you’ve watched before. |\n| **Smart toys** (like a robot that can talk) | Talks back, learns your favorite songs or stories. |\n\n---\n\n#### 🧩 A Simple Example  \n\n*Imagine you have a magic box that can sort Legos by color.*  \n\n1. **You show the box a red LEGO, a blue LEGO, a green LEGO…**  \n2. **The box remembers each color.**  \n3. **Next time you drop a bunch of Legos in, the box quickly puts all the reds together, all the blues together, etc.**  \n\nThat magic box is doing a tiny piece of what AI does: it looks at something, learns a rule (color), and then uses that rule to help you.\n\n---\n\n#### 🤖 Why AI Is Cool (and Helpful)\n\n- **Helps doctors** find out if someone is sick faster.  \n- **Makes cars smarter** so they can drive safely.  \n- **Finds fun movies** you might enjoy.  \n- **Answers questions** when you’re curious about dinosaurs, space, or anything else.\n\n---\n\n#### 🌟 A Little Reminder  \n\nAI is made by people, so it’s not perfect. It can make mistakes, just like we do. That’s why grown‑ups always check what AI says and help it get better.\n\n---\n\n### Quick Recap (in 3 sentences)\n\n- AI is a computer brain that learns from lots of examples, like pictures or words.  \n- It helps us do things like talk to voice assistants, play smarter games, and find videos we like.  \n- Even though it’s super helpful, we still need people to guide it and fix it when it gets something wrong.\n\nHope that makes AI feel a bit like a friendly, learning robot! 🚀 If you have any more questions, just ask.",
    },
  ],
  temperature: 0.9,
  top_p: 1,
  model: "openai/gpt-oss-120b:cerebras",
}).then((response) => {
  console.log(JSON.stringify(response));
});
```

📌 Notice the increase in number of input and output tokens. Every time you conversate on chat, it using memory and to get history+system prompt and passing it to LLMs

- Seeing above evidence, you are are going to do the required engineering
  - for chatbot you engineer information retrieval system.
  - for information extraction, you will do different engineering, etc

### Randomness and diversity prompts

The nature of generation would not be monotonous, it going to generate creatively, excitingly, grammatically different sentences.

The question is do you always want elements to be creative?
for eg. you are building a dialogue system for lawyers which is under some compliance. can you be creative there? or you have to be very consistent in your answers.

That's where you need to control the randomness and diversity of LLMs by adjusting below params

1. Temperature `K`
   - **Higher Values** (0.9) - More creativity / randomness in response
   - **Lower Values** (0.1) - Less creativity / mmore consistent response
2. Nucleaus Sampling `topP`
   - **Higher Values** (0.9) - More diverse word choice
   - **Lower Values** (0.1) - Less diverse, more focussed word choice
3. Word Limit `topK`

   - **Higher Values** (0.9) - More variation in response
   - **Lower Values** (0.1) - Less variation / more predictable response

4. Length - to limit the maximum # of output tokens
5. StopSequence - to stop the generation when stop sequence criteria is matched like (,) or (.)

### System Prompts

> A system prompt is a set of instructions given to an AI model at initialization.

It defines:

- The AI’s role (e.g., tutor, assistant, moderator)
- Its tone (e.g., friendly, professional, concise)
- Any constraints (e.g., avoid political opinions, don’t generate code)
- Ethical or safety guidelines (e.g., don’t share personal data)

📌 Think of it as the backstage script that tells the AI how to behave before the curtain rises.

E.g. using HF playground using [meta-llama/Llama-3.1-8B-Instruct](https://huggingface.co/playground?modelId=meta-llama/Llama-3.1-8B-Instruct&provider=cerebras)

**Without System Prompt**

```py
Hi
```

<op>

It's nice to meet you. Is there something I can help you with or would you like to chat?

</op>

**With System Prompt**

`Reply as E-Connect shop customer care`

```py
Hi
```

<op>

Hello! Welcome to E-Connect, your premier destination for electronic solutions. How can I assist you today?

</op>

System prompt ensures the AI:

- Stays within its domain
- Avoids risky or unverifiable claims
- Maintains a consistent tone across interactions

❓**How it differs from a User Prompt**

- System Prompt: `Sets the AI’s behavior globally`
  Example: “You are a helpful assistant that speaks in a formal tone.”
- User Prompt: `A specific instruction or question from the user`
  Example: “Summarize the audit findings from Q2.

### GuardRails

`GuardRails` are **configurable safety mechanisms** that **enforce responsible behavior** in AI systems. They act as a protective layer over model inputs and outputs.

📌: In a financial chatbot, GuardRails can prevent the model from offering investment advice or making speculative claims, ensuring compliance with regulatory standards.

#### Content filtering

Content filtering detects and blocks harmful or inappropriate content in prompts or responses. Filters can be tuned for categories like hate speech, violence, sexual content, or misconduct.

📌: A customer support bot automatically filters out abusive language from users and prevents the model from generating toxic replies.

#### Denied topics

This feature allows developers to define specific topics that should be blocked entirely from conversation.

📌: In a healthcare assistant, topics like “self-harm methods” or “unverified medical treatments” can be denied to prevent unsafe interactions.

#### Word filters

Word filters block specific words or phrases—either exact matches or via pattern recognition.

📌: An enterprise knowledge assistant might filter out competitor names or profanity to maintain brand integrity and professionalism.

#### Senitive information filters

These filters detect and mask or block personally identifiable information (PII) or other sensitive data using pattern matching or probabilistic detection.

📌: A call center summarization tool redacts names, phone numbers, and addresses from transcripts before storing or sharing them.

#### Contextual Grounding check

This ensures that model responses are factually grounded in a trusted source and relevant to the user query—helping reduce hallucinations.

📌: In an internal audit assistant, if the model claims a policy exists, the grounding check verifies whether that policy is actually present in the enterprise documentation before surfacing it.
