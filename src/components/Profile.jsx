// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import api from '../libs/api';
import ProfileEdit from './ProfileEdit';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await api.get('/api/user');
      const resData = response.data;
      if (!resData.code || resData.code != 200) {
        alert(resData.msg);
        return;
      }
      setProfile(resData.data);
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedProfile, setIsButtonDisabled) => {

    if (updatedProfile.username.length < 3 || updatedProfile.username.length > 20) {
      alert('用户名长度应在 3 到 20 个字符之间');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(updatedProfile.email)) {
      alert('请输入有效的邮箱');
      return;
    }
    const phoneRegex = /^(?:\+86)?1[3-9]\d{9}$/;
    if (!phoneRegex.test(updatedProfile.phone)) {
      alert('请输入有效的手机号');
      return;
    }
    const response = await api.put('/api/user/1', JSON.stringify(updatedProfile),{
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const resData = response.data;
    if (!resData.code || resData.code != 200) {
      alert(resData.msg);
      return;
    }

    setProfile(resData.data);
    setIsEditing(false);
    setIsButtonDisabled(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {isEditing ? (
        <ProfileEdit profile={profile} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div className="profile-card">
          <h2 className="profile-title">{profile.username}</h2>
          <p className="profile-info">Email: {profile.email}</p>
          <p className="profile-info">Phone: {profile.phone}</p>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
