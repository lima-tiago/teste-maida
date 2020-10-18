<template>
  <v-row>

    <LeftMenu />
    <v-container fluid>
      <v-col>
        <v-row class="justify-space-between align-center bar">
          <v-col>
            <v-btn
              color="transparent"
              class="ma-2 white--text"
              depressed
              fab
              rounded
              to="/dashboard"
            >
              <v-icon color="#ff8822">mdi-chevron-left</v-icon>
            </v-btn>
            <h3>Pedidos de {{ pedidoDetalhado.client }}</h3>
          </v-col>
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
        <v-col>
          <h6>{{ date }}</h6>
          <v-card>
            <v-row align="center">
              <v-col cols="auto">
                <v-img
                  :src="pedidoDetalhado.prato"
                  :lazy-src="pedidoDetalhado.prato"
                  width="40"
                  height="40"
                />
              </v-col>
              <v-col class="justify-flex-start">
                <v-row>
                  <h6 v-for="food in pedidoDetalhado.food" :key="food"> {{ food }}</h6>
                </v-row>
                <span>R$ {{ formatMoney(pedidoDetalhado.value) }}</span>
              </v-col>

            </v-row>
          </v-card>
        </v-col>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
import LeftMenu from "./LeftMenu"
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  components: {
    LeftMenu,
  },
  data: () => ({
    pedidos: []
  }),

  mounted () {
    axios.get('/api/pedidos')
    .then(response => {
      this.pedidos = response.data.pedidos
    })
  },

  computed: {
    ...mapState(['pedidoDetalhado']),
    date() {
      let date = ''
      if (this.pedidos != undefined && this.pedidoDetalhado != undefined) {
        this.pedidos.map(pedido => {
          pedido.orders.map(order => {
            if (order.client === this.pedidoDetalhado.client) {
              date = pedido.date
            }
          })
        })
      }
      return date
    },
  },
  methods: {
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
    .ma-2
      padding: 0
      margin: 0 !important
      left: -18px
  .v-card
    margin: 10px 0
    .col
      padding: 0 12px
    .v-image
      border-radius: 50%
      margin: auto
    p
      font-size: 16px
      border: none
      width: auto
      font-weight: 600
      &:not(:last-child):after
        content: ' +'
    span
      color: rgba(0, 0, 0, 0.64)
      font-size: 12px
</style>
