"use client";

import { useEffect, useState } from "react";

export type StateObject = {
  state: State;
  label: string;
  id: number;
};
interface DynamicNavProps {
  onStateChange: (state: State) => void;
  initialState: State;
  states: StateObject[];
  textColor?: string;
  borderColor?: string;
}

type State = "purchase-enquiries" | "bids";

export default function DynamicNav({
  states,
  onStateChange,
  initialState,
  textColor = "text-darkBlue",
  borderColor = "border-orange",
}: DynamicNavProps) {
  const [detailState, setDetailState] = useState<State>(initialState);
  useEffect(() => {
    onStateChange(detailState);
  }, [detailState, onStateChange]);

  return (
    <section
      id="dynamic-nav"
      className=" border-gray-200 border-b-2 flex items-center px-3  justify-between md:gap-20"
    >
      {states.map((state, i) => (
        <button
          key={i}
          onClick={() => setDetailState(state.state)}
          className={`${
            detailState === state.state
              ? `${textColor} text-sm md:text-base font-bold  ${borderColor} border-b-4`
              : ""
          }`}
        >
          {state.label}
        </button>
      ))}
    </section>
  );
}
