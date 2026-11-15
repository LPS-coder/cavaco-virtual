document.addEventListener("DOMContentLoaded", () => {
  Instrument.render();

  const notesToggle = document.getElementById("notesToggle");
  const markersToggle = document.getElementById("markersToggle");
  const fretboard = document.getElementById("fretboard");

  notesToggle.addEventListener("click", () => {
    const active = notesToggle.getAttribute("aria-pressed") !== "true";
    notesToggle.setAttribute("aria-pressed", String(active));
    notesToggle.classList.toggle("active", active);
    fretboard.classList.toggle("show-notes", active);
  });

  markersToggle.addEventListener("click", () => {
    const active = markersToggle.getAttribute("aria-pressed") !== "true";
    markersToggle.setAttribute("aria-pressed", String(active));
    markersToggle.classList.toggle("active", active);
    fretboard.classList.toggle("mark-mode", active);
  });

  const dialog = document.getElementById("aboutDialog");
  document.getElementById("aboutButton").addEventListener("click", () => dialog.showModal());
  document.getElementById("closeDialog").addEventListener("click", () => dialog.close());


  // Seleção entre som sintetizado e som real

  const soundOptions =
    document.querySelectorAll(".sound-option");

  soundOptions.forEach(button => {
    button.addEventListener("click", () => {

      const selectedMode = button.dataset.mode;

      AudioEngine.setMode(selectedMode);

      soundOptions.forEach(option => {
        option.classList.remove("active");
      });

      button.classList.add("active");

      const status = document.getElementById("audioStatus");
      const message = document.getElementById("audioMessage");

      if (selectedMode === "synth") {
        status.textContent = "Som sintetizado selecionado";
        message.textContent = "Pronto para tocar.";
      } else {
        status.textContent = "Som real selecionado";
        message.textContent = "Utilizando gravações WAV do cavaquinho.";
      }
    });
  });

