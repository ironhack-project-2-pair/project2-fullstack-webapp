const { Schema, model } = require("mongoose");

const feedSchema = new Schema({
    url: {
        type: String,
        required: true,
        validate: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    },
    title: String,
})

module.exports = model("Feed", feedSchema);