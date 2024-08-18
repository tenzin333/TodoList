import React, { useState } from "react";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useProjectsValue } from "../context";
import { generatePushID } from "../helpers";
import { useProjects } from "../hooks";

const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  let projectId = generatePushID();
  let userId = "ABC1";
  const { setProjects } = useProjectsValue();

  // Add a new document in collection "cities"
  const addProject = () => {
    projectName &&
      setDoc(doc(db, "projects", userId), {
        name: projectName,
        userId: userId,
        projectId,
      }).then(() => {
        setProjects([]);
        setProjectName("");
        setShow(false);
      });
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="add-project__name"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            data-testid="add-project__submit"
            onClick={addProject}
          >
            Add Project{" "}
          </button>
          <span
            className="add-project__cancel"
            onClick={() => setShow(false)}
            data-testid="hide-project-overlay"
          >
            Cancel
          </span>
        </div>
      )}

      <span className="add-project__plus" data-testid="add-project__add">
        +
      </span>
      <span
        className="add-project__text"
        data-testid="add-project__action"
        onClick={()=>setShow(!show)}
      >
        Add Project
      </span>
    </div>
  );
};

export default AddProject;
