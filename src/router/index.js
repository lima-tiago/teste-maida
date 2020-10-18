import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Pedido from '../views/Pedido.vue'
import novoPedido from '../views/NovoPedido.vue'
import novoPedido2 from '../views/NovoPedido-2.vue'
import selecionarCliente from '../views/SelecionarCliente.vue'
import Pagamento from '../views/Pagamento.vue'
import Final from '../views/Final.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/dashboard/pedido',
    name: 'Pedido',
    component: Pedido
  },
  {
    path: '/dashboard/novo',
    name: 'newOrder',
    component: novoPedido
  },
  {
    path: '/dashboard/novo-2',
    name: 'newOrder-2',
    component: novoPedido2
  },
  {
    path: '/dashboard/novo-cliente',
    name: 'selecionarCliente',
    component: selecionarCliente
  },
  {
    path: '/dashboard/novo-pagamento',
    name: 'passo3',
    component: Pagamento
  },
  {
    path: '/dashboard/pedido-concluido',
    name: 'final',
    component: Final
  },
  {
    path: '*',
    redirect: { name: 'login' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
