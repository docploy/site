---
title: Order The Sidebar
description: Customize how sidebar items are ordered
---

# Add a sidebar config

Add a `docploy/sidebar.yaml` file to specify how you want your documentation pages to show up in the sidebar.

The following directory structure,

```
docs/
├── components/
│   ├── callout.md
|── getting-started/
│   ├── installation.md
│   ├── quick-start.md
├── index.md
```

will be rendered in the sidebar in the following order:

```
- Components
  - Callout
- Getting Started
  - Installiong
  - Quick Start
- Index
```

A more sensible ordering would look like the following because the most common documentation is listed higher:

```
- Index
- Getting Started
  - Installiong
  - Quick Start
- Components
  - Callout
```

Add the following to the `docploy/sidebar.yaml` file:

```
- index
- getting-started:
    - installation
    - quick-start
- components:
    - callout
```

{% callout
  type="note"
  content="Use the filename without the .md extension to identify the items. Also, directories have a `:` mark at the end to distinguish them from files."
/%}

Now, your sidebar items will be rearranged to match the `docploy/sidebar.yaml` file.
