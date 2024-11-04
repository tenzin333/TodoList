import React,{useState} from 'react';
import {FaPizzaSlice} from "react-icons/fa";
import AddTask from '../AddTask';
import Logo from '../../assets/logo.svg';

const Header = ({darkMode,setDarkMode}) => {

    const [showAddTask,setShowAddTask] = useState(false);
    const [shouldShowMain,setShouldShowMain] = useState(false);
    const [showQuickAddTask,setShowQuickAddTask] = useState(false);


  return (
    <header className="header" data-testid="header">
        <nav>
            <div className='logo'>
                <img src={Logo} alt="TodoList" />
            </div >
            <div className="settings">
                <ul>
                    <li data-testid="quck-add-task-action" className="settings__add" onClick={() => {
                        setShowQuickAddTask(true);
                        setShouldShowMain(true);
                    }} >+</li>
                    <li data-testid="dark_mode_action" className='settings__darkmode' onClick={()=> setDarkMode(!darkMode)}><FaPizzaSlice/></li>
                </ul>
            </div>
            {showQuickAddTask && (
                <AddTask  
                showAddTaskMain={false}
               shouldShowMain={shouldShowMain}
               showQuickAddTask={showQuickAddTask}
               setShowQuickAddTask={setShowQuickAddTask}
               setShouldShowMain={setShouldShowMain}

                />
            )}
        </nav>
    </header>
  )
}

export default Header
