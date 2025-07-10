import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'pm-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  standalone: true,
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() disabled = false;

  isChecked = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl)
      this.ngControl.valueAccessor = this;
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  toggle() {
    if (this.disabled) return;
    this.isChecked = !this.isChecked;
    this.onChange(this.isChecked);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.isChecked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
