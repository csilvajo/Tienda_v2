<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-info btn-block" data-toggle="modal" data-target="#exampleModal" >
     <i class="fa fa-question-circle" /> 
  </button>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog estiloVentana" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Requerimientos de la Aplicación</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul>
            <li>Construir una aplicación web utilizando las librerías Vue, Vue Router y Vuex para obtener y persistir datos con una API de acuerdo al estilo arquitectural REST.</li>
            <li>Usar la persistencia de datos en el CRUD, utilizando la API de Firebase que haga posible la actualización de contenidos en el sitio web a través del mantenedor.</li>
            <li>Utilizar el servicio de autenticación con Firebase.</li>
            <li>Las únicas vistas que se pueden ver sin iniciar sesión son: Ingreso, Registro y el Catálogo.</li>
            <li>En el Catálogo, se debe mostrar la colección de productos contenidos en Firebase.</li>
            <li>En la Administración de Productos, dede ser posible efectuar un CRUD con la colección de Productos.</li>
            <li>Carrito. Desde el Catálogo se pueden agregar elementos al Carrito.</li>
            <li>Carrito. Cuando el cliente presione el botón Pagar, se debe guardar esa Venta en una colección de Firebase.</li>
            <li>Ventas (Detalle de las ventas), se puede ver una colección con las Ventas realizadas.</li>
          </ul>
           
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">
            Cerrar
          </button>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VentanaModal",
};
</script>

<style scoped>
.estiloVentana {
  text-align: left;  
  font-size: 12px;
}
</style>