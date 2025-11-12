---
title: "langchain_classic.text_splitters"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/04_text_splitters"
stack: "GenAI"
date: "2025-10-18T07:26:45.889Z"
draft: false
---

> LangChain text splitters are tools that break large documents into smaller, semantically meaningful chunks.

These chunks are designed to:

- Fit within the context window of LLMs
- Preserve semantic coherence
- Enable efficient retrieval and processing

## Why Split Text?

- **Context Window Limits**: LLMs like GPT have token limits. Splitting ensures each chunk fits.
- **Retrieval Augmented Generation `RAG`**: Smaller chunks improve relevance during vector search.
- **Semantic Preservation**: Intelligent splitting keeps related ideas together.
- **Performance Optimization**: Reduces latency and improves accuracy in downstream tasks.

## Common Splitter Strategies

```markdown markmap
- BaseDocumentTransformer
  - TextSplitter
    - &lt;name&gt;TextSplitter # e.g. CharacterTextSplitter, ParagraphTextSplitter
    - RecursiveCharacterTextSplitter
      - &lt;name&gt;TextSplitter.
```

| Splitter                       | Description                                                      |
| ------------------------------ | ---------------------------------------------------------------- |
| CharacterTextSplitter          | Splits text by character count                                   |
| RecursiveCharacterTextSplitter | Tries multiple granularities (eg. paragraph -> sentence -> word) |
| MarkdownTextSplitter           | Splits based on markdown structure                               |
| PythonCodeSplitter             | Splits python code into logical blocks                           |
| SemanticTextSplitter           | Uses embeddings to split by meaning                              |

## Use Cases

🔍 **RAG**

Split documents for embedding and retrieval in vector stores.

📚 **Document QA**

Enable chunk-level question answering over long PDFs or knowledge bases.

🧠 **Semantic Search**

Improve precision by indexing semantically coherent chunks.

🧪 **Code Analysis**

Split code files into functions/classes for LLM-based refactoring or explanation.

📝 **Markdown Summarization**

Split blog posts or documentation for chunk-wise summarization.

## Exercises

Let say below is given text

```py:title=sample_text

text = '''The long-standing demand to upgrade Prayagraj Airport to international status is once again gathering momentum. In a meeting of the
Airport Advisory Committee held at a hotel in Civil Lines on Wednesday, the issue was discussed in detail. Member of Parliament Praveen Singh Patel
attended the meeting as the chief guest. He stated that Prayagraj Airport had set new records during the Mahakumbh,
and the time had now come to grant it international airport status.During the meeting, committee members and officials highlighted that
thousands of people from Prayagraj, Pratapgarh, Kaushambi and nearby districts in Madhya Pradesh travel to Gulf countries for employment every month.
Currently, they must travel to Lucknow or Delhi to board international flights. Direct international flights from Prayagraj, they argued, would
provide significant relief to travelers and boost the region’s economic activity.

It was also announced that cargo services from Prayagraj Airport are set to begin soon.

Airport director Mukesh Upadhyay informed attendees that the required land for cargo operations has already been identified, and final approval
from the ministry of civil aviation is pending.
Committee members shared concerns over reduced air connectivity. Prior to the Mahakumbh, Prayagraj was connected to 13 cities by air;
that number has now dropped to seven. Members including Arunendra Singh, Anirudh Pratap Singh, Murarilal Agarwal and Ravi Mohan Mishra
urged the restoration of lost routes and reiterated the demand for international status.

Other proposals raised during the meeting included
launching a 6 am flight to Delhi with a return service in the evening, introducing new flights to Surat, Pune, Dehradun and Indore, and
establishing a graphic work and information centre at the airport to promote tourism.'''

```

📌 : default `chunk_overlap=200`

```py:title=Demo_CharacterTextSplitter

from langchain_classic.text_splitter import CharacterTextSplitter

splitter = CharacterTextSplitter(chunk_size = 100, chunk_overlap=20)

splits = splitter.split_text(text)

for split in splits:
    print(split)
    print('\n-------------------------------------\n\n')

```

<op>

The long-standing demand to upgrade Prayagraj Airport to international status is once again gathering momentum. In a meeting of the
Airport Advisory Committee held at a hotel in Civil Lines on Wednesday, the issue was discussed in detail. Member of Parliament Praveen Singh Patel
attended the meeting as the chief guest. He stated that Prayagraj Airport had set new records during the Mahakumbh,
and the time had now come to grant it international airport status.During the meeting, committee members and officials highlighted that
thousands of people from Prayagraj, Pratapgarh, Kaushambi and nearby districts in Madhya Pradesh travel to Gulf countries for employment every month.
Currently, they must travel to Lucknow or Delhi to board international flights. Direct international flights from Prayagraj, they argued, would
provide significant relief to travelers and boost the region’s economic activity.

---

It was also announced that cargo services from Prayagraj Airport are set to begin soon.

---

Airport director Mukesh Upadhyay informed attendees that the required land for cargo operations has already been identified, and final approval
from the ministry of civil aviation is pending.
Committee members shared concerns over reduced air connectivity. Prior to the Mahakumbh, Prayagraj was connected to 13 cities by air;
that number has now dropped to seven. Members including Arunendra Singh, Anirudh Pratap Singh, Murarilal Agarwal and Ravi Mohan Mishra
urged the restoration of lost routes and reiterated the demand for international status.

