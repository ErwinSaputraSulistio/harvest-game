const errorHandler = async (err, req, res, next) => {
  console.log(err.name);
  switch (err.name) {
    case "InventoryCreationFailed":
      res.status(401).json({
        msg: "Failed at creating new account (2), please try to change your email and/or username!",
      });
      break;
    case "AccountCreationFailed":
      res.status(401).json({
        msg: "Failed at creating new account (1), please try to change your email and/or username!",
      });
      break;
    case "SystemError":
      res.status(500).json({
        msg: "Internal Server Error (2)",
      });
      break;
    case "EmailUsed":
      res.status(401).json({
        msg: "Email already used, please use another email",
      });
      break;
    case "UsernameUsed":
      res.status(400).json({
        msg: "Username already used, please choose a different username",
      });
      break;
    case "InvalidUserPass":
      res.status(400).json({
        status: 400,
        msg: "Invalid email/username/password, please be more carefour next time :*",
      });
      break;
    case "DataNotFound":
      res.status(400).json({
        msg: "Fetching data not found!",
      });
      break;

    case "NotAuthenticated":
      res.status(400).json({
        msg: "System cant find your login information",
      });
      break;

    case "InventoryError":
      res.status(400).json({
        msg: "System cant find your Inventory, Bad System!",
      });
      break;

    case "StarterBonusError":
      res.status(400).json({
        msg: "System failed to add starter bonus, Bad System!",
      });
      break;

    case "InvalidToken":
      res.status(400).json({
        msg: "Invalid token",
      });
      break;

    case "JsonWebTokenError":
      res.status(400).json({
        msg: "Invalid token",
      });
      break;
    case "NotEnoughSeed":
      res.status(401).json({
        msg: "Not enough seed",
      });
      break;
    case "SeedNotFound":
      res.status(401).json({
        msg: "Seed not found",
      });
      break;
    case "GardenNotAvailable":
      res.status(401).json({
        msg: "land is not available",
      });
      break;

    default:
      res.status(500).json({ msg: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
