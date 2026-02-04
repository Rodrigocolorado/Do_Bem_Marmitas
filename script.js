// Do Bem Marmitas - JS simples (sem frameworks)

const WHATSAPP_NUMBER = "5551991338688"; // DDI+DDD+Número (sem espaços)
const WHATSAPP_DISPLAY = "(51) 99133-8688"; // formato humano (opcional)

const menuItems = [
  {
    title: "Panqueca de espinafre (bolonhesa)",
    desc: "Panqueca de espinafre recheada de bolonhesa de carne e ervilha + batata rústica + lâminas de cenoura.",
    img: "assets/img/panqueca-espinafre.jpeg",
    tags: ["Sem industrializados", "Nutritiva"],
  },
  {
    title: "Strogonoff de frango",
    desc: "Strogonoff de frango cremoso + arroz negro + brócolis selado.",
    img: "assets/img/strogonoff.jpeg",
    tags: ["Equilibrada", "Proteína"],
  },
  {
    title: "Tilápia com crosta de coco",
    desc: "Filé de tilápia assada com crosta de coco e raspas de limão + arroz colorido.",
    img: "assets/img/tilapia.jpeg",
    tags: ["Leve", "Saborosa"],
  },
  {
    title: "Carne de panela desfiada",
    desc: "Carne de panela desfiada + chuchu à moda mineira + purê de abóbora cabotiá.",
    img: "assets/img/carne-panela.jpeg",
    tags: ["Caseira", "Conforto"],
  },
  {
    title: "Frango desfiado cremoso",
    desc: "Frango desfiado cremoso + purê de batata doce + espaguete de abobrinha.",
    img: "assets/img/frango-batata-doce.jpeg",
    tags: ["Sem lactose", "Low carb"],
  },
  {
    title: "Frango xadrez sem shoyo",
    desc: "Frango xadrez sem shoyo + arroz vermelho + legumes + sementes.",
    img: "assets/img/frango-xadrez.jpeg",
    tags: ["Sem glúten", "Colorida"],
  },
  {
    title: "Iscas de patinho ao molho",
    desc: "Iscas de patinho ao molho à moda Do Bem + aipim com ervas finas + brócolis ramoso e tomatinho cereja.",
    img: "assets/img/iscas-patinho.jpeg",
    tags: ["Premium", "Alta proteína"],
  },
];

// =========================
// Helpers
// =========================
function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

// =========================
// Render Cardápio
// =========================
function renderMenu() {
  const grid = qs("#menuGrid");
  if (!grid) return;

  grid.innerHTML = menuItems
    .map((it) => {
      const tags = (it.tags || [])
        .map((t) => `<span class="tag">${t}</span>`)
        .join("");

      const msg = `Olá! Quero pedir a marmita: ${it.title}.`;

      return `
        <article class="card">
          <div class="thumb">
            <img src="${it.img}" alt="${it.title}" loading="lazy" decoding="async" />
          </div>

          <div class="content">
            <h3>${it.title}</h3>
            <p>${it.desc}</p>
            <div class="tags">${tags}</div>
          </div>

          <div class="bottom">
            <div class="price">
              <small>Pedido rápido</small>
              <span>WhatsApp</span>
            </div>

            <a class="btn primary" href="${waLink(msg)}" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden="true">
                <path fill="#063013" d="M19.11 17.78c-.28-.14-1.64-.8-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.72.9-.88 1.08-.16.18-.32.2-.6.06-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.48-.06-.14-.62-1.5-.85-2.06-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.06-.73.34-.25.28-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.85.14.18 1.95 2.98 4.72 4.17.66.28 1.17.45 1.57.58.66.21 1.27.18 1.75.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/>
                <path fill="#063013" d="M26.65 5.35C24.04 2.74 20.56 1.3 16.87 1.3 9.23 1.3 3.03 7.5 3.03 15.14c0 2.44.64 4.82 1.86 6.91L3 30.7l8.9-1.84c2.03 1.11 4.32 1.69 6.66 1.69h.01c7.64 0 13.84-6.2 13.84-13.84 0-3.69-1.44-7.17-4.06-9.78zM16.88 28.16h-.01c-2.08 0-4.12-.56-5.9-1.63l-.42-.25-5.28 1.09 1.12-5.15-.27-.53c-1.13-1.8-1.73-3.88-1.73-6.03 0-6.33 5.15-11.48 11.48-11.48 3.07 0 5.95 1.2 8.12 3.36 2.17 2.17 3.36 5.05 3.36 8.12 0 6.33-5.15 11.48-11.48 11.48z"/>
              </svg>
              Pedir
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

// =========================
// Contato -> WhatsApp
// =========================
function handleContact() {
  const form = qs("#contactForm");

  // se você usar data-wa-phone em algum lugar (opcional)
  qsa("[data-wa-phone]").forEach((el) => (el.textContent = WHATSAPP_DISPLAY));

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (qs("#name", form)?.value || "").trim();
    const msg = (qs("#message", form)?.value || "").trim();

    const text = `Olá! Meu nome é ${name || "..."}. ${
      msg || "Quero saber mais sobre as marmitas."
    }`;

    window.open(waLink(text), "_blank", "noopener,noreferrer");
  });
}

// =========================
// Footer Year
// =========================
function setYear() {
  const y = qs("#year");
  if (y) y.textContent = new Date().getFullYear();
}

// =========================
// Smooth Scroll (âncoras)
// =========================
function setupSmoothScroll() {
  qsa('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;

      const el = qs(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// =========================
// Header: fade + compact
// =========================
function setupHeaderFadeOnScroll() {
  const header = qs("header");
  if (!header) return;

  const fadeDistance = 180;     // px: fade 0->1
  const compactThreshold = 20;  // px: compacta após isso

  const onScroll = () => {
    const y = window.scrollY || 0;

    // t = 0..1
    const t = Math.max(0, Math.min(1, y / fadeDistance));
    document.documentElement.style.setProperty("--hdr-t", String(t));

    // compact
    if (y > compactThreshold) header.classList.add("is-compact");
    else header.classList.remove("is-compact");
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// =========================
// Init
// =========================
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  handleContact();
  setYear();
  setupSmoothScroll();
  setupHeaderFadeOnScroll();
});
