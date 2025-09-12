import React, { useState } from "react";
import { initiatePayment } from "../api/paymentApi/paymentApi";
import  { useId } from "react";

function Premium() {
    const id = useId();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  
  
  const handlepayment =async()=>{
    const payload={
      amount:selectedPlan,
      method:paymentMethod,
      transactionId:id
    }
    console.log('checking value:',payload )
    try{
      const response =await initiatePayment(payload)
      console.log("response from backend:",response)
      if(paymentMethod=="Esewa"){
        const payload = response.data.payload
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        Object.entries(payload).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      }else if
      (paymentMethod=="Khalti"){

         const khaltiPaymentUrl = response.data.khaltiPaymentUrl;
        window.location.href = khaltiPaymentUrl;
      }
    }catch(error){
      console.log("something went wrong:"+error)
    }
  }
  

  const plans = [
    { name: "Monthly", price:  2000 },
    { name: "3 Months", price: 5000 },
    { name: "6 Months", price:  10000 },
    { name: "12 Months", price:  15000 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Column: Features */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
          <h1 className="text-2xl font-bold mb-4">MyTube Premium Features</h1>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Ad-Free Videos:</strong> Watch videos without ads for smoother viewing.</li>
            <li><strong>Background Play:</strong> Videos keep playing when switching apps or locking your phone.</li>
            <li><strong>YouTube Music Premium:</strong> Ad-free music, offline downloads, and background play.</li>
            <li><strong>Offline Downloads:</strong> Download videos and playlists to watch offline.</li>
            <li><strong>Exclusive Content:</strong> Access YouTube Originals and premium-only content.</li>
            <li><strong>Picture-in-Picture (PiP):</strong> Watch videos in a floating window while using other apps.</li>
            <li><strong>Cross-Device Sync:</strong> Sync playlists and offline videos across devices.</li>
            <li><strong>Family & Student Plans:</strong> Share with family or get student discounts.</li>
            <li><strong>Bonus:</strong> Higher quality streaming and better background audio support.</li>
          </ol>
        </div>

        {/* Right Column: Plans & Payment */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-6">
          {/* Plans */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Select Your Plan</h2>
            <div className="grid grid-cols-2 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.price)}
                  className={`p-4 rounded-lg text-center font-semibold cursor-pointer transition
                    ${selectedPlan === plan.price
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {plan.name} <br /> {plan.price}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Select Payment Method</h2>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Khalti"
                  checked={paymentMethod === "Khalti"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-200">Khalti</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Esewa"
                  checked={paymentMethod === "Esewa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-200">Esewa</span>
              </label>
            </div>

            <button 
            className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handlepayment}
            >
              Process Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
