# Actian Data Observability Integration

## Overview

When a dataset is cataloged in Actian Data Intelligence Platform and monitored in Actian Data Observability, data quality information is automatically synchronized from Data Observability to Data Intelligence Platform.

This integration allows users to view data quality health, incidents, and monitoring metrics directly in Data Intelligence Platform.

For setup and configuration instructions, see [Actian Data Intelligence Platform Integration](https://docs.telm.ai/telmai/integrations/catalog-integration/zeenea).

After each scan of a monitored dataset completes, Data Observability synchronizes the latest data quality information to Data Intelligence Platform. This information is displayed at the dataset level in both **Studio** and **Explorer**:

* In the **Data Quality** tab
* In the **Lineage** tab

## View Data Quality Information in Data Quality Tab

1. Open the dataset's **Item Details** page in **Studio** or **Explorer**.
2. Select the **Data Quality** tab.

The **Data Quality** tab displays incident information and quality metrics synchronized from Data Observability.

### Incidents Overview

The left panel displays an overview of incidents synchronized from Data Observability, including:

* The total number of **Open** and **Closed** incidents.
* A histogram showing the number and severity of incidents detected during the last 30 days.
* A list of incidents that includes:
     * The monitor name in Data Observability.
     * The incident impact (**Not Set**, **Low**, **Medium**, or **High**).
     * A link to the incident in Data Observability. Select the link to open the incident in a new browser tab.
     * The date and time the incident was created.
     * The incident status (**Open** or **Closed**).

### Asset Overview

The right pane displays data quality metrics for the selected dataset, synchronized from Data Observability, including:

* Data quality score (For more information, see [Data Quality Score](https://docs.telm.ai/telmai/monitoring-data/data-quality-score#purpose))
* Record count
* Uniqueness
* Completeness

### View Dataset Details in Data Observability

To open dataset details for the selected dataset in Data Observability, select **View Details**.

The overview page in a new browser tab displays the dataset's details in Data Observability

## View Data Quality Information in the Lineage Tab

1. Open the dataset's **Item Details** page in **Studio** or **Explorer**.
2. Select the **Lineage** tab.

A data quality indicator is displayed for the selected dataset. The indicator color reflects the current incident status synchronized from Data Observability:

* **Green**: The dataset has no open incidents.
* **Yellow**: The dataset has one or more high-impact open incidents.
* **Red**: The dataset has open incidents, but none are classified as high impact.

## Limitations

Using the legacy Data Quality API at the same time can result in inconsistent data quality information. In particular, the information in the **Lineage** tab might not be consistent with the information in the dataset's **Data Quality** tab.