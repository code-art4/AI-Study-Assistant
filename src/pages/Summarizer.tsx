
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { BookOpen, Upload, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Summarizer = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
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
                      {!file ? (
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
                      ) : (
                        <div className="border rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <div className="rounded-full bg-green-50 dark:bg-green-900/20 p-2 mr-3">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">File uploaded successfully</h3>
                              <p className="text-sm text-muted-foreground">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
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
                              />
                              <p className="text-xs text-muted-foreground">
                                Enter specific topics you want to focus on in the summary
                              </p>
                            </div>
                            
                            <div className="pt-2">
                              <Button className="w-full bg-brand-500 hover:bg-brand-600">
                                Generate Summary
                              </Button>
                            </div>
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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
                <p className="text-center text-muted-foreground py-12">
                  You haven't summarized any documents yet.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="examples" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Introduction to Machine Learning",
                    type: "Textbook Chapter",
                    length: "45 pages"
                  },
                  {
                    title: "Quantum Physics Explained",
                    type: "Academic Paper",
                    length: "22 pages"
                  },
                  {
                    title: "World History: The Renaissance",
                    type: "Course Notes",
                    length: "18 pages"
                  },
                  {
                    title: "Programming in Python",
                    type: "Tutorial",
                    length: "32 pages"
                  }
                ].map((example, index) => (
                  <Card key={index} className="hover-effect">
                    <CardContent className="pt-6">
                      <div className="flex items-start">
                        <div className="rounded-md bg-brand-50 dark:bg-brand-900/20 p-2 mr-3">
                          <BookOpen className="h-5 w-5 text-brand-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{example.title}</h3>
                          <p className="text-sm text-muted-foreground">{example.type} • {example.length}</p>
                          <Button
                            variant="link"
                            size="sm"
                            className="px-0 text-brand-500"
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
