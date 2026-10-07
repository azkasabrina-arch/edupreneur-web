/* Materi 1: Bilangan Berpangkat (lengkap: penjelasan, visual, ringkasan, contoh, latihan, game) */
const sup = (b, n) => `${b}<sup>${n}</sup>`
const fmt = v => Number(v).toLocaleString('id-ID')

document.head.insertAdjacentHTML('beforeend', `<style>
  .rantai { display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin:14px 0; min-height:56px }
  .chip { min-width:48px; height:48px; padding:0 8px; border-radius:14px; background:#6c4cf122; border:2px solid var(--p); color:var(--ink); font-weight:800; font-size:1.3rem; display:flex; align-items:center; justify-content:center; animation:pop .35s both }
  .x { font-weight:800; color:var(--muted) }
  @keyframes pop { from { transform:scale(.3); opacity:0 } to { transform:scale(1); opacity:1 } }
  .robot { font-size:3.4rem; text-align:center; transition:transform .3s } .robot.full { animation:pop .5s both; transform:scale(1.2) }
  .tip { background:#16a36a1f; border:2px solid var(--ok); border-radius:12px; padding:10px 14px; margin-top:12px; font-weight:700 }
  .vis .pilih, .pilih { display:flex; gap:16px; flex-wrap:wrap; margin:14px 0 } .pilih label { display:flex; align-items:center; gap:8px; margin:0 } .pilih select { width:auto }
  .hasil { background:linear-gradient(135deg,#6c4cf122,#0ea5e922); border-radius:16px; padding:18px; text-align:center }
  .hasil .besar { font-family:'Baloo 2',sans-serif; font-size:2.6rem; font-weight:800 }
  .grid3 { display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:10px; margin-top:12px }
  .grid3 > div { border:2px solid var(--line); border-radius:14px; padding:12px } .grid3 p { margin:4px 0 0 }
  .navlang { display:flex; justify-content:space-between; gap:8px; margin-top:16px }
  .peta { position:relative; height:880px; margin-top:12px; border-radius:26px; overflow:hidden; border:2px solid var(--line); background:linear-gradient(#b9e4ff, #dff3cf 55%, #f7e7b0) }
  :root[data-theme="dark"] .peta { background:linear-gradient(#1c2860, #1b3d3a 55%, #3b3320) }
  .peta svg { position:absolute; inset:0; width:100%; height:100% }
  .jalur { fill:none; stroke:#fff; stroke-width:5; stroke-dasharray:3 3; stroke-linecap:round; vector-effect:non-scaling-stroke; animation:jalan 1.2s linear infinite }
  @keyframes jalan { to { stroke-dashoffset:-6 } }
  .dek { position:absolute; font-size:2rem; opacity:.85; pointer-events:none }
  .mulai { position:absolute; left:50%; top:10px; transform:translateX(-50%); background:var(--card); color:var(--ink); font-weight:800; font-size:.85rem; padding:4px 12px; border-radius:999px; border:2px solid var(--line) }
  .nd { position:absolute; width:140px; transform:translate(-50%,-40px); background:none; border:0; padding:0; cursor:pointer; font:inherit; color:var(--ink); display:flex; flex-direction:column; align-items:center; gap:8px }
  .nd .bola { position:relative; width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg,var(--c1),var(--c2)); border:4px solid #fff; box-shadow:0 8px 18px #0003; display:flex; align-items:center; justify-content:center; font-size:2.3rem; animation:ambang 2.6s ease-in-out var(--w) infinite; transition:transform .15s }
  .nd:hover .bola, .nd:focus-visible .bola { transform:scale(1.12) } .nd:focus-visible { outline:3px solid var(--p2); outline-offset:4px; border-radius:16px }
  .nd .no { position:absolute; top:-6px; right:-6px; width:28px; height:28px; border-radius:50%; background:var(--ink); color:var(--bg); font-style:normal; font-weight:800; font-size:.9rem; display:flex; align-items:center; justify-content:center; border:2px solid #fff }
  .nd .lb { background:var(--card); border:2px solid var(--line); border-radius:14px; padding:6px 10px; text-align:center; line-height:1.2 }
  .nd .lb b { display:block; font-size:.95rem } .nd .lb small { color:var(--muted); font-size:.78rem }
  @keyframes ambang { 50% { transform:translateY(-7px) } }
  @media (prefers-reduced-motion:reduce) { .jalur, .nd .bola { animation:none } }
</style>`)

