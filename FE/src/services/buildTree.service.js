export function buildTree(files) {
  const root = [];

  files.forEach((file) => {
    const parts = file.path.split("/").filter(Boolean);
    let current = root;

    parts.forEach((part, idx) => {
      let node = current.find((x) => x.name === part && x.type === "folder");

      if (!node) {
        node = {
          id: `${file.detailId}-${idx}-${part}`,
          classificationId: file.classificationId,
          name: part,
          type: "folder",
          children: [],
        };
        current.push(node);
      }

      current = node.children;
    });
  });

  return root;
}
