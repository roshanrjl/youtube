import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";

function Video() {
  return (
    <div className="flex  min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <Card
        className="
          w-[60%] h-[80vh] rounded-2xl shadow-2xl overflow-hidden
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          transition-transform duration-300  hover:shadow-3xl
        "
      >
        <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            Card Title
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Card Description
          </CardDescription>
          <CardAction>
            <button className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition">
              Action
            </button>
          </CardAction>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 dark:text-gray-200">
          <p>
            This is the main content of the card. It looks good in both light and
            dark modes ✨
          </p>
        </CardContent>
        <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          Card Footer
        </CardFooter>
      </Card>
    </div>
  );
}

export default Video;
