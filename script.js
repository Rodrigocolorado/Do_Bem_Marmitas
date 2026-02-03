// Do Bem Marmitas - JS simples (sem frameworks)

const WHATSAPP_NUMBER = "5551991338688"; // DDI+DDD+Número (sem espaços)

const menuItems = [
  {
    title: "Panqueca de espinafre (bolonhesa)",
    desc: "Panqueca de espinafre recheada de bolonhesa de carne e ervilha + batata rústica + lâminas de cenoura.",
    img: "assets/img/panqueca-espinafre.jpeg",
    tags: ["Sem industrializados", "Nutritiva"]
  },
  {
    title: "Strogonoff de frango",
    desc: "Strogonoff de frango cremoso + arroz negro + brócolis selado.",
    img: "assets/img/strogonoff.jpeg",
    tags: ["Equilibrada", "Proteína"]
  },
  {
    title: "Tilápia com crosta de coco",
    desc: "Filé de tilápia assada com crosta de coco e raspas de limão + arroz colorido.",
    img: "assets/img/tilapia.jpeg",
    tags: ["Leve", "Saborosa"]
  },
  {
    title: "Carne de panela desfiada",
    desc: "Carne de panela desfiada + chuchu à moda mineira + purê de abóbora cabotiá.",
    img: "assets/img/carne-panela.jpeg",
    tags: ["Caseira", "Conforto"]
  },
  {
    title: "Frango desfiado cremoso",
    desc: "Frango desfiado cremoso + purê de batata doce + espaguete de abobrinha.",
    img: "assets/img/frango-batata-doce.jpeg",
    tags: ["Sem lactose", "Low carb"]
  },
  {
    title: "Frango xadrez sem shoyo",
    desc: "Frango xadrez sem shoyo + arroz vermelho + legumes + sementes.",
    img: "assets/img/frango-xadrez.jpeg",
    tags: ["Sem glúten", "Colorida"]
  },
  {
    title: "Iscas de patinho ao molho",
    desc: "Iscas de patinho ao molho à moda Do Bem + aipim com ervas finas + brócolis ramoso e tomatinho cereja.",
    img: "assets/img/iscas-patinho.jpeg",
    tags: ["Premium", "Alta proteína"]
  },
];

function waLink(message){
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function renderMenu(){
  const grid = document.querySelector("#menuGrid");
  if(!grid) return;

  grid.innerHTML = menuItems.map((it, idx) => {
    const tags = it.tags.map(t => `<span class="tag">${t}</span>`).join("");
    const msg = `Olá! Quero pedir a marmita: ${it.title}.`;
    return `
      <article class="card">
        <div class="img" style="background-image:url('${it.img}')"></div>
        <div class="content">
          <h3>${it.title}</h3>
          <p>${it.desc}</p>
          <div class="tags">${tags}</div>
        </div>
        <div class="bottom">
          <div class="price">${it.price}<small>Peça pelo WhatsApp</small></div>
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
  }).join("");
}

function handleContact(){
  const form = document.querySelector("#contactForm");
  const phoneEl = document.querySelectorAll("[data-wa-phone]");
  phoneEl.forEach(el => el.textContent = WHATSAPP_DISPLAY);

  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const msg = document.querySelector("#message").value.trim();
    const text = `Olá! Meu nome é ${name || "..."}. ${msg || "Quero saber mais sobre as marmitas."}`;
    window.open(waLink(text), "_blank", "noopener");
  });
}

function setYear(){
  const y = document.querySelector("#year");
  if(y) y.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  handleContact();
  setYear();

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });
});
