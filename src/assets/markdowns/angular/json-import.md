# Import von JSON-Dateien

Der Import erfolgt beim Kompilieren.

Hierzu müssen folgende Compiler Options hinzugefügt werden:

`tsconfig.json`

```json
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

`any.component.ts`

```typescript
import jsonObject from './path/to/json-object-file.json';
```
