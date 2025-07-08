import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../button/button.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'pm-dialog',
  imports: [LucideAngularModule, CommonModule, ButtonComponent, DragDropModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  animations: [
    trigger('dialogAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.9)'
      })),
      state('open', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('void => open', [
        animate('200ms ease-out')
      ]),
      transition('open => void', [
        animate('150ms ease-in')
      ]),
    ])
  ]
})
export class DialogComponent {
  icon = input<string>('x');
  title = input<string>('Header');
  subTitle = input<string>('Subtitle');

  @Input() draggable: boolean = true; // TODO: Fazer opção para desativar o drag
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    event.preventDefault();
    this.closeDialog();
  }

  closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  get animationState() {
    return this.visible ? 'open' : 'void';
  }
}
