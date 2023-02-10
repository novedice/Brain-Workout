const { Session } = require("../models/models");

class SessionController {
  async create(user, token) {
    if (!user) return;
    return await Session.create({userId: user.id});;
  }
  
  async get(id) {
    const session = await Session.findOne({where: {id}});
    if (!session) return null;
    return session;
  }

  async update(id, token) {
    const session = await Session.findOne({where: {id}});
    if (!session) return false;
    await session.update({token: token});
    return true;
  }

  async check(user) {
    const sessions = await Session.findAndCountAll({where: {userId: user.id}});
    if (sessions.count < 0) return;
    sessions.rows.forEach((el) => {
      try {
        jwt.verify(el.token, process.env.SECRET_KEY);
      } catch (e) {
        el.destroy();
      }
    }); 
  }
}

module.exports = new SessionController();