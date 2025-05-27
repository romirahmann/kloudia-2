/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form } from "../../../shared/Form";
import { Input } from "../../../shared/Input";
import { Button } from "../../../shared/Button";
import api from "../../../services/axios.service";
export function AddTenant({ onAdd }) {
  const [formTenant, setFormTenant] = useState({
    tenantName: "",
    tenantDescription: "",
  });

  const handleOnChange = (e) => {
    setFormTenant({ ...formTenant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAdd(formTenant);
  };

  return (
    <>
      <Form>
        <div className="formInput">
          <Input
            id="tenantName"
            label="Tenant Name"
            name="tenantName"
            placeholder="Tenant Name ..."
            onChange={handleOnChange}
          />
        </div>
        <div className="formInput">
          <Input
            id="tenantDescription"
            name="tenantDescription"
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
