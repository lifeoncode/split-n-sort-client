import { useState, type ChangeEvent } from "react";
import Notification from "./components/Notification";
import Container from "./components/Container";
import InputField from "./components/InputField";
import { API_BASE_URL, httpRequest } from "./util/helper";

const App = () => {
  const [email, setEmail] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }
    if (!url.includes("https")) {
      setError("Tha URL doesn't look secure");
      return;
    }

    setLoading(true);
    try {
      const data = await httpRequest<Record<string, unknown>>({
        url: `${API_BASE_URL}?url=${url.trim()}&email=${email.trim()}`,
      });
      if (data) console.log(data);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setError(JSON.parse(error.message));
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleIncrementStep = () => {
    if (!email.trim()) {
      setError("Email address can't be empty");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    setStep(step + 1);
    console.log(`${API_BASE_URL}?url=${url.trim()}&email=${email.trim()}`);
  };

  return (
    <>
      {!loading && error && <Notification message={error} onClose={() => setError(null)} timeout={5000} />}
      <Container className="h-screen flex items-center justify-center text-center">
        <form className="md:w-[350px] mx-auto" onSubmit={handleFormSubmit}>
          <h3 className="text-xl">Welcome</h3>
          {step === 1 && (
            <>
              <InputField variant="email" value={email} onValueChange={setEmail} />
              <div
                className="bg-[#4242ec] hover:bg-[#2d2deb] text-white p-3 rounded-lg cursor-pointer mt-5 active:scale-[0.95] transition duration-300 text-sm uppercase tracking-[2px]"
                onClick={handleIncrementStep}
              >
                Continue
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <InputField variant="text" value={url} onValueChange={setUrl} />
              <button
                disabled={loading}
                className="block w-full outline-none bg-[#4242ec] hover:bg-[#2d2deb] text-white p-3 rounded-lg cursor-pointer mt-5 active:scale-[0.95] transition duration-300 text-sm uppercase tracking-[2px]"
              >
                {loading ? "..." : "Send"}
              </button>
            </>
          )}
        </form>
      </Container>
    </>
  );
};

export default App;
