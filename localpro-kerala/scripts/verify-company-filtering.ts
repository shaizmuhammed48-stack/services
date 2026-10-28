/**
 * Verifies the company -> provider filtering and sorting used by the
 * /companies/[id] page against live data from the running dev server.
 *
 * Run from the project root (requires `npm run dev` on port 3000):
 *
 *   npx tsc scripts/verify-company-filtering.ts --outDir .verify-build --skipLibCheck --strict --module commonjs --target es2020 --moduleResolution node --esModuleInterop --lib es2020,dom
 *   node .verify-build/scripts/verify-company-filtering.js
 */

import type { Company, Provider } from "../lib/types";
import {
  distinctSorted,
  filterProvidersByCompany,
  findCompanyById,
  getField,
  getProviderCategory,
  getProviderDistrict,
  getProviderName,
  getProviderPrice,
  isProviderActive,
  matchesProviderFilters,
  sortProviders,
  str,
} from "../lib/utils/company-providers";

let passed = 0;
let failed = 0;

function check(label: string, condition: boolean, detail?: unknown) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failed++;
    console.log(`  ✗ ${label}${detail !== undefined ? ` — got: ${JSON.stringify(detail)}` : ""}`);
  }
}

function ids(list: Provider[]): string[] {
  return list.map((p) => str(p.id));
}

