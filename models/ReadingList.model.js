const { Schema, model } = require("mongoose");

const readingListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    links: [{
        url: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        }
    }]
});

module.exports = model("ReadingList", readingListSchema);