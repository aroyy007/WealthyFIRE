
import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-softdark/50 border border-platinum/20 hover:bg-softdark transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-goldLight flex items-center justify-center">
          <User size={16} className="text-charcoal" />
        </div>
        <span className="hidden md:block text-sm font-medium">John Doe</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-softdark border border-platinum/20 rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="p-3 border-b border-platinum/10">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-platinum/70">john@example.com</p>
          </div>
          
          <div className="py-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-platinum/10 transition-colors">
              <User size={16} />
              <span>Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-platinum/10 transition-colors">
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-platinum/10 transition-colors text-red-400">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
