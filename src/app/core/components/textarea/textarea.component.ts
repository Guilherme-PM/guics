import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'pm-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  imports: [CommonModule],
})

export class TextareaComponent implements ControlValueAccessor {
  @Input() class: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = 'Digite aqui...';

  value: string = '';
  disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl)
      this.ngControl.valueAccessor = this;
  }

  writeValue(value: any): void {
    this.value = value ?? '';
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

  onInput(event: Event) {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
}
