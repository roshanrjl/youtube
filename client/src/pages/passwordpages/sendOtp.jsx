import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import { Input } from "../../components/components/ui/input";
import { Button } from "../../components/components/ui/button";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/userApi/userapi";

function SendOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate()

  // Handle input change
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input if not empty
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleData=async()=>{
    try{
      const response = await verifyOtp({otp})
      if(response.status == 200){
        // ToDo:make the toast which display "otp verify successfully"
        navigate("/resetPassword")
      }else{
        // ToDo:make the toast which display "invalid Otp" 
      }

    }catch(error){
      console.error("something went wrong")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Enter OTP
          </CardTitle>
          <CardDescription className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
            Please enter the 6-digit OTP sent to your registered email.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 mt-6 flex justify-center">
          <div className="flex gap-3">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center text-lg font-semibold 
                           bg-gray-50 dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100 
                           border border-gray-300 dark:border-gray-600 
                           focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 flex flex-wrap gap-3 justify-center">
          <Button className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-600 text-white rounded-md px-6 py-2 transition-colors"
          onClick={handleData()}          
          >
            Verify
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-600 text-white rounded-md px-6 py-2 transition-colors"
          onClick={()=>(
            navigate("/sendEmail")
          )}
          >
            back
          </Button>
          <Button className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-6 py-2 transition-colors"
          onClick={()=>(
            navigate("/")
          )}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SendOtp;
