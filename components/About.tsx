import { Fragment } from 'react';
import Frame from './Frame';
import Iframe from './Iframe';
import Paragraph from './Paragraph';


const About = () => {
    return  <Fragment>
        <Frame color="white">
    <Iframe aspectRatio="16x9" width={560} height={315} src="https://www.youtube.com/embed/mK1DDqoV9sM" title="YouTube video player" />
   <Paragraph marginBottom={2} color="blue">Pixels & Print is a design workshop for the students in the graphic design program at Syracuse University’s S.I. Newhouse School of Public Communications. It is a fully intensive workshop for the students who will work with industry professionals who come to help our students as art directors, leading the teams. The mission for this workshop is to have the design students see the power of design by designing for a deserving organization or business. This year the workshop is March 2–4, 2023.</Paragraph>

   {/*<Paragraph marginBottom={2} color="blue">This year the graphic design students will come together to design a piece of history. To become history. Students will come together in virtual and physical rooms to work towards one goal, designing a capsule of the projects they have created during the COVID pandemic. More specifically from March 11, 2020 (when the pandemic was declared)–May 14th, 2021 (the last day of class for the Spring semester) Their stories, experiences, and emotions have been the driving force to each project they have created over the 429 days. As photographers, videographers, and designers these visual communicators use their stories and the stories of those around them (6-feet apart and masked of course).</Paragraph>*/}

   <Paragraph marginBottom={2} color="blue">Over the course of the 48-hour workshop, approximately 40 students will design a logo and brand system, a website, promotional and social motion graphics, as well as printed book. To accomplish all of this, we divide students into teams, each with different design tasks to work on, and we pair them a design coach or two to help art direct and guide the team to completion.</Paragraph>

   <Paragraph color="blue">This is the eighth year for the Pixels & Print workshop created by the Visual Communications Department at the <a href="https://newhouse.syr.edu" target="_blank">Newhouse School</a>.</Paragraph>  
   </Frame>
</Fragment> 
};
export default About;