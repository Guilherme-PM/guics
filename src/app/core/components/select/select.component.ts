import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'pm-select',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  animations: [
    trigger('rotateChevron', [
      state('up', style({ transform: 'rotate(0deg)' })),
      state('down', style({ transform: 'rotate(180deg)' })),
      transition('up <=> down', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  readonly class = input<string>();
  readonly label = input<string>();
  readonly icon = input<string>();
  readonly helpText = input<string>();
  readonly iconColor = input<string>('text-gray-300');
  readonly placeholder = input<string>('Digite aqui...');

  readonly filter = input<boolean>(true);

  readonly options = input<any[]>([]);

  readonly optionLabel = input<string>('label');
  readonly optionValue = input<string>('id');
  readonly optionColor = input<string>('');

  selectedOption: any;
  openSelect: boolean = false;

  filterText: string = '';
  filteredOptions: any[] = [];

  onChange = (_: any) => {};
  onTouched = () => {};

  disabled = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl)
      this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.openSelect = false;
    this.filteredOptions = this.options();
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterText = value;
    this.filteredOptions = this.options().filter(option =>
      option[this.optionLabel()].toLowerCase().includes(value)
    );
  }

  resetFilter() {
    this.filterText = '';
    this.filteredOptions = this.options();
  }

  writeValue(value: any): void {
    this.selectedOption = this.options().find(
      opt => opt[this.optionValue()] === value
    );
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

  selectOption(option: any) {
    this.selectedOption = option;
    this.onChange(option[this.optionValue()]);
    this.onTouched();
    this.openSelect = false;
  }
}
