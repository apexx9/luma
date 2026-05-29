"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { 
  LayoutGrid, 
  Users, 
  Building2, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  ShieldCheck, 
  ShieldAlert,
  ChevronRight,
  Activity,
  UserCheck,
  Building,
  Menu,
  X,
  RefreshCcw,
  Loader2,
  Trash2,
  KeyRound,
  Mail,
  User as UserIcon,
  Clock,
  Terminal,
  Server,
  Lock,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

type User = {
  id: number;
  name: string;
  email: string;
  role?: string;
  mustChangePassword?: boolean;
  profileVerified?: boolean;
  isActive?: boolean;
  createdAt?: string;
  lastLogin?: string;
};

type Building = {
  id: number;
  name: string;
  address: string;
  city: string;
  type: string;
  status: string;
  totalUnits: number;
};

type AuthResponse = {
  accessToken: string;
  user: User;
};

type View = "dashboard" | "users" | "buildings" | "settings";

async function apiRequest<T>(path: string, options: RequestInit = {}, token?: string) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers ?? {}),
      },
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new Error(payload?.message ?? `Request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        `Unable to reach the backend at ${API_BASE}. Start the Luma server first.`,
      );
    }
    throw error;
  }
}

const BOOT_SEQUENCE = [
  "BOOT_SEQUENCE: INITIALIZE CONSOLE V1.0.4",
  "SECURE: INITIALIZING SHIELD CONNECTOR... OK",
  "SYS: ACCESSING API CLUSTERS... OK",
  "MEM: ALLOCATING CORE LOG DECK... OK",
  "SSL: SECURING REMOTE INTERACTIVE WORKSPACE... OK",
  "SYS: WAITING FOR OPERATOR KEY VAL..."
];

function BootloaderScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, BOOT_SEQUENCE[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#070708] text-white flex items-center justify-center p-8 font-mono select-none relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="w-full max-w-xl border border-white/5 bg-[#0B0B0C] rounded-3xl p-6 relative overflow-hidden shadow-[0_12px_40px_-5px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D9F856]/40 to-transparent" />
        
        <div className="flex items-center justify-between text-zinc-500 mb-6 text-[10px]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#D9F856]" />
            <span>LUMA_CONSOLE_BOOTSTRAP</span>
          </div>
          <span className="text-[#D9F856]/50">BUILD_290526</span>
        </div>

        <div className="space-y-2 text-[10px]">
          {lines.map((line, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-[#D9F856]/60">&gt;</span>
              <span className="text-zinc-300">{line}</span>
            </div>
          ))}
          {lines.length < BOOT_SEQUENCE.length && (
            <div className="flex gap-2 items-center">
              <span className="text-[#D9F856]/60">&gt;</span>
              <span className="w-1.5 h-3.5 bg-[#D9F856] animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SystemLogsConsole() {
  const [logs, setLogs] = useState<string[]>([]);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const baseLogs = [
      "SYSTEM: Control grid operations nominal",
      "SECURE: Refreshing authorization tokens",
      "SSL: Encrypted socket layer operational",
      "DB: Replica servers synchronized with main",
      "API: Internal latency check OK (34ms)",
      "SECURE: Administrative access filter active",
      "SYS: Awaiting credentials validation"
    ];

    setLogs(baseLogs);

    const interval = setInterval(() => {
      const logTemplates = [
        `SECURE: SSL tunnel validated [ID: ${Math.floor(Math.random() * 9000 + 1000)}]`,
        `SYS: Telemetry packet synchronized • CPU: ${(Math.random() * 2 + 0.8).toFixed(2)}%`,
        `DB: Database read-write thread allocation complete`,
        `API: Healthcheck ping [200 OK]`,
        `SYS: Security filter cache flushed`
      ];
      const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      setLogs(prev => [...prev.slice(1), randomLog]);
    }, 4500);

    const timeInterval = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between font-mono text-[10px] text-zinc-500 select-none">
      <div className="space-y-2 border-l border-zinc-900 pl-4 py-1">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-[#D9F856]/40">⚡</span>
            <span className={i === logs.length - 1 ? "text-zinc-300" : "text-zinc-500"}>{log}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#D9F856]" />
          <span className="text-zinc-300 uppercase tracking-widest">SYSTEM TIME: {timeStr}</span>
        </div>
        <span className="text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SYS_OPERATIONAL
        </span>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  subtitle,
  sysCode
}: { 
  title: string; 
  value: string | number; 
  icon: any; 
  trend?: string;
  subtitle?: string;
  sysCode?: string;
}) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-white/[0.05] bg-[#0A0A0C] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#D9F856] group-hover:h-full transition-all duration-300" />
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">{sysCode ?? "[STAT_MODULE]"}</span>
        <div className="p-2.5 rounded-xl bg-white/[0.02] text-zinc-400 group-hover:text-[#D9F856] group-hover:bg-[#D9F856]/5 transition-colors border border-white/[0.04]">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">{title}</p>
        <h3 className="text-3xl font-mono font-black mt-1 text-white tracking-tight flex items-baseline gap-2">
          {value}
          {trend && (
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              ({trend})
            </span>
          )}
        </h3>
        <p className="text-[10px] text-zinc-600 font-sans mt-2">{subtitle ?? "Telemetry active"}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("User");
  const [busy, setBusy] = useState(false);
  const [booting, setBooting] = useState(true);
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loadData = useCallback(async (authToken: string) => {
    try {
      const [usersData, buildingsData] = await Promise.all([
        apiRequest<User[]>("/admin/users", {}, authToken),
        apiRequest<Building[]>("/buildings", {}, authToken).catch(() => []),
      ]);
      setUsers(usersData);
      setBuildings(buildingsData);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      const stored = sessionStorage.getItem("luma_admin_token");

      if (!stored) {
        setBooting(false);
        return;
      }

      setToken(stored);

      try {
        const me = await apiRequest<{ user: User }>("/auth/me", {}, stored);
        setUser(me.user);
        setEmail(me.user.email);
        await loadData(stored);
      } catch {
        sessionStorage.removeItem("luma_admin_token");
        setToken(null);
      } finally {
        setBooting(false);
      }
    })();
  }, [loadData]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setNotice(null);

    try {
      const session = await apiRequest<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      sessionStorage.setItem("luma_admin_token", session.accessToken);
      setToken(session.accessToken);
      setUser(session.user);
      setEmail(session.user.email);
      await loadData(session.accessToken);

      setNotice(
        session.user.mustChangePassword || !session.user.profileVerified
          ? "Account needs onboarding in the main app."
          : null,
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const createUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;

    setBusy(true);
    setNotice(null);

    try {
      await apiRequest<User>(
        "/admin/users",
        {
          method: "POST",
          body: JSON.stringify({
            name: newUserName,
            email: newUserEmail,
            password: newUserPassword,
            role: newUserRole,
          }),
        },
        token,
      );

      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole("User");
      await loadData(token);
      setNotice("User created successfully.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Failed to create user");
    } finally {
      setBusy(false);
    }
  };

  const resetPassword = async (id: number) => {
    if (!token) return;
    const passwordValue = window.prompt("New password for this user?");
    if (!passwordValue) return;

    setBusy(true);

    try {
      await apiRequest<{ success: boolean }>(
        `/admin/users/${id}/reset-password`,
        {
          method: "POST",
          body: JSON.stringify({ password: passwordValue }),
        },
        token,
      );
      await loadData(token);
      setNotice("Password reset.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Failed to reset password");
    } finally {
      setBusy(false);
    }
  };

  const deleteUser = async (id: number) => {
    if (!token) return;
    if (!window.confirm("Delete this user?")) return;

    setBusy(true);

    try {
      await apiRequest<void>(
        `/admin/users/${id}`,
        {
          method: "DELETE",
        },
        token,
      );
      await loadData(token);
      setNotice("User deleted.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await apiRequest<{ success: boolean }>("/auth/logout", { method: "POST" }, token);
      } catch {
        // Ignore
      }
    }

    sessionStorage.removeItem("luma_admin_token");
    setToken(null);
    setUser(null);
    setUsers([]);
    setBuildings([]);
    setNotice(null);
  };

  if (booting) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center relative overflow-hidden font-mono">
        <div className="flex flex-col items-center gap-4 z-10">
          <Loader2 className="w-8 h-8 animate-spin text-[#D9F856]" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">INIT LUMA ADMIN</span>
        </div>
      </div>
    );
  }

  if (showBootSequence && !user) {
    return <BootloaderScreen onComplete={() => setShowBootSequence(false)} />;
  }

  if (!user || !token) {
    return (
      <main className="min-h-screen bg-[#070708] text-white selection:bg-[#D9F856] selection:text-black font-sans relative overflow-hidden flex items-center justify-center p-4">
        {/* Background grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[55rem] h-[55rem] bg-[#D9F856]/[0.02] rounded-full blur-[140px] pointer-events-none" />
        
        <div className="w-full max-w-5xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr] z-10 items-stretch">
          
          {/* Left panel: Administrative Status Dashboard */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between p-8 bg-[#0A0A0B]/60 border border-white/[0.05] rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-[2px] h-[35%] bg-[#D9F856]" />
            
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D9F856] flex items-center justify-center text-black font-black text-lg shadow-[0_0_15px_rgba(217,248,86,0.3)]">L</div>
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Luma // Sysop Terminal</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.95] mt-12 text-white font-display">
                Operations<br />
                Console.
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans mt-4 max-w-sm">
                Unified administrative workspace for property managers and system administrators. Telemetry live and encrypted.
              </p>
            </div>

            {/* Live Console Output */}
            <div className="mt-12 flex-1 flex flex-col justify-end">
              <SystemLogsConsole />
            </div>
          </motion.aside>

          {/* Right panel: Ultra-Sleek Glassmorphic Login Form */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center p-8 bg-[#0A0A0B]/80 border border-white/[0.06] rounded-3xl backdrop-blur-xl relative shadow-[0_12px_40px_-5px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D9F856]/40 to-transparent" />
            
            <div className="mb-8">
              <span className="font-mono text-[9px] text-[#D9F856] uppercase tracking-widest">GATEWAY AUTHORIZATION REQUIRED</span>
              <h1 className="text-2xl font-mono font-bold tracking-tight text-white mt-1 uppercase">Sign In</h1>
            </div>

            <form onSubmit={login} className="space-y-5">
              <div className="space-y-2 relative group">
                <span className="block text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
                  [01] SYSTEM IDENTITY (EMAIL)
                </span>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#D9F856] transition-colors" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="operator@luma.com"
                    className="w-full bg-white/[0.015] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-300 focus:border-[#D9F856]/80 focus:bg-white/[0.03] focus:ring-1 focus:ring-[#D9F856]/10 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <span className="block text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">
                  [02] CRYPTO SECURITY PHRASE (KEY)
                </span>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#D9F856] transition-colors" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/[0.015] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-700 outline-none transition-all duration-300 focus:border-[#D9F856]/80 focus:bg-white/[0.03] focus:ring-1 focus:ring-[#D9F856]/10 font-mono"
                    required
                  />
                </div>
              </div>

              {notice && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-xs text-red-400 font-mono font-medium">{notice}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="mt-6 w-full rounded-2xl bg-[#D9F856] text-black py-4 text-xs font-mono font-bold tracking-[0.2em] uppercase hover:bg-[#C5E645] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_15px_rgba(217,248,86,0.2)]"
              >
                {busy ? (
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                ) : (
                  "ACCESS OPERATIONAL DECK"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-zinc-600 font-mono text-[8px] uppercase tracking-widest">
              Luma cryptographic protocols active • ssl_v3
            </p>
          </motion.section>
        </div>
      </main>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", sys: "01 / CTRL", icon: LayoutGrid },
    { id: "users", label: "User Management", sys: "02 / USERS", icon: Users },
    { id: "buildings", label: "Buildings Portfolio", sys: "03 / PORT", icon: Building2 },
    { id: "settings", label: "Global Settings", sys: "04 / CONF", icon: Settings },
  ] as const;

  return (
    <main className="min-h-screen bg-[#070708] text-white font-sans selection:bg-[#D9F856] selection:text-black relative overflow-hidden flex">
      {/* Background radial spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-[-30%] left-[-20%] w-[65rem] h-[65rem] bg-[#D9F856]/[0.015] rounded-full blur-[140px] pointer-events-none" />

      {/* Sidebar - Desktop */}
      <aside className={cn(
        "fixed left-0 top-0 bottom-0 z-40 bg-[#0A0A0B] border-r border-white/[0.04] transition-all duration-500 ease-in-out hidden lg:flex flex-col",
        sidebarOpen ? "w-72" : "w-24"
      )}>
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-white/[0.03] h-20">
          <div className="w-9 h-9 rounded-xl bg-[#D9F856] flex items-center justify-center text-black font-black text-lg shadow-[0_0_12px_rgba(217,248,86,0.25)] shrink-0">L</div>
          {sidebarOpen && (
            <div>
              <span className="text-sm font-mono font-bold tracking-tight text-white block uppercase">Luma Console</span>
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block -mt-0.5">OPS_DECK_V1</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 mt-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group text-left",
                currentView === item.id 
                  ? "bg-white/[0.03] text-white border border-white/[0.06] shadow-md" 
                  : "text-zinc-500 hover:text-white hover:bg-white/[0.01]"
              )}
            >
              {currentView === item.id && (
                <motion.div 
                  layoutId="sidebarActiveIndicator"
                  className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#D9F856] rounded-r"
                />
              )}
              <item.icon className={cn("w-4 h-4 transition-colors shrink-0", currentView === item.id ? "text-[#D9F856]" : "group-hover:text-white")} />
              {sidebarOpen && (
                <div className="flex-1">
                  <span className="font-mono text-xs font-bold tracking-tight block uppercase">{item.label}</span>
                  <span className="text-[8px] font-mono text-zinc-600 block uppercase tracking-widest -mt-0.5">{item.sys}</span>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 mt-auto border-t border-white/[0.03]">
          {sidebarOpen && (
            <div className="mb-4 rounded-2xl bg-white/[0.015] border border-white/[0.04] p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A1A1E] border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-[#D9F856]">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono font-bold truncate text-white uppercase">{user.name}</p>
                  <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">{user.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] hover:bg-[#D9F856]/10 hover:text-[#D9F856] text-[9px] font-mono font-bold uppercase tracking-widest transition-all"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
          
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/[0.04]"
          >
            <ChevronRight className={cn("w-4 h-4 text-zinc-400 transition-transform", sidebarOpen && "rotate-180")} />
          </button>
        </div>
      </aside>

      {/* Main Panel Viewport */}
      <div className={cn(
        "transition-all duration-500 ease-in-out min-h-screen flex flex-col flex-1 relative z-10",
        "lg:ml-24",
        sidebarOpen && "lg:ml-72"
      )}>
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#070708]/75 backdrop-blur-xl border-b border-white/[0.03] px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[9px] font-mono text-[#D9F856] uppercase tracking-widest block">OPERATIONS_DECK</span>
              <h2 className="text-base font-mono font-bold tracking-tight text-white uppercase -mt-0.5">
                {navItems.find(i => i.id === currentView)?.label}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/[0.05] border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400">TELEMETRY_CONNECTED</span>
            </div>
            
            <button 
              onClick={() => loadData(token)}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all"
              title="Refresh Data Logs"
            >
              <RefreshCcw className={cn("w-4 h-4 text-zinc-400", busy && "animate-spin")} />
            </button>

            <div className="w-9 h-9 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-zinc-400">
              SYS
            </div>
          </div>
        </header>

        {/* View Layout Container */}
        <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
          
          {notice && (
            <div className="mb-8 p-4 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-between shadow-2xl relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#D9F856]" />
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#D9F856]" />
                <p className="text-xs font-mono font-bold uppercase text-zinc-300">{notice}</p>
              </div>
              <button 
                onClick={() => setNotice(null)} 
                className="p-1 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Frame Animations for Current view */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              
              {/* VIEW: DASHBOARD */}
              {currentView === "dashboard" && (
                <div className="space-y-8">
                  {/* Telemetry Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Global Operators" value={users.length} icon={Users} trend="+12%" sysCode="[METRIC_U]" />
                    <StatCard title="Active Portfolios" value={buildings.length} icon={Building2} trend="+4%" sysCode="[METRIC_P]" />
                    <StatCard title="Secure Sessions" value="24" icon={Activity} sysCode="[METRIC_S]" subtitle="Current load: nominal" />
                    <StatCard title="Root Security keys" value={users.filter(u => u.role === 'Admin').length} icon={ShieldCheck} sysCode="[METRIC_A]" />
                  </div>

                  {/* Operational Logs & System Guard */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="rounded-3xl bg-[#0A0A0B]/60 border border-white/[0.04] p-6 md:p-8">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <span className="font-mono text-[9px] text-[#D9F856] uppercase tracking-widest">LOGS_TELEMETRY</span>
                          <h3 className="text-lg font-mono font-bold uppercase text-white mt-0.5">Console Audit Logs</h3>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex gap-4 border-b border-white/[0.02] pb-4 last:border-0 last:pb-0">
                            <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center shrink-0 text-emerald-400 text-xs">
                              ⚡
                            </div>
                            <div>
                              <p className="text-xs font-mono font-bold text-white uppercase">Operator keys updated</p>
                              <p className="text-[10px] text-zinc-500 font-mono mt-0.5">UID: {1000 + i * 3} • SYSTEM_OK • 2h ago</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="rounded-3xl bg-[#0A0A0B]/60 border border-white/[0.04] p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">GUARD_STATUS</span>
                            <h3 className="text-lg font-mono font-bold uppercase text-white mt-0.5">Cryptography Guard</h3>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500">v1.4.2</span>
                        </div>
                        
                        <div className="space-y-3 font-mono text-[11px]">
                          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
                            <span className="text-zinc-400 uppercase">Database encryption payload</span>
                            <span className="text-emerald-400 font-bold uppercase tracking-widest">[SHIELD_ACTIVE]</span>
                          </div>
                          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
                            <span className="text-zinc-400 uppercase">Cryptographic session timeout</span>
                            <span className="text-zinc-400 uppercase tracking-widest">24_HRS</span>
                          </div>
                        </div>
                      </div>

                      <button className="w-full mt-6 py-4 rounded-2xl bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]">
                        <Server className="w-4 h-4 text-black" />
                        Execute Core Diagnostics
                      </button>
                    </section>
                  </div>
                </div>
              )}

              {/* VIEW: USERS */}
              {currentView === "users" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-start">
                    
                    {/* User Log Grid */}
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md group">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#D9F856] transition-colors" />
                          <input 
                            type="text" 
                            placeholder="Search operators by name or identity..." 
                            className="w-full bg-[#0A0A0B] border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-xs font-mono outline-none focus:border-[#D9F856]/60 transition-all text-white placeholder-zinc-700"
                          />
                        </div>
                      </div>

                      <div className="rounded-3xl bg-[#0A0A0B]/60 border border-white/[0.04] overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-mono text-[11px]">
                            <thead className="border-b border-white/[0.04] bg-white/[0.01]">
                              <tr>
                                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-zinc-500">OPERATOR</th>
                                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-zinc-500">ROLE</th>
                                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-zinc-500">STATUS</th>
                                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-zinc-500 text-right">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                              {users.map(u => (
                                <tr key={u.id} className="group hover:bg-white/[0.01] transition-colors">
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-[#D9F856] font-bold text-xs">
                                        {u.name?.charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                        <p className="font-bold text-white uppercase">{u.name}</p>
                                        <p className="text-[10px] text-zinc-500 font-sans mt-0.5">{u.email}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={cn(
                                      "px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border",
                                      u.role === 'Admin' 
                                        ? "bg-[#D9F856]/5 text-[#D9F856] border-[#D9F856]/15" 
                                        : "bg-white/5 text-zinc-400 border-white/5"
                                    )}>
                                      {u.role ?? 'User'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5">
                                      <span className={cn(
                                        "w-1.5 h-1.5 rounded-full shrink-0",
                                        u.profileVerified ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                                      )} />
                                      <span className="text-[9px] uppercase tracking-wider text-zinc-400">
                                        {u.profileVerified ? "VERIFIED" : "PENDING"}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button 
                                        onClick={() => resetPassword(u.id)}
                                        className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-[#D9F856]/10 hover:text-[#D9F856] hover:border-[#D9F856]/20 text-[9px] font-bold uppercase tracking-widest transition-all"
                                        title="Reset Password"
                                      >
                                        [RESET_KEY]
                                      </button>
                                      <button 
                                        onClick={() => deleteUser(u.id)}
                                        className="px-2.5 py-1.5 rounded-lg bg-red-500/[0.03] border border-red-500/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-[9px] font-bold uppercase tracking-widest transition-all"
                                        title="Delete Operator"
                                      >
                                        [DELETE]
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Creator Form */}
                    <div className="sticky top-28">
                      <section className="rounded-3xl bg-[#0A0A0B]/80 border border-white/[0.05] p-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#D9F856]/30" />
                        
                        <h3 className="text-sm font-mono font-bold mb-6 flex items-center gap-2 uppercase text-white">
                          <Plus className="w-4 h-4 text-[#D9F856]" /> Register Operator
                        </h3>

                        <form onSubmit={createUser} className="space-y-4">
                          <div className="space-y-1 relative group">
                            <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 ml-1">operator full name</label>
                            <input
                              value={newUserName}
                              onChange={(e) => setNewUserName(e.target.value)}
                              type="text"
                              placeholder="e.g. John Doe"
                              className="w-full bg-white/[0.01] border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono outline-none focus:border-[#D9F856]/50 text-white placeholder-zinc-700"
                              required
                            />
                          </div>

                          <div className="space-y-1 relative group">
                            <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 ml-1">operator secure email</label>
                            <input
                              value={newUserEmail}
                              onChange={(e) => setNewUserEmail(e.target.value)}
                              type="email"
                              placeholder="e.g. john@example.com"
                              className="w-full bg-white/[0.01] border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono outline-none focus:border-[#D9F856]/50 text-white placeholder-zinc-700"
                              required
                            />
                          </div>

                          <div className="space-y-1 relative group">
                            <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 ml-1">temporary access key</label>
                            <input
                              value={newUserPassword}
                              onChange={(e) => setNewUserPassword(e.target.value)}
                              type="password"
                              placeholder="••••••••"
                              className="w-full bg-white/[0.01] border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono outline-none focus:border-[#D9F856]/50 text-white placeholder-zinc-700"
                              required
                            />
                          </div>

                          <div className="space-y-1 relative group">
                            <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 ml-1">system role</label>
                            <select
                              value={newUserRole}
                              onChange={(e) => setNewUserRole(e.target.value)}
                              className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl py-2.5 px-3 text-xs font-mono outline-none focus:border-[#D9F856]/50 text-white"
                            >
                              <option className="bg-[#0A0A0B]" value="User">Standard User</option>
                              <option className="bg-[#0A0A0B]" value="Property Manager">Property Manager</option>
                              <option className="bg-[#0A0A0B]" value="Admin">Administrator</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            disabled={busy}
                            className="w-full mt-4 bg-[#D9F856] text-black font-mono font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-[#C5E645] transition-all flex items-center justify-center gap-2"
                          >
                            {busy ? "Processing..." : "REGISTER OPERATOR"}
                          </button>
                        </form>
                      </section>
                    </div>

                  </div>
                </div>
              )}

              {/* VIEW: BUILDINGS */}
              {currentView === "buildings" && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[#D9F856] transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Search portfolios..." 
                        className="w-full bg-[#0A0A0B] border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-xs font-mono outline-none focus:border-[#D9F856]/60 transition-all text-white placeholder-zinc-700"
                      />
                    </div>
                    <button className="bg-[#D9F856] hover:bg-[#C5E645] text-black px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.01]">
                      <Plus className="w-4 h-4" /> Add Building
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buildings.map(b => (
                      <motion.div 
                        key={b.id} 
                        whileHover={{ y: -2 }}
                        className="rounded-3xl bg-[#0A0A0B]/60 border border-white/[0.04] p-6 hover:border-white/[0.1] transition-all relative overflow-hidden group"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[#D9F856] group-hover:scale-105 transition-all">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <span className={cn(
                            "px-2.5 py-1 rounded-md text-[9px] font-mono font-bold uppercase tracking-widest border",
                            b.status === 'active' 
                              ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10" 
                              : "bg-yellow-500/5 text-yellow-300 border-yellow-500/10"
                          )}>
                            {b.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-mono font-bold text-white uppercase mb-1">{b.name}</h3>
                        <p className="text-xs text-zinc-500 font-sans mb-6">{b.address}, {b.city}</p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/[0.03]">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-600">{b.type}</span>
                          <span className="text-[10px] font-mono text-zinc-400 font-bold">{b.totalUnits} UNITS</span>
                        </div>
                      </motion.div>
                    ))}
                    
                    {buildings.length === 0 && (
                      <div className="col-span-full py-20 text-center border border-white/[0.04] bg-[#0A0A0B]/40 rounded-3xl">
                        <div className="w-16 h-16 rounded-full bg-white/[0.01] border border-white/[0.04] flex items-center justify-center mx-auto mb-6 text-zinc-600">
                          <Building className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-mono font-bold text-zinc-500 uppercase">No Buildings Found</h3>
                        <p className="text-zinc-600 text-xs max-w-xs mx-auto mt-2">Initialize the portfolio list by registering your first property.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW: SETTINGS */}
              {currentView === "settings" && (
                <div className="space-y-8 max-w-2xl">
                  <section className="rounded-3xl bg-[#0A0A0B]/60 border border-white/[0.04] p-6 md:p-8">
                    <h3 className="text-sm font-mono font-bold mb-8 flex items-center gap-2 uppercase text-white">
                      <ShieldCheck className="w-5 h-5 text-[#D9F856]" /> Administrative Guard Settings
                    </h3>
                    <div className="space-y-6 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-white/[0.02] pb-6">
                        <div>
                          <p className="font-bold text-white uppercase">Multi-Factor authentication</p>
                          <p className="text-[10px] text-zinc-500 mt-1">Enforce two-factor verification on next operator login</p>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-[#121214] border border-white/10 relative p-1 cursor-pointer flex items-center justify-start group">
                          <div className="w-3.5 h-3.5 rounded-full bg-zinc-600 transition-all" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white uppercase">Administrative session TTL</p>
                          <p className="text-[10px] text-zinc-500 mt-1">Active: 24 hours until cryptographic token invalidation</p>
                        </div>
                        <button className="text-[9px] font-bold uppercase tracking-widest text-[#D9F856] hover:underline">[CHANGE]</button>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-3xl bg-[#0A0A0B]/60 border border-white/[0.04] p-6 md:p-8">
                    <h3 className="text-sm font-mono font-bold mb-8 flex items-center gap-2 uppercase text-white">
                      <Activity className="w-5 h-5 text-[#D9F856]" /> Unified API Endpoints
                    </h3>
                    <div className="space-y-4 font-mono text-xs">
                      <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Primary REST cluster</p>
                        <code className="text-xs font-bold text-[#D9F856]">{API_BASE}</code>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Secure JWT signature prefix</p>
                        <code className="text-[10px] text-zinc-600 break-all">{token?.substring(0, 48)}...</code>
                      </div>
                    </div>
                  </section>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#070708] backdrop-blur-sm" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            {/* Drawer */}
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-[#0A0A0B] p-6 border-r border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#D9F856] flex items-center justify-center text-black font-black text-lg shadow-[0_0_10px_rgba(217,248,86,0.25)]">L</div>
                    <span className="text-sm font-mono font-bold tracking-tight text-white uppercase">Luma Admin</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-white/5 text-zinc-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <nav className="space-y-2">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-mono text-xs font-bold transition-all text-left uppercase relative",
                        currentView === item.id ? "bg-white/[0.03] text-white border border-white/5" : "text-zinc-500 hover:text-white"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/[0.015] border border-white/[0.04] rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-[#D9F856]">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono font-bold truncate text-white uppercase">{user.name}</p>
                    <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-500/[0.03] border border-red-500/5 text-red-400 font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
