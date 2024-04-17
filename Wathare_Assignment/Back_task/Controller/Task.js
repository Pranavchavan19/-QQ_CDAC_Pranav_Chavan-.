const Task = require("../model/Task")

const getSamples = async(req,res) =>
{
    try {
        const samples = await Task.find();
        res.json(samples);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
       
}

const addSamples = async(req,res) =>
{
        try {
        const { rawData } = req.body;
        await Task.insertMany(rawData);
        res.status(201).json({ message: 'Raw data imported successfully' });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
}

const getSummary = async(req,res) =>
{
    try {
        const samples = await Task.find();
        const summary = {
        numOnes: samples.filter(sample => sample.sample === 1).length,
        numZeros: samples.filter(sample => sample.sample === 0).length,
        continuousVariations: calculateContinuousVariations(samples),
        };
        res.json(summary);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }       
}

const getFilter = async(req,res) =>
{
    try {
        const { startTime, frequency } = req.query;
        const endTime = calculateEndTime(startTime, frequency);
        const filteredSamples = await Task.find({
        timestamp: { $gte: startTime, $lt: endTime },
        });
        res.json(filteredSamples);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
}
function calculateContinuousVariations(samples) {
    let maxContinuousOnes = 0;
    let maxContinuousZeros = 0;
    let currentOnes = 0;
    let currentZeros = 0;
    for (const sample of samples) {
    if (sample.sample === 1) {
    currentOnes++;
    currentZeros = 0;
    maxContinuousOnes = Math.max(maxContinuousOnes, currentOnes);
    } else if (sample.sample === 0) {
    currentZeros++;
    currentOnes = 0;
    maxContinuousZeros = Math.max(maxContinuousZeros, currentZeros);
    }
    }
    return { maxContinuousOnes, maxContinuousZeros };
   }

   function calculateEndTime(startTime, frequency) {
    switch (frequency) {
    case 'hour':
    return new Date(startTime.getTime() + 3600000); // 1 hour
    case 'day':
    return new Date(startTime.getTime() + 86400000); // 1 day
    case 'week':
    return new Date(startTime.getTime() + 604800000); // 1 week
    case 'month':
    return new Date(startTime.getTime() + 2629746000); // 1 month
    default:
    throw new Error('Invalid frequency');
    }
   }   

module.exports = {getSamples,addSamples,getSummary,getFilter}