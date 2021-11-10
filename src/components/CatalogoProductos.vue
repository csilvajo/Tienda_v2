<template>
  <!--Card-->
  <div class="row justify-content-center">
    <h2 class="mb-3">Catálogo de Productos</h2>     
    <div class="col-12">      
      <div v-if="listaProductos.length < 1" class="alert alert-info alerta">
        - No hay registros -
      </div>
    </div>    
    <div v-for="(item, index) in listaProductos" :key="index" class="col-sm-12 col-md-6 col-lg-4 d-flex py-2 justify-content-center">
        <!--se envia el producto obtenido al recorrer el arreglo como props al componente TarjetaProducto-->
        <TarjetaProducto :objProducto="item"/>
    </div>        
  </div>
  <!--Card-->
</template>

<script>
import { mapState, mapActions } from "vuex";
import TarjetaProducto from "./TarjetaProducto.vue";

export default {
  name: "CatalogoProductos",
  components: {
      TarjetaProducto,
  },
  computed: {
    ...mapState(["listaProductos"]), //se mapean los estados de la store
  },
  methods: {
    //se mapean las acciones de la store
    ...mapActions(["cargarBaseDeDatosAction","cargarVentasDBAction"])
  },
  created() {
    //se carga la accion cuando carga la app
    this.cargarBaseDeDatosAction();
  }
};
</script>

