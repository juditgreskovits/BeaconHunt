
FlowRouter.notFound = {
  action() {
    ReactLayout.render(App, {
      content:  <NotFound />
    });
  }
};

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
      content:  <Hunt gameId={params.gameId}/>
    });
  }
});

FlowRouter.route('/dev/:proximities/',{
  name: 'Hunt',
  action(params) {
    ReactLayout.render(App, {
      content:  <Hunt proximities={params.proximities}/>
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