document.head.insertAdjacentHTML('beforeend', `<style>
  details.misi { border:2px solid var(--line); border-radius:16px; padding:12px 16px; margin:10px 0; background:var(--card) }
  details.misi summary { font-weight:800; cursor:pointer; font-family:'Baloo 2',sans-serif; font-size:1.1rem }
  details.misi .isi { margin-top:8px } .bub { display:flex; gap:12px; align-items:flex-start } .av { font-size:2.6rem }
  .chip.o { background:#ff7a5933; border-color:#ff7a59 } .chip.b { background:#0ea5e933; border-color:#0ea5e9 } .chip.x { opacity:.35; text-decoration:line-through; border-style:dashed }
  .baris { display:flex; flex-wrap:wrap; gap:6px; margin:8px 0 } .panah { text-align:center; font-weight:800; color:var(--muted) }
  .tabsv { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:8px } .tabsv button { font:inherit; font-weight:800; padding:8px 12px; border-radius:999px; border:2px solid var(--line); background:var(--bg); color:var(--ink); cursor:pointer }
  .tabsv button.on { background:var(--p); color:#fff; border-color:var(--p) }
  .tangga { display:flex; justify-content:space-between; padding:8px 14px; border-radius:12px; background:#6c4cf11f; margin:2px 0; font-weight:800; animation:pop .4s both }
  .tangga.nol { background:#16a36a33; border:2px solid var(--ok) } .turun { text-align:center; color:var(--muted); font-size:.85rem }
  .rute { display:flex; justify-content:space-between; gap:4px; margin-bottom:8px } .ttk { flex:1; text-align:center; padding:6px 2px; border-radius:12px; background:var(--bg); border:2px solid var(--line); font-size:1.3rem }
  .ttk.skrg { border-color:var(--p); background:#6c4cf122; transform:scale(1.06) } .ttk.selesai { background:#16a36a22; border-color:var(--ok) }
  .adegan { position:relative; height:210px; border-radius:20px; overflow:hidden; border:2px solid var(--line) }
  .adegan::after { content:''; position:absolute; left:0; right:0; bottom:0; height:34px; background:#0002 }
  .dk { position:absolute; top:10px; left:0; right:0; text-align:center; font-size:2rem; letter-spacing:18px; opacity:.8 }
  .hero, .mon { position:absolute; bottom:30px; font-size:3.4rem; z-index:2 } .hero { left:12%; animation:ambang 1.4s ease-in-out infinite } .mon { right:12%; font-size:4rem; animation:ambang 2s ease-in-out infinite }
  .hero.lari { animation:lari 1s forwards } .hero.kena { animation:getar .4s } .mon.marah { animation:getar .4s, besar .4s forwards } .mon.luka { animation:getar .5s } .mon.kalah { animation:kalah .8s forwards }
  .hpbar { position:absolute; top:8px; right:12px; z-index:3 }
  .soalbesar { font-size:1.7rem; font-weight:800; margin:6px 0 }
  .pilgrid { display:grid; grid-template-columns:1fr 1fr; gap:8px } .pilgrid .opsi { margin:0; text-align:center; font-size:1.1rem }
  @keyframes lari { to { left:78% } } @keyframes getar { 25% { transform:translateX(-10px) } 75% { transform:translateX(10px) } }
  @keyframes besar { to { transform:scale(1.2) } } @keyframes kalah { to { transform:rotate(540deg) scale(0); opacity:0 } }
  @keyframes jatuh { from { transform:translateY(-30px); opacity:1 } to { transform:translateY(260px); opacity:0 } }
  .konfeti { position:absolute; top:0; font-size:1.6rem; animation:jatuh 2.4s ease-in infinite; pointer-events:none }
  .peti { font-size:4.5rem; text-align:center; animation:pop .6s both }
</style>`)

