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

  app.get('/api/exo/:id', (req,res) => {
    Exo.findByPk(req.params.id)
    .then(exo => {
      const message = `L'exercice à bien été trouvé.`
      res.json({message, data: exo})
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

  app.put('/api/exo/:id', (req, res) => {
    const id = req.params.id
    Exo.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Exo.findByPk(id).then(exo => {
        const message = `L'exercice ${exo.name} a bien été modifié.`
        res.json({message, data: exo })
      })
    })
  })

  app.delete('/api/exo/:id', (req, res) => {
    Exo.findByPk(req.params.id).then(exo => {
      const exoDeleted = exo;
      Exo.destroy({
        where: { id: exo.id }
      })
      .then(_ => {
        const message = `L'exo avec l'identifiant n°${exoDeleted.id} a bien été supprimé.`
        res.json({message, data: exoDeleted })
      })
    })
})
}

