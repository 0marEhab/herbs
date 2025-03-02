import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import summaryApi from "@/common";
import { X } from "lucide-react";
import Select from "react-select";
const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    countryId: "",
  });
  const [countries, setCountries] = useState([]);
  const [cookie] = useCookies(["accessToken"]);

  useEffect(() => {
    fetchAddresses();
    fetchCountry();
  }, []);

  const handleCountryChange = (selectedOption) => {
    setNewAddress((prev) => ({
      ...prev,
      countryId: selectedOption.value,
    }));
  };

  const fetchCountry = async () => {
    try {
      const response = await axios.get(summaryApi.getCountry.url, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
        },
      });

      const formattedCountries = response.data.map((country) => ({
        value: country.id, // or country.en if the backend expects the name
        label: country.en, // Display English name in the dropdown
      }));

      setCountries(formattedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(summaryApi.address.url, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
        },
      });
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    console.log(newAddress);
    try {
      await axios.post(summaryApi.address.url, newAddress, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      fetchAddresses(); // Refresh addresses
      setNewAddress({
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        countryId: 0,
      });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`${summaryApi.address.url}/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
        },
      });
      fetchAddresses(); // Refresh addresses after deletion
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800">Your Addresses</h3>
      {addresses.length === 0 ? (
        <p className="text-gray-600">No addresses found.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="p-3 w-full border rounded bg-gray-100 flex justify-between items-center"
            >
              <div>
                <p>
                  {address.streetAddress}, {address.city}, {address.state},{" "}
                  {address.postalCode}
                </p>
                <p>
                  Country: {address.countryName.en}{" "}
                  {address.isDefault && (
                    <span className="text-green-600">(Default)</span>
                  )}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="bg-red-600  flex items-center justify-center text-white h-7 w-7 rounded-full hover:bg-red-700 transition"
                >
                  <X size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add Address Form */}
      <form onSubmit={handleAddAddress} className="mt-4 space-y-3">
        <input
          type="text"
          placeholder="Street Address"
          value={newAddress.streetAddress}
          onChange={(e) =>
            setNewAddress({ ...newAddress, streetAddress: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={newAddress.city}
          onChange={(e) =>
            setNewAddress({ ...newAddress, city: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={newAddress.state}
          onChange={(e) =>
            setNewAddress({ ...newAddress, state: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={newAddress.postalCode}
          onChange={(e) =>
            setNewAddress({ ...newAddress, postalCode: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <Select
          options={countries}
          onChange={handleCountryChange}
          placeholder="Select a Country"
          className="text-black"
        />

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg text-lg font-medium shadow-md hover:bg-green-900 transition"
        >
          Add Address
        </button>
      </form>
    </div>
  );
};

export default AddressList;
