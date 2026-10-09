const atr = t => aman(t).replace(/"/g, '&quot;')
const TIPE = { pg: 'Pilihan ganda', mc: 'Multiple choice', isian: 'Isian / essay', bs: 'Benar / Salah' }
let draf = null
const SQL_HINT = 'Tabel kuis belum ada di Supabase (atau project-nya berbeda). Buka Supabase → SQL Editor, jalankan file mathquest-setup-lengkap.sql, lalu muat ulang halaman ini (Ctrl + F5). Pastikan SUPABASE_URL di app.js sama dengan project tempat SQL dijalankan.'
const butuhSetup = e => !!e && /schema cache|does not exist|could not find|relation|function public|PGRST20|42P01|42883/i.test((e.message || '') + ' ' + (e.code || ''))

const soalBaru = () => ({ tipe: 'pg', q: '', opsi: ['', ''], benar: [], jawab: '', pemb: '' })

/* ---------- Dashboard ---------- */
async function dashboard() {
  $('isi').innerHTML = `<h2>Dashboard</h2>
    <div class="card"><h3>Kerjakan kuis dengan kode</h3>
      <form id="fKode" style="display:flex;gap:8px;margin-top:8px"><input id="kk" placeholder="Contoh: A1B2C3" required autocomplete="off"><button class="btn">Mulai</button></form><div id="pesan"></div></div>
    <div class="card box"><div class="row" style="border:0"><h3>Kuis saya</h3><button class="btn" id="baru">+ Buat kuis</button></div><div id="daftar">Memuat...</div></div>`
  $('baru').onclick = () => { draf = { judul: '', deskripsi: '', kode: '', soal: [soalBaru()] }; builder() }
  $('fKode').onsubmit = async ev => {
    ev.preventDefault()
    const { data, error } = await db.rpc('ambil_kuis', { kode_input: $('kk').value })
    if (error) return pesan(butuhSetup(error) ? SQL_HINT : 'Kuis belum bisa dibuka: ' + error.message)
    if (!data || !data.length) return pesan('Kode kuis tidak ditemukan. Periksa lagi kodenya (huruf besar atau kecil sama saja).')
    kerjakan(data[0], false, dashboard)
  }
  const { data, error: errDaftar } = await db.from('kuis').select('*').eq('pembuat', user.id).order('created_at', { ascending: false })
  if (errDaftar) return void ($('daftar').innerHTML = `<div class="msg err">${aman(butuhSetup(errDaftar) ? SQL_HINT : errDaftar.message)}</div>`)
  $('daftar').innerHTML = !data || !data.length ? '<p class="kecil">Belum ada kuis. Klik "Buat kuis" untuk mulai.</p>' : data.map((k, i) => `
    <div class="row"><div><b>${aman(k.judul)}</b><br><span class="kecil">${k.soal.length} soal. Kode: <b>${aman(k.kode)}</b></span></div>
    <div><button class="btn alt" data-p="${i}">Preview</button> <button class="btn alt" data-h="${i}">Hapus</button></div></div>`).join('')
  $('daftar').querySelectorAll('[data-p]').forEach(b => b.onclick = () => kerjakan(data[b.dataset.p], true, dashboard))
  $('daftar').querySelectorAll('[data-h]').forEach(b => b.onclick = async () => {
    if (!confirm('Hapus kuis ini?')) return
    await db.from('kuis').delete().eq('id', data[b.dataset.h].id); dashboard()
  })
}

/* ---------- Pembuat kuis ---------- */
function builder() {
  const s = draf.soal
  $('isi').innerHTML = `<p><button class="btn alt" data-act="batal">← Kembali</button></p><h2>Buat kuis</h2>
    <div class="card"><label for="jd">Judul kuis</label><input id="jd" data-f="judul" value="${atr(draf.judul)}">
    <label for="ds">Deskripsi (opsional)</label><input id="ds" data-f="deskripsi" value="${atr(draf.deskripsi)}">
    <label for="kd">Kode kuis (opsional)</label><input id="kd" data-f="kode" value="${atr(draf.kode || '')}" maxlength="10" autocomplete="off" autocapitalize="characters" placeholder="Contoh: PLSV8A">
    <p class="kecil" style="margin:4px 0 0">Kode ini diketik siswa untuk masuk ke kuismu. Isi 4 sampai 10 huruf atau angka, atau kosongkan agar dibuatkan otomatis.</p></div>
    ${s.map((x, i) => `<div class="card box"><div class="row" style="border:0"><h3>Soal ${i + 1}</h3>${s.length > 1 ? `<button class="btn alt" data-act="hapus" data-i="${i}">Hapus soal</button>` : ''}</div>
      <label>Tipe soal</label><select data-f="tipe" data-i="${i}">${Object.entries(TIPE).map(([k, n]) => `<option value="${k}" ${x.tipe === k ? 'selected' : ''}>${n}</option>`).join('')}</select>
      <label>Pertanyaan</label><textarea rows="2" data-f="q" data-i="${i}">${aman(x.q)}</textarea>
      ${x.tipe === 'pg' || x.tipe === 'mc' ? `<label>Pilihan (centang jawaban yang benar)</label>${x.opsi.map((o, n) => `
        <div style="display:flex;gap:8px;align-items:center;margin:6px 0"><input style="width:auto" type="${x.tipe === 'pg' ? 'radio' : 'checkbox'}" name="b${i}" data-f="benar" data-i="${i}" data-o="${n}" ${x.benar.includes(n) ? 'checked' : ''} aria-label="Jawaban benar">
        <input data-f="opsi" data-i="${i}" data-o="${n}" value="${atr(o)}" placeholder="Pilihan ${n + 1}">
        ${x.opsi.length > 2 ? `<button class="btn alt" data-act="hapusopsi" data-i="${i}" data-o="${n}">✕</button>` : ''}</div>`).join('')}
        ${x.opsi.length < 6 ? `<button class="btn alt" data-act="opsi" data-i="${i}">+ Pilihan</button>` : ''}` : ''}
      ${x.tipe === 'isian' ? `<label>Jawaban yang benar</label><input data-f="jawab" data-i="${i}" value="${atr(x.jawab)}">` : ''}
      ${x.tipe === 'bs' ? `<label>Jawaban yang benar</label><label><input style="width:auto" type="radio" name="t${i}" data-f="bs" data-i="${i}" value="true" ${x.jawab === true ? 'checked' : ''}> Benar</label>
        <label><input style="width:auto" type="radio" name="t${i}" data-f="bs" data-i="${i}" value="false" ${x.jawab === false ? 'checked' : ''}> Salah</label>` : ''}
      <label>Pembahasan (opsional)</label><textarea rows="2" data-f="pemb" data-i="${i}">${aman(x.pemb)}</textarea></div>`).join('')}
    <p><button class="btn alt" data-act="tambah">+ Tambah soal</button> <button class="btn alt" data-act="preview">Preview</button> <button class="btn" data-act="publish">Publish</button></p><div id="pesan"></div>`

  const kuisEl = $('isi')
  kuisEl.oninput = kuisEl.onchange = ev => {
    const e = ev.target, f = e.dataset.f; if (!f) return
    if (f === 'kode') { e.value = e.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); return void (draf.kode = e.value) }
    if (f === 'judul' || f === 'deskripsi') return void (draf[f] = e.value)
    const x = s[e.dataset.i], o = +e.dataset.o
    if (f === 'q' || f === 'pemb' || f === 'jawab') x[f] = e.value
    else if (f === 'opsi') x.opsi[o] = e.value
    else if (f === 'bs') x.jawab = e.value === 'true'
    else if (f === 'benar') x.benar = x.tipe === 'pg' ? [o] : (e.checked ? [...x.benar, o] : x.benar.filter(v => v !== o))
    else if (f === 'tipe' && ev.type === 'change') { Object.assign(x, { tipe: e.value, opsi: ['', ''], benar: [], jawab: e.value === 'bs' ? true : '' }); builder() }
  }
  kuisEl.onclick = async ev => {
    const e = ev.target.closest('[data-act]'); if (!e) return
    const a = e.dataset.act, i = +e.dataset.i, o = +e.dataset.o
    if (a === 'batal') return dashboard()
    if (a === 'tambah') { s.push(soalBaru()); return builder() }
    if (a === 'hapus') { s.splice(i, 1); return builder() }
    if (a === 'opsi') { s[i].opsi.push(''); return builder() }
    if (a === 'hapusopsi') { s[i].opsi.splice(o, 1); s[i].benar = s[i].benar.filter(v => v !== o).map(v => v > o ? v - 1 : v); return builder() }
    const err = cek()
    if (err) return pesan(err)
    if (a === 'preview') return kerjakan({ ...draf, id: null }, true, builder)
    if (a === 'publish') {
      const baris = { judul: draf.judul.trim(), deskripsi: draf.deskripsi, soal: draf.soal }
      if (draf.kode) baris.kode = draf.kode
      const { data, error } = await db.from('kuis').insert(baris).select('kode').single()
      if (error) return pesan(error.code === '23505' || /duplicate|unique/i.test(error.message) ? `Kode "${draf.kode}" sudah dipakai kuis lain. Coba kode yang berbeda, atau kosongkan agar dibuatkan otomatis.` : butuhSetup(error) ? SQL_HINT : 'Gagal menyimpan: ' + error.message)
      $('isi').innerHTML = `<div class="card"><h2>Kuis dipublikasikan! 🎉</h2><p>Bagikan kode ini kepada siswa:</p>
        <p style="font-size:2.6rem;font-weight:800;color:var(--p);letter-spacing:4px;margin:6px 0">${aman(data.kode)}</p>
        <p><button class="btn" id="salin">📋 Salin kode</button> <span id="salinOk" class="kecil"></span></p>
        <ol><li>Siswa membuka web MathQuest dan masuk ke menu <b>Dashboard</b>.</li><li>Di kotak <b>Kerjakan kuis dengan kode</b>, siswa mengetik kode <b>${aman(data.kode)}</b>.</li><li>Siswa menekan <b>Mulai</b>, lalu mengerjakan kuis.</li></ol>
        <p class="kecil">Kode ini juga tersimpan di daftar "Kuis saya" pada Dashboard.</p><button class="btn alt" id="ok">Ke Dashboard</button></div>`
      $('salin').onclick = async () => {
        try { await navigator.clipboard.writeText(data.kode); $('salinOk').textContent = 'Kode tersalin.' } catch (e) { $('salinOk').textContent = 'Salin manual: ' + data.kode }
      }
      $('ok').onclick = dashboard
    }
  }
}

