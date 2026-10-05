const SUPABASE_URL = 'https://qoeflqydmemenxwjulaw.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_zZom9gkYPDfJFYMcosOXmg_KvBfwFE4'

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Mencegah teks dari database dibaca sebagai kode HTML
function aman(teks) {
  const el = document.createElement('div')
  el.textContent = teks ?? ''
  return el.innerHTML
}

async function muatKursus() {
  const el = document.getElementById('daftar-kursus')
  const { data, error } = await db.from('kursus').select('*').order('created_at')

  if (error) {
    el.innerHTML = `<div class="info error">Gagal memuat kursus: ${aman(error.message)}.
      Pastikan tabel "kursus" sudah dibuat dan policy RLS sudah aktif di Supabase.</div>`
    return
  }

  if (!data.length) {
    el.innerHTML = '<div class="info">Belum ada kursus. Tambahkan data di tabel "kursus" pada Supabase.</div>'
    return
  }

  el.innerHTML = data.map(k => `
    <article class="kartu">
      <h3>${aman(k.judul)}</h3>
      <p>${aman(k.deskripsi)}</p>
      <div class="harga">Rp ${Number(k.harga || 0).toLocaleString('id-ID')}</div>
    </article>
  `).join('')
}

muatKursus()
