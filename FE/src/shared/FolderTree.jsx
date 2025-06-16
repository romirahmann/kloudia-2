import { useState } from "react";
import { FaFolder, FaFolderOpen, FaFileAlt } from "react-icons/fa";

export function FolderTree({ data = [], onSelect }) {
  return (
    <div className="text-sm space-y-1">
      {data.map((item) => (
        <FolderNode key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}

function FolderNode({ item, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (item.type === "folder") {
      if (!hasChildren) {
        onSelect(item);
      } else {
        setIsOpen(!isOpen);
      }
    } else {
      onSelect(item);
    }
  };

  return (
    <div className="ml-2">
      <div
        className="flex items-center cursor-pointer hover:text-primary"
        onClick={handleClick}
      >
        {item.type === "folder" ? (
          isOpen ? (
            <FaFolderOpen className="mr-2" />
          ) : (
            <FaFolder className="mr-2" />
          )
        ) : (
          <FaFolder className="mr-2" />
        )}
        {item.name}
      </div>

      {hasChildren && isOpen && (
        <div className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-2 mt-1">
          {item.children.map((child) => (
            <FolderNode key={child.id} item={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
