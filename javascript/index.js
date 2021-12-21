
const { createCompletion } = require('./utils');

// use lodash and openai to make a composite prompt
// composite prompt example -- use gpt3 to extract names from a natural language prompt and generate an instagram handle for them

/*
Intro of the Stang Gang
https://beta.openai.com/playground/p/yy7nEF6bOj5kWopIlzPC3bJ2?model=davinci-instruct-beta-v3
*/

/*
Generate Handles for the Stang Gang
https://beta.openai.com/playground/p/jJu9zPjjvRusSPLIhwPQ0k3j?model=davinci-instruct-beta-v3
*/


const main = async () => {
    const names = await createCompletion({
        prompt: "Remove names and infer their last names if not explicitly stated from this story about people.\n\nlong ago in the town of Wiscutah, there was a group of bandits called the stang gang. the stang gang was led by their intrepid leader, tommy mcgee. tommy's right hand man was ethan partridge. ethans brother, smitty and his wife isabelle had three children: museo, airpods2, and jeff.\n\nNames:",
    });

    console.log('-- NAMES --')
    console.log(names);

    const instagramHandlePrompt = `Generate a funny and clever Instagram handle for each name  in the 'Names' list using Old Western movie titles like '@blazinsaddlesPeter'.\n\nNames:\n${names}\n\nHandles:\n`;
    const handles = await createCompletion({
        prompt: instagramHandlePrompt,
        temperature: 1.0,
        presencePenalty: 1.0,
        frequencyPenalty: 1.0,
        bestOf: 1
    });

    console.log('-- HANDLES --')
    console.log(handles);
}

main();