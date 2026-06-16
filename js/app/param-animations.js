/* ============================================================
   ANIMATED PARAM PREVIEWS
   ============================================================ */

  /* ============================================================
     ANIMATED PARAM PREVIEWS
  ============================================================ */

  /* SVG helpers — 80×44px каждый */
  const W = 80, H = 44, MID = H / 2;

  function svgWrap(content, label) {
    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="var(--bg-3)" rx="4"/>
      ${content}
      ${label ? `<text x="${W/2}" y="${H-3}" text-anchor="middle" font-size="7.5" fill="var(--text-3)">${label}</text>` : ''}
    </svg>`;
  }

  /* ── EQ & Frequency ── */
  function svgFreq() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M0,${MID} L${W*0.28},${MID} Q${W*0.5},${MID-22} ${W*0.62},${MID} L${W},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:eq-peak 1.4s ease-in-out infinite"/>
  `, 'Hz ↔'); }

  function svgGain() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <rect x="${W*0.38}" y="${MID-18}" width="10" height="18" rx="2"
          fill="var(--accent)" opacity="0.7"
          style="transform-origin:${W*0.43}px ${MID}px;animation:wave-compress 1.2s ease-in-out infinite"/>
    <rect x="${W*0.38}" y="${MID}" width="10" height="8" rx="2" fill="var(--accent)" opacity="0.3"/>
  `, 'dB ↕'); }

  function svgQ() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M8,${MID} Q${W*0.3},${MID-20} ${W*0.5},${MID} Q${W*0.7},${MID-20} ${W-8},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:eq-peak 1.6s ease-in-out infinite alternate"/>
  `, 'ширина'); }

  function svgHP() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M0,${H-6} L${W*0.35},${H-6} Q${W*0.48},${H-6} ${W*0.55},${MID} L${W},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <text x="12" y="${MID-4}" font-size="7" fill="var(--accent)" opacity="0.6">cut</text>
  `, 'high pass'); }

  function svgLP() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M0,${MID} L${W*0.45},${MID} Q${W*0.55},${MID} ${W*0.62},${H-6} L${W},${H-6}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <text x="${W-14}" y="${MID-4}" font-size="7" fill="var(--accent)" opacity="0.6">cut</text>
  `, 'low pass'); }

  function svgShelf() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M0,${MID+8} L${W*0.35},${MID+8} Q${W*0.5},${MID+8} ${W*0.58},${MID-8} L${W},${MID-8}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:thresh-line 1.8s ease-in-out infinite"/>
  `, 'shelf'); }

  function svgFilterType() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M4,${MID} L${W*0.22},${MID} Q${W*0.34},${MID-16} ${W*0.4},${MID} L${W*0.55},${MID}"
          stroke="var(--accent)" stroke-width="1.2" fill="none" opacity="0.5"/>
    <path d="M${W*0.48},${MID} L${W*0.55},${MID} Q${W*0.62},${MID} ${W*0.68},${H-6} L${W},${H-6}"
          stroke="#5B9BD5" stroke-width="1.2" fill="none" opacity="0.7"/>
  `, 'тип фильтра'); }

  /* ── Dynamics ── */
  function svgRatio() { return svgWrap(`
    <line x1="10" y1="${H-8}" x2="${W-10}" y2="8" stroke="var(--border-2)" stroke-width="1"/>
    <path d="M10,${H-8} L${W*0.45},${H-8} L${W-10},${H*0.38}"
          stroke="var(--accent)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
          style="animation:ratio-slope 1.5s ease-in-out infinite alternate"/>
  `, 'ratio'); }

  function svgThreshold() { return svgWrap(`
    <rect x="8" y="${H*0.28}" width="${W-16}" height="${H*0.52}" rx="2" fill="var(--accent)" opacity="0.1"/>
    <line x1="8" y1="${H*0.28}" x2="${W-8}" y2="${H*0.28}"
          stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3,2"
          style="animation:thresh-line 1.4s ease-in-out infinite"/>
    <path d="M8,${H-8} L${W*0.35},${H-8} L${W*0.42},${H*0.28} L${W-8},${H*0.28}"
          stroke="var(--border-2)" stroke-width="1" fill="none"/>
  `, 'порог'); }

  function svgAttack() { return svgWrap(`
    <path d="M8,${H-8} L${W*0.45},8 L${W-8},${H*0.5}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${W*0.45}" cy="8" r="2.5" fill="var(--accent)"
            style="animation:wave-compress 1.2s ease-in-out infinite"/>
  `, 'attack'); }

  function svgRelease() { return svgWrap(`
    <path d="M8,8 L${W*0.28},8 Q${W*0.72},8 ${W-8},${H-8}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <circle cx="${W-8}" cy="${H-8}" r="2" fill="var(--accent)" opacity="0.6"
            style="animation:wave-compress 1.5s ease-in-out infinite"/>
  `, 'release'); }

  function svgKnee() { return svgWrap(`
    <line x1="10" y1="${H-8}" x2="${W-10}" y2="8" stroke="var(--border-2)" stroke-width="1"/>
    <path d="M10,${H-8} L${W*0.4},${H-8} Q${W*0.5},${H-8} ${W*0.55},${H*0.5} L${W-10},${H*0.5}"
          stroke="var(--accent)" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  `, 'soft knee'); }

  function svgLookahead() { return svgWrap(`
    <path d="M8,${MID} L${W*0.45},${MID} L${W*0.45},${H*0.2} L${W-8},${H*0.2}"
          stroke="var(--border-2)" stroke-width="1" fill="none"/>
    <rect x="${W*0.3}" y="${H*0.18}" width="4" height="${H*0.64}" rx="2"
          fill="var(--accent)" opacity="0.8"
          style="animation:lfo-wave 1.4s linear infinite"/>
    <text x="${W*0.55}" y="${H*0.18}" font-size="7" fill="var(--accent)" opacity="0.7">▶</text>
  `, 'lookahead'); }

  function svgExpander() { return svgWrap(`
    <line x1="10" y1="${H-8}" x2="${W-10}" y2="8" stroke="var(--border-2)" stroke-width="1"/>
    <path d="M10,${H-8} L${W*0.4},${H*0.6} L${W-10},8"
          stroke="var(--accent)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
          style="animation:ratio-slope 1.7s ease-in-out infinite alternate"/>
  `, 'upward expand'); }

  function svgPumping() { return svgWrap(`
    <path d="M4,${MID} L${W*0.18},${H*0.15} L${W*0.18},${H-8} L${W*0.38},${H*0.15} L${W*0.38},${H-8} L${W*0.58},${H*0.15} L${W*0.58},${H-8} L${W},${MID}"
          stroke="var(--accent)" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"
          style="animation:wave-compress 0.8s ease-in-out infinite"/>
  `, 'pumping'); }

  /* ── Space / Time ── */
  function svgDecay() { return svgWrap(`
    <path d="M8,8 Q${W*0.28},8 ${W-8},${H-8}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:decay-env 1.6s ease-in-out infinite"/>
    <path d="M8,8 L${W-8},8" stroke="var(--border-2)" stroke-width="0.5" stroke-dasharray="2,3"/>
  `, 'decay'); }

  function svgPreDelay() { return svgWrap(`
    <rect x="8" y="${MID-4}" width="${W*0.3}" height="8" rx="2" fill="var(--border-2)"/>
    <text x="${W*0.19}" y="${MID+3}" text-anchor="middle" font-size="7" fill="var(--text-3)">gap</text>
    <path d="M${W*0.42},8 Q${W*0.55},8 ${W-8},${H-8}" stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <circle cx="${W*0.42}" cy="${MID}" r="2.5" fill="var(--accent)"/>
  `, 'pre-delay'); }

  function svgCharacter() { return svgWrap(`
    <path d="M8,${H-8} L${W*0.2},${H*0.5} L${W*0.35},${H*0.25} L${W*0.5},${H*0.4} L${W*0.65},${H*0.2} L${W*0.75},${H*0.35} L${W-8},${H*0.5}"
          stroke="var(--accent)" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M8,${H-8} Q${W*0.3},${H*0.6} ${W*0.55},${H*0.35} Q${W*0.75},${H*0.1} ${W-8},${H*0.4}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:decay-env 2s ease-in-out infinite"/>
  `, 'diffusion'); }

  function svgDistance() { return svgWrap(`
    <circle cx="${W*0.25}" cy="${MID}" r="4" fill="var(--accent)" opacity="0.9"/>
    <circle cx="${W*0.6}" cy="${MID}" r="4" fill="var(--border-2)" opacity="0.5"
            style="animation:width-pulse 1.5s ease-in-out infinite"/>
    <path d="M${W*0.3},${MID} L${W*0.55},${MID}" stroke="var(--border-2)" stroke-width="1"
          stroke-dasharray="2,2"/>
    <text x="${W*0.25}" y="${H-4}" text-anchor="middle" font-size="7" fill="var(--accent)">src</text>
    <text x="${W*0.6}" y="${H-4}" text-anchor="middle" font-size="7" fill="var(--text-3)">far</text>
  `, 'distance'); }

  /* ── Mix / Volume / Level ── */
  function svgMix() { return svgWrap(`
    <rect x="8" y="${H*0.3}" width="${W-16}" height="7" rx="3" fill="var(--border-2)"/>
    <rect x="8" y="${H*0.3}" width="${(W-16)*0.65}" height="7" rx="3" fill="var(--accent)"
          style="animation:width-pulse 1.3s ease-in-out infinite"/>
    <text x="8" y="${H*0.3}-3" font-size="7" fill="var(--text-3)">dry</text>
    <text x="${W-8}" y="${H*0.3}-3" text-anchor="end" font-size="7" fill="var(--accent)">wet</text>
  `, 'dry/wet'); }

  function svgVolume() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M8,${H-6} L${W*0.45},${H-6} L${W*0.45},${MID-10} L${W-8},${MID-10}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="${W*0.43}" y="${MID-12}" width="4" height="${H*0.5}" rx="1"
          fill="var(--accent)" opacity="0.3"/>
  `, 'volume'); }

  /* ── Drive / Saturation styles ── */
  function svgDrive() { return svgWrap(`
    <path d="M6,${MID} C${W*0.2},${MID} ${W*0.3},${H*0.1} ${W*0.38},${H*0.1} C${W*0.46},${H*0.1} ${W*0.46},${H*0.9} ${W*0.54},${H*0.9} C${W*0.62},${H*0.9} ${W*0.7},${MID} ${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.3" fill="none"
          style="animation:wave-compress 1s ease-in-out infinite"/>
  `, 'drive'); }

  function svgTape() { return svgWrap(`
    <path d="M6,${MID} C${W*0.2},${MID} ${W*0.28},${H*0.15} ${W*0.38},${H*0.15} C${W*0.5},${H*0.15} ${W*0.5},${H*0.85} ${W*0.62},${H*0.85} C${W*0.72},${H*0.85} ${W*0.8},${MID} ${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.3" fill="none" opacity="0.7"/>
    <path d="M6,${MID} Q${W*0.3},${MID-10} ${W*0.5},${MID} Q${W*0.7},${MID+10} ${W-6},${MID}"
          stroke="#c45d0f" stroke-width="0.8" fill="none" opacity="0.4"/>
  `, 'tape warm'); }

  function svgTube() { return svgWrap(`
    <ellipse cx="${W/2}" cy="${MID}" rx="16" ry="12" fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.3"/>
    <path d="M${W*0.3},${H-6} Q${W*0.4},${H*0.15} ${W*0.5},${H-6} Q${W*0.6},${H*0.15} ${W*0.7},${H-6}"
          stroke="var(--accent)" stroke-width="1.3" fill="none"
          style="animation:wave-compress 1.4s ease-in-out infinite"/>
  `, 'tube'); }

  function svgBitCrush() { return svgWrap(`
    <path d="M6,${MID} L${W*0.15},${MID} L${W*0.15},${H*0.2} L${W*0.28},${H*0.2} L${W*0.28},${H*0.75} L${W*0.42},${H*0.75} L${W*0.42},${H*0.2} L${W*0.56},${H*0.2} L${W*0.56},${H*0.6} L${W*0.7},${H*0.6} L${W*0.7},${MID} L${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="square"/>
  `, 'bit crush'); }

  function svgFuzz() { return svgWrap(`
    <path d="M6,${MID} L${W*0.15},${H*0.1} L${W*0.22},${H*0.9} L${W*0.3},${H*0.1} L${W*0.38},${H*0.9} L${W*0.46},${H*0.1} L${W*0.54},${H*0.9} L${W*0.62},${H*0.1} L${W*0.7},${H*0.9} L${W*0.78},${H*0.1} L${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1" fill="none" opacity="0.9"/>
  `, 'fuzz'); }

  /* ── Algorithm Modes ── */
  function svgModeClean() { return svgWrap(`
    <path d="M6,${MID} Q${W*0.25},${H*0.25} ${W/2},${MID} Q${W*0.75},${H*0.75} ${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <path d="M6,${MID} Q${W*0.25},${H*0.3} ${W/2},${MID} Q${W*0.75},${H*0.7} ${W-6},${MID}"
          stroke="var(--accent)" stroke-width="0.5" fill="none" opacity="0.3"/>
  `, 'clean'); }

  function svgModeClassic() { return svgWrap(`
    <path d="M6,${MID} L${W*0.2},${H*0.12} L${W*0.38},${H*0.12} L${W*0.38},${H*0.88} L${W*0.56},${H*0.88} L${W*0.56},${H*0.12} L${W*0.74},${H*0.12} L${W*0.74},${MID} L${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.3" fill="none"/>
  `, 'VCA'); }

  function svgModeOpto() { return svgWrap(`
    <path d="M6,${MID} Q${W*0.15},${H*0.2} ${W*0.35},${H*0.2} Q${W*0.65},${H*0.2} ${W*0.75},${H*0.7} Q${W*0.85},${H*0.9} ${W-6},${H*0.9}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:decay-env 2s ease-in-out infinite"/>
  `, 'opto'); }

  function svgModePunch() { return svgWrap(`
    <path d="M6,${MID} L${W*0.25},${H*0.1} L${W*0.32},${H-6} L${W*0.5},${MID} L${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"
          style="animation:wave-compress 0.9s ease-in-out infinite"/>
  `, 'punch'); }

  function svgModeGeneric() { return svgWrap(`
    <circle cx="${W*0.28}" cy="${MID}" r="5" fill="var(--border-2)" stroke="var(--border-2)" stroke-width="1"/>
    <circle cx="${W*0.5}" cy="${MID}" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1" opacity="0.8"
            style="animation:wave-compress 1.3s ease-in-out infinite"/>
    <circle cx="${W*0.72}" cy="${MID}" r="5" fill="var(--border-2)" stroke="var(--border-2)" stroke-width="1"/>
  `, 'mode'); }

  /* ── Delay / Modulation ── */
  function svgFeedback() { return svgWrap(`
    <path d="M8,${H*0.35} Q${W*0.35},${H*0.1} ${W*0.6},${H*0.35} Q${W*0.85},${H*0.6} ${W*0.6},${H*0.75} Q${W*0.35},${H*0.9} ${W*0.15},${H*0.75}"
          stroke="var(--accent)" stroke-width="1.3" fill="none"
          style="animation:lfo-wave 2s linear infinite"/>
    <polygon points="${W*0.13},${H*0.68} ${W*0.1},${H*0.8} ${W*0.22},${H*0.76}"
             fill="var(--accent)" opacity="0.7"/>
  `, 'feedback'); }

  function svgPitch() { return svgWrap(`
    <path d="M8,${H-6} Q${W*0.35},${H-6} ${W*0.5},${MID} Q${W*0.65},6 ${W-8},6"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <circle cx="${W*0.5}" cy="${MID}" r="3" fill="var(--accent)"
            style="animation:thresh-line 1.2s ease-in-out infinite"/>
    <text x="12" y="${H-4}" font-size="7" fill="var(--text-3)">♭</text>
    <text x="${W-12}" y="12" text-anchor="end" font-size="7" fill="var(--text-3)">♯</text>
  `, 'pitch'); }

  function svgFreeze() { return svgWrap(`
    <path d="M8,${MID} L${W-8},${MID}" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3,3"/>
    <rect x="${W*0.35}" y="${H*0.2}" width="${W*0.3}" height="${H*0.6}" rx="2"
          fill="var(--accent)" opacity="0.15" stroke="var(--accent)" stroke-width="1"/>
    <text x="${W/2}" y="${MID+3}" text-anchor="middle" font-size="8" fill="var(--accent)" opacity="0.7">⏸</text>
  `, 'freeze'); }

  function svgLFO() { return svgWrap(`
    <clipPath id="lfo-clip"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath>
    <g clip-path="url(#lfo-clip)" style="animation:lfo-wave 1.2s linear infinite">
      <path d="M-20,${MID} Q-10,8 0,${MID} Q10,${H-8} 20,${MID} Q30,8 40,${MID} Q50,${H-8} 60,${MID} Q70,8 80,${MID} Q90,${H-8} 100,${MID}"
            stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    </g>
  `, 'LFO'); }

  /* ── Stereo ── */
  function svgWidth() { return svgWrap(`
    <ellipse cx="${W/2}" cy="${MID}" rx="11" ry="${MID-9}" stroke="var(--border-2)" stroke-width="1" fill="none"/>
    <ellipse cx="${W/2}" cy="${MID}" rx="27" ry="${MID-9}" stroke="var(--accent)" stroke-width="1.5" fill="none"
             style="animation:width-pulse 1.4s ease-in-out infinite"/>
  `, 'stereo'); }

  function svgMS() { return svgWrap(`
    <line x1="${W/2}" y1="6" x2="${W/2}" y2="${H-6}" stroke="var(--accent)" stroke-width="1" opacity="0.5"/>
    <text x="${W*0.25}" y="${MID+3}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent)">M</text>
    <text x="${W*0.75}" y="${MID+3}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--border-2)">S</text>
    <rect x="${W*0.08}" y="${MID-2}" width="${W*0.37}" height="4" rx="2"
          fill="var(--accent)" opacity="0.6"
          style="animation:width-pulse 1.5s ease-in-out infinite"/>
  `, 'mid/side'); }

  /* ── Misc ── */
  function svgSlices() { return svgWrap(`
    ${[1,2,3,4,5,6,7,8].map((n,i) => {
      const x = 8 + i * ((W-16)/8);
      const h = (i % 3 === 0) ? H-14 : (i % 3 === 1) ? H*0.5 : H*0.3;
      return `<rect x="${x}" y="${H-6-h}" width="${((W-16)/8)-2}" height="${h}" rx="1"
              fill="var(--accent)" opacity="${0.3 + (i%3)*0.25}"/>`;
    }).join('')}
  `, 'slices'); }

  function svgHold() { return svgWrap(`
    <path d="M6,${H*0.35} L${W*0.35},${H*0.35} L${W*0.35},${H*0.65} L${W-6},${H*0.65}"
          stroke="var(--border-2)" stroke-width="1" fill="none"/>
    <rect x="${W*0.3}" y="${H*0.2}" width="10" height="${H*0.6}" rx="1"
          fill="var(--accent)" opacity="0.7"
          style="animation:wave-compress 1s steps(1) infinite"/>
  `, 'hold'); }

  function svgAmount() { return svgWrap(`
    <circle cx="${W/2}" cy="${MID}" r="${MID-6}" fill="none" stroke="var(--border-2)" stroke-width="2"/>
    <path d="M${W/2},${MID} L${W/2},${H*0.14}"
          stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round"
          style="transform-origin:${W/2}px ${MID}px; animation:ratio-slope 1.5s ease-in-out infinite alternate"/>
  `, 'amount'); }

  function svgDepth() { return svgWrap(`
    <rect x="8" y="${H*0.28}" width="${W-16}" height="${H*0.5}" rx="3" fill="var(--border-2)" opacity="0.3"/>
    <rect x="8" y="${H*0.28}" width="${(W-16)*0.7}" height="${H*0.5}" rx="3"
          fill="var(--accent)" opacity="0.6"
          style="animation:width-pulse 1.3s ease-in-out infinite"/>
  `, 'depth'); }

  function svgTime() { return svgWrap(`
    <path d="M8,${MID} L${W*0.3},${MID} L${W*0.3},${H*0.2} L${W-8},${H*0.2}"
          stroke="var(--border-2)" stroke-width="1" fill="none" stroke-dasharray="2,3"/>
    <path d="M8,${MID} Q${W*0.25},${MID} ${W*0.5},${H*0.2} L${W-8},${H*0.2}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <circle cx="${W*0.5}" cy="${H*0.2}" r="2.5" fill="var(--accent)"
            style="animation:thresh-line 1.3s ease-in-out infinite"/>
  `, 'time'); }

  /* Универсальный fallback — всегда что-то показывает */
  function svgGeneric(label) {
    const short = label.length > 10 ? label.slice(0, 10) + '…' : label;
    return svgWrap(`
      <path d="M6,${MID} Q${W*0.25},${MID-10} ${W/2},${MID} Q${W*0.75},${MID+10} ${W-6},${MID}"
            stroke="var(--accent)" stroke-width="1.3" fill="none" opacity="0.6"
            style="animation:lfo-wave 2s linear infinite"/>
      <path d="M6,${MID} Q${W*0.25},${MID+8} ${W/2},${MID} Q${W*0.75},${MID-8} ${W-6},${MID}"
            stroke="var(--accent)" stroke-width="0.7" fill="none" opacity="0.3"/>
    `, short);
  }

  /* ── Карта ключевых слов (порядок важен — сверху вниз) ── */
  const PARAM_ANIM_MAP = [
    /* EQ */
    [['high pass','band 1 (hp)','hp)'],    svgHP],
    [['low pass', 'band 7 (lp)','lp)'],    svgLP],
    [['shelf'],                             svgShelf],
    [['bell','band 2','band 3','band 4','band 5','band 6'], svgFreq],
    [['filter type'],                       svgFilterType],
    [['frequency','freq'],                  svgFreq],
    [['bandwidth','q /'],                   svgQ],
    [['gain'],                              svgGain],
    /* Dynamics */
    [['threshold'],                         svgThreshold],
    [['ratio'],                             svgRatio],
    [['attack'],                            svgAttack],
    [['release'],                           svgRelease],
    [['knee'],                              svgKnee],
    [['lookahead'],                         svgLookahead],
    [['expand','upward'],                   svgExpander],
    [['pumping'],                           svgPumping],
    [['punch'],                             svgModePunch],
    [['opto'],                              svgModeOpto],
    [['classic','vca'],                     svgModeClassic],
    [['clean','transparent','surgical','allround','safe'], svgModeClean],
    [['dynamic'],                           svgModeGeneric],
    [['mastering','vocal','bus','aggressive','custom'],    svgModeGeneric],
    /* Saturation */
    [['bit crush','bit-crush'],             svgBitCrush],
    [['fuzz'],                              svgFuzz],
    [['tube'],                              svgTube],
    [['tape'],                              svgTape],
    [['amp','guitar','wave','half wave','full wave'], svgDrive],
    [['drive'],                             svgDrive],
    /* Space */
    [['pre-delay','predelay'],              svgPreDelay],
    [['character','diffus'],                svgCharacter],
    [['distance'],                          svgDistance],
    [['decay rate','decay','size','space'], svgDecay],
    /* Modulation */
    [['feedback'],                          svgFeedback],
    [['pitch'],                             svgPitch],
    [['freeze'],                            svgFreeze],
    [['lfo','rate','mod'],                  svgLFO],
    /* Mix / Level */
    [['mix'],                               svgMix],
    [['volume','output','input','in /','out','level'], svgVolume],
    [['amount'],                            svgAmount],
    [['depth','low / mid','mid / high','low depth','mid depth','high depth'], svgDepth],
    [['time'],                              svgTime],
    /* Stereo */
    [['m/s','mid/side','mid side'],         svgMS],
    [['stereo','width','spread'],           svgWidth],
    /* Misc */
    [['slices'],                            svgSlices],
    [['hold'],                              svgHold],
    [['limit'],                             svgThreshold],
    [['filter'],                            svgFilterType],
  ];

  function getParamAnim(paramName) {
    const lower = paramName.toLowerCase();
    for (const [keys, fn] of PARAM_ANIM_MAP) {
      if (keys.some(k => lower.includes(k))) return fn();
    }
    /* Всегда возвращаем что-то — generic fallback */
    return svgGeneric(paramName);
  }

  function addParamAnimations() {
    document.querySelectorAll('.param-table tbody tr').forEach(row => {
      const nameCell = row.querySelector('td:first-child');
      if (!nameCell || nameCell.dataset.animated) return;
      nameCell.dataset.animated = '1';

      const paramName = nameCell.textContent;
      const svg = getParamAnim(paramName);
      if (!svg) return;

      nameCell.style.position = 'relative';
      const wrap = document.createElement('span');
      wrap.className = 'param-anim-trigger';
      wrap.style.cursor = 'help';
      wrap.innerHTML = nameCell.innerHTML +
        `<span class="param-anim-popup">${svg}</span>`;
      nameCell.innerHTML = '';
      nameCell.appendChild(wrap);
    });
  }

  /* Также при открытии guide-item */
  window.toggleGuideItem_orig = window.toggleGuideItem;
  window.toggleGuideItem = function(el) {
    el.classList.toggle('open');
    setTimeout(addParamAnimations, 50);
  };

