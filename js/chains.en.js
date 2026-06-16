/* ============================================================
   Plugin Chains + Compatibility Matrix — English translations
   Only translated fields; everything else stays from chains.js
   ============================================================ */

const CHAINS_EN = {

  'mt-kick': {
    name: 'Melodic Techno — Kick',
    desc: 'A heavy, round kick with solid sub-bass and controlled punch. Typical of Agents Of Time, Massano, Innellea.',
    steps: [
      {
        role: 'Shaping the punch',
        note: 'Attack −3 dB (soften the click a bit), Sustain +4 dB (add tail). The kick should "roll", not "click".'
      },
      {
        role: 'Tonal correction',
        note: 'HP 28–32 Hz (remove infrasound), Bell +3 dB @ 60–70 Hz Q=1.2 (sub-bass), Bell −2 dB @ 300–400 Hz Q=2 (remove "cardboard" tone), Bell +2 dB @ 4–5 kHz Q=1.5 (attack/punch).'
      },
      {
        role: 'Punch compressor',
        note: 'Punch mode. Ratio 4:1, Attack 8 ms, Release 80 ms, GR 3–4 dB. The compressor emphasizes the hit and makes the kick snappier.'
      },
      {
        role: 'Analog warmth',
        note: 'Tape mode, Drive 20%, Mix 30%. Adds even harmonics to the sub-bass — the kick sounds "more analog" and translates better on small speakers.'
      },
      {
        role: 'Brick-wall / peak leveling',
        note: 'Transparent, Ceiling −0.3 dB. Just controls peaks — shouldn\'t be audibly working. GR max 1–2 dB.'
      }
    ]
  },

  'mt-lead': {
    name: 'Melodic Techno — Melodic Lead',
    desc: 'A warm, atmospheric lead with space and movement. Like Recondite, Kiasmos, Tale Of Us.',
    steps: [
      {
        role: 'Basic EQ correction',
        note: 'HP 80–120 Hz (the lead shouldn\'t compete with the bass), LP 14–16 kHz (remove digital glare). Bell −2 dB @ 1–2 kHz (remove the synth\'s "plastic" tone).'
      },
      {
        role: 'Warmth + harmonics',
        note: 'Tube mode, Multiband: Low 20% Tape / Mid 25% Tube / High 15% Tape Crinkle. Mix 40–60%. Adds organic character to a cold digital synth.'
      },
      {
        role: 'Opto compressor',
        note: 'Opto mode. Ratio 3:1, Attack 25 ms, Release 180 ms, GR 2–4 dB. Gently "glues" the dynamics without killing expression.'
      },
      {
        role: 'Spatial delay',
        note: 'Ping-pong, 1/8 dotted. Feedback 30%, HPF 400 Hz / LPF 8 kHz on the repeats. Mix 18–25%. Creates depth without muddiness.'
      },
      {
        role: 'Reverb',
        note: 'Character 6–7 (Vintage), Size Medium-Large, Pre-Delay 22 ms, Post EQ: HPF 200 Hz + LPF 7 kHz. Mix 20–30%. The lead "lives" in a large space.'
      },
      {
        role: 'Stereo width',
        note: 'Style I or II, Detune 10–14 cents, Delay 12 ms, Mix 60–70%. Makes the lead wide without phase issues in mono.'
      }
    ]
  },

  'mt-pad': {
    name: 'Melodic Techno — Pad / Atmosphere',
    desc: 'A slowly moving atmospheric pad that fills the space around other elements.',
    steps: [
      {
        role: 'M/S EQ — separation',
        note: 'M/S mode. Mid: HP 120 Hz (clean center). Side: LP 10 kHz (remove edge harshness), HPF 200 Hz (sub-bass stays mono-only).'
      },
      {
        role: 'Filter movement',
        note: 'LFO on Cutoff: sine, 0.08–0.12 Hz (very slow), depth 25–35%. The pad "breathes" and lives — not a static background.'
      },
      {
        role: 'Large reverb',
        note: 'Character 8 (closer to Vintage), Size Large, Decay 4–6 sec, Pre-Delay 5 ms, Mix 40–55%. The pad should "float" in the reverb.'
      },
      {
        role: 'Smeared delay',
        note: 'Stereo mode, Time 1/4, Feedback 45%, Mod Rate 0.15 Hz, high Depth. HPF 600 Hz on the repeats. Mix 20%. Adds shimmer and movement.'
      },
      {
        role: 'Stereo widening',
        note: 'Stereo Separation 55–65%. No more — otherwise phase issues in mono. Pads should "embrace" the listener.'
      }
    ]
  },

  'mt-bass': {
    name: 'Melodic Techno — Bass',
    desc: 'A clean, deep bass with controlled sub — audible on both club systems and headphones.',
    steps: [
      {
        role: 'Correction + M/S',
        note: 'HP 28 Hz. Bell +2 dB @ 55–65 Hz Q=1.0 (sub-bass). Bell −3 dB @ 200–250 Hz (remove "boom"). M/S: Side HPF 200 Hz — all sub-bass strictly mono.'
      },
      {
        role: 'Dynamics compression',
        note: 'Clean mode, Ratio 4:1, Attack 15 ms, Release 120 ms, GR 3–5 dB. Bass notes should be roughly equal in loudness. SC HPF 100 Hz.'
      },
      {
        role: 'Harmonics for small speakers',
        note: 'Tape mode only on the Mid band 80–500 Hz, Drive 15–20%, Mix 25%. Adds 2nd and 3rd harmonics — bass is audible on laptops and phones where the sub doesn\'t reproduce.'
      },
      {
        role: 'Peak control',
        note: 'Transparent, GR max 3 dB. Removes sharp peaks from individual notes without killing the bass\'s overall dynamics.'
      }
    ]
  },

  'mt-master': {
    name: 'Melodic Techno — Master',
    desc: 'Master chain for a soft, deep melodic techno sound. Reference: Cercle Sets, INNERVISIONS, Afterlife.',
    steps: [
      {
        role: 'Tonal balance',
        note: 'HP 22 Hz (physically inaudible infrasound). Gentle shelf +1 dB @ 12 kHz Q=0.7 (air). If needed: Bell −1.5 dB @ 3–5 kHz (remove digital harshness). Use the Analyzer against a reference.'
      },
      {
        role: 'Mastering compressor',
        note: 'Mastering mode. Ratio 1.5:1, Attack 40 ms, Release 250 ms, GR max 1.5 dB. Just glues and adds an imperceptible "glue" to the mix.'
      },
      {
        role: 'Multiband processing',
        note: 'Low: Compressor Ratio 2:1 (bass control). Mid: Upward Expander (lift quiet details). High: gentle Limiter. Threshold is very high — Maximus works delicately.'
      },
      {
        role: 'Tonal control + Imager',
        note: 'Imager only (M/S width: +10% Side above 200 Hz) + Tonal Balance EQ (check against a genre reference). Don\'t overload the chain with Ozone modules.'
      },
      {
        role: 'Final limiter',
        note: 'Transparent, Ceiling −1.0 dBTP, LUFS Target −10 LUFS (Spotify/Apple Music). No more than 3 dB GR. Use Diff monitoring: whatever you are cutting should not be musical.'
      }
    ]
  },

  'ht-kick': {
    name: 'Hi Techno — Kick (Aggressive)',
    desc: 'A sharp, hard kick with maximum punch. Like Alignment, SPFDJ, Colyn on darker sets. Cuts through any sound.',
    steps: [
      {
        role: 'Maximizing the punch',
        note: 'Attack +5 dB (maximum click), Sustain −2 dB (shorten the tail). A Hi Techno kick is aggressive — the attack cuts through the mix.'
      },
      {
        role: 'Aggressive EQ sculpting',
        note: 'HP 40 Hz (less sub than in MT), Bell +4 dB @ 80 Hz Q=1.5 (punch), Bell −4 dB @ 250–350 Hz (remove all "cardboard"), Bell +5 dB @ 3–5 kHz Q=2 (aggressive attack).'
      },
      {
        role: 'Distortion / clipping',
        note: 'Soft Clipping curve, Drive 35–50%, Mix 50–70%. A Hard Techno kick should be slightly distorted — that gives it a "metallic" aggression a clean kick doesn\'t have.'
      },
      {
        role: 'VCA compression',
        note: 'Classic mode (VCA character), Ratio 8:1, Attack 1 ms, Release 60 ms, GR 6–8 dB. Hard "squashing" — the kick becomes dense and flat in dynamics.'
      },
      {
        role: 'Final saturation and limiting',
        note: 'Low Band: Limiter −3 dB (sub-bass control). Full: Upward Compression — the quiet parts of the kick are lifted. Maximus output guarantees a stable level.'
      }
    ]
  },

  'ht-perc': {
    name: 'Hi Techno — Perc / Clap / Snare',
    desc: 'Metallic, crisp percussion and claps for Hi Techno. Sharp, audible through the whole mix.',
    steps: [
      {
        role: 'HP + presence boost',
        note: 'HP 200 Hz (top end and punch only). Bell +4 dB @ 5–8 kHz Q=1.8 (metallic "crunch"). Bell −3 dB @ 1–2 kHz Q=2 (remove "plasticky nasal" tone).'
      },
      {
        role: 'Metallic distortion',
        note: 'Amp or Tube mode, High-Band Drive 40–60%, Mix 60%. Saturn 2 on the top band adds harmonics that make the clap "metallic" — typical for Hi Techno.'
      },
      {
        role: 'Classic VCA',
        note: 'Classic mode, Ratio 6:1, Attack 0.5 ms (instant), Release 45 ms, GR 5–7 dB. Compresses almost like a limiter — percussion is as dense as possible.'
      },
      {
        role: 'Short room',
        note: 'Room Small, Decay 0.3–0.5 sec, Mix 15–20%. No need for a big reverb — a short room adds "liveliness" without smearing the rhythm.'
      }
    ]
  },

  'ht-bass': {
    name: 'Hi Techno — Bass (Distortion)',
    desc: 'Aggressive, distorted bass with powerful sub. Hi Techno bass isn\'t clean — it growls.',
    steps: [
      {
        role: 'Pre-distortion EQ',
        note: 'HP 30 Hz. Bell +3 dB @ 80 Hz (sub-bass before distortion). Bell −5 dB @ 400–600 Hz (remove the "honk" that distortion would amplify).'
      },
      {
        role: 'Main distortion',
        note: 'Hard Clip or Fold curve, Drive 45–65%. Wave Shaper is what gives that characteristic Hi Techno bass "growl". Mix 60–80% (parallel keeps the sub-bass intact).'
      },
      {
        role: 'Post-distortion EQ',
        note: 'A second Pro-Q 3 after the distortion. Bell −4 dB @ 1–3 kHz Q=2 (remove unpleasant intermodulation distortion). HP 45 Hz (distortion adds DC offset).'
      },
      {
        role: 'Compressing the distorted bass',
        note: 'Bus mode, Ratio 4:1, Attack 20 ms, Release 100 ms. Distortion makes the dynamics unpredictable — the compressor brings everything to one level.'
      },
      {
        role: 'Sidechain ducking from the kick',
        note: 'Peak Controller on the kick channel → Bass Volume. When the kick hits, the bass makes room. Critical in Hi Techno — kick and bass fight over the same range.'
      }
    ]
  },

  'ht-lead': {
    name: 'Hi Techno — Raw Lead Synth',
    desc: 'A sharp, raw, hypnotic lead — a typical Hi Techno texture. SPFDJ, Charlotte de Witte style.',
    steps: [
      {
        role: 'Surgical EQ',
        note: 'Remove resonances: Alt+drag solo-listening to find the "problem" frequencies. Bell −5 dB at resonances Q=6. HP 100–150 Hz — the lead doesn\'t carry bass.'
      },
      {
        role: 'Distortion / guitar cab',
        note: 'Pick an aggressive amp + cabinet. Drive 40–60%. Hardcore gives the synth a "guitar-like" aggressive character — it stops sounding like a synth.'
      },
      {
        role: 'Hard compression',
        note: 'Classic, Ratio 10:1, Attack 1 ms, Release 50 ms. The lead is completely "squashed" in dynamics — the hypnotic, monotone character of Hi Techno.'
      },
      {
        role: 'Multiband lift',
        note: 'Depth 30–40%. OTT on the lead after the compressor — lifts quiet overtones and makes the sound "vibrating". A signature Hi Techno lead texture.'
      },
      {
        role: 'Rhythmic delay',
        note: '1/16 or 1/8 Stereo, Feedback 20%, LPF 4 kHz on the repeats, Mix 12%. Just a hint of delay — gives movement without smearing the rhythm.'
      }
    ]
  },

  'ht-master': {
    name: 'Hi Techno — Master',
    desc: 'A loud, dense, aggressive master for the club. Maximum clarity at high volume.',
    steps: [
      {
        role: 'Preparatory EQ',
        note: 'HP 22 Hz. Bell −2 dB @ 250–350 Hz Q=1.5 (remove the "mud" that builds up at loud playback). Shelf +1.5 dB @ 8 kHz (air and clarity).'
      },
      {
        role: 'Bus compression',
        note: 'Bus mode. Ratio 3:1, Attack 20 ms, Release 180 ms (Auto), GR 2–3 dB. "Glue" for the whole mix — elements become one.'
      },
      {
        role: 'Multiband leveling',
        note: 'Low Band: Limiter (sub-bass under control). Mid: Compressor Ratio 2:1. High: Expander (lift details). Hi Techno needs a dense, even spectrum.'
      },
      {
        role: 'Final limiter (Aggressive)',
        note: 'Aggressive algorithm, Ceiling −0.5 dBTP, LUFS Target −8 LUFS (club). GR up to 5–6 dB is acceptable for Hi Techno — the genre calls for heavy master compression.'
      }
    ]
  },

  'vocal-chain': {
    name: 'Vocal Chain',
    desc: 'A standard professional vocal chain for modern music.',
    steps: [
      {
        role: 'Correction and tone',
        note: 'HP 80–100 Hz (remove room noise and handling/pop noise). Notch on problem resonances. Bell +2 dB @ 3–4 kHz (presence). Bell −2 dB @ 500 Hz (remove "boxiness").'
      },
      {
        role: 'Vocal compressor',
        note: 'Vocal or Opto mode. Ratio 3:1, Attack 15 ms, Release 60 ms, GR 4–6 dB. SC HPF 120 Hz. The vocal should be even but keep its expression.'
      },
      {
        role: 'De-esser',
        note: 'Frequency 6–9 kHz, Dynamic mode (not Gain Reduction). Cut only the sibilants without touching the rest of the air. Check in Solo mode.'
      },
      {
        role: 'Analog warmth',
        note: 'Tape mode, Drive 10–15%, Mix 20–25%. Adds soft harmonics — the vocal "glues" to the beat. In parallel, not in series.'
      },
      {
        role: 'Vocal reverb',
        note: 'Character 5–6, Size Small-Medium, Pre-Delay 18–25 ms, Mix 15–25%. Post EQ: HPF 300 Hz + LPF 6 kHz. The reverb should add depth without hurting intelligibility.'
      }
    ]
  },

  'vocal-atmospheric': {
    name: 'Atmospheric / Vibey Vocal',
    desc: 'The vocal is submerged in space, blurred, as if singing from another dimension. Style: Bon Iver, James Blake, Burial, Bicep. Works as a standalone layer or a background texture over the beat.',
    steps: [
      {
        role: 'Tonal trimming',
        note: 'HP 120–180 Hz (the vocal shouldn\'t compete with the bass). Cut 300–500 Hz Q=2 at −3 dB (remove "telephone" tone). Gentle shelf +1.5 dB @ 10 kHz (air).'
      },
      {
        role: 'Light compression (don\'t smother it)',
        note: 'Opto mode, Ratio 2:1, Attack 30 ms, Release Auto, GR 2–3 dB. The goal is to even out level while keeping breath and nuance. Don\'t overcompress.'
      },
      {
        role: 'Warmth + light harmonics',
        note: 'Tube or Tape mode, Drive 8–12%, Mix 15–20%. Adds odd harmonics, making the vocal more "dense" and alive. Very gentle.'
      },
      {
        role: 'Rhythmic texture (optional)',
        note: 'Pitch envelope: a falling pitch envelope to create a "floating" vocal effect. Volume: a random pattern on 1/8 for chopping. Mix 30–50% on a separate Return.'
      },
      {
        role: 'Spatial ping-pong delay',
        note: '3/8 + 5/8 (or 1/4 + 3/8) ping-pong. Feedback 40%. Filter: HPF 400 Hz + LPF 4 kHz on the echo — the echo shouldn\'t be brighter than the original. Mix 25–35%.'
      },
      {
        role: 'Large atmospheric reverb',
        note: 'Character 7–8, Size Large or Hall, Decay 3–5 sec, Pre-Delay 30–50 ms. Post EQ: HP 250 Hz (the reverb shouldn\'t muddy the low end). Mix 40–60% — the vocal literally bathes in it. That\'s the whole point of the effect.'
      }
    ]
  },

  'vocal-echo-fx': {
    name: 'Vocal with Echo (Dub Echo / Tape Effect)',
    desc: 'A classic dub-echo effect — the vocal repeats and fades away in space. Style: 70s reggae producers, modern dub techno, dark disco. Typical of King Tubby, Lee "Scratch" Perry, and modern artists like Objekt, Skee Mask.',
    steps: [
      {
        role: 'Cutting the lows and highs',
        note: 'HP 150 Hz. LP 10 kHz (imitates tape bandwidth). This makes the echo "dark" and vintage. The main vocal can stay full-range.'
      },
      {
        role: 'Compressor before the delay',
        note: 'Ratio 4:1, Attack 5 ms, Release 80 ms, GR 4–6 dB. A compressed signal in the delay gives more even repeats — a professional dub approach.'
      },
      {
        role: 'Tape saturation',
        note: 'Tape mode, Drive 20–30%, Mix 100% (before the delay). Adds a wow & flutter feel. Can be placed in a Send Chain before the delay for a "worn tape" effect.'
      },
      {
        role: 'Main dub delay',
        note: 'Delay Bank: two taps — 3/8 (60% feedback) and 6/8 (30% feedback). Enable Ping-Pong for a chaotic stereo spread. Feedback should flow into the reverb — a classic dub mix move.'
      },
      {
        role: 'Reverb on the echo tail',
        note: 'Large Room or Plate, Decay 2–3 sec, Mix 30%. The reverb is placed after the delay in the Send — the echo "drowns" in reverb. Creates a sense of a deep tunnel.'
      }
    ]
  },

  'vocal-bg-texture': {
    name: 'Background Vocal (Background Texture)',
    desc: 'The vocal becomes an atmospheric background sound, almost like a synth pad. Works as a layer under the main vocal or as a standalone arrangement element. Style: Sigur Rós, Burial, Jon Hopkins, Four Tet.',
    steps: [
      {
        role: 'Pitch correction and robotization',
        note: 'Speed 100% (instant correction) — creates an artificial character. Or the opposite: Speed 0 + Correction 60% for a floating pitch. Experiment with both.'
      },
      {
        role: 'Cutting all "vocal" frequencies',
        note: 'HP 300–400 Hz — removes speech intelligibility. LP 6–8 kHz — removes "air". Goal: keep only the "essence" — tone without words. The vocal becomes an instrument.'
      },
      {
        role: 'Chorus for spatial decomposition',
        note: 'Depth 60–80%, slow Rate (0.3–0.5 Hz), maximum Stereo Separation. The chorus smears the pitch and creates a sense of several voices/unison.'
      },
      {
        role: 'Grain and time artifacts',
        note: 'Time envelope: frozen or reversed — creates a grain effect without a granular synth. Pitch: weak LFO. Mix 40–60%. Adds "brokenness" and texture.'
      },
      {
        role: 'Huge reverb — the vocal sinks',
        note: 'Decay 6–10 sec, Character 9–10, Size Very Large. Pre-delay 0 ms. Mix 70–90% — the original is barely audible, only a cloud remains. Post EQ: HPF 400 Hz.'
      },
      {
        role: 'Level and smoothness',
        note: 'Low Band Limiter: remove lows that the reverb might generate. Overall: a gentle upward compressor to lift the quiet parts of the cloud. Ceiling −12 dB (the background layer should stay quiet).'
      }
    ]
  },

  'vocal-dark-fx': {
    name: 'Dark / Grim Vocal (Dark FX)',
    desc: 'A vocal for dark, grim, or industrial music. Pitched down, distorted, torn texture. Style: Thom Yorke, NIN, Nine Inch Nails, Salem, Zola Jesus, dark ambient.',
    steps: [
      {
        role: 'Pitch down or robotization',
        note: 'Transpose −5 to −12 semitones (depending on the source). Or Speed 100% for a full auto-tune effect. Can be combined — some notes pitched down, some robotized.'
      },
      {
        role: 'Hard saturation / distortion',
        note: 'Metal or Tube mode (overdriven), Drive 50–80%, Mix 40–60%. Adds aggression and grit. Pair with a Pro-Q 3 after — cut 300–700 Hz to avoid mud.'
      },
      {
        role: 'Pitch & Reverse artifacts',
        note: 'Volume Gate: 1/16 or 1/32 with an uneven pattern — the vocal "cuts off". Pitch: random downward jumps. Reverse on individual notes. Together this creates a "broken" vocal feel.'
      },
      {
        role: 'Tonal deformation',
        note: 'HP 200 Hz. Strong narrow cut @ 1–2 kHz Q=5 (remove intelligibility). Shelf +4 dB @ 8–10 kHz (hissing texture). Bell +6 dB @ 80–100 Hz (depth and menace).'
      },
      {
        role: 'Dark delay with feedback',
        note: 'Feedback 55–65% (almost self-oscillating). Delay 1/4 or 3/8. Filter: LP 1.5 kHz — very dark echo. This delay creates a sense of an endless tunnel.'
      },
      {
        role: 'Dark long reverb',
        note: 'Character 1–2 (dark), Decay 4–8 sec, Size Large. Post EQ: LP 2 kHz on the reverb tail — keeps the space grim, with no air or shine. Mix 35–50%.'
      }
    ]
  },

  'drum-bus': {
    name: 'Drum Bus (Drum Glue)',
    desc: 'A drum group: kick + snare + hats → one dense, unified sound.',
    steps: [
      {
        role: 'Group EQ',
        note: 'HP 30 Hz. Gentle shelf +1.5 dB @ 10 kHz (group air). Bell −2 dB @ 300–500 Hz (remove the "box" tone that builds up from all the drums together).'
      },
      {
        role: 'Glue compressor',
        note: 'Bus mode. Ratio 4:1, Attack 30 ms (let transients through), Release Auto, GR 3–4 dB. Slow Attack is key — transients pass through while the tails get compressed.'
      },
      {
        role: 'After the compressor: restoring attacks',
        note: 'Attack +3 dB after compression — restores the punch the compressor slightly "ate". Sustain −2 dB for density.'
      },
      {
        role: 'Multiband control',
        note: 'Low Band: Compressor (kick bass control). Mid Band: Upward Comp (lift the snare in the mids). High: light touch, leave it alone. Very gentle settings.'
      }
    ]
  },

  'edm-lead': {
    name: 'EDM / Progressive Lead',
    desc: 'A wide, bright lead for Progressive House, Big Room, Future Bass.',
    steps: [
      {
        role: 'EQ + M/S',
        note: 'HP 150 Hz. Bell +3 dB @ 8–10 kHz (shine). M/S mode: Side +2 dB @ 5 kHz (width without affecting the center). Cut 400 Hz Mid Q=3 (remove the supersaw "nasal" tone).'
      },
      {
        role: 'Multiband compression',
        note: 'Depth 40–60%, Time Medium. OTT — the EDM lead standard. Lifts quiet overtones, making the supersaw lively and rich.'
      },
      {
        role: 'Saturation',
        note: 'Tape mode on the Mid band (400–5000 Hz), Drive 25%, Mix 35%. Adds harmonics — the lead "fills" the spectrum.'
      },
      {
        role: 'Stereo width',
        note: 'Style II, Detune 16–22 cents, Mix 80%. For an EDM lead you can go wide. Check mono compatibility!'
      },
      {
        role: 'Brick wall',
        note: 'Transparent, Ceiling −0.5 dB. The lead should be loud without clipping before the master.'
      }
    ]
  }

};


