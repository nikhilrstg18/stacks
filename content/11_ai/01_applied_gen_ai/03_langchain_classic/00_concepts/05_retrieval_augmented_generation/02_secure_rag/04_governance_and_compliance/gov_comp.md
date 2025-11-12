---
title: "Governance & Compliance"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/05_retrieval_augmented_generation/02_secure_rag/04_governance_and_compliance"
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

> Governance & Compliance in Secure RAG ensures accountability, regulatory alignment, and human oversight. It’s about embedding controls so that every query and response can be audited, policies are enforced, and sensitive outputs are reviewed before release.

- **Audit trails** → Record every query/response for accountability.
- **Regulatory alignment** → Redact PII and enforce GDPR/HIPAA policies.
- **Human-in-the-loop** → Require manual approval for sensitive domains.

Together, these practices embed **governance and compliance** into Secure RAG, making systems safe, auditable, and trustworthy.

## Audit Trails for Accountability

Audit trails record queries, responses, and decisions for later review.

```python
import logging
"""Import the logging module to record events into a log file."""

from datetime import datetime
"""Import datetime to capture the current timestamp for each log entry."""

logging.basicConfig(filename="audit_trail.log", level=logging.INFO)
"""Set up logging configuration:
   - Log messages will be written to 'audit_trail.log'.
   - Logging level set to INFO, so INFO and above messages are recorded."""

def log_interaction(user, query, response, status="OK"):
    """
    Log an interaction with the system into the audit trail.
    Args:
        user (str): The username initiating the query.
        query (str): The query string submitted by the user.
        response (str): The system's response to the query.
        status (str): Status of the interaction (default 'OK').
    """
    logging.info(
        f"{datetime.now()} | User: {user} | Query: {query} | Response: {response[:50]}... | Status: {status}"
    )
    """Write a log entry with timestamp, user, query, truncated response, and status."""

user = "alice"
"""Define the current user as 'alice'."""

query = "Troubleshoot printer connectivity"
"""Example query submitted by the user."""

response = "Wi-Fi printers often face disconnection issues..."
"""Example system response to the query."""

log_interaction(user, query, response)
```

<op>

audit_trail.log file will be created with below context ==

INFO:root:2025-11-11 14:20:39.065184 | User: alice | Query: Troubleshoot printer connectivity | Response: Wi-Fi printers often face disconnection issues...... | Status: OK

</op>

📌 This creates a permanent record of interactions for compliance audits.

## Regulatory Alignment (GDPR, HIPAA, Enterprise Policies)

Sensitive data must be handled according to regulations. For example, **redacting PII** before storage or retrieval:

```py:title=Handling_sensitive_data_with_redaction
import re
"""Import the 're' module to use regular expressions for pattern matching."""


def redact_pii(text: str) -> str:
    """
    Redact personally identifiable information (PII) from text using regex patterns.
    Args:
        text (str): The input string that may contain sensitive information.
    Returns:
        str: A sanitized version of the text with PII replaced by placeholders.
    """
    text = re.sub(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        "[REDACTED EMAIL]",
        text
    )
    """Replace any email address with the placeholder '[REDACTED EMAIL]'."""

    text = re.sub(
        r"\b\d{3}-\d{2}-\d{4}\b",
        "[REDACTED SSN]",
        text
    )
    """Replace any US Social Security Number (format: XXX-XX-XXXX) with '[REDACTED SSN]'."""

    return text
    """Return the sanitized text after redaction."""


raw_doc = "Patient email: john.doe@example.com, SSN: 123-45-6789"
"""This string contains an email address and a US SSN that should be redacted."""

clean_doc = redact_pii(raw_doc)
"""Call redact_pii() to sanitize the raw document."""

print(f"raw_doc: {raw_doc}")
"""Display the original document with PII."""

print(f"clean_doc: {clean_doc}")
"""Display the sanitized document with PII replaced by placeholders."""

```

<op>

raw_doc: Patient email: john.doe@example.com, SSN: 123-45-6789

clean_doc: Patient email: [REDACTED EMAIL], SSN: [REDACTED SSN]

</op>

📌 This ensures compliance with GDPR (data minimization) and HIPAA (protecting patient identifiers).

## Human-in-the-Loop Review

Critical outputs (finance, healthcare, legal) should be reviewed by a human before release.

