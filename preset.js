
let count = 0

/**
 *
 * @param {String} path - path to image
 * @returns {HTMLImageElement}
 */
const downloadImage = (path) => {
    const img = new Image()
    img.src = path
    return img
}

const image = {
    background : downloadImage('./images/background.jpg'),
    bacteroid1 : downloadImage('./images/bacter1.jpg'),
    food : downloadImage('./images/food.jpg'),
}