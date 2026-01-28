const fs = require("fs");

const p = "views/WelcomeView.tsx";
let s = fs.readFileSync(p, "utf8");

const inputClass = "w-full max-w-md rounded-xl bg-zinc-900 text-white placeholder-zinc-400 border border-zinc-700 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30";
const btnClass   = "mt-4 w-full max-w-md rounded-xl bg-emerald-500 text-black font-semibold py-3 hover:opacity-90 active:opacity-80 transition";

let changed = false;

// Troca className do primeiro <input ... className="...">
s = s.replace(/<input([^>]*?)className="([^"]*?)"([^>]*)>/g, (m, a, old, b) => {
  changed = true;
  return `<input${a}className="${inputClass}"${b}>`;
});

// Troca className de botões
s = s.replace(/<button([^>]*?)className="([^"]*?)"([^>]*)>/g, (m, a, old, b) => {
  changed = true;
  return `<button${a}className="${btnClass}"${b}>`;
});

fs.writeFileSync(p, s, "utf8");
console.log(changed ? "OK: WelcomeView.tsx estilizado (input/botão)" : "AVISO: não achei <input>/<button> com className para trocar.");
