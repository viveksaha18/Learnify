"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewCourseDialog from "./AddNewCourseDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && GetCourseList();
  }, [user]);
  const GetCourseList = async () => {
    const result = await axios.get("/api/courses");
    console.log(result.data);
    setCourseList(result.data);
  };
  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">Course List</h2>
      {courseList?.length === 0 ? (
        <div className="flex p-7 items-center jusitfy-center flex-col border rounded-xl mt-2 bg-secondary">
          <Image
            src={"/online-education.png"}
            alt="edu"
            width={80}
            height={80}
          />
          <h2 className="my-2 text-xl font-bold">
            Look like you haven't created any courses yet
          </h2>
          <AddNewCourseDialog>
            <Button className={"cursor-pointer"}>
              + Create Your First Course
            </Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courseList?.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
