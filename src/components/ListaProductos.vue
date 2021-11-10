<template>
  <div class="row justify-content-center">      
    <div class="col-sm-8 col-md-12">
      <h3>Detalle de los productos</h3>
      <div v-if="listaProductos.length < 1" class="alert alert-info alerta">
        - No hay registros -
      </div>
      <div v-else class="table-responsive-sm table-responsive-md colorTabla">
        <table class="table table-striped table-sm">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Serie</th>
              <th scope="col">Nombre</th>
              <th scope="col">Marca</th>
              <th scope="col">Descripción</th>
              <th scope="col" width="100">Precio</th>
              <th scope="col" width="100">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listaProductos" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.id }}</td>
              <td>{{ item.nombreProducto }}</td>
              <td>{{ item.marcaProducto }}</td>
              <td>{{ item.descripcionProducto }}</td>
              <td>$ {{ Number(item.precioProducto).toLocaleString("es") }}</td>
              <td>
                <button type="button" class="btn btn-danger btn-sm m-1" @click="eliminarProductoAction(item.id)"><i class="fa fa-trash"/></button>
                <!--mediante router-link, se redirige a la vista para editar el producto. Enviando el id como parametro-->
                <router-link class="btn btn-warning btn-sm m-1" :to="{ name: 'EditarProducto', params: { id: item.id } }"><i class="fa fa-pencil"/></router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ListaProductos",
  computed: {
    ...mapState(["listaProductos"]), //se mapean los estados de la store
  },
  methods: {
    ...mapActions(["eliminarProductoAction"]), //se mapean las acciones de la store
  },
};
</script>

<style scoped>
.colorTabla {
  font-size: 15px;
  text-align: left; 
  border-radius: 5px;
  border: black 1px solid; 
  box-shadow: 5px 5px 15px black;
}
</style>