---

Other proposals raised during the meeting included
launching a 6 am flight to Delhi with a return service in the evening, introducing new flights to Surat, Pune, Dehradun and Indore, and
establishing a graphic work and information centre at the airport to promote tourism.

---

Created a chunk of size 913, which is longer than the specified 100

Created a chunk of size 552, which is longer than the specified 100

</op>

📌 Note the warning, The `CharacterTextSplitter` works by:

- Splitting the text using a separator (default is **"\\n\\n"**).
- Then it tries to group those pieces into chunks of size ≤ chunk_size (100 in your case).
- If any individual piece (e.g., a paragraph or sentence) is already longer than 100 characters, it cannot be split further — so it emits a warning and includes it as-is.

Let specify the separator

```py:title=Demo_CharacterTextSplitter_With_Separator
from langchain_classic.text_splitter import CharacterTextSplitter

# split by sentence
sentence_splitter = CharacterTextSplitter(separator=". ", chunk_size=100, chunk_overlap=20)

splits = sentence_splitter.split_text(text)

for split in splits:
    print(split)
    print('\n-------------------------------------\n\n')

```

<op>
The long-standing demand to upgrade Prayagraj Airport to international status is once again gathering momentum

---

In a meeting of the
Airport Advisory Committee held at a hotel in Civil Lines on Wednesday, the issue was discussed in detail

---

Member of Parliament Praveen Singh Patel
attended the meeting as the chief guest

---

He stated that Prayagraj Airport had set new records during the Mahakumbh,
and the time had now come to grant it international airport status.During the meeting, committee members and officials highlighted that
thousands of people from Prayagraj, Pratapgarh, Kaushambi and nearby districts in Madhya Pradesh travel to Gulf countries for employment every month

---

Currently, they must travel to Lucknow or Delhi to board international flights

---

Direct international flights from Prayagraj, they argued, would
provide significant relief to travelers and boost the region’s economic activity.

It was also announced that cargo services from Prayagraj Airport are set to begin soon.

Airport director Mukesh Upadhyay informed attendees that the required land for cargo operations has already been identified, and final approval
from the ministry of civil aviation is pending.
Committee members shared concerns over reduced air connectivity

---

Prior to the Mahakumbh, Prayagraj was connected to 13 cities by air;
that number has now dropped to seven

---

Members including Arunendra Singh, Anirudh Pratap Singh, Murarilal Agarwal and Ravi Mohan Mishra
urged the restoration of lost routes and reiterated the demand for international status.

Other proposals raised during the meeting included
launching a 6 am flight to Delhi with a return service in the evening, introducing new flights to Surat, Pune, Dehradun and Indore, and
establishing a graphic work and information centre at the airport to promote tourism.

---

Created a chunk of size 110, which is longer than the specified 100

Created a chunk of size 126, which is longer than the specified 100

Created a chunk of size 361, which is longer than the specified 100

Created a chunk of size 493, which is longer than the specified 100

Created a chunk of size 106, which is longer than the specified 100

</op>

📌 Note the warnings, we can use RecursiveCharacterTextSplitter` to split the text multiple times by different separators:

```py:title=Demo_RecursiveCharacterTextSplitter
from langchain_classic.text_splitter import RecursiveCharacterTextSplitter

# split by sentence
sentence_splitter = RecursiveCharacterTextSplitter(
    separators=["\n\n", ". "],
    keep_separator=False,
    chunk_size=100,
    chunk_overlap=20)

splits = sentence_splitter.split_text(text)

for split in splits:
    print(split)
    print('\n-------------------------------------\n\n')
```

<op>

The long-standing demand to upgrade Prayagraj Airport to international status is once again gathering momentum

---

In a meeting of the
Airport Advisory Committee held at a hotel in Civil Lines on Wednesday, the issue was discussed in detail

---

Member of Parliament Praveen Singh Patel
attended the meeting as the chief guest

---

He stated that Prayagraj Airport had set new records during the Mahakumbh,
and the time had now come to grant it international airport status.During the meeting, committee members and officials highlighted that
thousands of people from Prayagraj, Pratapgarh, Kaushambi and nearby districts in Madhya Pradesh travel to Gulf countries for employment every month

---

Currently, they must travel to Lucknow or Delhi to board international flights

---

Direct international flights from Prayagraj, they argued, would
provide significant relief to travelers and boost the region’s economic activity.

---

It was also announced that cargo services from Prayagraj Airport are set to begin soon.

---

Airport director Mukesh Upadhyay informed attendees that the required land for cargo operations has already been identified, and final approval
from the ministry of civil aviation is pending.
Committee members shared concerns over reduced air connectivity

---

Prior to the Mahakumbh, Prayagraj was connected to 13 cities by air;
that number has now dropped to seven

---

Members including Arunendra Singh, Anirudh Pratap Singh, Murarilal Agarwal and Ravi Mohan Mishra
urged the restoration of lost routes and reiterated the demand for international status.

---

Other proposals raised during the meeting included
launching a 6 am flight to Delhi with a return service in the evening, introducing new flights to Surat, Pune, Dehradun and Indore, and
establishing a graphic work and information centre at the airport to promote tourism.

---

</op>

<br/>
<br/>
<br/>
<br/>

--- [text_splitter](https://reference.langchain.com/python/langchain_text_splitters/#langchain_text_splitters)
