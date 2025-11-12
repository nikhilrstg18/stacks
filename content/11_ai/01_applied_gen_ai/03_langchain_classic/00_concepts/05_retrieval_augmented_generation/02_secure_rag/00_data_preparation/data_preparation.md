---
title: "Data Preparation"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/05_retrieval_augmented_generation/02_secure_rag/00_data_preparation"
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

```py:title=With_Noisy_Fields_And_Sensitive_Data
import pandas as pd
"""Import the Pandas library for data manipulation and analysis."""

df = pd.read_csv('rag_lesson_dataset.csv')
"""Read the CSV file 'rag_lesson_dataset.csv' into a Pandas DataFrame.
   Each row represents one document entry with fields like title, content, etc."""

sensitive_data = {
    "title": "Internal Service Manual",
    """Title field: identifies the document name."""

    "content": "The administrator password for the HP Embedded Web Server is 'admin1234'. Do not share externally.",
    """Content field: contains the actual text of the document (here it includes sensitive information)."""

    "page_number": 99,
    """Page number: indicates where in the manual this content is located."""

    "section": "Admin Secrets",
    """Section field: categorizes the document into a specific area (here, admin-only)."""

    "device_type": "HP Internal Systems",
    """Device type: metadata describing which system or product this document relates to."""

    "author_email": "admin@hp.com",
    """Author email: metadata about who authored or owns the document."""

    "last_modified": "10/11/2025"
    """Last modified: timestamp showing when the document was last updated."""
}
"""Dictionary representing one sensitive document entry with text and metadata."""

df = pd.concat([df, pd.DataFrame([sensitive_data])], ignore_index=True)
"""Concatenate the existing DataFrame with a new DataFrame created from sensitive_data.
   ignore_index=True ensures the index is reset and continuous after adding the new row."""

df
"""Outputs the DataFrame so you can verify that the sensitive_data row has been added."""
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
      <td><v>The administrator password for the HP Embedded Web Server is 'admin1234'. Do not share externally.</v></td>
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

```py:title=Redact_Sensitive_Content_In_Dataset

def redact_sensitive_content(text):
    """
    Check if the input text contains the word 'password' (case-insensitive).
    If found, replace the entire text with the placeholder '[REDACTED CONTENT]'.
    Otherwise, return the original text unchanged.
    """
    if "password" in text.lower():
        return "[REDACTED CONTENT]"
    else:
        return text


df['content_redacted'] = df['content'].apply(lambda x: redact_sensitive_content(x))
"""
Apply the redact_sensitive_content function to every row in the 'content' column.
Store the sanitized results in a new column called 'content_redacted'.
This ensures sensitive information is hidden before downstream use (e.g., embeddings).
"""

df
"""
Outputs the DataFrame with the new 'content_redacted' column included,
so you can verify that sensitive content has been replaced with '[REDACTED CONTENT]'.
"""

