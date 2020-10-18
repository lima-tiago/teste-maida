<template>
  <v-row>
    <LeftMenu />
    <v-container fluid>
      <v-col>
        <v-row class="justify-space-between align-center bar">
          <h3>Olá, Vanusa!</h3>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-img
                src="../assets/vanusa.png"
                lazy-src="../assets/vanusa.png"
                max-width="40"
                height="40"
                v-on="on"
              />
            </template>
            <v-list>
              <v-list-item to="/">
                Sair
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-btn tile color="white" @click="novoPedido()">
          <v-icon left>mdi-plus</v-icon> FAZER NOVO PEDIDO
        </v-btn>
        <v-text-field
          v-model="search"
          label="Procure o pedido aqui..."
          prepend-inner-icon="mdi-magnify"
          append-icon="mdi-tune"
          color="#FF8822"
        ></v-text-field>
        <div v-for="(item) in pedidosFiltrados" :key="item.id" class="pedidos">
          <v-col>
            <h6><b>{{ item.date }}, </b>Você vendeu <b>R$ {{ soma(item) }}</b></h6>
            <v-card v-for="(order, index) in item.orders" :key="index" @click="detalhePedido(order)">
              <v-row align="center">
                <v-col cols="auto">
                  <v-img 
                    :src="order.photo"
                    :lazy-src="order.photo"
                    width="40"
                    height="40"
                  />
                </v-col>
                <v-col>
                  <v-row class="justify-space-between">
                    <h6>{{ order.client }}</h6>
                    <h6>R$ {{ formatMoney(order.value) }}</h6>
                  </v-row>
                  <v-row>
                    <span v-for="(food, i) in order.food" :key="i">{{ food }}</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </div>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
// @ is an alias to /src
import LeftMenu from './LeftMenu'
import { mapActions } from 'vuex'

import axios from 'axios'

export default {
  name: 'Dashboard',

  components: {
    LeftMenu
  },

  data: () => ({
    search: '',
    pedidos: []
  }),

  mounted () {
    axios.get('api/pedidos')
    .then(response => {
      this.pedidos = response.data.pedidos
    })
  },

  computed: {
    pedidosFiltrados () {
      let result = true
      let retorno = this.pedidos.filter(nome => {
        nome.orders.map(orders => {
          result = orders.client.includes(this.search)
        })
        return result
      })
      return retorno
    },
  },

  methods: {
    ...mapActions(['sendPedido']),
    detalhePedido(order) {
      this.sendPedido(order)
      this.$router.push({name: 'Pedido'})
    },
    soma(item) {
      let returner = 0
      item.orders.map(element => {
        returner += element.value
      })
      return this.formatMoney(returner)
    },
    formatMoney(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
  }
}
</script>

<style lang="sass" scoped>
  .row
    margin: 0
    padding: 5px 0
    p
      margin: 0
      font-size: 24px
      border-bottom: 2px solid #ff8822
      width: 220px
    .v-img
      border-radius: 50%
  .v-btn
    width: 100%
    margin: 10px 0
    border-radius: 5px
    justify-content: flex-start
    color: rgba(0, 0, 0, 0.54)
    padding: 16px !important
    height: max-content !important
  .pedidos
    .col
      padding: 12px 0
    .v-card
      margin: 10px 0
      .col
        padding: 0 12px
      .v-image
        border-radius: 50%
        margin: auto
      p
        border: none
        font-size: 16px
        font-weight: 600
        width: auto
        margin: 0
      span
        color: rgba(0, 0, 0, 0.54)
        font-size: 12px
        &:not(:last-child):after
          content: ', '
</style>
