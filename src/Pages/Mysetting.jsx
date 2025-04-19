import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Mysetting = () => {
  const { settingName } = useParams();
  const [currentSetting, setCurrentSetting] = useState(null);

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

  useEffect(() => {
    const readableName = settingName.split("-").join(" ").toLowerCase();
    const matchedSetting = settingsSchema.find(
      (s) => s.name.toLowerCase() === readableName
    );
    setCurrentSetting(matchedSetting);
  }, [settingName]);

  const renderSettingInput = (setting) => {
    switch (setting.type) {
      case "checkbox":
        return (
          <label>
            <input type="checkbox" /> {setting.name}
          </label>
        );
      case "text":
        return (
          <label>
            {setting.name}: <input type="text" />
          </label>
        );
      case "select":
        return (
          <label>
            {setting.name}:{" "}
            <select>
              {setting.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pl-40 text-white">
      {currentSetting ? (
        <div className="space-y-4 text-lg">
          {renderSettingInput(currentSetting)}
        </div>
      ) : (
        <div>Setting not found.</div>
      )}
    </div>
  );
};

export default Mysetting;
