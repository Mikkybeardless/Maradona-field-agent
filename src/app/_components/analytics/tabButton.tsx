interface TabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

export const TabButton = ({ id, label, isActive, onClick }: TabButtonProps) => (
  <button
    onClick={() => onClick(id)}
    className={`px-2 py-1 md:px-4 mdpy-2 rounded-lg capitalize font-medium text-xs md:text-sm transition-colors ${
      isActive
        ? "bg-orange text-white shadow-sm"
        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
    }`}
  >
    {label}
  </button>
);
