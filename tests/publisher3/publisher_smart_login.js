module.exports = async function login(I, login, vars) {
    if (vars.type === 'demo') {
        await require('./login_demo.js')(I);
    } else {
        await login.login(I, vars);
    }
};