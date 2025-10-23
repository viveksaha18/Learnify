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

  const markChapterCompleted = async () => {
    try {
      const cid = enrollCourse?.cid;
      const completedChapter = enrollCourse?.completedChapters ?? [];

      if (completedChapter.includes(selectedChapterIndex)) {
        toast.info("This chapter is already completed!");
        return;
      }

      const updatedChapters = [...completedChapter, selectedChapterIndex];
      const result = await axios.put("/api/enroll-course", {
        cid,
        completedChapter: updatedChapters,
      });

      if (result.status === 200) {
        toast.success("Chapter marked as completed!");
        refreshData();
      } else {
        toast.error("Failed to update chapter status!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="font-bold text-xl sm:text-2xl text-gray-800">
          {chapterName}
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2"
          >
            Download Content
          </Button>
          <Button
            onClick={markChapterCompleted}
            className="bg-green-600 hover:bg-green-700 text-white text-sm flex items-center gap-2 px-3 py-2"
          >
            <CheckCircle size={16} />
            Mark Completed
          </Button>
        </div>
      </div>

      <h2 className="my-3 font-bold text-lg text-blue-500">Related Videos</h2>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 sm:gap-6 py-3">
          {videoData?.map((video, index) => (
            <div
              key={index}
              className="flex-none w-[280px] sm:w-[360px] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <YouTube
                videoId={video?.videoId}
                opts={{
                  width: "100%",
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

      <h2 className="my-4 font-bold text-lg text-green-600">Topics Covered</h2>
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
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
