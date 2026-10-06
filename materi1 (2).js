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

const M1 = {
  penjelasan: `<p>Pernah menghitung 2 × 2 × 2 × 2 × 2? Daripada menulis panjang-panjang, kita ringkas menjadi <b>${sup(2, 5)}</b>. Itulah <b>bilangan berpangkat</b>: cara singkat menulis perkalian yang berulang.</p>
    <p>Pada ${sup('a', 'n')}, <b>a</b> disebut <b>basis</b> (bilangan yang dikalikan) dan <b>n</b> disebut <b>pangkat</b> (berapa kali basis dikalikan). Jadi ${sup(2, 5)} = 2 × 2 × 2 × 2 × 2 = 32.</p>
    <p>Supaya hitungan jadi cepat, kita punya <b>sifat-sifat</b> bilangan berpangkat:</p>
    <ul>
      <li><b>Basis sama dikali:</b> pangkatnya <b>dijumlahkan</b>. ${sup('a', 'm')} × ${sup('a', 'n')} = ${sup('a', 'm+n')}</li>
      <li><b>Basis sama dibagi:</b> pangkatnya <b>dikurangkan</b>. ${sup('a', 'm')} ÷ ${sup('a', 'n')} = ${sup('a', 'm−n')}</li>
      <li><b>Pangkat dari pangkat:</b> pangkatnya <b>dikalikan</b>. (${sup('a', 'm')})<sup>n</sup> = ${sup('a', 'm×n')}</li>
      <li><b>Pangkat nol:</b> hasilnya selalu 1 (selama basisnya bukan 0). ${sup('a', 0)} = 1</li>
      <li><b>Pangkat negatif:</b> hasilnya kebalikan. ${sup('a', '−n')} = 1 / ${sup('a', 'n')}</li>
    </ul>
    <div class="tip">💡 Hati-hati! ${sup(2, 3)} <b>bukan</b> 2 × 3 = 6, melainkan 2 × 2 × 2 = 8.</div>`,
  ringkasan: [
    `${sup('a', 'n')} = a × a × ... × a (sebanyak n kali). a = basis, n = pangkat.`,
    `${sup('a', 'm')} × ${sup('a', 'n')} = ${sup('a', 'm+n')} (pangkat dijumlah).`,
    `${sup('a', 'm')} ÷ ${sup('a', 'n')} = ${sup('a', 'm−n')} (pangkat dikurang).`,
    `(${sup('a', 'm')})<sup>n</sup> = ${sup('a', 'm×n')} (pangkat dikali).`,
    `${sup('a', 0)} = 1 dan ${sup('a', '−n')} = 1 / ${sup('a', 'n')}.`,
    'Sifat penjumlahan dan pengurangan pangkat hanya berlaku kalau <b>basisnya sama</b>.'
  ],
  contoh: [
    [`Hitunglah ${sup(3, 4)}.`, '3 × 3 × 3 × 3 = 9 × 3 × 3 = 27 × 3 = 81.'],
    [`Sederhanakan ${sup(2, 3)} × ${sup(2, 5)}.`, `Basis sama (2), jadi pangkat dijumlah: 3 + 5 = 8. Hasilnya ${sup(2, 8)} = 256.`],
    [`Sederhanakan ${sup(5, 7)} ÷ ${sup(5, 4)}.`, `Basis sama (5), pangkat dikurang: 7 − 4 = 3. Hasilnya ${sup(5, 3)} = 125.`],
    [`Hitunglah (${sup(2, 3)})<sup>2</sup>.`, `Pangkat dikali: 3 × 2 = 6. Hasilnya ${sup(2, 6)} = 64.`],
    [`Hitunglah ${sup(4, '−2')}.`, `Pangkat negatif jadi kebalikan: 1 / ${sup(4, 2)} = 1 / 16.`]
  ],
  soal: [
    { q: `Berapakah nilai ${sup(2, 5)}?`, o: ['10', '25', '32', '64'], j: 2, p: '2 × 2 × 2 × 2 × 2 = 32. Ingat, pangkat berarti dikalikan berulang, bukan dikali pangkatnya.' },
    { q: `${sup(3, 2)} × ${sup(3, 3)} = ...`, o: [sup(3, 6), sup(3, 5), sup(9, 5), sup(3, 1)], j: 1, p: 'Basis sama dikali, pangkat dijumlah: 2 + 3 = 5, jadi 3<sup>5</sup>.' },
    { q: `${sup(7, 6)} ÷ ${sup(7, 2)} = ...`, o: [sup(7, 8), sup(7, 3), sup(7, 4), sup(1, 4)], j: 2, p: 'Basis sama dibagi, pangkat dikurang: 6 − 2 = 4, jadi 7<sup>4</sup>.' },
    { q: `(${sup(5, 2)})<sup>3</sup> = ...`, o: [sup(5, 5), sup(5, 6), sup(5, 8), sup(15, 2)], j: 1, p: 'Pangkat dari pangkat dikalikan: 2 × 3 = 6, jadi 5<sup>6</sup>.' },
    { q: `Berapakah nilai ${sup(9, 0)}?`, o: ['0', '1', '9', 'Tidak terdefinisi'], j: 1, p: 'Bilangan apa pun (selain 0) berpangkat nol hasilnya 1.' },
    { q: `${sup(2, '−3')} = ...`, o: ['−8', '−6', '1/6', '1/8'], j: 3, p: 'Pangkat negatif jadi kebalikan: 1 / 2<sup>3</sup> = 1/8.' }
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
    belajar: `<div class="card"><h3>Penjelasan</h3>${M1.penjelasan}</div>
      <div class="card box"><h3>Ringkasan inti</h3><ul>${M1.ringkasan.map(r => `<li>${r}</li>`).join('')}</ul></div>`,
    visual: `<div class="card vis"><div class="row" style="border:0;align-items:flex-start;flex-wrap:wrap"><div>
        <div class="kecil" style="font-weight:800;color:var(--p)">MATHQUEST • DUNIA BILANGAN</div><h3>🔋 Bangun Kekuatan Pangkat!</h3>
        <p class="kecil" style="margin:4px 0 0">Ubah pangkat menjadi perkalian berulang dan lihat bagaimana nilainya terbentuk.</p></div>
        <button class="btn alt" id="acak">🎲 Coba Acak</button></div>
      <div class="pilih"><label>Bilangan dasar <select id="vb">${opt(2, 9, 3)}</select></label><label>Pangkat <select id="vp">${opt(0, 8, 5)}</select></label></div>
      <div class="hasil" id="hs"></div><div class="rantai" id="rantai"></div><div class="tip" id="tipv"></div>
      <div class="grid3"><div><b id="i1"></b><p class="kecil" id="i1d"></p></div><div><b id="i2"></b><p class="kecil">Hasil perkalian berulang.</p></div>
        <div><b>Eksponen</b><p class="kecil">Angka kecil di atas menunjukkan berapa kali perkalian dilakukan.</p></div></div></div>
      <div class="card box"><h3>Uji sifat: basis sama dikali</h3><div class="pilih"><label>m <select id="vm">${opt(1, 5, 2)}</select></label><label>n <select id="vk">${opt(1, 5, 3)}</select></label></div>
        <p id="hs2" style="font-weight:800;margin:0"></p></div>`,
    contoh: `<div class="card"><h3>Contoh soal dan pembahasan</h3>${M1.contoh.map(([q, p], i) => `<p><b>${i + 1}. ${q}</b><br><span class="kecil">${p}</span></p>`).join('')}</div>`,
    latihan: `<div class="card"><h3>Latihan interaktif</h3><p class="kecil">Tanpa batas waktu. Santai saja.</p><div id="latihan"></div></div>`,
    game: `<div class="card"><h3>Game: Power Up Numbers ⚡</h3><p class="kecil">Jawab soal pangkat untuk mengisi energi robot sampai penuh.</p><div id="game"></div></div>`
  }[L.k]
  $('isi').innerHTML = `<p><button class="btn alt" id="menu">☰ Menu materi</button></p>${judul}
    <p class="kecil" style="margin:2px 0 6px">Langkah ${k + 1} dari ${LANGKAH1.length}: <b>${L.n}</b></p>
    <div class="prog"><span style="width:${(k + 1) * 100 / LANGKAH1.length}%"></span></div>
    <div style="margin-top:14px">${konten}</div>
    <div class="navlang">${k > 0 ? '<button class="btn alt" id="sblm">← Sebelumnya</button>' : '<span></span>'}<button class="btn" id="lanjut1">${akhir ? 'Selesai ✔' : 'Berikutnya →'}</button></div>`
  $('menu').onclick = () => bukaMateri1(m)
  if (k > 0) $('sblm').onclick = () => bukaMateri1(m, LANGKAH1[k - 1].k)
  $('lanjut1').onclick = () => akhir ? bukaMateri1(m) : bukaMateri1(m, LANGKAH1[k + 1].k)
  if (L.k === 'visual') visual1()
  if (L.k === 'latihan') latihan(1, M1.soal)
  if (L.k === 'game') game1()
}

