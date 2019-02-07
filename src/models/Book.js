import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    goodreadsId: { type: Number, required: true, index: true },
    title: { type: String, required: true },
    authors: { type: String, required: true },
    covers: { type: Array },
    pages: { type: Number }
  },
  { timestamps: true }
);

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    id: this._id,
    goodreadsId: this.goodreadsId,
    title: this.title,
    covers: this.covers,
    authors: this.authors,
    pages: this.pages,
  };
};

export default mongoose.model("Book", schema);
