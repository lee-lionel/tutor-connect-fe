import React from 'react'
import './ProfileCard.css'

const ProfileCard = (props) => {
  const { profile, role } = props

  if (!profile || !profile.subjects || !profile.levels) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="profile-card-body">
      <header className="profile-header">
        <div className="profile-avatar" aria-hidden="true">
          {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
        </div>
        <div className="profile-identity">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-email">{profile.email}</p>
        </div>
        {role === 'tutor' && <span className="profile-role">Tutor</span>}
      </header>

      <div className="tutor-info" style={{ display: role === 'tutor' ? 'block' : 'none' }}>
        <p className="profile-experience">
          <span className="profile-stat-value">{profile.experience || '-NA-'}</span>
          <span className="profile-stat-label">years of tutoring experience</span>
        </p>

        <h3 className="profile-section-title">Subjects Taught</h3>
        <div className="profile-subjects">
          {profile.subjects.length > 0 ? profile.subjects.map((subject, idx) => (
            <span key={idx} className="profile-subject">{subject}</span>
          )) : <span className="profile-none">-NA-</span>}
        </div>

        <h3 className="profile-section-title">Levels Taught</h3>
        <div className="profile-levels">
          {profile.levels.length > 0 ? profile.levels.map((level, idx) => (
            <span key={idx} className="profile-level">{level}</span>
          )) : <span className="profile-none">-NA-</span>}
        </div>

        <h3 className="profile-section-title">Preferred Location</h3>
        <p className="profile-location">{profile.location || '-NA-'}</p>
      </div>
    </div>
  )
}

export default ProfileCard
