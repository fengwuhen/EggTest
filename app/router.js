'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app
  router.get('/index', controller.home.index)

  router.post('/news/create', controller.news.create)
  router.post('/news/update/:id', controller.news.update)
  router.post('/news/destroy/:id', controller.news.destroy)
  router.get('/news/find/:id', controller.news.find)
  router.get('/news/list/:offset/:limit', controller.news.list)
}