```

📌 The function acts as a guardrail to prevent sensitive terms like **“password”** from leaking into your RAG pipeline.

📌 The new column **content_redacted** keeps the sanitized version alongside the original for auditing.

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
      <td><v>The administrator password for the HP Embedded Web Server is 'admin1234'. Do not share externally.</v></td>
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

df = df.drop(columns=["author_email", "last_modified"])
"""
Removes the 'author_email' and 'last_modified' columns from the DataFrame.
This is useful for sanitizing sensitive metadata before downstream use
(e.g., embeddings, retrieval, or sharing).
"""

df
"""
Outputs the DataFrame after dropping the specified columns,
so you can verify that sensitive fields are no longer present.
"""

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
"""Import the Document class, which wraps text content together with metadata
   for use in LangChain pipelines (e.g., retrieval, embedding)."""

docs = [
    Document(
        page_content=row['content_redacted'],   # Use sanitized text (no sensitive info)
        metadata={                              # Attach structured metadata for retrieval
            "title": row['title'],              # Document title
            "page_number": row['page_number'],  # Page number in source
            "section": row['section'],          # Section/category label
            "device_type": row['device_type']   # Device type (e.g., printer, laptop)
        }
    )
    for _, row in df.iterrows()                 # Iterate through each row in the DataFrame
]
"""Convert each DataFrame row into a Document object with redacted content and metadata.
   This ensures sensitive information is hidden before embedding or retrieval."""

for doc in docs:
    print(doc)
"""Loop through the list of Document objects and print them.
   Each printout shows the page_content (redacted text) and metadata fields,
   allowing you to verify that redaction and metadata tagging worked correctly."""

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
# --- Standard Library Imports ---
import os
"""Provides functions to interact with the operating system (e.g., check if a file exists)."""

# --- Third-Party Imports ---
import pandas as pd
"""Pandas library for data manipulation and analysis (used to handle CSVs and DataFrames)."""

# --- LangChain Classic Imports ---
from langchain_classic.docstore.document import Document
"""Document class: wraps text content together with metadata for retrieval pipelines."""

from langchain_classic.vectorstores import FAISS
"""FAISS vector store: enables efficient similarity search over embeddings."""

from langchain_classic.prompts import PromptTemplate
"""PromptTemplate: defines structured prompts for the LLM."""

from langchain_classic.chains import RetrievalQA
"""RetrievalQA chain: combines retriever + LLM to answer questions using context."""

# --- LangChain Ollama Integrations ---
from langchain_ollama import ChatOllama
"""ChatOllama: LLM interface for reasoning and response generation."""

from langchain_ollama import OllamaEmbeddings
"""OllamaEmbeddings: converts text into semantic vectors for similarity search."""

def redact_sensitive_content(text):
    """
    Detects if the input text contains the word 'password' (case-insensitive).
    If found, replaces the entire text with '[REDACTED CONTENT]'.
    Otherwise, returns the original text unchanged.
    """
    if "password" in text.lower():
        return "[REDACTED CONTENT]"
    else:
        return text

df = pd.read_csv('rag_lesson_dataset.csv')
"""Loads the raw dataset from 'rag_lesson_dataset.csv' into a Pandas DataFrame."""

sensitive_data = {
    "title": "Internal Service Manual",
    "content": "The administrator password for the HP Embedded Web Server is 'admin1234'. Do not share externally.",
    "page_number": 99,
    "section": "Admin Secrets",
    "device_type": "HP Internal Systems"
}
"""Dictionary representing one sensitive document entry with text + metadata."""

df = pd.concat([df, pd.DataFrame([sensitive_data])], ignore_index=True)
"""Concatenate the sensitive_data row into the existing DataFrame and reset index."""


df['content_redacted'] = df['content'].apply(lambda x: redact_sensitive_content(x))
"""Create a new column 'content_redacted' with sanitized text, ensuring sensitive info is hidden."""

docs = [
    Document(
        page_content=row['content_redacted'],   # Use sanitized text
        metadata={                              # Attach structured metadata
            "title": row['title'],
            "page_number": row['page_number'],
            "section": row['section'],
            "device_type": row['device_type']
        }
    )
    for _, row in df.iterrows()
]
"""Convert each DataFrame row into a Document object with redacted content + metadata."""

embeddings = OllamaEmbeddings(model="mxbai-embed-large")
"""Embeddings model: converts text into semantic vectors for similarity search."""

if os.path.exists("vs3"):
    vs = FAISS.load_local("vs3", embeddings, allow_dangerous_deserialization=True)
    """Load pre-saved FAISS index if it exists locally."""
else:
    vs = FAISS.from_documents(docs, embeddings)
    """Create FAISS index from redacted documents and embeddings."""
    vs.save_local("vs3")
    """Persist FAISS index locally for reuse."""

prompt = PromptTemplate.from_template(
    template='''
    You are a helpful assistant.
    Answer the following question ONLY from the context.
    If you do not find the answer, simply respond : 'No Answer Found for your Query'
    Context : {context}
    Question : {question}
    '''
)
"""Prompt instructs the LLM to only answer using retrieved context, or return 'No Answer Found'."""

llm = ChatOllama(
    model="llama3.2",
    temperature=0.3,
    top_p=0.9,
    max_tokens=100
)
"""ChatOllama LLM: generates responses with controlled creativity and length."""

secure_rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vs.as_retriever(search_kwargs={"k": 3}),
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=True
)
"""RetrievalQA pipeline: retrieves top-3 docs, injects into prompt, uses LLM to answer.
   Returns both the answer and source documents for transparency."""

risky_query = "What is the administrator password for HP systems?"
"""This query contains sensitive terms and should be blocked or sanitized."""

response = secure_rag_chain.invoke({"query": risky_query}, chain_type_kwargs={"input_key": "context"})
"""Invoke the RetrievalQA chain with the risky query.
   Guardrails in prompt ensure sensitive answers are blocked or replaced."""

print(response)
"""Print the final response (answer + source docs)."""
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

### Extending with Guardrail

You can further add a guardrail layer so risky queries (like those containing “password,” “secret,” or “admin”) are blocked before they ever reach the retriever or LLM.

❓ **Why it matters**

- Blocks unsafe queries before they hit `FAISS` or the `LLM`.
- Returns a clear message instead of exposing sensitive data.
- Keeps your pipeline compliant and auditable.

```py:title=Guardrail_plus_AuditTrail
import pandas as pd
from datetime import datetime

# --- Guardrail: Query Sanitization with Audit Logging ---
def sanitize_and_log_query(query: str, audit_log: str = "blocked_queries.csv") -> str:
    """
    Check the query for risky terms (e.g., 'password', 'secret', 'admin').
    If found, block the query and log it into an audit trail (CSV).
    Otherwise, return the original query unchanged.
    """
    risky_terms = ["password", "secret", "admin"]
    if any(term in query.lower() for term in risky_terms):
        # Build log entry
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "query": query,
            "status": "BLOCKED"
        }
        # Append to CSV audit log
        try:
            df_log = pd.read_csv(audit_log)
            df_log = pd.concat([df_log, pd.DataFrame([log_entry])], ignore_index=True)
        except FileNotFoundError:
            df_log = pd.DataFrame([log_entry])
        df_log.to_csv(audit_log, index=False)
        return "[BLOCKED QUERY]"
    return query

# --- Example Usage ---
risky_query = "What is the administrator password for HP systems?"

safe_query = sanitize_and_log_query(risky_query)

if safe_query == "[BLOCKED QUERY]":
    print("⚠️ Query blocked by guardrails. Logged to audit trail.")
else:
    response = secure_rag_chain.invoke({"query": safe_query}, chain_type_kwargs={"input_key": "context"})
    print(response)
```

📌 Sanitization: Blocks unsafe queries before retrieval.

📌 Audit Trail: Logs blocked queries with timestamp + original text.

📌 Compliance: CSV file (blocked_queries.csv) serves as evidence for review
