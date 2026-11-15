
const AudioEngine = (() => {
  let context = null;
  let currentMode = "synth";

  const cache = new Map();

  function getContext() {
    if (!context) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        throw new Error("Web Audio API não suportada.");
      }

      context = new AudioContextClass();
    }

    return context;
  }

  function setMode(mode) {
    if (mode !== "synth" && mode !== "real") return;

    currentMode = mode;
  }

  function getMode() {
    return currentMode;
  }

  // MODO SINTETIZADO
  function playSynth(frequency) {
    const ctx = getContext();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    const master = ctx.createGain();

    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.24, now + 0.008);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    master.connect(ctx.destination);

    // Harmônicos para aproximar o timbre de uma corda dedilhada.
    const harmonics = [
      { multiple: 1, volume: 1.0 },
      { multiple: 2, volume: 0.35 },
      { multiple: 3, volume: 0.16 },
      { multiple: 4, volume: 0.07 }
    ];

    harmonics.forEach(harmonic => {
      const oscillator = ctx.createOscillator();
      const partialGain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value =
        frequency * harmonic.multiple;

      partialGain.gain.value = harmonic.volume;

      oscillator.connect(partialGain);
      partialGain.connect(master);

      oscillator.start(now);
      oscillator.stop(now + 1.85);
    });

    setTimeout(() => {
      master.disconnect();
    }, 2200);
  }

  // MODO REAL
  async function playReal(stringNumber, fret) {
    const ctx = getContext();

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const key = `string${stringNumber}_fret${fret}`;

    const path = `assets/sounds/${key}.wav`;

    if (!cache.has(key)) {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`Arquivo não encontrado: ${key}.wav`);
      }

      const audioData = await response.arrayBuffer();

      const audioBuffer =
        await ctx.decodeAudioData(audioData);

      cache.set(key, audioBuffer);
    }

    const source = ctx.createBufferSource();
    const volume = ctx.createGain();

    source.buffer = cache.get(key);
    volume.gain.value = 0.9;

    source.connect(volume);
    volume.connect(ctx.destination);

    source.start();
  }

  async function play(stringNumber, fret, frequency) {
    if (currentMode === "synth") {
      playSynth(frequency);
      return;
    }

    await playReal(stringNumber, fret);
  }

  return {
    play,
    setMode,
    getMode
  };
})();
