/* Materi 1: Bilangan Berpangkat (lengkap: penjelasan, ringkasan, visual, contoh, latihan, game)
   Tampil lewat M1.render(elemen). Jika ada <div id="materi-bab1"> atau #materi-content, otomatis dirender.
   Setelah latihan selesai / game berakhir dikirim event 'mathquest:progres' (detail: {bab, sumber, nilai, dari}). */
const sup = (b, n) => `${b}<sup>${n}</sup>`
const fmt = v => Number(v).toLocaleString('id-ID')

const M1 = {
  css: `
:host{display:block;--bg:#f4f7ff;--card:#fff;--ink:#16213e;--mute:#5b6784;--blue:#3b5bfd;--yellow:#ffc531;--mint:#17b890;--line:#dbe2f5;--soft:#eaf0ff;
box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:host(:not([data-theme="light"])){--bg:#0f1530;--card:#182044;--ink:#eef1ff;--mute:#a4aed0;--line:#2b3566;--soft:#212b5a;--blue:#7d93ff}}
:host([data-theme="dark"]){--bg:#0f1530;--card:#182044;--ink:#eef1ff;--mute:#a4aed0;--line:#2b3566;--soft:#212b5a;--blue:#7d93ff}
*{box-sizing:border-box}
.mq{margin:0;background:var(--bg);color:var(--ink);font:400 17px/1.7 Nunito,system-ui,sans-serif}
.wrap{max-width:760px;margin:0 auto;padding:20px 18px 60px}
h1,h2,h3{font-family:Fredoka,Nunito,sans-serif;line-height:1.2;margin:0}
header{padding:28px 0 8px}
h1{font-size:clamp(2rem,7vw,3.2rem)}
h1 sup{color:var(--blue);font-size:.6em}
.lead{color:var(--mute);margin:10px 0 18px}
nav{display:flex;gap:8px;flex-wrap:wrap;position:sticky;top:env(safe-area-inset-top,0px);background:var(--bg);padding:8px 0;z-index:5}
nav a{padding:6px 14px;border-radius:99px;background:var(--soft);color:var(--ink);text-decoration:none;font-weight:600;font-size:.9rem}
nav a:focus-visible,button:focus-visible,summary:focus-visible,input:focus-visible{outline:3px solid var(--yellow);outline-offset:2px}
section{margin-top:38px}
h2{font-size:1.7rem;margin-bottom:12px}
h3{font-size:1.2rem;margin:22px 0 6px}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px}
.big{font-family:Fredoka;font-size:2.4rem;text-align:center;margin:6px 0}
.big b{color:var(--blue)}
.note{background:var(--soft);border-left:5px solid var(--yellow);padding:10px 14px;border-radius:8px;margin:14px 0}
.tw{overflow-x:auto}
table{border-collapse:collapse;width:100%;min-width:480px}
th,td{padding:9px 10px;border-bottom:1px solid var(--line);text-align:left}
th{font-family:Fredoka;font-weight:500}
td:first-child{font-weight:800;white-space:nowrap}
label{display:flex;justify-content:space-between;font-weight:600;margin-top:10px}
input[type=range]{width:100%;accent-color:var(--blue)}
.tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.tabs button{border:2px solid var(--line);background:var(--card);color:var(--ink);padding:6px 14px;border-radius:99px;font:600 .9rem Nunito;cursor:pointer}
.tabs button[aria-pressed=true]{background:var(--blue);border-color:var(--blue);color:#fff}
.dots{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0;align-items:center}
.d{width:26px;height:26px;border-radius:50%;background:var(--blue);display:inline-grid;place-items:center;color:#fff;font-size:.75rem;font-weight:800}
.d.y{background:var(--yellow);color:#16213e}
.d.x{background:transparent;border:2px dashed var(--mute);color:var(--mute);text-decoration:line-through}
.grp{display:flex;gap:4px;padding:4px 6px;border:2px solid var(--line);border-radius:10px}
.res{font-family:Fredoka;font-size:1.25rem;margin-top:8px}
.mono{font-family:Fredoka;font-size:1.05rem;word-break:break-word}
details{border:1px solid var(--line);border-radius:12px;margin-top:8px;background:var(--card)}
summary{cursor:pointer;padding:10px 14px;font-weight:700}
details>div{padding:0 14px 12px}
.soal{margin-top:18px}
.soal p{margin:4px 0}
.ans{color:var(--mint);font-weight:800}
.opt{display:block;width:100%;text-align:left;margin:8px 0;padding:10px 14px;border:2px solid var(--line);border-radius:12px;background:var(--card);color:var(--ink);font:600 1rem Nunito,sans-serif;cursor:pointer}
.opt:hover:not(:disabled){border-color:var(--blue)}
.opt.ok{border-color:var(--mint);background:rgba(23,184,144,.18)}
.opt.no{border-color:#e5484d;background:rgba(229,72,77,.15)}
.bar{height:8px;background:var(--soft);border-radius:9px;overflow:hidden}
.bar i{display:block;height:100%;background:var(--blue)}
.btn{border:0;background:#3b5bfd;color:#fff;padding:9px 22px;border-radius:99px;font:600 1rem Fredoka,sans-serif;cursor:pointer;margin-top:10px}
.fb{margin-top:10px;padding:10px 14px;border-radius:10px;background:var(--soft)}
.stats{display:flex;gap:16px;flex-wrap:wrap;font-family:Fredoka,sans-serif;margin-bottom:6px}
.gq{font-family:Fredoka,sans-serif;font-size:1.9rem;text-align:center;margin:14px 0}
.gopts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.gopts .opt{text-align:center;margin:0;font-family:Fredoka,sans-serif;font-size:1.2rem}
@media (prefers-reduced-motion:reduce){.mq{scroll-behavior:auto}}
`,
  header: `<h1>Bilangan Berpangkat<sup>8</sup></h1>
<p class="lead">Matematika SMP Kelas 8. Belajar menulis perkalian berulang dengan singkat, lalu menghitungnya dengan cepat.</p>
<nav aria-label="Navigasi bagian"><a href="#materi">Penjelasan</a><a href="#ringkasan">Ringkasan</a><a href="#visual">Visual</a><a href="#soal">Contoh Soal</a><a href="#latihan">Latihan</a><a href="#game">Game</a></nav>`,
  penjelasan: `<h3>Apa itu bilangan berpangkat?</h3>
<p>Bayangkan satu bakteri membelah jadi 2 setiap jam. Setelah 1 jam ada 2, setelah 2 jam ada 2 × 2 = 4, setelah 3 jam ada 2 × 2 × 2 = 8. Menulis perkalian yang sama berulang-ulang itu capek, jadi kita singkat:</p>
<div class="card"><div class="big">2 × 2 × 2 × 2 × 2 = <b>2<sup>5</sup></b></div>
<p style="text-align:center;margin:0">dibaca "dua pangkat lima"</p></div>
<p>Pada <b>a<sup>n</sup></b>, bilangan <b>a</b> disebut <b>basis</b> (bilangan yang dikalikan) dan <b>n</b> disebut <b>eksponen</b> atau pangkat (berapa kali basis dikalikan).</p>
<div class="note">Hati-hati! 2<sup>3</sup> artinya 2 × 2 × 2 = 8, <b>bukan</b> 2 × 3 = 6.</div>

<h3>Pangkat nol dan pangkat negatif</h3>
<p>Perhatikan pola turun berikut. Setiap pangkat berkurang 1, hasilnya dibagi 2:</p>
<p class="mono">2³ = 8 → 2² = 4 → 2¹ = 2 → 2⁰ = 1 → 2⁻¹ = ½ → 2⁻² = ¼</p>
<p>Dari pola ini kita dapat dua aturan: bilangan apa pun (selain 0) berpangkat 0 sama dengan <b>1</b>, dan pangkat negatif artinya <b>kebalikan</b>. Contoh: 3⁻² = 1/3² = 1/9.</p>

<h3>Sifat-sifat yang memudahkan hitungan</h3>
<p><b>1. Kali, basis sama, pangkat dijumlah.</b> 2³ × 2² = (2×2×2) × (2×2) = 2⁵. Ada 3 faktor ditambah 2 faktor, jadi totalnya 5 faktor.</p>
<p><b>2. Bagi, basis sama, pangkat dikurangi.</b> 2⁵ ÷ 2² = (2×2×2×2×2) / (2×2). Dua faktor 2 saling coret, tersisa 2³.</p>
<p><b>3. Pangkat dari pangkat, pangkat dikali.</b> (2³)² = 2³ × 2³ = 2⁶.</p>
<p><b>4. Pangkat dari perkalian atau pembagian.</b> (a × b)ⁿ = aⁿ × bⁿ. Begitu juga (a/b)ⁿ = aⁿ/bⁿ. Setiap bilangan di dalam kurung ikut dipangkatkan.</p>
<p>Coba bukti sifat 1, 2, dan 3 sendiri di bagian Visual di bawah.</p>

<h3>Bentuk baku (notasi ilmiah)</h3>
<p>Bilangan yang sangat besar atau sangat kecil ditulis sebagai <b>a × 10ⁿ</b> dengan 1 ≤ a &lt; 10. Contoh: jarak Bumi ke Matahari sekitar 150.000.000 km = 1,5 × 10⁸ km.</p>`,
  ringkasan: `<div class="card tw">
<table>
<tr><th>Konsep</th><th>Rumus</th><th>Contoh</th></tr>
<tr><td>Definisi</td><td>aⁿ = a × a × … × a (n faktor)</td><td>3⁴ = 81</td></tr>
<tr><td>Pangkat nol</td><td>a⁰ = 1 (a ≠ 0)</td><td>7⁰ = 1</td></tr>
<tr><td>Pangkat negatif</td><td>a⁻ⁿ = 1/aⁿ</td><td>2⁻³ = 1/8</td></tr>
<tr><td>Perkalian</td><td>aᵐ × aⁿ = aᵐ⁺ⁿ</td><td>2³ × 2⁴ = 2⁷</td></tr>
<tr><td>Pembagian</td><td>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</td><td>5⁶ ÷ 5² = 5⁴</td></tr>
<tr><td>Pangkat pangkat</td><td>(aᵐ)ⁿ = aᵐˣⁿ</td><td>(3²)³ = 3⁶</td></tr>
<tr><td>Kali dipangkatkan</td><td>(ab)ⁿ = aⁿbⁿ</td><td>(2×5)² = 4 × 25</td></tr>
<tr><td>Bagi dipangkatkan</td><td>(a/b)ⁿ = aⁿ/bⁿ</td><td>(2/3)² = 4/9</td></tr>
<tr><td>Bentuk baku</td><td>a × 10ⁿ, 1 ≤ a &lt; 10</td><td>4.500 = 4,5 × 10³</td></tr>
</table></div>
<div class="note"><b>Ingat:</b> sifat 1 dan 2 hanya berlaku kalau <b>basisnya sama</b>. 2³ × 3² tidak bisa jadi 6⁵. Bilangan negatif berpangkat genap hasilnya positif, berpangkat ganjil hasilnya negatif: (−2)² = 4 tetapi (−2)³ = −8.</div>`,
  visual: `<h3>1. Penjelajah Pangkat</h3>
<div class="card">
<label for="pb">Basis (a) <span id="pbv"></span></label><input id="pb" type="range" min="2" max="9" value="2">
<label for="pe">Pangkat (n) <span id="pev"></span></label><input id="pe" type="range" min="-3" max="6" value="3">
<div class="mono" id="ex" style="margin-top:12px" aria-live="polite"></div>
<div class="res" id="ev"></div>
</div>

<h3>2. Bukti Sifat Pangkat</h3>
<div class="card">
<div class="tabs" role="group" aria-label="Pilih sifat">
<button data-m="k" aria-pressed="true">aᵐ × aⁿ</button><button data-m="b" aria-pressed="false">aᵐ ÷ aⁿ</button><button data-m="p" aria-pressed="false">(aᵐ)ⁿ</button>
</div>
<p style="margin:4px 0;color:var(--mute)">Setiap bulatan mewakili satu faktor <b>a</b>. Atur m dan n, lihat apa yang terjadi.</p>
<label for="sa">Basis (a) <span id="sav"></span></label><input id="sa" type="range" min="2" max="5" value="2">
<label for="sm">m <span id="smv"></span></label><input id="sm" type="range" min="1" max="6" value="3">
<label for="sn">n <span id="snv"></span></label><input id="sn" type="range" min="1" max="6" value="2">
<div id="sv" aria-live="polite"></div>
</div>`,
  contoh: `<p>Coba kerjakan dulu di kertas, baru buka pembahasannya.</p>

<div class="soal"><b>Soal 1.</b> Hitunglah 3⁴ × 3².
<details><summary>Lihat pembahasan</summary><div>
<p>Langkah 1: basis sama (3), jadi pangkat dijumlahkan.</p>
<p>Langkah 2: 3⁴ × 3² = 3⁴⁺² = 3⁶.</p>
<p>Langkah 3: 3⁶ = 3×3×3×3×3×3 = <span class="ans">729</span>.</p></div></details></div>

<div class="soal"><b>Soal 2.</b> Hitunglah 5⁷ ÷ 5⁴.
<details><summary>Lihat pembahasan</summary><div>
<p>Langkah 1: basis sama (5), jadi pangkat dikurangkan.</p>
<p>Langkah 2: 5⁷ ÷ 5⁴ = 5⁷⁻⁴ = 5³.</p>
<p>Langkah 3: 5³ = 5×5×5 = <span class="ans">125</span>.</p></div></details></div>

<div class="soal"><b>Soal 3.</b> Hitunglah (2³)².
<details><summary>Lihat pembahasan</summary><div>
<p>Langkah 1: pangkat dari pangkat, jadi pangkatnya dikalikan.</p>
<p>Langkah 2: (2³)² = 2³ˣ² = 2⁶.</p>
<p>Langkah 3: 2⁶ = <span class="ans">64</span>.</p></div></details></div>

<div class="soal"><b>Soal 4.</b> Sederhanakan (2x³)².
<details><summary>Lihat pembahasan</summary><div>
<p>Langkah 1: semua yang ada di dalam kurung ikut dipangkatkan 2: 2² × (x³)².</p>
<p>Langkah 2: 2² = 4 dan (x³)² = x⁶.</p>
<p>Jadi hasilnya <span class="ans">4x⁶</span>.</p></div></details></div>

<div class="soal"><b>Soal 5.</b> Hitunglah 2⁻³ × 2⁵.
<details><summary>Lihat pembahasan</summary><div>
<p>Langkah 1: basis sama, jumlahkan pangkat: 2⁻³⁺⁵ = 2².</p>
<p>Langkah 2: 2² = <span class="ans">4</span>.</p>
<p>Cek: 2⁻³ = 1/8 dan 2⁵ = 32, lalu 1/8 × 32 = 4. Hasilnya sama.</p></div></details></div>

<div class="soal"><b>Soal 6.</b> Seekor bakteri membelah menjadi 2 setiap jam. Jika awalnya ada 1 bakteri, berapa jumlahnya setelah 8 jam?
<details><summary>Lihat pembahasan</summary><div>
<p>Langkah 1: tiap jam jumlahnya dikali 2, jadi setelah 8 jam ada 2⁸ bakteri.</p>
<p>Langkah 2: 2⁸ = 2⁴ × 2⁴ = 16 × 16 = <span class="ans">256 bakteri</span>.</p></div></details></div>

<div class="soal"><b>Soal 7.</b> Tulis 4.500.000 dalam bentuk baku.
<details><summary>Lihat pembahasan</summary><div>
<p>Langkah 1: geser koma ke kiri sampai tersisa satu angka bukan nol di depan koma: 4,5.</p>
<p>Langkah 2: komanya bergeser 6 tempat, jadi pangkat 10 adalah 6.</p>
<p>Jadi 4.500.000 = <span class="ans">4,5 × 10⁶</span>.</p></div></details></div>`,
  latihan: {
    intro: 'Tanpa batas waktu. Pilih jawaban, lalu baca pembahasannya sebelum lanjut.',
    soal: [
{q:'Nilai dari 2⁴ adalah ...',o:['8','16','6','32'],a:1,w:'2⁴ = 2×2×2×2 = 16. Pangkat berarti perkalian berulang, bukan 2×4.'},
{q:'5³ × 5² = ...',o:['5⁶','25⁵','5⁵','10⁵'],a:2,w:'Basis sama, pangkat dijumlahkan: 5³⁺² = 5⁵. Basisnya tetap 5.'},
{q:'7⁶ ÷ 7² = ...',o:['7³','7⁸','1⁴','7⁴'],a:3,w:'Basis sama, pangkat dikurangkan: 7⁶⁻² = 7⁴.'},
{q:'(3²)³ = ...',o:['3⁶','3⁵','9⁵','3⁸'],a:0,w:'Pangkat dari pangkat, pangkatnya dikalikan: 3²ˣ³ = 3⁶.'},
{q:'Nilai 10⁰ + 2⁻² adalah ...',o:['3','1/4','2','5/4'],a:3,w:'10⁰ = 1 dan 2⁻² = 1/2² = 1/4. Jadi 1 + 1/4 = 5/4.'},
{q:'(2 × 3)² = ...',o:['12','36','10','25'],a:1,w:'(2×3)² = 2² × 3² = 4 × 9 = 36. Kedua bilangan ikut dipangkatkan.'},
{q:'Bentuk baku dari 360.000 adalah ...',o:['36 × 10⁴','3,6 × 10⁴','3,6 × 10⁵','0,36 × 10⁶'],a:2,w:'Koma bergeser 5 tempat sampai tersisa satu angka di depan koma: 3,6 × 10⁵.'},
{q:'Bentuk sederhana x⁵ × x³ ÷ x² adalah ...',o:['x⁶','x¹⁰','x⁴','x³⁰'],a:0,w:'Jumlahkan lalu kurangkan pangkat: 5 + 3 − 2 = 6, jadi x⁶.'}
]
  },
  game: {
    judul: 'Pangkat Kilat',
    intro: 'Pilih eksponen atau hasil yang benar. Ada 10 soal dan 3 nyawa, jawab beruntun untuk bonus XP.'
  },

  render(el) {
    el = el || document.getElementById('materi-bab1') || document.getElementById('materi-content')
    if (!el || el.shadowRoot) return
    if (!document.getElementById('mq-fonts')) {
      const l = document.createElement('link')
      l.id = 'mq-fonts'; l.rel = 'stylesheet'
      l.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;600;800&display=swap'
      document.head.appendChild(l)
    }
    const root = el.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${M1.css}</style><div class="mq"><div class="wrap"><header>${M1.header}</header>
<section id="materi"><h2>Penjelasan Materi</h2>${M1.penjelasan}</section>
<section id="ringkasan"><h2>Ringkasan Inti</h2>${M1.ringkasan}</section>
<section id="visual"><h2>Visual Interaktif</h2>${M1.visual}</section>
<section id="soal"><h2>Contoh Soal</h2>${M1.contoh}</section>
<section id="latihan"><h2>Latihan Interaktif</h2><p>${M1.latihan.intro}</p><div class="card" id="lat"></div></section>
<section id="game"><h2>Game Edukasi: ${M1.game.judul}</h2><p>${M1.game.intro}</p><div class="card" id="gm"></div></section>
</div></div>`
    root.querySelectorAll('nav a').forEach(a => a.addEventListener('click', e => {
      e.preventDefault()
      const t = root.querySelector(a.getAttribute('href'))
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }))
    M1.init(root)
  },

  init(root) {
    function emit(sumber, nilai, dari) {
      root.host.dispatchEvent(new CustomEvent('mathquest:progres', { bubbles: true, composed: true, detail: { bab: 1, sumber: sumber, nilai: nilai, dari: dari } }))
    }

var $=function(i){return root.getElementById(i)};
var sup=function(n){return '<sup>'+n+'</sup>'};
function fmt(n){return n.toLocaleString('id-ID')}
function explore(){
var a=+$('pb').value,n=+$('pe').value;
$('pbv').textContent=a;$('pev').textContent=n;
var f=function(k){return Array(k).fill(a).join(' × ')},ex,v;
if(n>0){ex=a+sup(n)+' = '+f(n);v=fmt(Math.pow(a,n))}
else if(n==0){ex=a+sup(0)+' = 1';v='1 (aturan: bilangan berpangkat 0 sama dengan 1)'}
else{ex=a+'<sup>'+n+'</sup> = 1 / '+a+sup(-n)+' = 1 / ('+f(-n)+')';v='1/'+fmt(Math.pow(a,-n))}
$('ex').innerHTML=ex;$('ev').textContent='Hasil: '+v;
}
['pb','pe'].forEach(function(i){$(i).addEventListener('input',explore)});
var mode='k';
function dots(c,cls){var s='';for(var i=0;i<c;i++)s+='<span class="d '+cls+'">a</span>';return s}
function prop(){
var a=+$('sa').value,m=+$('sm').value,n=+$('sn').value,h='',r='';
if(mode=='b'&&n>m){n=m;$('sn').value=n}
$('sav').textContent=a;$('smv').textContent=m;$('snv').textContent=n;
if(mode=='k'){
h='<div class="dots"><div class="grp">'+dots(m,'')+'</div>×<div class="grp">'+dots(n,'y')+'</div></div><div class="dots">'+dots(m,'')+dots(n,'y')+'</div>';
r=a+sup(m)+' × '+a+sup(n)+' = '+a+sup(m+'+'+n)+' = '+a+sup(m+n)+' = '+fmt(Math.pow(a,m+n));
}else if(mode=='b'){
h='<div class="dots">'+dots(m-n,'')+dots(n,'x')+'</div><p style="margin:0;color:var(--mute)">'+n+' faktor di bawah saling mencoret dengan '+n+' faktor di atas.</p>';
r=a+sup(m)+' ÷ '+a+sup(n)+' = '+a+sup(m+'−'+n)+' = '+a+sup(m-n)+' = '+fmt(Math.pow(a,m-n));
}else{
var g='';for(var i=0;i<n;i++)g+='<div class="grp">'+dots(m,i%2?'y':'')+'</div>';
h='<p style="margin:0;color:var(--mute)">'+n+' kelompok, tiap kelompok berisi '+m+' faktor.</p><div class="dots">'+g+'</div>';
r='('+a+sup(m)+')'+sup(n)+' = '+a+sup(m+' × '+n)+' = '+a+sup(m*n)+' = '+fmt(Math.pow(a,m*n));
}
$('sv').innerHTML=h+'<div class="res">'+r+'</div>';
}
['sa','sm','sn'].forEach(function(i){$(i).addEventListener('input',prop)});
root.querySelectorAll('.tabs button').forEach(function(b){b.addEventListener('click',function(){
mode=b.dataset.m;
root.querySelectorAll('.tabs button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
prop()})});
explore();prop();

var LQ=M1.latihan.soal;
var li=0,ls=0,done=false;
function lat(){
var c=$('lat');
if(li>=LQ.length){
emit('latihan',ls,LQ.length);
c.innerHTML='<div class="big">Skor: <b>'+ls+'/'+LQ.length+'</b></div><p style="text-align:center">'+(ls>=7?'Hebat! Kamu sudah paham bilangan berpangkat.':ls>=5?'Bagus! Baca lagi pembahasan soal yang salah agar makin mantap.':'Tidak apa-apa. Baca lagi bagian Ringkasan, lalu coba lagi.')+'</p><div style="text-align:center"><button class="btn" id="lr">Ulangi latihan</button></div>';
$('lr').onclick=function(){li=0;ls=0;lat()};return}
var q=LQ[li];done=false;
c.innerHTML='<div class="bar"><i style="width:'+(li/LQ.length*100)+'%"></i></div><p style="margin:10px 0 0;color:var(--mute)">Soal '+(li+1)+' dari '+LQ.length+'</p><p style="font-weight:800;font-size:1.1rem;margin:4px 0">'+q.q+'</p>'+q.o.map(function(t,i){return '<button class="opt" data-i="'+i+'">'+t+'</button>'}).join('')+'<div id="lf" aria-live="polite"></div>';
c.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){
if(done)return;done=true;
var ok=+b.dataset.i==q.a;if(ok)ls++;
c.querySelectorAll('.opt').forEach(function(x,j){x.disabled=true;if(j==q.a)x.classList.add('ok');else if(x===b)x.classList.add('no')});
$('lf').innerHTML='<div class="fb"><b>'+(ok?'Benar! 🎉':'Belum tepat.')+'</b> '+q.w+'</div><button class="btn" id="ln">'+(li==LQ.length-1?'Lihat skor':'Soal berikutnya')+'</button>';
$('ln').onclick=function(){li++;lat()}}})}
lat();

var G={r:0,l:3,s:0,xp:0,q:null};
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function sp(n){return String(n).split('').map(function(d){return '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]}).join('')}
function mk(){
var a=rnd(2,5),t=rnd(0,3),m,n,q,ans,o,sq='<sup>?</sup>';
if(t==0){m=rnd(2,5);n=rnd(2,5);q=a+sp(m)+' × '+a+sp(n)+' = '+a+sq;ans=m+n;o=[m+n,m*n,Math.abs(m-n)+1,m+n+1]}
else if(t==1){n=rnd(2,4);m=n+rnd(2,4);q=a+sp(m)+' ÷ '+a+sp(n)+' = '+a+sq;ans=m-n;o=[m-n,m+n,m*n,m-n+2]}
else if(t==2){m=rnd(2,4);n=rnd(2,4);q='('+a+sp(m)+')'+sp(n)+' = '+a+sq;ans=m*n;o=[m*n,m+n,m*n+1,m*n-1]}
else{n=rnd(2,4);ans=Math.pow(a,n);q=a+sp(n)+' = ?';o=[ans,a*n,ans+a,ans-a]}
o=o.filter(function(v,i){return v>0&&o.indexOf(v)==i}).sort(function(){return Math.random()-.5});
return{q:q,a:ans,o:o}}
function game(){
var c=$('gm');
if(!G.q){
var best=0;try{best=+localStorage.getItem('mq_pk_best')||0}catch(e){}
c.innerHTML='<p style="margin-top:0">Siap main? Tidak ada batas waktu, jadi tenang dan hitung dulu.</p>'+(best?'<p>XP terbaik kamu: <b>'+best+'</b></p>':'')+'<button class="btn" id="gs">Mulai main</button>';
$('gs').onclick=function(){G={r:0,l:3,s:0,xp:0,q:mk()};game()};return}
if(G.r>=10||G.l<=0){
emit('game',G.xp,10);
var best2=0;try{best2=Math.max(+localStorage.getItem('mq_pk_best')||0,G.xp);localStorage.setItem('mq_pk_best',best2)}catch(e){}
c.innerHTML='<div class="big">'+(G.l>0?'Selesai! 🏆':'Nyawa habis 💔')+'</div><p style="text-align:center">Kamu menjawab '+G.r+' soal dan mengumpulkan <b>'+G.xp+' XP</b>.</p><div style="text-align:center"><button class="btn" id="ga">Main lagi</button></div>';
$('ga').onclick=function(){G.q=null;game()};return}
c.innerHTML='<div class="stats"><span>Soal '+(G.r+1)+'/10</span><span>'+'❤️'.repeat(G.l)+'</span><span>XP '+G.xp+'</span><span>Beruntun '+G.s+'</span></div><div class="gq">'+G.q.q+'</div><div class="gopts">'+G.q.o.map(function(v){return '<button class="opt" data-v="'+v+'">'+(G.q.q.indexOf('?</sup>')>0?v:fmt(v))+'</button>'}).join('')+'</div><div id="gf" aria-live="polite"></div>';
c.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){
var ok=+b.dataset.v==G.q.a;
c.querySelectorAll('.opt').forEach(function(x){x.disabled=true;if(+x.dataset.v==G.q.a)x.classList.add('ok');else if(x===b)x.classList.add('no')});
if(ok){G.s++;G.xp+=10+(G.s>=3?5:0)}else{G.l--;G.s=0}
G.r++;
$('gf').innerHTML='<div class="fb"><b>'+(ok?'Benar!':'Belum tepat.')+'</b> Jawaban yang benar: '+fmt(G.q.a)+'</div>';
setTimeout(function(){G.q=mk();game()},1300)}})}
game();

  }
}

window.M1 = M1
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => M1.render())
else M1.render()
