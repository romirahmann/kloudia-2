import { useEffect, useState } from "react";
import { Form } from "../../../shared/Form";
import SelectInput from "../../../shared/SelectInput";
import { Button } from "../../../shared/Button";
import { Input } from "../../../shared/Input";

/* eslint-disable no-unused-vars */
export function EditStructure({ onEdit, typeData, data, classificationId }) {
  const [formData, setFormData] = useState({
    structureName: "",
    classificationId: classificationId,
    fieldSize: 255,
    typeId: "",
  });

  useEffect(() => {
    setFormData({
      structureName: data.structureName,
      classificationId: classificationId,
      fieldSize: data.fieldSize,
      typeId: data.typeId,
    });
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onEdit(formData);
  };
  return (
    <>
      <Form>
        <div>
          <Input
            id="structureName"
            label="Structure Name"
            name="structureName"
            value={formData.structureName}
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
