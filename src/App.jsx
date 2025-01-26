import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { TaskProvider } from "./contexts/TaskContext.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import SharedTask from "./pages/SharedTask.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

function App() {
  return (
    <>
      <Toaster />
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/shared-task/:taskId" element={<SharedTask />} />
            </Routes>
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
