<template>
  <div class="row justify-content-center">      
    <div class="col-12">
      <h3>Detalle de las ventas</h3>
      <BotonVolverAlHome />
      <hr>
      <div v-if="listaVentas.length < 1" class="alert alert-info alerta">
        - No hay registros -         
      </div>
      <div v-else class="table-responsive-sm table-responsive-md colorTabla">
        <table class="table table-striped table-sm">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cantidad de artículos</th>
              <th scope="col">Monto de la Venta</th> 
              <th scope="col">Productos comprados</th>              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listaVentas" :key="index">
              <th scope="row">{{index + 1}}</th>
              <td>{{item.cantArticulos}}</td>
              <td>$ {{Number(item.totalCompra).toLocaleString("es")}}</td>
              <td>
                <ul class="lista p-0" v-for="itemDetalleArticulos, index in item.detalleArticulos" :key="index">
                    <li>
                        {{ (item.detalleArticulos.length === index + 1) ? itemDetalleArticulos.cantidad : itemDetalleArticulos.cantidad }} un,
                        {{ (item.detalleArticulos.length === index + 1) ? itemDetalleArticulos.marcaProducto   : itemDetalleArticulos.marcaProducto}} por
                        {{ (item.detalleArticulos.length === index + 1) ? "$"+Number(itemDetalleArticulos.precioProducto).toLocaleString("es") : "$"+Number(itemDetalleArticulos.precioProducto).toLocaleString("es")}} c/u
                    </li>                 
                </ul>
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
import BotonVolverAlHome from "../components/BotonVolverAlHome.vue";

export default {
  name: "Ventas",
  components: {
    BotonVolverAlHome
  },
  computed: {
        ...mapState(["listaVentas"]),
  },
  methods: {
    //se mapean las acciones de la store
    ...mapActions(["cargarBaseDeDatosAction","cargarVentasDBAction"])
  },
  created() {
    //se carga la accion cuando carga la app    
    this.cargarVentasDBAction();
  }
}
</script>

<style scoped>
.colorTabla {
  margin-top: 20px; 
  font-size: 15px;  
  text-align: left; 
  border-radius: 5px;
  border: black 1px solid; 
  box-shadow: 5px 5px 15px black;
}
.lista li {
    list-style:none;
}
</style>