/* eslint-disable no-unused-vars */
import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import api from "../services/axios.service";

export function ViewDocumentPage() {
  const { classificationId, detailId } = useSearch({});
  const [detailDocument, setDetailDocument] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetailDocument();
  }, []);

  const fetchDetailDocument = async () => {
    try {
      let res = await api.get(
        `/master/details/${detailId}/classification/${classificationId}`
      );
      let data = res.data.data;
      console.log(data);
      setDetailDocument(data);
      fetchDocument(data.encryption_title, data.key, data.iv);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchDocument = async (fileName, key, iv) => {
    try {
      let res = await api.get(
        `/file/get-file?fileName=${fileName}&key=${key}&iv=${iv}`,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(res.data); // karena axios return data langsung
      setPdfUrl(url);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="max-w-full  ">
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-6">
          {/* Sidebar Info Dokumen */}
          <div className="col-span-1  w-full bg-white rounded-xl shadow-md p-6 border">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Detail Document
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <p className="font-bold">File Name:</p>
                <p>{detailDocument.fileName}</p>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-full h-screen col-span-5">
            {pdfUrl ? (
              <div className="h-full border rounded-lg shadow overflow-hidden">
                <embed
                  src={pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              </div>
            ) : (
              <div className="h-[85vh] flex items-center justify-center border rounded-lg text-gray-400 bg-gray-50">
                <p className="text-lg">Belum ada dokumen yang ditampilkan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
