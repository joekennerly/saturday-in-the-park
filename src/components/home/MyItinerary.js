import React, { useEffect, useState, useRef } from "react"

const MyItinerary = props => {
  console.log(props)
  let dialog = null
  const starttime = useRef()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState([])

  const toggleDialog = event => {
    let id = event.target.id
    setIsOpen(!modalIsOpen)
    fetch(`http://localhost:8000/itineraryitems/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kennywood_token")}`
      }
    })
      .then(response => response.json())
      .then((thing) => {
        console.log(thing.starttime)
        setTime()
      })

    if (modalIsOpen) {
      dialog.removeAttribute("open")
    } else {
      dialog.setAttribute("open", true)
    }
  }

  // create a state variable for itinerary items useState()
  const [itineraryList, setItineraryList] = useState([])

  // Create useEffect with annonomyous function

  const getItem = () => {
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
  }

  const updateItem = id => {
    fetch(`http://localhost:8000/itineraryitems/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kennywood_token")}`
      },
      body: JSON.stringify({})
    })
  }

  const deleteItem = id => {
    // Fetch data from localhost:8000/itineraryitems
    fetch(`http://localhost:8000/itineraryitems/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kennywood_token")}`
      }
    }).then(() => getItem())
  }

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

  useEffect(getItem, [])

  // Create HTML REPRESENTATION
  return (
    <>
      <dialog id="dialog--time" className="dialog--time">
        <label htmlFor="starttime">When do you want to ride?</label>
        <input
          ref={starttime}
          type="text"
          name="starttime"
          autoFocus
          required
          value={time}
        />

        <button>Update</button>

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
              <button
                onClick={() => {
                  if (window.confirm("Are you sure?"))
                    return deleteItem(item.id)
                }}
              >
                Delete
              </button>
              <button
                id={item.id}
                onClick={event => {
                  return toggleDialog(event)
                }}
              >
                Edit
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MyItinerary
