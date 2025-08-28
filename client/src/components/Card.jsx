import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function Mycard({ cardClassName = "", headerClassName = "", ...props }) {
  return (
    <div className="flex  min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <Card className={`${cardClassName}`}>
        <CardHeader className={`${headerClassName}`}>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Mycard;
