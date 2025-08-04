import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import { useOutletContext } from "react-router-dom";

function Mycard() {
  const { isSidebarOpen } = useOutletContext();

  return (
    <div className="flex flex-wrap gap-x-10 gap-y-8 p-4">
      {[...Array(12)].map((_, index) => (
        <Card
          key={index}
          className={`
            aspect-square
            basis-[calc(30%-1rem)]
            overflow-hidden
            transition-transform duration-300
            hover:shadow-lg
            ${isSidebarOpen ? "scale-100" : "scale-105"}
          `}
        >
          <CardContent className="text-sm p-4">
            <p>
              Video content from backend. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ullam maiores quibusdam.
            </p>
          </CardContent>
          <CardFooter className="text-xs px-4 pb-4 pt-0">
            Profile and video name from backend
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Mycard;
