export const quizSeeds = [
  {
    title: 'Customer Satisfaction Survey',
    published: true,
    blocks: [
      {
        type: 'heading',
        order: 0,
        properties: { text: 'Customer Feedback', level: 1 },
      },
      {
        type: 'question',
        order: 1,
        properties: {
          text: 'How satisfied are you with our service?',
          questionType: 'single',
          options: [
            'Very Satisfied',
            'Satisfied',
            'Neutral',
            'Dissatisfied',
            'Very Dissatisfied',
          ],
        },
      },
      {
        type: 'question',
        order: 2,
        properties: {
          text: 'What features would you like to see improved?',
          questionType: 'text',
          placeholder: 'Your suggestions...',
        },
      },
      {
        type: 'button',
        order: 3,
        properties: { text: 'Submit Feedback', type: 'submit' },
      },
      {
        type: 'footer',
        order: 4,
        properties: { text: 'Thank you for your time!' },
      },
    ],
  },
  {
    title: 'Product Knowledge Quiz',
    published: false,
    blocks: [
      {
        type: 'heading',
        order: 0,
        properties: { text: 'Product Knowledge Test', level: 2 },
      },
      {
        type: 'question',
        order: 1,
        properties: {
          text: 'Which of these are features of our product?',
          questionType: 'multi',
          options: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
        },
      },
      {
        type: 'button',
        order: 2,
        properties: { text: 'Next Question', type: 'next' },
      },
      {
        type: 'footer',
        order: 3,
        properties: { text: 'Good luck!' },
      },
    ],
  },
];
