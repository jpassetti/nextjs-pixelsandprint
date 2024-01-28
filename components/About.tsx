import { Fragment } from 'react';
import Frame from './Frame';
import Iframe from './Iframe';
import Paragraph from './Paragraph';


const About = () => {
    return  <Fragment>
        <Frame color="white">
            {/*<iframe src="https://player.vimeo.com/video/891992135?h=2882ad0be1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
<p><a href="https://vimeo.com/891992135">Pixels &amp; Print 2023 Event Recap</a> from <a href="https://vimeo.com/newhousevis">Visual Communications - SU</a> on <a href="https://vimeo.com">Vimeo</a>.</p>*/}
    <Iframe aspectRatio="16x9" width={640} height={360} src="https://player.vimeo.com/video/891992135?h=2882ad0be1" title="YouTube video player" platform="vimeo" />
   <Paragraph marginBottom={2} color="blue">Pixels & Print is a design workshop for the students in the graphic design program at <a href="https://www.syracuse.edu" target="_blank">Syracuse University’s</a> <a href="https://newhouse.syracuse.edu" target="_blank">S.I. Newhouse School of Public Communications</a>. It is a fully intensive workshop for the students who will work with industry professionals who come to help our students as art directors, leading the teams. The mission for this workshop is to have the design students see the power of design by designing for a deserving organization or business. This year the workshop is February 22-24, 2024.</Paragraph>

   {/*<Paragraph marginBottom={2} color="blue">This year the graphic design students will come together to design a piece of history. To become history. Students will come together in virtual and physical rooms to work towards one goal, designing a capsule of the projects they have created during the COVID pandemic. More specifically from March 11, 2020 (when the pandemic was declared)–May 14th, 2021 (the last day of class for the Spring semester) Their stories, experiences, and emotions have been the driving force to each project they have created over the 429 days. As photographers, videographers, and designers these visual communicators use their stories and the stories of those around them (6-feet apart and masked of course).</Paragraph>*/}

   <Paragraph marginBottom={2} color="blue">Over the course of the 48-hour workshop, approximately 40 students will design a logo and brand system, a website, promotional and social motion graphics, as well as printed book. To accomplish all of this, we divide students into teams, each with different design tasks to work on, and we pair them a design coach or two to help art direct and guide the team to completion.</Paragraph>

   <Paragraph color="blue">This is the 10th year for the Pixels & Print workshop created by the Visual Communications Department at the <a href="https://newhouse.syracuse.edu" target="_blank">Newhouse School</a>.</Paragraph>  
   </Frame>
</Fragment> 
};
export default About;