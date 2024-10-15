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
			viaje: []
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
			// register : async(name, username, email, password, number, more_info) =>{
			// },
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

			addViajes: (viaje) => {
				const store = getStore();
				const actions = getActions();
				const result = actions.isViaje(viaje)
				if (result) {
					actions.deleteViaje(viaje)
				} else {
					setStore({
						viajes: [...store.viajes, viaje]
					});
				}
					console.log(viajes);
			},

			deleteViaje: (viaje) => {
				const store = getStore();
				const updateViajes = store.viajes.filter(item => viaje.name !== item.name);
				setStore({viajes: updateViajes});
			},

			isViaje: (viaje) => {
				const store = getStore();
				const result = store.viajes.some(item => viaje.id == item.id && viaje.type == item.type)
				return result
			},
		}

	};
};

export default getState;
