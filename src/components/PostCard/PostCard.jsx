import React, { useState } from "react";
import Stalking from "../Stalking/Stalking";
import "./PostCard.css";

const PostCard = (props) => {
  const { post, role } = props;
  const [showProfile, setShowProfile] = useState(null);

  const handleApplicantClick = (appId) => {
    setShowProfile(appId);
  };

  const handleProfileClose = () => {
    setShowProfile(null);
  };

  return (
    <div className="post-card-body">
      <h3 className="post-title">{post.title}</h3>

      <dl className="post-meta">
        <div className="post-meta-row">
          <dt>Posted By</dt>
          <dd>{post.createdBy.name}</dd>
        </div>
        <div className="post-meta-row">
          <dt>Level</dt>
          <dd>{post.level}</dd>
        </div>
        <div className="post-meta-row">
          <dt>Location</dt>
          <dd>{post.location}</dd>
        </div>
      </dl>

      <div className="post-subjects">
        {post.subjects.map((subject, idx) => (
          <span key={idx} className="tag">{subject}</span>
        ))}
      </div>

      {role === 'parent' && (
        <div className="applicants-section">
          <h4 className="applicants-title">Applicants</h4>
          {post.applicants.length > 0 ? (
            <div className="applicants-list">
              {post.applicants.map((app, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="applicant-name"
                  onClick={() => handleApplicantClick(app.id)}
                >
                  {app.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="applicants-empty">No applicants yet</p>
          )}

          {showProfile && (
            <div className="modal-backdrop" onClick={handleProfileClose}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <Stalking id={showProfile} onClose={handleProfileClose} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
