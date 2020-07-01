const tournoiRepository = require('../repositories/tournoiRepository')

const tournoiService = {
    findByStatus:() => {
        console.log("entrée service")
        return Promise.resolve()
        .then(tournoiRepository.listByActiveStatus)
    }
}

module.exports = tournoiService