import { useState } from "react";
import { Form } from "../../../shared/Form";
import { Input } from "../../../shared/Input";
import { Button } from "../../../shared/Button";

/* eslint-disable no-unused-vars */
export function AddGroupComponent({ onAdd }) {
  const [formData, setFormData] = useState({
    grupName: "",
    grupDescription: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };
  return (
    <>
      <Form>
        <div>
          <Input
            id="grupName"
            label="Group Name"
            name="grupName"
            placeholder="Group Name ..."
            onChange={handleOnChange}
          />
        </div>
        <div>
          <Input
            id="grupDescription"
            label="Group Description"
            name="grupDescription"
            placeholder="Group Description ..."
            onChange={handleOnChange}
          />
        </div>
        <div className="btnInput">
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
