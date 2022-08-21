---
title: Snippet
description: The Snippet component is used to display code from different files
---

The Snippet can import code from different files and display it in a code block with syntax highlighting and tabs.
You can show how to implement a feature in different programming languages.

## Add your code to files

In this example, our `Snippet` component imports code from two files.
`Snippet`s only import code between `[start]` and `[code]` comments in each file.

{% callout
  type="note"
  content="We recommend putting your snippets in a docploy/snippets/<doc_path> folder, where `doc_path` is the path to your "
%}

The first file, `docploy/snippets/components/snippet.md/js-example.js`, contains the following code:

```js
describe('js-example', () => {
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

The second file, ``docploy/snippets/components/snippet.md/py-example.py`, contains the following code:

```python
# [start]
def sum():
  return 1 + 1
# [end]

def test_sum():
  assert sum() == 2
```

{% callout
  type="note"
  content="Code is wrapped in a testing framework, so the code can be tested during each CI build. See `Testing Code Snippets` for more information."
%}

## Import the code in the Snippet

You can use the `paths` attribute to define an array of paths relative to the `docploy/` folder.
By default, a `Snippet` will look at the file extension to determine the tab label for each file.

```yaml
{% snippet
  paths=[
    "snippets/components/snippet.md/js-example.js",
    "snippets/components/snippet.md/py-example.py"
  ]
%}
```

The above example will render the following component:

{% snippet
  paths=[
    "snippets/components/snippet.md/js-example.js",
    "snippets/components/snippet.md/py-example.py"
  ]
%}

There will be a tab for each of the paths defined in the `paths` attribute.
