import { Fragment, useState, useEffect, useContext } from 'react'
import Filters from './Filters'
import Grid from './Grid'
import CoachCard from './CoachCard'
import ReactCarousel from './ReactCarousel';

import { getCoaches, getCoachCategories } from '../lib/api'
import { ResponsiveContext } from '../lib/context'

const Coaches = () => {
    const [currentDevice] = useContext(ResponsiveContext);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [posts, setPosts] = useState(getCoaches());
    const [filteredPosts, setFilteredPosts] = useState(posts);
    let coachCategories = [{name: "All", slug: "all"}, ...getCoachCategories()];

    useEffect(() => {
        if (activeCategoryIndex === 0) {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.role.slug === coachCategories[activeCategoryIndex].slug));
        }
    }, [activeCategoryIndex]);

    const alphabetizeNames = (a, b) => {
        if (a.name.last < b.name.last) {
            return -1;
        }
        if (a.name.last > b.name.last) {
            return 1;
        }
        return 0;
    }

    return <Fragment>
    <Filters 
        items={coachCategories} 
        activeCategory={activeCategoryIndex}
        setActiveCategory={setActiveCategoryIndex}
        format="tabs"
        filterBy="role"
    />
    {(currentDevice === 'xs' || currentDevice === 'sm') ? 
        <ReactCarousel totalSlides={filteredPosts.length} colorMode="light">
        {filteredPosts.map((coach, index) => {
            return <CoachCard key={index} coach={coach} />
        })}
    </ReactCarousel>
    :  
        <Grid>
            {filteredPosts.sort(alphabetizeNames).map((coach, index) => (
                <CoachCard key={index} coach={coach} />
            ))}
        </Grid>
    }
   
</Fragment>
}
export default Coaches