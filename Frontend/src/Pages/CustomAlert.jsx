import React, { useState } from "react";

const CustomAlert = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const submitForm = () => {
    const userEmail = prompt("Enter your email:");
    if (userEmail) {
      setEmail(userEmail);
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={submitForm}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition"
      >
        Submit Form
      </button>

      {showAlert && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={closeAlert}
          ></div>

          {/* Alert Box */}
          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-sm text-center animate-fadeIn">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Form Submitted!
            </h3>
            <p className="mb-4 text-gray-600">Email: {email}</p>
            <button
              onClick={closeAlert}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Okay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomAlert;
