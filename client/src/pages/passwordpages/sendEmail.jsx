import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import React from 'react'
import { Input } from "../../components/components/ui/input";
import { Button } from "../../components/components/ui/button";

function SendEmail() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
          <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Enter Email
              </CardTitle>
              <CardDescription className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
               <h1>Note:</h1>
               <p>The email you have enter should match to the email that you had use while registering. The otp will be sent to that Email</p>
              </CardDescription>
            </CardHeader>
    
            <CardContent className="px-6 mt-4 space-y-4">
              
    
              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  New Password
                </label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md transition-colors"
                />
              </div>
            </CardContent>
    
            <CardFooter className="px-6 py-4 flex flex-wrap gap-3">
              
              <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-md px-4 py-2 transition-colors">
                Next
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-md px-4 py-2 transition-colors">
                back
              </Button>
              <Button className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-md px-4 py-2 transition-colors">
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
  )
}

export default SendEmail