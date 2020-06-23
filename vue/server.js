const Express = require('express')
const nocache = require('nocache')
const path = require('path')
const expressRouter = Express()

expressRouter.use(nocache())
expressRouter.use(Express.static(path.join(__dirname, 'public')))

expressRouter.listen(3000, () => {
    console.log("Listening at :3000...")
});
