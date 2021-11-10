<template>
  <header>
    <BarraNavegacion />
  </header>
  <div class="container">
    <router-view />
  </div>
  <footer>
    <PieDePagina />
  </footer>
</template>

<script>
import BarraNavegacion from "./components/BarraNavegacion.vue";
import PieDePagina from "./components/PieDePagina.vue";

export default {
  name: "App",
  components: {
    BarraNavegacion,
    PieDePagina
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.alerta {
  text-align: center;
  font-weight: bolder;
  font-size: 15px;
}
</style>
