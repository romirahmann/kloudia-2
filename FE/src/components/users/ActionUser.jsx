export default function ToolbarAction({ actions = [] }) {
  return (
    <div className="toolbar flex gap-2 bg-white dark:bg-gray-950 mb-2 p-2">
      {actions
        .filter((action) => action.show !== false) // ⬅️ default: true
        .map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`border p-2 rounded-md flex items-center justify-center 
              ${
                action.className ||
                "border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
              }`}
            title={action.title || ""}
          >
            <action.icon className="text-sm" />
          </button>
        ))}
    </div>
  );
}
