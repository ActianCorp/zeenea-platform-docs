---
title: Managing Scanners
---

# Managing Scanners

## Adding a Scanner

Scanners are added and set up outside of the Zeenea interface. Please see [Zeenea Scanner Setup](./zeenea-scanner-setup.md) for more information.

## Deleting a Scanner

Scanners cannot be deleted. They will however be tagged as “Inactive” in the Scanners list. 

## Moving a Scanner

You can move a scanner simply by moving its installation folder. The scanner will then be automatically updated on the Zeenea platform, without any added manual intervention on your end. 

This process can be used both for moving a scanner in the same host, or changing the host entirely.   

## Renaming a Scanner

It is possible to rename a scanner, but it will need to be set up again. 

When renaming a scanner, if there are connections attached to it, you will need to follow a following procedure: 

1. Stop the scanner.
2. Move the `connections` folder into a temporary location.
3. Restart the scanner: all connections will automatically be updated on the platform and temporarily disabled.
4. Rename the scanner (by changing the scanner identifier in the `agent-identifier` file).
5. Move the `connections` folder back to its original location.
6. Restart the scanner: the scanner is added to the administration platform and all attached connections are enabled again.
7. If there are no connections, you can rename it by changing the identifier in the `agent-identifier` file.

## Scanners list

The Scanners list in the Administration interface allows you to: 

* view active scanners
* view inactive scanners
* download the scanner executable file

## Identifying a scanner

Scanners are identified by a unique ID and the name of the machine hosting them, which allows you to accurately locate them inside your Information System.  

## Scanner detailed view

By clicking on the "eye" icon next to a Scanner, you’ll be able to access more detailed information, as well as the list of connections attached to it. 

## Scanner states

* **Active Scanner**: A scanner is considered “Active” when it runs a successful verification every 10 seconds, even when it doesn’t contain any connection.
* **Inactive Scanner**: A scanner is considered “Inactive” when it hasn’t run a verification for 3 days. Inactive scanners are hidden by default, and can viewed by toggling the “Include Inactive Scanners” box.
* **Action required**: If one (or more) connection managed by a scanner encounters an error, the message “A connection linked to this scanner needs your attention” is displayed. The user can then access the list of connections linked to the scanner and quickly identify which one needs correcting. 

## Updating a Scanner

Unlike Zeenea Studio and Zeenea Explorer, the scanner must be updated manually.

**Zeenea Support team may ask you to upgrade your scanner if you are facing an issue to validate if it is already fixed in the most recent version available.**

### Installation procedure: 

1. Stop the current scanner
2. Download the new version available at: https://[yourenvironment].zeenea.app/admin/settings/scanners. (If you need a specific version of the scanner, it will be provided by Zeenea support.)
4. Copy the file `agent-identifier` from the root directory of the current scanner and paste it into the root directory of the new scanner.
5. Copy the file `application.conf` from the `conf` directory of the current scanner and paste it into the `conf` directory of the new scanner.
6. Copy the connections configuration files from the `connections` directory of the current scanner and paste them in the `connections` directory of the new scanner.
7. Go to the [Connectors List](./zeenea-connectors-list.md) and the copy up-to-date version of the plugins you use (without unzipping them) into the `plugins` directory of the new scanner.
8. Start the new scanner. It should be visible on the Zeenea administration page and the connections must be correctly associated and ready to use again.

## Windows Environment (Scanner as a Windows Service)

Each time you decide to upgrade your Scanner, being defined as a Windows Service, you'll have to copy these files files from the previous scanner installation to the newly one: `prunmgr.exe` and `prunsrv.exe`.

Then, you'll need to execute `./bin/zeenea-service.bat` script which will update paths in the current service configuration and will relaunch the process.