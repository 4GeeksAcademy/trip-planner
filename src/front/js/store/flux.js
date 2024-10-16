import toast from "react-hot-toast";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {},
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
			totalCost: [],
			selected_trip: [],
			activities: [
				{
					id: 1,
					name: "Cafecito",
					cost: 20,
					likes: 0,
					author: "LuisR",
					description: "Cafe oro. Horario de 9 am a 3 pm. tiene wifi",
					duration: "",
					imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOc7EaMLv5mZsW_kQ5PNCWvZjMDAP8kjwmVQ&s"
				},
				{
					id: 2,
					name: "Playa",
					cost: 20,
					likes: 0,
					author: "LuisR",
					description: "Cafe oro. Horario de 9 am a 3 pm. tiene wifi",
					duration: "",
					imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOc7EaMLv5mZsW_kQ5PNCWvZjMDAP8kjwmVQ&s"
				},
				{
					id: 3,
					name: "Parque",
					cost: 0,
					likes: 2,
					author: "LuisR",
					description: "Caminata en el parque. Horario de 6 am a 6 pm.",
					duration: "",
					imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QMAB9axRPNNiyX37JpBDrL6VZmU7zTG9cA&s"
				},
				{
					id: 4,
					name: "CCS Meat Co",
					cost: 180,
					likes: 1000,
					author: "LuisR",
					description: "Cafe oro. Horario de 9 am a 10 pm. tiene wifi",
					duration: "",
					imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuQNA-Q4I_Z68GX3XHx_CGKY7iBTYq4Z6hA&s"
				},
				{
					id: 5,
					name: "Restaurante",
					cost: 0,
					likes: 2,
					author: "LuisR",
					description: "Caminata en el parque. Horario de 6 am a 6 pm.",
					duration: "",
					imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QMAB9axRPNNiyX37JpBDrL6VZmU7zTG9cA&s"
				},
				{
					id: 6,
					name: "Teatro",
					cost: 0,
					likes: 2,
					author: "LuisR",
					description: "Caminata en el parque. Horario de 6 am a 6 pm.",
					duration: "",
					imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QMAB9axRPNNiyX37JpBDrL6VZmU7zTG9cA&s"
				},
				{
					id: 7,
					name: "Estadio",
					cost: 180,
					likes: 1000,
					author: "LuisR",
					description: "Cafe oro. Horario de 9 am a 10 pm. tiene wifi",
					duration: "",
					imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuQNA-Q4I_Z68GX3XHx_CGKY7iBTYq4Z6hA&s"
				},
				{
					id: 8,
					name: "Museo",
					cost: 180,
					likes: 1000,
					author: "LuisR",
					description: "Cafe oro. Horario de 9 am a 10 pm. tiene wifi",
					duration: "",
					imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuQNA-Q4I_Z68GX3XHx_CGKY7iBTYq4Z6hA&s"
				}
			],
			miembros: [
				{
					name: "Cesar",
			
				},
				{
					name: "Adriana",
			
				},
				{
					name: "Carlos",
			
				},
				{
					name: "Kevin",
			
				}
			]
		},
		actions: {
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
					toast.success("Logged in!");
				} else {
					toast.error("Invalid credentials");
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({
					token: null,
					user: {}
				});
				toast.success("Logged out!");
			},
			register: async (name, userName, email, password, number, more_info) => {
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
						number: number,
						more_info: more_info
					})
				});
				const data = await resp.json()
				console.log("Response Data:", data); // Agrega esta línea

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
					toast.success("User Logged in!");
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
				setStore({selected_trip: updateViajes});
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
			
		}

	};
};

export default getState;
