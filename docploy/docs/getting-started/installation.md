---
title: Installation
description: Set up Docploy to deploy to your GitHub Pages
---

{% callout
  type="warning"
  content="Docploy is currently available for GitHub as an Action"
/%}

Docploy builds the `.md` files located under your `docploy/docs/` folder and deploys them to GitHub Pages. You can set up Docploy on GitHub by following the steps on this page.

## Enable GitHub Pages

Go to your GitHub repo's **Settings** page.

Click on **Pages** in the left sidebar.

Under **Source**, select **GitHub Actions**.

## Enable Docploy

Add the following to your repo's `.github/workflows/main.yml`:

{% callout
  type="note"
  content="Replace the baseUrl and docsDir in the main.yml example below"
/%}

```yaml
on: [push]

jobs:
  docploy:
    name: Docploy
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
    steps:
      - name: Publish docs
        uses: docploy/docploy-action@v1.4
        with:
          baseUrl: 'https://<org>.github.io/<repo>' # replace this with your GitHub Pages url
          docsDir: 'docs' # the docs/ folder under the docploy/ folder with your .md files
```

{% callout
  type="caution"
  content="Each new code push will deploy and overwrite the current documentation to your GitHub Page."
/%}
