const fs = require("fs");

const htmlFiles = fs.readdirSync(".").filter(f => f.endsWith(".html") && !f.startsWith("veri-mimari-premium"));

const additionalCSS = `
.menu-toggle{display:none;background:none;border:1px solid var(--line);border-radius:5px;padding:6px 10px;font:11px "DM Mono";cursor:pointer;color:var(--ink)}
.nav.open{display:flex!important;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:var(--bg);border-bottom:1px solid var(--line);padding:16px 20px;gap:14px;z-index:100;box-shadow:0 8px 24px rgba(0,0,0,.08)}
.btn:hover{opacity:.88;transform:translateY(-1px);transition:all .15s ease}
.btn.alt:hover{background:#f5f5f3;border-color:#bbb}
.card:hover{border-color:#bbb;box-shadow:0 4px 16px rgba(0,0,0,.06);transition:all .2s ease}
.link:hover{color:var(--blue)}
.filter:hover{border-color:#999}
.feature:hover{background:#222;transition:background .2s ease}
.card,.btn,.filter,.feature{transition:all .2s ease}
.btn:focus-visible,.nav a:focus-visible,.link:focus-visible,.filter:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
html{scroll-behavior:smooth}
@media(max-width:760px){.menu-toggle{display:block}.header .btn{display:none}.header{position:relative}}
`;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  // 1. Inject additional CSS before </style>
  if (!content.includes(".menu-toggle")) {
    content = content.replace("</style>", additionalCSS + "</style>");
    changed = true;
  }

  // 2. Add mobile menu toggle button before </header>
  if (!content.includes("menu-toggle")) {
    const menuBtn = '<button class="menu-toggle" onclick="this.parentElement.querySelector(\'.nav\').classList.toggle(\'open\')" aria-label="Menü">&#9776; Menü</button>';
    content = content.replace("</header>", menuBtn + "</header>");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    console.log("Improved: " + file);
  }
}

console.log("\nDone.");
