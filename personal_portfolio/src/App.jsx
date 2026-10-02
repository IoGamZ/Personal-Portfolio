import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./pages/Home";
import { Skills } from "./pages/Skills";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Navbar } from "./components/Navbar";
import { StarBackground } from "./components/StarBackground";
import { Toaster } from "./components/UI/toaster"

function PortfolioLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarBackground />
      <Navbar />
      <main className="relative z-20">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<PortfolioLayout />}>
            <Route index element={<Home />} />
            <Route path="skills" element={<Skills />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;