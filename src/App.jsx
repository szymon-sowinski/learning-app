
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminApp from "./admin/AdminApp";
import "./App.css";


import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import MainPage from "./pages/MainPage";

const queryClient = new QueryClient();


function AppInner() {


  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
