# MERN stack project
Brad Traversy's MERN stack

## Takeaways from [section #1](https://youtu.be/-0exw-9YJBo)
| What  | What's new  |
|---|---|
|npm   |- Installed `nodemon` with the `-d` flag to make it one of the `DevDependencies` <br/> - Installed `express-async-handler` for `goalController.js` to easily handle database operations, which are always async |
| environment variables  |- Added `NODE_ENV=development`|
|Folder structure |- All things server-related are inside `backend`|
|Code structure |- Separated routes, models, controllers <br/> - `goalController.js` has each route function commented up for easy reference <br/> - `goalRoutes.js` destructures the controller <br/> -`goalRoutes.js` uses the `router` mounter|
|Database code |- Stored database code in `config/db.js`. <br/> - Connected to the database with a try-catch block <br/> - `server.js` calls `connectDB()` </br> `goalModel.js` uses `{timestamps: true}` |
|Error handling |- Stored `errorHandler` in `middleware/errorMiddleware.js` <br> - Got the `message` and `stack` from the `err` object. <br> - Only displayed `stack` contents in the development environment <br> - In `server.js`, used that middleware **last** |