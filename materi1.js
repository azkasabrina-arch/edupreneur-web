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

document.head.insertAdjacentHTML('beforeend', `<style>
  .cx-head { display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:8px } .cx-no { background:var(--p); color:#fff; font-weight:800; border-radius:999px; padding:3px 14px }
  .cx-tag { color:var(--muted); font-weight:800; font-size:.85rem } .cx-soal { font-weight:800; font-size:1.15rem; margin:6px 0 10px }
  .cx-r { background:var(--bg); border-left:5px solid var(--p2); border-radius:8px; padding:8px 12px; margin-bottom:10px; font-size:.95rem }
  .lg { display:flex; gap:10px; align-items:flex-start; margin:8px 0 } .lg .no { flex:none; width:28px; height:28px; border-radius:50%; background:var(--p); color:#fff; font-weight:800; display:flex; align-items:center; justify-content:center; font-size:.9rem }
  .cx-j { background:#16a36a1f; border:2px solid var(--ok); border-radius:12px; padding:10px 14px; margin-top:10px }
  .rv { background:var(--card); border:2px solid var(--line); border-radius:14px; padding:12px; margin:10px 0 } .rv.b { border-left:6px solid var(--ok) } .rv.s { border-left:6px solid var(--err) }
  .rq { font-weight:800; font-size:1.1rem; margin:4px 0 } .pb { background:var(--bg); border-radius:10px; padding:8px 12px; margin-top:6px } .pb ol { margin:4px 0 0; padding-left:20px }
  .slot { border:2px dashed var(--line); border-radius:10px; padding:8px 10px; margin:6px 0; min-height:38px }
  .cocok { display:grid; grid-template-columns:1fr 1fr; gap:10px } .opsi.pilih { border-color:var(--p); background:#6c4cf122 } .opsi.terpakai { opacity:.65 } .lbl { float:right; color:var(--p) }
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
      <p>Pangkat negatif pada pecahan: pecahannya dibalik. (${fr(2, 3)})<sup>−2</sup> = (${fr(3, 2)})<sup>2</sup> = ${fr(9, 4)}.</p>`],
    ['5. Penerapan Bilangan Berpangkat dalam Kehidupan Sehari-hari', `
      <p>Bilangan berpangkat dipakai untuk menuliskan angka yang bertambah sangat cepat, atau yang sangat besar dan sangat kecil. Beberapa contohnya:</p>
      <h4 class="sub">a. Pertumbuhan yang terus berlipat</h4>
      <p>Satu sel bakteri membelah menjadi 2. Setelah 6 kali membelah ada ${sup(2, 6)} = 64 sel. Selembar kertas yang dilipat dua berulang kali juga begitu: 1 lipatan jadi 2 lapis, 2 lipatan jadi 4 lapis, dan 10 lipatan sudah menjadi ${sup(2, 10)} = 1.024 lapis.</p>
      <h4 class="sub">b. Pesan berantai atau video viral</h4>
      <p>Jika setiap orang meneruskan pesan ke 3 orang baru, maka putaran ke-1 ada 3 orang, ke-2 ada ${sup(3, 2)} = 9 orang, dan putaran ke-5 sudah ada ${sup(3, 5)} = 243 orang.</p>
      <h4 class="sub">c. Luas dan volume</h4>
      <p>Luas persegi bersisi s adalah ${sup('s', 2)}, dan volume kubus bersisi s adalah ${sup('s', 3)}. Kardus berbentuk kubus dengan sisi 5 dm punya volume ${sup(5, 3)} = 125 dm³ = 125 liter.</p>
      <h4 class="sub">d. Ukuran data di komputer</h4>
      <p>Dalam hitungan komputer, 1 kilobyte (KB) = ${sup(2, 10)} byte = 1.024 byte. Karena itu ukuran memori sering berupa 2, 4, 8, 16, 32, 64 (semuanya bilangan berpangkat dari 2).</p>
      <h4 class="sub">e. Satuan ukuran</h4>
      <p>1 kilometer = ${sup(10, 3)} meter = 1.000 meter. Sebaliknya, 1 milimeter = ${sup(10, '−3')} meter = 1/1.000 meter. Pangkat negatif dipakai untuk ukuran yang sangat kecil.</p>
      <div class="tip">💡 Kalau ada sesuatu yang bertambah dengan cara dikalikan terus-menerus (×2, ×3, dan seterusnya), biasanya itu bilangan berpangkat.</div>`]
  ],
  ringkasan: [
    `Bentuk umum: ${sup('a', 'n')} = a × a × ... × a sebanyak n kali (a = basis, n = pangkat).`,
    `Perkalian, basis sama: ${sup('a', 'm')} × ${sup('a', 'n')} = ${sup('a', 'm+n')}.`,
    `Pembagian, basis sama: ${sup('a', 'm')} ÷ ${sup('a', 'n')} = ${sup('a', 'm−n')}.`,
    `Perpangkatan: (${sup('a', 'm')})<sup>n</sup> = ${sup('a', 'm×n')}.`,
    `Pangkat pada perkalian: (a × b)<sup>n</sup> = ${sup('a', 'n')} × ${sup('b', 'n')}.`,
    `Pangkat nol dan negatif: ${sup('a', 0)} = 1 dan ${sup('a', '−n')} = 1 / ${sup('a', 'n')}.`,
    `Pecahan berpangkat: (${fr('a', 'b')})<sup>n</sup> = ${fr(sup('a', 'n'), sup('b', 'n'))}.`,
    `Penerapan: pertumbuhan berlipat (${sup(2, 'n')}), volume kubus (${sup('s', 3)}), dan satuan seperti ${sup(10, 3)} serta ${sup(10, '−3')}.`
  ],
  tips: ['Perkalian → pangkat <b>dijumlah</b>. Pembagian → pangkat <b>dikurang</b>. Pangkat dipangkatkan → pangkat <b>dikali</b>.', 'Sifat perkalian dan pembagian hanya berlaku kalau <b>basisnya sama</b>.', 'Selalu cek: tanda minus pada pangkat berarti kebalikan, bukan hasil negatif.'],
  contoh: [
    { tag: 'Pengertian', r: `${sup('a', 'n')} = a × a × ... × a (sebanyak n kali)`, q: 'Tuliskan 5 × 5 × 5 × 5 dalam bentuk pangkat, lalu hitung nilainya.', l: ['Hitung berapa kali angka 5 muncul: ada 4 kali.', 'Tulis dalam bentuk pangkat: 5<sup>4</sup>.', 'Hitung bertahap: 5 × 5 = 25, lalu 25 × 5 = 125, lalu 125 × 5 = 625.'], j: '5<sup>4</sup> = 625' },
    { tag: 'Perkalian', r: `${sup('a', 'm')} × ${sup('a', 'n')} = ${sup('a', 'm+n')} (basis harus sama)`, q: `Sederhanakan ${sup(2, 3)} × ${sup(2, 4)}.`, l: ['Cek basis: keduanya 2, jadi sifat perkalian boleh dipakai.', 'Jumlahkan pangkatnya: 3 + 4 = 7.', 'Tulis hasilnya: 2<sup>7</sup>.', 'Hitung nilainya: 2<sup>7</sup> = 128.'], j: '128' },
    { tag: 'Pembagian', r: `${sup('a', 'm')} ÷ ${sup('a', 'n')} = ${sup('a', 'm−n')} (basis harus sama)`, q: `Sederhanakan ${sup(5, 7)} ÷ ${sup(5, 4)}.`, l: ['Cek basis: keduanya 5, jadi sifat pembagian boleh dipakai.', 'Kurangkan pangkatnya: 7 − 4 = 3.', 'Tulis hasilnya: 5<sup>3</sup>.', 'Hitung nilainya: 5 × 5 × 5 = 125.'], j: '125' },
    { tag: 'Perpangkatan', r: `(${sup('a', 'm')})<sup>n</sup> = ${sup('a', 'm×n')}`, q: `Hitunglah (${sup(3, 2)})<sup>3</sup>.`, l: ['Ada pangkat di dalam dan di luar kurung, jadi pangkatnya dikalikan.', 'Kalikan: 2 × 3 = 6, jadi hasilnya 3<sup>6</sup>.', 'Hitung nilainya: 3<sup>6</sup> = 729.'], j: '729' },
    { tag: 'Pangkat pada perkalian', r: `(a × b)<sup>n</sup> = ${sup('a', 'n')} × ${sup('b', 'n')}`, q: 'Hitunglah (2 × 5)<sup>2</sup>.', l: ['Pangkat 2 dibagikan ke setiap faktor: 2<sup>2</sup> × 5<sup>2</sup>.', 'Hitung masing-masing: 2<sup>2</sup> = 4 dan 5<sup>2</sup> = 25.', 'Kalikan: 4 × 25 = 100.', 'Cek: (2 × 5) = 10, lalu 10<sup>2</sup> = 100. Hasilnya sama ✔.'], j: '100' },
    { tag: 'Pangkat nol dan negatif', r: `${sup('a', 0)} = 1 dan ${sup('a', '−n')} = 1 / ${sup('a', 'n')}`, q: `Hitunglah ${sup(4, 0)} + ${sup(3, '−2')}.`, l: ['Pangkat nol: 4<sup>0</sup> = 1.', 'Pangkat negatif jadi kebalikan: 3<sup>−2</sup> = 1 / 3<sup>2</sup> = 1/9.', 'Jumlahkan: 1 + 1/9 = 9/9 + 1/9 = 10/9.'], j: '10/9' },
    { tag: 'Pecahan berpangkat', r: `(${fr('a', 'b')})<sup>n</sup> = ${fr(sup('a', 'n'), sup('b', 'n'))}`, q: `Hitunglah (${fr(2, 3)})<sup>3</sup>.`, l: ['Pembilang dan penyebut sama-sama dipangkatkan 3.', 'Pembilang: 2<sup>3</sup> = 2 × 2 × 2 = 8.', 'Penyebut: 3<sup>3</sup> = 3 × 3 × 3 = 27.', 'Susun kembali menjadi pecahan: 8/27.'], j: '8/27' },
    { tag: 'Gabungan sifat', r: 'Kerjakan dari kiri ke kanan, gunakan sifat yang sesuai', q: `Sederhanakan ${sup(2, 5)} × ${sup(2, 3)} ÷ ${sup(2, 6)}.`, l: ['Kerjakan perkalian dulu: 2<sup>5</sup> × 2<sup>3</sup> = 2<sup>5+3</sup> = 2<sup>8</sup>.', 'Lanjut pembagian: 2<sup>8</sup> ÷ 2<sup>6</sup> = 2<sup>8−6</sup> = 2<sup>2</sup>.', 'Hitung nilainya: 2<sup>2</sup> = 4.'], j: '4' },
    { tag: 'Penerapan sehari-hari', r: `Penggandaan berulang = ${sup(2, 'n')}`, q: 'Selembar kertas dilipat dua berulang kali. Setiap lipatan menggandakan jumlah lapisnya. Berapa lapis kertas setelah 6 kali dilipat?', l: ['Tiap lipatan, jumlah lapis dikali 2.', 'Setelah 6 lipatan: 2 × 2 × 2 × 2 × 2 × 2 = 2<sup>6</sup>.', 'Hitung bertahap: 2, 4, 8, 16, 32, 64.'], j: '64 lapis' }
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
  { k: 'game', ik: '🏰', t: 'Istana Harta Karun', n: 'Kuis Edukasi', d: '4 jenis kuis, 5 soal per sesi', c1: '#ec4899', c2: '#f9a8d4' }
]
const opt = (a, b, s, L) => Array.from({ length: b - a + 1 }, (_, i) => `<option value="${a + i}" ${a + i === s ? 'selected' : ''}>${L ? L[i] : a + i}</option>`).join('')

