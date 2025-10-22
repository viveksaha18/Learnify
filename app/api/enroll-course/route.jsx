import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId } = await req.json();
  const user = await currentUser();

  const enrollCourses = await db
    .select()
    .from(enrollCourseTable)
    .where(
      and(
        eq(enrollCourseTable.cid, courseId),
        eq(enrollCourseTable.userEmail, user.primaryEmailAddress?.emailAddress)
      )
    );

  if (enrollCourses?.length == 0) {
    const result = await db
      .insert(enrollCourseTable)
      .values({
        cid: courseId,
        userEmail: user.primaryEmailAddress?.emailAddress,
      })
      .returning(enrollCourseTable);
    return NextResponse.json(result);
  }

  return NextResponse.json({ resp: "Already Enrolled Course" });
}

export async function GET(req) {
  const user = await currentUser();

  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");

  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        and(
          eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
          eq(enrollCourseTable.cid, courseId)
        )
      )
      .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result);
  }
}




export async function PUT(req) {
  try {
    const { cid, completedChapter } = await req.json();
    const user = await currentUser();

    if (!cid) {
      return NextResponse.json({ error: "cid is required" }, { status: 400 });
    }

    const result = await db
      .update(enrollCourseTable)
      .set({ completedChapters: completedChapter })
      .where(
        and(
          eq(enrollCourseTable.cid, cid),
          eq(enrollCourseTable.userEmail, user.primaryEmailAddress?.emailAddress)
        )
      )
      .returning(enrollCourseTable);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "No enrolled course found for given cid" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result[0] }, { status: 200 });
  } catch (error) {
    console.error("Error updating enroll course:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

