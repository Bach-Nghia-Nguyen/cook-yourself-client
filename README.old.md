# Cook Yourself Project

## Overview

This project is a simple E-commerce web application. A web app that sells food ingredient and recipes.

## Requirement

[] There are 2 kinds of user: admin and customer

[✓] Customer can register with their email and password

[✓] Customer can login with registered email

[] Customer can login with their Facebook or Google account

[✓] Customer stay logged in even when the browser is refreshed

[✓] Customer can logout

[✓] Customer can see the home page of Cook Yourself filled with products

[] Customer can see the detail of a recipe when they click it, which shows name of recipe, description, photos, ingredient and steps of making the dish.

[✓] Customer can see the detail of a product when they click it, which shows name of product, photos, description, price, etc.

[] Customer can make their shopping basket

[] Customer can edit or delete the shopping basket

[] Customer can comment on the product (Login required)

[✓] Admin have a private route for himself (Admin layout)

[✓] Admin can see a list of recipes in the recipe management page

[✓] Admin can search recipe in the recipe management page

[✓] Admin can see a list of customers in the user management page

[] Admin can search customer in the user management page

## Implementation

- DB Design

  - User Model: name, email, password, avatarUrl, isDeleted, role
  - Recipe Model: name, description, images, author (ref: User), reactions, commentCount
  - Comment Model: content, user (ref: User), recipe (ref: Recipe), reactions
  - Reaction Model: user (ref: User), targetType, targetId, emoji
  - Product Model:
  - Basket Model:

- Backend

  - Set up the project
    - npx express-generator --no-view
    - npm install
    - git init
    - npm i --save-dev nodemon, add "dev": "nodemon bin/www"
    - npm i dotenv cors, add them to app.js
    - remove everything in public/
    - .env: PORT=5000, MONGODB_URI="mongodb://localhost:27017/cook_yourself"
    - Put in helpers/utils.helper.js
    - Put error handlers in app.js
    - Put in mongoose connection
    - Set up endpoints (routes api): POST api/auth/login, POST api/auth/login/facebook, POST api/auth/login/google, GET api/users/me, GET api/users, GET api/recipes
    - Create controllers: user.controller.js, auth.controller.js, recipe.controller.js
    - Middlewares: authentication, passport, validator

- Frontend
  - Set up React app with Login/Register, redux
  - Get current user when the app refresh
  - Add FB/Google login
  - UI
  - Get the list of recipes
