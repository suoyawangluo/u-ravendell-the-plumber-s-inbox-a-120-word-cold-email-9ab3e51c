import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EMAIL = `Subject: Bookkeeping for your plumbing firm

Morning. You're out the door before 7, squeezing emergency call-outs between jobs, then doing invoices and receipts late at night. We built our bookkeeping for a two-van firm with weeks like yours.

We take the paperwork off your evenings. We log every job and receipt, chase unpaid invoices, and file your VAT and tax returns. We already do this for 40 plumbing firms, and their invoices get paid 9 days faster on average.

First month is £49, no contract. After setup, most plumbers spend 15 minutes a month with us.

Want a look? Reply "yes" and I'll send a one-page summary of what we'd take over. No call needed.

Thanks,
Maya
ClearLedger Bookkeeping`;

const OUT = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, EMAIL, "utf8");

const back = readFileSync(OUT, "utf8");
if (back !== EMAIL) throw new Error("round-trip mismatch");
if (back.length < 1 || back.length > 800) {
  throw new Error(`gate failed: ${back.length} characters, need 1-800`);
}
if (back.trim().length === 0) throw new Error("gate failed: blank entry");
const words = back.split(/\s+/).filter(Boolean).length;
if (words < 100 || words > 140) {
  throw new Error(`word count failed: ${words} words, need ~120 (100-140)`);
}
if (!back.startsWith("Subject:")) {
  throw new Error("subject line missing");
}

console.log(`OK: ${back.length} characters, ${words} words`);
