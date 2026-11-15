
const Instrument = (() => {
  const fretboard = document.getElementById("fretboard");

  function selectNote(stringIndex, fret, button) {
    const note = getNoteAt(stringIndex, fret);
    const string = STRINGS[stringIndex];

    document.querySelectorAll(".note-hit.selected")
      .forEach(el => el.classList.remove("selected"));

    button.classList.add("selected");

    document.getElementById("selectedNote").textContent = note.name;
    document.getElementById("noteName").textContent =
      `${note.fullName} · ${note.frequency} Hz`;

    document.getElementById("noteDetail").textContent =
      `${string.number}ª corda (${string.label}), casa ${fret}. Nota MIDI ${note.midi}.`;

    AudioEngine.play(
      string.number,
      fret,
      note.frequency
    )
    .then(() => {
      const mode = AudioEngine.getMode();

      document.getElementById("audioStatus").textContent =
        mode === "synth"
          ? "Reproduzindo som sintetizado"
          : "Reproduzindo gravação real";

      document.getElementById("audioMessage").textContent =
        `${note.fullName} · Corda ${string.number} · Casa ${fret}`;
    })
    .catch(error => {
      document.getElementById("audioStatus").textContent =
        "Gravação indisponível";

      document.getElementById("audioMessage").textContent =
        error.message;

      console.error(error);
    });

  }

  function createFretNumbers() {
    const numbers = document.createElement("div");
    numbers.className = "fret-numbers";

    const empty = document.createElement("span");
    empty.textContent = "SOLTA";
    numbers.appendChild(empty);

    for (let fret = 1; fret <= 12; fret++) {
      const number = document.createElement("span");
      number.textContent = fret;
      numbers.appendChild(number);
    }

    return numbers;
  }

  function createStringRow(string, stringIndex) {
    const row = document.createElement("div");
    row.className = "string-row";

    const openCell = document.createElement("div");
    openCell.className = "fret-cell open";

    const openButton = createNoteButton(stringIndex, 0);
    openCell.appendChild(openButton);

    row.appendChild(openCell);

    for (let fret = 1; fret <= 12; fret++) {
      const cell = document.createElement("div");
      cell.className = "fret-cell";

      if ([3, 5, 7, 9, 12].includes(fret)) {
        cell.classList.add("has-marker");
      }

      const button = createNoteButton(stringIndex, fret);
      cell.appendChild(button);

      row.appendChild(cell);
    }

    const stringLine = document.createElement("div");
    stringLine.className = "string-line";
    stringLine.style.setProperty(
      "--thickness",
      `${string.thickness}px`
    );

    row.appendChild(stringLine);

    return row;
  }

  function createNoteButton(stringIndex, fret) {
    const note = getNoteAt(stringIndex, fret);

    const button = document.createElement("button");

    button.className = "note-hit";
    button.type = "button";

    button.textContent = note.name.replace("♯", "#");

    button.title =
      `${STRINGS[stringIndex].number}ª corda, casa ${fret}: ${note.fullName}`;

    button.setAttribute("aria-label", button.title);

    button.addEventListener("click", () => {
      selectNote(stringIndex, fret, button);
    });

    button.addEventListener("contextmenu", event => {
      event.preventDefault();
      button.classList.toggle("marked");
    });

    return button;
  }

  function render() {
    fretboard.innerHTML = "";
    fretboard.classList.add("show-notes");

    const neck = document.createElement("div");
    neck.className = "neck";

    neck.appendChild(createFretNumbers());

    STRINGS.forEach((string, index) => {
      neck.appendChild(createStringRow(string, index));
    });

    fretboard.appendChild(neck);
  }

  return { render };
})();
