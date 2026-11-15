// Afinação padrão do cavaquinho brasileiro: D3 - G3 - B3 - D4.
// MIDI: D3=50, G3=55, B3=59, D4=62.
const STRINGS = [
  { number: 1, name: "Ré", label: "D4", midi: 62, thickness: 1.5 },
  { number: 2, name: "Si", label: "B3", midi: 59, thickness: 2 },
  { number: 3, name: "Sol", label: "G3", midi: 55, thickness: 2.6 },
  { number: 4, name: "Ré", label: "D3", midi: 50, thickness: 3.2 }
];

const NOTE_NAMES = ["Dó", "Dó♯", "Ré", "Ré♯", "Mi", "Fá", "Fá♯", "Sol", "Sol♯", "Lá", "Lá♯", "Si"];

function getNoteAt(stringIndex, fret) {
  const midi = STRINGS[stringIndex].midi + fret;
  const pitchClass = midi % 12;
  const octave = Math.floor(midi / 12) - 1;
  const frequency = 440 * Math.pow(2, (midi - 69) / 12);
  return {
    midi,
    name: NOTE_NAMES[pitchClass],
    octave,
    fullName: `${NOTE_NAMES[pitchClass]}${octave}`,
    frequency: Number(frequency.toFixed(2))
  };
}
