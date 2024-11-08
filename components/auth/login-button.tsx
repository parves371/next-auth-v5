"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { LoginForm } from "./login-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = "redirect",
  asChild = false,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          <span>{children}</span>
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }
  
  return <span onClick={onClick}>{children}</span>;
};

export default LoginButton;
