import type { Id, ISODate, Timestamps, Paginated } from "./common";

export type InvoiceStatus = "draft" | "issued" | "paid" | "void";

export interface InvoiceItem {
  sku?: string | null;
  name: string;
  qty: number;
  unit_price: number;
  total: number;
}

export interface Invoice extends Timestamps {
  id: Id;
  order_id: Id;
  number?: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax_total?: number;
  grand_total: number;
  currency?: string;
  issued_at?: ISODate | null;
  pdf_url?: string | null;
  public_url?: string | null;
}

export type InvoicesResponse = Paginated<Invoice>;
export type InvoiceResponse = Invoice;
