# Angular Matierial Theme Customizing

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
