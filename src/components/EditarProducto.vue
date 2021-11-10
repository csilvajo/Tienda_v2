<template>  
   <div class="row justify-content-center">
    <div class="col-sm-8 col-md-6">
      <!--Formulario para agregar nuevo producto-->
      <form class="formulario" @submit.prevent="procesarFormulario">
        <h3 class="mb-3 text-center"><i class="fa fa-pencil-square"/> Actualizar un producto</h3>
        <div class="row form-group">
          <div class="col-6">
            <label for="inputNombreProducto" class="form-label">Nombre del producto</label>
            <input type="text" id="inputNombreProducto" class="form-control" aria-describedby="inputNombreProducto" placeholder="Indique el nombre" 
              v-model.trim="producto.nombreProducto" />
          </div>  
          <div class="col-6">
            <label for="inputMarcaProducto" class="form-label">Marca del Producto</label>
            <input type="text" id="inputMarcaProducto" class="form-control" aria-describedby="inputMarcaProducto" placeholder="Indique la marca"
              v-model.trim="producto.marcaProducto"/>
          </div>
        </div>       
        <div class="form-group">
          <label for="textDescripcionProducto" class="form-label">Descripción del Producto</label>
          <textarea type="text" id="textDescripcionProducto" class="form-control" aria-describedby="textDescripcionProducto" placeholder="Describa el producto"
            v-model.trim="producto.descripcionProducto"/>
        </div>
        <div class="row form-group">
          <div class="col-6">
            <label for="inputPrecioProducto" class="form-label">Precio del Producto</label>
            <input type="number" id="inputPrecioProducto" class="form-control" aria-describedby="inputPrecioProducto" placeholder="Indique el precio"
              v-model.number="producto.precioProducto"/>
          </div>  
          <div class="col-6">
            <label for="inputAltImagen" class="form-label">Descripción de la Imagen</label>
            <input type="txt" id="inputAltImagen" class="form-control" aria-describedby="inputAltImagen" placeholder="Describa la imagen (ALT)"
              v-model.trim="producto.altImagen"/>  
          </div>
        </div>        
        <div class="form-group">
          <label for="inputUrlImagen" class="form-label">Imagen del Producto (URL)</label>
          <input type="text" id="inputUrlImagen" class="form-control" aria-describedby="inputUrlImagen" placeholder="Ingrese una URL"
            v-model.trim="producto.urlImagen"/>         
        </div>
        <div class="row justify-content-center"> 
          <div class="col-12 mt-2">
            <router-link to="/administracionProductos" class="btn btn-primary btn-sm btn-block"><i class="fa fa-chevron-circle-left"/> Volver</router-link>
          </div>         
          <div class="col-12 mt-2">
            <button type="submit" class="btn btn-success btn-sm btn-block" :disabled="bloquearBoton" ><i class="fa fa-chevron-circle-right" /> Enviar</button>
          </div>    
        </div>
      </form>
     
      <!--Fin Formulario para agregar nuevo producto-->
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: "EditarProducto",    
    computed: {
        ...mapState(["producto"]),
        bloquearBoton() {
          //metodo que bloquea el boton si no se completan los campos indicados
          return this.producto.nombreProducto.trim() === "" 
            || this.producto.marcaProducto == false
            || this.producto.descripcionProducto == false 
            || this.producto.precioProducto == false
            || this.producto.urlImagen == false
            || this.producto.altImagen == false 
            ? true : false;
        }
    },
    methods: {
        //se mapean las acciones de la store
        ...mapActions(["seleccionarProductoAction","actualizarProductoAction"]),
        procesarFormulario() {
          if(this.validarFormulario()){           
            return;
          }
          this.actualizarProductoAction(this.producto);         
        }, 
        validarFormulario() {
          if (this.producto.nombreProducto.length < 5) {
            const inputNombreProducto = document.getElementById("inputNombreProducto");
            inputNombreProducto.focus();
            alert("El nombre debe ser mayor a 4 carateres");                             
            return 1;            
          }
          if (this.producto.marcaProducto.length < 5) { 
            const inputMarcaProducto = document.getElementById("inputMarcaProducto");
            inputMarcaProducto.focus();
            alert("La marca debe ser mayor a 4 carateres");            
            return 1;            
          }
          if (this.producto.descripcionProducto.length < 5) {
            const textDescripcionProducto = document.getElementById("textDescripcionProducto");
            textDescripcionProducto.focus();
            alert("La descripción debe ser mayor a 4 carateres");            
            return 1; 
          }
          if(this.producto.precioProducto < 1000) { 
            const inputPrecioProducto = document.getElementById("inputPrecioProducto");
            inputPrecioProducto.focus();
            alert("El precio no debe ser menor a 1000");
            return 1;            
          }
          if (this.producto.altImagen.length < 5) {
            const inputAltImagen = document.getElementById("inputAltImagen");
            inputAltImagen.focus();
            alert("La descripción de la imagen debe ser mayor a 4 carateres");
            return 1; 
          }
        } 
    },
    created() {
        //se invoca la accion de la store que edita el producto, pasando el id que viene por route como parametro
        this.seleccionarProductoAction(this.$route.params.id);
    }
}
</script>

<style scoped>
.formulario {
  padding: 15px;
  text-align: left;
  font-size: 15px;
  font-weight: bolder;
  background: rgb(205, 200, 200);
  border: black 1px solid;
  border-radius: 5px;
  box-shadow: 5px 5px 15px black;
}
</style>
