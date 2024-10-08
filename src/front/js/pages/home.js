import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import {Navbar} from "../component/navbar.js";
import FirstView from "../component/firstview.js";
import DestinationCards from "../component/destiantionCards.js";
import AdventureSections from "../component/adventureSection.js";
import ShoppingCart from "../component/shoppingCart.js"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="">
			<div>
				<div id="landing" className= "p-5 mb-5">
					<Navbar />
					<FirstView />
				</div>
			</div>
			<div className="text-center mt-5">
				<DestinationCards />
				<AdventureSections />
			</div>
		</div>
	);
};
