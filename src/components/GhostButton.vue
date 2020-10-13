<template>
  <v-btn rounded color="#FFF" elevation="0">
    {{ label }}
  </v-btn>
</template>

<script>
  export default {
    name: 'GhostButton',
    props: ['label'],

    data: () => ({
      
    }),
  }
</script>

<style lang="sass" scoped>
  .v-btn
    width: 100%
    margin: 16px 0
</style>
