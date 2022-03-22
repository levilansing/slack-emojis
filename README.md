# Slack emoji downloader

1. Go to `https://<your-space>.slack.com/customize/emoji`
2. Inspect network, find request to `https://<your-space>.slack.com/api/emoji.adminList`
3. Copy curl
4. Modify page and count, e.g., page=1 and count=9999 to get all
5. execute curl and pipe to emojis.json
6. run `node download.js` to download all images
7. run 'node createMarkdown.js' to create the markdown table
