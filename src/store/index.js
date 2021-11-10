import { createStore } from "vuex";
import router from "../router";

export default createStore({
  state: {
    usuario: null,
    error: {type: null, message: null},
    listaProductos: [],
    producto: {      
      id: "",
      nombreProducto: "",
      marcaProducto: "",
      descripcionProducto: "",
      precioProducto: "",        
      urlImagen: "",
      altImagen: ""
    },
    carroDeCompras: [],
    productoEnElCarro: {},
    resumenCompra: {
      cantidadArticulos: null,        
      totalCompra: null
    }, 
    venta: {},
    listaVentas: []
  },
  mutations: {
    cargarVentasDBMutation(state, payload) {
      //al cargar la app, se igualan los datos que estan guardados en la BD, con el state      
      state.listaVentas = payload;
    },
    cargarBaseDeDatosMutation(state, payload) {
      //al cargar la app, se igualan los datos que estan guardados en la BD, con el state
      state.listaProductos = payload;      
    },
    registrarCuentaMutation(state, payload) {
      state.usuario = payload;
      alert("Se ha registrado la cuenta exitosamente");                     
    },
    ingresoMutation(state, payload) {
      state.usuario = payload;      
      if(state.usuario != null){
        alert("Bienvenido/a "+state.usuario.email);        
      }
    },
    mutationSetError(state, payload) {
      //si se recoge un error, se setea un mensaje customizado
      if(payload === null){
        return state.error = {type: null, message: null};
      }     
      if(payload === "EMAIL_NOT_FOUND"){
        return state.error = {type: "email", message: "El email no está registrado"};
      }
      if(payload === "INVALID_PASSWORD"){
        return state.error = {type: "password", message: "Contraseña incorrecta"};
      }
      if(payload === "EMAIL_EXISTS"){
        return state.error = {type: "email", message: "El email ya está registrado"};
      }
      if(payload === "INVALID_EMAIL"){
        return state.error = {type: "email", message: "El formato del email no es correcto"};
      }
    },
    agregarProductoMutation(state, payload) {
      //se agrega el producto a la lista de productos 
      state.listaProductos.push(payload);
      alert("Se ha agregado el producto -"+payload.nombreProducto+"- exitosamente");              
    },
    eliminarProductoMutation(state, payload) {
      //se utiliza filter de javaScript para crear un nuevo arreglo de productos
      //se filtran los elementos que sean distintos al id que viene por parametro
      state.listaProductos =  state.listaProductos.filter(elemento => elemento.id !== payload);
      alert("Se ha eliminado el producto serie -"+payload+"- exitosamente");     
    },
    seleccionarProductoMutation(state, payload) {
      //se busca en el arreglo listaProductos, el objeto que viene en el payload segun el id
      if(! state.listaProductos.find(elemento => elemento.id === payload)){
        //si se ingresa por url con un id que no existe, se redirige a la administracionProductos
        router.push("/administracionProductos");
        return;
      }
      state.producto =  state.listaProductos.find(elemento => elemento.id === payload);
      //se muestra flujo en consola   
      console.log("--Store--\nSe recibe el producto seleccionado en Mutations: " + state.producto.id);
    },
    actualizarProductoMutation(state, payload) {
      //se devuelve un arreglo con el producto actualizado
      //cuando el id del payload se encuentre en el arreglo, se devuelve el payload que viene actualizado 
      state.listaProductos = state.listaProductos.map(elemento => elemento.id === payload.id ?  payload : elemento);
      alert("Se ha actualizado el producto exitosamente");
      router.push("/administracionProductos");      
    },
    agregarAlCarroMutation(state, payload) {
      //se iguala el objeto productoEnElCarro al Producto que viene en el payload, se agrega al arreglo carroDeCompras      
      state.productoEnElCarro = payload;      
      //se setean la cantidad inicial en 1 y se calcula el subtotal para poder mostrar en la vista del carrito 
      state.productoEnElCarro.cantidad = 1;
      state.productoEnElCarro.subtotal = state.productoEnElCarro.cantidad * state.productoEnElCarro.precioProducto;
      //se controla la adicion del producto al carro, solo se agrega si el producto no esta en el arreglo carroDeCompra
      if(state.carroDeCompras.find(elemento => elemento.id === state.productoEnElCarro.id)){        
        alert("El producto ya fue agregado al carro");
        return;
      }else {
        alert("Se añadió "+state.productoEnElCarro.marcaProducto+" al carro "); 
        state.carroDeCompras.push(state.productoEnElCarro);
        state.resumenCompra.cantidadArticulos = state.resumenCompra.cantidadArticulos + state.productoEnElCarro.cantidad;
        state.resumenCompra.totalCompra = state.resumenCompra.totalCompra + state.productoEnElCarro.precioProducto;
      }      
    },
    eliminarDelCarroMutation(state, payload) {
      //se utiliza filter de javaScript para crear un nuevo arreglo de carroDeCompras
      //se filtran los elementos que sean distintos al id que viene por parametro
      state.carroDeCompras =  state.carroDeCompras.filter(elemento => elemento.id !== payload.id);
      alert("Se ha eliminado el producto exitosamente");     
    },
    registrarVentaMutation(state, payload) {
      state.venta = payload;
      state.listaVentas.push(state.venta);    
      alert("Has efectuado una compra por : $"+state.venta.totalCompra);
    }
  },
  actions: {
    async cargarVentasDBAction({commit, state}) {
      try {
        //en try, se intenta efectuar una solicitud http con fetch
        //se necesita leer la informacion en la BD        
        const solicitudPorTablaVentas =  await fetch(`https://tiendaapi-a0587-default-rtdb.firebaseio.com/ventas.json?auth=${state.usuario.idToken}`);
        //si hay informacion en la BD, la respuesta se almacena en respuestaDB        
        const respuestaDBPorTablaVentas = await solicitudPorTablaVentas.json();
        const arregloVentas = [];
        //se recorre la informacion contenida, se extrae y se agrega a un arreglo
       for (let index2  in respuestaDBPorTablaVentas ) {          
          arregloVentas.push(respuestaDBPorTablaVentas[index2]);
          console.log(respuestaDBPorTablaVentas[index2]);
        }
        //se efectua el commit pasando el arreglo con la informacion de la BD
        commit("cargarVentasDBMutation", arregloVentas);              
      } catch (error) {
        console.log("Error en cargarVentasDBAction: "+error);
      }
    },
    async cargarBaseDeDatosAction({commit}) {
      try {
        //en try, se intenta efectuar una solicitud http con fetch
        //se necesita leer la informacion en la BD
        //const solicitud = await fetch(`https://tiendaapi-a0587-default-rtdb.firebaseio.com/productos.json?auth=${state.usuario.idToken}`);
        const solicitud = await fetch(`https://tiendaapi-a0587-default-rtdb.firebaseio.com/productos.json`);
        //si hay informacion en la BD, la respuesta se almacena en respuestaDB
        const respuestaDB = await solicitud.json();//respuesta de la BD       
        const arregloProductos = [];
        //se recorre la informacion contenida, se extrae y se agrega a un arreglo
        for (let index  in respuestaDB ) {          
          arregloProductos.push(respuestaDB[index]);          
        }        
        //se efectua el commit pasando el arreglo con la informacion de la BD
        commit("cargarBaseDeDatosMutation", arregloProductos);
      } catch (error) {
        console.log("Error en cargarBaseDeDatosAction: "+error);
      }
    },
    async registrarCuentaAction({commit}, objUsuario) {      
      try {
        //API REST de autenticacion de Firebase -> Sign Up with email/password
        //fuente: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
        const apiKey = "AIzaSyCHIHufvui5-ZTBmDENPD3_VFrHa8-V-_w";
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+apiKey;
        const respuesta = await fetch(url, {
          method: "POST",
          //se transforma un objeto en JSON
          body: JSON.stringify({
            email: objUsuario.email,
            password: objUsuario.password,
            returnSecureToken: true //una vez que se crea la cuenta, se recibe el token de seguridad desde firebase
          })          
        });
        const userDB =  await respuesta.json();
        //si no hay errores, se efectua el commit y se redirige a inicio
        if(userDB.error){
          console.log(userDB.error);
          return;
        }
        commit("registrarCuentaMutation", userDB);
        router.push("/");                     
      } catch (error) {
        console.log("Error en registrarCuentaMutation: "+error);
      }      
    },
    async ingresoAction({commit}, objUsuario) {
      try {
        //API REST de autenticacion de Firebase -> Sign In with email/password
        //fuente https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
        const apiKey = "AIzaSyCHIHufvui5-ZTBmDENPD3_VFrHa8-V-_w";
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+apiKey; 
        const respuesta = await fetch(url, {
          method: "POST",
          //se transforma un objeto en JSON
          body: JSON.stringify({
            email: objUsuario.email,
            password: objUsuario.password,
            returnSecureToken: true//se recibe el token de seguridad
          })
        });
        const userDB = await respuesta.json();
        //si no hay errores, se efectua el commit y se redirige a inicio 
        if(userDB.error){  
          //retorna el error a mutations         
          return commit("mutationSetError", userDB.error.message);
        }
        commit("ingresoMutation", userDB);
        //se limpia el error cuando se ingresen credenciales validas
        commit("mutationSetError", null);       
        router.push("/");        
      } catch (error) {
        console.log("Error en ingresoAction: "+error);
      }      
    },
    cerrarSesionAction({commit}) {
      commit("ingresoMutation", null);      
      router.push("/");
    },
    async agregarProductoAction({commit, state}, objProducto) {
      try {
        //en try, se intenta efectuar una solicitud http con fetch
        //se necesita crear en la BD, un documento productos con formato JSON
        //para agregar un producto en la BD se debe estar autenticado
        const solicitud = await fetch(`https://tiendaapi-a0587-default-rtdb.firebaseio.com/productos/${objProducto.id}.json?auth=${state.usuario.idToken}`, {
          method: "PUT",//se agrega un nuevo elemento usando el metodo PUT
          headers: {"Content-Type" : "application/json"},//en la cabecera se indica de manera opcional, que los datos que viajan son en formato JSON
          body: JSON.stringify(objProducto) //se transforma el objeto producto a formato JSON
        })
        //si el producto se guardo en la BD, la respuesta se almacena en respuestaDB
        const respuestaDB = await solicitud.json();//respuesta de la BD 
        commit("agregarProductoMutation", respuestaDB);
      } catch (error) {
        console.log("Error en agregarProductoAction: "+error);
      }     
    },
    async eliminarProductoAction({commit, state}, id) {
      try {        
        //en try, se intenta efectuar una solicitud http con fetch
        //se necesita leer la informacion en la BD, un documento en especifico
        await fetch(`https://tiendaapi-a0587-default-rtdb.firebaseio.com/productos/${id}.json?auth=${state.usuario.idToken}`, {
          method : "DELETE",//metodo para borrar informacion de la API          
        });              
        commit("eliminarProductoMutation", id);
      } catch (error) {
        console.log("Error en eliminarProductoAction: "+error);
      }     
    },
    seleccionarProductoAction({commit}, id) {
      commit("seleccionarProductoMutation", id);      
    },
    async actualizarProductoAction({commit, state}, objProducto) { 
      console.log(objProducto.id);     
      try {        
        //en try, se intenta efectuar una solicitud http con fetch
        //se necesita leer la informacion en la BD, un documento en especifico
        const solicitud = await fetch(`https://tiendaapi-a0587-default-rtdb.firebaseio.com/productos/${objProducto.id}.json?auth=${state.usuario.idToken}`, {
          method: "PATCH",//metodo para actualizar informacion de la API
          body: JSON.stringify(objProducto)//se tranforma el objeto producto a formato JSON
        });
        //si hay informacion en la BD, la respuesta se almacena en respuestaDB
        const respuestaDB = await solicitud.json();//respuesta de la BD       
        commit("actualizarProductoMutation", respuestaDB);

        console.log(respuestaDB.id);

      } catch (error) {
        console.log("Error en actualizarProductoAction: "+error);
      }     
    },
    agregarAlCarroAction({commit}, objProducto) {      
      commit("agregarAlCarroMutation", objProducto);      
    },
    eliminarDelCarroAction({commit}, objProducto) {      
      commit("eliminarDelCarroMutation", objProducto);      
    },
    async registrarVentaAction({commit, state}, objVenta) {
      try {
        //en try, se intenta efectuar una solicitud http con fetch
        //se necesita crear en la BD, un documento productos con formato JSON
        const solicitud = await fetch(`https://tiendaapi-a0587-default-rtdb.firebaseio.com/ventas/${objVenta.id}.json?auth=${state.usuario.idToken}`, {
          method: "PUT",//se agrega un nuevo elemento usando el metodo PUT
          headers: {"Content-Type" : "application/json"},//en la cabecera se indica de manera opcional, que los datos que viajan son en formato JSON
          body: JSON.stringify(objVenta) //se tranforma el objeto producto a formato JSON
        })
        //si el producto se guardo en la BD, la respuesta se almacena en respuestaDB
        const respuestaDB = await solicitud.json();//respuesta de la BD
        commit("registrarVentaMutation", respuestaDB); 
      } catch (error) {
        console.log("Error en agregarProductoAction: "+error);
      } 
    }
  },
  modules: {
  },
  getters: {
    usuarioLogueado(state) {
      return !!state.usuario;
    }
  }
})