const ps = t => `<div class="bub"><span class="av">🧙‍♂️</span><div>${t}</div></div>`
const M1 = {
  misi: [
    ['🧙‍♂️ Selamat datang, Petualang!', ps('Halo! Aku <b>Profesor Pangkat</b>. Di Negeri Pangkat, harta karun dijaga angka-angka raksasa seperti 1.024 dan 59.049. Tenang, kamu tidak perlu mengalikannya satu per satu. Kamu cukup menguasai <b>5 jurus</b> bilangan berpangkat. Buka gulungan misi di bawah ini satu per satu, ya!'), true],
    ['⚔️ Jurus 1: Apa itu pangkat?', `<p>Bayangkan 1 bakteri yang membelah jadi 2 setiap jam. Setelah 5 jam jumlahnya 2 × 2 × 2 × 2 × 2 = 32. Menulis perkalian sepanjang itu melelahkan, jadi kita singkat menjadi <b>${sup(2, 5)}</b>.</p>
      <p>Pada ${sup('a', 'n')}: <b>a = basis</b> (angka yang diulang) dan <b>n = pangkat</b> (berapa kali diulang).</p><div class="tip">⚠️ Jebakan! ${sup(2, 3)} bukan 2 × 3 = 6, tetapi 2 × 2 × 2 = 8.</div>`],
    ['➕ Jurus 2: Gabungkan pasukan (dikali)', `<p>Hitung ${sup(2, 3)} × ${sup(2, 4)}. Kalau ditulis panjang: (2×2×2) × (2×2×2×2). Ada 3 + 4 = 7 pasukan angka 2, jadi hasilnya ${sup(2, 7)}.</p>
      <p><b>Basis sama dikali, pangkat dijumlahkan:</b> ${sup('a', 'm')} × ${sup('a', 'n')} = ${sup('a', 'm+n')}. Syaratnya basis harus sama!</p>`],
    ['➗ Jurus 3: Coret pasukan kembar (dibagi)', `<p>Hitung ${sup(2, 5)} ÷ ${sup(2, 2)}. Tulis sebagai pecahan: (2×2×2×2×2) / (2×2). Dua pasukan di atas dicoret dengan dua di bawah, sisa 3 pasukan, jadi ${sup(2, 3)}.</p>
      <p><b>Basis sama dibagi, pangkat dikurangkan:</b> ${sup('a', 'm')} ÷ ${sup('a', 'n')} = ${sup('a', 'm−n')}.</p>`],
    ['🔁 Jurus 4: Pasukan berlapis (pangkat dari pangkat)', `<p>(${sup(2, 3)})<sup>2</sup> artinya ${sup(2, 3)} diulang 2 kali: ${sup(2, 3)} × ${sup(2, 3)} = ${sup(2, 6)}. Jalan pintasnya: kalikan pangkatnya, 3 × 2 = 6.</p>
      <p><b>Pangkat dari pangkat dikalikan:</b> (${sup('a', 'm')})<sup>n</sup> = ${sup('a', 'm×n')}.</p>`],
    ['🪜 Jurus 5: Pangkat nol dan negatif', `<p>Perhatikan tangga ini: ${sup(2, 3)} = 8, ${sup(2, 2)} = 4, ${sup(2, 1)} = 2. Tiap turun satu anak tangga, hasilnya <b>dibagi 2</b>. Lanjutkan: ${sup(2, 0)} = 1, ${sup(2, '−1')} = 1/2, ${sup(2, '−2')} = 1/4.</p>
      <p><b>${sup('a', 0)} = 1</b> dan <b>${sup('a', '−n')} = 1 / ${sup('a', 'n')}</b>. Lihat tangganya bergerak di tab "Nol & Negatif" pada Laboratorium Energi.</p>`]
  ],
  ringkasan: [
    `${sup('a', 'n')} = a × a × ... × a sebanyak n kali. a = basis, n = pangkat.`,
    `Kali, basis sama: ${sup('a', 'm')} × ${sup('a', 'n')} = ${sup('a', 'm+n')} (pangkat dijumlah).`,
    `Bagi, basis sama: ${sup('a', 'm')} ÷ ${sup('a', 'n')} = ${sup('a', 'm−n')} (pangkat dikurang).`,
    `Pangkat dari pangkat: (${sup('a', 'm')})<sup>n</sup> = ${sup('a', 'm×n')} (pangkat dikali).`,
    `Pangkat nol dan negatif: ${sup('a', 0)} = 1 dan ${sup('a', '−n')} = 1 / ${sup('a', 'n')}.`,
    'Ingat: jurus kali dan bagi hanya berlaku kalau <b>basisnya sama</b>.'
  ],
  contoh: [
    { q: `Hitunglah ${sup(3, 4)}.`, l: ['Pangkat 4 berarti angka 3 dikalikan 4 kali: 3 × 3 × 3 × 3.', '3 × 3 = 9.', '9 × 3 = 27.', '27 × 3 = 81.'], j: '81' },
    { q: `Sederhanakan ${sup(2, 3)} × ${sup(2, 5)}.`, l: ['Basis sama (2), jadi gunakan jurus gabung pasukan: pangkat dijumlah.', '3 + 5 = 8, jadi hasilnya 2<sup>8</sup>.', '2<sup>8</sup> = 16 × 16 = 256.'], j: '256' },
    { q: `Sederhanakan ${sup(5, 7)} ÷ ${sup(5, 4)}.`, l: ['Basis sama (5), jadi pangkat dikurangkan.', '7 − 4 = 3, jadi hasilnya 5<sup>3</sup>.', '5 × 5 × 5 = 125.'], j: '125' },
    { q: `Hitunglah (${sup(2, 3)})<sup>2</sup>.`, l: ['Pangkat dari pangkat: pangkatnya dikalikan.', '3 × 2 = 6, jadi hasilnya 2<sup>6</sup>.', 'Cek: 2<sup>3</sup> = 8, lalu 8 × 8 = 64. Hasilnya sama.'], j: '64' },
    { q: `Hitunglah ${sup(4, '−2')}.`, l: ['Pangkat negatif berarti kebalikan: 4<sup>−2</sup> = 1 / 4<sup>2</sup>.', '4<sup>2</sup> = 16.', 'Jadi hasilnya 1/16.'], j: '1/16' },
    { q: 'Satu bakteri membelah jadi 2 setiap jam. Berapa bakteri setelah 6 jam?', l: ['Tiap jam jumlahnya dikali 2, jadi setelah 6 jam: 2<sup>6</sup>.', '2<sup>6</sup> = 2 × 2 × 2 × 2 × 2 × 2.', '2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16, 16 × 2 = 32, 32 × 2 = 64.'], j: '64 bakteri' }
  ],
  soal: [
    { q: `Berapakah nilai ${sup(2, 5)}?`, o: ['10', '25', '32', '64'], j: 2, p: '2 × 2 × 2 × 2 × 2 = 32. Pangkat berarti dikalikan berulang, bukan dikali dengan pangkatnya.' },
    { q: `${sup(3, 2)} × ${sup(3, 3)} = ...`, o: [sup(3, 6), sup(3, 5), sup(9, 5), sup(3, 1)], j: 1, p: 'Basis sama dikali, pangkat dijumlah: 2 + 3 = 5, jadi 3<sup>5</sup>.' },
    { q: `${sup(7, 6)} ÷ ${sup(7, 2)} = ...`, o: [sup(7, 8), sup(7, 3), sup(7, 4), sup(1, 4)], j: 2, p: 'Basis sama dibagi, pangkat dikurang: 6 − 2 = 4, jadi 7<sup>4</sup>.' },
    { q: `(${sup(5, 2)})<sup>3</sup> = ...`, o: [sup(5, 5), sup(5, 6), sup(5, 8), sup(15, 2)], j: 1, p: 'Pangkat dari pangkat dikalikan: 2 × 3 = 6, jadi 5<sup>6</sup>.' },
    { q: `Berapakah nilai ${sup(9, 0)}?`, o: ['0', '1', '9', 'Tidak terdefinisi'], j: 1, p: 'Bilangan apa pun (selain 0) berpangkat nol hasilnya 1.' },
    { q: `${sup(2, '−3')} = ...`, o: ['−8', '−6', '1/6', '1/8'], j: 3, p: 'Pangkat negatif jadi kebalikan: 1 / 2<sup>3</sup> = 1/8.' },
    { q: 'Satu bakteri membelah jadi 2 setiap jam. Berapa banyak bakteri setelah 6 jam?', o: ['12', '32', '64', '128'], j: 2, p: 'Setiap jam dikali 2, jadi 2<sup>6</sup> = 64 bakteri.' }
  ]
}