function visual1() {
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
  const g = () => {
    const a = +$('vb').value, n = +$('vp').value, m = +$('vm').value, k = +$('vk').value
    $('rantai').innerHTML = n === 0 ? '<span class="chip">1</span>'
      : Array.from({ length: n }, (_, i) => `<span class="chip" style="animation-delay:${i * 60}ms">${a}</span>`).join('<span class="x">×</span>')
    $('hs').innerHTML = `<div class="besar">${sup(a, n)} = ${fmt(a ** n)}</div><div class="kecil">Artinya: ${n === 0 ? '1 (pangkat nol)' : Array(n).fill(a).join(' × ')}</div>`
    $('tipv').innerHTML = '💡 ' + (n === 0 ? `${a} pangkat 0 berarti hasilnya selalu 1, apa pun basisnya (selain 0).`
      : n === 1 ? `${a} pangkat 1 berarti angka ${a} itu sendiri.` : `${a} pangkat ${n} berarti angka ${a} dikalikan dengan dirinya sendiri sebanyak ${n} kali.`)
    $('i1').textContent = n + ' kali'; $('i1d').textContent = `Bilangan ${a} muncul sebagai faktor sebanyak ini.`; $('i2').textContent = fmt(a ** n)
    $('hs2').innerHTML = `${sup(a, m)} × ${sup(a, k)} = ${sup(a, m + '+' + k)} = ${sup(a, m + k)} = <span style="color:var(--p)">${fmt(a ** (m + k))}</span>`
  }
  ;['vb', 'vp', 'vm', 'vk'].forEach(id => $(id).onchange = g)
  $('acak').onclick = () => { $('vb').value = rnd(2, 9); $('vp').value = rnd(1, 7); g() }
  g()
}

