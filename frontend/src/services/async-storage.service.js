import { boardData } from '../services/data/board.js'

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

_createBoard()

function _createBoard() {
    var board = load('board')
    if (!board || !board.length) {
        _save('board', boardData)
    }
}

function load(key) {
    var val = localStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}

async function get(entityType, entityId) {
    const entities = await query(entityType)
    entities.find(entity => entity._id === entityId)
}

async function post(entityType, newEntity) {
    newEntity._id = _makeId()
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function postMany(entityType, newEntities) {
    const entities = await query(entityType)
    newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
    entities.push(...newEntities)
    _save(entityType, entities)
    return entities
}

async function put(entityType, updatedEntity) {
    const entities = await query(entityType)
    // console.log('entities', entities);
    // const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    // entities.splice(idx, 1, updatedEntity)
    remove(entityType, entities._id)
    _save(entityType, updatedEntity)
    return updatedEntity
}

async function remove(entityType, entityId) {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
    return entities
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}