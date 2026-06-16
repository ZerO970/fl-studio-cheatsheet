/* ============================================================
   Plugin Chains + Compatibility Matrix
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   CHAINS — готовые цепочки плагинов
   Каждый step: { pluginId, role, note, settings? }
   pluginId — из PLUGINS (для клика → открыть плагин)
   ────────────────────────────────────────────────────────── */
const CHAINS = [

  /* ═══════════════════════════════════════════
     MELODIC TECHNO
  ═══════════════════════════════════════════ */
  {
    id:    "mt-kick",
    name:  "Melodic Techno — Kick",
    genre: "Melodic Techno",
    color: "#6366F1",
    icon:  "🥁",
    tags:  ["kick", "melodic techno", "drums"],
    desc:  "Тяжёлый, округлый кик с хорошим суббасом и контролируемым ударом. Характерно для Agents Of Time, Massano, Innellea.",
    steps: [
      {
        pluginId: "transient-processor",
        role:     "Формирование удара",
        note:     "Attack −3 dB (чуть смягчить щелчок), Sustain +4 dB (добавить хвост). Кик должен «катиться», не «щёлкать»."
      },
      {
        pluginId: "pro-q-3",
        role:     "Тональная коррекция",
        note:     "HP 28–32 Hz (убрать инфразвук), Bell +3 dB @ 60–70 Hz Q=1.2 (суббас), Bell −2 dB @ 300–400 Hz Q=2 (убрать «картонность»), Bell +2 dB @ 4–5 kHz Q=1.5 (атака/удар)."
      },
      {
        pluginId: "pro-c-2",
        role:     "Punch-компрессор",
        note:     "Режим Punch. Ratio 4:1, Attack 8 ms, Release 80 ms, GR 3–4 dB. Компрессор подчёркивает удар, делает кик более упругим."
      },
      {
        pluginId: "saturn-2",
        role:     "Аналоговое тепло",
        note:     "Режим Tape, Drive 20%, Mix 30%. Добавляет чётные гармоники в суббас — кик звучит «аналоговее» и лучше слышится на маленьких колонках."
      },
      {
        pluginId: "pro-l-2",
        role:     "Brick-wall / выравнивание пиков",
        note:     "Transparent, Ceiling −0.3 dB. Только контролирует пики — не должен слышно работать. GR max 1–2 dB."
      }
    ]
  },

  {
    id:    "mt-lead",
    name:  "Melodic Techno — Melodic Lead",
    genre: "Melodic Techno",
    color: "#8B5CF6",
    icon:  "🎹",
    tags:  ["lead", "melodic", "synth", "melodic techno"],
    desc:  "Тёплый, атмосферный лид с пространством и движением. Как у Recondite, Kiasmos, Tale Of Us.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Базовая EQ-коррекция",
        note:     "HP 80–120 Hz (лид не должен конкурировать с басом), LP 14–16 kHz (убрать цифровой блеск). Bell −2 dB @ 1–2 kHz (убрать «пластик» синтезатора)."
      },
      {
        pluginId: "saturn-2",
        role:     "Тепло + гармоники",
        note:     "Режим Tube, Multiband: Low 20% Tape / Mid 25% Tube / High 15% Tape Crinkle. Mix 40–60%. Добавляет органичность холодному цифровому синту."
      },
      {
        pluginId: "pro-c-2",
        role:     "Opto-компрессор",
        note:     "Режим Opto. Ratio 3:1, Attack 25 ms, Release 180 ms, GR 2–4 dB. Мягко «приклеивает» динамику, не убивая экспрессию."
      },
      {
        pluginId: "timeless-3",
        role:     "Пространственный делэй",
        note:     "Ping-pong, 1/8 dotted (пунктирная восьмая). Feedback 30%, HPF 400 Hz / LPF 8 kHz на повторениях. Mix 18–25%. Создаёт глубину без каши."
      },
      {
        pluginId: "pro-r",
        role:     "Реверберация",
        note:     "Character 6–7 (Vintage), Size Medium-Large, Pre-Delay 22 ms, Post EQ: HPF 200 Hz + LPF 7 kHz. Mix 20–30%. Лид «живёт» в большом пространстве."
      },
      {
        pluginId: "microshift",
        role:     "Ширина стерео",
        note:     "Style I или II, Detune 10–14 cents, Delay 12 ms, Mix 60–70%. Делает лид широким без фазовых проблем в моно."
      }
    ]
  },

  {
    id:    "mt-pad",
    name:  "Melodic Techno — Pad / Atmosphere",
    genre: "Melodic Techno",
    color: "#06B6D4",
    icon:  "🌊",
    tags:  ["pad", "atmosphere", "ambient", "melodic techno"],
    desc:  "Медленно движущийся атмосферный пэд, который заполняет пространство вокруг других элементов.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "M/S EQ — разделение",
        note:     "M/S режим. Mid: HP 120 Hz (чистый центр). Side: LP 10 kHz (убрать резкость по краям), HPF 200 Hz (суббас только в моно)."
      },
      {
        pluginId: "fruity-love-philter",
        role:     "Движение фильтра",
        note:     "LFO на Cutoff: синусоида, 0.08–0.12 Hz (очень медленно), глубина 25–35%. Пэд «дышит» и живёт — не статичный фон."
      },
      {
        pluginId: "pro-r",
        role:     "Большая реверберация",
        note:     "Character 8 (ближе к Vintage), Size Large, Decay 4–6 сек, Pre-Delay 5 ms, Mix 40–55%. Пэд должен «плавать» в реверберации."
      },
      {
        pluginId: "timeless-3",
        role:     "Размытый делэй",
        note:     "Режим Stereo, Time 1/4, Feedback 45%, Mod Rate 0.15 Hz Depth высокий. HPF 600 Hz на повторениях. Mix 20%. Добавляет мерцание и движение."
      },
      {
        pluginId: "fruity-stereo-enhancer",
        role:     "Расширение стерео",
        note:     "Stereo Separation 55–65%. Не больше — иначе фазовые проблемы в моно. Пэды должны «обнимать» слушателя."
      }
    ]
  },

  {
    id:    "mt-bass",
    name:  "Melodic Techno — Bass",
    genre: "Melodic Techno",
    color: "#10B981",
    icon:  "🔊",
    tags:  ["bass", "sub", "melodic techno"],
    desc:  "Чистый, глубокий бас с контролируемым суббасом — слышен и на клубных системах, и на наушниках.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Коррекция + M/S",
        note:     "HP 28 Hz. Bell +2 dB @ 55–65 Hz Q=1.0 (суббас). Bell −3 dB @ 200–250 Hz (убрать бочку). M/S: Side HPF 200 Hz — весь суббас строго в моно."
      },
      {
        pluginId: "pro-c-2",
        role:     "Компрессия динамики",
        note:     "Clean режим, Ratio 4:1, Attack 15 ms, Release 120 ms, GR 3–5 dB. Ноты баса должны быть примерно одинаковой громкости. SC HPF 100 Hz."
      },
      {
        pluginId: "saturn-2",
        role:     "Гармоники для маленьких АС",
        note:     "Tape режим только для Mid-полосы 80–500 Hz, Drive 15–20%, Mix 25%. Добавляет 2-ю и 3-ю гармоники — бас слышен на ноутбуке и телефоне где суббас не воспроизводится."
      },
      {
        pluginId: "pro-l-2",
        role:     "Контроль пиков",
        note:     "Transparent, GR max 3 dB. Убирает острые пики от отдельных нот не убивая общую динамику баса."
      }
    ]
  },

  {
    id:    "mt-master",
    name:  "Melodic Techno — Мастер",
    genre: "Melodic Techno",
    color: "#F59E0B",
    icon:  "🏆",
    tags:  ["master", "мастеринг", "melodic techno"],
    desc:  "Мастер-чейн для мягкого, глубокого звука мелодичного техно. Референс: Cercle Sets, INNERVISIONS, Afterlife.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Тональный баланс",
        note:     "HP 22 Hz (физически неслышимый инфра). Gentle shelf +1 dB @ 12 kHz Q=0.7 (воздух). Если нужно: Bell −1.5 dB @ 3–5 kHz (убрать цифровую резкость). Используй Analyzer против референса."
      },
      {
        pluginId: "pro-c-2",
        role:     "Mastering-компрессор",
        note:     "Режим Mastering. Ratio 1.5:1, Attack 40 ms, Release 250 ms, GR max 1.5 dB. Только клеит и добавляет незаметный «клей» миксу."
      },
      {
        pluginId: "maximus",
        role:     "Многополосная обработка",
        note:     "Low: Compressor Ratio 2:1 (контроль баса). Mid: Upward Expander (подъём тихих деталей). High: gentle Limiter. Threshold очень высокий — Maximus работает деликатно."
      },
      {
        pluginId: "ozone-11",
        role:     "Тональный контроль + Imager",
        note:     "Только Imager (M/S ширина: +10% Side выше 200 Hz) + Tonal Balance EQ (проверь против жанрового референса). Не перегружай цепь Ozone-модулями."
      },
      {
        pluginId: "pro-l-2",
        role:     "Финальный лимитер",
        note:     "Transparent, Ceiling −1.0 dBTP, LUFS Target −10 LUFS (Spotify/Apple Music). Не более 3 dB GR. Используй Diff-мониторинг: что обрезаешь — не должно быть музыкальным."
      }
    ]
  },

  /* ═══════════════════════════════════════════
     HI TECHNO / HARD TECHNO
  ═══════════════════════════════════════════ */
  {
    id:    "ht-kick",
    name:  "Hi Techno — Kick (Агрессивный)",
    genre: "Hi Techno",
    color: "#EF4444",
    icon:  "💥",
    tags:  ["kick", "hi techno", "hard techno", "агрессивный"],
    desc:  "Резкий, жёсткий кик с максимальным ударом. Как у Alignment, SPFDJ, Colyn на тёмных сетах. Слышен через любой звук.",
    steps: [
      {
        pluginId: "transient-processor",
        role:     "Максимизация удара",
        note:     "Attack +5 dB (максимальный щелчок), Sustain −2 dB (укоротить хвост). Hi Techno кик агрессивен — атака режет через микс."
      },
      {
        pluginId: "pro-q-3",
        role:     "Резкая EQ-скульптура",
        note:     "HP 40 Hz (суббас меньше чем в MT), Bell +4 dB @ 80 Hz Q=1.5 (удар), Bell −4 dB @ 250–350 Hz (убрать весь «картон»), Bell +5 dB @ 3–5 kHz Q=2 (агрессивная атака)."
      },
      {
        pluginId: "wave-shaper",
        role:     "Дисторшн / клиппинг",
        note:     "Soft Clipping кривая, Drive 35–50%, Mix 50–70%. Hard Techno кик должен быть немного искажён — это даёт «металлическую» агрессию которой нет у чистого кика."
      },
      {
        pluginId: "pro-c-2",
        role:     "VCA-компрессия",
        note:     "Режим Classic (VCA-характер), Ratio 8:1, Attack 1 ms, Release 60 ms, GR 6–8 dB. Жёсткое «сплющивание» — кик становится плотным и плоским по динамике."
      },
      {
        pluginId: "maximus",
        role:     "Финальное насыщение и лимит",
        note:     "Low Band: Limiter −3 dB (контроль суббаса). Full: Upward Compression — тихие части кика поднимаются. Выход Maximus гарантирует стабильный уровень."
      }
    ]
  },

  {
    id:    "ht-perc",
    name:  "Hi Techno — Perc / Clap / Snare",
    genre: "Hi Techno",
    color: "#F97316",
    icon:  "🔩",
    tags:  ["perc", "clap", "snare", "hi techno"],
    desc:  "Металлическая, хрустящая перкуссия и клэп для Hi Techno. Острые, слышимые через весь микс.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "HP + подъём присутствия",
        note:     "HP 200 Hz (только верх и удар). Bell +4 dB @ 5–8 kHz Q=1.8 (металлический «хруст»). Bell −3 dB @ 1–2 kHz Q=2 (убрать «пластиковый нос»)."
      },
      {
        pluginId: "saturn-2",
        role:     "Металлическое искажение",
        note:     "Режим Amp или Tube, High-Band Drive 40–60%, Mix 60%. Saturn 2 на верхней полосе добавляет гармоники которые делают клэп «металлическим» — характерно для Hi Techno."
      },
      {
        pluginId: "pro-c-2",
        role:     "Classic VCA",
        note:     "Режим Classic, Ratio 6:1, Attack 0.5 ms (мгновенно), Release 45 ms, GR 5–7 dB. Сжимает почти как ограничитель — перкуссия максимально плотная."
      },
      {
        pluginId: "fruity-reeverb-2",
        role:     "Короткая комната",
        note:     "Room Small, Decay 0.3–0.5 сек, Mix 15–20%. Не нужен большой реверб — короткая комната добавляет «живость» без размытия ритма."
      }
    ]
  },

  {
    id:    "ht-bass",
    name:  "Hi Techno — Bass (Дисторшн)",
    genre: "Hi Techno",
    color: "#DC2626",
    icon:  "⚡",
    tags:  ["bass", "distortion", "hi techno", "aggressive"],
    desc:  "Агрессивный, искажённый бас с мощным суббасом. Hi Techno bass не чистый — он рычит.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Pre-distortion EQ",
        note:     "HP 30 Hz. Bell +3 dB @ 80 Hz (суббас перед искажением). Bell −5 dB @ 400–600 Hz (убрать «гудение» которое будет усилено дисторшном)."
      },
      {
        pluginId: "wave-shaper",
        role:     "Основной дисторшн",
        note:     "Hard Clip или Fold кривая, Drive 45–65%. Именно Wave Shaper даёт характерный Hi Techno «рык» баса. Mix 60–80% (параллельно сохраняешь суббас)."
      },
      {
        pluginId: "pro-q-3",
        role:     "Post-distortion EQ",
        note:     "Второй Pro-Q 3 после дисторшна. Bell −4 dB @ 1–3 kHz Q=2 (убрать неприятные интермодуляционные искажения). HP 45 Hz (дисторшн добавляет DC offset)."
      },
      {
        pluginId: "pro-c-2",
        role:     "Компрессия искажённого баса",
        note:     "Режим Bus, Ratio 4:1, Attack 20 ms, Release 100 ms. Дисторшн делает динамику непредсказуемой — компрессор приводит всё к единому уровню."
      },
      {
        pluginId: "fruity-peak-controller",
        role:     "Sidechain ducking от кика",
        note:     "Peak Controller на канале кика → Volume баса. Когда кик бьёт, бас уступает место. Критично в Hi Techno — кик и бас конкурируют в одном диапазоне."
      }
    ]
  },

  {
    id:    "ht-lead",
    name:  "Hi Techno — Raw Lead Synth",
    genre: "Hi Techno",
    color: "#7C3AED",
    icon:  "🔪",
    tags:  ["lead", "synth", "raw", "hi techno"],
    desc:  "Резкий, сырой, гипнотичный лид — типичная Hi Techno текстура. SPFDJ, Charlotte de Witte стиль.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Хирургическая EQ",
        note:     "Убирай резонансы: Alt+drag solo-прослушивание, найди «больные» частоты. Bell −5 dB @ резонансах Q=6. HP 100–150 Hz — лид не несёт бас."
      },
      {
        pluginId: "hardcore",
        role:     "Дисторшн / Гитарный кабинет",
        note:     "Выбери aggressive amp + cabinet. Drive 40–60%. Hardcore добавляет «гитарный» агрессивный характер синтезатору — он перестаёт звучать как синт."
      },
      {
        pluginId: "pro-c-2",
        role:     "Жёсткая компрессия",
        note:     "Classic, Ratio 10:1, Attack 1 ms, Release 50 ms. Лид полностью «сплющен» по динамике — гипнотичный, монотонный характер Hi Techno."
      },
      {
        pluginId: "ott",
        role:     "Многополосный подъём",
        note:     "Depth 30–40%. OTT на лид после компрессора — поднимает тихие обертоны и делает звук «вибрирующим». Характерная текстура Hi Techno лидов."
      },
      {
        pluginId: "fruity-delay-3",
        role:     "Ритмический делэй",
        note:     "1/16 или 1/8 Stereo, Feedback 20%, LPF 4 kHz на повторениях, Mix 12%. Только намёк на делэй — даёт движение без размытия ритма."
      }
    ]
  },

  {
    id:    "ht-master",
    name:  "Hi Techno — Мастер",
    genre: "Hi Techno",
    color: "#B91C1C",
    icon:  "🔊",
    tags:  ["master", "мастеринг", "hi techno", "loud"],
    desc:  "Громкий, плотный, агрессивный мастер для клуба. Максимальная читаемость при высокой громкости.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Подготовительный EQ",
        note:     "HP 22 Hz. Bell −2 dB @ 250–350 Hz Q=1.5 (убрать «муть» которая накапливается при громком воспроизведении). Shelf +1.5 dB @ 8 kHz (воздух и читаемость)."
      },
      {
        pluginId: "pro-c-2",
        role:     "Bus-компрессия",
        note:     "Режим Bus. Ratio 3:1, Attack 20 ms, Release 180 ms (Auto), GR 2–3 dB. «Клей» для всего микса — элементы становятся одним целым."
      },
      {
        pluginId: "maximus",
        role:     "Многополосное выравнивание",
        note:     "Low Band: Limiter (суббас в узде). Mid: Compressor Ratio 2:1. High: Expander (поднять детали). Hi Techno требует плотный, равномерный спектр."
      },
      {
        pluginId: "pro-l-2",
        role:     "Финальный лимитер (Агрессивный)",
        note:     "Алгоритм Aggressive, Ceiling −0.5 dBTP, LUFS Target −8 LUFS (клуб). GR до 5–6 dB допустимо для Hi Techno — жанр предполагает высокую компрессию мастера."
      }
    ]
  },

  /* ═══════════════════════════════════════════
     UNIVERSAL CHAINS
  ═══════════════════════════════════════════ */
  {
    id:    "vocal-chain",
    name:  "Вокальный чейн",
    genre: "Universal",
    color: "#EC4899",
    icon:  "🎤",
    tags:  ["вокал", "vocal", "chain", "mix"],
    desc:  "Стандартный профессиональный вокальный чейн для современной музыки.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Коррекция и тон",
        note:     "HP 80–100 Hz (убрать комнату и ручки/шумы). Notch на проблемных резонансах. Bell +2 dB @ 3–4 kHz (присутствие). Bell −2 dB @ 500 Hz (убрать «коробочность»)."
      },
      {
        pluginId: "pro-c-2",
        role:     "Vocal-компрессор",
        note:     "Режим Vocal или Opto. Ratio 3:1, Attack 15 ms, Release 60 ms, GR 4–6 dB. SC HPF 120 Hz. Вокал должен быть ровным, но сохранять экспрессию."
      },
      {
        pluginId: "pro-ds",
        role:     "De-esser",
        note:     "Частота 6–9 kHz, режим Dynamic (не Gain Reduction). Режь только сибилянты, не трогая остальной воздух. Проверяй на Solo режиме."
      },
      {
        pluginId: "saturn-2",
        role:     "Аналоговое тепло",
        note:     "Tape режим, Drive 10–15%, Mix 20–25%. Добавляет мягкие гармоники — вокал «приклеивается» к биту. Параллельно, не в цепь."
      },
      {
        pluginId: "pro-r",
        role:     "Вокальный реверб",
        note:     "Character 5–6, Size Small-Medium, Pre-Delay 18–25 ms, Mix 15–25%. Post EQ: HPF 300 Hz + LPF 6 kHz. Реверб должен добавлять глубину, не мешать разборчивости."
      }
    ]
  },

  {
    id:    "vocal-atmospheric",
    name:  "Атмосферный / Вайбовый вокал",
    genre: "Universal",
    color: "#A78BFA",
    icon:  "🌫️",
    tags:  ["вокал", "атмосфера", "вайб", "ambient", "dreamy", "reverb"],
    desc:  "Вокал утоплен в пространстве, размыт, как будто поёт из другого измерения. Стиль: Bon Iver, James Blake, Burial, Bicep. Работает как самостоятельный слой или как фоновая текстура поверх бита.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Тональная обрезка",
        note:     "HP 120–180 Hz (вокал не должен конкурировать с басом). Срезать 300–500 Hz Q=2 на −3 dB (убрать «телефонность»). Мягкий shelf +1.5 dB @ 10 kHz (воздух)."
      },
      {
        pluginId: "pro-c-2",
        role:     "Лёгкая компрессия (не душить)",
        note:     "Режим Opto, Ratio 2:1, Attack 30 ms, Release Auto, GR 2–3 dB. Цель — выровнять уровень, оставить дыхание и нюансы. Не перекомпрессировывать."
      },
      {
        pluginId: "saturn-2",
        role:     "Тепло + лёгкая гармонизация",
        note:     "Режим Tube или Tape, Drive 8–12%, Mix 15–20%. Добавляет нечётные гармоники, вокал становится более «плотным» и живым. Очень мягко."
      },
      {
        pluginId: "gross-beat",
        role:     "Ритмическая текстура (опционально)",
        note:     "Pitch envelope: спадающая питч-обёртка для создания эффекта «плавающего» вокала. Volume: случайный паттерн на 1/8 для дробления. Mix 30–50% на отдельном Return."
      },
      {
        pluginId: "fruity-delay-3",
        role:     "Пространственный пинг-понг дилей",
        note:     "3/8 + 5/8 (или 1/4 + 3/8) ping-pong. Feedback 40%. Фильтр: HPF 400 Hz + LPF 4 kHz на эхе — эхо не должно быть ярче оригинала. Mix 25–35%."
      },
      {
        pluginId: "pro-r",
        role:     "Большой атмосферный реверб",
        note:     "Character 7–8, Size Large или Hall, Decay 3–5 сек, Pre-Delay 30–50 ms. Post EQ: HP 250 Hz (реверб не должен мутить низ). Mix 40–60% — вокал буквально купается. Это суть эффекта."
      }
    ]
  },

  {
    id:    "vocal-echo-fx",
    name:  "Вокал с Эхо (Dub Echo / Tape Effect)",
    genre: "Universal",
    color: "#F97316",
    icon:  "🔁",
    tags:  ["вокал", "эхо", "dub", "tape", "delay", "fx"],
    desc:  "Классический dub-echo эффект — вокал повторяется и затухает в пространстве. Стиль: регги продюсеры 70х, современный dub techno, dark disco. Характерен для King Tubby, Lee \"Scratch\" Perry, современных: Objekt, Skee Mask.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Срез низа и верха",
        note:     "HP 150 Hz. LP 10 kHz (имитация tape bandwidth). Это сделает эхо «тёмным» и vintage. Основной вокал можно оставить полным."
      },
      {
        pluginId: "pro-c-2",
        role:     "Компрессор перед дилеем",
        note:     "Ratio 4:1, Attack 5 ms, Release 80 ms, GR 4–6 dB. Сжатый сигнал в дилее даёт более равномерные повторения — профессиональный dub-подход."
      },
      {
        pluginId: "saturn-2",
        role:     "Tape сатурация",
        note:     "Режим Tape, Drive 20–30%, Mix 100% (перед дилеем). Добавляет wow&flutter ощущение. Можно поставить в Send Chain перед дилеем для эффекта «изношенной плёнки»."
      },
      {
        pluginId: "fruity-delay-bank",
        role:     "Основной dub-дилей",
        note:     "Delay Bank: два тапа — 3/8 (60% feedback) и 6/8 (30% feedback). Включи Ping-Pong для хаотичного разброса в стерео. Feedback должен уходить в реверб — классика dub-микша."
      },
      {
        pluginId: "fruity-reeverb-2",
        role:     "Реверб на хвост эха",
        note:     "Large Room или Plate, Decay 2–3 с, Mix 30%. Реверб ставится после дилея в Send — эхо «тонет» в реверб. Это создаёт ощущение глубокого тоннеля."
      }
    ]
  },

  {
    id:    "vocal-bg-texture",
    name:  "Фоновый Вокал (Background Texture)",
    genre: "Universal",
    color: "#10B981",
    icon:  "🫧",
    tags:  ["вокал", "background", "texture", "pad", "хор", "ambient"],
    desc:  "Вокал превращается в атмосферный фоновый звук, почти как синтпад. Работает как подложка под основной вокал или самостоятельный элемент аранжировки. Стиль: Sigur Rós, Burial, Jon Hopkins, Four Tet.",
    steps: [
      {
        pluginId: "newtone",
        role:     "Питч-коррекция и роботизация",
        note:     "Speed 100% (мгновенная коррекция) — это создаёт искусственный характер. Или наоборот: Speed 0 + Correction 60% для плавающего pitch. Экспериментируй с обоими."
      },
      {
        pluginId: "pro-q-3",
        role:     "Срез всех «вокальных» частот",
        note:     "HP 300–400 Hz — убираем разборчивость речи. LP 6–8 kHz — убираем «воздух». Цель: оставить только «суть» — тон без слов. Вокал превращается в инструмент."
      },
      {
        pluginId: "fruity-chorus",
        role:     "Хорус для разложения в пространстве",
        note:     "Depth 60–80%, Rate медленный (0.3–0.5 Hz), Stereo Separation максимальный. Хорус размывает питч и создаёт ощущение нескольких голосов/унисонов."
      },
      {
        pluginId: "gross-beat",
        role:     "Зернистость и временные артефакты",
        note:     "Time envelope: замороженная или обратная — создаёт grain-эффект без granular синтезатора. Pitch: слабый LFO. Mix 40–60%. Добавляет «сломанность» и текстуру."
      },
      {
        pluginId: "pro-r",
        role:     "Огромный реверб — вокал тонет",
        note:     "Decay 6–10 сек, Character 9–10, Size Very Large. Pre-delay 0 ms. Mix 70–90% — оригинал почти не слышен, остаётся только облако. Post EQ: HPF 400 Hz."
      },
      {
        pluginId: "maximus",
        role:     "Уровень и ламинарность",
        note:     "Low Band Limiter: убираем низкие который могут появиться от реверба. Overall: мягкий апвард-компрессор чтобы поднять тихие части облака. Ceiling −12 dB (фоновый слой должен быть тихим)."
      }
    ]
  },

  {
    id:    "vocal-dark-fx",
    name:  "Тёмный / Мрачный Вокал (Dark FX)",
    genre: "Universal",
    color: "#6B21A8",
    icon:  "🖤",
    tags:  ["вокал", "dark", "horror", "industrial", "pitch", "fx"],
    desc:  "Вокал для тёмной, мрачной или industrial музыки. Pitch-shift вниз, дисторшн, разорванная текстура. Стиль: Thom Yorke, NIN, Nine Inch Nails, Salem, Zola Jesus, тёмный ambient.",
    steps: [
      {
        pluginId: "newtone",
        role:     "Питч вниз или роботизация",
        note:     "Transpose −5 до −12 полутонов (в зависимости от источника). Или Speed 100% для полного auto-tune эффекта. Можно совмещать — часть нот вниз, часть роботизировано."
      },
      {
        pluginId: "saturn-2",
        role:     "Жёсткая сатурация / дисторшн",
        note:     "Режим Metal или Tube (перегруз), Drive 50–80%, Mix 40–60%. Добавляет агрессию и кишки. Сочетай с Pro-Q 3 после — срезай 300–700 Hz чтобы не было кашей."
      },
      {
        pluginId: "gross-beat",
        role:     "Pitch & Reverse артефакты",
        note:     "Volume Gate: 1/16 или 1/32 с неравномерным паттерном — вокал «обрывается». Pitch: случайные скачки вниз. Reverse отдельных нот. Всё вместе создаёт ощущение «сломанного» вокала."
      },
      {
        pluginId: "pro-q-3",
        role:     "Тональная деформация",
        note:     "HP 200 Hz. Сильный narrow cut @ 1–2 kHz Q=5 (убрать разборчивость). Shelf +4 dB @ 8–10 kHz (шипящая текстура). Bell +6 dB @ 80–100 Hz (глубина и угроза)."
      },
      {
        pluginId: "fruity-delay-3",
        role:     "Тёмный дилей с feedback",
        note:     "Feedback 55–65% (почти на грани самовозбуждения). Delay 1/4 или 3/8. Фильтр: LP 1.5 kHz — эхо очень тёмное. Этот дилей создаёт ощущение бесконечного туннеля."
      },
      {
        pluginId: "pro-r",
        role:     "Тёмный длинный реверб",
        note:     "Character 1–2 (тёмный), Decay 4–8 сек, Size Large. Post EQ: LP 2 kHz на реверб-хвосте — чтобы пространство было мрачным, без воздуха и блеска. Mix 35–50%."
      }
    ]
  },

  {
    id:    "drum-bus",
    name:  "Drum Bus (Клей для барабанов)",
    genre: "Universal",
    color: "#059669",
    icon:  "🎚️",
    tags:  ["drums", "bus", "glue", "группа"],
    desc:  "Группа барабанов: кик + снейр + хэт → один плотный слитный звук.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "Группавой EQ",
        note:     "HP 30 Hz. Gentle shelf +1.5 dB @ 10 kHz (воздух группы). Bell −2 dB @ 300–500 Hz (убрать «коробку» которая накапливается от всех барабанов)."
      },
      {
        pluginId: "pro-c-2",
        role:     "Glue-компрессор",
        note:     "Режим Bus. Ratio 4:1, Attack 30 ms (пропустить атаки), Release Auto, GR 3–4 dB. Slow Attack — главное. Так транзиенты проходят, а хвосты сжимаются."
      },
      {
        pluginId: "transient-processor",
        role:     "После компрессора: усиление атак",
        note:     "Attack +3 dB после компрессии — восстанавливаем удар который немного «съел» компрессор. Sustain −2 dB для плотности."
      },
      {
        pluginId: "maximus",
        role:     "Многополосный контроль",
        note:     "Low Band: Compressor (контроль баса кика). Mid Band: Upward Comp (поднять снейр в середине). High: легко, не трогать. Очень мягкие настройки."
      }
    ]
  },

  {
    id:    "edm-lead",
    name:  "EDM / Progressive Lead",
    genre: "EDM",
    color: "#F59E0B",
    icon:  "⚡",
    tags:  ["lead", "edm", "progressive", "supersaw"],
    desc:  "Широкий, яркий лид для Progressive House, Big Room, Future Bass.",
    steps: [
      {
        pluginId: "pro-q-3",
        role:     "EQ + M/S",
        note:     "HP 150 Hz. Bell +3 dB @ 8–10 kHz (shine). M/S режим: Side +2 dB @ 5 kHz (ширина без центра). Убери 400 Hz Mid Q=3 (убрать «нос» суперсо)."
      },
      {
        pluginId: "ott",
        role:     "Многополосная компрессия",
        note:     "Depth 40–60%, Time Medium. OTT — стандарт для EDM лидов. Поднимает тихие обертоны, делает суперсо живым и насыщенным."
      },
      {
        pluginId: "saturn-2",
        role:     "Насыщение",
        note:     "Tape режим Mid-полосы (400–5000 Hz), Drive 25%, Mix 35%. Добавляет гармоники — лид «заполняет» спектр."
      },
      {
        pluginId: "microshift",
        role:     "Stereo Width",
        note:     "Style II, Detune 16–22 cents, Mix 80%. Для EDM лида можно широко. Проверяй моно-совместимость!"
      },
      {
        pluginId: "pro-l-2",
        role:     "Brick wall",
        note:     "Transparent, Ceiling −0.5 dB. Лид должен быть громким, но не клипировать до мастера."
      }
    ]
  }

];


