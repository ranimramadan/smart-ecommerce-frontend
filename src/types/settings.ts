import type { Id, Timestamps } from "./common";

export interface Setting extends Timestamps {
  id?: Id;
  key: string;    // "general.store_name"
  value: string | number | boolean | null;
}

export type SettingsMap = Record<string, string | number | boolean | null>;

export interface PublicSettings {
  store_name?: string;
  store_logo_url?: string | null;
  currency?: string;
  contact_email?: string | null;
  
}
