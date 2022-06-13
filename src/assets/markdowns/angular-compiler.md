# Angular Compiler

## bundle initial exeeded maximum budget

This will be controlled in `angular.json`:

```js
{
  ...
    "configurations": {
      "production": {
        "budgets": [
          {
            "type": "initial",
            "maximumWarning": "1mb",
            "maximumError": "2mb"
          },
  ...
}
```
