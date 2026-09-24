import React from "react";
import Layout from "../components/Layout/Layout"; // <--- Importas el Layout de tu compañero

export const Vigilantes = () => {
  return (
    <Layout> {/* <--- ENVOLTORIO INICIAL */}
      
      <div className="header-section">
        <h2>Gestión de Vigilantes</h2>
        <button className="btn-primary">+ Nuevo Vigilante</button>
      </div>

      <div className="crud-tools">
        <input type="text" placeholder="Buscar vigilante..." />
        <select>
          <option value="">Todas las zonas</option>
        </select>
      </div>

      <div className="table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Zona</th>
              <th>Contacto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Jim Hopper</td>
              <td>Hawkins Lab</td>
              <td>555-0199</td>
              <td><span className="badge-active">Activo</span></td>
              <td>
                <button className="btn-action">Editar</button>
                <button className="btn-action btn-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </Layout> /* <--- ENVOLTORIO FINAL */
  );
};

export default Vigilantes;