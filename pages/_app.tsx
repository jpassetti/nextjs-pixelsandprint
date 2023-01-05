import '../sass/global.scss'
import { useEffect, useState } from 'react'
import useWindowDimensions from '../hooks/useWindowDimensions';

import { ResponsiveContext, SectionContext } from '../lib/context'

function MyApp( { Component, pageProps } ) {
	const { width } = useWindowDimensions();
	const [currentDevice, setCurrentDevice] = useState(null);
	const [activeSection, setActiveSection] = useState(null);

	const handleWindowResize = () => {
		//console.log(window.innerWidth);
		const size = window.innerWidth < 700 ? 'xs' 
			: (window.innerWidth >= 700 && window.innerWidth < 980) ? 'sm' 
			: (window.innerWidth >= 980 && window.innerWidth < 1140) ? 'md' 
			: window.innerWidth >= 1140 ? 'lg' 
			: null;
		setCurrentDevice(size);
	};

	useEffect(() => {
		window.addEventListener('load', handleWindowResize);
		window.addEventListener('resize', handleWindowResize);
		const size = width < 700 ? 'xs'
			: (width >= 700 && width < 980) ? 'sm'
			: (width >= 980 && width < 1140) ? 'md'
			: width >= 1140 ? 'lg'
			: false;
		setCurrentDevice(size);

		// Remove event listener on cleanup
		return () => {
			window.removeEventListener("load", handleWindowResize);
			window.removeEventListener("resize", handleWindowResize);
		}
	}, []);

	return <ResponsiveContext.Provider value={[currentDevice, setCurrentDevice]}>
		<SectionContext.Provider value={[activeSection, setActiveSection]}>
		<Component {...pageProps} />
		</SectionContext.Provider>
	</ResponsiveContext.Provider>
}

export default MyApp;