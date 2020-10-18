import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
  namespaced: true,
  
  state: {
    pedidoDetalhado: {},
    pedido1: {
      prato: {
        name: ''
      },
      massa: '',
      qtd: 0,
      oberservacoes: ''
    },
    pratoSelecionado: {},
    clienteSelecionado: [],
  },

  mutations: {
    setPedidoDetalhado: (state, pedido) => {
      state.pedidoDetalhado = pedido
    },
    setPedido: (state, pedido) => {
      state.pedido1 = pedido
    },
    setPrato: (state, prato) => {
      state.pratoSelecionado = prato
    },
    setClientes: (state, clientes) => {
      state.clienteSelecionado = clientes
    },
  },

  actions: {
    sendPedido: ({ commit }, pedido) => {
      commit('setPedidoDetalhado', pedido)
    },
    sendProduto: ({ commit }, pedido) => {
      commit('setPedido', pedido)
    },
    sendPrato: ({ commit }, prato) => {
      commit('setPrato', prato)
    },
    sendClientes: ({ commit }, clientes) => {
      commit('setClientes', clientes)
    },
  }
})