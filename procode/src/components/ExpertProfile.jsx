import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function ExpertProfile({ expert }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [isDateMissing, setIsDateMissing] = useState(false); // Track if date is missing

  const handleSlotClick = (slot) => {
    if (!selectedDate) {
      
      setIsDateMissing(true);
      setBookingMessage("Please select a date first.");
      setShowModal(true);
      return;
    }
    
    if (!slot.available) return;
    setSelectedSlot(slot.id);
    setBookingMessage(
      `You have booked the slot on ${selectedDate} at ${slot.time}`
    );
    setIsDateMissing(false); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  
  const filteredSlots = expert.timeSlots.filter((slot) =>
    selectedDate ? slot.date === selectedDate : true
  );

  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={expert.profileImage}
          alt={expert.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{expert.name}</h2>
          <p className="text-sm text-gray-600">{expert.title}</p>
        </div>
      </div>
      <p className="text-gray-800 mb-4">{expert.bio}</p>

    
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Select a Date:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <h3 className="text-lg font-semibold mb-3">Available Time Slots</h3>
      <div className="grid grid-cols-2 gap-4">
        {filteredSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => handleSlotClick(slot)}
            className={`p-2 rounded text-sm font-medium ${
              slot.available
                ? selectedSlot === slot.id
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <div className="flex items-center gap-2 text-green-600">
              {isDateMissing ? (
                <FaExclamationCircle className="text-red-500" />
              ) : (
                <FaCheckCircle />
              )}
              <span>{bookingMessage}</span>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
