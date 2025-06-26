import { useState } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaFileAlt,
  FaTrash,
  FaArchive,
} from "react-icons/fa";

export function FolderTree({ data = [], onSelect }) {
  return (
    <div className="text-sm space-y-1 px-2">
      {data.map((cabinet) => (
        <FolderNode key={cabinet.id} item={cabinet} onSelect={onSelect} />
      ))}
    </div>
  );
}

function FolderNode({ item, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (item.type === "cabinet") {
      setIsOpen(!isOpen);
    } else if (["files", "folder", "recycle"].includes(item.type)) {
      onSelect({
        cabinetId: item.cabinetId,
        selectedType: item.type,
        classification: item.classifications,
      });
    } else if (item.type === "file") {
      onSelect({
        cabinetId: item.cabinetId,
        classification: item.classifications,
        selectedDetail: item,
      });
    }
  };

  const renderIcon = () => {
    switch (item.type) {
      case "cabinet":
        return isOpen ? (
          <FaArchive className="mr-2 text-purple-500" />
        ) : (
          <FaArchive className="mr-2 text-purple-500" />
        );
      case "files":
        return <FaFileAlt className="mr-2 text-blue-500" />;
      case "folder":
        return <FaFolder className="mr-2 text-yellow-600" />;
      case "recycle":
        return <FaTrash className="mr-2 text-red-500" />;
      default:
        return <FaFileAlt className="mr-2" />;
    }
  };

  return (
    <div className="ml-2">
      <div
        className="flex items-center cursor-pointer hover:text-primary"
        onClick={handleClick}
      >
        {renderIcon()}
        {item.name}
      </div>

      {hasChildren && isOpen && (
        <div className="ml-4 border-l border-gray-300 dark:border-gray-600 pl-2 mt-1">
          {item.children.map((child) => (
            <FolderNode
              key={child.id}
              item={{ ...child, cabinetId: item.cabinetId }}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
