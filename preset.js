import imageBackground from './images/background.jpg'
import imageBacteriaGreen from './images/bacter1.jpg'
import imageBacteriaRed from './images/bacter1.jpg'
import imageFood from './images/food.jpg'

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
    bacteriaGreen : downloadImage(imageBacteriaGreen),
    bacteriaRed : downloadImage(imageBacteriaRed),
    food : downloadImage(imageFood),
}
