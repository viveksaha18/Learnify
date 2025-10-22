import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Book,
  Clock,
  Loader2Icon,
  PlayCircle,
  Settings,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "sonner";

function CourseInfo({ course, viewCourse }) {
  const courseLayout = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const GenerateCourseContent = async () => {
    // Call API to generate content
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-course-content", {
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid,
      });
      console.log(result.data);
      setLoading(false);
      router.replace("/workspace");
      toast.success("Course Content Generated Successfully!");
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Server Side Error, Please try again later!");
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-5 rounded-2xl shadow-sm gap-6">
      {/* Left Section */}
      <div className="flex flex-col gap-3 flex-1">
        <h2 className="font-bold text-2xl">{courseLayout?.name}</h2>
        <p className="line-clamp-2 text-gray-500">
          {courseLayout?.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {/* <div className="flex gap-5 items-center p-3 rounded-lg shadow-sm">
            <Clock className="text-blue-500" />
            <section>
              <h2 className="font-bold">Duration</h2>
              <h2>2 Hours</h2>
            </section>
          </div> */}

          <div className="flex gap-5 items-center p-3 rounded-lg shadow-sm">
            <Book className="text-green-500" />
            <section>
              <h2 className="font-bold">Chapters</h2>
              <h2>{course?.noOfChapters}</h2>
            </section>
          </div>

          <div className="flex gap-5 items-center p-3 rounded-lg shadow-sm">
            <TrendingUp className="text-red-500" />
            <section>
              <h2 className="font-bold">Difficulty Level</h2>
              <h2>{course?.level}</h2>
            </section>
          </div>
        </div>
       {!viewCourse ? (
  <Button
    className="max-w-sm"
    onClick={GenerateCourseContent}
    disabled={loading}
  >
    {loading ? <Loader2Icon className="animate-spin" /> : <Settings />}
    Generate Content
  </Button>
) : (
  <Link href={`/course/`+course?.cid}>
    <Button>
      <PlayCircle /> Continue Learning
    </Button>
  </Link>
)}

      </div>

      {/* Right Section (Image) */}
      <div className="ml-auto flex-shrink-0">
        <Image
          src={course?.bannerImageUrl}
          alt="Course Banner"
          width={400}
          height={400}
          className="rounded-2xl object-cover w-[400px] h-[240px]"
        />
      </div>
    </div>
  );
}

export default CourseInfo;
