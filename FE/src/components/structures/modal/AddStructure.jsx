/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form } from "../../../shared/Form";
import { Input } from "../../../shared/Input";
import SelectInput from "../../../shared/SelectInput";
import { Button } from "../../../shared/Button";

export function AddStructure({ typeData, onAdd, classificationId }) {
  const [formData, setFormData] = useState({
    structureName: "",
    classificationId: classificationId,
    fieldSize: 100,
    typeId: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.typeId) === 2) {
      formData.fieldSize = 255;
    }
    onAdd(formData);
  };

  return (
    <>
      <Form>
        <div>
          <Input
            id="structureName"
            label="Structure Name"
            name="structureName"
            placeholder="Structure Name ..."
            onChange={handleOnChange}
          />
        </div>

        <div>
          <SelectInput
            id="typeId"
            label="Type Data"
            name="typeId"
            value={formData.typeId}
            placeholder="Select Type ..."
            onChange={(e) => handleOnChange(e)}
            options={typeData.map((type) => ({
              value: type.typeId,
              label: type.typeName,
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
