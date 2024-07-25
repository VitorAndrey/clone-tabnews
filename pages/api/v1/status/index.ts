async function status(request: any, response: any) {
  const updated_at = new Date().toISOString();

  response.status(200).json({
    updated_at,
    dependences: {
      database: {
        max_connections: "",
        openned_connections: "",
        version: "",
      },
    },
  });
}

export default status;
