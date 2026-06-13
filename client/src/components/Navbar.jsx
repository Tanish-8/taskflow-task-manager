import { CheckSquare, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-800 border-b border-slate-700 shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 bg-indigo-600 rounded-lg">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TaskFlow</span>
          </div>

          {/* Right: Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-slate-300 text-sm">
              Hello, <span className="text-white font-medium">{user?.name || 'User'}</span>
            </span>
            <button
              id="navbar-logout"
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-all text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Right: Mobile hamburger */}
          <button
            id="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden pb-4 border-t border-slate-700 mt-2 pt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              <span className="text-slate-300 text-sm px-2">
                Hello, <span className="text-white font-medium">{user?.name || 'User'}</span>
              </span>
              <button
                id="navbar-mobile-logout"
                onClick={onLogout}
                className="flex items-center gap-2 px-2 py-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
