class MenuPage {
  static render(category = "coffee") {
    const SELECTOR = "#menu_page__products";
    const DIV = document.querySelector(SELECTOR);
    if (!DIV) {
      console.info(`Node is not found: ${SELECTOR}`);
      return;
    }

    const MENU_SECTION_SELECTOR = "#menu_section";
    const MENU_SECTION = document.querySelector(MENU_SECTION_SELECTOR);
    if (!MENU_SECTION) {
      console.info(`Node is not found: ${MENU_SECTION_SELECTOR}`);
      return;
    }

    MENU_SECTION.setAttribute("data-show-only-4-products", "true");

    const BUTTONS = document.querySelectorAll(`#menu_page__controls button`);
    for (let i = 0; i < BUTTONS.length; i++) {
      const BUTTON = BUTTONS[i];
      BUTTON.setAttribute("data-is-selected", "false");
      if (BUTTON.getAttribute("data-category") === category) {
        BUTTON.setAttribute("data-is-selected", "true");
      }
    }

    const ARRAY = Products.getArray().filter((e) => e.category === category);
    DIV.innerHTML = `
      <ul>
        ${ARRAY.map((e) => {
          return `
            <li data-category="coffee">
              <button data-id="${e.id}">
                <span class="menu_section__item_image_block">
                  <img src="${e.image}" alt="${e.name}">
                </span>
                <span class="menu_section__item_text_block">
                  <span class="menu_section__item_title">
                    ${e.name}
                  </span>
                  <span class="menu_section__item_description">
                    ${e.description}
                  </span>
                  <span class="menu_section__item_cost">
                    $${e.price}
                  </span>
                </span>
              </button>
            </li>
          `;
        }).join("")}
      </ul>
    `;

    MENU_SECTION.setAttribute(
      "data-show-only-4-products",
      ARRAY.length > 4 ? "true" : "false",
    );
  }

  static loadProducts() {
    const MENU_SECTION_SELECTOR = "#menu_section";
    const MENU_SECTION = document.querySelector(MENU_SECTION_SELECTOR);
    if (!MENU_SECTION) {
      console.info(`Node is not found: ${MENU_SECTION_SELECTOR}`);
      return;
    }

    MENU_SECTION.setAttribute("data-show-only-4-products", "false");
  }
}
