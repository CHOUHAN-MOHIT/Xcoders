import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Contests from "./pages/Contests";
import Problem from "./pages/Problem";
import Login from "./components/Login";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="problems"
            element={
              <ProtectedRoute>
                <Problems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/:id"
            element={
              <ProtectedRoute>
                <Problem />
              </ProtectedRoute>
            }
          />
          <Route
            path="contests"
            element={
              <ProtectedRoute>
                <Contests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
