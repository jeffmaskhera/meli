import React from 'react';


interface StarRatingProps {
    rating: number;
    totalQualification: number;
}

const StarsRating: React.FC<StarRatingProps> = ({ rating, totalQualification }) => {

    if (rating < 0 || rating > 5) {
        console.warn(`El valor de 'rating' (${rating}) está fuera del rango permitido (0-5). No se renderizarán las estrellas.`);
        return null; // No renderizar si el valor está fuera de rango
    }

    const stars = Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;

        // Determinar la clase de la estrella según el valor y la puntuación
        const getStarClass = (): string => {
            if (rating >= starValue) return "stars-qualify__star filled"; // Llena
            if (rating > starValue - 1 && rating < starValue) return "stars-qualify__star half"; // Mitad llena
            return "stars-qualify__star"; // Vacía
        };

        return <div key={index} className={getStarClass()}/>;
    });

    return (
        <div className="stars-qualify">
            <p>{rating}</p>
            {stars}
            <p>({totalQualification})</p>
        </div>
    );
};

export default StarsRating;
