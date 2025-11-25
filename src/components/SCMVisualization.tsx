export default function SCMVisualization() {
    return (
        <div className="w-full h-96 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-center z-10">
                <h3 className="text-xl font-medium text-zinc-200 mb-2">SCM v3.1 Visualization</h3>
                <p className="text-zinc-500 text-sm">Interactive model loading...</p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>
    );
}