const LANGKAH1 = [
  { k: 'belajar', ik: '📖', t: 'Perpustakaan Kuno', n: 'Penjelasan & Ringkasan', d: 'Pahami konsep dan rumus pentingnya', c1: '#ff7a59', c2: '#ffb347' },
  { k: 'visual', ik: '🔋', t: 'Laboratorium Energi', n: 'Visual Interaktif', d: 'Lihat pangkat sebagai perkalian berulang', c1: '#6c4cf1', c2: '#a78bfa' },
  { k: 'contoh', ik: '🗺️', t: 'Peta Rahasia', n: 'Contoh Soal', d: 'Pembahasan langkah demi langkah', c1: '#16a36a', c2: '#5ed8a2' },
  { k: 'latihan', ik: '⚔️', t: 'Arena Latihan', n: 'Latihan Interaktif', d: 'Tanpa batas waktu, ada feedback', c1: '#0ea5e9', c2: '#6ee7f9' },
  { k: 'game', ik: '🏰', t: 'Istana Harta Karun', n: 'Game Edukasi', d: 'Power Up Numbers', c1: '#ec4899', c2: '#f9a8d4' }
]
const opt = (a, b, s) => Array.from({ length: b - a + 1 }, (_, i) => `<option ${a + i === s ? 'selected' : ''}>${a + i}</option>`).join('')

