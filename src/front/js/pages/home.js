import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-12 text-center">
                    <h1 className="display-3">Welcome to this super login app!</h1>
                    <p><Link to="/login" className="btn btn-success">Login</Link> | <Link to="/signup" className="btn btn-success">Register</Link> </p>
                </div>
            </div>
        </div>
    </div>
	);
};
