<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 col-md-6 col-lg-4 text-left formulario">
      <h2 class="text-center my-4"><i class="fa fa-plus-circle" /> Registrar cuenta</h2>            
      <form >
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Ingresa un email" 
            v-model.trim="email"/>
          <small id="emailHelp" class="form-text text-muted">Nunca compartiremos su correo electrónico.</small>
        </div>
        <div class="form-group">
          <label for="inputPassword1">Contraseña</label>
          <input type="password" class="form-control" id="inputPassword1" placeholder="Ingresa una contraseña" 
            v-model.trim="password1"/>
        </div> 
        <div class="form-group">
          <label for="inputPassword2">Contraseña</label>
          <input type="password" class="form-control" id="inputPassword2" placeholder="Repite la contraseña" 
            v-model.trim="password2" />
        </div>        
        <button type="button" class="btn btn-success btn-sm btn-block" :disabled="bloquearBoton" @click="procesarRegistro">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Registro",
    data(){
        return{
            //variables para v-model
            email: "",
            password1: "",
            password2:"",
        }
    },
    computed:{
        bloquearBoton(){
            //se validan condiciones de los datos ingresados en el formulario para desbloquear el boton
            if(!this.email.includes("@")){
                return true;
            }
            if(this.password1.length > 5 && this.password1 === this.password2){
                return false;
            }            
            return true;          
        }
    },
    methods: {
        //se mapean los metodos o funciones de Actions en la Store
        ...mapActions(["registrarCuentaAction"]),
        procesarRegistro() {
            //se invoca la funcion de Action
            this.registrarCuentaAction({email: this.email, password: this.password1})
            //luego de que se procesa el formulario, este se limpia
            this.email = "";
            this.password1 = "";
            this.password2 = "";
        }
    }
}
</script>

<style scoped>
.formulario {
  margin-left:25px; 
  margin-right:25px; 
  padding: 20px;
  border-radius: 5px;
  box-shadow: 5px 5px 15px black;
}
</style>