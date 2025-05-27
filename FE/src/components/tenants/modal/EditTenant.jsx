/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Form } from "../../../shared/Form";
import { Input } from "../../../shared/Input";
import { Button } from "../../../shared/Button";
import api from "../../../services/axios.service";

export function EditTenant({ onClose, data, onUpdate }) {
  const [formTenant, setFormTenant] = useState({
    tenantName: "",
    tenantDescription: "",
  });

  useEffect(() => {
    if (data) {
      setFormTenant({
        tenantName: data.tenantName,
        tenantDescription: data.tenantDescription,
      });
    }
  }, []);

  const handleOnChange = (e) => {
    setFormTenant({ ...formTenant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formTenant);
  };

  return (
    <>
      <Form>
        <div className="formInput">
          <Input
            id="tenantName"
            label="Tenant Name"
            value={formTenant.tenantName}
            name="tenantName"
            placeholder="Tenant Name ..."
            onChange={handleOnChange}
          />
        </div>
        <div className="formInput">
          <Input
            id="tenantDescription"
            name="tenantDescription"
            value={formTenant.tenantDescription}
            label="Tenant Description"
            placeholder="Tenant Description ..."
            onChange={handleOnChange}
          />
        </div>
        <div className="formInput">
          <Button
            onClick={(e) => handleSubmit(e)}
            className="text-md bg-primary rounded-xl text-white py-2 px-4 hover:bg-dark-primary w-full"
          >
            SUBMIT
          </Button>
        </div>
      </Form>
    </>
  );
}
