import type { Id, Timestamps, Paginated } from "./common";

export interface ShippingCarrier extends Timestamps {
  id: Id;
  name: string;
  code: string; // "dhl" | "aramex" ...
  active?: boolean;
}

export interface ShippingRate extends Timestamps {
  id: Id;
  carrier_id: Id;
  name: string;
  price: number;
  currency?: string;
  min_weight?: number | null;
  max_weight?: number | null;
  zone_id?: Id | null;
}

export interface ShippingZone extends Timestamps {
  id: Id;
  name: string;
  regions?: ShippingRegion[];
}

export interface ShippingRegion {
  id?: Id;
  country?: string; // ISO code like "SA", "EG", "JO"
  state?: string | null;
  city?: string | null;
}

export interface ShippingQuoteRequest {
  destination_country: string;
  destination_city?: string;
  weight?: number; // kg
  subtotal?: number;
}

export interface ShippingQuote {
  carrier: string;
  service: string;
  price: number;
  currency?: string;
  eta_days_min?: number | null;
  eta_days_max?: number | null;
}

export type ShippingQuotesResponse = ShippingQuote[];

// تتبع عام برقم
export interface TrackRequest { tracking_number: string; }
export interface TrackEvent {
  time: string;
  status: string;
  location?: string | null;
}
export interface TrackResponse {
  tracking_number: string;
  carrier?: string | null;
  events: TrackEvent[];
}

// lists
export type ShippingCarriersResponse = Paginated<ShippingCarrier>;
export type ShippingRatesResponse = Paginated<ShippingRate>;
export type ShippingZonesResponse = Paginated<ShippingZone>;
