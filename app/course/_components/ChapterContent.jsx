"use client";

import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import React, { useContext } from "react";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

function ChapterContent({ courseInfo, refreshData }) {
  const course = Array.isArray(courseInfo)
    ? courseInfo[0]?.courses
    : courseInfo?.courses;

  const enrollCourse = Array.isArray(courseInfo)
    ? courseInfo[0]?.enrollCourse
    : courseInfo?.enrollCourse;

  const courseContent = course?.courseContent;
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);

  const currentChapter = courseContent?.[selectedChapterIndex];
  const videoData = currentChapter?.youtubeVideo;
  const topics = currentChapter?.courseData?.topics;
  const chapterName =
    currentChapter?.courseData?.chapterName || "No Chapter Selected";

  // ✅ Function to download topics
  const handleDownload = () => {
    if (!topics || topics.length === 0) {
      alert("No topics found to download.");
      return;
    }

    let content = `📘 Chapter: ${chapterName}\n\n`;
    topics.forEach((topic, index) => {
      content += `${index + 1}. ${topic.topic}\n${topic.content
        .replace(/<[^>]+>/g, "")
        .trim()}\n\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${chapterName.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Mark chapter completed for this specific course (by cid)
  const markChapterCompleted = async () => {
    try {
      const cid = enrollCourse?.cid; // use your course unique id
      const completedChapter = enrollCourse?.completedChapters ?? [];

      if (completedChapter.includes(selectedChapterIndex)) {
        toast.info("This chapter is already completed!");
        return;
      }

      // Add the newly completed chapter
      const updatedChapters = [...completedChapter, selectedChapterIndex];

      const result = await axios.put("/api/enroll-course", {
        cid, // send cid instead of courseId
        completedChapter: updatedChapters,
      });

      if (result.status === 200) {
        toast.success("Chapter marked as completed!");
        refreshData(); // refresh UI
      } else {
        toast.error("Failed to update chapter status!");
      }
    } catch (error) {
      console.error("Error updating chapter:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-8 flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl text-gray-800">
          {selectedChapterIndex + 1}. {chapterName}
        </h2>

        <div className="flex space-x-3">
          <Button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Download Content
          </Button>

          <Button
            onClick={markChapterCompleted}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Mark Completed
          </Button>
        </div>
      </div>

      {/* Related Videos */}
      <h2 className="my-2 font-bold text-lg text-blue-500">Related Videos</h2>
      <div className="relative w-full overflow-x-auto">
        <div className="flex space-x-6 py-4 min-w-max">
          {videoData?.map((video, index) => (
            <div
              key={index}
              className="flex-none w-[360px] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <YouTube
                videoId={video?.videoId}
                opts={{
                  width: "360",
                  height: "200",
                  playerVars: { autoplay: 0 },
                }}
              />
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  {video?.title || `Video ${index + 1}`}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Section */}
      <h2 className="my-4 font-bold text-lg text-green-600">Topics Covered</h2>
      <div className="grid gap-3">
        {topics?.length > 0 ? (
          topics.map((topic, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all duration-200 shadow-sm"
            >
              <h3 className="font-semibold text-gray-800 mb-2">
                {index + 1}. {topic?.topic}
              </h3>
              <div
                className="text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: topic?.content }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No topics found.</p>
        )}
      </div>
    </div>
  );
}

export default ChapterContent;
