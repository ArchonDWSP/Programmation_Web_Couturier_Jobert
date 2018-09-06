
Vue.prototype.$http = axios

		var page = new Vue ({
			el: '#page',
			data: {
				popup1: '',
				popup2: '',
				currentPage: 'Accueil',
				filter:'',
				menu: '',
				vins: [],
				user: [],
				username: '',
				password: '',
				bouteille: '',
				annee: '',
				pays: '',
				prix: '',
				quantite: '',
				retirer: '',
				modifier: '',
				bouteille3: '',
				annee3: '',
				pays3: '',
				prix3: '',
				quantite3:''
			},

			created () {

    			this.$http.get('/list')

    			.then(list => {
       				console.log('affichage de ma liste', list)
        			this.vins = list.data
      			})

      			.catch(err => {
        			console.log('error', err)
     		 	})

     		 	this.$http.get('/user')

     		 	.then(user => {
     		 		console.log('affichage liste user', user)
     		 		this.user = user.data
     		 	})

     		 	.catch(err => {
        			console.log('error', err)
     		 	})
 			},

			methods: {

				ajoutListe() {
					this.$http.post('/list', {Bouteille: this.bouteille, Annee: this.annee, Pays: this.pays, Prix: this.prix + ' €', Quantite: this.quantite})

					.then(() => {
						this.vins.push({Bouteille: this.bouteille, Annee: this.annee, Pays: this.pays, Prix: this.prix + ' €', Quantite: this.quantite})
					})
				},

				deleteElem() {
					this.$http.post('/list', {Retirer: this.retirer})

					.then(() => {
						this.vins.splice(this.retirer - 1,1)
					})
				},

				modifElem() {
					this.$http.post('/list', {Bouteille: this.bouteille3, Annee: this.annee3, Pays: this.pays3, Prix: this.prix3, Modifier: this.modifier, Quantite: this.quantite3})

					.then(() => {
						if (this.bouteille3 !== ''){
							this.vins[this.modifier - 1].Bouteille = this.bouteille3;
						}
						if (this.annee3 !== ""){
							this.vins[this.modifier - 1].Annee = this.annee3;
						}
						if (this.pays3 !== ''){
							this.vins[this.modifier - 1].Pays = this.pays3;
						}
						if (this.prix3 !== ""){
							this.vins[this.modifier - 1].Prix = this.prix3 + '€';
						}
						if (this.quantite3 !== "") {
							this.vins[this.modifier - 1].Quantite = 'Quantité:' + this.quantite3;
						}
					})
				},

				connexion() {
					this.$http.post('/user', {Username: this.username, Password: this.password})

					.then(() => {
						this.popup2 = ''
						this.popup1 = ''
						this.currentPage = 'ListeVins'
					})

					if (this.labelname !== ""  && this.labelpass !== "") {
						this.popup1 = ''
						this.popup2 = 'Oui'
					}
				},

				compte() {
					console.log(this.username)
					if (this.username !== "" && this.password !== ""){
						this.$http.post('/user', {Username: this.username, Password: this.password, New: '1'})

						.then(() => {
							this.user.push({Username: this.username, Password: this.password})
							this.popup1 = ''
							this.popup2 = ''
							this.currentPage = 'ListeVins'
						})

						if (this.labelname !== ""  && this.labelpass!== "") {
							this.popup2 = ''
							this.popup1 = 'Oui'
						}
					}
				}
			}
		})