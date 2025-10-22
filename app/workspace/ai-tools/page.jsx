"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const allTools = [
  {
    name: "ChatGPT",
    category: "Writing",
    description: "Conversational AI that helps you write, learn, and code with ease.",
    link: "https://chat.openai.com",
  },
  {
    name: "Google Gemini",
    category: "Learning",
    description: "Multimodal AI assistant built for text, images, and code understanding.",
    link: "https://gemini.google.com",
  },
  {
    name: "GitHub Copilot",
    category: "Coding",
    description: "AI pair programmer that assists you in writing clean, efficient code.",
    link: "https://github.com/features/copilot",
  },
  {
    name: "Notion AI",
    category: "Productivity",
    description: "Boost your workflow with AI that writes, summarizes, and brainstorms.",
    link: "https://www.notion.so/product/ai",
  },
];

export default function AIToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState(allTools);

  const handleSearch = () => {
    const results = allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTools(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-10 text-center">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4">AI Tools Hub</h1>
      <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
        Explore the most powerful <span className="font-semibold text-blue-600">AI tools</span> built
        to make learning, coding, and productivity smarter. Search your favorite AI assistant and try it instantly.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
        <Input
          placeholder="Search by tool name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {filteredTools.map((tool, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 w-72 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-bold text-blue-600 mb-2">{tool.name}</h2>
            <p className="text-sm text-gray-500 mb-1">Category: {tool.category}</p>
            <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
            <Button asChild>
              <a href={tool.link} target="_blank" rel="noopener noreferrer">
                Try Now
              </a>
            </Button>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <p className="text-gray-500 mt-8">No tools found. Try a different search term.</p>
      )}
    </div>
  );
}
