// import React, {Component} from "react"
import React from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import "./ItineraryBuilder.css"

const ItineraryBuilder = () => (
        <>
            <Route render={props => (
                <NavBar {...props} />
            )} />
            <ApplicationViews />
        </>
    )

export default ItineraryBuilder
