---
search:
  boost: 2.0
---

# Suggestions and Collaboration

Collaboration allows **Contract Owners** and **Contributors** to review draft contracts before activation.

## Submit a Suggestion

Contributors can propose changes to any field in a **Draft** contract.

To submit a suggestion:

1. Open the relevant contract section.
2. Select the **Suggestion** button next to each contract content.
3. Describe the proposed change.
4. Provide any supporting information.
5. Click **Submit suggestion**.

The suggestion is linked to the selected contract element, making it easier for reviewers to understand the context of the proposed change.

!!! note
    Suggestions can only be created for contracts that are in the **Draft** status.
    
!!! note
    New table suggestions are currently limited to the table name and physical type. Full schema suggestions, including fields and properties, will be supported in a future release.

## Discuss a Suggestion

Each suggestion creates a dedicated discussion thread.

Participants can use the discussion thread to:

* Add comments and clarifications.
* Explain the business or technical reason for a change.
* Ask questions about the proposed update.
* Reply to existing comments.

Only users who have access to the contract can participate in discussions.

!!! warning "Important"
    Contract Owners must explicitly grant Contributor access before a user can review contracts, submit suggestions, or participate in discussions.

## Suggestion Email Notifications

DCB sends digest emails to Contract Owners when Contributor suggestions are awaiting review. Suggestions are collected for 24 hours before the email is sent.

When the first suggestion is submitted for a contract, DCB starts a 24-hour collection period for the Contract Owner. Any additional suggestions submitted for that owner during this period are included in the same digest email. The collection period does not reset when new suggestions are submitted.

!!! note
    Suggestions that are accepted or declined before the digest email is sent are excluded.

At the end of the collection period, DCB sends the Contract Owner a digest email summarizing all pending suggestions submitted during that period.

The digest email groups suggestions by contract and includes:

* Contract name
* Contract version
* Contributor name
* Affected field or section
* Summary of the proposed change
* A link to review the suggestions in DCB

After the digest email is sent, DCB starts a new 24-hour collection period when the next suggestion is submitted.

## Process a Suggestion

Contract Owners review incoming suggestions and determine how they should be handled.

Suggestions are displayed directly on the affected contract fields and sections. When one or more suggestions require review, a notification banner appears in the contract form.

To review suggestions:

1. Open the Draft contract.
2. Select a suggestion indicator next to a field or section, or select **Review all** to review all pending suggestions.
3. Review the proposed change and any related comments.
4. Decide how to process the suggestion.

For each suggestion, a Contract Owner can:

* **Accept** the suggestion and apply the proposed change to the Draft.
* **Decline** the suggestion if the proposed change should not be applied.

!!! warning "Important"
    Suggestions and comments support the review process but do not modify the contract content until a Contract Owner accepts the suggestion.
