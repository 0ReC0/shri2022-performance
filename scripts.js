(() => {
  function bind(nodes, event, handler) {
    Array.from(nodes).forEach(node => {
      node.addEventListener(event, handler);
    });
  }

  function makeTabs(node) {
    let selected = node.querySelector('.section__tab_active').dataset.id;
    const tabs = node.querySelectorAll('.section__tab');
    const list = Array.from(tabs).map(node => node.dataset.id);
    const select = node.querySelector('.section__select');

    const tabsDict = Array.from(tabs).reduce((acc, node) => {
      acc[node.dataset.id] = node
      return acc
    }, {});

    const pannels = node.querySelectorAll('.section__panel[data-id]');
    const pannelDict = Array.from(pannels).reduce((acc, node) => {
      acc[node.dataset.id] = node
      return acc
    }, {});

    let oldTab = node.querySelector('.section__tab_active');
    let oldPanel = node.querySelector('.section__panel:not(.section__panel_hidden)');

    const selectTab = (newId) => {
      const newTab = tabsDict[newId];
      const newPanel = pannelDict[newId];

      selected = newId;

      oldTab.classList.remove('section__tab_active');
      oldTab.setAttribute('aria-selected', 'false');
      oldTab.removeAttribute('tabindex');

      newTab.classList.add('section__tab_active');
      newTab.setAttribute('aria-selected', 'true');
      newTab.setAttribute('tabindex', '0');
      newTab.focus({
        preventScroll: true
      });
      oldTab = newTab

      oldPanel.classList.add('section__panel_hidden');
      oldPanel.setAttribute('aria-hidden', 'true');

      newPanel.classList.remove('section__panel_hidden');
      newPanel.setAttribute('aria-hidden', 'false');
      oldPanel = newPanel

      select.value = newId;
    }

    select.addEventListener('input', () => {
      selectTab(select.value);
    });

    bind(tabs, 'click', event => {
      const newId = event.target.dataset.id;
      selectTab(newId);
    });

    bind(tabs, 'keydown', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      let index = list.indexOf(selected);
      if (event.which === 37) {
        // left
        --index;
      } else if (event.which === 39) {
        // right
        ++index;
      } else if (event.which === 36) {
        // home
        index = 0;
      } else if (event.which === 35) {
        // end
        index = list.length - 1;
      } else {
        return;
      }

      if (index >= list.length) {
        index = 0;
      } else if (index < 0) {
        index = list.length - 1;
      }

      selectTab(list[index]);
      event.preventDefault();
    });
  }

  function makeMenu(node) {
    let expanded = false;
    const links = document.querySelector('.header__links');
    const header__menu_text = node.querySelector('.header__menu-text')

    node.addEventListener('click', () => {
      expanded = !expanded;
      node.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      header__menu_text.textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
      links.classList.toggle('header__links_opened', expanded);
      links.classList.add('header__links-toggled');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const header__menu = document.querySelector('.header__menu')
    const main__devices = document.querySelector('.main__devices')
    makeTabs(main__devices)
    makeMenu(header__menu)
  });
})();
