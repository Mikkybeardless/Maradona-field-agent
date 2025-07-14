"use client";

import { OTPInput } from "../otp-input/otp-input";
import Link from "next/link";
import { useEffect, useState } from "react";

export const EnterOTPCard = () => {
  return (
    <section>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <header className="mb-8 space-y-4 text-center mx-auto">
          <h5 className="font-medium text-black text-2xl">Enter OTP</h5>
          <h6 className="text-grey text-sm leading-tight">
            Please enter the 4 digit code that was sent to you.
          </h6>
        </header>
        <div className="my-7 space-y-3.5">
          <OTPInput length={4} />
          <div className="mx-auto w-fit">
            <CountdownTimer />
          </div>
        </div>
        <h6 className="text-grey text-sm mb-5 w-fit mx-auto">
          Didn&apos;t get a code? send again
        </h6>
        <Link href="">
          <button
            type="button"
            className="bg-orange w-full p-4 rounded-md text-white font-medium"
          >
            Verify
          </button>
        </Link>
      </div>

      <Link
        href="/authentication/login"
        className="mx-auto w-fit gap-2 flex items-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33333 15.8333L2.5 9.99996M2.5 9.99996L8.33333 4.16663M2.5 9.99996H17.5"
            stroke="#1F0E1C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to Login
      </Link>
    </section>
  );
};

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60);

  useEffect(() => {
    // Exit early if timeLeft is 0
    if (timeLeft === 0) return;

    // Set up an interval to decrease timeLeft by 1 every second
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval when the component unmounts or timeLeft changes
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div>
      <p className="text-sm">{timeLeft > 0 ? `0:${timeLeft}` : "Time's up!"}</p>
    </div>
  );
};
