'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaRandom, FaRegQuestionCircle, FaUndo } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const RenewPage = () => {
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({
    key: "",
    spotifyusername: "",
    pwd: "",
    newEmail: "",
    country: "",
  });
  const [showNewAccount, setShowNewAccount] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [underMaintenance, setUnderMaintenance] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    fetch("/api/stock")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch(() => { setUnderMaintenance(true); return setCountries([])});
    setLoading(false);
  }, []);


  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggleNewAccount = () => setShowNewAccount(!showNewAccount);

  const generateRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 24); // Generate random string
    const email = `${randomString}@gmail.com`; // Create random email with "@example.com"
    setForm({ ...form, newEmail: email }); // Set the random email to the state
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Processing...");
    const res = await fetch("/api/renew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || "Renewal failed");
  };

  return (
    <motion.div 
      className="pb-16 md:pt-12 md:px-24  text-white "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
       <div className="flex flex-col max-w-xl items-center rounded-md  mx-auto text-white py-14 md:px-24 px-8">
        <FaUndo className="text-5xl text-green-500 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4 ">Renouvelez votre clé</h2>
        <div className="w-1/2 mx-auto border-t border-gray-600 mb-6"></div>

        <form onSubmit={handleSubmit} className="w-full">
        <label htmlFor="key" className="font-semibold mb-1 block text-sm">Clé</label>
          <input
            type="text"
            name="key"
            id="key"
            autoComplete="on"
            placeholder="Entrez votre clé ici"
            value={form.key}
            onChange={handleChange}
            required
            className="w-full p-2.5 mb-4 bg-[#121212] border border-[#818181] rounded outline-none hover:border-white focus:border-white"
          />

          <label htmlFor="spotifyusername" className="font-semibold mb-1 block text-sm">Nom d'utilisateur Spotify</label>
          <input
            type="text"
            name="spotifyusername"
            id="spotifyusername"
            autoComplete="on"
            placeholder="Nom d'utilisateur Spotify"
            value={form.spotifyusername}
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 bg-[#121212] border border-[#818181] rounded outline-none hover:border-white focus:border-white"
          />
          <label htmlFor="pwd" className="font-semibold mb-1 block text-sm">Mot de passe Spotify</label>
          <input
            type="password"
            name="pwd"
            placeholder="Mot de passe"
            value={form.pwd}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 bg-[#121212] border border-[#818181] rounded outline-none hover:border-white focus:border-white"
          />
          <Link href="/faq#renew" className="text-center w-full block mb-4 underline">En savoir plus sur les options de renouvellement</Link>

          <label className="flex items-center mb-4 w-full justify-center">
          <span className="mr-2 text-sm">Renouvelez la clé</span>
            <div
              className={`relative w-8 h-5 flex items-center rounded-full p-1 cursor-pointer ${
                showNewAccount ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={() => handleToggleNewAccount()}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full shadow-md transform duration-300 ${
                  showNewAccount ? 'translate-x-3' : ''
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm">Créer un nouveau compte</span>
          </label>


          {showNewAccount && (
            <>
             <label htmlFor="newEmail" className="font-semibold mb-1 block text-sm">Nouvelle adresse e-mail </label>
            <div className="flex gap-3 items-center justify-center mb-2">
              <input
                type="email"
                name="newEmail"
                id="newEmail"
                placeholder="Nouvelle adresse e-mail"
                value={form.newEmail}
                onChange={handleChange}
                className="w-5/6 p-2 bg-[#121212] border border-[#818181] rounded outline-none hover:border-white focus:border-white"
              />

              <FaRandom onClick={generateRandomEmail}  className="h-6 w-6 flex-grow cursor-pointer"/>

              </div>
              <label htmlFor="country" className="font-semibold mb-1 block text-sm">Pays</label>
              <div className="flex gap-2 items-center justify-center mb-4">
                
                <select
                  name="country"
                  id="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="w-5/6 p-2 bg-[#121212] border border-[#818181] rounded outline-none hover:border-white focus:border-white"
                >
                    <option value="">Sélectionner un pays</option>
                    {countries.map(({ country_code, country }) => (
                      <option key={country_code} value={country_code}>
                        {country}
                      </option>
                    ))}
                </select>        
            <div className="flex-grow outline-none">
      <FaRegQuestionCircle
        data-tooltip-id="info-tooltip"
        className="h-6 w-6  mx-auto cursor-pointer text-gray-300 hover:text-gray-500 outline-none"
      />
      <Tooltip id="info-tooltip" place="top" className="!bg-gray-900 !text-white !p-2 !rounded-md">
      Si votre pays est en rupture de stock, vous pouvez en choisir un autre. <br /> Cela n'affectera que légèrement les recommandations.
      </Tooltip>
    </div></div></>
          )}

          <button
            type="submit"
            disabled={ loading || underMaintenance}
            className={`w-full mt-1 bg-green-500 text-black font-bold p-3 outline-none hover:bg-green-400 hover:scale-105 duration-300 transition-all rounded-full disabled:bg-slate-500 ${underMaintenance || loading ? "cursor-not-allowed" : ""}`}
          >
            Renew
          </button>
        </form>

        {message && <p className="mt-4">{message}</p>}
      </div>
    </motion.div>
  );
};

export default RenewPage;
