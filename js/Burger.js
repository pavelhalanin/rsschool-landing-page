class Burger {
  static idModal = "burger_modal";

  static openOrClose() {
    console.info("Burger openOrClose");

    window.scrollTo(0, 0);
    const IS_OPENED = document.body.getAttribute("data-burger-open") === "true";
    document.body.setAttribute(
      "data-burger-open",
      IS_OPENED ? "false" : "true",
    );
  }

  static close() {
    console.info("Burger close");
    document.body.setAttribute("data-burger-open", "false");
  }
}
