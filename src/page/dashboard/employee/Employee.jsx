import React, { useState, useEffect } from "react";
import axios from "axios";
import summaryApi from "@/common";
import CustomTable from "@/components/ui/CustomTable";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";

export default function Employee() {
  const { i18n } = useTranslation();
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const language = i18n.language;
  const headers = [
    { label: { en: "User Name", ar: "اسم المستخدم" }, key: "userName" },
    { label: { en: "Email", ar: "الايميل" }, key: "email" },
    { label: { en: "Phone", ar: "رقم الهاتف" }, key: "phone" },
    { label: { en: "Role", ar: "الصلاحيه" }, key: "role" },
  ];
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${summaryApi.users.url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [token]);

  const handleRoleClick = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser || !newRole) return;
    console.log(selectedUser);
    console.log(newRole);
    try {
      await axios.post(
        `${summaryApi.changeRole.url}`,
        { userId: selectedUser.id, role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prevData) =>
        prevData.map((user) =>
          user._id === selectedUser._id ? { ...user, role: newRole } : user
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4 w-full">
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Employee Management</h1>
        </header>

        <CustomTable
          headers={headers}
          language={language}
          data={data}
          actions={{ handleRoleClick }}
        />

        {/* Role Selection Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Change User Role</h2>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              >
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="user">User</option>
              </select>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500"
                >
                  Cancel
                </Button>
                <Button onClick={handleRoleUpdate} className="bg-blue-500">
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
