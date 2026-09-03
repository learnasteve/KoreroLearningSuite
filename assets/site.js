(() => {
  const { en, ja, apps } = window.KORERO_CONTENT;
  const STORAGE_KEY = "korero-site-language";
  let language = localStorage.getItem(STORAGE_KEY) === "ja" ? "ja" : "en";
  let selectedAudience = "teacher";

  const valueAt = (object, path) => path.split(".").reduce((value, key) => value?.[key], object);
  const t = (path) => valueAt(window.KORERO_CONTENT[language], path) ?? valueAt(en, path) ?? "";

  function setImageFallbacks(scope = document) {
    scope.querySelectorAll("img").forEach((image) => {
      const frame = image.closest(".image-frame, .app-art");
      const markAvailable = () => frame?.classList.add("has-image");
      const markMissing = () => frame?.classList.remove("has-image");
      if (image.complete) image.naturalWidth ? markAvailable() : markMissing();
      image.addEventListener("load", markAvailable, { once: true });
      image.addEventListener("error", markMissing, { once: true });
    });
  }

  function renderAudiencePanels() {
    ["teacher", "researcher", "student"].forEach((audience) => {
      const card = t(`audienceCards.${audience}`);
      const panel = document.querySelector(`[data-panel="${audience}"]`);
      const external = audience === "researcher";
      panel.innerHTML = `
        <div class="audience-content">
          <div>
            <p class="eyebrow">${card.label}</p>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
            <ul class="tick-list">${card.points.map((point) => `<li>${point}</li>`).join("")}</ul>
            <a class="button button-sun" href="${external ? "#research" : "mailto:s.m.woollaston@gmail.com"}">${card.cta} <span aria-hidden="true">${external ? "↓" : "→"}</span></a>
          </div>
          <figure class="audience-image image-frame">
            <img src="assets/images/${card.image}" alt="${card.imageAlt}" loading="lazy" />
            <figcaption class="image-placeholder"><span class="placeholder-icon" aria-hidden="true">✦</span><strong>${card.label}</strong><span>${card.placeholder}</span></figcaption>
          </figure>
        </div>`;
    });
    setImageFallbacks(document.querySelector(".audience-panels"));
  }

  function renderApps() {
    const groups = ["learning", "tools", "visibility"];
    document.querySelector("#app-groups").innerHTML = groups.map((group) => {
      const groupApps = apps.filter((app) => app.group === group);
      return `<section class="app-group" aria-labelledby="${group}-heading"><div class="group-heading"><h3 id="${group}-heading">${t(`apps.${group}`)}</h3><span>${String(groupApps.length).padStart(2, "0")}</span></div><div class="app-grid">${groupApps.map((app) => `<article class="app-card"><div class="app-art"><img src="assets/images/apps/${app.image}.jpg" alt="" loading="lazy" /><span class="app-fallback" aria-hidden="true">${app.name.charAt(0)}</span></div><div><span class="status status-${app.status}">${t(`apps.${app.status}`)}</span><h4>${app.name}</h4><p>${app.desc[language]}</p></div></article>`).join("")}</div></section>`;
    }).join("");
    setImageFallbacks(document.querySelector("#app-groups"));
  }

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = t("meta.title");
    document.querySelector('meta[name="description"]').content = t("meta.description");
    document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach((element) => { element.innerHTML = t(element.dataset.i18nHtml); });
    const toggle = document.querySelector(".language-toggle");
    toggle.setAttribute("aria-label", language === "en" ? "Switch to Japanese" : "Switch to English");
    toggle.innerHTML = language === "en" ? '<span aria-hidden="true">EN</span> / <span>日本語</span>' : '<span>EN</span> / <span aria-hidden="true">日本語</span>';
    renderAudiencePanels();
    renderApps();
  }

  function activateAudience(nextAudience, focus = false) {
    selectedAudience = nextAudience;
    document.querySelectorAll("[role=tab]").forEach((tab) => {
      const active = tab.dataset.audience === selectedAudience;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    document.querySelectorAll("[role=tabpanel]").forEach((panel) => { panel.hidden = panel.dataset.panel !== selectedAudience; });
  }

  document.querySelector(".language-toggle").addEventListener("click", () => applyLanguage(language === "en" ? "ja" : "en"));
  const tabs = [...document.querySelectorAll("[role=tab]")];
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateAudience(tab.dataset.audience));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const targetIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      activateAudience(tabs[targetIndex].dataset.audience, true);
    });
  });
  const menu = document.querySelector(".menu-button");
  const links = document.querySelector(".nav-links");
  menu.addEventListener("click", () => { const open = menu.getAttribute("aria-expanded") !== "true"; menu.setAttribute("aria-expanded", String(open)); links.classList.toggle("is-open", open); });
  links.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { menu.setAttribute("aria-expanded", "false"); links.classList.remove("is-open"); }));
  applyLanguage(language);
  activateAudience(selectedAudience);
  setImageFallbacks();
})();