function bukaMateri1(m, aktif) {
  window.scrollTo(0, 0)
  const k = LANGKAH1.findIndex(x => x.k === aktif), judul = `<h2>${aman(m.ikon)} ${aman(m.judul)}</h2>`
  if (k < 0) {
    const X = [30, 70, 30, 70, 30], Y = LANGKAH1.map((_, i) => 10 + i * 20)
    let d = `M${X[0]} ${Y[0]}`
    for (let i = 1; i < X.length; i++) { const ym = (Y[i - 1] + Y[i]) / 2; d += ` C${X[i - 1]} ${ym} ${X[i]} ${ym} ${X[i]} ${Y[i]}` }
    $('isi').innerHTML = `<p><button class="btn alt" id="kembali">← Kembali</button></p>${judul}
      <p class="kecil">🧭 Petualangan di Negeri Pangkat. Pilih tempat yang ingin kamu kunjungi dulu, lalu ikuti jalurnya.</p>
      <div class="peta"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" class="jalur"/></svg>
        <span class="dek" style="left:3%;top:3%">☁️</span><span class="dek" style="right:4%;top:20%">⛰️</span><span class="dek" style="left:3%;top:40%">🌴</span>
        <span class="dek" style="right:3%;top:58%">☁️</span><span class="dek" style="left:4%;top:78%">⛰️</span><span class="dek" style="right:4%;top:93%">🌴</span>
        <span class="mulai">🏁 Mulai petualangan</span>
        ${LANGKAH1.map((x, i) => `<button class="nd" style="left:${X[i]}%;top:${Y[i]}%;--c1:${x.c1};--c2:${x.c2};--w:${i * .4}s" data-k="${x.k}" aria-label="${x.t}: ${x.n}">
          <span class="bola">${x.ik}<i class="no">${i + 1}</i></span><span class="lb"><b>${x.t}</b><small>${x.n}</small></span></button>`).join('')}</div>`
    $('kembali').onclick = () => tampilUtama(kelasNama)
    return $('isi').querySelectorAll('[data-k]').forEach(b => b.onclick = () => bukaMateri1(m, b.dataset.k))
  }
  const L = LANGKAH1[k], akhir = k === LANGKAH1.length - 1
  const konten = {
    belajar: `<div class="card"><h3>📖 Perpustakaan Kuno</h3><p class="kecil">Buka gulungan misi satu per satu.</p>
        ${M1.misi.map(([t, h, o]) => `<details class="misi" ${o ? 'open' : ''}><summary>${t}</summary><div class="isi">${h}</div></details>`).join('')}</div>
      <div class="card box"><h3>🏆 Ringkasan Inti</h3><ul>${M1.ringkasan.map(r => `<li>${r}</li>`).join('')}</ul></div>`,
    visual: `<div class="card vis"><h3>🔋 Laboratorium Energi</h3><p class="kecil">Pilih jurus, ubah angkanya, lalu lihat pasukan angkanya bergerak.</p><div id="vis"></div></div>`,
    contoh: `<div class="card"><h3>🗺️ Peta Rahasia</h3><p class="kecil">Ikuti langkah-langkahnya satu per satu.</p></div>
      ${M1.contoh.map((c, i) => `<div class="card box"><p><b>Contoh ${i + 1}. ${c.q}</b></p><ol>${c.l.map(x => `<li>${x}</li>`).join('')}</ol><div class="msg ok">Jawaban: ${c.j}</div></div>`).join('')}`,
    latihan: `<div class="card"><h3>⚔️ Arena Latihan</h3><p class="kecil">Tanpa batas waktu. Kalau salah, kamu boleh coba lagi atau langsung lihat pembahasan.</p><div id="latihan"></div></div>`,
    game: `<div class="card"><h3>🏰 Petualangan Menuju Istana Harta Karun</h3><p class="kecil">Kalahkan para penjaga dengan jurus pangkat dan kumpulkan permata 💎.</p><div id="game"></div></div>`
  }[L.k]
  $('isi').innerHTML = `<p><button class="btn alt" id="menu">☰ Peta petualangan</button></p>${judul}
    <p class="kecil" style="margin:2px 0 6px">Langkah ${k + 1} dari ${LANGKAH1.length}: <b>${L.t}</b> (${L.n})</p>
    <div class="prog"><span style="width:${(k + 1) * 100 / LANGKAH1.length}%"></span></div>
    <div style="margin-top:14px">${konten}</div>
    <div class="navlang">${k > 0 ? '<button class="btn alt" id="sblm">← Sebelumnya</button>' : '<span></span>'}<button class="btn" id="lanjut1">${akhir ? 'Selesai ✔' : 'Berikutnya →'}</button></div>`
  $('menu').onclick = () => bukaMateri1(m)
  if (k > 0) $('sblm').onclick = () => bukaMateri1(m, LANGKAH1[k - 1].k)
  $('lanjut1').onclick = () => akhir ? bukaMateri1(m) : bukaMateri1(m, LANGKAH1[k + 1].k)
  if (L.k === 'visual') visual1()
  if (L.k === 'latihan') latihan1()
  if (L.k === 'game') game1()
}

