const { Schema, model } = require("mongoose");

const feedSchema = new Schema({
    url: {
        type: String,
        required: true,
        validate: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    },
    title: {
        type: String,
        required: true,
    },
    faviconUrl: {
        type: String,
        // required: true,
        validate: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    },
    websiteUrl: {
        type: String,
        required: false,
        validate: /^$|^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    },
})

module.exports = model("Feed", feedSchema);