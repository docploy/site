---
title: Quick Start
description: How to publish new pages
---

You will learn how to publish new pages after following the instructions on this page.

## Add your first page

Create a folder called `docploy/docs/` in your root directory.

Add a new file, `docploy/docs/index.md`, with the following content:

```yaml
---
title: My first document
description: Read my wonderful text
---
# Introduction

I am here to introduce my first document to you.
```

The `docploy/docs/index.md` document is served as the main documentation page.

{% callout
  type="note"
  content="Each page is written using Markdown syntax."
/%}

Use `git` to commit your changes into a new branch, then push the branch to trigger a workflow to publish your new docuemntation.

```shell
git checkout -b first_page
git add .
git commit -m "Publish my first page"
git push origin first_page
```

After pushing the new branch, go to your GitHub repository's `Actions` page to see that the workflow was successful.

{% callout
  type="warning"
  content="We support publishing documentation through GitHub Actions right now."
/%}

Visit the `baseUrl` defined in `.github/workflows/main.yml` file to see your new page.

## Add more pages

Add another file, `docploy/docs/top-level/another-page.md`, with the following content:

```yaml
---
title: Another Page
description: Learn about another topic
---
# Always be learning

Remember to stay curious.
```

You will see the sidebar render the following:

```
Top Level
    Another Page
```

This example shows how to add new pages under different sidebar sections. The `.../top-level/...` directory is formatted as `Top Level` in the sidebar, and all `.md` pages within that directory are placed within the same section.

{% callout
  type="note"
  content="Visit the Order The Sidebar page to learn how to change the page order."
/%}
