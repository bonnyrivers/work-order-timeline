import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkOrderStatus } from '../../types';
import { MenuService, MenuState } from '../../services/menu-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popout-menu-component',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './popout-menu-component.html',
  styleUrl: './popout-menu-component.scss',
})
export class PopoutMenuComponent {
  state?: MenuState;
  statusOptions: WorkOrderStatus[] = ['open', 'in-progress', 'complete', 'blocked'];

  constructor(private menuSerivce: MenuService) {}

  ngOnInit() {
    // Sync local state with service
    this.menuSerivce.state$.subscribe((s) => (this.state = s));
  }

  onCancel() {
    this.menuSerivce.close();
  }

  onCreate() {
    this.menuSerivce.submit(this.state?.data);
  }
}
