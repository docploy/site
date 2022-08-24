---
title: Order The Sidebar
description: Customize how sidebar items are ordered
---

# Add a sidebar config

Add a `docploy/sidebar.yaml` file to configure how you want your documentation items to show up in the sidebar.

The following directory structure:

```
docs/
├── components/
│   ├── callout.md
|── getting-started/
│   ├── installation.md
│   ├── quick-start.md
├── index.md
```

will be rendered in the sidebar in the following way:

```
- Components
  - Callout
- Getting Started
  - Installiong
  - Quick Start
- Index
```

A more sensible ordering would raise `Index` and `Getting Started` higher in the sidebar:

```
- Index
- Getting Started
  - Installiong
  - Quick Start
- Components
  - Callout
```

You can use the following `docploy/sidebar.yaml` to achieve order the items in the above order:

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

You should see your sidebar rearranged to match the `docploy/sidebar.yaml` file.
