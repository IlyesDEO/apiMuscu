const { Sequelize, DataTypes } = require('sequelize')
const ExoModel = require('../models/exo.js')
const UserModel = require('../models/user.js')
const exo = require('./mock-exo')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('api-muscu', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Exo = ExoModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    exo.map(exo => {
      Exo.create({
        name: exo.name,
        nbSeries: exo.nbSeries,
        nbRep: exo.nbRep,
      }).then(exo => console.log(exo.toJSON()))
    })
      bcrypt.hash('root', 10)
      .then(hash => User.create({ username: 'ilyes',  password: hash}))
       .then(user => console.log(user.toJSON()))

      console.log('La base de donnée a bien été initialisée')
  })
}
  
module.exports = { 
  initDb, Exo, User
}