---
title: Personally Identifiable Information
---

# Personally Identifiable Information Property


The acronym PII stands for "Personally Identifiable Information".

It refers to Personal Confidential Data (PCD). This is the information held by the company and allows the direct or indirect identification of a Physical Person. This data must be carefully handled, particularly in terms of security, retention time, and access control.

More information on the website of the CNIL (French National Commission on Informatics and Liberty): [https://www.cnil.fr/fr/reglement-europeen-protection-donnees](https://www.cnil.fr/fr/reglement-europeen-protection-donnees)

### How the Personally Identifiable Information property and its suggestions work

By default, Zeenea offers a "Personally Identifiable Information" property of the "List of values" type (`YES` / `NO`) that can be used in the templates of your choice to identify assets containing personal data.

This property can be used as a filter in Zeenea Studio and Zeenea Explorer, or as a tag in search results.

The use of this property allows you to take advantage of specific treatments such as automatic suggestions (see paragraph below) or obfuscation of sample data (see Data sampling).

Some of the information in this property can be edited:

* Name
* Description
* Importance in completion calculation

Other information is non-editable: 

* Code
* Type
* Options

## Automatic detection of "Personal Data" (PII)

Zeenea offers a system for automatic detection of PII in the Field type items. This is a weekly batch process.

To detect personal data, Zeenea evaluates the probability of the presence of this type of data using an artificial intelligence algorithm that takes into account the description and name of the Field.

When the algorithm detects a Field likely to contain personal data, Zeenea Studio displays an insert suggesting that this data be categorized as "Personal data" on the Field details page.

The suggestion remains visible until it has been processed:

* Click **Yes** to accept the suggestion and update the Personally Identifiable Information property.
* Click **No** to reject the suggestion.

Once accepted or rejected, the suggestion will not be proposed to users again.

  ![](/img/zeenea-personal-data.png)
 
### How to find Fields with pending suggestions?

In the Studio dashboard, the Watchlist widget by default provides a link to all the Fields in your perimeter with a pending suggestion.

You can also use the "Bot-powered suggestions" filter in the Catalog section to find these Fields.