import { toast } from "react-hot-toast";
import suggestions from "./suggestions"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//add the suggestions
			currentId: 1,
			upDate: false,
			recommendations: suggestions,
			recomendacionPorLugar: [],
			viajes: [],
			user: [],
			apiToken: "",
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
			comentarios: [],
		},
		actions: {

			get_comments: async (actividades_id) => {
				const store = getStore();

				if (!actividades_id) {
					toast.error("Falta el ID de la actividad");
					return;
				}

				const response = await fetch(process.env.BACKEND_URL + "api/get-comments" + actividades_id + "/", {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${store.token}`
					}
				});

				if (response.ok) {
					const data = await response.json();
					console.log("Comentarios recibidos del servidor:", data);
					setStore({ comentarios:[...store.comentarios, ...data] });
				} else {
					const errorData = await response.json();
					console.error("Error al obtener comentarios:", errorData);
				}
			},

			post_comment: async (actividades_id, comentario) => {
				const store = getStore();

				// Validación de campos obligatorios
				if (!actividades_id || !comentario) {
					toast.error("Faltan campos por completar");
					return false;
				}

				const datosEnviar = {
					actividades_id,
					comentario,
					user_id: store.user.id
				};

				console.log("Datos a enviar:", datosEnviar);

				const response = await fetch(process.env.BACKEND_URL + "/api/add-comment", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${store.token}`
					},
					body: JSON.stringify(datosEnviar),
				});
				const data = await response.json();
				console.log(data);

				if (response.ok) {
					// Asegúrate de que `data` incluye `usuario`
					const comentarioConUsuario = {
						id: data.id,
						actividades_id,
						usuario: store.user.username,
						comentario: data.comentario
					};

					setStore({ comentarios: [...store.comentarios, comentarioConUsuario] });
					return true;
				} else {
					toast.error(data.error || "Ocurrió un error inesperado.");
					return false;
				}
			},


			setCurrentId: (id) => setStore({ currentId: id }),
			setApiToken: async () => {
				const store = getStore()
				const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: new URLSearchParams({
						'grant_type': 'client_credentials',
						'client_id': 'cVGjE5EZm9Cg1kTlWttlrW2GkIoscIN6',
						'client_secret': 'sORLAMKbmjvJWhsd'
					})
				});
				const data = await response.json()
				setStore({ apiToken: data.access_token })
				// console.log(data)
				return data.access_token
			},

			// Recomendaciones por lugar
			geoLocation: async (city, token) => {

				const response = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${city}&max=1`, {
					method: 'GET',
					headers: {
						"authorization": "Bearer " + token
					}
				});
				const data = await response.json();
				console.log("esta es la ciudad", city)
				console.log(data.data[0].geoCode)
				return data.data[0].geoCode;
			},

			loadRecommendations: async (ciudad) => {
				const apiToken = await getActions().setApiToken()
				const location = await getActions().geoLocation(ciudad, apiToken)
				console.log("recomendaciones activadas")
				const response = await fetch(`https://test.api.amadeus.com/v1/shopping/activities?latitude=${location.latitude}&longitude=${location.longitude}&radius=20`, {
					method: 'GET',
					headers: {
						"authorization": "Bearer " + apiToken
					}
				});
				const data = await response.json();

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




			guardarId: (idViaje) => {
				let store = getStore()
				setStore({ ...store, currentId: idViaje })
			},


			post_trip: async (viaje) => {
				const store = getStore()

				// Validación de campos obligatorios
				if (!viaje.destino || !viaje.fecha_inicio || !viaje.fecha_fin) {
					toast.error("Faltan campos por completar");
					return false;
				}

				const datosEnviar = { ...viaje, user_id: store.user.id };
				console.log("Datos a enviar:", datosEnviar);

				const response = await fetch(process.env.BACKEND_URL + "/api/add-trip", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ ...viaje, user_id: store.user.id })
				});
				const data = await response.json();
				console.log("pasamos el post", data);

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
				const response = await fetch(process.env.BACKEND_URL + "/api/all-trip", {
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

			deleteLike: (index) => {
				const store = getStore()
				let likesDeleted = store.activities[index].likes;
				if (likesDeleted > 0) likesDeleted--;
				const likeUpdate = store.activities.map((elm, i) => {
					if (i === index) elm.likes = likesDeleted;
					return elm;
				});
				setStore({ activities: likeUpdate })
			},

			isLike: (index) => {
				const store = getStore();
				const result = store.activities.some((activity, i) => i === index && activity.likes > 0)
				return result
			},

			addActivity: async (activity) => {
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
				console.log("Una actividad más", data);
				setStore({ activities: [data, ...store.activities] });
				toast.success("Se ha creado tu actividad!");
			},

			getActivities: async () => {
				const store = getStore()
				const response = await fetch(process.env.BACKEND_URL + "/api/all-activities/" + store.currentId, {
					method: 'GET'
				})
				const data = await response.json()
				console.log("Este es getActivities", data)
				console.log("current Id:", store.currentId)
				// setStore(activities)
				setStore({ activities: data });
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
				toast("👋🏼 Hasta luego, esperamos verte pronto...");
			},

			register: async (name, userName, email, password, more_info, profileImageUrl) => {
				console.log(userName)
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
					toast.success("¡Tu usuario ha sido registrado!");
					toast("Hemos iniciado sesión por ti😎 ¡Comienza a explorar!",
						{
							duration: 5000,
						}
					);
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
				console.log("Actividad en selected_trip", viaje);
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