const COMPAT_EN = {

  'pro-q-3__pro-c-2': {
    label: 'Reference chain',
    note: 'EQ before the compressor removes problem frequencies that would make the compressor trigger incorrectly. The foundation of most professional chains. EQ after also works — for tonal balance on an already-compressed signal.'
  },
  'pro-c-2__pro-l-2': {
    label: 'Compressor → Limiter',
    note: 'A mastering classic. The compressor controls dynamics, the limiter catches peaks. Pro-C 2 in Mastering mode → Pro-L 2 Transparent — the final standard sound.'
  },
  'pro-q-3__maximus': {
    label: 'EQ before multiband',
    note: 'Pro-Q 3 does rough tonal correction, Maximus then processes the already-prepared signal by band. Correct order: EQ first, then Maximus.'
  },
  'maximus__pro-l-2': {
    label: 'Mastering duo',
    note: 'Maximus as a multiband pre-limiter, Pro-L 2 as the final brick-wall. Maximus shouldn\'t replace Pro-L 2 — its limiter is less transparent on the full signal.'
  },
  'pro-q-3__pro-l-2': {
    label: 'Correction → Limit',
    note: 'A solid chain for quick mastering. Pro-Q 3 removes the excess, Pro-L 2 holds the loudness. Without intermediate compression, the limiter will work harder.'
  },

  'saturn-2__pro-c-2': {
    label: 'Saturation → Compression',
    note: 'Saturn 2 adds harmonics and slightly raises RMS. The compressor after it controls the dynamics of the now-saturated signal. A good order — saturation creates character, the compressor "glues" it.'
  },
  'ott__saturn-2': {
    label: 'Three-band contrast',
    note: 'OTT lifts the quiet parts of the spectrum, Saturn 2 adds warmth. Works well on synths and leads. Watch the overall level — both plugins increase perceived loudness.'
  },
  'ott__sausage-fattener': {
    label: 'Caution: overload',
    note: 'Both plugins raise level and add harmonics. Together it\'s easy to get an unpleasant, "plasticky" over-saturation. If using both, lower OTT Depth to 20–25% and Sausage Colour to 30%.'
  },
  'wave-shaper__pro-c-2': {
    label: 'Distortion → Compression',
    note: 'Distortion makes the dynamics unpredictable. The compressor after it normalizes levels. Standard for aggressive bass and kicks in Hi Techno.'
  },
  'hardcore__pro-q-3': {
    label: 'Amp → Cleanup',
    note: 'Hardcore creates a lot of harmonics, including unwanted ones. Pro-Q 3 after it removes the unpleasant frequencies the amp added. Always place an EQ after distortion.'
  },
  'sausage-fattener__pro-l-2': {
    label: 'Fattener → Limiter',
    note: 'Sausage Fattener raises the level, Pro-L 2 holds the ceiling. A common pair on buses and masters in EDM. Just don\'t overdo the Colour knob.'
  },

  'pro-r__timeless-3': {
    label: 'Reverb + Delay',
    note: 'A classic spatial pair. Put the delay BEFORE the reverb — then the repeats "live" inside the reverberation. Delay AFTER reverb — the repeats are clean over the space. Two different effects.'
  },
  'fruity-reeverb-2__timeless-3': {
    label: 'Native spatial pairing',
    note: 'A budget alternative to the Pro-R + Timeless combo. Both native — low CPU. Order: Delay → Reverb.'
  },
  'pro-r__pro-r': {
    label: 'Double reverb',
    note: 'Sometimes two reverbs are used: a short one first (room), a long one second (hall). But it\'s easy to get "mud". Use Pre-Delay and Post EQ on both — cut sub-bass and high frequencies on the tail.'
  },

  'microshift__fruity-stereo-enhancer': {
    label: 'Double widening — be careful',
    note: 'MicroShift and Stereo Enhancer both widen the stereo field using different methods. Together they create huge width but with a high risk of phase issues. Check in mono — if the signal disappears, remove one of them.'
  },
  'microshift__pro-q-3': {
    label: 'Width + EQ control',
    note: 'Pro-Q 3 in M/S mode after MicroShift lets you correct only the widened part (Side). You can cut sub-bass in Side — the bass stays mono despite the widening.'
  },

  'pro-c-2__transient-processor': {
    label: 'Compressor → Transient',
    note: 'The compressor slightly "eats" the instrument\'s attack. Transient Processor after it restores the punch. Classic for a Drum Bus: glue first, then bring back the punch.'
  },
  'fruity-compressor__pro-l-2': {
    label: 'Native dynamics',
    note: 'FL\'s native compressor + a professional limiter. An economical pair. Fruity Compressor in RMS mode controls dynamics, Pro-L 2 holds the ceiling.'
  },
  'maximus__maximus': {
    label: 'Don\'t stack two Maximus',
    note: 'Two Maximus instances in a chain is overprocessing. Multiband compression artifacts add up. One Maximus with the right settings always beats two.'
  },
  'ott__ott': {
    label: 'Stacked OTT — a working trick',
    note: 'Two OTTs at very low Depth (15–25% each) — cleaner and more musical than one OTT at 50%. The first creates balance, the second polishes it. Popular on EDM leads.'
  },

  'fruity-love-philter__pro-r': {
    label: 'Movement + Space',
    note: 'Love Philter creates movement (LFO on the filter), Pro-R places that movement in space. Perfect for pads in Melodic Techno — the sound "lives" and "breathes".'
  },
  'volcano-3__pro-c-2': {
    label: 'Filter → Compressor',
    note: 'Volcano creates a resonant filter with sharp peaks. The compressor after it tames those peaks — the sound keeps the filter\'s character but becomes controllable.'
  },

  'fruity-peak-controller__pro-c-2': {
    label: 'Native SC vs SC-compressor',
    note: 'Peak Controller — for controlling parameters (Volume, Cutoff). Pro-C 2 with External SC — for real sidechain compression (ducking driven by the compressor\'s envelope). Different jobs, they don\'t compete.'
  },
  'pro-q-3__pro-q-3': {
    label: 'Two EQs — different jobs',
    note: 'Two Pro-Q 3 instances in a chain is standard practice. The first (Static EQ): rough correction, HP/LP. The second (Dynamic EQ): surgical dynamic bands. Or: one before the compressor, one after.'
  }

};


