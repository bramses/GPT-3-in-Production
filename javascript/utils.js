const OpenAI = require('openai-api');
require("dotenv").config();
const _ = require('lodash');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

const createCompletion = async ({ engine='davinci-instruct-beta-v3', prompt = '', temperature = 0.0, maxTokens = 64, topP = 1.0, presencePenalty = 0.0, frequencyPenalty = 0.0, bestOf = 1, n = 1, stop = null, debug = false } = {}) => {
    try {
        if (debug) console.log(`createCompletion({ engine: ${engine}, prompt: ${prompt}, temperature: ${temperature}, maxTokens: ${maxTokens}, topP: ${topP}, presencePenalty: ${presencePenalty}, frequencyPenalty: ${frequencyPenalty}, bestOf: ${bestOf}, n: ${n}, stop: ${stop} })`);
        
        const gptResponse = await openai.complete({
            engine,
            prompt,
            maxTokens,
            temperature,
            topP,
            presencePenalty,
            frequencyPenalty,
            bestOf,
            n,
            stream: false,
            stop
        });
        
        return gptResponse.data.choices[0].text.trim();
    } catch (err) {
        console.error(err);
    }
}

module.exports = { createCompletion }