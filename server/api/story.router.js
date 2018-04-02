const router = require('express').Router()

const HttpError = require('../utils/HttpError')
const Story = require('../db/story.model')

router.param('id', (req, res, next, id) => {
  Story.findById(id)
    .then((story) => {
      if (!story) throw HttpError(404)
      req.story = story
      next()
      return null
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Story.scope('populated').findAll()
    .then((stories) => {
      res.json(stories)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Story.create(req.body)
    .then((story) => {
      return story.reload(Story.options.scopes.populated())
    })
    .then((storyIncludingAuthor) => {
      res.status(201).json(storyIncludingAuthor)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  req.story.reload(Story.options.scopes.populated())
    .then((story) => {
      res.json(story)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  req.story.update(req.body)
    .then((story) => {
      return story.reload(Story.options.scopes.populated())
    })
    .then((storyIncludingAuthor) => {
      res.json(storyIncludingAuthor)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  req.story.destroy()
    .then(() => {
      res.status(204).end()
    })
    .catch(next)
})

module.exports = router
