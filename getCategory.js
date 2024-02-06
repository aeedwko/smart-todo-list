require('dotenv').config();
const OpenAI = require('openai');
const openai = new OpenAI({
    organization: 'org-8B0dcbPBpE9XugrzcTdKqIaw'
  });

const openaiApi = new OpenAI(process.env.OPENAI_API_KEY);

const prompts = 'I need help with a task';
const model = 'text-davinci-002';
const examples = [
  ['task1', 'category1'],
  ['task2', 'category2'],
  ['task3', 'category3'],
  ['task4', 'category4']
];

openaiApi.classifications.create({
  model: model,
  examples: examples,
  query: prompts,
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.log(error);
});

main();

