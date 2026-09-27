class ProductModal {
  static idModal = "product_modal";
  static warning_svg = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_147813_9611)">
        <path d="M8 7.66675V11.0001" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31826 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31826 14.6666 8.00016 14.6666Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_147813_9611">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  `;

  static openModal(id) {
    const ID_MODAL = this.idModal;
    document.querySelectorAll(`#${ID_MODAL}`).forEach((e) => {
      e.remove();
    });

    document.body.setAttribute("data-no-scroll-on-open-modal", "true");

    const DIALOG = document.createElement("dialog");
    DIALOG.setAttribute("id", ID_MODAL);
    DIALOG.classList.add("modal");

    try {
      const PRODUCT = Products.getById(id);
      DIALOG.innerHTML = `
        <div class="modal__overlay" onclick="${this.name}.closeModal()"></div>
          <div class="modal__wrapper">
            <div class="modal__body">
              <div class="modal__image_block">
                <img src="${PRODUCT.image}" alt="${this.name}">
              </div>
              <div class="modal__text_block">
                <div class="modal__product_name_and_description">
                  <div class="modal__product_name">
                    ${PRODUCT.name}
                  </div>
                  <div class="modal__product_description">
                    ${PRODUCT.description}
                  </div>
                </div>
                <div class="modal__price_block">
                  <div class="modal__price_block_title">Size</div>
                  <ul id="product_sizes_price">
                    ${Object.keys(PRODUCT.sizes)
                      .map((size) => {
                        return `
                        <li>
                          <button
                            onclick="${this.name}.setSize(this)"
                            data-price="${PRODUCT.sizes[size]["add-price"]}"
                            data-is-selected="${size === "s" ? "true" : "false"}"
                          >
                            <span>${size}</span>
                            ${PRODUCT.sizes[size].size}
                          </button>
                        </li>
                      `;
                      })
                      .join("")}
                  </ul>
                </div>
                <div class="modal__price_block">
                  <div class="modal__price_block_title">Additives</div>
                  <ul id="product_additives_price">
                    ${PRODUCT.additives
                      .map((data, index) => {
                        return `
                        <li>
                          <button
                            onclick="${this.name}.setAdditives(this)"
                            data-price="${data["add-price"]}"
                            data-is-selected="false"
                          >
                            <span>${index + 1}</span>
                            ${data.name}
                          </button>
                        </li>
                      `;
                      })
                      .join("")}
                  </ul>
                </div>
                <div class="modal__total_block">
                  <div>Total:</div>
                  <div id="product_price" data-first-price="${PRODUCT.price}">
                    $${PRODUCT.price}
                  </div>
                </div>
                <div class="modal__disclaimer">
                  <div>
                    ${this.warning_svg}
                  </div>
                  The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
                </div>
                <button
                  class="modal__close_button"
                  onclick="${this.name}.closeModal()"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        `;
    } catch (exception) {
      DIALOG.innerHTML = `
            <div>${id} ${exception}</div>
        `;
    }

    document.body.append(DIALOG);

    DIALOG.showModal();
  }

  static closeModal() {
    const ID_MODAL = this.idModal;

    const SELECTOR = `#${ID_MODAL}`;
    const DIALOG = document.querySelector(SELECTOR);
    if (!DIALOG) {
      console.info(`Node is not found: ${SELECTOR}`);
      return;
    }

    document.body.removeAttribute("data-no-scroll-on-open-modal");

    DIALOG.close();

    document.querySelectorAll(`#${ID_MODAL}`).forEach((e) => {
      e.remove();
    });
  }

  static setSize(button_node) {
    if (button_node.getAttribute("data-is-selected") == "true") {
      document
        .querySelectorAll("#product_sizes_price button")
        .forEach((button) => {
          button.removeAttribute("data-is-selected");
        });
      button_node.removeAttribute("data-is-selected");
    } else {
      document
        .querySelectorAll("#product_sizes_price button")
        .forEach((button) => {
          button.removeAttribute("data-is-selected");
        });
      button_node.setAttribute("data-is-selected", "true");
    }

    this.calc();
  }

  static setAdditives(button_node) {
    if (button_node.getAttribute("data-is-selected") == "true") {
      document
        .querySelectorAll("#product_additives_price button")
        .forEach((button) => {
          button.removeAttribute("data-is-selected");
        });

      button_node.removeAttribute("data-is-selected");
    } else {
      document
        .querySelectorAll("#product_additives_price button")
        .forEach((button) => {
          button.removeAttribute("data-is-selected");
        });

      button_node.setAttribute("data-is-selected", "true");
    }

    this.calc();
  }

  static calc() {
    const SIZE_BUTTONS = document.querySelectorAll(
      "#product_sizes_price button",
    );
    let size_price = 0;
    for (let i = 0; i < SIZE_BUTTONS.length; i++) {
      const BUTTON = SIZE_BUTTONS[i];
      if (BUTTON.getAttribute("data-is-selected") === "true") {
        size_price = BUTTON.getAttribute("data-price");
      }
    }

    const ADDITIVE_BUTTONS = document.querySelectorAll(
      "#product_additives_price button",
    );
    let additives_price = 0;
    for (let i = 0; i < ADDITIVE_BUTTONS.length; i++) {
      const BUTTON = ADDITIVE_BUTTONS[i];
      if (BUTTON.getAttribute("data-is-selected") === "true") {
        additives_price = BUTTON.getAttribute("data-price");
      }
    }

    const SELECTOR = "#product_price";
    const TOTAL_PRICE = document.querySelector(SELECTOR);
    if (!TOTAL_PRICE) {
      console.info(`Node is not found: ${SELECTOR}`);
      return;
    }
    const FIRST_PRICE = TOTAL_PRICE.getAttribute("data-first-price");

    const RESULT_PRICE =
      Math.round(
        Number(FIRST_PRICE) * 100 +
          Number(size_price) * 100 +
          Number(additives_price) * 100,
      ) / 100;

    TOTAL_PRICE.innerHTML = `$${RESULT_PRICE.toFixed(2)}`;
  }
}