/* ──────────────────────────────────────────────────────────
   COMPATIBILITY MATRIX — матрица совместимости плагинов
   rating: "perfect" | "good" | "caution" | "avoid"
   ────────────────────────────────────────────────────────── */
const COMPAT = [

  /* ── EQ + Динамика ── */
  {
    a: "pro-q-3", b: "pro-c-2",
    rating: "perfect",
    label:  "Эталонный чейн",
    note:   "EQ до компрессора убирает проблемные частоты, которые заставляют компрессор срабатывать некорректно. Основа большинства профессиональных чейнов. Также работает EQ после — для тонального баланса уже сжатого сигнала."
  },
  {
    a: "pro-c-2", b: "pro-l-2",
    rating: "perfect",
    label:  "Компрессор → Лимитер",
    note:   "Классика мастеринга. Компрессор управляет динамикой, лимитер держит пики. Pro-C 2 в режиме Mastering → Pro-L 2 Transparent — финальный стандарт звука."
  },
  {
    a: "pro-q-3", b: "maximus",
    rating: "good",
    label:  "EQ перед многополосным",
    note:   "Pro-Q 3 делает грубую тональную коррекцию, Maximus обрабатывает уже подготовленный сигнал по полосам. Правильный порядок: сначала EQ, потом Maximus."
  },
  {
    a: "maximus", b: "pro-l-2",
    rating: "perfect",
    label:  "Мастеринговый дуэт",
    note:   "Maximus как многополосный pre-limiter, Pro-L 2 как финальный brick-wall. Maximus не должен заменять Pro-L 2 — его лимитер менее прозрачен на полном сигнале."
  },
  {
    a: "pro-q-3", b: "pro-l-2",
    rating: "good",
    label:  "Коррекция → Лимит",
    note:   "Нормальный чейн для быстрого мастеринга. Pro-Q 3 убирает лишнее, Pro-L 2 держит громкость. Без промежуточной компрессии — лимитер будет работать жёстче."
  },

  /* ── Насыщение ── */
  {
    a: "saturn-2", b: "pro-c-2",
    rating: "good",
    label:  "Сатурация → Компрессия",
    note:   "Saturn 2 добавляет гармоники и слегка поднимает RMS. Компрессор после него управляет динамикой уже насыщенного сигнала. Хороший порядок — сатурация создаёт характер, компрессор его «клеит»."
  },
  {
    a: "ott", b: "saturn-2",
    rating: "good",
    label:  "Трёхполосный контраст",
    note:   "OTT поднимает тихие части спектра, Saturn 2 добавляет тепло. Хорошо на синтах и лидах. Следи за общим уровнем — оба плагина повышают воспринимаемую громкость."
  },
  {
    a: "ott", b: "sausage-fattener",
    rating: "caution",
    label:  "Осторожно: перегруз",
    note:   "Оба плагина поднимают уровень и добавляют гармоники. Вместе легко получить неприятное, «пластиковое» перенасыщение. Если используешь оба — снижай Depth в OTT до 20–25% и Colour в Sausage до 30%."
  },
  {
    a: "wave-shaper", b: "pro-c-2",
    rating: "good",
    label:  "Дисторшн → Компрессия",
    note:   "Дисторшн делает динамику непредсказуемой. Компрессор после него нормализует уровни. Стандарт для агрессивного баса и кика в Hi Techno."
  },
  {
    a: "hardcore", b: "pro-q-3",
    rating: "good",
    label:  "Amp → Чистка",
    note:   "Hardcore создаёт много гармоник, в том числе нежелательных. Pro-Q 3 после него убирает неприятные частоты которые добавил усилитель. Всегда ставь EQ после дисторшна."
  },
  {
    a: "sausage-fattener", b: "pro-l-2",
    rating: "good",
    label:  "Фэттенер → Лимитер",
    note:   "Sausage Fattener поднимает уровень, Pro-L 2 держит потолок. Обычная пара на шинах и мастере в EDM. Главное — не переусердствовать с Colour knob."
  },

  /* ── Пространство ── */
  {
    a: "pro-r", b: "timeless-3",
    rating: "good",
    label:  "Реверб + Делэй",
    note:   "Классическая пространственная пара. Делэй ставь ДО реверба — тогда повторения «живут» в реверберации. Делэй ПОСЛЕ реверба — повторения чистые поверх пространства. Два разных эффекта."
  },
  {
    a: "fruity-reeverb-2", b: "timeless-3",
    rating: "good",
    label:  "Нативная пространственность",
    note:   "Бюджетная альтернатива связке Pro-R + Timeless. Оба нативных — низкий CPU. Порядок: Delay → Reverb."
  },
  {
    a: "pro-r", b: "pro-r",
    rating: "caution",
    label:  "Двойной реверб",
    note:   "Иногда используют два реверба: первый короткий (комната), второй длинный (зал). Но легко получить «грязь». Используй Pre-Delay и Post EQ в обоих — режь суббас и верхние частоты хвоста."
  },

  /* ── Стерео ── */
  {
    a: "microshift", b: "fruity-stereo-enhancer",
    rating: "caution",
    label:  "Двойное расширение — осторожно",
    note:   "MicroShift и Stereo Enhancer оба расширяют стерео-поле разными методами. Вместе создают огромную ширину, но с высокой вероятностью фазовых проблем. Проверяй в моно — если сигнал исчезает, убирай один из них."
  },
  {
    a: "microshift", b: "pro-q-3",
    rating: "good",
    label:  "Ширина + EQ контроль",
    note:   "Pro-Q 3 в M/S режиме после MicroShift позволяет корректировать только расширенную часть (Side). Можно режь суббас в Side — бас остаётся в моно несмотря на расширение."
  },

  /* ── Динамика ── */
  {
    a: "pro-c-2", b: "transient-processor",
    rating: "good",
    label:  "Компрессор → Транзиент",
    note:   "Компрессор немного «съедает» атаку инструмента. Transient Processor после него восстанавливает удар. Классика для Drum Bus: сначала клеим, потом возвращаем punch."
  },
  {
    a: "fruity-compressor", b: "pro-l-2",
    rating: "good",
    label:  "Нативная динамика",
    note:   "Нативный компрессор FL + профессиональный лимитер. Экономичная пара. Fruity Compressor в RMS режиме управляет динамикой, Pro-L 2 держит потолок."
  },
  {
    a: "maximus", b: "maximus",
    rating: "avoid",
    label:  "Не ставь два Maximus",
    note:   "Два Maximus в цепи — чрезмерная обработка. Артефакты многополосной компрессии суммируются. Один Maximus с правильными настройками всегда лучше двух."
  },
  {
    a: "ott", b: "ott",
    rating: "good",
    label:  "Стacked OTT — рабочий трюк",
    note:   "Два OTT на очень малой Depth (15–25% каждый) — аккуратнее и музыкальнее чем один OTT на 50%. Первый создаёт баланс, второй доводит до ума. Популярно на EDM лидах."
  },

  /* ── Фильтры / Модуляция ── */
  {
    a: "fruity-love-philter", b: "pro-r",
    rating: "good",
    label:  "Движение + Пространство",
    note:   "Love Philter создаёт движение (LFO на фильтр), Pro-R помещает это движение в пространство. Идеально для пэдов в Melodic Techno — звук «живёт» и «дышит»."
  },
  {
    a: "volcano-3", b: "pro-c-2",
    rating: "good",
    label:  "Фильтр → Компрессор",
    note:   "Volcano создаёт резонансный фильтр с острыми пиками. Компрессор после него укрощает эти пики — звук сохраняет характер фильтра, но становится управляемым."
  },

  /* ── Утилиты ── */
  {
    a: "fruity-peak-controller", b: "pro-c-2",
    rating: "good",
    label:  "Нативный SC vs SC-компрессор",
    note:   "Peak Controller — для управления параметрами (Volume, Cutoff). Pro-C 2 с External SC — для настоящей sidechain-компрессии (ducking с огибающей компрессора). Разные задачи, не конкурируют."
  },
  {
    a: "pro-q-3", b: "pro-q-3",
    rating: "good",
    label:  "Два EQ — разные задачи",
    note:   "Два Pro-Q 3 в цепи — стандартная практика. Первый (Static EQ): грубая коррекция, HP/LP. Второй (Dynamic EQ): хирургические динамические полосы. Или: один до компрессора, один после."
  }

];


