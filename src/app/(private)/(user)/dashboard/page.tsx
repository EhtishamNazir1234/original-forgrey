"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  History,
  ShoppingBag,
  Settings,
  LogOut,
  Sparkles,
  Image as ImageIcon,
  Bell,
  Menu,
  X,
  Plus,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let active = true;
    let subscription: any = null;

    async function checkAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!active) return;

        if (!session) {
          router.push("/login");
        } else {
          setUser(session.user);
          setLoading(false);
        }
      } catch (error) {
        console.error("Dashboard auth check failed:", error);
        if (active) router.push("/login");
      }

      try {
        const {
          data: { subscription: sub },
        } = supabase.auth.onAuthStateChange((event, currentSession) => {
          if (!active) return;
          if (!currentSession) {
            router.push("/login");
          } else {
            setUser(currentSession.user);
            setLoading(false);
          }
        });
        subscription = sub;
      } catch (error) {
        console.error("Failed to set up auth listener:", error);
      }
    }

    checkAuth();

    return () => {
      active = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // Get user details
  const userFullName = user?.user_metadata?.full_name || "Craig Bill";
  const userEmail = user?.email || "craig@example.com";
  const userInitials = userFullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "My Activity", icon: History, active: false },
    { name: "Orders", icon: ShoppingBag, active: false },
    { name: "Settings", icon: Settings, active: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans w-full">
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 bg-[#121324] text-white rounded-xl shadow-md cursor-pointer hover:bg-[#1c1e38] transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#121324] text-white p-6 flex flex-col justify-between z-40 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3.5 px-2 mt-4 md:mt-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-[#e59500] flex items-center justify-center font-bold text-lg text-white shadow-sm shadow-amber-500/20">
              O
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wider uppercase text-white leading-none mb-0.5 animate-none">
                Original Forgrey
              </h2>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Creator Studio
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    item.active
                      ? "bg-white/10 text-white shadow-inner"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5 opacity-80" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-white/5 pt-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 flex flex-col gap-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 md:mt-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Here's what's happening with your artworks.
            </p>
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            {/* Notifications */}
            <button className="p-2.5 bg-white border border-slate-100 hover:bg-slate-50 rounded-xl text-slate-500 transition-colors shadow-sm relative cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 bg-white border border-slate-100 p-1.5 pr-4 rounded-2xl shadow-sm">
              {user?.user_metadata?.avatar_url ? (
                <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-slate-200">
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={userFullName}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-bold text-white shadow-inner text-sm">
                  {userInitials}
                </div>
              )}
              <div className="text-left">
                <p className="text-sm font-bold text-slate-950 leading-tight">
                  {userFullName}
                </p>
                <p className="text-[11px] text-slate-400 font-semibold leading-none truncate max-w-[120px]">
                  {userEmail}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Generations */}
          <div className="bg-slate-100 border border-slate-200/50 p-6 rounded-2xl flex flex-col justify-between h-[130px] shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 font-semibold tracking-wide">
                Generations Remaining
              </span>
              <Sparkles className="w-5 h-5 text-slate-500 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 leading-none">
              2
            </h3>
          </div>

          {/* Card 2: Artworks Created */}
          <div className="bg-slate-100 border border-slate-200/50 p-6 rounded-2xl flex flex-col justify-between h-[130px] shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 font-semibold tracking-wide">
                Artworks Created
              </span>
              <ImageIcon className="w-5 h-5 text-slate-500 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 leading-none">
              2
            </h3>
          </div>

          {/* Card 3: Active Orders */}
          <div className="bg-slate-100 border border-slate-200/50 p-6 rounded-2xl flex flex-col justify-between h-[130px] shadow-sm relative overflow-hidden group sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 font-semibold tracking-wide">
                Active Orders
              </span>
              <ShoppingBag className="w-5 h-5 text-slate-500 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 leading-none">
              2
            </h3>
          </div>
        </section>

        {/* Create Artwork Banner */}
        <section className="bg-gradient-to-br from-[#4d3305] to-[#201502] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-amber-900/10 shadow-lg shadow-amber-950/10">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              Create New Artwork
            </h3>
            <p className="text-sm text-amber-200/80 max-w-md font-light leading-relaxed">
              Upload your photo and convert it into original artwork using our
              state-of-the-art AI model styles.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#e59500] hover:bg-[#cc8500] active:bg-[#b37400] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-amber-500/10 text-sm whitespace-nowrap cursor-pointer">
            <Plus className="w-4 h-4" />
            New Artwork
          </button>
        </section>

        {/* Recent Artworks */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-950">
              Recent Artworks
            </h3>
            <Link
              href="/artworks"
              className="text-xs font-bold text-amber-500 hover:text-amber-600 transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Artwork Card 1 */}
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <img
                  src="/art_pencil_sketch.png"
                  alt="Pop Art Sketch"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h4 className="font-bold text-slate-900 text-sm">Pop Art</h4>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Sketch
                </p>
              </div>
            </div>

            {/* Artwork Card 2 */}
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <img
                  src="/art_pop_art.png"
                  alt="Pop Art Painting"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h4 className="font-bold text-slate-900 text-sm">Pop Art</h4>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Painting
                </p>
              </div>
            </div>

            {/* Artwork Card 3 */}
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <img
                  src="/art_oil_paint.png"
                  alt="Pop Art Oil Paint"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h4 className="font-bold text-slate-900 text-sm">Pop Art</h4>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Oil Paint
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-950">Recent Orders</h3>
            <Link
              href="/orders"
              className="text-xs font-bold text-amber-500 hover:text-amber-600 transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                <ImageIcon className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  12 × 18 matte paper
                </h4>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                  Order #OG-92841
                </p>
              </div>
            </div>

            <span className="text-[11px] font-bold tracking-wider uppercase bg-amber-50 border border-amber-100 text-amber-700 px-4 py-1.5 rounded-full">
              Processing
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
