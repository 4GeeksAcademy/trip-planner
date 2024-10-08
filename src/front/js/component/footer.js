import React, { Component } from "react";
import logo from "../../img/logo-trippy.png"
import "../../styles/footer.css"

export const Footer = () => (
	<footer className="footer py-3 text-center">
		<div className="footer-items d-flex flex">
			<img src={logo} className="logo"/>
			<span className="text-footer d-flex flex">
			© Copyright
			</span>
		</div>
	</footer>
);
