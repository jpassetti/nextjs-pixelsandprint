import About from '../components/About';
import Coaches from "../components/Coaches";
import Paragraph from '../components/Paragraph';
import Schedule from '../components/Schedule';
import Sponsors from "../components/Sponsors";

export function getItems() {
    const items = [
        {
            label: "About",
            slug: "about",
            path: `M40.7,20l24.9,66H49.5l-4.9-13.7H20.4L15.6,86H0l24.8-66H40.7z M24.9,59.6h15.2l-7.6-21.5L24.9,59.6z M102.9,86h-30V20H100
            c10.8,0,19.1,6.8,19.1,17.8c0,5.5-2.4,9.7-6.1,12.6c6.3,2.7,10.5,8.2,10.5,16.3C123.5,78.7,114.5,86,102.9,86z M97.6,45.2
            c4.4,0,6.6-2.2,6.6-6.3c0-4-2.2-6.2-6.6-6.2h-9.9v12.5H97.6z M100.4,57.8H87.7v15.5h12.7c5.5,0,8.2-2.7,8.2-7.7
            C108.6,60.6,105.9,57.8,100.4,57.8z M164.3,18.2c19.7,0,34.6,14.6,34.6,34.8S184,87.8,164.3,87.8c-19.6,0-34.5-14.6-34.5-34.8
            S144.7,18.2,164.3,18.2z M164.3,74.9c11.6,0,20.1-8.3,20.1-21.9s-8.5-21.9-20.1-21.9c-11.5,0-20,8.3-20,21.9S152.8,74.9,164.3,74.9z
             M266,60.4c0,17.6-11.5,27.4-29,27.4s-29-9.8-29-27.4V20h14.6v40.8c0,8.6,5.9,13.5,14.6,13.5s14.6-4.9,14.6-13.5V20H266V60.4z
             M291.5,86V32.7h-17.4V20h49.3v12.7h-17.3V86H291.5z`
        },
        {  
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
        },
        {
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
        },
        {
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
        }
    ];
    return items;
}
export function getCoaches() {
    const coaches = [
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "Motion",
                slug: "motion"
            }
        },
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "Motion",
                slug: "motion"
            }
        },
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "Print",
                slug: "print"
            }
        },
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "UI/UX",
                slug: "uiux"
            }
        },
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "UI/UX",
                slug: "uiux"
            }
        },
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "Motion",
                slug: "motion"
            }
        },
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "Motion",
                slug: "motion"
            }
        },
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "Print",
                slug: "print"
            }
        },
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "UI/UX",
                slug: "uiux"
            }
        },
        {
            name: "John Doe",
            title: "Art Director",
            company: {
                name: "Company Name",
                url: "https://www.google.com"
            },
            featuredImage: {
                node: {
                    sourceUrl: "/images/coaches/1.jpg",
                    altText: "John Doe",
                    mediaDetails: {
                        width: 300,
                        height: 300
                    }
                }
            },
            role: {
                name: "UI/UX",
                slug: "uiux"
            }
        },
    ];
    return coaches;
}
export function getCoachCategories() {
    const categories = [
        {
            name: "Motion",
            slug: "motion"
        },
        {
            name: "Print",
            slug: "print"
        },
        {
            name: "UI/UX",
            slug: "uiux"
        }
    ];
    return categories;
}
export function getSponsors() {
    const sponsors = [
        {
            name: "Company Name",
            url: "https://www.google.com",
            featuredImage: {
                node: {
                    sourceUrl: "https://via.placeholder.com/320.png",
                    altText: "Company Name",
                    mediaDetails: {
                        width: 320,
                        height: 320
                    }
                }
            }
        },
        {
            name: "Company Name",
            url: "https://www.google.com",
            featuredImage: {
                node: {
                    sourceUrl: "https://via.placeholder.com/320.png",
                    altText: "Company Name",
                    mediaDetails: {
                        width: 320,
                        height: 320
                    }
                }
            }
        },
        {
            name: "Company Name",
            url: "https://www.google.com",
            featuredImage: {
                node: {
                    sourceUrl: "https://via.placeholder.com/320.png",
                    altText: "Company Name",
                    mediaDetails: {
                        width: 320,
                        height: 320
                    }
                }
            }
        },
        {
            name: "Company Name",
            url: "https://www.google.com",
            featuredImage: {
                node: {
                    sourceUrl: "https://via.placeholder.com/320.png",
                    altText: "Company Name",
                    mediaDetails: {
                        width: 320,
                        height: 320
                    }
                }
            }
        },
        {
            name: "Company Name",
            url: "https://www.google.com",
            featuredImage: {
                node: {
                    sourceUrl: "https://via.placeholder.com/320.png",
                    altText: "Company Name",
                    mediaDetails: {
                        width: 320,
                        height: 320
                    }
                }
            }
        },
        {
            name: "Company Name",
            url: "https://www.google.com",
            featuredImage: {
                node: {
                    sourceUrl: "https://via.placeholder.com/320.png",
                    altText: "Company Name",
                    mediaDetails: {
                        width: 320,
                        height: 320
                    }
                }
            }
        },
        {
            name: "Company Name",
            url: "https://www.google.com",
            featuredImage: {
                node: {
                    sourceUrl: "https://via.placeholder.com/320.png",
                    altText: "Company Name",
                    mediaDetails: {
                        width: 320,
                        height: 320
                    }
                }
            }
        },
        {
            name: "Company Name",
            url: "https://www.google.com",
            featuredImage: {
                node: {
                    sourceUrl: "https://via.placeholder.com/320.png",
                    altText: "Company Name",
                    mediaDetails: {
                        width: 320,
                        height: 320
                    }
                }
            }
        },
        {
            name: "Company Name",
            url: "https://www.google.com",
            featuredImage: {
                node: {
                    sourceUrl: "https://via.placeholder.com/320.png",
                    altText: "Company Name",
                    mediaDetails: {
                        width: 320,
                        height: 320
                    }
                }
            }
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
                start: '2023-01-05T00:00-0500',
                end: '2023-01-05T23:59-0500'
            }
        },
        {
            name: "Friday",
            slug: "friday",
            time: {
                start: '2023-01-06T00:00-0500',
                end: '2023-01-06T23:59-0500'
            }
        },
        {
            name: "Saturday",
            slug: "saturday",
            time: {
                start: '2023-01-07T00:00-0500',
                end: '2023-01-07T23:59-0500'
            }
        },
    ];
    return days;
}
export function getEvents() {
    const events = [
        {
            title: "Coaches Kick-off Meeting",
            slug: "coaches-kick-off-meeting",
            time: {
                start: '2023-01-05T11:00-0500',
                end: '2023-01-05T12:00-0500'
            },
            location: {
                name: "Collaborative Media Lab",
                room: "253",
                building: "Newhouse 3"
            }

        },
        {
            title: "Coaches Kick-off Meeting",
            slug: "coaches-kick-off-meeting",
            time: {
                start: '2023-01-05T14:00-0500',
                end: '2023-01-05T15:00-0500'
            },
            location: {
                name: "Collaborative Media Lab",
                room: "253",
                building: "Newhouse 3"
            }

        },
        {
            title: "Motion Workshop",
            slug: "motion-workshop",
            time: {
                start: '2023-01-06T13:00-0500',
                end: '2023-01-06T14:00-0500'
            },
            location: {
                name: "Collaborative Media Lab",
                room: "253",
                building: "Newhouse 3"
            }

        },
        {
            title: "Coaches Kick-off Meeting",
            slug: "coaches-kick-off-meeting",
            time: {
                start: '2023-01-07T11:00-0500',
                end: '2023-01-07T12:00-0500'
            },
            location: {
                name: "Collaborative Media Lab",
                room: "253",
                building: "Newhouse 3"
            }

        },
        {
            title: "Branding Workshop",
            slug: "branding-workshop",
            time: {
                start: '2023-01-07T13:00-0500',
                end: '2023-01-07T14:00-0500'
            },
            location: {
                name: "Collaborative Media Lab",
                room: "253",
                building: "Newhouse 3"
            }

        }
    ];
    return events;
}
export function getSectionContent(slug) {
    return slug === "about" ? 
       <About />
    : slug === "schedule" ? 
        <Schedule />
    : slug === "coaches" ? 
        <Coaches />
    : slug === "sponsors" ? 
        <Sponsors />
    : <Paragraph marginBottom="2">No content</Paragraph>
}
