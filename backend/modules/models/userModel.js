const { Mongoose, isValidObjectId } = require("mongoose");
const mongoose = require("./config.js");

// const { gardens } = require("./gameModel")

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, index: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    exp: { type: Number, default: 0 },
    coin: { type: Number, default: 0 },
    plants: [{}],
    
  },
  { timestamps: true, collection: "users" }
);

// const Plants = new mongoose.Schema({
//   name: { type: String, unique: true, required: true },
//   rog: { type: Number }, //rate of growth time
//   rarity: { type: String },
//   age: { type: String, default: 0 } //0 - 3 > seed, 4 - 9 > blabla,
// })

const inventoriesSchema = new mongoose.Schema(
  {
    userId: { type: String },
    plants: [
      {
        plantId: { type: String },
        amount: { type: Number },
      },
    ],
    bonuses: [
      {
        name: { type: String },
        done: { type: Boolean, default: false },
      },
    ],
    harvests: [{
      plantId: { type: String },
      amount: { type: Number }
    }] //{plant: 'corn', amount: 10}, {}
  },
  { timestamps: true, collection: "inventories" }
);

const plantsSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    rog: { type: Number }, //rate of growth time
    rarity: { type: String },
    path: { type: String }, //image
  },
  { timestamps: true, collection: "plants" }
);

const gardensSchema = new mongoose.Schema(
  {
    userId: { type: String },
    plants: [
      {
        // posisi
        plantId: { type: String },
        position: { type: Number }, // 0-31
        plantedAt: { type: Date },
      },
    ],
  },
  { timestamps: true, collection: "gardens" }
);

const achievementsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  requirements: [
    {
      plantId: { type: String },
      amount: { type: Number }
    }
  ]
}, { timestamps: true, collection: "achievements" })

const userAchievementsSchema = new mongoose.Schema({
  userId: { type: String },
  achievementsId: { type: String },
  currentAmount: { type: Number },
  amount: { type: Number }
}, { timestamps: true, collection: "userAchievements" })

let gardens = mongoose.model("gardens", gardensSchema);
let plants = mongoose.model("plants", plantsSchema);
let achievements = mongoose.model("achievements", achievementsSchema);
let userAchievements = mongoose.model("userAchievements", userAchievementsSchema)

let users = mongoose.model("users", userSchema);
let inventories = mongoose.model("inventories", inventoriesSchema);

// module.exports = { users, inventories }

exports.register = (user) => {
  return new Promise((resolve, reject) => {
    users.findOne({ email: user.email }, (err, res) => {
      if (!res) {
        return users.findOne({ username: user.username }, (err, res) => {
          if (!res) {
            users.create(user, (err, newUserAdded) => {
              if (newUserAdded) {
                inventories.create(
                  { userId: newUserAdded._id },
                  (err, inventoryCreated) => {
                    if (!err && inventoryCreated) {
                      gardens.create(
                        { userId: newUserAdded._id },
                        (err, gardenCreated) => {
                          if (!err && gardenCreated) {
                            // should update inventory and add bonus to it
                            return inventories.updateOne(
                              { userId: newUserAdded._id },
                              { $addToSet: { bonuses: [{ name: "early" }] } },
                              (err, res) => {
                                if (res) {
                                  console.log(res);
                                  resolve({
                                    msg: "Successfuly created new account",
                                    data: {
                                      email: newUserAdded.email,
                                      username: newUserAdded.username,
                                    },
                                  });
                                } else {
                                  reject({ name: "StarterBonusError" });
                                }
                              }
                            );
                          }
                          reject({ name: "GardenCreationFailed" });
                        }
                      );
                      // resolve({
                      //   msg: 'Successfuly created new account',
                      //   data: {
                      //     email: newUserAdded.email,
                      //     username: newUserAdded.username,
                      //   }
                      // })
                    } else {
                      users.deleteOne({ email: user.email }, (err, res) => {
                        if (!err) {
                          reject({ name: "InventoryCreationFailed" });
                        }
                      });
                    }
                  }
                );
              } else {
                reject({ name: "AccountCreationFailed" });
              }
            });
          } else if (err) {
            reject({ name: "SystemError" });
          } else {
            reject({ name: "UsernameUsed" });
          }
        });
      } else {
        reject({ name: "EmailUsed" });
      }
    });
  });
};

