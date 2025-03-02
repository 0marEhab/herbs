import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Trash2 } from "lucide-react"; // Import Trash2 icon for delete
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { fetchCart } from "@/redux/cartSlice"; // Import fetchCart action
import UserContext from "@/Contexts/UserContext";
import { useTranslation } from "react-i18next";
import summaryApi from "@/common";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
export default function Cart() {
  const { user } = useContext(UserContext);
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const language = i18n.language;
  const dispatch = useDispatch();
  const [cookies] = useCookies(["accessToken"]);
  const {
    items: cartItems,
    status,
    error,
  } = useSelector((state) => state.cart);
  console.log(cartItems);
  const formatAddressOptions = (addresses) => {
    return addresses.map((addr) => ({
      value: String(addr.id), // Convert to string
      label: `${addr.streetAddress || "No Street"}, ${
        addr.state || "No State"
      }, ${addr.countryName.en}`,
    }));
  };

  useEffect(() => {
    getAddress();
    if (cookies.accessToken && user?.id) {
      dispatch(
        fetchCart({ userId: user.id, accessToken: cookies.accessToken })
      );
    }
  }, [dispatch, cookies.accessToken, user?.id]);

  const getAddress = async () => {
    try {
      const res = await axios.get(summaryApi.address.url, {
        headers: { Authorization: `Bearer ${cookies.accessToken}` },
      });

      const formattedAddresses = formatAddressOptions(res.data);
      setAddressList(formattedAddresses);

      if (formattedAddresses.length > 0) {
        setSelectedAddress(formattedAddresses[0].value); // Default to first address
      }
    } catch (error) {
      console.error("Error fetching address", error);
    }
  };

  const handleUpdateQuantity = async (action, item) => {
    if (!item) {
      console.error("Item is undefined!");
      return;
    }

    try {
      await axios.put(
        `${summaryApi.quantity.url}${
          action === "increase" ? "increase-quantity" : "decrease-quantity"
        }`,
        null,
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
          params: { userId: user.id, cartItemId: item.id },
        }
      );

      dispatch(
        fetchCart({ userId: user.id, accessToken: cookies.accessToken })
      );
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleDeleteItem = async (id) => {
    const res = await axios.delete(
      `${summaryApi.deleteCart.url}/${user.id}/remove-item/${id} `,
      {
        headers: { Authorization: `Bearer ${cookies.accessToken}` },
      }
    );
    dispatch(fetchCart({ userId: user.id, accessToken: cookies.accessToken }));
  };

  const createOrder = async () => {
    const selectedAddr = addressList.find(
      (addr) => addr.value === selectedAddress
    );
    console.log(selectedAddr);
    try {
      await axios.post(
        `${summaryApi.createOrder.url}`,
        { userId: user.id, shipping_Address: selectedAddr.label },
        { headers: { Authorization: `Bearer ${cookies.accessToken}` } }
      );
      toast({
        title: "success",
        description: "order sended successfully",
      });
      dispatch(
        fetchCart({ userId: user.id, accessToken: cookies.accessToken })
      );
      // Open WhatsApp with a message
      const phoneNumber = "+201101740808";
      let message = `Hello, I want to confirm my order.\nOrder ID: 1\nItems:\n`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  const total =
    cartItems?.items?.reduce(
      (acc, item) =>
        acc +
        (item.hasDiscount
          ? item.discountedPrice * item.quantity
          : item.price * item.quantity),
      0
    ) || 0;

  const handleOrderClick = () => {
    const orderId = 1;
    const phoneNumber = "+201101740808"; // Target WhatsApp number
    let message = `Hello, I want to place an order.\nOrder ID: ${orderId}\nItems:\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 md:p-8 gap-6">
      {/* Cart Items */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Your Cart</h1>

        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 ? (
            cartItems.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row w-full items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-center  gap-4 w-full md:w-auto">
                  <img
                    src={
                      summaryApi.domain.url +
                      "static/images/" +
                      item.productImages[0]
                    }
                    alt={item.productEnglishName}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover"
                  />
                  <div className="">
                    <h2 className="font-semibold text-base md:text-lg truncate">
                      {language == "en"
                        ? item.productEnglishName
                        : item.productArabicName}
                    </h2>
                    <p className="text-lg font-semibold mt-1">
                      {item.hasDiscount ? (
                        <>
                          <span className="text-gray-500 line-through mr-2">
                            ${item?.price}
                          </span>
                          <span className="text-red-600">
                            ${item.discountedPrice}
                          </span>
                        </>
                      ) : (
                        <span>{item?.price}</span>
                      )}
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {item.variantOptionValue}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button
                    className="w-8 h-8 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                    onClick={() => handleUpdateQuantity("decrease", item)}
                  >
                    <span className="text-lg">-</span>
                  </Button>
                  <span className="px-3 text-base">{item.quantity}</span>
                  <Button
                    className="w-8 h-8 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                    onClick={() => handleUpdateQuantity("increase", item)}
                  >
                    <span className="text-lg">+</span>
                  </Button>

                  <Button
                    variant="ghost"
                    className="p-2 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                    onClick={() => handleDeleteItem(item.id)}
                    aria-label="Delete item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full md:w-1/3 flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        <div className="flex flex-col gap-4">
          <hr className="my-2" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        <Button
          className="mt-4 rounded-xl"
          onClick={() => setIsModalOpen(true)}
          disabled={!cartItems?.items || cartItems?.items.length === 0}
        >
          Order →
        </Button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Select Address</h2>
            {addressList.length == 0 ? (
              <>
                <p className=" m-5 bg-slate-300 py-3 px-4 font-body font-bold rounded-xl">
                  please add an address from your profile{" "}
                  <span>
                    <Link
                      to="/profile"
                      className="bg-blue-400 hover:bg-blue-600 duration-300 shadow shadow-black px-2 py-1 rounded-xl"
                    >
                      go to profile
                    </Link>
                  </span>
                </p>
              </>
            ) : (
              <select
                className="w-full p-2 border rounded-md mb-4"
                value={selectedAddress}
                onChange={(e) => {
                  console.log("Selected Address Value:", e.target.value);
                  setSelectedAddress(e.target.value);
                }}
              >
                {addressList.map((addr) => (
                  <option key={addr.value} value={addr.value}>
                    {addr.label}
                  </option>
                ))}
              </select>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createOrder}>Confirm Order</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
