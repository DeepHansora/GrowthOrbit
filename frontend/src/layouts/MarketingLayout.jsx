import { Outlet } from "react-router-dom";

function MarketingLayout() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <Outlet />
    </main>
  );
}

export default MarketingLayout;

