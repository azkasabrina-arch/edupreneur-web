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

document.head.insertAdjacentHTML('beforeend', `<style>
  .rumus { background:var(--bg); border:2px dashed var(--p); border-radius:12px; padding:8px 12px; text-align:center; font-weight:800; margin:8px 0 }
  .sub { margin:16px 0 4px; color:var(--p); font-family:'Baloo 2',sans-serif; font-size:1.05rem }
  .pec { display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; line-height:1.15; margin:0 2px; font-weight:800 }
  .pec > span:first-child { border-bottom:2px solid currentColor; padding:0 4px } .pec > span:last-child { padding:0 4px }
  .batang { height:18px; background:var(--line); border-radius:9px; overflow:hidden; margin:3px 0 10px } .batang i { display:block; height:100%; background:var(--p2); transition:width .4s }
</style>`)

const fr = (p, q) => `<span class="pec"><span>${p}</span><span>${q}</span></span>`
const ps = t => `<div class="bub"><span class="av">🧙‍♂️</span><div>${t}</div></div>`
const M1 = {
  bagian: [
    ['1. Pengertian Bilangan Berpangkat', ps('Halo, Petualang! Aku Profesor Pangkat. Kita mulai dari dasarnya dulu ya.') + `
      <p>Perhatikan perkalian ini: 2 × 2 × 2 × 2 × 2. Angka 2 diulang sebanyak 5 kali. Daripada menulis panjang-panjang, kita singkat menjadi <b>${sup(2, 5)}</b>.</p>
      <div class="rumus">${sup('a', 'n')} = a × a × a × ... × a (sebanyak n faktor)</div>
      <ul><li><b>a</b> disebut <b>basis</b>, yaitu angka yang dikalikan berulang.</li><li><b>n</b> disebut <b>pangkat</b> (eksponen), yaitu banyaknya pengulangan.</li><li>Dibaca "a pangkat n".</li></ul>
      <p>Contoh: ${sup(3, 4)} = 3 × 3 × 3 × 3 = 81. Contoh dalam cerita: 1 bakteri membelah menjadi 2 setiap jam, jadi setelah 5 jam ada ${sup(2, 5)} = 32 bakteri.</p>
      <div class="tip">⚠️ Hati-hati! ${sup(2, 3)} bukan 2 × 3 = 6, melainkan 2 × 2 × 2 = 8. Perhatikan juga: (−2)<sup>2</sup> = 4, sedangkan −2<sup>2</sup> = −4 (tanda minus tidak ikut dipangkatkan).</div>`, true],
    ['2. Sifat-sifat Bilangan Berpangkat', `
      <h4 class="sub">a. Sifat perkalian bilangan berpangkat</h4>
      <div class="rumus">${sup('a', 'm')} × ${sup('a', 'n')} = ${sup('a', 'm+n')}</div>
      <p>Hitung ${sup(2, 3)} × ${sup(2, 4)}. Kalau ditulis panjang: (2×2×2) × (2×2×2×2). Totalnya ada 3 + 4 = 7 faktor 2, jadi hasilnya ${sup(2, 7)} = 128. <b>Syarat: basisnya harus sama.</b> Pangkat <b>dijumlahkan</b>.</p>
      <h4 class="sub">b. Sifat pembagian bilangan berpangkat</h4>
      <div class="rumus">${sup('a', 'm')} ÷ ${sup('a', 'n')} = ${sup('a', 'm−n')} (a ≠ 0)</div>
      <p>Hitung ${sup(2, 5)} ÷ ${sup(2, 2)}. Tulis sebagai pecahan: (2×2×2×2×2) / (2×2). Dua faktor 2 di atas dicoret dengan dua faktor 2 di bawah, sisa 3 faktor, yaitu ${sup(2, 3)} = 8. Pangkat <b>dikurangkan</b>.</p>
      <h4 class="sub">c. Sifat perpangkatan bilangan berpangkat</h4>
      <div class="rumus">(${sup('a', 'm')})<sup>n</sup> = ${sup('a', 'm×n')}</div>
      <p>(${sup(2, 3)})<sup>2</sup> artinya ${sup(2, 3)} dikalikan sebanyak 2 kali: ${sup(2, 3)} × ${sup(2, 3)} = ${sup(2, 6)} = 64. Jalan pintasnya, pangkat <b>dikalikan</b>: 3 × 2 = 6.</p>
      <h4 class="sub">d. Perpangkatan pada perkalian bilangan</h4>
      <div class="rumus">(a × b)<sup>n</sup> = ${sup('a', 'n')} × ${sup('b', 'n')}</div>
      <p>(2 × 3)<sup>3</sup> = (2×3) × (2×3) × (2×3). Kelompokkan angka yang sama: (2×2×2) × (3×3×3) = ${sup(2, 3)} × ${sup(3, 3)} = 8 × 27 = 216. Jadi pangkatnya <b>dibagikan ke setiap faktor</b>.</p>`],
    ['3. Bilangan Pangkat Nol dan Pangkat Negatif', `
      <p>Perhatikan pola tangga ini. Setiap turun satu anak tangga, pangkat berkurang 1 dan hasilnya <b>dibagi 2</b>:</p>
      <p style="text-align:center">${sup(2, 3)} = 8 → ${sup(2, 2)} = 4 → ${sup(2, 1)} = 2 → <b>${sup(2, 0)} = 1</b> → <b>${sup(2, '−1')} = 1/2</b> → ${sup(2, '−2')} = 1/4</p>
      <div class="rumus">${sup('a', 0)} = 1 (a ≠ 0)</div><div class="rumus">${sup('a', '−n')} = 1 / ${sup('a', 'n')}</div>
      <p>Contoh: ${sup(5, 0)} = 1 dan ${sup(2, '−3')} = 1/${sup(2, 3)} = 1/8.</p>
      <div class="tip">💡 Pangkat negatif tidak membuat hasilnya negatif. Artinya hanya kebalikan (dibalik menjadi pecahan).</div>`],
    ['4. Bilangan Pecahan Berpangkat', `
      <p>Bagaimana kalau yang dipangkatkan adalah pecahan? Pecahan dikalikan dirinya sendiri: pembilang dikali pembilang, penyebut dikali penyebut.</p>
      <div class="rumus">(${fr('a', 'b')})<sup>n</sup> = ${fr(sup('a', 'n'), sup('b', 'n'))} (b ≠ 0)</div>
      <p>Contoh: (${fr(2, 3)})<sup>3</sup> = ${fr(2, 3)} × ${fr(2, 3)} × ${fr(2, 3)} = ${fr(8, 27)}. Pembilang dan penyebut <b>sama-sama dipangkatkan</b>.</p>
      <p>Pangkat negatif pada pecahan: pecahannya dibalik. (${fr(2, 3)})<sup>−2</sup> = (${fr(3, 2)})<sup>2</sup> = ${fr(9, 4)}.</p>`]
  ],
  ringkasan: [
    `Bentuk umum: ${sup('a', 'n')} = a × a × ... × a sebanyak n kali (a = basis, n = pangkat).`,
    `Perkalian, basis sama: ${sup('a', 'm')} × ${sup('a', 'n')} = ${sup('a', 'm+n')}.`,
    `Pembagian, basis sama: ${sup('a', 'm')} ÷ ${sup('a', 'n')} = ${sup('a', 'm−n')}.`,
    `Perpangkatan: (${sup('a', 'm')})<sup>n</sup> = ${sup('a', 'm×n')}.`,
    `Pangkat pada perkalian: (a × b)<sup>n</sup> = ${sup('a', 'n')} × ${sup('b', 'n')}.`,
    `Pangkat nol dan negatif: ${sup('a', 0)} = 1 dan ${sup('a', '−n')} = 1 / ${sup('a', 'n')}.`,
    `Pecahan berpangkat: (${fr('a', 'b')})<sup>n</sup> = ${fr(sup('a', 'n'), sup('b', 'n'))}.`
  ],
  tips: ['Perkalian → pangkat <b>dijumlah</b>. Pembagian → pangkat <b>dikurang</b>. Pangkat dipangkatkan → pangkat <b>dikali</b>.', 'Sifat perkalian dan pembagian hanya berlaku kalau <b>basisnya sama</b>.', 'Selalu cek: tanda minus pada pangkat berarti kebalikan, bukan hasil negatif.'],
  contoh: [
    { q: `Tuliskan 5 × 5 × 5 × 5 dalam bentuk pangkat, lalu hitung nilainya.`, l: ['Angka 5 diulang 4 kali, jadi bentuknya 5<sup>4</sup>.', '5 × 5 = 25.', '25 × 5 = 125.', '125 × 5 = 625.'], j: '5<sup>4</sup> = 625' },
    { q: `Sederhanakan ${sup(2, 3)} × ${sup(2, 4)}.`, l: ['Basis sama (2), jadi pangkat dijumlahkan.', '3 + 4 = 7, jadi hasilnya 2<sup>7</sup>.', '2<sup>7</sup> = 128.'], j: '128' },
    { q: `Sederhanakan ${sup(5, 7)} ÷ ${sup(5, 4)}.`, l: ['Basis sama (5), jadi pangkat dikurangkan.', '7 − 4 = 3, jadi hasilnya 5<sup>3</sup>.', '5 × 5 × 5 = 125.'], j: '125' },
    { q: `Hitunglah (${sup(3, 2)})<sup>3</sup>.`, l: ['Perpangkatan: pangkatnya dikalikan.', '2 × 3 = 6, jadi hasilnya 3<sup>6</sup>.', '3<sup>6</sup> = 9 × 9 × 9 = 729.'], j: '729' },
    { q: 'Hitunglah (2 × 5)<sup>2</sup>.', l: ['Pangkat dibagikan ke setiap faktor: 2<sup>2</sup> × 5<sup>2</sup>.', '2<sup>2</sup> = 4 dan 5<sup>2</sup> = 25.', '4 × 25 = 100.', 'Cek: (2 × 5) = 10, lalu 10<sup>2</sup> = 100. Hasilnya sama.'], j: '100' },
    { q: `Hitunglah ${sup(4, 0)} + ${sup(3, '−2')}.`, l: ['4<sup>0</sup> = 1 (pangkat nol).', '3<sup>−2</sup> = 1 / 3<sup>2</sup> = 1/9.', 'Jumlahkan: 1 + 1/9 = 10/9.'], j: '10/9' },
    { q: `Hitunglah (${fr(2, 3)})<sup>3</sup>.`, l: ['Pembilang dan penyebut sama-sama dipangkatkan 3.', 'Pembilang: 2<sup>3</sup> = 8.', 'Penyebut: 3<sup>3</sup> = 27.', 'Jadi hasilnya 8/27.'], j: '8/27' },
    { q: `Sederhanakan ${sup(2, 5)} × ${sup(2, 3)} ÷ ${sup(2, 6)}.`, l: ['Kerjakan dari kiri: 2<sup>5</sup> × 2<sup>3</sup> = 2<sup>5+3</sup> = 2<sup>8</sup>.', 'Lalu 2<sup>8</sup> ÷ 2<sup>6</sup> = 2<sup>8−6</sup> = 2<sup>2</sup>.', '2<sup>2</sup> = 4.'], j: '4' }
  ],
  soal: [
    { q: `Berapakah nilai ${sup(2, 5)}?`, o: ['10', '25', '32', '64'], j: 2, p: '2 × 2 × 2 × 2 × 2 = 32. Pangkat berarti dikalikan berulang, bukan dikali dengan pangkatnya.' },
    { q: 'Bentuk pangkat dari 4 × 4 × 4 adalah ...', o: [sup(4, 3), sup(3, 4), '4 × 3', '12'], j: 0, p: 'Angka 4 diulang 3 kali, jadi 4<sup>3</sup>.' },
    { q: `${sup(3, 2)} × ${sup(3, 3)} = ...`, o: [sup(3, 6), sup(3, 5), sup(9, 5), sup(3, 1)], j: 1, p: 'Basis sama dikali, pangkat dijumlah: 2 + 3 = 5, jadi 3<sup>5</sup>.' },
    { q: `${sup(7, 6)} ÷ ${sup(7, 2)} = ...`, o: [sup(7, 8), sup(7, 3), sup(7, 4), sup(1, 4)], j: 2, p: 'Basis sama dibagi, pangkat dikurang: 6 − 2 = 4, jadi 7<sup>4</sup>.' },
    { q: `(${sup(5, 2)})<sup>3</sup> = ...`, o: [sup(5, 5), sup(5, 6), sup(5, 8), sup(15, 2)], j: 1, p: 'Perpangkatan: pangkat dikalikan, 2 × 3 = 6, jadi 5<sup>6</sup>.' },
    { q: '(2 × 3)<sup>2</sup> = ...', o: ['12', '36', '18', '8'], j: 1, p: 'Pangkat dibagikan: 2<sup>2</sup> × 3<sup>2</sup> = 4 × 9 = 36. Cek: 6<sup>2</sup> = 36.' },
    { q: `Berapakah nilai ${sup(9, 0)}?`, o: ['0', '1', '9', 'Tidak terdefinisi'], j: 1, p: 'Bilangan apa pun (selain 0) berpangkat nol hasilnya 1.' },
    { q: `${sup(2, '−3')} = ...`, o: ['−8', '−6', '1/6', '1/8'], j: 3, p: 'Pangkat negatif berarti kebalikan: 1 / 2<sup>3</sup> = 1/8. Hasilnya tidak negatif.' },
    { q: `(${fr(2, 3)})<sup>2</sup> = ...`, o: [fr(4, 9), fr(4, 3), fr(2, 9), fr(4, 6)], j: 0, p: 'Pembilang dan penyebut sama-sama dipangkatkan: 2<sup>2</sup> / 3<sup>2</sup> = 4/9.' },
    { q: `${sup(2, 4)} × ${sup(2, 3)} ÷ ${sup(2, 5)} = ...`, o: ['2', '4', '8', '16'], j: 1, p: '2<sup>4+3</sup> = 2<sup>7</sup>, lalu 2<sup>7−5</sup> = 2<sup>2</sup> = 4.' }
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
  if (window.ingatPosisi) ingatPosisi({ tab: 'beranda', materi: 1, langkah: aktif || null })
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
    belajar: `<div class="card"><h3>📖 Perpustakaan Kuno</h3><p class="kecil">A. Bilangan Berpangkat. Buka bagian satu per satu.</p>
        ${M1.bagian.map(([t, h, o]) => `<details class="misi" ${o ? 'open' : ''}><summary>${t}</summary><div class="isi">${h}</div></details>`).join('')}</div>
      <div class="card box"><h3>🏆 Ringkasan Inti</h3><ul>${M1.ringkasan.map(r => `<li>${r}</li>`).join('')}</ul>
        <h4 class="sub">Cara mudah mengingat</h4>${M1.tips.map(t => `<div class="tip">💡 ${t}</div>`).join('')}</div>`,
    visual: `<div class="card vis"><h3>🔋 Laboratorium Energi</h3><p class="kecil">Pilih topik, ubah angkanya, lalu lihat bagaimana rumusnya terbentuk.</p><div id="vis"></div></div>`,
    contoh: `<div class="card"><h3>🗺️ Peta Rahasia</h3><p class="kecil">Ikuti langkah-langkahnya satu per satu.</p></div>
      ${M1.contoh.map((c, i) => `<div class="card box"><p><b>Contoh ${i + 1}. ${c.q}</b></p><ol>${c.l.map(x => `<li>${x}</li>`).join('')}</ol><div class="msg ok">Jawaban: ${c.j}</div></div>`).join('')}`,
    latihan: `<div class="card"><h3>⚔️ Arena Latihan</h3><p class="kecil">Tanpa batas waktu. Kalau salah, kamu boleh coba lagi atau langsung lihat pembahasan.</p><div id="latihan"></div></div>`,
    game: `<div class="card"><h3>🏰 Petualangan Menuju Istana Harta Karun</h3><p class="kecil">Kalahkan para penjaga dengan ilmu pangkat dan kumpulkan permata 💎.</p><div id="game"></div></div>`
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

/* ---------- Visual interaktif: satu tab per topik ---------- */
function visual1() {
  const T = [['p', '🔢 Pengertian'], ['k', '✖️ Perkalian'], ['b', '➗ Pembagian'], ['pp', '🔁 Perpangkatan'], ['pk', '🧩 Pangkat pada perkalian'], ['n', '🪜 Nol & Negatif'], ['pc', '🍰 Pecahan']]
  const CFG = { p: [['a', 'Bilangan dasar', 2, 9], ['n', 'Pangkat', 0, 8]], k: [['a', 'Basis', 2, 5], ['m', 'm', 1, 5], ['n', 'n', 1, 5]],
    b: [['a', 'Basis', 2, 5], ['m', 'm', 2, 7], ['n', 'n', 1, 5]], pp: [['a', 'Basis', 2, 4], ['m', 'm', 1, 4], ['n', 'n', 1, 4]],
    pk: [['a', 'a', 2, 4], ['b', 'b', 2, 4], ['n', 'Pangkat', 1, 3]], n: [['a', 'Basis', 2, 5]], pc: [['p', 'Pembilang', 1, 5], ['q', 'Penyebut', 2, 6], ['n', 'Pangkat', 1, 4]] }
  const S = { p: { a: 3, n: 5 }, k: { a: 2, m: 3, n: 2 }, b: { a: 3, m: 5, n: 2 }, pp: { a: 2, m: 3, n: 2 }, pk: { a: 2, b: 3, n: 2 }, n: { a: 2 }, pc: { p: 2, q: 3, n: 3 } }
  const chips = (n, a, c = '') => Array.from({ length: n }, (_, i) => `<span class="chip ${c}" style="animation-delay:${i * 50}ms">${a}</span>`).join('')
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
  let tab = 'p'
  const gambar = () => {
    const v = S[tab]; if (tab === 'b' && v.n > v.m) v.n = v.m; if (tab === 'pc' && v.q <= v.p) v.q = v.p + 1
    const { a, b, m, n, p, q } = v; let isi, eq, tip
    if (tab === 'p') {
      isi = `<div class="baris">${n === 0 ? '<span class="chip">1</span>' : chips(n, a)}</div>`
      eq = `<div class="besar">${sup(a, n)} = ${fmt(a ** n)}</div><div class="kecil">Artinya: ${n === 0 ? '1 (pangkat nol)' : Array(n).fill(a).join(' × ')}</div>`
      tip = n === 0 ? `${a} pangkat 0 hasilnya selalu 1.` : n === 1 ? `${a} pangkat 1 adalah angka ${a} itu sendiri.` : `${a} pangkat ${n} berarti angka ${a} dikalikan dengan dirinya sendiri ${n} kali.`
    } else if (tab === 'k') {
      isi = `<div class="baris">${chips(m, a, 'o')}</div><div class="panah">×</div><div class="baris">${chips(n, a, 'b')}</div><div class="panah">⬇ digabung ⬇</div><div class="baris">${chips(m, a, 'o')}${chips(n, a, 'b')}</div>`
      eq = `<div class="besar">${sup(a, m)} × ${sup(a, n)} = ${sup(a, m + n)}</div><div class="kecil">= ${fmt(a ** (m + n))}</div>`
      tip = `Ada ${m} faktor oranye dan ${n} faktor biru. Setelah digabung ada ${m} + ${n} = ${m + n} faktor, jadi pangkatnya dijumlahkan.`
    } else if (tab === 'b') {
      isi = `<div class="baris">${Array.from({ length: m }, (_, i) => `<span class="chip ${i < n ? 'x' : 'o'}">${a}</span>`).join('')}</div>`
      eq = `<div class="besar">${sup(a, m)} ÷ ${sup(a, n)} = ${sup(a, m - n)}</div><div class="kecil">= ${fmt(a ** (m - n))}</div>`
      tip = `Dari ${m} faktor, ${n} faktor dicoret karena punya pasangan di pembagi. Sisa ${m} − ${n} = ${m - n} faktor, jadi pangkatnya dikurangkan.`
    } else if (tab === 'pp') {
      isi = Array.from({ length: n }, () => `<div class="baris">${chips(m, a, 'o')}</div>`).join('')
      eq = `<div class="besar">(${sup(a, m)})<sup>${n}</sup> = ${sup(a, m * n)}</div><div class="kecil">= ${fmt(a ** (m * n))}</div>`
      tip = `Ada ${n} baris, tiap baris berisi ${m} faktor. Totalnya ${n} × ${m} = ${m * n} faktor, jadi pangkatnya dikalikan.`
    } else if (tab === 'pk') {
      isi = `<p class="kecil">(${a} × ${b}) ditulis ${n} kali:</p>` + Array.from({ length: n }, () => `<div class="baris">${chips(1, a, 'o')}<span class="x">×</span>${chips(1, b, 'b')}</div>`).join('')
        + `<div class="panah">⬇ kelompokkan yang sama ⬇</div><div class="baris">${chips(n, a, 'o')}</div><div class="baris">${chips(n, b, 'b')}</div>`
      eq = `<div class="besar">(${a} × ${b})<sup>${n}</sup> = ${sup(a, n)} × ${sup(b, n)}</div><div class="kecil">= ${a ** n} × ${b ** n} = ${fmt((a * b) ** n)}</div>`
      tip = `Ada ${n} faktor ${a} (oranye) dan ${n} faktor ${b} (biru). Jadi pangkat ${n} berlaku untuk masing-masing faktor.`
    } else if (tab === 'n') {
      isi = [4, 3, 2, 1, 0, -1, -2, -3].map((e, i) => `${i ? `<div class="turun">⬇ dibagi ${a}</div>` : ''}<div class="tangga ${e === 0 ? 'nol' : ''}" style="animation-delay:${i * 70}ms"><span>${sup(a, e < 0 ? '−' + -e : e)}</span><span>${e >= 0 ? fmt(a ** e) : '1/' + fmt(a ** -e)}</span></div>`).join('')
      eq = `<div class="besar">${sup(a, 0)} = 1</div><div class="kecil">Pangkat nol selalu 1</div>`
      tip = `Tiap turun satu anak tangga, hasilnya dibagi ${a}. Sampai pangkat 0 hasilnya 1, lalu berubah menjadi pecahan (pangkat negatif).`
    } else {
      isi = Array.from({ length: n }, (_, i) => `<div>(${fr(p, q)})<sup>${i + 1}</sup> = ${fr(p ** (i + 1), q ** (i + 1))}<div class="batang"><i style="width:${(p / q) ** (i + 1) * 100}%"></i></div></div>`).join('')
      eq = `<div class="besar">(${fr(p, q)})<sup>${n}</sup> = ${fr(sup(p, n), sup(q, n))} = ${fr(p ** n, q ** n)}</div>`
      tip = `Pembilang dan penyebut sama-sama dipangkatkan ${n}. Perhatikan batangnya: pecahan antara 0 dan 1 justru makin kecil kalau dipangkatkan.`
    }
    $('vis').innerHTML = `<div class="tabsv">${T.map(([k, nm]) => `<button data-t="${k}" class="${k === tab ? 'on' : ''}">${nm}</button>`).join('')}</div>
      <div class="pilih">${CFG[tab].map(([k, l, lo, hi]) => `<label>${l} <select data-k="${k}">${opt(lo, hi, v[k])}</select></label>`).join('')}${tab === 'p' ? '<button class="btn alt" id="acak">🎲 Coba Acak</button>' : ''}</div>
      <div class="hasil">${eq}</div><div style="margin:10px 0">${isi}</div><div class="tip">💡 ${tip}</div>`
    $('vis').querySelectorAll('[data-t]').forEach(x => x.onclick = () => { tab = x.dataset.t; gambar() })
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
    { n: 'Hutan Pengertian', ik: '🌲', bg: '#bfe8a8,#e9f7d0', mon: '🐗', hp: 1, t: ['hitung'], dek: '🌲🌳🌲🌳' },
    { n: 'Sungai Perkalian & Pembagian', ik: '🌊', bg: '#9fd8ff,#d9f1ff', mon: '🐊', hp: 1, t: ['kali', 'bagi'], dek: '🌊🪷🌊🪷' },
    { n: 'Gunung Perpangkatan', ik: '🏔️', bg: '#d6dcf5,#f0f2ff', mon: '🦅', hp: 1, t: ['pp', 'pk'], dek: '🏔️❄️🏔️❄️' },
    { n: 'Gua Nol & Negatif', ik: '🌋', bg: '#ffb89a,#ffe3d4', mon: '🐉', hp: 1, t: ['nol', 'neg'], dek: '🌋🔥🌋🔥' },
    { n: 'Istana Pecahan Berpangkat', ik: '🏰', bg: '#d9b8ff,#f2e6ff', mon: '👹', hp: 2, t: ['pecahan', 'pecahan', 'neg', 'pk'], dek: '🏰✨🏰✨' }
  ]
  const T = v => typeof v === 'number' ? fmt(v) : String(v)
  const mk = (q, a, w, h, tip, fill) => {
    const set = new Set([T(a)]); w.forEach(v => { if (typeof v !== 'number' || v > 0) set.add(T(v)) })
    let i = 1; while (set.size < 4) set.add(T(fill ? fill(i++) : a + i++ * 2))
    const o = [...set].sort(() => Math.random() - .5); return { q, h, tip, o, ok: o.indexOf(T(a)) }
  }
  const buat = t => {
    if (t === 'hitung') { const b = rnd(2, 5), n = rnd(2, 4); return mk(`${sup(b, n)} = ?`, b ** n, [b * n, b ** (n + 1), b ** (n - 1)], `${Array(n).fill(b).join(' × ')} = ${b ** n}`, 'Basis dikalikan berulang sebanyak pangkatnya.') }
    if (t === 'kali') { const b = rnd(2, 4), m = rnd(1, 3), n = rnd(1, 3); return mk(`${sup(b, m)} × ${sup(b, n)} = ?`, b ** (m + n), [b ** (m * n), (b * b) ** (m + n), b ** (m + n) + b], `Pangkat dijumlah: ${sup(b, m + n)} = ${b ** (m + n)}`, 'Basis sama dikali, pangkat dijumlahkan.') }
    if (t === 'bagi') { const b = rnd(2, 5), m = rnd(3, 5), n = rnd(1, 2), a = b ** (m - n); return mk(`${sup(b, m)} ÷ ${sup(b, n)} = ?`, a, [b ** (m + n), a + b, a * b], `Pangkat dikurangi: ${sup(b, m - n)} = ${a}`, 'Basis sama dibagi, pangkat dikurangkan.') }
    if (t === 'pp') { const b = rnd(2, 3), m = rnd(2, 3), n = rnd(2, 3), a = b ** (m * n); return mk(`(${sup(b, m)})<sup>${n}</sup> = ?`, a, [b ** (m + n), b ** m * n, a + b], `Pangkat dikali: ${sup(b, m * n)} = ${a}`, 'Pangkat dari pangkat, pangkatnya dikalikan.') }
    if (t === 'pk') { const a = rnd(2, 3), b = rnd(2, 4), n = rnd(2, 3), r = (a * b) ** n; return mk(`(${a} × ${b})<sup>${n}</sup> = ?`, r, [a * b * n, a ** n * b, a ** n + b ** n], `${sup(a, n)} × ${sup(b, n)} = ${a ** n} × ${b ** n} = ${r}`, 'Pangkat dibagikan ke setiap faktor.') }
    if (t === 'nol') { const b = rnd(2, 9), c = rnd(1, 5); return mk(`${sup(b, 0)} + ${c} = ?`, 1 + c, [c, b + c, c + 2], `${sup(b, 0)} = 1, jadi 1 + ${c} = ${1 + c}`, 'Bilangan apa pun berpangkat nol hasilnya 1.') }
    if (t === 'neg') { const b = rnd(2, 5), n = rnd(1, 3), r = b ** n; return mk(`${sup(b, '−' + n)} = ?`, `1/${r}`, [`−${r}`, `1/${b * n}`, String(r)], `${sup(b, '−' + n)} = 1/${sup(b, n)} = 1/${r}`, 'Pangkat negatif berarti kebalikan.', i => `1/${r + i}`) }
    const p = rnd(1, 3), r = rnd(p + 1, 5), n = rnd(2, 3)
    return mk(`(${fr(p, r)})<sup>${n}</sup> = ?`, `${p ** n}/${r ** n}`, [`${p ** n}/${r}`, `${p}/${r ** n}`, `${p * n}/${r ** n}`], `Pembilang dan penyebut dipangkatkan: ${p ** n}/${r ** n}`, 'Pembilang dan penyebut sama-sama dipangkatkan.', i => `${p ** n}/${r ** n + i}`)
  }
  let lv = 0, hp = LV[0].hp, gem = 0, pertama = true, s
  const tampil = () => {
    const L = LV[lv]; s = buat(L.t[rnd(0, L.t.length - 1)]); pertama = true
    el.innerHTML = `<div class="rute">${LV.map((x, i) => `<span class="ttk ${i < lv ? 'selesai' : i === lv ? 'skrg' : ''}" title="${x.n}">${i < lv ? '✅' : x.ik}</span>`).join('')}</div>
      <div class="kecil" style="display:flex;justify-content:space-between"><b>${L.n}</b><span>💎 ${gem}</span></div>
      <div class="adegan" style="background:linear-gradient(${L.bg})"><span class="dk">${L.dek}</span><span class="hero" id="hero">🧙‍♂️</span><span class="mon" id="mon">${L.mon}</span>
        <span class="hpbar">${'❤️'.repeat(hp)}${'🖤'.repeat(L.hp - hp)}</span></div>
      <p class="kecil" style="margin:10px 0 0">Penjaga menghadang! Jawab dengan benar untuk menyerang.</p><div class="soalbesar">${s.q}</div>
      <div class="pilgrid">${s.o.map((t, i) => `<button class="opsi" data-i="${i}">${t}</button>`).join('')}</div><div id="gfb"></div>`
    el.querySelectorAll('.opsi').forEach(b => b.onclick = () => jawab(b))
  }
  const jawab = b => {
    const ok = +b.dataset.i === s.ok, mon = $('mon'), hero = $('hero')
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
