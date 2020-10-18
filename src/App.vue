<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap')
  *
    font-family: 'Open Sans'
  p, span
    font-size: 16px
    line-height: 24px
    font-weight: 400
    color: rgba(0, 0, 0, 0.56)
  h1
    font-size: 36px
    line-height: 54px
    font-weight: 400
    color: rgba(0, 0, 0, 0.88)
  h2
    font-size: 32px
    line-height: 48px
    font-weight: 400
    color: rgba(0, 0, 0, 0.88)
  h3
    font-size: 24px
    line-height: 36px
    font-weight: 400
    font-weight: 400
    color: rgba(0, 0, 0, 0.88)
  h4
    font-size: 20px
    line-height: 30px
    font-weight: 400
    color: rgba(0, 0, 0, 0.88)
  h5
    font-size: 18px
    line-height: 27px
    font-weight: 400
    color: rgba(0, 0, 0, 0.88)
  h6
    font-size: 16px
    line-height: 24px
    font-weight: 600
    color: rgba(0, 0, 0, 0.88)
  button
    font-size: 14px
    line-height: 22px
    font-weight: 600
    color: rgba(0, 0, 0, 0.88)
    text-transform: uppercase

  .col
    height: max-content
  .v-text-field--outlined
    fieldset
      top: -10px !important
  .v-btn > .v-btn__content .v-icon
    color: #FF8822 !important
  .theme--light.v-icon
    color: #FF8822 !important
</style>