const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
		user: null, 
	  },
	  actions: {
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},

		registerUser: async (newUser) => {
			try {
				const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newUser), 
				});
		
				if (resp.ok) {
					const data = await resp.json();
					console.log("User registered successfully:", data);
					setStore({ user: data });
					return data;
				} else {
					const errorData = await resp.json();
					console.log("Error registering user:", errorData.message);
					return false;
				}
			} catch (error) {
				console.error("Error registering user:", error);
				return false;
			}
		},
		
		
  
		loginUser: async (email, password) => {
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({ email, password }),
			});
			
  
			if (resp.ok) {
			  const data = await resp.json();
			  localStorage.setItem("token", data.token);
			  setStore({ user: data.user });
			  return data
			} else {
			  return false;
			}
		  } catch (error) {
			console.log("Error logging in user", error);
			return false;
		  }
		},
  
		logoutUser: () => {
		  localStorage.removeItem("token");
		  setStore({ user: null });
		},
  
		getMessage: async () => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
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
	  },
	};
  };
  
  export default getState;
  