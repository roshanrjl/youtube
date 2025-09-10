import React, { Children } from "react";
import {
  Card,
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
            contentclass="",
            ...props
          }) 
          {
  return (
    <div className={ `  bg-gray-100 dark:bg-gray-900 transition-colors duration-500 ${className}`}>
      <Card className={`${cardClassName}`}>
        <CardHeader className={`${headerClassName}`}>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>        
        </CardHeader>
        <CardContent className={`${contentclass}`}>
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
