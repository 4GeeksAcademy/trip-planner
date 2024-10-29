import React, { useState, useContext, useEffect } from "react"; // Importa useState
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import "../../styles/profile.css"
import "../../styles/index.css";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const Profile = () => {
    const { store, actions } = useContext(Context);
    const { image, setImage } = useState(null);
    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const registerUser = async (user) => {
        if (user.password !== user.passwordConfirm) {
            toast.error("Las contraseñas no coinciden")
            return;
        }
        const profileImageUrl = user.image ? await uploadImage(user.image) : null;
        await actions.register(user.name, user.userName, user.email, user.password, user.more_Info, profileImageUrl);
        // navigate("/viajes")
    }

    const uploadImage = async (image) => {
        const storage = getStorage();
        const storageRef = ref(storage, `imagenes_perfil/${image.name}`);

        const metadata = {
            contentType: image.type
        };
        try {
            const fileData = await uploadBytesResumable(storageRef, image, metadata);
            const downloadURL = await getDownloadURL(fileData.ref);
            console.log("Disponible en: ", downloadURL);

            return downloadURL;
        } catch (error) {
            toast.error("Error al cargar la imagen");
            return null;
        }

    }

    useEffect(() => {
        if (store.token) {
            // navigate("/");
        }
    }, [])

    return (
        <div className="PaginaPrincipal">
            <div className="container">
                <div className="row gutters">
                    <div className="col-4" style={{ height: '450px' }}>
                        <div className="card h-100 w-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar mt-3">
                                            <img src={store.user.profile_image_url || 'https://i.pinimg.com/550x/a8/0e/36/a80e3690318c08114011145fdcfa3ddb.jpg'} />
                                        </div>
                                        <h5 className="user-name mt-4">{store.user.name}</h5>
                                        <h6 className="user-email">{store.user.email}</h6>
                                    </div>
                                    <div className="about">
                                        <h5 className="mb-2 text-primary">Acerca de ti</h5>
                                        <p className="text-white">{store.user.more_info}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8" style={{ height: '450px' }}>
                        <div className="card h-100 w-100">
                            <div className="card-body">
                                <div className="row gutters mb-2">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">Información personal</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-1">
                                        <div className="form-group">
                                            <label>Nombre Completo</label>
                                            <input className="form-control" placeholder="Ingresa tu nombre completo" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-1">
                                        <div className="form-group">
                                            <label>Nombre de Usuario</label>
                                            <input className="form-control" placeholder="Ingresa tu nombre de usuario" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-1">
                                        <div className="form-group">
                                            <label>Correo Electrónico</label>
                                            <input className="form-control" placeholder="Ingresa tu correo electrónico" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-1">
                                        <div className="form-group">
                                            <label>Más información acerca de ti</label>
                                            <textarea
                                                className="form-control"
                                                style={{ height: '80px' }}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters mb-2">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-1">
                                        <h6 className="mb-2 text-primary text-danger">Contraseña</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label >Contraseña</label>
                                            <input className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Nueva Contraseña</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="d-flex justify-content-end mt-2">
                                            <button type="button" id="submit" name="submit" className="btn btn-secondary me-2">Cancelar</button>
                                            <button type="button" id="submit" name="submit" className="btn btn-primary">Actualizar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
