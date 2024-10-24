import React, { useState, useContext, useEffect } from "react"; // Importa useState
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

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

const Register = () => {
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
        navigate("/")
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
            navigate("/");
        }
    }, [])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="rounded shadow-lg p-4 bg-dark" style={{ width: '450px' }}>
                    <h1 className="text-center text-light">Crea una cuenta</h1>
                    <div className="mb-1 d-flex flex-column justify-content-center">
                        <label className="form-label text-light">Imagen de perfil</label>
                        <img
                            src={user.image ? URL.createObjectURL(user.image) : user.profileImageUrl || 'https://i.pinimg.com/550x/a8/0e/36/a80e3690318c08114011145fdcfa3ddb.jpg'}
                            className="rounded-3 mx-auto"
                            style={{ width: '150px', cursor: 'pointer' }}
                            onClick={() => document.getElementById('imagenPerfil').click()} // Activa el input de archivo
                        />
                    </div>
                    <div className="mb-3 d-flex flex-column">
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

                    <div className="mb-3">
                        <label className="form-label text-light">Nombre completo</label>
                        <input
                            className="form-control"
                            onChange={(event) => setUser({
                                ...user,
                                name: event.target.value
                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Nombre de usuario</label>
                        <input
                            className="form-control"
                            onChange={(event) => setUser({
                                ...user,
                                userName: event.target.value
                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="email@example.co"
                            className="form-control"
                            onChange={(event) => setUser({
                                ...user,
                                email: event.target.value
                            })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Contraseña</label>
                        <div className="d-flex">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                onChange={(event) => setUser({
                                    ...user,
                                    password: event.target.value
                                })}
                            />
                            <button className="btn btn-dark ms-1" style={{ width: '60px' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >{showPassword ? (<i className="fa-solid fa-eye"></i>) : (<i className="fa-solid fa-eye-slash"></i>)}</button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-light">Confirma la contraseña</label>
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
                    <label className="form-label text-light">Más información acerca de ti</label>
                    <div className="form-floating mb-3">
                        <textarea
                            className="form-control"
                            style={{ height: '100px' }}
                            onChange={(event) => setUser({
                                ...user,
                                more_Info: event.target.value
                            })}
                        ></textarea>
                    </div>
                    <button
                        onClick={() => registerUser(user)}
                        className="btn btn-primary w-100 mt-2"
                    >
                        Registrar
                    </button>
                    <div className="d-flex justify-content-start opacity-50 mt-2">
                        <Link to="/" className="btn btn-secondary mt-2 d-flex align-items-center rounded-3">
                            <i className="fa-solid fa-circle-chevron-left me-2"></i> Inicio
                        </Link>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Register;
