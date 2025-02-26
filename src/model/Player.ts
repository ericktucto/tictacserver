import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String
});
export const Player = mongoose.model('Player', playerSchema);
