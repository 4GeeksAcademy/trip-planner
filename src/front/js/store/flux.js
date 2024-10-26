import toast from "react-hot-toast";
import suggestions from "./suggestions"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//add the suggestions
			currentId: 0,
			upDate: false,
			recommendations: suggestions,
			recomendacionPorLugar: [],
			viajes: [],
			user: [],
			

			token: localStorage.getItem("token") || null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			selected_trip: [],
			activities: [],
			miembros: [],
		},
		actions: {

			// get_users: () => {
			// 	const store = getStore()
			// },

			guardarId: (idViaje) => {
				let store = getStore()
				setStore({...store, currentId: idViaje})
			},


			post_trip: async (viaje) => {
				const store = getStore()

				    // Validación de campos obligatorios
					if (!viaje.destino || !viaje.fecha_inicio || !viaje.fecha_fin ) {
						toast.error("Faltan campos obligatorios");
						return false;
					}

				const response = await fetch(process.env.BACKEND_URL + "api/add-trip", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ ...viaje, user_id: store.user.id })
				});
				const data = await response.json();
				console.log(data);

				if (response.ok) {
					setStore({ viajes: data.trip });
					toast.success("Se ha creado tu viaje!");
					setStore({ ...getStore(), upDate: !getStore().upDate })
					return true;
				} else {
					toast.error(data.error || "Ocurrió un error inesperado.");
					return false;
				}
			},

			get_trips: async () => {
				const store = getStore();
				const response = await fetch(process.env.BACKEND_URL + "api/all-trip", {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${store.token}`
					}
				});

				if (!response.ok) {
					const errorData = await response.json();
					console.error("Error", errorData);
					return;
				}
				const data = await response.json();
				console.log(data);
				setStore({ viajes: data }); 
			},

			addLike: (index) => {
				const store = getStore()
				let likesAdded = store.activities[index].likes;
				likesAdded++;
				const likeUpdate = store.activities.map((elm, i) => {
					if (i === index) elm.likes = likesAdded;
					return elm;
				});
				setStore({ activities: likeUpdate })

			},

			addActivity: async(activity) => {
				const store = getStore()
				const response = await fetch(process.env.BACKEND_URL + "api/add-activity", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': process.env.BACKEND_URL
					},
					body: JSON.stringify(activity)
				});
				const data = await response.json();
				console.log(data)
				setStore({ activities: [data, ...store.activities] });
				toast.success("Se ha creado tu viaje!");

				// const activityAdded = store.activities
				// activityAdded.push(activity)
				// console.log(activityAdded)
				// // console.log("Segundo "+store.activities)
				// setStore({ activities:  })
			},

			getActivities: async () => {
				const store = getStore()
				const response = await fetch(process.env.BACKEND_URL + "api/all-activities/" + store.currentId, {
					method: 'GET'
				})
				const data = await response.json()
				console.log("Este es getActivities", data)
				// setStore(activities)
			},

			// Recomendaciones por lugar
			loadRecommendations: async (location) => {
				console.log("recomendaciones activadas")
				const response = await fetch(`https://test.api.amadeus.com/v1/shopping/activities?latitude=${location.latitude}&longitude=${location.longitude}&radius=20`, {
					method: 'GET',
					headers: {
						"authorization": "Bearer fBerfFkVs6mm398mtGm6pfBunbjp"
					}
				});
				const data = await response.json();
				console.log(data.data)
				setStore({ recomendacionPorLugar: data.data })
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				const data = await resp.json();

				if (resp.ok) {
					localStorage.setItem("token", data.token);
					setStore({ token: data.token, user: data.user }); //guarda el token y user
					toast.success("Iniciando Sesión");
				} else {
					toast.error("Credenciales inválidas");
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({
					token: null,
					user: {}
				});
				toast.success("Cerrando Sesión!");
			},
			register: async (name, userName, email, password, more_info, profileImageUrl) => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						name: name,
						username: userName,
						email: email,
						password: password,
						profile_image_url: profileImageUrl,
						more_info: more_info
					})
				});
				const data = await resp.json()

				localStorage.setItem("token", data.token)

				setStore({ user: data.user });
				setStore({ token: data.token });


				if (resp.ok) {
					toast.success("Usuario registrado!");
				}
				else {
					toast.error("Error al registrar el usuario");
				}
			},
			getUserLogged: async () => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/user", {
					headers: {
						Authorization: "Bearer " + getStore().token
					}
				});
				if (resp.ok) {
					toast.success("Usuario loggeado!");
				} else {
					localStorage.removeItem("token");
					setStore({ token: null, user: {} });
				}
				const data = await resp.json();
				setStore({ user: data });
			},

			addViaje: (viaje) => {
				const store = getStore();
				const actions = getActions();
				const result = actions.isViaje(viaje)
				if (result) {
					actions.deleteViaje(viaje)
				} else {
					setStore({
						selected_trip: [...store.selected_trip, viaje]
					});
				}
				console.log(viaje);
			},

			deleteViaje: (viaje) => {
				const store = getStore();
				const updateViajes = store.selected_trip.filter(item => viaje.name !== item.name);
				setStore({ selected_trip: updateViajes });
			},

			isViaje: (viaje) => {
				const store = getStore();
				const result = store.selected_trip.some(item => viaje.id == item.id && viaje.type == item.type && viaje.cost == item.cost && viaje.imageUrl == item.imageUrl)
				return result
			},

			sumCostosTotales: () => {
				const store = getStore();
				const total = store.selected_trip.reduce((acc, viaje) => acc + viaje.cost, 0);
				return total;
			},

			addMember: (miembro) => {
				const store = getStore();
				const actions = getActions();
				const result = actions.isMember(miembro)
				if (result) {
					actions.deleteMember();
				} else {
					setStore({
						miembros: [...store.miembros, miembro]
					})
				}
			},

			isMember: (miembro) => {
				const store = getStore();
				const result = store.miembros.some(item => miembro.id == item.id && miembro.name == item.name && miembro.mail == item.email)
				return result
			},

			deleteMember: (miembro) => {
				const store = getStore();
				const updateMember = store.miembros.filter(item => miembro.name !== item.name)
				setStore({ miembros: updateMember });
			}

		}

	};
};

export default getState;
