---
title: Why you should test your documentation code examples
date: 2022-08-25
summary: Learn about the importance of testing documentation code examples
---

# Introduction

I worked at a company where we used wiki software to host our internal documentation. The documentation included setup, how-to, onboarding, and architecture pages. Mayhem would ensue after a few years because pages would get out of date. It was hard to tell which page had the most up to date information.

One day, I was trying to get a code example working on my computer. After an hour of debugging, I found out that the code example was broken, when I thought I was doing something wrong. I did not know this until I posted on Slack, and someone responded to me. Then, a month later, I saw someone else post the exact same issue. Oops, I was so excited to get past the issue, I ended up not updating the wiki.

# Case for docs-as-code

The primary issue with wikis as developer documentation is they are far removed from the source of truth, the actual code. I advocate checking your documentation into the same version control as your code, especially if you need to reference any code from your documentation. This is known as "docs-as-code.". You can create strong links between your code and your documentation. This allows your documentation to import dependencies from your codebase or show code exactly as it appears in your codebase.

# How to import and test code examples

Using Docploy, you can write Markdown files in your `docploy/docs` folder, add code examples in your `docploy/snippets` folder, and render those code examples directly in your Markdown files using a `snippet` tag. Here is an example of how to use a snippet tag:

![Snippet code example](/test-code-snippets/snippet-code.png)

Here is what the code snippet looks like:

![Rendered snippet](/test-code-snippets/snippet-rendered.png)

We made the decision to import code from a separate file rather than embed the code directly into a Markdown file because you can use your codebase-specific linters, syntax highlighters, and testing frameworks since the file can be treated like an actual file with code, since it is an actual file with code.

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

You will notice that we only rendered a subset of the file. We are actually importing a Jest unit test, but we are only rendering the code between the `// [start]` and `// [end]` comment blocks. This is all intentional. This allows you to write and test assertions on your code examples before deploying any documentation. This will solve the issue of code examples going out of date. If you import a dependency from the test file whose interface breaks, then the CI build will fail, and you will not be able to deploy the documentation.

Docploy will run the imported file as if it was a regular unit test during the CI pipeline execution. This is why Docploy is tightly integrated into your CI pipeline.

# Conclusion

It may seem like overkill to test your documentation code examples, but you will save yourself and your users many hours, especially as you generate more and more documentation pages. You will save maintenance time because you do not need to go through the documentation in a regular schedule to manually run all of the code examples. As a user of the documentation, you can be confident that the code examples run, and you are not wasting any time trying to debug broken code examples.

Would you deploy your code to production and just hope everything works out? Would you manually test different product flows only every few weeks? It might be fine today, but when there are multiple contributors and many users, you will need an automated way to run tests on your documentation. You should apply modern software engineering principles to your documentation to avoid these issues.
