---
title: "Secure Storage & Retrieval"
slug: "11_ai/01_applied_gen_ai/03_langchain/00_concepts/04_rag/02_secure_rag/01_secure_storage_and_retrieval"
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

Secure Storage & Retrieval in RAG means protecting your vector store and retrieval pipeline with encryption, access control, query filtering, and rate limiting. Below I’ll explain each with simple Python-style code samples.

## Encrypt Vector Stores and Embeddings

At rest and in transit, embeddings should be encrypted.  
Example: encrypting before saving to disk.

```python
from cryptography.fernet import Fernet
import pickle

# Generate encryption key (store securely, e.g., in a vault)
key = Fernet.generate_key()
cipher = Fernet(key)

# Example: encrypt FAISS index before persisting
with open("faiss_index.pkl", "rb") as f:
    raw_data = f.read()

encrypted_data = cipher.encrypt(raw_data)

with open("faiss_index.enc", "wb") as f:
    f.write(encrypted_data)

# Later, decrypt before loading
with open("faiss_index.enc", "rb") as f:
    enc_data = f.read()

decrypted_data = cipher.decrypt(enc_data)
index = pickle.loads(decrypted_data)
```

📌 This ensures embeddings are unreadable if storage is compromised.

## Role-Based Access Control (RBAC)

Restrict queries based on user roles.

```python
# Example roles
user_roles = {
    "alice": "admin",
    "bob": "support",
    "charlie": "guest"
}

def can_query(user, section):
    role = user_roles.get(user, "guest")
    if role == "admin":
        return True
    if role == "support" and section != "Confidential":
        return True
    return False

# Usage
user = "bob"
if can_query(user, section="Network Setup"):
    results = vs.similarity_search("printer issue", k=3)
else:
    print("Access denied")
```

## Query Filtering

Block risky or malicious queries before they hit the retriever.

```python
def is_safe_query(query: str) -> bool:
    risky_keywords = ["password", "secret", "credential", "admin"]
    return not any(word in query.lower() for word in risky_keywords)

query = "What is the administrator password for HP systems?"

if is_safe_query(query):
    results = vs.similarity_search(query, k=3)
else:
    print("⚠️ Query blocked: unsafe content detected")
```

## Rate Limiting

Prevent abuse by limiting how many queries a user can make.

```python
import time
from collections import defaultdict

# Track user requests
user_requests = defaultdict(list)
MAX_REQUESTS = 5
WINDOW = 60  # seconds

def allow_request(user):
    now = time.time()
    requests = user_requests[user]
    # Keep only recent requests
    user_requests[user] = [t for t in requests if now - t < WINDOW]

    if len(user_requests[user]) < MAX_REQUESTS:
        user_requests[user].append(now)
        return True
    return False

# Usage
user = "alice"
if allow_request(user):
    results = vs.similarity_search("troubleshoot wifi", k=3)
else:
    print("⏳ Rate limit exceeded. Try again later.")
```

---

## Summary

- **Encryption** → Protects embeddings at rest/in transit.
- **RBAC** → Ensures only authorized users can query certain data.
- **Query Filtering** → Blocks malicious or sensitive queries.
- **Rate Limiting** → Prevents abuse and denial-of-service style attacks.

Together, these controls form the **Secure Storage & Retrieval layer** of a Secure RAG system.
