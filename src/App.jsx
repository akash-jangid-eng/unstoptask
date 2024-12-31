import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LogIn />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
