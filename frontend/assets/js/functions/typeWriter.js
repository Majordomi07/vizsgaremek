document.addEventListener("DOMContentLoaded", function () {
  const texts = ["Építs karriert", "Növeld a bevételed", "Fejleszd magad"];
  let textIndex = 0;
  let charIndex = 0;

  function type() {
    const currentText = texts[textIndex];
    const typingTextElement = document.getElementById("typing");

    if (charIndex <= currentText.length) {
      typingTextElement.textContent = currentText.substring(0, charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1000);
    }
  }

  function erase() {
    const currentText = texts[textIndex];
    const typingTextElement = document.getElementById("typing");

    if (charIndex >= 0) {
      typingTextElement.textContent = currentText.substring(0, charIndex);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      type();
    }
  }

  type();
});
