import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CENTERS, ORDERS } from '../../data';
import { MenuService } from '../../services/menu-service';
import { WorkOrderDocument } from '../../types';

interface WorkCenterTask extends WorkOrderDocument {
  position: {
    startIdx: number;
    span: number;
  };
}

interface TimelineRow {
  name: string;
  id: string;
  tasks: WorkCenterTask[];
  filledPositions: Map<number, boolean>;
}

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
    years: ['2024', '2025', '2026', '2027', '2028'],
  };

  get headers() {
    if (this.currentScale === 'day') return this.viewRange.days;
    return this.currentScale === 'month' ? this.viewRange.months : this.viewRange.years;
  }

  // Gets each row and a map of which cells are empty
  get timelineRows(): TimelineRow[] {
    let rows = this.CENTERS.map((wc) => {
      let filledPositions = new Map();
      let tasks = this.ORDERS.filter(
        (wo) => wo?.data?.workCenterId && wo.data.workCenterId === wc.docId,
      ).map((wo) => {
        let position = this.calculateTaskPosition(wo.data.startDate, wo.data.endDate);
        for (let i = position.startIdx; i <= position.startIdx + position.span; i++) {
          filledPositions.set(i, true);
        }
        return {
          ...wo,
          position: this.calculateTaskPosition(wo.data.startDate, wo.data.endDate),
        };
      });
      return {
        name: wc.data.name,
        id: wc.docId,
        tasks,
        filledPositions,
      };
    });
    return rows;
  }

  constructor(private menuService: MenuService) {}

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

  /**
   * Calculates the ISO date string based on the column index
   * and the currently active scale.
   */
  getDateFromColumn(colIndex: number): string {
    // Create a new date instance from the reference to avoid mutation
    const date = new Date(this.referenceDate);

    if (this.currentScale === 'day') {
      // Add the number of days directly
      date.setDate(date.getDate() + colIndex);
    } else if (this.currentScale === 'month') {
      // Add months; JavaScript handles year rollover automatically
      date.setMonth(date.getMonth() + colIndex);
    } else if (this.currentScale === 'year') {
      // Add years
      date.setFullYear(date.getFullYear() + colIndex);
    }

    // Return formatted as YYYY-MM-DD for the date input in the side panel
    return date.toISOString().split('T')[0];
  }

  openMenu(colIndex: number, row: TimelineRow, task?: WorkCenterTask) {
    const clickedDate = this.getDateFromColumn(colIndex);

    if (task) {
      // EDIT MODE: Pass existing task data
      this.menuService.open(task);
    } else {
      // CREATE MODE: Pass a skeleton object with the clicked date and work center
      const newOrder: any = {
        data: {
          orderName: '',
          status: 'open',
          startDate: clickedDate, // Pre-fill the date they clicked on
          workCenterId: row.id, // Pre-fill the row they clicked in
        },
      };
      this.menuService.open(newOrder);
    }
  }

  setHover(idx: number | null) {
    this.hoveredIndex = idx;
  }
}
