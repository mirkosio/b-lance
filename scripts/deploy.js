/* Avvia il deploy su Render senza aprire il dashboard.
 *
 * Come si usa:  npm run deploy   (fa git push + trigger del deploy)
 *
 * Serve una volta sola l'URL dell'hook:
 *  1. Render -> il tuo servizio -> Settings -> Build & Deploy -> Deploy Hooks
 *  2. Create hook (branch: main) -> copia l'URL
 *  3. Incollalo nel file .deploy-hook (gitignorato) oppure nell'env RENDER_DEPLOY_HOOK
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const hookFile = resolve(ROOT, ".deploy-hook");

let url = process.env.RENDER_DEPLOY_HOOK;
if (!url && existsSync(hookFile)) {
  url = readFileSync(hookFile, "utf8").trim();
}

if (!url) {
  console.log("Manca l'URL dell'hook di Render.");
  console.log("");
  console.log("1. Vai su Render -> il tuo servizio -> Settings -> Build & Deploy");
  console.log("   -> Deploy Hooks -> Create (branch main)");
  console.log("2. Copia l'URL e incollalo in un file chiamato .deploy-hook");
  console.log("   nella root del progetto (non viene pushed su GitHub).");
  process.exit(1);
}

try {
  const res = await fetch(url, { method: "POST" });
  if (res.ok) {
    console.log("Deploy avviato su Render. Guarda il tab Deploys (~1 minuto).");
  } else {
    console.log(`Errore ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
} catch (err) {
  console.log(`Non riesco a contattare Render: ${err.message}`);
  process.exit(1);
}
