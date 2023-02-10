const { Session } = require("../models/models");

class SessionController {
  async create(user, token) {
    if (!user || !token) return;
    await Session.create({userId: user.id, token});
    return true;
  }
  
  async get(user, id) {
    if (!id) return null;
    const session = await Session.findOne({where: {userId: user.id, id}});
    if (!session) return null;
    return session;
  }

  async update(user, token) {
    if (!user.id) return false;
    const session = await Session.findOne({where: {userId: user.id}});
    if (!session) return false;
    await session.update({token: token});
    return true;
  }

  async delete(user, id) {
    if (!id) return false;
    const session = await Session.findOne({where: {userId: user.id, id}});
    if (!session) return true;
    await session.destroy();
    return true;
  }
}

module.exports = new SessionController();