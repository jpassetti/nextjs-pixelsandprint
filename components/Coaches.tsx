import { Fragment, useState, useEffect } from 'react'
import Filters from './Filters'
import Grid from './Grid'
import CoachCard from './CoachCard'

import { getCoaches, getCoachCategories } from '../lib/api'

const Coaches = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [posts, setPosts] = useState(getCoaches());
    const [filteredPosts, setFilteredPosts] = useState(posts);
    let coachCategories = [{name: "All", slug: "all"}, ...getCoachCategories()];
    useEffect(() => {
        if (activeCategoryIndex === 0) {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.role.toLowerCase() === coachCategories[activeCategoryIndex].slug));
        }
    }, [activeCategoryIndex]);

    return <Fragment>
    <Filters 
        items={coachCategories} 
        activeCategory={activeCategoryIndex}
        setActiveCategory={setActiveCategoryIndex}
        format="tabs"
    />
    <Grid>
        {filteredPosts.map((coach, index) => (
            <CoachCard key={index} coach={coach} />
        ))}
    </Grid>
</Fragment>
}
export default Coaches