import net from "node:net";
import { spawn, type ChildProcess } from "node:child_process";

/** Réserve un port libre : évite de tomber sur un serveur zombie d'un run précédent. */
function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      if (typeof addr === "object" && addr) {
        const { port } = addr;
        srv.close(() => resolve(port));
      } else {
        srv.close(() => reject(new Error("port indisponible")));
      }
    });
  });
}

/** Démarre `next start` sur un port libre et attend qu'il réponde. */
export async function startServer(): Promise<{ url: string; stop: () => void }> {
  const port = await freePort();
  const child: ChildProcess = spawn("npx", ["next", "start", "-p", String(port)], {
    stdio: ["ignore", "ignore", "pipe"],
    detached: true,
  });

  // Le serveur Next se relance dans un process fils : on tue tout le groupe.
  const stop = () => {
    try {
      if (child.pid) process.kill(-child.pid, "SIGKILL");
    } catch {
      child.kill("SIGKILL");
    }
  };

  let stderr = "";
  child.stderr?.on("data", (d: Buffer) => { stderr += d.toString(); });

  const url = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) break;
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (res.status < 500) return { url, stop };
    } catch {
      /* pas encore prêt */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  stop();
  throw new Error(
    `[cv] Le serveur n'a pas démarré sur ${url}. Lancez d'abord \`npm run build\`.\n${stderr.slice(-2000)}`,
  );
}
