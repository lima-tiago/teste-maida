import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Login {
    email: string,
    senha: string
  }
}