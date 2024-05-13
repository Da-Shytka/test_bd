import React from 'react';

const ActorPopup = ({ actor }) => {
    return (
        <div className="popup-container">
            <img src={actor.actor_photo} alt={`Фото ${actor.actor_name}`} />
            <p>Имя: {actor.actor_name}</p>
            {actor.actor_dob && <p>Дата рождения: {actor.actor_dob}</p>}
            {actor.actor_social_media && <p>Ссылки на соцсети: {actor.actor_social_media}</p>}
        </div>
    );
};

export default ActorPopup;
