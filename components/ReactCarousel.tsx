// packages
import { useContext } from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Dot } from 'pure-react-carousel'
import classNames from 'classnames/bind'

import Link from 'next/link'
import Image from 'next/image'


// custom components
import Button from './Button'
import Heading from './Heading'
import Paragraph from './Paragraph'

// context
import { ResponsiveContext } from '../lib/context'

// css
import carouselStyles from './purereactcarousel.module.scss'
import Icon from './Icon'
import CoachCard from './CoachCard'

let cx = classNames.bind(carouselStyles)

const ReactCarousel = ({children, totalSlides, colorMode="light"}) => {
	const [currentDevice] = useContext(ResponsiveContext);

	let sliderClasses = cx({
		[`carousel__slider`] : true,
		dark: colorMode === "dark",
		light: colorMode === "light"
	})
	let buttonBackClasses = cx({
		[`carousel__button`] : true,
		back: true,
		dark : colorMode === "dark",
		light : colorMode === "light",
		
	})
	let buttonNextClasses = cx({
		[`carousel__button`]: true,
		next: true,
		dark: colorMode === "dark",
		light: colorMode === "light"
	})
	let dotGroupClasses = cx({
		[`carousel__dotGroup`] : true,
		dark: colorMode === "dark",
		light: colorMode === "light"
	})
	
	return <CarouselProvider
		naturalSlideWidth={100}
		naturalSlideHeight={100}
		className={carouselStyles.carousel}
		totalSlides={totalSlides}
		visibleSlides={currentDevice === "xs" ? 1 : currentDevice === "sm" ? 1 : 3}
		dragEnabled={true}
		touchEnabled={true}
		isIntrinsicHeight={true}
		lockOnWindowScroll={true}
	>
		<ButtonBack
			className={buttonBackClasses}
		>
			<Icon
            icon="chevron-left"
            width={16}
            color="white"
			/>
		</ButtonBack>
		<ButtonNext
			className={buttonNextClasses}
		>
            <Icon
                icon="chevron-right"
                width={16}
                color="white"
            />
        </ButtonNext>
		<Slider
			className={sliderClasses}
			classNameTray={carouselStyles.carousel__sliderTray}
			classNameTrayWrap={carouselStyles.carousel__sliderTrayWrap}
			classNameAnimation={carouselStyles.carousel__animation}
		>
			{children}
		</Slider>
	
		{(currentDevice === "xs" || currentDevice === "sm") &&
		<DotGroup
			className={dotGroupClasses}
			showAsSelectedForCurrentSlideOnly
			disableActiveDots
		/>
		}

	</CarouselProvider>
}
const Item = ({ index, title, category = false, slug = false, excerpt = false, featuredImage = false, ctaPath=false, ctaLabel=false, ctaInline=false, colorMode }) => {
	let slideClasses = cx({
		[`carousel__slide`]: true,
		dark : colorMode === "dark",
		light : colorMode === "light"
	})

	return <Slide
		index={index}
		className={slideClasses}
		innerClassName={carouselStyles.carousel__innerSlide}
		classNameHidden={carouselStyles.hidden}
	>
		<CoachCard coach={null} />
	</Slide>
}
ReactCarousel.Item = Item;
export default ReactCarousel;