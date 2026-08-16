import React, { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import { getUser } from "../../utilities/users-service";
import { tutorApplication } from "../../utilities/api";
import './SearchPage.css'
import PostCard from "../PostCard/PostCard";

const SearchPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySearch, setDisplaySearch] = useState([]);
  const currentUser = getUser()

  useEffect(() => {
        setDisplaySearch(props.showClient);
     }, [props.showClient]);

  function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    console.log(searchTerm)
    const output = props.showClient.filter((item) => {
      return (
        (item.title && item.title.toLowerCase().includes(searchTerm)) ||
        (item.subjects && item.subjects.some((subject) => subject.toLowerCase().includes(searchTerm))) ||
        (item.levels && item.levels.some((levels) => levels.toLowerCase().includes(searchTerm))) ||
        (item.level && item.level.toLowerCase().includes(searchTerm)) ||
        (item.location && item.location.toLowerCase().includes(searchTerm)) ||
        (item.name && item.name.toLowerCase().includes(searchTerm)) ||
        (item.experience && item.experience.toString().includes(searchTerm))
      );
    });
    setDisplaySearch(output);
  }

  async function handleApplication(postId) {
    const applicant = {
      id: currentUser._id,
      name: currentUser.name
    }

    try {
      await tutorApplication(postId, applicant)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="search-page-container">
      <div className="search-bar">
        <input
          className="search-input"
          placeholder={props.type === "parent" ? "Search tutors by name, subject or location" : "Search posts by title, subject, level or location"}
          type="search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <p className="search-count">
          {displaySearch.length} {displaySearch.length === 1 ? "result" : "results"}
        </p>
      </div>

      {displaySearch.length === 0 && (
        <p className="search-empty">
          {searchTerm ? `No matches for "${searchTerm}".` : "Nothing to show here yet."}
        </p>
      )}

      {displaySearch.map((item, index) => {
        if (props.type === "parent") {
          return (
            <div className="profile-card" key={index}>
              <ProfileCard profile={item} role={item.role}/>
            </div>
          );
        } else if (props.type === "tutor") {
          const hasApplied = item.applicants.some(applicant => applicant.id === currentUser._id);
          return (
            <div className={`post-card ${hasApplied ? 'applied-post' : ''}`} key={index}>
              <PostCard post={item} role={props.type}/>
              {hasApplied ? (
                <p className="applied-badge">Applied</p>
              ) : (
                <button className="apply-button" onClick={() => handleApplication(item._id)}>Apply</button>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default SearchPage;
