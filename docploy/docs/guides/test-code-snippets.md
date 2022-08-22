---
title: Test Code Snippets
description: Run tests on your code snippets
---

{% callout
  type="warning"
  content="Only Jest support for Javascript code snippets is currently available."
/%}

# Why test your code snippets

One of Docploy's core principles is testing code snippets to save users' time from trying to run outdated code snippets.

# How to test code snippets

## Javascript

Docploy automatically runs [Jest](https://jestjs.io/) for files with the `*.test.js` extension under the `docploy/` directory.

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

This example is written as a Jest test. Only the contenet wrapped within the `// [start]` and `// [end]` lines will be shown. But, the test for verifying the `sum()` function, ` expect(sum()).toEqual(2);`, will run in the CI build to make sure that the code snippet is valid.

You should add assertions for any code snippets that you render.

```yaml
{% snippet
  paths=[
    "snippets/components/snippet.md/example.test.js"
  ]
/%}
```

# Show the code snippet status

The bottom right of each code snippet shows the code snippet test run.

{% snippet
  paths=[
    "snippets/components/snippet.md/example.test.js"
  ]
/%}

- A green checkmark displays when all code snippet tests ran successfully.
- A yellow warning displays when no code snippet tests were run.
- A red warning displays when the at least one code snippet test failed.
