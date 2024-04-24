import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Pageloader from "./components/Pageloader";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Pageloader />
      ) : (
        <>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Index toast={toast} loading={setLoading} />}
              />
              <Route
                path="/signup"
                element={<Signup toast={toast} loading={setLoading} />}
              />
              <Route
                path="/verify"
                element={<Verify toast={toast} loading={setLoading} />}
              />
              <Route
                path="/register"
                element={<Register toast={toast} loading={setLoading} />}
              />
              <Route
                path="/login"
                element={<Login toast={toast} loading={setLoading} />}
              />
              <Route
                path="/forgotpassword"
                element={<Forgotpassword toast={toast} loading={setLoading} />}
              />
              <Route
                path="/deleteaccount"
                element={<Index toast={toast} loading={setLoading} />}
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute toast={toast} loading={setLoading}>
                    <Home toast={toast} loading={setLoading} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute toast={toast} loading={setLoading}>
                    <Profile toast={toast} loading={setLoading} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
