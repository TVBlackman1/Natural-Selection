import imageBackground from './images/background.jpg'
import imageBacteriaGreen from './images/bacter1.png'
import imageBacteriaRed from './images/bacter1.png'
import imageFood from './images/food.png'

let count = 0

/**
 *
 * @param {String} path - path to image
 * @returns {HTMLImageElement}
 */
const downloadImage = (path) => {
    const img = new Image()
    img.src = path
    img.onload = function () {
        count++;
        if (count === Object.keys(image).length) {
            onImagesLoad()
        }
    }
    return img
}

const onImagesLoad = () => {

}

export const image = {
    background : downloadImage(imageBackground),
    BacteriaGreen : downloadImage(imageBacteriaGreen),
    BacteriaRed : downloadImage(imageBacteriaRed),
    Food : downloadImage(imageFood),
}
