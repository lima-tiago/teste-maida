// Server com dados mockados
import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { id: 1, name: "Bob", email:"teste@teste.com", senha:"@teste#" })
      server.create("user", { id: 2, name: "Vanusa", email:"vanusa@maida.health", senha:"@vanusa#" })
    },

    routes() {
      this.namespace = "api"

      this.post("/login", (schema, request) => {
        const users = schema.users.all()
        const pedido = JSON.parse(request.requestBody).data
        
        return users.models.filter(item => {
          return item.attrs.email === pedido.email && item.attrs.senha === pedido.senha
        })
      })

      this.post('/recoverPass', (schema, request) => {
        const users = schema.users.all()
        const pedido = JSON.parse(request.requestBody).data

        return users.models.filter(item => {
          return item.attrs.email === pedido.email
        })
      })
      this.put('/confirmNewPass/:id', (schema, request) => {
        const id = request.params.id
        const users = schema.users.find(id)
        const pedido = JSON.parse(request.requestBody).data

        return users.update(pedido)
      })
    },
  })

  return server
}