---
title: Why you should test your documentation code examples
date: 2022-08-25
summary: Learn about the importance of testing documentation code examples
---

# Introduction

I worked at a company where we used wiki software to host our internal documentation. The documentation included setup, how-to, onboarding, and architecture pages. Mayhem would ensue after a few years because pages would get out of date. It was hard to tell which Wiki to use when you wanted to find the most up to date information.

One day, I was trying to use a code example that was not running correctly. After an hour of debugging, I found out that the code example was broken. I did not know until I posted on Slack, and someone responded to me. Then, a month later, I saw someone else post the exact same issue. Oops, I was so excited to get past the issue, I ended up not updating the Wiki.

# Case for docs-as-code

The primary issue with wikis as developmr documentation is they are far removed from the source of truth, the actual code. I will always advocate for having your documentation live with your code if you need to reference any code. THis is known as "docs-as-code" because the docs exist within the same version control tool as your code, usually as Markdown files. You can create strong links between your code and your documentation. This allows your documentation to import dependencies from your codebase or show code exactly as it appears in your codebase.

# How to import and test code examples

Using Docploy, you can write Markdown files in your `docploy/docs` folder, add code examples in your `docploy/snippets` folder, and render those code examples directly in your Markdown files using a `snippet` tag. Here is an example of how to use a snippet tag:

![Snippet code example](/test-code-snippets/snippet-code.png)

Here is what the code snippet looks like:

![Rendered snippet](/test-code-snippets/snippet-rendered.png)

We made the decision to import code from a separate file rather than embed the code directly into a Markdown file because you can use your codebase-specific linters, syntax highlighting, and testing since the file can be treated like an actual file with code since it is an actual file with code.

We will focus on that last item, the testing piece, because it opens the door for us to test that imported code.

Here is the content of the file being imported above:

```js
describe('example', () => {
  it('should return 2', () => {
    // [start]
    function sum() {
      return 1 + 1;
    }
    // [end]
    expect(sum()).toEqual(2);
  });
});
```

You will notice that we are only rendered a subset of the file. We are actually importing a Jest unit test, and we are only rendering the code between the `// [start]` and `// [end]` comment blocks. This is all intentional. This allows you to test your assertions on your code examples before deploying any documentation. This will solve the issue of code examples going out of date. If we import a dependency from the test file whose interface breaks, then the CI build will fail, and we will not be able to deploy the documentation.

Docploy will run the imported file as if it was a regular unit test as part of the CI pipeline. This is why Docploy is tightly integrated into your CI pipeline.

# Conclusion

It may seem like overkill to test your documentation code examples, but you will save yourself and your users many hours as your number of documentation pages increase. You will save maintenance time because you do not need to go through the documentation in a regular schedule to manually run all of the code examples. As a user of the documentation, you can be confident that the code examples run, and you are not wasting any time trying to debug broken code examples.

Would you deploy your code to production and just hope everything works out? Would you manually test different product flows every few weeks? It might be fine today, but when there are multiple contributors and many users, you will need an automated way to run tests on your documentation. You should apply modern software engineering principles to your documentation to avoid these issues.
