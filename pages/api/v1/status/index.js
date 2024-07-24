import database from "/infra/database.js";

async function status(request, response) {
  const res = await database.query("SELECT 1 + 1 as sum;");

  console.log(res.rows[0]);

  response.status(200).json({ status: "running!" });
}

export default status;
