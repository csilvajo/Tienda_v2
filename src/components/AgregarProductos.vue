<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 col-md-7 col-lg-6">
      <!--Formulario para agregar nuevo producto-->
      <form class="formulario">
        <h3 class="mb-3 text-center"><i class="fa fa-plus-square" /> Agregar un producto</h3>
        <div class="row form-group">
          <div class="col-6">
            <label for="inputNombreProducto" class="form-label">Nombre del producto</label>
            <input type="text" id="inputNombreProducto" class="form-control" aria-describedby="inputNombreProducto" placeholder="Indique el nombre" 
              v-model.trim="producto.nombreProducto"/>
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
            <label for="inputAltImagen" class="form-label">Descripción de la Imagen (ALT)</label>
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
            <button type="reset" class="btn btn-primary btn-sm btn-block"><i class="fa fa-eraser" /> Limpiar</button>
          </div>
          <div class="col-12 mt-2">
            <button type="button" class="btn btn-success btn-sm btn-block" :disabled="bloquearBoton" @click="procesarFormulario"><i class="fa fa-plus" /> Agregar</button>
          </div>          
        </div>
      </form>
      <!--Fin Formulario para agregar nuevo producto-->
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
//constante que genera un id aleatorio
const shortid = require("shortid"); 

export default {
  name: "AgregarProductos",
  data() {
    return {
      producto: {
        //el producto se recoge desde la informacion ingresada en el formulario
        id: "",
        nombreProducto: "",
        marcaProducto: "",
        descripcionProducto: "",
        precioProducto: "",        
        urlImagen: "",
        altImagen: ""
      }
    }
  },
  computed: {    
    bloquearBoton() {
      //metodo que bloquea el boton si no se completan los campos indicados
      return this.producto.nombreProducto.trim() === "" 
        || this.producto.marcaProducto == false
        || this.producto.descripcionProducto == false 
        || this.producto.precioProducto == false
        || this.producto.urlImagen == false
        || this.producto.altImagen == false 
        ? true : false;
    },
  },
  methods: {
    ...mapActions(["agregarProductoAction"]),
    procesarFormulario() {
      if (this.validarFormulario()) {
        return;
      }
      //se genera id aleatorio
      this.producto.id = shortid.generate();      
      //se envia el producto a la store
      this.agregarProductoAction(this.producto);
      //se limpia el formulario
      this.producto = {        
        nombreProducto: "",
        marcaProducto: "",
        descripcionProducto: "",
        precioProducto: "",        
        urlImagen: "",
        altImagen: ""
      }                  
    }, 
    validarFormulario() {
      if (this.producto.nombreProducto.length < 4) {
        const inputNombreProducto = document.getElementById("inputNombreProducto");
        inputNombreProducto.focus();
        alert("El nombre debe ser mayor a 3 carateres");                             
        return 1;            
      }
      if (this.producto.marcaProducto.length < 4) { 
        const inputMarcaProducto = document.getElementById("inputMarcaProducto");
        inputMarcaProducto.focus();
        alert("La marca debe ser mayor a 3 carateres");            
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
  }
};
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