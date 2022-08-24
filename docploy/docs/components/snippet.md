---
title: Snippet
description: Use the Snippet component to display code from different files
---

The Snippet can import code from different files and display them in a code block with syntax highlighting and tabs.

A core Docploy principle is making sure code snippets always work and stay up-to-date.

In the examples throughout this page, code is defined in a unit testing framework so we can test that the code works.
Since Docploy is tightly integrated with GitHub Actions, we can test that each code snippet runs successfully.

## Add your code to files

In this example, the `snippet` component imports code from two files, one Javascript file and one Python file.
A `snippet` only imports code between `[start]` and `[code]` comments in each file. It is important we hide the testing details and only show the important code to the user.

{% callout
  type="note"
  content="We recommend putting your snippets in a docploy/snippets/<doc_path> folder, to organize your snippets."
/%}

The first file, `docploy/snippets/components/snippet.md/example.test.js`, contains the following code:

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

{% callout
  type="note"
  content="This code uses the Jest testing framework, so the code can be tested during each CI build. See `Test Code Snippets` for more information."
/%}

The second file, `docploy/snippets/components/snippet.md/test_example.py`, contains the following code:

```python
# [start]
def sum():
  return 1 + 1
# [end]

def test_sum():
  assert sum() == 2
```

## Import the code in the Snippet

You can use the `paths` attribute to define an array of paths relative to the `docploy/` folder.
By default, a `snippet` will look at the file extension to determine the tab label for each file.

```yaml
{% snippet
  paths=[
    "snippets/components/snippet.md/example.test.js",
    "snippets/components/snippet.md/test_example.py"
  ]
/%}
```

The above example will render the following component:

{% snippet
  paths=[
    "snippets/components/snippet.md/example.test.js",
    "snippets/components/snippet.md/test_example.py"
  ]
/%}

There will be a tab for each of the paths defined in the `paths` attribute.
