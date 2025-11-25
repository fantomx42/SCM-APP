import SCMVisualization from "@/components/SCMVisualization";
import ChatInterface from "@/components/ChatInterface";
import TelemetryGraph from "@/components/TelemetryGraph";
import ControlPanel from "@/components/ControlPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-white">S</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">Symbolic Lab</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="text-zinc-100 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">Analysis</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">Settings</a>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              System Dashboard
            </h1>
            <p className="text-zinc-400 text-sm">
              Real-time SCM v3.1 telemetry and control interface.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column: Visualization & Telemetry (8 cols) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Main Visualization */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-1">
              <SCMVisualization />
            </div>

            {/* Telemetry Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4">
                <TelemetryGraph label="Base Stability" color="indigo" height={80} />
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4">
                <TelemetryGraph label="Collapse Pressure" color="rose" height={80} />
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4">
                <TelemetryGraph label="Fusion Coeff" color="purple" height={80} />
              </div>
            </div>
          </div>

          {/* Right Column: Chat & Controls (4 cols) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <ControlPanel />
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}
