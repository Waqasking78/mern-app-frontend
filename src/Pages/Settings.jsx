import React, { useState } from "react";

const settingsSchema = [
  { name: "Private Account", type: "checkbox" },
  {
    name: "Who Can See Posts",
    type: "select",
    options: ["Everyone", "Followers", "Only Me"],
  },
  { name: "Hide Story From", type: "text" },
  {
    name: "Allow Comments From",
    type: "select",
    options: ["Everyone", "Followers", "No One"],
  },
  {
    name: "Allow Likes From",
    type: "select",
    options: ["Everyone", "Followers", "No One"],
  },
  { name: "Hide Likes", type: "checkbox" },
  { name: "Blocked Users", type: "text" },
  { name: "Muted Users", type: "text" },
  {
    name: "Message Requests From",
    type: "select",
    options: ["Everyone", "People I Follow", "No One"],
  },
  { name: "Show Read Receipts", type: "checkbox" },
  { name: "Allow Reactions", type: "checkbox" },
  { name: "Notify On Like", type: "checkbox" },
  { name: "Notify On Comment", type: "checkbox" },
  { name: "Notify On Follow", type: "checkbox" },
  { name: "Notify On DM", type: "checkbox" },
  { name: "Notify When Tagged", type: "checkbox" },
  {
    name: "Theme",
    type: "select",
    options: ["Light", "Dark", "System"],
  },
  {
    name: "Language",
    type: "select",
    options: ["English", "Urdu", "Spanish"],
  },
  {
    name: "Font Size",
    type: "select",
    options: ["Small", "Medium", "Large"],
  },
  { name: "Filter Sensitive Content", type: "checkbox" },
  { name: "Auto Delete Old Stories", type: "checkbox" },
];

const Settings = () => {
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (setting, value) => {
    setFormData((prev) => ({ ...prev, [setting]: value }));
  };

  const handleSubmit = () => {
    console.log(formData)
    setShowModal(true);
  };

  const filteredSettings = settingsSchema.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pl-40">
      <div className="flex flex-col h-screen bg-black text-white">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-800 bg-black z-10">
          <input
            type="text"
            placeholder="Search settings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Settings List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredSettings.map((setting, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-xl border border-gray-800 shadow hover:bg-gray-800 transition flex items-center justify-between"
            >
              <p className="font-medium w-1/2">{setting.name}</p>

              {/* Render input type based on setting */}
              {setting.type === "checkbox" && (
                <input
                  type="checkbox"
                  checked={formData[setting.name] || false}
                  onChange={(e) =>
                    handleChange(setting.name, e.target.checked)
                  }
                  className="w-5 h-5 accent-white"
                />
              )}

              {setting.type === "select" && (
                <select
                  value={formData[setting.name] || setting.options[0]}
                  onChange={(e) => handleChange(setting.name, e.target.value)}
                  className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
                >
                  {setting.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {setting.type === "text" && (
                <input
                  type="text"
                  value={formData[setting.name] || ""}
                  onChange={(e) => handleChange(setting.name, e.target.value)}
                  className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded w-1/2"
                  placeholder="Enter Username..."
                />
              )}
            </div>
          ))}

          {filteredSettings.length === 0 && (
            <p className="text-gray-500 text-center mt-10">No settings found.</p>
          )}
        </div>

        {/* Save Button */}
        <div className="p-4 border-t border-gray-800 bg-black">
          <button
            onClick={handleSubmit}
            className="w-full bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-300 transition"
          >
            Save Settings
          </button>
        </div>

        {/* Modal on Save */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Settings Saved</h2>
              <ul className="space-y-1 max-h-60 overflow-y-auto text-sm">
                {Object.entries(formData).map(([key, value]) => (
                  <li key={key}>
                    ✅ {key}: <span className="text-gray-300">{value.toString()}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
