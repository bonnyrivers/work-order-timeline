import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MenuService, MenuState } from '../../services/menu-service';
import { WorkOrderStatus } from '../../types';

@Component({
  selector: 'app-popout-menu-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './popout-menu-component.html',
  styleUrl: './popout-menu-component.scss',
})
export class PopoutMenuComponent implements OnInit, OnDestroy {
  workOrderForm: FormGroup;
  state?: MenuState;
  statusOptions: WorkOrderStatus[] = ['open', 'in-progress', 'complete', 'blocked'];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
  ) {
    // Initialize the form structure
    this.workOrderForm = this.fb.group({
      orderName: ['', Validators.required],
      status: ['open'],
      startDate: [''],
    });
  }

  ngOnInit() {
    this.menuService.state$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.state = state;
      if (state.isOpen && state.data) {
        // Fill form with data from service when menu opens
        this.workOrderForm.patchValue({
          orderName: state.data.data.name,
          status: state.data.data.status,
          startDate: state.data.data.startDate,
        });
      }
    });
  }

  onCancel() {
    this.menuService.close();
  }

  onCreate() {
    if (this.workOrderForm.valid) {
      // Merge form values back into the data object
      const updatedData = { ...this.state?.data, ...this.workOrderForm.value };
      this.menuService.submit(updatedData);
      this.menuService.close();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
