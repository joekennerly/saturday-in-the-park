import React, { useEffect, useState } from "react"

const MyItinerary = props => {
  let dialog = null
  const [modalIsOpen, setIsOpen] = useState(false)

  const toggleDialog = () => {
    setIsOpen(!modalIsOpen)

    if (modalIsOpen) {
      dialog.removeAttribute("open")
    } else {
      dialog.setAttribute("open", true)
    }
  }
  // create a state variable for itinerary items useState()
  const [itineraryList, setItineraryList] = useState([])

  // Create useEffect with annonomyous function
  useEffect(() => {
    // Fetch data from localhost:8000/itineraryitems
    fetch("http://localhost:8000/itineraryitems", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kennywood_token")}`
      }
    })
      // Convert to JSON
      .then(response => response.json())
      // Store in state variable
      .then(setItineraryList)
  }, [])

  useEffect(() => {
    dialog = document.querySelector("#dialog--time")

    const handler = e => {
      // Close all dialogs when ESC is pressed, and close search field
      if (e.keyCode === 27) {
        if (modalIsOpen) {
          toggleDialog()
        }
      }
    }

    window.addEventListener("keyup", handler)
    return () => window.removeEventListener("keyup", handler)
  })

  const deleteItem = id => {
    console.log(`ITEM ID = ${id}`)
    // Fetch data from localhost:8000/itineraryitems
    // fetch(`http://localhost:8000/itineraryitems/{id}`, {
    //     "method": "DELETE",
    //     "headers": {
    //         "Accept": "application/json",
    //         "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
    //     }
    // })
  }

  // Create HTML REPRESENTATION
  return (
    <>
      <dialog id="dialog--time" className="dialog--time">
        <label htmlFor="starttime">Are you sure you would like to delete this item</label>
        <button onClick={(item)=>deleteItem(item.id)}>Yes</button>
        <button onClick={toggleDialog}>No</button>

        <button
          style={{
            position: "absolute",
            top: "0.25em",
            right: "0.25em"
          }}
          id="closeBtn"
          onClick={toggleDialog}
        >
          X
        </button>
      </dialog>
      <h2> What I Want to Do on Saturday</h2>
      <ul>
        {itineraryList.map(item => {
          return (
            <li key={item.id}>
              {item.attraction.name} in {item.attraction.area.name} at{" "}
              {item.starttime}
              <button onClick={(item) => toggleDialog()}>
                Delete {item.id}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MyItinerary