function bukaMateri1(m, aktif) {
  window.scrollTo(0, 0); clearInterval(window._kuisTimer)
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
    contoh: `<div class="card"><h3>🗺️ Peta Rahasia</h3><p class="kecil">Setiap contoh punya 3 bagian: konsep yang dipakai, langkah penyelesaian, dan jawaban akhir.</p></div>
      ${M1.contoh.map((c, i) => `<div class="card box"><div class="cx-head"><span class="cx-no">Contoh ${i + 1}</span><span class="cx-tag">${c.tag}</span></div>
        <div class="cx-soal">${c.q}</div><div class="cx-r">📌 <b>Konsep:</b> ${c.r}</div>
        ${c.l.map((x, n) => `<div class="lg"><span class="no">${n + 1}</span><div>${x}</div></div>`).join('')}
        <div class="cx-j">✅ <b>Jawaban:</b> ${c.j}</div></div>`).join('')}`,
    latihan: `<div class="card"><h3>⚔️ Arena Latihan</h3><p class="kecil">Tanpa batas waktu. Kalau salah, kamu boleh coba lagi atau langsung lihat pembahasan.</p><div id="latihan"></div></div>`,
    game: `<div class="card"><h3>🏰 Kuis Edukasi</h3><p class="kecil">Pilih jenis kuis. Tiap sesi 5 soal dengan batas waktu.</p><div id="game"></div></div>`
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
  if (L.k === 'game') kuis1()
}

