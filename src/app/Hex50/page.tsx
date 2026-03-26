'use client'

import { Suspense } from "react";
import Hex50Screen from "./Hex50page";

export default function Hex50() {
  return (
    <div>
      <Suspense>
        <Hex50Screen />
      </Suspense>
    </div>
  );
}