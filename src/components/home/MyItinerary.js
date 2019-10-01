import React, { useEffect, useState } from "react"


const MyItinerary = props => {
    // create a state variable for itinerary items useState()
    const [itineraryList, setItineraryList] = useState([])

    // Create useEffect with annonomyous function
    useEffect(() => {
        // Fetch data from localhost:8000/itineraryitems
        fetch("http://localhost:8000/itineraryitems", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
        // Convert to JSON
        .then(response => response.json())
        // Store in state variable
        .then(setItineraryList)

    }, [])
    // Create HTML REPRESENTATION
    return (
        <>
            <h2> What I Want to Do on Saturday</h2>
            <ul>
                {
                    itineraryList.map((item) => {
                        return <li>
                            { item.attraction.name } in { item.attraction.area.name} at { item.starttime }
                        </li>
                    })
                }
            </ul>
        </>
    )


}

export default MyItinerary