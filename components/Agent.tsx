"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = (payload?: unknown) => {
      try {
        console.log("vapi event: call-start", JSON.parse(JSON.stringify(payload)));
      } catch {
        console.log("vapi event: call-start (non-serializable)", payload);
      }
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = (payload?: unknown) => {
      try {
        console.log("vapi event: call-end", JSON.parse(JSON.stringify(payload)));
      } catch {
        console.log("vapi event: call-end (non-serializable)", payload);
      }
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: unknown) => {
      const msg = message as Record<string, unknown> | undefined;
      if (msg?.type === "transcript" && (msg as any).transcriptType === "final") {
        const roleVal = typeof (msg as any).role === "string" ? ((msg as any).role as string) : "assistant";
        const role = (roleVal === "user" || roleVal === "system") ? (roleVal as SavedMessage['role']) : ("assistant" as SavedMessage['role']);
        const content = typeof (msg as any).transcript === "string" ? ((msg as any).transcript as string) : "";
        const newMessage: SavedMessage = { role, content };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: unknown) => {
      // Filter out expected "Meeting ended due to ejection" errors (normal end-of-call behavior)
      const errorStr = String(error);
      if (errorStr.includes("Meeting ended due to ejection") || errorStr.includes("Meeting has ended")) {
        console.log("vapi event: call ended normally (ejection is expected)");
        return;
      }
      
      try {
        console.log("vapi event: error", JSON.parse(JSON.stringify(error)));
      } catch {
        console.log("vapi event: error (non-serializable)", error);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        console.log("Call finished (generate), creating interview...");
        
        // Extract interview details from messages and create in our database
        const createInterviewFromCall = async () => {
          try {
            // Default interview parameters (Vapi doesn't pass these back, so use defaults)
            const interviewData = {
              type: "technical",
              role: "Software Engineer",
              level: "mid",
              techstack: "javascript,react",
              amount: 5,
              userid: userId,
            };

            const response = await fetch("/api/vapi/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(interviewData),
            });

            const result = await response.json();
            
            if (result.success && result.id) {
              console.log("Interview created:", result.id);
              // Navigate to the newly created interview
              router.push(`/interview/${result.id}`);
            } else {
              console.error("Failed to create interview:", result);
              router.push("/");
            }
          } catch (err) {
            console.error("Error creating interview after call:", err);
            router.push("/");
          }
        };

        createInterviewFromCall();
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    try {
      if (type === "generate") {
        const res = await vapi.start(
          process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
          {
            variableValues: {
              username: userName,
              userid: userId,
            },
          }
        );
        console.log("vapi.start (generate) response:", res);
      } else {
        let formattedQuestions = "";
        if (questions) {
          formattedQuestions = questions
            .map((question) => `- ${question}`)
            .join("\n");
        }

        const res = await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
        });
        console.log("vapi.start (interview) response:", res);
      }
    } catch (error) {
      console.error("Error starting the call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = () => {
    try {
      setCallStatus(CallStatus.FINISHED);
      vapi.stop();
    } catch (error) {
      console.error("Error disconnecting the call:", error);
    }
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
