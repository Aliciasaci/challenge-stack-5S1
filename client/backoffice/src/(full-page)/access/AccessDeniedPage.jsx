import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import { LayoutContext } from "../../layout/context/LayoutContext";

const AccessDeniedPage = () => {
  const router = useRouter();
  const { layoutConfig } = useContext(LayoutContext);

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
            style={{ borderRadius: "53px" }}
          >
            <div
              className="flex justify-content-center align-items-center bg-pink-500 border-circle"
              style={{ height: "3.2rem", width: "3.2rem" }}
            >
              <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
            </div>
            <h1 className="text-900 font-bold text-5xl mb-2">Access Denied</h1>
            <div className="text-600 mb-5">
              You do not have the necessary permisions.
            </div>
            <Button
              icon="pi pi-arrow-left"
              label="Go to Dashboard"
              text
              onClick={() => router.push("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
