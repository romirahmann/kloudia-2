/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../../../services/axios.service";
import { Form } from "../../../shared/Form";
import { Input } from "../../../shared/Input";
import SelectInput from "../../../shared/SelectInput";
import { Button } from "../../../shared/Button";

export function EditUserModal({
  roles,
  groups,
  tenants,
  data,
  setModalType,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
    roleId: "",
    tenantId: "",
    grupId: "",
    password: "",
    confirmPassword: "",
  });

  const userLogin = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    setFormData({
      username: data?.username,
      email: data?.email,
      fullname: data?.fullname,
      roleId: data?.roleId,
      tenantId: data?.tenantId,
      grupId: data?.grupId,
    });
  }, []);

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <>
      <div className="form">
        <Form>
          <div className="formInput flex gap-2">
            <Input
              id="fullname"
              name="fullname"
              value={formData.fullname}
              placeholder="Fullname"
              onChange={(e) => handleChangeInput(e)}
            />
            <Input
              id="username"
              name="username"
              value={formData.username}
              placeholder="username"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="formInput flex gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="formInput flex gap-2">
            <SelectInput
              name="grupId"
              id="grupId"
              value={formData.grupId}
              onChange={(e) => handleChangeInput(e)}
              placeholder="Select Group"
              options={groups.map((grup) => ({
                value: grup.grupId,
                label: grup.grupName,
              }))}
            />
            <SelectInput
              name="roleId"
              id="roleId"
              value={formData.roleId}
              onChange={(e) => handleChangeInput(e)}
              placeholder="Select Role"
              options={roles.map((role) => ({
                value: role.roleId,
                label: role.roleName,
              }))}
            />
          </div>
          {/* TENANTS SELECT INPUT */}
          {userLogin.tenantId === 1 ? (
            <div className="formInput flex gap-2">
              <SelectInput
                name="tenantId"
                id="tenantId"
                value={formData.tenantId}
                onChange={(e) => handleChangeInput(e)}
                placeholder="Select Tenant"
                options={tenants.map((tenant) => ({
                  value: tenant.tenantId,
                  label: tenant.tenantName,
                }))}
              />
            </div>
          ) : (
            ""
          )}
          <div className="formInput">
            <Button funct={() => setModalType("OTP")} type="button">
              <span className="text-sm underline hover:text-dark-primary text-primary">
                Edit Password !
              </span>
            </Button>
          </div>
          <div className="formInput flex gap-2">
            <Button
              onClick={(e) => handleSubmit(e)}
              className="text-md bg-primary rounded-xl text-white py-2 px-4 hover:bg-dark-primary w-full"
            >
              SUBMIT
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
