
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { BookOpen, Upload, FileText, Check, FileType, Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthService";

const EXAMPLE_SUMMARIES = {
  "Introduction to Machine Learning": {
    original: "45 pages",
    summary: "Machine learning (ML) is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy. IBM has a rich history with machine learning. Arthur Samuel, an IBM researcher, coined the term 'machine learning' in 1952 while at IBM and designed a checkers playing program that was one of the first programs that could learn from its own experience. Neural networks, which have been around since the earliest days of AI, and are systems that learn to perform tasks by analyzing training examples, are experiencing a renaissance in the field of deep learning. These applications can be highly useful, but they are typically built to perform specific tasks, and their capabilities are limited to the scope of what they've been designed for.",
    keyPoints: [
      "Machine learning is a branch of AI focused on data and algorithms",
      "Arthur Samuel coined the term 'machine learning' in 1952 at IBM",
      "Neural networks are experiencing a renaissance in deep learning",
      "ML applications are typically designed for specific tasks"
    ]
  },
  "Quantum Physics Explained": {
    original: "22 pages",
    summary: "Quantum physics is a branch of physics that deals with the behavior of matter and energy at the smallest scales. At this level, particles can behave like waves and vice versa (wave-particle duality). Key principles include quantum entanglement, where particles become connected and the state of one instantly influences the other regardless of distance, and Heisenberg's uncertainty principle, which states that certain pairs of physical properties cannot be precisely determined simultaneously. Quantum superposition allows particles to exist in multiple states until measured. These principles form the foundation of quantum computing, which promises to revolutionize computing by performing certain calculations exponentially faster than classical computers.",
    keyPoints: [
      "Quantum physics deals with matter and energy at the smallest scales",
      "Wave-particle duality means particles can behave like waves and vice versa",
      "Quantum entanglement connects particles regardless of distance",
      "Heisenberg's uncertainty principle limits simultaneous measurement precision",
      "Quantum superposition allows particles to exist in multiple states until measured"
    ]
  },
  "World History: The Renaissance": {
    original: "18 pages",
    summary: "The Renaissance was a period of European cultural, artistic, political, and scientific 'rebirth' after the Middle Ages. Beginning in Florence, Italy, in the 14th century, it spread across Europe and lasted until the 17th century. Key features include the rediscovery of classical philosophy, literature, and art, as well as new developments across many intellectual pursuits. Renaissance art emphasized realism and three-dimensional perspective, with masters like Leonardo da Vinci, Michelangelo, and Raphael creating works that remain influential. The period saw technological advances including the printing press, which democratized knowledge, and scientific breakthroughs by figures like Copernicus and Galileo who challenged established views of the universe. The Renaissance also featured political developments including the rise of powerful banking families, city-states, and the early nation-state.",
    keyPoints: [
      "The Renaissance was a period of 'rebirth' after the Middle Ages (14th-17th century)",
      "It began in Florence, Italy and spread across Europe",
      "Featured rediscovery of classical works and new intellectual developments",
      "Renaissance art emphasized realism and three-dimensional perspective",
      "Major technological advances included the printing press",
      "Scientific breakthroughs challenged established views of the universe"
    ]
  },
  "Programming in Python": {
    original: "32 pages",
    summary: "Python is a high-level, interpreted programming language known for its readability and versatility. Created by Guido van Rossum and first released in 1991, Python has a design philosophy that emphasizes code readability with its use of significant whitespace. Key features include dynamic typing, memory management, comprehensive standard libraries, and support for multiple programming paradigms including procedural, object-oriented, and functional programming. Python is widely used in web development, data analysis, artificial intelligence, scientific computing, and automation. Its syntax allows programmers to express concepts in fewer lines of code than languages like C++ or Java. Popular libraries and frameworks include NumPy for numerical computing, Django for web development, TensorFlow for machine learning, and Pandas for data analysis.",
    keyPoints: [
      "Python is a high-level, interpreted language known for readability",
      "Created by Guido van Rossum in 1991",
      "Features dynamic typing and automatic memory management",
      "Supports multiple programming paradigms",
      "Widely used in web development, data analysis, AI, and scientific computing",
      "Popular libraries include NumPy, Django, TensorFlow, and Pandas"
    ]
  }
};

const Summarizer = () => {
  const { isAuthenticated, showLoginDialog } = useAuth();
  const [activeTab, setActiveTab] = useState("upload");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [summaryType, setSummaryType] = useState("concise");
  const [focusTopics, setFocusTopics] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState<{
    text: string;
    keyPoints: string[];
    originalLength: string;
    summaryLength: string;
  } | null>(null);
  const [summaryHistory, setSummaryHistory] = useState<{
    id: string;
    title: string;
    date: Date;
    type: string;
  }[]>([
    {
      id: "1",
      title: "Physics Textbook Chapter 4",
      date: new Date(2023, 10, 15),
      type: "PDF"
    },
    {
      id: "2",
      title: "Database Systems Lecture Notes",
      date: new Date(2023, 11, 2),
      type: "DOCX"
    }
  ]);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleReset = () => {
    setFile(null);
    setSummary(null);
  };
  
  const handleGenerateSummary = () => {
    if (!file) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use the AI summarizer."
      });
      showLoginDialog();
      return;
    }
    
    setIsGenerating(true);
    toast({
      title: "Generating Summary",
      description: "Please wait while we process your document..."
    });
    
    // Simulate API call with delay
    setTimeout(() => {
      // Generate a more realistic summary based on the file name
      const fileName = file.name.toLowerCase();
      let mockSummary;
      
      if (fileName.includes("physics") || fileName.includes("quantum")) {
        mockSummary = {
          text: EXAMPLE_SUMMARIES["Quantum Physics Explained"].summary,
          keyPoints: EXAMPLE_SUMMARIES["Quantum Physics Explained"].keyPoints,
          originalLength: `${Math.floor(Math.random() * 30) + 15} pages`,
          summaryLength: `${Math.floor(Math.random() * 5) + 1} pages`
        };
      } else if (fileName.includes("history") || fileName.includes("renaissance")) {
        mockSummary = {
          text: EXAMPLE_SUMMARIES["World History: The Renaissance"].summary,
          keyPoints: EXAMPLE_SUMMARIES["World History: The Renaissance"].keyPoints,
          originalLength: `${Math.floor(Math.random() * 30) + 15} pages`,
          summaryLength: `${Math.floor(Math.random() * 5) + 1} pages`
        };
      } else if (fileName.includes("code") || fileName.includes("program") || fileName.includes("python")) {
        mockSummary = {
          text: EXAMPLE_SUMMARIES["Programming in Python"].summary,
          keyPoints: EXAMPLE_SUMMARIES["Programming in Python"].keyPoints,
          originalLength: `${Math.floor(Math.random() * 30) + 15} pages`,
          summaryLength: `${Math.floor(Math.random() * 5) + 1} pages`
        };
      } else if (fileName.includes("machine") || fileName.includes("learning") || fileName.includes("ai")) {
        mockSummary = {
          text: EXAMPLE_SUMMARIES["Introduction to Machine Learning"].summary,
          keyPoints: EXAMPLE_SUMMARIES["Introduction to Machine Learning"].keyPoints,
          originalLength: `${Math.floor(Math.random() * 30) + 15} pages`,
          summaryLength: `${Math.floor(Math.random() * 5) + 1} pages`
        };
      } else {
        // Default summary
        mockSummary = {
          text: "This document covers several key concepts and theories relevant to the subject area. The main themes include theoretical foundations, practical applications, and recent developments in the field. Several case studies are presented to illustrate the practical implications of the theoretical concepts discussed throughout the document.",
          keyPoints: [
            "Key theoretical foundations are established in the first section",
            "Practical applications are demonstrated through case studies",
            "Recent developments suggest new directions for future research",
            "Methodological approaches vary depending on context and requirements",
            "Limitations and constraints are acknowledged and discussed"
          ],
          originalLength: `${Math.floor(Math.random() * 30) + 15} pages`,
          summaryLength: `${Math.floor(Math.random() * 5) + 1} pages`
        };
      }
      
      setSummary(mockSummary);
      setIsGenerating(false);
      
      // Add to history
      setSummaryHistory(prev => [
        {
          id: Date.now().toString(),
          title: file.name,
          date: new Date(),
          type: file.type.split("/")[1].toUpperCase()
        },
        ...prev
      ]);
      
      toast({
        title: "Summary Generated",
        description: "Your document has been successfully summarized."
      });
    }, 3000);
  };
  
  const handleViewSampleSummary = (title: string) => {
    const exampleSummary = EXAMPLE_SUMMARIES[title as keyof typeof EXAMPLE_SUMMARIES];
    
    if (exampleSummary) {
      setSummary({
        text: exampleSummary.summary,
        keyPoints: exampleSummary.keyPoints,
        originalLength: exampleSummary.original,
        summaryLength: `${Math.ceil(exampleSummary.summary.length / 500)} pages`
      });
      
      setActiveTab("upload");
      toast({
        title: "Sample Summary Loaded",
        description: `Viewing sample summary: ${title}`
      });
    }
  };
  
  const handleViewHistory = (id: string) => {
    const historyItem = summaryHistory.find(item => item.id === id);
    if (historyItem) {
      // Simulate loading a saved summary
      const mockSummary = {
        text: "This is a previously generated summary retrieved from your history. The document covered key concepts and theoretical frameworks relevant to the subject matter, with practical examples and case studies to illustrate the applications of these theories.",
        keyPoints: [
          "Main theoretical frameworks were outlined in detail",
          "Practical examples demonstrated real-world applications",
          "Key findings were supported by relevant research",
          "Limitations and future research directions were discussed"
        ],
        originalLength: "18 pages",
        summaryLength: "3 pages"
      };
      
      setSummary(mockSummary);
      setActiveTab("upload");
      
      toast({
        title: "History Item Loaded",
        description: `Viewing summary: ${historyItem.title}`
      });
    }
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The summary has been copied to your clipboard."
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Document Summarizer</h1>
            <p className="text-muted-foreground">
              Upload your study materials and get AI-generated summaries, key points, and flashcards
            </p>
          </header>
          
          <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="pt-6">
                      {!file && !summary ? (
                        <div
                          className={`border-2 border-dashed rounded-lg p-10 text-center ${
                            isDragging ? "border-brand-500 bg-brand-50 dark:bg-brand-900/10" : "border-border"
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="rounded-full bg-brand-50 dark:bg-brand-900/20 p-3">
                              <Upload className="h-8 w-8 text-brand-500" />
                            </div>
                            <h3 className="text-lg font-semibold">Upload your document</h3>
                            <p className="text-muted-foreground text-sm max-w-md">
                              Drag and drop your PDF, DOCX, or TXT file here, or click to browse your files
                            </p>
                            <div className="pt-4">
                              <label 
                                htmlFor="file-upload" 
                                className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md cursor-pointer"
                              >
                                Browse Files
                              </label>
                              <input 
                                id="file-upload" 
                                type="file" 
                                accept=".pdf,.docx,.txt" 
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Maximum file size: 10MB. Supported formats: PDF, DOCX, TXT
                            </p>
                          </div>
                        </div>
                      ) : !summary ? (
                        <div className="border rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <div className="rounded-full bg-green-50 dark:bg-green-900/20 p-2 mr-3">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">File uploaded successfully</h3>
                              <p className="text-sm text-muted-foreground">{file?.name} ({(file?.size ? file.size / 1024 / 1024 : 0).toFixed(2)} MB)</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleReset}
                              className="ml-auto"
                            >
                              Change
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label htmlFor="summary-type" className="text-sm font-medium">
                                Summary Type
                              </label>
                              <select
                                id="summary-type"
                                className="w-full p-2 border border-border rounded-md"
                                value={summaryType}
                                onChange={(e) => setSummaryType(e.target.value)}
                              >
                                <option value="concise">Concise Summary (25% of original)</option>
                                <option value="detailed">Detailed Summary (50% of original)</option>
                                <option value="key-points">Key Points Only</option>
                                <option value="flashcards">Generate Flashcards</option>
                              </select>
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="focus-topics" className="text-sm font-medium">
                                Focus Topics (optional)
                              </label>
                              <input
                                id="focus-topics"
                                type="text"
                                className="w-full p-2 border border-border rounded-md"
                                placeholder="e.g. Neural Networks, Deep Learning"
                                value={focusTopics}
                                onChange={(e) => setFocusTopics(e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground">
                                Enter specific topics you want to focus on in the summary
                              </p>
                            </div>
                            
                            <div className="pt-2">
                              <Button 
                                className="w-full bg-brand-500 hover:bg-brand-600"
                                disabled={isGenerating}
                                onClick={handleGenerateSummary}
                              >
                                {isGenerating ? "Generating..." : "Generate Summary"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="border rounded-lg p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Summary Results</h3>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCopyToClipboard(summary.text)}
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                              >
                                Upload New
                              </Button>
                            </div>
                          </div>
                          
                          <div className="bg-muted/40 p-4 rounded-md mb-4">
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                              <span>Original: {summary.originalLength}</span>
                              <span>Summary: {summary.summaryLength}</span>
                            </div>
                            <div className="prose dark:prose-invert max-w-none">
                              <p>{summary.text}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-3">Key Points</h4>
                            <ul className="space-y-2">
                              {summary.keyPoints.map((point, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-500 mr-2">
                                    {index + 1}
                                  </span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex justify-between mt-6">
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </Button>
                            {summaryType !== "flashcards" && (
                              <Button className="bg-brand-500 hover:bg-brand-600">
                                Generate Flashcards
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">About Document Summarization</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-500 mr-2">1</span>
                          <span>Our AI extracts the most important information from your documents.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-500 mr-2">2</span>
                          <span>Summaries maintain the key concepts while eliminating redundant content.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-500 mr-2">3</span>
                          <span>Use our flashcard generator to create study aids directly from your materials.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20 text-brand-500 mr-2">4</span>
                          <span>All your documents are processed securely and confidentially.</span>
                        </li>
                      </ul>
                      
                      <div className="mt-6 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-brand-500" />
                          Supported Formats
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center p-2 bg-background rounded border border-border">
                            <p className="text-sm font-medium">PDF</p>
                          </div>
                          <div className="text-center p-2 bg-background rounded border border-border">
                            <p className="text-sm font-medium">DOCX</p>
                          </div>
                          <div className="text-center p-2 bg-background rounded border border-border">
                            <p className="text-sm font-medium">TXT</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-6">
              {summaryHistory.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Recently Summarized Documents</h3>
                  <div className="space-y-4">
                    {summaryHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-md hover:bg-muted/70 cursor-pointer">
                        <div className="flex items-start">
                          <div className="mr-3 p-2 bg-brand-50 dark:bg-brand-900/20 rounded-md">
                            <FileType className="h-5 w-5 text-brand-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.date.toLocaleDateString()} • {item.type}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewHistory(item.id)}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
                  <p className="text-center text-muted-foreground py-12">
                    You haven't summarized any documents yet.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="examples" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(EXAMPLE_SUMMARIES).map((title, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start">
                        <div className="rounded-md bg-brand-50 dark:bg-brand-900/20 p-2 mr-3">
                          <BookOpen className="h-5 w-5 text-brand-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {index % 2 === 0 ? "Textbook Chapter" : index % 3 === 0 ? "Academic Paper" : "Course Notes"} • 
                            {EXAMPLE_SUMMARIES[title as keyof typeof EXAMPLE_SUMMARIES].original}
                          </p>
                          <Button
                            variant="link"
                            size="sm"
                            className="px-0 text-brand-500"
                            onClick={() => handleViewSampleSummary(title)}
                          >
                            View Sample Summary
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Summarizer;
