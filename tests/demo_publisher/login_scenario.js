Feature('demo_publisher_login');

Scenario('demo_publisher_login',  async (I) => {
    await require('./login_partition')(I);
});
