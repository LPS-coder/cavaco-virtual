# Cavaco Virtual — versão 1.0

Aplicação web inicial para visualizar o braço do cavaquinho brasileiro.

## Como executar

1. Extraia a pasta `cavaco-virtual`.
2. Abra a pasta no VS Code.
3. Execute `index.html` com a extensão Live Server (recomendado).
4. Clique nas notas do braço para selecionar uma posição.

> Use Live Server ou outro servidor local. O navegador pode bloquear `fetch()` de arquivos de áudio quando o HTML é aberto diretamente por `file://`.

## Afinação

Afinação tradicional considerada: D3 – G3 – B3 – D4 (da 4ª para a 1ª corda).

## Áudios reais

A aplicação está preparada para carregar uma gravação WAV individual para cada posição:

`assets/sounds/string{n}_fret{casa}.wav`

Exemplos:
- `string1_fret0.wav` — 1ª corda solta (D4)
- `string1_fret1.wav` — 1ª corda na 1ª casa
- `string2_fret0.wav` — 2ª corda solta (B3)
- `string4_fret12.wav` — 4ª corda na 12ª casa

Total: 52 gravações (4 cordas × 13 posições, incluindo cordas soltas).

Os arquivos devem ser gravações limpas, uma nota por arquivo, sem fala ou ruído de fundo. Grave cada posição separadamente para preservar diferenças de timbre entre as cordas.

A interface e o cálculo das notas já funcionam sem os arquivos de áudio. Ao clicar em uma posição sem gravação, a interface informa qual arquivo está faltando.

## Controles

- Clique numa posição: seleciona a nota e tenta reproduzir o WAV correspondente.
- Mostrar notas: exibe/oculta os nomes das notas.
- Marcações: ativa o modo de marcação.
- Clique com o botão direito numa posição: marca/desmarca a posição.

## Estrutura

- `index.html`: estrutura da página.
- `css/style.css`: aparência e layout responsivo.
- `js/notes.js`: afinação e cálculo das notas.
- `js/audio.js`: carregamento e reprodução dos WAVs.
- `js/instrument.js`: desenho e interação do braço.
- `js/main.js`: inicialização e controles.
