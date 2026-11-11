export default function Loading() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-lg">
          <div className="h-64 bg-stone-200 animate-pulse"></div>
          <div className="p-8 space-y-4">
            <div className="h-10 bg-stone-200 rounded animate-pulse w-1/2"></div>
            <div className="h-6 bg-stone-200 rounded animate-pulse w-1/3"></div>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="h-24 bg-stone-200 rounded-xl animate-pulse"></div>
              <div className="h-24 bg-stone-200 rounded-xl animate-pulse"></div>
              <div className="h-24 bg-stone-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}