import React, { Children } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function Mycard(
          {
            title="",
            description="",
            footer="",
            content="",
            className="",
            cardClassName = "",
            headerClassName = "",
            ...props
          }) 
          {
  return (
    <div className={ ` min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 ${className}`}>
      <Card className={`${cardClassName}`}>
        <CardHeader className={`${headerClassName}`}>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
        <CardFooter>
          {footer}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Mycard;
