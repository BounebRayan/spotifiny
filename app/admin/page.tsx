"use client";

import React, { useState, useEffect } from "react";
import { MdAdminPanelSettings } from "react-icons/md";

const OrderPage = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [plan, setPlan] = useState("Solo");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [addKeyMessage, setAddKeyMessage] = useState("");
  const [purchasedKeys, setPurchasedKeys] = useState<string[]>([]);
  const [searchedKeys, setSearchedKeys] = useState<string[]>([]);
  const [availableKeys, setAvailableKeys] = useState<number | null>(null);
  const [fetchingStock, setFetchingStock] = useState(true);
  const [SoldKeys, setSoldKeys] = useState<number | null>(null);
  const [uniqueEmails, setUniqueEmails] = useState<number | null>(null);
  const [fetchingSold, setFetchingSold] = useState(true);
  const [newKey, setNewKey] = useState("");
  const [addingKey, setAddingKey] = useState(false);

  const fetchAvailableKeys = async () => {
    setFetchingStock(true);
    try {
      const response = await fetch("/api/keys/check-stock");

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const keyCount = await response.json();
      setAvailableKeys(keyCount);
      setFetchingStock(false);
    } catch (error) {
      console.error("Failed to fetch available keys:", error);
      setAvailableKeys(null);
      setFetchingStock(false);
    }
  };

  const fetchSoldKeys = async () => {
    setFetchingSold(true);
    try {
      const response = await fetch("/api/keys/check-sold");

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setSoldKeys(result.soldKeys);
      setUniqueEmails(result.uniqueEmails);
      setFetchingSold(false);
    } catch (error) {
      console.error("Failed to fetch available keys:", error);
      setSoldKeys(null);
      setFetchingSold(false);
    }
  };


  useEffect(() => {
    fetchAvailableKeys();
    fetchSoldKeys();
  }, []);

  const handleSubmit = async () => {
    if (!id || !email || !password || !plan || fetchingStock || availableKeys === 0) {
      setOrderMessage("Please fill out all fields and ensure there is available stock.");
      return;
    }

    setLoading(true);
    setOrderMessage("");
    setPurchasedKeys([]);

    try {
      const response = await fetch(
        "/api/order/pass-order",
        {method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({ paymentId: id, type: plan, email: email, password: password }),}
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.keys && Array.isArray(result.keys) && result.keys.length > 0) {
        setPurchasedKeys(result.keys.map((keyObj: { key: string }) => keyObj.key));
        setOrderMessage("Order successfully processed!");
        fetchAvailableKeys();
      } else {
        setOrderMessage("No keys returned. Please check your order details.");
      }
    } catch (error) {
      setOrderMessage(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchEmail || !password ) {
      setSearchMessage("Please fill out all fields and ensure there is available stock.");
      return;
    }

    setLoading(true);
    setSearchMessage("");
    setSearchedKeys([]);

    try {
      const response = await fetch(
        "/api/order/search?email=" + searchEmail+ "&password=" + password
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.keys && Array.isArray(result.keys) && result.keys.length > 0) {
        setSearchedKeys(result.keys.map((keyObj: { key: string }) => keyObj.key));
 
      } else {
        setSearchMessage("No keys returned. Please check your order details.");
      }
    } catch (error) {
      setSearchMessage(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddKey = async () => {
    if (!newKey) {
      setAddKeyMessage("Please enter a key.");
      return;
    }

    setAddingKey(true);
    try {
      const response = await fetch("/api/keys/add-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: newKey, password:password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        setAddKeyMessage("Key added successfully!");
        setNewKey("");
        fetchAvailableKeys(); // Refresh key count
      } else {
        setAddKeyMessage("Failed to add key.");
      }
    } catch (error) {
      setAddKeyMessage("Error adding key.");
    } finally {
      setAddingKey(false);
    }
  };

  return (
    <div className="">
      <div className="text-white text-center p-6 mt-6">
      <MdAdminPanelSettings  className="text-7xl text-green-500 mx-auto sm:mb-4 mb-3"/>
      <p className=" text-lg">
          Available Keys:{" "}
          {availableKeys !== null ? (
            <span className="font-semibold text-green-400">{availableKeys}</span>
          ) : (
            <span className="text-yellow-400">Loading...</span>
          )}
        </p>
      <p className=" text-lg">
          Sold Keys:{" "}
          {SoldKeys !== null ? (
            <span className="font-semibold text-green-400">{SoldKeys}</span>
          ) : (
            <span className="text-yellow-400">Loading...</span>
          )}
        </p>
        
        <p className="text-lg">
          Unique buyers:{" "}
          {uniqueEmails !== null ? (
            <span className="font-semibold text-green-400">{uniqueEmails}</span>
          ) : (
            <span className="text-yellow-400">Loading...</span>
          )}
        </p>
        <div className="w-1/2 mx-auto border-t border-gray-600 mt-6"></div>
    </div>
    <div className="flex flex-col lg:flex-row items-center justify-center p-6 text-white">
      {/* Left Side: Order Form */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Add an order</h1>

        <input
          type="text"
          placeholder="Enter a unique ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="p-2 mb-4 rounded text-white w-80 bg-[#121212] border border-[#818181]  outline-none hover:border-white focus:border-white"
          required
        />
        <input
          type="email"
          placeholder="Enter Client Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-4 rounded text-white w-80 bg-[#121212] border border-[#818181]  outline-none hover:border-white focus:border-white"
          required
        />
        <input
          type="password"
          placeholder="Enter the Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 rounded text-white w-80 bg-[#121212] border border-[#818181]  outline-none hover:border-white focus:border-white"
          required
        />
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="p-2 mb-4 rounded text-white w-80 bg-[#121212] border border-[#818181]  outline-none hover:border-white focus:border-white"
          required
        >
          <option value="Solo">Solo</option>
          <option value="Duo" disabled={availableKeys !== null && availableKeys < 2}>
            Duo {availableKeys !== null && availableKeys < 2 ? "(Not enough stock)" : ""}
          </option>
          <option value="Family" disabled={availableKeys !== null && availableKeys < 3}>
            Family {availableKeys !== null && availableKeys < 3 ? "(Not enough stock)" : ""}
          </option>
        </select>
        
        <button
          onClick={handleSubmit}
          disabled={loading || fetchingStock || availableKeys === 0 || !id || !email || !password || !plan}
          className="bg-green-500 w-80 px-6 text-black py-3 rounded-full font-semibold hover:bg-green-400 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Create Order"}
        </button>

        {orderMessage && (
          <p className={`mt-4 text-lg font-semibold ${purchasedKeys.length ? "text-green-400" : "text-red-400"}`}>
            {orderMessage}
          </p>
        )}

        {purchasedKeys.length > 0 && (
          <ul className="mt-4 space-y-2">
            <li className="text-lg font-bold">Returned Keys:</li>
            {purchasedKeys.map((key, index) => (
              <li key={index} className="text-2xl font-semibold bg-gray-800 p-2 rounded-md">
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Side: Add Key Form */}
      <div className="w-full lg:w-1/2 p-6 rounded-lg flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Add a new key</h2>

        <input
          type="text"
          placeholder="Enter the key to add"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="p-2 mb-4 rounded text-white w-80 bg-[#121212] border border-[#818181]  outline-none hover:border-white focus:border-white"
        />
        <input
          type="password"
          placeholder="Enter the Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 rounded text-white w-80 bg-[#121212] border border-[#818181]  outline-none hover:border-white focus:border-white"
          required
        />
        <button
          onClick={handleAddKey}
          disabled={addingKey || !newKey || !password}
          className="bg-green-500 w-80 px-6 py-3 text-black rounded-full font-semibold hover:bg-green-400 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {addingKey ? "Adding..." : "Add Key"}
        </button>

        {addKeyMessage && (
          <p className={`mt-4 text-lg font-semibold ${addKeyMessage.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {addKeyMessage}
          </p>
        )}
      </div>
      {/* Left Side: Order Form */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Search by email</h1>

        

        <input
          type="email"
          placeholder="Enter Client Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="p-2 mb-4 rounded text-white w-80 bg-[#121212] border border-[#818181]  outline-none hover:border-white focus:border-white"
          required
        />
        <input
          type="password"
          placeholder="Enter the Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 rounded text-white w-80 bg-[#121212] border border-[#818181]  outline-none hover:border-white focus:border-white"
          required
        />
        
        <button
          onClick={handleSearch}
          disabled={loading || !searchEmail || !password }
          className="bg-green-500 w-80 px-6 text-black py-3 rounded-full font-semibold hover:bg-green-400 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Search"}
        </button>

        {searchMessage && (
          <p className={`mt-4 text-lg font-semibold ${searchedKeys.length ? "text-green-400" : "text-red-400"}`}>
            {searchMessage}
          </p>
        )}

        {searchedKeys.length > 0 && (
          <ul className="mt-4 space-y-2">
            <li className="text-lg font-bold">Returned Keys:</li>
            {searchedKeys.map((key, index) => (
              <li key={index} className="text-2xl font-semibold bg-gray-800 p-2 rounded-md">
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div></div>
  );
};

export default OrderPage;
