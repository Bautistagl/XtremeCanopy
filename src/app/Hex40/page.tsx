'use client'

import { Suspense } from "react";
import ProductDetail from "./DetalleComp";

export default function DetallePage() {
  return (
    <div>
      <Suspense>
        <ProductDetail />
      </Suspense>
    </div>
  );
}