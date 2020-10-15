<template>
  <v-row>
    <LeftMenu />
    <v-container fluid class="dashboard">
      <v-img
        :src="require('../assets/logo.svg')"
        class="logo"
        contain
        width="112px"
      />
    </v-container>
  </v-row>
</template>

<script>
// @ is an alias to /src
import LeftMenu from './LeftMenu'
// import GhostButton from '@/components/GhostButton'
// import PrimaryButton from '@/components/PrimaryButton'

// import axios from 'axios'

export default {
  name: 'Dashboard',

  components: {
    LeftMenu
  },

  data: () => ({
    
  }),

  methods: {
    
  }
}
</script>

<style lang="sass" scoped>
  .container--fluid
    margin-right: 0
    max-width: calc(100% - 342px)
    @media screen and (max-width: 800px)
      max-width: 100%
</style>
