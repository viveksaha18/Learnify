"use client";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import AddNewCourseDialog from "../_components/AddNewCourseDialog";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedCourses, setSortedCourses] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    try {
      const result = await axios.get("/api/courses");
      setCourseList(result.data);
      setSortedCourses(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSortedCourses(courseList);
      return;
    }

    const term = searchQuery.toLowerCase();
    const matched = courseList.filter((course) =>
      course?.name?.toLowerCase().includes(term)
    );
    const unmatched = courseList.filter(
      (course) => !course?.name?.toLowerCase().includes(term)
    );
    setSortedCourses([...matched, ...unmatched]);
  }, [searchQuery, courseList]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Explore Courses
            </h2>
            <p className="text-gray-600 mt-3 text-lg max-w-2xl leading-relaxed">
              Discover a wide range of AI-powered learning experiences designed
              to enhance your creativity and skills. Whether you're just
              starting out or advancing your expertise, find the right course or
              create your own personalized one using AI.
            </p>
          </div>

          <AddNewCourseDialog>
            <Button className="mt-6 sm:mt-0 bg-gradient-to-r from-indigo-600 to-blue-700 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
              Generate New Course
            </Button>
          </AddNewCourseDialog>
        </header>

        <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
          <div className="relative w-full sm:w-2/3">
            <Input
              placeholder="Search for a course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 text-lg pl-12 shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedCourses.length > 0 ? (
            sortedCourses.map((course, index) => (
              <CourseCard course={course} key={index} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full text-lg py-10">
              No courses found. Try a different keyword or generate a new course.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Explore;
