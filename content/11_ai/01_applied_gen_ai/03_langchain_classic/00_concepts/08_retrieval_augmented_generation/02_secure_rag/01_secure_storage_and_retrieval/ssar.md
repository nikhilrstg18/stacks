---
title: "Secure Storage & Retrieval"
slug: "11_ai/01_applied_gen_ai/03_langchain_classic/00_concepts/08_retrieval_augmented_generation/02_secure_rag/01_secure_storage_and_retrieval"
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

> Secure Storage & Retrieval in RAG means protecting your vector store and retrieval pipeline with encryption, access control, query filtering, and rate limiting.

- **Encryption** → Protects embeddings at rest/in transit.
- **RBAC** → Ensures only authorized users can query certain data.
- **Query Filtering** → Blocks malicious or sensitive queries.
- **Rate Limiting** → Prevents abuse and denial-of-service style attacks.

Together, these controls form the **Secure Storage & Retrieval layer** of a Secure RAG system.

## Encrypt Vector Stores and Embeddings

At rest and in transit, embeddings should be encrypted.  
Example: encrypting before saving to disk.

```py:title=Secure_Storage_AtRest_and_InTransit

## !pip install cryptography

from cryptography.fernet import Fernet
"""Import Fernet from the cryptography library.
   Provides symmetric encryption and decryption using a secret key."""

import pickle
"""Import pickle for serializing and deserializing Python objects (e.g., FAISS index)."""


key = Fernet.generate_key()
"""Create a new random encryption key.
   This key must be stored securely (e.g., in a key vault) for later decryption."""

cipher = Fernet(key)
"""Initialize a Fernet cipher object with the generated key.
   Used to encrypt and decrypt data."""


with open("./vs/index.pkl", "rb") as f:
    raw_data = f.read()
"""Open the serialized FAISS index file in binary read mode and load its raw bytes."""

print("Raw data length:", len(raw_data))
encrypted_data = cipher.encrypt(raw_data)
"""Encrypt the raw FAISS index data using the Fernet cipher."""
print("Encrypted data length:", len(encrypted_data))

with open("./vs/index.enc", "wb") as f:
    f.write(encrypted_data)
"""Write the encrypted data to a new file './vs/index.enc' for secure storage."""


with open("./vs/index.enc", "rb") as f:
    enc_data = f.read()
"""Open the encrypted FAISS index file in binary read mode and read its contents."""

decrypted_data = cipher.decrypt(enc_data)
"""Decrypt the encrypted data back into its original raw form using the same key."""

index = pickle.loads(decrypted_data)
"""Deserialize the decrypted raw data back into the FAISS index object using pickle."""

print("Decrypted data length:", len(decrypted_data))
```

<op>

Raw data length: <g>1866</g>

Encrypted data length: 2572

Decrypted data length: <g>1866</g>

</op>

📌 This ensures embeddings are unreadable if storage is compromised.

## Role-Based Access Control (RBAC)

Restrict queries based on user roles.

```py:title=Role_Based_Access_Control
from langchain_classic.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings
import os


user_roles = {
    "alice": "admin",     # Admin role: full access to all sections
    "bob": "support",     # Support role: limited access (no confidential sections)
    "charlie": "guest"    # Guest role: minimal or no access
}
"""Dictionary mapping usernames to their assigned roles."""


def can_query(user, section):
    """
    Determine if a given user can query a specific section.
    Args:
        user (str): The username making the query.
        section (str): The section of the knowledge base being queried.
    Returns:
        bool: True if the user has permission, False otherwise.
    """
    role = user_roles.get(user, "guest")  # Default to 'guest' if user not found

    if role == "admin":
        return True  # Admins can query all sections

    if role == "support" and section != "Confidential":
        return True  # Support can query all except 'Confidential'

    return False  # Guests or restricted roles are denied

embeddings = OllamaEmbeddings(model="mxbai-embed-large")

if os.path.exists("vs_hp"):
    vs = FAISS.load_local("vs_hp", embeddings, allow_dangerous_deserialization=True)
else:
    text_embedding_pairs = zip(content, doc_embeddings)
    vs = FAISS.from_embeddings(text_embedding_pairs, embeddings)
    vs.save_local("vs_hp")

user = "bob"  # Current user is 'bob' with role 'support'

print("\n== Bob with role 'support' accessing Network Setup section ==\n")
if can_query(user, section="Network Setup"):
    results = vs.similarity_search("HP printers often disconnect from Wi-Fi?", k=3)
    print(results)
    """If user has permission, perform similarity search in vector store."""
else:
    print("Access denied")
    """If user lacks permission, deny access and print message."""

print("\n== Bob with role 'support' accessing Confidential section ==\n")
if can_query(user, section="Confidential"):
    results = vs.similarity_search("HP printers often disconnect from Wi-Fi?", k=3)
    print(results)
    """If user has permission, perform similarity search in vector store."""
else:
    print("Access denied")
    """If user lacks permission, deny access and print message."""

```

