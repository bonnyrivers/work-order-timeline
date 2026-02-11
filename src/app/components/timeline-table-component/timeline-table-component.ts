import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CENTER_DATA, ORDER_DATA } from '../../data';
import { WorkCenterDocument, WorkOrderDocument } from '../../types';

@Component({
  selector: 'app-timeline-table-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './timeline-table-component.html',
  styleUrl: './timeline-table-component.scss',
})
export class TimelineTableComponent {
  dataColWidth = '250px';
  currentScale: 'month' | 'year' = 'month';
  centers = CENTER_DATA;

  // Define the viewport range for the timeline
  viewRange = {
    months: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
    years: ['2024', '2025', '2026'],
  };

  get headers() {
    return this.currentScale === 'month' ? this.viewRange.months : this.viewRange.years;
  }

  get rows() {
    const centers = CENTER_DATA;
    const orders = ORDER_DATA;

    return centers.map((wc) => ({
      name: wc.data.name,
      tasks: orders
        .filter((wo) => wo.data.workCenterId === wc.docId)
        .map((wo) => this.mapOrderToTask(wo)),
    }));
  }

  private mapOrderToTask(wo: WorkOrderDocument) {
    const start = new Date(wo.data.startDate);
    const end = new Date(wo.data.endDate);

    // Logic to find which grid column the order starts in
    // For simplicity, this assumes the order starts in 2025
    const startIdx = this.currentScale === 'month' ? start.getMonth() : start.getFullYear() - 2024;

    // Calculate how many columns it spans
    const dayDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const span = this.currentScale === 'month' ? Math.max(1, Math.ceil(dayDiff / 30)) : 1;

    return {
      name: wo.data.name,
      status: wo.data.status,
      startIdx,
      span,
    };
  }
}
