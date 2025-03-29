import React, {ReactElement, ReactNode, useState} from "react";
import './FlipCard.css'; // Import the CSS file

interface FlipCardProps {
    children: ReactNode;
}

// Define the props for the front and back components
interface FlipCardChildProps {
    handleFlip: () => void;
}

// Card component that renders Front and Back from children
export const FlipCard = ({ children }: FlipCardProps) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped((prev) => !prev);
    };

    let front: ReactNode = null;
    let back: ReactNode = null;

    // Convert children to an array and assign to front/back
    const childrenArray = React.Children.toArray(children);
    if (childrenArray.length >= 2) {
        [front, back] = childrenArray;
    } else if (childrenArray.length === 1) {
        front = childrenArray[0];
    }

    // Pass the handleFlip function as a prop to Front and Back components
    return (
        <div
            className={`card ${flipped ? "flipped" : ""}`}
        >
            <div className="card-inner">
                {/* Front side */}
                <div className="card-front">
                    {React.isValidElement(front) &&
                        React.cloneElement(front as ReactElement<FlipCardChildProps>, {
                            handleFlip,
                        })}
                </div>
                {/* Back side */}
                <div className="card-back">
                    {React.isValidElement(back) &&
                        React.cloneElement(back as ReactElement<FlipCardChildProps>, {
                            handleFlip,
                        })}
                </div>
            </div>
        </div>
    );
};
