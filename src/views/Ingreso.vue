<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 col-md-6 col-lg-4 text-left formulario">
      <h2 class="text-center my-4"><i class="fa fa-sign-in"/> Iniciar sesión</h2>
      <div class="alert alert-danger" v-if="error.type !== null">
        {{error.message}}
      </div>      
      <form >
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Ingresa tu email" 
            v-model.trim="email"
            :class="[error.type === 'email' ? 'is-invalid' : '']"/>
          <small id="emailHelp" class="form-text text-muted">Nunca compartiremos su correo electrónico.</small>
        </div>
        <div class="form-group">
          <label for="inputPassword">Contraseña</label>
          <input type="password" class="form-control" id="inputPassword" placeholder="Ingresa tu contraseña" 
            v-model.trim="password"
            :class="[error.type === 'password' ? 'is-invalid' : '']"/>
        </div>        
        <button type="button" class="btn btn-success btn-sm btn-block" :disabled="bloquearBoton" @click="procesarIngreso">Ingresar</button>
      </form>
      <hr> 
      <router-link to="/registro" class="dropdown-item"><i class="fa fa-plus-circle" /> Registrar una nueva cuenta</router-link>     
      <a href="/registro" class="link">¿No tienes cuenta? Puedes registrarte aca</a>
    </div>    
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name:"Ingreso",
  data() {
    return {
      //variables para v-model
      email: "",
      password: "",      
    };
  },
  computed: {
    bloquearBoton(){
      //se validan condiciones de los datos ingresados en el formulario para desbloquear el boton
      if (!this.email.includes("@")) {
        return true;
      }
      if (this.password.length > 5 ) {
        return false;
      }
      return true;
    },
    ...mapState(["error"]),
  },
  methods:{
    //se mapean los metodos o funciones de Actions en la Store
    ...mapActions(["ingresoAction"]),
    async procesarIngreso() {
      //se invoca la funcion de Action
      await this.ingresoAction({ email: this.email, password: this.password });
      //se valida si hay error
      if(this.error.type !== null){
        return;
      }
      this.email = "";
      this.password1 = "";      
    },
  }
};
</script>

<style scoped>
.formulario {
  margin-left:25px; 
  margin-right:25px; 
  padding: 20px;
  border-radius: 5px;
  box-shadow: 5px 5px 15px black;
}
.link{
  margin-top: 5px;
  text-decoration: none;
  text-align: center;
  color: #2c3e50;
  font-weight: bold;  
}
.link:hover {
  color: orangered;
}
</style>
