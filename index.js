const config = require("./utils/config");
const express = require("express");
const cors = require("./middleware/cors");
const router = require("./routes");

const logger = require("./utils/logger");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./utils/swagger");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "dev" ? "tiny" : "combined"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(router);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
