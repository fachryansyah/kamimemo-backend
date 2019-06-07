'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.post("api/login", "AuthController.login").middleware("guest")
Route.post("api/register", "AuthController.register").middleware("guest")
Route.get("api/logout", "AuthController.logout").middleware("auth:api")

Route.get("api/profile", "AuthController.profile").middleware("auth:api")

Route.get("api/memo", "MemoController.getMemo").middleware("auth:api")
Route.post("api/memo/create", "MemoController.createMemo").middleware("auth:api")
Route.post("api/memo/update", "MemoController.updateMemo").middleware("auth:api")
Route.get("api/memo/delete/:id", "MemoController.deleteMemo").middleware("auth:api")