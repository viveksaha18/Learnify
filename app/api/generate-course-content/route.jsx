import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `Depends on Chapter name and Topic, generate content for each topic in HTML 
and give response in JSON format. 

Schema:
{
  chapterName: "",
  topics: [
    {
      topic: "",
      content: ""
    }
  ]
}

User Input:
`;

export async function POST(req) {
  try {
    const { courseJson, courseTitle, courseId } = await req.json();

    const promises = courseJson.chapters.map(async (chapter) => {
      const config = {
        thinkingConfig: {
          thinkingBudget: -1,
        },
      };

      const model = "gemini-2.5-flash";
      const contents = [
        {
          role: "user",
          parts: [
            {
              text: PROMPT + JSON.stringify(chapter),
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      const rawResp =
        response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

      const cleaned = rawResp.replace(/```json|```/g, "").trim().replace(/[\u0000-\u001F]+/g, "");

      let jsonResp;
      try {
        jsonResp = JSON.parse(cleaned);
      } catch {
        jsonResp = { chapterName: chapter?.chapterName || "", topics: [] };
      }

      const youtubeData = await GetYoutubeVideo(
        `${chapter?.chapterName} ${courseTitle} tutorial`
      );

      return {
        youtubeVideo: youtubeData,
        courseData: jsonResp,
      };
    });

    const CourseContent = await Promise.all(promises);
    await db
      .update(coursesTable)
      .set({
        courseContent: CourseContent,
      })
      .where(eq(coursesTable.cid, courseId));
    return NextResponse.json({
      courseName: courseTitle,
      courseId,
      CourseContent,
    });
  } catch (error) {
    console.error("Error generating course content:", error.message);
    return NextResponse.json(
      { error: "Failed to generate course content" },
      { status: 500 }
    );
  }
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const GetYoutubeVideo = async (topic) => {
  try {
    if (!topic) return [];

    const params = {
      part: "snippet",
      q: topic,
      maxResults: 4,
      type: "video",
      key: process.env.YOUTUBE_API_KEY,
    };

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });

    const youtubeVideoListResp = resp.data.items || [];

    const youtubeVideoList = youtubeVideoListResp.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
    }));

    return youtubeVideoList;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error.message);
    return [];
  }
};
