import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CENTERS, ORDERS } from '../../data';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-timeline-table-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './timeline-table-component.html',
  styleUrl: './timeline-table-component.scss',
})
export class TimelineTableComponent {
  CENTERS = CENTERS;
  ORDERS = ORDERS;
  selectedRow?: number;

  DAY_COL_WIDTH = '60px';
  MONTH_COL_WIDTH = '114px';
  YEAR_COL_WIDTH = '200px';

  currentScale: 'day' | 'month' | 'year' = 'month';
  dataColWidth = '114px';
  hoveredIndex: number | null = null;
  referenceDate = new Date('2026-01-01');

  viewRange = {
    days: [
      ...Array.from({ length: 31 }, (_, i) => `${i + 1} Jan`),
      ...Array.from({ length: 28 }, (_, i) => `${i + 1} Feb`),
    ],
    months: [
      'Jan 2026',
      'Feb 2026',
      'Mar 2026',
      'Apr 2026',
      'May 2026',
      'Jun 2026',
      'Jul 2026',
      'Aug 2026',
      'Sep 2026',
      'Oct 2026',
    ],
    years: ['2024', '2025', '2026', '2027'],
  };

  get headers() {
    if (this.currentScale === 'day') return this.viewRange.days;
    return this.currentScale === 'month' ? this.viewRange.months : this.viewRange.years;
  }

  get timelineRows() {
    return this.CENTERS.map((wc) => ({
      name: wc.data.name,
      id: wc.docId,
      tasks: this.ORDERS.filter((wo) => wo.data.workCenterId === wc.docId).map((wo) => ({
        ...wo,
        position: this.calculateTaskPosition(wo.data.startDate, wo.data.endDate),
      })),
    }));
  }

  private calculateTaskPosition(startStr: string, endStr: string) {
    const start = new Date(startStr);
    const end = new Date(endStr);
    let startIdx = 0;
    let span = 1;

    if (this.currentScale === 'day') {
      startIdx = Math.floor((start.getTime() - this.referenceDate.getTime()) / 86400000);
      span = Math.ceil((end.getTime() - start.getTime()) / 86400000);
    } else if (this.currentScale === 'month') {
      startIdx =
        (start.getFullYear() - this.referenceDate.getFullYear()) * 12 +
        (start.getMonth() - this.referenceDate.getMonth());
      span =
        (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    } else {
      startIdx = start.getFullYear() - this.referenceDate.getFullYear();
      span = end.getFullYear() - start.getFullYear() + 1;
    }
    return { startIdx, span: Math.max(1, span) };
  }

  changeScale(scale: 'day' | 'month' | 'year') {
    this.currentScale = scale;
    this.dataColWidth = scale === 'day' ? '60px' : '114px';
  }

  constructor(private menuService: MenuService) {}

  openMenu() {
    this.menuService.openMenu();
  }

  setHover(idx: number | null) {
    this.hoveredIndex = idx;
  }
}
