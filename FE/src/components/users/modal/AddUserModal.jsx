/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Input } from "../../../shared/Input";
import SelectInput from "../../../shared/SelectInput";
import { Button } from "../../../shared/Button";
import { Form } from "../../../shared/Form";
import { AlertMessage } from "../../../shared/Alert";
import { AnimatePresence } from "motion/react";
import api from "../../../services/axios.service";
import { label } from "motion/react-client";

export function AddUserModal({ onClose }) {
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
  const [roleData, setRoleData] = useState([]);
  const [grupData, setGrupData] = useState([]);
  const [tenants, setTenantData] = useState([]);
  const [alert, setAllert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const userLogin = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    fetchAllRole();
    fetchAllGrup();
    fetchAllTenant();
  }, []);

  const fetchAllRole = async () => {
    try {
      const response = await api.get("/master/roles");
      //   console.log(response.data.data);
      setRoleData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllGrup = async () => {
    try {
      const response = await api.get("/master/groups");
      //   console.log(response.data.data);
      setGrupData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllTenant = async () => {
    try {
      const response = await api.get("/master/tenants");
      //   console.log(response.data.data);
      setTenantData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tenantId) {
      setFormData({ ...formData, tenantId: userLogin.tenantId });
    }

    if (
      !formData.username ||
      !formData.email ||
      !formData.fullname ||
      !formData.roleId ||
      !formData.grupId ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setAllert({
        show: true,
        message: "All Required!",
        type: "warning",
      });
      return;
    }

    if (formData.password.length < 7) {
      setAllert({
        show: true,
        message: "Password must have at least 8 characters!",
        type: "error",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setAllert({
        show: true,
        message: "Password Not Match!",
        type: "error",
      });
      return;
    }

    let data = {
      username: formData.username,
      email: formData.email,
      fullname: formData.fullname,
      roleId: parseInt(formData.roleId),
      grupId: parseInt(formData.grupId),
      tenantId: parseInt(formData.tenantId),
      password: formData.password,
    };

    try {
      let response = await api.post("/master/register", data);
      // console.log(response.data.data);
      setAllert({
        show: true,
        message: "Add User Successfully!",
        type: "success",
      });
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.log(error);
      setAllert({
        show: true,
        message: "Add User Failed!",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="form">
        <Form>
          <div className="formInput flex gap-2">
            <Input
              name="fullname"
              value={formData.fullname}
              placeholder="Fullname"
              onChange={(e) => handleChangeInput(e)}
            />
            <Input
              name="username"
              value={formData.username}
              placeholder="username"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="formInput flex gap-2">
            <Input
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
              options={grupData.map((grup) => ({
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
              options={roleData.map((role) => ({
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

          <div className="formInput flex gap-2">
            <Input
              name="password"
              type="password"
              value={formData.password}
              placeholder="Password"
              onChange={(e) => handleChangeInput(e)}
            />
            <Input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="formInput flex gap-2">
            <Button
              funct={(e) => handleSubmit(e)}
              style="text-md bg-primary rounded-xl text-white py-2 px-4 hover:bg-dark-primary w-full"
              type="submit"
            >
              SUBMIT
            </Button>
          </div>
        </Form>
      </div>
      <AnimatePresence>
        {alert.show && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAllert({ show: false, message: "", type: "" })}
          />
        )}
      </AnimatePresence>
    </>
  );
}
