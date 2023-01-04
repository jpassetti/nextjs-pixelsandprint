import { Fragment, useState, useEffect } from 'react'
import Filters from './Filters'
import Grid from './Grid'
import CoachCard from './CoachCard'

import { getCoaches, getCoachCategories } from '../lib/api'

const Coaches = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [posts, setPosts] = useState(getCoaches());
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        if (activeCategory === "all") {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.role.toLowerCase() === activeCategory));
        }
    }, [activeCategory]);

    return <Fragment>
    <Filters 
        items={getCoachCategories()} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        format="dropdown"
    />
    <Grid>
        {filteredPosts.map((coach, index) => (
            <CoachCard key={index} coach={coach} />
        ))}
    </Grid>
</Fragment>
}
export default Coaches