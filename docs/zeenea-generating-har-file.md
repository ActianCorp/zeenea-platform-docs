---
title: Generating a HAR file for Troubleshooting
---

# Generating a HAR file for Troubleshooting

The Support team may ask you to generate a HAR file to better understand the root causes of an error you are facing. This topic details the procedure to capture such a file.

## If you are using Chrome

1. Open the page where you are facing the problem, but don't try to reproduce it yet.
2. From the Chrome setup menu (three vertical dots on the right side of the address bar), select **More Tools** > **Developer Tools**, then, on the newly-opened panel, click the **Network** tab.
3. Active the Recording (button with a gray or red circle). The button must be red (record is activated). If gray, simply click on it.
4. If not already checked, select the **Preserve Logs** checkbox.
5. Clear any trace using the dedicated button, next to the **Record** button.
6. You can now reproduce your problem on the already-open web page.
7. Once done, save the request history using the `Export HAR...` button on the right side of the same bar containing the **Record** button.
8. Save the file.
9. Sanitize the file. See [Sanitization](#sanitization).
10. Send the file to the Support Team.

## If you are using Firefox

1. Open the page where you are facing the problem, but don't try to reproduce it yet.
2. From the Firefox setup menu (three horizontal bars on the right side of the address bar), select **Web Developer** > **Network**, then, on the newly open panel, click on the **Network** tab.
3. Try to reproduce your problem on the already-open web page.
4. Once done, save the request history right-clicking over the File column, and select **Save all as Har**.
5. Save the file.
9. Sanitize the file. See [Sanitization](#sanitization).
10. Send the file to the Support Team.

## If you are using another web browser

It may have such a HAR export feature. Please consult your browser documentation how to use this feature, or simply use one of the browsers listed above.

Before sending the file to the support team, please sanitize it (see: [Sanitization](#sanitization)).

## Sanitization

An HAR file contains all the browsing information, URL, parameters, headers, cookies, including session tokens, typed passwords and other secrets.

Before sending it, the file must be purged of all this information.

Doing it by hand would be cumbersome, so we recommend that you use a trustful tool for this.

Cloudflare proposes a HAR File Sanitizer, a simple-to-use tool. Although it is provided as a web application, the processing is done entirely on your computer and removes sensitive data before it is sent to the internet.