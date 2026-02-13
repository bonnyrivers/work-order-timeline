import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ORDERS } from '../data';
import { WorkOrderDocument } from '../types';

export interface MenuState {
  isOpen: boolean;
  data?: WorkOrderDocument;
}

// Handles data and updating of data coming from the Popout menu component
// Adds new work orders to the data set
@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuState = new BehaviorSubject<MenuState>({
    isOpen: false,
    data: undefined,
  });
  state$ = this.menuState.asObservable();

  submit(updatedData: WorkOrderDocument) {
    if (updatedData.docId) {
      const index = ORDERS.findIndex((o) => o.docId === updatedData.docId);
      if (index !== -1) {
        // updating previous index
        ORDERS[index] = updatedData;
      }
    } else {
      // pushing new order
      ORDERS.push({ ...updatedData });
    }
    this.close();
  }

  open(data?: WorkOrderDocument) {
    if (data) {
      this.menuState.next({ data, isOpen: true });
    }
  }

  close() {
    this.menuState.next({ isOpen: false, data: undefined });
  }
}
