import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/administracionProductos',
    name: 'AdministracionProductos',
    component: () => import(/* webpackChunkName: "about" */ '../components/AdministracionProductos.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/editarProducto/:id',//se envia un parametro a traves de la ruta
    name: 'EditarProducto',
    component: () => import(/* webpackChunkName: "about" */ '../components/EditarProducto.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/carroDeCompras',
    name: 'CarroDeCompras',
    component: () => import(/* webpackChunkName: "about" */ '../views/CarroDeCompras.vue')
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ventas.vue'),
    meta: {rutaProtegida: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next)=>{ 
  if(to.meta.rutaProtegida){   
    if(store.getters.usuarioLogueado) {
      next()
    }else{
      next("/ingreso")
    }
  }else{
    next()
  }
});

export default router;
