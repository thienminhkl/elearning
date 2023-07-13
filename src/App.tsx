import './App.css';
//react
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
//templates
import HomePlate from './templates/dashboard/HomePlate';
import AdminPlate from './templates/admin/AdminPlate';

//---------------------------------------------------------------------------------

export function App() {
  return (
    <Routes>
      <Route path="" element={<HomePlate />}>
        <Route index element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="search">
          <Route path=":textSearch" element={<Search />} />
        </Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="detail">
          <Route path=":detailID" element={<Detail />} />
        </Route>
        <Route path="courses" element={<Courses />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
      <Route path="/" element={<AdminPlate />}>
        <Route path="admin" element={<Admin />}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
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
const Search = lazy(() => import('./pages/Search/Search'));
const Register = lazy(() => import('./pages/Register/Register'));
const Courses = lazy(() => import('./pages/Courses/Courses'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
