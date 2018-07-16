Vue.use(VeeValidate, {
	events: ''
});

VeeValidate.Validator.extend('keywords_validation', {

	getMessage: (field, args, data) => {
		return (data && data.message) || 'Something went wrong';
	},

	validate: (value, args) => {
		return new Promise( (resolve) => {
			if (value.toLowerCase() in args[0]) {
				resolve({
					valid: false,
					data: {
						message: args[0][value.toLowerCase()]
					},
				});
			}
			resolve({ valid: true, data: undefined });
		});
	}
});

VeeValidate.Validator.extend('isExist', {
	getMessage: (field) => {
		return `This ${field.toLowerCase()} is already exist.`
	},

	validate: (value, args) => {
		return new Promise ( (resolve) => {
			if (localStorage.getItem('users')) {
				let localUsers = JSON.parse(localStorage.getItem('users'));
				localUsers.forEach( (user) => {
					if (user !== null) {
						if (value === user[args[1]][args[0]]) {
							resolve({valid: false});
						}
					}
				});
			}
			resolve({valid: true});
		});
	}
});

let app = new Vue({
	el: '#app',
	data: {
		inputForm: {
			name: '',
			lastName: '',
			email: '',
			age: null,
			skype: '',
			scope: 'inputForm',
		},
		secondaryForm: {
			hobbies: '',
			telephone: '',
			nickname: '',
			scope: 'secondaryForm',
		},
		reactions: {
			'god': 'Are you kidding me?!',
			'devil': 'Are you shure you\'re worth to be called like that?',
			'president': 'Mr.Presiden, stop joking!',
		},
		users: [],
		selected: '',
		options: []
	},
	methods: {
		setDataToStorage(storageName) {
			localStorage.setItem(storageName, JSON.stringify(this[storageName]));
		},

		getDataFromStorage(storageName) {
			if (localStorage.getItem(storageName)) {
				return JSON.parse(localStorage.getItem(storageName));
			}
			return false;
		},

		submitEvent(scope) {
			this.$validator.validateAll(scope).then( (result) => {
				if (result) {
					this.setDataToStorage(scope);
				}
			});
		},

		addUser() {
			if (this.getDataFromStorage('users')) {
				this.users = this.getDataFromStorage('users');
			}
			if (localStorage.getItem('inputForm')) {
				let prospect = {
					'inputForm': this.getDataFromStorage('inputForm'),
					'secondaryForm': this.getDataFromStorage('secondaryForm'),
				}
				if (this.users[this.users.length - 1] == null) {
					this.users.pop();
				}
				this.users.push(prospect);
				this.addOptions();
				localStorage.removeItem('inputForm');
				localStorage.removeItem('secondaryForm');
				localStorage.setItem('users', JSON.stringify(this.users));
			}
		},

		addOptions() {
			this.options = [];
			this.users.forEach((user, i) => {
				this.options.push({
					text: `${user.inputForm.name}`,
					value: `${i}`
				});
			});
		},

		onChangeSelect() {
			this.setDataToTables(+this.selected);
		},

		setDataToTables(index) {
			let tableCells = document.querySelectorAll('[data-input]');
			let currentUser = this.users[index];
			tableCells.forEach( (cell) => {
				cell.textContent = currentUser[cell.dataset.scope][cell.dataset.input];
			});
		},
	},
	mounted() {
		this.addUser();
		this.addOptions();
	}
});