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
            </v-col>
          </v-row>
        </v-col>
        <v-col class="body-right">
          <v-row class="justify-end">
            <v-col v-if="window.width < 900">
              <v-btn
                color="transparent"
                class="ma-2 white--text"
                depressed
                fab
                rounded
                to="/pedidos"
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
          <span>Preencha as informações abaixo para concluir esta venda.</span>
          <br>
          <br>
          <span>Passo 1 de 3</span>
          <v-progress-linear value="33.3" height="12" color="#ff8822" rounded></v-progress-linear>
          <br>
          <div class="produtos">
            <h6>O que você está vendendo?</h6>
            <v-text-field
              v-model="search"
              label="Procure o produto aqui..."
              prepend-inner-icon="mdi-magnify"
              color="#FF8822"
            ></v-text-field>
            <div class="divCategorias" v-for="produto in produtos" :key="produto.id">
              <h6>{{ produto.categoria }}</h6>
              <v-row class="item" v-for="prato in produto.pratos" :key="prato.id" @click="selectProduto(prato)" align="center">
                <v-col cols="auto">
                  <v-img
                    v-if="pedido1.prato.name != prato.name"
                    :src="prato.image"
                    :lazy-src="prato.image"
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
                <v-col>
                  <v-row class="justify-space-between" align="center">
                    <h6>{{ prato.name }}</h6>
                    <span>R$ {{ formatMoney(prato.value) }}</span>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </div>
          <v-footer color="#FF8822" class="produtos total" style="margin-left: auto;" v-if="pedido1.qtd != 0 && window.width > 900">
            <v-row align="center" class="justify-space-between">
              <span>Total: R$ {{ formatMoney(pedido1.qtd * pedido1.prato.value) }}</span>
              <v-btn depressed color="#FF8822" width="auto" dark @click="addProduto()">
                Avançar
                <v-icon color="#fff">mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </v-footer>
          <v-footer color="#FF8822" class="produtos total" v-if="pedido1.qtd != 0 && window.width < 900">
            <v-row align="center" class="justify-space-between">
              <span>Total: R$ {{ formatMoney(pedido1.qtd * pedido1.prato.value) }}</span>
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
import LeftMenu from "./LeftMenu"
import { mapState, mapActions } from "vuex"
import axios from 'axios'

export default {
  components: {
    LeftMenu,
  },
  data: () => ({
    pedidos: [],
    produtos: [],
    search: '',
    window: {
      width: 0,
    },
  }),
  mounted() {
    axios.get('/api/pedidos')
    .then(response => {
      this.pedidos = response.data.pedidos
    })

    axios.get('/api/produtos')
    .then(response => {
      this.produtos = response.data.produtos
    })
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  computed: {
    ...mapState(['pedido1']),
  },
  methods: {
    ...mapActions(['sendPrato']),
    addProduto(){
      this.$router.push({ name: 'selecionarCliente'})
    },
    selectProduto(prato){
      this.sendPrato(prato)
      this.$router.push({ name: 'newOrder-2'})
    },
    perfil() {
      alert('Ainda não tem tela de Perfil!')
    },
    alterarSenha() {
      alert('Ainda não tem tela de Alterar Senha!')
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
    padding: 0 0 0 12px
  .row
    padding: 0
    margin: 0
  .body
    padding: 0px 5px
    font-family: 'Open Sans'
    height: 100vh
    background-position: center
    background-image: url('../assets/Illustration.svg')
    .row
      margin: 0
      padding: 5px 0
      h3
        border-bottom: 2px solid #ff8822
        width: 220px
      .v-img
        border-radius: 50%
      .ma-2
        padding: 0
        margin: 0 !important
        left: -18px
  .body-right
    margin: 0 !important
    padding: 20px 20px
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
    .container
      padding: 0
    .body-right
      h3
        max-width: 100%
</style>
