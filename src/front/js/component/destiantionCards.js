import React from "react";
import "../../styles/destinationCards.css";
import { Link } from "react-router-dom";


const DestinationCards = () => {
    
    return(
        <div className="container destination-grid">
            <div className="card text-bg-dark border border-0 bg-transparent">
                <img src="https://blogskystorage.s3.amazonaws.com/2023/06/que-hacer-en-cancun.jpeg" className="card-img" alt="Cancún" />
                <div className="card-img-overlay">
                    <h5 className="card-title text-white">México</h5>
                    <p className="card-text text-white">Cancún</p>
                </div>
                <Link to="/mexico" className="stretched-link"></Link>
            </div>
            <div className="card text-bg-dark">
                <img src="https://c4.wallpaperflare.com/wallpaper/43/779/691/sugar-loaf-mountain-botafogo-beach-rio-de-janeiro-sunrise-wallpaper-preview.jpg" className="card-img" alt="Rio de Janeiro" />
                <div className="card-img-overlay">
                    <h5 className="card-title text-white">Brasil</h5>
                    <p className="card-text text-white">Rio de Janeiro</p>
                </div>
                <Link to="/brasil" className="stretched-link"></Link>
            </div>
            <div className="card text-bg-dark">
                <img src="https://www.medellin.travel/wp-content/uploads/2021/02/Guatape3-1.png" className="card-img" alt="Guatapé" />
                <div className="card-img-overlay">
                    <h5 className="card-title text-white">Colombia</h5>
                    <p className="card-text text-white">Guatapé</p>
                    <Link to="/colombia" className="stretched-link"></Link>
                </div>
            </div>
            <div className="card text-bg-dark">
                <img src="https://trexperienceperu.com/sites/default/files/llama_at_the_top_of_machu_picchu_trexperience.jpg" className="card-img" alt="Machu Picchu" />
                <div className="card-img-overlay">
                    <h5 className="card-title text-white">Perú</h5>
                    <p className="card-text text-white">Machu Picchu</p>
                    <Link to="/peru" className="stretched-link"></Link>
                </div>
            </div>
            <div className="card text-bg-dark">
                <img src="https://media.staticontent.com/media/pictures/83239c0a-50e5-44c5-bbb2-bea8292543e4" className="card-img" alt="Machu Picchu" />
                <div className="card-img-overlay">
                    <h5 className="card-title text-white">República Dominicana</h5>
                    <p className="card-text text-white">Punta Cana</p>
                    <Link to="/republica-dominicana" className="stretched-link"></Link>
                </div>
            </div>
            <div className="card text-bg-dark">
                <img src="https://humanidades.com/wp-content/uploads/2019/02/Buenos-aires-2-e1585704113704-800x416.jpg" className="card-img" alt="Machu Picchu" />
                <div className="card-img-overlay">
                    <h5 className="card-title text-white">Argentina</h5>
                    <p className="card-text text-white">Buenos Aires</p>
                    <Link to="/argentina" className="stretched-link"></Link>
                </div>
            </div>
            <div className="card text-bg-dark">
                <img src="https://lh3.googleusercontent.com/p/AF1QipNhZk2DRsQ4ifw1eybIT0X95HoNcqNdvaQc3Lbj=s680-w680-h510-rw" className="card-img" alt="Machu Picchu" />
                <div className="card-img-overlay">
                    <h5 className="card-title text-white">Aruba</h5>
                    <p className="card-text text-white">Natural Pool</p>
                    <Link to="/argentina" className="stretched-link"></Link>
                </div>
            </div>
            <div className="card text-bg-dark">
                <img src="https://images.ctfassets.net/m868ks80jg7q/3HmxNZZtEjGFyW6MxX5DAf/8b1c8c30574b7f720f4838e2c186030f/grote_knip.jpg?w=600&h=415&fm=webp&fit=fill&q=75" className="card-img" alt="Machu Picchu" />
                <div className="card-img-overlay">
                    <h5 className="card-title text-white">Curazao</h5>
                    <p className="card-text text-white">Grote Knip (Kenepa Grandi)</p>
                    <Link to="/argentina" className="stretched-link"></Link>
                </div>
            </div>
        </div>
    );
}

export default DestinationCards;