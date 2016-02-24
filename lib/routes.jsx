
/*FlowRouter.notFound = {
  action() {
    ReactLayout.render(App, {
      content:  <NotFound />
    });
  }
};*/

FlowRouter.route('/',{
  name: 'Start',
  action(params) {
    ReactLayout.render(App, {
      content:  <Start />
    });
  }
});

FlowRouter.route('/hunt',{
  name: 'Hunt',
  action(params) {
    ReactLayout.render(App, {
      content:  <BeaconApp/>
    });
  }
});

FlowRouter.route('/dev/:proximities/',{
  name: 'Dev',
  action(params) {
    ReactLayout.render(App, {
      content:  <BeaconApp proximities={params.proximities}/>
    });
  }
});

FlowRouter.route('/end',{
  name: 'End',
  action(params) {
    ReactLayout.render(App, {
      content:  <End />
    });
  }
});
