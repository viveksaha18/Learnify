"use client";
import React from "react";
import EnrollCourseList from "../_components/EnrollCourseList";
import AddNewCourseDialog from "../_components/AddNewCourseDialog";
import { Button } from "@/components/ui/button";

function MyLearning() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              My Learning
            </h2>
            <p className="text-gray-600 mt-3 text-lg leading-relaxed max-w-2xl">
              Welcome to your personalized learning space — a place built to help you grow
              your skills, track your progress, and explore new areas of knowledge. 
              Here, you can access your enrolled courses, continue from where you left off, 
              and even generate new AI-powered courses tailored to your interests and pace.
            </p>
          </div>

          <AddNewCourseDialog>
            <Button className="mt-6 sm:mt-0 bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
              Generate Course
            </Button>
          </AddNewCourseDialog>
        </header>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 transition-all hover:shadow-2xl">
          <EnrollCourseList />
        </div>
      </div>
    </section>
  );
}

export default MyLearning;
