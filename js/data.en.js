/* ============================================================
   FL Studio Plugin Cheatsheet — English translations
   Only translated fields; everything else stays from data.js
   ============================================================ */

const PLUGINS_EN = {

  'pro-q-3': {
    shortDesc: 'Industry-standard parametric EQ',
    description: `Pro-Q 3 is the gold standard of digital parametric EQ. Up to 24 bands of any filter type,
    real-time spectrum analysis, dynamic bands, M/S mode, and EQ Match for referencing.
    Sounds completely transparent — zero coloration unless you want it.
    Works for any task: from surgical correction to musical tonal shaping.`,
    when: 'When you need surgical precision or musical shaping on any source',
    pros: [
      'Up to 24 bands — any filter type on each',
      'Dynamic bands: EQ reacts to signal level',
      'M/S and L/R modes — independent channel processing',
      'EQ Match — match spectrum to a reference in one click',
      'Minimum Phase and Linear Phase modes',
      'Built-in spectrum analyzer with piano roll hints'
    ],
    cons: [
      'Price — one of the most expensive EQs on the market',
      'Linear Phase mode adds latency (not for real-time use)',
      'Interface is large — uncomfortable on small screens'
    ],
    guide: [
      {
        title: 'Basics',
        text: `Click anywhere in the spectrum to add a band. Drag up/down for gain.
        Mouse wheel changes Q (bandwidth). Right-click a band to change filter type.
        Shift+drag — move frequency only without changing gain.`
      },
      {
        title: 'Key Parameters',
        params: [
          { name: 'Frequency', desc: 'Center frequency of the band (20 Hz — 20 kHz)' },
          { name: 'Gain', desc: 'Boost or cut in dB' },
          { name: 'Q / Bandwidth', desc: 'Band width: high Q = narrow, surgical' },
          { name: 'Filter Type', desc: 'Bell, Shelf, Cut (6/12/24/48 dB/oct), Notch, Tilt, Flat Tilt' },
          { name: 'Dynamic', desc: 'Make band dynamic — reacts to transients above threshold' },
          { name: 'M/S', desc: 'Enable Mid/Side mode for this band' }
        ]
      },
      {
        title: 'Workflow',
        text: `Standard approach: first cut the unwanted (HP filter at the bottom, LP at the top),
        then remove problem resonances with narrow Notch/Bell, then add character with wide Shelves.
        Use Analyzer → Solo band (Alt+click) to hear only the range being processed.`
      },
      {
        title: 'M/S Processing',
        text: `Switch channel mode to M/S. Process Mid (center) separately from Side (width).
        Classic move: cut Sub on Side below 120 Hz — bass stays in mono.
        Add air (10+ kHz) only to Side — without touching the center.`
      }
    ],
    tips: [
      {
        title: 'Compare with bypass',
        text: `Enable <strong>Output Gain</strong> compensation — a boosted EQ sounds "better" just because it's louder.
        Level-match and listen honestly.`
      },
      {
        title: 'EQ Match on the master',
        text: `Use the built-in Analyzer with a reference track.
        The <strong>EQ Match</strong> button (magnet icon) automatically matches the spectrum to any reference.`
      },
      {
        title: 'Dynamic EQ instead of a compressor',
        text: `Instead of a de-esser — place a dynamic Bell band at 6–9 kHz with a threshold trigger.
        Cuts sibilants only when they appear, without artifacts.`
      },
      {
        title: 'Band solo',
        text: `<strong>Alt+click</strong> any band — you hear only that frequency range. Great for finding resonances:
        solo with a large boost, sweep the frequency until you find the problem spot, then cut.`
      },
      {
        title: 'Spectrum collision with another track',
        text: `Pro-Q 3 can see the spectrum of a neighboring track. Insert on bass and vocals — enable <strong>Spectrum Grab</strong>
        to see where they mask each other. Cut conflicting frequencies directly from the visualization.`
      }
    ],
    controlParams: [
      { n:1, name:'Frequency',     range:'20 Hz — 20 kHz',             def:'per band',   tip:'Alt+click a band to solo-listen to only that range — great for finding resonances',                              x:50, y:45 },
      { n:2, name:'Gain',          range:'−30 to +30 dB',              def:'0 dB',        tip:'Rule: cut narrow, boost wide. Start at −3 dB when hunting for problem frequencies',                              x:50, y:55 },
      { n:3, name:'Q / Bandwidth', range:'0.025 — 40',                 def:'0.7',         tip:'Q 1–2 = musical; Q 5–10 = surgical for resonances',                                                              x:35, y:50 },
      { n:4, name:'Filter Type',   range:'Bell, Shelf, Cut, Notch, Tilt', def:'Bell',     tip:'HP/LP Cut: always remove infrasound (HP 20–30 Hz) and ultrasound (LP 20 kHz) at the start of any chain',        x:65, y:50 },
      { n:5, name:'Dynamic',       range:'Off / On (threshold)',        def:'Off',         tip:'Dynamic mode: EQ only acts when signal exceeds threshold. Use it as a de-esser or de-boom filter',              x:20, y:30 },
      { n:6, name:'M/S Mode',      range:'Stereo / Mid / Side',         def:'Stereo',      tip:'Side channel: boost air (10+ kHz) in Side — adds width without smearing the center',                           x:80, y:30 },
      { n:7, name:'Phase',         range:'Minimum / Linear / Zero Latency', def:'Min Phase', tip:'Linear Phase: for mastering without phase artifacts but adds latency. Min Phase — for live use',             x:20, y:70 },
      { n:8, name:'Output Gain',   range:'−36 to +36 dB',              def:'0 dB',        tip:'ALWAYS compensate output gain when comparing — louder sounds better even when it isn\'t',                       x:80, y:70 }
    ]
  },


  'pro-c-2': {
    shortDesc: 'Professional compressor with 8 algorithm modes',
    description: `Pro-C 2 is one of the finest compressors in the plugin world. Eight algorithm modes
    (Clean, Classic, Opto, Vocal, Mastering, Bus, Punch, Pumping) cover every scenario.
    Detailed gain reduction visualization, sidechain EQ, external sidechain — everything a
    professional producer needs in a single window.`,
    when: 'Whenever you need precise, transparent compression with character control',
    pros: [
      '8 algorithms — from transparent Clean to aggressive Pumping',
      'Built-in sidechain EQ — compression reacts to a specific frequency range',
      'Detailed gain reduction meter with history',
      'Lookahead up to 20 ms — fully transparent peak control',
      'Auto Gain — automatic level compensation after compression',
      'Very low CPU even at extreme settings'
    ],
    cons: [
      'Modes differ a lot from each other — hard for beginners to choose',
      'No built-in output limiter',
      'Price comparable to hardware counterparts'
    ],
    guide: [
      {
        title: 'Choosing the Algorithm',
        params: [
          { name: 'Clean', desc: 'Transparent, minimal coloration — mastering, bus' },
          { name: 'Classic', desc: 'VCA character, aggressive — drums and percussion' },
          { name: 'Opto', desc: 'Optical character — slow, gentle, vocals' },
          { name: 'Vocal', desc: 'Optimized for vocal transients' },
          { name: 'Mastering', desc: 'Minimum artifacts for the final master' },
          { name: 'Bus', desc: 'Glue compression for groups and buses' },
          { name: 'Punch', desc: 'Emphasizes the drum hit, attack remains audible' },
          { name: 'Pumping', desc: 'EDM sidechain pumping effect' }
        ]
      },
      {
        title: 'Core Parameters',
        params: [
          { name: 'Threshold', desc: 'Level above which compression kicks in' },
          { name: 'Ratio', desc: 'Compression amount: 2:1 gentle, 10:1 hard' },
          { name: 'Attack', desc: 'Fast = clips transient; slow = lets the hit through' },
          { name: 'Release', desc: 'Recovery time — affects groove and punchiness' },
          { name: 'Knee', desc: 'Hardness of compression onset at the threshold' },
          { name: 'Lookahead', desc: 'Anticipation — compressor reacts before the peak' }
        ]
      },
      {
        title: 'Sidechain',
        text: `Enable the SC button. The built-in SC EQ lets the compressor react only to
        specific frequencies. Example: High Pass SC at 150 Hz — bass won't trigger compression.
        For EDM pumping: external sidechain from kick to the full mix.`
      }
    ],
    tips: [
      {
        title: 'Glue on the drum bus',
        text: `<strong>Bus</strong> mode, Ratio 2:1, Attack 10–30 ms, Release Auto, GR no more than 3–4 dB.
        Drums start sounding like a single instrument rather than separate elements.`
      },
      {
        title: 'Parallel compression',
        text: `Use the Mix knob (dry/wet) inside the plugin.
        Set aggressive compression (Ratio 8:1), then pull Mix back to 20–40%.
        You get the original's attack + the compressor's body.`
      },
      {
        title: 'Vocals — Opto mode',
        text: `<strong>Opto</strong> + Auto Release + moderate Ratio (3:1–4:1) = vocals
        breathe naturally and don't sound over-compressed. Lookahead 5 ms removes clicks.`
      },
      {
        title: 'EDM Pumping',
        text: `<strong>Pumping</strong> mode, external sidechain from kick, Attack 0 ms, Release 200–400 ms
        (tune to the tempo). Ratio 10:1+, Threshold so GR is 6–12 dB on the kick.`
      },
      {
        title: 'Auto Release is your friend',
        text: `Enable <strong>Auto Release</strong> in most scenarios. The plugin picks the optimal
        recovery time for the material — fewer artifacts, more natural sound.`
      }
    ],
    controlParams: [
      { n:1,  name:'Algorithm',  range:'Clean, Classic, Opto, Vocal, Mastering, Bus, Punch, Pumping', def:'Classic', tip:'Start with Vocal for vocals, Bus for groups, Classic for drums — then fine-tune', x:50, y:18 },
      { n:2,  name:'Threshold',  range:'−60 to 0 dB',        def:'−18 dB',  tip:'Guideline: GR 3–6 dB for vocals, 1–3 dB for mastering. Don\'t chase big GR',          x:22, y:40 },
      { n:3,  name:'Ratio',      range:'1:1 to ∞:1',         def:'4:1',     tip:'2:1–4:1 = gentle and musical; 8:1+ = hard control; ∞:1 = limiter',                      x:38, y:40 },
      { n:4,  name:'Attack',     range:'0.01 — 100 ms',      def:'10 ms',   tip:'Slow attack (20–50 ms) lets the hit through — drums stay alive and punchy',             x:55, y:40 },
      { n:5,  name:'Release',    range:'1 — 5000 ms / Auto', def:'Auto',    tip:'Auto Release — enable almost always. The plugin finds the optimal time for the material', x:70, y:40 },
      { n:6,  name:'Knee',       range:'0 — 1 (Hard — Soft)',def:'0.5',     tip:'Soft Knee (1.0) = gradual onset, transparent. Hard Knee = abrupt, more obvious character', x:85, y:40 },
      { n:7,  name:'Gain',       range:'−48 to +48 dB',      def:'0 dB / Auto', tip:'Make-up Gain: enable Auto Gain — automatically compensates level after compression',  x:22, y:65 },
      { n:8,  name:'Mix',        range:'0 — 100%',           def:'100%',    tip:'Parallel compression: Mix 20–40% with aggressive settings. Preserves the original attack', x:50, y:65 },
      { n:9,  name:'Lookahead',  range:'0 — 20 ms',          def:'0 ms',    tip:'5 ms removes clicks on vocals. Higher values only if CPU allows',                        x:78, y:65 },
      { n:10, name:'Sidechain',  range:'Int / Ext + HPF/LPF',def:'Int',     tip:'SC HPF 120–150 Hz: bass won\'t trigger compression. Essential on drum bus',               x:85, y:25 }
    ]
  },

  'maximus': {
    shortDesc: "FL Studio's powerful multiband limiter/compressor",
    description: `Maximus is Image-Line's flagship mastering processor. Three independent bands
    (Low / Mid / High) plus a master bus, each with its own compressor, limiter and expander.
    Supports upward compression — raises quiet parts without touching loud ones.
    Built directly into FL Studio, no extra license needed.`,
    when: 'Final mastering or aggressive multiband loudness control in EDM/Hip-Hop',
    pros: [
      '3 bands + master — complete multiband control',
      'Upward compression — brings up the quiet without squashing the loud',
      'Built into FL Studio — zero additional cost',
      'Detailed gain reduction visualization per band',
      'Good for aggressive mastering in EDM/Hip-Hop style'
    ],
    cons: [
      'Outdated and unintuitive interface',
      'Easy to over-process — sound gets choked quickly',
      'Less transparent than Ozone/Pro-L at high loudness'
    ],
    guide: [
      {
        title: 'Maximus Structure',
        text: `Three bands: Low (below crossover 1), Mid (between crossovers), High (above crossover 2).
        Each band has its own compressor + limiter. The master bus sums all three and adds
        a final limit. Crossovers are adjustable: typically 120–200 Hz and 4–6 kHz.`
      },
      {
        title: 'Key Parameters per Band',
        params: [
          { name: 'Threshold', desc: 'Compressor/limiter threshold for this band' },
          { name: 'Ratio', desc: 'Compression amount' },
          { name: 'Attack / Release', desc: 'Reaction and recovery time' },
          { name: 'Volume', desc: 'Output level for this band' },
          { name: 'Limit', desc: 'Enable the limiter on this band' },
          { name: 'Expand', desc: 'Upward expander — raise quiet parts' }
        ]
      },
      {
        title: 'Mastering Scenario',
        text: `Low band: gentle bass compression (3:1), Fast Release.
        Mid: moderate compression (2:1), Auto Release. High: minimal compression, limit only.
        Master: limiter at -0.3 dB. Total GR on master should be no more than 3–4 dB.`
      }
    ],
    tips: [
      {
        title: 'Less is more',
        text: `Total GR on the master above 4 dB = overdone.
        Maximus can easily choke a track. Watch the meters and don't chase maximum loudness.`
      },
      {
        title: 'Upward compression for atmosphere',
        text: `On the High band enable <strong>Expand</strong> at a low value —
        quiet details (reverb tails, atmosphere) become audible without affecting peaks.`
      },
      {
        title: 'Separate bass control',
        text: `The Low band is a great way to keep bass in check.
        Set Limit on Low, -6 dB threshold, and the sub bass will never blow the master.`
      },
      {
        title: 'A/B compare',
        text: `Use the <strong>Power</strong> button on each band to quickly
        bypass processing. Make sure the processed sound is no louder than bypassed.`
      },
      {
        title: 'Preset as a starting point',
        text: `The <strong>Master — Loud</strong> preset is a good starting point for EDM mastering.
        Adjust the crossovers for each specific track.`
      }
    ],
    controlParams: [
      { n:1, name:'Low/Mid Crossover',  range:'20 — 1000 Hz',  def:'120 Hz',  tip:'Split between Low and Mid bands. 120 Hz = sub bass separate from body. Set near the bass note' },
      { n:2, name:'Mid/High Crossover', range:'500 — 20000 Hz',def:'3500 Hz', tip:'Split between Mid and High. 3–4 kHz = start of cymbals. Solo each band — make sure crossover isn\'t cutting important material' },
      { n:3, name:'Threshold (per band)',range:'-60 — 0 dB',   def:'-12 dB',  tip:'GR per band independently. Mastering: no more than 2–3 dB GR per band. More = audible squash that kills dynamics' },
      { n:4, name:'Ratio (per band)',   range:'1:1 — ∞:1',     def:'2:1',     tip:'Low: 4:1–∞:1 (bass limiter). Mid: 2:1–3:1 (gentle body). High: 1.5:1–2:1 (near-transparent for air)' },
      { n:5, name:'Expand',             range:'0 — 100%',       def:'0%',      tip:'Upward compression — raises quiet signals. On High band: 10–20% brings up reverb tails and atmosphere without affecting peaks' },
      { n:6, name:'Master Limit',       range:'-3 — 0 dB',     def:'-0.3 dB', tip:'Final ceiling on output. -0.3 dB for streaming. Enable True Peak if available — sample peaks ≠ True Peak' }
    ]
  },

  'pro-l-2': {
    shortDesc: 'Top-tier final limiter for mastering',
    description: `Pro-L 2 is the go-to choice for final master limiting. Eight algorithms
    from transparent to aggressive, True Peak control (critical for streaming), LUFS display,
    built-in ISP (Inter-Sample Peak) control. Works correctly at any tempo and with any material —
    from quiet acoustic to loud EDM.`,
    when: 'Final step of mastering — after all compression and EQ are in place',
    pros: [
      'True Peak limiting — ISP control for Spotify/Apple Music',
      '8 limiting algorithms for any material',
      'LUFS meter built into the interface',
      'Oversampling up to 32x — minimum distortion',
      'Stereo/M/S Unlink for independent channel limiting',
      'Very transparent at moderate levels'
    ],
    cons: [
      'Artifacts become audible with aggressive limiting (like any limiter)',
      'Only available as part of the Total Bundle',
      'Doesn\'t replace a proper mastering chain — final step only'
    ],
    guide: [
      {
        title: 'Algorithms',
        params: [
          { name: 'Transparent', desc: 'Minimum coloration — classical/jazz mastering' },
          { name: 'Dynamic', desc: 'Preserves dynamics best — recommended default' },
          { name: 'Aggressive', desc: 'Maximum loudness, audible compression — EDM, trap' },
          { name: 'Bus', desc: 'For group buses, not only the master' },
          { name: 'Safe', desc: 'Guarantees ISP below 0 — streaming-safe' },
          { name: 'Allround', desc: 'Balanced for most genres' },
          { name: 'Surgical', desc: 'Handles transients only, minimum artifacts' },
          { name: 'Custom', desc: 'Manual control of all internal parameters' }
        ]
      },
      {
        title: 'True Peak and Streaming Standards',
        text: `Spotify: -14 LUFS integrated, True Peak -1 dBTP. Apple Music: -16 LUFS.
        YouTube: -14 LUFS. Enable <strong>True Peak Limiting</strong> and set TP Limit to -1.0 dBTP.
        Watch the Integrated LUFS meter — the target depends on the platform.`
      },
      {
        title: 'Gain Reduction',
        text: `Target: no more than 3–4 dB GR on Pro-L 2. If you need more —
        the track needs additional compression/clipping BEFORE the limiter.
        Use Fruity Soft Clipper or Saturn 2 before Pro-L 2.`
      }
    ],
    tips: [
      {
        title: 'Soft clipper before the limiter',
        text: `Put <strong>Fruity Soft Clipper</strong> or <strong>Saturn 2</strong> (Tape mode, 20% drive)
        before Pro-L 2. The clipper shaves peaks without artifacts, the limiter has less work —
        result is louder and cleaner.`
      },
      {
        title: 'Oversampling on the final render',
        text: `On the final render, enable <strong>Oversampling 4x or 8x</strong>.
        Keep it at 2x in real time. Reduces inter-sample distortion.`
      },
      {
        title: 'Compare with original',
        text: `Press <strong>Bypass</strong> and compare — compensate loudness with Output Gain.
        If the limited sound loses "air" or punch — reduce the load.`
      },
      {
        title: 'M/S Unlink for width',
        text: `Enable <strong>Stereo Unlink</strong> at 30–50%. Mid and Side are limited
        with a degree of independence. Preserves more stereo width at loud mastering levels.`
      }
    ],
    controlParams: [
      { n:1, name:'Algorithm',     range:'Transparent, Dynamic, Aggressive, Bus, Safe, Allround, Surgical, Custom', def:'Dynamic', tip:'Transparent — classical music mastering; Aggressive — EDM/trap; Safe — guarantees passing ISP checks', x:50, y:15 },
      { n:2, name:'Input Gain',    range:'−36 to +36 dB',    def:'0 dB',            tip:'Use this as the only way to control loudness — not Threshold. Raise until you hit your target LUFS',       x:20, y:40 },
      { n:3, name:'Output Gain',   range:'−36 to +36 dB',    def:'0 dB (Ceil −1 dBTP)', tip:'Ceiling: −1.0 dBTP for Spotify/YouTube; −0.5 dBTP for a more aggressive master',                    x:80, y:40 },
      { n:4, name:'True Peak',     range:'Off / On',          def:'On',              tip:'ALWAYS enable for streaming. ISP (inter-sample peaks) can exceed 0 dBFS even when sample values are within range', x:50, y:40 },
      { n:5, name:'Oversampling',  range:'1x / 2x / 4x / 8x / 16x / 32x', def:'2x', tip:'Final render: 4x–8x. Real-time: 2x — balance of quality and CPU',                                        x:20, y:60 },
      { n:6, name:'Channel Mode',  range:'Stereo / M/S',      def:'Stereo',          tip:'M/S mode with Stereo Unlink 30–50%: preserves width during aggressive limiting',                          x:80, y:60 },
      { n:7, name:'Loudness',      range:'LUFS Integrated/Momentary/Short', def:'−14 LUFS', tip:'Spotify −14 LUFS; Apple Music −16 LUFS; YouTube −14 LUFS; Club/DJ −8 LUFS',                    x:50, y:75 },
      { n:8, name:'Gain Reduction',range:'GR meter',          def:'≤ 3–4 dB',        tip:'GR above 4–5 dB means the track isn\'t ready for limiting. Add compressor/clipper before the limiter',   x:50, y:60 }
    ]
  },

  'pro-r': {
    shortDesc: 'Top-tier algorithmic reverb with tail EQ',
    description: `Pro-R is FabFilter's flagship reverb with a unique EQ built directly into the
    reverb tail. You can control decay independently for different frequency bands —
    bass fades faster, highs linger longer, just like real spaces.
    Sounds incredibly natural and musical without muddiness.`,
    when: 'When you need a pristine, natural reverb on vocals, pads, or any melodic source',
    pros: [
      'EQ built into the reverb tail — unique feature',
      'Decay per frequency band — realistic decay behavior',
      'Space/Character/Distance — intuitive musical controls',
      'Transparent tail, no metallic ringing',
      'Dry/Wet support for parallel use'
    ],
    cons: [
      'No convolution mode — algorithmic only',
      'Less "character" than vintage-style reverbs (Valhalla etc.)',
      'Price — part of the Total Bundle'
    ],
    guide: [
      {
        title: 'Core Parameters',
        params: [
          { name: 'Space', desc: 'Size of the space — from a room to a huge hall' },
          { name: 'Character', desc: 'Tail diffusion: 0 = sparse, 100 = dense/smooth' },
          { name: 'Distance', desc: 'Distance to the source — dry signal vs. reverb' },
          { name: 'Decay Rate', desc: 'Overall decay time (RT60)' },
          { name: 'Pre-Delay', desc: 'Delay before the reverb starts — 10–30 ms for vocals' },
          { name: 'Mix', desc: 'Dry/Wet balance' }
        ]
      },
      {
        title: 'EQ in the Tail',
        text: `The standout feature of Pro-R: an EQ curve applied to the reverb tail itself.
        Classic approach: cut Low below 200–300 Hz (bass reverb muddies the mix),
        cut High above 10–12 kHz (removes hiss).
        Or do the opposite — keep only the high reverb for air.`
      },
      {
        title: 'Decay by Frequency',
        text: `Enable <strong>Decay Rate</strong> modifiers per range.
        Typical: Low decay x0.5 (bass decays twice as fast), High decay x1.5 (air lingers longer).
        Mimics the physics of real rooms.`
      }
    ],
    tips: [
      {
        title: 'Pre-delay = vocal intelligibility',
        text: `Pre-Delay 15–25 ms on a vocal reverb — the voice stays intelligible,
        the reverb doesn't merge with the attack. Critical in a dense mix.`
      },
      {
        title: 'Reverb only on Side',
        text: `Put Pro-R on a separate bus. Place Fruity Stereo Shaper before it:
        Mid = 0%, Side = 100%. Reverb is only heard in the width — center stays clean.`
      },
      {
        title: 'Short room on drums',
        text: `Small Space, high Character, Decay 0.3–0.6 s, Mix 15–25%.
        Drums get cohesion and a "room air" without smearing.`
      },
      {
        title: 'Automate Mix',
        text: `On vocals: automate Mix — lower during syllables (10%), higher in gaps (40–60%).
        Reverb is audible when needed and doesn't interfere with the main line.`
      },
      {
        title: 'Tail EQ against metallic ringing',
        text: `If the reverb sounds metallic — cut the resonant peak in the tail EQ
        with a narrow Bell band. Find the offending frequency in the tail and cut gently -3..6 dB.`
      }
    ],
    controlParams: [
      { n:1, name:'Space',       range:'0 — 100%',                  def:'50%',     tip:'Small (10–30%) — rooms and plates; Large (70–100%) — concert halls and vast spaces',                     x:18, y:42 },
      { n:2, name:'Character',   range:'0 — 10',                    def:'5',       tip:'0–3 = sparse/transparent (studio); 7–10 = dense/dreamy (atmosphere). For vocals: 5–7',                   x:38, y:42 },
      { n:3, name:'Distance',    range:'0 — 100%',                  def:'50%',     tip:'Close (0–30%) = more direct sound; Far (70–100%) = source submerged in space',                           x:58, y:42 },
      { n:4, name:'Decay Rate',  range:'0.1 — 10+ s',               def:'1.5 s',   tip:'Vocals: 1.2–2.0 s; Pads: 3–6 s; Percussion: 0.3–0.8 s; Atmosphere: 4–10+ s',                            x:78, y:42 },
      { n:5, name:'Pre-Delay',   range:'0 — 250 ms',                def:'10 ms',   tip:'15–25 ms on vocals — voice stays intelligible, reverb doesn\'t merge with the attack. Essential trick',  x:18, y:65 },
      { n:6, name:'Tail EQ',     range:'Full EQ on the tail',       def:'Flat',    tip:'HP 200–300 Hz on reverb tail ALWAYS — bass reverb muddies the mix. LP 10–12 kHz removes hiss',          x:50, y:80 },
      { n:7, name:'Mix',         range:'0 — 100%',                  def:'20–30%',  tip:'Use as Send (Mix 100% on bus) — more flexible than Insert. Automate Mix on vocals',                      x:82, y:65 },
      { n:8, name:'Decay per band', range:'x0.1 — x10 for Low/High',def:'x0.5 Low, x1.5 High', tip:'Low frequencies should decay faster — as in real rooms. Enable Decay Rate band modifiers',   x:38, y:65 }
    ]
  },

  'ott': {
    shortDesc: 'Multiband upward/downward compressor — EDM standard',
    description: `OTT (Over The Top) is a free plugin by Xfer Records that became the absolute
    standard in EDM, future bass, dubstep and trap. It simultaneously applies downward compression
    (pushes loud down) and upward compression (raises quiet up) across three bands.
    Result: aggressive, dense, "in your face" sound. Single control — Amount.`,
    when: 'When you want to add density and aggression to synths, bass, or leads in EDM',
    pros: [
      'Completely free',
      'Single Amount knob — instant results',
      'Gives sound a characteristic EDM-aggressive tone',
      'Works on synths, bass, leads, and drums',
      'Very low CPU'
    ],
    cons: [
      'No detailed control — all or nothing',
      'Can kill dynamics if Amount is too high',
      'Not for transparent processing — heavy coloration'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Amount', desc: 'Main knob: 0 = bypassed, 100% = full effect' },
          { name: 'Time', desc: 'Compression speed — affects the feel of the attack' },
          { name: 'In / Out', desc: 'Input and output volume for compensation' },
          { name: 'Low / Mid / High Depth', desc: 'Compression depth per band independently' },
          { name: 'Upward Depth', desc: 'Amount of upward compression (raising quiet parts)' }
        ]
      },
      {
        title: 'How It Works',
        text: `OTT does two things simultaneously: pushes down parts above the threshold
        (downward compression) and raises parts below it (upward compression/expansion).
        Three bands are processed independently. Result: everything sits at roughly the same level —
        dense, aggressive, "forward".`
      }
    ],
    tips: [
      {
        title: 'Amount 20–40% instead of 100%',
        text: `100% OTT is too much for most situations.
        Start at <strong>20–30%</strong> — you get density without losing dynamics and character.`
      },
      {
        title: 'Two OTTs in series',
        text: `Popular trick: two instances at 20–30% each instead of one at 60%.
        Sound becomes denser and more "layered".`
      },
      {
        title: 'OTT only on Mid',
        text: `Use Fruity Stereo Shaper before OTT: process only the Mid channel.
        Width is preserved untouched, center becomes more aggressive.`
      },
      {
        title: 'Zero High band on bass',
        text: `On bass sounds, bring High Depth close to zero.
        OTT on high frequencies of bass adds unwanted noise and harshness.`
      },
      {
        title: 'Automate Amount on the drop',
        text: `Verse: OTT = 0%, drop = 40–60%. The synth instantly becomes more aggressive —
        classic EDM trick for the "explosion" feeling on the drop.`
      }
    ],
    controlParams: [
      { n:1, name:'Amount',      range:'0 — 200%',      def:'100%',   tip:'20–40% = warmth without losing dynamics; 100% = EDM standard; 150–200% = aggressive pumping effect' },
      { n:2, name:'Time (Low)',  range:'0 — 500 ms',    def:'50 ms',  tip:'Attack/release time for low frequencies. Large value = bass compresses slower, preserves punch' },
      { n:3, name:'Time (Mid)',  range:'0 — 500 ms',    def:'30 ms',  tip:'Mid frequencies. Default settings work well for most material' },
      { n:4, name:'Time (High)', range:'0 — 500 ms',    def:'10 ms',  tip:'High frequencies. Fast time — highs compress instantly, air is controlled' },
      { n:5, name:'Depth',       range:'0 — 100%',      def:'100%',   tip:'Upward compression depth. High values raise quiet parts more aggressively — density increases' },
      { n:6, name:'Output',      range:'−18 to +18 dB', def:'0 dB',   tip:'OTT raises overall level. Compensate Output so bypass comparison is honest' }
    ]
  },

  'saturn-2': {
    shortDesc: 'Multiband saturator with 16 distortion modes',
    description: `Saturn 2 is the finest plugin for saturation and harmonic enhancement in modern production.
    16 distortion modes from gentle Tape to aggressive Full Wave, up to 6 independent bands,
    built-in compressor and EQ per band. Adds warmth, character and "analog feel"
    to any sound with precise control.`,
    when: 'Adding warmth, harmonic richness, or outright distortion to any source',
    pros: [
      '16 distortion modes for any taste',
      'Up to 6 independent bands — saturate only bass or only highs',
      'Compressor + EQ inside each band',
      'Modulate any parameter with internal LFO/Envelope',
      'Dynamic saturation (Drive reacts to signal level)',
      'M/S mode — independent Mid and Side processing'
    ],
    cons: [
      'Heavy CPU with high oversampling + many bands',
      'Huge number of parameters — takes time to master',
      'Price'
    ],
    guide: [
      {
        title: 'Saturation Modes',
        params: [
          { name: 'Tape', desc: 'Gentle warmth — ideal for "analog" sound' },
          { name: 'Tube', desc: 'Valve character, even harmonics' },
          { name: 'Tape + Tube', desc: 'Combo — most musical option' },
          { name: 'Guitar Amp', desc: 'Amp simulation, great for aggressive synths' },
          { name: 'Half Wave', desc: 'Asymmetric clipping — odd harmonics' },
          { name: 'Full Wave', desc: 'Aggressive distortion, rectifier sound' },
          { name: 'Bit Crusher', desc: 'Digital bit-depth distortion' },
          { name: 'Fuzz', desc: 'Guitar fuzz effect' }
        ]
      },
      {
        title: 'Multiband Saturation',
        text: `Add bands with the + button. Classic setup: Low band in Tape mode (bass warmth),
        Mid in Tube (body), High with zero Drive (highs stay clean).
        Removes unwanted harshness from saturating highs while keeping the warmth in the lows.`
      },
      {
        title: 'Dynamic Modulation',
        text: `Any parameter (Drive, Tone, Mix) can be linked to an internal Envelope or LFO.
        Envelope on Drive: quiet note = gentle saturation, loud note = aggressive.
        LFO on Tone: slowly shifting distortion timbre.`
      }
    ],
    tips: [
      {
        title: 'Tape on the master',
        text: `Saturn 2, single band, <strong>Tape</strong> mode, Drive 10–20%, Mix 40–70%.
        The entire mix gets a light analog warmth and gentle peak clipping.`
      },
      {
        title: 'Bass — multiband',
        text: `Low (up to 200 Hz): Tube Drive 30% — warmth and foundation.
        Mid (200–2000 Hz): Tape Drive 15% — body. High: Drive 0%, Mix 0%.
        Bass becomes rich without harshness in the highs.`
      },
      {
        title: 'Harmonic glue on vocals',
        text: `<strong>Tape</strong> mode, Drive 5–10%, Mix 20–30%.
        Adds odd and even harmonics — vocals "stick" to the mix better.`
      },
      {
        title: 'Modulate Drive on drums',
        text: `Connect an <strong>Envelope Follower</strong> to Drive.
        On a hit — Drive spikes, then falls. You get saturation only on the transients.`
      },
      {
        title: 'Parallel saturation via Mix',
        text: `Mix at 30–50% instead of 100% — the original blends with the
        saturated version. Dynamics are preserved, only harmonic content is added.`
      }
    ],
    controlParams: [
      { n:1, name:'Mode',      range:'Tape, Tube, Guitar Amp, Triode, Class A/B, Soft Clip, Hard Clip, Fuzz, Bit Crusher...', def:'Tape', tip:'Tape — most versatile. Tube — for warmth. Amp modes — for character. Bit Crusher — lo-fi effect',    x:50, y:20 },
      { n:2, name:'Drive',     range:'0 — 100%',     def:'20–30%',  tip:'0–15% = warmth without audible artifacts; 30–60% = character; 60%+ = obvious distortion. Start at 20% and raise slowly', x:25, y:45 },
      { n:3, name:'Feedback',  range:'0 — 100%',     def:'0%',      tip:'Feedback adds self-oscillation — careful with high values. Interesting effect on long pad sounds',                         x:45, y:45 },
      { n:4, name:'Tone',      range:'Low — High',   def:'Neutral',  tip:'Tone affects the spectral character of saturation. Low = warm/dark; High = bright/crisp',                                 x:65, y:45 },
      { n:5, name:'Mix',       range:'0 — 100%',     def:'100%',    tip:'30–50% Mix = parallel saturation. Original + saturated copy. Preserves dynamics and transients',                           x:82, y:45 },
      { n:6, name:'Bands',     range:'1 — 4 bands',  def:'1',       tip:'Multiband: Low Tape, Mid Tube, High — no Drive. Different modes per frequency range — key Saturn 2 feature',               x:50, y:65 },
      { n:7, name:'Crossovers',range:'20 Hz — 20 kHz',def:'250 / 2500 Hz', tip:'Band split: Sub up to 120 Hz (warmth), Body 120–2500 Hz (character), Air 2500+ Hz (usually no Drive)',            x:50, y:78 },
      { n:8, name:'Modulation',range:'LFO / Env Follower / MIDI', def:'Off', tip:'Envelope Follower → Drive: saturation only on transients. LFO → Feedback: pulsing character',                    x:82, y:25 }
    ]
  },

  'gross-beat': {
    shortDesc: 'Volume & pitch manipulation — stutter, tape stop, gate',
    description: `Gross Beat is a unique FL Studio tool for rhythmic sound manipulation.
    Draw Volume and Pitch curves on a grid (32 slots × 2 bars) and get stutter effects,
    tape stops, gating, arpeggio from any sound. Absolutely essential for EDM transitions
    and unconventional sound design. FL Studio exclusive.`,
    when: 'Creating stutter, tape stop, or rhythmic gating effects on transitions and drops',
    pros: [
      'Unique — no equivalent in other DAWs',
      '32 slots for storing Volume and Pitch patterns',
      'MIDI control of slots in real time',
      'Perfect for transitions and build-up effects',
      'Built into FL — no extra cost'
    ],
    cons: [
      'FL Studio only — doesn\'t work in other DAWs',
      'Curve drawing interface is unfamiliar to beginners',
      'Overuse = clichéd sound'
    ],
    guide: [
      {
        title: 'How It Works',
        text: `Gross Beat controls playback via curves.
        Volume Map: draw a volume curve on the grid — get gating/stutter.
        Time Map: draw a playback speed curve — slowdown, stop (tape stop), scratch.
        Each slot = a separate pattern, switch via MIDI or automation.`
      },
      {
        title: 'Volume Map',
        params: [
          { name: 'Slices', desc: 'Grid divisions: 2, 4, 8, 16, 32' },
          { name: 'Hold', desc: 'Freeze the current position (scratch effect)' },
          { name: 'Crash', desc: 'Quick fadeout' }
        ]
      },
      {
        title: 'Time Map',
        text: `Line sloping down = slowdown. Flat horizontal = freeze/pause.
        Line rising = speedup. Sharp drop at the start = tape stop.
        Zigzag = scratch. Combine with Volume Map for full control.`
      }
    ],
    tips: [
      {
        title: 'Tape stop on the last bar',
        text: `Use the <strong>Tape Stop</strong> preset in a slot — trigger it 1–2 bars before the drop.
        The whole track "stops" like a tape, then the drop hits — classic EDM move.`
      },
      {
        title: 'Stutter on vocals',
        text: `Volume Map with 16 slices, alternate full volume / silence.
        Apply only for 1–2 bars at the end of a phrase. Vocals start to "stutter" rhythmically.`
      },
      {
        title: 'MIDI slot trigger',
        text: `Assign MIDI notes to switch slots. During a live performance
        or recording — press notes to switch Gross Beat patterns in real time.`
      },
      {
        title: 'Rhythmic gate on pads',
        text: `Volume Map: draw a 16th-note gating pattern.
        A pad becomes a rhythmically pulsing texture —
        especially effective on long synth notes.`
      },
      {
        title: 'Automate Slot',
        text: `Automate the slot number in the Playlist. Verse = slot 1 (clean), pre-chorus = slot 5
        (light stutter), transition = slot 12 (tape stop). Happens automatically.`
      }
    ],
    controlParams: [
      { n:1, name:'Volume Map',  range:'16 steps × 0–100%',      def:'Flat 100%', tip:'Draw the pattern directly on the grid. Gate, stutter, rhythmic shapes — all here. Try a 16th pattern with gaps' },
      { n:2, name:'Pitch Map',   range:'16 steps × −24..+24 st', def:'0',         tip:'Pitch sequencer on top of the sound. Creates melodic patterns from any incoming signal' },
      { n:3, name:'Slot',        range:'1 — 36 slots',           def:'1',         tip:'Each slot = a separate Volume/Pitch Map preset. Switch with automation for live changes in the track' },
      { n:4, name:'Time base',   range:'Steps / Beats / Time',   def:'Steps',     tip:'Steps = free grid; Beats = synced to project tempo (recommended); Time = milliseconds' },
      { n:5, name:'Mix',         range:'0 — 100%',               def:'100%',      tip:'When used as an effect — Mix 40–70%. When used as a gate — Mix 100%' }
    ]
  },

  'timeless-3': {
    shortDesc: 'Professional creative delay with modulation',
    description: `Timeless 3 is FabFilter's next-generation professional delay.
    Two independent buffers with separate filters, built-in pitch shift,
    reverse and freeze modes, full modulation of any parameter.
    Equally good for precise musical delay on vocals and wild sound design.`,
    when: 'Any delay task from musical slapback to creative pitch-shifted echo effects',
    pros: [
      'Two independent buffers with separate processing',
      'Built-in Pitch Shift inside the delay loop',
      'Reverse, Freeze, Ping-Pong modes',
      'Modulate any parameter with LFO/Envelope',
      'Tape Delay emulation with wow & flutter',
      'Syncs to project tempo'
    ],
    cons: [
      'More complex than standard delays — takes time to learn',
      'Aggressive settings can create unwanted chaos',
      'Price'
    ],
    guide: [
      {
        title: 'Timeless 3 Structure',
        text: `Two buffers (A and B) work independently or as a pair (Ping-Pong).
        Each buffer has: Time (delay time), Feedback (repetitions),
        Filter (tonal shaping of the tail), Pan (stereo position).
        Feedback can flow between buffers (Cross Feedback).`
      },
      {
        title: 'Key Parameters',
        params: [
          { name: 'Time A / B', desc: 'Delay time — in ms or note values (1/4, 1/8, etc.)' },
          { name: 'Feedback', desc: 'Number of repeats: 0% = one echo, 100% = infinite' },
          { name: 'Filter', desc: 'LP/HP inside the loop — darkens the tail or keeps brightness' },
          { name: 'Pitch Shift', desc: 'Pitch shift per repeat (harmonic delay!)' },
          { name: 'Freeze', desc: 'Freeze the current buffer — create a loop from the delay' },
          { name: 'Mix', desc: 'Dry/Wet balance' }
        ]
      },
      {
        title: 'Harmonic Delay',
        text: `Enable Pitch Shift and set +12 or +7 semitones.
        Each delay repeat plays an octave/fifth higher.
        On melodic lines creates a harmonic staircase.
        On vocals — an unusual auto-tune-like effect.`
      }
    ],
    tips: [
      {
        title: 'Dark tail for vocals',
        text: `Filter in the buffer: HP 300 Hz + LP 6 kHz.
        The delay tail loses bass and air — doesn't interfere with the main vocal line,
        but creates atmosphere.`
      },
      {
        title: 'Ping-Pong with different times',
        text: `Buffer A: 1/4 note, Buffer B: 3/8 note. Ping-Pong mode.
        You get a syncopated stereo delay — rhythmically interesting and wide.`
      },
      {
        title: 'Freeze as an effect',
        text: `Automate the <strong>Freeze</strong> button. At the right moment —
        the sound "freezes" in the delay loop. Release when you want it to continue.
        Great effect on transitions.`
      },
      {
        title: 'Tape Delay emulation',
        text: `Enable <strong>Tape Mode</strong>. Add a small amount of Wow & Flutter.
        The delay starts to "drift" like an old tape echo unit —
        warmth and character without digital coldness.`
      }
    ],
    controlParams: [
      { n:1, name:'Delay Time',  range:'1 ms — 5000 ms / 1/32 — 2 bars', def:'1/4',    tip:'Tempo Sync (note button) locks to BPM. For dub echo: 3/8 or 5/8. For slapback: 1/16' },
      { n:2, name:'Feedback',    range:'0 — 100%', def:'40%',  tip:'Up to 50% = controlled echo; 60–80% = many repeats; above 90% = self-oscillation (careful!)' },
      { n:3, name:'Filter',      range:'LP/HP 20Hz–20kHz', def:'LP 8kHz, HP 200Hz', tip:'ALWAYS filter the delay tail: LP 6–8 kHz (cut air) + HP 200–300 Hz (cut bass). Tail won\'t mask the original' },
      { n:4, name:'Diffusion',   range:'0 — 100%', def:'0%',   tip:'High Diffusion = blurred repeats without rhythmic definition. Good for atmospheric tails and pads' },
      { n:5, name:'Ping-Pong',   range:'Off / On', def:'Off',  tip:'Ping-Pong alternates repeats L/R — creates stereo movement. Excellent for vocals and leads' },
      { n:6, name:'Modulation',  range:'Rate + Depth', def:'Off', tip:'LFO on Delay Time = chorus effect in the tail. Subtle (Depth 5%) = warmth; Strong (30%+) = chorus/flanging' },
      { n:7, name:'Mix',         range:'0 — 100%', def:'25–35%', tip:'Use Timeless 3 as Send (Mix 100% on bus). Gives you independent level control of the delay in the mix' }
    ]
  },

  'fruity-peq2': {
    shortDesc: "FL Studio's built-in parametric EQ",
    description: `Fruity Parametric EQ 2 is the built-in parametric EQ available in every version
    of FL Studio. Seven bands, clean sound, near-zero CPU and a convenient graphical interface.
    Not as powerful as Pro-Q 3, but covers 80% of everyday EQ tasks quickly
    and without extra cost. The ideal entry point for learning EQ.`,
    when: 'Quick EQ on any track when you don\'t need M/S or dynamic bands',
    pros: [
      'Free — included in base FL Studio',
      'Near-zero CPU — put it on every track without worry',
      'Simple and clear interface — ideal for learning',
      'Good clean sound without coloration',
      'Quick access by right-clicking a channel'
    ],
    cons: [
      'Only 7 bands — sometimes not enough for complex correction',
      'No M/S mode',
      'No dynamic bands',
      'No spectrum analyzer (only a basic peak meter)',
      'Band width range limited compared to Pro-Q 3'
    ],
    guide: [
      {
        title: '7 Bands',
        params: [
          { name: 'Band 1 (HP)', desc: 'High Pass — cuts low frequencies from below' },
          { name: 'Band 2 (Low Shelf)', desc: 'Shelf filter for bass' },
          { name: 'Bands 3–5 (Bell)', desc: 'Parametric Bell bands for correction' },
          { name: 'Band 6 (High Shelf)', desc: 'Shelf filter for highs' },
          { name: 'Band 7 (LP)', desc: 'Low Pass — cuts high frequencies from above' }
        ]
      },
      {
        title: 'Basic Operation',
        text: `Click a band point and drag. Up = boost, down = cut.
        Left/right = change frequency. Mouse wheel = width (Q).
        Right-click a point — choose filter type.
        Ctrl+click — reset to default.`
      },
      {
        title: 'Typical Track Cleanup',
        text: `1) HP filter: remove unwanted bass (vocals from 80 Hz, guitar from 100 Hz).
        2) Find a resonant peak — boost a Bell with high Q, sweep frequencies until you hear the problem, cut -3..6 dB.
        3) High Shelf small boost +1..2 dB for "air".
        4) Moderation — changes below 3 dB sound more professional.`
      }
    ],
    tips: [
      {
        title: 'High-pass everything except bass',
        text: `On every track except bass and kick, apply a <strong>HP filter</strong> at minimum 80–100 Hz.
        This clears low-frequency mud and the mix instantly becomes more transparent.`
      },
      {
        title: 'Boost to Find, then Cut',
        text: `To find a problem frequency: make a big boost (+10 dB) with a narrow Bell,
        sweep slowly — when you hear an unpleasant resonance, you found it.
        Now reduce the gain to a -3..6 dB cut.`
      },
      {
        title: 'LP on hi-hats',
        text: `On hi-hats and cymbals, set LP around 14–16 kHz. Removes ultra-high
        "digital" harshness. Sound becomes softer and more pleasant.`
      },
      {
        title: 'EQ as Low Cut on the master',
        text: `On the master bus: HP filter at 20–25 Hz, 48 dB/oct.
        Removes infrasonic content that\'s inaudible but eats loudness and tires amplifiers.`
      },
      {
        title: 'Parallel EQ',
        text: `Create a separate Mixer track, send the signal via Fruity Send.
        Apply an aggressive EQ on the copy (e.g., only upper mids).
        Blend with the original — parallel EQ without destructive processing.`
      }
    ],
    controlParams: [
      { n:1, name:'Band (1–7)',   range:'7 bands',               def:'Band 1=HP, Band 7=LP', tip:'Bands 1 and 7 are always HP and LP filters. Bands 2–6 are parametric Bell/Shelf. Activate with buttons' },
      { n:2, name:'Frequency',    range:'16 Hz — 22 kHz',        def:'per band',              tip:'Click the display and drag vertically — changes gain. Horizontally — frequency. Intuitive control' },
      { n:3, name:'Gain',         range:'−18 to +18 dB',         def:'0 dB',                  tip:'Less flexible than Pro-Q 3, but sufficient for basic tasks. Don\'t overdo it — more than ±6 dB is rarely needed' },
      { n:4, name:'Q',            range:'0.1 — 10',              def:'1.0',                   tip:'Ctrl+click a band for precise Q entry. Value 0.7 = wide and musical' },
      { n:5, name:'Filter Type',  range:'LP, HP, BP, Notch, Peak, Shelf', def:'Peak',         tip:'Right-click a band to change filter type. Steepness controls HP/LP slope (6–48 dB/oct)' }
    ]
  },

  'fruity-limiter': {
    shortDesc: 'Limiter + compressor + noise gate in one',
    description: `Fruity Limiter combines three tools: compressor, limiter and noise gate.
    The limiter does an excellent job holding the ceiling on the master bus and individual tracks.
    The noise gate helps remove background noise between sounds. All in one plugin —
    convenient when you don't want to load several separate processors.`,
    when: 'Master bus ceiling control, noise gate on channels with background noise',
    pros: [
      'Three tools in one — compressor, limiter, gate',
      'Works well as a final limiter on the master',
      'Built into FL — zero cost',
      'Simple noise gate for cleaning recordings'
    ],
    cons: [
      'No True Peak control — not ideal for streaming',
      'Compressor lags behind Pro-C 2 in control and sound',
      'Three-tab interface is awkward to switch between frequently'
    ],
    guide: [
      {
        title: 'Three Modes (tabs)',
        params: [
          { name: 'COMP', desc: 'Compressor — Threshold, Ratio, Attack, Release, Knee' },
          { name: 'LIMIT', desc: 'Limiter — Ceiling, Release, Gain' },
          { name: 'NOISE', desc: 'Noise Gate — Threshold, Attack, Release, Hold' }
        ]
      },
      {
        title: 'Limiter on the Master',
        text: `LIMIT tab: Ceiling -0.1 dB or -0.3 dB, Release 50–100 ms.
        Raise Gain to the desired loudness level. Make sure the limiter is not working more than 2–3 dB
        GR constantly — if it is, add compression before it.`
      },
      {
        title: 'Noise Gate on Vocals',
        text: `NOISE tab: Threshold just above the background noise floor.
        Attack 5–10 ms, Release 100–200 ms, Hold 50 ms.
        Gate opens when vocal is present, closes in pauses.`
      }
    ],
    tips: [
      { title: 'Ceiling -0.3 dB for streaming', text: `Spotify and other services encode audio which can add inter-sample peaks. -0.3 dB gives headroom. For maximum protection use Pro-L 2 with True Peak.` },
      { title: 'Gate + Compressor together', text: `Use both: first the Gate removes silence between phrases, then the Compressor levels dynamics. The combo works better than either alone.` },
      { title: 'Limiter on bass', text: `On a bass line: Ceiling -3 dB, Release 30 ms. Bass will never go out of bounds or blow the master on low notes.` }
    ],
    controlParams: [
      { n:1, name:'COMP: Threshold', range:'−60 to 0 dB',  def:'−18 dB',  tip:'Switch between COMP/LIMIT/NOISE tabs with the buttons at the top. Each tab is an independent processor' },
      { n:2, name:'COMP: Ratio',     range:'1:1 to ∞:1',   def:'4:1',     tip:'∞:1 turns the compressor into a limiter. Use for hard peak control on individual tracks' },
      { n:3, name:'LIMIT: Ceiling',  range:'−24 to 0 dB',  def:'−0.3 dB', tip:'On master bus: Ceiling −0.1 to −0.3 dB. Provides headroom for ISP (inter-sample peaks) during encoding' },
      { n:4, name:'LIMIT: Release',  range:'1 — 1000 ms',  def:'50 ms',   tip:'Too fast Release on the limiter = pumping. 50–150 ms is a good balance for the master' },
      { n:5, name:'NOISE: Threshold',range:'−80 to 0 dB',  def:'−40 dB',  tip:'Set just above the noise floor in pauses. Enable Solo Gate to hear exactly what\'s being removed' },
      { n:6, name:'NOISE: Hold',     range:'0 — 2000 ms',  def:'50 ms',   tip:'Gate stays open at least this long after the signal. Removes "chattering" from fast closures' }
    ]
  },

  'fruity-compressor': {
    shortDesc: "FL Studio's simple built-in compressor",
    description: `Fruity Compressor is FL Studio's built-in compressor with zero latency and
    minimal CPU. Classic design: Threshold, Ratio, Attack, Release, Gain.
    Doesn't color the sound, works honestly and predictably. The ideal starting point
    for learning compression before moving to Pro-C 2.`,
    when: 'Quick compression without complex parameter adjustment — drums, vocals, groups',
    pros: [
      'Free — built into FL Studio',
      'Zero latency — no delay in the signal',
      'Minimal CPU — use it freely without concern',
      'Simple and clear — ideal for learning compressor basics',
      'Covers most everyday compression tasks'
    ],
    cons: [
      'No sidechain EQ',
      'No algorithm modes — one character only',
      'Less transparent than Pro-C 2 at higher ratios',
      'No Auto Release mode'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Threshold', desc: 'Level above which compression starts' },
          { name: 'Ratio', desc: 'Compression amount: 2:1 gentle, 10:1 hard' },
          { name: 'Attack', desc: 'How fast the compressor reacts to the signal' },
          { name: 'Release', desc: 'How fast it returns to normal after the signal drops' },
          { name: 'Gain', desc: 'Make-up gain after compression' },
          { name: 'Type', desc: 'Compression character: Peak or RMS' }
        ]
      },
      {
        title: 'Typical Drum Compression',
        text: `Threshold -20 dB, Ratio 4:1, Attack 10 ms (lets the hit through),
        Release 80 ms, Gain +3 dB to compensate.
        Result: the transient is preserved, the body and tail are controlled.`
      }
    ],
    tips: [
      {
        title: 'Watch the gain reduction',
        text: `GR of 3–6 dB on a vocal or drum is a good target.
        More than 8–10 dB usually sounds over-compressed and unnatural.`
      },
      {
        title: 'Slow attack on drums',
        text: `Attack 15–30 ms — the compressor lets the transient through unchanged.
        The punch of the hit is preserved, only the sustain is compressed.`
      },
      {
        title: 'Make-up Gain',
        text: `After setting Ratio and Threshold, compensate the output level with Gain.
        Compare with bypass at the same loudness — that\'s the honest test.`
      }
    ],
    controlParams: [
      { n:1, name:'Threshold', range:'−60 to 0 dB',  def:'−18 dB', tip:'Set so GR is 3–6 dB at typical signal level. This is the most important parameter to get right first' },
      { n:2, name:'Ratio',     range:'1:1 to ∞:1',   def:'4:1',    tip:'2:1–4:1 for most tasks; 8:1+ for hard limiting; ∞:1 = brick wall. Start at 4:1 and adjust' },
      { n:3, name:'Attack',    range:'0.1 — 500 ms',  def:'10 ms',  tip:'Slow attack (15–30 ms) lets the transient through — drums keep their punch. Fast attack cuts the transient' },
      { n:4, name:'Release',   range:'1 — 1000 ms',  def:'80 ms',  tip:'Too short = pumping artifacts. Too long = slow recovery, compressor never fully opens. 60–120 ms works for most' },
      { n:5, name:'Gain',      range:'0 to +36 dB',  def:'0 dB',   tip:'Always compensate output level after setting compression. Equal loudness = honest A/B comparison' }
    ]
  },


  'transient-processor': {
    shortDesc: 'Attack and sustain control without touching EQ',
    description: `Transient Processor shapes the attack and sustain of a sound without changing its tonality.
    Unlike a compressor, it works directly with the envelope: boosts or reduces
    the initial hit and the decay tail. Essential for drums — makes kick more "clicky"
    or softer, removes unwanted room from snare.`,
    when: 'Kick, snare, percussion, acoustic guitar — emphasize the hit or tighten the tail',
    pros: [
      'Changes character without tonal processing',
      'Intuitive — just two parameters: Attack and Sustain',
      'Works great on percussion and live drums',
      'Built into FL Studio'
    ],
    cons: [
      'Can add artifacts at extreme settings',
      'Doesn\'t replace a full compressor for level control',
      'No sidechain or multiband mode'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Attack', desc: 'Positive = emphasizes the click; negative = softens the attack' },
          { name: 'Sustain', desc: 'Positive = lengthens the tail; negative = tightens the decay' },
          { name: 'Output', desc: 'Output level for compensation' }
        ]
      },
      {
        title: 'Typical Uses',
        text: `Kick: Attack +30, Sustain -20 — crisp click, tight dry tail.
        Snare: Attack +20, Sustain -30 — remove room, keep the hit.
        Room mic: Attack -40, Sustain +20 — remove harshness, keep atmosphere.
        Acoustic guitar: Attack -10, Sustain +10 — soften the pick, add body.`
      }
    ],
    tips: [
      { title: 'Parallel transient shaping', text: `Duplicate the track. Apply aggressive Transient Processor settings on the copy. Blend via Fruity Send at 30–50%. More control over the result.` },
      { title: 'Remove room from snare', text: `Sustain -40..60 — the snare tail shortens sharply. Snare sounds dry and "studio-ready" even if recorded in a live room.` },
      { title: 'Before or after the compressor?', text: `Usually <strong>before</strong>: shape the transient first, then level it with the compressor. But after works too: compressor squashed the hit, Transient Processor brings it back.` }
    ],
    controlParams: [
      { n:1, name:'Attack',      range:'−100 to +100%', def:'0%',   tip:'Positive = enhance the onset (transient). Negative = suppress the attack for a softer sound. Start at +20–40%' },
      { n:2, name:'Release',     range:'−100 to +100%', def:'0%',   tip:'Positive = lengthen the tail (sustain). Negative = tighten it. -30–50% on snare = dry studio sound' },
      { n:3, name:'Fast / Slow', range:'Fast / Slow',   def:'Fast', tip:'Fast = reacts to sharp transients (drums). Slow = smoother reaction for atmospheric instruments' }
    ]
  },

  'fruity-soft-clipper': {
    shortDesc: 'Soft clipper — warmth and peak limiting',
    description: `Fruity Soft Clipper shaves signal peaks with a soft curve instead of hard clipping.
    Result: harmonic saturation (warmth) + peak limiting without harsh artifacts.
    Classically placed before the final limiter — peaks are already gently shaved,
    the limiter has less work to do, and the result is louder and cleaner.`,
    when: 'Before the limiter on the master, or to add warmth to synths and bass',
    pros: [
      'Gentle peak limiting without harsh sound',
      'Adds warmth and harmonic saturation',
      'Built into FL, minimal CPU',
      'Predictable and transparent at moderate settings'
    ],
    cons: [
      'Audible distortion at aggressive settings',
      'No harmonic control — single parameter',
      'Doesn\'t replace a full saturator like Saturn 2'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Threshold', desc: 'Clipping threshold — above this, soft shaving begins' },
          { name: 'Post Gain', desc: 'Output level after clipping' }
        ]
      },
      {
        title: 'Master Chain Position',
        text: `Recommended master chain:
        EQ → Multiband Compressor → <strong>Soft Clipper</strong> → Pro-L 2.
        Set the Soft Clipper so the GR meter shows -1..3 dB on peaks.
        More than that and distortion becomes audible.`
      }
    ],
    tips: [
      { title: 'Threshold at the peak level', text: `Set Threshold where occasional peaks appear — usually -3..6 dB. The constant material isn't touched, only rare spikes are shaved gently.` },
      { title: 'Warmth on synths', text: `On Serum/Vital: Soft Clipper with Threshold 0 dB, Post Gain -1..2 dB. The synth gets light analog coloration without noticeable clipping.` },
      { title: 'Combo with OTT', text: `OTT → Soft Clipper. OTT raises the quiet parts and they begin to clip gently in the Soft Clipper — you get the aggressive, dense sound characteristic of modern EDM.` }
    ],
    controlParams: [
      { n:1, name:'Threshold', range:'−24 to 0 dB', def:'0 dB',  tip:'Set at the level of occasional peaks — usually −3..−6 dB. Constant signal isn\'t touched, only rare spikes are gently shaved' },
      { n:2, name:'Post Gain', range:'−24 to +24 dB',def:'0 dB', tip:'Clipping causes a slight level drop. Compensate with +1..2 dB or use Output Gain in Pro-L 2 afterwards' }
    ]
  },

  'soundgoodizer': {
    shortDesc: 'One-knob enhancer for quick finishing',
    description: `Soundgoodizer is FL Studio's legendary one-knob plugin.
    Internally it runs a Maximus algorithm with preset settings
    optimized for general sound improvement.
    A single Amount knob makes the sound fatter, denser and louder.
    Perfect when you need a quick result without diving into settings.`,
    when: 'Quick track polish without deep settings — one control',
    pros: [
      'Single parameter — instant results',
      'Works on almost any material',
      'Built into FL — zero cost',
      'Good for quick demos and references'
    ],
    cons: [
      'No control — all or nothing',
      'High Amount kills dynamics',
      'Not for professional mastering — too unpredictable'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Amount', desc: '0–100%: processing intensity. Recommended 20–50%' },
          { name: 'Mode A/B/C/D', desc: 'Four algorithm variants with different character' }
        ]
      },
      {
        title: 'Modes',
        text: `A — softest and most transparent. B — standard, works for most material.
        C — aggressive, for bass-heavy music. D — maximum saturation.
        Start with B, Amount 30% — good starting point for most tracks.`
      }
    ],
    tips: [
      { title: 'Amount no more than 40%', text: `Above 40% the track starts to sound "choked". Optimal zone: 20–35%.` },
      { title: 'A/B compare', text: `Compare with bypass. If the processed sound isn't better (ignoring loudness) — remove Soundgoodizer entirely.` },
      { title: 'For demos only', text: `For the final release, replace Soundgoodizer with a proper chain: Saturn 2 (warmth) + Maximus/Pro-L 2 (loudness). More control.` }
    ],
    controlParams: [
      { n:1, name:'Amount',     range:'0 — 100%',  def:'50%', tip:'20–35% = light enhancement without losing dynamics. Above 50% = audible compression. 100% = "over-pumped"' },
      { n:2, name:'Preset A–D', range:'4 modes',   def:'A',   tip:'A = classic; B = brighter; C = more bass; D = maximum density. Listen and choose for the task' }
    ]
  },

  'desibilizer': {
    shortDesc: 'De-esser — removes sibilants from vocals',
    description: `DeSibilizer is a specialized de-esser for taming sibilants on vocals.
    Sibilants (S, Sh, Ch sounds) often come out too loud due to microphone or singer characteristics.
    DeSibilizer automatically catches these spikes in the 5–10 kHz range and
    dynamically attenuates them without touching the rest of the spectrum.`,
    when: 'Vocal with harsh S/Sh sounds cutting through — especially on headphones and bright monitors',
    pros: [
      'Solves a specific problem directly',
      'Simple interface — minimal settings',
      'Built into FL Studio',
      'Zero latency'
    ],
    cons: [
      'Less flexible than Pro-DS (FabFilter)',
      'No wideband mode',
      'No visualization of the processed range'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Threshold', desc: 'How loud sibilants have to be before processing kicks in' },
          { name: 'Frequency', desc: 'Center frequency for sibilant detection (typically 6–9 kHz)' },
          { name: 'Depth', desc: 'How much sibilants are attenuated in dB' }
        ]
      },
      {
        title: 'Setup',
        text: `Play the vocal track. Lower the Threshold until the de-esser starts activating.
        Raise it back until only the harshest sibilants are being caught.
        Depth 4–8 dB is usually enough. Listen: the vocal shouldn't sound lispy.`
      }
    ],
    tips: [
      { title: 'Frequency to match the voice', text: `Male vocals: 6–7 kHz. Female: 7–9 kHz. Child: 8–10 kHz. Dial it in individually — different voices, different sibilants.` },
      { title: 'Don\'t over-de-ess', text: `Heavy de-essing makes vocals sound lispy and unnatural. The goal is to remove harshness, not kill presence. Depth 3–6 dB is usually enough.` },
      { title: 'DeSibilizer + Pro-Q 3', text: `After DeSibilizer, add Pro-Q 3 with a dynamic band at 7–8 kHz as extra control. Double protection against sibilants without artifacts.` }
    ],
    controlParams: [
      { n:1, name:'Threshold', range:'−40 to 0 dB', def:'−10 dB', tip:'Lower until it activates on the harshest sounds. Then raise slightly — only extreme sibilants get processed' },
      { n:2, name:'Frequency', range:'2 — 20 kHz',  def:'7 kHz',  tip:'Male vocals: 6–7 kHz; Female: 7–9 kHz; Child: 8–10 kHz. Find your frequency using the Solo mode' },
      { n:3, name:'Depth',     range:'0 — 24 dB',   def:'6 dB',   tip:'3–6 dB is usually enough. More than 8 dB and vocals start sounding lispy. Goal: remove edge, not kill the S sounds' }
    ]
  },

  'invisible-limiter-g2': {
    shortDesc: 'Transparent limiter with True Peak control',
    description: `Invisible Limiter G2 by A.O.M. Factory is one of the most transparent limiters
    on the market. Specifically designed to be "invisible" — maximum loudness
    with minimum audible artifacts. True Peak ISP control guarantees
    streaming compliance. An alternative to Pro-L 2 for those who value transparency.`,
    when: 'Final master for Spotify/Apple Music — where True Peak and transparency matter most',
    pros: [
      'Exceptional transparency — one of the best in class',
      'True Peak / ISP control for streaming',
      'Simple interface — quick to set up',
      'Works well even at moderate gain reduction'
    ],
    cons: [
      'Fewer modes than Pro-L 2',
      'No built-in LUFS meter',
      'G3 version is better — G2 is now outdated'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Input Gain', desc: 'Input level — main lever for pushing the limiter' },
          { name: 'Output Ceiling', desc: 'Ceiling — -0.3 dBTP for streaming' },
          { name: 'True Peak', desc: 'Enable ISP control — required for streaming' },
          { name: 'Release', desc: 'Recovery time — Auto recommended' }
        ]
      },
      {
        title: 'Setup for Streaming',
        text: `Output Ceiling: -1.0 dBTP (Spotify) or -0.3 dBTP (others).
        True Peak: enable, always.
        Raise Input Gain until GR reaches the desired level.
        Use an external LUFS meter (myMeter2) to monitor the integrated value.`
      }
    ],
    tips: [
      { title: 'G2 vs G3', text: `If you have G3 — use G3. Improved algorithm, fewer artifacts at the same GR. Keep G2 as a backup or for old project compatibility.` },
      { title: 'Chain with Soft Clipper', text: `Fruity Soft Clipper → Invisible Limiter G2. The clipper gently shaves peaks, the limiter has less work — result is more transparent.` },
      { title: 'Don\'t chase LUFS', text: `-14 LUFS on Spotify gets normalized anyway. A clean sound at -16 LUFS beats a choked one at -9 LUFS. Streaming normalizes loudness automatically.` }
    ],
    controlParams: [
      { n:1, name:'Input Gain',    range:'−18 to +18 dB', def:'0 dB',    tip:'Use Input Gain to feed the right level into the limiter. Threshold isn\'t adjustable separately here' },
      { n:2, name:'Output Ceiling',range:'−3 to 0 dB',    def:'−0.1 dB', tip:'−0.1 dB for streaming. −0.3 dB gives extra headroom against ISP during MP3/AAC encoding' },
      { n:3, name:'Attack',        range:'0 — 200 ms',    def:'Auto',    tip:'Auto Attack is usually best. Manually: 0 ms = all peaks caught; 5–10 ms = transients pass through' },
      { n:4, name:'Release',       range:'10 — 1000 ms',  def:'Auto',    tip:'Auto Release prevents pumping. Manual: 50–150 ms is the safe zone for most material' },
      { n:5, name:'Oversampling',  range:'1x / 2x / 4x', def:'2x',      tip:'4x on the final render. Real-time: 2x. Removes inter-sample peaks above Ceiling' }
    ]
  },

  'pro-mb': {
    shortDesc: 'Multiband compressor and dynamic EQ',
    description: `Pro-MB combines a multiband compressor and a dynamic EQ in one plugin.
    Bands can be placed anywhere in the spectrum and assigned compression or expansion.
    Unlike a standard multiband, it works like a surgical EQ that only activates
    when a specific frequency exceeds the threshold.`,
    when: 'Mastering, frequency-specific resonance control, advanced de-essing',
    pros: [
      'Dynamic EQ and multiband compressor in one',
      'Up to 6 bands anywhere in the spectrum',
      'M/S mode — separate Mid and Side processing',
      'Upward and downward compression / expansion',
      'Excellent per-band gain reduction visualization'
    ],
    cons: [
      'More complex than a standard compressor — requires understanding dynamic EQ',
      'Higher CPU than standard compressors',
      'Price'
    ],
    guide: [
      {
        title: 'Dynamic EQ vs Multiband',
        text: `The key difference from Maximus: bands can be placed anywhere in the spectrum
        like EQ points, not just split into Low/Mid/High. This allows treating a specific
        resonance (e.g., 2.3 kHz) dynamically — it only cuts when the resonance is too loud.`
      },
      {
        title: 'Band Parameters',
        params: [
          { name: 'Frequency', desc: 'Center frequency of the band' },
          { name: 'Range', desc: 'Maximum processing depth (dB)' },
          { name: 'Threshold', desc: 'Activation threshold' },
          { name: 'Knee', desc: 'Transition hardness' },
          { name: 'Attack / Release', desc: 'Reaction speed' },
          { name: 'Mode', desc: 'Compressor / Expander / Upward' }
        ]
      }
    ],
    tips: [
      { title: 'Dynamic de-esser', text: `Place a band at 6–9 kHz, Mode: Compressor, Range -6 dB. Set Threshold to activate only on sibilants. More precise and musical than a standard de-esser.` },
      { title: 'Bass control on the master', text: `Band at 60–80 Hz, Compressor, Range -3..4 dB, slow attack. Bass stays even without being fully suppressed.` },
      { title: 'M/S: Side compression', text: `In M/S mode, add compression only to the Side channel — width is dynamically controlled. Loud moments narrow the mix, quiet moments widen it.` }
    ],
    controlParams: [
      { n:1, name:'Crossovers',    range:'20 Hz — 20 kHz',    def:'120 / 800 / 5000 Hz', tip:'Classic split points: 120 Hz (sub/bass), 800 Hz (bass/mid), 5 kHz (mid/high). Move to suit the material' },
      { n:2, name:'Threshold',     range:'−60 to 0 dB',       def:'−24 dB (per band)',    tip:'Each band has its own Threshold. Set bands one at a time — each band has a Solo button' },
      { n:3, name:'Ratio',         range:'1:1 to ∞:1',        def:'4:1',                  tip:'Upward compression: Ratio below 1:1 (Pro-MB only). Raises quiet parts — use carefully on mids' },
      { n:4, name:'Range',         range:'0 — 48 dB',         def:'12 dB',                tip:'Maximum GR for this band. Limits aggressiveness — protection against over-compressing individual bands' },
      { n:5, name:'Attack/Release',range:'0.01 — 500 ms',     def:'10 ms / Auto',         tip:'For bass: slow attack (30 ms) to avoid suppressing sub bass. For highs: fast attack (1–5 ms)' },
      { n:6, name:'Mode (M/S L/R)',range:'Stereo / M/S / L/R',def:'Stereo',               tip:'M/S mode: compress Mid and Side independently. Side compression controls width dynamically' }
    ]
  },

  'pro-ds': {
    shortDesc: 'Professional de-esser with two modes',
    description: `Pro-DS is the best de-esser in its class. Two modes: Dynamic (only processes
    the problem range, leaves everything else untouched) and Wideband (attenuates the whole signal
    when sibilants are too loud — like a regular compressor with a high-frequency sidechain).
    Precise visualization, external sidechain, Single Voice and multi-voice support.`,
    when: 'Vocals with strong sibilants where the basic DeSibilizer isn\'t enough',
    pros: [
      'Dynamic and Wideband modes — for different situations',
      'Detailed sibilant spike visualization',
      'Sidechain: Single Voice for solo vocals, Allround for groups',
      'Transparency — voice doesn\'t lose its natural quality'
    ],
    cons: [
      'Overkill for simple tasks — DeSibilizer will do',
      'Price'
    ],
    guide: [
      {
        title: 'Dynamic vs Wideband',
        params: [
          { name: 'Dynamic', desc: 'Only high frequencies are compressed — voice keeps its brightness' },
          { name: 'Wideband', desc: 'Entire signal is attenuated — more transparent with strong sibilants' }
        ]
      },
      {
        title: 'Setup',
        text: `Enable the plugin and play the vocal. The visualizer shows sibilant spikes.
        Set Threshold just below their peak. Adjust Frequency: find the range where
        spikes are at their maximum (usually 6–9 kHz). Check: vocal should sound natural.`
      }
    ],
    tips: [
      { title: 'Single Voice for solo vocals', text: `<strong>Single Voice</strong> mode — algorithm optimized for a single voice. More accurate on solo tracks than Allround.` },
      { title: 'Wideband for severe problems', text: `If Dynamic doesn't handle it — switch to Wideband. Less audible at high GR. But sounds more natural than an over-driven Dynamic.` },
      { title: 'Automate Threshold', text: `Sibilant intensity varies across the track. Automate Threshold — lower it in the more "hissy" sections.` }
    ],
    controlParams: [
      { n:1, name:'Threshold', range:'−40 to 0 dB',     def:'−10 dB',   tip:'Find the harshest sibilant moment, set Threshold just below its peak. Listen to the whole vocal — not just one sound' },
      { n:2, name:'Frequency', range:'2 — 16 kHz',      def:'7 kHz',    tip:'Listen button — you hear only what\'s being processed. Move Frequency until you find the maximum "hiss"' },
      { n:3, name:'Mode',      range:'Dynamic / Wideband',def:'Dynamic', tip:'Dynamic — cuts only in the Frequency range, more transparent. Wideband — lowers whole level. Dynamic is preferred' },
      { n:4, name:'Range',     range:'0 — 24 dB',       def:'6 dB',     tip:'3–6 dB = natural. 8–10 dB = audible lispiness. More than 10 dB only if the problem is critical' }
    ]
  },

  'pro-g': {
    shortDesc: 'Professional gate and expander',
    description: `Pro-G is a top-tier gate and expander from FabFilter. Seven operation modes
    from clean Gate to Expander with various curves. Detailed gain reduction visualization,
    precise Attack/Hold/Release controls, sidechain with EQ filter.
    Turns noisy recordings into clean ones and gives drums a tight, precise sound.`,
    when: 'Removing background noise from recordings, tight drums, noise reduction',
    pros: [
      '7 Gate/Expander modes with different character',
      'Sidechain EQ — gate reacts to specific frequencies',
      'Detailed visualization — see when and how it activates',
      'MIDI trigger — open the gate on a MIDI signal',
      'Lookahead — anticipatory reaction without clipping attacks'
    ],
    cons: [
      'Overkill for simple noise reduction tasks',
      'Price',
      'Wrong Attack/Release settings = audible gate pumping'
    ],
    guide: [
      {
        title: 'Modes',
        params: [
          { name: 'Gate', desc: 'Clean open/close — all or nothing' },
          { name: 'Expander', desc: 'Gradual attenuation of signal below threshold' },
          { name: 'Duck', desc: 'Reverse gate — attenuates when signal is ABOVE threshold' },
          { name: 'Gate + Lookahead', desc: 'Anticipatory gate — doesn\'t clip the attack' }
        ]
      },
      {
        title: 'Setup on Drums',
        text: `Kick: Threshold -30..40 dB (just above room/bleed level),
        Attack 0.1 ms, Hold 50 ms, Release 100 ms.
        Snare: similar but Hold 30 ms. If the gate "clicks" — increase Lookahead.`
      },
      {
        title: 'Sidechain Filter',
        text: `Enable SC EQ. On snare: HP 200 Hz — gate doesn't activate from low rumble.
        On vocals: BP 1–6 kHz — reacts only to vocal frequencies, not low-frequency noise.`
      }
    ],
    tips: [
      { title: 'Lookahead against clicks', text: `If you hear a "click" when the gate opens — enable Lookahead 1–3 ms. The gate opens slightly before needed — the attack of the sound is preserved.` },
      { title: 'Expander instead of Gate', text: `Gate cuts hard. Expander gradually attenuates quiet parts. On vocals, Expander sounds more natural — the background doesn't disappear abruptly.` },
      { title: 'MIDI trigger on electronic drums', text: `Connect MIDI output from a drum module as sidechain for Pro-G. Gate opens precisely on the MIDI note — perfect for parallel processing of live drums.` }
    ],
    controlParams: [
      { n:1, name:'Threshold', range:'−80 to 0 dB',    def:'−30 dB', tip:'Set just above the noise floor in pauses. Enable Solo to hear what\'s being cut — useful for precise calibration' },
      { n:2, name:'Attack',    range:'0.01 — 500 ms',  def:'0.5 ms', tip:'Too fast attack = click when opening. 0.1–2 ms is a good balance. Or enable Lookahead 1–3 ms instead' },
      { n:3, name:'Hold',      range:'0 — 4000 ms',    def:'50 ms',  tip:'Gate stays open minimum this long. 30–100 ms removes "chattering" during fast closures between syllables' },
      { n:4, name:'Release',   range:'1 — 4000 ms',    def:'150 ms', tip:'Slow Release = gate closes gradually, naturally. Fast = abrupt cut. 100–200 ms is the safe zone' },
      { n:5, name:'Mode',      range:'Gate / Expander / Duck', def:'Gate', tip:'Expander is smoother than Gate — quiet signal is attenuated, not cut. On vocals Expander sounds more natural' },
      { n:6, name:'Lookahead', range:'0 — 20 ms',      def:'0 ms',   tip:'1–3 ms removes clicks on opening without noticeable delay. Enable whenever you hear "pops" on transients' }
    ]
  },

  'ozone-11': {
    shortDesc: 'Full mastering suite with AI assistant',
    description: `Ozone 11 is iZotope's flagship all-in-one mastering processor. Includes EQ, compressor,
    multiband dynamic processor, imager, limiter, exciter and Tonal Balance analysis tools.
    The AI Master Assistant creates a starting chain for a specific track in seconds —
    a good starting point for manual fine-tuning.`,
    when: 'Final track mastering — everything in one plugin instead of a chain',
    pros: [
      'AI Assistant — starting preset in 5 seconds',
      'Tonal Balance Control — compare spectrum against references',
      'Everything in one window: EQ, Dynamics, Imager, Limiter',
      'Low End Focus — separate control of sub bass and bass',
      'Stem mastering in Ozone 11 Advanced'
    ],
    cons: [
      'Very heavy on CPU — not for weak machines',
      'AI presets always need manual adjustment',
      'iZotope subscription is expensive',
      'Redundant if you already have top individual plugins'
    ],
    guide: [
      {
        title: 'Ozone 11 Modules',
        params: [
          { name: 'EQ', desc: 'Parametric EQ with AI EQ Match and tonal analysis' },
          { name: 'Dynamic EQ', desc: 'Dynamic EQ — cuts only when a frequency is too loud' },
          { name: 'Dynamics', desc: 'Multiband compressor / transient shaper' },
          { name: 'Imager', desc: 'Stereo widener with multiband width control' },
          { name: 'Maximizer', desc: 'Final limiter with IRC algorithms' },
          { name: 'Exciter', desc: 'Harmonic saturation per band' },
          { name: 'Low End Focus', desc: 'Separate control of sub bass (20–80 Hz) and bass (80–200 Hz)' }
        ]
      },
      {
        title: 'AI Master Assistant',
        text: `Press the <strong>Master Assistant</strong> button. Choose intensity (Low/Medium/High)
        and genre. Ozone analyzes the track and creates a starting chain.
        This is a starting point — not the finish. Always listen and adjust each module manually.`
      },
      {
        title: 'Tonal Balance',
        text: `Open <strong>Tonal Balance Control</strong>. Load a reference track or choose a genre preset.
        Compare your master's spectrum against the reference. Red/blue zone = deviation.
        Correct via the EQ module directly from the Tonal Balance window.`
      }
    ],
    tips: [
      { title: 'AI as a starting point only', text: `Never leave an AI preset unchanged. Use it as 80% of the work, then go through each module and remove what doesn't serve the track.` },
      { title: 'Low End Focus on the master', text: `Sub bass in mono — always. In Low End Focus: Sub Balance slightly right (mono), Bass Balance to taste. Bass will translate on any speaker.` },
      { title: 'Maximizer IRC IV', text: `<strong>IRC IV</strong> algorithm in the Maximizer — the most transparent. For genres with dynamics (jazz, acoustic) choose this one.` },
      { title: 'Disable unused modules', text: `Every active Ozone module uses CPU. If you\'re not using Exciter or Imager — turn them off with the power button. The difference in load is significant.` },
      { title: 'Compare with reference', text: `Ozone has a built-in A/B reference. Load a commercial track of a similar genre and compare in real time.` }
    ],
    controlParams: [
      { n:1, name:'Master Assistant', range:'Low / Med / High intensity', def:'Medium', tip:'Use ONLY as a starting point. After generation, always go through each module and adjust manually' },
      { n:2, name:'EQ (Equalizer)',   range:'Parametric + Dynamic',       def:'per AI',  tip:'EQ module in Ozone is a full parametric with Dynamic bands. First fix problematic frequencies' },
      { n:3, name:'Dynamics',         range:'Threshold per band',         def:'per AI',  tip:'Multiband compression. GR 1–3 dB per band is enough. More = audible squashing' },
      { n:4, name:'Imager',           range:'Side gain per band',         def:'0 dB',    tip:'Sub (below 120 Hz) always in mono (Side = minimum). Other bands — small widening +1..2 dB' },
      { n:5, name:'Maximizer IRC',    range:'IRC I–IV / Vintage',         def:'IRC IV',  tip:'IRC IV = most transparent. For loud EDM — IRC III or Vintage. Move Threshold to target LUFS' },
      { n:6, name:'Tonal Balance',    range:'vs genre reference',         def:'by genre',tip:'Red zone = too much; blue = too little vs reference. Correct with EQ module directly from TB window' }
    ]
  },


  'sakura-dither': {
    shortDesc: 'Dithering for the final export',
    description: `Sakura Dither adds a specialized noise when reducing bit depth from 32 to 16 bits.
    Without dithering, quiet details are lost during conversion — reverb tails, fadeouts,
    subtle textures. Dither noise masks quantization errors and preserves those details.
    Goes last in the master chain — after the limiter, before export.`,
    when: 'Final export to 16-bit (CD quality) — the last plugin in the chain',
    pros: [
      'Preserves detail when converting to 16-bit',
      'Several noise shaping algorithms',
      'Built into FL Studio',
      'Inaudible — only corrects mathematical rounding error'
    ],
    cons: [
      'Only needed when exporting to 16-bit — useless for 24/32-bit',
      'No visualization — hard to tell if it\'s working'
    ],
    guide: [
      {
        title: 'When Dithering Is Needed',
        text: `Your FL project runs at 32-bit float. When exporting to 16-bit WAV (CD, some streaming services)
        the bit depth is reduced. Dithering is only needed for that export.
        When exporting to 24-bit or 32-bit — Sakura Dither is not needed, remove it.`
      },
      {
        title: 'Parameters',
        params: [
          { name: 'Type', desc: 'Dither algorithm: TPDF (neutral), Noise Shaping (hearing-optimized)' },
          { name: 'Noise Shaping', desc: 'Moves quantization noise into less audible frequencies' },
          { name: 'Bit Depth', desc: 'Target bit depth — usually 16-bit' }
        ]
      }
    ],
    tips: [
      { title: 'Always last in the chain', text: `Sakura Dither must be the very last plugin on the master bus — after EQ, compressor, limiter. Any processing after it nullifies the effect.` },
      { title: 'Remove for 24/32-bit export', text: `For Spotify, Apple Music and YouTube, 24-bit is sufficient — no dithering needed. Keep it only for CD export to 16-bit.` },
      { title: 'TPDF — the safe choice', text: `If you don't know which type to pick — use <strong>TPDF</strong>. Neutral, no coloration, works correctly for any material.` }
    ],
    controlParams: [
      { n:1, name:'Type',          range:'TPDF / Noise Shaping types', def:'TPDF',   tip:'TPDF — neutral, safe for any genre. Noise Shaping moves noise above 15 kHz — less audible, but with some coloration' },
      { n:2, name:'Noise Shaping', range:'Off / Low / High',           def:'Low',    tip:'Low = minimal coloration. High = maximum quantization noise masking. Low is sufficient for most tasks' },
      { n:3, name:'Bit Depth',     range:'8 / 16 / 24 bit',           def:'16 bit', tip:'Needed ONLY when exporting to 16-bit (CD). When exporting to 24/32-bit — remove Sakura Dither from the chain completely' }
    ]
  },

  'fruity-convolver': {
    shortDesc: 'Convolution reverb using Impulse Response files',
    description: `Fruity Convolver is a convolution reverb that uses recordings of real spaces
    (Impulse Response, IR files). It sounds like a real room, hall, cathedral or any other venue —
    because it literally is a recording of that real space.
    Realism unachievable by algorithmic reverbs. Load any IR files.`,
    when: 'Vocals, acoustic instruments, cinematic sound — when you need real spaces',
    pros: [
      'Maximum realism — real rooms and halls',
      'Supports any IR files (.wav) — vast library of free IRs',
      'Built into FL Studio',
      'Perfect for cinematic sound and realistic instruments'
    ],
    cons: [
      'Heavier CPU than algorithmic reverbs',
      'No interactive parameters like Pro-R (can\'t change decay or tail EQ)',
      'Quality depends on the IR file quality'
    ],
    guide: [
      {
        title: 'Loading an IR',
        text: `Click the folder button and load a .wav IR file. FL Studio ships with a basic IR set.
        Additional free IRs from Voxengo (Impulse Response Warehouse), EchoThief,
        OpenAIR — hundreds of real spaces. Load the file, adjust Pre-Delay and Mix.`
      },
      {
        title: 'Parameters',
        params: [
          { name: 'Pre-Delay', desc: 'Delay before the reverb tail — creates a sense of distance' },
          { name: 'Start', desc: 'Start point of IR playback — trims early reflections' },
          { name: 'Length', desc: 'Length of IR used — shortens the tail' },
          { name: 'Gain', desc: 'Reverb tail level' },
          { name: 'Mix', desc: 'Dry/Wet balance' }
        ]
      }
    ],
    tips: [
      { title: 'Free IR libraries', text: `<strong>EchoThief.com</strong> — 150+ free IRs of real places (subways, stadiums, caves). <strong>OpenAIR</strong> — academic hall recordings. Download and use for free.` },
      { title: 'Trim the tail with Length', text: `A long IR tail uses CPU and muddies the mix. The <strong>Length</strong> parameter shortens the tail without changing the character of the start. 1.5–2.5 s is enough for most tracks.` },
      { title: 'Pre-delay for vocals', text: `Pre-Delay 15–25 ms — voice stays intelligible, reverb doesn't merge with the word attack. Standard practice on any convolution reverb.` },
      { title: 'Low Mix', text: `Convolver sounds very realistic — sometimes too much. Mix 10–20% on vocals gives the feeling of "recorded in a room" without obvious wet reverb.` }
    ],
    controlParams: [
      { n:1, name:'IR File',    range:'any .wav IR file', def:'—',      tip:'EchoThief.com and OpenAIR — hundreds of free IR files of real spaces. Load via the Browse folder button' },
      { n:2, name:'Pre-Delay', range:'0 — 250 ms',       def:'10 ms',  tip:'15–25 ms on vocals — voice stays intelligible. 0 ms = maximum atmosphere, less clarity' },
      { n:3, name:'Length',    range:'0 — 100% of IR',   def:'100%',   tip:'Shorten the tail with Length if reverb muddies the mix. 50–70% often sounds cleaner than the full IR tail' },
      { n:4, name:'Start',     range:'0 — 100% of IR',   def:'0%',     tip:'Moves the IR playback start point — trims early reflections. Use to keep only the tail' },
      { n:5, name:'Mix',       range:'0 — 100%',         def:'20%',    tip:'Convolver sounds very realistic. Mix 10–20% on vocals = "recorded in a room". 40%+ = obvious wet reverb' }
    ]
  },

  'fruity-reeverb-2': {
    shortDesc: "FL Studio's standard algorithmic reverb",
    description: `Fruity Reeverb 2 is FL Studio's standard algorithmic reverb.
    Several space types (Room, Hall, Plate, Spring), basic parameters,
    minimal CPU. Not as detailed as Pro-R or LuxeVerb,
    but does an excellent job of quickly adding space to any sound.`,
    when: 'Quick room or hall addition without heavy plugins',
    pros: [
      'Built into FL — zero cost',
      'Light CPU — use on every track',
      'Simple interface — quick to set up',
      'Covers most everyday reverb tasks'
    ],
    cons: [
      'No EQ in the reverb tail',
      'Less musical than Pro-R or LuxeVerb',
      'Limited parameter control'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Room Size', desc: 'Size of the virtual space' },
          { name: 'Decay', desc: 'RT60 — how long the tail lasts' },
          { name: 'Diffusion', desc: 'Density of reflections in the tail' },
          { name: 'High Damp', desc: 'High frequency absorption — higher = warmer tail' },
          { name: 'Pre-Delay', desc: 'Delay before reverb starts' },
          { name: 'Dry / Wet', desc: 'Dry/Wet balance' }
        ]
      }
    ],
    tips: [
      { title: 'Pre-delay on vocals', text: `Pre-Delay 15–20 ms — voice stays clear. The reverb doesn't merge with the attack of the word.` },
      { title: 'High Damp for warmth', text: `High Damp 60–80% — the tail becomes warm and dark. High frequencies decay faster, like a room with soft furniture.` },
      { title: 'Use as a send effect', text: `Put Fruity Reeverb 2 on a separate Aux bus, Mix 100%. Control the reverb level with the Aux channel fader.` }
    ],
    controlParams: [
      { n:1, name:'Room Size',  range:'0 — 100%',  def:'50%',  tip:'Small = tight room (drums, vocals). Large = hall (pads, leads). Combine with Decay for full control' },
      { n:2, name:'Decay',      range:'0.1 — 10 s',def:'2.0 s',tip:'Vocals: 1.5–2.5 s. Percussion: 0.3–0.8 s. Pads: 3–6 s. Ambient: 6+ s' },
      { n:3, name:'Diffusion',  range:'0 — 100%',  def:'60%',  tip:'High Diffusion = dense smooth tail. Low = individual reflections are audible. High for pads, lower for drums' },
      { n:4, name:'High Damp',  range:'0 — 100%',  def:'40%',  tip:'60–80% = warm dark tail without synthetic hiss. 0% = bright metallic character. Use high values for realism' },
      { n:5, name:'Pre-Delay',  range:'0 — 200 ms',def:'10 ms',tip:'15–20 ms on vocals = intelligibility. 0 ms = maximum atmosphere. 30–50 ms = obvious distance/space' },
      { n:6, name:'Wet',        range:'0 — 100%',  def:'25%',  tip:'Use on a Send bus (Wet 100%) and control with the Aux fader. Better than Insert for flexible mix control' }
    ]
  },

  'luxeverb': {
    shortDesc: 'High-quality algorithmic reverb',
    description: `LuxeVerb is a high-quality reverb from Image-Line with several algorithms
    and a rich tail. It sits between the free Fruity Reeverb 2
    and the top-tier Pro-R. Sounds great on pads, atmospheres and synths —
    adds spatial character without digital coldness.`,
    when: 'When Fruity Reeverb 2 doesn\'t cut it — you need a richer, more detailed tail',
    pros: [
      'Several algorithms with different tail characters',
      'Rich and full sound',
      'Built into FL Studio',
      'Great fit for electronic music'
    ],
    cons: [
      'Less control than Pro-R',
      'No EQ inside the tail',
      'Fewer parameters than third-party reverbs'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Algorithm', desc: 'Space type: Hall, Room, Chamber, Plate, Ambience' },
          { name: 'Size', desc: 'Size of the space' },
          { name: 'Decay', desc: 'Decay time' },
          { name: 'Damping', desc: 'High frequency absorption — more = darker tail' },
          { name: 'Pre-Delay', desc: 'Delay before reverb starts' },
          { name: 'Width', desc: 'Stereo width of the tail' },
          { name: 'Mix', desc: 'Dry/Wet' }
        ]
      }
    ],
    tips: [
      { title: 'Plate on vocals', text: `<strong>Plate</strong> algorithm — a classic for vocals. Smooth metallic tail without obvious reflections. Decay 1.5–2.5 s, Mix 15–25%.` },
      { title: 'Damping for warmth', text: `Damping 60–80% — the tail becomes warm and dark. High frequencies fade quickly, like a real room with soft furniture.` },
      { title: 'Large Size on pads', text: `Size at max, Decay 4–6 s, Mix 40–60%. The pad dissolves into a huge space — atmospheric effect for ambient and cinematic.` }
    ],
    controlParams: [
      { n:1, name:'Algorithm', range:'Hall, Room, Chamber, Plate, Ambience', def:'Hall', tip:'Plate = vocals and drums (smooth metallic tail); Hall = pads and synths; Chamber = middle ground' },
      { n:2, name:'Size',      range:'0 — 100%',    def:'50%',    tip:'Small + short Decay = a room. Large + long Decay = vast space. Combine them independently' },
      { n:3, name:'Decay',     range:'0.1 — 12 s',  def:'2.0 s',  tip:'Vocals: 1.5–2.5 s (Plate); Pads: 4–8 s (Hall); Percussion: 0.4–1.0 s; Ambient: 6–12 s' },
      { n:4, name:'Damping',   range:'0 — 100%',    def:'40%',    tip:'60–80% = warm dark tail like a room with soft furniture. 0% = bright metallic tail (Plate character)' },
      { n:5, name:'Pre-Delay', range:'0 — 200 ms',  def:'10 ms',  tip:'15–25 ms on vocals = clarity. 0 ms = maximum atmosphere. 30–50 ms = obvious slap-back effect' },
      { n:6, name:'Width',     range:'0 — 100%',    def:'80%',    tip:'100% = wide stereo tail. 0% = mono reverb. For sub-bass oriented tracks keep it below 50%' },
      { n:7, name:'Mix',       range:'0 — 100%',    def:'25%',    tip:'Use as a Send effect (Mix 100% on Aux bus). Control the reverb level with the Aux channel fader' }
    ]
  },

  'fruity-delay-3': {
    shortDesc: 'Delay with filters and diffusion in the feedback loop',
    description: `Fruity Delay 3 is an upgraded version of the standard FL Studio delay.
    Key improvement over Delay 2: filters inside the feedback loop and diffusion.
    Filters let the tail darken or brighten with each repeat,
    diffusion blurs the repeats — the tail starts to resemble reverb.`,
    when: 'Delay with a dark or warm tonally colored tail',
    pros: [
      'LP/HP filters inside the feedback loop',
      'Diffusion — turns delay into a spatial atmosphere',
      'Built into FL Studio',
      'Tempo sync'
    ],
    cons: [
      'Single buffer — no two independent lines like Timeless 3',
      'No pitch shift in the loop',
      'Interface feels a bit dated'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Delay', desc: 'Delay time — ms or note value (sync)' },
          { name: 'Feedback', desc: 'Number of repeats' },
          { name: 'Cut', desc: 'LP filter in the loop — tail darkens with each repeat' },
          { name: 'Reso', desc: 'Filter resonance' },
          { name: 'Diffusion', desc: 'Blurs repeats — from crisp echo to atmospheric wash' },
          { name: 'Volume', desc: 'Effect level' },
          { name: 'Pan', desc: 'Pan position of the tail' }
        ]
      }
    ],
    tips: [
      { title: 'Dark tape-style delay', text: `Cut filter at 4–6 kHz, Feedback 50–60%. Each repeat gets darker — tape delay emulation without buying Timeless 3.` },
      { title: 'Diffusion as cheap reverb', text: `Diffusion 70–90%, high Feedback, very short Delay (10–30 ms). Creates a dense space — almost a reverb, but from a delay.` },
      { title: 'Sync to 3/16 note', text: `Sync to 3/16 instead of 1/4 creates a syncopated rhythmic effect. Interesting on vocal chops and guitar loops.` }
    ],
    controlParams: [
      { n:1, name:'Delay Time', range:'1 ms — 2 s / 1/32 — 2 bars', def:'1/4',  tip:'Tempo Sync (note button) locks to BPM. 3/8 or 5/8 = syncopated echo. 1/16 = slapback effect' },
      { n:2, name:'Feedback',   range:'0 — 100%',    def:'40%',  tip:'Up to 50% = controlled echo; 60–75% = many repeats; above 80% = builds to self-oscillation (careful!)' },
      { n:3, name:'Cut (LP)',   range:'20 — 20000 Hz',def:'8 kHz',tip:'ALWAYS filter the tail: LP 5–8 kHz (remove air) + HP 200 Hz (remove bass). Echo shouldn\'t mask the original' },
      { n:4, name:'Diffusion',  range:'0 — 100%',    def:'0%',   tip:'High Diffusion blurs repeats — creates a dense atmosphere instead of a crisp rhythmic echo' },
      { n:5, name:'Ping-Pong',  range:'Off / On',    def:'Off',  tip:'Ping-Pong alternates repeats L/R. Great for vocals and leads — creates wide stereo movement' },
      { n:6, name:'Volume (Mix)',range:'0 — 100%',   def:'25%',  tip:'Use as a Send effect on a separate bus (Volume 100%). Control echo amount with the Aux channel fader' }
    ]
  },

  'fruity-delay-2': {
    shortDesc: 'Classic stereo delay with tempo sync',
    description: `Fruity Delay 2 is FL Studio's classic stereo delay with tempo sync.
    Independent time for left and right channels, ping-pong mode, filter in the loop.
    Simple and reliable — for the vast majority of everyday delay tasks
    this plugin is completely sufficient.`,
    when: 'Standard delay on vocals, guitar, synths — clean echo in time',
    pros: [
      'Separate L/R time — creates wide stereo echo',
      'Ping-pong mode in one click',
      'Tempo sync',
      'Built into FL Studio, minimal CPU'
    ],
    cons: [
      'No diffusion (available in Delay 3)',
      'No pitch shift',
      'Single buffer — no complex configurations'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Steps L / R', desc: 'Delay time for left and right channel independently' },
          { name: 'Feedback', desc: 'Number of repeats' },
          { name: 'Cut', desc: 'LP filter in the loop — darkens the tail' },
          { name: 'Ping Pong', desc: 'Alternates repeats between L and R channels' },
          { name: 'Volume', desc: 'Effect level' }
        ]
      }
    ],
    tips: [
      { title: 'Ping-pong on vocals', text: `Ping-pong on, Steps 1/4 note. Vocals "jump" between left and right channel — creates width and movement without heavy plugins.` },
      { title: 'Different L and R time', text: `L: 1/4, R: 3/8 — you get asymmetric stereo echo. More interesting than the same time on both channels.` },
      { title: 'Delay only on Side', text: `Send only the Side signal (via Fruity Stereo Shaper) to Delay 2. Delay adds width without touching the center element.` }
    ],
    controlParams: [
      { n:1, name:'Steps L',   range:'1/32 — 2 bars', def:'1/4',  tip:'Tempo Sync — note button next to the knob. Different L and R values create asymmetric stereo echo' },
      { n:2, name:'Steps R',   range:'1/32 — 2 bars', def:'1/4',  tip:'Try L: 1/4, R: 3/8 — asymmetric echo sounds more interesting than the same time on both channels' },
      { n:3, name:'Feedback',  range:'0 — 100%',      def:'40%',  tip:'Up to 50% = controlled echo. Above 70% = building towards self-oscillation. Always filter the tail with Cut' },
      { n:4, name:'Cut (LP)',  range:'20 — 20000 Hz', def:'8 kHz',tip:'Filter in the feedback loop — each repeat is darker than the previous. Remove air: Cut 4–8 kHz' },
      { n:5, name:'Ping-Pong', range:'Off / On',      def:'Off',  tip:'Repeats alternate L→R→L→R. On vocals and leads creates wide stereo movement without extra plugins' },
      { n:6, name:'Volume',    range:'0 — 100%',      def:'25%',  tip:'Use as a Send effect (Volume 100% on Aux bus). Control echo amount with the Aux channel fader' }
    ]
  },

  'equo': {
    shortDesc: 'Graphic EQ with morphing between presets',
    description: `EQUO is an unusual 8-band graphic EQ with a unique morphing function.
    You can save several EQ curve shapes and smoothly transition between them via automation.
    This opens creative possibilities: live tonal changes, filter animations,
    rhythmic EQ patterns. Not for correction — for creativity.`,
    when: 'Creative EQ effects, animated filter sweeps, moving timbre in transitions',
    pros: [
      'Morphing between curve shapes — unique feature',
      'Automation creates live tonal movement',
      'Built into FL Studio',
      'Simple and visual interface'
    ],
    cons: [
      'Graphic EQ — not for precise surgical correction',
      'Can\'t set exact band frequencies',
      'Less versatile than PEQ 2 for standard tasks'
    ],
    guide: [
      {
        title: 'Morphing Between Presets',
        text: `Draw the first EQ shape. Save as slot A. Draw another shape — slot B.
        Automate the <strong>Morph</strong> parameter from 0 to 1. The EQ smoothly transitions
        from shape A to shape B. Use in an Automation Clip for tempo-synced movement.`
      },
      {
        title: 'Parameters',
        params: [
          { name: 'Bands (8)', desc: '8 graphic bands from sub bass to air' },
          { name: 'Morph', desc: 'Transition between two saved curves (0–100%)' },
          { name: 'Wet', desc: 'EQ amount (0 = bypass, 100 = full effect)' }
        ]
      }
    ],
    tips: [
      { title: 'Automate Morph in time', text: `Draw a smooth Morph 0→100% over 2 bars in an Automation Clip. EQUO creates a filter sweep exactly in time — effective on transitions.` },
      { title: 'Telephone EQ effect', text: `Cut everything below 500 Hz and above 4 kHz — you get a telephone sound imitation. Morphing to the normal curve = a "telephone" transition.` },
      { title: 'Rhythmic tonal gate', text: `Alternate between "all bands at 0" and "normal curve" via Morph automation at 1/8 or 1/16 — a rhythmic tonal gate.` }
    ],
    controlParams: [
      { n:1, name:'Bands (8)', range:'8 graphic bands', def:'0 dB (flat)',  tip:'Draw the curve shape with the mouse. For a sweep: draw an LP curve (bands falling left to right) — it sweeps when you automate Morph' },
      { n:2, name:'Morph',     range:'0 — 100%',       def:'0%',           tip:'Main parameter for automation. Automation Clip 0→100% over 4 bars = smooth filter sweep in time' },
      { n:3, name:'Wet',       range:'0 — 100%',       def:'100%',         tip:'0% = bypass (original), 100% = full EQ. Automate from 0 to 100% for the effect of "turning on" tonal movement' }
    ]
  },

  'tranquilizr-g2': {
    shortDesc: 'Vintage-style EQ with analog character',
    description: `tranQuilizr G2 is a parametric EQ with analog character emulation.
    Several filter types based on classic hardware models (Neve, Pultec).
    Adds warmth and coloration that clean digital EQs lack.
    Ideal for musical equalization when character matters more than precision.`,
    when: 'When Pro-Q 3 sounds too sterile — you need warm analog character',
    pros: [
      'Analog character and warmth',
      'Several filter modes (Neve, Pultec-style)',
      'Built into FL Studio',
      'Musically pleasant sounding Shelf filters'
    ],
    cons: [
      'Less precise than Pro-Q 3',
      'No M/S mode',
      'No dynamic bands'
    ],
    guide: [
      {
        title: 'Filter Modes',
        params: [
          { name: 'Type A', desc: 'Gentle Shelves — warm boost of lows and highs' },
          { name: 'Type B', desc: 'Sharper Bell — precise correction with character' },
          { name: 'Type C', desc: 'Vintage Low Shelf — Pultec emulation, rich bass' }
        ]
      },
      {
        title: 'The Pultec Trick',
        text: `Classic move: Low Shelf — simultaneously boost and cut the same frequency (80–100 Hz).
        Boost +3 dB and Cut -2 dB at 80 Hz. Result: bass body is enhanced, low-end mud is controlled.
        tranQuilizr G2 emulates this behavior in Type C mode.`
      }
    ],
    tips: [
      { title: 'High Shelf for air', text: `High Shelf +2..3 dB at 12–16 kHz in Type A mode. Highs lift gently and musically — without the ear-cutting harshness of digital EQ.` },
      { title: 'Stack with Pro-Q 3', text: `tranQuilizr G2 first (character and warmth) → Pro-Q 3 second (precise correction). Analog character + digital precision.` },
      { title: 'On the master for glue', text: `Light Low Shelf +1 dB at 80 Hz and High Shelf +1 dB at 14 kHz. The master gets warmth and air with minimal intervention.` }
    ],
    controlParams: [
      { n:1, name:'Filter Type', range:'Type A, B, C',    def:'Type A', tip:'Type A = gentle Shelves (Neve-style); Type B = Bell with character; Type C = Pultec-style Low Shelf for bass' },
      { n:2, name:'Low Shelf',   range:'-12 — +12 dB',   def:'0 dB',   tip:'Pultec trick: simultaneously +3 dB Boost and -2 dB Cut at 80 Hz. Bass body is enhanced, mud is controlled' },
      { n:3, name:'High Shelf',  range:'-12 — +12 dB',   def:'0 dB',   tip:'+2..3 dB at 12–16 kHz in Type A — air lifts gently and musically without the harsh digital character' },
      { n:4, name:'Bell/Mid',    range:'-12 — +12 dB + Q',def:'0 dB',  tip:'For targeted correction with analog character. Type B gives a sharper Bell than Type A' },
      { n:5, name:'Output Gain', range:'-12 — +12 dB',   def:'0 dB',   tip:'Compensate overall level after EQ. When boosting highs, lower by 0.5–1 dB for honest A/B comparison' }
    ]
  },

  'fruity-mbc': {
    shortDesc: "FL Studio's built-in multiband compressor",
    description: `Fruity Multiband Compressor is FL Studio's built-in three-band compressor.
    Splits the signal into Low, Mid and High ranges and processes each independently.
    Simpler than Maximus and Pro-MB, but fully covers basic multiband compression tasks:
    bass control without affecting highs, dynamics leveling per band.`,
    when: 'Mastering and band dynamics control without third-party plugins',
    pros: [
      'Built into FL — zero cost',
      'Three bands — Low, Mid, High with independent compression',
      'Band-level visualization',
      'Simple interface — quick to set up'
    ],
    cons: [
      'Less control than Maximus or Pro-MB',
      'No upward compression',
      'No M/S mode'
    ],
    guide: [
      {
        title: 'Parameters per Band',
        params: [
          { name: 'Threshold', desc: 'Compression threshold for this band' },
          { name: 'Ratio', desc: 'Amount of compression' },
          { name: 'Attack / Release', desc: 'Reaction and recovery time' },
          { name: 'Gain', desc: 'Output level for this band' },
          { name: 'Crossover', desc: 'Split frequency between bands' }
        ]
      },
      {
        title: 'Setting Crossovers',
        text: `Low/Mid crossover: 150–200 Hz (where bass ends).
        Mid/High crossover: 4–6 kHz (where "highs" begin).
        These are starting points. Adjust to the specific material.`
      }
    ],
    tips: [
      { title: 'Only the Low band for bass control', text: `Enable compression only on the Low band, leave Mid and High bypassed. Bass levels out, highs aren't touched — fast and effective.` },
      { title: 'Gentle compression on the master', text: `All three bands, Ratio 1.5:1–2:1, no more than 2 dB GR on each. Gentle multiband compression glues the mix without noticeable impact.` },
      { title: 'Use instead of Maximus for simple tasks', text: `If you just need basic multiband compression — Fruity MBC is enough. Maximus is for when you need a limiter, upward compression and detailed control.` }
    ],
    controlParams: [
      { n:1, name:'Threshold',  range:'-60 — 0 dB (per band)', def:'-12 dB',      tip:'Set separately for each band. Low: higher threshold (bass is unstable); High: lower (highs are quieter)' },
      { n:2, name:'Ratio',      range:'1:1 — 10:1 (per band)', def:'2:1',          tip:'2:1–3:1 for gentle mastering compression. 4:1–6:1 for aggressive bass control' },
      { n:3, name:'Attack',     range:'0.1 — 500 ms',          def:'30 ms',        tip:'Slow attack (20–50 ms) preserves transients. Low Band: slower; High Band: faster' },
      { n:4, name:'Release',    range:'5 — 5000 ms',           def:'150 ms',       tip:'Auto Release if available. Manual: Low Band 200–400 ms; High Band 50–100 ms' },
      { n:5, name:'Crossover',  range:'20 — 20000 Hz',         def:'200/4000 Hz',  tip:'Low/Mid crossover: 150–200 Hz. Mid/High: 4–6 kHz — standard split points for mastering' }
    ]
  },

  'nu-compressor': {
    shortDesc: 'Transistor VCA compressor with analog character',
    description: `Nu Compressor emulates a transistor VCA compressor with warm analog character.
    Adds density and "meat" to the sound — especially effective on drums and bass.
    Built into FL Studio, no separate license needed.`,
    when: 'Drums, percussion, group tracks — punchy analog character needed',
    pros: [
      'Warm VCA character',
      'Punchy sound on percussion',
      'Built into FL Studio',
      'Easy to set up'
    ],
    cons: [
      'Fewer parameters than Pro-C 2',
      'No sidechain EQ',
      'No GR visualization'
    ],
    guide: [
      {
        title: 'Parameters',
        params: [
          { name: 'Threshold', desc: 'Compression threshold' },
          { name: 'Ratio', desc: 'Amount of compression' },
          { name: 'Attack / Release', desc: 'Reaction time' },
          { name: 'Knee', desc: 'Softness of transition at threshold' },
          { name: 'Gain', desc: 'Makeup gain' }
        ]
      },
      {
        title: 'Usage',
        text: `On drum bus: Ratio 4:1, Attack 10 ms, Release 80 ms.
        The VCA character adds density without losing transients with the right attack setting.`
      }
    ],
    tips: [
      { title: 'Drum bus glue', text: `Ratio 2:1–3:1, slow attack 20–30 ms, GR 3–4 dB. Drums cohere into a single instrument with analog warmth.` },
      { title: 'Parallel with original', text: `Mix 40–60% — keep some uncompressed signal. Transients are preserved, body is enhanced.` }
    ],
    controlParams: [
      { n:1, name:'Threshold', range:'-60 — 0 dB',  def:'-18 dB', tip:'GR 3–5 dB on percussion is the punchy VCA compression zone. Above 6 dB the sound starts to "pump"' },
      { n:2, name:'Ratio',     range:'1:1 — 20:1',  def:'4:1',    tip:'2:1–4:1 for drum bus. 6:1–10:1 for aggressive character on a single instrument' },
      { n:3, name:'Attack',    range:'0.1 — 200 ms',def:'10 ms',  tip:'10–30 ms preserves the punch of transients. Faster than 5 ms — transients get clipped, sound becomes softer' },
      { n:4, name:'Release',   range:'5 — 1000 ms', def:'80 ms',  tip:'Pump effect: Release 50–80 ms in sync with tempo. An audible "breath" between hits — track energy' },
      { n:5, name:'Knee',      range:'Hard — Soft', def:'Medium', tip:'Hard Knee = sharp boundary at Threshold (aggressive VCA). Soft = smooth transition (closer to optical)' },
      { n:6, name:'Gain',      range:'-12 — +12 dB',def:'0 dB',  tip:'Makeup gain — compensate the level loss from compression. Check A/B: compressed ≈ same loudness as uncompressed' }
    ]
  },

  'frequency-splitter': {
    shortDesc: 'Crossover — splits signal into bands for parallel processing',
    description: `Frequency Splitter splits the signal into frequency bands and sends each to a separate Mixer bus. This enables parallel processing: bass goes to one bus with a compressor, mids to another with EQ, highs to a third with reverb. The ideal tool for advanced routing in FL Studio.`,
    when: 'Parallel processing by frequency bands — different effects on low/mid/high',
    pros: ['Precise splitting without artifacts (linear phase)', 'Up to 4 bands', 'Built into FL Studio', 'Foundation for manual multiband processing'],
    cons: ['Requires creating separate Mixer buses', 'Linear phase adds latency', 'More complex to set up than a ready-made multiband'],
    guide: [
      { title: 'Routing Scheme', text: `1. Put Frequency Splitter on an Insert.
      2. Create 2–4 Mixer buses (e.g. 11, 12, 13).
      3. In Splitter assign each band to its own bus via Output.
      4. Apply your own processing on each bus.
      5. All buses return to the master.` },
      { title: 'Parameters', params: [
        { name: 'Crossover 1–3', desc: 'Band split frequencies' },
        { name: 'Output 1–4',    desc: 'Mixer bus number for each band' },
        { name: 'Phase Mode',    desc: 'Minimum Phase (no latency) or Linear Phase (no coloration)' }
      ]}
    ],
    tips: [
      { title: 'Bass in mono via Splitter', text: `Low band (up to 120 Hz) to a separate bus → Fruity Stereo Shaper (Side = 0%) on it. Only bass in mono, the rest is untouched.` },
      { title: 'Parallel compression per band', text: `Mid band to a bus with an aggressive compressor, blend back. Parallel multiband without a dedicated plugin.` }
    ],
    controlParams: [
      { n:1, name:'Crossover 1', range:'20 — 5000 Hz',   def:'150 Hz', tip:'Low/Mid boundary. 120–200 Hz = standard sub-bass/bass split. Choose where the bass instrument transitions from sub-bass to body' },
      { n:2, name:'Crossover 2', range:'500 — 20000 Hz', def:'4000 Hz',tip:'Mid/High boundary. 3–6 kHz = start of cymbals and air. Solo each band to verify the split' },
      { n:3, name:'Output 1–4',  range:'Mixer bus 1–125', def:'1',      tip:'Each band → its own bus. Create buses in advance. All buses return to master — this is critical for the routing to work' },
      { n:4, name:'Phase Mode',  range:'Minimum / Linear',def:'Minimum',tip:'Linear Phase = precise split without coloration, but adds latency. Minimum Phase = no delay, slight phase coloration' }
    ]
  },

  'fruity-filter': {
    shortDesc: 'Simple LP/HP filter for quick sweep effects',
    description: `Fruity Filter is FL Studio's simplest filter: Low Pass, High Pass and Band Pass. One Cutoff parameter and Resonance. Minimal CPU, instant response. The main use case is automated sweeps for build-up effects in EDM.`,
    when: 'Sweep effects, quickly cut frequencies, automated filter sweep',
    pros: ['Extremely simple', 'Minimal CPU', 'Built into FL', 'Ideal for automated sweeps'],
    cons: ['No filter types beyond LP/HP/BP', 'No additional modulations', 'Not for precision processing'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Cutoff',         desc: 'Cutoff frequency — main parameter for automation' },
        { name: 'Resonance (Q)',  desc: 'Resonance at the cutoff frequency' },
        { name: 'Type',           desc: 'LP (Low Pass), HP (High Pass), BP (Band Pass)' }
      ]},
      { title: 'Build-up Sweep', text: `Type LP, Resonance 30–50%. Automation Clip on Cutoff: from 200 Hz to 20 kHz over 4–8 bars. Classic build-up filter sweep for an EDM transition to the drop.` }
    ],
    tips: [
      { title: 'HP sweep on breakdown', text: `Type HP, Cutoff from 20 Hz to 2 kHz over 4 bars. The instrument gradually "thins out" — creates a feeling of tension before the drop.` },
      { title: 'Resonance adds character', text: `Resonance 50–70% during an LP filter sweep — creates a characteristic "quacky" sound. Classic for auto-wah effect.` }
    ],
    controlParams: [
      { n:1, name:'Cutoff',    range:'20 — 20000 Hz', def:'20 kHz', tip:'Main parameter for automation. Automation Clip from 200 Hz to 20 kHz over 4–8 bars = classic EDM build-up sweep' },
      { n:2, name:'Resonance', range:'0 — 100%',      def:'0%',     tip:'30–50% during sweep adds "quacky" auto-wah. 70–80% + slow sweep = acid character. 100% = self-oscillation' },
      { n:3, name:'Type',      range:'LP, HP, BP',    def:'LP',     tip:'LP build-up = everything opens toward the drop. HP breakdown = sound thins out, tension. BP = sharp effect on a narrow band only' }
    ]
  },

  'simplon': {
    shortDesc: 'Simple stereo LP/HP filter',
    description: `Simplon is a minimalist stereo filter with two controls: Low Pass and High Pass. Lightest CPU possible, ideal when you just need to cut frequencies without heavy plugins. Built into FL Studio.`,
    when: 'Quick LP/HP filtering without unnecessary settings',
    pros: ['Extremely simple', 'Stereo processing', 'Minimal CPU', 'Built into FL'],
    cons: ['Only LP and HP — no BP, Notch or other types', 'No resonance', 'No LFO modulation'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Low Pass',  desc: 'Cuts everything above the specified frequency' },
        { name: 'High Pass', desc: 'Cuts everything below the specified frequency' }
      ]},
      { title: 'Usage', text: `Often used instead of PEQ 2 when you only need to cut the excess. HP at 80–100 Hz removes low-frequency rumble, LP at 15–18 kHz — ultrasonic noise.` }
    ],
    tips: [
      { title: 'On every track', text: `HP + LP as a sanitary filter on every channel. HP removes unwanted bass, LP — ultrahigh noise. Mix becomes cleaner without noticeable impact on the sound.` },
      { title: 'Instead of highpass in PEQ 2', text: `When you only need a high-pass and have no time to open PEQ 2 — Simplon is faster and lighter.` }
    ],
    controlParams: [
      { n:1, name:'Low Pass',  range:'20 — 20000 Hz', def:'20 kHz', tip:'Cuts everything above. 15–18 kHz removes ultrasonic noise. 8–10 kHz = telephone top. Automate for a build-down effect' },
      { n:2, name:'High Pass', range:'20 — 20000 Hz', def:'20 Hz',  tip:'Cuts everything below. 60–80 Hz on most tracks (removes rumble without touching bass). 200–300 Hz on vocals (removes proximity effect)' }
    ]
  },

  'micro': {
    shortDesc: 'Micro-pitch detune — chorus via detuning',
    description: `Micro creates a chorus effect through microscopic pitch detuning between channels. Each channel gets a slightly different pitch — beating and width emerge. Minimal CPU, simple principle. An excellent alternative to a full chorus when you only need width without deep modulation.`,
    when: 'Synths, vocals — add width and body via micro-pitch detuning',
    pros: ['Minimal CPU', 'Fat wide sound', 'Built into FL Studio', 'Simple to use'],
    cons: ['No dynamic modulation (LFO)', 'Static effect without movement', 'Less interesting than a full chorus'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Depth', desc: 'Depth of pitch detuning in cents' },
        { name: 'Mix',   desc: 'Dry/Wet balance' }
      ]},
      { title: 'Principle', text: `L channel detuned by +X cents, R by -X cents. Beating between channels emerges — heard as slight vibrato and stereo widening. Higher Depth = more noticeable effect.` }
    ],
    tips: [
      { title: 'Depth 5–15 cents', text: `Light detuning 5–15 cents adds width imperceptibly. Higher — audible chorus effect, may not suit clean sound.` },
      { title: 'On unison synths', text: `On synths with multiple unison voices Micro adds an extra layer of width. Supersaw sounds even wider.` }
    ],
    controlParams: [
      { n:1, name:'Depth', range:'0 — 100 cents', def:'10 cents', tip:'5–15 cents = subtle imperceptible width. 20–40 cents = audible chorus effect. 50+ cents = detuning audible as pitch shift' },
      { n:2, name:'Mix',   range:'0 — 100%',      def:'50%',      tip:'50–70% — keep the original in balance with the detune. 100% = only detuned signal without the original (sounds unnatural)' }
    ]
  },

  'sausage-fattener': {
    shortDesc: 'Two-knob fattener — instant fatness',
    description: `SAUSAGE FATTENER by Dada Life is a cult plugin with two controls: Fatness (saturation + compression) and Color (tonal coloration). Makes any sound fatter, denser and louder in 5 seconds. Has become a standard in EDM and pop production for instant results.`,
    when: 'Drums, bass, leads — quickly make the sound fatter and louder',
    pros: ['Two controls — instant result', 'Cult EDM sound', 'Excellent on drums and bass', 'Very simple'],
    cons: ['No detailed control', 'At high Fatness kills dynamics', 'Paid — Dada Life license'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Fatness', desc: 'Main knob: saturation + compression + volume' },
        { name: 'Color',   desc: 'Tonal coloration: left = darker, right = brighter' }
      ]},
      { title: 'How It Works', text: `Fatness combines several processes: saturation, multiband compression, volume. Higher = denser and louder. Color changes the tonal character from dark to bright.` }
    ],
    tips: [
      { title: 'Fatness 20–40%', text: `Above 50% — sound starts losing dynamics. The 20–40% zone gives density without noticeable compression.` },
      { title: 'Color by genre taste', text: `For dark bass music — Color to the left. For bright pop/dance — to the right. Center works for most cases.` },
      { title: 'On drum bus', text: `Fatness 25–35%, Color center. Drum bus gets glue and aggression in the style of commercial EDM.` }
    ],
    controlParams: [
      { n:1, name:'Fatness', range:'0 — 100%', def:'30%', tip:'20–40% = density without losing dynamics (optimal zone). 50–60% = audible compression. Above 70% — sound loses dynamics and "chokes"' },
      { n:2, name:'Color',   range:'0 — 100%', def:'50%', tip:'Below 50% = dark character (bass music, trap, dark). Above 50% = bright character (pop, dance, EDM). 50% = neutral for most genres' }
    ]
  },

  'wave-shaper': {
    shortDesc: 'Waveshaping — draw the distortion shape yourself',
    description: `Wave Shaper lets you draw an arbitrary transfer characteristic curve. That curve determines how each level of the input signal is converted to the output. Complete freedom: from soft warmth to hard clipping and exotic distortion shapes impossible in other plugins.`,
    when: 'Extreme sound design — unique distortion with total shape freedom',
    pros: ['Complete distortion shape freedom', 'Unique effects impossible otherwise', 'Built into FL Studio', 'Visual curve — intuitive'],
    cons: ['Requires understanding the waveshaping principle', 'Unpredictable result without experience', 'No presets for standard distortion types'],
    guide: [
      { title: 'Waveshaping Principle', text: `X axis = input level. Y axis = output level. Straight diagonal = no change. S-curve = soft saturation. Horizontal plateaus at top and bottom = clipping. Arbitrary shapes = unique distortion.` },
      { title: 'Drawing Tools', params: [
        { name: 'Pencil',  desc: 'Draw an arbitrary curve' },
        { name: 'Curve',   desc: 'Smooth curve through control points' },
        { name: 'Presets', desc: 'Basic shapes: Soft Clip, Hard Clip, Foldback' }
      ]}
    ],
    tips: [
      { title: 'S-curve for warmth', text: `Draw a gentle S-shaped curve — analog tube saturation analog. Soft limiting in the shoulders, linearity in the middle.` },
      { title: 'Foldback distortion', text: `A curve that "folds back" at high levels — creates exotic tone with high harmonics. Interesting on synths.` },
      { title: 'In parallel with original', text: `Put Wave Shaper on a copy of the track via Fruity Send, blend 20–40%. Experiment with the shape — the original protects from catastrophic results.` }
    ],
    controlParams: [
      { n:1, name:'Transfer Curve', range:'Arbitrary X→Y curve', def:'Diagonal (no change)', tip:'S-curve = soft saturation (tube sound). Plateaus top/bottom = clipping. Start with Soft Clip preset and modify' },
      { n:2, name:'Pre-gain',       range:'-∞ — +24 dB',        def:'0 dB',                 tip:'Gain before the curve — pushes signal deeper into the nonlinear zone. High Pre-gain = more aggressive distortion' },
      { n:3, name:'Post-gain',      range:'-∞ — +12 dB',        def:'0 dB',                 tip:'Level compensation after the shaping curve. With clipping level rises — lower Post-gain to compensate' }
    ]
  },

  'hardcore': {
    shortDesc: 'Guitar amp + cabinet simulator',
    description: `Hardcore is a full guitar processor in one plugin: preamp, effects, amplifier and cabinet simulator. A chain of multiple blocks emulates a real guitar rig. Built into FL Studio — you can get amp sound without additional plugins.`,
    when: 'Guitar, industrial sound, aggressive synths — full amp simulation',
    pros: ['Full amp + cabinet chain', 'Multiple amplifier types', 'Built into FL Studio', 'Great for industrial and aggressive synths'],
    cons: ['Less realistic than top amp simulators (Neural DSP, Amplifire)', 'No modern high-gain amps', 'Dated interface'],
    guide: [
      { title: 'Chain Blocks', params: [
        { name: 'Pre-FX',   desc: 'Effects before amp: tuner, compressor, wah, octaver' },
        { name: 'Amp',      desc: 'Amplifier type: Clean, Crunch, Lead, Metal' },
        { name: 'Cabinet',  desc: 'Cabinet simulation with microphone position' },
        { name: 'Post-FX',  desc: 'Effects after: reverb, delay, chorus, EQ' }
      ]},
      { title: 'Choosing an Amplifier', text: `Clean — for clean-tone and slightly overdriven sound. Crunch — classic rock overdrive. Lead — high gain for solo. Metal — aggressive high-gain distortion.` }
    ],
    tips: [
      { title: 'On synths', text: `Crunch or Lead mode on a synth line — the synth gets guitar amp character. Interesting for industrial, rock influences in electronic music.` },
      { title: 'Cabinet affects tone', text: `Different cabinets radically change the sound. 4×12 — powerful and dense. 1×12 — more open. Experiment with microphone position.` }
    ],
    controlParams: [
      { n:1, name:'Amp Type', range:'Clean, Crunch, Lead, Metal', def:'Crunch', tip:'Clean = jazz/funk guitar or clean-tone synth. Crunch = rock overdrive (best for warmth). Lead/Metal = high-gain for aggression' },
      { n:2, name:'Gain',     range:'0 — 100%',                   def:'50%',   tip:'On synths use Gain 30–60% with Crunch — you get amp character without full distortion. Higher = more aggressive' },
      { n:3, name:'Cabinet',  range:'Various cabinets',           def:'4×12',  tip:'4×12 = dense and powerful (rock, metal). 1×12 = open (blues, jazz). Microphone position affects brightness' },
      { n:4, name:'Post-EQ',  range:'Bass, Mid, Treble',          def:'center',tip:'3-band EQ after amp. Cut Mid slightly for the "scooped mid" rock guitar sound. Boost Treble for clarity' }
    ]
  },

  'fruity-blood-overdrive': {
    shortDesc: 'Warm guitar overdrive',
    description: `Fruity Blood Overdrive emulates a classic analog guitar overdrive pedal. Warm, soft distortion with character. Works great not just on guitar — bass with Blood Overdrive gets growl, synths get analog warmth. Built into FL Studio.`,
    when: 'Guitars, bass, retro synths — warm analog overdrive effect',
    pros: ['Warm analog overdrive character', 'Great on guitar, bass and synths', 'Built into FL', 'Simple to set up'],
    cons: ['Less flexible than Saturn 2', 'No multiband mode', 'Single sound character'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Pre-Band',  desc: 'Tonal processing before distortion — changes the saturation character' },
        { name: 'Clipping',  desc: 'Clipping type: Soft/Hard' },
        { name: 'Boost',     desc: 'Signal gain for more aggressive distortion' },
        { name: 'Post-Band', desc: 'Tonal processing after distortion — shapes the final tone' },
        { name: 'Volume',    desc: 'Output volume' }
      ]}
    ],
    tips: [
      { title: 'Growl on bass', text: `Moderate Boost, Pre-Band slightly toward mids. Bass gets a characteristic "growling" tone — dirty and aggressive.` },
      { title: 'Warmth on pads', text: `Very low Boost (5–10%), Post-Band to balance tone. Pad gets subtle analog warmth.` }
    ],
    controlParams: [
      { n:1, name:'Pre-Band',  range:'Dark — Bright', def:'neutral', tip:'Tonal coloration BEFORE distortion. Toward Dark = warmer overdrive. Bright = more aggressive and brighter. Affects saturation character' },
      { n:2, name:'Clipping',  range:'Soft / Hard',   def:'Soft',    tip:'Soft = analog soft overdrive with even harmonics. Hard = hard clipping saturation with odd harmonics' },
      { n:3, name:'Boost',     range:'0 — 100%',      def:'30%',     tip:'Input signal level — determines aggression. 5–15% = subtle warmth. 40–60% = overdrive. 70%+ = heavy distortion' },
      { n:4, name:'Post-Band', range:'Dark — Bright',  def:'neutral', tip:'Tonal shape AFTER distortion. Use to cut excess harmonics or add brightness to the final sound' },
      { n:5, name:'Volume',    range:'0 — 200%',      def:'100%',    tip:'Volume compensation. Distortion always adds perceived loudness — compensate with lower Volume for honest A/B' }
    ]
  },

  'fruity-fast-dist': {
    shortDesc: 'Fast aggressive distortion with minimal CPU',
    description: `Fruity Fast Dist is FL Studio's simplest and fastest distortion. Minimal CPU, instant response, several clipping modes. Not the most musical, but maximum speed — when you need aggression without overthinking.`,
    when: 'Drums, bass — sharp aggressive distortion without excessive settings',
    pros: ['Minimal CPU', 'Instant aggressive result', 'Built into FL', 'Several clipping modes'],
    cons: ['Rough sound — no warmth like Blood Overdrive', 'Minimal control', 'Not for delicate processing'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Type',      desc: 'Distortion type: A (soft), B (medium), C (aggressive), D (hard)' },
        { name: 'Threshold', desc: 'Input signal level before clipping' },
        { name: 'Mix',       desc: 'Dry/Wet balance' }
      ]}
    ],
    tips: [
      { title: 'Type A for saturation', text: `Type A is the softest — adds subtle saturation without harsh clipping. On drums adds aggression.` },
      { title: 'Type C/D + parallel', text: `Type C or D aggressive → Mix 20–30%. Very hard distortion in parallel with the original = aggression while preserving the foundation.` }
    ],
    controlParams: [
      { n:1, name:'Type',      range:'A, B, C, D', def:'A',    tip:'A = softest (saturation). B = medium overdrive. C = aggressive. D = hard clipping. Start with A, go further as needed' },
      { n:2, name:'Threshold', range:'0 — 100%',   def:'50%',  tip:'Input signal level before clipping. Lower Threshold = more distortion with the same Type. Combine with Mix for parallel distortion' },
      { n:3, name:'Mix',       range:'0 — 100%',   def:'100%', tip:'For types C and D: Mix 20–40% with aggressive distortion = parallel hardness. Original preserves the foundation, distortion adds aggression' }
    ]
  },

  'hyper-chorus': {
    shortDesc: 'Multi-voice lush chorus for maximum width',
    description: `Hyper Chorus is a multi-voice chorus plugin for getting the widest and densest sound possible. Multiple voices with independent pitch detuning and delay create a "super-wide" supersaw-like effect. Built into FL Studio.`,
    when: 'Supersaw effect on synths, massive vocals, maximum wide sound',
    pros: ['Very wide and dense sound', 'Multiple independent voices', 'Built into FL Studio', 'Great for supersaw imitation'],
    cons: ['Can sound too "artificial" at high settings', 'Higher CPU than simple chorus', 'No fine control per voice'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Voices', desc: 'Number of chorus voices: 2–8' },
        { name: 'Detune', desc: 'Degree of pitch detuning between voices' },
        { name: 'Delay',  desc: 'Time spread between voices' },
        { name: 'Width',  desc: 'Distribution of voices in the stereo field' },
        { name: 'Mix',    desc: 'Dry/Wet' }
      ]},
      { title: 'Supersaw Imitation', text: `Voices 6–8, moderate Detune, Width maximum. A mono synth transforms into a dense wide sound resembling a supersaw in Serum.` }
    ],
    tips: [
      { title: 'Mix 60–80%', text: `Full Mix 100% — foundation is lost. 60–80% preserves the center sound and adds chorus width.` },
      { title: 'On vocals for effect', text: `Multi-voice chorus on vocals + small reverb = sound of a large vocal ensemble from a single track.` }
    ],
    controlParams: [
      { n:1, name:'Voices', range:'2 — 8',       def:'4',     tip:'6–8 voices = maximum dense supersaw-like sound. 2–3 voices = gentle chorus with lower CPU. More voices — higher CPU' },
      { n:2, name:'Detune', range:'0 — 100%',    def:'30%',   tip:'Pitch detuning between voices. 20–40% = pleasant chorus. Above 60% = audible pitch detune. Above 80% = grunge effect (intentional)' },
      { n:3, name:'Delay',  range:'0 — 100 ms',  def:'20 ms', tip:'Time spread between voices. More Delay = wider and smoother. Less = denser and closer to supersaw' },
      { n:4, name:'Width',  range:'0 — 100%',    def:'80%',   tip:'Distribution of voices in stereo field. 100% = maximally wide. Check mono — Hyper Chorus loses some sound when summing' },
      { n:5, name:'Mix',    range:'0 — 100%',    def:'70%',   tip:'60–80% preserves center sound + width. 100% = only chorus without original (foundation lost at low frequencies)' }
    ]
  },

  'fruity-chorus': {
    shortDesc: "FL Studio's standard chorus",
    description: `Fruity Chorus is FL Studio's classic chorus. Creates the effect of multiple performers through delay and pitch modulation. The classic way to thicken sound and add width without complex settings. Built into FL.`,
    when: 'Vocals, guitars, synths — add body and simulate an ensemble',
    pros: ['Classic chorus sound', 'Simple to set up', 'Built into FL', 'Minimal CPU'],
    cons: ['Fewer voices than Hyper Chorus', 'Less modern sounding', 'No detailed per-voice control'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Depth',  desc: 'Pitch modulation depth — more = more noticeable chorus' },
        { name: 'Delay',  desc: 'Base delay of chorus voices in ms' },
        { name: 'Speed',  desc: 'LFO modulation speed' },
        { name: 'Spread', desc: 'Width of stereo voice distribution' },
        { name: 'Mix',    desc: 'Dry/Wet' }
      ]}
    ],
    tips: [
      { title: 'Subtle chorus on vocals', text: `Depth 20–30%, Delay 10–15 ms, slow Speed. Vocal becomes slightly wider and fuller — no obvious chorus audible.` },
      { title: '80s keyboards', text: `Depth 60%, slow Speed, Spread 100%. Classic sound of electric piano and organ from the 80s.` }
    ],
    controlParams: [
      { n:1, name:'Depth',  range:'0 — 100%',   def:'40%',    tip:'Pitch modulation depth. 20–35% = subtle imperceptible chorus. 60–80% = obvious chorus effect. For vocals keep below 40% — intelligibility matters' },
      { n:2, name:'Delay',  range:'5 — 50 ms',  def:'15 ms',  tip:'Base delay of voices. 10–15 ms = neutral chorus. Less = more subtle. More = wider and denser, but above 40 ms the delay is audible' },
      { n:3, name:'Speed',  range:'0.1 — 10 Hz',def:'0.5 Hz', tip:'LFO speed. 0.2–0.8 Hz = slow musical chorus. 2–5 Hz = vibrato-like effect. Slow is better for most tasks' },
      { n:4, name:'Spread', range:'0 — 100%',   def:'70%',    tip:'Width of stereo distribution. 100% = maximally wide chorus. Less for instruments in the center of the mix' },
      { n:5, name:'Mix',    range:'0 — 100%',   def:'50%',    tip:'50% — usually a good starting point. For vocals: 20–35%. For electric piano: 50–70%. For obvious chorus effect: 70–100%' }
    ]
  },

  'vintage-chorus': {
    shortDesc: 'Warm analog chorus — vintage character',
    description: `Vintage Chorus emulates an analog chorus pedal from the 70s-80s. Warm, slightly impure sound with characteristic analog "blur". Ideal for vintage synth, electric piano, retro guitars and anything that should sound "like it did back then".`,
    when: 'Retro sound, 80s, analog chorus character',
    pros: ['Analog vintage character', 'Warm blur instead of digital clarity', 'Built into FL Studio', 'Great for retro production'],
    cons: ['Not for modern transparent chorus', 'Less controllable than Fruity Chorus'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Rate',  desc: 'LFO modulation speed' },
        { name: 'Depth', desc: 'Pitch modulation depth' },
        { name: 'Tone',  desc: 'Tonal character of the chorus' },
        { name: 'Mix',   desc: 'Dry/Wet' }
      ]},
      { title: 'When to Use', text: `Vintage Chorus adds a specific "impure" warmth that digital chorus lacks. On Juno-style synths, Rhodes, Wurlitzer, vintage guitars — sounds authentic.` }
    ],
    tips: [
      { title: 'Rhodes + Vintage Chorus', text: `Deep Depth, slow Rate, Mix 50–70%. Classic Rhodes electric piano sound with chorus.` },
      { title: 'Mix 30–50% for subtlety', text: `Full 100% — too "wet". 30–50% gives character without overwhelming the main instrument tone.` }
    ],
    controlParams: [
      { n:1, name:'Rate',  range:'0.01 — 10 Hz', def:'0.4 Hz',   tip:'Slow Rate (0.2–0.6 Hz) = smooth "breathing" of analog chorus. Faster than 2 Hz = vibrato. Tempo Sync if available' },
      { n:2, name:'Depth', range:'0 — 100%',      def:'50%',      tip:'Pitch modulation depth with analog character. 30–50% — working zone. Vintage algorithm does not change Depth as smoothly as digital' },
      { n:3, name:'Tone',  range:'Dark — Bright',  def:'neutral',  tip:'Tonal character of the chorus. On Rhodes and vintage synths — shift toward Dark. For modern sound — toward Bright' },
      { n:4, name:'Mix',   range:'0 — 100%',      def:'40%',      tip:'30–50% = vintage character while preserving main tone. 70%+ — heavily "wet". On Rhodes: 50–70%. On guitar: 30–50%' }
    ]
  },

  'fruity-phaser': {
    shortDesc: 'Classic phaser for synths and pads',
    description: `Fruity Phaser creates a classic phaser effect through all-pass filters. The characteristic "whooshing" sound was used on electric pianos, synths and guitars in the 70s-80s. Built into FL Studio, light and simple.`,
    when: 'Synths, pads, electric piano — add depth and movement via phase effect',
    pros: ['Classic phaser sound', 'Simple to use', 'Built into FL', 'Minimal CPU'],
    cons: ['Less flexible than PhaseMistress', 'No feedback control', 'Limited number of stages'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Stages',   desc: 'Number of all-pass stages: more = richer sound' },
        { name: 'Rate',     desc: 'LFO modulation speed' },
        { name: 'Depth',    desc: 'Depth of the phase sweep' },
        { name: 'Feedback', desc: 'Feedback — intensifies the effect' },
        { name: 'Mix',      desc: 'Dry/Wet' }
      ]}
    ],
    tips: [
      { title: 'Slow phaser on pads', text: `Very slow Rate, moderate Depth. Pad gets slow "breathing" phase movement — adds life to a static sound.` },
      { title: 'Feedback for intensity', text: `Feedback 40–60% intensifies the effect and adds the characteristic "metallic" tint of the phaser.` }
    ],
    controlParams: [
      { n:1, name:'Stages',   range:'2, 4, 6, 8',  def:'4',      tip:'4 stages = classic phaser. 2 = light. 6–8 = rich dense effect. More stages = more CPU' },
      { n:2, name:'Rate',     range:'0.01 — 20 Hz', def:'0.5 Hz', tip:'Slow (0.1–0.5 Hz) = "breathing" pad phaser. Fast (2–5 Hz) = tremolo-like effect. Even faster = audio-rate modulation' },
      { n:3, name:'Depth',    range:'0 — 100%',     def:'60%',    tip:'Phase sweep depth. 40–70% = musical range. At 100% phaser passes the full frequency range — very obvious effect' },
      { n:4, name:'Feedback', range:'0 — 100%',     def:'30%',    tip:'40–60% intensifies metallic resonance. 0% = neutral phaser. High Feedback + many stages = intense "screaming" effect' },
      { n:5, name:'Mix',      range:'0 — 100%',     def:'50%',    tip:'50% = dry/wet balance (classic). Some styles need 100% — only phaser signal, especially in vintage funk guitar' }
    ]
  },

  'phasemistress': {
    shortDesc: 'Advanced phaser with deep modulation — Soundtoys',
    description: `PhaseMistress by Soundtoys is one of the best software phasers. Emulates analog phaser pedals with precision and adds capabilities unavailable in analog. Up to 24 stages, multiple modulation modes, detailed feedback and resonance control.`,
    when: 'Sound design, deep phase textures, professional phaser effect',
    pros: ['Soundtoys quality — analog precision', 'Up to 24 phaser stages', 'Multiple modulation modes', 'Detailed control'],
    cons: ['Paid — Soundtoys license', 'Overkill for simple tasks'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Stages',   desc: 'Number of all-pass stages — determines the "density" of the effect' },
        { name: 'Rate',     desc: 'LFO speed' },
        { name: 'Depth',    desc: 'Modulation depth' },
        { name: 'Feedback', desc: 'Feedback — phaser resonance' },
        { name: 'Center',   desc: 'Center frequency of the sweep' },
        { name: 'Mix',      desc: 'Dry/Wet' }
      ]},
      { title: 'Modulation Modes', text: `Sine — smooth movement. Envelope — phaser responds to signal dynamics. MIDI — controlled by tempo or notes.` }
    ],
    tips: [
      { title: 'Envelope mode', text: `Envelope Follower on Rate — phaser speeds up during loud moments. Drums get a dynamically changing phaser effect.` },
      { title: '24 stages for maximum', text: `24 stages + high Feedback = thick "crazy" phaser. Interesting for psychedelic and heavy sound design.` }
    ],
    controlParams: [
      { n:1, name:'Stages',   range:'2 — 24',        def:'8',      tip:'8 = standard Soundtoys sound. 16 = dense. 24 + high Feedback = maximum "crazy" effect for sound design' },
      { n:2, name:'Rate',     range:'0.001 — 20 Hz', def:'0.3 Hz', tip:'Very slow (0.05–0.2 Hz) = nearly static phaser, almost no movement — only timbre coloration' },
      { n:3, name:'Depth',    range:'0 — 100%',      def:'70%',    tip:'Soundtoys Depth works evenly without sharp artifacts. 70–90% = full sweep range' },
      { n:4, name:'Feedback', range:'0 — 100%',      def:'50%',    tip:'Envelope mode: Feedback responds to dynamics. Percussion = faster on hit, slower on decay — a live dynamic effect' },
      { n:5, name:'Center',   range:'20 — 20000 Hz', def:'800 Hz', tip:'Center frequency of sweep. Low (200–400 Hz) = phaser affects body. High (2–5 kHz) = only affects presence and air' },
      { n:6, name:'Mix',      range:'0 — 100%',      def:'50%',    tip:'50% = classic. For funk guitar in MXR Phase 90 style: 100% Mix. For subtle pad processing: 20–35%' }
    ]
  },

  'vintage-phaser': {
    shortDesc: 'Analog phaser of the 70s-80s',
    description: `Vintage Phaser emulates classic analog phaser pedals of the 70s-80s. The characteristic warm "whoosh" associated with funk guitar, MXR Phase 90 and similar pedals. Built into FL Studio.`,
    when: 'Funk, classic rock, vintage synth — authentic analog phaser sound',
    pros: ['Authentic vintage phaser sound', 'Warm analog character', 'Built into FL Studio', 'Great for funk and classic rock'],
    cons: ['Less flexible than PhaseMistress', 'Vintage character only'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Speed', desc: 'LFO speed — slow for ambient, fast for funk' },
        { name: 'Depth', desc: 'Depth of the phase effect' },
        { name: 'Color', desc: 'Tonal character — lighter/darker' }
      ]}
    ],
    tips: [
      { title: 'Funk guitar', text: `Fast Speed, moderate Depth — classic funky phaser on rhythm guitar.` },
      { title: 'Slow sweep on synth', text: `Slow Speed, deep Depth — slow "breathing" phaser on pad synths. Retro-space sound.` }
    ],
    controlParams: [
      { n:1, name:'Speed', range:'0.01 — 10 Hz', def:'0.5 Hz',  tip:'Slow (0.1–0.5 Hz) = organic "breathing". Fast (2–4 Hz) = funk character on rhythm guitar. 5+ Hz = vibrato-like' },
      { n:2, name:'Depth', range:'0 — 100%',     def:'60%',     tip:'60–80% = classic phaser character. Vintage algorithm sounds authentic at high Depth — that is exactly what Vintage Phaser is for' },
      { n:3, name:'Color', range:'Dark — Bright',  def:'neutral', tip:'Tonal character. Dark = warm analog 70s. Bright = crisper sound. For funk guitar shift toward Bright for attack' }
    ]
  },

  'fruity-flanger': {
    shortDesc: 'Classic flanger — "jet plane" sound',
    description: `Fruity Flanger creates the characteristic "jet plane" swoosh by mixing the signal with a delayed copy modulated by an LFO. The comb filter moves in time — creating the recognizable flanger effect. Built into FL Studio.`,
    when: 'Retro effects, psychedelic textures, characteristic jet-plane sound',
    pros: ['Classic flanger sound', 'Simple to use', 'Built into FL', 'Minimal CPU'],
    cons: ['One specific effect — not versatile', 'No advanced parameters'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Delay',    desc: 'Base delay in ms — determines the basic flanger tone' },
        { name: 'Depth',    desc: 'LFO modulation depth' },
        { name: 'Rate',     desc: 'LFO speed' },
        { name: 'Feedback', desc: 'Feedback — strengthens the metallic resonance' },
        { name: 'Mix',      desc: 'Dry/Wet' }
      ]}
    ],
    tips: [
      { title: 'High Feedback', text: `Feedback 70–90% — metallic "screaming" flanger. Extreme effect for sound design.` },
      { title: 'Fast flanger on hi-hat', text: `Fast Rate, small Depth — hi-hat gets characteristic flanger vibration.` }
    ],
    controlParams: [
      { n:1, name:'Delay',    range:'0.1 — 20 ms',  def:'5 ms',   tip:'Short Delay (0.5–3 ms) = metallic high-frequency flanger. Long (10–20 ms) = more chorus-like lower flanger' },
      { n:2, name:'Depth',    range:'0 — 100%',     def:'50%',    tip:'LFO modulation depth. 30–60% = classic. At 100% comb filter moves across the full range — very obvious effect' },
      { n:3, name:'Rate',     range:'0.01 — 20 Hz', def:'0.5 Hz', tip:'Slow (0.1–0.3 Hz) = "slow airplane". Fast (3–8 Hz) = intense jet effect. Very fast = almost vibrato' },
      { n:4, name:'Feedback', range:'0 — 100%',     def:'30%',    tip:'70–90% = metallic "screaming" flanger for sound design. 20–40% = controlled character without aggressive self-oscillation' },
      { n:5, name:'Mix',      range:'0 — 100%',     def:'50%',    tip:'50% — classic. Some uses need 100% (wet only). For subtle flanger on instruments: 25–40%' }
    ]
  },

  'fruity-flangus': {
    shortDesc: 'Flanger with tempo synchronization',
    description: `Fruity Flangus is a flanger version with project tempo synchronization. The LFO is locked to BPM — the flanger always stays in time. Ideal for rhythmic flanger patterns where timing precision matters. Built into FL Studio.`,
    when: 'Flanger synchronized with track tempo — rhythmically precise effect',
    pros: ['Tempo sync — always in time', 'Rhythmically precise effect', 'Built into FL', 'Simple interface'],
    cons: ['Less flexible than Fruity Flanger without sync', 'Only for rhythmic uses'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Rate',     desc: 'LFO speed in note values (1/4, 1/8, etc.)' },
        { name: 'Depth',    desc: 'Depth of the flanger sweep' },
        { name: 'Feedback', desc: 'Intensity of metallic resonance' },
        { name: 'Sync',     desc: 'Enable synchronization with tempo' }
      ]}
    ],
    tips: [
      { title: '1/2 note on percussion', text: `Rate 1/2 note — flanger sweeps every half bar. Percussion gets a rhythmically interesting metallic tint.` },
      { title: 'Automate Depth', text: `Depth 0% in the verse, 80% at the transition over 1–2 bars. Flanger "kicks in" at the right moment.` }
    ],
    controlParams: [
      { n:1, name:'Rate',     range:'note values (1/32 — 2 bars)', def:'1/2', tip:'Tempo Sync — the main difference from Fruity Flanger. 1/4 = sweep per quarter note (fast). 1 bar = slow sweep per bar' },
      { n:2, name:'Depth',    range:'0 — 100%', def:'60%',  tip:'Flanger sweep depth. Automate: 0% in verse → 80–100% at transition over 1–2 bars. Flanger builds toward the right moment' },
      { n:3, name:'Feedback', range:'0 — 100%', def:'40%',  tip:'40–60% = classic metallic flanging. High Feedback + short Rate = intense rhythmic metallic effect' },
      { n:4, name:'Sync',     range:'Off / On', def:'On',   tip:'Always On for Flangus. That is the whole point of the plugin — rhythmically precise flanger in time. Off = standard Fruity Flanger functionality' }
    ]
  },

  'tremolator': {
    shortDesc: 'Professional tremolo and rhythmic gate — Soundtoys',
    description: `Tremolator by Soundtoys is a professional tremolo with tempo sync, multiple waveforms and the ability to create complex rhythmic volume patterns. Emulates vintage tremolo amps and adds capabilities unavailable in analog.`,
    when: 'Rhythmic tremolo on guitar, IDM gating, rhythmic volume patterns',
    pros: ['Soundtoys quality', 'Tempo sync', 'Multiple waveforms + rhythmic patterns', 'Humanize for organic feel'],
    cons: ['Paid — Soundtoys license', 'Overkill for simple tremolo'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Rate',      desc: 'Tremolo speed — in Hz or note values (sync)' },
        { name: 'Depth',     desc: 'Depth of amplitude modulation' },
        { name: 'Shape',     desc: 'Waveform: Sine, Square, Triangle, Sawtooth, Pattern' },
        { name: 'Humanize',  desc: 'Random small deviations — simulates analog instability' },
        { name: 'Sync',      desc: 'Sync to tempo' }
      ]},
      { title: 'Pattern Mode', text: `Draw a custom volume pattern on a grid. This turns Tremolator into a rhythmic gate — any on/off pattern in time.` }
    ],
    tips: [
      { title: 'Humanize for live feel', text: `Humanize 10–20% — tremolo is slightly unstable, like a real vintage amp. Sounds more organic than perfectly precise digital tremolo.` },
      { title: 'IDM rhythmic gate', text: `Shape Pattern, draw a complex 16th note pattern. A synth or pad transforms into a rhythmically complex "sliced" texture.` }
    ],
    controlParams: [
      { n:1, name:'Rate',     range:'note values / Hz',                           def:'1/4',  tip:'Tempo Sync for musical tremolo. 1/4 = classic. 1/8 = fast pulsation. 1 bar = slow breath. 1/16 = gated rhythm' },
      { n:2, name:'Depth',    range:'0 — 100%',                                   def:'70%',  tip:'Amplitude modulation depth. 100% = sound completely disappears at the bottom. 40–60% = subtle pulsating tremolo' },
      { n:3, name:'Shape',    range:'Sine, Square, Triangle, Sawtooth, Pattern',  def:'Sine', tip:'Square = sharp gate-tremolo (IDM, EDM). Sine = smooth vintage tremolo. Pattern = draw custom pattern — most powerful' },
      { n:4, name:'Humanize', range:'0 — 100%',                                   def:'0%',   tip:'10–20% = analog instability, organic live feel. 0% = mathematically precise digital tremolo (can sound "dead")' },
      { n:5, name:'Sync',     range:'Off / On',                                   def:'On',   tip:'Always On for musical tremolo. Off = Rate in Hz for effects not tied to track tempo' }
    ]
  },

  'panman': {
    shortDesc: 'Rhythmic panner with patterns — Soundtoys',
    description: `PanMan by Soundtoys is a rhythmic auto-panner with tempo sync and the ability to draw custom movement patterns in the stereo field. Visual position indicator, Humanize for organic feel, multiple movement shapes from smooth to sharp.`,
    when: 'Rhythmic movement in space, percussion, rhythmic stereo patterns',
    pros: ['Soundtoys quality', 'Custom movement patterns', 'Tempo sync', 'Humanize option'],
    cons: ['Paid — Soundtoys license', 'Cyclic Panner in FL is free for simple tasks'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Rate',      desc: 'Panning speed in note values' },
        { name: 'Width',     desc: 'Maximum movement width: 0% = center, 100% = full L/R' },
        { name: 'Shape',     desc: 'Movement shape: Sine, Square, Triangle, Pattern' },
        { name: 'Humanize',  desc: 'Random deviations for organic feel' }
      ]}
    ],
    tips: [
      { title: 'Percussion in pattern', text: `Custom pattern under the percussion rhythm — hits fly to different sides according to the pattern. Interesting 3D effect.` },
      { title: 'Slow Sine on pads', text: `Sine, Rate 1 bar, Width 40%. Pad slowly rocks in space — creates depth.` }
    ],
    controlParams: [
      { n:1, name:'Rate',     range:'note values / Hz', def:'1/4',  tip:'Tempo Sync for rhythmic movement. 1/4 = panning per note. 1 bar = slow rocking. 1/8 = fast rhythmic movement' },
      { n:2, name:'Width',    range:'0 — 100%',         def:'60%',  tip:'40–60% = soft spatial movement. 100% = sound goes completely to L or R alternately. Check in mono' },
      { n:3, name:'Shape',    range:'Sine, Square, Triangle, Pattern', def:'Sine', tip:'Pattern mode = custom movement pattern. Draw a pattern under specific percussion — hits fly in set directions' },
      { n:4, name:'Humanize', range:'0 — 100%',         def:'0%',   tip:'Soundtoys Humanize adds random deviations — panning sounds like a live performance not a robot. 10–15% = optimal' }
    ]
  },

  'effector': {
    shortDesc: '16 effects with XY-pad control in real time',
    description: `Effector is a unique multi-effects processor with XY-pad control. 16 effects (filter, distortion, delay, chorus, phaser and others) controlled by a 2D XY joystick in real time. Ideal for live performances and expressive real-time sound manipulation. Built into FL Studio.`,
    when: 'Live performances, real-time FX manipulation, controlling effects with the mouse',
    pros: ['XY-pad control — intuitive and expressive', '16 effects in one plugin', 'MIDI-compatible for live performance', 'Built into FL Studio'],
    cons: ['No precise numeric parameter values', 'Each effect less flexible than a dedicated plugin', 'MIDI controller needed for full live use'],
    guide: [
      { title: 'XY Control', text: `X axis — one effect parameter (usually Rate or Depth). Y axis — another (Feedback or Mix). Moving the point in 2D space simultaneously changes both parameters. Automate X and Y for dynamic effects.` },
      { title: 'Available Effects', params: [
        { name: 'Filter',          desc: 'LP/HP filter with sweep' },
        { name: 'Flanger',         desc: 'Flanger' },
        { name: 'Phaser',          desc: 'Phaser' },
        { name: 'Chorus',          desc: 'Chorus' },
        { name: 'Delay',           desc: 'Delay' },
        { name: 'Distortion',      desc: 'Distortion' },
        { name: '... and 10 more', desc: '16 modes total' }
      ]}
    ],
    tips: [
      { title: 'Automate XY', text: `Record XY-pad movement as automation in FL. Smooth movements create dynamic processing synchronized with the track.` },
      { title: 'MIDI controller', text: `Connect a MIDI XY-pad controller to Effector. Live effect control with both hands during performance.` }
    ],
    controlParams: [
      { n:1, name:'Effect Type', range:'16 effects', def:'Filter', tip:'Filter — most versatile. Phaser/Chorus for modulation. Delay for space. Switch presets mid-track for dynamic performance' },
      { n:2, name:'X-Position',  range:'0 — 100%',  def:'50%',   tip:'Left XY-pad axis. Usually Rate or Cutoff of the effect. Automate X for dynamic speed/frequency change without manual control' },
      { n:3, name:'Y-Position',  range:'0 — 100%',  def:'50%',   tip:'Right XY-pad axis. Usually Depth or Mix of the effect. X+Y together = two parameters at once via a single point on the plane' }
    ]
  },

  'mymeter2': {
    shortDesc: 'LUFS, Peak and RMS meter for streaming standards',
    description: `myMeter2 shows LUFS Integrated, LUFS Short-term, True Peak and RMS simultaneously in one window. Indispensable when mastering for streaming standards — you see all the values you need and compare them to the target level of the platform.`,
    when: 'Final mastering — level control for Spotify, Apple Music, YouTube',
    pros: ['LUFS + True Peak + RMS in one window', 'Shows both Integrated and Short-term LUFS', 'Built into FL Studio', 'Zero CPU'],
    cons: ['No visual history (LUFS waveform over time)', 'No built-in platform presets'],
    guide: [
      { title: 'Streaming Standards', params: [
        { name: 'Spotify',     desc: '-14 LUFS Integrated, True Peak -1 dBTP' },
        { name: 'Apple Music', desc: '-16 LUFS Integrated, True Peak -1 dBTP' },
        { name: 'YouTube',     desc: '-14 LUFS Integrated' },
        { name: 'CD',          desc: '-9 to -14 LUFS, True Peak -0.1 dBTP' }
      ]},
      { title: 'How to Use', text: `Put myMeter2 last in the chain on the master bus. Play the entire track through. Watch Integrated LUFS — that is the main metric. True Peak must not exceed the platform's target value.` }
    ],
    tips: [
      { title: 'Watch Integrated, not Short-term', text: `Short-term LUFS changes constantly. Integrated — is the average over the full playback time. That is exactly the value the streaming service compares.` },
      { title: 'Reset between measurements', text: `Press Reset before each measurement. If you started the track several times — Integrated will be inaccurate.` }
    ],
    controlParams: [
      { n:1, name:'LUFS Integrated', range:'-∞ — 0 LUFS',  def:'target: -14', tip:'Main metric for streaming. Spotify: -14, Apple Music: -16, YouTube: -14. Listen to the whole track for an accurate measurement' },
      { n:2, name:'LUFS Short-term', range:'-∞ — 0 LUFS',  def:'—',           tip:'Momentary reading of the last 3 seconds. Changes constantly — only use it to assess the loudness of specific sections' },
      { n:3, name:'True Peak',       range:'-∞ — 0 dBTP',  def:'max -1.0 dBTP',tip:'Must be below -1.0 dBTP for streaming. True peaks (ISP) can be higher than a standard peak meter — True Peak is more accurate' },
      { n:4, name:'Reset',           range:'reset button',  def:'—',           tip:'ALWAYS press before the final measurement. Integrated LUFS accumulates — without Reset the result will be inaccurate' }
    ]
  },

  'edison': {
    shortDesc: 'Built-in audio editor and recorder for FL Studio',
    description: `Edison is a full-featured audio editor built into FL Studio. Record from any Mixer track, spectral editor, noise removal, pitch analysis, sample cutting and processing. All without leaving FL. Indispensable for working with vocal and instrument recordings.`,
    when: 'Recording, audio editing, noise removal, analysis — right inside FL',
    pros: ['Full audio editor right in FL', 'Spectral editor for surgical fixes', 'Noise removal', 'Record directly from Insert/Send'],
    cons: ['Dated interface', 'Less powerful than standalone DAW-independent editors', 'Limited spectral noise removal'],
    guide: [
      { title: 'Core Features', params: [
        { name: 'Record',         desc: 'Record audio from the current track directly into Edison' },
        { name: 'Spectral View',  desc: 'Spectral editor — edit individual frequencies' },
        { name: 'Noise Removal',  desc: 'Noise removal by analyzing a noise profile' },
        { name: 'Pitch Analysis', desc: 'Analyze and display the pitch of a recording' },
        { name: 'Loop Recording', desc: 'Record multiple takes with automatic slicing' }
      ]},
      { title: 'Noise Removal', text: `1. Select a region of pure noise (no signal).
      2. Click <strong>Tools → Noise Removal → Learn noise profile</strong>.
      3. Select the whole file → Apply noise removal.
      Noise is removed based on the profile.` }
    ],
    tips: [
      { title: 'Spectral eraser', text: `In Spectral View select a problematic frequency at a specific moment and delete. Remove a click, crackle or unwanted sound surgically without affecting the rest.` },
      { title: 'Record via Insert', text: `Put Edison on a track's Insert. Press Record in Edison — it records the processed signal after all plugins. Convenient for rendering with effects to audio.` }
    ],
    controlParams: [
      { n:1, name:'Record',         range:'button',                 def:'—',    tip:'Records the signal from the current Insert. Formats: WAV, MP3, OGG. Bit depth up to 32 float. Captures everything passing through the Insert' },
      { n:2, name:'Spectral View',  range:'Off / On',               def:'Off',  tip:'Switch to Spectral View for surgical editing. Select a specific frequency at a specific moment and Delete — removes click or crackle' },
      { n:3, name:'Noise Removal',  range:'Tools → Noise Removal',  def:'—',    tip:'1) Select noise-only region. 2) Learn noise profile. 3) Select all. 4) Apply. Noise removed by profile — without touching the signal' },
      { n:4, name:'Pitch Analysis', range:'Tools → Pitch Analysis', def:'—',    tip:'Shows the pitch of the recording on a timeline. Useful before sending to Newtone — you see problematic notes in advance' }
    ]
  },

  'newtone': {
    shortDesc: 'Pitch editor — manual pitch correction inside FL',
    description: `Newtone is a pitch editor built into FL Studio. Displays vocal notes on a piano roll grid, lets you move them, straighten vibrato and correct pitch note by note. Full control without autotune artifacts when used carefully.`,
    when: 'Vocal pitch correction without Auto-Tune — note by note manually',
    pros: ['Manual pitch correction note by note', 'Integration with FL — no exporting', 'Vibrato control', 'No characteristic autotune artifacts with moderate correction'],
    cons: ['Time-consuming — manual work', 'No real-time correction during recording', 'Interface less convenient than Melodyne'],
    guide: [
      { title: 'Workflow', text: `1. Record vocal in FL → right-click on clip → Edit in Newtone.
      2. Newtone analyzes pitch and shows notes on the grid.
      3. Drag notes vertically to correct pitch.
      4. Flatten the pitch curve inside a note to remove unwanted drift.
      5. Save — changes apply to the clip.` },
      { title: 'Parameters', params: [
        { name: 'Note',        desc: 'Drag note on the grid vertically — changes pitch' },
        { name: 'Pitch curve', desc: 'Curve inside the note — flatten drift' },
        { name: 'Vibrato',     desc: 'Tools for controlling vibrato' },
        { name: 'Snap',        desc: 'Snap to nearest semitone grid' }
      ]}
    ],
    tips: [
      { title: "Don't flatten everything perfectly", text: `Too-perfect pitch sounds like a robot. Leave some natural drift. Only correct obviously "out of tune" notes.` },
      { title: 'Vibrato — touch carefully', text: `Vibrato gives the voice life. Only remove it when it is problematic — unstable or unwanted. Natural vibrato should stay.` }
    ],
    controlParams: [
      { n:1, name:'Note (vertical)', range:'semitones on grid',  def:'original note', tip:'Drag note up/down to correct pitch. Do not flatten everything perfectly — leave small drift for naturalness' },
      { n:2, name:'Pitch Curve',     range:'curve inside note',  def:'original',      tip:'Flatten the pitch drift curve inside the note. Leave a slightly wavy curve — too flat = robotic sound' },
      { n:3, name:'Snap',            range:'Off / On',           def:'On',            tip:'On = notes snap to semitone grid when moved. Off = free position. Use Off for micro-correction' },
      { n:4, name:'Vibrato tools',   range:'vibrato tools',      def:'—',             tip:'Remove only unwanted vibrato — unstable or too strong. Natural vocal vibrato should be left untouched' }
    ]
  },

  'newtime': {
    shortDesc: 'Time-stretch without changing pitch',
    description: `Newtime is FL Studio's time-stretching editor. Stretches or compresses audio in time without changing pitch. Shows the waveform on a timeline, lets you place markers and stretch individual sections. High-quality algorithm with minimal artifacts.`,
    when: 'Adjusting sample tempo, aligning vocal timing',
    pros: ['High quality time-stretch', 'Minimal artifacts', 'Visual markers for precise warping', 'Integration with FL Studio'],
    cons: ['Less flexible than Melodyne for complex warping', 'No pitch change (that is Newtone)'],
    guide: [
      { title: 'Workflow', text: `1. Right-click on an audio clip → Edit in Newtime.
      2. Place markers at needed positions (beats, syllables).
      3. Drag markers to stretch or compress sections.
      4. The algorithm preserves pitch — only speed changes.` },
      { title: 'Parameters', params: [
        { name: 'Stretch Mode', desc: 'Algorithm: Transient (for drums), Tonal (for vocals/melodies)' },
        { name: 'Markers',      desc: 'Markers on the timeline for warping' },
        { name: 'Stretch',      desc: 'Stretch ratio for a section' }
      ]}
    ],
    tips: [
      { title: 'Transient mode for drums', text: `Transient mode preserves the clarity of hits when stretching. For live drums — the optimal choice.` },
      { title: 'Fit vocals to tempo', text: `Place markers on each syllable. Stretch or compress sections so the vocal sits perfectly on the grid without changing intonation.` }
    ],
    controlParams: [
      { n:1, name:'Stretch Mode', range:'Transient / Tonal', def:'Tonal',  tip:'Transient = clear hits preserved when stretching (live drums). Tonal = melodic material without artifacts (vocals, synths)' },
      { n:2, name:'Markers',      range:'place manually',    def:'—',      tip:'Place markers on each syllable or hit. Drag a marker = stretch only that section. Adjacent sections adapt' },
      { n:3, name:'Stretch',      range:'50 — 200%',         def:'100%',   tip:'100% = no change. 80% = speed up by 20%. 130% = slow down by 30%. Extreme values produce artifacts' }
    ]
  },

  'fruity-spectroman': {
    shortDesc: 'Spectral frequency analyzer',
    description: `Fruity Spectroman is a spectral analyzer displaying the frequency content of a signal in real time. Helps find resonances, check tonal balance and analyze competing frequencies between instruments. Built into FL Studio.`,
    when: 'Finding resonances, mix analysis, frequency spectrum visualization',
    pros: ['Detailed real-time frequency display', 'Built into FL Studio', 'Zero CPU', 'Peak hold function'],
    cons: ['No two-signal comparison simultaneously', 'No LUFS or RMS measurements', 'Less attractive than third-party analyzers'],
    guide: [
      { title: 'Usage', text: `Put on a problematic track or the master. Look for "spikes" in the spectrum — those are resonances. Use together with Pro-Q 3: Spectroman shows where the problem is, Pro-Q 3 fixes it.` },
      { title: 'Parameters', params: [
        { name: 'FFT Size',  desc: 'FFT size: larger = more frequency accurate, slower time response' },
        { name: 'Windowing', desc: 'Analysis window type: Hanning, Blackman, etc.' },
        { name: 'Peak Hold', desc: 'Hold maximum peaks for analysis' }
      ]}
    ],
    tips: [
      { title: 'Find a resonance', text: `Peak Hold on → play material → look for sharp spikes in the spectrum → those are potential resonances to fix with EQ.` },
      { title: 'Compare two instruments', text: `Open two Spectroman windows — one on bass, one on kick. See where they "overlap" in frequency — there is competition for space in the mix.` }
    ],
    controlParams: [
      { n:1, name:'FFT Size',  range:'256 — 65536',             def:'4096',   tip:'Larger = more frequency accurate, slower time response. 4096 = good balance. 16384+ for detailed analysis on the master' },
      { n:2, name:'Windowing', range:'Hanning, Blackman, etc.', def:'Hanning', tip:'Hanning = standard for audio analysis. Blackman = better for low frequencies. Hanning is sufficient for most tasks' },
      { n:3, name:'Peak Hold', range:'Off / On',                def:'Off',    tip:'On = Peak Hold keeps maximum peaks. Enable, play track, stop playback — you see the peak map for EQ correction' }
    ]
  },

  'fruity-send': {
    shortDesc: 'Send signal to a Mixer bus with level control',
    description: `Fruity Send routes a copy of the signal to a chosen Mixer bus with send level and pan control. The foundation of parallel processing in FL Studio: reverb aux buses, parallel compression, multiband routing via Frequency Splitter.`,
    when: 'Parallel compression, reverb sends, any parallel processing',
    pros: ['Foundation of parallel processing in FL', 'Send level and pan control', 'Built into FL Studio', 'Zero CPU'],
    cons: ['Works only inside FL Mixer', 'No wet-only mode (must configure on the bus)'],
    guide: [
      { title: 'Aux Bus Scheme (Reverb Send)', text: `1. Create a Mixer bus (e.g. 10) — the Reverb bus.
      2. On bus 10 put Fruity Reeverb 2, Mix 100%.
      3. On the tracks that need reverb put Fruity Send → Output: 10.
      4. Adjust Send Level on each track individually.
      One reverb serves all tracks.` },
      { title: 'Parameters', params: [
        { name: 'Send to',    desc: 'Destination Mixer bus number' },
        { name: 'Send Level', desc: 'Level of the sent signal' },
        { name: 'Pan',        desc: 'Pan of the sent signal' }
      ]}
    ],
    tips: [
      { title: 'Parallel compression', text: `Send to a bus with an aggressive compressor. On the bus — Mix 100% (compressor only). Main track + compressed copy = parallel compression.` },
      { title: 'One reverb for all tracks', text: `One reverb on an Aux bus — Send with different levels from each track. CPU savings and mix cohesion through a shared space.` }
    ],
    controlParams: [
      { n:1, name:'Send to',    range:'Mixer bus 1–125', def:'1',     tip:'Specify the destination Aux bus number. The bus must exist. Check that the bus returns to master — otherwise signal is lost' },
      { n:2, name:'Send Level', range:'-∞ — +6 dB',     def:'0 dB',  tip:'Adjust separately on each track. Vocals: Send Level higher (more reverb). Bass: Send Level at -∞ (no reverb on bass)' },
      { n:3, name:'Pan',        range:'100% L — 100% R', def:'Centre',tip:'Pan of the sent signal. Usually Centre. Sometimes useful to send a slightly offset signal for interesting space' }
    ]
  },

  'fruity-balance': {
    shortDesc: 'Volume + Pan on a single insert',
    description: `Fruity Balance is a utility plugin combining a volume control and a pan control. An alternative to using the Mixer fader — convenient when you need to automate exactly these parameters via a plugin, or have an extra level of control in the chain.`,
    when: 'Quick volume and pan control on a separate insert',
    pros: ['Simplest to use', 'Built into FL Studio', 'Zero CPU', 'Convenient for automation'],
    cons: ['Duplicates Mixer fader functionality', 'No additional features'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Volume', desc: 'Signal volume in dB' },
        { name: 'Pan',    desc: 'Pan position: left -100%, right +100%' }
      ]},
      { title: 'Why Use Instead of a Fader', text: `The Mixer fader also controls volume, but Fruity Balance is convenient when you need to automate volume inside the effects chain, or when the Mixer fader is already assigned to another task.` }
    ],
    tips: [
      { title: 'Fade-out via automation', text: `Automation Clip on Fruity Balance Volume: smooth decrease to -inf. Track fade-out without touching the main Mixer fader.` },
      { title: 'Extra gain stage', text: `Put before other plugins as a gain stage. If you need to feed more level into a saturator — raise Volume here, not in Mixer.` }
    ],
    controlParams: [
      { n:1, name:'Volume', range:'-∞ — +6 dB',    def:'0 dB',   tip:'As a gain stage: put before saturator to control input level without touching Mixer fader. Automate for fade-out/in' },
      { n:2, name:'Pan',    range:'100% L — 100% R',def:'Centre', tip:'Quick shift in the stereo field. Automate Pan + Volume together for dynamic placement in space' }
    ]
  },

  'wave-candy': {
    shortDesc: 'Visualizer: oscilloscope, VU meter, spectrum',
    description: `Wave Candy is FL Studio's multi-mode visualizer. Oscilloscope for viewing the waveform, VU meter for levels, spectral analyzer, vectorscope for stereo. Beautiful configurable interface. Useful for both studio work and live performances.`,
    when: 'Monitoring and visual signal display in multiple modes',
    pros: ['Multiple visualization modes in one', 'Configurable appearance', 'Built into FL Studio', 'Attractive — great for streams and video'],
    cons: ['Visualization only — no LUFS measurements', 'No numeric peak values'],
    guide: [
      { title: 'Display Modes', params: [
        { name: 'Oscilloscope', desc: 'Waveform over time' },
        { name: 'Spectrum',     desc: 'Real-time frequency spectrum' },
        { name: 'VU Meter',     desc: 'Classic analog-style VU meter' },
        { name: 'Vectorscope',  desc: 'Stereo correlation — Lissajous figure' }
      ]}
    ],
    tips: [
      { title: 'Vectorscope for mono compatibility', text: `Vectorscope mode shows stereo correlation. Vertical line = mono. Circle = wide stereo. Horizontal lines = phase problems.` },
      { title: 'For video/streams', text: `Wave Candy looks great on screen. Put it in a separate window for streaming and session video recordings.` }
    ],
    controlParams: [
      { n:1, name:'Mode',      range:'Oscilloscope, Spectrum, VU, Vectorscope', def:'VU Meter', tip:'VU Meter = levels (for volume monitoring). Spectrum = frequencies (for EQ decisions). Vectorscope = stereo correlation (for mono check)' },
      { n:2, name:'Peak Hold', range:'Off / On',   def:'Off', tip:'In Spectrum mode enable Peak Hold for analysis. Play track → stop → view the frequency peak map = resonances and imbalances' },
      { n:3, name:'Scale',     range:'Lin / Log',  def:'Log', tip:'Log scale = familiar logarithmic frequency distribution for audio (more space for lows). Lin = linear (for technical analysis)' }
    ]
  },

  'low-lifter': {
    shortDesc: 'Sub-bass enhancer — bass audible on any speakers',
    description: `Low Lifter is a new specialized Image-Line plugin for the sub-bass range. Generates harmonics of sub-bass in the audible range — bass becomes "audible" even on small speakers unable to reproduce 40–60 Hz directly. Solves one of the main problems of modern production.`,
    when: 'Bass inaudible on small speakers, headphones or phones',
    pros: ['Sub-bass audible on any system', 'Specialized algorithm for low frequencies', 'New — modern Image-Line technology', 'Solves a real mastering problem'],
    cons: ['Very specialized — only for sub-bass', 'Can add unwanted harmonics at aggressive settings'],
    guide: [
      { title: 'How It Works', text: `Low Lifter analyzes sub-bass frequencies (20–80 Hz) and generates their harmonics in the 80–200 Hz range. Small speakers cannot reproduce 40 Hz, but hear 80 and 120 Hz well. The brain perceives harmonics as the fundamental tone — the effect of "audible" bass.` },
      { title: 'Parameters', params: [
        { name: 'Amount',    desc: 'Degree of harmonic generation' },
        { name: 'Frequency', desc: 'Sub-bass range to process' },
        { name: 'Mix',       desc: 'Dry/Wet' }
      ]}
    ],
    tips: [
      { title: 'Check on phone', text: `After setting Low Lifter listen to the track on a phone or small Bluetooth speaker. Bass should be felt — not just implied.` },
      { title: "Don't overdo it", text: `Amount 30–50% — sufficient for most tracks. More — unwanted artifacts appear in the midrange.` }
    ],
    controlParams: [
      { n:1, name:'Amount',    range:'0 — 100%',    def:'30%',   tip:'30–50% = sufficient for phone audibility. Above 60% = unwanted midrange harmonics. Always check on small speakers after setting' },
      { n:2, name:'Frequency', range:'20 — 120 Hz', def:'60 Hz', tip:'Sub-bass range to process. 40–60 Hz = classic sub-bass. 60–80 Hz = low bass. Choose based on the bass instrument fundamental note' },
      { n:3, name:'Mix',       range:'0 — 100%',    def:'80%',   tip:'80–100% = standard. Original sub-bass + generated harmonics. Lower Mix if harmonics are too prominent in the mids' }
    ]
  },

  'transporter': {
    shortDesc: 'Tape transport effect — start/stop tape machine simulation',
    description: `Transporter is a new Image-Line plugin simulating the sound of a tape recorder starting and stopping. Characteristic deceleration/acceleration when pressing Play/Stop. An excellent tool for retro transitions and creating a vintage production atmosphere.`,
    when: 'Transitions, retro effects, simulating a tape recorder starting and stopping',
    pros: ['Realistic tape transport simulation', 'Unique retro effect', 'Simple to use', 'Built into FL Studio'],
    cons: ['Very specialized — for a specific effect', 'Not for everyday use'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Speed',       desc: 'Tape ramp-up/ramp-down speed' },
        { name: 'Wow/Flutter', desc: 'Speed instability — adds authenticity' },
        { name: 'Trigger',     desc: 'Start or Stop effect' }
      ]},
      { title: 'Usage', text: `Automate Trigger: Stop on the last bar of a verse — track "stops" like a tape. Then Start at the beginning of the drop — sharp startup. Classic retro transition.` }
    ],
    tips: [
      { title: 'Wow+Flutter for authenticity', text: `Small Wow/Flutter gives the speed instability characteristic of real tape machines.` },
      { title: 'Combo with Gross Beat', text: `Transporter Stop + Gross Beat Tape Stop simultaneously = the most realistic tape stop simulation.` }
    ],
    controlParams: [
      { n:1, name:'Speed',       range:'Slow — Fast',  def:'Medium', tip:'Tape ramp-up/down speed. Slow = realistic analog inertia. Fast = sharp quick tempo change (less authentic)' },
      { n:2, name:'Wow/Flutter', range:'0 — 100%',     def:'20%',    tip:'Speed instability — flutter and wow. 10–30% = realistic analog instability. 0% = mechanically precise, less vintage' },
      { n:3, name:'Trigger',     range:'Start / Stop', def:'Stop',   tip:'Stop: automate on the last bar of a section for tape stop effect. Start: at the beginning of the next section for an accelerating startup' }
    ]
  },

  'emphasis': {
    shortDesc: 'Pre/de-emphasis filter for special formats',
    description: `Emphasis is a specialized plugin for applying pre-emphasis and de-emphasis filters according to RIAA (vinyl), 50/75μs (broadcast radio) and other standards. Pre-emphasis raises high frequencies before recording, de-emphasis removes them on playback. Needed when working with specific broadcast formats or analog media.`,
    when: 'Mastering for vinyl, broadcast radio — specialized frequency correction standards',
    pros: ['Conforms to RIAA/broadcast standards', 'Built into FL Studio', 'Precise implementation of specialized filters'],
    cons: ['Very specialized', 'Only needed when working with specific formats'],
    guide: [
      { title: 'RIAA Standard (Vinyl)', text: `RIAA pre-emphasis is applied when recording to vinyl — raises highs and cuts lows for optimal cutting. RIAA de-emphasis is applied during playback — restores the original tonal balance. The standard is mandatory for compatibility with vinyl playback systems.` },
      { title: 'Modes', params: [
        { name: 'RIAA Pre', desc: 'Pre-emphasis for recording to vinyl' },
        { name: 'RIAA De',  desc: 'De-emphasis for vinyl playback' },
        { name: '50μs',     desc: 'Broadcast standard FM radio' },
        { name: '75μs',     desc: 'Broadcast standard USA/Japan' }
      ]}
    ],
    tips: [
      { title: 'Only for special tasks', text: `If you are not doing vinyl mastering or broadcast — Emphasis is not needed. It is a tool for specific technical tasks.` },
      { title: 'Pre → recording, De → playback', text: `Always in pairs: if you applied Pre-emphasis when recording — apply De-emphasis on playback. Otherwise the tonal balance will be wrong.` }
    ],
    controlParams: [
      { n:1, name:'Mode',  range:'RIAA Pre, RIAA De, 50μs, 75μs', def:'RIAA De', tip:'RIAA De = standard for vinyl playback. RIAA Pre = when recording to vinyl. 50/75μs = FM broadcast radio (Europe/USA)' },
      { n:2, name:'Level', range:'-12 — +12 dB',                  def:'0 dB',    tip:'Filter application level. In most cases 0 dB — standard level per format specification' }
    ]
  },

  'fruity-peak-controller': {
    shortDesc: 'Sidechain controller — control parameters from a signal',
    description: `Fruity Peak Controller is a powerful utility plugin for creating sidechain connections in FL Studio. Analyzes the level of the input signal and converts it into automation data for any parameter of any plugin. Classic use: kick controls pad Volume — ducking/pumping effect.`,
    when: 'Sidechain ducking, controlling plugin parameters from the level of another signal',
    pros: ['Creates sidechain without external SC input', 'Controls any parameter of any plugin', 'Built into FL Studio', 'Very flexible'],
    cons: ['Setup requires understanding FL routing', 'Less intuitive than a direct SC input on a compressor'],
    guide: [
      { title: 'Sidechain Ducking Scheme', text: `1. Put Peak Controller on the kick Insert (or a separate SC bus).
      2. Right-click on pad Volume in Mixer → Link to controller → choose Peak Controller.
      3. Invert the output (Base + Volume → when kick hits, pad ducks).
      4. Set Attack/Release for smoothness.` },
      { title: 'Parameters', params: [
        { name: 'Base',            desc: 'Base output level (with no signal)' },
        { name: 'Volume',          desc: 'Deviation amplitude when signal appears' },
        { name: 'Attack / Release',desc: 'Rise and fall time of the response' },
        { name: 'Tension',         desc: 'Shape of the response curve' }
      ]}
    ],
    tips: [
      { title: 'EDM pumping', text: `Peak Controller from kick → pad or synth Volume. Fast Release (100–200 ms) = aggressive EDM pumping effect.` },
      { title: 'Sidechain any parameter', text: `Peak Controller can control not only Volume — any parameter: filter Cutoff, Reverb Mix, Distortion Drive. Creative sidechain effects.` }
    ],
    controlParams: [
      { n:1, name:'Base',    range:'0 — 100%',    def:'50%',   tip:'Base output level when there is no input signal. For ducking: Base 100% (pad at full), when kick peaks = drops to Base - Volume' },
      { n:2, name:'Volume',  range:'0 — 100%',    def:'50%',   tip:'Deviation amplitude from Base. For EDM pumping: Volume 80–100% (pad dips heavily on each kick). Less = subtle ducking' },
      { n:3, name:'Attack',  range:'0 — 500 ms',  def:'10 ms', tip:'Fast Attack (1–5 ms) = sharp EDM pump. Slow (30–80 ms) = smooth ducking. Too slow — pad does not duck in time for the hit' },
      { n:4, name:'Release', range:'0 — 2000 ms', def:'200 ms',tip:'Release 100–200 ms = classic EDM pump. Faster = more aggressive. Slower = pad stays ducked longer between hits' },
      { n:5, name:'Tension', range:'-1 — +1',     def:'0',     tip:'Response curve shape. 0 = linear. +1 = convex (slow start). -1 = concave (fast start). Affects the pumping effect character' }
    ]
  },

  'tau-compressor-plus': {
    shortDesc: 'Analog optical compressor',
    description: `Tau Compressor Plus emulates an optical compressor with warm analog character. Optical compressors react to light, giving them the characteristic smooth "musical" compression that is impossible to replicate with VCA circuits. Great for bass, vocals and drum bus.`,
    when: 'Bass, drum bus, vocals — vintage optical character needed',
    pros: ['Optical character — smooth and musical', 'Low CPU', 'Built into FL', 'Great on vocals and bass'],
    cons: ['Slow response — not for tight drums', 'Limited parameter control', 'No sidechain'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Threshold', desc: 'Compression threshold' },
        { name: 'Ratio',     desc: 'Compression amount' },
        { name: 'Attack',    desc: 'Attack time — slower than VCA by nature' },
        { name: 'Release',   desc: 'Release time' },
        { name: 'Gain',      desc: 'Makeup gain' }
      ]},
      { title: 'Optical Character', text: `Optical compressors react with inherent program-dependant behavior — fast attack on transients but smooth on sustained content. This gives the characteristic "glue" sound.` }
    ],
    tips: [
      { title: 'Slow attack for transients', text: `Optical compressors naturally have slower attack — transients pass through, the compressor works on the body. Perfect for bass and vocals.` },
      { title: 'On drum bus for glue', text: `Ratio 2:1–3:1, moderate threshold, GR 3–4 dB. Drums glue together with warm optical character.` }
    ],
    controlParams: [
      { n:1, name:'Threshold', range:'-60 — 0 dB',   def:'-18 dB', tip:'Set so GR is 3–5 dB on program material. Optical character shines in this range — smooth and musical' },
      { n:2, name:'Ratio',     range:'1:1 — 10:1',   def:'3:1',    tip:'2:1–4:1 for bus glue. The optical character makes even 4:1 sound smooth, unlike VCA at the same ratio' },
      { n:3, name:'Attack',    range:'1 — 300 ms',   def:'30 ms',  tip:'Slower attack = more transients pass = more punch. Optical compressors shine at 20–50 ms Attack' },
      { n:4, name:'Release',   range:'10 — 2000 ms', def:'200 ms', tip:'Auto Release works well for optical character. Manual: 150–400 ms for program material' },
      { n:5, name:'Gain',      range:'-12 — +12 dB', def:'0 dB',   tip:'Makeup gain — compensate compression gain loss. Match A/B level for honest comparison' }
    ]
  },

  'desibilizer-ll': {
    shortDesc: 'Low-latency de-esser for real-time monitoring',
    description: `DeSibilizer LL is the low-latency version of DeSibilizer designed for real-time monitoring during recording. Same algorithm, minimal delay — singer can monitor through headphones without the annoying sibilance artifacts. Built into FL Studio.`,
    when: 'Recording vocals in real-time — headphone monitoring without latency',
    pros: ['Minimal latency — for monitoring during recording', 'Same algorithms as DeSibilizer', 'Built into FL'],
    cons: ['No additional advantages over DeSibilizer in regular mix work', 'No visualization'],
    guide: [
      { title: 'When to Use LL vs Regular', text: `DeSibilizer LL = during recording. Put on the track the singer is monitoring. Low latency allows real-time monitoring without the "doubling" effect.
      DeSibilizer = during mixing. Better quality de-essing without latency concerns.` },
      { title: 'Parameters', params: [
        { name: 'Threshold', desc: 'Sibilance detection level' },
        { name: 'Frequency', desc: 'Detection frequency range (usually 6–10 kHz)' },
        { name: 'Reduction', desc: 'Amount of de-essing reduction' }
      ]}
    ],
    tips: [
      { title: 'Switch to DeSibilizer after recording', text: `Use LL during recording for monitoring, then replace with regular DeSibilizer for the mix. Better quality for the final result.` },
      { title: 'Same settings work', text: `Settings from DeSibilizer LL can be transferred directly to DeSibilizer — same algorithm.` }
    ],
    controlParams: [
      { n:1, name:'Threshold', range:'-60 — 0 dB',    def:'-20 dB', tip:'Set threshold just above the noise floor but below the problematic sibilance level. Watch the GR indicator during monitoring' },
      { n:2, name:'Frequency', range:'1000 — 20000 Hz',def:'7 kHz',  tip:'6–8 kHz catches most vocal sibilance. Higher 9–12 kHz for very bright sibilance. Listen with Audition to find the exact frequency' },
      { n:3, name:'Reduction', range:'0 — 24 dB',     def:'6 dB',   tip:'6–10 dB reduction is enough for most vocals. More than 12 dB sounds unnatural. Aim for smooth inaudible de-essing' }
    ]
  },

  'invisible-limiter-g3': {
    shortDesc: 'Latest version — minimum artifacts',
    description: `Invisible Limiter G3 is the third generation from A.O.M. — the most transparent limiter in the series. Improved True Peak and ISP control, even fewer artifacts at high gain reduction. For release-quality mastering where maximum transparency is the goal.`,
    when: 'Release-quality master — maximum transparency and True Peak control',
    pros: ['Superior transparency — better than G2', 'True Peak / ISP control', 'Minimum artifacts at high GR', 'Suitable for commercial releases'],
    cons: ['No built-in LUFS meter', 'Fewer modes than Pro-L 2', 'Requires a separate A.O.M. license'],
    guide: [
      { title: 'G3 vs G2', text: `G3 improves the algorithm for less distortion at high GR. If you were satisfied with G2 — G3 sounds even more transparent at the same settings.` },
      { title: 'Parameters', params: [
        { name: 'Threshold',   desc: 'Limiter ceiling — usually -0.1 or -1.0 dBTP' },
        { name: 'Release',     desc: 'Recovery time — program-dependent Auto works well' },
        { name: 'True Peak',   desc: 'True Peak control to prevent inter-sample peaks' },
        { name: 'Style',       desc: 'Limiting character: Natural, Transparent, Aggressive' }
      ]}
    ],
    tips: [
      { title: 'Threshold -1.0 dBTP for streaming', text: `Spotify and Apple Music require True Peak ≤ -1.0 dBTP. Set Ceiling to -1.0 and enable True Peak mode.` },
      { title: 'Compare G2 vs G3 on your master', text: `On some material G2 and G3 sound nearly identical. On dense mixes at high loudness G3 artifacts are noticeably fewer.` }
    ],
    controlParams: [
      { n:1, name:'Threshold/Ceiling', range:'-12 — 0 dBTP',  def:'-0.1 dBTP', tip:'Streaming: -1.0 dBTP (True Peak standard). CD: -0.1 dBTP. Set Ceiling, not input gain, to control loudness ceiling' },
      { n:2, name:'Release',           range:'Auto / 1–2000 ms',def:'Auto',     tip:'Auto Release is the G3 strength — program-dependent behavior. Manual only if you want a specific pump character' },
      { n:3, name:'Style',             range:'Natural, Transparent, Aggressive',def:'Transparent', tip:'Transparent = maximum invisibility (mastering standard). Natural = slight analog coloration. Aggressive = audible limiting character' }
    ]
  },

  'redverb2': {
    shortDesc: 'Vintage algorithmic reverb with warm character',
    description: `RedVerb 2 is a vintage algorithmic reverb built into FL Studio. Warm, slightly colored tail reminiscent of hardware reverb units of the 70s-80s. Great for retro production — plate emulation and spring algorithms with analog character.`,
    when: 'Retro sound, 70s-80s, analog reverb character without digital coldness',
    pros: ['Warm vintage character', 'Plate and spring reverb emulation', 'Built into FL Studio', 'Great for retro sound'],
    cons: ['Less control than Pro-R', 'No EQ in the tail', 'Less transparent for modern music'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Type',      desc: 'Algorithm: Plate, Spring, Hall, Room' },
        { name: 'Decay',     desc: 'Reverb tail length' },
        { name: 'Damping',   desc: 'High frequency absorption — more = warmer' },
        { name: 'Pre-delay', desc: 'Delay before reverb starts' },
        { name: 'Mix',       desc: 'Dry/Wet' }
      ]}
    ],
    tips: [
      { title: 'Plate on 70s vocals', text: `Plate type, Decay 2–3 s, Damping 50–60%, Mix 20–30%. Classic vintage vocal reverb sound.` },
      { title: 'Spring on guitar', text: `Spring type — the characteristic "boing" of surf and rockabilly guitar. Authentic vintage tone.` }
    ],
    controlParams: [
      { n:1, name:'Type',      range:'Plate, Spring, Hall, Room', def:'Plate',  tip:'Plate = smooth metallic tail for vocals (classic 70s). Spring = characteristic "boing" for vintage guitar. Hall = large space for pads' },
      { n:2, name:'Decay',     range:'0.1 — 12 s',               def:'2.0 s',  tip:'Vocals 1.5–2.5 s. Percussion 0.3–0.8 s. Pads 3–6 s. Vintage material needs longer tails than modern production' },
      { n:3, name:'Damping',   range:'0 — 100%',                 def:'50%',    tip:'50–70% = warm dark tail like an analog plate reverb. 0% = bright metallic. Higher values give more "vintage" character' },
      { n:4, name:'Pre-delay', range:'0 — 200 ms',               def:'15 ms',  tip:'15–20 ms on vocals = intelligibility. 30–50 ms = obvious vintage slapback distance' },
      { n:5, name:'Mix',       range:'0 — 100%',                 def:'25%',    tip:'Use as Send effect (Mix 100% on Aux). Control amount with the Aux fader for flexible balancing' }
    ]
  },

  'fruity-delay-bank': {
    shortDesc: 'Multi-delay bank — up to 8 independent lines',
    description: `Fruity Delay Bank offers up to 8 independent delay lines, each with its own time, pan, volume and feedback. Creates complex rhythmic echo textures impossible with a single delay. Built into FL Studio.`,
    when: 'Non-standard textures, IDM, ambient, complex rhythmic echo patterns',
    pros: ['Up to 8 independent delay lines', 'Each line has its own time, pan, volume', 'Creates unique rhythmic textures', 'Built into FL Studio'],
    cons: ['Complex to set up', 'Can create chaos with wrong settings', 'No pitch shift'],
    guide: [
      { title: 'Working with Multiple Lines', text: `Each line works independently. Set different times — e.g. line 1: 1/4, line 2: 3/8, line 3: 1/6. Lines create a polyrhythmic echo pattern. Pan lines to different positions for spatial interest.` },
      { title: 'Parameters per Line', params: [
        { name: 'Time',     desc: 'Delay time for this line' },
        { name: 'Volume',   desc: 'Volume of this line' },
        { name: 'Pan',      desc: 'Pan position' },
        { name: 'Feedback', desc: 'Feedback — repeats for this line' }
      ]}
    ],
    tips: [
      { title: 'Prime number time ratios', text: `Time ratios that don't divide evenly (3/8, 5/16) create complex non-repeating patterns that are more interesting than simple 1/4 echoes.` },
      { title: 'Filter each line', text: `Use LP filters in each line's feedback. Tail darkens with each repeat, preventing frequency buildup.` }
    ],
    controlParams: [
      { n:1, name:'Line 1–8 Time',     range:'1 ms — 2 s / note values', def:'varies',   tip:'Set each line to a different note value. 1/4 + 3/8 + 5/16 = complex polyrhythmic echo. All lines blend into one rich texture' },
      { n:2, name:'Line 1–8 Volume',   range:'0 — 100%',                 def:'50%',      tip:'Decrease volume on later lines for natural echo decay. Line 1 loudest, progressively lower for natural-sounding cascade' },
      { n:3, name:'Line 1–8 Pan',      range:'100% L — 100% R',          def:'Centre',   tip:'Pan different lines across the stereo field. Creates wide spatial echo pattern across the stereo image' },
      { n:4, name:'Line 1–8 Feedback', range:'0 — 100%',                 def:'30%',      tip:'Keep feedback below 50% per line to avoid runaway oscillation. Total effect builds from all 8 lines combined' }
    ]
  },

  'jp-me-1': {
    shortDesc: 'Delay + Reverb + Modulation combo',
    description: `JP-ME-1 is an all-in-one ambient processor: delay, reverb and modulation in one plugin. Creates rich spatial textures without building a chain of separate plugins. Ideal for pads, ambient and quickly adding atmosphere to any sound.`,
    when: 'Ambient, pads, creating atmosphere — all in one without a plugin chain',
    pros: ['Delay + reverb + modulation in one', 'Creates rich spatial textures', 'Simple to use', 'Built into FL'],
    cons: ['Less control than separate plugins', 'No detailed parameters per module', 'Sound is less predictable'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Delay Time',   desc: 'Delay time' },
        { name: 'Reverb Size',  desc: 'Reverb space size' },
        { name: 'Modulation',   desc: 'Modulation depth — adds movement' },
        { name: 'Mix',          desc: 'Overall Dry/Wet' }
      ]},
      { title: 'Usage', text: `Put on a dry pad or synth. Start with Mix 30–40%. Increase Reverb Size for a larger space. Add Modulation for movement in the tail. Quick ambient creation without complex routing.` }
    ],
    tips: [
      { title: 'On plain sounds', text: `JP-ME-1 is excellent on simple dry sounds — a basic sine wave becomes a rich ambient texture in seconds.` },
      { title: 'Automate Mix', text: `Automate Mix from 0 to 60% during a transition. The sound gradually "dissolves" into space — effective for breakdowns.` }
    ],
    controlParams: [
      { n:1, name:'Delay Time',  range:'note values / ms',def:'1/4',   tip:'Sync to tempo for rhythmic interest. Short times (1/16–1/8) = tight echo. Long (1/2–1 bar) = ambient washes' },
      { n:2, name:'Reverb Size', range:'0 — 100%',        def:'50%',   tip:'High Size = vast ambient space. Low = intimate room feeling. Combine with long Delay for maximum space' },
      { n:3, name:'Modulation',  range:'0 — 100%',        def:'20%',   tip:'Adds movement to the tail — similar to chorus in the reverb. 20–40% = organic movement. Higher = obvious modulation effect' },
      { n:4, name:'Mix',         range:'0 — 100%',        def:'40%',   tip:'30–50% as Insert effect. 100% on Send bus. Automate from 0 to 60% during transitions for a dissolving effect' }
    ]
  },

  'multiband-delay': {
    shortDesc: 'Different delay for low/mid/high frequencies',
    description: `Multiband Delay splits the signal into frequency bands and applies a different delay to each. Low, mid and high frequencies echo at different times — creating a unique spectral effect impossible with a standard delay. Excellent for sound design and ambient textures.`,
    when: 'Creative effects, sound design — each frequency echoes at its own tempo',
    pros: ['Unique spectral effect', 'Separate delay control per band', 'Built into FL Studio', 'Great for sound design'],
    cons: ['Very specialized — not for standard echo', 'Hard to predict the result', 'Higher CPU than simple delay'],
    guide: [
      { title: 'Concept', text: `Each band (Low, Mid, High) has its own delay time. Low at 1/2 note, Mid at 1/4, High at 1/8 — bass echoes slowly, highs echo quickly. Creates complex cascading spatial effect.` },
      { title: 'Parameters per Band', params: [
        { name: 'Low Delay',  desc: 'Delay time for the low frequency band' },
        { name: 'Mid Delay',  desc: 'Delay time for the mid frequency band' },
        { name: 'High Delay', desc: 'Delay time for the high frequency band' },
        { name: 'Feedback',   desc: 'Repeats per band' },
        { name: 'Mix',        desc: 'Overall Dry/Wet' }
      ]}
    ],
    tips: [
      { title: 'Contrasting times', text: `Low: 1/2 bar, Mid: 1/4, High: 1/8 — dramatic contrast between bands. Bass feels heavy and slow, highs are quick and sparkling.` },
      { title: 'Use on Send bus', text: `Route only selective instruments to Multiband Delay on a Send bus. Full mix through it sounds muddy — pick specific elements.` }
    ],
    controlParams: [
      { n:1, name:'Low Delay',  range:'1 ms — 2 s / note', def:'1/2',  tip:'Low frequencies echo slowly = weight and gravity. Contrast with fast High delay for the most dramatic spectral separation' },
      { n:2, name:'Mid Delay',  range:'1 ms — 2 s / note', def:'1/4',  tip:'Middle echo time bridges low and high bands. Often works well at standard 1/4 note value' },
      { n:3, name:'High Delay', range:'1 ms — 2 s / note', def:'1/8',  tip:'High frequencies echo fast = air and shimmer. Short times (1/16) create chorus-like effect on the high band' },
      { n:4, name:'Feedback',   range:'0 — 100%',          def:'30%',  tip:'Keep total feedback moderate — each band\'s feedback multiplies the overall density. 20–40% per band is usually sufficient' },
      { n:5, name:'Mix',        range:'0 — 100%',          def:'30%',  tip:'Use as Send effect (Mix 100% on Aux). Low Mix 15–25% as Insert — the spectral delay adds texture without dominating' }
    ]
  },

  'stereo-imager-d': {
    shortDesc: 'Multiband stereo widener / narrower',
    description: `Stereo Imager D gives separate control of stereo width for low and high
    frequencies. Bass can stay mono (as all mastering standards require),
    while highs can be widened to the maximum. Two controls: Low Width and High Width.`,
    when: 'Widen pads and highs, narrow bass to mono — separately per band',
    pros: ['Separate Low and High width control', 'Bass to mono in one move', 'Built into FL Studio', 'Minimal CPU'],
    cons: ['Only two bands — no detailed multiband', 'No stereo correlation visualization', 'No M/S mode'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Low Width', desc: 'Width of the low frequency band: 0% = mono' },
        { name: 'High Width', desc: 'Width of the high frequency band: 100%+ = widening' },
        { name: 'Crossover', desc: 'Split frequency Low/High (usually 120–200 Hz)' }
      ]},
      { title: 'Standard Mastering Setting', text: `Low Width: 0–20% (bass in mono), High Width: 100–130% (highs slightly widened). Crossover: 120 Hz. The mix is compatible with any playback system.` }
    ],
    tips: [
      { title: 'Bass always in mono', text: `Low Width 0% with a 120 Hz crossover — the mastering standard. Bass below 120 Hz in mono sounds more powerful on any system.` },
      { title: 'Widen only High', text: `High Width 110–120% adds air and width to the highs without phase problems in the bass.` }
    ],
    controlParams: [
      { n:1, name:'Low Width',  range:'0 — 200%',    def:'0%',     tip:'0% = Low band in mono (mastering standard). 100% = unchanged. Below 120 Hz in mono — bass is more powerful on club systems' },
      { n:2, name:'High Width', range:'0 — 200%',    def:'100%',   tip:'110–130% = slight high widening. Adds air and width. Above 150% — phase artifacts in the High band' },
      { n:3, name:'Crossover',  range:'20 — 5000 Hz',def:'120 Hz', tip:'120 Hz = only sub-bass in mono. 200 Hz = sub-bass + low-bass in mono. Choose by genre: 120 Hz for club, 200 Hz for pop' }
    ]
  },

  'fruity-stereo-shaper': {
    shortDesc: 'M/S control and phase correction',
    description: `Fruity Stereo Shaper works in the Mid/Side domain — separately processing the center (Mid) and side (Side) signal. Lets you control width, fix phase problems, and ensure mono-compatibility of the mix.`,
    when: 'Mastering, mono-compatibility check, fixing phase problems',
    pros: ['Precise M/S control', 'Phase correction', 'Phase inversion L/R/M/S', 'Built into FL Studio'],
    cons: ['Only M/S volume control — no EQ or compression per M/S', 'No phase visualization'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Mid Volume', desc: 'Volume of the center signal' },
        { name: 'Side Volume', desc: 'Volume of the side signal — affects width' },
        { name: 'Phase L/R', desc: 'Invert phase of left or right channel' },
        { name: 'Phase M/S', desc: 'Invert phase of Mid or Side' }
      ]},
      { title: 'Checking Mono Compatibility', text: `Side Volume to 0 — you hear only Mid. Check: are there any dips in the sound? If something disappears when summing to mono — there are phase problems. Fix them with the Phase buttons.` }
    ],
    tips: [
      { title: 'Width via Side Volume', text: `Side Volume below 100% — narrows stereo. Above 100% — widens. Be careful above 120% — phase artifacts appear.` },
      { title: 'Routing for M/S plugins', text: `Put two Stereo Shapers around a plugin without M/S mode: the first encodes to M/S (Mid=Left), the second after the plugin decodes back. Any plugin can work in M/S.` }
    ],
    controlParams: [
      { n:1, name:'Mid Volume',  range:'0 — 200%', def:'100%', tip:'Lower Mid Volume to reduce the center (vocal, kick). Increase — strengthens center elements. Careful: changes mix balance' },
      { n:2, name:'Side Volume', range:'0 — 200%', def:'100%', tip:'0% = full mono (Mid only). 200% = maximum width with possible artifacts. 80–120% = working zone for width control' },
      { n:3, name:'Phase L',     range:'0° / 180°',def:'0°',   tip:'Invert phase of left channel to fix recording phase errors. If sound disappears when summing to mono — try inversion' },
      { n:4, name:'Phase R',     range:'0° / 180°',def:'0°',   tip:'Invert right channel. Often helps when recording with two mics at different distances from the source' }
    ]
  },

  'spreader': {
    shortDesc: 'Modern stereo widener without phase problems',
    description: `Spreader is a new Image-Line stereo widener with a modern algorithm specifically designed to avoid phase problems during widening. Unlike the Haas effect and simple phase shift, Spreader maintains mono-compatibility even at maximum widening.`,
    when: 'Pads, atmospheres, master bus — widen stereo without artifacts',
    pros: ['Modern algorithm without phase artifacts', 'Mono-compatible', 'Built into FL Studio', 'Simple to use'],
    cons: ['Less control than Stereo Imager D', 'No multiband mode'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Width', desc: 'Degree of stereo widening — 0% mono, 100% maximum' },
        { name: 'Stereo Mode', desc: 'Widening algorithm: Classic or Enhanced' }
      ]},
      { title: 'Usage', text: `Width 40–70% on pads — creates a feeling of wide space. On master bus: Width 10–20% — slight widening of the whole mix.` }
    ],
    tips: [
      { title: 'Check mono', text: `After setting Spreader, switch to mono in monitoring. Sound should not drop out — Spreader preserves compatibility better than other wideners.` },
      { title: 'On synths instead of chorus', text: `Width 60–80% on a mono synth. Get width without the typical chorus "swimming" effect.` }
    ],
    controlParams: [
      { n:1, name:'Width',       range:'0 — 200%',          def:'50%',      tip:'40–70% on pads — wide space. 10–20% on the master — slight widening. Always check mono after setting' },
      { n:2, name:'Stereo Mode', range:'Classic / Enhanced', def:'Enhanced', tip:'Enhanced uses the modern algorithm without phase artifacts. Classic = old algorithm for compatibility' }
    ]
  },

  'cyclic-panner': {
    shortDesc: 'Auto-panner with tempo sync',
    description: `Cyclic Panner automatically moves sound between left and right channels according to a pattern synchronized with the project tempo. Multiple waveforms, adjustable depth and speed. Creates rhythmic movement in space.`,
    when: 'Rhythmic panning in sync with tempo — movement in the stereo field',
    pros: ['Tempo sync', 'Multiple waveforms', 'Adjustable depth and phase', 'Built into FL Studio'],
    cons: ['Can quickly become a cliché if overused', 'No ADSR envelope'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Rate',  desc: 'Auto-panning speed (in note values when Sync is on)' },
        { name: 'Depth', desc: 'Movement depth: 0% = center, 100% = full L/R' },
        { name: 'Shape', desc: 'Waveform: Sine (smooth), Square (sharp), Triangle' },
        { name: 'Phase', desc: 'Phase offset of the cycle' },
        { name: 'Sync',  desc: 'Synchronization with project tempo' }
      ]}
    ],
    tips: [
      { title: '1/4 note Sine on guitar', text: `Rate 1/4, Shape Sine, Depth 60%. Guitar smoothly "rocks" between channels in time — creates a sense of live performance.` },
      { title: 'Different phase on two tracks', text: `Two similar synths with Cyclic Panner — one Phase 0°, another Phase 180°. They move toward each other — stereo interest without chaos.` }
    ],
    controlParams: [
      { n:1, name:'Rate',  range:'1/32 — 4 bars / ms',  def:'1/4',  tip:'Enable Tempo Sync. 1/4 = panning once per quarter note. 1 bar = slow movement. 1/8 = fast rhythmic movement' },
      { n:2, name:'Depth', range:'0 — 100%',             def:'60%',  tip:'100% = sound goes fully to L or R. 30–50% = subtle movement. Subtle Depth + Sine = organic live sound' },
      { n:3, name:'Shape', range:'Sine, Square, Triangle',def:'Sine', tip:'Sine = smooth. Square = sharp binary L/R switching. Triangle = linear. Square at 1/8 = rhythmic stereo gate' },
      { n:4, name:'Phase', range:'0° — 360°',            def:'0°',   tip:'Offset Phase by 180° on the second track — two elements move toward each other' },
      { n:5, name:'Sync',  range:'Off / On',             def:'On',   tip:'Sync On = panning locked to project tempo. Sync Off = Rate in Hz. Always enable Sync for rhythmically precise movement' }
    ]
  },

  'fruity-stereo-enhancer': {
    shortDesc: 'Stereo widener via phase shift',
    description: `Fruity Stereo Enhancer widens the stereo field through phase shift between channels. The simplest widener in FL — one Width control. Works instantly and straightforwardly, though at higher values phase artifacts appear. For light widening — it's enough.`,
    when: 'Quickly add width to a sound — with a single control',
    pros: ['Extremely simple — one parameter', 'Built into FL Studio', 'Instant result', 'Zero CPU'],
    cons: ['Phase problems at large Width', 'Less quality algorithm than Spreader', 'Not mono-compatible at high values'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Width',        desc: 'Widening degree: 0 = mono, 100 = maximum' },
        { name: 'Phase Offset', desc: 'Phase offset between L and R channels' }
      ]},
      { title: 'Limitations', text: `Fruity Stereo Enhancer uses phase shift. When summing to mono, phase copies can cancel each other. Check mono — if sound disappears, reduce Width or use Spreader.` }
    ],
    tips: [
      { title: 'Only for wide sounds', text: `Works well on synths and textures that will never be heard in mono. On vocals and key instruments — use Spreader or MicroShift.` },
      { title: 'Width no more than 60%', text: `Up to 60% phase artifacts are minimal. Higher — risk of problems when converting to mono.` }
    ],
    controlParams: [
      { n:1, name:'Width',        range:'0 — 200%', def:'50%', tip:'Up to 60% = minimal phase artifacts. On synths and textures can go higher. Always check mono — if sound disappears, lower Width' },
      { n:2, name:'Phase Offset', range:'0 — 180°', def:'0°',  tip:'Phase offset between L and R. This is what creates the widening. Small value (10–30°) = subtle width without noticeable artifacts' }
    ]
  },

  'fruity-panomatic': {
    shortDesc: 'LFO panner with multiple waveforms',
    description: `Fruity PanOMatic is a more flexible alternative to Cyclic Panner. Offers more waveforms for LFO panning, volume and pan control with different curves. Useful for creating rhythmically pulsating movement in space.`,
    when: 'Automatic LFO panning with flexible waveform control',
    pros: ['More waveforms than Cyclic Panner', 'Volume + Pan control together', 'Tempo sync', 'Built into FL Studio'],
    cons: ['Overlaps with Cyclic Panner in functionality', 'No envelope'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'LFO Rate',   desc: 'LFO speed' },
        { name: 'LFO Depth',  desc: 'Panning depth' },
        { name: 'LFO Shape',  desc: 'Waveform: Sine, Triangle, Square, Sawtooth, Random' },
        { name: 'Volume LFO', desc: 'LFO on Volume — creates a tremolo effect' },
        { name: 'Pan LFO',    desc: 'LFO on Pan — panning' }
      ]}
    ],
    tips: [
      { title: 'Random for organic sound', text: `Shape Random, slow Rate, small Depth — panning is random and organic, like a live performer.` },
      { title: 'Volume + Pan together', text: `Enable both LFOs with a small Phase offset. Sound simultaneously moves in space and pulses in volume — a rich live effect.` }
    ],
    controlParams: [
      { n:1, name:'LFO Rate',   range:'0.01 — 10 Hz / note',                        def:'1/4',  tip:'Tempo Sync for rhythmic movement. Slow (1/2 — 2 bars) = slow organic movement. 1/8 = fast pulsation' },
      { n:2, name:'LFO Depth',  range:'0 — 100%',                                   def:'50%',  tip:'30–60% for subtle movement. Full Depth 100% = sound goes to extreme L/R positions — too aggressive for a mix' },
      { n:3, name:'LFO Shape',  range:'Sine, Triangle, Square, Sawtooth, Random',   def:'Sine', tip:'Random = organic irregular movement (live performer). Sine = smooth. Square = rhythmic L/R' },
      { n:4, name:'Volume LFO', range:'0 — 100%',                                   def:'0%',   tip:'Tremolo depth. Enable alongside Pan LFO with small Phase offset — sound simultaneously moves and pulses' },
      { n:5, name:'Pan LFO',    range:'0 — 100%',                                   def:'50%',  tip:'Main panning knob. Use Random Shape for organic "live" spatial movement' }
    ]
  },

  'triple-fader': {
    shortDesc: 'Triple fader — Left, Right, Mid',
    description: `Triple Fader is a utility plugin with three independent faders: Left, Right and Mid. Lets you precisely balance stereo channels or redistribute volume between center and sides. Simple and indispensable tool for accurate balancing.`,
    when: 'Final channel balance — independent L, R and Mid control',
    pros: ['Independent L/R/Mid control', 'Simple and clear', 'Built into FL Studio', 'Zero CPU'],
    cons: ['No automation curves', 'No level visualization'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Left Fader',  desc: 'Volume of the left channel' },
        { name: 'Right Fader', desc: 'Volume of the right channel' },
        { name: 'Mid Fader',   desc: 'Volume of the center (mid) signal' }
      ]}
    ],
    tips: [
      { title: 'Fix an offset recording', text: `If a recording is louder in one channel — adjust Left/Right faders. Faster than re-recording.` },
      { title: 'Boost center on master',  text: `Mid Fader +1–2 dB on master — strengthens center elements (kick, vocal, bass). Mix becomes more focused.` }
    ],
    controlParams: [
      { n:1, name:'Left Fader',  range:'-∞ — +6 dB', def:'0 dB', tip:'Left channel volume independently. If recording is louder on left — pull right up or push left down to balance' },
      { n:2, name:'Right Fader', range:'-∞ — +6 dB', def:'0 dB', tip:'Right channel volume. Offset stereo recordings are quickly fixed without re-recording — just equalize L/R faders' },
      { n:3, name:'Mid Fader',   range:'-∞ — +6 dB', def:'0 dB', tip:'+1–2 dB on master strengthens center (kick, vocal, bass). Mix focuses. -1–2 dB = strengthens Side (width) relative to center' }
    ]
  },

  'microshift': {
    shortDesc: 'Stereo widener via pitch detune — Soundtoys',
    description: `MicroShift by Soundtoys widens stereo through micro-pitch detuning between channels — emulates the Haas effect and classic studio doubling techniques. Sound becomes wide, dense and professional. Three modes: via pitch shift, time, or a combination of both.`,
    when: 'Vocals, guitar, synths — professional stereo widening without phase problems',
    pros: ['Professional Soundtoys algorithm', 'Three widening modes', 'Does not create phase problems', 'Mono-compatible at moderate settings'],
    cons: ['Paid — Soundtoys license', 'At high values the chorus effect is audible'],
    guide: [
      { title: 'Modes', params: [
        { name: 'Shift I',  desc: 'Classic studio doubling via pitch micro-shift' },
        { name: 'Shift II', desc: 'Wider effect — stronger detuning' },
        { name: 'Haas',     desc: 'Small time delay between L and R' }
      ]},
      { title: 'Parameters', params: [
        { name: 'Intensity', desc: 'Degree of widening/detuning' },
        { name: 'Mix',       desc: 'Dry/Wet balance' }
      ]}
    ],
    tips: [
      { title: 'Vocal doubling',        text: `Mode Shift I, Intensity 40–60%, Mix 50–70%. Vocal sounds like double-tracked without a real second recording.` },
      { title: 'Careful on the master', text: `Mix no higher than 20–30% on the master. More — chorus effect ruins the sound.` }
    ],
    controlParams: [
      { n:1, name:'Mode',      range:'Shift I, Shift II, Haas', def:'Shift I', tip:'Shift I = classic studio doubling (subtle pitch). Shift II = wider and more noticeable. Haas = time delay L/R' },
      { n:2, name:'Intensity', range:'0 — 100%',                def:'50%',    tip:'40–60% on vocals = convincing double-track effect. Above 70% — chorus is audible. Haas mode: up to 30% for mono-compatibility' },
      { n:3, name:'Mix',       range:'0 — 100%',                def:'60%',    tip:'50–70% on vocals. No higher than 20–30% on master — otherwise chorus effect. Use as Insert (not Send) for doubling effect' }
    ]
  },

  'fruity-love-philter': {
    shortDesc: '8-voice parallel filter with LFO on each',
    description: `Fruity Love Philter is a complex multi-voice filter with up to 8 parallel units, each with its own filter type and LFO. The possibilities are vast: from a simple auto-filter to wild multi-voice filtering textures. A unique sound design instrument built into FL Studio.`,
    when: 'Sound design, auto-filter, moving tonal textures',
    pros: ['Up to 8 parallel filters', 'LFO on each filter independently', 'Enormous sound design possibilities', 'Built into FL Studio'],
    cons: ['Complex interface — takes time to learn', 'Easy to create chaos', 'Heavier CPU than simple filters'],
    guide: [
      { title: 'Structure', text: `Up to 8 units work in parallel. Each unit: filter type, cutoff, resonance, LFO. Output of all units is summed. Each can be set to a different range and movement.` },
      { title: 'Unit Parameters', params: [
        { name: 'Type',           desc: 'LP, HP, BP, Notch, Allpass and others' },
        { name: 'Cutoff',         desc: 'Cutoff frequency' },
        { name: 'Resonance',      desc: 'Resonance — emphasis at the cutoff frequency' },
        { name: 'LFO Rate/Depth', desc: 'Speed and depth of cutoff modulation' },
        { name: 'Volume',         desc: 'Volume of this unit in the sum' }
      ]}
    ],
    tips: [
      { title: 'Auto-filter — one unit',  text: `One LP unit, LFO Sine, Rate 1/4, moderate Depth. Classic auto-filter sweep for rhythmic patterns.` },
      { title: 'Multi-voice filter',      text: `4 units: LP, HP, BP at different frequencies, different LFO speeds. Sound "moves" in a complex and organic way.` }
    ],
    controlParams: [
      { n:1, name:'Type (per unit)',   range:'LP, HP, BP, Notch, Allpass', def:'LP',    tip:'LP + LFO Sine = classic auto-wah. Notch = watery 70s sound. BP = telephone range. Allpass = phaser-like' },
      { n:2, name:'Cutoff',           range:'20 — 20000 Hz',               def:'2 kHz', tip:'Starting cutoff for the LFO. Set at the mid-point of the LFO sweep range — lower for dark sounds, higher for brightness' },
      { n:3, name:'Resonance',        range:'0 — 100%',                    def:'30%',   tip:'40–60% — emphasis at cutoff adds auto-filter character. Above 80% — self-oscillation (on some filter types)' },
      { n:4, name:'LFO Rate',         range:'0.01 — 20 Hz / note',         def:'1/4',   tip:'Enable Tempo Sync for rhythmic modulation. Different Rate on different units creates complex async movement' },
      { n:5, name:'LFO Depth',        range:'0 — 100%',                    def:'50%',   tip:'Depth of frequency sweep. At 100% + slow Rate — full frequency range in one LFO cycle' },
      { n:6, name:'Volume (per unit)', range:'0 — 100%',                   def:'50%',   tip:'Volume of each unit in the total sum. Pull back units with Resonance that stand out too much — mix balance' }
    ]
  },

  'volcano-3': {
    shortDesc: '4 parallel filters with feedback and drive',
    description: `Volcano 3 is a powerful four-voice filter with a feedback loop and built-in drive. Feedback creates self-oscillation — at high values the filter starts to "howl" and generate its own tones. An aggressive instrument for extreme sound design.`,
    when: 'Sound design, resonant sweeps, aggressive filter textures',
    pros: ['Feedback loop — unique self-oscillation effect', 'Built-in Drive for additional saturation', '4 parallel filters', 'Built into FL Studio'],
    cons: ['Can create unwanted self-oscillating resonance', 'Aggressive character — not for transparent processing', 'Requires caution with Feedback'],
    guide: [
      { title: 'Parameters', params: [
        { name: 'Filter 1–4', desc: 'Type and settings of each of the 4 filters' },
        { name: 'Feedback',   desc: 'Feedback — CAUTION: high values = self-oscillation' },
        { name: 'Drive',      desc: 'Distortion inside the filter loop' },
        { name: 'Cutoff Mod', desc: 'LFO or Envelope on the cutoff frequency' }
      ]},
      { title: 'Feedback Effect', text: `At Feedback above 60–70% the filter starts generating its own tone. This can be used creatively — you get a filter-oscillator. But watch the volume: self-oscillation can rapidly raise the level.` }
    ],
    tips: [
      { title: 'Resonant sweep',      text: `One LP filter with high Resonance, automate Cutoff. Aggressive resonant sweep — classic techno and industrial.` },
      { title: 'Drive + Feedback combo', text: `Drive 30% + Feedback 40% — the filter starts saturating and slightly self-oscillating. Aggressive "live" sound for bass music.` }
    ],
    controlParams: [
      { n:1, name:'Filter 1–4 Cutoff', range:'20 — 20000 Hz', def:'2 kHz', tip:'Each filter is independent. Distribute across ranges: LP on low, HP on high. Or all on one frequency for maximum resonance' },
      { n:2, name:'Feedback',          range:'0 — 100%',       def:'0%',    tip:'CAUTION: above 60% filter self-oscillates and generates its own tone. Watch the level — it can spike sharply' },
      { n:3, name:'Drive',             range:'0 — 100%',       def:'0%',    tip:'Distortion inside the filter loop. Drive 20–40% + moderate Feedback = saturated aggressive sound without self-oscillation' },
      { n:4, name:'Cutoff Mod',        range:'-100 — +100%',   def:'0%',    tip:'LFO or Envelope depth on cutoff frequency. Envelope on percussion — filter opens on hit, closes as it decays' }
    ]
  },

};

