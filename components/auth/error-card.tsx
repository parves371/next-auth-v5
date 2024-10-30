import { Header } from "@/components/auth/header";
import { BackButton } from "./back-button";
import { Card, CardFooter, CardHeader } from "../ui/card";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Opps! Something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton label="back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
