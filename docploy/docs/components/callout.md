---
title: Callout
description: Use a Callout to bring attention to important information
---

You can add a `callout` to add emphasis to important information on a page.

## Add the Callout

Here is an example of using the `callout`:

```yaml
{% callout
  type="warning"
  content="Hi, I am here to warn you about something very important!"
/%}
```

{% callout
  type="warning"
  content="Hi, I am here to warn you about something very important!"
/%}

## Use the appropriate type

You can use three values for the `type` attribute: `note`, `warning`, and `caution`.

{% callout
  type="note"
  content="Hi, I have something cool to tell you."
/%}

{% callout
  type="warning"
  content="You should really be careful about this."
/%}

{% callout
  type="caution"
  content="Listen up, you are at risk of imploding the Earth!"
/%}
