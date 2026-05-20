// ── DATA STORE ──
let db = {
  personas: [
    { id:1, nombre:'Pedro Ixchop',     rol:'Productor',    lugar:'La Esperanza',     obs:'' },
    { id:2, nombre:'Rosa Cú',          rol:'Productor',    lugar:'La Esperanza',     obs:'' },
    { id:3, nombre:'Comercial López',  rol:'Comprador',    lugar:'Ciudad',           obs:'Intermediario mayorista' },
    { id:4, nombre:'Mercado El Sol',   rol:'Comprador',    lugar:'Cabecera',         obs:'' },
    { id:5, nombre:'Asociación Comunitaria', rol:'Asociación', tel:'5500-0001', lugar:'La Esperanza', obs:'' },
  ],
  productos: [
    { id:1, nombre:'Tomate',       cat:'Hortaliza',    stock:120, unidad:'libras', precio:3.50, temp:'Todo el año',   productor:1, desc:'Variedad manzano' },
    { id:2, nombre:'Maíz',         cat:'Grano básico', stock:300, unidad:'quintal', precio:125, temp:'Verano',        productor:1, desc:'Maíz criollo blanco' },
    { id:3, nombre:'Frijol negro', cat:'Grano básico', stock:80,  unidad:'libras', precio:8.00, temp:'Invierno',      productor:2, desc:'' },
    { id:4, nombre:'Chile pimiento',cat:'Hortaliza',   stock:20,  unidad:'unidad', precio:1.50, temp:'Todo el año',   productor:2, desc:'Rojo y verde' },
    { id:5, nombre:'Mango',        cat:'Fruta',        stock:200, unidad:'unidad', precio:2.00, temp:'Verano',        productor:1, desc:'Variedad Tommy' },
  ],
  pedidos: [
    { id:1, fecha:'2025-06-10', comprador:3, producto:1, cant:50, precio:3.50, punto:'Carretera principal', estado:'Confirmado', obs:'' },
    { id:2, fecha:'2025-06-11', comprador:4, producto:2, cant:5,  precio:125,  punto:'Centro comunitario',  estado:'En proceso',  obs:'Pago al momento de entrega' },
    { id:3, fecha:'2025-06-12', comprador:3, producto:3, cant:100,precio:7.50, punto:'Mercado local',       estado:'Pendiente',   obs:'' },
  ],
  entregas: [
    { id:1, pedido:1, fechaProg:'2025-06-13', cant:50, punto:'Carretera principal', estado:'Realizada',  obs:'Sin incidencias' },
    { id:2, pedido:2, fechaProg:'2025-06-14', cant:5,  punto:'Centro comunitario',  estado:'Programada', obs:'' },
  ],
  acuerdos: [
    { id:1, fecha:'2025-06-09', productor:1, comprador:3, producto:1, cant:100, precio:3.20, fechaLimite:'2025-06-30', pago:'Parcial', estado:'Activo',   notas:'Entrega semanal' },
    { id:2, fecha:'2025-06-10', productor:2, comprador:4, producto:4, cant:200, precio:1.50, fechaLimite:'2025-07-15', pago:'Pendiente',estado:'Activo',  notas:'' },
  ],
  _id: { personas:6, productos:6, pedidos:4, entregas:3, acuerdos:3 }
};

// ── HELPERS ──
const nextId = k => db._id[k]++;
const fmt = (n) => 'Q ' + parseFloat(n||0).toFixed(2);
const fmtDate = d => d ? d.split('-').reverse().join('/') : '—';

const EMOJIS = { 'Hortaliza':'', 'Grano básico':'', 'Fruta':'', 'Otro':'' };
const ESTADO_BADGE = {
  'Pendiente':'b-amarillo','Confirmado':'b-azul','En proceso':'b-tierra',
  'Entregado':'b-verde','Cancelado':'b-rojo','Programada':'b-azul',
  'Realizada':'b-verde','No realizada':'b-rojo','Activo':'b-verde',
  'Cumplido':'b-azul','Incumplido':'b-rojo','Pagado':'b-verde',
  'Parcial':'b-amarillo','Productor':'b-verde','Comprador':'b-azul',
  'Intermediario':'b-tierra','Asociación':'b-gris'
};
function badge(t){ return `<span class="badge ${ESTADO_BADGE[t]||'b-gris'}">${t}</span>`; }