<op>

== Bob accessing Network Setup section ==

[

Document(id='2684d45a-27cc-45b7-895f-fae8f121f678', metadata={}, page_content='HP printers often disconnect from Wi-Fi due to DHCP IP issues.'),

Document(id='fa9f4cf3-82f9-4f50-bfbe-ec5014c48da1', metadata={}, page_content='Wi-Fi connection problems with HP printers are often resolved by restarting...'),

Document(id='fb15b52d-bf28-454b-832c-8f48cd446579', metadata={}, page_content='Frequent disconnections in wireless printers are resolved by assigning...')

]

== Bob accessing Confidential section ==

Access denied

</op>

## Query Filtering/Sanitizing

Block risky or malicious queries before they hit the retriever.

```python
def is_safe_query(query: str) -> bool:
    """
    Check if a query is safe by scanning for risky keywords.

    Args:
        query (str): The user query string.

    Returns:
        bool: True if the query does NOT contain risky keywords,
              False if it contains any unsafe terms.
    """
    risky_keywords = ["password", "secret", "credential", "admin"]
    """List of sensitive terms that should trigger blocking."""

    return not any(word in query.lower() for word in risky_keywords)
    """Convert query to lowercase and check if any risky keyword is present.
       If found, return False (unsafe). Otherwise, return True (safe)."""


# Example query that contains unsafe content
query = "What is the administrator password for HP systems?"
"""This query includes the word 'password' and 'admin', so it should be blocked."""


# Guardrail enforcement before running similarity search
if is_safe_query(query):
    results = vs.similarity_search(query, k=3)
    """If query is safe, perform similarity search in the FAISS vector store."""
else:
    print("⚠️ Query blocked: unsafe content detected")
    """If query is unsafe, block execution and print a warning message."""
```

<op>

⚠️ Query blocked: unsafe content detected

</op>

📌 This also ensured efficiency and cost-effective implementation

## Rate Limiting

Prevent abuse by limiting how many queries a user can make.

```python
import time
"""Import the time module to capture current timestamps for request tracking."""

from collections import defaultdict
"""Import defaultdict to automatically initialize lists for each user key."""

user_requests = defaultdict(list)
"""Dictionary-like object mapping each user to a list of their request timestamps."""

MAX_REQUESTS = 5     # Maximum allowed requests
"""Maximum number of requests permitted per user within the time window."""

WINDOW = 60          # Time window in seconds
"""Time window (in seconds) for rate limiting. Here, 60 seconds."""

def allow_request(user):
    """
    Determine if a user is allowed to make a new request based on rate limits.
    Args:
        user (str): The username making the request.
    Returns:
        bool: True if the request is allowed, False if rate limit exceeded.
    """
    now = time.time()
    """Capture the current timestamp in seconds."""

    requests = user_requests[user]
    """Retrieve past request timestamps for this user."""

    user_requests[user] = [t for t in requests if now - t < WINDOW]
    """Filter out old requests that fall outside the time window."""

    if len(user_requests[user]) < MAX_REQUESTS:
        """Check if the number of recent requests is below the maximum allowed."""
        user_requests[user].append(now)
        """Record the new request timestamp for tracking."""
        return True
    return False
    """If the user has reached the limit, deny the request."""


user = "alice"
"""Define the current user as 'alice'."""

for i in range(7):  # Try 7 requests in quick succession
    """Loop to simulate 7 consecutive requests within the time window."""
    if allow_request(user):
        print(f"Request {i+1}: allowed ✅")
        """If request is allowed, print confirmation message."""
    else:
        print(f"Request {i+1}: ⏳ Rate limit exceeded ❌")
        """If request is denied, print rate limit exceeded message."""
```

<op>

Request 1: allowed ✅

Request 2: allowed ✅

Request 3: allowed ✅

Request 4: allowed ✅

Request 5: allowed ✅

Request 6: ⏳ Rate limit exceeded ❌

Request 7: ⏳ Rate limit exceeded ❌

</op>
