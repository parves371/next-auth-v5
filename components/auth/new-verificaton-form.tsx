"use client";
import { newVerification } from "@/actions/new-verificaton";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";

const NewVerificationForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const params = useSearchParams();
  const token = params.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("token messing");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success as string);
        setError(data.error as string);
      })
      .catch(() => setError("something went wrong! doing varification"));
  }, [token]);

  return (
    <CardWrapper
      headerLabel="Confirming your Verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex items-center justify-center w-full">
        {/* {!error && !success && <BeatLoader />} */}

        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
      <div className="w-full flex justify-center mt-4">
        <Button onClick={onSubmit}>Verify</Button>
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
