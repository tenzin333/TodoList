import React,{useState}from "react";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import Sidebar from "./components/layout/Sidebar";
import "./App.scss";
import { SelectedProjectProvider, ProjectsProvider } from "./context";

const App = ({darkModeDefault=false}) => {
  const [darkMode,setDarkMode] = useState(darkModeDefault)
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div>
          <Header darMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </div>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};

export default App;
