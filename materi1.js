/* Materi 1: Bilangan Berpangkat (lengkap: penjelasan, visual, ringkasan, contoh, latihan, game) */
const sup = (b, n) => `${b}<sup>${n}</sup>`
const fmt = v => Number(v).toLocaleString('id-ID')

document.head.insertAdjacentHTML('beforeend', `<style>
  .rantai { display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin:14px 0; min-height:56px }
  .chip { min-width:48px; height:48px; padding:0 8px; border-radius:14px; background:linear-gradient(135deg,#ff7a59,#ffb347); color:#fff; font-weight:800; font-size:1.3rem; display:flex; align-items:center; justify-content:center; animation:pop .35s both }
  .x { font-weight:800; color:var(--muted) }
  @keyframes pop { from { transform:scale(.3); opacity:0 } to { transform:scale(1); opacity:1 } }
  .robot { font-size:3.4rem; text-align:center; transition:transform .3s } .robot.full { animation:pop .5s both; transform:scale(1.2) }
  .tip { background:#ffc85733; border-radius:12px; padding:10px 14px; margin-top:12px }
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

function bukaMateri1(m) {
  $('isi').innerHTML = `<p><button class="btn alt" id="kembali">← Kembali</button></p><h2>${aman(m.ikon)} ${aman(m.judul)}</h2>
    <div class="card"><h3>Penjelasan</h3>${M1.penjelasan}</div>
    <div class="card box"><h3>Visual interaktif</h3><p class="kecil">Geser slider dan lihat perkalian berulangnya.</p>
      <label for="vb">Basis (a) = <span id="vbv"></span></label><input id="vb" type="range" min="2" max="9" value="2">
      <label for="vp">Pangkat (n) = <span id="vpv"></span></label><input id="vp" type="range" min="0" max="6" value="3">
      <div class="rantai" id="rantai"></div><p id="hs" style="font-weight:800"></p><hr style="border-color:var(--line)">
      <p><b>Uji sifat:</b> basis sama dikali, pangkat dijumlah</p>
      <label for="vm">m = <span id="vmv"></span></label><input id="vm" type="range" min="1" max="5" value="2">
      <label for="vk">n = <span id="vkv"></span></label><input id="vk" type="range" min="1" max="5" value="3">
      <p id="hs2" style="font-weight:800"></p></div>
    <div class="card box"><h3>Ringkasan inti</h3><ul>${M1.ringkasan.map(r => `<li>${r}</li>`).join('')}</ul></div>
    <div class="card box"><h3>Contoh soal</h3>${M1.contoh.map(([s, p], i) => `<p><b>${i + 1}. ${s}</b><br><span class="kecil">${p}</span></p>`).join('')}</div>
    <div class="card box"><h3>Latihan interaktif</h3><p class="kecil">Tanpa batas waktu. Santai saja.</p><div id="latihan"></div></div>
    <div class="card box"><h3>Game: Power Up Numbers ⚡</h3><p class="kecil">Jawab soal pangkat untuk mengisi energi robot sampai penuh.</p><div id="game"></div></div>`
  $('kembali').onclick = () => tampilUtama(kelasNama)
  visual1(); latihan(1, M1.soal); game1()
}

function visual1() {
  const g = () => {
    const a = +$('vb').value, n = +$('vp').value, m = +$('vm').value, k = +$('vk').value
    $('vbv').textContent = a; $('vpv').textContent = n; $('vmv').textContent = m; $('vkv').textContent = k
    $('rantai').innerHTML = n === 0 ? '<span class="chip">1</span>'
      : Array.from({ length: n }, (_, i) => `<span class="chip" style="animation-delay:${i * 60}ms">${a}</span>`).join('<span class="x">×</span>')
    $('hs').innerHTML = `${sup(a, n)} = ${n === 0 ? '1 (pangkat nol)' : Array(n).fill(a).join(' × ')} = <span style="color:var(--p)">${fmt(a ** n)}</span>`
    $('hs2').innerHTML = `${sup(a, m)} × ${sup(a, k)} = ${sup(a, m + '+' + k)} = ${sup(a, m + k)} = <span style="color:var(--p)">${fmt(a ** (m + k))}</span>`
  }
  ;['vb', 'vp', 'vm', 'vk'].forEach(id => $(id).oninput = g); g()
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
