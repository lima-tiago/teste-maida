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
          <v-row class="justify-end" align="center">
            <v-col>
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
          <h3>Detalhes do pedido</h3>
          <span>Aproveite para adicionar alguma observação para este pedido, caso queira.</span>
          <v-row align="center" class="produtos">
            <v-col cols="auto">
              <v-img
                :src="pratoSelecionado.image"
                :lazy-src="pratoSelecionado.image"
                width="50"
                height="50"
              />
            </v-col>
            <v-col>
              <h6> {{ pratoSelecionado.name }} </h6>
              <span>R$ {{ formatMoney(pratoSelecionado.value) }} </span>
            </v-col>
          </v-row>
          <div class="produtos divCategorias">
            <h6>Opções</h6>
            <span>Escolha dentre as opções de massas abaixo.</span>
            <v-radio-group v-model="radios">
              <v-card>
                <v-radio label="Milho" value="Milho" color="#FF8822"></v-radio>
              </v-card>
              <v-card>
                <v-radio label="Arroz" value="Arroz" color="#FF8822"></v-radio>
              </v-card>
            </v-radio-group>
          </div>
          <div class="produtos">
            <p>Observações</p>
            <v-textarea
              outlined
              solo
              v-model="observacoes"
              name="input-7-4"
              label="Observações"
              color="#FF8822"
            ></v-textarea>
          </div>
          <v-footer class="produtos" style="margin-left: auto;" v-if="radios != '' && window.width > 900">
            <v-row align="center" class="justify-space-between">
              <v-row align="center">
                <v-btn class="counter" depressed :disabled="count <= 1" rounded @click="count -= 1" fab>
                  -
                </v-btn>
                <span>{{ count }}</span>
                <v-btn class="counter" depressed rounded fab @click="count += 1">
                  +
                </v-btn>
              </v-row>
              <v-btn depressed color="#FF8822" width="auto" dark @click="addProduto()">
                Adcionar R$ {{ formatMoney(pratoSelecionado.value * count)}}
              </v-btn>
            </v-row>
          </v-footer>
          <v-footer class="produtos" v-if="radios != '' && window.width < 900">
            <v-row align="center" class="justify-space-between">
              <v-row align="center">
                <v-btn class="counter" depressed :disabled="count <= 1" rounded @click="count -= 1" fab>
                  -
                </v-btn>
                <span>{{ count }}</span>
                <v-btn class="counter" depressed rounded fab @click="count += 1">
                  +
                </v-btn>
              </v-row>
              <v-btn depressed color="#FF8822" width="auto" dark @click="addProduto()">
                Adcionar R$ {{ formatMoney(pratoSelecionado.value * count)}}
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
      window: {
        width: 0,
      },
      radios: '',
      observacoes: '',
      count: 1,
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
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
  computed: {
    ...mapState(['pratoSelecionado']),
  },
  methods: {
    ...mapActions(['sendPrato', 'sendProduto']),
    addProduto() {
      this.sendProduto({
        prato: this.pratoSelecionado,
        massa: this.radios,
        qtd: this.count,
        observacoes: this.observacoes,
      })
      this.$router.push({ name: 'newOrder'})
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
    background-position: center
    background-image: url('../assets/Illustration.svg')
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
    position: relative
    .row
      margin: 0
      padding: 5px 0
      .v-image
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
    .produtos
      p
        border: none
        font-size: 16px
        width: auto
        margin: 0
      .v-image
        border-radius: 50%
      &.divCategorias
        border-bottom: 5px solid rgba(0, 0, 0, 0.08)
      .item
        cursor: pointer
        border-bottom: 1px solid rgba(0, 0, 0, 0.08)
      .v-input__slot
        .v-card
          padding-top: 16px
          padding-left: 20px
          padding-bottom: 16px
          padding-right: 300px
          margin: 10px 0
          width: 100%
      span
        margin: 0
        text-align: center
      .counter
        color: #FF8822
        font-size: 36px
    .v-picker__title__btn:not(.v-picker__title__btn--active)
      opacity: 1
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