import { Suspense } from "react";
import InventoryPage from "@/components/inventory-page";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading inventory...</p>}>
      <InventoryPage />
    </Suspense>
  );
}
