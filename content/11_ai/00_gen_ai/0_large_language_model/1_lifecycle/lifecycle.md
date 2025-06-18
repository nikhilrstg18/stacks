---
title: "Lifecycle"
slug: "11_ai/0_gen_ai/0_large_language_model/1_lifecycle"
stack: "GenAI"
---

## GenAI Lifecycle

- Explore the lifecycle of Generative AI, with a spotlight on the three pivotal steps: `training`, `customizing`, and `inferencing`.
- Learn how each stage plays a crucial role in the development and deployment of Generative AI models.

can be broadly diveded into 3 steps

1. Training
2. Customizing
3. Inferencing

### Training

![How to train an AI Model](../../../../../src/images/ai/gen_ai/gi-7.png)

- In this phase, we define neural network architecture and randomized all of its statiscal weights
- Then we feed large amount of data to tune the model and prepare it to provide the output
- Training require largest amount of resources

❓`What is training`

- This process require large, clean, organized data set
- Fed into pre-defined row neural network
- Training is resource-intesive which requires 1000s of `GPU`s

✏️: Trend in market is use Pre-trained LLMs for immediate inferencing

> Companies specializes in creating and selling trained AI models providing pre-trained LLMs for commercial or research purposes

#### Essential Concepts

- **Parameters** - knowledge elements in AI, capable of adaptation as the system learns by weights
- **Weights** - determine knowledge importance, adaptation is influenced by weights which are statiscal method to determine the significance of this knowledge.
- **Training** - teaching AI with data, active training involves feeding data into the system, adjusting these weights to modify the preset parameters
- _Learning_ - refines AI's knowledge, system's method to enhacing its output thorugh fine-tuning
- _Fine-Tuning_ - enhancing AI output, using feedback or additional data

All these elements collectively forms the neural network of AI system

- AI training involves both **supervised** and **unsupervised** learning.

#### Unsupervised Learning

- Most `LLM`s training with unsupervised way
- This involves training `LLM`s with unlabeled data
- The AI system, determines the most effective weights in its neural network

#### Supervised Learning

- This involves training `LLM`s with labeled data
- Each data piece is paired with the right answer
- Trained over many iterations

> Additionally model like BERT and GPT uses self-supervised learning, where results are fed back into the model during the base training phase, which allowes continuous `improvement` and `refinement` to model's performance

- `Neural Network`s are the core concept of modern AI systems
- eg `GPT` based `LLM`s
- These method used a method called `Deep learning` with `multi-layered` networks, similar to how Human brain work with inter-connected neurons

