import { useEffect, useState } from "react";
import { Table } from "../../shared/Table";
import api from "../../services/axios.service";
import moment from "moment";

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
    key: item.structureDescription,
    render: (value) => {
      if (item.typeId === 3 && value) {
        return moment(value).format("YYYY-MM-DD");
      }
      return value;
    },
  }));
  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
}
