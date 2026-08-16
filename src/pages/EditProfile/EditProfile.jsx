import React, { useState, useEffect } from 'react';
import { subjects } from "../../utilities/subject";
import { myDetails, updateProfile } from '../../utilities/api';
import { getUser } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
    const user = getUser();
    const id = user ? user._id : null;
    const levels = [
        "Pri 1", "Pri 2", "Pri 3", "Pri 4", "Pri 5", "Pri 6",
        "Sec 1", "Sec 2", "Sec 3", "Sec 4",
    ];

    const [updatedProfile, setUpdatedProfile] = useState({
        experience: '',
        subjects: [],
        levels: [],
        location: 'North-East',
        showProfile: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        const fetchMe = async () => {
            try {
                const response = await myDetails(id);
                setUpdatedProfile({
                    experience: response.experience || '',
                    subjects: response.subjects || [],
                    levels: response.levels || [],
                    location: response.location || 'North-East',
                    showProfile: response.showProfile || false,
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchMe();
        return () => { };
    }, [id]);

    const handleSubjectChange = (subject) => {
        if (updatedProfile.subjects.includes(subject)) {
            setUpdatedProfile({
                ...updatedProfile,
                subjects: updatedProfile.subjects.filter((sub) => sub !== subject),
            });
        } else {
            setUpdatedProfile({
                ...updatedProfile,
                subjects: [...updatedProfile.subjects, subject],
            });
        }
    };

    const handleLevelChange = (level) => {
        if (updatedProfile.levels.includes(level)) {
            setUpdatedProfile({
                ...updatedProfile,
                levels: updatedProfile.levels.filter((lv) => lv !== level),
            });
        } else {
            setUpdatedProfile({
                ...updatedProfile,
                levels: [...updatedProfile.levels, level],
            });
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateProfile(updatedProfile, id);
            alert('Success!');
            navigate('/profile', { replace: true });
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='create-container'>
            <div className='form-wrapper'>
                <form onSubmit={handleSubmit} className='form'>
                    <h1>Edit Tutor Fields</h1>
                    <div className='form-group'>
                        <label htmlFor='experience'>Experience:</label>
                        <input
                            id='experience'
                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, experience: e.target.value })}
                            value={updatedProfile.experience}
                            type='number'
                            min={0}
                            max={20}
                        /> of years
                    </div>
                    <div className='form-group'>
                        <label>Subjects Taught:</label>
                        <div className='subjects'>
                            {subjects.map((subject) => (
                                <div key={subject} className='subject'>
                                    <input
                                        type='checkbox'
                                        id={subject}
                                        name={subject}
                                        value={subject}
                                        checked={updatedProfile.subjects.includes(subject)}
                                        onChange={() => handleSubjectChange(subject)}
                                    />
                                    <label htmlFor={subject}>{subject}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Levels Taught:</label>
                        <div className='subjects'>
                            {levels.map((level) => (
                                <div key={level} className='subject'>
                                    <input
                                        type='checkbox'
                                        id={level}
                                        name={level}
                                        value={level}
                                        checked={updatedProfile.levels.includes(level)}
                                        onChange={() => handleLevelChange(level)}
                                    />
                                    <label htmlFor={level}>{level}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='location'>Preferred Location:</label>
                        <select
                            id='location'
                            value={updatedProfile.location}
                            onChange={(e) => setUpdatedProfile({ ...updatedProfile, location: e.target.value })}
                        >
                            <option>North</option>
                            <option>North-East</option>
                            <option>Central</option>
                            <option>East</option>
                            <option>West</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='showProfile'>Available to teach:</label>
                        <input
                            id='showProfile'
                            type='checkbox'
                            checked={updatedProfile.showProfile}
                            onChange={(e) =>
                                setUpdatedProfile({ ...updatedProfile, showProfile: e.target.checked })
                            }
                        />
                    </div>
                    <button type='submit' className='submit-button'>Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
