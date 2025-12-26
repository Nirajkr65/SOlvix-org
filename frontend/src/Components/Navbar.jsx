import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../authSlice";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <nav className="sticky top-4 z-50 mx-4 lg:mx-auto lg:max-w-7xl rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 mb-8 sm:mb-0 transition-all duration-300">
            <div className="container mx-auto flex h-14 items-center justify-between px-2 sm:px-6">
                {/* Logo */}
                <div className="flex items-center gap-8">
                    <NavLink to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-black text-sm shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">SX</div>
                        <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:to-white transition-all">SOLVIX</span>
                    </NavLink>

                    <div className="hidden md:flex items-center gap-1">
                        {/* Admin Link - Desktop */}
                        {user?.role === "admin" && (
                            <NavLink
                                to="/admin"
                                className={({ isActive }) => `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                            >
                                Admin Area
                            </NavLink>
                        )}
                        <NavLink
                            to="/problems"
                            className={({ isActive }) => `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                        >
                            Problems
                        </NavLink>
                        <NavLink
                            to="/notebook"
                            className={({ isActive }) => `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                        >
                            Notebook
                        </NavLink>
                        <NavLink
                            to="/faq"
                            className={({ isActive }) => `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                        >
                            FAQ
                        </NavLink>
                    </div>
                </div>

                {/* User User Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="group relative">
                                <button className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] focus:outline-none">
                                    <span className="font-bold text-sm text-white">{user?.firstName?.[0]?.toUpperCase() || "U"}</span>
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-56 origin-top-right scale-95 opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 z-[100]">
                                    <div className="rounded-xl border border-white/10 bg-[#0d1117]/90 p-1 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none backdrop-blur-xl">
                                        <div className="px-3 py-2 border-b border-white/5 mb-1">
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Signed in as</p>
                                            <p className="text-sm font-medium text-white truncate">{user.firstName || user.name || "User"}</p>
                                        </div>
                                        <button
                                            className="cursor-pointer flex w-full items-center rounded-lg px-2 py-2 text-sm text-zinc-300 outline-none hover:bg-white/5 hover:text-white transition-colors gap-2 group/item"
                                            onClick={() => navigate(`/u/${user?.username || user?.firstName}`)}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover/item:shadow-[0_0_8px_#10b981] transition-shadow"></span>
                                            Profile
                                        </button>
                                        <div className="my-1 h-px bg-white/5" />
                                        <button
                                            className="cursor-pointer flex w-full items-center rounded-lg px-2 py-2 text-sm text-red-400 outline-none hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <NavLink to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                                Sign In
                            </NavLink>
                            <NavLink to="/signup" className="inline-flex h-9 items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-bold text-black shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300">
                                Get Started
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
