import { useState } from 'react'
import { userContext } from "./context/authContext";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  const [userstate, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const updateUser = (newUser) => {
    setUser(newUser);
  };
  const userData = { userstate, updateUser };

  const toggleTheme = () =>
    theme == "light" ? setTheme("dark") : setTheme("light");

  const themeData = {
    theme,
    toggleTheme,
  };

  return (
    <>
    <userContext.Provider value={userData}>
      <ThemeContext.Provider value={themeData}>
        <Header />
      </ThemeContext.Provider>
      <Main />
    </userContext.Provider>
    </>
  )
}

export default App
