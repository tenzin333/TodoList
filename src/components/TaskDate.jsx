import React from "react";
import moment from "moment";
import { FaRegPaperPlane, FaSpaceShuttle ,FaSun} from "react-icons/fa";

const TaskDate = ({ showTaskDate, setShowTaskDate, setTaskDate }) => {
  return (
    showTaskDate && (
      <div className="task-date" data-testid="task-date-overlay">
        <ul className="task-date__list">
          <li
            onClick={() => {
              setTaskDate(moment().format("DD/MM/YYYY"));
              setShowTaskDate(false);
            }}
            data-testid="task-date-overlay"
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </li>
          <li
            onClick={() => {
              setTaskDate(moment().add(1, "days").format("DD/MM/YYYY"));
              setShowTaskDate(false);
            }}
            data-testid="task-date-tomorrow"
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </li>
          <li
            onClick={() => {
              setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
              setShowTaskDate(false);
            }}
            data-testid="task-date-next-week"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next 7 days</span>
          </li>
        </ul>
      </div>
    )
  );
};

export default TaskDate;