function cek() {
  if (!draf.judul.trim()) return 'Judul kuis belum diisi.'
  if (draf.kode && draf.kode.length < 4) return 'Kode kuis minimal 4 huruf atau angka. Kosongkan kalau ingin kode otomatis.'
  for (const [n, x] of draf.soal.entries()) {
    const p = `Soal ${n + 1}: `
    if (!x.q.trim()) return p + 'pertanyaan belum diisi.'
    if (x.tipe === 'pg' || x.tipe === 'mc') {
      if (x.opsi.some(o => !o.trim())) return p + 'semua pilihan harus diisi.'
      if (!x.benar.length) return p + 'pilih jawaban yang benar.'
    }
    if (x.tipe === 'isian' && !x.jawab.trim()) return p + 'jawaban benar belum diisi.'
  }
  return ''
}

/* ---------- Mengerjakan kuis ---------- */
function kerjakan(k, preview, balik) {
  $('isi').innerHTML = `<p><button class="btn alt" id="bk">← Kembali</button></p><h2>${aman(k.judul)}</h2><p class="kecil">${aman(k.deskripsi)}${preview ? ' (Mode preview: hasil tidak disimpan)' : ''}</p>
    <form id="fk">${k.soal.map((x, i) => `<div class="card box"><p><b>${i + 1}. ${aman(x.q)}</b></p>
      ${x.tipe === 'pg' || x.tipe === 'mc' ? x.opsi.map((o, n) => `<label class="pil"><input style="width:auto" type="${x.tipe === 'pg' ? 'radio' : 'checkbox'}" name="s${i}" value="${n}"> ${aman(o)}</label>`).join('') : ''}
      ${x.tipe === 'isian' ? `<input name="s${i}" autocomplete="off" aria-label="Jawaban">` : ''}
      ${x.tipe === 'bs' ? `<label class="pil"><input style="width:auto" type="radio" name="s${i}" value="true"> Benar</label><label class="pil"><input style="width:auto" type="radio" name="s${i}" value="false"> Salah</label>` : ''}
    </div>`).join('')}<p><button class="btn" type="submit">Kirim jawaban</button></p></form>`
  $('bk').onclick = balik
  $('fk').onsubmit = async ev => {
    ev.preventDefault()
    const fd = new FormData(ev.target)
    const hasil = k.soal.map((x, i) => {
      const j = fd.getAll('s' + i)
      if (x.tipe === 'pg') return j.length === 1 && +j[0] === x.benar[0]
      if (x.tipe === 'mc') return j.length === x.benar.length && j.every(v => x.benar.includes(+v))
      if (x.tipe === 'isian') return (j[0] || '').trim().toLowerCase() === x.jawab.trim().toLowerCase()
      return j[0] === String(x.jawab)
    })
    const skor = hasil.filter(Boolean).length
    $('isi').innerHTML = `<h2>Hasil: ${skor} dari ${k.soal.length} benar</h2><div id="xp" class="kecil"></div>
      ${k.soal.map((x, i) => `<div class="card box"><p><b>${i + 1}. ${aman(x.q)}</b></p><div class="msg ${hasil[i] ? 'ok' : 'err'}">${hasil[i] ? 'Tepat!' : 'Belum tepat. Jawaban benar: ' + aman(jawabanBenar(x))}</div>${x.pemb ? `<p class="kecil">Pembahasan: ${aman(x.pemb)}</p>` : ''}</div>`).join('')}
      <p><button class="btn" id="bk2">Selesai</button></p>`
    $('bk2').onclick = balik
    if (!preview) {
      const { data, error } = await db.rpc('simpan_hasil_kuis', { kid: k.id, jdl: k.judul, s: skor, t: k.soal.length })
      $('xp').textContent = error ? 'Hasil belum tersimpan. Pastikan SQL Fase 3 sudah dijalankan.' : `Hasil tersimpan. Total XP kamu: ${data}.`
    }
  }
}
const jawabanBenar = x => x.tipe === 'pg' || x.tipe === 'mc' ? x.benar.map(n => x.opsi[n]).join(', ') : x.tipe === 'bs' ? (x.jawab ? 'Benar' : 'Salah') : x.jawab