const QUIZ_EN = {
  questions: {
    q_what: {
      text: 'What are you processing?',
      answers: [
        'Kick / Drums',
        'Bass / 808',
        'Synth Lead',
        'Pad / Atmosphere',
        'Vocal',
        'Full Mix / Master'
      ]
    },
    q_drum_task: {
      text: 'What\'s the task with the drums?',
      answers: [
        'More punch',
        'Glue the whole group',
        'Distortion / aggression',
        'Tonal correction'
      ]
    },
    q_bass_style: {
      text: 'Music style?',
      answers: [
        'Melodic Techno',
        'Hi / Hard Techno',
        'EDM / House',
        'Any / universal'
      ]
    },
    q_lead_style: {
      text: 'What character should the lead have?',
      answers: [
        'Warm, melodic',
        'Aggressive, raw',
        'Wide, big',
        'With movement / filter'
      ]
    },
    q_pad_task: {
      text: 'What does the pad need?',
      answers: [
        'Space and depth',
        'Movement and life',
        'Stereo width'
      ]
    },
    q_vocal_style: {
      text: 'What effect does the vocal need?',
      answers: [
        'Atmospheric / vibey',
        'With echo / dub effect',
        'Background / texture',
        'Dark / grim'
      ]
    },
    q_master_genre: {
      text: 'Master genre / style?',
      answers: [
        'Melodic Techno',
        'Hi / Hard Techno',
        'EDM / House',
        'Any / general'
      ]
    }
  },

  results: {
    r_drum_punch: {
      title: 'Punch — enhancing the hit',
      tips: [
        'Transient Processor: Attack +4 dB, Sustain −2 dB',
        'Pro-C 2 Punch mode, Attack 8 ms (lets the hit through), Release 80 ms',
        'Pro-Q 3: Bell +3 dB @ 4–5 kHz for attack "click"'
      ]
    },
    r_drum_bus: {
      title: 'Drum Bus — group glue',
      tips: [
        'Pro-C 2 Bus mode, Attack 30 ms (slow!), GR 3–4 dB',
        'Pro-Q 3: +1.5 dB shelf @ 10 kHz, −2 dB @ 300 Hz',
        'Transient Processor after the compressor: bring back the punch'
      ]
    },
    r_drum_dist: {
      title: 'Aggressive drums',
      tips: [
        'Wave Shaper: Soft Clip, Drive 35–50%, parallel Mix 60%',
        'Saturn 2: Amp mode on the High band for metallic crunch',
        'Classic compressor after the distortion for control'
      ]
    },
    r_drum_eq: {
      title: 'Drum tonal correction',
      tips: [
        'Pro-Q 3: Alt+drag for solo resonance hunting',
        'HP 30–40 Hz on every drum (remove infra)',
        'Bell −3 dB @ 300–400 Hz removes kick "cardboard" tone'
      ]
    },
    r_bass_mt: {
      title: 'Melodic Techno — Bass',
      tips: [
        'M/S EQ: Side HPF 200 Hz — sub-bass strictly mono',
        'Saturn 2 Tape only on the Mid band for harmonics',
        'Peak Controller sidechain from the kick — kick and bass don\'t compete'
      ]
    },
    r_bass_ht: {
      title: 'Hi Techno — Distorted Bass',
      tips: [
        'EQ before distortion: cut 400–600 Hz to avoid amplifying it',
        'Wave Shaper Hard Clip, parallel Mix — keeps the sub-bass intact',
        'Second Pro-Q 3 after distortion: cleans up IM artifacts'
      ]
    },
    r_bass_edm: {
      title: 'EDM Bass',
      tips: [
        'OTT Depth 30% to saturate the sub',
        'Sausage Fattener: Colour only (not Fatten) on the sub',
        'M/S EQ: sub-bass below 120 Hz always mono'
      ]
    },
    r_bass_uni: {
      title: 'Universal bass chain',
      tips: [
        'EQ → Compressor → Limiter — basic order',
        'M/S: Side HPF 150–200 Hz on any genre',
        'Pro-C 2 Clean mode, GR 3–5 dB'
      ]
    },
    r_lead_warm: {
      title: 'Warm Melodic Lead',
      tips: [
        'Saturn 2 Tube mode, Mix 40–50% — synth organic character',
        'Pro-C 2 Opto, Attack 25 ms — gentle compression with character',
        'Pro-R Character 6–7, Pre-Delay 22 ms for depth'
      ]
    },
    r_lead_raw: {
      title: 'Aggressive Raw Lead',
      tips: [
        'Hardcore: aggressive amp + Cabinet for a guitar-like character',
        'Pro-C 2 Classic Ratio 10:1 — hypnotic monotony',
        'OTT 30–40% after the compressor — vibrating texture'
      ]
    },
    r_lead_wide: {
      title: 'Wide EDM Lead',
      tips: [
        'MicroShift Style II, Detune 16–22 cents for maximum width',
        'Check in mono after every widening step',
        'OTT 40–50% lifts the supersaw overtones'
      ]
    },
    r_lead_filter: {
      title: 'Lead with filter movement',
      tips: [
        'Love Philter: LFO on Cutoff 0.2–0.5 Hz, sine',
        'Volcano 3 with resonance — sharp peaks, then a compressor',
        'Pro-R after the filter: the movement "lives" in space'
      ]
    },
    r_pad_space: {
      title: 'Atmospheric Pad — Space',
      tips: [
        'Pro-R Size Large, Decay 4–6 sec, Character closer to Vintage',
        'Pre-Delay 5 ms + M/S EQ: Side HP 200 Hz',
        'Timeless 3 Feedback 40–45% — shimmering repeats'
      ]
    },
    r_pad_movement: {
      title: 'Pad with movement',
      tips: [
        'Love Philter LFO 0.08 Hz — very slow "breathing"',
        'Timeless 3 with Modulation — the delay "drifts"',
        'Gross Beat Volume envelope for rhythmic patterns'
      ]
    },
    r_pad_wide: {
      title: 'Wide pad',
      tips: [
        'MicroShift for a wide pad — phase-safe widening',
        'M/S EQ after: Side HP 200 Hz — the low end stays centered',
        'Fruity Stereo Enhancer no more than 60% to avoid phase issues'
      ]
    },
    r_master_mt: {
      title: 'Master: Melodic Techno',
      tips: [
        'Pro-C 2 Mastering: no more than 1.5 dB GR on the master',
        'Ozone Imager: Side +10% above 200 Hz for width',
        'Pro-L 2 Transparent, LUFS −10 for streaming'
      ]
    },
    r_master_ht: {
      title: 'Master: Hi Techno',
      tips: [
        'Pro-C 2 Bus: GR 2–3 dB for glue',
        'Maximus: Low Band Limiter for sub-bass control',
        'Pro-L 2 Aggressive, LUFS −8 (club), GR up to 5–6 dB'
      ]
    },
    r_master_edm: {
      title: 'Master: EDM / House',
      tips: [
        'Pro-C 2 Bus Ratio 3:1 for glue',
        'Maximus Mid: Upward Compression for detail',
        'Pro-L 2 Aggressive, Ceiling −0.5 dBTP, LUFS −9'
      ]
    },
    r_master_uni: {
      title: 'Universal master chain',
      tips: [
        'EQ → Comp → Multiband → Limiter — standard order',
        'Compensate level at each step (Auto Gain in Pro-C 2)',
        'Pro-L 2 Transparent, True Peak −1.0 dBTP for streaming'
      ]
    },
    r_vocal_atmospheric: {
      title: 'Atmospheric / vibey vocal',
      tips: [
        'Pro-R: Decay 3–5 sec, Size Large, Mix 40–60% — the vocal bathes in space',
        'Fruity Delay 3: ping-pong 3/8, Feedback 40%, LPF 4 kHz on the echo',
        'Pro-C 2 Opto mode, Ratio 2:1, GR 2–3 dB — don\'t kill the breath',
        'Saturn 2 Tape: Drive 10%, Mix 20% — analog warmth'
      ]
    },
    r_vocal_echo: {
      title: 'Vocal with Dub Echo',
      tips: [
        'Saturn 2 Tape on a Send before the delay — imitates worn tape',
        'Delay Bank: 3/8 Feedback 60% + 6/8 Feedback 30%, Ping-Pong',
        'Place the reverb after the delay in the Send — the echo "drowns" in space',
        'Pro-Q 3: LP 10 kHz on the delay channel — the echo should be darker than the original'
      ]
    },
    r_vocal_bg: {
      title: 'Background vocal / texture',
      tips: [
        'HP 300–400 Hz in Pro-Q 3 — removes intelligibility, keeps the tone',
        'Fruity Chorus: Rate 0.3–0.5 Hz, Depth 70%, maximum stereo',
        'Pro-R: Decay 6–10 sec, Mix 70–90% — the vocal dissolves into a cloud',
        'Newtone Speed 100% for robotization or Speed 0 for a floating pitch'
      ]
    },
    r_vocal_dark: {
      title: 'Dark / grim vocal',
      tips: [
        'Newtone: Transpose −5 to −12 semitones for a dark character',
        'Saturn 2 Metal/Tube: Drive 50–80% — aggressive saturation',
        'Gross Beat: Volume Gate 1/16 uneven + downward Pitch LFO',
        'Pro-R Character 1–2 (dark), Post LP 2 kHz — space without shine'
      ]
    }
  }
};
