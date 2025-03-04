import AgentPulse from "@/components/AgentPulse";
import YoutubeVideoForm from "@/components/YoutubeVideoForm";
import { Brain, ImageIcon, MessageSquare, Sparkles, Video } from "lucide-react";

const steps = [
  {
    title: "1. Connect Your Content",
    description: "Share your YouTube video URL and let CortexAI get to work",
    icon: Video,
  },
  {
    title: "2. CortexAI Agent Analysis",
    description: "Your personal agent analyzes every aspect of your content",
    icon: Brain,
  },
  {
    title: "3. Receive Intelligence",
    description: "Get actionable insights and strategic recommendations",
    icon: MessageSquare,
  },
];

const features = [
  {
    title: "AI Analysis",
    description:
      "Get deep insights into your video content with CortexAI. Understand viewer engagement and content quality.",
    icon: Brain,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Smart Transcription",
    description:
      "Convert speech to text with high accuracy. Get searchable, editable transcripts for your video content.",
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Thumbnail Generation",
    description:
      "Automatically generate eye-catching thumbnails that boost engagement and click-through rates.",
    icon: ImageIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Title Generation",
    description:
      "Get compelling, SEO-friendly video titles that attract more views and improve discoverability.",
    icon: MessageSquare,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Shot Script",
    description:
      "Generate structured shot-by-shot scripts to streamline video production and storytelling.",
    icon: Video,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Discuss With CortexAI Agent",
    description:
      "Engage in real-time conversations with CortexAI to refine ideas and enhance content strategy.",
    icon: Sparkles,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
<div className="text-center">
  <span className="w-full block text-blue-100 bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 text-xs sm:text-sm md:text-base">
    I made it Free for you To keep the server running, buy me a coffee 0741535521 ☕
  </span>
</div>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-10 text-center mb-12">
            <AgentPulse size="large" color="blue" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet CortexAI Your{""}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                AI Content Agent
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your YouTube content with AI-powered analysis, transcription, and insights.
            </p>
            <YoutubeVideoForm />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Content Creators
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.iconBg}`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet CortexAI in 3 Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-0 bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="text-center">
          <span className="text-blue-100 bg-gradient-to-r from-blue-700 to-blue-300 px-4 py-2 rounded-full text-xs sm:text-sm md:text-base">
            My project entry in Sonny Sangha&apos;s 2025 Challenge
          </span>
        </div>
      </section>
    </div>
  );
}