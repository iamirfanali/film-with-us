import React, { Component } from "react";
import ReactiveElements from "reactive-elements";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const IMAGES = [
	{ name: "1", url: "https://gradientjoy.com/200x200", numLoc: "2" },
	{ name: "2", url: "https://gradientjoy.com/200x200", numLoc: "20" },
	{ name: "3", url: "https://gradientjoy.com/200x200", numLoc: "30" },
	{ name: "1", url: "https://gradientjoy.com/200x200", numLoc: "2" },
	{ name: "2", url: "https://gradientjoy.com/200x200", numLoc: "20" },
	{ name: "3", url: "https://gradientjoy.com/200x200", numLoc: "30" },
	{ name: "1", url: "https://gradientjoy.com/200x200", numLoc: "2" },
	{ name: "2", url: "https://gradientjoy.com/200x200", numLoc: "20" },
	{ name: "3", url: "https://gradientjoy.com/200x200", numLoc: "30" },
	{ name: "1", url: "https://gradientjoy.com/200x200", numLoc: "2" },
	{ name: "2", url: "https://gradientjoy.com/200x200", numLoc: "20" },
	{ name: "1", url: "https://gradientjoy.com/200x200", numLoc: "2" },
	{ name: "2", url: "https://gradientjoy.com/200x200", numLoc: "20" },
	{ name: "3", url: "https://gradientjoy.com/200x200", numLoc: "30" },
	{ name: "1", url: "https://gradientjoy.com/200x200", numLoc: "2" },
	{ name: "2", url: "https://gradientjoy.com/200x200", numLoc: "20" },
	{ name: "3", url: "https://gradientjoy.com/200x200", numLoc: "30" },
	{ name: "1", url: "https://gradientjoy.com/200x200", numLoc: "2" },
	{ name: "2", url: "https://gradientjoy.com/200x200", numLoc: "20" },
	{ name: "3", url: "https://gradientjoy.com/200x200", numLoc: "30" },
	{ name: "1", url: "https://gradientjoy.com/200x200", numLoc: "2" },
	{ name: "2", url: "https://gradientjoy.com/200x200", numLoc: "20" }
];

const SLIDER_SETTINGS = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 5,
	slidesToScroll: 5,
	initialSlide: 0,
	responsive: [
		{
			breakpoint: 1266,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				dots: false
			}
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: false
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
};

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	renderSpinner() {
		return (
			<div className="col text-center">
				<div className="spinner-grow text-center" role="status">
					<span className="sr-only text-center">Loading...</span>
				</div>
			</div>
		);
	}

	renderResponsiveSlider() {
		return (
			<div className="container-fluid ms-loc-slider">
				<div className="row">
					<div className="col-12 px-5 py-3">
						<Slider {...SLIDER_SETTINGS}>
							{IMAGES.map((img, index) => (
								<div key={index}>
									<div className="card mb-4 shadow-sm">
										<img
											src={img.url}
											className="img-fluid img-rounded ms-slider-image"
											alt="Cinque Terre"
										/>
										<div className="card-body">
											<p className="card-text">
												Image Title.
												<span className="font-weight-bold float-right p0">
													{img.numLoc} Loc
												</span>
											</p>
										</div>
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		);
	}

	renderBrowseButton() {
		return (
			<div className="col-12 text-center">
				<button type="button" className="btn btn-primary my-2">
					Browse All
				</button>
			</div>
		);
	}

	render() {
		const { loading } = this.state;

		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 2000);

		return (
			<div className="ms-list-locations">
				<div className="container-fluid">
					<div className="row">
						{loading && this.renderSpinner()}

						{!loading && this.renderResponsiveSlider()}

						{!loading && this.renderBrowseButton()}
					</div>
				</div>
			</div>
		);
	}
}

ReactiveElements.registerReact("ms-list-locations", List);

export default List;
