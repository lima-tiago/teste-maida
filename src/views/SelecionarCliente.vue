<template>
  <v-row>
    <LeftMenu />
    <v-container fluid>
      <v-row>
        <v-col class="body" v-if="window.width > 900">
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
              <h3>Novo Pedido</h3>
              <div class="produtos">
                <h4>Produtos</h4>
                <v-row align="center">
                  <v-col cols="auto">
                    <v-img
                      :src="pedido1.prato.image"
                      :lazy-src="pedido1.prato.image"
                      max-width="40"
                      height="40"
                    />
                  </v-col>
                  <v-col>
                    <v-row class="justify-space-between">
                      <h6>{{ pedido1.qtd }}x {{ pedido1.prato.name }}</h6>
                      <span>R$ {{ formatMoney(pedido1.prato.value) }}</span>
                    </v-row>
                    <span>{{ pedido1.observacoes }}</span>
                  </v-col>
                </v-row>
                <div class="divCategorias"></div>
                <v-row class="justify-space-between">
                  <h4>Total</h4>
                  <span>R$ {{ formatMoney(pedido1.prato.value * pedido1.qtd) }}</span>
                </v-row>
              </div>
            </v-col>
          </v-row>

        </v-col>
        <v-col class="body-right">
          <v-row class="justify-end" align="center">
            <v-col class="head">
              <v-btn
                color="transparent"
                class="ma-2 white--text"
                depressed
                fab
                rounded
                to="/dashboard/novo"
              >
                <v-icon color="#ff8822">mdi-chevron-left</v-icon>
              </v-btn>
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
          <h3>Informações para o pedido</h3>
          <span>Preencha as informações abaixo para concluir esta venda. </span>
          <br>
          <br>
          <div class="produtos divCategorias">
            <span>Passo 2 de 3</span>
            <v-progress-linear value="66.6" height="12" color="#ff8822" rounded></v-progress-linear>
            <br>
            <h6>Para quem você está vendendo?</h6>
            <v-text-field
              v-model="search"
              label="Procure o cliente aqui..."
              prepend-inner-icon="mdi-magnify"
              color="#FF8822"
            ></v-text-field>
            <v-row class="item" v-for="cliente in clientes" :key="cliente.id" @click="selecionaCliente(cliente)" align="center">
              <v-col cols="auto">
                <v-img
                  v-if="!cliente.selecionado"
                  :src="cliente.image"
                  :lazy-src="cliente.image"
                  width="50"
                  height="50"
                />
                <div v-else class="subsImage d-flex alignt-center justify-center">
                  <v-img
                    src="../assets/Vector.svg"
                    lazy-src="../assets/Vector.svg"
                  />
                </div>
              </v-col>
              <h6>{{ cliente.name }}</h6>
            </v-row>
          </div>

          <v-footer color="#FF8822" class="produtos total" style="margin-left: auto;" v-if="clienteSelecionado.length > 0 && window.width > 900">
            <v-row align="center" class="justify-space-between">
              <span>{{ clienteSelecionado.length }} clientes selecionados</span>
              <v-btn depressed color="#FF8822" width="auto" dark @click="addProduto()">
                Avançar
                <v-icon color="#fff">mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </v-footer>
          <v-footer color="#FF8822" class="produtos total" v-if="clienteSelecionado.length > 0 && window.width < 900">
            <v-row align="center" class="justify-space-between">
              <span>{{ clienteSelecionado.length }} clientes selecionados</span>
              <v-btn depressed color="#FF8822" width="auto" dark @click="addProduto()">
                Avançar
                <v-icon color="#fff">mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </v-footer>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import LeftMenu from "./LeftMenu.vue"
import { mapState, mapActions } from "vuex"
import axios from 'axios'

export default {
  components: {
    LeftMenu,
  },
  data () {
    return {
      pedidos: [],
      produtos: [],
      clientes: [],
      search: '',
      clienteSelecionado: [],
      window: {
        width: 0,
      },
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  mounted () {
    axios.get('/api/pedidos')
    .then(response => {
      this.pedidos = response.data.pedidos
    })

    axios.get('/api/produtos')
    .then(response => {
      this.produtos = response.data.produtos
    })

    axios.get('/api/clientes')
    .then(response => {
      this.clientes = response.data.clientes
    })
  },
  computed: {
    ...mapState(['pedido1']),
  },
  methods: {
    ...mapActions(['sendClientes']),
    selecionaCliente(cliente) {
      cliente.selecionado = !cliente.selecionado
      if (cliente.selecionado === true) {
        this.clienteSelecionado.push(cliente)
      } else {
        this.clienteSelecionado.map((item, index) => {
          if (item.name === cliente.name) {
            this.clienteSelecionado.splice(index, 1)
          }
        })
      }
    },
    addProduto(){
      this.sendClientes(this.clienteSelecionado)
      this.$router.push({ name: 'passo3'})
    },
    formatMoney(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    handleResize() {
      this.window.width = window.innerWidth;
    }
  }
}
</script>

<style lang="sass" scoped>
  .container
    padding: 0 0 0 24px
  .body
    padding: 0px 5px
    font-family: 'Open Sans'
    height: 100vh
    .row
      margin: 0
      padding: 5px 0
      h3
        border-bottom: 2px solid #ff8822
        width: 220px
        margin-bottom: 20px
      .v-img
        border-radius: 50%
      .ma-2
        padding: 0
        margin: 0 !important
        left: -18px
      span
        color: rgba(0, 0, 0, 0.54)
    .produtos
      h4
        border: none
        width: auto
      .v-image
        border-radius: 50%
      .divCategorias
        border-bottom: 5px solid rgba(0, 0, 0, 0.08)
  .body-right
    margin: 0 !important
    padding: 0px 20px
    font-family: 'Open Sans'
    background: #fafafa
    margin-left: 30px
    float: left
    height: 100vh
    overflow-y: scroll
    margin-bottom: 25px
    .row
      margin: 0
      padding: 5px 0
      .head
        padding: 3px 12px
      .v-img
        border-radius: 50%
      .ma-2
        padding: 0
        margin: 0 !important
        left: -18px
    h3
      border-bottom: 2px solid #ff8822
      width: 320px
      margin-bottom: 20px
    span
      color: rgba(0, 0, 0, 0.54)
    .v-footer
      width: calc(100% + 40px)
      margin: 0 0 -20px -20px !important
      background-color: #fafafa
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)
      .v-btn
        padding: 16px
        height: max-content
        text-transform: none
        font-size: 14px
        .v-icon
          color: #fff !important
    .produtos
      p
        border: none
        font-size: 16px
        width: auto
        margin: 0
      &.total
        span
          color: #fff
      .v-image
        border-radius: 50%
      .divCategorias
        border-bottom: 5px solid rgba(0, 0, 0, 0.08)
      .item
        cursor: pointer
        border-bottom: 1px solid rgba(0, 0, 0, 0.08)
        .subsImage
          width: 50px
          height: 50px
          background: #FF8822
          border-radius: 50%
          padding: 15px
  .body-right::-webkit-scrollbar-track
    border-radius: 5px
    background-color: transparent
  .body-right::-webkit-scrollbar
    width: 6px
    background-color: transparent
  .body-right::-webkit-scrollbar-thumb
    border-radius: 5px
    background-color: #FF8822

  @media screen and (max-width: 800px)
    .row
      margin: 0
    .container
      overflow: hidden
      padding: 0
    .body-right
      h3
        max-width: 100%
</style>