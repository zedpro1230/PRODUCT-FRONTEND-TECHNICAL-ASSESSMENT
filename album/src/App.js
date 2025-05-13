import "./App.css";
import "./output.css";
import AlbumPage from "./pages/AlbumPage";
import AlbumDetail from "./pages/AlbumDetail";
import UserPage from "./pages/UserPage";
import UserDetail from "./pages/UserDetail";
import ErrorPage from "./pages/ErrorPage";

import { DataContextProvider } from "./context/DataContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <DataContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/albums?pageSize=20&current=1" replace />}
          />
          <Route path="/albums" element={<AlbumPage />} />
          <Route path="/albums/:id" element={<AlbumDetail />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </DataContextProvider>
  );
}

export default App;
