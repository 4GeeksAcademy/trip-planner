import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import FirstView from "../component/firstview.js";
import AdventureSections from "../component/adventureSection.js";
import "../../styles/index.css";


export const Home = () => {

	return (
		<div className="PaginaPrincipal">
		<div className="">
			<div className="">
				<FirstView />
			</div>
			<div className="text-center">
				<AdventureSections />
			</div>
		</div>
		</div>
	);
};

export default Home;