/* ── forumTips EN patch ── applied separately so tP() merges them in ── */
const FORUM_TIPS_EN = {
  'pro-q-3': [
    { source: 'Gearspace', author: 'drumsound', tip: 'I use <strong>Static EQ</strong> first in the chain, <strong>Dynamic EQ</strong> second. Static handles the rough problems, Dynamic fine-tunes on a dynamic basis. Two Pro-Q 3s in series — the best workflow.' },
    { source: 'Reddit', author: 'mixwolf_99', tip: '<strong>Spectrum Grab</strong> trick: open two instances (e.g. on vocals and guitar), enable "Spectrum" in settings — you see the neighbouring track\'s spectrum overlaid on yours. Cut exactly where they mask each other.' },
    { source: 'KVR Audio', author: 'mastering_pl', tip: 'Don\'t cut resonances with Q>10. Anything higher sounds like an artifact, not a correction. Q 6–8 is enough for surgical work on vocals. Above Q>10 you hear the filter itself, not the result.' },
    { source: 'FL Forum', author: 'synth_kid_fl', tip: '<strong>Flat Tilt</strong> is an underrated filter type. Instead of adjusting multiple shelf bands, just pull the Tilt — the whole spectrum tilts around the centre point. Handy for making a track "warmer" or "brighter" in one move.' },
    { source: 'Discord', author: 'prodbyoliver', tip: '<strong>Alt+drag</strong> on any band — solo-listen to just that frequency range. I use this to find resonant frequencies: set Bell to +12 dB, enable solo, slowly drag across the spectrum — when you hear the "sick" note, drop the gain and cut right there.' },
    { source: 'KVR Audio', author: 'linearphase_guy', tip: '<strong>Linear Phase</strong> mode — only on the master and only if you don\'t notice pre-ringing. On individual instruments always use Minimum Phase: it responds faster to transients and sounds "more analogue". LP for crystal-clear masters, MP for everything else.' },
  ],
  'pro-c-2': [
    { source: 'Reddit', author: 'beatmaker_ldn', tip: '<strong>Bus</strong> mode + Ratio 4:1 + Attack 30ms + Release Auto — my standard setting for Drum Bus. Attack lets transients through, the compressor glues the group. I leave Knee alone — soft knee is already built into the mode.' },
    { source: 'Gearspace', author: 'analogvibe', tip: '<strong>Lookahead 1–2 ms</strong> on peak instruments (click, snare) removes clipping without audible attack. More than 5ms and you get a "chopped" sound. Optimum for peaks: 1.5 ms lookahead + Fast Attack.' },
    { source: 'FL Forum', author: 'sidechain_king', tip: 'For EDM pumping: <strong>Pumping</strong> mode, Ratio 10:1, Attack 1ms, Release 200ms. Enable SC Filter in the sidechain — HPF 200Hz so the bass doesn\'t cause extra triggers. Then automate Threshold across different sections of the track.' },
    { source: 'KVR Audio', author: 'vocalchain_pro', tip: 'On vocals I always use <strong>SC High-Pass 120Hz</strong>. Without it the compressor reacts to every "b" and "p" (plosives) and dynamics become unpredictable. After filtering it only works on the "body" of the vocal.' },
    { source: 'Discord', author: 'mixmaster_c', tip: '<strong>Auto Gain</strong> — must enable when A/B comparing. Without it +3 dB of compression sounds "better" just because of the volume difference. Enable Auto Gain first, then decide whether you like it.' },
  ],
  'maximus': [
    { source: 'FL Forum', author: 'maximus_veteran', tip: '<strong>Pre-comp mode</strong> on the Low band: a gentle compressor on the bass evens out dynamics before the signal reaches the limiter. Without this, bass creates "overloaded" bursts even with light limiting.' },
    { source: 'Reddit', author: 'fl_mastering_guy', tip: 'Maximus as an <strong>Upward Compressor</strong>: set the threshold below the average signal level and quiet parts get lifted while loud parts are untouched. You get "levelling from below" — more even and transparent than regular compression.' },
    { source: 'KVR Audio', author: 'three_band_pro', tip: 'Set <strong>crossover frequencies</strong> consciously: 120Hz and 3.5kHz is standard. But if your track has a powerful sub-bass, shift the lower crossover down to 80Hz so the "motory" bass falls into the Mid band and is processed separately.' },
  ],
  'pro-l-2': [
    { source: 'Reddit', author: 'loudness_coach', tip: 'Ceiling <strong>-1.0 dBTP</strong> for streaming — the standard. But importantly: True Peak, not Peak. The built-in True Peak Limiting in Pro-L 2 is one of the best. Without it your tracks can clip on YouTube/Spotify during decoding.' },
    { source: 'Gearspace', author: 'brick_limiter', tip: '<strong>Transparent</strong> algorithm for streaming, <strong>Aggressive</strong> for club and EDM. Transparent preserves more dynamics, Aggressive delivers maximum loudness. I never use Transparent on club music — it gets lost in rotation.' },
    { source: 'KVR Audio', author: 'GR_watcher', tip: 'Watch the <strong>Gain Reduction meter</strong>: if it shows more than 3 dB constantly something is wrong upstream. Pro-L 2 should only catch peaks, not the entire dynamics. If GR is constant — add a compressor before the limiter.' },
    { source: 'Discord', author: 'master_discord_ru', tip: 'The <strong>Diff</strong> function (you hear only the clipped material) — always listen to what you\'re throwing away. If you can hear melody — too much limiting. If only noisy peaks — you\'re fine.' },
  ],
  'pro-r': [
    { source: 'Reddit', author: 'mixengineer_se', tip: '<strong>Character knob</strong> closer to Vintage (5–6) on vocal tracks. Vintage mode adds modulation and irregularity to the tail like real plate reverbs — sounds alive, not as mechanical as Modern 10.' },
    { source: 'Gearspace', author: 'space_architect', tip: '<strong>Post EQ</strong> inside Pro-R — cut Low below 200Hz and High above 8kHz in the tail. Reverb shouldn\'t carry sub-bass (it creates a kick drum in space) and shouldn\'t add hissy air. A clean "mid" tail always sounds better.' },
    { source: 'FL Forum', author: 'vocalreverb_fl', tip: 'For vocals: <strong>Pre-Delay 20–30ms</strong>. This gap "separates" the dry signal from the tail — the voice stays clear and the reverb appears slightly later. Without Pre-Delay, reverb blends with the start of words and creates mud.' },
    { source: 'Discord', author: 'roomsim_nerd', tip: '<strong>Stereo Width</strong> in Pro-R: reduce to 70–80% for centre-mix instruments (bass, kick, lead vocal). Wide reverb on central elements blurs the stereo field. Wide reverb — only for background elements.' },
  ],
  'ott': [
    { source: 'Reddit', author: 'edm_tricks_101', tip: 'Reduce <strong>Depth to 20–30%</strong> — at 100% the sound is too "synthetic" and flat. OTT at 25% adds sparkle and energy without an obvious effect. Classic trick on bus plucks/leads.' },
    { source: 'FL Forum', author: 'supersawlover', tip: 'OTT after <strong>saturation/distortion</strong> — top combo. Saturation adds harmonics, OTT lifts the quiet ones up. Result: a rich, full sound that fills all the frequency space.' },
    { source: 'Discord', author: 'dubstep_creator', tip: 'Two OTTs in the chain: first at <strong>25%</strong>, second at <strong>15%</strong>. Together they give soft three-band levelling without obvious artefacts of one strong OTT. I often use this on guitar samples.' },
    { source: 'KVR Audio', author: 'preset_collector', tip: '<strong>Time knob</strong> (Attack/Release) — the most underrated parameter. Fast time = sharp, aggressive. Slow = smooth dynamics levelling. On percussion I like fast time, on pads — slow.' },
  ],
  'saturn-2': [
    { source: 'Gearspace', author: 'analogwarmth', tip: '<strong>Multiband mode</strong> + different saturation types on each band — that\'s Saturn 2\'s power. Low: Tape (warmth, clips peaks), Mids: Tube (harmonics), Highs: Tape Crinkle (air + crackle). Three different characters in one plugin.' },
    { source: 'FL Forum', author: 'warmfl_studio', tip: 'Parallel saturation via <strong>Mix knob</strong>: even 15–20% Tape on vocals adds "glue" with the rest of the track. You don\'t hear the effect as such, but without it the sound feels like it was cut from a different recording.' },
    { source: 'Reddit', author: 'producerX_de', tip: '<strong>Amp</strong> mode + High Drive + Low output = free guitar amp. On synth parts gives that "amp room" character. Add Convolver with a cabinet IR after — a full amp sim.' },
    { source: 'KVR Audio', author: 'tape_freak', tip: '<strong>Feedback</strong> parameter in Saturn 2 — creates a self-sustaining resonance in the selected band. Very carefully: at high values it goes into self-oscillation. At low values (5–10%) it adds "living" nonlinearity.' },
  ],
  'gross-beat': [
    { source: 'FL Forum', author: 'fl_native_power', tip: 'Gross Beat in <strong>"Volume only"</strong> mode is the most powerful free tremolo/gate. Draw any volume envelope shape and sync it to the tempo. Far more flexible than any external Tremolo plugin.' },
  ],
  'timeless-3': [
    { source: 'Gearspace', author: 'delaygeek_es', tip: '<strong>Modulation is deeper</strong> than it looks. Rate and Depth on both channels independently — I set left Rate to 0.3Hz, right to 0.5Hz. The delay constantly "breathes" differently in L/R, creating a wide, living stereo image.' },
    { source: 'FL Forum', author: 'vox_chain_fl', tip: '<strong>Ping-pong delay</strong> with different Feedback in L/R: left 40%, right 55%. The tail fades unevenly, sounds like a real space rather than a metronome. Always add Low Cut in the filter on repeats or the low end gets muddy.' },
    { source: 'Reddit', author: 'synthwave_nerd', tip: 'Timeless 3 + <strong>a little Drive</strong> in the filter section = warm analogue-style delays. Each repeat passes through a driven filter — growing saturation on the tail like a tape machine.' },
  ],
  'fruity-compressor': [
    { source: 'FL Forum', author: 'native_only_fl', tip: 'Fruity Compressor is an underrated native compressor. For <strong>Drum Bus</strong>: Threshold -18dB, Ratio 4:1, Attack 10ms, Release 80ms. Use RMS type instead of Peak for glue. Sounds neutral — no worse than paid alternatives for this task.' },
    { source: 'Reddit', author: 'budget_producer', tip: '<strong>Soft Knee</strong> type in Fruity Compressor is more musical. Hard Knee triggers abruptly — you hear a "step". Soft — gradual, starts compressing before the threshold. Always use Soft on vocals.' },
  ],
  'fruity-limiter': [
    { source: 'FL Forum', author: 'fl_buss_tips', tip: '<strong>Compressor + Limiter in one</strong> plugin. Enable the Compressor section for overall dynamics, Limiter as a brick wall ceiling. Handy for a quick Bus chain without extra plugins in the project.' },
    { source: 'Reddit', author: 'nativeplugs_fan', tip: 'Underrated trick: <strong>Noise Gate</strong> section. I put it on vocal tracks recorded in a noisy room — removes quiet background noise between phrases without an extra gate plugin.' },
  ],
  'ozone-11': [
    { source: 'Reddit', author: 'mastering_biz', tip: '<strong>Master Assistant</strong> is a good starting point, but never leave its result "as-is". Treat it as a suggestion. Then manually lower Ceiling to -1 dBTP and check Tonal Balance against a reference for your genre.' },
    { source: 'Gearspace', author: 'loudness_police', tip: '<strong>Vintage Limiter</strong> + IRC IV Limiter in tandem: Vintage adds character and softly clips peaks, IRC IV — final ceiling -0.3 dBTP. The chain costs less than one powerful Limiter and sounds warmer.' },
    { source: 'KVR Audio', author: 'targetlufs_de', tip: 'Use <strong>Tonal Balance Control</strong> as a monitor, not a processor. Open it alongside a reference track from the same genre, compare the curves. A rare case where visualisation actually helps make an EQ decision.' },
    { source: 'FL Forum', author: 'fl_master_chain', tip: 'My FL Studio master chain: <strong>Pro-Q 3 → Ozone Imager (M/S correction only) → Ozone EQ (Tonal Balance) → Pro-L 2</strong>. I use Ozone only for individual modules, not the full Suite. Better control that way.' },
  ],
  'fruity-reeverb-2': [
    { source: 'FL Forum', author: 'reeverb_classic', tip: 'The <strong>ER (Early Reflections)</strong> section in Fruity Reeverb 2 is often ignored. ER creates the sense of "room", not the tail. Boost ER Mix to 30–40% with a short tail — you get a room sound without a long reverb.' },
  ],
  'fruity-delay-3': [
    { source: 'FL Forum', author: 'delay_wizard_fl', tip: '<strong>Ping-pong with filter</strong>: enable Cut mode, set LPF on repeats. Each repeat gets darker — like real echo in a space. Add moderate Feedback (~35%) and always keep the High Cut on.' },
    { source: 'Reddit', author: 'throwback_delay', tip: '<strong>Tempo Sync + Dotted</strong> notes — a classic for vocal delays. A dotted quarter creates a rhythmic delay that doesn\'t land on the beat but between the notes. Makes vocals rhythmically interesting without creating mud.' },
  ],
  'sausage-fattener': [
    { source: 'Reddit', author: 'mixflip_la', tip: '<strong>Colour + Fatten</strong> together: Colour adds harmonics (like saturation), Fatten compresses and widens. Both at 40–50% — classic "glue" for leads and supersaw in EDM. But don\'t go above 60% or it sounds plastic.' },
    { source: 'FL Forum', author: 'bassface_fl', tip: 'On <strong>808 and sub-bass</strong>: only the Colour knob, no Fatten. Fatten on low frequencies creates IM distortion (intermodulation distortion) that sounds dirty. Colour — soft even harmonics, works well.' },
  ],
  'edison': [
    { source: 'FL Forum', author: 'sampleflip_pro', tip: '<strong>Record to Playlist</strong>: record directly in Edison, then drag-and-drop the sample straight into the Playlist. Faster than any other workflow for quickly capturing ideas. No need to save the file — Edison holds the buffer itself.' },
    { source: 'FL Forum', author: 'timestretch_fl', tip: '<strong>Realtime Stretch</strong> in Edison: select a portion, right-click → Stretch → choose algorithm. Elastique Efficient for pitch preservation, Stretch Only for grain effects. No need to switch to another DAW just for this.' },
    { source: 'Reddit', author: 'audioforensics_fl', tip: '<strong>Declick, Denoise</strong> functions in Edison — native noise removal. Record an impulse response or a sample of the noise, then "subtract" it from the full recording. For room noise it works better than waiting to buy RX.' },
  ],
  'newtone': [
    { source: 'FL Forum', author: 'pitchcorrect_fl', tip: '<strong>Formant Shift</strong> + Pitch Shift independently. Pitch without formant = chipmunk. Formant without pitch = a different voice type. Combine them for a voice transformer effect without an obvious Autotune sound.' },
    { source: 'Reddit', author: 'vocaltuner_daw', tip: 'Newtone is the best manual pitch correction workflow in FL. Draw a <strong>Correction envelope</strong> only on the problematic notes, not on the whole vocal. That way you preserve the singer\'s natural expression and only fix the out-of-grid notes.' },
  ],
  'wave-candy': [
    { source: 'FL Forum', author: 'visual_fl_nerd', tip: '<strong>Vectorscope mode</strong> in Wave Candy — the best tool for checking phase problems. A vertical line = mono. A wide oval = stereo. A diagonal line left/right = phase problem. Keep it on the Master at all times.' },
    { source: 'FL Forum', author: 'meter_head', tip: 'Use Wave Candy with <strong>Skin = Spectrum</strong> on the master bus as permanent monitoring. No need for expensive analysers — the built-in Spectrum in Wave Candy is accurate enough for everyday work.' },
  ],
  'fruity-peak-controller': [
    { source: 'FL Forum', author: 'sidechain_native', tip: 'Classic FL sidechain without Kickstart: Peak Controller on the kick channel → right-click the pad\'s Volume in Mixer → Link → choose Peak Controller → invert. <strong>Faster than any external plugin</strong> and doesn\'t hit the CPU.' },
    { source: 'Reddit', author: 'automator_fl', tip: 'Peak Controller isn\'t just for Volume. Link it to a <strong>filter Cutoff</strong>: when the kick hits — the filter opens. You get a filter sidechain — the sound "opens up" on the hit. Use on pads and atmospheres.' },
    { source: 'FL Forum', author: 'fl_routing_pro', tip: '<strong>LFO mode</strong> in Peak Controller is a free LFO for any parameter. Syncs to BPM. Move Cutoff, Pan, Volume in rhythm — no extra plugins needed. All built into FL.' },
  ],
};
