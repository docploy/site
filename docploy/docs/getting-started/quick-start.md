---
title: Quick Start
description: How to publish your first page
---

You will be able to publish your first document after following the instructions on this page.

## Add your first page

Create a folder called `docploy/docs/` in your root directory.

Add a new file, `docploy/docs/index.md` with the following contents:

```yaml
---
title: My first document
description: Read my wonderful text
---
# Introduction

I am here to introduce my first document to you.
```

{% callout
type="note"
content="Each page is written using Markdown syntax."
/%}

Use `git` to commit your changes into a new branch, then push the branch to publish your new docuemntation.

```shell
git checkout -b first_page
git add .
git commit -m "Publish my first page"
git push origin first_page
```

After pushing the new branch, go to your GitHub repository's `Actions` page to see that the workflow was successful.

Visit the `baseUrl` defined in `.github/workflows/main.yml` file to see your new page.

## Add more pages
