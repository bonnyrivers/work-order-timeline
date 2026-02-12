import { WorkCenterDocument, WorkOrderDocument } from './types';

export const CENTERS: WorkCenterDocument[] = [
  // --- WORK CENTERS ---
  { docId: 'wc-1', docType: 'workCenter', data: { name: 'Genesis Hardware' } },
  { docId: 'wc-2', docType: 'workCenter', data: { name: 'Rodriques Electrics' } },
  { docId: 'wc-3', docType: 'workCenter', data: { name: 'Konsulting Inc' } },
  { docId: 'wc-4', docType: 'workCenter', data: { name: 'McMarrow Distribution' } },
  { docId: 'wc-5', docType: 'workCenter', data: { name: 'Spartan Manufacturing' } },
  { docId: 'wc-6', docType: 'workCenter', data: { name: 'Apex Logistics' } },
  { docId: 'wc-7', docType: 'workCenter', data: { name: 'Solaris Energy' } },
  { docId: 'wc-8', docType: 'workCenter', data: { name: 'Titan Foundry' } },
  { docId: 'wc-9', docType: 'workCenter', data: { name: 'Nova Assembly' } },
  { docId: 'wc-10', docType: 'workCenter', data: { name: 'Quantum Lab' } },
];
// --- WORK ORDERS (Sample Selection) ---

export const ORDERS: WorkOrderDocument[] = [
  // Work Center 1: Multiple tasks to test sequence
  {
    docId: 'wo-1',
    docType: 'workOrder',
    data: {
      name: 'Order #2001',
      workCenterId: 'wc-1',
      status: 'complete',
      startDate: '2025-12-15',
      endDate: '2026-01-10',
    },
  },
  {
    docId: 'wo-2',
    docType: 'workOrder',
    data: {
      name: 'Order #2002',
      workCenterId: 'wc-1',
      status: 'in-progress',
      startDate: '2026-01-15',
      endDate: '2026-02-20',
    },
  },

  // Work Center 2: Blocked task
  {
    docId: 'wo-3',
    docType: 'workOrder',
    data: {
      name: 'Order #2003',
      workCenterId: 'wc-2',
      status: 'blocked',
      startDate: '2026-01-20',
      endDate: '2026-02-05',
    },
  },

  // Work Center 3: Long duration (spanning multiple months/years)
  {
    docId: 'wo-4',
    docType: 'workOrder',
    data: {
      name: 'Large Project A',
      workCenterId: 'wc-3',
      status: 'in-progress',
      startDate: '2026-01-01',
      endDate: '2026-06-30',
    },
  },

  // Work Center 4: Future tasks
  {
    docId: 'wo-5',
    docType: 'workOrder',
    data: {
      name: 'Q2 Inventory',
      workCenterId: 'wc-4',
      status: 'open',
      startDate: '2026-04-01',
      endDate: '2026-04-15',
    },
  },

  // Work Center 5: Short task
  {
    docId: 'wo-6',
    docType: 'workOrder',
    data: {
      name: 'Rapid Check',
      workCenterId: 'wc-5',
      status: 'complete',
      startDate: '2026-02-01',
      endDate: '2026-02-03',
    },
  },

  // Work Center 6: Overlapping same start date
  {
    docId: 'wo-7',
    docType: 'workOrder',
    data: {
      name: 'Logistics Alpha',
      workCenterId: 'wc-6',
      status: 'open',
      startDate: '2026-03-10',
      endDate: '2026-03-25',
    },
  },
  {
    docId: 'wo-8',
    docType: 'workOrder',
    data: {
      name: 'Logistics Beta',
      workCenterId: 'wc-6',
      status: 'in-progress',
      startDate: '2026-03-10',
      endDate: '2026-04-05',
    },
  },

  // Work Center 7: Energy Audit
  {
    docId: 'wo-9',
    docType: 'workOrder',
    data: {
      name: 'Grid Analysis',
      workCenterId: 'wc-7',
      status: 'blocked',
      startDate: '2026-01-10',
      endDate: '2026-01-25',
    },
  },

  // Work Center 10: Year-end Wrap up
  {
    docId: 'wo-10',
    docType: 'workOrder',
    data: {
      name: 'Lab Clean up',
      workCenterId: 'wc-10',
      status: 'complete',
      startDate: '2025-12-28',
      endDate: '2026-01-05',
    },
  },
];
