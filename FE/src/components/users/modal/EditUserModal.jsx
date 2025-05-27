/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../../../services/axios.service";
import { Form } from "../../../shared/Form";
import { Input } from "../../../shared/Input";
import SelectInput from "../../../shared/SelectInput";
import { AlertMessage } from "../../../shared/Alert";
import { AnimatePresence } from "motion/react";
import { Button } from "../../../shared/Button";

export function EditUserModal({ onClose, data = [], setModalType, setAlert }) {
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
    setFormData({
      username: data?.username,
      email: data?.email,
      fullname: data?.fullname,
      roleId: data?.roleId,
      tenantId: data?.tenantId,
      grupId: data?.grupId,
    });
  }, []);

  useEffect(() => {
    fetchAllRole();
    fetchAllGrup();
    fetchAllTenant();
  }, []);

  const fetchAllRole = async () => {
    try {
      const response = await api.get("/master/roles");

      setRoleData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllGrup = async () => {
    try {
      const response = await api.get("/master/groups");

      setGrupData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllTenant = async () => {
    try {
      const response = await api.get("/master/tenants");

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

    let newData = {
      username: formData.username,
      email: formData.email,
      fullname: formData.fullname,
      roleId: parseInt(formData.roleId),
      grupId: parseInt(formData.grupId),
      tenantId: parseInt(formData.tenantId),
      password: formData.password,
    };

    try {
      let response = await api.put(`/master/user/${data?.userId}`, newData);
      onClose();
      setAlert({
        show: true,
        message: "Edit User Successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Edit user failed:", error.response?.data || error.message);
      setAlert({
        show: true,
        message: "Edit User Failed!",
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
              style="text-md bg-primary rounded-xl text-white py-2 px-4 hover:bg-dark-primary w-full"
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
