# MERN stack project
Brad Traversy's MERN stack

## Takeaways from [section #1](https://youtu.be/-0exw-9YJBo)
| What  | What's new  |
|---|---|
|npm   |- Installed `nodemon` with the `-d` flag to make it one of the `DevDependencies` <br/> - Installed `express-async-handler` for `goalController.js` to easily handle database operations, which are always async |
| Environment variables  |- Added `NODE_ENV=development`|
|Folder structure |- All things server-related are inside `backend`|
|Code structure |- Separated routes, models, controllers <br/> - `goalController.js` has each route function commented up for easy reference <br/> - `goalRoutes.js` destructures the controller <br/> -`goalRoutes.js` uses the `router` mounter|
|Database code |- Stored database code in `config/db.js`. <br/> - Connected to the database with a try-catch block <br/> - `server.js` calls `connectDB()` </br> `goalModel.js` uses `{timestamps: true}` |
|Error handling |- Stored `errorHandler` in `middleware/errorMiddleware.js` <br> - Got the `message` and `stack` from the `err` object. <br> - Only displayed `stack` contents in the development environment <br> - In `server.js`, used that middleware **last** |

## Takeaways from [section #2](https://youtu.be/enopDSs3DRw)
| What  | What's new  |
|---|---|
|Related documents   |- Added `user` field to `goal` model via `mongoose.Schema.Types.ObjectId` <br> - Every function in `goalController` brings in the goal's associated user: <br> - When getting all goals of a user: `const goals = await Goal.find({user: req.user._id });` <br> - When posting a new goal: `user: req.user._id` <br> - When updating an existing goal: `const user = await User.findById(req.user._id);` <br> - When deleting a goal: `const user = await User.findById(req.user._id);` <br> - We also run checks to match the user's ID against the user ID that is stored on the goal document |
|`bcryptjs` | - When signing up a user, use `bcrypt.genSalt()` and `bcrypt.hash()` to hash and salt a newly entered password <br> - When logging in a user, use `bcrypt.compare` to match an entered password against what's in the database  |
|JWT | - When signing up a user and when logging in a user, sign a JWT token (`signToken`) using the user's database ID as the payload <br> - Send the signed token back to the client in both `registerUser` and `loginUser` <br> - Create a protected route, for example `getMe` <br> - The `protect` middleware will extract the token from the request header <br> - Then, it will verify the request header's token against our own .env secret <br> - If all checks out, `protect` will then find the user in our database and add the user (without the password) to the request object <br> - The next route will req.user to get the user's data from the database and send it to the client |

## Takeaways from [section #3](https://youtu.be/mvfsC66xqj0)
## Takeaways from [section #2](https://youtu.be/enopDSs3DRw)
| What  | What's new  |
|---|---|
|React   |- `npx create-react-app frontend --template redux` <br> - package.json: `"frontend": "npm start --prefix frontend"` <br> - `npm i react-icons` |
|b | b |