/* ---------- Visual interaktif: 5 jurus ---------- */
function visual1() {
  const T = [['p', '🔢 Pangkat'], ['k', '➕ Kali'], ['b', '➗ Bagi'], ['pp', '🔁 Pangkat²'], ['n', '🪜 Nol & Negatif']]
  const CFG = { p: [['a', 'Bilangan dasar', 2, 9], ['n', 'Pangkat', 0, 8]], k: [['a', 'Basis', 2, 5], ['m', 'm', 1, 5], ['n', 'n', 1, 5]],
    b: [['a', 'Basis', 2, 5], ['m', 'm', 2, 7], ['n', 'n', 1, 5]], pp: [['a', 'Basis', 2, 4], ['m', 'm', 1, 4], ['n', 'n', 1, 4]], n: [['a', 'Basis', 2, 5]] }
  const S = { p: { a: 3, n: 5 }, k: { a: 2, m: 3, n: 2 }, b: { a: 3, m: 5, n: 2 }, pp: { a: 2, m: 3, n: 2 }, n: { a: 2 } }
  const chips = (n, a, c = '') => Array.from({ length: n }, (_, i) => `<span class="chip ${c}" style="animation-delay:${i * 50}ms">${a}</span>`).join('')
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
  let tab = 'p'
  const gambar = () => {
    const v = S[tab]; if (tab === 'b' && v.n > v.m) v.n = v.m
    const { a, m, n } = v; let isi, eq, tip
    if (tab === 'p') {
      isi = `<div class="baris">${n === 0 ? '<span class="chip">1</span>' : chips(n, a)}</div>`
      eq = `<div class="besar">${sup(a, n)} = ${fmt(a ** n)}</div><div class="kecil">Artinya: ${n === 0 ? '1 (pangkat nol)' : Array(n).fill(a).join(' × ')}</div>`
      tip = n === 0 ? `${a} pangkat 0 hasilnya selalu 1.` : n === 1 ? `${a} pangkat 1 adalah angka ${a} itu sendiri.` : `${a} pangkat ${n} berarti angka ${a} dikalikan dengan dirinya sendiri ${n} kali.`
    } else if (tab === 'k') {
      isi = `<div class="baris">${chips(m, a, 'o')}</div><div class="panah">+</div><div class="baris">${chips(n, a, 'b')}</div><div class="panah">⬇ digabung ⬇</div><div class="baris">${chips(m, a, 'o')}${chips(n, a, 'b')}</div>`
      eq = `<div class="besar">${sup(a, m)} × ${sup(a, n)} = ${sup(a, m + n)}</div><div class="kecil">= ${fmt(a ** (m + n))}</div>`
      tip = `Ada ${m} pasukan oranye dan ${n} pasukan biru. Setelah digabung ada ${m} + ${n} = ${m + n} pasukan, jadi pangkatnya dijumlahkan.`
    } else if (tab === 'b') {
      isi = `<div class="baris">${Array.from({ length: m }, (_, i) => `<span class="chip ${i < n ? 'x' : 'o'}">${a}</span>`).join('')}</div>`
      eq = `<div class="besar">${sup(a, m)} ÷ ${sup(a, n)} = ${sup(a, m - n)}</div><div class="kecil">= ${fmt(a ** (m - n))}</div>`
      tip = `Dari ${m} pasukan, ${n} pasukan dicoret karena punya pasangan di pembagi. Sisa ${m} − ${n} = ${m - n} pasukan, jadi pangkatnya dikurangkan.`
    } else if (tab === 'pp') {
      isi = Array.from({ length: n }, () => `<div class="baris">${chips(m, a, 'o')}</div>`).join('')
      eq = `<div class="besar">(${sup(a, m)})<sup>${n}</sup> = ${sup(a, m * n)}</div><div class="kecil">= ${fmt(a ** (m * n))}</div>`
      tip = `Ada ${n} baris, tiap baris berisi ${m} pasukan. Totalnya ${n} × ${m} = ${m * n} pasukan, jadi pangkatnya dikalikan.`
    } else {
      isi = [4, 3, 2, 1, 0, -1, -2, -3].map((e, i) => `${i ? `<div class="turun">⬇ dibagi ${a}</div>` : ''}<div class="tangga ${e === 0 ? 'nol' : ''}" style="animation-delay:${i * 70}ms"><span>${sup(a, e < 0 ? '−' + -e : e)}</span><span>${e >= 0 ? fmt(a ** e) : '1/' + fmt(a ** -e)}</span></div>`).join('')
      eq = `<div class="besar">${sup(a, 0)} = 1</div><div class="kecil">Pangkat nol selalu 1</div>`
      tip = `Tiap turun satu anak tangga, hasilnya dibagi ${a}. Sampai pangkat 0 hasilnya 1, lalu berubah menjadi pecahan (pangkat negatif).`
    }
    $('vis').innerHTML = `<div class="tabsv">${T.map(([k, n]) => `<button data-t="${k}" class="${k === tab ? 'on' : ''}">${n}</button>`).join('')}</div>
      <div class="pilih">${CFG[tab].map(([k, l, lo, hi]) => `<label>${l} <select data-k="${k}">${opt(lo, hi, v[k])}</select></label>`).join('')}${tab === 'p' ? '<button class="btn alt" id="acak">🎲 Coba Acak</button>' : ''}</div>
      <div class="hasil">${eq}</div><div style="margin:10px 0">${isi}</div><div class="tip">💡 ${tip}</div>`
    $('vis').querySelectorAll('[data-t]').forEach(b => b.onclick = () => { tab = b.dataset.t; gambar() })
    $('vis').querySelectorAll('select').forEach(s => s.onchange = () => { v[s.dataset.k] = +s.value; gambar() })
    if (tab === 'p') $('acak').onclick = () => { v.a = rnd(2, 9); v.n = rnd(1, 7); gambar() }
  }
  gambar()
}

