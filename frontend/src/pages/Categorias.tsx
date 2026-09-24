import React from "react";
import Layout from "../components/Layout/Layout"; 

export const Categorias = () => {
  return (
    <Layout> {
      
      <div className="header-section">
        <h2>Gestión de Categorías</h2>
        <button className="btn-primary">+ Nueva Categoría</button>
      </div>

      <div className="crud-tools">
        <input type="text" placeholder="Buscar categoría..." />
      </div>

      <div className="table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Demogorgon</td>
              <td>Entidad interdimensional hostil.</td>
              <td>
                <button className="btn-action">Editar</button>
                <button className="btn-action btn-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </Layout> 
  );
};

export default Categorias;