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
import { resetPassword } from "../../api/userApi/userapi";

function Changepassword() {
  const [Password, setPassword]= useState()
  const [comformPassword, setConformPassword]= useState()

  const navigate = useNavigate()

  const handlePassword =async()=>{
     if(Password!==comformPassword){
      console.error("conform password should match password")
     }

     try{
      const response = await resetPassword({Password})
      if(response.status==200){
        // TODO: make the toast that display "password reset successfully"
        navigate("/")
      }else{
        // TODo: make the toast that display "could not rest password please try again"
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
            Reset Password
          </CardTitle>
          <CardDescription className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
            Do not share your password with anyone
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 mt-4 space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
               Password
            </label>
            <Input
              type="password"
              placeholder="reset password"
              onChange={(e)=>setPassword(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Conform Password
            </label>
            <Input
              type="password"
              placeholder=" Conform password"
              onChange={(e)=>setConformPassword(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
            />
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 flex flex-wrap gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors"
           onClick={handlePassword()}
          >
            Reset Password
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-md px-4 py-2 transition-colors"
          onClick={()=>(
            navigate("/sendOtp")
          )}
          >
           Back
          </Button>
          <Button className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-4 py-2 transition-colors"
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

export default Changepassword;
