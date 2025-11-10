---
title: "Governance & Compliance"
slug: "11_ai/01_applied_gen_ai/03_langchain/00_concepts/04_rag/02_secure_rag/04_governance_and_compliance"
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

## Audit Trails for Accountability

Audit trails record queries, responses, and decisions for later review.

```python
import logging
from datetime import datetime

# Configure audit logging
logging.basicConfig(filename="audit_trail.log", level=logging.INFO)

def log_interaction(user, query, response, status="OK"):
    logging.info(f"{datetime.now()} | User: {user} | Query: {query} | Response: {response[:50]}... | Status: {status}")

# Example usage
user = "alice"
query = "Troubleshoot printer connectivity"
response = "Wi-Fi printers often face disconnection issues..."
log_interaction(user, query, response)
```

📌 This creates a permanent record of interactions for compliance audits.

## Regulatory Alignment (GDPR, HIPAA, Enterprise Policies)

Sensitive data must be handled according to regulations. For example, **redacting PII** before storage or retrieval:

```python
import re

def redact_pii(text: str) -> str:
    # Simple regex to mask email addresses
    text = re.sub(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", "[REDACTED EMAIL]", text)
    # Mask SSNs (US format)
    text = re.sub(r"\b\d{3}-\d{2}-\d{4}\b", "[REDACTED SSN]", text)
    return text

raw_doc = "Patient email: john.doe@example.com, SSN: 123-45-6789"
clean_doc = redact_pii(raw_doc)

print(clean_doc)
# Output: Patient email: [REDACTED EMAIL], SSN: [REDACTED SSN]
```

📌 This ensures compliance with GDPR (data minimization) and HIPAA (protecting patient identifiers).

## Human-in-the-Loop Review

Critical outputs (finance, healthcare, legal) should be reviewed by a human before release.

```python
def human_review_required(domain: str) -> bool:
    sensitive_domains = ["finance", "healthcare", "legal"]
    return domain.lower() in sensitive_domains

def process_query(user, query, domain):
    response = llm(query)  # hypothetical model call
    if human_review_required(domain):
        print("⚠️ Human review required before releasing response.")
        # Store response in a review queue
        review_queue.append((user, query, response))
    else:
        return response

# Example usage
review_queue = []
domain = "healthcare"
query = "Provide diagnosis for chest pain"
process_query("bob", query, domain)
```

📌 This workflow ensures sensitive outputs are not automatically exposed.

## Summary

- **Audit trails** → Record every query/response for accountability.
- **Regulatory alignment** → Redact PII and enforce GDPR/HIPAA policies.
- **Human-in-the-loop** → Require manual approval for sensitive domains.

Together, these practices embed **governance and compliance** into Secure RAG, making systems safe, auditable, and trustworthy.