exports.login = (email) => {
  console.log("login");
  return new Promise((resolve, reject) => {
    users.findOne({ email: email }, (err, email) => {
      if (!err) {
        if (email) {
          // console.log('login cek keberadaan email di sini > ', email)
          resolve(email);
        } else {
          return users.findOne({ username: email }, (err, res) => {
            if (!err) {
              if (res) {
                console.log("login cek keberadaan username di sini > ", res);
                resolve(res);
              } else {
                reject({ name: "InvalidUserPass" });
              }
            }
            reject({ name: "InvalidUserPass" });
          });
        }
      } else {
        reject({ name: "InvalidUserPass" });
      }
    });
  });
};

exports.findUser = (email) => {
  return new Promise((resolve, reject) => [
    users.findOne({ email }, (err, res) => {
      if (res) {
        resolve(res);
      }
      reject({ name: "SystemError" });
    }),
  ]);
};

exports.getGarden = (userId) => {
  return new Promise((resolve, reject) => {
    gardens.findOne({ userId }, (err, res) => {
      if (err) reject({ name: "SystemError" });
      if (!res) reject({ name: "DataNotFound" });
      resolve(res);
      // let garden = res
      // return inventories.findOne({userId}, (err, res) => {
      //   if(err) reject({name: 'SystemError'})
      //   if(!res) reject({name: 'DataNotFound'})
      //   resolve({data: {
      //     garden,
      //     inventories: res
      //   }})
      // })
    });
  });
};

exports.getInventory = (userId) => {
  console.log("user", { userId });
  return new Promise((resolve, reject) => {
    console.log(userId);
    inventories.findOne({ userId }, (err, res) => {
      if (err) reject({ name: "SystemError" });
      if (!res) reject({ name: "DataNotFound" });
      resolve(res);
    });
  });
};

exports.updateUser = (userId, data) => {
  return new Promise((resolve, reject) => {
    console.log('masuk model update');
    console.log(userId, data);
    users.updateOne({ userId }, data, (err, res) => {
      if (err) reject({ name: "SystemError" });
      if (!res) reject({ name: "DataNotFound" });
      console.log(res);
      resolve(res);
    });
  });
};
exports.updateInventory = (userId, data) => {
  return new Promise((resolve, reject) => {
    console.log(userId, data);
    inventories.updateOne({ userId }, data, (err, res) => {
      if (err) reject({ name: "SystemError" });
      if (!res) reject({ name: "DataNotFound" });
      console.log(res);
      resolve(res);
    });
  });
};
exports.updateGarden = (userId, data) => {
  return new Promise((resolve, reject) => {
    console.log(userId, data);
    gardens.updateOne({ userId }, data, (err, res) => {
      if (err) reject({ name: "SystemError" });
      if (!res) reject({ name: "DataNotFound" });
      console.log(res);
      resolve(res);
    });
  });
};

exports.getEarlySeeds = (data) => {
  return new Promise((resolve, reject) => [
    users.findOne({ _id: data.id }, (err, res) => {
      if (!res) {
        reject({ name: "NotAuthenticated" });
      }
      inventories.findOne({ userId: data.id }, (err, res) => {
        if (!res) {
          reject({ name: "InventoryError" });
        }
        if (res.bonuses) {
          let done = false;
          for (let i = 0; i < res.bonuses.length; i++) {
            // if(res.bonuses[i].name == 'early' && res.bonuses[i].done == false) {
            //   done = true
            //   resolve({ msg: 'You already claimed this early bonus' })
            // }
            if (res.bonuses[i].name == "early" && res.bonuses[i].done == true) {
              done = true;
              resolve({ msg: "You already claimed this early bonus" });
            }
          }
          console.log("harusnya sih udah ya");
          if (done == false) {
            console.log("bla");
            return inventories.findOneAndUpdate(
              { userId: data.id, "bonuses.name": "early" },
              { $set: { "bonuses.$.done": true } },
              (err, res) => {
                if (err) {
                  console.log(err);
                  reject({ name: "InventoryError" });
                }
                if (res) {
                  // update inventory plant's amount
                  return plants.findOne({ name: "Wheat" }, (err, res) => {
                    if (err) {
                      reject({ name: "SystemError" });
                    }
                    if (res) {
                      let plantId = res._id.toString();
                      let plant = {
                        plantId,
                        amount: 3,
                      };
                      return inventories.findOneAndUpdate(
                        { userId: data.id },
                        { $push: { plants: plant } },
                        (err, res) => {
                          if (err) reject({ name: "SystemError" });
                          if (res) {
                            resolve({
                              msg: "Successfully claimed starter bonus!",
                              reveived: { plant: "wheat", amount: 3 },
                            });
                          }
                        }
                      );
                    }
                  });
                }
              }
            );
          }
        } else {
          reject({ name: "InventoryError" });
        }
      });
    }),
  ]);
};

exports.updateAchievements = async (data) => {
  const { userId, achievementId, amount } = data
  
}
