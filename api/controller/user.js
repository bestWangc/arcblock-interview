// user.js

const { errorRes, successRes } = require('../utils');
const { getUserById, updateUserById } = require("../service/user")


async function saveUser(req, res) {
    const { username, email, phone } = req.body;
    const uid = req.params.id;
    if (!username || !email || !phone) {
        return errorRes(res, "Invalid input");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return errorRes(res, "Invalid email format");
    }

    const phoneRegex = /^(?:\+86)?1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        return errorRes(res, "Invalid phone format");
    }

    // 查询用户是否存在
    const user = await getUserById(uid);
    if (!user) {
        return errorRes(res, "User not found");
    }
    const resObj = {
        username: username,
        email: email,
        phone: phone,
    }
    if (user.username === username && user.eamil === email && user.phone === phone) {
        return successRes(res, resObj);
    }

    // 更新用户信息
    const updateRes = await updateUserById(uid, username, email, phone);
    if (!updateRes) {
        return errorRes(res, "update fail");
    }

    //todo 用户信息缓存改变

    // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    // await sleep(10000);

    return successRes(res, resObj);
}

async function getUser(req, res) {

    //todo 增加用户信息缓存
    //todo 从auth 中间件获取用户信息
    const uid = 1;
    try {
        const user = await getUserById(uid);
        if (!user) {
            return errorRes(res, "User not found");
        }
        return successRes(res, {
            username: user.username,
            email: user.email,
            phone: user.phone,
        });
    } catch (err) {
        console.error('Error:', err);
        return errorRes(res, "Internal server error");
    }
}

module.exports = { saveUser, getUser };