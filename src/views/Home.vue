<template>
  <div class="container contenedor">    
    <Bienvenida />
    <hr />
    <CatalogoProductos />    
  </div>
</template>

<script>
import Bienvenida from "../components/Bienvenida.vue";
import CatalogoProductos from "../components/CatalogoProductos.vue";

export default {
  name: 'Home',
  components: {
    Bienvenida,
    CatalogoProductos,   
  }
}
</script>

