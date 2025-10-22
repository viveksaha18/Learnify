import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function EnrollCourseCard({ course, enrollCourse }) {
  const courseJson = course?.courseJson?.course;

  const CalculatePerProgress = () => {
    const completed = enrollCourse?.completedChapters?.length ?? 0;
    const total = course?.courseContent?.length ?? 1;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="shadow rounded-xl">
      <Image
        src={course?.bannerImageUrl || "/default-course.png"}
        alt={course?.name || "Course Image"}
        width={400}
        height={300}
        className="w-full aspect-video rounded-t-xl object-cover"
      />
      <div className="p-3 flex-col gap-3">
        <h2 className="font-bold text-lg">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-gray-400 text-sm">
          {courseJson?.description}
        </p>
        <div>
          <h2 className="flex justify-between text-sm text-primary">
            Progress <span>{CalculatePerProgress()}%</span>
          </h2>
          <Progress value={CalculatePerProgress()} />
          <Link href={`/workspace/view-course/${course?.cid}`}>
            <Button className="w-full mt-3 cursor-pointer">
              <PlayCircle /> Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
