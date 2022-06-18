# JaySoft INFOLLECTOR

## Release 1.2.0 from 18-Jun-2022

Simple tool for displaying a three-level-structure of markdown files.

1. Topics (sorted ascending)
2. Titles (sorted ascending)
3. Pages  (custom order from JSON)

![Three-Level-Structure](.src/assets/three-levels-structure.png)

```js
└ assets
  └ markdowns
    ├ ...
    ├ topic-folder
    │ ├ ...
    │ ├ title-folder
    │ │ ├ ...
    │ │ ├ markdown-file.md
    │ │ ├ ...
    │ │ └ _pages.json
    │ ├ ...
    │ └ _titles.json
    ├ ...
    └ _topics.json
```

```json
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

&copy; JaySoft 2022
