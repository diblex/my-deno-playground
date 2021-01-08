import { Model, DataTypes } from "../../deps.ts";

export class Comment extends Model {
  static table = "comments";
  static timestamps = true;
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      length: 250
    },
    body: DataTypes.TEXT,
    author: DataTypes.string(64)
  };
  static defaults = {
    author: 'Anonymous',
  };

}