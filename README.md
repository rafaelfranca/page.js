# page.js

page.js executes page specific JavaScript to bootstrap your interface. It supports an explicit setup API and also supplies a few conventions to reduce the required setup code.

## Usage

Include `page.js` to your project, and add a `data-page` attribute to the `body` tag of your pages.

```html
<body data-page="users#show">
```

To run specific code for the `users#show` page we need a `UsersPage` constructor
function with a `show` function on its `prototype`.

```javascript
var UsersPage = function() { };

UsersPage.prototype.show = function() {
  console.log("Welcome to the user profile page.");
};

UsersPage.prototype.index = function() {
  console.log("Welcome to the user listing page.");
};
```
Now, you just need to call `page.recognize` whenever your page is ready to get it up and running.
Since you will be probably running jQuery or Zepto, just add it your DOM ready callback.

```javascript
$(function() {
  page.recognize();
});
```

### Callbacks

If your `UsersPage` needs to share code between the `show` and `index` actions, just add to it a `before` or an `after` functions.

```javascript
UsersPage.prototype.before = function() {

};

UsersPage.prototype.after = function() {

};
```

### Explicit setup

If you don't want to follow the `*Page` convention, you can registry page specific actions using the `.at` function.

```javascript
var setupDashboard = function() {
};

page.at("users#index", setupDashboard);
page.recognize();
```

### Global callbacks

You can register actions with the `:before` and `:after` keywords.

```javascript
page.at(":before", beforeAnything);
page.at(":after", afterAnything);
```

### Halting

Any action that returns `false` will stop the execution of subsequent actions.

```javascript
page.at(":before", function () {
  return false;
});

page.at(":after", function() {
// this will never be called, since we are returning 'false'
// from the ':before' action.
});
```

### Available options

`page.recognize` accepts a few options:

* `page`: Explicit sets the current page, ignoring the `data-page` attribute.
* `root`: Sets the root for page discovery. If you're using something like `App.Pages.UsersPage`, just pass this option with `App.Pages`.

