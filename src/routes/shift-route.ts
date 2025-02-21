import express from 'express';
import shiftController from '../controllers/shift-controller';

const shiftRoute = express.Router();

// Shift Template Routes
shiftRoute.route('/shift')
    .get(shiftController.getAllShifts)
    .post(shiftController.createShift);

shiftRoute.route('/shift/:id')
    .put(shiftController.updateShiftTemplate)
    .delete(shiftController.deleteShiftTemplate);

// Available Shifts Routes
shiftRoute.route('/available-shifts')
    .get(shiftController.getAllAvaliableShifts)
    .post(shiftController.addAvaliabeShift);

// Location-based Shifts Routes
shiftRoute.get('/location/:locationId/shifts', shiftController.getAllShiftsForLocation);
shiftRoute.get('/location/:locationId/shifts/date', shiftController.getAllShiftsForLocationAndDate);

// Shift Assignment Routes
shiftRoute.post('/available-shifts/claim', shiftController.claimShift);
shiftRoute.get('/available-shifts/claimed/:userId', shiftController.getAllClaimedShifts);
shiftRoute.get('/available-shifts/approved/:userId', shiftController.getAllApprovedShiftsByUserId);
shiftRoute.put('/available-shifts/approve', shiftController.approveClaimShift);

// Clock In/Out Routes
shiftRoute.put('/shifts/clock-in', shiftController.clockIn);
shiftRoute.put('/shifts/clock-out', shiftController.clockOut);

export default shiftRoute;


/**
 *    .get(shiftController.getAllAvaliableShifts)
   .post(shiftController.addAvaliabeShift)

shiftRoute.post('/available-shifts/claimed-shift', shiftController.claimShift)
shiftRoute.get('/available-shifts/claimed-shift/:userId', shiftController.getAllClaimedShifts)
shiftRoute.get('/available-shifts/claimed-shift/approve/:userId', shiftController.getAllApprovedShiftsByUserId)
shiftRoute.put('/available-shifts/claimed-shift/approve', shiftController.approveClaimShift)

// clock in and out
shiftRoute.put('/available-shifts/claimed-shift/clockin', shiftController.clockIn);
shiftRoute.put('/available-shifts/claimed-shift/clockout', shiftController.clockOut);



   // will use query params
// shiftRoute.route('/available-shifts/:userId')
//   .get(shiftController.getAllShiftAssignments)
//   .post(shiftController.assignShift)

// shiftRoute.route('/shift/:id')
//   .get(shiftController.getShiftById)
//   .put(shiftController.updateShift)
//   .delete(shiftController.deleteShift);
 */