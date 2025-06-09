import { useEffect, useState } from "react";
import { Table } from "../../shared/Table";
import api from "../../services/axios.service";

/* eslint-disable no-unused-vars */
export function TableDocument({ data, actionTable, classificationId }) {
  const [structures, setStructures] = useState([]);

  useEffect(() => {
    if (classificationId) {
      fetchClassificications();
    }
  }, [classificationId]);

  const fetchClassificications = async () => {
    try {
      const res = await api.get(`/master/structures/${classificationId}`);
      setStructures(res.data.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const columns = structures.map((item) => ({
    header: item.structureName,
    key: item.structureName,
  }));
  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
}