async function main() {
  const [companiesRes, providersRes] = await Promise.all([
    fetch("http://localhost:3000/api/companies"),
    fetch("http://localhost:3000/api/providers"),
  ]);
  const companiesPayload = await companiesRes.json();
  const providersPayload = await providersRes.json();

  if (!companiesPayload.success || !providersPayload.success) {
    throw new Error("Dev server APIs are not responding with success. Is `npm run dev` running?");
  }

  const companies: Company[] = companiesPayload.data;
  const providers: Provider[] = providersPayload.data;
  console.log(`\nLoaded ${companies.length} companies and ${providers.length} providers from the live API\n`);

  // --- 1. Company filtering (cross-checked against raw column access) ---
  console.log("1) Filter providers by company id");
  const rawCompanyOf = (p: Provider) =>
    String((p as Record<string, any>)["company id"] ?? "").trim().toLowerCase();

  const c001 = filterProvidersByCompany(providers, "C001");
  check("C001 returns only C001 providers", c001.length > 0 && c001.every((p) => rawCompanyOf(p) === "c001"), ids(c001));
  check(
    "C001 count matches independent raw scan",
    c001.length === providers.filter((p) => rawCompanyOf(p) === "c001").length,
    ids(c001)
  );

  const c002 = filterProvidersByCompany(providers, "C002");
  check("C002 returns exactly 3 providers (PR002, PR006, PR009)", JSON.stringify(ids(c002).sort()) === JSON.stringify(["PR002", "PR006", "PR009"]), ids(c002));
  check("C002 never contains C001/C003 providers", c002.every((p) => rawCompanyOf(p) === "c002"));

  const sloppy = filterProvidersByCompany(providers, " c001 ");
  check('Whitespace/case variant " c001 " matches C001 exactly', JSON.stringify(ids(sloppy)) === JSON.stringify(ids(c001)));

  // --- 2. Company lookup & not-found ---
  console.log("2) Company lookup / invalid ids");
  check("findCompanyById finds C001", findCompanyById(companies, "C001") !== null);
  check('findCompanyById handles "c001 " (case + space)', findCompanyById(companies, "c001 ") !== null);
  check("findCompanyById(C999) is not found", findCompanyById(companies, "C999") === null);
  check("findCompanyById('') is not found", findCompanyById(companies, "") === null);
  check("findCompanyById(whitespace) is not found", findCompanyById(companies, "   ") === null);

  // --- 3. Empty state: company with zero providers ---
  console.log("3) Company with zero providers");
  const emptyCompany = companies.find((c) => filterProvidersByCompany(providers, str(c.id)).length === 0);
  if (emptyCompany) {
    const found = findCompanyById(providers.length >= 0 ? companies : companies, str(emptyCompany.id));
    check(`Company ${str(found?.id ?? emptyCompany.id)} exists but has 0 providers`, found !== null && filterProvidersByCompany(providers, str(found!.id)).length === 0);
  } else {
    check("All companies have providers (empty-state not exercisable with current data)", true);
  }

  // --- 4. Default sort: active first, alphabetical within group ---
  console.log("4) Default sort (active first, then name A–Z)");
  const sortedDefault = sortProviders(providers, "default");
  const activeFlags = sortedDefault.map(isProviderActive);
  const firstInactive = activeFlags.findIndex((a) => !a);
  check("All active providers come before inactive ones", firstInactive === -1 || activeFlags.slice(firstInactive).every((a) => !a), activeFlags);
  const namesOf = (list: Provider[]) => list.map((p) => getProviderName(p));
  const activeNames = sortedDefault.filter(isProviderActive).map((p) => getProviderName(p).toLowerCase());
  check("Active group is alphabetical", JSON.stringify(activeNames) === JSON.stringify([...activeNames].sort()), namesOf(sortedDefault));
  const inactiveNames = sortedDefault.filter((p) => !isProviderActive(p)).map((p) => getProviderName(p).toLowerCase());
  check("Inactive group is alphabetical", JSON.stringify(inactiveNames) === JSON.stringify([...inactiveNames].sort()), inactiveNames);

  // Mixed-status company: C002 has active + inactive providers
  const c002Sorted = sortProviders(c002, "default");
  check("C002 sorted: inactive PR002 last", ids(c002Sorted)[ids(c002Sorted).length - 1] === "PR002", ids(c002Sorted));

  // --- 5. Sort by price (low → high, numeric) ---
  console.log("5) Sort by price");
  const c003 = filterProvidersByCompany(providers, "C003"); // PR003 (₹400) + PR008 (₹300), both active
  const byPrice = sortProviders(c003, "price");
  check("C003 by price: PR008 (300) before PR003 (400)", JSON.stringify(ids(byPrice)) === JSON.stringify(["PR008", "PR003"]), ids(byPrice));
  const syntheticPrices: Provider[] = [
    { id: "X1", name: "B", category: "c", district: "d", price: "₹1,200/hour" } as any,
    { id: "X2", name: "A", category: "c", district: "d", "price per hr": "" } as any,
    { id: "X3", name: "C", category: "c", district: "d", "price per hr": "50" } as any,
  ];
  const syntheticPriceSorted = sortProviders(syntheticPrices, "price");
  check("Numeric parse & nulls last (50, 1200, no price)", JSON.stringify(ids(syntheticPriceSorted)) === JSON.stringify(["X3", "X1", "X2"]), ids(syntheticPriceSorted));
  check('getProviderPrice("₹300/hour") === 300', getProviderPrice({ price: "₹300/hour" } as any) === 300);
  check("getProviderPrice(missing) === null", getProviderPrice({} as any) === null);

  // --- 6. Status handling (whitespace, casing) ---
  console.log("6) Status handling");
  check('PR001 status "active " (trailing space) counts as active', isProviderActive(providers.find((p) => str(p.id) === "PR001")!));
  check('synthetic " InActive " is inactive', !isProviderActive({ status: " InActive " } as any));
  check('synthetic active:"true" without status is active', isProviderActive({ active: "true" } as any));
  check("synthetic no status is inactive", !isProviderActive({} as any));

  // --- 7. Search / category / district filters (company-scoped) ---
  console.log("7) Search, category and district filters");
  const riyan = c001[0];
  check('search "RIYAN" matches "riyan r" (case-insensitive)', matchesProviderFilters(riyan, { search: "RIYAN" }));
  check(`search "riyan" does not match other companies providers`, !matchesProviderFilters(c002[0], { search: "riyan" }));
  check('category filter matches case-insensitively', matchesProviderFilters(riyan, { category: " AC Cleaner " }));
  check('category filter rejects other categories', !matchesProviderFilters(riyan, { category: "plumber" }));
  const ownDistrict = getProviderDistrict(riyan);
  check(
    "district filter matches case-insensitively (derived from live data)",
    ownDistrict.length > 0 &&
      matchesProviderFilters(riyan, { district: `  ${ownDistrict.toUpperCase()}  ` })
  );
  check('district filter rejects other districts', !matchesProviderFilters(riyan, { district: "ZZZ-Nowhere-District" }));
  const combined = sortProviders(
    c002.filter((p) => matchesProviderFilters(p, { search: "rah", category: "", district: "" })),
    "default"
  );
  check("Combined filters: C002 + search 'rah' → PR006 only", JSON.stringify(ids(combined)) === JSON.stringify(["PR006"]), ids(combined));

  // --- 8. Column-name safety ---
  console.log("8) Column-name normalization");
  check('getField({"Company ID": " C009 "}, "company id") → "C009"', getField({ "Company ID": " C009 " }, "company id") === "C009");
  check('getField({"company_id": "C002"}, "company id") → "C002"', getField({ company_id: "C002" }, "company id") === "C002");
  check("getField skips empty values", getField({ "company id": "   ", companyId: "C007" }, "company id", "companyId") === "C007");
  check("getField(missing) → empty string", getField(undefined, "company id") === "");
  check('distinctSorted dedupes case/space', JSON.stringify(distinctSorted(["Plumber", "plumber ", "Tutor", ""])) === JSON.stringify(["Plumber", "Tutor"]));

  // --- 9. Category sorting ---
  console.log("9) Sort by category");
  const byCategory = sortProviders(providers, "category");
  const categories = byCategory.map((p) => getProviderCategory(p).toLowerCase());
  const activeCategories = byCategory.filter(isProviderActive).map((p) => getProviderCategory(p).toLowerCase());
  check("Active group sorted by category", JSON.stringify(activeCategories) === JSON.stringify([...activeCategories].sort()), activeCategories);

  // --- Summary ---
  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) {
    throw new Error(`${failed} verification check(s) failed`);
  }
}

void main().catch((error) => {
  console.error(error);
  throw error;
});
