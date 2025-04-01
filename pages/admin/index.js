import React, { useEffect, useState } from "react";
import Head from "next/head";

// This page is just a fallback in case someone accesses it directly
export default function Admin() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true to indicate we're on the client
    setIsClient(true);

    // Directly redirect to admin/index.html (only once)
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem("adminRedirected")) {
        sessionStorage.setItem("adminRedirected", "true");
        window.location.href = "/admin/index.html";
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Content Manager</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Admin Interface</h1>
        {isClient && (
          <>
            <p>
              You should be redirected automatically to the admin interface.
            </p>
            <p>
              If you are not redirected,{" "}
              <a href="/admin/index.html">click here</a> to go to the admin
              interface.
            </p>
          </>
        )}
        {!isClient && <p>Loading admin interface...</p>}
      </div>
    </>
  );
}
