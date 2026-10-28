import type { Provider, Company } from "../types";

/**
 * Helpers for reading and filtering Google Sheets rows coming from the
 * Apps Script API. Sheet column names vary in spacing, casing and
 * ("company id" vs "companyId" vs "company_id"), so every field read goes
 * through a normalized lookup and every value is trimmed before use.
 */

/** Trimmed string for a value; "" for null/undefined. */
export function str(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

/** Normalize a column name: lowercase, no spaces/underscores. */
function normKey(key: string): string {
  return key.toLowerCase().replace(/[\s_]/g, "");
}

/**
 * Read a field from a spreadsheet row using any of the given column-name
 * variants. Comparison ignores casing, spaces and underscores, and the
 * first non-empty matching value wins.
 */
export function getField(
  record: Record<string, any> | null | undefined,
  ...candidates: string[]
): string {
  if (!record) return "";
  const entries = Object.entries(record);
  for (const candidate of candidates) {
    const target = normKey(candidate);
    for (const [key, value] of entries) {
      if (normKey(key) === target) {
        const v = str(value);
        if (v !== "") return v;
      }
    }
  }
  return "";
}

/* ------------------------------ Providers ------------------------------ */

export function getProviderName(provider: Provider): string {
  return getField(provider, "name", "provider name");
}

export function getProviderCategory(provider: Provider): string {
  return getField(provider, "category", "service category", "service");
}

export function getProviderDistrict(provider: Provider): string {
  return getField(provider, "district", "town", "location");
}

export function getProviderImage(provider: Provider): string {
  return getField(
    provider,
    "img url",
    "image url",
    "imageUrl",
    "imgUrl",
    "profile image",
    "avatar"
  );
}

export function getProviderCompanyId(provider: Provider): string {
  return getField(provider, "company id", "companyId", "company_id", "company");
}

export function getProviderStatus(provider: Provider): string {
  const status = getField(provider, "status", "availability");
  if (status) return status;
  const active = getField(provider, "active");
  if (["true", "1", "yes"].includes(active.toLowerCase())) return "active";
  return "";
}

export function isProviderActive(provider: Provider): boolean {
  return getProviderStatus(provider).toLowerCase() === "active";
}

/** Numeric hourly price (e.g. "₹300/hour" -> 300), or null when unknown. */
export function getProviderPrice(provider: Provider): number | null {
  const raw = getField(
    provider,
    "price per hr",
    "price per hour",
    "pricePerHr",
    "price_per_hr",
    "hourly rate",
    "price"
  );
  if (!raw) return null;
  const num = parseFloat(raw.replace(/[^\d.]/g, ""));
  return Number.isFinite(num) ? num : null;
}

export function getProviderContact(provider: Provider): string {
  return getField(provider, "contact", "phone", "phone number", "mobile");
}

/**
 * Keep only providers belonging to the given company. Matching is
 * case-insensitive and whitespace-safe on both sides.
 */
export function filterProvidersByCompany(
  providers: Provider[],
  companyId: string
): Provider[] {
  const target = str(companyId).toLowerCase();
  if (!target) return [];
  return providers.filter(
    (provider) => getProviderCompanyId(provider).toLowerCase() === target
  );
}

export interface ProviderFilterState {
  search?: string;
  category?: string;
  district?: string;
}

/** Apply search + category + district filters (already company-scoped). */
export function matchesProviderFilters(
  provider: Provider,
  filters: ProviderFilterState
): boolean {
  const search = str(filters.search).toLowerCase();
  if (search && !getProviderName(provider).toLowerCase().includes(search)) {
    return false;
  }
  const category = str(filters.category).toLowerCase();
  if (category && getProviderCategory(provider).toLowerCase() !== category) {
    return false;
  }
  const district = str(filters.district).toLowerCase();
  if (district && getProviderDistrict(provider).toLowerCase() !== district) {
    return false;
  }
  return true;
}

export type ProviderSortKey = "default" | "name" | "price" | "category";

const collator = new Intl.Collator("en", { sensitivity: "base" });

/**
 * Sort providers: active providers always come first (status grouping is
 * the primary key), then by the selected key within each status group —
 * "default"/"name": alphabetical by name, "price": hourly price low to
 * high, "category": alphabetical by category then name.
 */
export function sortProviders(
  providers: Provider[],
  key: ProviderSortKey = "default"
): Provider[] {
  const statusRank = (p: Provider) => (isProviderActive(p) ? 0 : 1);
  return [...providers].sort((a, b) => {
    const rank = statusRank(a) - statusRank(b);
    if (rank !== 0) return rank;
    if (key === "price") {
      const pa = getProviderPrice(a);
      const pb = getProviderPrice(b);
      if (pa !== null && pb !== null && pa !== pb) return pa - pb;
      if (pa !== null && pb === null) return -1;
      if (pa === null && pb !== null) return 1;
      return collator.compare(getProviderName(a), getProviderName(b));
    }
    if (key === "category") {
      const byCategory = collator.compare(
        getProviderCategory(a),
        getProviderCategory(b)
      );
      if (byCategory !== 0) return byCategory;
    }
    return collator.compare(getProviderName(a), getProviderName(b));
  });
}

/** Unique, trimmed, alphabetically sorted values for filter dropdowns. */
export function distinctSorted(values: string[]): string[] {
  const seen = new Map<string, string>();
  for (const value of values) {
    const trimmed = str(value);
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (!seen.has(key)) seen.set(key, trimmed);
  }
  return [...seen.values()].sort((a, b) => collator.compare(a, b));
}

/* ------------------------------ Companies ------------------------------ */

export function getCompanyName(company: Company): string {
  return getField(company, "company name", "companyName", "name");
}

export function getCompanyImage(company: Company): string {
  return getField(
    company,
    "image url",
    "imageUrl",
    "img url",
    "imgUrl",
    "logo"
  );
}

export function getCompanyTown(company: Company): string {
  return getField(company, "town", "location", "district");
}

export function getCompanyContact(company: Company): string {
  return getField(
    company,
    "contact",
    "contact number",
    "phone",
    "phone number",
    "mobile"
  );
}

/** Find a company by id (whitespace- and case-insensitive), or null. */
export function findCompanyById(
  companies: Company[],
  companyId: string
): Company | null {
  const target = str(companyId).toLowerCase();
  if (!target) return null;
  return (
    companies.find(
      (company) =>
        getField(company, "id", "company id", "companyId").toLowerCase() ===
        target
    ) ?? null
  );
}
