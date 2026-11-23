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

After submitting a suggestion, contributors can continue the discussion by adding comments and additional context. Contributors can also edit or withdraw a pending suggestion until it is processed by a Contract Owner.

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

## Inbox

The **Inbox** provides a centralized view of suggestions and comments on contracts you collaborate on. It enables Contract Owners and Contributors to track pending reviews, monitor submitted suggestions, and view resolved suggestions  and comments.

The **Inbox** contains the following views:

* **To Review** – Displays suggestions and comments awaiting your decision. 
* **My Suggestions** – Displays all suggestions you have submitted, whether pending or resolved. 
* **Resolved** – Displays suggestions and comments that have been addressed on your contracts or on suggestions you submitted.

Items in each view are grouped by contract, making it easier to track collaboration activity and review suggestions within a specific contract.

You can use the filters to narrow the list by type or contract.

## Process a Suggestion

Contract Owners review incoming suggestions and determine how they should be handled. Suggestions can be accessed from the **Inbox** and also appear directly on the affected contract fields and sections.

When one or more suggestions require review, they appear in the **Inbox**. If you open the draft contract directly, a notification banner displays the number of pending suggestions, and suggestion indicators appear next to the affected fields, sections, or contract areas.

Selecting a suggestion in the **Inbox** opens the associated contract and navigates directly to the relevant section, where you can review and process the suggestion.

To review suggestions from the **Inbox**:

1. Open the **Inbox**. 
2. Locate the suggestion that requires review. 
3. Select the Open icon next to the suggestion to open the associated contract and navigate to the relevant section.
4. Review the proposed change and any related comments. 
5. Decide whether to accept or reject the suggestion.

Alternatively, you can open the draft contract directly and use the notification banner to review all pending suggestions. You can also select a suggestion indicator next to an affected field or section to view the corresponding suggestion.

For each suggestion, a Contract Owner can:

* **Accept** the suggestion and apply the proposed change to the Draft.
* **Decline** the suggestion if the proposed change should not be applied.

!!! warning "Important"
    Suggestions and comments support the review process but do not modify the contract content until a Contract Owner accepts the suggestion.

Resolved suggestions and comments remain available in the **Resolved** and **My Suggestions** views of the **Inbox**. You can view the decision taken, the user who processed the suggestion, the resolution date and time, and any reason provided for the decision.

You can also expand a resolved item to view additional details, including the proposed change and the full discussion history.
