import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [text, setText] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Text you entered is:", text);
    //setText("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl bg-white dark:bg-gray-800">
        <CardHeader className="text-2xl font-semibold text-center text-blue-600 dark:text-blue-400">
          Express your thoughts
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write something..."
              className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                         text-white rounded-lg transition-colors"
            >
              Upload
            </Button>
            <Button
             onClick={()=>{
               setText("")
               navigate("/")
             }}
              className="bg-red-500 hover:bg-red-800 dark:bg-red-500 dark:hover:bg-red-700 
                         text-white rounded-lg transition-colors"
            >
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePost;
