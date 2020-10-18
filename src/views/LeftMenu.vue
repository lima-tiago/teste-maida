<template>
  <v-navigation-drawer 
    class="left-menu"
    width="342px"
    height="100vh"
    v-model="$vuetify.breakpoint.desktop"
    v-bind:temporary="$vuetify.breakpoint.mobile"
    fixed
  >
    <div class="left-menu__logo">
      <router-link to="/dashboard">
        <v-img
          src="../assets/logo-white.svg"
          lazy-src="../assets/logo-white.svg"
          class="logo"
          contain
          width="112px"
        />
      </router-link>
    </div>
    <div class="left-menu__links">
      <v-list flat>
        <v-list-group disabled v-model="linkOpen" class="pedidos">
          
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="'PEDIDOS'" />
            </v-list-item-content>
          </template>

          <v-list-item to="/dashboard">
            <v-list-item-content>
              <v-list-item-title v-text="'EM ABERTOS'" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item disabled>
            <v-list-item-content>
              <v-list-item-title v-text="'ENCERRADOS'" />
            </v-list-item-content>
          </v-list-item>
          
        </v-list-group>

        <v-list-item disabled class="clientes">
          <v-list-item-content>
            <v-list-item-title v-text="'CLIENTES'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div class="left-menu__footer">
      <p>Infoway Gestão em Saúde ©, 2019.</p>
    </div>
  </v-navigation-drawer>
</template>

<script>


export default {
  name: 'LeftMenu',

  components: {
    
  },

  data: () => ({
    leftMenu: true,
    linkOpen: true,
  }),

  methods: {
    
  }
}
</script>

<style lang="sass" scoped>
  .left-menu
    &__logo
      height: 215px
      width: 100%
      display: grid
      justify-content: center
      align-items: center
    &.v-navigation-drawer
      background-color: #FF8822
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25)
    &__links
      .pedidos
        position: relative
        &:after
          content: ''
          width: 24px
          height: 24px
          position: absolute
          left: 48px
          top: 12px
          background: url('../assets/list.svg') no-repeat !important
      .clientes
        position: relative
        &:after
          content: ''
          width: 24px
          height: 24px
          position: absolute
          left: 48px
          top: 12px
          background: url('../assets/user.svg') no-repeat !important
      .v-list
        .v-list-group
          &--active
            &:before
              content: ''
              background-color: #fff
              opacity: 1
              position: absolute
              width: 100%
              height: 48px
              left: 0
          &__header
            .v-list-item__title
              color: #FF8822
        > div
          padding-left: 88px
          &.v-list-item--disabled
            padding-left: 104px
            opacity: 0.54
            color: #fff
          .v-list-group__items
            .v-list-item
              color: #fff
              &--active
                &:before
                  opacity: 1
                  width: 2px
                  height: 16px
                  display: flex
                  margin: auto 0
                  left: 0
              &--disabled
                opacity: 0.54
    &__footer
      position: absolute
      bottom: 40px
      left: 0
      right: 0
      margin: 0 auto
      width: max-content
      p
        color: #fff
        font-size: 12px
</style>
