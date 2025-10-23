"use client";
import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { CheckCircle2, Menu, X } from "lucide-react";

function ChapterListSidebar({ courseInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  const course = Array.isArray(courseInfo)
    ? courseInfo[0]?.courses
    : courseInfo?.courses;

  const enrollCourse = Array.isArray(courseInfo)
    ? courseInfo[0]?.enrollCourse
    : courseInfo?.enrollCourse;

  const completedChapters = enrollCourse?.completedChapters || [];
  const courseContent = course?.courseContent;
  const { setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);

  return (
    <>
      <button
        className="lg:hidden fixed top-20 left-4 z-50 bg-white p-2 rounded-md shadow-md border"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-secondary p-4 overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:w-80`}
      >
        <h2 className="my-3 font-bold text-2xl text-gray-900">
          Chapters ({courseContent?.length})
        </h2>

        <Accordion type="single" collapsible>
          {courseContent?.map((chapter, index) => {
            const isCompleted = completedChapters.includes(index);

            return (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                onClick={() => {
                  setSelectedChapterIndex(index);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
              >
                <AccordionTrigger className="font-semibold text-gray-800 px-3 py-3 flex items-center justify-between border-b border-gray-200 hover:bg-gray-100 rounded-md transition-all">
                  <span className="text-base">
                    {chapter.courseData?.chapterName || `Chapter ${index + 1}`}
                  </span>
                  {isCompleted && (
                    <CheckCircle2
                      size={24}
                      strokeWidth={2.5}
                      className="text-green-600 ml-3"
                      title="Chapter Completed"
                    />
                  )}
                </AccordionTrigger>

                <AccordionContent className="px-3 py-3 bg-gray-50 rounded-md mt-1">
                  <div className="space-y-2">
                    {chapter.courseData?.topics?.map((topicObj, i) => (
                      <div
                        key={i}
                        className="p-3 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <span className="text-sm font-medium text-gray-800">
                          {topicObj.topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default ChapterListSidebar;
