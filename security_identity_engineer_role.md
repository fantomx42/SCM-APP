# Security / Identity Engineer Role Definition

## Role Overview

The Security / Identity Engineer is responsible for the integrity, confidentiality, and availability of user data and symbolic profiles within the SCM system. This role is critical because SCM uses per-user symbolic profiles that require strict isolation and protection.

## Key Responsibilities

### 1. Auth Design

* **Objective**: Design and implement a robust authentication system.
* **Details**:
  * Implement secure user authentication (OAuth2, OIDC, or secure credentials).
  * Manage session security and token lifecycles.
  * Ensure identity consistency across the application.

### 2. Content Isolation

* **Objective**: Enforce strict data boundaries between users.
* **Details**:
  * Implement logical isolation of `Simulation`, `Formula`, and `User` data.
  * Ensure that a user's symbolic profile cannot be accessed or influenced by unauthorized entities.
  * Design mechanisms to prevent cross-user data leakage during SCM scoring.

### 3. Permissioning

* **Objective**: Define and enforce granular access controls.
* **Details**:
  * Implement Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC).
  * Define policies for accessing sensitive symbol logs and scoring metrics.

### 4. Encrypted Symbol Logs

* **Objective**: Protect sensitive symbolic data at rest and in transit.
* **Details**:
  * Encrypt `Simulation.results` and other sensitive fields containing symbolic logs.
  * Manage encryption keys securely.
  * Ensure that logs are only decryptable by the owner or authorized processes.

### 5. Safe Key Exchange

* **Objective**: Facilitate secure communication and data sharing.
* **Details**:
  * Implement secure key exchange protocols if users need to share symbolic data.
  * Ensure that cryptographic keys are never exposed in client-side code or logs.

### 6. Compliance with Identity-Consistent SCM Scoring

* **Objective**: Ensure scoring algorithms respect identity boundaries.
* **Details**:
  * Validate that SCM scoring inputs are strictly sourced from the authenticated user's context.
  * Audit scoring pipelines to prevent "identity drift" or contamination from other users' data.

## Technical Requirements

* **Language/Frameworks**: TypeScript, Next.js, Node.js.
* **Database**: PostgreSQL, Prisma (Schema design for security).
* **Security Standards**: OWASP Top 10, NIST guidelines for digital identity.
* **Cryptography**: Knowledge of AES, RSA/ECC, and key management practices.