/* ---------- Visual interaktif: satu tab per topik ---------- */
function visual1() {
  const T = [['p', '🔢 Pengertian'], ['k', '✖️ Perkalian'], ['b', '➗ Pembagian'], ['pp', '🔁 Perpangkatan'], ['pk', '🧩 Pangkat pada perkalian'], ['n', '🪜 Nol & Negatif'], ['pc', '🍰 Pecahan'], ['hs', '🌍 Sehari-hari']]
  const CFG = { p: [['a', 'Bilangan dasar', 2, 9], ['n', 'Pangkat', 0, 8]], k: [['a', 'Basis', 2, 5], ['m', 'm', 1, 5], ['n', 'n', 1, 5]],
    b: [['a', 'Basis', 2, 5], ['m', 'm', 2, 7], ['n', 'n', 1, 5]], pp: [['a', 'Basis', 2, 4], ['m', 'm', 1, 4], ['n', 'n', 1, 4]],
    pk: [['a', 'a', 2, 4], ['b', 'b', 2, 4], ['n', 'Pangkat', 1, 3]], n: [['a', 'Basis', 2, 5]], pc: [['p', 'Pembilang', 1, 5], ['q', 'Penyebut', 2, 6], ['n', 'Pangkat', 1, 4]],
    hs: [['a', 'Skenario', 1, 3, ['Lipat kertas', 'Pesan berantai', 'Bakteri membelah']], ['n', 'Langkah', 1, 10]] }
  const S = { p: { a: 3, n: 5 }, k: { a: 2, m: 3, n: 2 }, b: { a: 3, m: 5, n: 2 }, pp: { a: 2, m: 3, n: 2 }, pk: { a: 2, b: 3, n: 2 }, n: { a: 2 }, pc: { p: 2, q: 3, n: 3 }, hs: { a: 1, n: 5 } }
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
    } else if (tab === 'pc') {
      isi = Array.from({ length: n }, (_, i) => `<div>(${fr(p, q)})<sup>${i + 1}</sup> = ${fr(p ** (i + 1), q ** (i + 1))}<div class="batang"><i style="width:${(p / q) ** (i + 1) * 100}%"></i></div></div>`).join('')
      eq = `<div class="besar">(${fr(p, q)})<sup>${n}</sup> = ${fr(sup(p, n), sup(q, n))} = ${fr(p ** n, q ** n)}</div>`
      tip = `Pembilang dan penyebut sama-sama dipangkatkan ${n}. Perhatikan batangnya: pecahan antara 0 dan 1 justru makin kecil kalau dipangkatkan.`
    } else {
      const SK = [{ b: 2, u: 'lapis', t: 'Setiap lipatan menggandakan jumlah lapis kertas' }, { b: 3, u: 'orang', t: 'Setiap orang meneruskan pesan ke 3 orang baru' }, { b: 2, u: 'sel bakteri', t: 'Setiap sel membelah menjadi 2' }][a - 1], mx = SK.b ** n
      isi = Array.from({ length: n }, (_, i) => `<div>Langkah ${i + 1}: ${sup(SK.b, i + 1)} = <b>${fmt(SK.b ** (i + 1))}</b> ${SK.u}<div class="batang"><i style="width:${SK.b ** (i + 1) / mx * 100}%"></i></div></div>`).join('')
      eq = `<div class="besar">${sup(SK.b, n)} = ${fmt(mx)} ${SK.u}</div><div class="kecil">${SK.t}</div>`
      tip = `Tiap langkah jumlahnya dikali ${SK.b}. Perhatikan batangnya: langkah terakhir jauh lebih panjang daripada langkah-langkah awal. Itulah kekuatan bilangan berpangkat!`
    }
    $('vis').innerHTML = `<div class="tabsv">${T.map(([k, nm]) => `<button data-t="${k}" class="${k === tab ? 'on' : ''}">${nm}</button>`).join('')}</div>
      <div class="pilih">${CFG[tab].map(([k, l, lo, hi, LB]) => `<label>${l} <select data-k="${k}">${opt(lo, hi, v[k], LB)}</select></label>`).join('')}${tab === 'p' ? '<button class="btn alt" id="acak">🎲 Coba Acak</button>' : ''}</div>
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

/* ---------- Bank soal kuis (dibangkitkan dari rumus, tiap nomor = soal berbeda) ---------- */
const gcd = (a, b) => b ? gcd(b, a % b) : a
const ex = r => r < 0 ? '−' + (-r) : r
const fq = (u, v) => v === 1 ? String(u) : fr(u, v)
const pw = (b, r) => r > 0 ? sup(b, r) : r === 0 ? '1' : fr(1, sup(b, -r))
const hasilTxt = (b, r) => r > 0 ? `Hasil: ${sup(b, r)}` : r === 0 ? `${sup(b, 0)} = 1` : `${sup(b, ex(r))} = 1/${sup(b, -r)} (pangkat negatif = kebalikan)`
const D = (i, ...r) => r.map(x => { const v = i % x; i = Math.floor(i / x); return v })
const T = v => typeof v === 'number' ? fmt(v) : String(v)
const acak = a => [...a].sort(() => Math.random() - .5)
const CERITA = [
  (x, g, t) => `Satu koloni bakteri berjumlah ${x} ribu sel dan menjadi ${g} kali lipat setiap jam. Berapa ribu sel setelah ${t} jam?`,
  (x, g, t) => `Sebuah pesan berantai dikirim oleh ${x} orang. Tiap putaran jumlah penerimanya menjadi ${g} kali jumlah sebelumnya. Berapa orang pada putaran ke-${t}?`,
  (x, g, t) => `Jamur di sebuah kebun massanya ${x} gram dan menjadi ${g} kali lipat setiap hari. Berapa gram massanya ${t} hari kemudian?`,
  (x, g, t) => `Di sebuah permainan, koin menjadi ${g} kali lipat setiap naik level. Pada level awal ada ${x} koin. Berapa koin setelah naik ${t} level?`,
  (x, g, t) => `Seorang kreator punya ${x} ribu pengikut. Jumlah pengikutnya menjadi ${g} kali lipat setiap bulan. Berapa ribu pengikut setelah ${t} bulan?`,
  (x, g, t) => `Sebuah tanaman air mula-mula menutupi ${x} meter persegi kolam dan menjadi ${g} kali lipat setiap pekan. Berapa meter persegi setelah ${t} pekan?`
]
const FAM = [
  { id: 'hitung', n: 40, lv: 1, int: 1, pair: 1, mk: i => { const [x, y] = D(i, 8, 5), b = 2 + x, n = 2 + y, a = b ** n
    return { e: sup(b, n), a, w: [b * n, b ** (n + 1), b ** (n - 1)], tip: 'Basis dikalikan berulang sebanyak pangkatnya.', s: [`${sup(b, n)} artinya ${b} dikalikan sebanyak ${n} kali`, Array(n).fill(b).join(' × '), `= ${fmt(a)}`] } } },
  { id: 'kaliNilai', n: 128, lv: 1, int: 1, pair: 1, mk: i => { const [x, y, z] = D(i, 8, 4, 4), b = 2 + x, m = 1 + y, n = 1 + z, a = b ** (m + n)
    return { e: `${sup(b, m)} × ${sup(b, n)}`, a, w: [b ** (m * n), b * (m + n), a + b], tip: 'Basis sama dikali, pangkat dijumlahkan.', s: [`Basis sama (${b}): pangkat dijumlahkan, ${m} + ${n} = ${m + n}`, sup(b, m + n), `= ${fmt(a)}`] } } },
  { id: 'bagiNilai', n: 288, lv: 1, int: 1, pair: 1, mk: i => { const [x, y, z] = D(i, 8, 6, 6), b = 2 + x, r = 1 + y, n = 1 + z, m = n + r, a = b ** r
    return { e: `${sup(b, m)} ÷ ${sup(b, n)}`, a, w: [b ** (m + n), b * r, b ** (r + 1)], tip: 'Basis sama dibagi, pangkat dikurangkan.', s: [`Basis sama (${b}): pangkat dikurangkan, ${m} − ${n} = ${r}`, sup(b, r), `= ${fmt(a)}`] } } },
  { id: 'nol', n: 576, lv: 1, int: 1, pair: 1, mk: i => { const [x, y, z] = D(i, 8, 8, 9), b = 2 + x, c = 2 + y, d = 1 + z
    return { e: `${sup(b, 0)} × ${d} + ${sup(c, 0)}`, a: d + 1, w: [d, b + d, d + 2], tip: 'Bilangan apa pun (selain 0) berpangkat nol hasilnya 1.', s: [`Pangkat nol hasilnya 1: ${sup(b, 0)} = 1 dan ${sup(c, 0)} = 1`, `1 × ${d} + 1`, `= ${d + 1}`] } } },
  { id: 'neg', n: 40, lv: 1, pair: 1, mk: i => { const [x, y] = D(i, 8, 5), b = 2 + x, n = 1 + y, r = b ** n
    return { e: sup(b, '−' + n), a: fr(1, r), w: ['−' + r, fr(1, b * n), String(r)], f: j => fr(1, r + j), tip: 'Pangkat negatif berarti kebalikan, bukan hasil negatif.', s: [`Pangkat negatif berarti kebalikan: ${sup(b, '−' + n)} = 1/${sup(b, n)}`, `${sup(b, n)} = ${r}`, `Hasil: 1/${r}`] } } },
  { id: 'bentuk', n: 56, lv: 1, int: 1, mk: i => { const [x, y] = D(i, 8, 7), b = 2 + x, n = 2 + y
    return { q: `${fmt(b ** n)} = ${sup(b, '?')}. Berapakah pangkat yang tepat?`, a: n, w: [n + 1, n - 1, b], tip: 'Kalikan basis berulang sampai hasilnya sama dengan bilangan itu.', s: [`Kalikan ${b} berulang sampai mencapai ${fmt(b ** n)}`, Array.from({ length: n }, (_, k) => fmt(b ** (k + 1))).join(' → '), `${b} dikalikan ${n} kali, jadi pangkatnya ${n}`] } } },
  { id: 'kali', n: 648, lv: 2, pair: 1, mk: i => { const [x, y, z] = D(i, 8, 9, 9), b = 2 + x, m = 1 + y, n = 1 + z
    return { e: `${sup(b, m)} × ${sup(b, n)}`, a: sup(b, m + n), w: [sup(b, m * n), sup(b * b, m + n), sup(b, m + n + 1)], f: j => sup(b, m + n + 1 + j), tip: 'Basis sama dikali, pangkat dijumlahkan.', s: [`Basis sama (${b}), jadi pangkat dijumlahkan`, `${m} + ${n} = ${m + n}`, `Hasil: ${sup(b, m + n)}`] } } },
  { id: 'bagi', n: 1568, lv: 2, pair: 1, mk: i => { const [x, y, z] = D(i, 8, 14, 14), b = 2 + x, m = 2 + y, n = 1 + z, r = m - n
    return { e: `${sup(b, m)} ÷ ${sup(b, n)}`, a: pw(b, r), w: [pw(b, m + n), pw(b, m * n), pw(b, r + 1)], f: j => pw(b, r + 1 + j), tip: 'Basis sama dibagi, pangkat dikurangkan.', s: [`Basis sama (${b}), jadi pangkat dikurangkan`, `${m} − ${n} = ${ex(r)}`, hasilTxt(b, r)] } } },
  { id: 'pp', n: 512, lv: 2, pair: 1, mk: i => { const [x, y, z] = D(i, 8, 8, 8), b = 2 + x, m = 2 + y, n = 2 + z
    return { e: `(${sup(b, m)})<sup>${n}</sup>`, a: sup(b, m * n), w: [sup(b, m + n), sup(b, m * n - 1), sup(b, m * n + 1)], f: j => sup(b, m * n + 1 + j), tip: 'Pangkat dari pangkat, pangkatnya dikalikan.', s: ['Perpangkatan: pangkatnya dikalikan', `${m} × ${n} = ${m * n}`, `Hasil: ${sup(b, m * n)}`] } } },
  { id: 'pk', n: 192, lv: 2, int: 1, pair: 1, mk: i => { const [x, y, z] = D(i, 8, 8, 3), a = 2 + x, b = 2 + y, n = 2 + z, r = (a * b) ** n
    return { e: `(${a} × ${b})<sup>${n}</sup>`, a: r, w: [a * b * n, a ** n * b, a ** n + b ** n], tip: 'Pangkat dibagikan ke setiap faktor.', s: [`Pangkat dibagikan ke tiap faktor: ${sup(a, n)} × ${sup(b, n)}`, `${a ** n} × ${b ** n}`, `= ${fmt(r)}`] } } },
  { id: 'negKali', n: 648, lv: 2, pair: 1, mk: i => { const [x, y, z] = D(i, 8, 9, 9), b = 2 + x, m = 1 + y, n = 1 + z, r = n - m
    return { e: `${sup(b, '−' + m)} × ${sup(b, n)}`, a: pw(b, r), w: [pw(b, m + n), pw(b, -(m + n)), pw(b, r + 1)], f: j => pw(b, r + 1 + j), tip: 'Basis sama dikali, pangkat dijumlahkan (termasuk pangkat negatif).', s: ['Basis sama, jadi pangkat dijumlahkan', `(−${m}) + ${n} = ${ex(r)}`, hasilTxt(b, r)] } } },
  { id: 'pecahan', n: 396, lv: 2, pair: 1, mk: i => { const [x, y, z] = D(i, 9, 11, 4), p = 1 + x, q0 = 2 + y, q = q0 === p ? 13 : q0, n = 2 + z, P = p ** n, Q = q ** n, g = gcd(P, Q)
    return { e: `(${fr(p, q)})<sup>${n}</sup>`, q: `(${fr(p, q)})<sup>${n}</sup> = ?${g > 1 ? ' (bentuk paling sederhana)' : ''}`, a: fq(P / g, Q / g), w: [fr(P, q), fr(p, Q), fr(p * n, Q)], f: j => fr(P / g, Q / g + j), tip: 'Pembilang dan penyebut sama-sama dipangkatkan.', s: [`Pembilang dan penyebut sama-sama dipangkatkan ${n}`, `${sup(p, n)} / ${sup(q, n)} = ${P}/${Q}`, g > 1 ? `Sederhanakan: ${P}/${Q} = ${P / g}/${Q / g}` : `Hasil: ${P}/${Q}`] } } },
  { id: 'gab', n: 13824, lv: 2, pair: 1, mk: i => { const [x, y, z, u] = D(i, 8, 12, 12, 12), b = 2 + x, m = 1 + y, n = 1 + z, k = 1 + u, r = m + n - k
    return { e: `${sup(b, m)} × ${sup(b, n)} ÷ ${sup(b, k)}`, a: pw(b, r), w: [pw(b, m + n + k), pw(b, m * n - k), pw(b, r + 1)], f: j => pw(b, r + 1 + j), tip: 'Kerjakan dari kiri: perkalian menjumlah pangkat, pembagian mengurangi pangkat.', s: [`Perkalian dulu: pangkat dijumlahkan, ${m} + ${n} = ${m + n}`, `Lalu pembagian: pangkat dikurangkan, ${m + n} − ${k} = ${ex(r)}`, hasilTxt(b, r)] } } },
  { id: 'cerita', n: 1512, lv: 2, int: 1, mk: i => { const [sc, y, z, u] = D(i, 6, 9, 7, 4), x0 = 1 + y, t = 2 + z, g = 2 + u, a = x0 * g ** t
    return { q: CERITA[sc](x0, g, t), a, w: [x0 * g * t, g ** t, x0 * g ** (t - 1)], tip: 'Setiap periode jumlahnya dikali g, jadi setelah t periode dikali g pangkat t.', s: [`Tiap periode dikali ${g}, jadi setelah ${t} periode dikali ${sup(g, t)}`, `${sup(g, t)} = ${fmt(g ** t)}`, `${x0} × ${fmt(g ** t)} = ${fmt(a)}`] } } },
  { id: 'cariX', n: 1152, lv: 2, int: 1, mk: i => { const [x, y, z] = D(i, 8, 12, 12), b = 2 + x, c = 1 + y, m = 1 + z
    return { q: `${sup(b, 'x')} × ${sup(b, m)} = ${sup(b, c + m)}. Berapakah x?`, a: c, w: [m, c + m, c * m], tip: 'Basis sama dikali, pangkat dijumlahkan.', s: [`Basis sama, pangkat dijumlahkan: x + ${m} = ${c + m}`, `x = ${c + m} − ${m}`, `x = ${c}`] } } },
  { id: 'cariX2', n: 864, lv: 2, int: 1, mk: i => { const [x, y, z] = D(i, 8, 9, 12), b = 2 + x, r = 1 + y, c = 1 + z
    return { q: `${sup(b, r + c)} ÷ ${sup(b, 'x')} = ${sup(b, r)}. Berapakah x?`, a: c, w: [r, r + c, r * c], tip: 'Basis sama dibagi, pangkat dikurangkan.', s: [`Basis sama, pangkat dikurangkan: ${r + c} − x = ${r}`, `x = ${r + c} − ${r}`, `x = ${c}`] } } },
  { id: 'pkBentuk', n: 768, lv: 3, mk: i => { const [x, y, z, u, v] = D(i, 4, 4, 4, 4, 3), a = 2 + x, b = a + 1 + y, m = 1 + z, n = 1 + u, p = 2 + v
    return { e: `(${sup(a, m)} × ${sup(b, n)})<sup>${p}</sup>`, a: `${sup(a, m * p)} × ${sup(b, n * p)}`, w: [`${sup(a, m + p)} × ${sup(b, n + p)}`, `${sup(a, m * p)} × ${sup(b, n)}`, `${sup(a, m)} × ${sup(b, n * p)}`], f: j => `${sup(a, m * p + j)} × ${sup(b, n * p)}`, tip: 'Pangkat dibagikan ke tiap faktor, lalu pangkat dari pangkat dikalikan.', s: [`Pangkat ${p} dibagikan ke tiap faktor`, `(${sup(a, m)})<sup>${p}</sup> × (${sup(b, n)})<sup>${p}</sup>`, `${sup(a, m * p)} × ${sup(b, n * p)}`] } } },
  { id: 'pecNeg', n: 396, lv: 3, pair: 1, mk: i => { const [x, y, z] = D(i, 9, 11, 4), p = 1 + x, q0 = 2 + y, q = q0 === p ? 13 : q0, n = 2 + z, P = p ** n, Q = q ** n, g = gcd(P, Q)
    return { e: `(${fr(p, q)})<sup>−${n}</sup>`, a: fq(Q / g, P / g), w: [fr(P, Q), fq(Q, p), fq(q, P)], f: j => fq(Q / g + j, P / g), tip: 'Pangkat negatif pada pecahan: pecahan dibalik, lalu dipangkatkan.', s: ['Pangkat negatif pada pecahan: pecahannya dibalik', `(${fr(q, p)})<sup>${n}</sup> = ${Q}/${P}`, g > 1 ? `Sederhanakan: ${Q}/${P} = ${Q / g}/${P / g}` : `Hasil: ${Q}/${P}`] } } },
  { id: 'mix', n: 64800, lv: 3, mk: i => { const [x, y, z, u, v] = D(i, 8, 9, 9, 5, 20), b = 2 + x, m = 1 + y, n = 1 + z, p = 2 + u, k = 1 + v, r = p * (m + n) - k
    return { e: `(${sup(b, m)} × ${sup(b, n)})<sup>${p}</sup> ÷ ${sup(b, k)}`, a: pw(b, r), w: [pw(b, m + n + p - k), pw(b, m * n * p - k), pw(b, r + 1)], f: j => pw(b, r + 1 + j), tip: 'Kurung dulu (pangkat dijumlah), lalu dipangkatkan (dikali), lalu dibagi (dikurang).', s: [`Dalam kurung: pangkat dijumlahkan, ${m} + ${n} = ${m + n}`, `Dipangkatkan ${p}: pangkat dikalikan, ${m + n} × ${p} = ${(m + n) * p}`, `Dibagi ${sup(b, k)}: pangkat dikurangkan, ${(m + n) * p} − ${k} = ${ex(r)}`, hasilTxt(b, r)] } } },
  { id: 'mix2', n: 25920, lv: 3, mk: i => { const [x, y, z, u, v] = D(i, 8, 9, 9, 4, 10), b = 2 + x, m = 2 + y, n = 1 + z, p = 2 + u, k = 1 + v, d = m - n, r = p * d + k
    return { e: `(${sup(b, m)} ÷ ${sup(b, n)})<sup>${p}</sup> × ${sup(b, k)}`, a: pw(b, r), w: [pw(b, p * d - k), pw(b, d + p + k), pw(b, r + 1)], f: j => pw(b, r + 1 + j), tip: 'Kurung dulu (pangkat dikurang), lalu dipangkatkan (dikali), lalu dikali (dijumlah).', s: [`Dalam kurung: pangkat dikurangkan, ${m} − ${n} = ${ex(d)}`, `Dipangkatkan ${p}: pangkat dikalikan, ${ex(d)} × ${p} = ${ex(d * p)}`, `Dikali ${sup(b, k)}: pangkat dijumlahkan, ${ex(d * p)} + ${k} = ${ex(r)}`, hasilTxt(b, r)] } } }
]
const TOTAL = FAM.reduce((t, f) => t + f.n, 0)
const sudah = new Set()
const bangun = (f, i) => { const x = f.mk(i); x.q = x.q || `${x.e} = ?`; x.fam = f.id; x.int = !!f.int; return x }
const tarik = (lv, fl) => {
  const c = FAM.filter(f => f.lv === lv && fl(f)), pool = c.length ? c : FAM.filter(fl)
  for (let t = 0; t < 40; t++) { const f = pool[Math.floor(Math.random() * pool.length)], i = Math.floor(Math.random() * f.n); if (!sudah.has(f.id + ':' + i)) { sudah.add(f.id + ':' + i); return bangun(f, i) } }
  const f = pool[0]; return bangun(f, Math.floor(Math.random() * f.n))
}
const pilihan = x => {
  const set = new Set([T(x.a)]); x.w.forEach(v => { if (typeof v !== 'number' || v > 0) set.add(T(v)) })
  let j = 1; while (set.size < 4) set.add(T(x.f ? x.f(j++) : x.a + j++ * 2))
  const o = acak(set); return { o, ok: o.indexOf(T(x.a)) }
}

/* ---------- Kuis edukasi: 4 jenis, 5 soal per sesi, ada batas waktu ---------- */
function kuis1() {
  const el = $('game'), qs = (sel, f) => $('kbody').querySelectorAll(sel).forEach(f)
  const MODE = {
    biasa: { n: 'Kuis Biasa', ik: '📝', w: 180, d: '5 soal pilihan ganda' },
    cocok: { n: 'Mencocokkan', ik: '🔗', w: 120, d: 'Pasangkan 5 soal dengan hasilnya' },
    puzzle: { n: 'Puzzle', ik: '🧩', w: 240, d: 'Susun langkah penyelesaian dari 5 soal' },
    cepat: { n: 'Hitung Cepat', ik: '⚡', w: 90, d: 'Ketik jawaban 5 soal secepatnya' }
  }
  const wkt = d => d >= 60 ? `${Math.floor(d / 60)} menit${d % 60 ? ' ' + d % 60 + ' detik' : ''}` : `${d} detik`
  const mm = d => `${Math.floor(d / 60)}:${String(d % 60).padStart(2, '0')}`
  let S = null
  const stop = () => clearInterval(window._kuisTimer)

  const menu = () => {
    stop()
    el.innerHTML = `<p class="kecil">Bank soal: <b>${fmt(TOTAL)}</b> soal berbeda, dibuat dari angka-angka yang berganti. Tiap sesi berisi 5 soal dengan batas waktu. Di akhir kamu bisa melihat benar-salahnya beserta pembahasan, lalu main lagi dengan soal yang berbeda.</p>
      <div class="grid">${Object.entries(MODE).map(([k, m]) => `<div class="card materi"><div class="ikon">${m.ik}</div><h3>${m.n}</h3><p>${m.d}</p><p class="kecil">Waktu: ${wkt(m.w)}</p><button class="btn" data-m="${k}">Mulai</button></div>`).join('')}</div>`
    el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => mulai(b.dataset.m))
  }

  const mulai = mode => {
    const M = MODE[mode], lv = mode === 'cepat' || mode === 'cocok' ? [1, 1, 2, 2, 2] : [1, 1, 2, 2, 3]
    const fl = mode === 'cepat' ? f => f.int : mode === 'cocok' ? f => f.pair : () => true, soal = []
    lv.forEach(l => { for (let t = 0; t < 25; t++) { const x = tarik(l, fl); if (mode !== 'cocok' || t === 24 || !soal.some(o => T(o.a) === T(x.a))) { soal.push(x); break } } })
    soal.forEach(x => {
      if (mode === 'biasa') x.p = pilihan(x)
      if (mode === 'puzzle') { let p; do { p = acak(x.s.map((_, k) => k)) } while (p.every((v, k) => v === k)); x.perm = p }
    })
    S = { mode, soal, jwb: Array(5).fill(null), i: 0, cur: [], pasang: Array(5).fill(null), sel: null, R: acak([0, 1, 2, 3, 4]), akhir: Date.now() + M.w * 1000 }
    el.innerHTML = `<div class="kecil" style="display:flex;justify-content:space-between"><b>${M.ik} ${M.n}</b><span>⏱ <b id="tsisa">${mm(M.w)}</b></span></div><div class="prog"><span id="tbar" style="width:100%"></span></div><div id="kbody" style="margin-top:12px"></div>`
    stop(); window._kuisTimer = setInterval(tick, 500); tampil()
  }
  const tick = () => {
    if (!$('tsisa') || !S) return stop()
    const sisa = Math.max(0, Math.ceil((S.akhir - Date.now()) / 1000))
    $('tsisa').textContent = mm(sisa); $('tbar').style.width = (sisa / MODE[S.mode].w * 100) + '%'
    if (sisa <= 0) selesai(true)
  }
  const lanjut = () => { S.i++; S.i < 5 ? tampil() : selesai(false) }
  const tampil = () => ({ biasa: tBiasa, cepat: tCepat, puzzle: tPuzzle, cocok: tCocok })[S.mode]()

  const tBiasa = () => {
    const x = S.soal[S.i]
    $('kbody').innerHTML = `<p class="kecil">Soal ${S.i + 1} dari 5</p><div class="soalbesar">${x.q}</div><div class="pilgrid">${x.p.o.map((t, n) => `<button class="opsi" data-n="${n}">${t}</button>`).join('')}</div>`
    qs('.opsi', b => b.onclick = () => { S.jwb[S.i] = +b.dataset.n; lanjut() })
  }
  const tCepat = () => {
    const x = S.soal[S.i]
    $('kbody').innerHTML = `<p class="kecil">Soal ${S.i + 1} dari 5. Ketik jawabanmu lalu tekan Enter.</p><div class="soalbesar">${x.q}</div>
      <div style="display:flex;gap:8px"><input id="ans" inputmode="numeric" autocomplete="off" placeholder="Jawabanmu"><button class="btn" id="kirim">Jawab</button></div>`
    const kirim = () => { const v = $('ans').value.trim(); if (!v) return; S.jwb[S.i] = v; lanjut() }
    $('kirim').onclick = kirim; $('ans').onkeydown = e => { if (e.key === 'Enter') kirim() }; $('ans').focus()
  }
  const tPuzzle = () => {
    const x = S.soal[S.i], c = S.cur
    $('kbody').innerHTML = `<p class="kecil">Soal ${S.i + 1} dari 5. Susun langkah penyelesaian dengan urutan yang benar.</p><div class="soalbesar">${x.q}</div>
      ${x.s.map((_, k) => `<div class="slot"><b>${k + 1}.</b> ${c[k] !== undefined ? x.s[c[k]] : '<span class="kecil">pilih langkah ...</span>'}</div>`).join('')}
      <p class="kecil" style="margin-bottom:0">Pilih langkah berikutnya:</p>${x.perm.filter(k => !c.includes(k)).map(k => `<button class="opsi" data-k="${k}">${x.s[k]}</button>`).join('')}
      <p><button class="btn alt" id="undo" ${c.length ? '' : 'disabled'}>↩ Hapus langkah terakhir</button> <button class="btn" id="lj" ${c.length === x.s.length ? '' : 'disabled'}>${S.i < 4 ? 'Lanjut' : 'Selesai'}</button></p>`
    qs('[data-k]', b => b.onclick = () => { c.push(+b.dataset.k); tPuzzle() })
    $('undo').onclick = () => { c.pop(); tPuzzle() }
    $('lj').onclick = () => { S.jwb[S.i] = c.slice(); S.cur = []; lanjut() }
  }
  const tCocok = () => {
    const P = S.pasang, L = 'ABCDE'
    $('kbody').innerHTML = `<p class="kecil">Klik soal di kiri, lalu klik hasil yang cocok di kanan. Kamu boleh mengubah pasangan sebelum menekan Selesai.</p>
      <div class="cocok"><div>${S.soal.map((x, i) => `<button class="opsi ${S.sel === i ? 'pilih' : ''}" data-l="${i}">${i + 1}. ${x.e}${P[i] !== null ? `<b class="lbl">→ ${L[S.R.indexOf(P[i])]}</b>` : ''}</button>`).join('')}</div>
      <div>${S.R.map((id, j) => `<button class="opsi ${P.includes(id) ? 'terpakai' : ''}" data-r="${id}"><b>${L[j]}.</b> ${T(S.soal[id].a)}</button>`).join('')}</div></div>
      <p><button class="btn" id="cek" ${P.includes(null) ? 'disabled' : ''}>Selesai dan periksa</button></p>`
    qs('[data-l]', b => b.onclick = () => { S.sel = +b.dataset.l; tCocok() })
    qs('[data-r]', b => b.onclick = () => { if (S.sel === null) return; const id = +b.dataset.r; P.forEach((v, k) => { if (v === id) P[k] = null }); P[S.sel] = id; S.sel = null; tCocok() })
    $('cek').onclick = () => selesai(false)
  }

  const selesai = habis => {
    stop(); const M = MODE[S.mode], pakai = M.w - Math.max(0, Math.ceil((S.akhir - Date.now()) / 1000))
    if (S.mode === 'puzzle' && S.cur.length && S.jwb[S.i] == null) S.jwb[S.i] = S.cur
    const num = v => Number(String(v).replace(/[.\s]/g, '').replace(',', '.'))
    const R = S.soal.map((x, i) => {
      const j = S.jwb[i]; let ok, jw, bn, q = x.q
      if (S.mode === 'biasa') { ok = j === x.p.ok; jw = j == null ? null : x.p.o[j]; bn = x.p.o[x.p.ok] }
      else if (S.mode === 'cepat') { ok = j != null && num(j) === x.a; jw = j; bn = T(x.a) }
      else if (S.mode === 'puzzle') { ok = !!j && j.length === x.s.length && j.every((v, k) => v === k); jw = j && j.length ? j.map(v => x.s[v]).join(' → ') : null; bn = x.s.join(' → ') }
      else { const p = S.pasang[i]; ok = p === i; jw = p == null ? null : T(S.soal[p].a); bn = T(x.a); q = x.e }
      return { ok, jw, bn, q, x }
    })
    const benar = R.filter(r => r.ok).length
    el.innerHTML = `<h3>Hasil: ${benar} dari 5 soal benar ${benar === 5 ? '🎉' : ''}</h3>
      <p class="kecil">${habis ? '⏰ Waktu habis. ' : ''}Waktu terpakai: ${mm(pakai)} dari ${mm(M.w)}. Berikut penjelasan tiap soal:</p>
      ${R.map((r, i) => `<div class="rv ${r.ok ? 'b' : 's'}"><b>${r.ok ? '✅ Benar' : '❌ Salah'}</b> <span class="kecil">Soal ${i + 1}</span><div class="rq">${r.q}</div>
        <div class="kecil">Jawabanmu: ${r.jw == null ? '<i>belum dijawab</i>' : r.jw}</div>${r.ok ? '' : `<div class="kecil">Jawaban yang benar: <b>${r.bn}</b></div>`}
        <div class="pb"><b>Pembahasan:</b><ol>${r.x.s.map(t => `<li>${t}</li>`).join('')}</ol></div></div>`).join('')}
      <p><button class="btn" id="lagi">🔁 Kuis lagi (soal berbeda)</button> <button class="btn alt" id="pilih">☰ Pilih jenis kuis</button></p>`
    $('lagi').onclick = () => mulai(S.mode); $('pilih').onclick = menu
  }
  menu()
}

const _bukaAsli = bukaMateri
window.bukaMateri = m => m.urutan === 1 ? bukaMateri1(m) : _bukaAsli(m)
