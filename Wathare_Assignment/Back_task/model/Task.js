const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    ts: { type: Date, required: true },
    machine_status: { type: Number, required: true },
}
)

module.exports = mongoose.model('Task',TaskSchema)