import PasswordSetting from "./PasswordSetting";
import React, {useState} from "react";

const PasswordEdit = () => {
    const [oldPassword, setOldPassword] = useState("");
  return (
    <form>
      <input
        type="password"
        value={oldPassword}
        placeholder="Enter old password"
        name="password"
        onChange={e => setOldPassword(e.target.value)}
      />
      <PasswordSetting />
    </form>
  );
};

export default PasswordEdit;