function nombre(lista, id) {
  const p = lista.find(x=>x.id===id);
  return p ? p.nombre : '—';
}

// ── NAVIGATION ──
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`[data-sec="${id}"]`).classList.add('active');
  renderAll();
}

// ── MODAL ──
function openModal(id) {
  populateSelects();
  document.getElementById(id).classList.add('open');
  // set today's date on date fields
  const today = new Date().toISOString().split('T')[0];
  ['ped-fecha','ent-fecha','ac-fecha'].forEach(f => {
    const el = document.getElementById(f);
    if(el && !el.value) el.value = today;
  });
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-bg').forEach(m => {
  m.addEventListener('click', e => { if(e.target === m) m.classList.remove('open'); });
});

function populateSelects() {
  const prods = db.personas.filter(p=>p.rol==='Productor');
  const comps = db.personas.filter(p=>p.rol==='Comprador'||p.rol==='Intermediario');

  fillSel('pr-productor', db.personas, 'Seleccionar productor', true);
  fillSel('ped-comprador', db.personas, 'Seleccionar comprador');
  fillSel('ped-producto', db.productos, 'Seleccionar producto', false, true);
  fillSel('ent-ped', db.pedidos.map(p=>({...p, nombre:`Pedido #${p.id} – ${nombre(db.productos,p.producto)}`})), 'Seleccionar pedido ref.');
  fillSel('ac-prod', db.personas, 'Seleccionar productor');
  fillSel('ac-comp', db.personas, 'Seleccionar comprador');
  fillSel('ac-prod-item', db.productos, 'Seleccionar producto', false, true);
}

function fillSel(id, arr, placeholder, onlyProd=false, isProduct=false) {
  const el = document.getElementById(id);
  if(!el) return;
  const list = onlyProd ? arr.filter(p=>p.rol==='Productor') : arr;
  el.innerHTML = `<option value="">— ${placeholder} —</option>` +
    list.map(x => `<option value="${x.id}">${isProduct ? x.nombre + ` (${x.stock} ${x.unidad})` : x.nombre}</option>`).join('');
}

function fillPrecio() {
  const id = parseInt(document.getElementById('ped-producto').value);
  const p = db.productos.find(x=>x.id===id);
  if(p) document.getElementById('ped-precio').value = p.precio;
}

// ── SAVES ──
function savePersona() {
  const n = document.getElementById('p-nombre').value.trim();
  if(!n) return alert('Ingresa el nombre.');
  db.personas.push({
    id: nextId('personas'),
    nombre: n,
    rol: document.getElementById('p-rol').value,
    tel: document.getElementById('p-tel').value,
    lugar: document.getElementById('p-lugar').value,
    obs: document.getElementById('p-obs').value,
  });
  ['p-nombre','p-tel','p-lugar','p-obs'].forEach(id => document.getElementById(id).value='');
  closeModal('m-persona'); renderAll();
}

function saveProducto() {
  const n = document.getElementById('pr-nombre').value.trim();
  if(!n) return alert('Ingresa el nombre del producto.');
  db.productos.push({
    id: nextId('productos'),
    nombre: n,
    cat: document.getElementById('pr-cat').value,
    stock: parseFloat(document.getElementById('pr-stock').value)||0,
    unidad: document.getElementById('pr-unidad').value,
    precio: parseFloat(document.getElementById('pr-precio').value)||0,
    temp: document.getElementById('pr-temp').value,
    productor: parseInt(document.getElementById('pr-productor').value)||0,
    desc: document.getElementById('pr-desc').value,
  });
  ['pr-nombre','pr-stock','pr-precio','pr-desc'].forEach(id => document.getElementById(id).value='');
  closeModal('m-producto'); renderAll();
}

