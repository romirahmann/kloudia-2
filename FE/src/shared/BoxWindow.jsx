import Split from "react-split";

const BoxWindow = () => {
  return (
    <Split
      className="flex flex-col h-screen"
      sizes={[20, 40, 40]}
      minSize={100}
      gutterSize={5}
      direction="vertical"
    >
      {/* Panel Atas */}
      <div className="bg-gray-100 p-4 overflow-auto">
        <h2 className="font-bold mb-2">Sidebar / Toolbar</h2>
        <ul className="text-sm space-y-1">
          <li>Dashboard</li>
          <li>Document</li>
          <li>Cabinet</li>
          <li>User</li>
        </ul>
      </div>

      {/* Panel Tengah */}
      <div className="bg-white p-4 overflow-auto border-y border-gray-300">
        <h2 className="font-bold mb-2">List Dokumen</h2>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-gray-50 border rounded">Dokumen A</div>
          <div className="p-2 bg-gray-50 border rounded">Dokumen B</div>
          <div className="p-2 bg-gray-50 border rounded">Dokumen C</div>
        </div>
      </div>

      {/* Panel Bawah */}
      <div className="bg-gray-50 p-4 overflow-auto">
        <h2 className="font-bold mb-2">Preview</h2>
        <p className="text-sm">Klik dokumen untuk melihat preview di sini.</p>
      </div>
    </Split>
  );
};

export default BoxWindow;
