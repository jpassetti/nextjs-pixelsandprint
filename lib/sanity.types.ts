export type SanityImage = {
 asset?: {
  url?: string;
  metadata?: {
   dimensions?: {
    width?: number;
    height?: number;
   };
  };
 };
 alt?: string;
 caption?: string;
};

export type Coach = {
 _id: string;
 nameFirst: string;
 nameLast: string;
 title?: string;
 companyName: string;
 companyUrl: string;
 role: "uiux" | "motion" | "print" | "immersive" | string;
 headshot?: SanityImage;
};

export type Sponsor = {
 _id: string;
 name: string;
 url?: string;
 logo?: SanityImage;
};

export type ScheduleDay = {
 title: string;
 slug: string;
 start: string;
 end: string;
 order?: number;
};

export type ScheduleEvent = {
 title: string;
 slug: string;
 start: string;
 end?: string | null;
 location?:
    | {
         _id?: string;
         name?: string;
         slug?: string;
         building?: string | null;
         room?: string | null;
        }
    | null;
 locationSlug?: string | null;
 daySlug: string;
};

export type WorkshopYearPage = {
 _id: string;
 year: number;
 slug: string;
 workshopDatesLabel?: string;
 overviewDatesLabel?: string;
 welcomeKicker?: string;
 welcomeHighlight?: string;
 welcomeBody?: string;
 welcomeCtaLabel?: string;
 welcomeCtaEnabled?: boolean;
 registrationFormUrl?: string;
 aboutVideoUrl?: string;
 aboutBody?: unknown;
 pageSections?: Array<
  | { _key?: string; _type: "welcomeSection"; enabled?: boolean }
  | { _key?: string; _type: "aboutSection"; enabled?: boolean }
  | { _key?: string; _type: "scheduleSection"; enabled?: boolean }
  | { _key?: string; _type: "coachesSection"; enabled?: boolean }
  | { _key?: string; _type: "sponsorsSection"; enabled?: boolean }
  | {
     _key?: string;
     _type: "registerSection";
     enabled?: boolean;
     title?: string;
     formUrl?: string;
     height?: number;
    }
  | {
     _key?: string;
     _type: "timelineSection";
     enabled?: boolean;
     mode?: "link" | "inline" | string;
     linkLabel?: string;
    }
  | {
     _key?: string;
     _type: "customSection";
     enabled?: boolean;
     title?: string;
     body?: unknown;
    }
 >;
 coaches?: Coach[];
 sponsors?: Sponsor[];
 scheduleDays?: ScheduleDay[];
 scheduleEvents?: ScheduleEvent[];
};

export type WorkItem = {
 _id: string;
 title: string;
 category?: string;
 teamName?: string;
 timelineDate?: string;
 description?: string;
 externalUrl?: string;
 client?: {
  name?: string;
  url?: string;
 };
 assets?: SanityImage[];
};