/* ---------- Pencapaian ---------- */
async function pencapaian() {
  $('isi').innerHTML = '<h2>Pencapaian</h2><div id="pc">Memuat...</div>'
  const [pr, hk, pf] = await Promise.all([
    db.from('progres').select('*').eq('user_id', user.id),
    db.from('hasil_kuis').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    db.from('profiles').select('xp').eq('id', user.id).single()
  ])
  const lat = pr.data || [], kuisH = hk.data || []
  const badge = [
    ['🌟', 'First Quiz', 'Selesaikan 1 kuis', kuisH.length >= 1],
    ['🧭', 'Math Explorer', 'Selesaikan 1 latihan materi', lat.length >= 1],
    ['📐', 'Pythagoras Master', 'Nilai sempurna di latihan Pythagoras', lat.some(p => p.materi_urutan === 2 && p.skor === p.total)]
  ]
  $('pc').innerHTML = `<div class="grid">
    <div class="card"><h3>${pf.data?.xp ?? 0}</h3><p class="kecil">Total XP</p></div>
    <div class="card"><h3>${lat.length} dari 6</h3><p class="kecil">Materi dengan latihan selesai</p></div>
    <div class="card"><h3>${kuisH.length}</h3><p class="kecil">Kuis dikerjakan</p></div></div>
    <div class="card box"><h3>Badge</h3><div class="grid">${badge.map(([ik, n, d, ok]) => `<div class="card ${ok ? '' : 'kunci'}"><div class="ikon" style="font-size:2rem">${ik}</div><b>${n}</b><p class="kecil">${d}</p></div>`).join('')}</div></div>
    <div class="card box"><h3>Riwayat</h3>${[...lat.map(p => ['Latihan materi ' + p.materi_urutan, p.skor, p.total, p.updated_at]), ...kuisH.map(h => ['Kuis: ' + h.judul, h.skor, h.total, h.created_at])]
      .sort((a, b) => new Date(b[3]) - new Date(a[3])).slice(0, 15).map(r => `<div class="row"><span>${aman(r[0])}</span><strong>${r[1]}/${r[2]}</strong></div>`).join('') || '<p class="kecil">Belum ada riwayat.</p>'}</div>`
}
