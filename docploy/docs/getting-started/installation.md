# Installation

Docploy currently supports GitHub codebases. We use GitHub Actions to test and deploy your documentation to GitHUb Pages for new pull requests.

## Setting up GitHub Pages

Go to your GitHub repo's **Settings**.

Click on **Pages** in the left sidebar.

Under **Source**, select **GitHub Actions**.

<callout danger>We will deploy to this branch, and we will overwrite all of the current contents

## Setting up GitHub Action

Set up a GitHub Action to deploy your Docploy docs on each push.

Add the following to `.github/workflows/main.yml`:

<add a callout to replace values>

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
          docsDir: 'docs'
```
