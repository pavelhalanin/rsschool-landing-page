class ThemeSwitcher {
  static localStorageKey = "coffee_house__theme";
  static theme_light = "light";
  static theme_dark = "dark";

  static getTheme() {
    const VALUE = localStorage.getItem(this.localStorageKey);

    if (VALUE === this.theme_dark) {
      return this.theme_dark;
    }

    return this.theme_light;
  }

  static init() {
    const THEME = this.getTheme();
    console.info("init", THEME);
    document.body.setAttribute("data-theme", THEME);
  }

  static setLight() {
    console.info("setLight");
    localStorage.setItem(this.localStorageKey, this.theme_light);
    this.setBodyAttr(this.theme_light);
  }

  static setDark() {
    console.info("setDark");
    localStorage.setItem(this.localStorageKey, this.theme_dark);
    this.setBodyAttr(this.theme_dark);
  }

  static setBodyAttr(value) {
    console.info("setBodyAttr", value);
    document.body.setAttribute("data-theme", value);
  }
}
