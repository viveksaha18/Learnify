import { Gift, CheckCircle } from "lucide-react";
import React from "react";

function ChapterTopicList({ course, enrollCourse }) {
  const courseLayout = course?.courseJson?.course;
  const completedChapters = enrollCourse?.completedChapters ?? [];

  return (
    <div>
      <h2 className="font-bold text-3xl mt-10">Chapter & Topics</h2>
      <div className="flex flex-col items-center justify-center mt-10">
        {courseLayout?.chapters?.map((chapter, index) => {
          const isCompleted = completedChapters.includes(index);

          return (
            <div key={index} className="flex flex-col items-center">
              {/* ✅ Chapter Card */}
              <div
                className={`p-4 border shadow rounded-xl text-white transition-all duration-300 ${
                  isCompleted ? "bg-green-600" : "bg-primary"
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <h2 className="text-center">Chapter {index + 1}</h2>
                  {isCompleted && (
                    <CheckCircle className="text-white w-5 h-5" />
                  )}
                </div>

                <h2 className="font-bold text-lg text-center">
                  {chapter.chapterName}
                </h2>

                <h2 className="text-xs flex justify-between gap-16">
                  <span>Duration: {chapter?.duration}</span>
                  <span>No. Of Topics: {chapter?.topic?.length}</span>
                </h2>
              </div>

              {/* ✅ Topic Tree */}
              <div>
                {(chapter?.topic || []).map((topic, topicIndex) => (
                  <div className="flex flex-col items-center" key={topicIndex}>
                    <div className="h-10 bg-gray-300 w-1"></div>

                    <div className="flex items-center gap-5">
                      <span
                        className={`${
                          topicIndex % 2 === 0 && "text-transparent"
                        } max-w-xs`}
                      >
                        {topic}
                      </span>

                      <h2
                        className={`text-center rounded-full px-6 p-4 ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-500"
                        }`}
                      >
                        {topicIndex + 1}
                      </h2>

                      <span
                        className={`${
                          topicIndex % 2 !== 0 && "text-transparent"
                        } max-w-xs`}
                      >
                        {topic}
                      </span>
                    </div>

                    {topicIndex === chapter?.topic?.length - 1 && (
                      <>
                        <div className="h-10 bg-gray-300 w-1"></div>
                        <div className="flex items-center gap-5">
                          <Gift className="text-center rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4" />
                        </div>
                        <div className="h-10 bg-gray-300 w-1"></div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* ✅ Finish Button */}
        <div className="p-4 border shadow rounded-xl bg-green-600 text-white mt-6">
          <h2>Finish</h2>
        </div>
      </div>
    </div>
  );
}

export default ChapterTopicList;
