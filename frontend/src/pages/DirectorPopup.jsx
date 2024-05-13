import React from 'react';

const DirectorPopup = ({ director }) => {
    return (
        <div className="popup-container">
            <img src={director.director_photo} alt={`Фото ${director.director_name}`} />
            <p>Имя: {director.director_name}</p>
            {director.director_dob && <p>Дата рождения: {director.director_dob}</p>}
            {director.director_social_media && <p>Ссылки на соцсети: {director.director_social_media}</p>}
            <p>Роль: {director.director_role}</p>
        </div>
    );
};

export default DirectorPopup;
