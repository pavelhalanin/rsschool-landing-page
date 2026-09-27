class Slider {
  static getIndex() {
    const ARRAY_INPUTS = document.querySelectorAll("#slider__inputs input");

    for (let i = 0; i < ARRAY_INPUTS.length; i++) {
      const INPUT = ARRAY_INPUTS[i];
      if (INPUT.checked) {
        return {
          currentIndex: INPUT.value,
          lastIndex: ARRAY_INPUTS.length,
        };
      }
    }

    return {
      currentIndex: 1,
      lastIndex: ARRAY_INPUTS.length,
    };
  }

  static step(step) {
    let { currentIndex, lastIndex } = this.getIndex();

    currentIndex = Number(currentIndex) + Number(step);

    if (currentIndex > lastIndex) {
      document.getElementById(`slide-1`).click();
      return;
    }

    if (currentIndex <= 0) {
      document.getElementById(`slide-${lastIndex}`).click();
      return;
    }

    document.getElementById(`slide-${currentIndex}`).click();
    return;
  }
}
