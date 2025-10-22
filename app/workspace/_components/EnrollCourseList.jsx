"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";

function EnrollCourseList() {
  const [enrolledCourseList, setEnrolledCourseList] = useState([]);

  useEffect(() => {
    GetEnrolledCourse();
  }, []);

  const GetEnrolledCourse = async () => {
    const result = await axios.get("/api/enroll-course");
    console.log(result.data);
    setEnrolledCourseList(result.data);
  };

  return (
    enrolledCourseList?.length > 0 && (
      <div className="mt-3">
        <h2 className="font-bold text-xl mb-3">
          Continue Learning Your Course
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourseList.map((item, index) => (
            <EnrollCourseCard
              key={index}
              course={item?.courses}
              enrollCourse={item?.enrollCourse}
            />
          ))}
        </div>
      </div>
    )
  );
}

export default EnrollCourseList;
