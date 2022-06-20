# Import von JSON-Dateien

Der Import erfolgt beim Kompilieren.

Hierzu müssen folgende Compiler Options hinzugefügt werden:

`tsconfig.json`

```js
{
  ...
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
    ...
  }
}
```

Dann können JSON-Dateien direkt importiert werden:

`any.component.ts`

```typescript
import jsonObject from './path/to/json-object-file.json';
```
