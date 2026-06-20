/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
  category: 'cabelo' | 'barba' | 'combo' | 'outros';
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  serviceId: string;
  professional: 'jean' | 'pedro' | 'qualquer';
  totalPrice: number;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}