function savePedido() {
  const comp = parseInt(document.getElementById('ped-comprador').value);
  const prod = parseInt(document.getElementById('ped-producto').value);
  const cant = parseFloat(document.getElementById('ped-cant').value);
  if(!comp||!prod||!cant) return alert('Completa todos los campos requeridos.');
  db.pedidos.push({
    id: nextId('pedidos'),
    fecha: document.getElementById('ped-fecha').value,
    comprador: comp,
    producto: prod,
    cant: cant,
    precio: parseFloat(document.getElementById('ped-precio').value)||0,
    punto: document.getElementById('ped-punto').value,
    estado: 'Pendiente',
    obs: document.getElementById('ped-obs').value,
  });
  ['ped-cant','ped-precio','ped-obs'].forEach(id => document.getElementById(id).value='');
  closeModal('m-pedido'); renderAll();
}

function saveEntrega() {
  const ped = parseInt(document.getElementById('ent-ped').value);
  if(!ped) return alert('Selecciona un pedido de referencia.');
  db.entregas.push({
    id: nextId('entregas'),
    pedido: ped,
    fechaProg: document.getElementById('ent-fecha').value,
    cant: parseFloat(document.getElementById('ent-cant').value)||0,
    punto: document.getElementById('ent-punto').value,
    estado: document.getElementById('ent-est').value,
    obs: document.getElementById('ent-obs').value,
  });
  ['ent-cant','ent-obs'].forEach(id => document.getElementById(id).value='');
  closeModal('m-entrega'); renderAll();
}

function saveAcuerdo() {
  const p = parseInt(document.getElementById('ac-prod').value);
  const c = parseInt(document.getElementById('ac-comp').value);
  const pr = parseInt(document.getElementById('ac-prod-item').value);
  if(!p||!c||!pr) return alert('Selecciona productor, comprador y producto.');
  db.acuerdos.push({
    id: nextId('acuerdos'),
    fecha: new Date().toISOString().split('T')[0],
    productor: p,
    comprador: c,
    producto: pr,
    cant: parseFloat(document.getElementById('ac-cant').value)||0,
    precio: parseFloat(document.getElementById('ac-precio').value)||0,
    fechaLimite: document.getElementById('ac-fecha').value,
    pago: document.getElementById('ac-pago').value,
    estado: document.getElementById('ac-estado').value,
    notas: document.getElementById('ac-notas').value,
  });
  ['ac-cant','ac-precio','ac-notas'].forEach(id => document.getElementById(id).value='');
  closeModal('m-acuerdo'); renderAll();
}

// ── DELETE ──
function deletePer(id){ if(confirm('¿Eliminar persona?')){ db.personas=db.personas.filter(x=>x.id!==id); renderAll(); }}
function deleteProd(id){ if(confirm('¿Eliminar producto?')){ db.productos=db.productos.filter(x=>x.id!==id); renderAll(); }}
function deletePed(id){ if(confirm('¿Eliminar pedido?')){ db.pedidos=db.pedidos.filter(x=>x.id!==id); renderAll(); }}
function deleteEnt(id){ if(confirm('¿Eliminar entrega?')){ db.entregas=db.entregas.filter(x=>x.id!==id); renderAll(); }}
function deleteAcu(id){ if(confirm('¿Eliminar acuerdo?')){ db.acuerdos=db.acuerdos.filter(x=>x.id!==id); renderAll(); }}

function advancePedido(id) {
  const NEXT = {'Pendiente':'Confirmado','Confirmado':'En proceso','En proceso':'Entregado'};
  const p = db.pedidos.find(x=>x.id===id);
  if(p && NEXT[p.estado]) { p.estado = NEXT[p.estado]; renderAll(); }
}
function advanceEntrega(id) {
  const e = db.entregas.find(x=>x.id===id);
  if(e && e.estado==='Programada') { e.estado='Realizada'; renderAll(); }
}

