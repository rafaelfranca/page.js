describe("page.js", function () {
  var spiedKlasses = [];

  beforeEach(function () {
    for (var i = 0; i < spiedKlasses.length; i++) {
      delete window[spiedKlasses[i]];
    };
    spiedKlasses = [];
  });

  // This shit gotta go.
  function createSpyFor(klass, methods) {
    var instance = {};
    window[klass]  = window[klass] || function() {};
    spyOn(window, klass).andReturn(instance);

    for (var i = 0; i < methods.length; i++) {
      instance[methods[i]] = function() {};
      spyOn(instance, methods[i]);
    };
    spiedKlasses.push(klass);
    return instance;
  };

  it("calls the respective page object when executed", function () {
    var usersPage = createSpyFor("UsersPage", ['index']);
    page.recognize({page: "users#index"});
    expect(usersPage.index).toHaveBeenCalled();
  });

  it("calls registered page objects when executed", function () {
    var usersDashboard = createSpyFor("UsersDashboard", ['index']);
    page.at("users#index", "UsersDashboard");
    page.recognize({page: "users#index"});
    expect(usersDashboard.index).toHaveBeenCalled();
  });

  var pending = function() { expect("pending").toBe("completed"); };
  it("supports page specific callbacks", pending);
  it("supports registered global callbacks", pending);
  it("halts the chain when an action returns false", pending);
  it("accepts an 'root' option for lookup", pending);
});