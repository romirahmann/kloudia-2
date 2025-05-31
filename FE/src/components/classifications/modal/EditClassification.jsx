import { useEffect, useState } from "react";
import { Form } from "../../../shared/Form";
import { Input } from "../../../shared/Input";
import SelectInput from "../../../shared/SelectInput";
import { Button } from "../../../shared/Button";

/* eslint-disable no-unused-vars */
export function EditClassification({ onUpdate, data, cabinets }) {
  const [formData, setFormData] = useState({
    classificationName: "",
    classificationDescription: "",
    cabinetId: "",
  });

  useEffect(() => {
    setFormData({
      classificationName: data.classificationName,
      classificationDescription: data.classificationDescription,
      cabinetId: data.cabinetId,
    });
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <>
      <Form>
        <div>
          <Input
            id="classificationName"
            label="Classification Name"
            name="classificationName"
            placeholder="Classification Name ..."
            value={formData.classificationName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <Input
            id="classificationDescription"
            label="Classification Description"
            name="classificationDescription"
            placeholder="Classification Description ..."
            value={formData.classificationDescription}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <SelectInput
            id="cabinetId"
            label="Cabinet"
            name="cabinetId"
            placeholder="Select Cabinet ..."
            value={formData.cabinetId}
            onChange={(e) => handleOnChange(e)}
            options={cabinets.map((cabinet) => ({
              value: cabinet.cabinetId,
              label: cabinet.cabinetName,
            }))}
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
