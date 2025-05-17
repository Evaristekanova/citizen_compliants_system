"use client";

import { useState } from "react";
import { Menu, LayoutDashboard, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const navItems = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "#" },
  { name: "Users", icon: <Users />, path: "#" },
  { name: "Settings", icon: <Settings />, path: "#" },
];

export default function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted text-muted-foreground">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-card text-card-foreground p-4 space-y-4 transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-lg font-bold mb-6">Super Admin</h2>
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start"
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:block md:w-64 bg-card text-card-foreground p-4 space-y-4">
        <h2 className="text-lg font-bold mb-6">Super Admin</h2>
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start"
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-background border-b p-4 flex items-center justify-between sticky top-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </Button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Admin</span>
          </div>
        </header>

        {/* Dashboard Cards */}
        <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <CardTitle>Total Users</CardTitle>
              <p className="text-2xl font-bold">1,204</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <CardTitle>Active Clinics</CardTitle>
              <p className="text-2xl font-bold">86</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <CardTitle>Revenue</CardTitle>
              <p className="text-2xl font-bold">$92,340</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
