import React, { useEffect } from 'react';
import CheckBox from '../CheckBox';
import { useTasks } from '../../hooks';
import { collatedTasks } from '../../constants';
import {getTitle,getCollatedTitle,collatedTasksExist} from '../../helpers'
import { useProjectsValue, useSelectedProjectValue } from '../../context';
import AddTask from '../AddTask';


const Tasks = () => {
    const {selectedProject} = useSelectedProjectValue();
    const {projects} = useProjectsValue();
    const {tasks} = useTasks(selectedProject);

    
    let projectName="";

    
    if (collatedTasksExist(selectedProject) && selectedProject) {
        projectName =  getCollatedTitle(collatedTasks, selectedProject).name;
      }
    
      if (
        projects && 
        projects.length > 0 &&
        selectedProject &&
        !collatedTasksExist(selectedProject)
      ) {
        projectName = getTitle(projects, selectedProject).name;
      }

    useEffect(()=>{
        document.title= `${projectName}: TodoList`;
    })


  return (
    <div className="tasks" data-testid="tasks">
        <h2 data-testid="project-name">{projectName}</h2>
        <ul className="tasks__list">
            {tasks.map(item=>(
                <li key={`${item.id}`}>
                    <CheckBox id={item.id} />
                    <span>{item.task}</span>
                </li>
            ))}
           {<AddTask showAddTaskMain={true}/>

            }

            
           

        </ul>
      
    </div>
  )
}

export default Tasks
