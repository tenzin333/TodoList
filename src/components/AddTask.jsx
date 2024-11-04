import React, { useState } from "react";
import { FaRegCalendarAlt, FaRegListAlt } from "react-icons/fa";
import moment from "moment";
import { firebase, db } from "../firebase";
import { setDoc, doc,addDoc, collection  } from "firebase/firestore";
import { useSelectedProjectValue } from "../context";
import ProjectOverlay from "./ProjectOverlay";
import TaskDate  from './TaskDate';

const AddTask = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
  setShouldShowMain
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(showShouldMain);

  const [showTaskDate, setShowTaskDate] = useState(false);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
    }
 

    return (
      task &&
      projectId &&
      addDoc(collection(db, "tasks"), {
        archived: false,
        projectId,
        userId: "ABC1",
        task,
        date: collatedDate || taskDate,
      }).then(() => {
        setTask("");
        setTaskDate("");
        setProject("");
        setShowProjectOverlay(false);
        setShowQuickAddTask(false);
        setShowTaskDate(false);
        setShouldShowMain(false);
      }));
  };

  return (
    <div
      className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                >
                  x
                </span>
              </div>
            </>
          )}
          <ProjectOverlay 
            setProject={setProject}
            setShowProjectOverlay={setShowProjectOverlay}
            showProjectOverlay={showProjectOverlay}

          />
         <TaskDate  setShowTaskDate={setShowTaskDate} showTaskDate={showTaskDate} setTaskDate={setTaskDate}/>
          <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="add-task__content"
                data-testid="add-task-content"
                type="text"
          />
          <button 
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={()=>showQuickAddTask ? setShowQuickAddTask && addTask() : addTask()}
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span 
            onClick={()=>{
                setShowMain(false);
                setShowProjectOverlay(false);
            }}
            data-testid="add-task-cancel"
             className="add-task__cancel">
                Cancel
            </span>
          )}

          <span 
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={()=>setShowProjectOverlay(!showProjectOverlay)}
          >
            <FaRegListAlt/>
          </span>
          <span
          className="add-task__date"
          data-testid="show-task-overlay"
          onClick={()=> setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt/>
          </span>
        </div>
      )}
    </div>
  );
};

export default AddTask;
