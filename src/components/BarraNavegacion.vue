<template>
  <!--Barra de navegacion responsiva-->
  <nav class="navbar navbar-expand-lg navbar-light bg-info mb-5">
    
    <a class="navbar-brand" href="https://getbootstrap.com/" target="_blank"><img class="logo" src="https://getbootstrap.com/docs/4.6/assets/brand/bootstrap-solid.svg" alt="Bootstrap logo"></a>   
   
    <!--boton que se activa en pantallas pequeñas-->   
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="btn btn-info btn-block"><i class="fa fa-home" /> Inicio</router-link>          
        </li>
        <li class="nav-item">
          <router-link to="/about" class="btn btn-info btn-block">Nosotros</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/carroDeCompras" class="btn btn-info btn-block">Carrito</router-link>
        </li>
        <li class="nav-item">
          <VentanaModal />
        </li>       
        <li class="nav-item dropdown">
          <!--menu de opciones-->  
          <a class="btn btn-dark btn-block dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Menú
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item text-center"><i class="fa fa-user-circle fa-5x"/></a>
            
            <router-link to="/ingreso" class="dropdown-item"><i class="fa fa-sign-in" /> Iniciar sesión</router-link>
            <router-link to="/registro" class="dropdown-item"><i class="fa fa-plus-circle" /> Registrar una nueva cuenta</router-link>
            <button type="button" class="dropdown-item" @click="cerrarSesionAction"><i class="fa fa-sign-out"/> Salir</button>
          </div>
        </li> 
      </ul>
    </div>
    <!--se muestran los resultados de la consulta a la API de openweather -->
    <div>
        <span v-if="ciudad === null" >
                    
        </span>
        <span v-else class="textoClima ">
            <i class="fa fa-thermometer-empty" /> {{ ciudad }} : {{ Number(temperatura.toFixed(0)).toLocaleString("es")}}°C , {{descripcion}} <img class="iconoClima" :src="icono" alt="Icono clima">           
        </span>        
    </div>
    <!--fin resultados de la consulta a la API de openweather -->
  </nav>
</template>

<script>
//se importa axios para el manejo de api, cliente HTTP basado en promesas para el navegador y node.js
import axios from "axios";
import { mapActions } from "vuex";
import VentanaModal from "../views/VentanaModal.vue"

export default {
  name: "BarraNavegacion",
  components: {
    VentanaModal,
  },
  data() {
    return {
      ciudad: null,
      temperatura: null,
      descripcion: null, 
      icono: null     
    };
  },
  methods: {
      ...mapActions(["cerrarSesionAction"]),
      obtenerTemperatura() {
      //temperatura actual segun openweather: https://openweathermap.org/current      
      let url = "http://api.openweathermap.org/data/2.5/weather?id=3871336&units=metric&lang=es&appid=471380432bf18c74fd2fb16bc6adf5fe";
      
      axios
        .get(url)
        .then((response) => {
          return response.data;
        })
        .then((obj) => {          
          this.ciudad = obj.name;
          this.temperatura = obj.main.temp; 
          this.descripcion = obj.weather[0].description;
          this.icono = "http://openweathermap.org/img/w/"+obj.weather[0].icon+".png";          
        })
        .catch((error) => {
          console.log("Error en obtenerTemperatura: " + error);
        });
    },
  },
  created(){
      this.obtenerTemperatura();
  }
};
</script>
<style scoped>
.logo {
  background-color: bisque;
  border-radius: 5px;
  height: 30px;
}

.textoClima {
  font-weight: bold;  
  color: #2c3e50;    
}

.iconoClima {
  height: 45px; 
}
</style>
