<template>
  <v-container class="login">
    <v-img
      :src="require('../assets/logo.svg')"
      class="logo"
      contain
      width="112px"
    />
    <v-form @submit.prevent="sendLogin">
      <h3>Seja bem-vindo!</h3>
      <p>
        Nós sabemos a importância de estar sempre de barriga cheia e o quanto isso pode ajudar no seu dia.
      </p>
      <v-text-field
        label="Email"
        outlined
        color="#FF8822"
        v-model="email"
        hide-details="auto"
        type="email"
        :rules="emailRules"
      />
      <v-text-field
        v-model="senha"
        :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
        :type="mostrarSenha ? 'text' : 'password'"
        label="Senha"
        outlined
        color="#FF8822"
        hide-details="auto"
        @click:append="mostrarSenha = !mostrarSenha"
      />
      <GhostButton 
        label="Recuperar minha senha" 
        @click.native="modalRecuperar = !modalRecuperar" 
      />
      <PrimaryButton 
        label="Entrar" 
        v-bind:disabled="!/.+@.+\..+/.test(email) || senha < 3"
        type="submit"
      />
    </v-form>
    <p>
      Infoway Gestão em Saúde ©, 2019.
    </p>

    <v-snackbar color="success" transition="scroll-y-transition" v-model="alertSuccess" :timeout="1500">
      Bem Vindo, {{ usuario }}!
    </v-snackbar>
    <v-snackbar color="#FF8822" transition="scroll-y-transition" v-model="alertError" :timeout="1500">
      Email ou senha incorreto, tente novamente!
    </v-snackbar>

    <v-dialog v-model="modalRecuperar" width="500" >
      <v-card>
        <v-card-title>
          <h3>Recuperar senha</h3>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-col>
            <v-text-field
              label="Email"
              outlined
              color="#FF8822"
              v-model="email"
              hide-details="auto"
              type="email"
              :rules="emailRules"
            />
          </v-col>
          <v-col v-if="trocarSenha">
            <v-text-field
              v-model="newSenha"
              :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
              :type="mostrarSenha ? 'text' : 'password'"
              label="Nova senha"
              outlined
              color="#FF8822"
              hide-details="auto"
              @click:append="mostrarSenha = !mostrarSenha"
            />
          </v-col>
          <v-col v-if="trocarSenha">
            <v-text-field
              v-model="repetirSenha"
              :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
              :type="mostrarSenha ? 'text' : 'password'"
              label="Repita a nova senha"
              outlined
              color="#FF8822"
              hide-details="auto"
              @click:append="mostrarSenha = !mostrarSenha"
            />
          </v-col>
          
          <v-divider></v-divider>
          
          <PrimaryButton 
            label="Recuperar" 
            v-bind:disabled="!/.+@.+\..+/.test(email)"
            v-if="!trocarSenha"
            @click.native="sendRecuperarSenha"
          />
          <PrimaryButton 
            label="Confirmar" 
            v-bind:disabled="!/.+@.+\..+/.test(email) || newSenha < 3 || newSenha !== repetirSenha"
            v-if="trocarSenha"
            @click.native="confirmRecuperarSenha"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// @ is an alias to /src
import GhostButton from '@/components/GhostButton'
import PrimaryButton from '@/components/PrimaryButton'

import axios from 'axios'

export default {
  name: 'Login',

  components: {
    GhostButton,
    PrimaryButton,
  },

  data: () => ({
    email: '',
    senha: '',
    newSenha: '',
    repetirSenha: '',
    usuario: '',
    userRecuperar: 0,
    trocarSenha: false,
    mostrarSenha: false,
    loginValid: false,
    alertSuccess: false,
    alertError: false,
    modalRecuperar: false,
    emailRules: [
      v => !!v,
      v => /.+@.+\..+/.test(v)
    ]
  }),

  methods: {
    sendLogin () {
      const data = {
        email: this.email,
        senha: this.senha
      }
      axios.post('api/login', { data })
      .then(response => {
        if (response.data.length > 0) {
          this.usuario = response.data[0].name
          this.alertSuccess = true

          setTimeout(() => {
            this.usuario = ''
            this.$router.push('dashboard')
          }, 2000);
        } else {
          this.alertError = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    sendRecuperarSenha () {
      const data = {
        email: this.email
      }
      axios.post('api/recoverPass', { data })
      .then(response => {
        if (response.data.length > 0) {
          this.userRecuperar = response.data[0].id
          this.trocarSenha = true
        }
      })
    },
    confirmRecuperarSenha () {
      const data = {
        id: this.userRecuperar,
        senha: this.newSenha
      }
      axios.put(`api/confirmNewPass/${data.id}`, { data })
      .then(response => {
        console.log(response)
        this.email = response.data.user.email
        this.senha = response.data.user.senha
        this.modalRecuperar = false
        this.sendLogin()
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .login
    min-height: 100vh
    display: grid
    align-items: center
    justify-items: center
    .v-image
      align-self: self-end
    .v-form
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      max-width: 450px
      padding: 18px
      align-self: self-start
      p
        text-align: center
        color: rgba(0, 0, 0, 0.54)
        margin: 16px 0 28px
      .v-text-field
        padding: 12px 0
        width: 100%
</style>
