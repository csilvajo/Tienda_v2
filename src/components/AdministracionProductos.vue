<template>
  <h2>Administración de Productos</h2>
  <BotonVolverAlHome />      
  <hr>
  <AgregarProductos />
  <hr>
  <ListaProductos />
</template>

<script>
import AgregarProductos from "./AgregarProductos.vue";
import ListaProductos from "./ListaProductos.vue";
import BotonVolverAlHome from "./BotonVolverAlHome.vue";

export default {
  name: "AdministracionProductos",
  components: {
    AgregarProductos,
    ListaProductos,
    BotonVolverAlHome
  },
};
</script>

<style>
</style>