```py:title=Demo_Human_in_the_Loop_Review
def human_review_required(domain: str) -> bool:
    """
    Determine if a query in a given domain requires human review.

    Args:
        domain (str): The domain of the query (e.g., 'finance', 'healthcare', 'legal').

    Returns:
        bool: True if the domain is sensitive and requires human review, False otherwise.
    """
    sensitive_domains = ["finance", "healthcare", "legal"]
    """List of domains where stricter policies apply and human review is required."""

    return domain.lower() in sensitive_domains
    """Return True if the domain is in the sensitive list, otherwise False."""


def process_query(user, query, domain):
    """
    Process a user query with domain-specific human review enforcement.
    Args:
        user (str): The username submitting the query.
        query (str): The query string.
        domain (str): The domain of the query.
    Returns:
        str: The model response if no human review is required.
             Otherwise, a placeholder message indicating review is pending.
    """
    response = llm.invoke({"input": query})
    """Call the language model to generate a response for the query."""

    if human_review_required(domain):
        """Check if the query domain requires human review."""
        print("⚠️ Human review required before releasing response.")
        """Notify that human review is needed before releasing the response."""

        review_queue.append((user, query, response.content))
        """Append the user, query, and response tuple to the review queue for manual review."""

        return "[PENDING HUMAN REVIEW]"
        """Return a placeholder string instead of None, so caller sees a meaningful result."""
    else:
        return response.content
        """If no human review is required, return the model response directly."""


review_queue = []
"""Initialize an empty list to store queries that require human review."""

domain = "healthcare"
"""Define the domain of the query as 'healthcare' (sensitive domain)."""

query = "Provide diagnosis for chest pain"
"""Example query that should trigger human review due to sensitive medical content."""

response = process_query("bob", query, domain)
"""Process the query for user 'bob'. Since domain is sensitive, response is stored in review_queue."""

print(response)
"""Prints '[PENDING HUMAN REVIEW]' instead of None."""

print(review_queue)
```

<op>

⚠️ Human review required before releasing response.

None

[(

'bob',

'Provide diagnosis for chest pain',

"I'm not a doctor, but I can provide some general information about possible causes of chest pain. If you're experiencing chest pain, it's essential to seek medical attention immediately.\n\nChest pain can be caused by various factors, including:\n\n1. **Cardiovascular diseases**:\n\t* Angina (chest pain due to reduced blood flow to the heart)\n\t* Heart attack (myocardial infarction)\n\t* Coronary artery disease\n\t* Cardiac arrhythmias (abnormal heart rhythms)\n2. **Respiratory problems**:\n\t* Pneumonia (inflammation of the lungs)\n\t* Pleurisy (inflammation of the lining surrounding the lungs)\n\t* Pulmonary embolism (blood clot in the lungs)\n3. **Gastrointestinal issues**:\n\t* Gastroesophageal reflux disease (GERD)\n\t* Peptic ulcers\n\t* Esophagitis (inflammation of the esophagus)\n4. **Musculoskeletal problems**:\n\t* Costochondritis (inflammation of the cartilage that connects the ribs to the breastbone)\n\t* Rib fractures\n5. **Other causes**:\n\t* Anxiety or panic attacks\n\t* Stress\n\t* Infections (e.g., pneumonia, endocarditis)\n\t* Medication side effects\n\nSymptoms that may accompany chest pain include:\n\n* Shortness of breath\n* Coughing\n* Fatigue\n* Dizziness or lightheadedness\n* Nausea and vomiting\n* Rapid or irregular heartbeat\n\nIf you're experiencing any of the following, seek medical attention immediately:\n\n* Severe chest pain or pressure that doesn't go away\n* Chest pain accompanied by shortness of breath, dizziness, or fainting\n* Chest pain with a fever over 101.5°F (38.6°C)\n* Chest pain with a history of heart disease or high blood pressure\n\nA healthcare professional will perform a physical examination, take a medical history, and may order diagnostic tests such as:\n\n* Electrocardiogram (ECG or EKG)\n* Blood tests\n\* Imaging studies (e.g., chest X-ray, CT scan, MRI)\n\nThey will also ask you questions about your symptoms, medical history, and lifestyle to determine the underlying cause of your chest pain.\n\nRemember, if you're unsure about the severity of your symptoms or have concerns about your health, it's always best to consult with a healthcare professional for proper evaluation and treatment.")]

</op>

📌 This workflow ensures sensitive outputs are not automatically exposed.
