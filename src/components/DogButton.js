import React from "react";

function DogButton({ dog, onShowDetailsClick }) {
    return (
        <span onClick={() => onShowDetailsClick(dog)}>{dog.name}</span>
    )
}

export default DogButton;
