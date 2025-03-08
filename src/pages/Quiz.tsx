
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { BookOpen, Brain, Clock, HelpCircle, Check, X, BarChart2, Upload, AlertTriangle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthService";

type QuizMode = "topic" | "document" | "custom";

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  timeSpent: number; // in seconds
  improvements: string[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

const Quiz = () => {
  const { isAuthenticated, showLoginDialog } = useAuth();
  const [activeTab, setActiveTab] = useState<QuizMode>("topic");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  
  // Quiz generation parameters
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("intermediate");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  
  // Expanded subject list
  const subjects = [
    "Computer Science", "Mathematics", "Physics", "Biology", "Chemistry", 
    "History", "Literature", "Geography", "Economics", "Psychology",
    "Sociology", "Political Science", "Philosophy", "Art History", 
    "Business", "Engineering", "Medicine", "Law", "Languages", "Music Theory",
    "Environmental Science", "Anthropology", "Astronomy", "Statistics",
    "Linguistics", "Architecture", "Accounting", "Media Studies", "Education",
    "Sports Science", "Nutrition", "Neuroscience", "Geology", "Theater Studies",
    "Film Studies", "Religious Studies", "Ethics", "Genetics", "Microbiology",
    "Ecology", "Marketing", "Finance", "International Relations"
  ];

  // Quiz generation function
  const generateQuiz = (mode: QuizMode) => {
    let title = "";
    const questions: Question[] = [];
    
    // Generate topic-specific quiz based on selected parameters
    if (mode === "topic") {
      title = selectedTopic || (selectedSubject ? `Introduction to ${selectedSubject}` : "General Knowledge Quiz");
      
      // Generate appropriate topics based on subject selection
      const topics: Record<string, Question[]> = {
        "Computer Science": [
          {
            question: "What is the main goal of supervised learning?",
            options: [
              "To cluster similar data points without labels",
              "To predict outcomes based on labeled training data",
              "To reduce the dimensionality of the data",
              "To generate new data samples similar to the training data"
            ],
            correctAnswer: 1,
            explanation: "Supervised learning uses labeled training data to learn a function that can be used to predict outcomes for unseen data."
          },
          {
            question: "Which of the following is NOT a type of machine learning?",
            options: [
              "Supervised learning",
              "Unsupervised learning",
              "Deterministic learning",
              "Reinforcement learning"
            ],
            correctAnswer: 2,
            explanation: "Deterministic learning is not a recognized type of machine learning. The main types are supervised, unsupervised, reinforcement, and semi-supervised learning."
          },
          {
            question: "What is a common evaluation metric for classification problems?",
            options: [
              "Mean Squared Error (MSE)",
              "Root Mean Squared Error (RMSE)",
              "Accuracy",
              "R-squared"
            ],
            correctAnswer: 2,
            explanation: "Accuracy, which measures the proportion of correctly classified instances, is a common evaluation metric for classification problems."
          },
          {
            question: "Which algorithm is NOT used for clustering?",
            options: [
              "K-means",
              "DBSCAN",
              "Hierarchical clustering",
              "Logistic Regression"
            ],
            correctAnswer: 3,
            explanation: "Logistic Regression is a supervised learning algorithm used for classification, not clustering."
          },
          {
            question: "What is the purpose of regularization in machine learning?",
            options: [
              "To increase model complexity",
              "To reduce overfitting",
              "To increase training speed",
              "To improve data preprocessing"
            ],
            correctAnswer: 1,
            explanation: "Regularization techniques are used to prevent overfitting by adding a penalty term to the loss function, discouraging complex models."
          }
        ],
        "Mathematics": [
          {
            question: "What is the derivative of f(x) = x²?",
            options: [
              "f'(x) = 2x",
              "f'(x) = x",
              "f'(x) = 2",
              "f'(x) = x²"
            ],
            correctAnswer: 0,
            explanation: "The derivative of x² is 2x, which can be derived using the power rule: d/dx(x^n) = n*x^(n-1)."
          },
          {
            question: "What is the value of sin(π/2)?",
            options: [
              "0",
              "1/2",
              "1",
              "√2/2"
            ],
            correctAnswer: 2,
            explanation: "sin(π/2) = 1. This is a fundamental value in trigonometry."
          },
          {
            question: "What is the integral of f(x) = 2x?",
            options: [
              "F(x) = x² + C",
              "F(x) = 2x² + C",
              "F(x) = x² + 2 + C",
              "F(x) = x² - 2x + C"
            ],
            correctAnswer: 0,
            explanation: "The integral of 2x is x². We can verify this by differentiating x² to get 2x."
          },
          {
            question: "Which of the following is not a prime number?",
            options: [
              "17",
              "19",
              "21",
              "23"
            ],
            correctAnswer: 2,
            explanation: "21 is not a prime number because it can be factored as 3 × 7."
          },
          {
            question: "What is the quadratic formula?",
            options: [
              "x = (-b ± √(b² - 4ac))/2a",
              "x = (-b ± √(b² + 4ac))/2a",
              "x = (b ± √(b² - 4ac))/2a",
              "x = b/(2a) ± √(b² - 4ac)"
            ],
            correctAnswer: 0,
            explanation: "The quadratic formula for solving ax² + bx + c = 0 is x = (-b ± √(b² - 4ac))/2a."
          }
        ],
        "Physics": [
          {
            question: "What is Newton's Second Law of Motion?",
            options: [
              "For every action, there is an equal and opposite reaction",
              "Force equals mass times acceleration (F = ma)",
              "An object at rest stays at rest unless acted upon by a force",
              "Energy cannot be created or destroyed, only transformed"
            ],
            correctAnswer: 1,
            explanation: "Newton's Second Law states that force equals mass times acceleration (F = ma)."
          },
          {
            question: "Which of the following is a unit of energy?",
            options: [
              "Newton",
              "Ampere",
              "Joule",
              "Tesla"
            ],
            correctAnswer: 2,
            explanation: "The joule (J) is the SI unit of energy, work, and heat."
          },
          {
            question: "What is the speed of light in vacuum?",
            options: [
              "3 × 10⁸ m/s",
              "3 × 10⁶ m/s",
              "3 × 10⁴ m/s",
              "3 × 10² m/s"
            ],
            correctAnswer: 0,
            explanation: "The speed of light in vacuum is approximately 3 × 10⁸ m/s (299,792,458 m/s exactly)."
          },
          {
            question: "Which fundamental force is responsible for holding the nucleus of an atom together?",
            options: [
              "Gravitational force",
              "Electromagnetic force",
              "Weak nuclear force",
              "Strong nuclear force"
            ],
            correctAnswer: 3,
            explanation: "The strong nuclear force holds the nucleus together, overcoming the electromagnetic repulsion between protons."
          },
          {
            question: "What is the principle of conservation of energy?",
            options: [
              "Energy can be created but not destroyed",
              "Energy can be destroyed but not created",
              "Energy cannot be created or destroyed, only transformed",
              "Energy is always increasing in a closed system"
            ],
            correctAnswer: 2,
            explanation: "The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another."
          }
        ]
      };
      
      // Default questions if subject not found
      const defaultQuestions: Question[] = [
        {
          question: "What is the capital of France?",
          options: ["London", "Paris", "Berlin", "Madrid"],
          correctAnswer: 1,
          explanation: "Paris is the capital city of France."
        },
        {
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
          correctAnswer: 1,
          explanation: "William Shakespeare wrote 'Romeo and Juliet' in the late 16th century."
        },
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "O2", "NaCl"],
          correctAnswer: 0,
          explanation: "H2O is the chemical formula for water, consisting of two hydrogen atoms and one oxygen atom."
        },
        {
          question: "In which year did World War II end?",
          options: ["1943", "1945", "1947", "1950"],
          correctAnswer: 1,
          explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September."
        },
        {
          question: "What is photosynthesis?",
          options: [
            "The process by which plants make food using light energy",
            "The process of cell division",
            "The decomposition of organic matter",
            "The process of animal respiration"
          ],
          correctAnswer: 0,
          explanation: "Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water."
        }
      ];
      
      // Get questions based on subject or use default
      const availableQuestions = topics[selectedSubject] || defaultQuestions;
      
      // Select the requested number of questions
      const selectedQuestions = availableQuestions.slice(0, questionCount);
      
      // If we don't have enough questions, repeat some to reach the requested count
      while (selectedQuestions.length < questionCount) {
        const index = selectedQuestions.length % availableQuestions.length;
        selectedQuestions.push({...availableQuestions[index]});
      }
      
      return {
        title,
        questions: selectedQuestions
      };
    } else if (mode === "document") {
      // Document-based quiz
      title = file ? `Quiz on ${file.name}` : "Document-Based Quiz";
      // Generate questions based on the document (mock)
      for (let i = 0; i < questionCount; i++) {
        questions.push({
          question: `Question ${i + 1} about the document content?`,
          options: [
            `Document option 1 for question ${i + 1}`,
            `Document option 2 for question ${i + 1}`,
            `Document option 3 for question ${i + 1}`,
            `Document option 4 for question ${i + 1}`
          ],
          correctAnswer: Math.floor(Math.random() * 4),
          explanation: `This is an explanation for question ${i + 1} about the document.`
        });
      }
    } else {
      // Custom quiz
      title = "Custom Quiz";
      // Generate questions based on custom prompt (mock)
      for (let i = 0; i < questionCount; i++) {
        questions.push({
          question: `Custom question ${i + 1}?`,
          options: [
            `Custom option 1 for question ${i + 1}`,
            `Custom option 2 for question ${i + 1}`,
            `Custom option 3 for question ${i + 1}`,
            `Custom option 4 for question ${i + 1}`
          ],
          correctAnswer: Math.floor(Math.random() * 4),
          explanation: `This is an explanation for custom question ${i + 1}.`
        });
      }
    }
    
    return {
      title,
      questions
    };
  };
  
  const handleStartQuiz = () => {
    // Generate the quiz based on user selections
    const newQuiz = generateQuiz(activeTab);
    setCurrentQuiz(newQuiz);
    
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setQuizComplete(false);
    setQuizResult(null);
    setStartTime(Date.now());
    
    toast({
      title: "Quiz Started",
      description: "Good luck with your quiz!"
    });
  };
  
  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      // Store the answer
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = index;
      setAnswers(newAnswers);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuiz && currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Calculate results
      calculateQuizResults();
    }
  };
  
  const calculateQuizResults = () => {
    if (!currentQuiz) return;
    
    // End of quiz
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const correctCount = answers.filter(
      (answer, index) => answer === currentQuiz.questions[index].correctAnswer
    ).length;
    
    const percentage = Math.round((correctCount / currentQuiz.questions.length) * 100);
    
    // Generate improvement suggestions
    const improvements: string[] = [];
    answers.forEach((answer, index) => {
      if (answer !== currentQuiz.questions[index].correctAnswer) {
        improvements.push(`Review: ${currentQuiz.questions[index].question}`);
      }
    });
    
    if (improvements.length === 0) {
      improvements.push("Great job! Try more challenging quizzes to further improve.");
    }
    
    setQuizResult({
      totalQuestions: currentQuiz.questions.length,
      correctAnswers: correctCount,
      percentage,
      timeSpent,
      improvements
    });
    
    setQuizComplete(true);
    setQuizStarted(false);
    
    // Save result to localStorage
    saveQuizResult(percentage, correctCount, currentQuiz.questions.length, currentQuiz.title);
  };
  
  const saveQuizResult = (percentage: number, correct: number, total: number, topic: string) => {
    try {
      const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
      results.push({
        date: new Date().toISOString(),
        topic,
        percentage,
        correctAnswers: correct,
        totalQuestions: total
      });
      localStorage.setItem('quizResults', JSON.stringify(results));
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };
  
  const handleViewExplanation = () => {
    setShowExplanation(true);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast({
        title: "Document Uploaded",
        description: "Your document has been uploaded successfully."
      });
    }
  };
  
  const handleGenerateFromDocument = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use this feature.",
        variant: "destructive"
      });
      showLoginDialog();
      return;
    }
    
    if (file) {
      toast({
        title: "Generating Quiz",
        description: "Creating quiz from your document. This may take a moment..."
      });
      
      // Simulate processing time
      setTimeout(() => {
        handleStartQuiz();
      }, 2000);
    } else {
      toast({
        title: "No Document Selected",
        description: "Please upload a document first",
        variant: "destructive"
      });
    }
  };
  
  // Get current question
  const currentQuizQuestion = currentQuiz?.questions[currentQuestion];
  const progress = currentQuiz ? ((currentQuestion + 1) / currentQuiz.questions.length) * 100 : 0;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Quiz Generator</h1>
            <p className="text-muted-foreground">
              Test your knowledge with AI-generated quizzes based on your study materials
            </p>
          </header>
          
          {!quizStarted && !quizComplete ? (
            <Tabs defaultValue="topic" value={activeTab} onValueChange={(value) => setActiveTab(value as QuizMode)} className="space-y-6">
              <TabsList className="grid grid-cols-3 w-[400px]">
                <TabsTrigger value="topic">By Topic</TabsTrigger>
                <TabsTrigger value="document">From Document</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>
              
              <TabsContent value="topic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Generate Quiz by Topic</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">
                              Subject
                            </label>
                            <select
                              id="subject"
                              className="w-full p-2 border border-border rounded-md"
                              value={selectedSubject}
                              onChange={(e) => setSelectedSubject(e.target.value)}
                            >
                              <option value="">Select a subject...</option>
                              {subjects.map((subject, index) => (
                                <option key={index} value={subject}>
                                  {subject}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="topic" className="text-sm font-medium">
                              Specific Topic
                            </label>
                            <input
                              id="topic"
                              type="text"
                              className="w-full p-2 border border-border rounded-md"
                              placeholder="e.g. Machine Learning, Organic Chemistry"
                              value={selectedTopic}
                              onChange={(e) => setSelectedTopic(e.target.value)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="difficulty" className="text-sm font-medium">
                                Difficulty Level
                              </label>
                              <select
                                id="difficulty"
                                className="w-full p-2 border border-border rounded-md"
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                              >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                              </select>
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="question-count" className="text-sm font-medium">
                                Number of Questions
                              </label>
                              <select
                                id="question-count"
                                className="w-full p-2 border border-border rounded-md"
                                value={questionCount}
                                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                              >
                                <option value="5">5 questions</option>
                                <option value="10">10 questions</option>
                                <option value="15">15 questions</option>
                                <option value="20">20 questions</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <Button className="w-full bg-brand-500 hover:bg-brand-600" onClick={handleStartQuiz}>
                              Generate Quiz
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Popular Topics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: "Machine Learning Basics", count: 124 },
                            { name: "Organic Chemistry", count: 87 },
                            { name: "World War II", count: 65 },
                            { name: "Calculus", count: 92 },
                            { name: "Classical Literature", count: 43 }
                          ].map((topic, index) => (
                            <div 
                              key={index} 
                              className="flex justify-between items-center p-3 bg-muted/40 rounded-md hover:bg-muted/70 cursor-pointer"
                              onClick={() => {
                                setSelectedSubject(topic.name.includes("Machine Learning") ? "Computer Science" : 
                                                   topic.name.includes("Organic Chemistry") ? "Chemistry" :
                                                   topic.name.includes("World War II") ? "History" :
                                                   topic.name.includes("Calculus") ? "Mathematics" : "Literature");
                                setSelectedTopic(topic.name);
                              }}
                            >
                              <span className="font-medium">{topic.name}</span>
                              <span className="text-xs text-muted-foreground">{topic.count} quizzes</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="document" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    {!file ? (
                      <div className="text-center py-8 space-y-4">
                        <div className="mx-auto bg-brand-50 dark:bg-brand-900/20 w-16 h-16 rounded-full flex items-center justify-center">
                          <Upload className="h-8 w-8 text-brand-500" />
                        </div>
                        <h3 className="text-xl font-semibold">Generate Quiz from Document</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Upload a document to create a quiz based on its content
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                          <label className="cursor-pointer bg-brand-500 hover:bg-brand-600 text-white py-2 px-4 rounded-md">
                            Upload Document
                            <input
                              type="file"
                              accept=".pdf,.docx,.txt"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BookOpen className="h-6 w-6 text-brand-500 mr-3" />
                            <div>
                              <h3 className="font-medium">{file.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                            Change
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="doc-questions" className="text-sm font-medium">
                              Number of Questions
                            </label>
                            <select
                              id="doc-questions"
                              className="w-full p-2 border border-border rounded-md"
                              value={questionCount}
                              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                            >
                              <option value="5">5 questions</option>
                              <option value="10">10 questions</option>
                              <option value="15">15 questions</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="doc-difficulty" className="text-sm font-medium">
                              Difficulty Level
                            </label>
                            <select
                              id="doc-difficulty"
                              className="w-full p-2 border border-border rounded-md"
                              value={selectedDifficulty}
                              onChange={(e) => setSelectedDifficulty(e.target.value)}
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </div>
                          
                          <Button 
                            className="w-full bg-brand-500 hover:bg-brand-600"
                            onClick={handleGenerateFromDocument}
                          >
                            Generate Quiz from Document
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="custom" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Custom Quiz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="quiz-title" className="text-sm font-medium">
                          Quiz Title
                        </label>
                        <input
                          id="quiz-title"
                          type="text"
                          className="w-full p-2 border border-border rounded-md"
                          placeholder="e.g. Midterm Review Quiz"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="quiz-prompt" className="text-sm font-medium">
                          Custom Prompt
                        </label>
                        <textarea
                          id="quiz-prompt"
                          className="w-full p-2 border border-border rounded-md"
                          rows={5}
                          placeholder="Describe what you want to be quizzed on. Be specific about topics, concepts, or specific knowledge areas."
                        />
                        <p className="text-xs text-muted-foreground">
                          Example: "Create a quiz about the key machine learning algorithms including supervised and unsupervised learning, focusing on their applications and limitations."
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="custom-difficulty" className="text-sm font-medium">
                            Difficulty Level
                          </label>
                          <select
                            id="custom-difficulty"
                            className="w-full p-2 border border-border rounded-md"
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="custom-question-count" className="text-sm font-medium">
                            Number of Questions
                          </label>
                          <select
                            id="custom-question-count"
                            className="w-full p-2 border border-border rounded-md"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                          >
                            <option value="5">5 questions</option>
                            <option value="10">10 questions</option>
                            <option value="15">15 questions</option>
                            <option value="20">20 questions</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button className="w-full bg-brand-500 hover:bg-brand-600" onClick={handleStartQuiz}>
                          Generate Custom Quiz
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : quizComplete ? (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5 text-brand-500" />
                    Quiz Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {quizResult && (
                    <>
                      <div className="text-center py-6">
                        <div className={`text-5xl font-bold mb-2 ${
                          quizResult.percentage >= 80 ? "text-green-500" : 
                          quizResult.percentage >= 60 ? "text-yellow-500" : "text-red-500"
                        }`}>
                          {quizResult.percentage}%
                        </div>
                        <p className="text-muted-foreground">
                          You got {quizResult.correctAnswers} out of {quizResult.totalQuestions} questions correct
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Time spent: {Math.floor(quizResult.timeSpent / 60)}m {quizResult.timeSpent % 60}s
                        </p>
                        <div className="mt-4 flex justify-center">
                          {quizResult.percentage >= 80 ? (
                            <div className="flex items-center text-green-500">
                              <Award className="mr-2 h-5 w-5" />
                              <span className="font-medium">Excellent work!</span>
                            </div>
                          ) : quizResult.percentage >= 60 ? (
                            <div className="flex items-center text-yellow-500">
                              <AlertTriangle className="mr-2 h-5 w-5" />
                              <span className="font-medium">Good effort, but room for improvement</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500">
                              <AlertTriangle className="mr-2 h-5 w-5" />
                              <span className="font-medium">Needs more study</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Score Breakdown</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Correct Answers</span>
                            <span className="font-medium">{quizResult.correctAnswers}/{quizResult.totalQuestions}</span>
                          </div>
                          <Progress value={quizResult.percentage} className={`h-2 ${
                            quizResult.percentage >= 80 ? "bg-green-100" : 
                            quizResult.percentage >= 60 ? "bg-yellow-100" : "bg-red-100"
                          }`} />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Areas to Improve</h3>
                        <ul className="space-y-2">
                          {quizResult.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 mr-2">
                                {index + 1}
                              </span>
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-muted/40 rounded-md">
                        <h3 className="font-medium mb-2">Recommended Study Resources</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-brand-500" />
                            <span>"Machine Learning: A Comprehensive Guide" - Chapter 3</span>
                          </li>
                          <li className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-brand-500" />
                            <span>"Introduction to AI Algorithms" - Section 2.4</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex space-x-4 pt-4">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setActiveTab("topic");
                            setQuizComplete(false);
                          }}
                        >
                          Try Another Quiz
                        </Button>
                        <Button className="flex-1 bg-brand-500 hover:bg-brand-600">
                          Save Results
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="font-semibold">{currentQuiz?.title}</h2>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Question {currentQuestion + 1} of {currentQuiz?.questions.length}
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  {currentQuizQuestion && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium flex items-start">
                          <HelpCircle className="h-5 w-5 mr-2 text-brand-500 flex-shrink-0 mt-0.5" />
                          {currentQuizQuestion.question}
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        {currentQuizQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className={`p-4 border rounded-md cursor-pointer transition-colors ${
                              selectedAnswer === index 
                                ? selectedAnswer === currentQuizQuestion.correctAnswer
                                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                  : "border-red-500 bg-red-50 dark:bg-red-900/20"
                                : "border-border hover:border-brand-200 dark:hover:border-brand-800"
                            }`}
                            onClick={() => handleSelectAnswer(index)}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                {selectedAnswer === index ? (
                                  selectedAnswer === currentQuizQuestion.correctAnswer ? (
                                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                                      <Check className="h-3 w-3 text-white" />
                                    </div>
                                  ) : (
                                    <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                                      <X className="h-3 w-3 text-white" />
                                    </div>
                                  )
                                ) : (
                                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30"></div>
                                )}
                              </div>
                              <div>
                                <p>{option}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {selectedAnswer !== null && (
                        <>
                          {showExplanation ? (
                            <div className="mt-4 p-4 bg-muted rounded-md">
                              <h4 className="font-medium mb-2 flex items-center">
                                <Brain className="h-4 w-4 mr-2 text-brand-500" />
                                Explanation
                              </h4>
                              <p>{currentQuizQuestion.explanation}</p>
                            </div>
                          ) : (
                            <Button variant="outline" onClick={handleViewExplanation} className="w-full mt-2">
                              Show Explanation
                            </Button>
                          )}
                          
                          <Button className="w-full mt-4 bg-brand-500 hover:bg-brand-600" onClick={handleNextQuestion}>
                            {currentQuiz && currentQuestion < currentQuiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Quiz;
