/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Form } from "../../../shared/Form";
import SelectInput from "../../../shared/SelectInput";
import { Button } from "../../../shared/Button";
import { Input } from "../../../shared/Input";

export function EditCabinet({ onUpdate, tenants, groups, data }) {
  const [formData, setFormData] = useState({
    cabinetName: "",
    tenantId: "",
    grupId: "",
  });

  useEffect(() => {
    setFormData({
      cabinetName: data.cabinetName,
      tenantId: data.tenantId,
      grupId: data.grupId,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate(formData);
  };

  return (
    <>
      <Form>
        <div className="inputForm">
          <Input
            label="Cabinet Name"
            id="cabinetName"
            name="cabinetName"
            value={formData.cabinetName}
            onChange={handleChange}
            placeholder="ex: Dokumen IT"
          />
        </div>
        <div className="inputForm">
          <SelectInput
            name="tenantId"
            id="tenantId"
            label="Tenant"
            value={formData.tenantId}
            onChange={(e) => handleChange(e)}
            placeholder="Select Tenant"
            options={tenants.map((tenant) => ({
              value: tenant.tenantId,
              label: tenant.tenantName,
            }))}
          />
        </div>
        <div className="inputForm">
          <SelectInput
            name="grupId"
            id="grupId"
            label="Group"
            value={formData.grupId}
            onChange={(e) => handleChange(e)}
            placeholder="Select Grup"
            options={groups.map((group) => ({
              value: group.grupId,
              label: group.grupName,
            }))}
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="text-md bg-primary rounded-xl text-white py-2 px-4 hover:bg-dark-primary w-full"
        >
          SUBMIT
        </Button>
      </Form>
    </>
  );
}
