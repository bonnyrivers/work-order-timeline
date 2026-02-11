import { WorkCenterDocument, WorkOrderDocument } from './types';

export const CENTER_DATA: (WorkCenterDocument)[] = [
  // --- WORK CENTERS (10 ENTRIES) ---
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

export const ORDER_DATA: WorkOrderDocument[] = [
  // --- WORK ORDERS (90 ENTRIES - Sample Selection) ---
  { docId: 'wo-1', docType: 'workOrder', data: { name: 'Order #1001', workCenterId: 'wc-1', status: 'complete', startDate: '2025-01-05', endDate: '2025-02-10' } },
  { docId: 'wo-2', docType: 'workOrder', data: { name: 'Order #1002', workCenterId: 'wc-1', status: 'in-progress', startDate: '2025-02-15', endDate: '2025-03-20' } },
  { docId: 'wo-3', docType: 'workOrder', data: { name: 'Order #1003', workCenterId: 'wc-2', status: 'blocked', startDate: '2025-01-20', endDate: '2025-02-05' } },
  { docId: 'wo-4', docType: 'workOrder', data: { name: 'Order #1004', workCenterId: 'wc-3', status: 'open', startDate: '2025-03-01', endDate: '2025-04-15' } },
  { docId: 'wo-5', docType: 'workOrder', data: { name: 'Order #1005', workCenterId: 'wc-4', status: 'complete', startDate: '2025-01-10', endDate: '2025-01-25' } },
  { docId: 'wo-6', docType: 'workOrder', data: { name: 'Order #1006', workCenterId: 'wc-5', status: 'in-progress', startDate: '2025-04-10', endDate: '2025-06-01' } },
  { docId: 'wo-7', docType: 'workOrder', data: { name: 'Order #1007', workCenterId: 'wc-6', status: 'open', startDate: '2025-02-28', endDate: '2025-03-15' } },
  { docId: 'wo-8', docType: 'workOrder', data: { name: 'Order #1008', workCenterId: 'wc-7', status: 'blocked', startDate: '2025-05-20', endDate: '2025-07-10' } },
  { docId: 'wo-9', docType: 'workOrder', data: { name: 'Order #1009', workCenterId: 'wc-8', status: 'complete', startDate: '2025-01-02', endDate: '2025-01-20' } },
  { docId: 'wo-10', docType: 'workOrder', data: { name: 'Order #1010', workCenterId: 'wc-9', status: 'in-progress', startDate: '2025-08-15', endDate: '2025-10-30' } },
  { docId: 'wo-11', docType: 'workOrder', data: { name: 'Order #1011', workCenterId: 'wc-10', status: 'open', startDate: '2025-11-01', endDate: '2026-01-15' } },
  { docId: 'wo-12', docType: 'workOrder', data: { name: 'Order #1012', workCenterId: 'wc-1', status: 'complete', startDate: '2025-06-01', endDate: '2025-06-15' } },
  { docId: 'wo-13', docType: 'workOrder', data: { name: 'Order #1013', workCenterId: 'wc-2', status: 'in-progress', startDate: '2025-07-20', endDate: '2025-09-05' } },
  { docId: 'wo-14', docType: 'workOrder', data: { name: 'Order #1014', workCenterId: 'wc-3', status: 'blocked', startDate: '2025-02-10', endDate: '2025-03-01' } },
  { docId: 'wo-15', docType: 'workOrder', data: { name: 'Order #1015', workCenterId: 'wc-4', status: 'open', startDate: '2025-12-01', endDate: '2026-02-20' } },
];