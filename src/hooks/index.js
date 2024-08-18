import { useState, useEffect } from "react";
import { firebase, db } from "../firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
// Use Firestore (db) and Auth (auth) in your components or hooks

import { collatedTasksExist } from "../helpers";
import moment from "moment";

//custom hooks
export const useTasks = ( selectedProject ) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    // let unsubscribe = firebase.firestore()
    // .collection('tasks')
    // .where('userId','==','ABC1');

    let q = query(collection(db,'tasks'), where("userId", "==", "ABC1"));

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      q = query(q, where("projectId", "==", selectedProject));
    } else if (selectedProject === "TODAY") {
      q = query(q, where("date", "==", moment().format("DD/MM/YYYY")));
    } else if (selectedProject === "INBOX" || selectedProject === 0) {
      q = query(q, where("date", "==", ""));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (task) =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived === true));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

// const selectedProject=1;
// const {tasks,archivedTasks} = useTasks(selectedProject);

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     firebase
//       .firestore()
//       .collection("projects")
//       .where("userId", "==", "ABC1")
//       .orderBy("projectId")
//       .get()
//       .then((snapshot) => {
//         const allProjects = snapshot.docs.map((project) => ({
//           ...project.data(),
//           docId: project.id,
//         }));

//         if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
//           setProjects(allProjects);
//         }
//       });
//   }, [projects]);

        useEffect(()=>{
                let q = query(collection(db,'projects'),where("userId","==","ABC1"),orderBy('projectId'));

                getDocs(q).then((snapshot) => {
                    const allProjects = snapshot.docs.map((project)=>({
                        ...project.data(),
                        docId:project.id
                    }))
                    if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                        setProjects(allProjects);
                      }
                })
        },[projects]);
  return { projects, setProjects };
};
