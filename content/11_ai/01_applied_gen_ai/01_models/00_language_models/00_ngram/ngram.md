---
title: "N-gram - Language Model"
slug: "11_ai/01_applied_gen_ai/01_models/00_language_models/00_ngram"
stack: "GenAI"
date: "2025-06-03T07:26:45.889Z"
draft: false
---

> Given the sequence of words, what is the probability of next word?

## Facts

- `N-gram` is a contiguous sequence of `N` items (words or characters) from text/speech.
- The items can be letters, words or base pairs according to the application.
- They are fundamental concept used in various NLP tasks such as language modeling, text classification, machine translation and more.
- The value of `N` determines the order of the `N-gram`. 

### Types

Let's say we have the sentence: **The cat sat on the mat**.

- **Unigrams** (1-grams) are single words

  "the", "cat", "sat", "on", "mat"

- **Bigrams** (2-grams) are pairs of consecutive words

  "the cat", "cat sat", "sat on", "on the", "the mat"

- **Trigrams** (3-grams) are triplets of consecutive words

  "the cat sat", "cat sat on", "sat on the", "on the mat"

- **N**-**gram** (n-grams) are combination of N consecutive words

  `N-gram`s can be of various types based on the value of 'n':

  - Given Sequence of words

  `W` = w<sub>1</sub>, w<sub>2</sub>, w<sub>3</sub>, ... ,w<sub>n</sub>

  - Probability of next word

    P( w<sub>1</sub>, w<sub>2</sub>, w<sub>3</sub>, ... ,w<sub>n</sub> ) = Sum of P( w<sub>i</sub> | w<sub>i</sub>, w<sub>2</sub>, ... ,w<sub>i-1</sub>) where i = 1 to n

    i.e. = P( w<sub>i</sub>) \* P( w<sub>2</sub> | w<sub>1</sub> ) \* P( w<sub>3</sub> | w<sub>2</sub>, w<sub>1</sub> ) \* P( w<sub>i</sub> | w<sub>1</sub>,... , w<sub>i-1</sub> )

  To Prove above example as per this interpretation

  1. P( The ) \* P ( sun | the ) \* P ( rises | the sun ) \* .... \* P ( east | the sun rises in the)
  2. P( The ) \* P ( sun | the ) \* P ( rises | the sun ) \* .... \* P ( west | the sun rises in the)

  For comparision of **#1** and **#2**, we can take ratio and result will be

  `P( east | the sun rises in the) / P( east | the sun rises in the)`

  Now, if you take your corpus as entire web or a book or some context, the **#1** has higher probability then **#2**

  eg. "I am happy...."

  "I am" : `100`

  "am happy" : `40`

  "am sad" : `10`

  P( "happy" | "am" ) = `40 / ( 40 + 10 ) = 0.8`

### Limitations

1. **Long Range Dependencies** it will not remember beyond 2 words
2. **Storage** requires to store this bigrams and their results for given sequence of words
