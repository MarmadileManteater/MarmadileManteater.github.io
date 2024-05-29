
# static data updater CLI

This is a CLI for updating my `./static-data/` repository which is powered by [the GitHub REST API](https://docs.github.com/en/rest), [`undici`](https://github.com/nodejs/undici) & [`sharp`](https://github.com/lovell/sharp).

**Commands:**

📡 `update-projects`  - Updates projects in the `projects.json` file based on the Github API

🧊 `unhotlink-images` - Downloads and resizes project thumbnails for web

🧹 `clean-images`     - Removes all images created by `unhotlink-images`
