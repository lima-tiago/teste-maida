// Server com dados mockados
import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      pedido: Model,
      produto: Model,
      cliente: Model,
    },

    seeds(server) {
      // Usuários
      server.create("user", { id: 1, name: "Bob", email:"teste@teste.com", senha:"@teste#" })
      server.create("user", { id: 2, name: "Vanusa", email:"vanusa@maida.health", senha:"@vanusa#" })

      // Pedidos
      server.create("pedido", {
        id: 2,
        userId: [1, 2],
        date: '09/05/2019',
        orders: [
          {
            id: 1,
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
            id: 2,
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
      server.create("pedido", {
        id: 1,
        userId: [1, 2],
        date: '13/05/2019',
        orders: [
          {
            id: 1,
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
            id: 2,
            client: 'Fernanda Siqueira',
            food: [
              'iogurte desnatado com maçã'
            ],
            value: 7.90,
            prato: require('./assets/pratos/vitaminas.png'),
            photo: require('./assets/clientes/fernanda.png')
          },
          {
            id: 3,
            client: 'Luiz Oliveira',
            food: [
              '2x bolo frito',
              'café c/ leite'
            ],
            value: 4.50,
            prato: require('./assets/pratos/vitaminas.png'),
            photo: require('./assets/clientes/luiz.png')
          }
        ]
      })

      // Produtos
      server.create("produto", {
        id: 1,
        categoria: 'Cuscuz',
        pratos: [
          {
            id: 1,
            name: 'Cuscuz simples',
            value: 2.25,
            image: require('./assets/pratos/cuscuz.png')
          },
          {
            id: 2,
            name: 'Cuscuz completo',
            value: 3.25,
            image: require('./assets/pratos/cuscuz-completo.png')
          },
        ]
      })
      server.create("produto", {
        id: 2,
        categoria: 'Pães',
        pratos: [
          {
            id: 1,
            name: 'Pão caseiro',
            value: 2.25,
            image: require('./assets/pratos/pao-caseiro.png')
          },
          {
            id: 2,
            name: 'Pão caseiro completo',
            value: 2.25,
            image: require('./assets/pratos/pao-caseiro-completo.png')
          },
          {
            id: 3,
            name: 'Misto quente',
            value: 3.00,
            image: require('./assets/pratos/misto-quente.png')
          },
          {
            id: 4,
            name: 'Lingua de sogra (pequena)',
            value: 2.00,
            image: require('./assets/pratos/lingua-de-sogra.png')
          },
          {
            id: 5,
            name: 'Lingua de sogra (grande)',
            value: 3.00,
            image: require('./assets/pratos/lingua-de-sogra.png')
          },
        ]
      })
      server.create("produto", {
        id: 3,
        categoria: 'Salgados',
        pratos: [
          {
            id: 1,
            name: 'Pastelzinho de carne',
            value: 2.00,
            image: require('./assets/pratos/pastelzinho-de-carne.png')
          },
          {
            id: 2,
            name: 'Esfirra de frango',
            value: 2.00,
            image: require('./assets/pratos/esfirra-de-frango.png')
          },
          {
            id: 3,
            name: 'Enrolado de presunto',
            value: 2.00,
            image: require('./assets/pratos/enrolado-de-presunto.png')
          },
        ]
      })
      server.create("produto", {
        id: 4,
        categoria: 'Bebidas',
        pratos: [
          {
            id: 1,
            name: 'Sucos',
            value: 3.25,
            image: require('./assets/pratos/sucos.png')
          },
          {
            id: 2,
            name: 'Vitaminas',
            value: 3.50,
            image: require('./assets/pratos/vitaminas.png')
          },
          {
            id: 3,
            name: 'Refrigerantes',
            value: 2.50,
            image: require('./assets/pratos/refrigerantes.png')
          },
          {
            id: 4,
            name: 'Água mineral (sem gás)',
            value: 3.00,
            image: require('./assets/pratos/agua-mineral-sem-gas.png')
          },
          {
            id: 5,
            name: 'Água mineral (com gás)',
            value: 3.50,
            image: require('./assets/pratos/agua-mineral-com-gas.png')
          },
          {
            id: 6,
            name: 'Nescau',
            value: 2.50,
            image: require('./assets/pratos/nescau.png')
          },
        ]
      })

      // Clientes
      server.create("cliente", {
        id: 1,
        name: 'Justine Marshall',
        image: require('./assets/clientes/justine.png'),
        selecionado: false
      })
      server.create("cliente", {
        id: 2,
        name: 'Bairam Frootan',
        image: require('./assets/clientes/bairam.png'),
        selecionado: false
      })
      server.create("cliente", {
        id: 3,
        name: 'Tua Manuera',
        image: require('./assets/clientes/manuera.png'),
        selecionado: false
      })
      server.create("cliente", {
        id: 4,
        name: 'Justine Marshall',
        image: require('./assets/clientes/justine.png'),
        selecionado: false
      })
      server.create("cliente", {
        id: 5,
        name: 'Bairam Frootan',
        image: require('./assets/clientes/bairam.png'),
        selecionado: false
      })
      server.create("cliente", {
        id: 6,
        name: 'Tua Manuera',
        image: require('./assets/clientes/manuera.png'),
        selecionado: false
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
      this.post('/pedidos', (schema, request) => {
        const orders = schema.pedidos.all()
        let pedido = JSON.parse(request.requestBody).data
        let orderId = orders.models.length + 1
        
        pedido.orders.id = orderId
        
        return server.create('pedido', pedido)
      })

      // Produtos
      this.get('/produtos', (schema) => {
        return schema.produtos.all()
      })

      // Clientes
      this.get('/clientes', (schema) => {
        return schema.clientes.all()
      })
    },
  })

  return server
}