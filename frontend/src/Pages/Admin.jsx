import {Plus,
  Pencil,
  Trash,
  Video,
  Users,
  UserPlus,
  Settings,
  LayoutDashboard,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { NavLink } from "react-router";

export default function Admin() {
  const adminOptions = [
    {
      id: "create",
      title: "Create Problem",
      description: "Craft a new challenge for the coding arena.",
      icon: Plus,
      color: "from-emerald-400 to-emerald-600",
      shadow: "shadow-emerald-500/20",
      route: "/admin/create",
    },
    {
      id: "update",
      title: "Update Problem",
      description: "Fine-tune existing challenges and test cases.",
      icon: Pencil,
      color: "from-amber-400 to-amber-600",
      shadow: "shadow-amber-500/20",
      route: "/admin/update",
    },
    {
      id: "delete",
      title: "Delete Problem",
      description: "Remove obsolete challenges from the platform.",
      icon: Trash,
      color: "from-rose-400 to-rose-600",
      shadow: "shadow-rose-500/20",
      route: "/admin/delete",
    },
    {
      id: "video",
      title: "Upload Video",
      description: "Enrich problems with video editorials.",
      icon: Video,
      color: "from-blue-400 to-blue-600",
      shadow: "shadow-blue-500/20",
      route: "/admin/video",
    },
    {
      id: "videoLibrary",
      title: "Video Library",
      description: "Curate the collection of educational content.",
      icon: LayoutDashboard,
      color: "from-pink-400 to-pink-600",
      shadow: "shadow-pink-500/20",
      route: "/admin/video-library",
    },
    {
      id: "admincreate",
      title: "Create Admin",
      description: "Grant administrative privileges to new users.",
      icon: UserPlus,
      color: "from-purple-400 to-purple-600",
      shadow: "shadow-purple-500/20",
      route: "/admin/register",
    },
    {
      id: "manageUsers",
      title: "Manage Users",
      description: "Oversee user base and platform activity.",
      icon: Users,
      color: "from-indigo-400 to-indigo-600",
      shadow: "shadow-indigo-500/20",
      route: "/admin/manageUsers",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-400 tracking-wider uppercase">
                Control Center
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-3 text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Manage challenges, curate content, and oversee the <span className="text-white font-medium">SOLVIX</span> ecosystem with precision.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-pointer group">
                <Settings className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Settings</span>
             </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminOptions.map((option) => {
            const Icon = option.icon;
            
            return (
              <NavLink
                to={option.route}
                key={option.id}
                className="group relative"
              >
                {/* Card Glow Effect */}
                <div className={`absolute -inset-0.5 bg-linear-to-br ${option.color} rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition duration-500 group-hover:duration-200`} />
                
                {/* Card Content */}
                <div className="relative h-full p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col overflow-hidden">
                  
                  {/* Subtle Grid Background inside Card */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)] pointer-events-none" />

                  <div className="relative z-10 flex-1">
                    {/* Header: Icon & Title */}
                    <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-xl bg-linear-to-br ${option.color} ${option.shadow} transform group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/20`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <Sparkles className="w-5 h-5 text-white/5 opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform rotate-12" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-white group-hover:to-zinc-400 group-hover:bg-clip-text transition-all">
                      {option.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                      {option.description}
                    </p>
                  </div>

                  {/* Footer: Action Link */}
                  <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                    <span>Manage now</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
