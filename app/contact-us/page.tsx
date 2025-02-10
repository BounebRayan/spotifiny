'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);  // State for loading indicator
  const [success, setSuccess] = useState<string | null>(null); // Success message state
  const [error, setError] = useState<string | null>(null); // Error message state

  const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setAttachments([...attachments, ...files]);
    }
  };

  const handleSubmit = async () => {
    if (!key || !message || !email) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Set loading to true when starting the request
    setSuccess(null);  // Clear previous success messages
    setError(null);  // Clear previous error messages

    const formData = new FormData();
    formData.append("email", email);
    formData.append("key", key);
    formData.append("message", message);
    
    // Append all files to the form data
    attachments.forEach(file => {
      formData.append("attachments", file);
    });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess("Your message has been sent successfully!");
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);  // Set loading to false after request completes
    }
  };

  return (
    <motion.div
      className="pb-8 pt-12 px-8 md:px-24  text-white min-h-screen flex flex-col items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >   
      <MdContactSupport className="text-5xl text-green-500 mx-auto mb-4"/>
      <h2 className="text-4xl font-bold mb-3 text-center">Contactez-nous</h2>
      <p className="text-gray-400 text-center mb-4 max-w-lg">
        Besoin d'aide ? Décrivez votre problème ou posez-nous vos questions.
      </p>
      <div className="w-1/3 mx-auto border-t border-gray-600 mb-6"></div>

      {/* Form */}
      <div className="w-full max-w-lg">
      <div className="mb-2">
          <label htmlFor="key" className="font-semibold mb-1 block text-sm">Email</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-[#121212] border border-[#818181] rounded outline-none hover:border-white focus:border-white"
            placeholder="Entrez votre email ici"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Key Input */}
        <div className="mb-4">
          <label htmlFor="key" className="font-semibold mb-1 block text-sm">Clé</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-[#121212] border border-[#818181] rounded outline-none hover:border-white focus:border-white"
            placeholder="Entrez votre clé ici"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label htmlFor="key" className="font-semibold mb-1 block text-sm">Votre message</label>
          <textarea
            className="w-full px-4 py-2.5 bg-[#121212] border border-[#818181] rounded outline-none hover:border-white focus:border-white h-32"
            placeholder="Décrivez votre problème ou posez votre question"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Attachment Button */}
        <div className="mb-4">
          <label htmlFor="key" className="font-semibold mb-1 block text-sm">Captures d'écran (optionnel)</label>
          <input
            type="file"
            multiple
            className="hidden"
            id="fileUpload"
            onChange={handleAttachment}
          />
          <label
            htmlFor="fileUpload"
            className="flex items-center gap-2 cursor-pointer text-green-500 hover:text-green-400 transition"
          >
            <FaPaperclip /> Ajouter des fichiers
          </label>

          {/* Show attached files */}
          {attachments.length > 0 && (
            <p className="text-sm text-gray-400 mt-2">
              {attachments.length} fichier(s) ajouté(s)
            </p>
          )}
        </div>

        {/* Error/Success Messages */}
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-500 text-center mb-2">{success}</p>}

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-400 hover:scale-105 duration-300 transition text-white py-2 rounded-full flex items-center justify-center gap-2 font-semibold"
          disabled={loading}
        >
          {loading ? "Envoi..." : <><FaPaperPlane /> Envoyer</>}
        </button>
      </div>
    </motion.div>
  );
}
