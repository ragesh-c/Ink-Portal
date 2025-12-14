import { Project, AboutContent } from './types';

export const APP_CONFIG = {
  appName: "Ragesh Changam",
  appSubtitle: "UX Designer Environment Artist",
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-01",
    title: "FinFlexi AI",
    type: "UX",
    platform: "Medium",
    externalURL: "https://medium.com/@ragesh-changam/finflexi-ai-a-premium-ui-system-for-gen-z-money-management-d5848f69d109",
    // Updated to the specific iPhone 16 Pro mockup provided
    thumbnailImage: "https://res.cloudinary.com/dpxbzg9tn/image/upload/v1765617047/01_Free_iPhone_16_Pro_Mockup_Holding_By_Hand_1_qccdsk.png",
    shortDescription: "A Premium UI System for Gen Z Money Management.",
    featured: true
  },
  {
    id: "proj-02",
    title: "Animation Showreel",
    type: "Animation",
    platform: "YouTube",
    externalURL: "https://www.youtube.com/embed/t0D7lNj19C4",
    thumbnailImage: "https://img.youtube.com/vi/t0D7lNj19C4/hqdefault.jpg",
    shortDescription: "A motion graphic exploration of cyberpunk aesthetics and kinetic typography.",
    featured: true
  },
  {
    id: "proj-06",
    title: "Redesigning BookMyShow's Booking flow",
    type: "Case Study",
    platform: "Web",
    externalURL: "https://www.figma.com/proto/rZTV3zvLjYFWlMtC0ozXVk/BookMyShow-Final-Case-Study?node-id=33-1200&t=biDnO1hh00eRX4hM-1",
    thumbnailImage: "https://res.cloudinary.com/dpxbzg9tn/image/upload/v1765711541/1_1_mfz61y.png",
    shortDescription: "A UX Case study focusing on improving seat selection, pricing and personalisation experience",
    featured: true
  },
  {
    id: "proj-05",
    title: "Designing Last Call on Zomato",
    type: "Case Study",
    platform: "Medium",
    externalURL: "https://medium.com/@ragesh-changam/designing-last-call-on-zomato-tackling-indias-restaurant-food-waste-57e32ae89fd6",
    thumbnailImage: "https://res.cloudinary.com/dpxbzg9tn/image/upload/v1765641766/8_enri1b.jpg",
    shortDescription: "A UX case study focused on reducing food wastage through surplus meal sales, improving trust, and balancing business with sustainability.",
    featured: true
  },
  {
    id: "proj-04",
    title: "A Vikings Tale",
    type: "Animation",
    platform: "YouTube",
    externalURL: "https://www.youtube.com/embed/ti4BzK7dDWc",
    thumbnailImage: "https://res.cloudinary.com/dpxbzg9tn/image/upload/v1765645088/Screenshot_2025-12-13_222751_k1kezr.png",
    shortDescription: "A Vikings Tale Ultra Short Animation - Inspired by AC Valhalla",
    featured: false
  },
  {
    id: "proj-03",
    title: "Google’s Digital Wellbeing",
    type: "UX",
    platform: "Medium",
    externalURL: "https://medium.com/@ragesh-changam/how-googles-digital-wellbeing-forgot-wellbeing-a-kinder-bedtime-that-people-will-keep-6697e26fbd98",
    thumbnailImage: "https://res.cloudinary.com/dpxbzg9tn/image/upload/v1765642951/Post1_aqjvy6.png",
    shortDescription: "How Google’s Digital Wellbeing Forgot Wellbeing: a kinder Bedtime that people will keep",
    featured: false
  }
];

export const ABOUT_DATA: AboutContent = {
  bio: `An adventurer and creative explorer.

I’m Ragesh Changam  a UX designer and environment artist with roots in visual design, film, and 3D environments. My work blends human-centred thinking with cinematic storytelling, whether I’m designing seamless digital journeys or building immersive worlds in Unreal Engine.

With a Master’s in Film, Animation, and Digital Arts from the UK, I’ve worked across short films, festival projects, and interactive experiences, including a study on empathetic virtual actors (yes, actors with feelings). I’ve also spent time in the corporate design world, creating presentation systems and component libraries, and in the startup space, shaping product journeys from the ground up.

Outside of work, I’m drawn to challenges that demand both focus and creativity rock climbing, hiking, and exploring new landscapes keep me grounded and inspired. The outdoors teaches me the same thing design does: clarity, patience, and the joy of problem-solving.

Every project I take on is an opportunity to connect ideas, spark curiosity, and build something that leaves a mark whether it’s a seat-selection flow that earns user trust or a virtual space that feels alive. If you’re looking to collaborate on something meaningful (or just swap climbing stories), I’d love to hear from you.`,
  philosophy: "Content is king, but context is the kingdom. My work focuses on narrative-driven interfaces where every interaction tells a part of the story.",
  skills: [
    { subject: 'UX Research', A: 90, fullMark: 100 },
    { subject: 'UI Design', A: 85, fullMark: 100 },
    { subject: 'Animation', A: 95, fullMark: 100 },
    { subject: 'Prototyping', A: 80, fullMark: 100 },
    { subject: 'Strategy', A: 70, fullMark: 100 },
    { subject: 'Environment Building', A: 80, fullMark: 100 },
  ],
  toolStack: [
    { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
    { name: "Unreal Engine", logo: "https://cdn.simpleicons.org/unrealengine" },
    { name: "Framer", logo: "https://cdn.simpleicons.org/framer" },
    { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { name: "Google AI Studio", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
    { name: "Photoshop", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
    { name: "Davinci Resolve", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png" },
  ]
};