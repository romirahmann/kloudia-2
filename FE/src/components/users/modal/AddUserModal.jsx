/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Input } from "../../../shared/Input";
import SelectInput from "../../../shared/SelectInput";
import { Button } from "../../../shared/Button";
import { Form } from "../../../shared/Form";

export function AddUserModal({ onAdd, roles, groups, tenants }) {
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
    if (userLogin.tenantId !== 1) {
      setFormData((prev) => ({ ...prev, tenantId: userLogin.tenantId }));
    }
  }, [userLogin.tenantId]);

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    onAdd(formData);
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
          <div className="formInput flex gap-2 px-2">
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
            <div className="formInput flex px-2">
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

          <div className="formInput flex gap-2">
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="Password"
              onChange={(e) => handleChangeInput(e)}
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => handleChangeInput(e)}
            />
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