// ── RENDER PERSONAS ──
function renderPersonas() {
  const q = (document.getElementById('persona-search')||{}).value||'';
  const r = (document.getElementById('persona-rol')||{}).value||'';
  const list = db.personas.filter(p =>
    (!q || p.nombre.toLowerCase().includes(q.toLowerCase()) || p.tel.includes(q)) &&
    (!r || p.rol === r)
  );
  const tb = document.getElementById('tbody-personas');
  if(!tb) return;
  if(!list.length) { tb.innerHTML=`<tr class="empty-row"><td colspan="7">Sin resultados</td></tr>`; return; }
  tb.innerHTML = list.map(p=>`<tr>
    <td>${p.id}</td>
    <td><strong>${p.nombre}</strong></td>
    <td>${badge(p.rol)}</td>
    <td>${p.lugar||'—'}</td>
    <td><div class="td-actions">
      <button class="btn btn-secondary btn-sm" onclick="deletePer(${p.id})">Eliminar</button>
    </div></td>
  </tr>`).join('');
}

// ── RENDER PRODUCTOS ──
function renderProductos() {
  const q = (document.getElementById('prod-search')||{}).value||'';
  const c = (document.getElementById('prod-cat')||{}).value||'';
  const list = db.productos.filter(p =>
    (!q || p.nombre.toLowerCase().includes(q.toLowerCase())) &&
    (!c || p.cat === c)
  );
  const el = document.getElementById('prod-cards');
  if(!el) return;
  if(!list.length) { el.innerHTML=`<p style="color:var(--text3);padding:2rem;text-align:center">Sin productos</p>`; return; }
  el.innerHTML = list.map(p=>`
    <div class="prod-card">
      <span class="pc-icon">${EMOJIS[p.cat]||''}</span>
      <div class="pc-name">${p.nombre}</div>
      <div class="pc-cat">${p.cat} · ${p.temp}</div>
      <div class="pc-stock">${p.stock} <span class="pc-unit">${p.unidad}</span></div>
      ${p.precio>0?`<div class="pc-price">Q ${parseFloat(p.precio).toFixed(2)} / ${p.unidad}</div>`:''}
      <div style="font-size:12px;color:var(--text3);margin-top:4px">Prod: ${nombre(db.personas,p.productor)}</div>
      <div class="pc-actions">
        <button class="btn btn-secondary btn-sm" onclick="deleteProd(${p.id})">Eliminar</button>
      </div>
    </div>
  `).join('');
}

// ── RENDER PEDIDOS ──
function renderPedidos() {
  const q = (document.getElementById('ped-search')||{}).value||'';
  const e = (document.getElementById('ped-estado')||{}).value||'';
  const list = db.pedidos.filter(p => {
    const cn = nombre(db.personas,p.comprador).toLowerCase();
    const pn = nombre(db.productos,p.producto).toLowerCase();
    return (!q || cn.includes(q.toLowerCase()) || pn.includes(q.toLowerCase())) &&
           (!e || p.estado===e);
  });
  const tb = document.getElementById('tbody-pedidos');
  if(!tb) return;
  if(!list.length){ tb.innerHTML=`<tr class="empty-row"><td colspan="10">Sin pedidos</td></tr>`; return; }
  const NEXT = {'Pendiente':'Confirmado','Confirmado':'En proceso','En proceso':'Entregado'};
  tb.innerHTML = list.map(p=>{
    const total = p.cant * p.precio;
    const nx = NEXT[p.estado];
    return `<tr>
      <td>#${p.id}</td>
      <td>${fmtDate(p.fecha)}</td>
      <td>${nombre(db.personas,p.comprador)}</td>
      <td>${nombre(db.productos,p.producto)}</td>
      <td>${p.cant}</td>
      <td>${fmt(p.precio)}</td>
      <td><strong>${fmt(total)}</strong></td>
      <td>${badge(p.estado)}</td>
      <td><span style="font-size:12px">${p.punto}</span></td>
      <td><div class="td-actions">
        ${nx?`<button class="btn btn-sky btn-sm" onclick="advancePedido(${p.id})">→ ${nx}</button>`:''}
        <button class="btn btn-danger btn-sm" onclick="deletePed(${p.id})">✕</button>
      </div></td>
    </tr>`;
  }).join('');
}

