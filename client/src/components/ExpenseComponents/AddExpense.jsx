import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AddExpPopup } from "./componentHandler";

function AddExpense() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <>
            {/* Button to trigger the popup */}
            <div
                onClick={togglePopup}
                className="bg-[#00B37E] mb-[20px] py-2 px-4 rounded-[5px] flex items-center font-semibold text-black gap-3 transition-all duration-200 hover:cursor-pointer hover:scale-[1.04] group"
            >
                <div>Add expense</div>
                <FaPlus className="transition-transform duration-200 group-hover:rotate-90" />
            </div>

            {/* Popup Component */}
            {isPopupVisible && (
                <AddExpPopup
                    onClose={togglePopup}
                    onSubmit={togglePopup}
                />
            )}
        </>
    );
}

export default AddExpense;
