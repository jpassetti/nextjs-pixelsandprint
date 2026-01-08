export const yearPageQuery = /* groq */ `
*[_type == "workshopYear" && slug.current == $year][0]{
  _id,
  year,
  "slug": slug.current,
  workshopDatesLabel,
  overviewDatesLabel,
  welcomeKicker,
  welcomeHighlight,
  welcomeBody,
  welcomeCtaLabel,
  welcomeCtaEnabled,
  registrationFormUrl,
  aboutVideoUrl,
  aboutBody,

  pageSections[]{
    _key,
    _type,
    enabled,
    title,
    formUrl,
    height,
    mode,
    linkLabel,
    body
  },

  coaches[]-> {
    _id,
    nameFirst,
    nameLast,
    title,
    companyName,
    companyUrl,
    role,
    headshot{
      asset->{url, metadata{dimensions{width,height}}},
      alt
    }
  },

  sponsors[]-> {
    _id,
    name,
    url,
    logo{
      asset->{url, metadata{dimensions{width,height}}},
      alt
    }
  },

  scheduleDays[]{
    title,
    slug,
    start,
    end,
    order
  },

  scheduleEvents[]{
    title,
    slug,
    start,
    end,
    location->{_id, name, slug, building, room},
    locationSlug,
    daySlug
  }
}
`;

export const yearsListQuery = /* groq */ `
*[_type == "workshopYear"]|order(year desc){
  year,
  "slug": slug.current,
  workshopDatesLabel
}
`;

export const workTimelineQuery = /* groq */ `
*[_type == "workItem" && year->slug.current == $year]|order(timelineDate asc, orderRank asc){
  _id,
  title,
  category,
  teamName,
  timelineDate,
  description,
  externalUrl,
  client->{name, url},
  assets[]{
    asset->{url, metadata{dimensions{width,height}}},
    alt,
    caption
  }
}
`;
