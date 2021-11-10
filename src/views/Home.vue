<template>
  <div class="container contenedor">
    
    <h1 class="titulo">Bienvenido a tu Tienda</h1>
    <img class="logo" alt="Vue logo" src="../assets/logo.png">
   
    <div v-if="usuario === null">
      <router-link to="/ingreso" class="btn btn-info btn-block my-4"><i class="fa fa-sign-in" /> Iniciar sesión</router-link>
    </div>

    <div v-else>
      <div class="my-3">
        <h2>Bienvenido/a {{usuario.email}} </h2>
      </div>
      <div class="row justify-content-center bg bg-dark rounded mt-3">
        <div class="col-sm-10 col-md-6 col-lg-4 py-2">
          <router-link to="/administracionProductos" class="btn btn-success btn-block"><i class="fa fa-check-square-o" /> Administrar productos</router-link>
        </div>
        <div class="col-sm-10 col-md-6 col-lg-4 py-2">
          <router-link to="/ventas" class="btn btn-primary btn-block"><i class="fa fa-check-square-o" /> Revisar ventas</router-link>
        </div>
      </div>
    </div>

    <hr />
    <CatalogoProductos />
  </div>
</template>

<script>
import CatalogoProductos from "../components/CatalogoProductos.vue";
import { mapState } from "vuex";

export default {
  name: 'Home',
  components: {
    CatalogoProductos,
  },
  computed: {
    ...mapState(["usuario"]), //se mapean los estados de la store
  },
}
</script>
<style>
.titulo {
  font-size: 40px;
  text-shadow: 10px 10px 20px black;
}

.logo {  
  border-radius: 30px;
  height: 60px;
  border: 1px solid;
}

.contenedor {  
  background-color: aliceblue;
  border-radius: 5px;
  padding: 30px;   
}
</style>