// ── RENDER ENTREGAS ──
function renderEntregas() {
  const q = (document.getElementById('ent-search')||{}).value||'';
  const e = (document.getElementById('ent-estado')||{}).value||'';
  const list = db.entregas.filter(en => {
    const ped = db.pedidos.find(p=>p.id===en.pedido)||{};
    const pn = nombre(db.productos,ped.producto).toLowerCase();
    return (!q || pn.includes(q.toLowerCase()) || String(en.pedido).includes(q)) &&
           (!e || en.estado===e);
  });
  const tb = document.getElementById('tbody-entregas');
  if(!tb) return;
  if(!list.length){ tb.innerHTML=`<tr class="empty-row"><td colspan="11">Sin entregas</td></tr>`; return; }
  tb.innerHTML = list.map(en => {
    const ped = db.pedidos.find(p=>p.id===en.pedido)||{};
    return `<tr>
      <td>#${en.id}</td>
      <td>#${en.pedido}</td>
      <td>${fmtDate(en.fechaProg)}</td>
      <td>${nombre(db.productos,ped.producto)}</td>
      <td>${en.cant}</td>
      <td><span style="font-size:12px">${en.punto}</span></td>
      <td style="font-size:12px">${nombre(db.personas, (db.productos.find(p=>p.id===ped.producto)||{}).productor)}</td>
      <td style="font-size:12px">${nombre(db.personas,ped.comprador)}</td>
      <td>${badge(en.estado)}</td>
      <td style="font-size:12px;color:var(--text3)">${en.obs||'—'}</td>
      <td><div class="td-actions">
        ${en.estado==='Programada'?`<button class="btn btn-primary btn-sm" onclick="advanceEntrega(${en.id})">✓ Realizada</button>`:''}
        <button class="btn btn-danger btn-sm" onclick="deleteEnt(${en.id})">✕</button>
      </div></td>
    </tr>`;
  }).join('');
}

// ── RENDER ACUERDOS ──
function renderAcuerdos() {
  const q = (document.getElementById('acu-search')||{}).value||'';
  const e = (document.getElementById('acu-estado')||{}).value||'';
  const list = db.acuerdos.filter(a => {
    const pn = nombre(db.personas,a.productor).toLowerCase();
    const cn = nombre(db.personas,a.comprador).toLowerCase();
    return (!q || pn.includes(q.toLowerCase()) || cn.includes(q.toLowerCase())) &&
           (!e || a.estado===e);
  });
  const tb = document.getElementById('tbody-acuerdos');
  if(!tb) return;
  if(!list.length){ tb.innerHTML=`<tr class="empty-row"><td colspan="11">Sin acuerdos</td></tr>`; return; }
  tb.innerHTML = list.map(a=>`<tr>
    <td>#${a.id}</td>
    <td>${fmtDate(a.fecha)}</td>
    <td>${nombre(db.personas,a.productor)}</td>
    <td>${nombre(db.personas,a.comprador)}</td>
    <td>${nombre(db.productos,a.producto)}</td>
    <td>${a.cant}</td>
    <td>${fmt(a.precio)}</td>
    <td>${fmtDate(a.fechaLimite)}</td>
    <td>${badge(a.pago)}</td>
    <td>${badge(a.estado)}</td>
    <td><div class="td-actions">
      <button class="btn btn-danger btn-sm" onclick="deleteAcu(${a.id})">✕</button>
    </div></td>
  </tr>`).join('');
}

