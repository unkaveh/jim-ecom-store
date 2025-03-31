import { useEffect } from "react";
import Head from "next/head";

// Simple admin page that defers to the CMS implementation
export default function Admin() {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      window.location.href = "/admin/index.html";
    }
  }, []);

  return (
    <>
      <Head>
        <title>Content Manager</title>
      </Head>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Redirecting to Admin Interface...</h1>
        <p>
          If you are not redirected, <a href="/admin/index.html">click here</a>.
        </p>
      </div>
    </>
  );
}
