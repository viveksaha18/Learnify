"use client";
import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { CheckCircle2 } from "lucide-react";

function ChapterListSidebar({ courseInfo }) {
  const course = Array.isArray(courseInfo)
    ? courseInfo[0]?.courses
    : courseInfo?.courses;

  const enrollCourse = Array.isArray(courseInfo)
    ? courseInfo[0]?.enrollCourse
    : courseInfo?.enrollCourse;

  const completedChapters = enrollCourse?.completedChapters || [];
  const courseContent = course?.courseContent;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );

  return (
    <div className="w-80 bg-secondary h-screen p-4 overflow-y-auto">
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
              onClick={() => setSelectedChapterIndex(index)}
            >
              <AccordionTrigger className="font-semibold text-gray-800 px-3 py-3 flex items-center justify-between border-b border-gray-200 hover:bg-gray-100 rounded-md transition-all">
                <span className="text-base">
                  {chapter.courseData?.chapterName || `Chapter ${index + 1}`}
                </span>
                {isCompleted && (
                  <CheckCircle2
                    size={28}
                    strokeWidth={2.5}
                    className="text-green-600 ml-3 drop-shadow-sm"
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
  );
}

export default ChapterListSidebar;
