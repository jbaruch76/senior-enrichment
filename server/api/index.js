'use strict';
/* jshint node: true */

const apiRouter = require('express').Router();
const db = require('../db');
const {Campus, Student} = require('../db/models');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!
apiRouter.get('/hello', (req, res) => res.send({hello: 'world'}));

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

apiRouter.get('/campuses', (req, res, next) => {
	Campus.findAll()
	.then(campuses => res.json(campuses));
});

apiRouter.get('/campuses/:campusId', (req, res, next) => {
	const id = req.params.campusId;
	Student.findAll({
		where: {
			campusId: id
		},
		include: {
			model: Campus
		}
	})
		.then(campus => res.json(campus))
		.catch(next);
});

apiRouter.post('/campuses', (req, res, next) => {
	Campus.create(req.body)
		.then(campus => res.json(campus))
		.catch(next);
});

apiRouter.delete('/campuses/:campusId', (req, res, next) => {
	const id = req.params.campusId;
	Campus.destroy({ where: {id}})
		.then(() => res.status(204).end())
		.catch(next);
});

apiRouter.put('/campuses/:campusId', (req, res, next) => {
	const id = req.params.campusId;
	Campus.update(req.body, {
		where: {id},
		returning: true,
		plain: true
	})
	.then(() => res.status(204).end())
	.catch(next);
});

apiRouter.get('/students', (req, res, next) => {
	Student.findAll({include: [{model: Campus, as: 'campus'}]})
	.then(students => res.json(students));
});

apiRouter.get('/students/:studentId', (req, res, next) => {
	const id = req.params.studentId;
	Student.find({where: {id}, include: [{model: Campus, as: 'campus'}]})
		.then(student => res.json(student))
		.catch(next);
});

apiRouter.post('/students', (req, res, next) => {
	Student.create(req.body)
		.then(student => res.json(student))
		.catch(next);
});

apiRouter.delete('/students/:studentId', (req, res, next) => {
	const id = req.params.studentId;
	Student.destroy({ where: {id}})
		.then(() => res.status(204).end())
		.catch(next);
});

apiRouter.put('/students/:studentId', (req, res, next) => {
	const id = req.params.studentId;
	Student.update(req.body, {
		where: {id},
		returning: true,
		plain: true
	})
	.then(() => res.status(204).end())
	.catch(next);
});

module.exports = apiRouter;
