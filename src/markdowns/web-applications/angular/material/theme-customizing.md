# Angular Material Theme Customizing

```sass
@use '@angular/material' as mat

@include mat.core()

$my-primary: mat.define-palette(mat.$indigo-palette, 900)
$my-accent: mat.define-palette(mat.$cyan-palette, A200, A100, A400)
$my-warn: mat.define-palette(mat.$cyan-palette, 600)

$my-theme: mat.define-light-theme((
 color: (
   primary: $my-primary,
   accent: $my-accent,
   warn: $my-warn,
 )
))

// Emit theme-dependent styles for common features used across multiple components.
@include mat.core-theme($my-theme)

// Emit styles for MatButton based on `$my-theme`. Because the configuration
// passed to `define-light-theme` omits typography, `button-theme` will not
// emit any typography styles.
@include mat.button-theme($my-theme)

// Include the theme mixins for other components you use here.

```

## Alle Componenten

```sass
// Create a theme.
@mixin all-component-themes($theme-or-color-config) {
  $dedupe-key: 'angular-material-theme';
  @include theming.private-check-duplicate-theme-styles($theme-or-color-config, $dedupe-key) {
    @include core-theme.theme($theme-or-color-config);
    @include autocomplete-theme.theme($theme-or-color-config);
    @include badge-theme.theme($theme-or-color-config);
    @include bottom-sheet-theme.theme($theme-or-color-config);
    @include button-theme.theme($theme-or-color-config);
    @include button-toggle-theme.theme($theme-or-color-config);
    @include card-theme.theme($theme-or-color-config);
    @include checkbox-theme.theme($theme-or-color-config);
    @include chips-theme.theme($theme-or-color-config);
    @include table-theme.theme($theme-or-color-config);
    @include datepicker-theme.theme($theme-or-color-config);
    @include dialog-theme.theme($theme-or-color-config);
    @include divider-theme.theme($theme-or-color-config);
    @include expansion-theme.theme($theme-or-color-config);
    @include form-field-theme.theme($theme-or-color-config);
    @include grid-list-theme.theme($theme-or-color-config);
    @include icon-theme.theme($theme-or-color-config);
    @include input-theme.theme($theme-or-color-config);
    @include list-theme.theme($theme-or-color-config);
    @include menu-theme.theme($theme-or-color-config);
    @include paginator-theme.theme($theme-or-color-config);
    @include progress-bar-theme.theme($theme-or-color-config);
    @include progress-spinner-theme.theme($theme-or-color-config);
    @include radio-theme.theme($theme-or-color-config);
    @include select-theme.theme($theme-or-color-config);
    @include sidenav-theme.theme($theme-or-color-config);
    @include slide-toggle-theme.theme($theme-or-color-config);
    @include slider-theme.theme($theme-or-color-config);
    @include stepper-theme.theme($theme-or-color-config);
    @include sort-theme.theme($theme-or-color-config);
    @include tabs-theme.theme($theme-or-color-config);
    @include toolbar-theme.theme($theme-or-color-config);
    @include tooltip-theme.theme($theme-or-color-config);
    @include tree-theme.theme($theme-or-color-config);
    @include snack-bar-theme.theme($theme-or-color-config);
  }
}
```