/* ---------- Latihan: salah boleh coba lagi atau lihat pembahasan ---------- */
function latihan1() {
  const el = $('latihan'), Q = M1.soal; let i = 0, benar = 0, pertama = true
  const tampil = () => {
    const s = Q[i]; pertama = true
    el.innerHTML = `<p class="kecil">Soal ${i + 1} dari ${Q.length}</p><p><b>${s.q}</b></p>${s.o.map((t, n) => `<button class="opsi" data-n="${n}">${t}</button>`).join('')}<div id="fb"></div>`
    el.querySelectorAll('.opsi').forEach(b => b.onclick = () => jawab(b))
  }
  const lanjut = () => `<button class="btn" id="lj">${i + 1 < Q.length ? 'Soal berikutnya' : 'Lihat hasil'}</button>`
  const pasang = () => { $('lj').onclick = () => { i++; i < Q.length ? tampil() : selesai() } }
  const kunci = () => el.querySelectorAll('.opsi').forEach((b, x) => { b.disabled = true; if (x === Q[i].j) b.classList.add('benar') })
  const jawab = b => {
    const s = Q[i], n = +b.dataset.n
    if (n === s.j) {
      if (pertama) benar++
      kunci(); $('fb').innerHTML = `<div class="msg ok">Tepat sekali! 🎉</div><p>${s.p}</p>${lanjut()}`; return pasang()
    }
    pertama = false; b.disabled = true; b.classList.add('salah')
    $('fb').innerHTML = `<div class="msg err">Belum tepat. Mau apa sekarang?</div><p><button class="btn" id="ulang">🔁 Coba lagi</button> <button class="btn alt" id="lihat">📖 Lihat pembahasan</button></p>`
    $('ulang').onclick = () => { $('fb').innerHTML = '' }
    $('lihat').onclick = () => { kunci(); $('fb').innerHTML = `<div class="msg ok">Jawaban yang benar sudah ditandai hijau.</div><p>${s.p}</p>${lanjut()}`; pasang() }
  }
  const selesai = async () => {
    el.innerHTML = `<p><b>Kamu menjawab ${benar} dari ${Q.length} soal dengan benar di percobaan pertama.</b></p><div id="xp" class="kecil">Menyimpan progres...</div><button class="btn" id="lagi">Ulangi latihan</button>`
    $('lagi').onclick = () => { i = 0; benar = 0; tampil() }
    const { data, error } = await db.rpc('simpan_latihan', { m: 1, s: benar, t: Q.length })
    $('xp').textContent = error ? 'Progres belum tersimpan.' : `Progres tersimpan. Total XP kamu: ${data}.`
  }
  tampil()
}