function game1() {
  const el = $('game'), rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
  let e = 0, ronde = 0, s
  const buat = () => {
    const t = rnd(0, 4); let q, a, w, h
    if (t === 0) { const b = rnd(2, 5), n = rnd(2, 4); q = `${sup(b, n)} = ?`; a = b ** n; w = [b * n, b ** (n + 1), b ** (n - 1)]; h = `${Array(n).fill(b).join(' × ')} = ${a}` }
    else if (t === 1) { const b = rnd(2, 4), m = rnd(1, 3), n = rnd(1, 3); q = `${sup(b, m)} × ${sup(b, n)} = ?`; a = b ** (m + n); w = [b ** (m * n), (b * b) ** (m + n), a + b]; h = `Pangkat dijumlah: ${sup(b, m + n)} = ${a}` }
    else if (t === 2) { const b = rnd(2, 5), m = rnd(3, 5), n = rnd(1, 2); q = `${sup(b, m)} ÷ ${sup(b, n)} = ?`; a = b ** (m - n); w = [b ** (m + n), a + b, a * b]; h = `Pangkat dikurangi: ${sup(b, m - n)} = ${a}` }
    else if (t === 3) { const b = rnd(2, 3), m = rnd(2, 3), n = rnd(2, 3); q = `(${sup(b, m)})<sup>${n}</sup> = ?`; a = b ** (m * n); w = [b ** (m + n), b ** m * n, a + b]; h = `Pangkat dikali: ${sup(b, m * n)} = ${a}` }
    else { const b = rnd(2, 9), c = rnd(1, 5); q = `${sup(b, 0)} + ${c} = ?`; a = 1 + c; w = [c, b + c, c + 2]; h = `${sup(b, 0)} = 1, jadi 1 + ${c} = ${a}` }
    const set = new Set([a]); w.forEach(v => v > 0 && set.add(v)); let i = 1
    while (set.size < 4) set.add(a + i++ * 2)
    return { q, a, h, o: [...set].sort(() => Math.random() - .5) }
  }
  const tampil = () => {
    s = buat()
    el.innerHTML = `<div class="robot ${e >= 100 ? 'full' : ''}">🤖</div><div class="prog" style="height:16px"><span style="width:${e}%;background:var(--ok)"></span></div>
      <p class="kecil">Energi ${e}%. Jawab benar untuk mengisi energi!</p><p style="font-size:1.5rem;font-weight:800">${s.q}</p>
      ${s.o.map(v => `<button class="opsi" data-v="${v}">${fmt(v)}</button>`).join('')}<div id="gfb"></div>`
    el.querySelectorAll('.opsi').forEach(b => b.onclick = () => {
      const ok = +b.dataset.v === s.a; ronde++; if (ok) e = Math.min(100, e + 20)
      el.querySelectorAll('.opsi').forEach(x => { x.disabled = true; if (+x.dataset.v === s.a) x.classList.add('benar'); else if (x === b) x.classList.add('salah') })
      $('gfb').innerHTML = `<div class="msg ${ok ? 'ok' : 'err'}">${ok ? 'Energi bertambah! ⚡' : 'Belum tepat, tidak apa-apa.'}</div><p>${s.h}</p><button class="btn" id="gl">${e >= 100 ? 'Lihat hasil' : 'Lanjut'}</button>`
      $('gl').onclick = e >= 100 ? menang : tampil
    })
  }
  const menang = () => {
    el.innerHTML = `<div class="robot full">🤖⚡</div><h3 style="text-align:center">POWER UP! Energi penuh 🎉</h3><p style="text-align:center">Kamu butuh ${ronde} soal untuk mengisinya.</p><p style="text-align:center"><button class="btn" id="lagi">Main lagi</button></p>`
    $('lagi').onclick = () => { e = 0; ronde = 0; tampil() }
  }
  tampil()
}

const _bukaAsli = bukaMateri
window.bukaMateri = m => m.urutan === 1 ? bukaMateri1(m) : _bukaAsli(m)
