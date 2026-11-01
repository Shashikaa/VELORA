import { spawn } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
// Accept the conventional host/port flags used by both local and managed previews.
const input = process.argv.slice(2),
  args = ["dev", "--webpack"];
for (let i = 0; i < input.length; i++) {
  if (input[i] === "--host" || input[i] === "--hostname")
    args.push("--hostname", input[++i]);
  else if (input[i] === "--port" || input[i] === "-p")
    args.push("--port", input[++i]);
  else if (input[i] !== "--strictPort") args.push(input[i]);
}
const child = spawn(
  process.execPath,
  [require.resolve("next/dist/bin/next"), ...args],
  { stdio: "inherit" },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 0));
