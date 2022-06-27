import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MdSettingsService } from './md-settings.service';

import { MARKDOWNS_ROOT_DEMO } from '../app.const';

@Component({
  selector: 'ifx-md-settings',
  templateUrl: './md-settings.component.html',
  styleUrls: ['./md-settings.component.scss']
})
export class MdSettingsComponent implements OnInit {

  dialogTitle = 'Einstellungen';

  settingsForm: FormGroup;

  initialRoot: string;
  newRoot: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<boolean>,
    private mdSettingsService: MdSettingsService,
  ) {
    this.settingsForm = this.fb.group({});
    this.initialRoot = this.mdSettingsService.getMarkdownsRoot();
  }

  // #region LIFECYCLE
  // --------------------------------------------------------------------------
  ngOnInit(): void {
    this.createForm();
    this.resetForm();
  }
  // #endregion

  // #region COMPONENT
  // --------------------------------------------------------------------------
  undo(): void {
    this.resetForm();
  }

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    this.getFormData();
    if (this.newRoot.toUpperCase() == 'RESET') {
      this.mdSettingsService.removeAllSettings();
    } else {
      this.mdSettingsService.setMarkdownsRoot(this.newRoot);
    }
    this.dialogRef.close(true);
  }

  demoRoot(): void {
    const root = this.settingsForm.get('root');
    root?.setValue(MARKDOWNS_ROOT_DEMO);
    root?.markAsDirty();

  }

  isDemoRoot(): boolean {
    return (this.settingsForm.get('root')?.value == MARKDOWNS_ROOT_DEMO);
  }
  // #endregion

  // #region FORM
  // --------------------------------------------------------------------------
  private createForm(): void {
    this.settingsForm = this.fb.group({
      root: ['', [
        Validators.required,
        Validators.maxLength(200),
      ]],
    });
  }

  private resetForm(): void {
    // Reset the form and set initial values
    this.settingsForm.reset({
      root: this.initialRoot,
    });
  }

  private getFormData(): void {
    const fm = this.settingsForm.value;
    this.newRoot = fm.root;
  }
  // #endregion
}
