import { Component, input } from '@angular/core';
import { PmTableConfig } from './models/pm-table-config';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TableCellComponent } from './table-cell/table-cell.component';

@Component({
  selector: 'pm-table',
  imports: [CommonModule, LucideAngularModule, TableCellComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  configTable = input<PmTableConfig>();
}
