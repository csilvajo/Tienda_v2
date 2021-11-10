<template>
  <div class="container contenedor">
    <h2><i class="fa fa-shopping-cart" /> Carrito de compras</h2>
    <BotonVolverAlHome />
    <hr />
    <div v-if="carroDeCompras.length < 1">
      <div class="alert alert-warning" role="alert">
        El Carrito está vacio.
      </div>      
    </div>
    <div v-else class="row justify-content-around">
      <div class="col-sm-10 col-md-7 my-1 ">
        <div class="table-responsive-sm table-responsive-md colorTabla">
          <table class="table table-striped table-sm">
            <thead >
              <tr>
                <th scope="col">#</th>                                 
                <th scope="col">Marca</th>                
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in carroDeCompras" :key="index">
                <th scope="row">{{index + 1}}</th>                                
                <td>{{item.marcaProducto}}</td>                
                <td>$ {{Number(item.precioProducto).toLocaleString("es")}}</td>               
                <td>
                  <button type="button" class="btn btn-primary btn-sm m-1" @click="disminuirCantidaProducto(item)"><i class="fa fa-minus"/></button>
                  {{item.cantidad}}
                  <button type="button" class="btn btn-secondary btn-sm m-1" @click="aumentarCantidaProducto(item)"><i class="fa fa-plus"/></button>
                </td>
                <td>$ {{Number(item.subtotal).toLocaleString("es")}}</td>
                <td><button type="button" class="btn btn-danger btn-sm m-1"  @click="eliminarProductoDelCarro(item)"><i class="fa fa-trash"/></button></td>
              </tr>             
            </tbody>
          </table>         
        </div>
      </div>
      <div class="col-sm-10 col-md-4 my-1">
        <div class="card formaTarjeta" >          
          <div class="card-body">
            <h5 class="card-title">Resumen de la compra</h5>
            <p class="card-text">Cantidad de artículos: {{resumenCompra.cantidadArticulos}}</p>
            <p class="card-text">Total a pagar: $ {{Number(resumenCompra.totalCompra).toLocaleString("es")}}</p>
            <button type="button" class="btn btn-success btn-sm btn-block" @click="procesarVenta"><i class="fa fa-plus-square" /> Comprar</button>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BotonVolverAlHome from "../components/BotonVolverAlHome.vue";
//constante que genera un id aleatorio
const shortid = require("shortid"); 

export default {
  name: "CarroDeCompras",
  components: {
    BotonVolverAlHome,
  }, 
  computed: {
    ...mapState(["carroDeCompras","resumenCompra", "productoEnElCarro"]),//se mapean los estados de la store   
  },
  methods: {
    ...mapActions(["eliminarDelCarroAction","registrarVentaAction"]),//se mapean los metodos de la store  
    aumentarCantidaProducto(item){ 
      //se recibe el item que trae los datos del producto que esta en el carro
      //se aumenta la cantidad en 1 y se recalcula el subtotal cada vez que cliquea el boton     
      item.cantidad ++;
      item.subtotal = item.cantidad * item.precioProducto;

      this.reCalcularResumenCompra();
    },
    disminuirCantidaProducto(item){  
      //se recibe el item que trae los datos del producto que esta en el carro    
      if(item.cantidad < 2) {
        //si la cantidad es menor a 2 el valor por defecto de cantidad siempre sera 1 (se controla la cantidad minima)
        item.cantidad = 1;
        return;
      }
      //se disminuye la cantidad en 1 y se recalcula el subtotal cada vez que cliquea el boton  
      item.cantidad --;
      item.subtotal = item.cantidad * item.precioProducto;
      
      this.reCalcularResumenCompra();
    },
    eliminarProductoDelCarro(item){
      this.eliminarDelCarroAction(item);
      this.reCalcularResumenCompra();
    },
    reCalcularResumenCompra(){
      let total = null;
      let cantidad = null;
      this.carroDeCompras.forEach(element => {  
        //se recorre el arreglo del carro de compras, se extraen los valores de subtotal y cantidad para almacenarlas en variables locales      
        total = total + element.subtotal; 
        cantidad = cantidad + element.cantidad;    
      });
      //se reasignan valores a la variable de la Store que almacena el resumen de la compra 
      this.resumenCompra.totalCompra = total;
      this.resumenCompra.cantidadArticulos = cantidad;      
    },
    procesarVenta(){
      //se crea una variable local para almacenar el detalle de la venta y luego se envia a la store
      const venta = {
        id: null,
        cantArticulos: null,
        totalCompra: null,
        detalleArticulos: []        
      }
      //se genera id aleatorio
      venta.id = shortid.generate();
      venta.cantArticulos = this.resumenCompra.cantidadArticulos;
      venta.totalCompra = this.resumenCompra.totalCompra;
      venta.detalleArticulos = this.carroDeCompras;
      this.registrarVentaAction(venta);
      //se limpia el carrito 
      this.carroDeCompras.length = 0; 
      this.resumenCompra.cantidadArticulos = null; 
      this.resumenCompra.totalCompra = null;    
    }
  }
};
</script>

<style scoped>
.colorTabla {
  text-align: left;
  font-size: 15px;
  background-color: whitesmoke;
  border-radius: 5px;
  border: black 0.1px solid;  
}

.formaTarjeta {  
  border: black 0.1px solid; 
  background-color: white;
}
</style>