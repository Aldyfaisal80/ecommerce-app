import { Outlet } from "react-router-dom";
import Navbar from "../fragments/dashboard/Navbar";

export default function DashboardLayout() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-[#eeeef1] p-4 gap-4 font-poppins">
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}
