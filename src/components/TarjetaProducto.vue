<template>
  <div class="card formaTarjeta" style="width: 18rem">
    <img class="card-img-top formaAfiche" :src="objProducto.urlImagen" :alt="objProducto.altImagen" />
    <div class="card-body">
      <h5 class="card-title">{{objProducto.nombreProducto}}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{objProducto.marcaProducto}}</li>
      <li class="list-group-item">{{objProducto.descripcionProducto}}</li>
      <li class="list-group-item">$ {{Number(objProducto.precioProducto).toLocaleString("es")}}</li>
    </ul>
    <div class="row justify-content-center my-2">
      <div class="col-6">
        <button type="button" class="btn btn-success btn-sm btn-block" @click="agregarAlCarro"><i class="fa fa-cart-plus" /></button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "TarjetaProducto",
  props: {
    //se recibe el objeto de producto desde el componente Catalogo de productos  
    objProducto: Object,        
  },
  methods: {
    ...mapActions(["agregarAlCarroAction"]),
    agregarAlCarro() {
      this.agregarAlCarroAction(this.objProducto);     
    },
  }  
};
</script>

<style scoped>
.formaTarjeta {
  border-radius: 5px;
  box-shadow: 1px 2px 4px black;
}

.formaAfiche {
  border: gray 1px solid;
  border-radius: 5px;
}

</style>