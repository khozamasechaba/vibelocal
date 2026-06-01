import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
