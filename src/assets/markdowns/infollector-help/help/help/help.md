# Infollector Help

## Markdowns Root

Use *Settings* to define your **Markdowns Root**:

![Infollector Controls](./assets/infollector-controls.png)

![Infollector Settings](./assets/infollector-settings.png)

It might be any URL like above.

But it is recommended to use a relative path from within your INFOLLECTOR location. See 'Demo Root' to get an example.

If you use an URL with cross-domain-reference, you might have to configure the referenced server accordingly.

## Markdowns Structure

1. Collections  (sorted ascending)
2. Topics       (sorted ascending)
3. Titles       (sorted ascending)
4. Pages        (custom order from JSON)

![Infollector Four-Levels-Structure](./assets/infollector-four-levels-structure.png)

### Structure of Markdown Files

```js
<root>
├ ...
├ collection-folder
│ ├ ...
│ ├ topic-folder
│ │ ├ ...
│ │ ├ title-folder
│ │ │ ├ ...
│ │ │ ├ markdown-file.md
│ │ │ ├ ...
│ │ │ └ _pages.json
│ │ ├ ...
│ │ └ _titles.json
│ ├ ...
│ └ _topics.json
├ ...
└ _collections.json
```

### Format of Structuring JSON

```js
_collections.json
[
  {
    "collection": "my-first-collection",
    "path": "my-first-collection-folder"
  },
  {
    "collection": "my-second-collection",
    "path": "my-second-collection-folder"
  },
  ...
]

_topics.json
[
  {
    "topic": "my-first-topic",
    "path": "my-first-topic-folder"
  },
  {
    "topic": "my-second-topic",
    "path": "my-second-topic-folder"
  },
  ...
]

_titles.json
[
  {
    "title": "my-first-title",
    "path": "my-first-title-folder"
  },
  {
    "title": "my-second-title",
    "path": "my-second-title-folder"
  },
  ...
]

_pages.json
[
  {
    "page": "my-first-page",
    "path": "my-first-page-file"    // no file extension
  },
  {
    "page": "my-second-page",
    "path": "my-second-page-file"   // no file extension
  },
  ...
]
```