/* ---------- Game petualangan ---------- */
function game1() {
  const el = $('game'), rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
  const LV = [
    { n: 'Hutan Eksponen', ik: '🌲', bg: '#bfe8a8,#e9f7d0', mon: '🐗', hp: 1, t: ['hitung'], dek: '🌲🌳🌲🌳' },
    { n: 'Sungai Penjumlah', ik: '🌊', bg: '#9fd8ff,#d9f1ff', mon: '🐊', hp: 1, t: ['kali'], dek: '🌊🪷🌊🪷' },
    { n: 'Gunung Pengurang', ik: '🏔️', bg: '#d6dcf5,#f0f2ff', mon: '🦅', hp: 1, t: ['bagi'], dek: '🏔️❄️🏔️❄️' },
    { n: 'Gua Pangkat Ganda', ik: '🌋', bg: '#ffb89a,#ffe3d4', mon: '🐉', hp: 1, t: ['pp'], dek: '🌋🔥🌋🔥' },
    { n: 'Istana Harta Karun', ik: '🏰', bg: '#d9b8ff,#f2e6ff', mon: '👹', hp: 2, t: ['hitung', 'kali', 'bagi', 'pp', 'nol'], dek: '🏰✨🏰✨' }
  ]
  const mk = (q, a, w, h, tip) => { const set = new Set([a]); w.forEach(v => v > 0 && set.add(v)); let i = 1; while (set.size < 4) set.add(a + i++ * 2); return { q, a, h, tip, o: [...set].sort(() => Math.random() - .5) } }
  const buat = t => {
    if (t === 'hitung') { const b = rnd(2, 5), n = rnd(2, 4); return mk(`${sup(b, n)} = ?`, b ** n, [b * n, b ** (n + 1), b ** (n - 1)], `${Array(n).fill(b).join(' × ')} = ${b ** n}`, 'Basis dikalikan berulang sebanyak pangkatnya.') }
    if (t === 'kali') { const b = rnd(2, 4), m = rnd(1, 3), n = rnd(1, 3); return mk(`${sup(b, m)} × ${sup(b, n)} = ?`, b ** (m + n), [b ** (m * n), (b * b) ** (m + n), b ** (m + n) + b], `Pangkat dijumlah: ${sup(b, m + n)} = ${b ** (m + n)}`, 'Basis sama dikali, pangkat dijumlahkan.') }
    if (t === 'bagi') { const b = rnd(2, 5), m = rnd(3, 5), n = rnd(1, 2), a = b ** (m - n); return mk(`${sup(b, m)} ÷ ${sup(b, n)} = ?`, a, [b ** (m + n), a + b, a * b], `Pangkat dikurangi: ${sup(b, m - n)} = ${a}`, 'Basis sama dibagi, pangkat dikurangkan.') }
    if (t === 'pp') { const b = rnd(2, 3), m = rnd(2, 3), n = rnd(2, 3), a = b ** (m * n); return mk(`(${sup(b, m)})<sup>${n}</sup> = ?`, a, [b ** (m + n), b ** m * n, a + b], `Pangkat dikali: ${sup(b, m * n)} = ${a}`, 'Pangkat dari pangkat, pangkatnya dikalikan.') }
    const b = rnd(2, 9), c = rnd(1, 5); return mk(`${sup(b, 0)} + ${c} = ?`, 1 + c, [c, b + c, c + 2], `${sup(b, 0)} = 1, jadi 1 + ${c} = ${1 + c}`, 'Bilangan apa pun berpangkat nol hasilnya 1.')
  }
  let lv = 0, hp = LV[0].hp, gem = 0, pertama = true, s
  const tampil = () => {
    const L = LV[lv]; s = buat(L.t[rnd(0, L.t.length - 1)]); pertama = true
    el.innerHTML = `<div class="rute">${LV.map((x, i) => `<span class="ttk ${i < lv ? 'selesai' : i === lv ? 'skrg' : ''}" title="${x.n}">${i < lv ? '✅' : x.ik}</span>`).join('')}</div>
      <div class="kecil" style="display:flex;justify-content:space-between"><b>${L.n}</b><span>💎 ${gem}</span></div>
      <div class="adegan" style="background:linear-gradient(${L.bg})"><span class="dk">${L.dek}</span><span class="hero" id="hero">🧙‍♂️</span><span class="mon" id="mon">${L.mon}</span>
        <span class="hpbar">${'❤️'.repeat(hp)}${'🖤'.repeat(L.hp - hp)}</span></div>
      <p class="kecil" style="margin:10px 0 0">Penjaga menghadang! Jawab dengan benar untuk menyerang.</p><div class="soalbesar">${s.q}</div>
      <div class="pilgrid">${s.o.map(v => `<button class="opsi" data-v="${v}">${fmt(v)}</button>`).join('')}</div><div id="gfb"></div>`
    el.querySelectorAll('.opsi').forEach(b => b.onclick = () => jawab(b))
  }
  const jawab = b => {
    const ok = +b.dataset.v === s.a, mon = $('mon'), hero = $('hero')
    if (!ok) {
      pertama = false; b.disabled = true; b.classList.add('salah'); mon.className = 'mon'; void mon.offsetWidth; mon.classList.add('marah'); hero.classList.add('kena')
      setTimeout(() => hero.classList.remove('kena'), 450)
      $('gfb').innerHTML = `<div class="msg err">Aduh, serangannya meleset! 💥 Petunjuk: ${s.tip}</div>`; return
    }
    if (pertama) gem++
    hp--; el.querySelectorAll('.opsi').forEach(x => x.disabled = true); b.classList.add('benar'); mon.classList.add(hp > 0 ? 'luka' : 'kalah')
    $('gfb').innerHTML = `<div class="msg ok">Serangan tepat sasaran! ⚔️ ${s.h}</div><p><button class="btn" id="gl">${hp > 0 ? 'Serang lagi ⚔️' : lv === 4 ? 'Buka peti harta karun 🎁' : 'Lanjut berjalan →'}</button></p>`
    $('gl').onclick = () => {
      if (hp > 0) return tampil()
      if (lv === 4) return akhir()
      hero.classList.add('lari'); setTimeout(() => { lv++; hp = LV[lv].hp; tampil() }, 900)
    }
  }
  const akhir = () => {
    const bintang = gem >= 6 ? 3 : gem >= 4 ? 2 : 1
    el.innerHTML = `<div class="adegan" style="background:linear-gradient(#ffe9a8,#fff6d6)">${Array.from({ length: 14 }, (_, i) => `<span class="konfeti" style="left:${rnd(2, 94)}%;animation-delay:${(i * .17).toFixed(2)}s">${['💎', '✨', '🎉', '⭐'][i % 4]}</span>`).join('')}
      <div class="peti" style="padding-top:50px">🏆</div></div>
      <h3 style="text-align:center">Kamu menemukan harta karun! 🎉</h3><p style="text-align:center;font-size:1.6rem">${'⭐'.repeat(bintang)}${'☆'.repeat(3 - bintang)}</p>
      <p style="text-align:center">Permata terkumpul: <b>💎 ${gem}</b> dari 6 (permata didapat kalau benar di percobaan pertama).</p>
      <p style="text-align:center"><button class="btn" id="lagi">Berpetualang lagi</button></p>`
    $('lagi').onclick = () => { lv = 0; hp = LV[0].hp; gem = 0; tampil() }
  }
  tampil()
}

const _bukaAsli = bukaMateri
window.bukaMateri = m => m.urutan === 1 ? bukaMateri1(m) : _bukaAsli(m)
