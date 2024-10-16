import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Toaster } from 'react-hot-toast';

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar.js";

import { Footer } from "./component/footer";
import NewTrip from "./pages/addNewTrip";
import IndividualTrip from "./pages/individualTrip";
import Login from "./pages/login";
import Register from "./pages/register.js";
import Mexico from "./component/mexico.js";
import Brasil from "./component/brasil.js";
import Colombia from "./component/colombia.js";
import Peru from "./component/peru.js";
import RepublicaDominicana from "./component/republicadominicana.js";
import Argentina from "./component/argentina.js";

import Viajes from "./pages/viajes";
import TripDetail from "./component/tripDetail";
import TripScore from "./component/score";
import NewActivity from "./pages/addNewActivity.js";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<NewTrip />} path="/add-new-trip" />
                        <Route element={<IndividualTrip />} path="/individual-trip" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Viajes />} path="/viajes" />
                        <Route element={<TripDetail />} path="/details" />
                        <Route element={<TripScore />} path="/score" />
                        <Route element={<Mexico />} path="/mexico" />
                        <Route element={<Brasil/>} path="/brasil" />
                        <Route element={<Colombia/>} path="/colombia" />
                        <Route element={<Peru/>} path="/peru" />
                        <Route element={<RepublicaDominicana/>} path="/republica-dominicana" />
                        <Route element={<Argentina/>} path="/argentina" />
                        <Route element={<NewActivity/>} path="/add-activity" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
                <Toaster />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
