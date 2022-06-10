const model = require("../models/userModel");

class GameController {
  static getEarlySeeds = async (req, res, next) => {
    try {
      const a = await model.getEarlySeeds({
        id: req.decoded.id,
        bonus: req.body.bonus,
      });
      if (a) {
        console.log("sukses", a);
        res.status(200).json(a);
      }
    } catch (err) {
      next(err);
    }
  };
  static plant = async (req, res, next) => {
    try {
      // console.log(req.body);
      const { userId, plantId, position } = req.body;
      console.log(userId);
      // variabel yg menampung inventory player, bila inventory tidak ditemukan sudah dihandle di model.
      const playerInventory = await model.getInventory(userId);
      console.log(playerInventory, "invent");
      // jika inventory ditemukan,array plant di-loop, jika cocok dan amount lebih dr 0 akan di -1

      let isSeedFound = false;
      for (let i = 0; i < playerInventory.plants.length; i++) {
        const playersPlant = playerInventory.plants[i];
        // console.log(playersPlant);
        //jika plantId di inventory == plantId req dr frontend
        if (playersPlant.plantId == plantId) {
          if (playersPlant.amount > 0) {
            //flag positif
            isSeedFound = true;
            //amount plant di inventory -1
            playersPlant.amount -= 1;
          } else {
            throw { name: "NotEnoughSeed" };
          }
        }
      }

      if (!isSeedFound) {
        throw { name: "SeedNotFound" };
      } else {
        const playersGarden = await model.getGarden(userId);
        // console.log(playersGarden, "garden",position);
        let isLandAvailable = true;
        // cek apakah posisi garden yg di request frontend tersedia
        for (let i = 0; i < playersGarden.plants.length; i++) {
          const element = playersGarden.plants[i];
          if (element.position == position) {
            isLandAvailable = false;
          }
        }
        console.log(isLandAvailable);
        //jika tersedia
        if (isLandAvailable) {
          //update inventory dan garden ke db
          // console.log(playerInventory.plants);
          const updatedInventory = await model.updateInventory(userId, {
            plants: playerInventory.plants,
          });
          playersGarden.plants.push({ plantId, position,plantedAt:Date.now() });
          console.log(playersGarden);
          const updatedGarden = await model.updateGarden(userId, {
            plants: playersGarden.plants,
          });
          res.status(200).json({msg:"Seed Planted"})
          // console.log(playerInventory, "after");
        } else {
          throw { name: "GardenNotAvailable" };
        }
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = GameController;
