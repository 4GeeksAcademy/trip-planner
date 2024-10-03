import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import DestinationCards from "../component/destiantionCards.js";
import AdventureSections from "../component/adventureSection.js";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container m-auto">
			<div className="text-center mt-auto">
				<DestinationCards />
				<AdventureSections />
			</div>
		</div>
	);
};
