type Room = {
 name: string;
 slug: string;
 building?: string | null;
 room?: string | null;
};

const rooms: Room[] = [
 { name: "TBA", slug: "tba", building: null, room: null },
 { name: "Classroom", slug: "nh1-212", building: "Newhouse 1", room: "212" },
 { name: "Classroom and Zoom", slug: "nh1-212-zoom", building: "Newhouse 1", room: "212" },
 { name: "Lecture Hall", slug: "nh1-101", building: "Newhouse 1", room: "101" },
 { name: "Lecture Hall", slug: "nh1-102", building: "Newhouse 1", room: "102" },
 { name: "Lecture Halls", slug: "nh1-101-102", building: "Newhouse 1", room: "101/102" },
 { name: "Collaborative Media Lab", slug: "collaborative-media-lab", building: "Newhouse 3", room: "253" },
 { name: "Larry Kramer War Room", slug: "war-room", building: "Newhouse 3", room: "252" },
 { name: "Tirico Classroom", slug: "tirico-classroom", building: "Newhouse 3", room: "250" },
 { name: "Levine Conference Room", slug: "levine-conference-room", building: "Newhouse 3", room: "463" },
 { name: "I3 Center", slug: "i-3-center", building: "Newhouse 3", room: "432/434" },
 { name: "Legal Sea Foods Dining Room", slug: "legal-sea-foods", building: "Newhouse 3", room: "Food.com" },
 { name: "Halmi Screening Room", slug: "halmi-screening-room", building: "Newhouse 3", room: "141" },
 { name: "Halmi Screening Room", slug: "nh3-141", building: "Newhouse 3", room: "141" },
 { name: "Time Warner Conference Room", slug: "time-warner-conference-room", building: "Newhouse 3", room: "327" },
 { name: "Various rooms", slug: "nh3-rooms", building: "Newhouse 3", room: null },
 { name: "Lobby", slug: "nh3-lobby", building: "Newhouse 3", room: null },
 { name: "Lobby", slug: "nh1-lobby", building: "Newhouse 1", room: null },
];

export function getRoomBySlug(slug?: string | null) {
 if (!slug) return undefined;
 return rooms.find((room) => room.slug === slug);
}

function formatMinutes(minutes: number) {
 if (minutes === 0) return null;
 return minutes < 10 ? `0${minutes}` : `${minutes}`;
}

const EASTERN_TZ = "America/New_York";

function getEasternTimeParts(iso: string) {
 const date = new Date(iso);
 const parts = new Intl.DateTimeFormat("en-US", {
  timeZone: EASTERN_TZ,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
 }).formatToParts(date);

 const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
 const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
 const dayPeriod = (parts.find((p) => p.type === "dayPeriod")?.value ?? "").toLowerCase();
 const amPm = dayPeriod === "am" ? "a.m." : dayPeriod === "pm" ? "p.m." : "";

 return { hour, minute, amPm };
}

export function formatTimeRange(start: string, end?: string | null) {
 const startParts = getEasternTimeParts(start);
 const startHourFormatted = startParts.hour;
 const startMinuteFormatted = formatMinutes(startParts.minute);
 const startAmPm = startParts.amPm;

 let endDateTime: Date | undefined;
 let endHour: number | undefined;
 let endMinute: number | undefined;
 let endHourFormatted: number | undefined;
 let endMinuteFormatted: string | null | undefined;
 let endAmPm: string | undefined;

 if (end) {
    const endParts = getEasternTimeParts(end);
    endDateTime = new Date(end);
    endHour = endParts.hour;
    endMinute = endParts.minute;
    endHourFormatted = endHour;
    endMinuteFormatted = formatMinutes(endMinute);
    endAmPm = endParts.amPm;
 }

 if (end && startAmPm === endAmPm) {
  return `${startHourFormatted}${startMinuteFormatted ? `:${startMinuteFormatted}` : ""}-${endHourFormatted}${endMinuteFormatted ? `:${endMinuteFormatted}` : ""} ${endAmPm}`;
 }

 if (end) {
  return `${startHourFormatted}${startMinuteFormatted ? `:${startMinuteFormatted}` : ""} ${startAmPm}-${endHourFormatted}${endMinuteFormatted ? `:${endMinuteFormatted}` : ""} ${endAmPm}`;
 }

 return `${startHourFormatted}${startMinuteFormatted ? `:${startMinuteFormatted}` : ""} ${startAmPm}`;
}
