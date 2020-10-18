// Server com dados mockados
import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      pedido: Model,
    },

    seeds(server) {
      // Usuários
      server.create("user", { id: 1, name: "Bob", email:"teste@teste.com", senha:"@teste#" })
      server.create("user", { id: 2, name: "Vanusa", email:"vanusa@maida.health", senha:"@vanusa#" })

      // Pedidos
      server.create("pedido", {
        id: 1,
        userId: [1, 2],
        date: '13/05/2019',
        orders: [
          {
            client: 'Marcel Batista',
            food: [
              'cuscuz com calabresa',
              'suco de laranja'
            ],
            value: 3.50,
            prato: require('./assets/pratos/cuscuz.png'),
            photo: require('./assets/clientes/marcel.png')
          },
          {
            client: 'Fernanda Siqueira',
            food: [
              'iogurte desnatado com maçã'
            ],
            value: 7.90,
            prato: require('./assets/pratos/vitaminas.png'),
            photo: require('./assets/clientes/fernanda.png')
          },
          {
            client: 'Luiz Oliveira',
            food: [
              '2x bolo frito',
              'café c/ leite'
            ],
            value: 4.50,
            prato: require('./assets/pratos/vitaminas.png'),
            photo: require('./assets/clientes/marcel.png')
          }
        ]
      })
      server.create("pedido", {
        id: 2,
        userId: [1, 2],
        date: '09/05/2019',
        orders: [
          {
            client: 'Ana Virlania',
            food: [
              '2x sanduiche de pão de arroz',
              'vitamina de goiaba'
            ],
            value: 5.00,
            prato: require('./assets/pratos/vitaminas.png'),
            photo: require('./assets/clientes/ana-virlania.png')
          },
          {
            client: 'Marcel Batista',
            food: [
              'cuscuz com calabresa',
              'suco de maracujá'
            ],
            value: 3.50,
            prato: require('./assets/pratos/cuscuz.png'),
            photo: require('./assets/clientes/marcel.png')
          },
        ]
      })
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

      // Pedidos
      this.get('/pedidos', (schema) => {
        return schema.pedidos.all()
      })
    },
  })

  return server
}