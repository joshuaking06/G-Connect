import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

import ImageCard from './ImageCard'

const Slider = ({ title, data }) => {
	const responsive = {
		0: {
			items: 1
		},
		767: {
			items: 2
		},
		1024: {
			items: 4
		}
	}
	const items = data.map((elem) => (
		//`/twitch/${user_name}/show`
		<Link
			to={(!!elem.id && `/games/${elem.id}`) || `/twitch/${elem.user_name}/show`}
			key={elem.id}
		>
			< div className="column" >
				{
					console.log(!!elem.id && `/games/${elem.id}`)
				}
				<ImageCard
					name={elem.name || elem.user_name}
					image={elem.cover || elem.thumbnail_url}
					viewers={elem.viewer_count || ' '}
				/>
			</div >
		</Link >
	))
	items.push(
		<div className="column has-button">
			<Link className="button  is-success" to="/">
				{' '}
				View More
			</Link>
		</div>
	)

	return (
		<section className="section">
			<div className="container is-set-to-zero container-full-screen">
				<h2 className="title is-4">{title}</h2>
				<div className="columns">
					<AliceCarousel
						items={items}
						responsive={responsive}
						// dotsDisabled={true}
						slideToIndex={4}
						infinite={false}
					/>
				</div>
			</div>
		</section>
	)
	// }
}

export default Slider
