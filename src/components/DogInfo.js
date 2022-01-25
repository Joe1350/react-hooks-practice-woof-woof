import React from "react";

function DogInfo({ dog, onGoodBadClick }) {
    let dogButton = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'

    return (
        <div>
            <img src={dog.image} alt={dog.name} />
            <h2>{dog.name}</h2>
            <button onClick={() => onGoodBadClick(dog)}>{dogButton}</button>
        </div>
    )
}

export default DogInfo;