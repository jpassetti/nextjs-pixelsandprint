import { Fragment } from "react";

import About from "../components/About";
import Coaches from "../components/Coaches";
import Overview from "../components/Overview";
import Paragraph from "../components/Paragraph";
import Schedule from "../components/Schedule";
import Sponsors from "../components/Sponsors";

export function getSections() {
  const sections = [
    {
      title: "Overview",
      slug: "overview",
      id: "overview",
    },
    {
      title: "About",
      slug: "about",
      id: "about",
    },
    {
      title: "Schedule",
      slug: "schedule",
      id: "schedule",
    },
    {
      title: "Coaches",
      slug: "coaches",
      id: "coaches",
    },
    {
      title: "Sponsors",
      slug: "sponsors",
      id: "sponsors",
    },
  ];
  return sections;
}

export function getItems() {
  const items = [
    {
      label: "Overview",
      slug: "overview",
      path: `M34.5,17.8c19.7,0,34.6,14.6,34.6,34.8S54.2,87.4,34.5,87.4C14.9,87.4,0,72.8,0,52.6S14.9,17.8,34.5,17.8z M34.5,74.5
            c11.6,0,20.1-8.3,20.1-21.9s-8.5-21.9-20.1-21.9c-11.5,0-20,8.3-20,21.9S23,74.5,34.5,74.5z M93.2,85.6l-24.8-66h16.1l16.8,47.9
            l17.1-47.9H134l-24.9,66H93.2z M183.4,85.6h-44v-66h43.5v12.7H154v12.5h25.3v12.6H154v15.5h29.4V85.6z M207.4,85.6h-14.6v-66h27.9
            c12.7,0,22.6,8.1,22.6,21.2c0,9.7-5.5,16.7-13.5,19.7l19.3,25.1h-17.2L214.4,62h-7V85.6z M219,49.3c6,0,9.1-3.1,9.1-8.5
            c0-5.5-3.1-8.5-9.1-8.5h-11.6v17H219z M270.8,85.6l-24.8-66h16.1l16.8,47.9L296,19.6h15.6l-24.9,66H270.8z M317.2,85.6v-66h14.6v66
            H317.2z M387.3,85.6h-44v-66h43.5v12.7h-28.9v12.5h25.3v12.6h-25.3v15.5h29.4V85.6z M451.2,85.6l-10.9-30.1l-13.4,30.1H414l-22.5-66
            h15.7l14.9,47L434.3,39l-7-19.4H443l15.7,46.8l15-46.8H489l-23.5,66C465.5,85.6,451.2,85.6,451.2,85.6z`,
    },
    {
      label: "About",
      slug: "about",
      path: `M40.7,20l24.9,66H49.5l-4.9-13.7H20.4L15.6,86H0l24.8-66H40.7z M24.9,59.6h15.2l-7.6-21.5L24.9,59.6z M102.9,86h-30V20H100
            c10.8,0,19.1,6.8,19.1,17.8c0,5.5-2.4,9.7-6.1,12.6c6.3,2.7,10.5,8.2,10.5,16.3C123.5,78.7,114.5,86,102.9,86z M97.6,45.2
            c4.4,0,6.6-2.2,6.6-6.3c0-4-2.2-6.2-6.6-6.2h-9.9v12.5H97.6z M100.4,57.8H87.7v15.5h12.7c5.5,0,8.2-2.7,8.2-7.7
            C108.6,60.6,105.9,57.8,100.4,57.8z M164.3,18.2c19.7,0,34.6,14.6,34.6,34.8S184,87.8,164.3,87.8c-19.6,0-34.5-14.6-34.5-34.8
            S144.7,18.2,164.3,18.2z M164.3,74.9c11.6,0,20.1-8.3,20.1-21.9s-8.5-21.9-20.1-21.9c-11.5,0-20,8.3-20,21.9S152.8,74.9,164.3,74.9z
             M266,60.4c0,17.6-11.5,27.4-29,27.4s-29-9.8-29-27.4V20h14.6v40.8c0,8.6,5.9,13.5,14.6,13.5s14.6-4.9,14.6-13.5V20H266V60.4z
             M291.5,86V32.7h-17.4V20h49.3v12.7h-17.3V86H291.5z`,
    },
    /*{  
            label: "Schedule",
            slug: "schedule",
            path: `M41.8,35.8c-3-2.1-9.5-4.6-16.1-4.6c-6.9,0-10.7,2.3-10.7,6.1c0,4.1,2.7,5.7,11,7.5c12.3,2.6,21.6,6.8,21.6,21.1
            c0,12.7-8.9,21.9-26.4,21.9c-10,0-17.8-3.4-21.2-5.7l2.3-13.4c3.7,2.8,10.9,6.1,18.8,6.1c7.6,0,12-2.8,12-7.8
            c0-5.3-3.5-7.2-13.3-9.7C8.7,54.7,0.5,50.7,0.5,38.1c0-11.3,8.9-19.9,24.3-19.9c10.4,0,16.9,3.2,19.4,5.1L41.8,35.8z M104.8,37.2
            c-3.3-3.2-8.9-6.1-15.7-6.1C76.1,31.1,68,39.2,68,53s8.1,21.9,19.8,21.9c6.4,0,11.8-2.4,15.6-6l8,10.2c-6,5.5-14.4,8.7-23.6,8.7
            c-20.3,0-34.3-14.6-34.3-34.8s14-34.8,34.3-34.8c8.1,0,14.4,1.7,19.9,5.6L104.8,37.2z M160.6,86V57.8h-26.4V86h-14.6V20h14.6v25.2
            h26.4V20h14.6v66H160.6z M231,86h-44V20h43.5v12.7h-28.9v12.5h25.3v12.6h-25.3v15.5H231V86z M264.3,86h-23.5V20h23.5
            c19.9,0,36.7,11,36.7,33S284.2,86,264.3,86z M262.8,73.3c12.7,0,23.2-5,23.2-20.3s-10.5-20.3-23.2-20.3h-7.4v40.6H262.8z
             M367.1,60.4c0,17.6-11.5,27.4-29,27.4s-29-9.8-29-27.4V20h14.6v40.8c0,8.6,5.9,13.5,14.6,13.5s14.6-4.9,14.6-13.5V20h14.2
            L367.1,60.4L367.1,60.4z M393.3,20v53.3h24.9V86h-39.5V20H393.3z M470.5,86h-44V20H470v12.7h-28.9v12.5h25.3v12.6h-25.3v15.5h29.4
            V86z`
        },*/
    /* {
            label: "Coaches",
            slug: "coaches",
            path: `M51.3,37.2c-3.3-3.2-8.9-6.1-15.7-6.1c-13,0-21.1,8.1-21.1,21.9s8.1,21.9,19.8,21.9c6.4,0,11.8-2.4,15.6-6l8,10.2
            c-6,5.5-14.4,8.7-23.6,8.7C14,87.8,0,73.2,0,53s14-34.8,34.3-34.8c8.1,0,14.4,1.7,19.9,5.6L51.3,37.2z M95.1,18.2
            c19.7,0,34.6,14.6,34.6,34.8s-14.9,34.8-34.6,34.8c-19.6,0-34.5-14.6-34.5-34.8S75.5,18.2,95.1,18.2z M95.1,74.9
            c11.6,0,20.1-8.3,20.1-21.9s-8.5-21.9-20.1-21.9c-11.5,0-20,8.3-20,21.9S83.6,74.9,95.1,74.9z M173.2,20l24.9,66H182l-4.9-13.7
            h-24.2L148.1,86h-15.6l24.8-66H173.2z M157.4,59.6h15.2L165,38.1L157.4,59.6z M252.2,37.2c-3.3-3.2-8.9-6.1-15.7-6.1
            c-13,0-21.1,8.1-21.1,21.9s8.1,21.9,19.8,21.9c6.4,0,11.8-2.4,15.6-6l8,10.2c-6,5.5-14.4,8.7-23.6,8.7c-20.3,0-34.3-14.6-34.3-34.8
            s14-34.8,34.3-34.8c8.1,0,14.4,1.7,19.9,5.6L252.2,37.2z M308,86V57.8h-26.4V86H267V20h14.6v25.2H308V20h14.6v66H308z M378.4,86h-44
            V20h43.5v12.7H349v12.5h25.3v12.6H349v15.5h29.4V86z M427.2,35.8c-3-2.1-9.5-4.6-16.1-4.6c-6.9,0-10.7,2.3-10.7,6.1
            c0,4.1,2.7,5.7,11,7.5c12.3,2.6,21.6,6.8,21.6,21.1c0,12.7-8.9,21.9-26.4,21.9c-10,0-17.8-3.4-21.2-5.7l2.3-13.4
            c3.7,2.8,10.9,6.1,18.8,6.1c7.6,0,12-2.8,12-7.8c0-5.3-3.5-7.2-13.3-9.7c-11.1-2.6-19.3-6.6-19.3-19.2c0-11.3,8.9-19.9,24.3-19.9
            c10.4,0,16.9,3.2,19.4,5.1L427.2,35.8z`
        },*/
    /*{
            label: "Sponsors",
            slug: "sponsors",
            path: `M41.8,35.8c-3-2.1-9.5-4.6-16.1-4.6c-6.9,0-10.7,2.3-10.7,6.1c0,4.1,2.7,5.7,11,7.5c12.3,2.6,21.6,6.8,21.6,21.1
            c0,12.7-8.9,21.9-26.4,21.9c-10,0-17.8-3.4-21.2-5.7l2.3-13.4c3.7,2.8,10.9,6.1,18.8,6.1c7.6,0,12-2.8,12-7.8
            c0-5.3-3.5-7.2-13.3-9.7C8.7,54.7,0.5,50.7,0.5,38.1c0-11.3,8.9-19.9,24.3-19.9c10.4,0,16.9,3.2,19.4,5.1L41.8,35.8z M70.59,86
            h-14.6V20h27.4c13,0,23.1,8.2,23.1,21.6s-10.1,21.6-23.1,21.6h-12.8V86L70.59,86z M81.69,50.6c6.4,0,9.6-3.2,9.6-9
            c0-5.7-3.2-8.9-9.6-8.9h-11.1v17.9H81.69z M145.59,18.2c19.7,0,34.6,14.6,34.6,34.8s-14.9,34.8-34.6,34.8
            c-19.6,0-34.5-14.6-34.5-34.8S125.99,18.2,145.59,18.2z M145.59,74.9c11.6,0,20.1-8.3,20.1-21.9s-8.5-21.9-20.1-21.9
            c-11.5,0-20,8.3-20,21.9S134.09,74.9,145.59,74.9z M232.69,60.8V20h14.4v66h-12.3l-30.9-40.8V86h-14.4V20h12.3L232.69,60.8z
             M297.89,35.8c-3-2.1-9.5-4.6-16.1-4.6c-6.9,0-10.7,2.3-10.7,6.1c0,4.1,2.7,5.7,11,7.5c12.3,2.6,21.6,6.8,21.6,21.1
            c0,12.7-8.9,21.9-26.4,21.9c-10,0-17.8-3.4-21.2-5.7l2.3-13.4c3.7,2.8,10.9,6.1,18.8,6.1c7.6,0,12-2.8,12-7.8
            c0-5.3-3.5-7.2-13.3-9.7c-11.1-2.6-19.3-6.6-19.3-19.2c0-11.3,8.9-19.9,24.3-19.9c10.4,0,16.9,3.2,19.4,5.1L297.89,35.8z
             M344.09,18.2c19.7,0,34.6,14.6,34.6,34.8s-14.9,34.8-34.6,34.8c-19.6,0-34.5-14.6-34.5-34.8S324.49,18.2,344.09,18.2z M344.09,74.9
            c11.6,0,20.1-8.3,20.1-21.9s-8.5-21.9-20.1-21.9c-11.5,0-20,8.3-20,21.9S332.59,74.9,344.09,74.9z M402.59,86h-14.6V20h27.9
            c12.7,0,22.6,8.1,22.6,21.2c0,9.7-5.5,16.7-13.5,19.7l19.3,25.1h-17.2l-17.5-23.6h-7L402.59,86L402.59,86z M414.19,49.7
            c6,0,9.1-3.1,9.1-8.5c0-5.5-3.1-8.5-9.1-8.5h-11.6v17H414.19z M490.19,35.8c-3-2.1-9.5-4.6-16.1-4.6c-6.9,0-10.7,2.3-10.7,6.1
            c0,4.1,2.7,5.7,11,7.5c12.3,2.6,21.6,6.8,21.6,21.1c0,12.7-8.9,21.9-26.4,21.9c-10,0-17.8-3.4-21.2-5.7l2.3-13.4
            c3.7,2.8,10.9,6.1,18.8,6.1c7.6,0,12-2.8,12-7.8c0-5.3-3.5-7.2-13.3-9.7c-11.1-2.6-19.3-6.6-19.3-19.2c0-11.3,8.9-19.9,24.3-19.9
            c10.4,0,16.9,3.2,19.4,5.1L490.19,35.8z`
        }*/
  ];
  return items;
}
export function getCoaches() {
  const coaches = [
    {
      name: {
        first: "Naotaka",
        last: "Minami",
      },
      title: "Creative",
      company: {
        name: "Parliament",
        url: "https://www.linkedin.com/in/naotaka-minami-08432488",
      },
      year: 2023,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/naotaka-minami.jpg",
          altText: "Naotaka Minami",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "Motion",
        slug: "motion",
      },
    },
    {
      name: {
        first: "Kevin",
        last: "Camelo",
      },
      title: "Visual Designer",
      company: {
        name: "IBM",
        url: "https://www.kevmelo.com",
      },
      year: 2023,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/kevin-camelo.jpg",
          altText: "Kevin Camelo",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "UI/UX",
        slug: "uiux",
      },
    },
    {
      name: {
        first: "Jody",
        last: "Sugrue",
      },
      title: "Creative Leader",
      company: {
        name: "Website",
        url: "https://www.therealjodysugrue.com",
      },
      year: 2023,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/jody-sugrue.jpg",
          altText: "Jody Sugrue",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "Motion",
        slug: "motion",
      },
    },
    {
      name: {
        first: "Sarah",
        last: "Alread",
      },
      title: "Digital Product Director",
      company: {
        name: "Gartner",
        url: "https://www.linkedin.com/in/sarah-alread-717956129",
      },
      year: 2023,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/sarah-alread.jpg",
          altText: "Sarah Alread",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "UI/UX",
        slug: "uiux",
      },
    },
    {
      name: {
        first: "Seth",
        last: "Gitner",
      },
      title: "Associate Professor",
      company: {
        name: "Newhouse School",
        url: "https://newhouse.syr.edu/people/seth-gitner",
      },
      year: 2023,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/seth-gitner.jpg",
          altText: "Seth Gitner",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "UI/UX",
        slug: "uiux",
      },
    },
    {
      name: {
        first: "Jared",
        last: "Novack",
      },
      title: "Co-Founder",
      company: {
        name: "Upstatement",
        url: "https://upstatement.com/",
      },
      year: 2024,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/jared-novack.jpg",
          altText: "Jared Novack",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "UI/UX",
        slug: "uiux",
      },
    },
      {
        name: {
          first: "Emily",
          last: "Slack",
        },
        title: "Senior User Experience Designer",
        company: {
          name: "Rev",
          url: "https://www.linkedin.com/in/emily-slack",
        },
        year: 2024,
        featuredImage: {
          node: {
            sourceUrl: "/images/coaches/emily-slack.jpg",
            altText: "Emily Slack",
            mediaDetails: {
              width: 300,
              height: 300,
            },
          },
        },
      role: {
        name: "UI/UX",
        slug: "uiux",
      },
    },
    {
      name: {
        first: "G",
        last: "Williams",
      },
      title: "CEO, Founder",
      company: {
        name: "Grova Creative",
        url: "https://grova.com/",
      },
      year: 2024,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/g-williams.jpg",
          altText: "G Williams",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "Print",
        slug: "print",
      },
    },
    {
      name: {
        first: "Scott",
        last: "McNany",
      },
      title: "Creative Director",
      company: {
        name: "Pinckney Hugo Group",
        url: "https://www.linkedin.com/in/scott-mcnany-a4a0335/",
      },
      year: 2024,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/scott-mcnany.jpg",
          altText: "Scott McNany",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "Print",
        slug: "print",
      },
    },
    {
      name: {
        first: "Drew",
        last: "Jordan",
      },
      title: "Motion Design, Graphics, and Creative Visuals Specialist",
      company: {
        name: "The New York Times",
        url: "https://www.nytimes.com/by/drew-jordan",
      },
      year: 2024,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/drew-jordan.jpg",
          altText: "Drew Jordan",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "Motion",
        slug: "motion",
      },
    },
    {
      name: {
        first: "Conner",
        last: "Lee",
      },
      title: "Motion Graphics Designer",
      company: {
        name: "Blue Chalk Media",
        url: "https://bluechalk.com/",
      },
      year: 2024,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/conner-lee.jpg",
          altText: "Conner Lee",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "Motion",
        slug: "motion",
      },
    },
    {
      name: {
        first: "Amanda",
        last: "McCoy Bast",
      },
      title: "3D & Immersive Product Designer",
      company: {
        name: "Adobe",
        url: "https://www.linkedin.com/in/mccoybast",
      },
      year: 2024,
      featuredImage: {
        node: {
          sourceUrl: "/images/coaches/amanda-mccoy-bast.jpg",
          altText: "Amanda McCoy Bast",
          mediaDetails: {
            width: 300,
            height: 300,
          },
        },
      },
      role: {
        name: "Immersive",
        slug: "immersive",
      },
    },
  ];
  return coaches;
}
export function getCoachesByYear(year) {
  const yearFormatted = parseInt(year);
  const coaches = getCoaches();
  return coaches.filter(coach => coach.year === yearFormatted);  
}
export function getCoachCategories() {
  const categories = [
    {
      name: "Motion",
      slug: "motion",
    },
    {
      name: "Print",
      slug: "print",
    },
    {
      name: "UI/UX",
      slug: "uiux",
    },
  ];
  return categories;
}
export function getSponsors() {
  const sponsors = [
    {
      name: "Grova Creative",
      url: "https://grova.com",
      featuredImage: {
        node: {
          sourceUrl:
            "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/Grova_logo_full_Color-01.svg",
          altText: "Grova Creative",
          mediaDetails: {
            width: 210,
            height: 150,
          },
        },
      },
    },
    {
      name: "Insomnia Cookies",
      url: "https://insomniacookies.com/",
      featuredImage: {
        node: {
          sourceUrl:
            "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/insominacookies.png",
          altText: "Insomnia Cookies",
          mediaDetails: {
            width: 200,
            height: 200,
          },
        },
      },
    },
    {
      name: "Moo, Inc.",
      url: "https://www.moo.com/us/",
      featuredImage: {
        node: {
          sourceUrl:
            "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/moo-inc-logo-vector.svg",
          altText: "Moo, Inc.",
          mediaDetails: {
            width: 300,
            height: 99,
          },
        },
      },
    },
    {
      name: "Sticker Mule",
      url: "https://www.stickermule.com",
      featuredImage: {
        node: {
          sourceUrl:
            "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/sticker-mule-logo-light-bg.svg",
          altText: "Sticker Mule",
          mediaDetails: {
            width: 300,
            height: 41,
          },
        },
      },
    },
    {
      name: "Tiny Fish Printing",
      url: "https://www.tinyfishprinting.com/",
      featuredImage: {
        node: {
          sourceUrl:
            "https://api.pixelsandprint.newhouse.syr.edu/wp-content/uploads/2024/02/tiny-fish-logo.svg",
          altText: "Company Name",
          mediaDetails: {
            width: 200,
            height: 200,
          },
        },
      },
    },
  ];
  return sponsors;
}
export function getDays() {
  const days = [
    {
      name: "Thursday",
      slug: "thursday",
      time: {
        start: "2023-03-02T00:00-0500",
        end: "2023-03-02T23:59:59-0500",
      },
    },
    {
      name: "Friday",
      slug: "friday",
      time: {
        start: "2023-03-03T00:00-0500",
        end: "2023-03-03T23:59:59-0500",
      },
    },
    {
      name: "Saturday",
      slug: "saturday",
      time: {
        start: "2023-03-04T00:00-0500",
        end: "2023-03-04T23:59:59-0500",
      },
    },

    {
      name: "Thursday",
      slug: "thursday",
      time: {
        start: "2024-02-22T00:00-0500",
        end: "2024-02-22T23:59:59-0500",
      },
    },
    {
      name: "Friday",
      slug: "friday",
      time: {
        start: "2024-02-23T00:00-0500",
        end: "2024-02-23T23:59:59-0500",
      },
    },
    {
      name: "Saturday",
      slug: "saturday",
      time: {
        start: "2024-02-24T00:00-0500",
        end: "2024-02-24T23:59:59-0500",
      },
    },
  ];
  return days;
}
export function getDaysByYear(year) {
  const yearFormatted = parseInt(year);
  const days = getDays();
  return days.filter(day => day.time.start.includes(yearFormatted));
}
export function getRoomBySlug(slug) {
  const rooms = [
    {
      name: "Collaborative Media Lab",
      slug: "collaborative-media-lab",
      building: "Newhouse 3",
      room: "253",
    },
    {
      name: "Larry Kramer War Room",
      slug: "war-room",
      building: "Newhouse 3",
      room: "252",
    },
    {
      name: "Tirico Classroom",
      slug: "tirico-classroom",
      building: "Newhouse 3",
      room: "250",
    },
    {
      name: "Levine Conference Room",
      slug: "levine-conference-room",
      building: "Newhouse 3",
      room: "463",
    },
    {
      name: "I3 Center",
      slug: "i-3-center",
      building: "Newhouse 3",
      room: "432/434",
    },
    {
      name: "Legal Sea Foods",
      slug: "legal-sea-foods",
      building: "Newhouse 3",
      room: "Food.com",
    },
    {
      name: "Halmi Screening Room",
      slug: "halmi-screening-room",
      building: "Newhouse 3",
      room: "141",
    },
    {
      name: "Time Warner Conference Room",
      slug: "time-warner-conference-room",
      building: "Newhouse 3",
      room: "327",
    },
    {
      name: "Various rooms",
      slug: "nh3-rooms",
      building: "Newhouse 3",
      room: null,
    },
    {
      name: "Lobby",
      slug: "nh3-lobby",
      building: "Newhouse 3",
      room: null,
    },
  ];
  return rooms.find((room) => room.slug === slug);
}
export function getEvents() {
  const events = [
    {
      title: "Coaches Kick-off Meeting",
      slug: "coaches-kick-off-meeting",
      time: {
        start: "2023-03-02T16:00-0500",
        end: "2023-03-02T17:00-0500",
      },
      location: "levine-conference-room",
    },
    {
      title: "Coaches dinner",
      slug: "coaches-dinner",
      time: {
        start: "2023-03-02T17:00-0500",
        end: "2023-03-02T18:30-0500",
      },
      location: "levine-conference-room",
    },
    {
      title: "Workshop Kick-off",
      slug: "workshop-kick-off",
      time: {
        start: "2023-03-02T18:45-0500",
        end: "2023-03-02T19:00-0500",
      },
      location: "i-3-center",
    },
    {
      title: "Client intro + Coaches intro",
      slug: "client-coaches-intro",
      time: {
        start: "2023-03-02T19:00-0500",
        end: "2023-03-02T20:00-0500",
      },
      location: "i-3-center",
    },
    {
      title: "Team Brainstorming",
      slug: "team-brainstorming",
      time: {
        start: "2023-03-02T20:00-0500",
        end: null,
      },
      location: "i-3-center",
    },
    {
      title: "Coaches meeting",
      slug: "coaches-meeting",
      time: {
        start: "2023-03-03T09:30-0500",
        end: "2023-03-03T10:00-0500",
      },
      location: "war-room",
    },
    {
      title: "Group Meeting",
      slug: "group-meeting",
      time: {
        start: "2023-03-03T10:00-0500",
        end: "2023-03-03T10:30-0500",
      },
      location: "tirico-classroom",
    },
    {
      title: "Client presentation and critique",
      slug: "client-presentation-and-critique",
      time: {
        start: "2023-03-03T10:30-0500",
        end: "2023-03-03T11:00-0500",
      },
      location: "tirico-classroom",
    },
    {
      title: "Team meetings / work time",
      slug: "team-meetings-work-time",
      time: {
        start: "2023-03-03T11:00-0500",
        end: "2023-03-03T12:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Lunch",
      slug: "lunch",
      time: {
        start: "2023-03-03T12:00-0500",
        end: "2023-03-03T13:00-0500",
      },
      location: "legal-sea-foods",
    },
    {
      title: "Work time",
      slug: "work-time",
      time: {
        start: "2023-03-03T13:00-0500",
        end: "2023-03-03T17:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Team meetings",
      slug: "team-meetings-work-time",
      time: {
        start: "2023-03-03T17:00-0500",
        end: "2023-03-03T18:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Dinner",
      slug: "dinner",
      time: {
        start: "2023-03-03T17:00-0500",
        end: "2023-03-03T18:00-0500",
      },
      location: "legal-sea-foods",
    },
    {
      title: "Group presentation and critique",
      slug: "group-presentation-and-critique",
      time: {
        start: "2023-03-03T19:00-0500",
        end: "2023-03-03T20:00-0500",
      },
      location: "tirico-classroom",
    },
    {
      title: "Team meetings and homework assignments",
      slug: "team-meetings-and-homework-assignments",
      time: {
        start: "2023-03-03T20:30-0500",
        end: "2023-03-03T21:30-0500",
      },
      location: "tirico-classroom",
    },
    {
      title: "Work with your teams",
      slug: "work-with-your-teams",
      time: {
        start: "2023-03-03T21:30-0500",
        end: null,
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Coaches meeting",
      slug: "coaches-meeting",
      time: {
        start: "2023-03-04T09:30-0500",
        end: "2023-03-04T10:00-0500",
      },
      location: "war-room",
    },
    {
      title: "Full group meeting",
      slug: "full-group-meeting",
      time: {
        start: "2023-03-04T10:00-0500",
        end: "2023-03-04T10:30-0500",
      },
      location: "tirico-classroom",
    },
    {
      title: "Team meetings / work time",
      slug: "team-meetings-work-time",
      time: {
        start: "2023-03-04T10:30-0500",
        end: "2023-03-04T12:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Lunch",
      slug: "lunch",
      time: {
        start: "2023-03-04T12:00-0500",
        end: "2023-03-04T13:00-0500",
      },
      location: "legal-sea-foods",
    },
    {
      title: "Work with your teams",
      slug: "work-with-your-teams",
      time: {
        start: "2023-03-04T13:00-0500",
        end: "2023-03-04T18:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Deadline",
      slug: "deadline",
      time: {
        start: "2023-03-04T18:00-0500",
        end: null,
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Dinner",
      slug: "dinner",
      time: {
        start: "2023-03-04T17:00-0500",
        end: "2023-03-04T18:00-0500",
      },
      location: "legal-sea-foods",
    },
    {
      title: "Final presentation",
      slug: "final-presentation",
      time: {
        start: "2023-03-04T19:00-0500",
        end: "2023-03-04T20:00-0500",
      },
      location: "halmi-screening-room",
    },
    {
      title: "Dessert and workshop close",
      slug: "dessert-and-workshop-close",
      time: {
        start: "2023-03-04T20:00-0500",
        end: "2023-03-04T20:30-0500",
      },
      location: "legal-sea-foods",
    },


    {
      title: "Coaches Kick-off Meeting",
      slug: "coaches-kick-off-meeting",
      time: {
        start: "2024-02-22T16:00-0500",
        end: "2024-02-22T17:00-0500",
      },
      location: "time-warner-conference-room",
    },
    {
      title: "Coaches dinner",
      slug: "coaches-dinner",
      time: {
        start: "2024-02-22T17:00-0500",
        end: "2024-02-22T18:30-0500",
      },
      location: "time-warner-conference-room",
    },
    {
      title: "Workshop Kick-off",
      slug: "workshop-kick-off",
      time: {
        start: "2024-02-22T18:45-0500",
        end: "2024-02-22T19:00-0500",
      },
      location: "halmi-screening-room",
    },
    {
      title: "Client intro + Coaches intro",
      slug: "client-coaches-intro",
      time: {
        start: "2024-02-22T19:00-0500",
        end: "2024-02-22T20:00-0500",
      },
      location: "halmi-screening-room",
    },
    {
      title: "Team Brainstorming",
      slug: "team-brainstorming",
      time: {
        start: "2024-02-22T20:00-0500",
        end: null,
      },
      location: "nh3-rooms",
    },
    {
      title: "Coaches meeting",
      slug: "coaches-meeting",
      time: {
        start: "2024-02-23T09:30-0500",
        end: "2024-02-23T10:00-0500",
      },
      location: "war-room",
    },
    {
      title: "Group Meeting",
      slug: "group-meeting",
      time: {
        start: "2024-02-23T10:00-0500",
        end: "2024-02-23T10:30-0500",
      },
      location: "tirico-classroom",
    },
    {
      title: "Client presentation and critique",
      slug: "client-presentation-and-critique",
      time: {
        start: "2024-02-23T10:30-0500",
        end: "2024-02-23T11:00-0500",
      },
      location: "tirico-classroom",
    },
    {
      title: "Group photo",
      slug: "group-photo",
      time: {
        start: "2024-02-23T11:00-0500",
        end: "2024-02-23T11:15-0500",
      },
      location: "nh3-lobby",
    },
    {
      title: "Team meetings / work time",
      slug: "team-meetings-work-time",
      time: {
        start: "2024-02-23T11:15-0500",
        end: "2024-02-23T12:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Lunch",
      slug: "lunch",
      time: {
        start: "2024-02-23T12:00-0500",
        end: "2024-02-23T13:00-0500",
      },
      location: "legal-sea-foods",
    },
    {
      title: "Work time",
      slug: "work-time",
      time: {
        start: "2024-02-23T13:00-0500",
        end: "2024-02-23T17:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Team meetings",
      slug: "team-meetings-work-time",
      time: {
        start: "2024-02-23T17:00-0500",
        end: "2024-02-23T18:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Dinner",
      slug: "dinner",
      time: {
        start: "2024-02-23T18:00-0500",
        end: "2024-02-23T19:00-0500",
      },
      location: "legal-sea-foods",
    },
    {
      title: "Group presentation and critique",
      slug: "group-presentation-and-critique",
      time: {
        start: "2024-02-23T19:00-0500",
        end: "2024-02-23T20:00-0500",
      },
      location: "tirico-classroom",
    },
    {
      title: "Team meetings and homework assignments",
      slug: "team-meetings-and-homework-assignments",
      time: {
        start: "2024-02-23T20:30-0500",
        end: "2024-02-23T21:30-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Work with your teams",
      slug: "work-with-your-teams",
      time: {
        start: "2024-02-23T21:30-0500",
        end: null,
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Coaches meeting",
      slug: "coaches-meeting",
      time: {
        start: "2024-02-24T09:30-0500",
        end: "2024-02-24T10:00-0500",
      },
      location: "war-room",
    },
    {
      title: "Full group meeting",
      slug: "full-group-meeting",
      time: {
        start: "2024-02-24T10:00-0500",
        end: "2024-02-24T10:30-0500",
      },
      location: "tirico-classroom",
    },
    {
      title: "Team meetings / work time",
      slug: "team-meetings-work-time",
      time: {
        start: "2024-02-24T10:30-0500",
        end: "2024-02-24T12:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Lunch",
      slug: "lunch",
      time: {
        start: "2024-02-24T12:00-0500",
        end: "2024-02-24T13:00-0500",
      },
      location: "legal-sea-foods",
    },
    {
      title: "Work with your teams",
      slug: "work-with-your-teams",
      time: {
        start: "2024-02-24T13:00-0500",
        end: "2024-02-24T18:00-0500",
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Deadline",
      slug: "deadline",
      time: {
        start: "2024-02-24T18:00-0500",
        end: null,
      },
      location: "collaborative-media-lab",
    },
    {
      title: "Dinner",
      slug: "dinner",
      time: {
        start: "2024-02-24T18:00-0500",
        end: "2024-02-24T19:00-0500",
      },
      location: "legal-sea-foods",
    },
    {
      title: "Final presentation",
      slug: "final-presentation",
      time: {
        start: "2024-02-24T19:00-0500",
        end: "2024-02-24T20:00-0500",
      },
      location: "halmi-screening-room",
    },
    {
      title: "Dessert and workshop close",
      slug: "dessert-and-workshop-close",
      time: {
        start: "2024-02-24T20:00-0500",
        end: "2024-02-24T20:30-0500",
      },
      location: "legal-sea-foods",
    },
  ];
  return events;
}
export function getEventsByDay(start, end) {
  console.log(start, end);
  const events = getEvents();
  return events.filter((event) => event.time.start >= start && event.time.start <= end);
}


export function getSectionContent(slug) {
  return slug === "overview" ? (
    <Overview />
  ) : slug === "about" ? (
    <About />
  ) : slug === "schedule" ? (
    <Schedule />
  ) : slug === "coaches" ? (
    <Coaches />
  ) : slug === "sponsors" ? (
    <Sponsors />
  ) : (
    <Paragraph marginBottom="2">No content</Paragraph>
  );
}
export function getFormattedTime(start, end) {
  const formatMinutes = (minutes) =>
    minutes === 0 ? null : minutes < 10 ? `0${minutes}` : minutes;

  let startDateTime = new Date(start);
  let startHour = startDateTime.getHours();
  let startMinute = startDateTime.getMinutes();
  let startHourFormatted = startHour > 12 ? startHour - 12 : startHour;
  //let startMinuteFormatted = startMinute < 10 ? `0${startMinute}` : startMinute;
  let startMinuteFormatted = formatMinutes(startMinute);
  let startAmPm = startHour >= 12 ? "p.m." : "a.m.";

  let endDateTime,
    endHour,
    endMinute,
    endHourFormatted,
    endMinuteFormatted,
    endAmPm;
  if (end) {
    endDateTime = new Date(end);
    endHour = endDateTime.getHours();
    endMinute = endDateTime.getMinutes();
    endHourFormatted = endHour > 12 ? endHour - 12 : endHour;
    //endMinuteFormatted = endMinute < 10 ? `0${endMinute}` : endMinute;
    endMinuteFormatted = formatMinutes(endMinute);
    endAmPm = endHour >= 12 ? "p.m." : "a.m.";
  }

  if (startAmPm === endAmPm) {
    if (end) {
      return `${startHourFormatted}${
        startMinuteFormatted ? `:${startMinuteFormatted}` : ""
      }-${endHourFormatted}${
        endMinuteFormatted ? `:${endMinuteFormatted}` : ""
      } ${endAmPm}`;
    } else {
      return `${startHourFormatted}${
        startMinuteFormatted ? `:${startMinuteFormatted}` : ""
      }`;
    }
  } else {
    if (end) {
      return `${startHourFormatted}${
        startMinuteFormatted ? `:${startMinuteFormatted}` : ""
      } ${startAmPm}-${endHourFormatted}${
        endMinuteFormatted ? `:${endMinuteFormatted}` : ""
      } ${endAmPm}`;
    } else {
      return `${startHourFormatted}${
        startMinuteFormatted ? `:${startMinuteFormatted}` : ""
      } ${startAmPm}`;
    }
  }
}
