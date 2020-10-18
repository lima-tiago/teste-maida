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
              <br>
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
                <br>
                <h4>Clientes</h4>
                <v-row class="item" align="center" v-for="cliente in clienteSelecionado" :key="cliente.id">
                  <v-col cols="auto">
                    <v-img
                      :src="cliente.image"
                      :lazy-src="cliente.image"
                      max-width="40"
                      height="40"
                    />
                  </v-col>
                  <v-col>
                    <h6>{{ cliente.name }}</h6>
                  </v-col>
                </v-row>
                <div class="divCategorias"></div>
                <v-row class="justify-space-between">
                  <h4>Total</h4>
                  <span>R$ {{ formatMoney(pedido1.prato.value * pedido1.qtd * clienteSelecionado.length) }}</span>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="body-right">
          <v-row class="justify-end">
            <v-col class="head">
              <v-btn
                color="transparent"
                class="ma-2 white--text"
                depressed
                fab
                rounded
                to="/dashboard/novo-cliente"
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
          <span>Passo 3 de 3</span>
          <v-progress-linear value="100" height="12" color="#ff8822" rounded></v-progress-linear>
          <br>
          <div class="produtos">
            <h6>Qual o status do pagamento?</h6>
            <v-radio-group v-model="pago">
              <v-card>
                <v-radio label="Não está pago" value="Não está pago" color="#FF8822"></v-radio>
              </v-card>
              <v-card>
                <v-radio label="Já está pago" value="Já está pago" color="#FF8822"></v-radio>
              </v-card>
            </v-radio-group>
            <h6>Em qual data foi realizado?</h6>
            <br>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="formatedDate"
                  label="Data do pedido"
                  append-icon="mdi-calendar"
                  outlined
                  color="#FF8822"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker locale="br" color="#FF8822" v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="grey" @click="menu = false">CANCELAR</v-btn>
                <v-btn text color="#FF8822" @click="$refs.menu.save(date)">ESCOLHER</v-btn>
              </v-date-picker>
            </v-menu>
          </div>
          <v-btn
            color="#FF8822"
            class="ma-2 white--text salvar"
            rounded
            large
            @click="concluiPagamento()"
            :disabled=" pago === '' "
          >
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import LeftMenu from "./LeftMenu.vue"
import { mapState } from "vuex"
import axios from 'axios'

export default {
  components: {
    LeftMenu,
  },
  data: vm => ( {
    pedidos: [],
    produtos: [],
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    search: '',
    pago: '',
    window: {
      width: 0,
    },
  }),
  mounted () {
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
    ...mapState(['pedido1', 'clienteSelecionado']),
    formatedDate () {
      return this.formatDate(this.date)
    }
  },
  methods: {
    concluiPagamento(){
      let order = []
      this.clienteSelecionado.map(cliente => {
        order.push({
          client: cliente.name,
          food: [this.pedido1.prato.name],
          value: this.pedido1.prato.value * this.pedido1.qtd,
          prato: this.pedido1.prato.image,
          photo: cliente.image,
        })
      })
      const data ={
        date: this.formatedDate,
        orders: order
      }
      axios.post('/api/pedidos', { data })
      .then(() => {
        this.$router.push({ name: 'final'})
      })
    },
    formatMoney(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    handleResize() {
      this.window.width = window.innerWidth;
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
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
      span
        color: rgba(0, 0, 0, 0.54)
    .produtos
      p
        border: none
        margin: 0
        font-size: 20px
        width: auto
      .v-image
        border-radius: 50%
      .divCategorias
        border-bottom: 5px solid rgba(0, 0, 0, 0.08)
      .item
        border-bottom: 1px solid rgba(0, 0, 0, 0.08)
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
      margin: 0
      font-size: 24px
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
      .v-input__slot
        .v-card
          padding-top: 16px
          padding-left: 20px
          padding-bottom: 16px
          padding-right: 20px
          margin: 10px 0
          width: 100%
    .salvar
      display: flex
      margin-left: auto !important
      width: 208px
      text-align: center
      font-size: 14px
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