import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ORDERS } from '../data';
import { WorkOrderDocument } from '../types';

export interface MenuState {
  isOpen: boolean;
  data?: WorkOrderDocument;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuState = new BehaviorSubject<MenuState>({ isOpen: false });
  state$ = this.menuState.asObservable();

  // Update existing order if it exists
  // Create new order if it does not
  submit(data?: WorkOrderDocument, workOrderId?: string) {
    if (data) {
      let orderIndex = ORDERS.findIndex((o) => o.docId === workOrderId);
      if (orderIndex && this.menuState.value.data) {
        ORDERS[orderIndex] = this.menuState.value.data;
      }
      this.close();
    } else {
      if (this.menuState.value.data) {
        ORDERS.push({ ...this.menuState.value.data, docId: 'example' });
      }
    }
  }

  open(data: Partial<MenuState>) {
    this.menuState.next({ isOpen: true, ...data });
  }

  close() {
    this.menuState.next({ isOpen: false });
  }
}
