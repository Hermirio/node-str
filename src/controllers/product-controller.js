'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = (req, res, next) => {
	repository
		.get()
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
};

exports.getBySlug = (req, res, next) => {
	repository
		.getBySlug(req.params.slug)
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
};

exports.getById = (req, res, next) => {
	repository
		.getById(req.params.id)
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
};


exports.getByTag = (req, res, next) => {
	repository
		.getByTag(req.params.tag)
		.then(data => {
			res.status(200).send(data);
		}).catch(e => {
			res.status(400).send(e);
		});
};

exports.post = (req, res, next) => {
	let contract = new ValidationContract();
	contract.hasMinLen(req.body.title, 3, 'o título deve conte pelo meno 3 caracteres');
	contract.hasMinLen(req.body.slug, 3, 'o slug deve conte pelo meno 3 caracteres');
	contract.hasMinLen(req.body.description, 3, 'o descrição deve conte pelo meno 3 caracteres');

	//se os dados forem invalidos
	if (!contract.isValid()){
		res.status(400).send(contract.errors()).end();
		return;
	}

	repository
		.create(req.body)
		.then(x => {
			res.status(201).send({ message: 'Produto cadastrado com sucesso!'});
		}).catch(e => {
			res.status(400).send({ 
				message: 'Falha ao cadastra',
				data: e
			});
		});
};

exports.put = ('/:id', (req, res, next) => {
	repository
		.update(req.params.id, req.body)
		.then(x => {
			res.status(200).send({ message: 'Produto atualizado com sucesso!'});
		}).catch(e => {
			res.status(400).send({ 
				message: 'Falha na atualização',
				data: e
			});
		});
});

exports.delete = ('/', (req, res, next) => {
	repository
		.delete(req.body.id)
		.then(x => {
			res.status(200).send({ message: 'Produto Removido com sucesso!'});
		}).catch(e => {
			res.status(400).send({ 
				message: 'Falha ao Remover',
				data: e
			})
		});
});