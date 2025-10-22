"use client";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Manage Your Profile
        </h1>
        <p className="text-gray-600 text-lg">
          Update your account information, security settings, and preferences all in one place.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-none border-0",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Profile;