/* ──────────────────────────────────────────────────────────
   QUIZ — дерево вопросов
   type: "question" | "result"
   ────────────────────────────────────────────────────────── */
const QUIZ = {
  start: "q_what",

  questions: {
    q_what: {
      text: "Что обрабатываем?",
      icon: "🎯",
      answers: [
        { label: "Kick / барабаны",   next: "q_drum_task" },
        { label: "Bass / 808",        next: "q_bass_style" },
        { label: "Synth Lead",        next: "q_lead_style" },
        { label: "Pad / Атмосфера",   next: "q_pad_task"  },
        { label: "Вокал",             next: "q_vocal_style" },
        { label: "Полный микс / Мастер", next: "q_master_genre" }
      ]
    },

    q_drum_task: {
      text: "Какая задача с барабанами?",
      icon: "🥁",
      answers: [
        { label: "Больше удара / punch",     next: "r_drum_punch" },
        { label: "Клей всей группы",         next: "r_drum_bus"   },
        { label: "Дисторшн / агрессия",      next: "r_drum_dist"  },
        { label: "Тональная коррекция",      next: "r_drum_eq"    }
      ]
    },

    q_bass_style: {
      text: "Стиль музыки?",
      icon: "🎵",
      answers: [
        { label: "Melodic Techno",    next: "r_bass_mt"    },
        { label: "Hi / Hard Techno",  next: "r_bass_ht"    },
        { label: "EDM / House",       next: "r_bass_edm"   },
        { label: "Любой / универсально", next: "r_bass_uni" }
      ]
    },

    q_lead_style: {
      text: "Какой характер лида?",
      icon: "🎹",
      answers: [
        { label: "Тёплый, мелодичный",     next: "r_lead_warm"  },
        { label: "Агрессивный, сырой",     next: "r_lead_raw"   },
        { label: "Широкий, большой",       next: "r_lead_wide"  },
        { label: "С движением / фильтром", next: "r_lead_filter" }
      ]
    },

    q_pad_task: {
      text: "Что нужно пэду?",
      icon: "🌊",
      answers: [
        { label: "Пространство и глубина",  next: "r_pad_space"    },
        { label: "Движение и живость",      next: "r_pad_movement" },
        { label: "Ширина стерео",           next: "r_pad_wide"     }
      ]
    },

    q_vocal_style: {
      text: "Какой эффект нужен вокалу?",
      icon: "🎤",
      answers: [
        { label: "Атмосферный / вайбовый",   next: "r_vocal_atmospheric" },
        { label: "С эхом / dub-эффект",      next: "r_vocal_echo"        },
        { label: "Фоновый / текстура",       next: "r_vocal_bg"          },
        { label: "Тёмный / мрачный",         next: "r_vocal_dark"        }
      ]
    },

    q_master_genre: {
      text: "Жанр / стиль мастера?",
      icon: "🏆",
      answers: [
        { label: "Melodic Techno",    next: "r_master_mt"  },
        { label: "Hi / Hard Techno",  next: "r_master_ht"  },
        { label: "EDM / House",       next: "r_master_edm" },
        { label: "Любой / общий",     next: "r_master_uni" }
      ]
    }
  },

  results: {
    r_drum_punch: {
      title: "Punch — усиление удара",
      emoji: "💥",
      plugins: ["transient-processor", "pro-c-2", "pro-q-3"],
      chain: "drum-bus",
      tips: [
        "Transient Processor: Attack +4 dB, Sustain −2 dB",
        "Pro-C 2 режим Punch, Attack 8 ms (пропускает удар), Release 80 ms",
        "Pro-Q 3: Bell +3 dB @ 4–5 kHz для «щелчка» атаки"
      ]
    },
    r_drum_bus: {
      title: "Drum Bus — клей группы",
      emoji: "🎚️",
      plugins: ["pro-c-2", "pro-q-3", "transient-processor"],
      chain: "drum-bus",
      tips: [
        "Pro-C 2 режим Bus, Attack 30 ms (медленно!), GR 3–4 dB",
        "Pro-Q 3: +1.5 dB shelf @ 10 kHz, −2 dB @ 300 Hz",
        "Transient Processor после компрессора: возвращаем атаку"
      ]
    },
    r_drum_dist: {
      title: "Агрессивные барабаны",
      emoji: "🔥",
      plugins: ["wave-shaper", "saturn-2", "pro-c-2"],
      chain: "ht-kick",
      tips: [
        "Wave Shaper: Soft Clip, Drive 35–50%, параллельно Mix 60%",
        "Saturn 2: Amp режим на Hi-полосе для металлического хруста",
        "Компрессор Classic после дисторшна для контроля"
      ]
    },
    r_drum_eq: {
      title: "Тональная коррекция барабанов",
      emoji: "🎛️",
      plugins: ["pro-q-3", "fruity-peq2"],
      tips: [
        "Pro-Q 3: Alt+drag для solo-поиска резонансов",
        "HP 30–40 Hz на каждом барабане (убрать инфра)",
        "Bell −3 dB @ 300–400 Hz убирает «картонность» кика"
      ]
    },
    r_bass_mt: {
      title: "Melodic Techno — Bass",
      emoji: "🌊",
      plugins: ["pro-q-3", "pro-c-2", "saturn-2", "fruity-peak-controller"],
      chain: "mt-bass",
      tips: [
        "M/S EQ: Side HPF 200 Hz — суббас строго в моно",
        "Saturn 2 Tape только на Mid-полосе для гармоник",
        "Peak Controller sidechain от кика — кик и бас не конкурируют"
      ]
    },
    r_bass_ht: {
      title: "Hi Techno — Distorted Bass",
      emoji: "⚡",
      plugins: ["wave-shaper", "pro-q-3", "pro-c-2", "fruity-peak-controller"],
      chain: "ht-bass",
      tips: [
        "EQ до дисторшна: убрать 400–600 Hz чтобы не усилилось",
        "Wave Shaper Hard Clip, параллельный Mix — суббас сохранится",
        "Второй Pro-Q 3 после дисторшна: чистка IM-артефактов"
      ]
    },
    r_bass_edm: {
      title: "EDM Bass",
      emoji: "💎",
      plugins: ["pro-q-3", "ott", "sausage-fattener", "pro-l-2"],
      tips: [
        "OTT Depth 30% для насыщения суббаса",
        "Sausage Fattener: только Colour (не Fatten) на суббасе",
        "M/S EQ: суббас ниже 120 Hz всегда в моно"
      ]
    },
    r_bass_uni: {
      title: "Универсальный бас-чейн",
      emoji: "🔊",
      plugins: ["pro-q-3", "pro-c-2", "pro-l-2"],
      tips: [
        "EQ → Компрессор → Лимитер — базовый порядок",
        "M/S: Side HPF 150–200 Hz на любом жанре",
        "Pro-C 2 Clean режим, GR 3–5 dB"
      ]
    },
    r_lead_warm: {
      title: "Тёплый Melodic Lead",
      emoji: "🎹",
      plugins: ["saturn-2", "pro-c-2", "timeless-3", "pro-r", "microshift"],
      chain: "mt-lead",
      tips: [
        "Saturn 2 Tube режим, Mix 40–50% — органичность синтезатора",
        "Pro-C 2 Opto, Attack 25 ms — мягкая компрессия с характером",
        "Pro-R Character 6–7, Pre-Delay 22 ms для глубины"
      ]
    },
    r_lead_raw: {
      title: "Агрессивный Raw Lead",
      emoji: "🔪",
      plugins: ["hardcore", "pro-c-2", "ott", "pro-q-3"],
      chain: "ht-lead",
      tips: [
        "Hardcore: aggressive amp + Cabinet для гитарного характера",
        "Pro-C 2 Classic Ratio 10:1 — гипнотичная монотонность",
        "OTT 30–40% после компрессора — вибрирующая текстура"
      ]
    },
    r_lead_wide: {
      title: "Широкий EDM Lead",
      emoji: "💫",
      plugins: ["microshift", "ott", "saturn-2", "pro-q-3"],
      chain: "edm-lead",
      tips: [
        "MicroShift Style II, Detune 16–22 cents для максимальной ширины",
        "Проверяй в моно после каждого шага расширения",
        "OTT 40–50% поднимает обертоны суперсо"
      ]
    },
    r_lead_filter: {
      title: "Лид с движением фильтра",
      emoji: "🌀",
      plugins: ["fruity-love-philter", "volcano-3", "pro-c-2", "pro-r"],
      tips: [
        "Love Philter: LFO на Cutoff 0.2–0.5 Hz, синусоида",
        "Volcano 3 с резонансом — острые пики, далее компрессор",
        "Pro-R после фильтра: движение «живёт» в пространстве"
      ]
    },
    r_pad_space: {
      title: "Атмосферный пэд — Пространство",
      emoji: "🌌",
      plugins: ["pro-r", "timeless-3", "pro-q-3"],
      chain: "mt-pad",
      tips: [
        "Pro-R Size Large, Decay 4–6 сек, Character ближе к Vintage",
        "Pre-Delay 5 ms + M/S EQ: Side HP 200 Hz",
        "Timeless 3 Feedback 40–45% — мерцающие повторения"
      ]
    },
    r_pad_movement: {
      title: "Пэд с движением",
      emoji: "💨",
      plugins: ["fruity-love-philter", "timeless-3", "pro-r"],
      chain: "mt-pad",
      tips: [
        "Love Philter LFO 0.08 Hz — очень медленное «дыхание»",
        "Timeless 3 с Modulation — задержка «плывёт»",
        "Gross Beat Volume envelope для ритмических паттернов"
      ]
    },
    r_pad_wide: {
      title: "Широкий пэд",
      emoji: "🔭",
      plugins: ["microshift", "fruity-stereo-enhancer", "pro-q-3"],
      tips: [
        "MicroShift для широкого пэда — фазобезопасное расширение",
        "M/S EQ после: Side HP 200 Hz — низ остаётся в центре",
        "Fruity Stereo Enhancer не более 60% чтобы избежать фазы"
      ]
    },
    r_master_mt: {
      title: "Мастер: Melodic Techno",
      emoji: "🎯",
      plugins: ["pro-q-3", "pro-c-2", "maximus", "ozone-11", "pro-l-2"],
      chain: "mt-master",
      tips: [
        "Pro-C 2 Mastering: GR не более 1.5 dB на мастере",
        "Ozone Imager: Side +10% выше 200 Hz для ширины",
        "Pro-L 2 Transparent, LUFS −10 для стриминга"
      ]
    },
    r_master_ht: {
      title: "Мастер: Hi Techno",
      emoji: "🔊",
      plugins: ["pro-q-3", "pro-c-2", "maximus", "pro-l-2"],
      chain: "ht-master",
      tips: [
        "Pro-C 2 Bus: GR 2–3 dB для клея",
        "Maximus: Low Band Limiter для контроля суббаса",
        "Pro-L 2 Aggressive, LUFS −8 (клуб), GR до 5–6 dB"
      ]
    },
    r_master_edm: {
      title: "Мастер: EDM / House",
      emoji: "💎",
      plugins: ["pro-q-3", "pro-c-2", "maximus", "pro-l-2"],
      tips: [
        "Pro-C 2 Bus Ratio 3:1 для клея",
        "Maximus Mid: Upward Compression для детальности",
        "Pro-L 2 Aggressive, Ceiling −0.5 dBTP, LUFS −9"
      ]
    },
    r_master_uni: {
      title: "Универсальный мастер-чейн",
      emoji: "⚙️",
      plugins: ["pro-q-3", "pro-c-2", "maximus", "pro-l-2"],
      tips: [
        "EQ → Comp → Multiband → Limiter — стандартный порядок",
        "Компенсируй уровень при каждом шаге (Auto Gain в Pro-C 2)",
        "Pro-L 2 Transparent, True Peak −1.0 dBTP для стриминга"
      ]
    },

    r_vocal_atmospheric: {
      title: "Атмосферный / вайбовый вокал",
      emoji: "🌫️",
      plugins: ["pro-q-3", "pro-c-2", "pro-r", "fruity-delay-3"],
      chain: "vocal-atmospheric",
      tips: [
        "Pro-R: Decay 3–5 сек, Size Large, Mix 40–60% — вокал купается в пространстве",
        "Fruity Delay 3: пинг-понг 3/8, Feedback 40%, LPF 4 kHz на эхе",
        "Pro-C 2 режим Opto, Ratio 2:1, GR 2–3 dB — не убивать дыхание",
        "Saturn 2 Tape: Drive 10%, Mix 20% — аналоговое тепло"
      ]
    },

    r_vocal_echo: {
      title: "Вокал с Dub Echo",
      emoji: "🔁",
      plugins: ["pro-c-2", "saturn-2", "fruity-delay-bank", "fruity-reeverb-2"],
      chain: "vocal-echo-fx",
      tips: [
        "Saturn 2 Tape на Send перед дилеем — имитация изношенной плёнки",
        "Delay Bank: 3/8 Feedback 60% + 6/8 Feedback 30%, Ping-Pong",
        "Реверб ставить после дилея в Send — эхо «тонет» в пространстве",
        "Pro-Q 3: LP 10 kHz на дилей-канале — эхо должно быть тёмнее оригинала"
      ]
    },

    r_vocal_bg: {
      title: "Фоновый вокал / текстура",
      emoji: "🫧",
      plugins: ["newtone", "pro-q-3", "fruity-chorus", "pro-r"],
      chain: "vocal-bg-texture",
      tips: [
        "HP 300–400 Hz в Pro-Q 3 — убираем разборчивость, оставляем тон",
        "Fruity Chorus: Rate 0.3–0.5 Hz, Depth 70%, стерео максимум",
        "Pro-R: Decay 6–10 сек, Mix 70–90% — вокал растворяется в облаке",
        "Newtone Speed 100% для роботизации или Speed 0 для плавающего pitch"
      ]
    },

    r_vocal_dark: {
      title: "Тёмный / мрачный вокал",
      emoji: "🖤",
      plugins: ["newtone", "saturn-2", "gross-beat", "pro-r"],
      chain: "vocal-dark-fx",
      tips: [
        "Newtone: Transpose −5 до −12 полутонов для тёмного характера",
        "Saturn 2 Metal/Tube: Drive 50–80% — агрессивная сатурация",
        "Gross Beat: Volume Gate 1/16 неравномерный + Pitch LFO вниз",
        "Pro-R Character 1–2 (тёмный), Post LP 2 kHz — пространство без блеска"
      ]
    }
  }
};
