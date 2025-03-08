
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { BookOpen, Brain, Clock, HelpCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type QuizMode = "topic" | "document" | "custom";

const Quiz = () => {
  const [activeTab, setActiveTab] = useState<QuizMode>("topic");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Mock quiz data
  const mockQuiz = {
    title: "Introduction to Machine Learning",
    questions: [
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
      }
    ]
  };
  
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };
  
  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < mockQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // End of quiz
      setQuizStarted(false);
    }
  };
  
  const handleViewExplanation = () => {
    setShowExplanation(true);
  };
  
  const currentQuizQuestion = mockQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100;
  
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
          
          {!quizStarted ? (
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
                            >
                              <option value="">Select a subject...</option>
                              <option value="computer-science">Computer Science</option>
                              <option value="mathematics">Mathematics</option>
                              <option value="physics">Physics</option>
                              <option value="biology">Biology</option>
                              <option value="chemistry">Chemistry</option>
                              <option value="history">History</option>
                              <option value="literature">Literature</option>
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
                            <div key={index} className="flex justify-between items-center p-3 bg-muted/40 rounded-md hover:bg-muted/70 cursor-pointer">
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
                    <div className="text-center py-8 space-y-4">
                      <div className="mx-auto bg-brand-50 dark:bg-brand-900/20 w-16 h-16 rounded-full flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-brand-500" />
                      </div>
                      <h3 className="text-xl font-semibold">Generate Quiz from Document</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Upload a document or select from your library to create a quiz based on its content
                      </p>
                      <div className="flex justify-center gap-4 pt-4">
                        <Button variant="outline">
                          Upload Document
                        </Button>
                        <Button variant="outline">
                          Select from Library
                        </Button>
                      </div>
                    </div>
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
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="font-semibold">{mockQuiz.title}</h2>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Question {currentQuestion + 1} of {mockQuiz.questions.length}
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
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
                          {currentQuestion < mockQuiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                        </Button>
                      </>
                    )}
                  </div>
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
