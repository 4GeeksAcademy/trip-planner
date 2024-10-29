import React, { useState, useContext, useEffect } from "react"; // Importa useState
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import "../../styles/profile.css"


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
    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const updateUser = async (user) => {
        if (user.password !== user.passwordConfirm) {
            toast.error("Las contraseñas no coinciden")
            return;
        }
        const profileImageUrl = user.image ? await uploadImage(user.image) : null;
        await actions.updateUserProfile(user.name, user.userName, user.email, user.password, user.more_Info, profileImageUrl);
        actions.getUserData();
        navigate("/profile")
    }

    const uploadImage = async (image) => {
        const storage = getStorage();
        const storageRef = ref(storage, `imagenes_perfil/${image.name}`);
        const currentImageUrl = store.user?.profile_image_url;

        const expectedUrl = `https://firebasestorage.googleapis.com/v0/b/trippy-bucket.appspot.com/o/imagenes_perfil%2F${encodeURIComponent(image.name)}?alt=media`
        console.log(expectedUrl);
        if (currentImageUrl && currentImageUrl.split('&token=')[0] === expectedUrl) {
            console.log("La imagen no ha cambiado, no se subirá nuevamente.");
            return currentImageUrl;
        }
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
            toast.error("Error al cargar la imagen");
            return null;
        }
    }

    return (
        <>
            <div className="container">
                <div className="row gutters">
                    <div className="col-4" style={{ height: '450px' }}>
                        <div className="card h-100 w-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar mt-3">
                                            <img src={user.image ? URL.createObjectURL(user.image) : user.profileImageUrl || store.user?.profile_image_url}
                                                onClick={() => document.getElementById('imagenPerfil').click()}
                                            />
                                        </div>
                                        <div className="mb-2 d-flex flex-column">
                                            <input
                                                id="imagenPerfil"
                                                type="file"
                                                accept="image/*"
                                                className="form-control"
                                                style={{ display: 'none' }}
                                                onChange={(event) => setUser({
                                                    ...user,
                                                    image: event.target.files[0]
                                                })}
                                            />
                                        </div>
                                        <h5 className="user-name mt-2">{store.user.name}</h5>
                                        <h6 className="user-name">{store.user.username}</h6>
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
                                            <input
                                                className="form-control"
                                                placeholder="Ingresa tu nombre completo"
                                                onChange={(event) => setUser({
                                                    ...user,
                                                    name: event.target.value
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-1">
                                        <div className="form-group">
                                            <label>Nombre de Usuario</label>
                                            <input
                                                className="form-control"
                                                placeholder="Ingresa tu nombre de usuario"
                                                onChange={(event) => setUser({
                                                    ...user,
                                                    userName: event.target.value
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-1">
                                        <div className="form-group">
                                            <label>Correo Electrónico</label>
                                            <input
                                                className="form-control"
                                                placeholder="Ingresa tu correo electrónico"
                                                onChange={(event) => setUser({
                                                    ...user,
                                                    email: event.target.value
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-1">
                                        <div className="form-group">
                                            <label>Más información acerca de ti</label>
                                            <textarea
                                                className="form-control"
                                                style={{ height: '80px' }}
                                                onChange={(event) => setUser({
                                                    ...user,
                                                    more_Info: event.target.value
                                                })}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters mb-2">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-1">
                                        <h6 className="mb-2 text-primary text-danger">Nueva Contraseña</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-10 m-0 pe-1">
                                        <div className="form-group">
                                            <label >Contraseña</label>
                                            <div className="d-flex">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control"
                                                    onChange={(event) => setUser({
                                                        ...user,
                                                        password: event.target.value
                                                    })}
                                                />
                                                <button className="btn btn-dark ms-2" style={{ width: '60px' }}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >{showPassword ? (<i className="fa-solid fa-eye"></i>) : (<i className="fa-solid fa-eye-slash"></i>)}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-10 m-0 pe-2 ps-1">
                                        <div className="form-group">
                                            <label>Confirma la Contraseña</label>
                                            <div className="d-flex">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control"
                                                    onChange={(event) => setUser({
                                                        ...user,
                                                        passwordConfirm: event.target.value
                                                    })}
                                                />
                                                <button className="btn btn-dark ms-1" style={{ width: '60px' }}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >{showPassword ? (<i className="fa-solid fa-eye"></i>) : (<i className="fa-solid fa-eye-slash"></i>)}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="d-flex justify-content-end mt-2">
                                            <button className="btn btn-secondary me-2">Cancelar</button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => updateUser(user)}
                                            >Actualizar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
