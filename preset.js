
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
    background : downloadImage('./images/background.jpg'),
    bacteriaGreen : downloadImage('./images/bacter1.jpg'),
    bacteriaRed : downloadImage('./images/bacter1.jpg'),
    food : downloadImage('./images/food.jpg'),
}
