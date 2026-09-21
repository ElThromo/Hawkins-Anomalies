const { test } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const jwt = require('jsonwebtoken');
// Aislamos la base: las peticiones recorren rutas, permisos, validaciones,
// controladores y servicios reales, sin tocar datos del usuario.
const tipos = new Map();
let siguiente = 1;
let adminActivo = true;
const fallo = code => Object.assign(new Error(code), { code });
const repository = {
  obtenerTiposReaccion: async () => [...tipos.values()],
  obtenerTipoReaccionPorId: async id => tipos.get(id) || null,
  crearTipoReaccion: async datos => {
    if ([...tipos.values()].some(t => t.nombre === datos.nombre)) throw fallo('P2002');
    const tipo = { idTipoReaccion: siguiente++, ...datos }; tipos.set(tipo.idTipoReaccion, tipo); return tipo;
  },
  actualizarTipoReaccion: async (id, datos) => {
    if (!tipos.has(id)) throw fallo('P2025');
    if ([...tipos.values()].some(t => t.idTipoReaccion !== id && t.nombre === datos.nombre)) throw fallo('P2002');
    const tipo = { idTipoReaccion: id, ...datos }; tipos.set(id, tipo); return tipo;
  },
  eliminarTipoReaccion: async id => {
    if (!tipos.has(id)) throw fallo('P2025');
    if (id === 99) throw fallo('P2003');
    tipos.delete(id);
  }
};
function simular(ruta, exports) { const id = require.resolve(ruta); require.cache[id] = { id, filename: id, loaded: true, exports }; }
simular('../src/tipoReaccion/tipoReaccion.repository', repository);
simular('../src/usuario/usuario.repository', { obtenerUsuarioPorId: async id => id === 1
  ? { idUsuario: 1, activo: adminActivo, rol: 'ADMIN' }
  : { idUsuario: id, activo: true, rol: 'USUARIO' } });
process.env.JWT_SECRET = 'clave-exclusiva-de-pruebas';
const app = express(); app.use(express.json());
app.use('/tipos-reaccion', require('../src/tipoReaccion/tipoReaccion.routes'));
// Comprobar que las rutas de usuarios tampoco permiten elevar roles sin permisos.
simular('../src/usuario/usuario.controller', Object.fromEntries(['obtenerUsuarios','obtenerUsuarioPorId','crearUsuario','actualizarUsuario','eliminarUsuario'].map(k => [k, (req,res) => res.json({ ok: true })])));
app.use('/usuarios', require('../src/usuario/usuario.routes'));

test('CRUD HTTP y permisos del catálogo', async t => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const token = id => jwt.sign({ idUsuario: id, rol: 'ADMIN' }, process.env.JWT_SECRET);
  async function pedir(method, path, body, id) {
    const response = await fetch(base + path, { method, headers: {
      'Content-Type': 'application/json', ...(id ? { Authorization: `Bearer ${token(id)}` } : {})
    }, ...(body ? { body: JSON.stringify(body) } : {}) });
    return { status: response.status, data: await response.json() };
  }
  const url = '/tipos-reaccion';
  const datos = { nombre: ' Sorpresa ', emoji: ' 😮 ' };
  assert.equal((await pedir('GET', url)).status, 200);
  for (const [method,path,body] of [['POST',url,datos],['PUT',url+'/1',datos],['DELETE',url+'/1']]) {
    assert.equal((await pedir(method,path,body)).status,401);
    assert.equal((await pedir(method,path,body,2)).status,403);
  }
  adminActivo = false;
  assert.equal((await pedir('POST',url,datos,1)).status,403);
  adminActivo = true;
  for (const body of [{}, {nombre:' ',emoji:'😮'}, {nombre:'A',emoji:2}, {nombre:'a'.repeat(192),emoji:'😮'}]) {
    assert.equal((await pedir('POST',url,body,1)).status,400);
  }
  const creado = await pedir('POST',url,datos,1);
  assert.equal(creado.status,201); assert.equal(creado.data.tipoReaccion.nombre,'Sorpresa');
  assert.equal((await pedir('POST',url,datos,1)).status,409);
  assert.equal((await pedir('GET',url+'/1')).data.emoji,'😮');
  assert.equal((await pedir('PUT',url+'/1',{nombre:'Miedo',emoji:'😨'},1)).status,200);
  assert.equal((await pedir('GET',url+'/1')).data.nombre,'Miedo');
  assert.equal((await pedir('GET',url+'/abc')).status,400);
  assert.equal((await pedir('PUT',url+'/999',datos,1)).status,404);
  tipos.set(99,{idTipoReaccion:99,nombre:'En uso',emoji:'👍'});
  assert.equal((await pedir('DELETE',url+'/99',null,1)).status,409);
  assert.equal((await pedir('DELETE',url+'/1',null,1)).status,200);
  assert.equal((await pedir('GET',url+'/1')).status,404);
  assert.equal((await pedir('DELETE',url+'/1',null,1)).status,404);
  assert.equal((await pedir('PUT','/usuarios/2',{rol:'ADMIN'})).status,401);
  assert.equal((await pedir('PUT','/usuarios/2',{rol:'ADMIN'},2)).status,403);
});
