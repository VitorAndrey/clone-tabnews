import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tabnews</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <main
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "4rem" }}>Clone do Tabnews</h1>
        <p style={{ color: "#aaaaaa" }}>Em construção...</p>
      </main>
    </>
  );
}
