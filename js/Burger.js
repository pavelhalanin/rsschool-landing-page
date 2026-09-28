class Burger {
  static idModal = "burger_modal";

  static openOrClose() {
    window.scrollTo(0, 0);
    const IS_OPENED = document.body.getAttribute("data-burger-open") === "true";
    document.body.setAttribute(
      "data-burger-open",
      IS_OPENED ? "false" : "true",
    );
  }

  static close() {
    document.body.setAttribute("data-burger-open", "false");
  }

  static initCheckKeyPress() {
    const THIS = this;
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const IS_OPENED =
          document.body.getAttribute("data-burger-open") === "true";
        if (IS_OPENED) {
          THIS.close();
        }
      }
    });
  }
}
