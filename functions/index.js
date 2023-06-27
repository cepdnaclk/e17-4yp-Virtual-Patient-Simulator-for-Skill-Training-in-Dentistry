/* eslint-disable */
const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
// const cors = require("cors")({ origin: true });

const questions = {
  Habits: [
    "Do you drink alcohol?",
    "Do you smoke or use any form of tobacco?",
    "Do you chew betel or areca nuts?",
  ],
  Plaque_Control: [
    "What is the brush type you use?",
    "What is the bristle type of the toothbrush?",
    "Do you use any other tools other than the toothbrush to clean the",
    "How many times do you brush per day?",
    "How do you clean your mouth?",
    "Do you know whether it contains fluoride?",
    "Do you use toothpaste?",
  ],
  Medical_History: [
    "Have you had any operations or hospitalizations?",
    "Are you taking regular drugs for any disease?",
    "Do you have any allergies?",
    "Are you attending a medical clinic?",
  ],
};

const configuration = new Configuration({
  organization: "org-PC9LlHNclEmetTVqIoxix5BH",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

exports.getAutoCompleteSuggestions = functions.https.onCall(
  // async (data, context) => {
  //   const userInput = data.text;
  //   console.log("Input:", userInput);

  //   // Ensure userInput is valid and not empty
  //   if (!userInput || userInput.trim() === "") {
  //     throw new functions.https.HttpsError(
  //       "invalid-argument",
  //       "The function must be called with a non-empty text."
  //     );
  //   }

  //   try {
  //     const response = await openai.createCompletion({
  //       model: "text-davinci-003",
  //       prompt: "Who is elon musk?", // Replace "Who is elon musk?" with userInput
  //       max_tokens: 60, // Adjusted max_tokens to a higher value
  //       temperature: 0.4,
  //     });

  //     console.log("Response:", response); // Log the response

  //     // return response;

  //     if (response && response.choices && response.choices.length > 0) {
  //       // Assuming we want to return the first choice
  //       return {
  //         response,
  //       };
  //     } else {
  //       throw new Error("Failed to generate suggestion");
  //     }
  //   } catch (error) {
  //     console.error("Error getting suggestions:", error);
  //     console.error("Error object:", JSON.stringify(error, null, 2));
  //     throw new functions.https.HttpsError(
  //       "internal",
  //       "Failed to call OpenAI API ",
  //       JSON.stringify(error, null, 2)
  //     );
  //   }
  // }
  async (data, context) => {
    const userInput = data.text;
    const txt =
      "The patient has dental caries on tooth #3. The type of caries appears to be..? give just the name no need of definition. Suggest names that starts with " +
      userInput;
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: txt,
        // max_tokens: 4,
        n: 3,
      });
      console.log(completion.data.choices[0].text);
      return completion.data.choices;
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
);

exports.getSectionQuestions = functions.https.onCall(async (data, context) => {
  // cors()(data, context, () => {
  const section = data.section;
  const relatedQuestions = questions[section];
  const paraQuestions = [];
  try {
    for (let i = 0; i < relatedQuestions.length; i++) {
      const question = relatedQuestions[i];
      const txt = question + ".parapharse this question";

      // Call OpenAI API to get the question in different forms
      // const response = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: `${question}\nParaphrase: `,
      //   max_tokens: 60,
      //   temperature: 0.3,
      // });
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: txt,
        // max_tokens: 4,
      });
      const paraphrase = completion.data.choices[0].text;
      console.log("Paraphase text---", paraphrase);
      paraQuestions.push(paraphrase);
    }
    return paraQuestions;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  // }
});

exports.getReply = functions.https.onCall(async (data, context) => {
  const userInput = data.question;
  const txt =
    userInput +
    ".Answer this question as a dental patient.Think that you are a dental patient.But No need to mention that you are a dental patient. You can say yes or no for most of the questions.Answer accordingly. Dont start the answer like, 'as the answer'. Don't start with like this also, 'to this question'";
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: txt,
      max_tokens: 60,
      // n: 3,
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});
