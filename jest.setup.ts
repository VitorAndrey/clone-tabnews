const dotenv = require("dotenv");

export default () => {
  dotenv.config({
    path: ".env.development",
  });
};
