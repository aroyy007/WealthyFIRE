import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingAddButtonProps {
  onClick: () => void;
}

const FloatingAddButton = ({ onClick }: FloatingAddButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gold-gradient text-charcoal shadow-lg hover:scale-105 transition-transform neon-glow z-50"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};

export default FloatingAddButton;