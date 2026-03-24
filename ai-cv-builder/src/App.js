import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Upload from "./pages/Upload/Upload";
import DashboardLayout from './components/layout/dashboard/DashboardLayout';
import DashboardHome from './components/layout/dashboard/DashboardHome';
import CvBuilder from './pages/Cv_builder/cvbuilder';
import TemplateSamples from './pages/TemplateSamples/TemplateSamples';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="builder" element={<CvBuilder />} />
        <Route path="templates" element={<TemplateSamples />} />
      </Route>
    </Routes>
  );
}

export default App;
