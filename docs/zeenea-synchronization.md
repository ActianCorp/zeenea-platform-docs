---
title: Synchronization with a Data Quality Management Tool
---

# Synchronization with a Data Quality Management Tool

Zeenea enables you to synchronize quality information from third-party solutions relating to your Datasets with the catalog.

Thanks to this synchronization, you can check the quality level of your Datasets according to the criteria and controls defined in your DQM tools directly from your Studio and Explorer applications.

To implement this integration, Zeenea offers a flexible approach based on our GraphQL API.

For more details, see the [API technical documentation](./zeenea-catalog-api-v2.md).

## Browse data quality information

In the Studio and Explorer, detailed information about the quality of a Dataset is available in the "Data quality" tab on the details page.

  ![](/img/zeenea-data-quality-tab.png)

In this tab, you will find a list of the checks carried out on the Dataset and the following information for each check: 

* Name
* Description (optional)
* Result (Passed, Warning, Failed)
* Last evaluated (last time the check has been performed)
* Family (control classification as defined in the DQM tool) (optional)
* Value (score or value measured by the DQM tool for the check) (optional)
* Fields (list of Fields that are taken into account by the check) (optional)

This information is also summarized in the form of a graph showing the number of controls by status and by family.

At each synchronization, Zeenea automatically calculates a synthetic indicator (synthetic result) of the quality of the Dataset, based on the information provided by the DQM tool. This indicator takes as its value the worst status of the checks carried out (Passed, Warning, Failed).

Depending on the DQM tool used and your integration:

* Hypertext links can also be used to open the Dataset directly in the DQM tool to obtain more details (ex: Open in SODA)
* A trust score can be provided as a more precise idea of the Dataset's overall quality

## Search for Quality Datasets

From the search page, you can use the "Result of Data Quality checks" filter to view only Datasets with a particular status.

The quality status of each Dataset can also be viewed from this page or the overviews.