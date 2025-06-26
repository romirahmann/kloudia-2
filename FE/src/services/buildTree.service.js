export function buildTree(files) {
  const cabinetMap = new Map();

  files.forEach((file) => {
    const {
      cabinetId,
      classifications,
      cabinetName,
      isDeleted,
      isFolder,
      detailId,
      fileName,
    } = file;

    if (!cabinetMap.has(cabinetId)) {
      cabinetMap.set(cabinetId, {
        id: `cabinet-${cabinetId}`,
        cabinetId,
        name: cabinetName,
        type: "cabinet",
        children: [
          {
            id: `${cabinetId}-files`,
            name: "Files",
            type: "files",
            classifications,
            children: [],
          },
          {
            id: `${cabinetId}-folders`,
            name: "Folders",
            type: "folder",
            classifications,
            children: [],
          },
          {
            id: `${cabinetId}-recycle`,
            name: "Recycle Bin",
            type: "recycle",
            classifications,
            children: [],
          },
        ],
      });
    }

    const cabinetNode = cabinetMap.get(cabinetId);
    const [filesNode, foldersNode, recycleNode] = cabinetNode.children;

    // skip jika tidak ada detail
    if (!detailId) return;

    const targetNode = isDeleted
      ? recycleNode
      : isFolder
      ? foldersNode
      : filesNode;

    const leaf = {
      id: `${detailId}-file-${fileName}`,
      name: fileName,
      type: "file",
      cabinetId,
      classifications,
      ...file,
    };

    targetNode.children.push(leaf);
  });

  return Array.from(cabinetMap.values());
}
