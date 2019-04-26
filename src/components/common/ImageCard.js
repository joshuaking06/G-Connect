import React from 'react'

const ImageCard = ({ name, image }) => {
    // image_id
    const defualtImage = "https://www.union.edu/files/union-marketing-layer/201803/picture.jpg"
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by5">
                    <img src={image || defualtImage} alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content">

                <div className="content">
                    <h3 className="subtitle is-6">
                        {name}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default ImageCard
