import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

import Map from "./pages/Map";
import MapRecordList from "./features/map/MapRecordList";
import MapRecord from "./features/map/MapRecord";
import MapRecordForm from "./features/map/MapRecordForm";

import Profile from "./pages/Profile";
import ProfileAbout from "./features/profile/ProfileAbout";
import ProfileDetails from "./features/profile/ProfileDetails";
import ProfileFriends from "./features/profile/ProfileFriends";
import ProfileSetting from "./features/profile/ProfileSetting";

import { RecordsProvider } from "./contexts/RecordsContext";
import { SearchProvider } from "./contexts/SearchContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RecordsProvider>
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Homepage />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Singup />} />

                <Route
                  path="map"
                  element={
                    <ProtectedRoute>
                      <Map />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<MapRecordList />} />
                  <Route path="/map/:id" element={<MapRecord />} />
                  <Route path="form" element={<MapRecordForm />} />
                </Route>

                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<ProfileAbout />} />
                  <Route path="about" element={<ProfileAbout />} />
                  <Route path="details" element={<ProfileDetails />} />
                  <Route path="friends" element={<ProfileFriends />} />
                  <Route path="setting" element={<ProfileSetting />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </RecordsProvider>
    </AuthProvider>
  );
}

export default App;
