# Searching and Filtering in Zeenea Studio

## Understanding the “Catalog” Section

The Catalog section of the Studio lists all items contained in Zeenea. 

This display is split into three sections:
* The filters on the left
* The list of all items in the center
* An overview screen on the right, whenever an item is selected.

By clicking on an item in the list, you’ll be redirected to its detailed page, and will then be able to access all information regarding it. 

![](./images/zeenea-studio-search.png)

## Using the Search Engine

The search engine works in a way similar to Internet search engines. 

Results are sorted by default according to their relevance to the search.

For each item in the Catalog, Zeenea Studio indexes the following information: 

* Name
* Description
* Assigned Contact
* Source information (name, description, some property values)
* Any property that has been flagged as “Use in Search Queries”

All of this information is taken into account in the search algorithm to determine whether or not an item is relevant in the context of the current search query. 

You can search the catalog by combining: 

* The search bar
* The filters

## Using the Search Bar

The search bar is split into two sections: 

* the search scope
* the text input

### The Search Scope

Similar to what can be found on e-commerce websites, the search scope will allow you to restrict your search to only certain types of items; this allows Data Stewards to focus only on items that are directly relevant to them. 

After selecting the Scope, you are then able to add filters to refine the list of items.  

Once selected, the scope doesn’t change when you update your search; that way, you don’t have to select the same filters again. 

You can restrict your search to one of four scopes: 

* Default: Datasets, Visualizations, Data Processes, Categories, and Custom Items
* Assets: Datasets, Visualizations and Data Processes
* Glossary: Glossary Items
* All Items

### The Search Bar

Type in one or more keywords in the search bar and hit “Enter” on your keyboard. You can also view all items in your scope by emptying the input zone. 

## Sorting the Results

By default, results are sorted by relevance to the query according to a probability score of being the document closest to what the user is looking for. 

For equal relevance, two results are sorted in alphabetical order.

You can also sort search results by name or last update date.

### How is the Score Calculated? 

Depending on the presence of the largest number of words entered but also on the location of these words (the weight will potentially be different between a word found in the name of a dataset compared to the value of one of its properties).

## Filter Your Searches in Zeenea Studio

Find the filters in the Catalog section of Zeenea Studio.

### Filter Behavior

Several values are selected:

* Within the same filter, corresponds to a search using a logical OR between these values. 
* In different filters, corresponds to a search using a logical AND.

#### Visibility & Dynamic Filters

* Default filters are proposed.
* Others, based on properties during metamodel configurations, can be activated.
* Only the filters relevant to the current search are displayed, the others are hidden.

The selected filters and their values are displayed above the list of results. You can remove them one by one or click on "Clear all filters" to reset the search.

### Filter Empty Values

For each filter, you can select "Include empty values".

This option allows finding Items for which the selected attribute (contact, property, etc.) is not completed, whether this attribute exists in the related Item Type template or not.

### Default Filter Types
 
| Filter Type   | Description  |
|---------------|--------------|
| Completion level  | This filter allows you to search for items according to their level of completion. |
| Item | This filter allows you to select one or more types of items from the catalog. Native item types and custom item types are available here. |
| Item Lifecycle Event | This filter allows you to retrieve items from the catalog according to certain events in their lifecycle.<br/>Select the required event type and then select a period for this event.<br/>Two types of events are proposed:<br/>- the date of import<br/>- the date of deletion of the source |
| Contacts | This filter allows you to search for items based on the contacts associated with them.<br/>Type the first few characters of a contact's first name, last name, or email, then select the contact from the suggested list for your search.<br/>The contact you are looking for must therefore be registered in the catalog beforehand. |
| Category | In the same way as the "Contacts" filter, this filter allows you to search for datasets associated with one or more categories. |
| Access request policy | This filter allows you to search for items based on their associated access request policy. |
| Connections | This "faceted" type of filter allows you to select items from one or more connections using checkboxes. Only connections for which at least one item has been imported are displayed. |
| Orphan Items | This filter allows you to display the data sets deleted from a connection and still present in the catalog. |
| Quality Status | This filter is used to display datasets according to their quality status:<br/>- Passed (each quality test passed since the last execution of the tests)<br/>- Warning (at least one test status is "Warning" since the last execution)<br/>- Failed (at least one test failed during the last execution)<br/>This filter is displayed if the catalog is synchronized with one of your data quality management tools only. |
| Personally Identifiable Information| This filter displays the fields for which the Personally Identifiable Information property has been filled in (Yes/No). |
| Implemented | This filter allows you to display only the glossary and custom items that are used to define or classify other items in the catalog. |
| Bot-powered suggestions | This filter displays only Fields for which a suggestion has been generated. These are Fields likely to contain personal data and not yet tagged as such. |
| User suggestions | This filter displays only those objects for which a user's suggestion is pending. |

### Add Filters by Property

All properties for which the "Use as filter" option has been enabled in the Catalog Design section are displayed dynamically as search filters.

Depending on the type of property, the user interface can be of two types:

* Properties from a custom item: The corresponding filters are displayed as a search field.
* Other properties: The corresponding filters are displayed as checkboxes. Only the values currently used in the catalog are proposed.

In any case, you can select one or more values of the same property to apply a filter.

For more information about Zeenea query language, see [Zeenea Query Language](../../cross-application-features/zeenea-query-language.md).