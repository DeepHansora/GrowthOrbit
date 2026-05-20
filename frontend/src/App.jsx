import { Routes, Route } from "react-router-dom";
import MarketingLayout from "./layouts/MarketingLayout.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;

