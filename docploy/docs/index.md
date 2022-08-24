---
title: Overview
description: Learn about Docploy and how it differs from other products
---

# About Docploy

Docploy is a "docs-as-code" platform built to apply sound software engineering devops practices into your documentation. It works with your continuous integration platform to do the following:

- Deploys your `docploy/docs/` folder onto its own dedicated site
- Tests your code snippets to make sure they are always working
- Enforces a consistent style guide (coming soon)
- Recommends grammar and syntax (coming soon)

We make it easy to build and maintain your documentation so you can guarantee a high quality developer experience.

You can save your developers' time because they will no longer need to perform routine checks to make sure how-to instructions are still valid. You can save your users' time because they won't need to scratch their head wondering if they did something wrong when they run an outdated code snippet.

# Comparison

Other documentation solutions include "static site generators" (SSG) on one end and Wiki platforms on the other end. Both are fine solutions for sharing static knowledge quickly. But, there are many manual tasks involved with maintaining documentation that can consume your developers' time. When left unchecked, documentation can quickly grow out of control. These solutions do not solve for these developer issues.

## Wikis

Wikis provide a good solution for storing and reading static content. You can quickly create a new document within seconds. But, they can quickly turn into a wild west scenario as the number of documents scale up. They tend to store stale code, which can confuse onboarding or even seasoned users and cause them to waste their time trying to debug the code snippets. Wikis live independently of your code, so when a breaking code change is introduced, many Wiki pages can go out of date without anyone noticing.

## Static Site Generators

Static site generators are a good solution for keeping your documentation tied to your code ("docs-as-code"). But, you need to set up and maintain your own documentation infrastructure and tooling. There is an opportunity cost for spending time on working on your documentation site when you could be working on your product. Static site generators also suffer from the same drawbacks as Wikis: document code snippets can get outdated, there is a lack of a consistent page structure, and there is a lack of grammar/syntax validation.
