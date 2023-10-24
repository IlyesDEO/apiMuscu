const { Sequelize, DataTypes } = require('sequelize')
const ExoModel = require('../models/exo.js')
const exo = require('./mock-exo')
  
const sequelize = new Sequelize('api-muscu', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Exo = ExoModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    exo.map(exo => {
      Exo.create({
        name: exo.name,
        nbSeries: exo.nbSeries,
        nbRep: exo.nbRep,
      }).then(exo => console.log(exo.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée')
  })
}
  
module.exports = { 
  initDb, Exo
}