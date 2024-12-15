// src/components/ProfileEdit.js
import React, { useState, useEffect } from 'react';

const ProfileEdit = ({ profile, onSave,onCancel }) => {
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    e.preventDefault();
    onSave(editedProfile,setIsButtonDisabled);
  };

  return(
    <div className="profile-edit-card">
      <h2 className="profile-edit-title">Edit Profile</h2>
      <input
        className="profile-input"
        type="text"
        name="username"
        value={editedProfile.username}
        onChange={handleChange}
        autoComplete='off'
      />
      <input
        className="profile-input"
        type="email"
        name="email"
        value={editedProfile.email}
        onChange={handleChange}
      />
      <input
        className="profile-input"
        type="text"
        name="phone"
        value={editedProfile.phone}
        onChange={handleChange}
      />
      <button className={`${isButtonDisabled ? 'disable-button' : 'save-button'}`} onClick={handleSubmit} disabled={isButtonDisabled}>保存</button>
      <button className="cancel-button" onClick={onCancel}>关闭</button>
    </div>
  )

};

export default ProfileEdit;
