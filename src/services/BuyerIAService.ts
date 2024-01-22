

const questions = [
  {
    id: 1,
    title: "Research Software Solutions",
    description: "Enter a one sentence text of max 60 characters",
    main: true,
  },
  {
    id: 2,
    title: "Compare Software Solutions",
    description: "Enter a one sentence text of max 60 characters",
    main: true,
  },
  {
    id: 3,
    title: "Identify the Problem",
    description: "Enter a one sentence text of max 60 characters",
    main: false,
  },
  {
    id: 4,
    title: "Determine the Results",
    description: "Enter a one sentence text of max 60 characters",
    main: false,
  },
  {
    id: 3,
    title: "Engage Stakeholders",
    description: "Enter a one sentence text of max 60 characters",
    main: false,
  },
  {
    id: 4,
    title: "Build Business Care",
    description: "Enter a one sentence text of max 60 characters",
    main: false,
  },
];

const followups = [
  {
    id: 1,
    questionId: 1,
    title: "Root Cause",
  },
  {
    id: 2,
    questionId: 1,
    title: "Needs Analysis",
  },
  {
    id: 3,
    questionId: 1,
    title: "Research Solftware Solutions",
  },
  {
    id: 4,
    questionId: 1,
    title: "Research Solftware Solutions",
  },
  {
    id: 5,
    questionId: 2,
    title: "Research Solftware Solutions",
  },
  {
    id: 6,
    questionId: 3,
    title: "Research Solftware Solutions",
  },
]

export function getMainQuestions(){
  const main = questions.filter(item => item.main);
  return main;
};

export function getOtherQuestions(){
  const other = questions.filter(item => !item.main);
  return other;
};

export function getFollowups(questionId){
  const filtered = followups.filter(item => item.questionId === questionId)
  return filtered;
}
