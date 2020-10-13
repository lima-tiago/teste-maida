<template>
  <v-btn 
    rounded 
    color="#FF8822" 
    elevation="0" 
    fab 
    v-bind:disabled="disabled"
    v-bind:type="type"
  >
    {{ label }}
  </v-btn>
</template>

<script>
  export default {
    name: 'PrimaryButton',
    props: ['label', 'disabled', 'type'],

    data: () => ({
      
    }),
  }
</script>

<style lang="sass" scoped>
  .v-btn
    width: 100%
    margin: 16px 0
    color: #fff
  .theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined)
    background-color: #FF8822 !important
    color: #fff !important
    opacity: 0.6
</style>
