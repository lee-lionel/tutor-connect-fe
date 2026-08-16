import React, { useState } from "react";
import { subjects } from "../../utilities/subject";
import { createPost } from "../../utilities/api";
import { getUser } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const user = {
    id: getUser()._id,
    name: getUser().name,
  };

  const [userInput, setUserInput] = useState({
    createdBy: user,
    title: "",
    subjects: [],
    level: "Pri 1",
    location: "North",
  });

  const navigate = useNavigate();

  const handleSubjectChange = (subject) => {
    if (userInput.subjects.includes(subject)) {
      setUserInput({
        ...userInput,
        subjects: userInput.subjects.filter((sub) => sub !== subject),
      });
    } else {
      setUserInput({
        ...userInput,
        subjects: [...userInput.subjects, subject],
      });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createPost(userInput);
      alert('Post created!');
      setUserInput({
        createdBy: user,
        title: "",
        subjects: [],
        level: "Pri 1",
        location: "North",
      });
      navigate('/profile', { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Create Post</h1>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
          className="title"
            id="title"
            value={userInput.title}
            onChange={(e) =>
              setUserInput({ ...userInput, title: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="level">Level:</label>
          <select
            id="level"
            onChange={(e) =>
              setUserInput({ ...userInput, level: e.target.value })
            }
            value={userInput.level}
          >
            <option>Pri 1</option>
            <option>Pri 2</option>
            <option>Pri 3</option>
            <option>Pri 4</option>
            <option>Pri 5</option>
            <option>Pri 6</option>
            <option>Sec 1</option>
            <option>Sec 2</option>
            <option>Sec 3</option>
            <option>Sec 4</option>
          </select>
        </div>

        <div className="form-group">
          <label>Subjects:</label>
          <div className="subjects">
            {subjects.map((subject) => (
              <div key={subject} className="subject">
                <input
                  type="checkbox"
                  id={subject}
                  name={subject}
                  value={subject}
                  checked={userInput.subjects.includes(subject)}
                  onChange={() => handleSubjectChange(subject)}
                />
                <label htmlFor={subject}>{subject}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            value={userInput.location}
            onChange={(e) =>
              setUserInput({ ...userInput, location: e.target.value })
            }
          >
            <option>North</option>
            <option>North-East</option>
            <option>Central</option>
            <option>East</option>
            <option>West</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
