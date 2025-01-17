import  { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute ";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import userContext from "./context/userContext";


const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);

  const validateUser = () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(accessToken);
      const email = decoded.sub;
      setIsAuthenticated(true);
      setEmail(email);
    } catch (error) {
      // console.error("Invalid or expired token:", error.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* <AuthProvider> */}
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/auth/register" element={<SignUp />} />
              <Route path="/auth/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <userContext.Provider value={email}>
                      <Home />
                    </userContext.Provider>
                  </ProtectedRoute>
                }
              />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Router>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
