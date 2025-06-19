"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Notification from "@/components/Notification";
import Container from "@/components/Container";
import InputField from "@/components/InputField";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    setAlert(null);
    setError(null);
  }, [email, url]);

  const resetData = () => {
    setEmail("");
    setUrl("");
    setStep(1);
  };

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url.trim() || !url.trim().includes("//")) {
      setAlert("Please enter a valid URL");
      return;
    }
    if (!url.includes("https")) {
      setAlert("That URL doesn't look secure");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url }),
      });
      const data = await response.json();
      if (data?.error) {
        const detail = JSON.parse(data?.detail);
        setError(detail?.error);
      } else {
        setAlert(data?.message);
        setTimeout(() => resetData(), 11000);
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrementStep = () => {
    if (!email.trim()) {
      setAlert("Email address can't be empty");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setAlert("Please enter a valid email address");
      return;
    }

    setStep(step + 1);
  };

  const handleDecrementStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      {!loading && alert && (
        <Notification variant="success" message={alert} onClose={() => setAlert(null)} timeout={10000} />
      )}
      {!loading && error && (
        <Notification variant="error" message={error} onClose={() => setError(null)} timeout={10000} />
      )}
      <Container className="h-screen flex items-center justify-center text-center">
        <form className="md:w-[350px] mx-auto" onSubmit={handleFormSubmit}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <h3 className="text-xl mb-5">{"Split 'n Sort API"}</h3>
            <p>Enter a valid email address and endpoint URL to test if your solution works.</p>
          </motion.div>
          {step === 1 && (
            <>
              <InputField variant="email" value={email} onValueChange={setEmail} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#4242ec] hover:bg-[#2d2deb] text-white p-3 rounded-lg cursor-pointer mt-5 active:scale-[0.95] transition duration-300 text-sm uppercase tracking-[2px]"
                onClick={handleIncrementStep}
              >
                Continue
              </motion.div>
            </>
          )}
          {step === 2 && (
            <>
              <InputField variant="text" value={url} onValueChange={setUrl} />
              {!loading ? (
                <>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="block w-full outline-none bg-[#4242ec] hover:bg-[#2d2deb] text-white p-3 rounded-lg cursor-pointer mt-5 active:scale-[0.95] transition duration-300 text-sm uppercase tracking-[2px]"
                  >
                    Send
                  </motion.button>
                  <motion.div
                    initial={{ opacity: 0, y: "10px" }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block mt-3 p-2 cursor-pointer opacity-60 hover:opacity-100"
                    onClick={handleDecrementStep}
                  >
                    Go back
                  </motion.div>
                </>
              ) : (
                <LoadingSpinner />
              )}
            </>
          )}
        </form>
      </Container>
    </>
  );
}
