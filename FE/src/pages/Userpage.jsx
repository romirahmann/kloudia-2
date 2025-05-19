/* eslint-disable no-unused-vars */
import { PanelFilterUser } from "../components/users/PanelFilterUser";
import { TableUser } from "../components/users/TableUser";

export function Userpage() {
  return (
    <>
      <div className="max-w-full">
        <div className="bg-white rounded-md p-9">
          <PanelFilterUser />
          <div className="overflow-x-auto mt-10">
            <TableUser />
          </div>
        </div>
      </div>
    </>
  );
}
