/* eslint-disable no-unused-vars */
import { Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import api from "../services/axios.service";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa";

export function ViewDocumentPage() {
  const { classificationId, detailId, authTag } = useSearch({});
  const [detailDocument, setDetailDocument] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetailDocument();
  }, []);

  const fetchDetailDocument = async () => {
    try {
      const res = await api.get(
        `/master/details/${detailId}/classification/${classificationId}`
      );
      const data = res.data.data;
      setDetailDocument(data);
      fetchDocument(data.encryption_title, data.key, data.iv);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchDocument = async (fileName, key, iv) => {
    try {
      const res = await api.get(
        `/file/get-file?fileName=${fileName}&key=${key}&iv=${iv}&authTag=${authTag}`,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(res.data);
      setPdfUrl(url);
    } catch (error) {
      console.log(error.response);
    }
  };

  const hiddenKeys = [
    "authTag",
    "cabinetId",
    "classificationId",
    "detailId",
    "encryption_title",
    "isLatest",
    "iv",
    "key",
    "versionId",
    "documentId",
    "versionPath",
    "createdAt",
    "updateAt",
  ];

  const formatKey = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const isISODate = (value) =>
    typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value);

  const formatFileSize = (bytes) => {
    if (!bytes || isNaN(bytes)) return "-";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const renderValue = (key, value) => {
    if (value == null) return "-";
    if (isISODate(value)) return moment(value).format("DD MMMM YYYY");
    if (key.toLowerCase().includes("size") && typeof value === "number") {
      return formatFileSize(value);
    }
    return value.toString();
  };

  return (
    <div className="max-w-full">
      <div className="btn-back  w-[5em] mb-2 p-3 ">
        <Link
          to={"/documents"}
          className="flex items-center gap-2 text-primary dark:text-gray-50  "
        >
          <FaArrowLeft className="text-2xl" /> <span>Back</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 md:gap-6">
        {/* Sidebar Info Dokumen */}
        <div className="col-span-1 w-full bg-white rounded-xl shadow-md p-6 border">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Detail Document
          </h2>
          <hr />
          <div className="space-y-2 mt-5 text-sm text-gray-700">
            {Object.entries(detailDocument).map(([key, value]) => {
              if (hiddenKeys.includes(key)) return null;

              return (
                <div
                  key={key}
                  className="border border-gray-200 p-2 rounded-lg"
                >
                  <strong>{formatKey(key)}:</strong>
                  <p>{renderValue(key, value)}</p>
                </div>
              );
            })}
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
  );
}
