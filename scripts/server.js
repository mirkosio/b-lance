/* Wrapper Node per avviere/fermare il backend Python di B-Lance.
 *
 * Perché Node qui? Perché è comodo: `npm start`, `npm stop`, `npm test`.
 * Sotto gira comunque uvicorn (Python) — Node fa da pulsante.
 *
 * Uso del PID file (stabile, niente pgrep che si matcha da solo):
 *  - start  -> lancia uvicorn in background, salva il pid
 *  - stop   -> legge il pid, lo uccide, pulisce
 *  - status -> dice se gira
 */

import { spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, unlinkSync, openSync, closeSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const PID_FILE = resolve(ROOT, ".server.pid");
const LOG_FILE = resolve(ROOT, ".server.log");
const PORT = process.env.PORT || "8125";
const VENV_PY = resolve(ROOT, ".venv", "bin", "python");

// Uso il python del venv se c'è, altrimenti quello di sistema.
const PY = existsSync(VENV_PY) ? VENV_PY : "python3";

function readPid() {
  if (!existsSync(PID_FILE)) return null;
  const pid = parseInt(readFileSync(PID_FILE, "utf8").trim(), 10);
  return Number.isFinite(pid) ? pid : null;
}

function isRunning(pid) {
  try {
    process.kill(pid, 0); // solo check, non manda segnali
    return true;
  } catch {
    return false;
  }
}

function cleanPidFile() {
  if (existsSync(PID_FILE)) unlinkSync(PID_FILE);
}

function waitHealthy(timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolveWait) => {
    const tick = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:${PORT}/health`, {
          signal: AbortSignal.timeout(1500),
        });
        if (res.ok) return resolveWait(true);
      } catch {
        /* non ancora su */
      }
      if (Date.now() - start > timeoutMs) return resolveWait(false);
      setTimeout(tick, 400);
    };
    tick();
  });
}

async function start() {
  const existing = readPid();
  if (existing && isRunning(existing)) {
    console.log(`B-Lance già attivo (pid ${existing}) su http://127.0.0.1:${PORT}`);
    return;
  }
  cleanPidFile();

  const logFd = openSync(LOG_FILE, "a");
  const child = spawn(
    PY,
    ["-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", PORT],
    { cwd: ROOT, detached: true, stdio: ["ignore", logFd, logFd] }
  );
  child.unref();
  closeSync(logFd); // il figlio ha la sua copia; io chiudo la mia

  writeFileSync(PID_FILE, String(child.pid));
  process.stdout.write(`Avvio B-Lance (pid ${child.pid})... `);

  const ok = await waitHealthy();
  if (ok) {
    console.log(`pronto!\n  -> http://127.0.0.1:${PORT}`);
  } else {
    console.log(`\nAvviato ma health check in timeout. Controlla ${LOG_FILE}`);
  }
}

function stop() {
  const pid = readPid();
  if (!pid || !isRunning(pid)) {
    cleanPidFile();
    console.log("Nessun server attivo.");
    return;
  }
  try {
    process.kill(pid, "SIGTERM");
  } catch {
    /* ignora */
  }
  // Piccola attesa, poi SIGKILL se resta lì.
  setTimeout(() => {
    if (isRunning(pid)) {
      try {
        process.kill(pid, "SIGKILL");
      } catch {
        /* ignora */
      }
    }
    cleanPidFile();
    console.log(`B-Lance fermato (pid ${pid}).`);
  }, 800);
}

function status() {
  const pid = readPid();
  if (pid && isRunning(pid)) {
    console.log(`Attivo (pid ${pid}) su http://127.0.0.1:${PORT}`);
  } else {
    cleanPidFile();
    console.log("Fermo.");
  }
}

async function dev() {
  // In foreground con --reload: utile per sviluppo (Ctrl+C per uscire).
  const child = spawn(
    PY,
    ["-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", PORT, "--reload"],
    { cwd: ROOT, stdio: "inherit" }
  );
  child.on("exit", (code) => process.exit(code ?? 0));
}

const cmd = process.argv[2];
if (cmd === "start") await start();
else if (cmd === "stop") stop();
else if (cmd === "restart") {
  stop();
  setTimeout(start, 1000);
} else if (cmd === "status") status();
else if (cmd === "dev") await dev();
else {
  console.log("Comandi: start | stop | restart | status | dev");
  process.exit(1);
}