![[playground.tensorflow.org - concept of neural netwrok](https://playground.tensorflow.org/)](../../../../../src/images/ai/gen_ai/gi-10.png)

- In above graphic, you can see how data feaures ( X<sub>1</sub> and X<sub>2</sub>), passing through multiple hidden layer where each neuron is connected by weights
- These weights adjust as the network learns, refining the output.
- The final output is shown as the scatter plot, illustrating how the network distinguishes between different data points
- This visual representation helps to understand complex process of how neural network learns and make the predications

In Neural network

- First establish the strcuture including the number and connection of layers.
- Then the model begins learning
- Each node in the network receives a value from the training data
- And adjusts this value as it learns
- Improving the model's predications over time

e.g.
![Deep Neural Network](../../../../../src/images/ai/gen_ai/gi-11.png)

- The top node represents **cloudy** and lower left node represents **hot**
- The statistical weights between these nodes and the **rain** node represents the change of rain
- for e.g. if its cloudy there is 60% chance of rain, if its hot there is 20% chance

**Deep Neural Network**

- DNN uses the hidden layer between the input and output nodes to
- Refine the statistical weights, driving
- The power of modern LLMs
- More complex network can handle more complex problems
- To produce increasingly accurate results

### Customizing

![Tune and customize the AI Model](../../../../../src/images/ai/gen_ai/gi-5.png)

- In this phase, the model needs to be customized for specific task, if we train an AI chatbot to be generalist, we need large volume of data from wide variety of subjects
- During customizing, we feed data to model as **QnA content**, where there is **user input** and **expected system output**
- This makes the model _more usable_, where its going to interact with a Human.

**Type of Customization**

#### Reinforcement Learning

- **R**einforcement **L**earning thruough **H**uman **F**eedback aka `RLHF`.
- `RLHF` used to adjust chatbots after deployment by **rewarding good outputs** **discouraging bad ones** as feeback

✏️: Inconsistency of feedback can either lead to improvement of degradation over time

#### Adversarial Learning

- It Involves introducing malicious inputs to the model to increase its resistence to adversarial text when deployed

eg. Prompt injections, a loophole that bypassed safety measures and potentially led to malicious outputs

#### Transfer Learning

- Base `LLM` is trained on a different task using its existing weights instead of random ones
- Pretrainined `LLM`s can either be purchased or obtained from open repositories
- eg. [Hugging face](https://huggingface.co/) - specializes in advancing & democratizing `AI` and `ML`

further classified as below

##### Fine-Tuning aka `FT`

- Where a pre-trained `LLM` is further trained on a new task or domain using specific data
- e.g. `Base Training` is like sending `LLM` to **Grade School**, `FT` is like sending it to **College** for specific major.

##### Instruction Fine-Tuning aka `IFT`

- Where is guides a `LLM`'s learning process which specific instructions
- `IFT` helps the model to perform it's take more **accurately** & **effciently** leading to **improved performance**
- With more reliable outputs `IFT` better grasps the nuances of different tasks and respond appropriately

##### P-Tuning aka `PT`

- `PT` is bit _more complex_.
- `PT` _adjusts prompts to shape the models output_ without changing its u nderlying weights
- `PT` integrates elements like vector database(s) _to provide up-to-date output_ based on new information of breaking news
- `PT` is popular for optimizing `LLM`'s performance for specific task w/o the need of full `FT`

##### Feature-Based Tuning aka `FBT`

- `FBT` involves keeping only the design features of a pre-trained `LLM` and discarding the rest
- `FBT` is like chopping the model into half and _keeping the relevant and good part_
- e.g. healthcare, finance data disregarding everthing you need i.e. weather data

![Fine Tuning](../../../../../src/images/ai/gen_ai/gi-8.png)

As of 2023, is a prevelant method of deploying a pre-trained `LLM` to perform specific tasks. It Involves further training to train model on additional data

![Real life - Fine Tuning](../../../../../src/images/ai/gen_ai/gi-9.png)

A real work e.g. explain its process effectively an org successfully fine-tuned a pre-trained BERT model over record of 28M+ patients for healthcare specific tasks
This approach can significantly enahnce the domain specific capabilities w/o the need to train the model from scratch

✏️: Training a model of this size, traditionally would require vast amount of resource

**Key points to consider pre-trained models**

- Pre-trained `LLM`s (proprietary or opensource) can save time and resources as they've learned useful features from existing datasets
- Pre-trained `LLM`s offer a _foundation for further_ Fine-Tuning & Customization
- However pre-trained `LLM`s may not be suitable for all tasks or domains _since data used to train these models are unknown_, raising converns about copyrights and potential issues like Hate speeach

### Inferencing

![Model uses its learned knowledge](../../../../../src/images/ai/gen_ai/gi-6.png)

- In this phase, model use its learned knowledge to generate responses or make predications based on input it receives
- This could be as simple as putting text into a PROMPT based AI system.
- Once the model is in Production and inferencing is happening, we can _re-tune_ the model's performance by adjusting it with new data or feedback from users

✏️: We can use the same training data to re-tune the model, this way we don't have to start training process all over again.

> This way model can be _build_ on what the model has _already learned_

#### Phases where it transition to Production

- `LLM` inferencing is _crucial_ for deploying LLMs effectively
- `LLM` inferencing uses LLMs to use in various environment for e.g.
  - Production
  - Research
  - Testing

![LLM Inferencing](../../../../../src/images/ai/gen_ai/gi-12.png)

- During inferencing, the model takes in some input like sentences or a question
- And generates an output based what it has learned in its training & customization
- for e.g. if you ask an LLM a question
  - The model will generate (or infer) an answer based on the patterns andknowledge it has learned

✏️: While the LLMs can generate responses, it doesn't under the content the way humans do, It simply predicates/generate what comes next based on its learning during training & customization

#### Type of Models

- Encoder Models
  - Takes output and determine the input
- Decoder Models
  - Takes inptiu and detetmine appropriate output
- Models that are both

for e.g. GPT models are decoders, which is why they can generate large amount of texts based on a simple Human language prompt
