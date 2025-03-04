---
title: Maintenance Mode
---

# Maintenance Mode

You can activate a maintenance mode from the Administration interface for your Zeenea platform. This feature allows Super Admins to set up a maintenance landing page and redirect all users during maintenance time. Only Super Admins can access the catalog during maintenance time.

## Activating the maintenance mode

To activate the maintenance mode, go to the Maintenance mode section in the Administration interface and click the "Activate the maintenance mode" toggle. You'll need to confirm before activation.

Only Super Admin users can activate the maintenance mode.

  ![](/img/zeenea-maintenance-mode.png)

## Maintenance landing page

### Redirection of users
During maintenance time, all users (Studio, Explorer, Administration) are redirected to the maintenance page after login, except Super Admins.

Connected users are redirected as soon as an interaction with the application is detected (login, navigation, etc.).

Note that if a write action has been started and not finished before activating the maintenance mode (like a bulk action), it is not stopped when maintenance mode is activated.

### Content of the page
The maintenance page contains a generic message inviting users to connect later:

* Title: Maintenance in progress
* Message: Your administrators carry out scheduled maintenance. Please check back soon!

  ![](/img/zeenea-maintenance-in-progress.png)

## Super Admin access during maintenance time
When the maintenance mode is activated, Super Admins can access the application as usual (Studio, Explorer, Administration).

On top of the applications, a tag indicates that the maintenance mode is activated.

  ![](/img/zeenea-maintenance-mode-tag.png)

## Working with APIs during maintenance time
API calls (read and write) are not blocked during maintenance time.

## Disabling the maintenance mode
To disable the maintenance mode, return to the Administration and toggle the **Activate maintenance mode** button. You'll need to confirm before disabling.