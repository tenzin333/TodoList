import React from "react";
import { db } from "../firebase";
import { collection,doc,updateDoc,getFirestore } from "firebase/firestore";



const CheckBox = ({ id }) => {
  // const archivedTask = firebase.firestore().collection("tasks").doc(id).update({
  //   archived: true,
  // });    
  const archiveTask =()=> {
    updateDoc(doc(collection(db, "tasks"), id), {
      archived: true,
    });
  } 
  
  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
    >
      <span className="checkbox" />
    </div>
  );
};

export default CheckBox;
