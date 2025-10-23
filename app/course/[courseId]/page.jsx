"use client";
import AppHeader from "@/app/workspace/_components/AppHeader";
import React, { useEffect, useState } from "react";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import ChapterContent from "../_components/ChapterContent";
import { useParams } from "next/navigation";
import axios from "axios";

function Course() {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState();

  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    const result = await axios.get(`/api/enroll-course?courseId=${courseId}`);
    setCourseInfo(result.data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader hideSidebar={true} />

      {/* Responsive layout */}
      <div className="flex flex-1 flex-col lg:flex-row gap-4 lg:gap-10">
        <ChapterListSidebar courseInfo={courseInfo} />
        <div className="flex-1 overflow-y-auto">
          <ChapterContent
            courseInfo={courseInfo}
            refreshData={() => GetEnrolledCourseById()}
          />
        </div>
      </div>
    </div>
  );
}

export default Course;
