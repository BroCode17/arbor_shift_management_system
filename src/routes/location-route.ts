import express from 'express'
import locationController from '../controllers/location-controller';

const locationRoute = express.Router();

locationRoute.route('/location')
    .get(locationController.getAllLocations)
    .post(locationController.addLocations)


    export default locationRoute;