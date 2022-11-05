(() => {
  function a(a, b, c) {
    Array.from(a).forEach(a => {
      a.addEventListener(b, c)
    })
  }

  function b(b) {
    function c(a) {
      const c = b.querySelector(`.section__tab[data-id=${ a }]`),
        e = b.querySelector(`.section__panel[data-id=${ a }]`), f = b.querySelector(".section__tab_active"),
        h = b.querySelector(".section__panel:not(.section__panel_hidden)");
      d = a, f.classList.remove("section__tab_active"), f.setAttribute("aria-selected", "false"), f.removeAttribute("tabindex"), c.classList.add("section__tab_active"), c.setAttribute("aria-selected", "true"), c.setAttribute("tabindex", "0"), c.focus({preventScroll: !0}), h.classList.add("section__panel_hidden"), h.setAttribute("aria-hidden", "true"), e.classList.remove("section__panel_hidden"), e.setAttribute("aria-hidden", "false"), g.value = a
    }

    let d = b.querySelector(".section__tab_active").dataset.id;
    const e = b.querySelectorAll(".section__tab"), f = Array.from(e).map(a => a.dataset.id),
      g = b.querySelector(".section__select");
    g.addEventListener("input", () => {
      c(g.value)
    }), a(e, "click", a => {
      const b = a.target.dataset.id;
      c(b)
    }), a(e, "keydown", a => {
      if (a.ctrlKey || a.metaKey || a.shiftKey || a.altKey) return;
      let b = f.indexOf(d);
      if (37 === a.which) --b; else if (39 === a.which) ++b; else if (36 === a.which) b = 0; else if (35 === a.which) b = f.length - 1; else return;
      b >= f.length ? b = 0 : 0 > b && (b = f.length - 1), c(f[b]), a.preventDefault()
    })
  }

  function c(a) {
    let b = !1;
    const c = document.querySelector(".header__links");
    a.addEventListener("click", () => {
      b = !b, a.setAttribute("aria-expanded", b ? "true" : "false"), a.querySelector(".header__menu-text").textContent = b ? "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E" : "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E", c.classList.toggle("header__links_opened", b), c.classList.add("header__links-toggled")
    })
  }

  document.addEventListener("DOMContentLoaded", () => {
    Array.from(document.querySelectorAll(".main__devices")).forEach(b), Array.from(document.querySelectorAll(".header__menu")).forEach(c)
  })
})();
