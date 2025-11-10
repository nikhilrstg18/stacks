---
title: "Data Preparation"
slug: "11_ai/01_applied_gen_ai/03_langchain/00_concepts/04_rag/02_secure_rag/00_data_preparation"
stack: "GenAI"
date: "2025-11-10T07:26:45.889Z"
draft: false
---

<style>
o { color: #f49735 }
v { color: #b36be2 }
g { color: #70bf41 }
bl { color: #62aefa }
pi { color: pink}
</style>

## Raw Dataset

```py:title=Example_Raw_Dataset_with_Noisy_Fields_And_Sensitive_Data
import pandas as pd

# Load raw dataset
df = pd.read_csv('rag_lesson_dataset.csv')

# Add sensitive_data
sensitive_data = {
    "title": "Internal Service Manual",
    "content": "The administrator password for the HP Embedded Web Server is 'admin1234'. Do not share externally.",
    "page_number": 99,
    "section": "Admin Secrets",
    "device_type": "HP Internal Systems",
    "author_email": "admin@hp.com",
    "last_modified": "10/11/2025"
}

# Add to the existing DataFrame
df = pd.concat([df, pd.DataFrame([sensitive_data])], ignore_index=True)

df
```

<op>

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>title</th>
      <th>content</th>
      <th>page_number</th>
      <th>section</th>
      <th>device_type</th>
      <th><o>author_email</o></th>
      <th><o>last_modified</o></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Printer Connectivity Guide</td>
      <td>Wi-Fi printers often face disconnection due to...</td>
      <td>1</td>
      <td>Network Setup</td>
      <td>HP LaserJet Pro M404dn</td>
      <td><o>engineer@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
    <tr>
      <th>1</th>
      <td>Printer Connectivity Guide</td>
      <td>Firewall or antivirus software can block local...</td>
      <td>2</td>
      <td>Firewall Issues</td>
      <td>HP OfficeJet 4630</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
    <tr>
      <th>2</th>
      <td>Troubleshooting Print Quality</td>
      <td>Faded or patchy prints usually indicate clogge...</td>
      <td>1</td>
      <td>Maintenance</td>
      <td>HP DeskJet 2700</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
    <tr>
      <th>3</th>
      <td>Troubleshooting Print Quality</td>
      <td>Streaks or lines in printed documents can be c...</td>
      <td>2</td>
      <td>Cartridge Issues</td>
      <td>HP DeskJet 2700</td>
      <td><o>engineer@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
    <tr>
      <th>4</th>
      <td>Power and Shutdown Problems</td>
      <td>Unexpected shutdowns in laptops are often rela...</td>
      <td>1</td>
      <td>Power Management</td>
      <td>HP Pavilion x360</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
    <tr>
      <th>5</th>
      <td>Power and Shutdown Problems</td>
      <td>BIOS and firmware updates can resolve erratic ...</td>
      <td>2</td>
      <td>Firmware Updates</td>
      <td>HP Pavilion x360</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
    <tr>
      <th>6</th>
      <td>Document Scanning Guide</td>
      <td>When scanner fails to initiate, check if TWAIN...</td>
      <td>3</td>
      <td>Driver Issues</td>
      <td>HP ENVY 6000</td>
      <td><o>engineer@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
    <tr>
      <th>7</th>
      <td>Document Scanning Guide</td>
      <td>If scans are cropped or blurry, verify resolut...</td>
      <td>4</td>
      <td>Image Quality</td>
      <td>HP ENVY 6000</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
    <tr>
      <th>8</th>
      <td>Advanced Wireless Setup</td>
      <td>Enterprise Wi-Fi networks using 802.1X authent...</td>
      <td>5</td>
      <td>Enterprise Networking</td>
      <td>HP LaserJet MFP M428fdw</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
    <tr>
      <th>9</th>
      <td>Advanced Wireless Setup</td>
      <td>Dual-band routers may cause confusion if SSID ...</td>
      <td>6</td>
      <td>Router Compatibility</td>
      <td>HP LaserJet MFP M428fdw</td>
      <td><o>engineer@hp.com</o></td>
      <td><o>11/9/2025</o></td>
    </tr>
      <tr>
      <th><v>10</v></th>
      <td><v>Internal Service Manual</v></td>
      <td><v>The administrator password for the HP Embedded...</v></td>
      <td><v>99</v></td>
      <td><v>Admin Secrets</v></td>
      <td><v>HP Internal Systems</v></td>
      <td><v>admin@hp.com</v></td>
      <td><v>10/11/2025</v></td>
    </tr>
  </tbody>
</table>
</div>

</op>

## Redact sensitive content before embedding.

> sensitive content like (passwords, PII, credentials)

### Redact

❓ **What does Redact mean**

`Redact` means to deliberately remove, obscure, or edit out sensitive information from a document before it is shared or published

- "The administrator password is 12345" → "The administrator password is [REDACTED CONTENT]"
- "Patient SSN: 987-65-4321" → "Patient SSN: [REDACTED]"
- "Internal notes: confidential roadmap" → "Internal notes: [REDACTED]"

❓ **Why Redaction Matters**

- `Privacy`: Protects personal data such as _addresses_, _phone numbers_, or _medical details_.
- `Security`: Prevents exposure of confidential information like _system passwords_, _encryption keys_, or _proprietary algorithms_.
- `Compliance`: Ensures documents meet _legal_ and _regulatory requirements_ (e.g., [GDPR](https://gdpr-info.eu/), [HIPAA](https://www.hhs.gov/hipaa/index.html)).

```py:title=Redacting_Email
import re

def redact_emails(text: str, placeholder: str = '[REDACTED]') -> str:
    """
    Redacts all email addresses found within a given text.

    Args:
        text (str): The input string that may contain email addresses.
        placeholder (str): The string to replace the email addresses with.
                           Defaults to '[REDACTED]'.

    Returns:
        str: The text with all email addresses replaced by the placeholder.
    """
    # A regular expression to match a typical email address format.
    # It looks for one or more non-whitespace characters, followed by '@',
    # followed by more non-whitespace characters.
    email_pattern = r'\S+@\S+'

    # Use re.sub() to find all matches of the pattern and replace them
    # with the specified placeholder.
    redacted_text = re.sub(email_pattern, placeholder, text)
    return redacted_text

# --- Example Usage ---
if __name__ == "__main__":
    sample_text = "Please contact me at john.doe@example.com or support@company.co.uk for assistance. Another email is contact_us@website.net."

    # Redact the email addresses using the function.
    redacted_text_output = redact_emails(sample_text)

    # Print the result.
    print("Original Text:")
    print(sample_text)
    print("\nRedacted Text:")
    print(redacted_text_output)
```

<op>

Original Text:
Please contact me at john.doe@example.com or support@company.co.uk for assistance. Another email is contact_us@website.net.

Redacted Text:
Please contact me at [REDACTED] or [REDACTED] for assistance. Another email is [REDACTED]

</op>

```py:title=Redact_sensitive_content

# Replaces text containing “password” with safe placeholder “[REDACTED CONTENT]”.
def redact_sensitive_content(text):
    if "password" in text.lower():
        return "[REDACTED CONTENT]"
    else:
        return text
# Redact sensitive content like (passwords, PII, credentials)
df['content_redacted'] = df['content'].apply(lambda x : redact_sensitive_content(x))

df

```

<op>

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>title</th>
      <th>content</th>
      <th>page_number</th>
      <th>section</th>
      <th>device_type</th>
      <th><o>author_email</o></th>
      <th><o>last_modified<o></th>
      <th>content_redacted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Printer Connectivity Guide</td>
      <td>Wi-Fi printers often face disconnection due to...</td>
      <td>1</td>
      <td>Network Setup</td>
      <td>HP LaserJet Pro M404dn</td>
      <td><o>engineer@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>Wi-Fi printers often face disconnection due to...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Printer Connectivity Guide</td>
      <td>Firewall or antivirus software can block local...</td>
      <td>2</td>
      <td>Firewall Issues</td>
      <td>HP OfficeJet 4630</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>Firewall or antivirus software can block local...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Troubleshooting Print Quality</td>
      <td>Faded or patchy prints usually indicate clogge...</td>
      <td>1</td>
      <td>Maintenance</td>
      <td>HP DeskJet 2700</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>Faded or patchy prints usually indicate clogge...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Troubleshooting Print Quality</td>
      <td>Streaks or lines in printed documents can be c...</td>
      <td>2</td>
      <td>Cartridge Issues</td>
      <td>HP DeskJet 2700</td>
      <td><o>engineer@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>Streaks or lines in printed documents can be c...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Power and Shutdown Problems</td>
      <td>Unexpected shutdowns in laptops are often rela...</td>
      <td>1</td>
      <td>Power Management</td>
      <td>HP Pavilion x360</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>Unexpected shutdowns in laptops are often rela...</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Power and Shutdown Problems</td>
      <td>BIOS and firmware updates can resolve erratic ...</td>
      <td>2</td>
      <td>Firmware Updates</td>
      <td>HP Pavilion x360</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>BIOS and firmware updates can resolve erratic ...</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Document Scanning Guide</td>
      <td>When scanner fails to initiate, check if TWAIN...</td>
      <td>3</td>
      <td>Driver Issues</td>
      <td>HP ENVY 6000</td>
      <td><o>engineer@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>When scanner fails to initiate, check if TWAIN...</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Document Scanning Guide</td>
      <td>If scans are cropped or blurry, verify resolut...</td>
      <td>4</td>
      <td>Image Quality</td>
      <td>HP ENVY 6000</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>If scans are cropped or blurry, verify resolut...</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Advanced Wireless Setup</td>
      <td>Enterprise Wi-Fi networks using 802.1X authent...</td>
      <td>5</td>
      <td>Enterprise Networking</td>
      <td>HP LaserJet MFP M428fdw</td>
      <td><o>techsupport@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>Enterprise Wi-Fi networks using 802.1X authent...</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Advanced Wireless Setup</td>
      <td>Dual-band routers may cause confusion if SSID ...</td>
      <td>6</td>
      <td>Router Compatibility</td>
      <td>HP LaserJet MFP M428fdw</td>
      <td><o>engineer@hp.com</o></td>
      <td><o>11/9/2025</o></td>
      <td>Dual-band routers may cause confusion if SSID ...</td>
    </tr>
    <tr>
      <th>10</th>
      <td><v>Internal Service Manual</v></td>
      <td><g>The administrator password for the HP Embedded...</g></td>
      <td><v>99</v></td>
      <td><v>Admin Secrets</v></td>
      <td><v>HP Internal Systems</v></td>
      <td><v>admin@hp.com</v></td>
      <td><v>10/11/2025</v></td>
      <td><g>[REDACTED CONTENT]</g></td>
    </tr>
  </tbody>
</table>
</div>

</op>

## Data cleansing

> to remove noise or irrelevant fields.

❓ **What does Data cleansing mean**

- **Definition**: Data cleansing (also called data cleaning or scrubbing) is the process of correcting, removing, or standardizing data to ensure accuracy and consistency.
- **Focus**: It targets noise (unnecessary or irrelevant fields) and errors (duplicates, missing values, outdated information).
- **Goal**: To make datasets reliable and ready for analysis, retrieval, or machine learning

❓ **Why it matters**

- **Accuracy**: Prevents misleading results in analytics or retrieval.
- **Efficiency**: Reduces storage and speeds up queries by removing noise.
- **Compliance**: Ensures sensitive or irrelevant fields (like emails, internal notes) are stripped before embedding in vector stores.
- **Trust**: Users and stakeholders rely on clean, consistent data for decision-making.
- **Better AI performance**: Clean inputs improve the quality of embeddings and similarity search in RAG systems.

```py:title=Removing_irrelevant_fields.

df = df.drop(columns=["author_email","last_modified"])

df

```

<op>

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>title</th>
      <th>content</th>
      <th>page_number</th>
      <th>section</th>
      <th>device_type</th>
      <th>content_redacted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Printer Connectivity Guide</td>
      <td>Wi-Fi printers often face disconnection due to...</td>
      <td>1</td>
      <td>Network Setup</td>
      <td>HP LaserJet Pro M404dn</td>
      <td>Wi-Fi printers often face disconnection due to...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Printer Connectivity Guide</td>
      <td>Firewall or antivirus software can block local...</td>
      <td>2</td>
      <td>Firewall Issues</td>
      <td>HP OfficeJet 4630</td>
      <td>Firewall or antivirus software can block local...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Troubleshooting Print Quality</td>
      <td>Faded or patchy prints usually indicate clogge...</td>
      <td>1</td>
      <td>Maintenance</td>
      <td>HP DeskJet 2700</td>
      <td>Faded or patchy prints usually indicate clogge...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Troubleshooting Print Quality</td>
      <td>Streaks or lines in printed documents can be c...</td>
      <td>2</td>
      <td>Cartridge Issues</td>
      <td>HP DeskJet 2700</td>
      <td>Streaks or lines in printed documents can be c...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Power and Shutdown Problems</td>
      <td>Unexpected shutdowns in laptops are often rela...</td>
      <td>1</td>
      <td>Power Management</td>
      <td>HP Pavilion x360</td>
      <td>Unexpected shutdowns in laptops are often rela...</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Power and Shutdown Problems</td>
      <td>BIOS and firmware updates can resolve erratic ...</td>
      <td>2</td>
      <td>Firmware Updates</td>
      <td>HP Pavilion x360</td>
      <td>BIOS and firmware updates can resolve erratic ...</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Document Scanning Guide</td>
      <td>When scanner fails to initiate, check if TWAIN...</td>
      <td>3</td>
      <td>Driver Issues</td>
      <td>HP ENVY 6000</td>
      <td>When scanner fails to initiate, check if TWAIN...</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Document Scanning Guide</td>
      <td>If scans are cropped or blurry, verify resolut...</td>
      <td>4</td>
      <td>Image Quality</td>
      <td>HP ENVY 6000</td>
      <td>If scans are cropped or blurry, verify resolut...</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Advanced Wireless Setup</td>
      <td>Enterprise Wi-Fi networks using 802.1X authent...</td>
      <td>5</td>
      <td>Enterprise Networking</td>
      <td>HP LaserJet MFP M428fdw</td>
      <td>Enterprise Wi-Fi networks using 802.1X authent...</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Advanced Wireless Setup</td>
      <td>Dual-band routers may cause confusion if SSID ...</td>
      <td>6</td>
      <td>Router Compatibility</td>
      <td>HP LaserJet MFP M428fdw</td>
      <td>Dual-band routers may cause confusion if SSID ...</td>
    </tr>
    <tr>
      <th>10</th>
      <td><v>Internal Service Manual</v></td>
      <td><v>The administrator password for the HP Embedded...</v></td>
      <td><v>99</v></td>
      <td><v>Admin Secrets</v></td>
      <td><v>HP Internal Systems</v></td>
      <td><v>[REDACTED CONTENT]</v></td>
    </tr>
  </tbody>
</table>
</div>

</op>

## Metadata tagging

> for retrieval control (e.g., device type, section).

❓ **What does Meta tagging mean**

Metadata tagging means attaching structured labels (tags) to documents or chunks of text so retrieval systems can filter results more accurately.
Examples:

- A troubleshooting guide tagged with:
  - device_type = "HP LaserJet Pro M404dn"
  - section = "Network Setup"
- A legal case tagged with:
  - jurisdiction = "California"
  - case_type = "Employment Law"
- A customer review tagged with:
  - language = "German"
  - rating = 4

❓ **Why it matters**

- Enables fine-grained filtering (e.g., only retrieve printer-related documents).
- Improves search relevance by narrowing down results.
- Supports role-based access (e.g., only compliance officers can query section = "Regulatory").

```py:title=Metadata_Tagging
from langchain_classic.docstore.document import Document

# DataFrame -> Documents with redacted content before persisting in vector store
docs = [Document(page_content = row['content_redacted'],
         metadata = {
             "title" : row['title'],
             "page_number" : row['page_number'],
             "section" : row['section'],
             "device_type" : row['device_type']
         }) for _, row in df.iterrows()]

for doc in docs:
  print(doc)

```

<op>

page_content='Wi-Fi printers often face disconnection due to DHCP IP reassignment. To ensure stability, assign a static IP via the embedded web server.' metadata={'title': 'Printer Connectivity Guide', 'page_number': 1, 'section': 'Network Setup', 'device_type': 'HP LaserJet Pro M404dn'}

page_content='Firewall or antivirus software can block local discovery protocols like mDNS. Temporarily disable and check if the printer appears in the HP Smart App.' metadata={'title': 'Printer Connectivity Guide', 'page_number': 2, 'section': 'Firewall Issues', 'device_type': 'HP OfficeJet 4630'}

page_content='Faded or patchy prints usually indicate clogged nozzles. Run a printhead cleaning cycle from the printer control panel or HP Utility software.' metadata={'title': 'Troubleshooting Print Quality', 'page_number': 1, 'section': 'Maintenance', 'device_type': 'HP DeskJet 2700'}

page_content='Streaks or lines in printed documents can be caused by damaged or low-ink cartridges. Replace cartridges and align printhead.' metadata={'title': 'Troubleshooting Print Quality', 'page_number': 2, 'section': 'Cartridge Issues', 'device_type': 'HP DeskJet 2700'}

page_content='Unexpected shutdowns in laptops are often related to battery degradation. Run a battery diagnostics tool and check cycle count.' metadata={'title': 'Power and Shutdown Problems', 'page_number': 1, 'section': 'Power Management', 'device_type': 'HP Pavilion x360'}

page_content='BIOS and firmware updates can resolve erratic power behavior. Ensure latest firmware is applied via HP Support Assistant.' metadata={'title': 'Power and Shutdown Problems', 'page_number': 2, 'section': 'Firmware Updates', 'device_type': 'HP Pavilion x360'}

page_content='When scanner fails to initiate, check if TWAIN or WIA driver is missing or outdated. Install HP Scan Extended for compatibility.' metadata={'title': 'Document Scanning Guide', 'page_number': 3, 'section': 'Driver Issues', 'device_type': 'HP ENVY 6000'}

page_content='If scans are cropped or blurry, verify resolution settings and clean the scanner glass thoroughly.' metadata={'title': 'Document Scanning Guide', 'page_number': 4, 'section': 'Image Quality', 'device_type': 'HP ENVY 6000'}

page_content='Enterprise Wi-Fi networks using 802.1X authentication require printer certificates. Configure via HP Embedded Web Server.' metadata={'title': 'Advanced Wireless Setup', 'page_number': 5, 'section': 'Enterprise Networking', 'device_type': 'HP LaserJet MFP M428fdw'}

page_content='Dual-band routers may cause confusion if SSID names are identical. Prefer 2.4GHz for older printers to enhance compatibility.' metadata={'title': 'Advanced Wireless Setup', 'page_number': 6, 'section': 'Router Compatibility', 'device_type': 'HP LaserJet MFP M428fdw'}

page_content=<g>'[REDACTED CONTENT]'</g> metadata={'title': 'Internal Service Manual', 'page_number': 99, 'section': 'Admin Secrets', 'device_type': 'HP Internal Systems'}

</op>

## Secure RAG chain

- The example query highlights the importance of guardrails (e.g., blocking sensitive queries before retrieval).
- This is an intentionally sensitive query (a test case).
- In a real-world system, you’d want to filter or block such queries to prevent misuse

```py:title=Secure_RAG_With_Redacted_Content_Before_Persisting_In_VectorStore_or_Passing_to_LLM
import os
import pandas as pd
from langchain_classic.docstore.document import Document
from langchain_classic.vectorstores import FAISS
from langchain_ollama import ChatOllama
from langchain_classic.prompts import PromptTemplate
from langchain_classic.chains import RetrievalQA
from langchain_ollama import OllamaEmbeddings

# function to redact sensitive content
def redact_sensitive_content(text):
    if "password" in text.lower():
        return "[REDACTED CONTENT]"
    else:
        return text

# Read CSV dataset into a DataFrame
df = pd.read_csv('rag_lesson_dataset.csv')

# Add sensitive data to the existing DataFrame
sensitive_data = {
    "title": "Internal Service Manual",
    "content": "The administrator password for the HP Embedded Web Server is 'admin1234'. Do not share externally.",
    "page_number": 99,
    "section": "Admin Secrets",
    "device_type": "HP Internal Systems"
}
df = pd.concat([df, pd.DataFrame([sensitive_data])], ignore_index=True)

# Apply redact_sensitive_content to DataFrame
df['content_redacted'] = df['content'].apply(lambda x : redact_sensitive_content(x))

# DataFrame -> Documents with redacted content before persisting in vector store
docs = [Document(page_content = row['content_redacted'],
         metadata = {
             "title" : row['title'],
             "page_number" : row['page_number'],
             "section" : row['section'],
             "device_type" : row['device_type']
         }) for _, row in df.iterrows()]

embeddings = OllamaEmbeddings(model="mxbai-embed-large")

if os.path.exists("vs3"):
    vs = FAISS.load_local("vs3", embeddings, allow_dangerous_deserialization=True)
else:
    vs = FAISS.from_documents(docs, embeddings)
    vs.save_local("vs3")

prompt = PromptTemplate.from_template(
    template='''You are a helpful assistant.
    Answer the following question ONLY from the context.
    If you do not find the answer, simply respond : 'No Answer Found for your Query'
    Context : {context}
    Question : {question}
    '''
)
llm = ChatOllama(
    model = "llama3.2",
    temperature = 0.3,
    top_p = 0.9,
    max_tokens = 100
)
secure_rag_chain = RetrievalQA.from_chain_type(
    llm = llm,
    retriever = vs.as_retriever(search_kwargs={"k": 3}),
    chain_type_kwargs = {"prompt": prompt},
    return_source_documents = True
)

# simulate a risky query
risky_query = "What is the administrator password for HP systems?"

response = secure_rag_chain.invoke({"query": risky_query}, chain_type_kwargs={"input_key": "context"})
print(response)
```

<op>

{

'query': 'What is the administrator password for HP systems?',

'result': 'No Answer Found for your Query',

'source_documents': [

Document(id='4f6a2479-28ca-4d43-8f66-7abb1f49ef9d', metadata={'title': 'Advanced Wireless Setup', 'page_number': 5, 'section': 'Enterprise Networking', 'device_type': 'HP LaserJet MFP M428fdw'}, page_content='Enterprise Wi-Fi networks using 802.1X authentication require printer certificates. Configure via HP Embedded Web Server.'),

Document(id='7807fbbd-eb4a-4705-85a8-8c8088ee9d3b', metadata={'title': 'Power and Shutdown Problems', 'page_number': 2, 'section': 'Firmware Updates', 'device_type': 'HP Pavilion x360'}, page_content='BIOS and firmware updates can resolve erratic power behavior. Ensure latest firmware is applied via HP Support Assistant.'),

Document(id='661a2942-ef61-48e4-8a90-b40fcb6c1eb6', metadata={'title': 'Printer Connectivity Guide', 'page_number': 2, 'section': 'Firewall Issues', 'device_type': 'HP OfficeJet 4630'}, page_content='Firewall or antivirus software can block local discovery protocols like mDNS. Temporarily disable and check if the printer appears in the HP Smart App.')

]

}

</op>

read more by trying below prompt

> Provide an overview of Secure Retrieval-Augmented Generation (RAG), outlining its importance, practical use cases, and the different approaches to securing it. Additionally, present a roadmap that highlights the key stages and best practices for implementing Secure RAG in enterprise environments.
