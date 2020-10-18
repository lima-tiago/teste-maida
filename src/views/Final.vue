<template>
  <v-row>
    <LeftMenu/>
    <v-container fluid>
      <v-col class="full justtify-center">
        <v-row class="justify-end" align="center">
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
        <v-img
          src="../assets/Illustration-final.svg"
          lazy-src="../assets/Illustration-final.svg"
          max-width="300"
        />
        <v-row justify="center" align="center">
          <v-btn
            style="background: #fff"
            color="#000"
            class="ma-2"
            depressed
            outlined
            rounded
            to="/dashboard"
          >
            VOLTAR PARA LISTA DE PEDIDOS
          </v-btn>
          <v-btn
            color="#FF8822"
            class="ma-2 white--text"
            depressed
            rounded
            to="/dashboard/novo"
          >
            FAZER NOVO PEDIDO
          </v-btn>
        </v-row>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
import LeftMenu from "./LeftMenu.vue"

export default {
  components: {
    LeftMenu,
  },
}
</script>

<style lang="sass" scoped>
  .full
    height: calc(100vh - 24px)
    width: 100%
    .v-image:first-child
      border-radius: 50%
    .v-image:nth-child(2)
      margin: auto !important
    .theme--light.v-btn--active:hover::before, .theme--light.v-btn--active::before
      opacity: 0
    .v-btn
      width: 40%
      padding: 16px
      height: max-content
      font-size: 14px
  @media only screen and (max-width: 600px)
    .v-btn
      width: 100% !important
    
</style>