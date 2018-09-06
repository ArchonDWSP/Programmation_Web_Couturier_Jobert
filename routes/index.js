var express = require('express')
var router = express.Router()

var list = [
	{Bouteille: 'Passion Blue', Annee: 2017, Pays: 'France', Prix:7.35 + ' €', Quantite: 1},
	{Bouteille: 'Château Cheval Blanc', Annee: 2008, Pays: 'France', Prix: 450 + ' €', Quantite: 3}
]

var user = [
	{Username: 'Admin', Password: 'Admin'}
]

router.get('/list', (req, res) => {
  res.json(list)
})

router.get('/user', (req,res) => {
	res.json(user)
})

router.post('/user', (req,res) => {
	if (req.body.New === undefined){
		if (req.body.Username !== "" && req.body.Password !== ""){
			var users
			for (users in user){
  				if (req.body.Username === user[users].Username){
  					if (req.body.Password === user[users].Password){
  						res.send('OK')
  					}
  				}
  			}
  		}
  	}

  	if (req.body.New === '1'){
  		if (req.body.Username !== "" && req.body.Password !== ""){
			var users
			for (users in user){
  				if (req.body.Username === user[users].Username){
  					if (req.body.Password === user[users].Password){
  						var error = 1
  					}
  				}
  			}
  			if (error !== 1){
  				user.push({Username: req.body.Username, Password: req.body.Password})
  				res.send('OK')
  			}
  		}
  	}
})


router.post('/list', (req, res) => {
  	if (req.body.Retirer !== "" && Number(req.body.Retirer) > 0){
  		list.splice(req.body.Retirer - 1, 1)
  		res.send('OK')
  	}

  	if (req.body.Modifier !== "" && Number(req.body.Modifier) > 0){
  		if (req.body.Bouteille !== ''){
			list[req.body.Modifier - 1].Bouteille = req.body.Bouteille;
		}
		if (req.body.Annee !== ""){
			list[req.body.Modifier - 1].Annee = req.body.Annee;
		}
		if (req.body.Pays !== ''){
			list[req.body.Modifier - 1].Pays = req.body.Pays;
		}
		if (req.body.Prix !== ""){
			list[req.body.Modifier - 1].Prix = req.body.Prix + '€';
		}
		if (req.body.Quantite !== ""){
			list[req.body.Quantite - 1].Prix = req.body.Quantite;
		}
		res.send('OK')
  	}

  	if(req.body.Retirer === undefined && req.body.Modifier === undefined && req.body.Username === undefined && req.body.Password === undefined){
  		list.push({
			Bouteille: req.body.Bouteille,
			Annee: req.body.Annee,
			Pays: req.body.Pays,
			Prix: req.body.Prix,
			Quantite: req.body.Quantite
			})
		res.send('OK')
	}
})
module.exports = router