import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
  namespaced: true,
  
  state: {
    pedidoDetalhado: {},
  },

  mutations: {
    setPedidoDetalhado: (state, pedido) => {
      state.pedidoDetalhado = pedido
    },
  },

  actions: {
    sendPedido: ({ commit }, pedido) => {
      commit('setPedidoDetalhado', pedido)
    },
  }
})