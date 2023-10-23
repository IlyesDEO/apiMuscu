const { Exo } = require('../db/sequelize')
const exo = require('../models/exo')


module.exports = (app) => {

app.get('/', (req,res) => res.send('Bienvenue sur ma première api en node, symfony ça reste mieux !'))

  app.get('/api/exo', (req, res) => {
    Exo.findAll()
      .then(exo => {
        const message = 'La liste des exercices a bien été récupérée.'
        res.json({ message, data: exo })
      })
  })

  app.post('/api/exo', (req, res) => {
    Exo.create(req.body)
      .then(exo => {
        const message = `L'exo ${req.body.name} a bien été crée.`
        res.json({ message, data: exo })
      })
    .catch(error => {
        const message = `L'exercice n'a pas pu être ajouté. Réessayez plus tard`
        res.status(500).json({message, data: error})
    })
  })
}