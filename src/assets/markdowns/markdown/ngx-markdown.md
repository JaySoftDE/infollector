# ngx-markdown

Sehr gutes Tool, um Markdown Dateien einschließlich Syntax Highlighting zu rendern.

&rarr; [ngx-markdown](https://www.npmjs.com/package/ngx-markdown)

`Terminal`

```js
npm install ngx-markdown --save
```

`angular.json`

```json
...
  "styles": [
    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./node_modules/prismjs/themes/prism-tomorrow.min.css",
    "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.min.css",
    "./node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css",
  ],
  "scripts": [
    "./node_modules/marked/marked.min.js",
    "./node_modules/prismjs/prism.js",
    "./node_modules/prismjs/components/prism-typescript.min.js",
    "./node_modules/prismjs/components/prism-sass.min.js",
    "./node_modules/prismjs/plugins/line-numbers/prism-line-numbers.min.js",
    "./node_modules/prismjs/plugins/line-highlight/prism-line-highlight.min.js"
  ]
...
```

`app.modules.ts`

```typescript
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MarkdownModule } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';

@NgModule({
  ...
  imports: [
    MarkdownModule.forRoot({
      // This enables external MD-files
      loader: HttpClient,
      // This prevents 'WARNING: sanitizing HTML stripped some content' messages
      sanitize: SecurityContext.NONE,
    })
  ]
  ...
})
```

Beim Einbinden von Dateien:

`markdown.component.html`

```html
<markdown [src]="./path/to/file.md" ngPreserveWhitespaces></markdown>
```

Beim Einbinden von Strings:

`markdown.component.ts`

```typescript
public markdownString: string = `
# Header

## Syntax Highlighting

\`\`\`typescript
  const example = 'Markdown rulez!';
\`\`\`

## List
* Element 1
* Element 2
* Element 3
`;
```

`markdown.component.html`

```html
<markdown [data]="markdownString" ngPreserveWhitespaces></markdown>
```

Es gibt noch sehr viel mehr Optionen!

&rarr; [ngx-markdown](https://www.npmjs.com/package/ngx-markdown)

Es können z.B. Emojis und mathematische Formeln gerendert werden!  
Es gibt Line-Numbering, Copy to Clipboard und und und ...