// ── RENDER DASHBOARD ──
function renderDashboard() {
  const entPend = db.entregas.filter(e=>e.estado==='Programada').length;
  const acAct   = db.acuerdos.filter(a=>a.estado==='Activo').length;
  const lowStock = db.productos.filter(p=>p.stock<50);

  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-box"><div class="s-label">Personas</div><div class="s-val">${db.personas.length}</div></div>
    <div class="stat-box"><div class="s-label">Productos</div><div class="s-val">${db.productos.length}</div></div>
    <div class="stat-box"><div class="s-label">Pedidos activos</div><div class="s-val">${db.pedidos.filter(p=>p.estado!=='Entregado'&&p.estado!=='Cancelado').length}</div></div>
    <div class="stat-box"><div class="s-label">Entregas pendientes</div><div class="s-val">${entPend}</div></div>
    <div class="stat-box"><div class="s-label">Acuerdos activos</div><div class="s-val">${acAct}</div></div>
    <div class="stat-box"><div class="s-label">Stock bajo</div><div class="s-val">${lowStock.length}</div></div>
  `;

  // Pedidos recientes
  const recPed = [...db.pedidos].slice(-4).reverse();
  document.getElementById('dash-pedidos-recent').innerHTML = recPed.length
    ? recPed.map(p=>`<div class="dash-row">
        <span class="dr-label">#${p.id} ${nombre(db.productos,p.producto)}</span>
        <span class="dr-val">${badge(p.estado)}</span>
      </div>`).join('')
    : '<p style="color:var(--text3);font-size:13px">Sin pedidos</p>';

  // Low stock
  document.getElementById('dash-low-stock').innerHTML = lowStock.length
    ? lowStock.map(p=>`<div class="dash-row">
        <span class="dr-label">${p.nombre}</span>
        <span class="dr-val" style="color:var(--red)">${p.stock} ${p.unidad}</span>
      </div>`).join('')
    : '<p style="color:var(--leaf);font-size:13px">✓ Stock normal</p>';

  // Entregas pendientes
  const entP = db.entregas.filter(e=>e.estado==='Programada');
  document.getElementById('dash-entregas-pend').innerHTML = entP.length
    ? entP.map(e=>{
        const ped = db.pedidos.find(p=>p.id===e.pedido)||{};
        return `<div class="dash-row">
          <span class="dr-label">${nombre(db.productos,ped.producto)} (${e.cant})</span>
          <span class="dr-val">${fmtDate(e.fechaProg)}</span>
        </div>`;
      }).join('')
    : '<p style="color:var(--text3);font-size:13px">Sin entregas programadas</p>';

  // Acuerdos activos
  const acA = db.acuerdos.filter(a=>a.estado==='Activo');
  document.getElementById('dash-acuerdos-act').innerHTML = acA.length
    ? acA.map(a=>`<div class="dash-row">
        <span class="dr-label">${nombre(db.personas,a.productor)} → ${nombre(db.personas,a.comprador)}</span>
        <span class="dr-val">${badge(a.pago)}</span>
      </div>`).join('')
    : '<p style="color:var(--text3);font-size:13px">Sin acuerdos activos</p>';
}

function renderAll() {
  renderDashboard();
  renderPersonas();
  renderProductos();
  renderPedidos();
  renderEntregas();
  renderAcuerdos();
}

// ── LIVE SEARCH ──
['persona-search','persona-rol'].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', renderPersonas);
});
['prod-search','prod-cat'].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', renderProductos);
});
['ped-search','ped-estado'].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener('change', renderPedidos);
});
document.getElementById('ped-search').addEventListener('input', renderPedidos);
['ent-search','ent-estado'].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', renderEntregas);
});
['acu-search','acu-estado'].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', renderAcuerdos);
});

// ── CLOCK ──
function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2,'0');
  const m = now.getMinutes().toString().padStart(2,'0');
  const s = now.getSeconds().toString().padStart(2,'0');
  document.getElementById('clock-time').textContent = `${h}:${m}:${s}`;
  const days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  document.getElementById('clock-date').textContent =
    `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}
updateClock(); setInterval(updateClock, 1000);

// ── INIT ──
renderAll();