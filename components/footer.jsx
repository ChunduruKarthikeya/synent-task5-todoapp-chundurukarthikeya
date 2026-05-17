export function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-serif text-slate-900">
              Taskify
            </span>
            <span className="text-slate-400 text-sm font-serif">| Built for productivity.</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-slate-500 font-serif">
            <a href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="/changelog" className="hover:text-slate-900 transition-colors">Release Notes</a>
            
          </div>
          
          <div className="text-sm font-serif">
            © {new Date().getFullYear()} Taskify Labs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
