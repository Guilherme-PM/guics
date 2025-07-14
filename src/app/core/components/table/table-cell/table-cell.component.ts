import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PmTableColumnsConfig } from '../models/pm-table-columns';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'pm-table-cell',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './table-cell.component.html',
  styleUrl: './table-cell.component.scss'
})
export class TableCellComponent {
  @Input({ required: true }) col!: PmTableColumnsConfig;
  @Input({ required: true }) row!: any;

  getRenderType(): 'dualText' | 'tag' | 'badgeColorHEX' | 'date' | 'simple' | 'default' {
    if (this.col.dualText) return 'dualText';
    if (this.col.tag) return 'tag';
    if (this.col.badgeColorHEX) return 'badgeColorHEX';
    if (this.col.type === 'date') return 'date';
    if (this.row[this.col.id]) return 'simple';

    return 'default';
  }

  copyValue(text: string | undefined | null): void {
    if (!text) return;
    
    navigator.clipboard.writeText(text);
  }
}
