---
title: Zeenea API Lifecycle
---

# Zeenea API Lifecycle

This documentation is a detailed page of Zeenea Public APIs. Please refer to the main documentation for more information about general usage.

## API Lifecycle Explained

Zeenea API follows a four phases long life cycle:

1. **Beta**: The API can be used in production but should take into account some limitations:
   * The API may have annoying bugs
   * The API contract can be modified or deleted
   * There is no service level agreement (SLA) that applies to potential bugs.

    This step aims to deliver value as soon as possible and inform you of the API contracts that we intend to use. This step also allows to collect your feedbacks to ensure the value and robustness of the APIs in order to change the status quickly as possible to "Production Ready".
2. **Production Ready**: During this phase, the API can be used in production and will benefit from our SLA.
3. **Deprecated**: This phase describes the end-of-life of the API. It will last at least 9 months after entering this step. During this phase, SLA still applies.
4. **Removed**: Not really a step, but the obvious phase after deprecated: the API is removed from our publicly available API set. A production ready API can't be removed without a 9 months long deprecation period prior to this event.