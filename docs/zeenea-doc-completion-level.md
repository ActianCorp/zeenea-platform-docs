---
title: Documentation Completion Level
---

# Documentation Completion Level

Zeenea offers, using a graphical component, an indicator of the documentation's level of completion at a given moment in time.

This indicator is calculated for each Item and is displayed in the search results and on the Item detailed page.

## How the documentation completion level is calculated

  ![](/img/zeenea-doc-completion-level.png)

The completion level is also calculated for the perimeter of a Curator (i.e. all the Items assigned to it) by Item Type. It can be viewed on the Dashboard.  

The calculation of the completion level is based on 4 criteria:

* Is the description filled in?
* Has at least one contact been added?
* Has at least one Glossary Item been linked (this condition is ignored if the metamodel does not support this type of link)?
* Are all the "Standard" and "Important" properties filled in?
* Descriptions from the source are also taken into account in the calculation of the completion level.
* In case of an update of the metamodel (i.e.: a property is removed from the template), the completion level is automatically updated. Please note that it is an asynchronous task that can take several minutes.
* An administrator can define which properties are "Standard" or "Important" in the Catalog Design section. You can find this information in the tooltip on the details page of each Item.