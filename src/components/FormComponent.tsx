import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormComponentProps {
  setUserData: React.Dispatch<
    React.SetStateAction<{ firstName: string; mobile: string }>
  >;
}

const FormComponent: React.FC<FormComponentProps> = ({ setUserData }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserData({ firstName, mobile });
    navigate("/map");
  };

  return (
    <div className="form-container">
      <h2>Enter credentials</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter Name"
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter 10 digit Mobile Number"
            required
            pattern="[0-9]{10}"
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
