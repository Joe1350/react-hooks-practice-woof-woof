import React, { useEffect, useState } from "react";
import DogButton from "./DogButton";
import DogInfo from "./DogInfo";

function App() {
  const [dogs, setDogs] = useState([])
  const [selectedDog, setSelectedDog] = useState([])
  const [goodDogToggle, setGoodDogToggle] = useState(false)

  const dogsToDisplay = dogs.filter(dog => {
    if (goodDogToggle) {
      if (dog.isGoodDog) {
        return dog
      } else {
        return null
      }
    } else {
      return dog
    }
  })

  useEffect(() => {
    fetch('http://localhost:3001/pups')
    .then(r => r.json())
    .then(dogs => {
      setDogs(dogs)
      setSelectedDog(dogs[0])
    })
  }, [])

  function handleGoodDogFilter() {
    setGoodDogToggle(!goodDogToggle)
  }

  function handleShowDetailsClick(dogToShow) {
    setSelectedDog(dogToShow)
  }

  function handleGoodBadClick(dogToUpdate) {
    fetch(`http://localhost:3001/pups/${dogToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({isGoodDog: !dogToUpdate.isGoodDog})
    })
    .then(r => r.json())
    .then(updatedDog => setSelectedDog(updatedDog))
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button
          id="good-dog-filter"
          onClick={handleGoodDogFilter}  
        >
          Filter good dogs: {goodDogToggle ? 'ON' : 'OFF'}
        </button>
      </div>
      <div id="dog-bar">
        {dogsToDisplay.map(
          dog => (
            <DogButton
              key={dog.id}
              dog={dog}
              onShowDetailsClick={handleShowDetailsClick}
            />
          )
        )}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <DogInfo
            dog={selectedDog}
            onGoodBadClick={handleGoodBadClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
