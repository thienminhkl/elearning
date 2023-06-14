import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import HomePlate from './templates/dashboard/HomePlate';
import AdminPlate from './templates/admin/AdminPlate';

//---------------------------------------------------------------------------------

export function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<HomePlate />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="detail">
            <Route path=":productID" element={<Detail />} />
          </Route>
          <Route path="courses" element={<Courses />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="search" element={<Search />}></Route>
        </Route>
        <Route path="/" element={<AdminPlate />}>
          <Route path="admin" element={<Admin />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

//---------------------------------------------------------------------------------

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Detail = lazy(() => import('./pages/Detail/Detail'));
const Register = lazy(() => import('./pages/Register/Register'));
const Search = lazy(() => import('./pages/Search/Search'));
const Courses = lazy(() => import('./pages/Courses/Courses'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
